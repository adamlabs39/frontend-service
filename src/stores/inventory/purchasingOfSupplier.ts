import { apiInventoryGet, apiInventoryPost, apiInventoryPut, apiInventoryDelete } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const usePurchasingOfSupplierStore = defineStore({
  id: "PurchasingOfSupplier",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(lokasiStok: String = "", filter: String = "", name: String = "", page: number = 1, limit: number = 10, payload = {} ) {
      return apiInventoryGet(`/inventory/pengadaan/pembelian-barang?lokasi_stok_uuid=${lokasiStok}&filter=${filter}&search=${name}&page=${page}&limit=${limit}`, payload);
    },
    async getApiDetail(uuid: string, payload = {}) {
      return apiInventoryGet(`/inventory/pengadaan/pembelian-barang/${uuid}`, payload);
    },
    async postApi(payload = {}) {
      return apiInventoryPost("/inventory/pengadaan/pembelian-barang", payload);
    },
    async putApi(uuid: string, payload = {}) {
      
      return apiInventoryPut(`/inventory/pengadaan/pembelian-barang/${uuid}`, payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiInventoryPut(`/inventory/pengadaan/pembelian-barang-batal/${uuid}`, payload);
    }
  },
});
