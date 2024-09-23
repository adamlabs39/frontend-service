import pdfMake from "pdfmake/build/pdfmake";
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
      font: 'Arial', // Set font default ke Arial
    },
    content: [{ text: "Hello, PDFMake!", fontSize: 15, font: 'Arial' }],
  };

  pdfMake.createPdf(docDefinition).download("Test");
}
