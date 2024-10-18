import { defineStore } from "pinia";
import { apiAdmisiGet, apiAdmisiPatch } from "@/utils/apiHandler";

export const useMonitoringKamarStore = defineStore({
  id: "monitoringKamar",
  state: () => ({}),
  getters: {},
  actions: {
    async getMonitoringKamar(
      { page = 1, limit = 10, q = "", filterKelas = "", filterKategori = "" },
      payload = {}
    ) {
      return apiAdmisiGet(
        `/monitoring-rooms?page=${page}&limit=${limit}&q=${q}&filter_kelas=${filterKelas}&filter_kategori=${filterKategori}`,
        payload
      );
    },

    async updateBed(uuid = "", payload = {}) {
      return apiAdmisiPatch(`/monitoring-rooms/${uuid}`, payload);
    },

    async getDetailMonitoringKamar(uuid = "", payload = {}) {
      return apiAdmisiGet(`monitoring-rooms/${uuid}`, payload);
    },
  },
});
