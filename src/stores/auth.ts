import { apiAuthPost, apiAuthDelete, apiAuthPut} from "@/utils/apiHandler";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    faskesUuid: "",
  }),
  getters: {
    getFaskesUuid(state) {
      return state.faskesUuid;
    }
  },
  actions: {
    setFaskesUuid(payload: string) {
      this.faskesUuid = payload
    },
    async loginApi(payload = {}) {
      const response = await apiAuthPost("/login", payload);

      localStorage.setItem("access_token", `Bearer ${response.payload.token}`);
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

    async tokenApi(faskesUuid: string,payload = {}) {
      return apiAuthPut(`/token/${faskesUuid}`,payload);
    },
  },
});
