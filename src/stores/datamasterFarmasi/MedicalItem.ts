import { defineStore } from "pinia";
import {
  apiFarmasiGet,
  apiFarmasiPost,
  apiFarmasiPut,
  apiFarmasiDelete,
} from "@/utils/apiHandler";

export const useMedicalItemStore = defineStore({
  id: "item-medis",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(page: number = 1, limit: number = 10, name:String="", payload = {}) {      
      return apiFarmasiPost(`/farmasi/datamaster/item-medis/all?page=${page}&limit=${limit}&name=${name}`, payload);
    },
    async getAvailableStockApi(uuid:string, payload = {}) {
      return apiFarmasiGet(`/farmasi/datamaster/item-medis/available-jenis-stock/${uuid}`, payload);
    },
    async getWithoutPaginationApi2(itemMedis:string, payload = {}) {
      return apiFarmasiGet(`/farmasi/datamaster/item-medis/without-pagination?jenis_item=${itemMedis}`, payload);
    },
    async postApi(payload = {}) {
      return apiFarmasiPost("/farmasi/datamaster/item-medis", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiFarmasiPut(`/farmasi/datamaster/item-medis/${uuid}`, payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiFarmasiDelete(`/farmasi/datamaster/item-medis/${uuid}`, payload);
    },
    async exportApi(payload = {}) {      
      return apiFarmasiGet(`/farmasi/datamaster/item-medis/export`, payload);
    },
    async importApi(payload: any) {
      return apiFarmasiPost("/farmasi/datamaster/item-medis/import", payload);
    },
    async getWithoutPaginationApi(payload = {}) {      
      return apiFarmasiGet(`/farmasi/datamaster/item-medis/without-pagination?jenis_item=obat`, payload);
    },
    async getAvailableJenisStokApi(uuid: string, payload = {}) {      
      return apiFarmasiGet(`/farmasi/datamaster/item-medis/available-jenis-stock/${uuid}`, payload);
    },
  },
});
