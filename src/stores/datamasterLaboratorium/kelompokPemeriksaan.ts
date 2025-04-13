import { defineStore } from "pinia";
import {
  apiLaboratoriumGet,
  apiLaboratoriumPost,
  apiLaboratoriumPut,
  apiLaboratoriumDelete,
} from "@/utils/apiHandler";

export const useKelompokPemeriksaanStore = defineStore({
  id: "kelompok-pemeriksaan",
  state: () => ({}),
  getters: {},
  actions: {
    async getApi(
      params: {
        page?: number;
        limit?: number;
        name?: string;
        payload?: object;
      } = {}
    ) {
      const { page = 1, limit = 10, name = "", payload = {} } = params;
      return apiLaboratoriumGet(
        `/lab/kelompok-pemeriksaan?page=${page}&limit=${limit}&name=${name}`,
        payload
      );
    },
    async postApi(payload = {}) {
      return apiLaboratoriumPost("/lab/kelompok-pemeriksaan", payload);
    },
    async putApi(uuid: string, payload = {}) {
      return apiLaboratoriumPut(`/lab/kelompok-pemeriksaan/${uuid}`, payload);
    },
    async deleteApi(uuid: string, payload = {}) {
      return apiLaboratoriumDelete(
        `/lab/kelompok-pemeriksaan/${uuid}`,
        payload
      );
    },
    async exportApi(payload = {}) {
      return apiLaboratoriumGet(
        `/farmasi/datamaster/kategori-obat/export`,
        payload
      );
    },
    async importApi(payload: any) {
      return apiLaboratoriumPost(
        "/farmasi/datamaster/kategori-obat/import",
        payload
      );
    },
  },
});
