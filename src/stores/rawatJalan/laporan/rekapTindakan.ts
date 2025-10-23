import { defineStore } from "pinia";
import { apiRawatJalanGet } from "@/utils/apiHandler";

export const useRekapTindakanStore = defineStore({
    id: "rekapTindakan",
    state: () => ({}),
    getters: {},
    actions: {
        async getTindakanPasien(
            {
                page = 1,
                limit = 10,
                name = "",
                practitionerUuid = "",
                // month = 0,
                timestamp = 0,
                lokasiUuid = "",
                pelayanan = "",
            },
            payload = {},

        ) {
            let url = `/laporan-tindakan?page=${page}&limit=${limit}&name=${name}&practitioner_uuid=${practitionerUuid}&lokasi_uuid=${lokasiUuid}&pelayanan=${pelayanan}`
            // Menyusun URL query dengan kondisi untuk mont
             if (timestamp !== 0) {
                url += `&timestamp=${timestamp}`;
            }
            return apiRawatJalanGet(url, payload);
        },
        async downloadTindakanPasien(
            {
                page = 1,
                limit = 10,
                name = "",
                practitionerUuid = "",
                // month = 0,
                timestamp = 0,
                lokasiUuid = "",
                pelayanan = "",
            },
            payload = {},

        ) {
            let url = `/laporan-tindakan?page=${page}&limit=${limit}&name=${name}&practitioner_uuid=${practitionerUuid}&lokasi_uuid=${lokasiUuid}&pelayanan=${pelayanan}&all=aktif`
            // Menyusun URL query dengan kondisi untuk mont
             if (timestamp !== 0) {
                url += `&timestamp=${timestamp}`;
            }
            return apiRawatJalanGet(url, payload);
        },
    },
});