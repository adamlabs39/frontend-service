import { defineStore } from "pinia";
import {
  apiDatamasterGet,
  apiDatamasterPost,
  apiDatamasterPut,
  apiDatamasterDelete,
} from "@/utils/apiHandler";

export const usePraktisiStore = defineStore({
  id: "praktisi",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(page: number = 1, limit: number = 10,name:String="", payload = {}) {      
      return apiDatamasterGet(`/datamaster/practitioner?page=${page}&limit=${limit}&name=${name}`, payload);
    },
    async postApi(payload = {}) {
      return apiDatamasterPost("/datamaster/practitioner", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiDatamasterPut(`/datamaster/practitioner/${uuid}`, payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiDatamasterDelete(`/datamaster/practitioner/${uuid}`, payload);
    },
    async exportApi(payload = {}) {      
      return apiDatamasterGet(`/datamaster/practitioner/export`, payload);
    },
    async importApi(payload: any) {
      return apiDatamasterPost("/datamaster/practitioner/import", payload);
    },
  },
});
