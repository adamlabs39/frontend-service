<script setup lang="ts">
import { ref } from 'vue';
import CustomTextfield from '../Base/CustomTextfield.vue';

const data = ref([
  { kelas: "", komponen_tarif: '',total:'' },
]);
</script>

<template>
    <DataTable :value="data"  class="overflow-hidden rounded-lg bg-adameds-50 text-xs">
    <Column field="kelas" header="Kelas" headerClass="bg-adameds-300 text-white" >
      <template #body="slotProps">
        <CustomTextfield label="" />
      </template>
    </Column>
    <Column header="Komponen Tarif" headerClass="bg-adameds-300 text-white">
      <template #body="slotProps">
        <CustomTextfield label="" />
      </template>
    </Column>
    <Column header="Total" headerClass="bg-adameds-300 text-white">
      <template #body="slotProps">
        <CustomTextfield label="" />
      </template>
    </Column>
  </DataTable>
</template>
