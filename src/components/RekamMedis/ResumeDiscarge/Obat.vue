<script setup lang="ts">
import { onMounted, ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
const products = ref<any[]>([]);

onMounted(() => {
  products.value = [
    {
      namaObat: "Acarbose",
      jumlah: "10",
      aturanPakai: "3 x 1 (Sehari)",
      caraPakai: "Setelah Makan",
    },
    {
      namaObat: "Acarbose",
      jumlah: "10",
      aturanPakai: "3 x 1 (Sehari)",
      caraPakai: "Setelah Makan",
    },
    {
      namaObat: "Acarbose",
      jumlah: "10",
      aturanPakai: "3 x 1 (Sehari)",
      caraPakai: "Setelah Makan",
    },
  ];
});
const selectedPemeriksaan = ref();
</script>

<template>
  <CustomAccordion initial-state="0" header-class="bg-adameds-50">
    <template #header> Tindakan </template>
    <template #content>
      <DataTable
        v-model:selection="selectedPemeriksaan"
        :value="products"
        tableStyle="min-width: 50rem"
        stripedRows
        class="text-xs pt-5"
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
          field="namaObat"
          header="Nama Obat"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="jumlah"
          header="Jumlah"
          headerClass="bg-adameds-50"
        >
        </Column>
        <Column
          field="aturanPakai"
          header="Aturan Pakai"
          headerClass="bg-adameds-50"
        >
        </Column>
        <Column
          field="caraPakai"
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
::v-deep .custom-checkbox .p-checkbox-checked .p-checkbox-box {
  @apply border-adameds-300 bg-adameds-300;
}

::v-deep .custom-checkbox .p-checkbox-checked .p-checkbox-box .p-checkbox-icon {
  @apply text-white;
}
</style>
