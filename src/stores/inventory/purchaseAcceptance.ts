import { apiInventoryGet } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const usePurchaseAcceptanceStore = defineStore({
  id: "purchaseAcceptance",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi( filter: String = "", name: String = "", page: number = 1, limit: number = 10, payload = {} ) {
      return apiInventoryGet(`/inventory/penerimaan-retur-unit?lokasi_stok_tujuan_uuid=${filter}&alasan=${name}&page=${page}&limit=${limit}`, payload);
    },
    async getDetailApi(uuid: string, payload = {}) {
      return apiInventoryGet(`/inventory/penerimaan-retur-unit/${uuid}`, payload);
    },
  },
});
