import { defineStore } from "pinia";
import { apiPembayaranGet } from "@/utils/apiHandler";

export const useReportPembayaranKunjunganStore = defineStore({
  id: "pembayaranKunjungan",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(
      page: number = 1,
      limit: number = 10,
      startDate: number = 0,
      endDate: number = 0,
      shiftType: string = "",
      name: string = "",
      payload = {}
    ) {
      return apiPembayaranGet(
        `/report/payment?&start_date=${startDate}&end_date=${endDate}&page=${page}&limit=${limit}&name=${name}&shift_type=${shiftType}`,
        payload
      );
    },
    async exportApi(payload = {}) {
      return apiPembayaranGet(`/pembayaran/kunjungan/export`, payload);
    },
  },
});
