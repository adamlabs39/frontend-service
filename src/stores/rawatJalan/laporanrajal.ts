import { defineStore } from "pinia";
import {
    apiPelayananRJGet
} from "@/utils/apiHandler";

export const useRJStore = defineStore({
    id: "PelayananRJ",
    state: () => ({}),
    getters: {},
    actions: {
        async getKunjunganRajal(
            {
                q = "",
                page = 1,
                limit = 10,
                room = "",
                practitionerUuid = "",
                jenisKunjungan = "",
                startDate = "",
                endDate = "",
            },
            payload = {}
        ) {
            return apiPelayananRJGet(
                `/rajal/report/kunjungan?q=${q}&page=${page}&limit=${limit}&room=${room}&practitioner_uuid=${practitionerUuid}&jenis_kunjungan=${jenisKunjungan}&start_date=${startDate}&end_date=${endDate}`,
                payload
            );
        },
        async getBatalPoli(
            {
                q = "",
                page = 1,
                limit = 10,
                room = "",
                polyclinic = "",
                practitionerUuid = "",
                jenisKunjungan = "",
                startDate = "",
                endDate = "",
            },
            payload = {}
        ) {
            return apiPelayananRJGet(
                `/rajal/report/batal-kunjungan?q=${q}&page=${page}&limit=${limit}&room=${room}&practitioner_uuid=${practitionerUuid}&polyclinic=${polyclinic}&jenis_kunjungan=${jenisKunjungan}&start_date=${startDate}&end_date=${endDate}`,
                payload
            );
        },
    },
});