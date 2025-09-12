import pdfMake from "pdfmake/build/pdfmake";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { customVfs } from "@/utils/customVfs";
import { convertImageToBase64, epochToDate, generateQRCode, formatPrice } from "@/utils/Helpers";
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

const formatTanggalShift = (timestamp: number) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp * 1000);
    
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit'
    };
    
    const dateFormatter = new Intl.DateTimeFormat('id-ID', options);
    const datePart = dateFormatter.format(date);
    
    const timeFormatter = new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // format 24 jam
    });
    const timePart = timeFormatter.format(date).replace('.', ':'); 
    
    return `${datePart} ${timePart}`;
};


export async function createSlipTutupShiftPdf({ data }: { data: any }) {
    try {
        const faskesProfile = JSON.parse(
            localStorage.getItem("faskes_profile") ?? "{}"
        );
        
        let logo = await convertImageToBase64(logoUrl); 
        if (faskesProfile.logo && faskesProfile.logo.startsWith('data:image')) {
            logo = faskesProfile.logo;
        }

        const safeData = data || {};
        safeData.actual = safeData.actual || {};
        safeData.system = safeData.system || {};

        const qrCodeImage = await generateQRCode(safeData.cashierName || 'Nama Kasir');
        const shiftMapping: { [key: string]: string } = { "1": "Pagi", "2": "Siang", "3": "Malam" };        
        const greyBg = '#EAECEF'; 
        const lightLineRow = [{ colSpan: 2, canvas: [{ type: 'line', x1: 0, y1: 2, x2: 515, y2: 2, lineWidth: 0.5, lineColor: '#cccccc' }] }, {}];
        const docDefinition: TDocumentDefinitions = {
            pageSize: 'A4',
            pageMargins: [40, 110, 40, 60], 
            defaultStyle: { font: 'Arial', fontSize: 10, lineHeight: 1.2 },
            
            header: defaultHeader(
                safeData.shiftId || '-',
                "SLIP LAPORAN TUTUP SHIFT",
                logo,
                faskesProfile,{}
            ),
            content: [
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            ['Nama Kasir', { text: `: ${safeData.cashierName}`, bold: true }],
                            ['Shift', { text: `: ${shiftMapping[safeData.shiftType] || '-'}`, bold: true }],                                                                    
                            ['Tanggal Buka', { text: `: ${formatTanggalShift(safeData.shiftTimeOpen)}`, bold: true }],
                            ['Tanggal Tutup', { text: `: ${formatTanggalShift(safeData.shiftTimeClosed)}`, bold: true }],
                            ['Transaksi Pasien', { text: `: ${safeData.trxCount} Transaksi`, bold: true }],
                        ]
                    },
                    margin: [0, 0, 0, 10]
                },
                {
                    canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: '#000000' }],
                    margin: [0, 5, 0, 10]
                },
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['*', 'auto'],
                        body: [
                            ['Transaksi (nett)', { text: formatPrice(safeData.system.total || 0), alignment: 'right' }],
                            lightLineRow,
                            ['PPN', { text: formatPrice(safeData.system.ppnValue || 0), alignment: 'right' }],
                            lightLineRow,
                            [{ text: 'Total', bold: true, fillColor: greyBg, margin: [0, 2] }, { text: formatPrice(safeData.system.grandTotal || 0), alignment: 'right', bold: true, fillColor: greyBg, margin: [0, 2] }],
                            ['\n', ''],
                            ['TUNAI', { text: formatPrice(safeData.actual.cash || 0), alignment: 'right' }],
                            lightLineRow,
                            ['DEBIT', { text: formatPrice(safeData.actual.debit || 0), alignment: 'right' }],
                            lightLineRow,
                            ['KREDIT (Insuransi/Piutang)', { text: formatPrice(safeData.actual.insurance || 0), alignment: 'right' }],
                            lightLineRow,
                            [{ text: 'Total Pemasukan', bold: true, fillColor: greyBg, margin: [0, 2] }, { text: formatPrice(safeData.actual.totalPayment || 0), alignment: 'right', bold: true, fillColor: greyBg, margin: [0, 2] }],
                        ]
                    }
                },

                { text: '', margin: [0, 100, 0, 0] },
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['*', 'auto'], 
                        body: [
                            [
                                '', 
                                {
                                    stack: [
                                        { text: `${faskesProfile?.address?.city || 'Surabaya'}, ${epochToDate(Date.now() / 1000, "date")}`, margin: [0, 20, 0, 0] },
                                        { text: 'Kasir', margin: [0, 10, 0, 0] },
                                        { image: qrCodeImage, width: 60, margin: [0, 5, 0, 5] },
                                        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 120, y2: 0, lineWidth: 0.5 }] },
                                        { text: safeData.cashierName, bold: true, margin: [0, 2, 0, 0] },
                                    ],
                                    alignment: 'center' 
                                }
                            ]
                        ]
                    }
                }
            ],
            // footer: {}
        };

        pdfMake.createPdf(docDefinition).open();

    } catch (error) {
        console.error("Gagal membuat PDF:", error);
    }
}