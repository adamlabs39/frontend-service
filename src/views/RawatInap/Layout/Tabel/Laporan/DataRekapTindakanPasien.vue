<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { defineProps } from "vue";

// Mendefinisikan interface untuk tipe data yang diterima
interface RekapTindakan {
  namaTindakan: string;
  total: string;
}

// Mendefinisikan props yang akan diterima dari komponen induk (LaporanPage.vue)
defineProps<{
  payload: RekapTindakan[];
}>();
</script>

<template>
  <DataTable
    v-if="payload.length"
    :value="payload"
    tableStyle="min-width: 50rem"
    scrollable
    stripedRows
    scrollHeight="flex"
    :pt="{ headerRow: 'text-SM' }"
  >
    <Column field="no" headerClass="bg-adameds-50" header="No" class="w-[10px]">
      <template #body="slotProps">
        <div class="text-SM">
          {{ slotProps.index + 1 }}
        </div>
      </template>
    </Column>

    <Column
      field="namaTindakan"
      header="Tindakan"
      headerClass="bg-adameds-50"
    >
      <template #body="slotProps">
        <div class="text-SM">
          <div>{{ slotProps.data.namaTindakan }}</div>
        </div>
      </template>
    </Column>

    <Column
      field="total"
      header="Jumlah"
      headerClass="bg-adameds-50"
    >
      <template #body="slotProps">
        <div class="text-SM">
          <div>{{ slotProps.data.total }}</div>
        </div>
      </template>
    </Column>
  </DataTable>
</template>