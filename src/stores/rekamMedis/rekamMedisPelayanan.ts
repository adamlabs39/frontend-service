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
      return apiRekamMedisGet(`/pelayanan/history?no_rm=${noRm}`, payload);
    },
    async getResumeMedis(
      params: { rekamMedisUuid: string; pelayanan: string },
      payload = {}
    ) {
      return apiRekamMedisGet(
        `/pelayanan/resume?rekam_medis_uuid=${params.rekamMedisUuid}&pelayanan=${params.pelayanan}`,
        payload
      );
    },
    async putResumeMedis(payload = {}) {
      return apiRekamMedisPut("/pelayanan/resume", payload);
    },

    async getAllFiles(rekamMedisUuid = "", payload = {}) {
      return apiRekamMedisGet(
        `/pelayanan/files?rekam_medis_uuid=${rekamMedisUuid}`,
        payload
      );
    },
    async uploadFile(payload: {
      rekamMedisUuid: string;
      file: string;
      fileType: string;
      fileFormat: string;
      admissionType: string;
    }) {
      return apiRekamMedisPost(`/pelayanan/files`, payload);
    },
    async updateFile(payload: { file: string; fileUuid: string }) {
      return apiRekamMedisPut(`/pelayanan/files`, payload);
    },
    async deleteFile(rekamMedisUuid = "", payload: { fileUuid: string }) {
      return apiRekamMedisDelete(
        `/pelayanan/files?rekam_medis_uuid=${rekamMedisUuid}`,
        payload
      );
    },
  },
});
