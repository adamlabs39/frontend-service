import { apiAntrianDelete, apiAntrianGet } from "@/utils/apiHandler";
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
  },
});
