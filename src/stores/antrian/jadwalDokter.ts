import { defineStore } from "pinia";
import {
  apiAntrianGet,
  apiAntrianDelete,
  apiAntrianPost,
  apiAntrianPut,
  apiAntrianGetDatamaster,
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
      aktif?: boolean,

      payload = {}
    ) {
      const statusQuery = aktif === undefined ? "" : `&aktif=${aktif}`;
      return apiAntrianGet(
        `/antrian/jadwal-dokter?page=${page}&limit=${limit}${statusQuery}`,
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
      dokter_uuid: string;
      poliklinik_uuid: string;
      jadwal: Array<{
        day: number;
        startTime: string;
        endTime: string;
        kuotaJkn: number;
        kuotaNonJkn: number;
        durasiPelayanan: number;
        aktif: boolean;
      }>;
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
    async getApiPoli(name: string, payload = {}) {
      return apiAntrianGetDatamaster(
        `/datamaster/lokasi/poli/aktif?name=${name}`,
        payload
      );
    },
    async getApiListDokter(poliUuid: string, name: string, payload = {}) {
      return apiAntrianGetDatamaster(
        `/datamaster/practitioner/poli/aktif?poli_uuid=${poliUuid}&name=${name}`,
        payload
      );
    },
  },
});
