import { defineStore } from "pinia";
import { apiRawatJalanGet } from "@/utils/apiHandler";

export const useRekapTindakanStore = defineStore({
    id: "rekapTindakan",
    state: () => ({}),
    getters: {},
    actions: {
        getTindakanPasien(
            {
                page = 1,
                limit = 10,
                name = "",
                practitioner_uuid = "",
                month = "", // Ganti `month?: any = null` dengan ini
                lokasi_uuid = "",
                pelayanan = "",
            },
            payload = {}
        ) {
            // Menyusun URL query dengan kondisi untuk mont

            return apiRawatJalanGet(`/pelayanan/laporan-tindakan?page=${page}&limit=${limit}&name=${name}&practitioner_uuid=${practitioner_uuid}&month=${month}&lokasi_uuid=${lokasi_uuid}&pelayanan=${pelayanan}`,payload);
        },
    },
});
