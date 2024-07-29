<template>
  <div>
    <AutoComplete 
      showLabel="Choose Pasien" 
      v-model="value" 
      :suggestions="items" 
      @complete="search"
    />
  </div>
</template>

<script setup lang="ts">
import AutoComplete from "@/components/Base/AutoComplete.vue";
import { ref } from "vue";

const value = ref("");
const items = ref<any[]>([]);

// Daftar pasien tetap

// Fungsi pencarian
const search = (event: { query: string }) => {

  let _items = [
  { id: 1, name: "Megawati" },
  { id: 2, name: "Soeharto" },
  { id: 3, name: "Soekarno" },
  { id: 4, name: "Susilo Bambang Yudhoyono" },
  { id: 5, name: "Jokowi" }
];


   items.value = event.query ? items.value = _items.filter(item => 
      item.name.toLowerCase().includes(event.query.toLowerCase())
    ): _items;
}
</script>
