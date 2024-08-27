import { defineStore } from "pinia";
import {
  apiDatamasterGet,
  apiDatamasterPost,
  apiDatamasterPut,
  apiDatamasterDelete,
} from "@/utils/apiHandler";

export const useFaskesStore = defineStore({
    id: "faskes",
    state: () => ({}),
    getters: {},
    actions: {
      async getApi(payload={}) {
        return apiDatamasterGet("/datamaster/faskes", payload);
      },
      async postApi(payload = {}) {
        return apiDatamasterPost("/datamaster/faskes", payload);
      },
      async putApi(uuid: string, payload = {}) {
        return apiDatamasterPut(`/datamaster/faskes/${uuid}`, payload);
      },
      async deleteApi(uuid: string, payload = {}) {
        return apiDatamasterDelete(`/datamaster/faskes/${uuid}`, payload);
      },
    },
  });