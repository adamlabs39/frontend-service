<script setup lang="ts">
import { onMounted, ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
const diagnosis = ref<any[]>([]);

onMounted(() => {
  diagnosis.value = [
    {
      namaDiagnosis: "Diagnosis Primer",
      tipeDiagnosis: "Primer",
    },
    {
      namaDiagnosis: "Diagnosis Sekunder",
      tipeDiagnosis: "Sekunder",
    },
    {
      namaDiagnosis: "Diagnosis Sekunder",
      tipeDiagnosis: "Sekunder",
    },
    {
      namaDiagnosis: "Diagnosis Sekunder",
      tipeDiagnosis: "Sekunder",
    },
    {
      namaDiagnosis: "Diagnosis Sekunder",
      tipeDiagnosis: "Sekunder",
    },
  ];
});
const selectedPemeriksaan = ref();
const accordion = ref<HTMLCanvasElement | null>(null);
const open = () => {
  if (accordion.value) {
    (accordion.value as any).open();
  }
};
const close = () => {
  if (accordion.value) {
    (accordion.value as any).close();
  }
};

defineExpose({
  open,
  close,
});
</script>

<template>
  <CustomAccordion initial-state="0" header-class="bg-adameds-50" ref="accordion">
    <template #header> Diagnosis </template>
    <template #content>
      <DataTable
        v-model:selection="selectedPemeriksaan"
        :value="diagnosis"
        tableStyle="min-width: 50rem"
        stripedRows
        class="pt-5 text-xs"
      >
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="namaDiagnosis"
          header="Nama Diagnosis"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="tipeDiagnosis"
          header="Tipe Diagnosis"
          headerClass="bg-adameds-50"
        >
        </Column>
        <Column
          body-class="text-center"
          selectionMode="multiple"
          headerClass="bg-adameds-50 w-[15rem]"
          class="custom-checkbox"
        >
          <template #header>
            <div class="font-semibold">Tampilkan Di Cetak Print</div>
          </template>
        </Column>
      </DataTable>
    </template>
  </CustomAccordion>
</template>
<style scoped>
/* Menggunakan ::v-deep untuk menargetkan elemen dalam shadow DOM */
:deep(.custom-checkbox .p-checkbox-checked .p-checkbox-box)  {
  @apply border-adameds-300 bg-adameds-300;
}

:deep(.custom-checkbox .p-checkbox-checked .p-checkbox-box .p-checkbox-icon){
  @apply text-white;
}
</style>
