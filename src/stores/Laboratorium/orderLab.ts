import { defineStore } from "pinia";
import {
  apiLaboratoriumGet,
  apiLaboratoriumPost,
  apiLaboratoriumPut,
  apiLaboratoriumDelete,
} from "@/utils/apiHandler";

export const useOrderLab = defineStore({
  id: "order-lab-lab",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(
      {
        search = "",
        paymentMethod = "",
        page = 1,
        limit = 10,
        startDate = "",
        endDate = "",
        status = "",
      },
      payload = {}
    ) {
      return apiLaboratoriumGet(
        `/lab/order-lab?search=${search}&payment_method=${paymentMethod}&page=${page}&limit=${limit}&start_date=${startDate}&end_date=${endDate}&status=${status}`,
        payload
      );
    },
    async postApi(payload = {}) {
      return apiLaboratoriumPost("/lab/order-lab", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiLaboratoriumPut(`/lab/order-lab/${uuid}`, payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiLaboratoriumDelete(`/lab/order-lab/${uuid}`, payload);
    },
    async exportApi(payload = {}) {
      return apiLaboratoriumGet(
        `/farmasi/datamaster/kategori-obat/export`,
        payload
      );
    },
    async importApi(payload: any) {
      return apiLaboratoriumPost(
        "/farmasi/datamaster/kategori-obat/import",
        payload
      );
    },
    async getDetailPasien(uuid = "", payload = {}) {
      return apiLaboratoriumGet(`/lab/order-lab/${uuid}`, payload);
    },
  },
});
