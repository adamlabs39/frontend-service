import { apiInventoryGet, apiInventoryPost, apiInventoryPut, apiInventoryDelete } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useUnitDeliveryVerificationStore = defineStore({
  id: "UnitDeliveryVerification",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi( lokasiStok: String= "", status: String = "", name: String = "", page: number = 1, limit: number = 10, payload = {} ) {
      return apiInventoryGet(`/inventory/pengiriman-unit?lokasi_gudang_uuid=${lokasiStok}&status=${status}&search=${name}&page=${page}&limit=${limit}`, payload);
    },
    async getApiDetail(uuid: string, payload = {}) {
      return apiInventoryPut(`/inventory/pengiriman-unit/${uuid}`, payload);
    },
    async postApi(payload = {}) {
      return apiInventoryPost("/inventory/pengiriman-unit", payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiInventoryDelete(`/inventory/pengiriman-unit/${uuid}`, payload);
    },
  },
});
