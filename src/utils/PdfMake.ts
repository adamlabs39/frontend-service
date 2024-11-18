import pdfMake from "pdfmake/build/pdfmake";
import htmlToPdfmake from "html-to-pdfmake";
import { customVfs } from "./customVfs";
import { getDateNow } from "./Helpers";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

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
  patientData,
  familyData,
  page = "A4",
  orientation = "portrait",
}: {
  data: any;
  patientData: any;
  familyData?: any;
  page?: PageSize;
  orientation?: PageOrientation;
}) {
  let values: any = {
    nama: patientData.name,
    alamat: patientData.address.fullAddress,
    umur: `${patientData.birthDetail.ageYear} Tahun, ${patientData.birthDetail.ageMonth} Bulan, ${patientData.birthDetail.ageDay} Hari`,
    // FIXME Dapet dari mana?
    tindakan: "",
    nama_wali: familyData ? familyData.name : "",
    jenis_kelamin_wali: familyData ? familyData.gender : "",
    alamat_wali: familyData ? familyData.address : "",
    hubungan_dengan_pasien: familyData ? familyData.relationship : "",
  };

  data = data.replace(/{{\s*(\w+)\s*}}/g, (match: any, key: any) => {
    return key in values ? values[key] : match;
  });

  pdfMake.vfs = customVfs.pdfMake.vfs;

  pdfMake.fonts = {
    Arial: {
      normal: "Arial.ttf",
      bold: "Arial_Bold.ttf",
      italics: "Arial_Italic.ttf",
      bolditalics: "Arial_Bold_Italic.ttf",
    },
  };

  const localFaskes = JSON.parse(localStorage.getItem('faskes') ?? '')
  const clinicName = localFaskes ? localFaskes.faskesName : 'Klinik ADAMEDS'

  const docDefinition: any = {
    pageSize: page,
    pageOrientation: orientation,
    defaultStyle: {
      font: "Arial", // Set font default ke Arial
    },
    content: [
      htmlToPdfmake(data),
      {
        margin: [0, 10, 0, 10],
        columns: [
          [
            {
              text: "Petugas",
              bold: "true",
              fontSize: 14,
              alignment: "center",
            },
            {
              qr: `Dikeluarkan di ${clinicName}, Ditandatangani secara elektronik oleh Petugas, Pada tanggal ${getDateNow()}`,
              fit: 85,
              alignment: "center",
              margin: [0, 5, 0, 5],
              border: [true, false, true, false],
            },
            {
              text: "Petugas",
              fontSize: 14,
              alignment: "center",
            },
          ],
          {
            width: 50,
            text: "",
          },
          [
            {
              text: familyData ? "Keluarga Pasien" : "Pasien",
              bold: "true",
              fontSize: 14,
              alignment: "center",
            },
            {
              qr: `Dikeluarkan di ${clinicName}, Ditandatangani secara elektronik oleh ${
                familyData ? familyData.name : patientData.name
              }, Pada tanggal ${getDateNow()}`,
              fit: 85,
              alignment: "center",
              margin: [0, 5, 0, 5],
              border: [true, false, true, false],
            },
            {
              text: `${familyData ? familyData.name : patientData.name}`,
              fontSize: 14,
              alignment: "center",
              id: "lastTTD",
            },
          ],
        ],
      },
    ],
  };

  return pdfMake.createPdf(docDefinition);
}
