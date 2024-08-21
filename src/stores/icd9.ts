import { defineStore } from "pinia";
import { apiDatamasterGet,apiDatamasterPost, apiDatamasterPut } from "@/utils/apiHandler";

export const useIcd9Store = defineStore({
  id: "index",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(payload = {}) {
      return apiDatamasterGet("/datamaster/icd9", payload);
    },
    async postApi(payload = {}) {
      return apiDatamasterPost("/datamaster/icd9", payload);
    },
    async putApi(payload = {}) {
      return apiDatamasterPut("/datamaster/icd9", payload);
    },
  },
});
