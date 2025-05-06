import pdfMake from "pdfmake/build/pdfmake";
import type {
  PageOrientation,
  PageSize,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import { customVfs } from "../customVfs";
import { convertImageToBase64, epochToDate, generateQRCode } from "../Helpers";

export async function createSuratPersetujuanTindakan({
  data,
  page = "A4",
  orientation = "portrait",
  type = "Persetujuan",
}: {
  data: any;
  page?: PageSize;
  orientation?: PageOrientation;
  type?: "Persetujuan" | "Penolakan";
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

  const faskesProfile = JSON.parse(
    localStorage.getItem("faskes_profile") ?? "{}"
  );
  let faskesLogo = "";
  if (faskesProfile.logo) {
    faskesLogo = faskesProfile.logo;
  } else {
    faskesLogo = await convertImageToBase64(
      "/src/assets/images/adameds-square.png"
    );
  }

  const docDefinition: TDocumentDefinitions = {
    pageSize: page,
    pageOrientation: orientation,
    defaultStyle: {
      font: "Arial",
      fontSize: 9,
    },
    header: {
      margin: [60, 0, 60, 0],
      stack: [
        {
          margin: [30, 20, 30, 0],
          columns: [
            {
              image: faskesLogo,
              fit: [100, 45],
            },
            {
              alignment: "center",
              stack: [
                {
                  text: faskesProfile.name,
                  fontSize: 15,
                  bold: true,
                  marginBottom: 2,
                },
                { text: faskesProfile.address.fullAddress, marginBottom: 2 },
                { text: `${faskesProfile.phone} - ${faskesProfile.email}` },
              ],
              width: "*",
            },
          ],
        },
        {
          marginTop: 10.5,
          alignment: "center",
          bold: true,
          layout: "noBorders",
          table: {
            widths: ["*"],
            body: [
              [
                {
                  text: `SURAT ${type.toUpperCase()} TINDAKAN`,
                  fontSize: 15,
                  color: "white",
                  fillColor: "#14B8A6",
                },
              ],
              [
                {
                  text: `RM. ${data.patientData.noRm}`,
                  fillColor: "#EAECEF",
                },
              ],
            ],
          },
        },
      ],
    },
    pageMargins: [60, 115, 60, 0],
    content: [
      {
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          paddingTop: () => 5,
          paddingBottom: () => 5,
        },
        table: {
          widths: [100, "auto", "*"],
          body: [
            [
              "Dokter Pelaksana",
              ":",
              {
                text: `${
                  data.documentData.dokterUuid?.pegawai?.firstTitle &&
                  data.documentData.dokterUuid?.pegawai?.firstTitle != "-"
                    ? `${data.documentData.dokterUuid?.pegawai?.firstTitle} `
                    : ""
                }${data.documentData.dokterUuid?.pegawai?.name} ${
                  data.documentData.dokterUuid?.pegawai?.lastTitle &&
                  data.documentData.dokterUuid?.pegawai?.lastTitle != "-"
                    ? `${data.documentData.dokterUuid?.pegawai?.lastTitle} `
                    : ""
                }`,
                bold: true,
              },
            ],
            [
              "Pemberi Informasi",
              ":",
              { text: data.documentData.pemberiInformasi, bold: true },
            ],
            [
              "Penerima Informasi",
              ":",
              {
                text:
                  data.documentData.penerima == "pasien"
                    ? data.patientData.patient.name
                    : data.documentData.namaKeluarga,
                bold: true,
              },
            ],
          ],
        },
      },
      {
        margin: [0, 2, 0, 2],
        layout: "noBorders",
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "INFORMASI TINDAKAN",
                fillColor: "#EAECEF",
                bold: true,
                margin: [5, 0, 5, 0],
              },
            ],
          ],
        },
      },
      {
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          paddingTop: () => 5,
          paddingBottom: () => 5,
        },
        table: {
          widths: [100, "auto", "*"],
          body: [
            ["Diagnosis (WD & DD)", ":", { text: data.documentData.diagnosis }],
            [
              "Dasar Diagnosis",
              ":",
              { text: data.documentData.dasarDiagnosis },
            ],
            [
              "Tindakan Kedokteran",
              ":",
              { text: data.documentData.tindakanKedokteran },
            ],
            [
              "Indikasi Tindakan",
              ":",
              { text: data.documentData.indikasiTindakan },
            ],
            ["Tata Cara", ":", { text: data.documentData.tatacaraTindakan }],
            ["Tujuan", ":", { text: data.documentData.tujuanTindakan }],
            ["Risiko", ":", { text: data.documentData.risikoTindakan }],
            ["Komplikasi", ":", { text: data.documentData.komplikasi }],
            ["Prognosis", ":", { text: data.documentData.prognosis }],
            [
              "Alternatif & Risiko",
              ":",
              { text: data.documentData.alaternatif },
            ],
            ["Lain-lain", ":", { text: data.documentData.lainnya }],
          ],
        },
      },
      {
        margin: [0, 7.5, 0, 7.5],
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 1,
            x2: 475,
            y2: 1,
            lineWidth: 1,
            lineColor: "black",
          },
        ],
      },
      {
        layout: "noBorders",
        table: {
          widths: ["*", 100],
          body: [
            [
              {
                text: "Dengan ini menyatakan bahwa saya telah menerangkan hal-hal di atas secara benar dan jujur dan memberikan kesempatan untuk bertanya dan/atau berdiskusi.",
              },
              {
                stack: [
                  {
                    text: "Pemberi Informasi",
                    bold: true,
                    alignment: "center",
                  },
                  {
                    alignment: "center",
                    image: await generateQRCode(
                      `Dikeluarkan di ${
                        faskesProfile.name
                      }, Ditandatangani secara elektronik oleh ${
                        data.documentData.pemberiInformasi
                      }, Pada tanggal ${epochToDate(
                        data.documentData.tglPersetujuan,
                        "dateTime"
                      )}`
                    ),
                    width: 40,
                    height: 40,
                    fit: [40, 40],
                  },
                ],
              },
            ],
          ],
        },
      },
      {
        marginTop: 30,
        layout: "noBorders",
        table: {
          widths: ["*", 100],
          body: [
            [
              {
                text: "Dengan ini menyatakan bahwa saya telah menerima informasi sebagaimana di atas yang saya beri tanda/paraf di kolom kanannya, dan telah memahaminya.",
              },
              {
                stack: [
                  {
                    text: "Penerima Informasi",
                    bold: true,
                    alignment: "center",
                  },
                  {
                    alignment: "center",
                    image: await generateQRCode(
                      `Dikeluarkan di ${
                        faskesProfile.name
                      }, Ditandatangani secara elektronik oleh ${
                        data.documentData.penerima == "pasien"
                          ? data.patientData.patient.name
                          : data.documentData.namaKeluarga
                      }, Pada tanggal ${epochToDate(
                        data.documentData.tglPersetujuan,
                        "dateTime"
                      )}`
                    ),
                    width: 40,
                    height: 40,
                    fit: [40, 40],
                  },
                ],
              },
            ],
          ],
        },
      },
      {
        pageBreak: "before",
        margin: [0, 2, 0, 2],
        layout: "noBorders",
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "PERSETUJUAN TINDAKAN KEDOKTERAN",
                fillColor: "#EAECEF",
                bold: true,
                margin: [5, 0, 5, 0],
              },
            ],
          ],
        },
      },
      {
        margin: [0, 4, 0, 20],
        text: [
          "Yang bertandatangan di bawah ini, ",
          {
            text: `${
              data.documentData.penerima == "pasien"
                ? data.patientData.patient.name
                : data.documentData.namaKeluarga
            }`,
            bold: true,
          },
          `, ${
            data.documentData.penerima == "pasien"
              ? data.patientData.patient.gender.toLowerCase() == "male"
                ? "Laki-laki"
                : "Perempuan"
              : data.patientData.patient.gender
          }, ${
            data.documentData.penerima == "pasien"
              ? data.patientData.address.fullAddress
              : data.patientData.patient.address.fullAddress
          }. `,
          `Dengan ini menyatakan ${type.toUpperCase()} untuk dilakukannya tindakan `,
          { text: `${data.documentData.tindakanKedokteran}, `, bold: true },
          "pasien (",
          `(${data.documentData.hubunganKeluarga}) bernama`,
          { text: ` ${data.patientData.patient.name}`, bold: true },
          `, ${data.patientData.patient.birthDetail.ageYear}Th ${
            data.patientData.patient.birthDetail.ageMonth
          }Bl ${data.patientData.patient.birthDetail.ageDay}Hr, ${
            data.patientData.patient.gender.toLowerCase() == "male"
              ? "Laki-laki"
              : "Perempuan"
          }, ${data.patientData.patient.address.fullAddress}.)`,
        ],
      },
      "Saya memahami perlunya dan manfaat tindakan tersebut sebagaimana telah dijelaskan seperti di atas kepada saya, termasuk risiko dan komplikasi yang mungkin timbul. Saya juga menyadari bahwa oleh karena ilmu kedokteran bukanlah ilmu pasti, maka keberhasilan tindakan kedokteran bukanlah keniscayaan, melainkan sangat bergantung kepada izin Tuhan Yang Maha Esa.",
      {
        layout: "noBorders",
        marginTop: 45,
        alignment: "center",
        table: {
          widths: ["*", 100, "*"],
          body: [
            [
              "",
              "",
              {
                text: `${epochToDate(
                  data.documentData.tglPersetujuan,
                  "dateTime"
                )}`,
                bold: true,
              },
            ],
            [
              {
                text: "Dokter",
                bold: true,
              },
              "",
              {
                text: "Penerima Informasi",
                bold: true,
              },
            ],
            [
              {
                alignment: "center",
                image: await generateQRCode(
                  `Dikeluarkan di ${
                    faskesProfile.name
                  }, Ditandatangani secara elektronik oleh ${`${
                    data.documentData.dokterUuid?.pegawai?.firstTitle &&
                    data.documentData.dokterUuid?.pegawai?.firstTitle != "-"
                      ? `${data.documentData.dokterUuid?.pegawai?.firstTitle} `
                      : ""
                  }${data.documentData.dokterUuid?.pegawai?.name} ${
                    data.documentData.dokterUuid?.pegawai?.lastTitle &&
                    data.documentData.dokterUuid?.pegawai?.lastTitle != "-"
                      ? `${data.documentData.dokterUuid?.pegawai?.lastTitle} `
                      : ""
                  }`}, Pada tanggal ${epochToDate(
                    data.documentData.tglPersetujuan,
                    "dateTime"
                  )}`
                ),
                width: 80,
                height: 80,
                fit: [80, 80],
              },
              "",
              {
                alignment: "center",
                image: await generateQRCode(
                  `Dikeluarkan di ${
                    faskesProfile.name
                  }, Ditandatangani secara elektronik oleh ${
                    data.documentData.penerima == "pasien"
                      ? data.patientData.patient.name
                      : data.documentData.namaKeluarga
                  }, Pada tanggal ${epochToDate(
                    data.documentData.tglPersetujuan,
                    "dateTime"
                  )}`
                ),
                width: 80,
                height: 80,
                fit: [80, 80],
              },
            ],
            [
              {
                stack: [
                  {
                    text: `${
                      data.documentData.dokterUuid?.pegawai?.firstTitle &&
                      data.documentData.dokterUuid?.pegawai?.firstTitle != "-"
                        ? `${data.documentData.dokterUuid?.pegawai?.firstTitle} `
                        : ""
                    }${data.documentData.dokterUuid?.pegawai?.name} ${
                      data.documentData.dokterUuid?.pegawai?.lastTitle &&
                      data.documentData.dokterUuid?.pegawai?.lastTitle != "-"
                        ? `${data.documentData.dokterUuid?.pegawai?.lastTitle} `
                        : ""
                    }`,
                    decoration: "underline",
                    marginBottom: 1,
                  },
                  `SIP: ${data.documentData.dokterUuid?.sip}`,
                ],
              },
              "",
              {
                text: `${
                  data.documentData.penerima == "pasien"
                    ? data.patientData.patient.name
                    : data.documentData.namaKeluarga
                }`,
                decoration: "underline",
              },
            ],
          ],
        },
      },
      {
        layout: "noBorders",
        marginTop: 30,
        alignment: "center",
        table: {
          widths: ["*", 100, "*"],
          body: [
            [
              {
                text: "Saksi 1",
                bold: true,
              },
              "",
              {
                text: "Saksi 2",
                bold: true,
              },
            ],
            [
              {
                alignment: "center",
                image: await generateQRCode(
                  `Dikeluarkan di ${
                    faskesProfile.name
                  }, Ditandatangani secara elektronik oleh ${
                    data.documentData.saksi1
                  }, Pada tanggal ${epochToDate(
                    data.documentData.tglPersetujuan,
                    "dateTime"
                  )}`
                ),
                width: 80,
                height: 80,
                fit: [80, 80],
              },
              "",
              {
                alignment: "center",
                image: await generateQRCode(
                  `Dikeluarkan di ${
                    faskesProfile.name
                  }, Ditandatangani secara elektronik oleh ${
                    data.documentData.saksi2
                  }, Pada tanggal ${epochToDate(
                    data.documentData.tglPersetujuan,
                    "dateTime"
                  )}`
                ),
                width: 80,
                height: 80,
                fit: [80, 80],
              },
            ],
            [
              {
                text: `${data.documentData.saksi1}`,
                decoration: "underline",
              },
              "",
              {
                text: `${data.documentData.saksi2}`,
                decoration: "underline",
              },
            ],
          ],
        },
      },
    ],
  };

  pdfMake.createPdf(docDefinition).open();
}
