import { apiAdmisiGet } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useDataAntrianStore = defineStore({
  id: "dataAntrian",
  state: () => ({}),
  getters: {},
  actions: {
    async getAntrianRJ(
      start_date: number,
      end_date: number,
      page?: number,
      limit?: number,
      totalData?: number,
      q?: string,
      payload = {}
    ) {
      return apiAdmisiGet(
        `/rawat-jalan?start_date=${start_date}&end_date=${end_date}&page=${page}&limit=${limit}&total_data=${totalData}&q=${q}`,
        payload
      );
    },
  },
});
