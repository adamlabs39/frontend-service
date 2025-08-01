import { defineStore } from "pinia";
import {
  apiAntrianGet,
  apiAntrianDelete,
  apiAntrianPost,
  apiAntrianPut,
} from "@/utils/apiHandler";

interface JadwalItem {
  jadwalDokterUuid?: string;
  day?: number;
  startTime?: string;
  endTime?: string;
  kuotaJkn?: number;
  kuotaNonJkn?: number;
  durasiPelayanan?: number;
  aktif?: boolean;
}

interface JadwalPayload {
  deleted: string[];
  updated: JadwalItem[];
  added: JadwalItem[];
}

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
    async addJadwalDoctor(payload: {
      doctorUuid: string;
      poliUuid: string;
      jadwal: string;
    }) {
      return apiAntrianPost(`/antrian/jadwal-dokter`, payload);
    },
    async updateJadwalDoctor(
      doctorUuid: string,
      poliUuid: string,
      payload: JadwalPayload
    ) {
      return apiAntrianPut(
        `/antrian/jadwal-dokter/${doctorUuid}/${poliUuid}`,
        payload
      );
    },
  },
});
