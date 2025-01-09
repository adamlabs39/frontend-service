import { defineStore } from "pinia";
import { apiPembayaranGet } from "@/utils/apiHandler";

export const useReportKasirStore = defineStore({
  id: "search",
  state: () => ({}),
  getters: {},
  actions: {
    async getClosingKasir(
      { q = "", page = 1, limit = 10, startDate = "", endDate = "" },
      payload = {}
    ) {
      return apiPembayaranGet(
        `/report/cashier?start_date=${startDate}&end_date=${endDate}`,
        payload
      );
    },
  },
});
