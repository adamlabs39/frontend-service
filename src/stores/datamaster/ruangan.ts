import { defineStore } from "pinia";
import {
  apiDatamasterGet,
  apiDatamasterPost,
  apiDatamasterPut,
  apiDatamasterDelete,
} from "@/utils/apiHandler";

export const useRuanganStore = defineStore({
  id: "ruangan",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(page: number = 1, limit: number = 10,name:String="", payload = {}) {      
      return apiDatamasterGet(`/datamaster/ruangan?page=${page}&limit=${limit}&name=${name}`, payload);
    },
    async postApi(payload = {}) {
      return apiDatamasterPost("/datamaster/ruangan", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiDatamasterPut(`/datamaster/ruangan/${uuid}`, payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiDatamasterDelete(`/datamaster/ruangan/${uuid}`, payload);
    },
    async exportApi(payload = {}) {      
      return apiDatamasterGet(`/datamaster/ruangan/export`, payload);
    },
  },
});
