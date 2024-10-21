import { apiAuthGet } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({}),
  getters: {},
  actions: {
    // async getApi(payload = {}) {
    //   const response = await apiAuthGet("/user", payload);
    //   return response;
    // },
    async getApi(
      params: {
        page?: number;
        limit?: number;
       role?: string;
        payload?: object;
      } = {}
    ) {
      const {
        page = 1,
        limit = 10,
      role='',
        payload = {},
      } = params;
      return apiAuthGet(
        `/user?page=${page}&total=${limit}&role=${role}`,
        payload
      );
    },
  },
});
