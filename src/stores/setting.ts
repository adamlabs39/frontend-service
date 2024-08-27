import { defineStore } from "pinia";
import { apiSettingGet, apiSettingPut } from "@/utils/apiHandler";

export const useSettingStore = defineStore({
    id: "setting",
    state: () => ({
    }),
    getters: {},
    actions: {
        getProfilAkunApi(payload = {}) {
            return apiSettingGet("setting/profile", payload);
        },
        putProfilAkunApi(payload = {}) {
            return apiSettingPut("setting/profile", payload);
        },

        // Profil Faskes
        getProfilFaskesApi(payload = {}) {
            return apiSettingGet("setting/profil-faskes", payload);
        },
        putProfilFaskesApi(payload = {}) {
            return apiSettingPut("setting/profil-faskes", payload);
        }
    },
});
