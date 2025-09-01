// File: utils/pdf/pdfPembayaran/cetakRincian.ts (BARU)

import pdfMake from "pdfmake/build/pdfmake";
import type { TDocumentDefinitions,TableCell,Content} from "pdfmake/interfaces";
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

// Nama fungsi diubah dan parameter 'itemBill' ditambahkan
export async function createRincianPdf({ detailBill, itemBill, paymentResult }: { detailBill: any, itemBill: any, paymentResult?: any }) {
    try {
        const faskesProfile = JSON.parse(
            localStorage.getItem("faskes_profile") ?? "{}"
        );
        
        let logo = await convertImageToBase64(logoUrl); 
        if (faskesProfile.logo && faskesProfile.logo.startsWith('data:image')) {
            logo = faskesProfile.logo;
        }

        const safeBill = detailBill || {};
        const safeItems = itemBill || {}; // Data untuk tabel rincian
        const safePayment = paymentResult || {};
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
            if (!items || items.length === 0) return; // Jangan buat tabel jika tidak ada data
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
                    widths, // Lebar kolom otomatis
                    body: [
                        columns.map(h => ({ text: h, style: 'tableHeader' })), // Header tabel
                        ...items.map(dataMapping) // Isi tabel
                    ],
                },
            });
        };
        
        // Tabel Tindakan
        createCategoryTable(
            'BIAYA TINDAKAN',
            itemData.tindakan?.list,
            [ 'Tanggal', 'Biaya Tindakan', 'Petugas', 'Jml', 'Tarif', 'Potongan', 'Total'],
            (item, index) => [
                epochToDate(item.dateUsed, "date"),
                item.itemName || '-',
                safeBill.serviceBill?.[0]?.practitionerName || '-', // Ambil nama dokter dari getDetailBill
                item.qty,
                { text: formatPrice(item.price), alignment: 'left' },
                { text: formatPrice(item.serviceFee), alignment: 'left' },
                { text: formatPrice(item.price * item.qty + item.serviceFee), alignment: 'left' }
            ]
        );
        
        // Tabel Penunjang 
        createCategoryTable(
            'BIAYA PENUNJANG MEDIS DAN LAIN-LAIN',
            itemData.penunjang?.list,
            [ 'Tanggal', 'Biaya Lab', 'Petugas', 'Jml', 'Tarif', 'Total'],
            (item, index) => [
                epochToDate(item.dateUsed, "date"),
                item.itemName || '-',
                safeBill.serviceBill?.[0]?.practitionerName || '-',
                item.qty,
                { text: formatPrice(item.price), alignment: 'left' },
                { text: formatPrice(item.price * item.qty), alignment: 'left' }
            ]
        );

        // Tabel Alkes
        createCategoryTable(
            'BIAYA ALAT KESEHATAN (ALKES)',
            itemData.alkes?.list,
            [ 'Tanggal', 'Nama Barang', 'Petugas', 'Jml', 'Tarif', 'Total'],
            (item, index) => [
                epochToDate(item.dateUsed, "date"),
                item.itemName || '-',
                safeBill.serviceBill?.[0]?.practitionerName || '-',
                item.qty,
                { text: formatPrice(item.price), alignment: 'left' },
                { text: formatPrice(item.price * item.qty), alignment: 'left' }
            ]
        );

        // Tabel Obat
        createCategoryTable(
            'BIAYA OBAT ',
            itemData.obat?.list,
            [ 'Tanggal', 'Nama Obat', 'Petugas', 'Jml', 'Tarif', 'Total'],
            (item, index) => [
                epochToDate(item.dateUsed, "date"),
                item.itemName || '-',
                safeBill.serviceBill?.[0]?.practitionerName || '-',
                item.qty,
                { text: formatPrice(item.price), alignment: 'left' },
                { text: formatPrice(item.price * item.qty), alignment: 'left' }
            ]
        );
        
        // Tabel Kamar
        createCategoryTable(
            'BIAYA RAWAT INAP',
            itemData.ruangan?.list,
            [ 'Tanggal', 'Nama Ruangan', 'Petugas', 'Jml', 'Tarif', 'Total'],
            (item, index) => [
                epochToDate(item.dateUsed, "date"),
                item.itemName || '-',
                safeBill.serviceBill?.[0]?.practitionerName || '-',
                item.qty,
                { text: formatPrice(item.price), alignment: 'left' },
                { text: formatPrice(item.price * item.qty), alignment: 'left' }
            ]
        );

        const docDefinition: TDocumentDefinitions = {
            pageSize: 'A4',
            pageMargins: [40, 110, 40, 60],
            defaultStyle: { font: 'Arial', fontSize: 9, lineHeight: 1.1 },
            
            header: defaultHeader(safeBill.invoiceCode || '-', "KUITANSI PEMBAYARAN", logo, faskesProfile,{}),
            content: [
                {
                                    columns: [
                                        {
                                            layout: 'noBorders',
                                            table: {
                                                widths: ['auto', '*'],
                                                body: [
                                                    ['No. RM', { text: `: ${safeBill.noRm || '-'}`, bold: true }],
                                                    ['Nama Pasien', { text: `: ${safeBill.patientName || '-'}`, bold: true }],
                                                    ['Alamat', { text: `: ${safeBill.fullAddress || '-'}`, bold: true }],
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
                                                    ['Nomer Kunjungan', { text: ': -', bold: true }],
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
                            [{ text: 'Total(Termasuk potongan Biaya Pelayanan)', bold: true, fillColor: '#EEEEEE', margin: [5, 2] }, { text: formatPrice(safeBill.subTotal + safeBill.ppn || 0), alignment: 'right', bold: true, fillColor: '#EEEEEE', margin: [5, 2] }],
                            [{ text: 'Total Tagihan', margin: [5, 2],bold:true}, { text: formatPrice(safeBill.subTotal || 0), alignment: 'right', bold: true , margin: [5, 2]}],
                            [{ text: 'Total Potongan', fillColor: '#EEEEEE', bold: true, margin: [5, 2] }, { text: formatPrice(safeBill.voucherValue || 0), alignment: 'right', fillColor: '#EEEEEE', margin: [5, 2],bold:true }],
                            [{ text: 'Pembulatan', margin: [5, 2],bold:true}, { text: '-', alignment: 'right', bold: true , margin: [5, 2]}],
                            [{ text: 'Biaya yang harus dibayar', fillColor: '#EEEEEE', bold: true, margin: [5, 2] }, { text: formatPrice(safeBill.grandTotal || 0), alignment: 'right', fillColor: '#EEEEEE', margin: [5, 2],bold:true }],
                            [{ text: 'Terima Pembayaran', margin: [5, 2],bold:true}, { text: formatPrice(safeBill.totalPaid || 0), alignment: 'right', bold: true , margin: [5, 2]}],
                            [{ text: 'TUNAI/CASH', fillColor: '#EEEEEE', margin: [5, 2] }, { text: formatPrice(safeBill.totalPaid || 0), alignment: 'right', fillColor: '#EEEEEE', margin: [5, 2],bold:true }],
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
                                text: [ { text: 'Terbilang :', bold: true }, { text: `${terbilangTotal}`, italics: true,bold:true } ], 
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
                                { text: formatPrice(safeBill.totalPaid || 0), alignment: 'right' },                                // Kolom DIGUNAKAN -> dari grandTotal
                                { text: formatPrice(safeBill.grandTotal || 0), alignment: 'right' },
                                { text: formatPrice(safePayment.change || 0), alignment: 'right' },
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
                                    { text: ` ${terbilangDiterima}`, italics: true ,bold:true}
                                ], 
                                fillColor: '#EAECEF',
                                margin: [5, 5] 
                            }]
                        ]
                    },
                    margin: [0, 10, 0, 0] 
                },
                { text: '', margin: [0, 50, 0, 0] },
                //QR code dan ttd
                {
                    columns: [
                        // KOLOM KIRI (PASIEN)
                        {
                            width: '*',
                            alignment: 'center',
                            stack: [
                                { text: 'Mengetahui', margin: [0, 10, 0, 0], bold: true },
                                { text: 'Pasien/Keluarga Pasien', margin: [0, 10, 0, 10], bold: true },
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
                                { text: `${faskesProfile?.address?.city || 'Surabaya'}, ${epochToDate(Date.now() / 1000, "date")}`, margin: [0, 10, 0, 0] ,bold:true},
                                { text: 'Pengirim ', margin: [0, 10, 0, 10],bold:true },
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