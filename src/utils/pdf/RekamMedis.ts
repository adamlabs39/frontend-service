import pdfMake from "pdfmake/build/pdfmake";
import type {
  PageOrientation,
  PageSize,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import { customVfs } from "../customVfs";
import { convertImageToBase64, epochToDate, generateQRCode } from "../Helpers";
import { defaultHeader } from "./HeaderPrint";

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
    header: defaultHeader(
      "noRM",
      `SURAT ${type.toUpperCase()} TINDAKAN`,
      faskesLogo,
      faskesProfile,
      data.patientData
    ),
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
                margin: [20, 0, 20, 0],
                alignment: "center",
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        text: `${
                          data.documentData.dokterUuid?.pegawai?.firstTitle &&
                          data.documentData.dokterUuid?.pegawai?.firstTitle !=
                            "-"
                            ? `${data.documentData.dokterUuid?.pegawai?.firstTitle} `
                            : ""
                        }${data.documentData.dokterUuid?.pegawai?.name} ${
                          data.documentData.dokterUuid?.pegawai?.lastTitle &&
                          data.documentData.dokterUuid?.pegawai?.lastTitle !=
                            "-"
                            ? `${data.documentData.dokterUuid?.pegawai?.lastTitle} `
                            : ""
                        }`,
                        marginBottom: 1,
                        border: [false, false, false, true],
                      },
                    ],
                    [
                      {
                        text: `SIP: ${data.documentData.dokterUuid?.sip}`,
                        border: [false, true, false, false],
                      },
                    ],
                  ],
                },
              },
              "",
              {
                margin: [20, 0, 20, 0],
                alignment: "center",
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        text: `${
                          data.documentData.penerima == "pasien"
                            ? data.patientData.patient.name
                            : data.documentData.namaKeluarga
                        }`,
                        marginBottom: 1,
                        border: [false, false, false, true],
                      },
                    ],
                  ],
                },
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
                margin: [20, 0, 20, 0],
                alignment: "center",
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        text: `${data.documentData.saksi1}`,
                        marginBottom: 1,
                        border: [false, false, false, true],
                      },
                    ],
                  ],
                },
              },
              "",
              {
                margin: [20, 0, 20, 0],
                alignment: "center",
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        text: `${data.documentData.saksi2}`,
                        marginBottom: 1,
                        border: [false, false, false, true],
                      },
                    ],
                  ],
                },
              },
            ],
          ],
        },
      },
    ],
  };

  pdfMake.createPdf(docDefinition).open();
}

