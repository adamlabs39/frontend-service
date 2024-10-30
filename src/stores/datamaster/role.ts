import { defineStore } from "pinia";
import {
  apiDatamasterGet,
  apiDatamasterPost,
  apiDatamasterPut,
  apiDatamasterDelete,
} from "@/utils/apiHandler";

export const useRoleStore = defineStore({
  id: "role",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(page: number = 1, limit: number = 10,name:String="", payload = {}) {      
      return apiDatamasterGet(`/datamaster/role?page=${page}&limit=${limit}&name=${name}`, payload);
    },
    async getAktifApi(payload = {}) {      
      return apiDatamasterGet(`/datamaster/role/aktif`, payload);
    },
    async postApi(payload = {}) {
      return apiDatamasterPost("/datamaster/role", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiDatamasterPut(`/datamaster/role/${uuid}`, payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiDatamasterDelete(`/datamaster/role/${uuid}`, payload);
    },
    async exportApi(payload = {}) {      
      return apiDatamasterGet(`/datamaster/role/export`, payload);
    },
  },
});
