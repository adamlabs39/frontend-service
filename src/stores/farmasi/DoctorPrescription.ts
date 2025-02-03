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
      return apiFarmasiPut(`/farmasi/prescriptions/obat/${uuid}/jenis-stok`, payload);
    },
    async statusVerifikasi(payload = {}) {
      return apiFarmasiPost("/farmasi/prescriptions/status-verifikasi", payload);
    },
    async statusSiapDiserahkan(payload = {}) {
      return apiFarmasiPost("/farmasi/prescriptions/status-siap-diserahkan", payload);
    },
    async statusDiserahkan(payload = {}) {
      return apiFarmasiPost("/farmasi/prescriptions/status-diserahkan", payload);
    },
    async lokasiStok(payload = {}) {
      return apiFarmasiPost("/farmasi/prescriptions/lokasi-stok", payload);
    },
    async updateTelaah(payload = {}) {
      return apiFarmasiPost("/farmasi/prescriptions/status-telaah", payload);
    },
    async batalOrder(payload = {}) {
      return apiFarmasiPost("/farmasi/prescriptions/batal-order", payload);
    },
    async batalSiapDiserahkan(payload = {}) {
      return apiFarmasiPost("/farmasi/prescriptions/batal-siap-diserahkan", payload);
    },
  },
});
