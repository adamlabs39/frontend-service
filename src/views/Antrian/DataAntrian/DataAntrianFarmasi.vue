<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const data = ref();
const expandedRows = ref();
onMounted(() => {
  data.value = [
    {
      id: "1",
      tanggal_daftar: "2023-10-10 09:00",
      tanggal_jadwal: "2023-10-20 10:00",
      nomor_book: "BK.123456",
      nomor_antrian: "NR001",
      nama_pasien: "Nama Lengkap Pasien",
      no_rm: "RM.123456",
      doktor_keperawatan: "dr. Adameds bin Adameds Sp. Pk",
      nama_poli: "poli umum",
      jenis_obat: "obat non-racikan",
      metode_bayar: "tunai",
      status: "antri",
    },
    {
      id: "2",
      tanggal_daftar: "2023-10-10 09:00",
      tanggal_jadwal: "2023-10-20 10:00",
      nomor_book: "BK.123456",
      nomor_antrian: "R001",
      nama_pasien: "Nama Lengkap Pasien",
      no_rm: "RM.123456",
      doktor_keperawatan: "dr. Adameds bin Adameds Sp. Pk",
      nama_poli: "poli umum",
      jenis_obat: "obat racikan",
      metode_bayar: "tunai",
      status: "verifikasi",
    },
    {
      id: "3",
      tanggal_daftar: "2023-10-10 09:00",
      tanggal_jadwal: "2023-10-20 10:00",
      nomor_book: "BK.123456",
      nomor_antrian: "NR002",
      nama_pasien: "Nama Lengkap Pasien",
      no_rm: "RM.123456",
      doktor_keperawatan: "dr. Adameds bin Adameds Sp. Pk",
      nama_poli: "poli umum",
      jenis_obat: "obat non-racikan",
      metode_bayar: "tunai",
      status: "proses",
    },
    {
      id: "4",
      tanggal_daftar: "2023-10-10 09:00",
      tanggal_jadwal: "2023-10-20 10:00",
      nomor_book: "BK.123456",
      nomor_antrian: "R002",
      nama_pasien: "Nama Lengkap Pasien",
      no_rm: "RM.123456",
      doktor_keperawatan: "dr. Adameds bin Adameds Sp. Pk",
      nama_poli: "poli umum",
      jenis_obat: "obat racikan",
      metode_bayar: "tunai",
      status: "selesai",
    },
  ];
});

const getChipBgColor = (status) => {
  switch (status) {
    case "antri":
      return "bg-blue-50";
    case "verifikasi":
      return "bg-cyan-50";
    case "proses":
      return "bg-warning-50";
    case "selesai":
      return "bg-adameds-50";
    default:
      return "bg-blue-50";
  }
};

const getChipTextColor = (status) => {
  switch (status) {
    case "antri":
      return "text-blue-500";
    case "verifikasi":
      return "text-cyan-500";
    case "proses":
      return "text-warning-300";
    case "selesai":
      return "text-adameds-300";
    default:
      return "text-blue-300";
  }
};

const getChipBorderColor = (status) => {
  switch (status) {
    case "antri":
      return "border-blue-400";
    case "verifikasi":
      return "border-cyan-400";
    case "proses":
      return "border-warning-300";
    case "selesai":
      return "border-adameds-300";
    default:
      return "border-blue-400";
  }
};

const getChipCustomClass = (status) => {
  switch (status) {
    default:
      return "h-5 ml-[10px]";
  }
};
</script>

<template>
  <DataTable
    v-model:expandedRows="expandedRows"
    :value="data"
    tableStyle="min-width: 50rem"
    :pt="{ headerRow: 'bg-blue-500 text-white' }"
    class="text-xs"
    stripedRows
    dataKey="id"
    scrollable
    scrollHeight="flex"
  >
    <Column header="No." header-class="text-black bg-adameds-50">
      <template #body="slotProps">
        <div class="flex items-center justify-center">
          {{ slotProps.index + 1 }}
        </div>
      </template>
    </Column>
    <Column
      field="data_kunjungan"
      header="Data Kunjungan"
      header-class="text-black bg-adameds-50"
    >
      <template #body="slotProps">
        <div class="flex items-center">
          Daftar
          <img
            src="@/assets/icons/solar_arrow-left-broken.svg"
            alt="Arrow Icon"
            class="ml-3 mr-2"
          />
          {{ slotProps.data.tanggal_daftar }}
        </div>
        <div class="flex items-center">
          Jadwal
          <img
            src="@/assets/icons/solar_arrow-left-broken (1).svg"
            alt="Arrow Icon"
            class="mx-2"
          />
          {{ slotProps.data.tanggal_jadwal }}
        </div>
      </template>
    </Column>
    <Column
      field="nomor"
      header="Nomor"
      header-class="text-black bg-adameds-50"
    >
      <template #body="slotProps">
        <div class="flex items-center">
          Book
          <img
            src="@/assets/icons/solar_arrow-left-broken.svg"
            alt="Arrow Icon"
            class="ml-5 mr-3"
          />
          {{ slotProps.data.nomor_book }}
        </div>
        <div class="flex items-center">
          Antrian
          <img
            src="@/assets/icons/solar_arrow-left-broken (1).svg"
            alt="Arrow Icon"
            class="mx-2"
          />
          {{ slotProps.data.nomor_antrian }}
        </div>
      </template>
    </Column>
    <Column
      field="pasien"
      header="Pasien"
      header-class="text-black bg-adameds-50"
    >
      <template #body="slotProps">
        <div class="flex items-center">
          {{ slotProps.data.nama_pasien }}
        </div>
        <div class="flex items-center">
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.no_rm"
            bgColor="bg-adameds-50"
            textColor="text-adameds-300"
            border-color="border-adameds-300"
            customClass="h-5 pr-[6px] my-[2px] mr-[5px]"
          />
        </div>
      </template>
    </Column>
    <Column
      field="keperawatan"
      header="Keperawatan"
      header-class="text-black bg-adameds-50"
    >
      <template #body="slotProps">
        <div class="flex items-center">
          {{ slotProps.data.doktor_keperawatan }}
        </div>
        <div class="flex items-center">
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.nama_poli"
            bgColor="bg-grey-50"
            textColor="text-grey-200"
            border-color="border-grey-200"
            customClass="h-5 pr-[6px] my-[2px] mr-[5px] uppercase"
          />
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.jenis_obat"
            bgColor="bg-grey-50"
            textColor="text-grey-200"
            border-color="border-grey-200"
            customClass="h-5 pr-[6px] my-[2px] mr-[5px] uppercase"
          />
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.metode_bayar"
            bgColor="bg-adameds-50"
            textColor="text-adameds-300"
            border-color="border-adameds-300"
            customClass="h-5 pr-[6px] my-[2px] mr-[5px] uppercase"
          />
        </div>
      </template>
    </Column>
    <Column
      field="status"
      header="Status"
      header-class="flex items-center justify-center text-black bg-adameds-50"
      class="text-center"
    >
      <template #body="slotProps">
        <div class="flex items-center justify-center">
          <CustomChip
            :showCheckedIcon="false"
            :bgColor="getChipBgColor(slotProps.data.status)"
            :textColor="getChipTextColor(slotProps.data.status)"
            :border-color="getChipBorderColor(slotProps.data.status)"
            :customClass="getChipCustomClass(slotProps.data.status)"
            :label="
              slotProps.data.status === 'antri'
                ? 'ANTRI'
                : slotProps.data.status === 'proses'
                ? 'PROSES'
                : slotProps.data.status === 'verifikasi'
                ? 'VERIFIKASI'
                : 'SELESAI'
            "
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
