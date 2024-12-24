import { defineStore } from "pinia";
import {
  apiFarmasiGet,
  apiFarmasiPost,
  apiFarmasiPut,
  apiFarmasiDelete,
} from "@/utils/apiHandler";

export const useDoctorPrescriptionStore = defineStore({
  id: "DoctorPrescription",
  state: () => ({}),
  getters: {},
  actions: {
    async dummyGetAll(payload = {}) {
      return {
        sucess: true,
        message: "data berhasil diupdate",
        payload: {
          resepMasuk: [
            {
              uuid: "9d403ufjh43ufh3uf8430ihg",
              noRm: "string",
              noReg: "REG1234",
              noResep: "resep1",
              dokterOrder: "sujiwo",
              jenisPelayanan: "igd",
              orderDate: "1728974618937",
              isTakeaway: false,
              orderStatus: 1,
              isChronic: true,
              isCompound: true,
              paymentMethod: 1,
            },
          ],
          obatDisiapkan: [
            {
              uuid: "9d403ufjh43ufh3uf8430ihi",
              noRm: "string",
              noReg: "REG1234",
              noResep: "resep2",
              dokterOrder: "sujiwo",
              jenisPelayanan: "ri",
              orderDate: "1728974618937",
              isTakeaway: false,
              orderStatus: 3,
              paymentMethod: 1,
            },
          ],
          penyerahanObat: [
            {
              uuid: "9d403ufjh43ufh3uf8430ihh",
              noRm: "string",
              noReg: "REG1234",
              noResep: "resep3",
              dokterOrder: "sujiwo",
              jenisPelayanan: "igd",
              orderDate: "1728974618937",
              isTakeaway: false,
              orderStatus: 4,
              paymentMethod: 1,
              obat: [],
            },
          ],
        },
      };
    },
    async getApi(payload = {}) {
      return apiFarmasiPost("/farmasi/prescriptions/all", payload);
    },
    async detailApi(uuid: string, payload = {}) {
      return apiFarmasiGet(`/farmasi/prescriptions/${uuid}`, payload);
    },
    async updateObatApi(uuid: string, payload = {}) {
      return apiFarmasiPut(`/farmasi/prescriptions/obat/${uuid}`, payload);
    },
    async updateStokObat(uuid: string, payload = {}) {
      return apiFarmasiPut(
        `/farmasi/prescriptions/obat/${uuid}/jenis-stok`,
        payload
      );
    },
    async statusVerifikasi(payload = {}) {
      return apiFarmasiPost(
        "/farmasi/prescriptions/status-verifikasi",
        payload
      );
    },
    async statusSiapDiserahkan(payload = {}) {
      return apiFarmasiPost(
        "/farmasi/prescriptions/status-siap-diserahkan",
        payload
      );
    },
    async statusDiserahkan(payload = {}) {
      return apiFarmasiPost(
        "/farmasi/prescriptions/status-diserahkan",
        payload
      );
    },
    async lokasiStok(payload = {}) {
      return apiFarmasiPost(
        "/farmasi/prescriptions/lokasi-stok",
        payload
      );
    },
    async updateTelaah(payload = {}) {
      return apiFarmasiPost(
        "/farmasi/prescriptions/status-telaah",
        payload
      );
    },
    async batalOrder(payload = {}) {
      return apiFarmasiPost(
        "/farmasi/prescriptions/batal-order",
        payload
      );
    },
    async batalSiapDiserahkan(payload = {}) {
      return apiFarmasiPost(
        "/farmasi/prescriptions/batal-siap-diserahkan",
        payload
      );
    },
  },
});
