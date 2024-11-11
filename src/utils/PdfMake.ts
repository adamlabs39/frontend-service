import pdfMake from "pdfmake/build/pdfmake";
import htmlToPdfmake from "html-to-pdfmake";
import { customVfs } from "./customVfs";

type PageSize =
  | "A4"
  | "A5"
  | "A3"
  | "B4"
  | "B5"
  | "LEGAL"
  | "LETTER"
  | { width: number; height: number };
type PageOrientation = "portrait" | "landscape";

export function downloadPdf({
  data,
  page = "A4",
  orientation = "portrait",
}: {
  data: any;
  page?: PageSize;
  orientation?: PageOrientation;
}) {
  pdfMake.vfs = customVfs.pdfMake.vfs;

  pdfMake.fonts = {
    Arial: {
      normal: "Arial.ttf",
      bold: "Arial_Bold.ttf",
      italics: "Arial_Italic.ttf",
      bolditalics: "Arial_Bold_Italic.ttf",
    },
  };

  const docDefinition = {
    pageSize: page,
    pageOrientation: orientation,
    defaultStyle: {
      font: "Arial", // Set font default ke Arial
    },
    content: [{ text: "Hello, PDFMake!", fontSize: 15, font: "Arial" }],
  };

  pdfMake.createPdf(docDefinition).download("Test");
}

export function createGeneralConsentPdf({
  data,
  page = "A4",
  orientation = "portrait",
}: {
  data: any;
  page?: PageSize;
  orientation?: PageOrientation;
}) {
  data = `<h2 style="text-align:center;">CONTOH<br>PERSETUJUAN UMUM/ GENERAL CONSENT</h2><p><br><strong>IDENTITAS PASIEN</strong><br>Nama Pasien<br>Nomor Rekam Medis<br>Tanggal Lahir<br>Alamat<br>No Telp</p><h3 style="text-align:center;"><br><strong>PASIEN DAN/ATAU WALI HUKUM HARUS MEMBACA, MEMAHAMI DAN MENGISI INFORMASI BERIKUT</strong><br>&nbsp;</h3><p><strong>Yang bertanda tangan dibawah ini :</strong><br><strong>Nama : Alamat:</strong><br><strong>No Telp:</strong><br><br>Selaku Pasien/Wali hukum RS XXYY dengan menyatakan persetujuan :</p><h3><br><strong>I. PERSETUJUAN UNTUK PERAWATAN DAN PENGOBATAN</strong></h3><p><br>Saya menyetujui untuk perawatan di Rumah Sakit XXYY sebagai pasien rawat jalan atau rawat inap tergantung kepada kebutuhan medis. Pengobatan dapat meliputi pemeriksaan x-ray/radiology, tes darah, perawatan rutin dan prosedur seperti cairan infus atau suntikan dan evaluasi (contohnya wawancara dan pemeriksaan fisik).<br>Persetujuan yang saya berikan tidak termasuk persetujuan untuk prosedur/tindakan invasif (misalnya, operasi) atau tindakan yang mempunyai resiko tinggi.<br>Jika saya memutuskan untuk menghentikan perawatan medis untuk diri saya sendiri.Saya memahami dan menyadari bahwa Rumah Sakit XXYY atau dokter tidak bertanggung jawab atas hasil yang merugikan Saya.</p>`;
  pdfMake.vfs = customVfs.pdfMake.vfs;

  pdfMake.fonts = {
    Arial: {
      normal: "Arial.ttf",
      bold: "Arial_Bold.ttf",
      italics: "Arial_Italic.ttf",
      bolditalics: "Arial_Bold_Italic.ttf",
    },
  };

  const docDefinition = {
    pageSize: page,
    pageOrientation: orientation,
    defaultStyle: {
      font: "Arial", // Set font default ke Arial
    },
    content: htmlToPdfmake(data),
  };

  return pdfMake.createPdf(docDefinition);
}
