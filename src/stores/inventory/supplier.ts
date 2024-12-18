import { apiInventoryGet, apiInventoryPost } from "@/utils/apiHandler";
import { defineStore } from "pinia";


export const useSupplierStore = defineStore({
    id: "supplier",
    state: () => ({}),
    getters: {},
    actions: {
        async getAllSupplier({ page= 1, limit = 10, name = ""}, payload = {}) {
            return apiInventoryGet(`/inventory/datamaster/supplier?page=${page}&limit=${limit}&name=${name}`, payload)
        },
        async createSupplier(payload = {}) {
            return apiInventoryPost("/inventory/datamaster/supplier", payload)
        }
    }
})