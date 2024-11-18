<script lang="ts" setup>
import NoData from "@/components/section/NoData.vue";
import { useRekapTindakanStore } from "@/stores/rawatJalan/laporan/rekapTindakan";
import { utilsStore } from "@/stores/utils";
import DataTable from "primevue/datatable";
import { onMounted, ref, watch } from "vue";


const props = defineProps({
  rekapTindakanPasienData: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <!-- {{ rekapTindakanPasien }} -->
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
      field="tindakan"
      header="Tindakan"
      headerClass="bg-adameds-50"
      class="w-[100px]"
    >
      <template #body="slotProps">
        <div class="text-SM">
          <div>{{ slotProps.data.namaTindakan }}</div>
        </div>
      </template>
    </Column>
    <Column
      field="jumlah"
      header="Jumlah"
      headerClass="bg-adameds-50"
      class="w-[100px]"
    >
      <template #body="slotProps">
        <div class="text-SM">
          <div>{{ slotProps.data.jumlahTindakan }}</div>
        </div>
      </template>
    </Column>
  </DataTable>
  <NoData v-else />
</template>
