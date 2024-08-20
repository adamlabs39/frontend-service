import { defineStore } from "pinia";
import type { selectedBedType } from "@/utils/Interface";

export const utilsStore = defineStore({
  id: "utils",
  state: () => ({
    selectedRoom: null as selectedBedType | null,
  }),
  getters: {},
  actions: {
    setSelectedRoom(roomData: selectedBedType | null) {
      this.selectedRoom = roomData;
    },
  },
});
