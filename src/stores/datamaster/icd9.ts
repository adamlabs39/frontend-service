import { defineStore } from "pinia";
import {
  apiDatamasterGet,
  apiDatamasterPost,
  apiDatamasterPut,
  apiDatamasterDelete,
} from "@/utils/apiHandler";

export const useIcd9Store = defineStore({
  id: "icd9",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(page: number = 1, limit: number = 10,name:String="", payload = {}) {      
      return apiDatamasterGet(`/datamaster/icd9?page=${page}&limit=${limit}&name=${name}`, payload);
    },
    async postApi(payload = {}) {
      return apiDatamasterPost("/datamaster/icd9", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiDatamasterPut(`/datamaster/icd9/${uuid}`, payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiDatamasterDelete(`/datamaster/icd9/${uuid}`, payload);
    },
    async exportApi(payload = {}) {      
      return apiDatamasterGet(`/datamaster/icd9/export`, payload);
    },
  },
});
