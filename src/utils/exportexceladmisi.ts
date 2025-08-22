import * as XLSX from "xlsx-js-style";
import { epochToDate } from "./Helpers";
import axios from "axios";
import { utilsStore } from "@/stores/utils";

// STATUS KAMAR
export const downloadExportExcelStatusKamar = async (filter?: any) => {
  try {
    const token = localStorage.getItem("access_token");
    const apiUrl = `${import.meta.env.VITE_BASE_ADMISI}/export/status-kamar`;

    const response = await axios.get(apiUrl, {
      params: filter,
      headers: {
        Authorization: token,
      },
    });

    const reportData = response.data.payload;

    if (!reportData || reportData.length === 0) {
      alert("Tidak ada data untuk diekspor sesuai filter yang dipilih.");
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
      const row = reportData[i];
      const room = row.room ?? {};

      data.push({
        No: i + 1,
        // Asumsi nama properti dari API menggunakan snake_case
        roomClass: room.class_name ?? "-",
        room: room.name ?? "-",
        totalPatients: row.jumlahPasien ?? "-",
      });
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(worksheet, [tanggalExport], { origin: "A2" });
    
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

    const headerStyle = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    const headers = ["A4", "B4", "C4", "D4"];
    headers.forEach(header => {
      if (worksheet[header]) {
        worksheet[header].s = headerStyle;
      }
    });

    const columnWidths = data.reduce((widths: any, row: any) => {
      Object.keys(row).forEach((key, colIdx) => {
        const cellValue = row[key] ? row[key].toString() : "";
        widths[colIdx] = Math.max(widths[colIdx] || 10, cellValue.length + 2);
      });
      return widths;
    }, []);
    worksheet["!cols"] = columnWidths.map((wch: any) => ({ wch }));

    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Status Kamar");
    XLSX.writeFile(workbook, `Laporan Status Kamar.xlsx`);
  } catch (error) {
    console.error("Error exporting Status Kamar", error);
    alert("Gagal mengekspor data Status Kamar. Silakan cek konsol untuk detail.");
  }
};

// KUNJUNGAN
export const downloadExportExcelKunjungan = async (
  filter?: any
  ) => {
    try {
      const token = localStorage.getItem("access_token");
      const apiUrl = `${import.meta.env.VITE_BASE_ADMISI}/export/kunjungan`;

      const response = await axios.get(apiUrl, {
        params: filter,
        headers: {
          Authorization: token,
        },
      });

      const reportData = response.data.payload;

      if (!reportData || reportData.length === 0) {
        alert("Tidak ada data untuk diekspor sesuai filter yang dipilih.");
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
        tglRegistrasi: "Tanggal Registrasi",
        jenisKunjungan: "Jenis Kunjungan",
        noreg: "No. Registrasi",
        noRm: "No. RM",
        namaPasien: "Nama Pasien",
        jenisKelamin: "Jenis Kelamin",
        tglLahir: "Tanggal Lahir",
        umur: "Umur",
        alamat: "Alamat",
        jenisId: "Jenis Identitas",
        noIdentitas: "No. Identitas",
        dokter: "Dokter",
        poli: "Poli",
        penjamin: "Penjamin",
        noPenjamin: "No. Penjamin",
      });

      for (let i = 0; i < reportData.length; i++) {
        const row = reportData[i];
        try {
          const patient = row.patient ?? {};
          const insurance = patient.insurance?.[0] ?? {};
          const birthDetail = patient.birth_detail ?? {};
          const address = patient.address ?? {};

          const umur = `${birthDetail.age_year ?? 0} Tahun ${birthDetail.age_month ?? 0} Bulan ${birthDetail.age_day ?? 0} Hari`;

          data.push({
            No: i + 1,
            tglRegistrasi: epochToDate(row.tgl_registrasi, "dateTime"),
            jenisKunjungan: row.jenis_kunjungan ?? "-",
            noreg: row.noreg ?? "-",
            noRm: patient.no_rm ?? "-",
            namaPasien: patient.name ?? "-",
            jenisKelamin: patient.gender === "Male" ? "L" : patient.gender === "Female" ? "P" : "-",
            tglLahir: birthDetail.birth_date?.split("T")[0] ?? "-",
            umur: umur,
            alamat: address.full_address ?? "-",
            jenisId: patient.identity ?? "-",
            noIdentitas: patient.no_identity ?? "-",
            dokter: row.practitioner?.pegawai?.nama ?? "-",
            poli: row.lokasi?.name ?? "-",
            penjamin: insurance.name ?? "-",
            noPenjamin: insurance.accountNumber ?? "-",
          });
        } catch (error) {
          console.error(`Gagal memproses baris data ke-${i}:`, row);
          console.error("Pesan Error:", error);
          data.push({ No: i + 1, tglRegistrasi: "DATA ERROR", noreg: row.noreg });
        }
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

      const headerStyle = {
        alignment: { horizontal: "center", vertical: "center" },
        font: { bold: true },
      };
      const headers = ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4", "J4", "K4", "L4", "M4", "N4", "O4", "P4"];
      headers.forEach(header => {
        if (worksheet[header]) {
          worksheet[header].s = headerStyle;
        }
      });

      const columnWidths = data.reduce((widths: any, row: any) => {
        Object.keys(row).forEach((key, colIdx) => {
          const cellValue = row[key] ? row[key].toString() : "";
          widths[colIdx] = Math.max(widths[colIdx] || 10, cellValue.length + 2);
        });
        return widths;
      }, []);
      worksheet["!cols"] = columnWidths.map((wch: any) => ({ wch }));

      XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Kunjungan");
      XLSX.writeFile(workbook, `Laporan Kunjungan.xlsx`);
    } catch (error) {
      console.error("Error exporting Kunjungan", error);
      alert("Gagal mengekspor data. Silakan cek konsol untuk detail.");
    }
};

// BATAL KUNJUNGAN
export const downloadExportExcelBatalKunjungan = async (
  filter?: any
) => {
  try {
    const token = localStorage.getItem("access_token");
    const apiUrl = `${import.meta.env.VITE_BASE_ADMISI}/export/batal-kunjungan`;

    const response = await axios.get(apiUrl, {
      params: filter,
      headers: {
        Authorization: token,
      },
    });

    const reportData = response.data.payload;

    if (!reportData || reportData.length === 0) {
      alert("Tidak ada data untuk diekspor sesuai filter yang dipilih.");
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
      tglRegistrasi: "Tanggal Registrasi",
      jenisKunjungan: "Jenis Kunjungan",
      noreg: "No. Registrasi",
      noRm: "No. RM",
      namaPasien: "Nama Pasien",
      poli: "Poliklinik",
      dokter: "Dokter DPJP",
      tglBatal: "Tanggal Batal",
      petugas: "Petugas",
      alasanBatal: "Alasan Batal",
    });

    for (let i = 0; i < reportData.length; i++) {
      const row = reportData[i];
      const patient = row.patient ?? {};
      
      data.push({
        No: i + 1,
        tglRegistrasi: epochToDate(row.tgl_registrasi, "dateTime") ?? "-",
        jenisKunjungan: row.jenis_kunjungan ?? "-",
        noreg: row.noreg ?? "-",
        noRm: patient.no_rm ?? "-",
        namaPasien: patient.name ?? "-",
        poli: row.lokasi?.nama ?? "-",
        dokter: row.practitioner?.pegawai?.nama ?? "-",
        tglBatal: epochToDate(row.cancel_date, "dateTime") ?? "-",
        petugas: row.cancel_by?.pegawai?.nama ?? "-",
        alasanBatal: row.cancel_reason ?? "-",
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
    
    const headerStyle = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    const headers = ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4", "J4", "K4"];
    headers.forEach(header => {
      if (worksheet[header]) {
        worksheet[header].s = headerStyle;
      }
    });

    const columnWidths = data.reduce((widths: any, row: any) => {
      Object.keys(row).forEach((key, colIdx) => {
        const cellValue = row[key] ? row[key].toString() : "";
        widths[colIdx] = Math.max(widths[colIdx] || 10, cellValue.length + 2);
      });
      return widths;
    }, []);
    worksheet["!cols"] = columnWidths.map((wch: any) => ({ wch }));

    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Batal Kunjungan");
    XLSX.writeFile(workbook, `Laporan Batal Kunjungan.xlsx`);
  } catch (error) {
    console.error("Error exporting Batal Kunjungan", error);
    alert("Gagal mengekspor data Batal Kunjungan. Silakan cek konsol untuk detail.");
  }
};

// KEPERAWATAN INAP PASIEN
export const downloadExportExcelKeperawatanInapPasien = async (
  filter?: any
) => {
  try {
    const token = localStorage.getItem("access_token");
    const apiUrl = `${import.meta.env.VITE_BASE_ADMISI}/export/keperawatan-inap`;

    const response = await axios.get(apiUrl, {
      params: filter,
      headers: {
        Authorization: token,
      },
    });

    const reportData = response.data.payload;

    if (!reportData || reportData.length === 0) {
      alert("Tidak ada data untuk diekspor sesuai filter yang dipilih.");
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
    data.push({});
    data.push({});
    data.push({});
    data.push({
      No: "No.",
      namaPasien: "Nama Pasien",
      noRm: "No. RM",
      ruangan: "Ruangan",
      kelas: "Kelas",
      noBed: "No. Bed",
      tglMasuk: "Tanggal Masuk",
      tglKeluar: "Tanggal Keluar",
    });

    for (let i = 0; i < reportData.length; i++) {
    const row = reportData[i];
    // Ambil objek 'room' dari dalam 'monitoring_room' untuk mempermudah
    const roomInfo = row.monitoring_room?.room ?? {};
        
    data.push({
      No: i + 1,
      namaPasien: row.nama_pasien ?? "-",
      noRm: row.no_rm ?? "-",
      ruangan: roomInfo.name ?? "-",
      kelas: roomInfo.class_name ?? "-",
      noBed: row.monitoring_room?.no_bed ?? "-",
      tglMasuk: row.tanggal_dirawat ? epochToDate(row.tanggal_dirawat, "dateTime") : "-",
      tglKeluar: row.discharge_date ? epochToDate(row.discharge_date, "dateTime") : "-",
    });
  }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(worksheet, [tanggalExport], { origin: "A2" });

    // Jumlah kolom sekarang 8 (A-H) karena ada tambahan Nama Pasien
    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }, 
      { s: { r: 1, c: 0 }, e: { r: 1, c: 7 } },
    ];

    worksheet["A1"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 14 },
    };
    worksheet["A2"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 11 },
    };

    const headerStyle = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    const headers = ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4"];
    headers.forEach(header => {
      if (worksheet[header]) {
        worksheet[header].s = headerStyle;
      }
    });

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
    alert("Gagal mengekspor data Keperawatan Inap Pasien. Silakan cek konsol untuk detail.");
  }
};

