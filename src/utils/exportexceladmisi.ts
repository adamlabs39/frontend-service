import * as XLSX from "xlsx-js-style";
import { epochToDate } from "./Helpers";
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

// KEPERAWATAN INAP PASIEN
export const downloadExportExcelKeperawatanInapPasien = async (
  reportData: any[],
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

    const title = ["LAPORAN KEPERAWATAN INAP PASIEN"];
    const tanggalExport = [`Tanggal : ${formattedDate}`];

    const data: any[] = [];
    // menambahkan baris kosong untuk spacing
    data.push({});
    data.push({});
    data.push({});

    // header kolom sesuai DataTable
    data.push({
      No: "No.",
      noRm: "No. RM",
      ruangan: "Ruangan",
      kelas: "Kelas",
      noBed: "No. Bed",
      tglMasuk: "Tgl. Masuk",
      tglKeluar: "Tgl. Keluar",
    });

    for (let i = 0; i < reportData.length; i++) {
      const row = reportData[i];
      data.push({
        No: i + 1,
        noRm: row.noRm ?? "-",
        ruangan: row.monitoringRoom?.room ?? "-",
        kelas: row.monitoringRoom?.roomClass ?? "-",
        noBed: row.monitoringRoom?.noBed ?? "-",
        tglMasuk: row.tanggalDirawat ? epochToDate(row.tanggalDirawat, "dateTime") : "-",
        tglKeluar: row.dischargeDate ? epochToDate(row.dischargeDate, "dateTime") : "-",
      });
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(worksheet, [tanggalExport], { origin: "A2" });

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } },
    ];

    worksheet["A1"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 14 },
    };
    worksheet["A2"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 11 },
    };

    // Styling header baris ke 4 (baris header kolom)
    const headerRow = 4;
    const columnsCount = 7; // No sampai tglKeluar

    for (let col = 0; col < columnsCount; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: headerRow - 1, c: col });
      worksheet[cellAddress].s = {
        alignment: { horizontal: "center", vertical: "center" },
        font: { bold: true },
      };
    }

    // Atur lebar kolom otomatis berdasar isi data
    const columnWidths = data.reduce((widths: any[], row: any) => {
      Object.keys(row).forEach((key, colIdx) => {
        const cellValue = row[key] ? row[key].toString() : "";
        widths[colIdx] = Math.max(widths[colIdx] || 10, cellValue.length + 2);
      });
      return widths;
    }, []);
    worksheet["!cols"] = columnWidths.map((wch: number) => ({ wch }));

    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Keperawatan Inap");
    XLSX.writeFile(workbook, `Laporan Keperawatan Inap Pasien.xlsx`);
  } catch (error) {
    console.error("Error exporting Keperawatan Inap Pasien", error);
  }
};

// BAYI BARU LAHIR
export const downloadExportExcelBayiBaruLahir = async (
  reportData: any[],
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

    const title = ["LAPORAN BAYI BARU LAHIR"];
    const tanggalExport = [`Tanggal : ${formattedDate}`];

    const data: any[] = [];
    // Spasi awal
    data.push({});
    data.push({});
    data.push({});

    // Header utama (baris ke-4)
    data.push({
      No: "No.",
      tglRegistrasi: "Tgl. Registrasi",
      noRmBaby: "No. RM",
      nameBaby: "Nama Bayi",
      birthDate: "Tgl. Lahir",
      birthTimeBaby: "Jam Lahir",
      genderBaby: "Jenis Kelamin",
      birthPlace: "Tempat Lahir",
      identitasIbu: "Identitas Ibu",
      namaIbu: "Nama Ibu",
    });

    for (let i = 0; i < reportData.length; i++) {
      const row = reportData[i];
      const birthDetail = row.birthDetail ?? {};

      // Ubah bagian tglRegistrasi agar hanya tanggal tanpa jam
      let tglRegistrasiStr = "-";
      if (typeof row.tanggalDaftar === "string") {
        tglRegistrasiStr = row.tanggalDaftar.split("T")[0];
      } else if (typeof row.tanggalDaftar === "number") {
        tglRegistrasiStr = epochToDate(row.tanggalDaftar, "date") as string;
      }

      data.push({
        No: i + 1,
        tglRegistrasi: tglRegistrasiStr,
        noRmBaby: row.noRmBaby ?? "-",
        nameBaby: row.nameBaby ?? "-",
        birthDate: birthDetail.birthDate ? birthDetail.birthDate.split("T")[0] : "-",
        birthTimeBaby: row.birthTimeBaby ?? "-",
        genderBaby: row.genderBaby === "Male" ? "L" : row.genderBaby === "Female" ? "P" : "-",
        birthPlace: birthDetail.birthPlace ?? "-",
        identitasIbu: row.nameMom ?? "-",  // asumsi nameMom = identitas ibu (sesuaikan jika beda)
        namaIbu: row.nameMom ?? "-",       // field ini sama dengan identitas ibu dari kode aslinya
      });
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(worksheet, [tanggalExport], { origin: "A2" });

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }, // merge title sampai kolom J
      { s: { r: 1, c: 0 }, e: { r: 1, c: 9 } }, // merge tanggal export
    ];

    worksheet["A1"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 14 },
    };
    worksheet["A2"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 11 },
    };

    // Styling header baris ke 4 (index 3)
    const headerRow = 4;
    const columnsCount = 10;

    for (let col = 0; col < columnsCount; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: headerRow - 1, c: col });
      worksheet[cellAddress].s = {
        alignment: { horizontal: "center", vertical: "center" },
        font: { bold: true },
      };
    }

    // Atur lebar kolom otomatis
    const columnWidths = data.reduce((widths: any[], row: any) => {
      Object.keys(row).forEach((key, colIdx) => {
        const cellValue = row[key] ? row[key].toString() : "";
        widths[colIdx] = Math.max(widths[colIdx] || 10, cellValue.length + 2);
      });
      return widths;
    }, []);
    worksheet["!cols"] = columnWidths.map((wch: number) => ({ wch }));

    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Bayi Baru Lahir");
    XLSX.writeFile(workbook, `Laporan Bayi Baru Lahir.xlsx`);
  } catch (error) {
    console.error("Error exporting Bayi Baru Lahir", error);
  }
};