import { defineStore } from "pinia";
import {
  apiDatamasterGet,
  apiDatamasterPost,
  apiDatamasterPut,
  apiDatamasterDelete,
} from "@/utils/apiHandler";

export const useLoincStore = defineStore({
    id: "loinc",
    state: () => ({}),
    getters: {},
    actions: {
      async getApi(payload={}) {
        return apiDatamasterGet("/datamaster/loinc", payload);
      },
      async postApi(payload = {}) {
        return apiDatamasterPost("/datamaster/loinc", payload);
      },
      async putApi(uuid: string, payload = {}) {
        return apiDatamasterPut(`/datamaster/loinc/${uuid}`, payload);
      },
      async deleteApi(uuid: string, payload = {}) {
        return apiDatamasterDelete(`/datamaster/loinc/${uuid}`, payload);
      },
    },
  });