export async function createResumeMedis({
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
  const pemeriksaanFisikData: any[] = [];
  data.resumeData?.selectedPemeriksaanFisik.forEach(
    (pemeriksaanFisik: any, index: number) => {
      pemeriksaanFisikData.push([
        `${index + 1}`,
        `${
          pemeriksaanFisik.keterangan && pemeriksaanFisik.keterangan != ""
            ? pemeriksaanFisik.keterangan
            : "-"
        }`,
        `${pemeriksaanFisik.organ}`,
      ]);
    }
  );

  const diagnosisData: any[] = [];
  data.resumeData?.selectedDiagnosis.forEach(
    (diagnosis: any, index: number) => {
      diagnosisData.push([
        `${index + 1}`,
        `${diagnosis.diagnosis}`,
        `${diagnosis.tipe}`,
      ]);
    }
  );

  const tindakanData: any[] = [];
  data.resumeData?.selectedTindakan.forEach((tindakan: any, index: number) => {
    tindakanData.push([`${index + 1}`, `${tindakan.namaTindakan}`]);
  });

  const pengobatanData: any[] = [];
  const pengobatanPulangData: any[] = [];
  data.resumeData?.selectedObat.forEach((obat: any) => {
    if (obat.isTakeaway) {
      pengobatanPulangData.push([
        `${pengobatanPulangData.length + 1}`,
        `${obat?.itemMedis?.name}`,
        `${obat?.medicationQty}`,
        `${obat?.aturanPakai?.name}`,
        `${obat?.caraPakai?.caraPakai}`,
      ]);
    } else {
      pengobatanData.push([
        `${pengobatanData.length + 1}`,
        `${obat?.itemMedis?.name}`,
        `${obat?.medicationQty}`,
        `${obat?.aturanPakai?.name}`,
        `${obat?.caraPakai?.caraPakai}`,
      ]);
    }
  });

  const docDefinition: TDocumentDefinitions = {
    pageSize: page,
    pageOrientation: orientation,
    defaultStyle: {
      font: "Arial",
      fontSize: 9,
    },
    header: defaultHeader(
      "resumeMedis",
      "RESUME MEDIS",
      faskesLogo,
      faskesProfile,
      data.patientData,
      data.resumeData
    ),
    pageMargins: [60, 220, 60, 20],
    content: [
      {
        margin: [0, 5, 60, 7.5],
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
      // SECTION DPJP Anamnesis
      {
        margin: [0, 2, 0, 2],
        layout: "noBorders",
        fontSize: 10.5,
        bold: true,
        table: {
          widths: ["auto", 10, "*"],
          body: [
            [
              {
                text: "DPJP",
                fillColor: "#EAECEF",
                bold: true,
                margin: [10, 0, 5, 0],
              },
              "",
              {
                text: `${
                  data.patientData.practitioner?.pegawai?.firstTitle &&
                  data.patientData.practitioner?.pegawai?.firstTitle != "-"
                    ? `${data.patientData.practitioner?.pegawai?.firstTitle} `
                    : ""
                }${data.patientData.practitioner?.pegawai?.name} ${
                  data.patientData.practitioner?.pegawai?.lastTitle &&
                  data.patientData.practitioner?.pegawai?.lastTitle != "-"
                    ? `${data.patientData.practitioner?.pegawai?.lastTitle} `
                    : ""
                }`,
                fillColor: "#EAECEF",
                margin: [10, 0, 0, 0],
              },
            ],
          ],
        },
      },
      {
        margin: [10, 2, 10, 2],
        columns: [
          {
            layout: "noBorders",
            table: {
              widths: [80, 2, "*"],
              body: [
                [
                  {
                    text: "Ringkasan Riwayat Penyakit / Anamnesis",
                    bold: true,
                    decoration: "underline",
                    colSpan: 3,
                  },
                ],
                [
                  {
                    text: `${data.resumeData?.anamnesis}`,
                    colSpan: 3,
                  },
                ],
              ],
            },
            width: "50%",
          },
          {
            layout: "noBorders",
            table: {
              widths: [80, 2, "*"],
              body: [
                [
                  {
                    text: "Keluhan Utama",
                    bold: true,
                    decoration: "underline",
                    colSpan: 3,
                  },
                ],
                [
                  {
                    text: `${data.patientData?.complaint}`,
                    colSpan: 3,
                  },
                ],
              ],
            },
            width: "50%",
          },
        ],
      },
      // !SECTION
      // SECTION Tanda Vital Awal
      {
        margin: [0, 2, 0, 2],
        layout: "noBorders",
        fontSize: 10.5,
        bold: true,
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "TANDA TANDA VITAL (TTV) - KETIKA MASUK",
                fillColor: "#EAECEF",
                margin: [10, 0, 5, 0],
              },
            ],
          ],
        },
      },
      {
        margin: [10, 2, 10, 2],
        columns: [
          {
            layout: "noBorders",
            table: {
              widths: [80, 2, "*"],
              body: [
                [
                  {
                    text: [{ text: "Tekanan Darah", bold: true }],
                  },
                  { text: ":" },
                  {
                    text: `${data.resumeData?.tandaVitalAwal?.tekananDarahSistole}/${data.resumeData?.tandaVitalAwal?.tekananDarahDiastole} mmHg`,
                  },
                ],
                [
                  {
                    text: [{ text: "Frek. Nafas", bold: true }],
                  },
                  { text: ":" },
                  {
                    text: `${data.resumeData?.tandaVitalAwal?.frekuensiNafas} / menit`,
                  },
                ],
              ],
            },
            width: "50%",
          },
          {
            layout: "noBorders",
            table: {
              widths: [80, 2, "*"],
              body: [
                [
                  {
                    text: [{ text: "Frek. Nadi", bold: true }],
                  },
                  { text: ":" },
                  {
                    text: `${data.resumeData?.tandaVitalAwal?.frekuensiNadi} / menit`,
                  },
                ],
                [
                  {
                    text: [{ text: "Suhu", bold: true }],
                  },
                  { text: ":" },
                  {
                    text: `${data.resumeData?.tandaVitalAwal?.suhu} °C`,
                  },
                ],
              ],
            },
            width: "50%",
          },
        ],
      },
      // !SECTION
      // SECTION Tanda Vital Keluar
      {
        margin: [0, 2, 0, 2],
        layout: "noBorders",
        fontSize: 10.5,
        bold: true,
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "TANDA TANDA VITAL (TTV) - KETIKA KELUAR",
                fillColor: "#EAECEF",
                margin: [10, 0, 5, 0],
              },
            ],
          ],
        },
      },
      {
        margin: [10, 2, 10, 2],
        columns: [
          {
            layout: "noBorders",
            table: {
              widths: [80, 2, "*"],
              body: [
                [
                  {
                    text: [{ text: "Tekanan Darah", bold: true }],
                  },
                  { text: ":" },
                  {
                    text: `${data.resumeData?.tandaVitalPulang?.tekananDarahSistole}/${data.resumeData?.tandaVitalPulang?.tekananDarahDiastole} mmHg`,
                  },
                ],
                [
                  {
                    text: [{ text: "Frek. Nafas", bold: true }],
                  },
                  { text: ":" },
                  {
                    text: `${data.resumeData?.tandaVitalPulang?.frekuensiNafas} / menit`,
                  },
                ],
              ],
            },
            width: "50%",
          },
          {
            layout: "noBorders",
            table: {
              widths: [80, 2, "*"],
              body: [
                [
                  {
                    text: [{ text: "Frek. Nadi", bold: true }],
                  },
                  { text: ":" },
                  {
                    text: `${data.resumeData?.tandaVitalPulang?.frekuensiNadi} / menit`,
                  },
                ],
                [
                  {
                    text: [{ text: "Suhu", bold: true }],
                  },
                  { text: ":" },
                  {
                    text: `${data.resumeData?.tandaVitalPulang?.suhu} °C`,
                  },
                ],
              ],
            },
            width: "50%",
          },
        ],
      },
      // !SECTION
      // SECTION Pemeriksaan Fisik
      {
        margin: [0, 2, 0, 2],
        layout: "noBorders",
        fontSize: 10.5,
        bold: true,
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "PEMERIKSAAN FISIK",
                fillColor: "#EAECEF",
                margin: [10, 0, 5, 0],
              },
            ],
          ],
        },
      },
      {
        margin: [10, 2, 10, 2],
        layout: "noBorders",
        table: {
          widths: [20, "*", "*"],
          body: [
            [
              {
                text: "No.",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Hasil Pemeriksaan",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Lokasi Fisik",
                decoration: "underline",
                bold: true,
              },
            ],
            ...pemeriksaanFisikData,
          ],
        },
      },
      // !SECTION
      // SECTION Diagnosa
      {
        margin: [0, 2, 0, 2],
        layout: "noBorders",
        fontSize: 10.5,
        bold: true,
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "DIAGNOSA",
                fillColor: "#EAECEF",
                margin: [10, 0, 5, 0],
              },
            ],
          ],
        },
      },
      {
        margin: [10, 2, 10, 2],
        layout: "noBorders",
        table: {
          widths: [20, "*", 50],
          body: [
            [
              {
                text: "No.",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Nama Diagnosa",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Tipe",
                decoration: "underline",
                bold: true,
              },
            ],
            ...diagnosisData,
          ],
        },
      },
      // !SECTION
      // SECTION Tindakan
      {
        margin: [0, 2, 0, 2],
        layout: "noBorders",
        fontSize: 10.5,
        bold: true,
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "TINDAKAN",
                fillColor: "#EAECEF",
                margin: [10, 0, 5, 0],
              },
            ],
          ],
        },
      },
      {
        margin: [10, 2, 10, 2],
        layout: "noBorders",
        table: {
          widths: [20, "*"],
          body: [
            [
              {
                text: "No.",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Nama Tindakan",
                decoration: "underline",
                bold: true,
              },
            ],
            ...tindakanData,
          ],
        },
      },
      // !SECTION
      // SECTION Pengobatan
      {
        margin: [0, 2, 0, 2],
        layout: "noBorders",
        fontSize: 10.5,
        bold: true,
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "PENGOBATAN",
                fillColor: "#EAECEF",
                margin: [10, 0, 5, 0],
              },
            ],
          ],
        },
      },
      {
        margin: [10, 2, 10, 2],
        layout: "noBorders",
        table: {
          widths: [20, "*", "*", "*", "*"],
          body: [
            [
              {
                text: "No.",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Nama Obat",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Jumlah",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Aturan Pakai",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Cara Pakai",
                decoration: "underline",
                bold: true,
              },
            ],
            ...pengobatanData,
          ],
        },
      },
      // !SECTION
      // SECTION Cara Pulang
      {
        margin: [0, 2, 0, 2],
        layout: "noBorders",
        fontSize: 10.5,
        bold: true,
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "CARA PULANG",
                fillColor: "#EAECEF",
                margin: [10, 0, 5, 0],
              },
            ],
          ],
        },
      },
      {
        margin: [10, 2, 10, 2],
        columns: [
          {
            layout: "noBorders",
            table: {
              widths: [80, 2, "*"],
              body: [
                [
                  {
                    text: "Status Pulang",
                    bold: true,
                    decoration: "underline",
                    colSpan: 3,
                  },
                ],
                [
                  {
                    text: `${data.resumeData?.statusPulangNama?.label}`,
                    colSpan: 3,
                  },
                ],
              ],
            },
            width: "50%",
          },
          {
            layout: "noBorders",
            table: {
              widths: [80, 2, "*"],
              body: [
                [
                  {
                    text: "Kondisi Saat Pulang",
                    bold: true,
                    decoration: "underline",
                    colSpan: 3,
                  },
                ],
                [
                  {
                    text: `${data.resumeData?.kondisiPasienPulangNama?.label}`,
                    colSpan: 3,
                  },
                ],
              ],
            },
            width: "50%",
          },
        ],
      },
      // !SECTION
      // SECTION Pengobatan Pulang
      {
        margin: [0, 2, 0, 2],
        layout: "noBorders",
        fontSize: 10.5,
        bold: true,
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "PENGOBATAN PULANG",
                fillColor: "#EAECEF",
                margin: [10, 0, 5, 0],
              },
            ],
          ],
        },
      },
      {
        margin: [10, 2, 10, 2],
        layout: "noBorders",
        table: {
          widths: [20, "*", "*", "*", "*"],
          body: [
            [
              {
                text: "No.",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Nama Obat",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Jumlah",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Aturan Pakai",
                decoration: "underline",
                bold: true,
              },
              {
                text: "Cara Pakai",
                decoration: "underline",
                bold: true,
              },
            ],
            ...pengobatanPulangData,
          ],
        },
      },
      // !SECTION
      // SECTION Edukasi
      {
        margin: [0, 2, 0, 2],
        layout: "noBorders",
        fontSize: 10.5,
        bold: true,
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "EDUKASI",
                fillColor: "#EAECEF",
                margin: [10, 0, 5, 0],
              },
            ],
          ],
        },
      },
      {
        margin: [10, 2, 10, 2],
        columns: [
          {
            layout: "noBorders",
            table: {
              widths: [80, 2, "*"],
              body: [
                [
                  {
                    text: `${data.resumeData.edukasiName?.label}`,
                    bold: true,
                    decoration: "underline",
                    colSpan: 3,
                  },
                ],
                [
                  {
                    text: `${data.resumeData.edukasiText}`,
                    colSpan: 3,
                  },
                ],
              ],
            },
            width: "100%",
          },
        ],
      },
      // !SECTION
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
                text: `${faskesProfile?.address?.city}, ${
                  data.resumeData?.dischargeDate
                    ? epochToDate(data.resumeData.dischargeDate, "date")
                    : "-"
                }`,
                bold: true,
              },
            ],
            [
              {
                text: "Pasien",
                bold: true,
              },
              "",
              {
                text: "Dokter Penanggung Jawab",
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
                    data.patientData.patient.name
                  }, Pada tanggal ${
                    data.resumeData?.dischargeDate
                      ? epochToDate(data.resumeData.dischargeDate, "date")
                      : "-"
                  }`
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
                  }, Ditandatangani secara elektronik oleh ${`${
                    data.patientData.practitioner?.pegawai?.firstTitle &&
                    data.patientData.practitioner?.pegawai?.firstTitle != "-"
                      ? `${data.patientData.practitioner?.pegawai?.firstTitle} `
                      : ""
                  }${data.patientData.practitioner?.pegawai?.name} ${
                    data.patientData.practitioner?.pegawai?.lastTitle &&
                    data.patientData.practitioner?.pegawai?.lastTitle != "-"
                      ? `${data.patientData.practitioner?.pegawai?.lastTitle} `
                      : ""
                  }`}, Pada tanggal ${
                    data.resumeData?.dischargeDate
                      ? epochToDate(data.resumeData.dischargeDate, "date")
                      : "-"
                  }`
                ),
                width: 80,
                height: 80,
                fit: [80, 80],
              },
            ],
            [
              {
                margin: [20, 0, 20, 0],
                alignment: "center",
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        text: `${data.patientData.patient.name}`,
                        marginBottom: 1,
                        border: [false, false, false, true],
                      },
                    ],
                  ],
                },
              },
              "",
              {
                margin: [20, 0, 20, 0],
                alignment: "center",
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        text: `${
                          data.patientData.practitioner?.pegawai?.firstTitle &&
                          data.patientData.practitioner?.pegawai?.firstTitle !=
                            "-"
                            ? `${data.patientData.practitioner?.pegawai?.firstTitle} `
                            : ""
                        }${data.patientData.practitioner?.pegawai?.name} ${
                          data.patientData.practitioner?.pegawai?.lastTitle &&
                          data.patientData.practitioner?.pegawai?.lastTitle !=
                            "-"
                            ? `${data.patientData.practitioner?.pegawai?.lastTitle} `
                            : ""
                        }`,
                        marginBottom: 1,
                        border: [false, false, false, true],
                      },
                    ],
                    [
                      {
                        text: `SIP: ${data.patientData.practitioner?.sip}`,
                        border: [false, true, false, false],
                      },
                    ],
                  ],
                },
              },
            ],
          ],
        },
      },
    ],
  };

  pdfMake.createPdf(docDefinition).open();
}
