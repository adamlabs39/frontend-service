import { defineStore } from "pinia";
import {
  apiLaboratoriumGet,
  apiLaboratoriumPost,
  apiLaboratoriumPut,
  apiLaboratoriumDelete,
} from "@/utils/apiHandler";

export const useHasilPemeriksaanLab = defineStore({
  id: "hasil-pemeriksaan-lab",
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
        orderStatus = "",
      },
      payload = {}
    ) {
      return apiLaboratoriumGet(
        `/lab/order-lab?search=${search}&payment_method=${paymentMethod}&page=${page}&limit=${limit}&start_date=${startDate}&end_date=${endDate}&status=${status}&order_status=${orderStatus}`,
        payload
      );
    },
    async postApi(payload = {}) {
      return apiLaboratoriumPost("/lab/order-lab", payload);
    },
    async putApiBatalValidasi(payload = {}) {
      return apiLaboratoriumPut(`/lab/order-lab-batal-validasi`, payload);
    },
    async putApiValidasi(uuid: string, payload = {}) {
      return apiLaboratoriumPut(`/lab/order-lab-validasi/${uuid}`, payload);
    },
    async putApiEdit(uuid: string, payload = {}) {
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
    async getActive(payload = {}) {
      return apiLaboratoriumGet(`/lab/tarif-lab/active`, payload);
    },
  },
});
