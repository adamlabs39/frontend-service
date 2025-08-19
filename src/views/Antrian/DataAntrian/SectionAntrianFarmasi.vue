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
      no_rm: "00-00-00",
      doktor_keperawatan: "dr. Adameds bin Adameds Sp. Pk",
      nama_poli: "poli umum",
      jenis_obat: "obat non-racikan",
      metode_bayar: "BPJS",
      status: "antri",
    },
    {
      id: "2",
      tanggal_daftar: "2023-10-10 09:00",
      tanggal_jadwal: "2023-10-20 10:00",
      nomor_book: "BK.123456",
      nomor_antrian: "R001",
      nama_pasien: "Nama Lengkap Pasien",
      no_rm: "00-00-00",
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
      no_rm: "00-00-00",
      doktor_keperawatan: "dr. Adameds bin Adameds Sp. Pk",
      nama_poli: "poli umum",
      jenis_obat: "obat non-racikan",
      metode_bayar: "tunai",
      status: "penyerahan_obat",
    },
    {
      id: "4",
      tanggal_daftar: "2023-10-10 09:00",
      tanggal_jadwal: "2023-10-20 10:00",
      nomor_book: "BK.123456",
      nomor_antrian: "R002",
      nama_pasien: "Nama Lengkap Pasien",
      no_rm: "00-00-00",
      doktor_keperawatan: "dr. Adameds bin Adameds Sp. Pk",
      nama_poli: "poli umum",
      jenis_obat: "obat racikan",
      metode_bayar: "tunai",
      status: "penyerahan_obat",
    },
  ];
});

// Fungsi untuk mendapatkan style metode bayar
const getMetodeBayarStyle = (metodeBayar: string) => {
  const method = metodeBayar.toLowerCase();

  if (method === "tunai") {
    return {
      bgColor: "bg-adameds-50",
      textColor: "text-adameds-300",
      borderColor: "border-adameds-300",
    };
  } else if (method === "bpjs") {
    return {
      bgColor: "bg-warning-50",
      textColor: "text-warning-300",
      borderColor: "border-warning-300",
    };
  } else {
    return {
      bgColor: "bg-gray-50",
      textColor: "text-gray-500",
      borderColor: "border-gray-300",
    };
  }
};

// Mapping style untuk status
const statusStyles = {
  antri: {
    bgColor: "bg-grey-50",
    textColor: "text-grey-300",
    borderColor: "border-grey-300",
    label: "ANTRI",
  },
  proses: {
    bgColor: "bg-warning-50",
    textColor: "text-warning-300",
    borderColor: "border-warning-300",
    label: "PROSES",
  },
  verifikasi: {
    bgColor: "bg-[#EFF5FD]",
    textColor: "text-[#007AFF]",
    borderColor: "border-[#007AFF]",
    label: "VERIFIKASI",
  },
  penyerahan_obat: {
    bgColor: "bg-adameds-50",
    textColor: "text-adameds-300",
    borderColor: "border-adameds-300",
    label: "PENYERAHAN OBAT",
  },
  default: {
    bgColor: "bg-gray-50",
    textColor: "text-gray-500",
    borderColor: "border-gray-300",
    label: "UNKNOWN",
  },
} as const;

const getStatusStyle = (status: string) => {
  const normalizedStatus = status.toLowerCase();
  return (
    statusStyles[normalizedStatus as keyof typeof statusStyles] ||
    statusStyles.default
  );
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
        <div class="flex justify-center items-center">
          {{ slotProps.index + 1 }}
        </div>
      </template>
    </Column>
    <Column
      header="Data kunjungan"
      header-class="text-black bg-adameds-50"
      class="p-0 w-auto"
    >
      <template #body="slotProps">
        <div class="space-y-2 text-SM">
          <div class="flex gap-2">
            <div>Daftar</div>
            <img
              src="@/assets/icons/solar_arrow-left-broken.svg"
              alt="Arrow Icon"
              class=""
            />
            <div>
              {{ slotProps.data.tanggal_daftar }}
            </div>
          </div>
          <div class="flex gap-2">
            <div>Jadwal</div>
            <img
              src="@/assets/icons/solar_arrow-left-broken (1).svg"
              alt="Arrow Icon"
              class=""
            />
            <div>
              {{ slotProps.data.tanggal_jadwal }}
            </div>
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
        <div class="flex items-center font-semibold">
          {{ slotProps.data.nama_pasien }}
        </div>
        <div class="flex items-center">
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.no_rm"
            bgColor="bg-adameds-300"
            textColor="text-white"
            border-color="border-adameds-300"
            customClass="h-5 "
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
            textColor="text-grey-300"
            border-color="border-grey-300"
            customClass="h-5 my-[2px] mr-[5px] uppercase"
          />
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.jenis_obat"
            bgColor="bg-grey-50"
            textColor="text-grey-300"
            border-color="border-grey-300"
            customClass="h-5 my-[2px] mr-[5px] uppercase"
          />
          <CustomChip
            :showCheckedIcon="false"
            :bgColor="getMetodeBayarStyle(slotProps.data.metode_bayar).bgColor"
            :textColor="
              getMetodeBayarStyle(slotProps.data.metode_bayar).textColor
            "
            :border-color="
              getMetodeBayarStyle(slotProps.data.metode_bayar).borderColor
            "
            customClass="h-5"
            :label="slotProps.data.metode_bayar.toUpperCase()"
          />
        </div>
      </template>
    </Column>
    <Column
      field="status"
      header="Status"
      header-class="flex justify-center items-center text-black bg-adameds-50"
      class="text-center"
    >
      <template #body="slotProps">
        <div class="flex justify-center items-center">
          <CustomChip
            :showCheckedIcon="false"
            v-bind="getStatusStyle(slotProps.data.status)"
            customClass="h-5"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
