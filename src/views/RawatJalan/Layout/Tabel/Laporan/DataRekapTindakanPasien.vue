<script lang="ts" setup>
import NoData from "@/components/section/NoData.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const props = defineProps({
  rekapTindakanPasienData: {
    type: Array as () => Array<any>,
    required: true,
  },
});
</script>

<template>
  {{ console.log("Data diterima di komponen anak:", rekapTindakanPasienData) }}
  <DataTable
    v-if="rekapTindakanPasienData.length"
    :value="rekapTindakanPasienData"
    tableStyle="min-width: 50rem"
    scrollable
    scrollHeight="240px"
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
      class="w-[100px] text-SM"
    />

    <Column
      field="total"
      header="Jumlah"
      headerClass="bg-adameds-50"
      class="w-[100px] text-SM"
    />
  </DataTable>
  <NoData v-else />
</template>