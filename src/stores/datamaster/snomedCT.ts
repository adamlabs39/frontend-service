import { defineStore } from "pinia";
import {
  apiDatamasterGet,
  apiDatamasterPost,
  apiDatamasterPut,
  apiDatamasterDelete,
} from "@/utils/apiHandler";

export const useSnomedCTStore = defineStore({
    id: "snomedct",
    state: () => ({}),
    getters: {},
    actions: {
      async getApi(page: number = 1, limit: number = 10,name:String="", payload = {}) {      
        return apiDatamasterGet(`/datamaster/snomed?page=${page}&limit=${limit}&name=${name}`, payload);
      },
      async postApi(payload = {}) {
        return apiDatamasterPost("/datamaster/snomed", payload);
      },
      async putApi(uuid: string, payload = {}) {
        return apiDatamasterPut(`/datamaster/snomed/${uuid}`, payload);
      },
      async deleteApi(uuid: string, payload = {}) {
        return apiDatamasterDelete(`/datamaster/snomed/${uuid}`, payload);
      },
    },
  });