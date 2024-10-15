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
    async getApi(params: { page?: number; limit?: number; name?: string; doctor?:boolean;non_doctor?:boolean; payload?: object } = {}) {
      const { page = 1, limit = 10, name = "", doctor=false,non_doctor=false, payload = {} } = params;
      return apiDatamasterGet(`/datamaster/practitioner?page=${page}&limit=${limit}&name=${name}&doctor=${doctor}&non_doctor=${non_doctor}`, payload);
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
