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
    async getApi(page: number = 1, limit: number = 10,name:String="", payload = {}) {      
      return apiDatamasterGet(`/datamaster/tarif?page=${page}&limit=${limit}&name=${name}`, payload);
    },
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
