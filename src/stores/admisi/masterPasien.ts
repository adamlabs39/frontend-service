import { defineStore } from "pinia";
import { apiAdmisiGet, apiAdmisiPost, apiAdmisiPut } from "@/utils/apiHandler";

export const useAdmisiMasterPasienStore = defineStore({
  id: "admisiMasterPasien",
  state: () => ({}),
  getters: {},
  actions: {
    async getMasterPasien({ q = "" }, payload = {}) {
      // return apiAdmisiGet(`/patient?q=${q}`, payload);
      return {
        sucess: true,
        message: "Berhasil Menampilkan Pasien",
        payload: [
          {
            uuid: "0191bb60-3617-72ca-9520-4a732d702aed",
            noRm: "00-00-01",
            name: "Jokowi",
            gender: "Male",
            status: true,
            address: {
              uuid: "0191bb60-35e0-7cda-b9d1-bd8559ef9a0e",
              fullAddress: "Jl. ABC No. 123",
              prov: "Jatim",
              city: "Gresik",
              district: "Tegalsari",
              rt: "001",
              rw: "002",
              village: "Tegalsari",
              country: "Indonesia",
            },
            birthDetail: {
              ageYear: 34,
              ageMonth: 8,
              ageDay: 3,
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

    async getDetailMasterPasien(uuid = "", payload = {}) {
      // return apiAdmisiGet(`/patient/${uuid}`, payload);
      return {
        sucess: true,
        message: "Berhasil Menampilkan Pasien",
        payload: {
          uuid: "0191bb60-3617-72ca-9520-4a732d702aed",
          noRm: "00-00-01",
          title: "Dr.",
          name: "Jokowi",
          identity: "KTP",
          noIdentity: "1234567890123456",
          gender: "Male",
          phone: "081234567890",
          religion: "Islam",
          language: "Indonesian",
          motherName: "Jane Doe",
          maritialStatus: "Married",
          status: true,
          address: {
            uuid: "0191bb60-35e0-7cda-b9d1-bd8559ef9a0e",
            fullAddress: "Jl. ABC No. 123",
            prov: "Jatim",
            city: "Gresik",
            district: "Tegalsari",
            rt: "001",
            rw: "002",
            village: "Tegalsari",
            postalCode: "60262",
            country: "Indonesia",
          },
          birthDetail: {
            uuid: "0191bb60-35e7-7f17-96f0-ded828e27496",
            birthPlace: "Cerme",
            birthDate: "1990-01-01T00:00:00.000Z",
            ageYear: 34,
            ageMonth: 8,
            ageDay: 3,
          },
        },
      };
    },

    async createMasterPasien(payload = {}) {
      return apiAdmisiPost(`/patient`, payload);
    },

    async updateMasterPasien(uuid = "", payload = {}) {
      return apiAdmisiPut(`/patient/${uuid}`, payload);
    },
  },
});
