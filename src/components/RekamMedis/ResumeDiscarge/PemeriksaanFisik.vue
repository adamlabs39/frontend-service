<script setup lang="ts">
import { onMounted, ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
const products = ref<any[]>([]);

onMounted(() => {
  products.value = [
    {
      lokasiFisik: "Kepala",
      hasilPemeriksaan: "-",
    },
    {
      lokasiFisik: "Mata",
      hasilPemeriksaan: "Mata perih",
    },
    {
      lokasiFisik: "Telinga",
      hasilPemeriksaan: "-",
    },
    {
      lokasiFisik: "Tenggorokan",
      hasilPemeriksaan: "-",
    },
    {
      lokasiFisik: "Mulut",
      hasilPemeriksaan: "-",
    },
  ];
});
const selectedPemeriksaan = ref();
</script>

<template>
  <CustomAccordion initial-state="0" header-class="bg-adameds-50">
    <template #header> Pemeriksaan Fisik </template>
    <template #content>
      <DataTable
        v-model:selection="selectedPemeriksaan"
        :value="products"
        tableStyle="min-width: 50rem"
        stripedRows
        class="text-xs pt-5"
      >
        <Column
          field="lokasiFisik"
          header="Lokasi Fisik"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="hasilPemeriksaan"
          header="Hasil Pemeriksaan"
          headerClass="bg-adameds-50"
          class="w-4/6"
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
::v-deep .custom-checkbox .p-checkbox-checked .p-checkbox-box {
  @apply border-adameds-300 bg-adameds-300;
}

::v-deep .custom-checkbox .p-checkbox-checked .p-checkbox-box .p-checkbox-icon {
  @apply text-white;
}
</style>
