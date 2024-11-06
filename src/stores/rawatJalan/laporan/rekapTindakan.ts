import { defineStore } from "pinia";
import { apiRawatJalanGet } from "@/utils/apiHandler";

export const useRekapTindakanStore = defineStore({
    id: "rekapTindakan",
    state: () => ({}),
    getters: {},
    actions: {
        getTindakanPasien(
            page: number = 1,
            limit: number = 10,
            name: string = "",
            practitioner_uuid: string = "",
            month: string | null = null, // Ganti `month?: any = null` dengan ini
            lokasi_uuid: string = "",
            pelayanan: string = "rj",
            payload = {}
        ) {
            // Menyusun URL query dengan kondisi untuk month
            let url = `/pelayanan/laporan-tindakan?page=${page}&limit=${limit}&name=${name}&practitioner_uuid=${practitioner_uuid}&lokasi_uuid=${lokasi_uuid}&pelayanan=${pelayanan}`;

            // Jika month tidak null, tambahkan ke query
            if (month !== null) {
                url += `&month=${month}`;
            }

            return apiRawatJalanGet(url, payload);
        },
    },
});
