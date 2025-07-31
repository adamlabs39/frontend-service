import { defineStore } from "pinia";
import { apiAntrianGet, apiAntrianDelete } from "@/utils/apiHandler";

export const useJadwalDokterStore = defineStore({
  id: "jadwalDokter",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(
      page: number = 1,
      limit: number = 10,

      payload = {}
    ) {
      return apiAntrianGet(
        `/antrian/jadwal-dokter?page=${page}&limit=${limit}`,
        payload
      );
    },
    async deleteDoctor(doctorUuid: string, poliUuid: string) {
      return apiAntrianDelete(
        `/antrian/jadwal-dokter/${doctorUuid}/${poliUuid}`,
        {}
      );
    },
  },
});
