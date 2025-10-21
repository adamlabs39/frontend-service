import { defineStore } from "pinia";
import { apiFarmasiGet, apiFarmasiPost, apiFarmasiPostNoMessage, apiFarmasiPut, apiFarmasiDelete } from "@/utils/apiHandler";

export const useMedicalItemStore = defineStore({
  id: "MedicalItem",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(
      page: number = 1,
      limit: number = 10,
      name: String = "",
      jenisItem: String = "",
      payload = {}
    ) {
      return apiFarmasiPostNoMessage(`/farmasi/datamaster/item-medis/all?page=${page}&limit=${limit}&name=${name}&jenis_item=${jenisItem}`, payload);
    },
    async getAvailableStockApi(uuid: string, payload = {}) {
      return apiFarmasiGet(`/farmasi/datamaster/item-medis/available-jenis-stock/${uuid}`, payload);
    },
    async getWithoutPaginationApi(itemMedis: string, payload = {}) {
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
    async getWithoutPaginationApi2(payload = {}) {
      return apiFarmasiGet(`/farmasi/datamaster/item-medis/without-pagination?jenis_item=obat`, payload);
    },
    async getAvailableJenisStokApi(uuid: string, payload = {}) {
      return apiFarmasiGet(`/farmasi/datamaster/item-medis/available-jenis-stock/${uuid}`, payload);
    },
    async getItemMedisApi(page: number = 1, limit: number = 10, payload = {}) {
      return apiFarmasiGet(`/farmasi/datamaster/item-medis/pengadaan?jenis_item=obat&page=${page}&limit=${limit}`, payload);
    },
    async getItemUnitApi(uuid: string, payload = {}) {
      return apiFarmasiGet(`/farmasi/datamaster/item-medis/${uuid}/conversions`, payload);
    },
  },
});
