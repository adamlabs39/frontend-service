import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
  const docDefinition = {
    pageSize: page,
    pageOrientation: orientation,
    content: [{ text: "Hello, PDFMake!", fontSize: 15 }],
  };

  pdfMake.createPdf(docDefinition).download('Test');
}
