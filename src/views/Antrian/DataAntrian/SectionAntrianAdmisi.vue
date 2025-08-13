<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const data = ref([
  {
    id: "1",
    tanggal_daftar: "2023-10-10 09:00",
    tanggal_jadwal: "2023-10-20 10:00",
    nomor_book: "BK.123456",
    nomor_antrian: "PD-01-02",
    nama_pasien: "Nama Lengkap Pasien",
    no_rm: "00-00-00",
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
    no_rm: "00-00-00",
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
    no_rm: "00-00-00",
    doktor_keperawatan: "dr. Adameds bin Adameds Sp. Pk",
    nama_poli: "poli umum",
    metode_bayar: "BPJS",
    status: "selesai",
  },
]);
const expandedRows = ref();
onMounted(() => {
  data.value;
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
    bgColor: "bg-gray-50",
    textColor: "text-gray-500",
    borderColor: "border-gray-300",
    label: "ANTRI",
  },
  proses: {
    bgColor: "bg-warning-50",
    textColor: "text-warning-300",
    borderColor: "border-warning-300",
    label: "PROSES",
  },
  selesai: {
    bgColor: "bg-adameds-50",
    textColor: "text-adameds-300",
    borderColor: "border-adameds-300",
    label: "SELESAI",
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
    <Column header-class="justify-center text-black bg-adameds-50">
      <template #header>
        <div class="w-full font-semibold text-center">No.</div>
      </template>
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
        <div class="py-1.5 space-y-1 text-SM">
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
    <Column header="Nomor" header-class="text-black bg-adameds-50" class="p-0">
      <template #body="slotProps">
        <div class="py-1.5 text-SM">
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
          <div class="grid content-center grid-cols-[60px_min-content_70px]">
            Antrian
            <img
              src="@/assets/icons/solar_arrow-left-broken (1).svg"
              alt="Arrow Icon"
              class="my-auto mr-8"
            />
            {{ slotProps.data.nomor_antrian }}
          </div>
        </div>
      </template></Column
    >
    <Column header="Pasien" header-class="text-black bg-adameds-50" class="p-0"
      ><template #body="slotProps">
        <div class="items-center py-1.5 space-y-0.5">
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
              customClass="h-5 "
            />
          </div>
        </div>
      </template>
    </Column>
    <Column
      field="metode_bayar"
      header="Metode Bayar"
      header-class="text-black bg-adameds-50"
      class="p-0"
      ><template #body="slotProps">
        <div class="flex items-center">
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
        </div> </template
    ></Column>
    <Column
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
