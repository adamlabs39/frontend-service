import * as XLSX from "xlsx-js-style";

// Fungsi export datamaster
export const exportSupplierToExcel = (rows: any[]) => {
    if (!rows || rows.length === 0) {
        alert("Tidak ada data untuk diekspor.");
        return;
    }

    const title = ["DATAMASTER SUPPLIER"];
    const data = [];

    data.push({});
    data.push({});

    // Header tabel
    data.push({
        A: "No",
        B: "Kode Supplier",
        C: "Nama Supplier",
        D: "Provinsi",
        E: "Kabupaten",
        F: "Kecamatan",
        G: "Kelurahan",
        H: "Alamat",
        I: "No. Telepon",
        J: "Kategori Item",
        K: "Status"
    });
    // Isi data baris
    rows.forEach((row, index) => {
        data.push({
            A: index + 1,
            B: row.code,
            C: row.name,
            D: row.province?.name || '-',
            E: row.kabupaten?.name || '-',
            F: row.kecamatan?.name || '-',
            G: row.kelurahan?.name || '-',
            H: row.alamat || '-',
            I: row.noTlp || '-',
            J: row.supplierItems.map((item: any) => item.kategoriItem).join(", "),
            K: row.status ? "AKTIF" : "NON-AKTIF",
        });
    });

    // Workbook dan Worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    // Tambahkan judul dan merge cell
    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 10 } }]; // Merge 11 kolom

    // Style untuk judul
    worksheet["A1"].s = {
        alignment: { horizontal: "center", vertical: "center" },
        font: { bold: true, sz: 14 },
        fill: { fgColor: { rgb: "D9D9D9" } },
    };
    //Atur lebar kolom agar tidak terpotong
    worksheet["!cols"] = [
        { wch: 5 },   // A: No
        { wch: 15 },  // B: Kode Supplier
        { wch: 35 },  // C: Nama Supplier
        { wch: 20 },  // D: Provinsi
        { wch: 20 },  // E: Kabupaten
        { wch: 20 },  // F: Kecamatan
        { wch: 20 },  // G: Kelurahan
        { wch: 40 },  // H: Alamat
        { wch: 20 },  // I: No. Telepon
        { wch: 25 },  // J: Kategori Item
        { wch: 15 },  // K: Status
    ];

    // range tabel (mulai dari A3)
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:K1");
    for (let R = 2; R <= range.e.r; ++R) { // Mulai dari baris ke-3 (indeks 2)
        for (let C = 0; C <= range.e.c; ++C) {
            const cell_address = XLSX.utils.encode_cell({ r: R, c: C });
            if (!worksheet[cell_address]) continue;

            // Style untuk header tabel (baris ke-3)
            if (R === 2) {
                worksheet[cell_address].s = {
                    font: { bold: true, sz: 11 },
                    fill: { fgColor: { rgb: "9fe2db" } },
                    alignment: { horizontal: "center", vertical: "center" },
                    border: {
                        top: { style: "thin" }, bottom: { style: "thin" },
                        left: { style: "thin" }, right: { style: "thin" },
                    },
                };
            } else { // Style untuk data
                worksheet[cell_address].s = {
                    border: {
                        top: { style: "thin" }, bottom: { style: "thin" },
                        left: { style: "thin" }, right: { style: "thin" },
                    },
                };
            }
        }
    }
    //Buat dan Unduh File Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datamaster Supplier");
    XLSX.writeFile(workbook, `Datamaster Supplier.xlsx`);
};