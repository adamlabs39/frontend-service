import { defineStore } from "pinia";
import { apiDatamasterGet } from "@/utils/apiHandler";

export const useIcd9Store = defineStore({
  id: "index",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(payload = {}) {
      return apiDatamasterGet("/datamaster/icd9", payload);
    },
  },
});
