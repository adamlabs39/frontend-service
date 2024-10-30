import { defineStore } from "pinia";
import {
  apiAdmisiGet,
  apiAdmisiPost,
  apiAdmisiPut,
  apiAdmisiDelete,
} from "@/utils/apiHandler";

export const useAdmisiRIStore = defineStore({
  id: "admisiRI",
  state: () => ({}),
  getters: {},
  actions: {
    async getRI(
      {
        q = "",
        paymentMethod = "",
        page = 1,
        limit = 10,
        room = "",
        startDate = "",
        endDate = "",
        dpjp = "",
      },
      payload = {}
    ) {
      // FIXME Payment method belum jalan
      return apiAdmisiGet(
        `/rawat-inap?q=${q}&payment_method=${paymentMethod}&page=${page}&limit=${limit}&room=${room}&start_date=${startDate}&end_date=${endDate}&dpjp=${dpjp}`,
        payload
      );
    },
    async registNewBorn(payload = {}) {
      return apiAdmisiPost("/rawat-inap", payload);
    },
    async updateRI(uuid: string = "", payload = {}) {
      return apiAdmisiPut(`/rawat-inap/${uuid}`, payload);
    },
    async getDetailRI(uuid: string = "", payload = {}) {
      return apiAdmisiGet(`/rawat-inap/${uuid}`, payload);
    },
    async cancelVisitRI(payload = {}) {
      return apiAdmisiDelete("/rawat-inap/cancel", payload);
    },
  },
});
