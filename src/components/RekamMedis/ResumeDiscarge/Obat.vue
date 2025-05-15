<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import { useDoctorPrescriptionStore } from "@/stores/farmasi/DoctorPrescription";
import { watch } from "vue";

const props = defineProps({
  obatData: {
    type: Array as PropType<any>,
    default: () => [],
  },
});

// NOTE Store
const doctorPrescriptionStore = useDoctorPrescriptionStore();

const obat = computed(() => props.obatData);
const listOrder = ref<any[]>([]);

watch(
  () => obat.value,
  async (newValue) => {
    listOrder.value = [];
    if (newValue.length) {
      newValue.forEach(async (uuid: "string") => {
        try {
          // storeUtils.setLoading(true);
          const responseDetail = await doctorPrescriptionStore.detailApi(uuid);
          if (responseDetail && responseDetail.payload) {
            responseDetail.payload?.obat.forEach((obatData: any) => {
              listOrder.value.push({
                ...obatData,
                isTakeaway: responseDetail.payload.isTakeaway,
              });
            });
          }
        } catch (error) {
          console.error("Failed to post data", error);
        } finally {
          // storeUtils.setLoading(false);
        }
      });
      // try {
      //   // storeUtils.setLoading(true);
      //   const responseOrderObat =
      //     await doctorPrescriptionStore.getSomeOrderPrescription({
      //       uuides: newValue,
      //     });
      //   if (responseOrderObat && responseOrderObat.payload) {
      //     listOrder.value = responseOrderObat.payload;
      //   }
      // } catch (error) {
      //   console.error("Failed to post data", error);
      // } finally {
      //   // storeUtils.setLoading(false);
      // }
    }
  }
);

const selectedPemeriksaan = ref<any[]>([]);
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
const printSelectedData = () => {
  return selectedPemeriksaan.value;
};

defineExpose({
  open,
  close,
  printSelectedData,
});
</script>

<template>
  <CustomAccordion
    initial-state="0"
    header-class="bg-adameds-50"
    ref="accordion"
  >
    <template #header> Obat </template>
    <template #content>
      <DataTable
        v-model:selection="selectedPemeriksaan"
        :value="listOrder"
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
          field="itemMedis.name"
          header="Nama Obat"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="medicationQty"
          header="Jumlah"
          headerClass="bg-adameds-50"
        >
        </Column>
        <Column
          field="aturanPakai.name"
          header="Aturan Pakai"
          headerClass="bg-adameds-50"
        >
        </Column>
        <Column
          field="caraPakai.caraPakai"
          header="Cara Pakai"
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
:deep(.custom-checkbox .p-checkbox-checked .p-checkbox-box) {
  @apply border-adameds-300 bg-adameds-300;
}

:deep(.custom-checkbox .p-checkbox-checked .p-checkbox-box .p-checkbox-icon) {
  @apply text-white;
}
</style>
