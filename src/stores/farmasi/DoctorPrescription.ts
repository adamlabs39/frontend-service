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
  },
});
