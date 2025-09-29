import { defineStore } from "pinia";
import { apiIgdGet, apiPelayananIGDGet } from "@/utils/apiHandler";


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
        month = 0,
      },
      payload = {}
    ) {
      let url = `/pelayanan/laporan-tindakan?page=${page}&limit=${limit}&name=${name}&practitioner_uuid=${practitionerUuid}&pelayanan=${jenisKunjungan}`;
      
      if (month !== 0) url += `&month=${month}`;
      
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
            return apiPelayananIGDGet(
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
            return apiPelayananIGDGet(
                `/igd/report/batal-kunjungan?q=${q}&page=${page}&limit=${limit}&room=${room}&practitioner_uuid=${practitionerUuid}&polyclinic=${polyclinic}&jenis_kunjungan=${jenisKunjungan}&start_date=${startDate}&end_date=${endDate}`,
                payload
            );
        },
  },
});
