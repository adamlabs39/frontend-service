import { apiStokGet } from "@/utils/apiHandler";
import { defineStore } from "pinia";

import { ref } from "vue";

export const usePengeluaranUnitStore = defineStore({
  id: "pengeluaranUnit",
  state: () => ({}),
  actions: {
    async getAll(page = 1, page_size = 10, no_pengeluaran = "", payload = {}) {
      return apiStokGet(
        `/stok/pengeluaran-unit?page=${page}&page_size=${page_size}&no_pengeluaran=${no_pengeluaran}`,
        payload
      );
    },
  },
});
