import { defineStore } from "pinia";
import {
  apiAdmisiGet,
  apiAdmisiPost,
  apiAdmisiPut,
  apiAdmisiDelete,
} from "@/utils/apiHandler";

export const useAdmisiRJStore = defineStore({
  id: "admisiRJ",
  state: () => ({}),
  getters: {},
  actions: {
    async getRJ(
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
        message: "Data Rawat Jalan Berhasil Ditampilkan",
        payload: [
          {
            uuid: "019288ec-b1e0-7713-b3f6-94e8d06dd819",
            noReg: "REG2410140001",
            noRm: "00-00-01",
            noAntrianAdmisi: null,
            noAntrianPoli: "PJ-DPJ-001",
            platform: "ADMISI",
            tanggalDaftar: 1728874066,
            jadwalPeriksa: 1728867600,
            tanggalCheckin: null,
            paymentMethod: 2,
            patient: {
              uuid: "019288ec-b1c8-7670-979e-1835bd4a2a36",
              title: "Mr.",
              name: "John Doe",
              identity: "KTP",
              noIdentity: "A123568231",
              phone: "+621234567890",
              gender: "Male",
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
            polyclinic: {
              uuid: "0191a18a-22e4-773b-8229-a023f420d0bb",
              name: "Faskes Example",
              code: "FAC001",
            },
            schedule: {
              startTime: "08:00:00",
              endTime: "16:00:00",
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
    async registRJ(payload = {}) {
      return apiAdmisiPost("/rawat-jalan", payload);
    },
    async updateRJ(uuid: string = "", payload = {}) {
      return apiAdmisiPut(`/rawat-jalan/${uuid}`, payload);
    },
    async getDetailRJ(uuid: string = "", payload = {}) {
      return apiAdmisiGet(`/rawat-jalan/${uuid}`, payload);
    },
    async cancelVisitRJ(payload = {}) {
      return apiAdmisiDelete("/rawat-jalan/cancel", payload);
    },
  },
});
