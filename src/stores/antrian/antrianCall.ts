import { defineStore } from "pinia";
import { ref } from "vue";
import { baseInstanceAdmisi } from "@/utils/Api";

export const useAntrianCallStore = defineStore("antrianCall", () => {
  const antrianList = ref<any[]>([]);

  const getAllAntrianCall = async () => {
    try {
      const response = await baseInstanceAdmisi.get("/antrian-call");
      
      if (response.data && response.data.payload) {
        antrianList.value = response.data.payload;
        return response.data.payload;
      }
      return [];
    } catch (error) {
      console.error("Gagal mengambil data antrian panggilan:", error);
      return [];
    }
  };

  const updateAntrianCall = async (uuid: string, newStatus: number) => {
    try {
      const payload = {
        statusPanggilan: newStatus,
      };
      
      const response = await baseInstanceAdmisi.put(`/antrian-call/${uuid}`, payload);
      
      await getAllAntrianCall(); 

      return response.data;
    } catch (error) {
      console.error(`Gagal memperbarui antrian ${uuid}:`, error);
      throw error;
    }
  };

  return {
    antrianList,
    getAllAntrianCall,
    updateAntrianCall,
  };
});