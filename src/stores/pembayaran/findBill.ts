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
        `/payment?search=${search == "" ? "00-00" : search}`,
        payload
      );
    },
    async getDetailBill(uuid: string, payload = {}) {
      return apiPembayaranGet(`/payment/${uuid}`, payload);
    },
    async getItemBill(uuid: string, payload = {}) {
      return apiPembayaranGet(`/payment/${uuid}/items`, payload);
    },
    async getKasirStatus(payload = {}) {
      return apiPembayaranGet(`/cashier/check`, payload);
    },
    async postVoucher(uuid: string, payload = {}) {
      return apiPembayaranPost(`/payment/${uuid}/voucher`, payload);
    },
    async postDiscount(uuid: string, payload = {}) {
      return apiPembayaranPost(`/payment/${uuid}/discount`, payload);
    },
    async postKasirCloseBill(uuid: string, payload = {}) {
      return apiPembayaranPost(`/payment/${uuid}/close`, payload);
    },
    async postOpenKasir(payload = {}) {
      return apiPembayaranPost(`/cashier/open`, payload);
    },
    async postCloseKasir(payload = {}) {
      return apiPembayaranPost(`/cashier/close`, payload);
    },
    async postCloseHarianKasir(payload = {}) {
      return apiPembayaranPost(`/cashier/close/day`, payload);
    },
    async postPayment(uuid: string, payload = {}) {
      return apiPembayaranPost(`/payment/${uuid}/payment`, payload);
    },

    async putApi(uuid: string, payload = {}) {
      return apiPembayaranPut(`/datamaster/role/${uuid}`, payload);
    },
    async exportApi(payload = {}) {
      return apiPembayaranGet(`/datamaster/role/export`, payload);
    },
  },
});
