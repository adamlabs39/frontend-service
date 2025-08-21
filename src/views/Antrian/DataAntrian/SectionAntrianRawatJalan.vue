<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import { useDataAntrianStore } from "@/stores/antrian/dataAntrian";
import { utilsStore } from "@/stores/utils";

const dataAntrianStore = useDataAntrianStore();
const useUtilsStore = utilsStore();

const dataAntrianRjPayload = ref([]);
const dataAntrianRjProperties = ref({
  page: 1,
  pageSize: 10,
  totalData: 0,
});

const convertPaymentMethod = (paymentMethod: number | string): string => {
  const method = Number(paymentMethod);

  switch (method) {
    case 1:
      return "Tunai";
    case 2:
      return "Asuransi";
    default:
      return "Tidak Diketahui"; // Default untuk nilai yang tidak valid
  }
};

watch(
  () => dataAntrianRjPayload.value,
  (newValue) => {
    console.log("Data Antrian RJ Payload:", newValue);
  },
  { deep: true }
);

const fetchGetDataAntrianRj = async () => {
  try {
    const response = await dataAntrianStore.getAntrianRJ(
      1128557830,
      1999999999,
      dataAntrianRjProperties.value.page,
      dataAntrianRjProperties.value.pageSize,
      dataAntrianRjProperties.value.totalData
    );
    console.log("Ini adalah data antrian rawat jalan", response);
    if (response) {
      dataAntrianRjPayload.value = response.payload;
      dataAntrianRjProperties.value.totalData = response.properties.totalData;
    }
  } catch (error) {}
};

const dateFormat = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  return `${day}-${month}-${year}`;
};

onMounted(async () => {
  fetchGetDataAntrianRj();
});

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

// Fungsi untuk mendapatkan style metode bayar
const getMetodeBayarStyle = (paymentMethod: number) => {
  const convertedMethod = convertPaymentMethod(paymentMethod).toLowerCase();

  if (convertedMethod === "tunai") {
    return {
      bgColor: "bg-adameds-50",
      textColor: "text-adameds-300",
      borderColor: "border-adameds-300",
    };
  } else if (convertedMethod === "asuransi") {
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

const convertStatusRj = (statusRj: number): string => {
  switch (statusRj) {
    case 1:
      return "antri";
    case 2:
      return "antri";
    case 3:
      return "antri";
    case 4:
      return "proses";
    case 5:
      return "selesai";
    default:
      return "unknown";
  }
};

const getStatusStyle = (status: string | undefined) => {
  if (!status) {
    return statusStyles.default;
  }
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
    :value="dataAntrianRjPayload"
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
              {{ dateFormat(slotProps.data.tanggalDaftar) }}
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
              {{ slotProps.data.schedule.endTime }}
            </div>
          </div>
        </div>
      </template>
    </Column>
    <Column header="Nomor" header-class="text-black bg-adameds-50" class="p-0">
      <template #body="slotProps">
        <div class="text-SM max-w-[190px] space-y-2">
          <div class="grid grid-cols-3">
            <div>Book</div>
            <div class="flex gap-5">
              <img
                src="@/assets/icons/solar_arrow-left-broken.svg"
                alt="Arrow Icon"
                class=""
              />
              <div>
                {{ slotProps.data.kodeBooking ?? "N/A" }}
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3">
            <div>Antrian</div>
            <div class="flex gap-5">
              <img
                src="@/assets/icons/solar_arrow-left-broken (1).svg"
                alt="Arrow Icon"
                class=""
              />
              <div>
                {{ slotProps.data.noAntrianPoli ?? "N/A" }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </Column>
    <Column header="Pasien" header-class="text-black bg-adameds-50" class="p-0">
      <template #body="slotProps">
        <div class="items-center space-y-0.5">
          <div class="flex items-center font-semibold">
            {{ slotProps.data.patient?.name ?? "N/A" }}
          </div>
          <div class="flex items-center">
            <CustomChip
              :showCheckedIcon="false"
              :label="slotProps.data.noRm"
              bgColor="bg-adameds-300"
              textColor="text-white"
              border-color="border-adameds-300"
              customClass="h-5 "
            />
          </div>
        </div>
      </template>
    </Column>
    <Column
      field="keperawatan"
      header="Keperawatan"
      header-class="text-black bg-adameds-50"
    >
      <template #body="slotProps">
        <div class="flex items-center gap-1">
          <div>
            {{ slotProps.data.practitioner.nama }}
          </div>
          <div>|</div>
          <div>
            {{ slotProps.data.schedule.startTime }} -
            {{ slotProps.data.schedule.endTime }}
          </div>
        </div>
        <div class="flex items-center">
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.polyclinic.name"
            bgColor="bg-grey-50"
            textColor="text-grey-300"
            border-color="border-grey-300"
            customClass="h-5 my-[2px] mr-[5px] uppercase"
          />
          <CustomChip
            :showCheckedIcon="false"
            :bgColor="getMetodeBayarStyle(slotProps.data.paymentMethod).bgColor"
            :textColor="
              getMetodeBayarStyle(slotProps.data.paymentMethod).textColor
            "
            :border-color="
              getMetodeBayarStyle(slotProps.data.paymentMethod).borderColor
            "
            customClass="h-5"
            :label="
              convertPaymentMethod(slotProps.data.paymentMethod).toUpperCase()
            "
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
            v-bind="getStatusStyle(convertStatusRj(slotProps.data.statusRj))"
            customClass="h-5"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
