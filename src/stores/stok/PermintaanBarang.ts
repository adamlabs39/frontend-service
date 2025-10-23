import { apiStokGet } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const usePermintaanBarangStore = defineStore({
  id: "permintaanBarang",
  state: () => ({}),
  actions: {
    async getAll(
      page = 1,
      page_size = 10,
      status = "",
      no_permintaan = "",
      payload = {}
    ) {
      return apiStokGet(
        `/stok/permintaan-unit?page=${page}&page_size=${page_size}&status=${status}&no_permintaan=${no_permintaan}`,
        payload
      );
    },
  },
});