// BAYI BARU LAHIR
export const downloadExportExcelBayiBaruLahir = async (
  filter?: any
) => {
  try {
    const token = localStorage.getItem("access_token");
    const apiUrl = `${import.meta.env.VITE_BASE_ADMISI}/export/bayi-baru-lahir`;

    const response = await axios.get(apiUrl, {
      params: filter,
      headers: {
        Authorization: token,
      },
    });

    const reportData = response.data.payload;

    if (!reportData || reportData.length === 0) {
      alert("Tidak ada data untuk diekspor sesuai filter yang dipilih.");
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
    data.push({});
    data.push({});
    data.push({});
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
      const birthDetail = row.birth_detail ?? {};

      // Menggunakan helper epochToDate karena tanggalDaftar adalah string ISO
      const tglRegistrasiStr = row.tanggal_daftar 
        ? epochToDate(new Date(row.tanggal_daftar).getTime() / 1000, "date") as string
        : "-";
      
      const tglLahirStr = birthDetail.birth_date
        ? epochToDate(new Date(birthDetail.birth_date).getTime() / 1000, "date") as string
        : "-";

      data.push({
        No: i + 1,
        tglRegistrasi: tglRegistrasiStr,
        noRmBaby: row.no_rm_baby ?? "-",
        nameBaby: row.name_baby ?? "-",
        birthDate: tglLahirStr,
        birthTimeBaby: row.birth_time_baby ?? "-",
        genderBaby: row.gender_baby === "Male" ? "L" : row.gender_baby === "Female" ? "P" : "-",
        birthPlace: birthDetail.birth_place ?? "-",
        identitasIbu: row.identifier_mom ?? "-",
        namaIbu: row.name_mom ?? "-",
      });
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(worksheet, [tanggalExport], { origin: "A2" });

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 9 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 9 } },
    ];

    worksheet["A1"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 14 },
    };
    worksheet["A2"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 11 },
    };

    const headerStyle = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true },
    };
    const headers = ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4", "J4"];
    headers.forEach(header => {
      if (worksheet[header]) {
        worksheet[header].s = headerStyle;
      }
    });
    
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
    alert("Gagal mengekspor data Bayi Baru Lahir. Silakan cek konsol untuk detail.");
  }
};