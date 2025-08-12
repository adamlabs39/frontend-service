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
      nomor_antrian: "PD-01-02",
      nama_pasien: "Nama Lengkap Pasien",
      no_rm: "RM.123456",
      doktor_keperawatan: "dr. Adameds bin Adameds Sp. Pk",
      nama_poli: "poli umum",
      metode_bayar: "tunai",
      status: "antri",
    },
    {
      id: "2",
      tanggal_daftar: "2023-10-10 09:00",
      tanggal_jadwal: "2023-10-20 10:00",
      nomor_book: "BK.123456",
      nomor_antrian: "PD-01-02",
      nama_pasien: "Nama Lengkap Pasien",
      no_rm: "RM.123456",
      doktor_keperawatan: "dr. Adameds bin Adameds Sp. Pk",
      nama_poli: "poli umum",
      metode_bayar: "tunai",
      status: "proses",
    },
    {
      id: "3",
      tanggal_daftar: "2023-10-10 09:00",
      tanggal_jadwal: "2023-10-20 10:00",
      nomor_book: "BK.123456",
      nomor_antrian: "PD-01-02",
      nama_pasien: "Nama Lengkap Pasien",
      no_rm: "RM.123456",
      doktor_keperawatan: "dr. Adameds bin Adameds Sp. Pk",
      nama_poli: "poli umum",
      metode_bayar: "tunai",
      status: "selesai",
    },
  ];
});

const getChipBgColor = (status:string) => {
  switch (status) {
    case "antri":
      return "bg-blue-50";
    case "proses":
      return "bg-warning-50";
    case "selesai":
      return "bg-adameds-50";
    default:
      return "bg-blue-50";
  }
};

const getChipTextColor = (status:string) => {
  switch (status) {
    case "antri":
      return "text-blue-500";
    case "proses":
      return "text-warning-300";
    case "selesai":
      return "text-adameds-300";
    default:
      return "text-blue-300";
  }
};

const getChipBorderColor = (status:string) => {
  switch (status) {
    case "antri":
      return "border-blue-400";
    case "proses":
      return "border-warning-300";
    case "selesai":
      return "border-adameds-300";
    default:
      return "border-blue-400";
  }
};

const getChipCustomClass = (status:string) => {
  switch (status) {
    case "antri":
      return "h-5 ml-[10px]";
    case "proses":
      return "h-5 ml-[10px]";
    case "selesai":
      return "h-5 ml-[10px]";
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
        <div class="text-SM">
          <div
            class="grid content-center grid-cols-[60px_min-content_110px] auto-cols-min"
          >
            Daftar
            <img
              src="@/assets/icons/solar_arrow-left-broken.svg"
              alt="Arrow Icon"
              class="my-auto mr-8"
            />
            {{ slotProps.data.tanggal_daftar }}
          </div>
          <div
            class="grid content-center grid-cols-[60px_min-content_110px] mt-[5px]"
          >
            Jadwal
            <img
              src="@/assets/icons/solar_arrow-left-broken (1).svg"
              alt="Arrow Icon"
              class="my-auto mr-8"
            />
            {{ slotProps.data.tanggal_jadwal }}
          </div>
        </div>
      </template>
    </Column>
    <Column
      field="nomor"
      header="Nomor"
      header-class="text-black bg-adameds-50"
    >
      <template #body="slotProps">
        <div class="text-SM">
          <div
            class="grid content-center grid-cols-[60px_min-content_70px] auto-cols-min"
          >
            Book
            <img
              src="@/assets/icons/solar_arrow-left-broken.svg"
              alt="Arrow Icon"
              class="my-auto mr-8"
            />
            {{ slotProps.data.nomor_book }}
          </div>
          <div
            class="grid content-center grid-cols-[60px_min-content_70px] mt-[5px]"
          >
            Antrian
            <img
              src="@/assets/icons/solar_arrow-left-broken (1).svg"
              alt="Arrow Icon"
              class="my-auto mr-8"
            />
            {{ slotProps.data.nomor_antrian }}
          </div>
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
                : 'SELESAI'
            "
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
