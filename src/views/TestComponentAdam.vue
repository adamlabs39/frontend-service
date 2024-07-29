<template>
  <div>
    <AutoComplete 
      showLabel="Choose Pasien" 
      v-model="value" 
      :suggestions="items" 
      @complete="search"
      :borderColor="borderColor"
    />
  </div>
</template>

<script setup lang="ts">
import AutoComplete from "@/components/Base/AutoComplete.vue";
import { ref, computed } from "vue";

// Definisikan tipe data untuk pasien
interface Patient {
  id: number;
  name: string;
}

const value = ref<string>("");
const borderColor = ref<string>(""); // Warna border

// Daftar pasien tetap
const allPatients: Patient[] = [
  { id: 1, name: "Megawati" },
  { id: 2, name: "Soeharto" },
  { id: 3, name: "Soekarno" },
  { id: 4, name: "Susilo Bambang Yudhoyono" },
  { id: 5, name: "Jokowi" }
];

// Items yang ditampilkan di AutoComplete
const items = ref<Patient[]>(allPatients);

// Fungsi pencarian
const search = (event: { query: string }) => {
  const filteredPatients = allPatients.filter(patient => 
    patient.name.toLowerCase().includes(event.query.toLowerCase())
  );

  items.value = filteredPatients;

  // Set warna border jika tidak ada hasil pencarian
  borderColor.value = filteredPatients.length === 0 ? 'red' : '';
}
</script>
