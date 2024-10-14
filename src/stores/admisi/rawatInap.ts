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
        platform = "",
        poly = "",
        startDate = "",
        endDate = "",
      },
      payload = {}
    ) {
      // return apiAdmisiGet(
      //   `/rawat-jalan?q=${q}&paymentMethod=${paymentMethod}&page=${page}&limit=${limit}&platform=${platform}&poly=${poly}&start_date=${startDate}&end_date=${endDate}`,
      //   payload
      // );
      return {
        message: "List Rawat Inap",
        payload: [
          {
            uuid: "0192892d-f1b2-791c-b3c3-f8c86cb0531a",
            noReg: "REG2410140002",
            noRm: "00-00-02",
            tanggalDaftar: 1728878342,
            tanggalDirawat: null,
            patient: {
              uuid: "0192892d-f186-7af1-83d9-9728156a0fdb",
              title: "Mr.",
              name: "John Doe",
              identity: "KTP",
              noIdentity: "A123568231",
              phone: "+621234567890",
              address: {
                prov: "Jawa Timur",
                city: "Jakarta Selatan",
                district: "Pancoran",
                rt: "01",
                rw: "02",
                fullAddress: "Jl. Raya No. 123",
                country: "Indonesia",
                village: "Kampung",
              },
            },
            birthDetail: {
              ageYear: 34,
              ageMonth: 9,
              ageDay: 13,
            },
            practitioner: {
              title: "Ir",
              nama: "Rudi tabuti",
              gender: "L",
            },
            monitoringRoom: {
              uuid: "0191696e-5a95-7928-b2aa-4a1cf58aee69",
              roomUuid: "0191690f-1cb3-7a48-8bad-b21700bd19f4",
              roomCategory: "VIP",
              roomClass: "1",
              room: "101",
              bedName: "Kasur 1",
              noBed: "1",
            },
          },
        ],
        properties: {
          page: 1,
          pageSize: 10,
          totalPage: 1,
          totalData: 1,
          nextPage: null,
          prevPage: null,
        },
      };
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
