import { defineStore } from "pinia";
import { apiIcd9Get } from "@/utils/apiHandler";

export const useIcd9Store = defineStore({
  id: "index",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(payload = {}) {
      return apiIcd9Get("/datamaster/icd9", payload);
    },
  },
});
