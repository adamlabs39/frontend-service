// File: utils/pdf/pdfPembayaran/cetakRincian.ts (BARU)

import pdfMake from "pdfmake/build/pdfmake";
import type { TDocumentDefinitions, TableCell, Content } from "pdfmake/interfaces";
import { customVfs } from "@/utils/customVfs";
import { convertImageToBase64, epochToDate, generateQRCode, formatPrice, numberToWords } from "@/utils/Helpers";
import { defaultHeader } from "../HeaderPrint";
import logoUrl from "@/assets/images/adameds-square.png";

pdfMake.vfs = customVfs.pdfMake.vfs;
pdfMake.fonts = {
    Arial: {
        normal: "Arial.ttf",
        bold: "Arial_Bold.ttf",
        italics: "Arial_Italic.ttf",
        bolditalics: "Arial_Bold_Italic.ttf",
    },
};

const reversePoliMapping: { [key: string]: string } = {
    "RI": "RAWAT INAP",
    "RJ": "RAWAT JALAN",
    "IGD": "IGD",
    "APS": "APS",
    "OTC": "OTC"
};


export async function createRincianPdf({ detailBill, itemBill, paymentResult }: { detailBill: any, itemBill: any, paymentResult?: any }) {
    try {
        const faskesProfile = JSON.parse(
            localStorage.getItem("faskes_profile") ?? "{}"
        );

        let logo = await convertImageToBase64(logoUrl);
        if (faskesProfile.logo && faskesProfile.logo.startsWith('data:image')) {
            logo = faskesProfile.logo;
        }

        const safeBill = detailBill?.bill || detailBill || {};
        const safePatient = detailBill?.patient || safeBill;
        const safePayment = paymentResult || {};
        const safeItems = itemBill || {};
        const kasirName = safePayment.cashierName || (Array.isArray(safeBill.cashierName) ? safeBill.cashierName.join(', ') : '-');
        const qrCodePasien = await generateQRCode(safeBill.patientName || 'Pasien');
        const qrCodeKasir = await generateQRCode(kasirName || 'Kasir');


        const totalDiterima = safeBill.totalPaid || 0;
        const total = safeBill.grandTotal || 0;
        const terbilangDiterima = totalDiterima > 0 ? numberToWords(totalDiterima).trim() + ' Rupiah' : '-';
        const terbilangTotal = total > 0 ? numberToWords(total).trim() + ' Rupiah' : '-';

        const rincianContent: Content[] = [];
        const itemData = safeItems.item || {};

        // Helper function untuk membuat tabel per kategori
        const createCategoryTable = (title: string, items: any[], columns: string[], dataMapping: (item: any, index: number) => any[]) => {
            if (!items || items.length === 0) return;
            const widths = Array(columns.length).fill('*');
            // Judul Kategori
            rincianContent.push({
                table: {
                    widths: ['*'],
                    body: [[{ text: title, bold: true, color: 'black', fillColor: '#EEEEEE', margin: [5, 2] }]] // Warna hijau
                },
                layout: 'noBorders',
                margin: [0, 10, 0, 5]
            });

            // Tabel Rincian
            rincianContent.push({
                layout: 'lightHorizontalLines',
                table: {
                    headerRows: 1,
                    widths,
                    body: [
                        columns.map(h => ({ text: h, style: 'tableHeader' })),
                        ...items.map(dataMapping)
                    ],
                },
            });
        };

        // Tabel Tindakan
        createCategoryTable(
            'BIAYA TINDAKAN',
            itemData.tindakan?.list,
            ['Tanggal', 'Biaya Tindakan', 'Petugas', 'Jml', 'Tarif', 'Potongan', 'Total'],
            (item, index) => [
                epochToDate(item.dateUsed, "date"),
                item.itemName || '-',
                safeBill.serviceBill?.[0]?.practitionerName || '-',
                item.qty,
                { text: `Rp ${(item.price?.toLocaleString ('id-ID') || 0)}`, alignment: 'left' },
                { text: `Rp ${(item.serviceFee?.toLocaleString ('id-ID') || 0)}`, alignment: 'left' },
                { text: `Rp ${(item.price * item.qty + item.serviceFee)?.toLocaleString ('id-ID') || 0}`, alignment: 'left' }
            ]
        );

        // Tabel Penunjang 
        createCategoryTable(
            'BIAYA PENUNJANG MEDIS DAN LAIN-LAIN',
            itemData.penunjang?.list,
            ['Tanggal', 'Biaya Lab', 'Petugas', 'Jml', 'Tarif', 'Total'],
            (item, index) => [
                epochToDate(item.dateUsed, "date"),
                item.itemName || '-',
                safeBill.serviceBill?.[0]?.practitionerName || '-',
                item.qty,
                { text: `Rp ${(item.price?.toLocaleString ('id-ID') || 0)}`, alignment: 'left' },
                { text: `Rp ${(item.price * item.qty)?.toLocaleString ('id-ID') || 0}`, alignment: 'left' }
            ]
        );

        // Tabel Alkes
        createCategoryTable(
            'BIAYA ALAT KESEHATAN (ALKES)',
            itemData.alkes?.list,
            ['Tanggal', 'Nama Barang', 'Petugas', 'Jml', 'Tarif', 'Total'],
            (item, index) => [
                epochToDate(item.dateUsed, "date"),
                item.itemName || '-',
                safeBill.serviceBill?.[0]?.practitionerName || '-',
                item.qty,
                { text: `Rp ${(item.price?.toLocaleString ('id-ID') || 0)}`, alignment: 'left' },
                { text: `Rp ${(item.price * item.qty)?.toLocaleString ('id-ID') || 0}`, alignment: 'left' }
            ]
        );

        // Tabel Obat
        createCategoryTable(
            'BIAYA OBAT ',
            itemData.obat?.list,
            ['Tanggal', 'Nama Obat', 'Petugas', 'Jml', 'Tarif', 'Total'],
            (item, index) => [
                epochToDate(item.dateUsed, "date"),
                item.itemName || '-',
                safeBill.serviceBill?.[0]?.practitionerName || '-',
                item.qty,
                { text: `Rp ${(item.price?.toLocaleString ('id-ID') || 0)}`, alignment: 'left' },
                { text: `Rp ${(item.price * item.qty)?.toLocaleString ('id-ID') || 0}`, alignment: 'left' }
            ]
        );

        // Tabel Kamar
        createCategoryTable(
            'BIAYA RAWAT INAP',
            itemData.ruangan?.list,
            ['Tanggal', 'Nama Ruangan', 'Petugas', 'Jml', 'Tarif', 'Total'],
            (item, index) => [
                epochToDate(item.dateUsed, "date"),
                item.itemName || '-',
                safeBill.serviceBill?.[0]?.practitionerName || '-',
                item.qty,
                { text: `Rp ${(item.price?.toLocaleString ('id-ID') || 0)}`, alignment: 'left' },
                { text: `Rp ${(item.price * item.qty)?.toLocaleString ('id-ID') || 0}`, alignment: 'left' }
            ]
        );

        const docDefinition: TDocumentDefinitions = {
            pageSize: 'A4',
            pageMargins: [40, 110, 40, 60],
            defaultStyle: { font: 'Arial', fontSize: 9, lineHeight: 1.1 },

            header: defaultHeader("invoice", "RINCIAN BIAYA", logo, faskesProfile, { grandTotal: safeBill.grandTotal || safeBill.invoice_code || '-' }),
            content: [
                {
                    columns: [
                        {
                            layout: 'noBorders',
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    ['No. RM', { text: `: ${safeBill.noRm || '-'}`, bold: true }],
                                    ['No. Invoice', { text: `: ${safeBill.invoiceCode || '-'}`, bold: true }],
                                    ['Nama Pasien', { text: `: ${safeBill.patientName || '-'}`, bold: true }],
                                    ['Alamat', { text: `: ${safeBill.alamat || '-'}`, bold: true }],
                                    ['Metode Pembayaran', { text: `: ${safeBill.paymentType || '-'}`, bold: true }],
                                    ['Penjamin', { text: ': -', bold: true }]
                                ]
                            }
                        },
                        {
                            layout: 'noBorders',
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    ['Nomer Kunjungan', { text: `: ${safeBill.noReg || '-'}`, bold: true }],//ini nomer reg
                                    ['Pelayanan', { text: `: ${reversePoliMapping[safeBill.serviceBill && safeBill.serviceBill[0]?.type] || (safeBill.serviceBill && safeBill.serviceBill[0]?.type) || '-'}`, bold: true }],
                                    ['Tanggal Kunjungan', { text: `: ${safeBill.visitDate ? epochToDate(safeBill.visitDate, "date") : '-'}`, bold: true }],
                                    ['Tanggal Discharge', { text: ': -', bold: true }]
                                ]
                            }
                        }
                    ],
                    margin: [0, 0, 0, 10]
                },
                ...rincianContent,

                //Detail Tagihan
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['*', 'auto'],
                        body: [
                            [{ text: 'Total Tagihan', fillColor: '#EEEEEE', margin: [5, 2], bold: true }, { text: `Rp ${(safeBill.subTotal || 0)?.toLocaleString ('id-ID')}`, alignment: 'right', fillColor: '#EEEEEE', bold: true, margin: [5, 2] }],
                            [{ text: 'Total Potongan', bold: true, margin: [5, 2] }, { text: (safeBill.voucherValue || 0), alignment: 'right', margin: [5, 2], bold: true }],
                            [{ text: 'Total(Termasuk potongan Biaya Pelayanan)', bold: true, fillColor: '#EEEEEE', margin: [5, 2] }, { text: `Rp ${(safeBill.grandTotal || 0)?.toLocaleString ('id-ID')}`, alignment: 'right', bold: true, fillColor: '#EEEEEE', margin: [5, 2] }],
                            [{ text: 'Pembulatan', margin: [5, 2], bold: true }, { text: '-', alignment: 'right', bold: true, margin: [5, 2] }],
                            [{ text: 'Biaya yang harus dibayar', fillColor: '#EEEEEE', margin: [5, 2], bold: true }, { text: `Rp ${(safeBill.grandTotal || 0)?.toLocaleString ('id-ID')}`, alignment: 'right', fillColor: '#EEEEEE', bold: true, margin: [5, 2] }],
                            [{ text: 'Terima Pembayaran', margin: [5, 2], bold: true }, { text: `${(safeBill.totalPaid || 0)?.toLocaleString ('id-ID')}`, alignment: 'right', bold: true, margin: [5, 2] }],
                            [{ text: 'TUNAI/CASH', fillColor: '#EEEEEE', margin: [5, 2] }, { text: `${(safeBill.totalPaid || 0)?.toLocaleString ('id-ID')}`, alignment: 'right', fillColor: '#EEEEEE', margin: [5, 2], bold: true }],
                        ]
                    },
                    margin: [0, 5, 0, 2]
                },

                // Baris Terbilang
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['*'],
                        body: [
                            [{
                                text: [{ text: 'Terbilang :', bold: true }, { text: `${terbilangTotal}`, italics: true, bold: true }],
                                fillColor: '#EAECEF',
                                margin: [5, 5]
                            }]
                        ]
                    }
                },
                {
                    canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 0.5, dash: { length: 2, space: 2 } }],
                    margin: [0, 5, 0, 5],
                    fillColor: '#EEEEEE',
                },

                // Kuitansi Pembayaran 
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [{ text: 'KUITANSI PEMBAYARAN', bold: true, fillColor: '#EEEEEE', margin: [5, 2] }]
                        ]
                    },
                    layout: 'noBorders',
                    margin: [0, 0, 0, 5]
                },
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['auto', '*', 'auto', '*'],
                        body: [['No. Kuitansi', ': -', 'No. Faktur', ': -'], ['Tanggal', ': -', 'Tanggal', ': -']]
                    },
                    margin: [0, 0, 0, 15]
                },

                // Pembayaran
                {
                    layout: 'noBorders',
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto', 'auto', 'auto', 'auto'],
                        body: [
                            [
                                { text: 'Keterangan', style: 'tableHeader' },
                                { text: 'Diterima', style: 'tableHeader', alignment: 'right' },
                                { text: 'Digunakan', style: 'tableHeader', alignment: 'right' },
                                { text: 'Dikembalikan', style: 'tableHeader', alignment: 'right' },
                                { text: 'Nama Petugas', style: 'tableHeader', alignment: 'center' }
                            ],
                            [
                                safeBill.paymentType || '-',
                                { text: `Rp ${(safeBill.totalPaid || 0).toLocaleString('id-ID')}`, alignment: 'right' },                                // Kolom DIGUNAKAN -> dari grandTotal
                                { text: `Rp ${(safeBill.grandTotal || 0).toLocaleString('id-ID')}`, alignment: 'right' },
                                { text: `Rp ${(safePayment.change || 0).toLocaleString('id-ID')}`, alignment: 'right' },
                                { text: kasirName, alignment: 'center' }
                            ]
                        ]
                    }
                },

                // Baris Terbilang Diterima
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['*'],
                        body: [
                            [{
                                text: [
                                    { text: 'Terbilang Diterima :', bold: true },
                                    { text: ` ${terbilangDiterima}`, italics: true, bold: true }
                                ],
                                fillColor: '#EAECEF',
                                margin: [5, 5]
                            }]
                        ]
                    },
                    margin: [0, 0, 0, 0]
                },
                { text: '', margin: [0, 20, 0, 0] },
                //QR code dan ttd
                {
                    columns: [
                        // KOLOM KIRI (PASIEN)
                        {
                            width: '*',
                            alignment: 'center',
                            stack: [
                                { text: 'Mengetahui', margin: [0, 10, 0, 0], bold: true },
                                { text: 'Pasien/Keluarga Pasien', margin: [0, 0, 0, 10], bold: true },
                                { image: qrCodePasien, width: 70, margin: [0, 5, 0, 5] },
                                { text: ` ${safeBill.patientName || 'Nama Pasien'} `, bold: true, margin: [0, 0, 0, 10] },
                                { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 170, y2: 0, lineWidth: 0.5 }] },

                            ]
                        },
                        // KOLOM KANAN (KASIR)
                        {
                            width: '*',
                            alignment: 'center',
                            stack: [
                                { text: `${faskesProfile?.address?.city || 'Surabaya'}, ${epochToDate(Date.now() / 1000, "date")}`, margin: [0, 10, 0, 0], bold: true },
                                { text: 'Petugas', margin: [0, 0, 0, 10], bold: true },
                                { image: qrCodeKasir, width: 70, margin: [0, 5, 0, 5] },
                                { text: ` ${kasirName} `, bold: true, margin: [0, 0, 0, 10] },
                                { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 170, y2: 0, lineWidth: 0.5 }] },

                            ],
                        }
                    ],
                    margin: [0, 0, 0, 0]
                },
            ],
            styles: {
                tableHeader: { bold: true, fillColor: '#EEEEEE' }
            },
            // footer: {}
        };

        pdfMake.createPdf(docDefinition).open();

    } catch (error) {
        console.error("Gagal membuat PDF Rincian:", error);
    }
}