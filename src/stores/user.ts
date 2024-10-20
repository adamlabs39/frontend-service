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
       
        payload?: object;
      } = {}
    ) {
      const {
        page = 1,
        limit = 10,
      
        payload = {},
      } = params;
      return apiAuthGet(
        `/user?page=${page}&total=${limit}`,
        payload
      );
    },
  },
});
