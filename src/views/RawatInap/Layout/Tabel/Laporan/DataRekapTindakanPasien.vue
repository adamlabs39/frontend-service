<script lang="ts" setup>
import DataTable from "primevue/datatable";
import { ref } from "vue";

const rekapTindakanPasien = ref([
  {
    tindakan: "Pemeriksaan TTV",
    jumlah: 5,
  },
  {
    tindakan: "Pasang Perban",
    jumlah: 3,
  },
]);
</script>

<template>
  <DataTable
    v-if="rekapTindakanPasien.length"
    :value="rekapTindakanPasien"
    tableStyle="min-width: 50rem"
    scrollable
    scrollHeight="flex"
    :pt="{ headerRow: 'text-SM' }"
  >
    <Column field="no" headerClass="bg-adameds-50" header="No" class="w-[10px]" >
      <template #body="slotProps">
        <div class="text-SM">
          {{ slotProps.index + 1 }}
        </div>
      </template>
    </Column>
    <Column
      field="tindakan"
      header="Tindakan"
      headerClass="bg-adameds-50"
      class=""
    >
      <template #body="slotProps">
        <div class="text-SM">
          <div>{{ slotProps.data.tindakan }}</div>
        </div>
      </template>
    </Column>
    <Column
      field="jumlah"
      header="Jumlah"
      headerClass="bg-adameds-50"
      class=""
    >
      <template #body="slotProps">
        <div class="text-SM">
          <div>{{ slotProps.data.jumlah }}</div>
        </div>
      </template>
    </Column>
  </DataTable>
</template>
