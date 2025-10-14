import { apiInventoryGet, apiInventoryPost, apiInventoryPut, apiInventoryDelete } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useUnitOfExpenditureStore = defineStore({
  id: "UnitOfExpenditure",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi( lokasiStok: String= "", search: String = "", page: number = 1, limit: number = 10, payload = {} ) {
        return apiInventoryGet(`/inventory/pengeluaran-unit?lokasi_stok_uuid=${lokasiStok}&search=${search}&page=${page}&limit=${limit}`, payload);
      },
      async getApiDetail(uuid: string, payload = {}) {
        return apiInventoryGet(`/inventory/pengeluaran-unit/${uuid}`, payload);
      },
      async postApi(payload = {}) {
        return apiInventoryPost("/inventory/pengeluaran-unit", payload);
      },
  },
});
