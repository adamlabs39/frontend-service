import { epochToDate, formatStringDate } from "../Helpers";

export function defaultHeader(
  type: "noRM" | "invoice" | "resumeMedis" | "noSurat",
  title: string,
  faskesLogo: string,
  faskesProfile: any,
  patientData: any,
  resumeData?: any
) {
  return {
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
                text: faskesProfile?.name,
                fontSize: 15,
                bold: true,
                marginBottom: 2,
              },
              {
                text: faskesProfile?.address?.fullAddress ?? "Jl. Adameds",
                marginBottom: 2,
              },
              {
                text: `${faskesProfile?.phone ?? "0812345678910"} - ${faskesProfile?.email ?? "adameds@gmail.com"
                  }`,
              },
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
                text: title ?? "Judul Surat",
                fontSize: 15,
                color: "white",
                fillColor: "#14B8A6",
              },
            ],
            type == "noRM"
              ? [
                {
                  text: `RM. ${patientData.noRm}`,
                  fillColor: "#EAECEF",
                },
              ]
              : type == "invoice"
                ? [
                  {
                    text: `No. ${patientData.invoiceCode}`, 
                    fillColor: "#A7F3D0", 
                  },
                ]
                : [""],
          ],
        },
      },
      type == "resumeMedis"
        ? {
          margin: [0, 2, 0, 2],
          layout: "noBorders",
          fontSize: 13.5,
          table: {
            widths: ["auto", 10, "*"],
            body: [
              [
                {
                  text: "PASIEN",
                  fillColor: "#EAECEF",
                  bold: true,
                  margin: [10, 3, 5, 0],
                },
                "",
                {
                  table: {
                    widths: ["*", "auto"],
                    body: [
                      [
                        {
                          text: patientData?.patient?.name,
                          border: [false, false, false, false],
                        },
                        {
                          text: `RM. ${patientData?.noRm}`,
                          alignment: "right",
                          border: [true, false, false, false],
                          margin: [5, 0, 0, 0],
                        },
                      ],
                    ],
                  },
                  fillColor: "#EAECEF",
                  bold: true,
                  margin: [5, 0, 5, 0],
                },
              ],
            ],
          },
        }
        : "",
      type == "resumeMedis"
        ? {
          margin: [0, 2, 0, 2],
          columns: [
            {
              layout: "noBorders",
              table: {
                widths: [80, 2, "*"],
                body: [
                  [
                    {
                      text: [{ text: "Tgl. Lahir / Umur", bold: true }],
                    },
                    { text: ":" },
                    {
                      text: `${formatStringDate(
                        patientData?.patient?.birthDetail?.birthDate
                      )} / ${patientData?.patient?.birthDetail?.ageYear
                        } Tahun`,
                    },
                  ],
                  [
                    {
                      text: [{ text: "Jenis Kelamin", bold: true }],
                    },
                    { text: ":" },
                    {
                      text: `${patientData?.patient?.gender == "Male"
                          ? "Laki-laki"
                          : "Perempuan"
                        }`,
                    },
                  ],
                  [
                    {
                      text: "Alamat",
                      bold: true,
                      decoration: "underline",
                      colSpan: 3,
                    },
                  ],
                  [
                    {
                      text: `${patientData?.patient?.address?.fullAddress}`,
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
                      text: [{ text: "Tgl. Masuk", bold: true }],
                    },
                    { text: ":" },
                    {
                      text: `${epochToDate(
                        patientData?.tanggalDirawat,
                        "date"
                      )}`,
                    },
                  ],
                  [
                    {
                      text: [{ text: "Tgl. Keluar", bold: true }],
                    },
                    { text: ":" },
                    {
                      text: `${resumeData?.dischargeDate
                          ? epochToDate(resumeData.dischargeDate, "date")
                          : "-"
                        }`,
                    },
                  ],
                  [
                    {
                      text: [{ text: "Kunjungan", bold: true }],
                    },
                    { text: ":" },
                    { text: `${patientData?.jenisPelayanan}` },
                  ],
                  [
                    {
                      text: [{ text: "Pembayaran", bold: true }],
                    },
                    { text: ":" },
                    {
                      text: `${patientData?.paymentMethod == 1
                          ? "Tunai"
                          : "Non Tunai"
                        }`,
                    },
                  ],
                  [
                    {
                      text: [{ text: "Penjamin", bold: true }],
                    },
                    { text: ":" },
                    {
                      text: `${patientData?.paymentMethod == 1
                          ? "-"
                          : patientData?.insurance?.name
                        }`,
                    },
                  ],
                ],
              },
              width: "50%",
            },
          ],
        }
        : "",
    ],
  } as any;
}
