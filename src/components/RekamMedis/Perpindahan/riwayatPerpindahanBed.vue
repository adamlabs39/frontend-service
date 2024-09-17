<script setup lang="ts">
import { onMounted, ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
const products = ref<any[]>([]);

onMounted(() => {
  products.value = [
    {
      asalBed: "Mawar",
      pindah: "Melati",
      waktuPindah: "08.00",
      keterangan: "permintaan pasien",
      petugas: "Nama Petugas",
    },
    {
      asalBed: "Mawar",
      pindah: "Melati",
      waktuPindah: "08.00",
      keterangan: "permintaan pasien",
      petugas: "Nama Petugas",
    },
    {
      asalBed: "Mawar",
      pindah: "Melati",
      waktuPindah: "08.00",
      keterangan: "permintaan pasien",
      petugas: "Nama Petugas",
    },
  ];
});
</script>

<template>
  <CustomAccordion initial-state="0" header-class="bg-adameds-50">
    <template #header> Riwayat Perpindahan Bed & Ruangan </template>
    <template #content>
        <DataTable
          :value="products"
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
            field="asalBed"
            header="Asal Bed"
            headerClass="bg-adameds-50"
          ></Column>
          <Column
            field="pindah"
            header="Dipindah ke"
            headerClass="bg-adameds-50"
          ></Column>
          <Column
            field="waktuPindah"
            header="Waktu Pindah"
            headerClass="bg-adameds-50"
          ></Column>
          <Column
            field="keterangan"
            header="Keterangan"
            headerClass="bg-adameds-50"
          ></Column>
          <Column
            field="petugas"
            header="Petugas"
            headerClass="bg-adameds-50"
          ></Column>
        </DataTable>
    </template>
  </CustomAccordion>
</template>
