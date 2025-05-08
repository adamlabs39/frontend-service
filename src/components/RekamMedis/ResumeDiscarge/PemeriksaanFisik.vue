<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";

const props = defineProps({
  pemeriksaanFisikData: {
    type: Object as PropType<any>,
    default: () => {},
  },
});

const pemeriksaanFisik = computed(() => {
  if (props.pemeriksaanFisikData) {
    return Object.entries(props.pemeriksaanFisikData).map(
      ([organ, keterangan]) => ({
        organ,
        keterangan,
      })
    );
  } else return [];
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
  <CustomAccordion
    initial-state="0"
    header-class="bg-adameds-50"
    ref="accordion"
  >
    <template #header> Pemeriksaan Fisik </template>
    <template #content>
      <DataTable
        v-model:selection="selectedPemeriksaan"
        :value="pemeriksaanFisik"
        tableStyle="min-width: 50rem"
        stripedRows
        class="pt-5 text-xs"
      >
        <Column
          field="organ"
          header="Lokasi Fisik"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          header="Hasil Pemeriksaan"
          headerClass="bg-adameds-50"
          class="w-4/6"
        >
          <template #body="{ data }">
            {{ data.keterangan == "" ? "-" : data.keterangan }}
          </template>
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
:deep(.custom-checkbox .p-checkbox-checked .p-checkbox-box) {
  @apply border-adameds-300 bg-adameds-300;
}

:deep(.custom-checkbox .p-checkbox-checked .p-checkbox-box .p-checkbox-icon) {
  @apply text-white;
}
</style>
