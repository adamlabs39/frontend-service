<script lang="ts" setup>
import CustomChip from "@/components/Base/CustomChip.vue";
import NoData from "@/components/section/NoData.vue";
import { ref } from "vue";

const selectedPengajuanPembelian = ref([]);
const pengajuanPembelians = ref([
  {
    tanggalPembelian: "01-01-2024",
    noPembelian: "PO1234",
    kategoriItem: "Medis",
    jenisItem: "Obat",
    jenisStok: "Umum",
    supplier: "PT. Sanbe",
    petugasPembuatPO: "Nama Petugas",
    status: "PENGAJUAN",
  },
  {
    tanggalPembelian: "01-01-2024",
    noPembelian: "PO1234",
    kategoriItem: "Medis",
    jenisItem: "Obat",
    jenisStok: "Umum",
    supplier: "PT. Kimia Farma",
    petugasPembuatPO: "Nama Petugas",
    status: "PENGAJUAN",
  },
]);
</script>

<template>
  <DataTable
    v-if="pengajuanPembelians.length"
    v-model:selection="selectedPengajuanPembelian"
    :value="pengajuanPembelians"
    tableStyle="min-width: 50rem"
    scrollable
    scrollHeight="240px"
    class="-m-4"
    :pt="{ headerRow: 'text-SM' }"
  >
    <Column field="tanggal" headerClass="bg-adameds-50">
      <template #header>
        <div class="font-semibold">Tanggal</div>
      </template>
      <template #body="slotProps">
        <div class="">
          <div class="text-SM">{{ slotProps.data.tanggalPembelian }}</div>
        </div>
      </template>
    </Column>

    <Column field="noPembelian" headerClass="bg-adameds-50">
      <template #header>
        <div class="font-semibold">No. Pembelian</div>
      </template>
      <template #body="slotProps">
        <div class="">
          <div class="text-SM">{{ slotProps.data.noPembelian }}</div>
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.kategoriItem"
            bgColor="
              bg-adameds-300
            "
            textColor="
             text-white
            "
            customClass="h-5 pr-[6px] border-none mr-[5px]"
          />
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.jenisStok"
            bgColor="
              bg-adameds-300
            "
            textColor="
             text-white
            "
            customClass="h-5 pr-[6px] border-none mr-[5px]"
          />
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.jenisItem"
            bgColor="
              bg-adameds-300
            "
            textColor="
             text-white
            "
            customClass="h-5 pr-[6px] border-none mr-[5px]"
          />
        </div>
      </template>
    </Column>

    <Column field="supplier" headerClass="bg-adameds-50">
      <template #header>
        <div class="w-full font-semibold">Supplier</div>
      </template>
      <template #body="slotProps">
        <div class="">
          <div class="font-bold text-SM">{{ slotProps.data.supplier }}</div>
        </div>
      </template>
    </Column>
    <Column field="petugas" headerClass="bg-adameds-50">
      <template #header>
        <div class="font-semibold">Petugas</div>
      </template>
      <template #body="slotProps">
        <div class="">
          <div class="text-SM">{{ slotProps.data.petugasPembuatPO }}</div>
        </div>
      </template>
    </Column>
    <Column field="status" headerClass="bg-adameds-50">
      <template #header>
        <div class="w-full font-semibold text-center">Status</div>
      </template>
      <template #body="slotProps">
        <div class="text-center">
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.status"
            bgColor="
              bg-grey-300
            "
            textColor="
             text-white
            "
            customClass="h-5 pr-[6px] border-none mr-[5px]"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
