import { defineStore } from "pinia";
import { apiAdmisiGet, apiAdmisiPost, apiAdmisiPut } from "@/utils/apiHandler";

export const useAdmisiMasterPasienStore = defineStore({
  id: "admisiMasterPasien",
  state: () => ({}),
  getters: {},
  actions: {
    async getMasterPasien({ page = 1, limit = 10, q = "" }, payload = {}) {
      return apiAdmisiGet(
        `/patient?page=${page}&limit=${limit}&q=${q}`,
        payload
      );
    },

    async getDetailMasterPasien(uuid = "", payload = {}) {
      return apiAdmisiGet(`/patient/${uuid}`, payload);
    },

    async createMasterPasien(payload = {}) {
      return apiAdmisiPost(`/patient`, payload);
    },

    async updateMasterPasien(uuid = "", payload = {}) {
      return apiAdmisiPut(`/patient/${uuid}`, payload);
    },

    async getPatientHistory(uuid = "", { page = 1, limit = 10 }) {
      return apiAdmisiGet(
        `/patient/history/${uuid}?page=${page}&limit=${limit}`,
        {}
      );
    },
  },
});
