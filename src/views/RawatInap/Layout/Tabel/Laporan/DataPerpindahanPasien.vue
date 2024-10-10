<script lang="ts" setup>
import CustomChip from "@/components/Base/CustomChip.vue";
import { ref } from "vue";

const perpindahanPasien = ref([
  {
    id: 1,
    namaPasien: "Nama Lengkap Pasien",
    noRM: "00-00-00",
    jenisPelayanan: "Rawat Inap",
    penjamin: "TUNAI",
    dariRuangan: "Mawar 1A",
    keRuangan: "ICU",
    dariKelas: "Kelas 3",
    keKelas: "Kelas 1",
    dokter: "dr. Nama Dokter Sp. D",
  },
  {
    id: 2,
    namaPasien: "Nama Lengkap Pasien",
    noRM: "00-00-00",
    jenisPelayanan: "Rawat Inap",
    penjamin: "BPJS",
    dariRuangan: "Melati",
    keRuangan: "Melati",
    dariKelas: "Kelas 2",
    keKelas: "VIP",
    dokter: "dr. Nama Dokter Sp. D",
  },
]);
</script>

<template>
  <DataTable
    :value="perpindahanPasien"
    responsiveLayout="scroll"
    dataKey="id"
    scrollable
    stripedRows
    scrollHeight="flex"
    class="p-datatable-sm"
  >
    <Column
      field="id"
      header="No"
      header-class="text-black bg-adameds-50"
      class="w-10 p-5 text-center text-black text-SM"
    />
    <Column
      field="namaPasien"
      header="Nama Pasien"
      header-class="text-black bg-adameds-50"
      class="text-black text-SM"
    >
      <template #body="slotProps">
        <div>
          <div class="font-bold">{{ slotProps.data.namaPasien }}</div>
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.noRM"
            bgColor="bg-adameds-300"
            textColor="text-white"
            customClass="h-4 pr-[6px] border-none mr-[5px]"
          />
        </div>
      </template>
    </Column>
    <Column
      field="jenisPelayanan"
      header="Jenis Pelayanan"
      header-class="text-black bg-adameds-50 "
      class="text-black text-SM"
    />
    <Column
      field="penjamin"
      header="Penjamin"
      header-class="text-black bg-adameds-50"
      class="text-black text-SM"
    />
    <Column
      field="perpindahanRuangan"
      header-class="text-black bg-adameds-50"
      class="text-black text-SM"
    >
      <template #header>
        <div class="flex font-semibold">
          <span>Dari Ruangan</span>
          <ArrowRightBrokenIcon :size="18" class="mx-1 text-adameds-300" />
          <span>Dari Ruangan</span>
        </div>
      </template>
      <template #body="slotProps">
        <div>
          <div>
            {{ slotProps.data.dariRuangan }}
          </div>
          <div class="flex mt-[5px]">
            <PhArrowElbowDownRight
              :size="18"
              weight="bold"
              class="text-grey-300"
            />
            <span class="leading-6 ml-[5px]">
              {{ slotProps.data.keRuangan }}
            </span>
          </div>
        </div>
      </template>
    </Column>
    <Column
      field="perpindahanKelas"
      header-class="text-black bg-adameds-50"
      class="text-black text-SM"
    >
      <template #header>
        <div class="flex font-semibold">
          <span>Dari Kelas</span>
          <ArrowRightBrokenIcon :size="18" class="mx-1 text-adameds-300" />
          <span>Dari Kelas</span>
        </div>
      </template>
      <template #body="slotProps">
        <div>
          <div>
            {{ slotProps.data.dariKelas }}
          </div>
          <div class="flex mt-[5px]">
            <PhArrowElbowDownRight
              :size="18"
              weight="bold"
              class="text-grey-300"
            />
            <span class="leading-6 ml-[5px]">
              {{ slotProps.data.keKelas }}
            </span>
          </div>
        </div>
      </template>
    </Column>
    <Column
      field="dokter"
      header="Dokter"
      header-class="text-black bg-adameds-50"
      class="text-SM"
    >
    </Column>
  </DataTable>
</template>
