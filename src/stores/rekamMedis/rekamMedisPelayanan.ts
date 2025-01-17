import { defineStore } from "pinia";
import {
  apiRekamMedisGet,
  apiRekamMedisPost,
  apiRekamMedisPut,
  apiRekamMedisDelete,
} from "@/utils/apiHandler";

export const useRekamMedisPelayananStore = defineStore({
  id: "rekamMedisPelayanan",
  state: () => ({}),
  actions: {
    async getHistory(noRm = "", payload = {}) {
      // return apiRekamMedisGet(`/pelayanan/history?no_rm=${noRm}`, payload);
      return {
        status: "success",
        message: "data berhasil didapat",
        payload: [
          {
            noReg: "1234abcd",
            faskesUuid: "9d403ufjh43ufh3uf8430ihf",
            uuid: "01920369-1355-70fb-a8bc-739fddf06644",
            statusRj: 5,
            tanggalDaftar: 1737102220,
            paymentMethod: 1,
            rekamMedisUuid: "66d81d6845871723afbfe42d",
            practitioner: {
              uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
              pegawai: {
                title: "Ir",
                nama: "Rudi tabuti",
                gender: "L",
              },
            },
            lokasi: {
              code: "FAC001",
              name: "Faskes Example",
              uuid: "0191a18a-22e4-773b-8229-a023f420d0bb",
            },
          },
          {
            noReg: "1234abcd",
            faskesUuid: "9d403ufjh43ufh3uf8430ihf",
            uuid: "01920369-1366-79ed-8740-744a591e0b57",
            statusRi: 4,
            tanggalDaftar: 1737102220,
            paymentMethod: 0,
            rekamMedisUuid: "66d81d6845871723afbfe42d",
            practitioner: {
              uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
              pegawai: {
                title: "Ir",
                nama: "Rudi tabuti",
                gender: "L",
              },
            },
          },
          {
            noReg: "1234abcd",
            faskesUuid: "9d403ufjh43ufh3uf8430ihf",
            uuid: "01920369-1373-747c-8b9d-26444a76bddf",
            statusIgd: 2,
            tanggalDaftar: 1737102220,
            paymentMethod: 0,
            rekamMedisUuid: "66d81d6845871723afbfe42d",
            practitioner: {
              uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
              pegawai: {
                title: "Ir",
                nama: "Rudi tabuti",
                gender: "L",
              },
            },
          },
        ],
      };
    },
  },
});
