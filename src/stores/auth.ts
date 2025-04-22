import { apiAuthPost, apiAuthDelete, apiAuthPut } from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    faskesUuid: "",
  }),
  getters: {
    getFaskesUuid(state) {
      return state.faskesUuid;
    },
  },
  actions: {
    setFaskesUuid(payload: string) {
      this.faskesUuid = payload;
    },
    async loginApi(payload = {}) {
      const response = await apiAuthPost("/login", payload);

      localStorage.setItem("access_token", `Bearer ${response.payload.token}`);
      localStorage.setItem("refresh_token", response.payload.refreshToken);
      localStorage.setItem(
        "permission",
        JSON.stringify(response.payload.permissions)
      );
      localStorage.setItem("user", JSON.stringify(response.payload.user));

      return response;
    },
    async logoutApi() {
      const response = await apiAuthDelete("/logout", {});

      localStorage.removeItem("access_token");
      localStorage.removeItem("permission");
      localStorage.removeItem("user");
      localStorage.removeItem("faskes");
      return response;
    },

    async tokenApi(faskesUuid: string, payload = {}) {
      return apiAuthPut(`/token/${faskesUuid}`, payload);
    },

    async refreshTokenApi() {
      try {
        const access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");
        const response = await apiAuthPost("/auth/refresh-token", {
          token: access_token,
          refresh_token,
        });

        // Simpan token baru
        localStorage.setItem(
          "access_token",
          `Bearer ${response.payload.token}`
        );
        localStorage.setItem("refresh_token", response.payload.refreshToken);

        return response;
      } catch (error) {
        throw new Error("Gagal memperbarui token.");
      }
    },
  },
});
