import * as XLSX from "xlsx-js-style";

// STATUS KAMAR
export const downloadExportExcelStatusKamar = async (reportData: any[]) => {
  try {
    if (!reportData || reportData.length === 0) {
      console.error("No data available for export");
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const title = ["LAPORAN STATUS KAMAR"];
    const tanggalExport = [`Tanggal Export: ${formattedDate}`];

    const data: any[] = [];
    data.push({});
    data.push({});
    data.push({});
    data.push({
      No: "No",
      roomClass: "Kelas",
      room: "Room",
      totalPatients: "Jumlah Pasien",
    });

    for (let i = 0; i < reportData.length; i++) {
      data.push({
        No: i + 1,
        roomClass: reportData[i]?.room?.className ?? "-",
        room: reportData[i]?.room?.name ?? "-",
        totalPatients: reportData[i]?.jumlahPasien ?? "-",
      });
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(worksheet, [tanggalExport], { origin: "A2" });
    XLSX.utils.sheet_add_aoa(worksheet, [[""]], { origin: "A3" });

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
    ];
    worksheet["A1"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 14 },
    };
    worksheet["A2"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 11 },
    };
    worksheet["A4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["B4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["C4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["D4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };

    const columnWidths = data.reduce((widths: any, row: any) => {
      Object.keys(row).forEach((key, colIdx) => {
        const cellValue = row[key] ? row[key].toString() : "";
        widths[colIdx] = Math.max(widths[colIdx] || 10, cellValue.length + 2);
      });
      return widths;
    }, []);
    worksheet["!cols"] = columnWidths.map((wch: any) => ({ wch }));
    
    // const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:D1");

    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Status Kamar");
    XLSX.writeFile(workbook, `Laporan Status Kamar.xlsx`);
  } catch (error) {
    console.error("Error exporting Status Kamar", error);
  }
};

