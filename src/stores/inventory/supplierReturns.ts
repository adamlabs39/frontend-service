import { apiInventoryGet, apiInventoryPost, apiInventoryPut, apiInventoryDelete } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useSupplierReturnsStore = defineStore({
  id: "SupplierReturns",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi( filter: String = "", name: String = "", page: number = 1, limit: number = 10, payload = {} ) {
      return apiInventoryGet(`/inventory/pengadaan/retur&penggantian?filter=${filter}&name=${name}&page=${page}&limit=${limit}`, payload);
    },
    async getApiDetail(uuid: string, payload = {}) {
      return apiInventoryGet(`/inventory/pengadaan/retur&penggantian/${uuid}`, payload);
    },
    async postApi(payload = {}) {
      return apiInventoryPost("/inventory/pengadaan/retur&penggantian", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiInventoryPut(`/inventory/pengadaan/retur&penggantian/${uuid}`, payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiInventoryDelete(`/inventory/pengadaan/retur&penggantian/${uuid}`, payload);
    }
  },
});
