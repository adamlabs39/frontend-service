import { defineStore } from "pinia";
import {
  apiDatamasterGet,
  apiDatamasterPost,
  apiDatamasterPut,
  apiDatamasterDelete,
} from "@/utils/apiHandler";

export const useLokasiStore = defineStore({
  id: "lokasi",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(
      page: number = 1,
      limit: number = 10,
      name: String = "",
      payload = {}
    ) {
      return apiDatamasterGet(
        `/datamaster/lokasi?page=${page}&limit=${limit}&search=${name}`,
        payload
      );
    },
    async getByPartOfApi(
      partOfUuid: string,
      payload = {}
    ) {
      return apiDatamasterGet(`/datamaster/lokasi/part_of/${partOfUuid}`, payload);
    },
    async getAktifApi(
      params: { type: string; isPoli: string | boolean } = {
        type: "",
        isPoli: "",
      },
      payload = {}
    ) {
      return apiDatamasterGet(
        `/datamaster/lokasi/aktif?type=${params.type}&is_poli=${params.isPoli}`,
        payload
      );
    },
    async getByCodeApi(code = "", payload = {}) {
      return apiDatamasterGet(`/datamaster/lokasi/code/${code}`, payload);
    },
    async postApi(payload = {}) {
      return apiDatamasterPost("/datamaster/lokasi", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiDatamasterPut(`/datamaster/lokasi/${uuid}`, payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiDatamasterDelete(`/datamaster/lokasi/${uuid}`, payload);
    },
    async exportApi(payload = {}) {
      return apiDatamasterGet(`/datamaster/lokasi/export`, payload);
    },
    async importApi(payload = {}) {
      return apiDatamasterPost("/datamaster/lokasi/import", payload);
    },
  }
});