// KUNJUNGAN
export const downloadExportExcelKunjungan = async (
  reportData: any[],
  epochToDate: (epoch: number, format?: "none" | "dateTime" | "date" | "time") => string | Date
) => {
  try {
    if (!reportData || reportData.length === 0) {
      console.error("No data available for export");
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const title = ["LAPORAN KUNJUNGAN"];
    const tanggalExport = [`Tanggal : ${formattedDate}`];

    const data: any[] = [];
    data.push({});
    data.push({});
    data.push({});
    data.push({
      No: "No",
      tglRegistrasi: "Tgl. Registrasi",
      noreg: "No. Registrasi",
      jenisKunjungan: "Jenis Kunjungan",
      noRm: "No. RM",
      namaPasien: "Nama Pasien",
      poli: "Poli",
      dokter: "Dokter",
      jenisKelamin: "Jenis Kelamin",
      tglLahir: "Tgl. Lahir",
      umur: "Umur",
      alamat: "Alamat",
      jenisId: "Jenis ID",
      penjamin: "Penjamin",
      noPenjamin: "No. Penjamin",
      noIdentitas: "No. Identitas",
    });

    for (let i = 0; i < reportData.length; i++) {
      const row = reportData[i];
      const patient = row.patient ?? {};
      const insurance = patient.insurance?.[0] ?? {};
      const birthDetail = patient.birthDetail ?? {};

      const umur = `${birthDetail.ageYear ?? 0} Tahun ${birthDetail.ageMonth ?? 0} Bulan ${birthDetail.ageDay ?? 0} Hari`;

      data.push({
        No: i + 1,
        tglRegistrasi: epochToDate(row.tglRegistrasi, "dateTime") ?? "-",
        noreg: row.noreg ?? "-",
        jenisKunjungan: row.jenisKunjungan ?? "-",
        noRm: patient.noRm ?? "-",
        namaPasien: patient.name ?? "-",
        poli: row.polyclinic ?? "-",
        dokter: row.practitioner?.nama ?? "-",
        jenisKelamin: patient.gender === "Male" ? "L" : patient.gender === "Female" ? "P" : "-",
        tglLahir: birthDetail.birthDate.split("T")[0] ?? "-",
        umur: umur,
        alamat: patient.address?.fullAddress ?? "-",
        jenisId: patient.identity ?? "-",
        penjamin: insurance.name ?? "-",
        noPenjamin: insurance.accountNumber ?? "-",
        noIdentitas: patient.noIdentity ?? "-",
      });
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(worksheet, [tanggalExport], { origin: "A2" });

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 15 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 15 } },
    ];

    worksheet["A1"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 14 },
    };
    worksheet["A2"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 11 },
    };
    worksheet["A4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["B4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["C4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["D4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["E4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["F4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["G4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["H4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["I4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["J4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["K4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["L4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["M4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["N4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["O4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["P4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };

    const columnWidths = data.reduce((widths: any, row: any) => {
      Object.keys(row).forEach((key, colIdx) => {
        const cellValue = row[key] ? row[key].toString() : "";
        widths[colIdx] = Math.max(widths[colIdx] || 10, cellValue.length + 2);
      });
      return widths;
    }, []);
    worksheet["!cols"] = columnWidths.map((wch: any) => ({ wch }));

    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:Q1");

    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Kunjungan");
    XLSX.writeFile(workbook, `Laporan Kunjungan.xlsx`);
  } catch (error) {
    console.error("Error exporting Kunjungan", error);
  }
};

// BATAL KUNJUNGAN
export const downloadExportExcelBatalKunjungan = async (
  reportData: any[],
  epochToDate: (epoch: number, format?: "none" | "dateTime" | "date" | "time") => string | Date
) => {
  try {
    if (!reportData || reportData.length === 0) {
      console.error("No data available for export");
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const title = ["LAPORAN BATAL KUNJUNGAN"];
    const tanggalExport = [`Tanggal : ${formattedDate}`];

    const data: any[] = [];
    data.push({});
    data.push({});
    data.push({});
    data.push({
      No: "No",
      tglRegistrasi: "Tgl. Registrasi",
      noreg: "No. Registrasi",
      jenisKunjungan: "Jenis Kunjungan",
      noRm: "No. RM",
      namaPasien: "Nama Pasien",
      tglBatal: "Tgl. Batal",
      petugas: "Petugas",
      poli: "Poli",
      dokter: "Dokter DPJP",
      alasanBatal: "Alasan Batal",
    });

    for (let i = 0; i < reportData.length; i++) {
      const row = reportData[i];
      const patient = row.patient ?? {};

      data.push({
        No: i + 1,
        tglRegistrasi: epochToDate(row.tglRegistrasi, "dateTime") ?? "-",
        noreg: row.noreg ?? "-",
        jenisKunjungan: row.jenisKunjungan ?? "-",
        noRm: patient.noRm ?? "-",
        namaPasien: patient.name ?? "-",
        tglBatal: epochToDate(row.cancelDate, "dateTime") ?? "-",
        petugas: row.practitioner?.nama ?? "-",
        poli: row.polyclinic ?? "-",
        dokter: row.practitioner?.nama ?? "-",
        alasanBatal: row.cancelReason ?? "-",
      });
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(worksheet, [tanggalExport], { origin: "A2" });

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 10 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 10 } },
    ];

    worksheet["A1"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 14 },
    };
    worksheet["A2"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 11 },
    };
    worksheet["A4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["B4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["C4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["D4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["E4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["F4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["G4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["H4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["I4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["J4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    worksheet["K4"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };

    const columnWidths = data.reduce((widths: any, row: any) => {
      Object.keys(row).forEach((key, colIdx) => {
        const cellValue = row[key] ? row[key].toString() : "";
        widths[colIdx] = Math.max(widths[colIdx] || 10, cellValue.length + 2);
      });
      return widths;
    }, []);
    worksheet["!cols"] = columnWidths.map((wch: any) => ({ wch }));

    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:K1");

    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Batal Kunjungan");
    XLSX.writeFile(workbook, `Laporan Batal Kunjungan.xlsx`);
  } catch (error) {
    console.error("Error exporting Batal Kunjungan", error);
  }
};