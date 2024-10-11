import { apiAuthGet } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(payload = {}) {
      const response = await apiAuthGet("/user", payload);
      return response;
    },
  },
});
