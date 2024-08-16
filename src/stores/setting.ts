import { defineStore } from "pinia";
import { apiSettingGet, apiSettingPut } from "@/utils/apiHandler";

export const useSettingStore = defineStore({
    id: "index",
    state: () => ({
    }),
    getters: {},
    actions: {
        getApi(payload = {}) {
            return apiSettingGet("setting/profile", payload);
        },
        putApi(payload = {}) {
            return apiSettingPut("setting/profile", payload);
        }
    },
});
