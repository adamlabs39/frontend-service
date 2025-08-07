import {
  apiAntrianDelete,
  apiAntrianGet,
  apiAntrianPost,
} from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useConfigLayarAntrianStore = defineStore({
  id: "configLayarAntrian",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(
      page: number = 1,
      limit: number = 10,

      payload = {}
    ) {
      return apiAntrianGet(
        `/antrian/layar-antrian?page=${page}&limit=${limit}`,
        payload
      );
    },
    async deleteLayarAntrian(layarAntrianUuid: string) {
      return apiAntrianDelete(`/antrian/layar-antrian/${layarAntrianUuid}`, {});
    },
    async createLayarAntrian(payload: {
      namaLayar: string;
      tipeLayar: string;
      judul: string;
      isAdmisi: boolean;
      isPoli: boolean;
      isFarmasi: boolean;
      flashText: string[];
      media: string;
      aktif: boolean;
      poli_uuids: string[];
    }) {
      return apiAntrianPost(`/antrian/layar-antrian`, payload);
    },
  },
});
