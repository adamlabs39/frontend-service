import { apiAuthGet,apiAuthPost,apiAuthDelete,apiAuthPut } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(
      params: {
        page?: number;
        limit?: number;
        role?: string;
        payload?: object;
      } = {}
    ) {
      const { page = 1, limit = 10, role, payload = {} } = params;
    
      // Bangun URL secara dinamis
      let url = `/user?page=${page}&total=${limit}`;
      if (role) {
        url += `&role=${role}`;
      }
    
      return apiAuthGet(url, payload);
    },
    async postApi(payload = {}) {
      return apiAuthPost("/user", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiAuthPut(`/user/${uuid}`, payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiAuthDelete(`/user/${uuid}`, payload);
    },
  },
});
