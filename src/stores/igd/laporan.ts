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
        month = 0,
      },
      payload = {}
    ) {
      let url = `/pelayanan/laporan-tindakan?page=${page}&limit=${limit}&name=${name}&practitioner_uuid=${practitionerUuid}&pelayanan=${jenisKunjungan}`;
      
      if (month !== 0) url += `&month=${month}`;
      
      return apiIgdGet(url, payload);
    },
  },
});
