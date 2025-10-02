import { apiInventoryGet, apiInventoryPost, apiInventoryPut, apiInventoryDelete } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useSupplierReturnsStore = defineStore({
  id: "SupplierReturns",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi( lokasiStok: String= "", status: String = "", search: String = "", page: number = 1, limit: number = 10, payload = {} ) {
      return apiInventoryGet(`/inventory/retur-supplier?lokasi_stok_uuid=${lokasiStok}&status=${status}&search=${search}&page=${page}&limit=${limit}`, payload);
    },
    async getApiDetail(uuid: string, payload = {}) {
      return apiInventoryGet(`/inventory/retur-supplier/${uuid}`, payload);
    },
    async getApiAvailable(date: String= "", page: number = 1, limit: number = 10, payload = {}) {
      return apiInventoryGet(`/inventory/retur-supplier/available-faktur?date=${date}&page=${page}&limit=${limit}`, payload);
    },
    async getApiAvailableDetail(uuid: string, payload = {}) {
      return apiInventoryGet(`/inventory/retur-supplier/available-faktur/${uuid}`, payload);
    },
    async postApi(payload = {}) {
      return apiInventoryPost("/inventory/retur-supplier", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiInventoryPut(`/inventory/retur-supplier/${uuid}`, payload);
    },
  },
});
