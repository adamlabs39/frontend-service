import { defineStore } from "pinia";
import {
  apiRekamMedisGet,
  apiRekamMedisPost,
  apiRekamMedisPut,
  apiRekamMedisDelete,
} from "@/utils/apiHandler";

export const useRekamMedisStore = defineStore({
  id: "rekamMedis",
  state: () => ({
    openedRekamMedis: Object as any,
  }),
  getters: {},
  actions: {
    setOpenedRekamMedisData(rmData: any) {
      this.openedRekamMedis = rmData;
    },
    setAsesmentSummaryRekamMedisData(asesmenSummary: any) {
      this.openedRekamMedis.data = asesmenSummary.data;
      this.openedRekamMedis.summary = asesmenSummary.summary;
    },
    setAsesmentRekamMedisData(asesmen: any) {
      if (asesmen.data) {
        this.openedRekamMedis.data = asesmen.data;
      } else {
        this.openedRekamMedis.data = asesmen;
      }
    },

    async createRekamMedis(payload = {}) {
      return apiRekamMedisPost("/rekam-medis", payload);
    },
    async getRekamMedis(
      params: {
        dateOrder?: number;
        sessionOrder?: number;
        rekamMedisUuid: string;
      },
      payload = {}
    ) {
      return apiRekamMedisGet(
        `/rekam-medis?${
          params.dateOrder ? "date_order=" + params.dateOrder : ""
        }${
          params.sessionOrder ? "&session_order=" + params.sessionOrder : ""
        }&rekam_medis_uuid=${params.rekamMedisUuid}`,
        payload
      );
    },

    async createNewRecord(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/record", payload);
    },
    async createNewSession(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/session", payload);
    },
    async deleteSession(payload = {}) {
      return apiRekamMedisDelete("/rekam-medis/session", payload);
    },

    async insertAssesment(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/assessment", payload);
    },
    async insertTindakan(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/tindakan", payload);
    },

    async getInstruksi(sessionUuid: string, payload = {}) {
      return apiRekamMedisGet(
        `/rekam-medis/chat/instruksi?session_uuid=${sessionUuid}`,
        payload
      );
    },
    async insertInstruksi(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/chat/instruksi", payload);
    },
    async insertInstruksiMedis(payload = {}) {
      return apiRekamMedisPut("/rekam-medis/chat/instruksi", payload);
    },

    async getCatatan(sessionUuid: string, payload = {}) {
      return apiRekamMedisGet(
        `/rekam-medis/chat/catatan?session_uuid=${sessionUuid}`,
        payload
      );
    },
    async insertCatatan(payload = {}) {
      return apiRekamMedisPost("/rekam-medis/chat/catatan", payload);
    },
    async insertCatatanPerawat(payload = {}) {
      return apiRekamMedisPut("/rekam-medis/chat/catatan", payload);
    },

    async pushOrderObat(payload: {
      sessionUuid: string;
      orderObatUuid: string;
    }) {
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
