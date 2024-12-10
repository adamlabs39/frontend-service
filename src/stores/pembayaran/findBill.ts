import { defineStore } from "pinia";
import {
  apiPembayaranGet,
  apiPembayaranPost,
  apiPembayaranPut,
  apiPembayaranDelete,
} from "@/utils/apiHandler";

export const useTagihanStore = defineStore({
  id: "search",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(
      search: string = "",
      
      payload = {}
    ) {
      return apiPembayaranGet(
        `/payment?search=${search == ''? '00-00': search}`,
        payload
      );
    },
    async getDetailBill(uuid: string, payload = {}) {
      return apiPembayaranGet(`/payment/${uuid}`, payload);
    },
    async getAktifApi(payload = {}) {
      return apiPembayaranGet(`/datamaster/role/aktif`, payload);
    },
    async postApi(payload = {}) {
      return apiPembayaranPost("/datamaster/role", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiPembayaranPut(`/datamaster/role/${uuid}`, payload);
    },
    async exportApi(payload = {}) {
      return apiPembayaranGet(`/datamaster/role/export`, payload);
    },
  },
});
