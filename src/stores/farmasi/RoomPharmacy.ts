import { defineStore } from "pinia";
import { apiFarmasiGet, apiFarmasiPost, apiFarmasiPut, apiFarmasiDelete } from "@/utils/apiHandler";

export const useRoomPharmacyStore = defineStore({
  id: "RoomPharmacy",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(payload = {}) {
      return apiFarmasiPost("/farmasi/alkes/all", payload);
    },
    async detailApi(uuid: string, payload = {}) {
      return apiFarmasiGet(`/farmasi/alkes/${uuid}`, payload);
    },
    async cancelOrderApi(uuid: string, payload = {}) {
      return apiFarmasiDelete(`/farmasi/alkes/${uuid}`, payload);
    },
    async updateLocationApi(payload = {}) {
      return apiFarmasiPut("/farmasi/alkes/lokasi-stok", payload);
    },
    async updateAlkesApi(uuid: string, payload = {}) {
      return apiFarmasiPut(`/farmasi/alkes/items/${uuid}/jenis-stok`, payload);
    },
    async updateAlkesItemApi(uuid: string, payload = {}) {
      return apiFarmasiPut(`/farmasi/alkes/items/${uuid}`, payload);
    },
    async verifyApi(payload = {}) {
      return apiFarmasiPut("/farmasi/alkes/update-verifikasi", payload);
    },
    async verify2Api(payload = {}) {
      return apiFarmasiPut("/farmasi/alkes/siap-diserahkan", payload);
    },
    async verify3Api(payload = {}) {
      return apiFarmasiPut("/farmasi/alkes/diserahkan", payload);
    },
    async previousApi(payload = {}) {
      return apiFarmasiPut("/farmasi/alkes/batal-siap-diserahkan", payload);
    },
  },
});
