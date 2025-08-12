import {
  apiAntrianDelete,
  apiAntrianGet,
  apiAntrianPost,
  apiAntrianPut,
} from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useConfigLayarAntrianStore = defineStore({
  id: "configLayarAntrian",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(
      page: number = 1,
      page_size: number = 10,

      payload = {}
    ) {
      return apiAntrianGet(
        `/antrian/layar-antrian?page=${page}&page_size=${page_size}`,
        payload
      );
    },
    async deleteLayarAntrian(layarAntrianUuid: string) {
      return apiAntrianDelete(`/antrian/layar-antrian/${layarAntrianUuid}`, {});
    },
    async createLayarAntrian(payload: {}) {
      return apiAntrianPost(`/antrian/layar-antrian`, payload);
    },
    async updateLayarAntrian(uuid: string, payload: {}) {
      return apiAntrianPut(`/antrian/layar-antrian/${uuid}`, payload);
    },
  },
});
