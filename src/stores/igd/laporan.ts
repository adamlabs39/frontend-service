import { defineStore } from "pinia";
import { apiIgdGet } from "@/utils/apiHandler";


export const useIgdLaporanStore = defineStore({
  id: "igdReport",
  state: () => ({}),
  getters: {},
  actions: {
    async getLaporanTindakan(
      {
        page = 1,
        limit = 10,
        name = "",
        practitionerUuid = "",
        jenisKunjungan = "igd",
        // month = 0,
        timestamp = 0,
      },
      payload = {}
    ) {
      let url = `/pelayanan/laporan-tindakan?page=${page}&limit=${limit}&name=${name}&practitioner_uuid=${practitionerUuid}&pelayanan=${jenisKunjungan}`;
        if (timestamp !== 0) {
            url += `&timestamp=${timestamp}`;
        }
        return apiIgdGet(url, payload);
    },
    async getKunjunganIGD(
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
            return apiIgdGet(
                `/igd/report/kunjungan?q=${q}&page=${page}&limit=${limit}&room=${room}&practitioner_uuid=${practitionerUuid}&jenis_kunjungan=${jenisKunjungan}&start_date=${startDate}&end_date=${endDate}`,
                payload
            );
        },
    async getBatalIGD(
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
          return apiIgdGet(
            `/igd/report/batal-kunjungan?q=${q}&page=${page}&limit=${limit}&room=${room}&practitioner_uuid=${practitionerUuid}&polyclinic=${polyclinic}&jenis_kunjungan=${jenisKunjungan}&start_date=${startDate}&end_date=${endDate}`,
            payload
        );
     },
     async downloadKunjunganIGD(
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
            return apiIgdGet(
                `/igd/report/kunjungan?q=${q}&page=${page}&limit=${limit}&room=${room}&practitioner_uuid=${practitionerUuid}&jenis_kunjungan=${jenisKunjungan}&start_date=${startDate}&end_date=${endDate}&all=aktif`,
                payload
            );
        },
        async downloadBatalKunjunganIGD(
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
            return apiIgdGet(
                `/igd/report/batal-kunjungan?q=${q}&page=${page}&limit=${limit}&room=${room}&practitioner_uuid=${practitionerUuid}&jenis_kunjungan=${jenisKunjungan}&start_date=${startDate}&end_date=${endDate}&all=aktif`,
                payload
            );
        },
  },
});
