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
      nama_layar?: string,
      tipe_layar?: number,
      aktif?: boolean,
      payload = {}
    ) {
      const params = new URLSearchParams({
        page: page.toString(),
        page_size: page_size.toString(),
      });

      if (nama_layar !== undefined && nama_layar !== "") {
        params.append("nama_layar", nama_layar);
      }
      if (tipe_layar !== undefined) {
        params.append("tipe_layar", tipe_layar.toString());
      }
      if (aktif !== undefined) {
        params.append("aktif", aktif ? "true" : "false");
      }

      return apiAntrianGet(
        `/antrian/layar-antrian?${params.toString()}`,
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
