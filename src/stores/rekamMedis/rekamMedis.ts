import { defineStore } from "pinia";
import {
  apiRekamMedisGet,
  apiRekamMedisPost,
  apiRekamMedisPut,
} from "@/utils/apiHandler";

export const useRekamMedisStore = defineStore({
  id: "rekamMedis",
  state: () => ({}),
  getters: {},
  actions: {
    async createRekamMedis(payload = {}) {
      return apiRekamMedisPost("/rekam-medis", payload);
    },
    async getRekamMedis(
      { dateOrder = 1, sessionOrder = 1, rekamMedisUuid = "" },
      payload = {}
    ) {
      return apiRekamMedisGet(
        `/rekam-medis?date_order=${dateOrder}&session_order=${sessionOrder}&rekam_medis_uuid=${rekamMedisUuid}`,
        payload
      );
    },

    async createNewRecord(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/record", payload);
    },
    async createNewSession(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/session", payload);
    },

    async insertAssesment(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/assessment", payload);
    },
    async insertTindakan(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/tindakan", payload);
    },

    async insertInstruksi(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/chat/instruksi", payload);
    },
    async insertInstruksiMedis(payload = {}) {
      return apiRekamMedisPut("/rekam-medis/chat/instruksi", payload);
    },

    async insertCatatan(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/chat/catatan", payload);
    },
    async insertCatatanPerawat(payload = {}) {
      return apiRekamMedisPut("/rekam-medis/chat/catatan", payload);
    },

    async pushOrderObat(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/order-obat", payload);
    },
    async addFPO(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/fpo", payload);
    },
    async getFPODetail({ prescriptionItemUuid = "", date = "" }, payload = {}) {
      return apiRekamMedisGet(
        `/rekam-medis/fpo?prescription_item_uuid=${prescriptionItemUuid}&date=${date}`,
        payload
      );
    },
    async editFPO(payload = {}) {
      return apiRekamMedisPut("/rekam-medis/fpo", payload);
    },

    async getAllInformConsent({ rekamMedisUuid = "" }, payload = {}) {
      return apiRekamMedisGet(
        `/rekam-medis/inform-consent?rekam_medis_uuid=${rekamMedisUuid}`,
        payload
      );
    },
    async postInformConsent(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/inform-consent", payload);
    },

    async getHistoryAssesment(
      { noPelayanan = "", noRm = "", key = "", page = 1, limit = 10 },
      payload = {}
    ) {
      return apiRekamMedisGet(
        `/rekam-medis/inform-consent?no_pelayanan=${noPelayanan}&no_rm=${noRm}&key=${key}&page=${page}&limit=${limit}`,
        payload
      );
    },
  },
});
