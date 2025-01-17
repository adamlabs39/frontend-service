import { defineStore } from "pinia";
import {
  apiDatamasterGet,
  apiDatamasterPost,
  apiDatamasterPut,
  apiDatamasterDelete,
} from "@/utils/apiHandler";

export const useTarifStore = defineStore({
  id: "tarif",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(
      page: number = 1,
      limit: number = 10,
      name: String = "",
      jenis: String = "",
      unit: String = "",
      penjamin: String = "",
      payload = {}
    ) {
      return apiDatamasterGet(
        `/datamaster/tarif?page=${page}&limit=${limit}&jenis=${jenis}&name=${name}&unit=${unit}&penjamin=${penjamin}`,
        payload
      );
    },
    // async getApi(
    //   params: {
    //     page?: number;
    //     limit?: number;
    //     jenis?:String;
    //     name?: string;
    //     kategori_ruangan_uuid?: string;
    //     penjamin_uuid?: string;
    //     payload?: object;
    //   } = {}
    // ) {
    //   const {
    //     page = 1,
    //     limit = 10,
    //     jenis="",
    //     name = "",
    //     kategori_ruangan_uuid = "",
    //     penjamin_uuid = "",
    //     payload = {},
    //   } = params;
    //   return apiDatamasterGet(
    //     `/datamaster/ruangan?page=${page}&limit=${limit}&jenis=${jenis}&name=${name}&kategori_ruangan_uuid=${kategori_ruangan_uuid}&penjmain_uuid=${penjamin_uuid}`,
    //     payload
    //   );
    // },
    async postApi(payload = {}) {
      return apiDatamasterPost("/datamaster/tarif", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiDatamasterPut(`/datamaster/tarif/${uuid}`, payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiDatamasterDelete(`/datamaster/tarif/${uuid}`, payload);
    },
    async exportApi(payload = {}) {
      return apiDatamasterGet(`/datamaster/tarif/export`, payload);
    },
  },
});
