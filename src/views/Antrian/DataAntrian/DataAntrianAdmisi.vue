<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const data = ref();
const expandedRows = ref();
onMounted(() => {
  data.value = [
    {
      id: "1",
      tanggal_daftar: "10-10-2024 09:00",
      tanggal_kunjungan: "12-10-2024 10:00",
      kode_booking: "BK.123456",
      nama_pasien: "Nama Pasien Lengkap",
      no_rm: "RM.123456",
      metode_bayar: "Tunai",
      antrian: "1",
      status: "belum dipanggil",
    },
    {
      id: "2",
      tanggal_daftar: "10-10-2024 09:00",
      tanggal_kunjungan: "12-10-2024 10:00",
      kode_booking: "BK.123456",
      nama_pasien: "Nama Pasien Lengkap",
      no_rm: "RM.123456",
      metode_bayar: "Tunai",
      antrian: "2",
      status: "proses",
    },
    {
      id: "3",
      tanggal_daftar: "10-10-2024 09:00",
      tanggal_kunjungan: "12-10-2024 10:00",
      kode_booking: "BK.123456",
      nama_pasien: "Nama Pasien Lengkap",
      no_rm: "RM.123456",
      metode_bayar: "Tunai",
      antrian: "3",
      status: "selesai",
    },
  ];
});

const getChipBgColor = (status) => {
  switch (status) {
    case "belum dipanggil":
      return "bg-blue-50"; // Set color for 'belum dipanggil'
    case "proses":
      return "bg-warning-50"; // Set color for 'proses'
    case "selesai":
      return "bg-adameds-50"; // Set color for 'selesai'
    default:
      return "bg-blue-50";
  }
};

const getChipTextColor = (status) => {
  switch (status) {
    case "belum dipanggil":
      return "text-blue-500"; // Set text color for 'belum dipanggil'
    case "proses":
      return "text-warning-300"; // Set text color for 'proses'
    case "selesai":
      return "text-adameds-300"; // Set text color for 'selesai'
    default:
      return "text-blue-300";
  }
};

const getChipBorderColor = (status) => {
  switch (status) {
    case "belum dipanggil":
      return "border-blue-400"; // Set text color for 'belum dipanggil'
    case "proses":
      return "border-warning-300"; // Set text color for 'proses'
    case "selesai":
      return "border-adameds-300"; // Set text color for 'selesai'
    default:
      return "border-blue-400";
  }
};

const getChipCustomClass = (status) => {
  switch (status) {
    case "belum dipanggil":
      return "h-5 ml-[10px]"; // Custom class for 'belum dipanggil'
    case "proses":
      return "h-5 ml-[10px]"; // Custom class for 'proses'
    case "selesai":
      return "h-5 ml-[10px]"; // Custom class for 'selesai'
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
      field="tanggal_daftar"
      header="Tgl. Daftar"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="tanggal_kunjungan"
      header="Tgl. Kunjungan"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="kode_booking"
      header="Kode Booking"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="nama_pasien"
      header="Nama Pasien"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="no_rm"
      header="No. RM"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="metode_bayar"
      header="Metode Bayar"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="antrian"
      header="Antrian"
      header-class="items-center justify-center text-black bg-adameds-50"
      class="text-center"
    ></Column>
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
              slotProps.data.status === 'belum dipanggil'
                ? 'BELUM DIPANGGIL'
                : slotProps.data.status === 'proses'
                ? 'PROSES'
                : 'SELESAI'
            "
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
