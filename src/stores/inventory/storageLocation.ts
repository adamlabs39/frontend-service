import { apiInventoryGet, apiInventoryPost, apiInventoryPut } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useStorageLocationStore = defineStore({
    id: "StorageLocation",
    state: () => ({}),
    getters: {},
    actions: {
        async getApi(
            page: number = 1, limit: number = 10, name: String = "", jenisLokasi: String = "", kodeTujuan = "", payload = {}
        ) {
            return apiInventoryGet(
                `/inventory/datamaster/lokasi-gudang?page=${page}&limit=${limit}&name=${name}`,
                payload
            );
        },
    },
});
