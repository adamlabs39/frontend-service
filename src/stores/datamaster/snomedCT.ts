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
      async getApi(payload={}) {
        return apiDatamasterGet("/datamaster/snomed", payload);
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