<script lang="ts" setup>
import CustomChip from "@/components/Base/CustomChip.vue";
import NoData from "@/components/section/NoData.vue";
import MedicalRecord from "@/views/MedicalRecord/MedicalRecord.vue";
import { ref, watch } from "vue";

const props = defineProps({
  showCancelVisit: {
    type: Boolean,
    default:false
  },
  isResetPatient: {
    type: Boolean
  }
})


const emit = defineEmits(["handleSelectedPatient", "handleUnselectedPatient", "isResetPatient", 'selectedAll', 'handleUnselectAll']);


const medicalRecord = ref<any>();

const handleSelectionChange = () => {

  console.log('IJofoefjoefj', selectedPatient.value)
  emit('handleSelectedPatient', selectedPatient.value);
};

const openDialogRM = () => {
  medicalRecord.value?.showDialogRM();
};

const handleRowUnselect = () => {
  emit('handleUnselectedPatient', selectedPatient.value);
};

const handleSelectedAll = (dataPatient:any) => {
  emit('selectedAll', dataPatient.data)
}

const handleUnselectAll = (dataPatient:any) => {
  emit('handleUnselectAll', dataPatient.data)
}
const selectedPatient = ref([]);
const itemsPasien = ref([
  {
    noPendaftaran: "00-00-00",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    practicHour: "08:00 - 10:00",
    tanggalDaftar: "10-10-2024 09:00",
    tanggalJadwal: "10-10-2024 10:00",
    no_SEP: "",
    insuranceAccountName: "TUNAI",
    polyclinic: "POLI ANAK",
    gender: "L",
    phone: "082112341234",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-01",
    noREG: "REG2407010049",
    newPatient: true,
    statusPelayanan: "ANTRI",
    statusPembayaran: "Belum Lunas",
  },
  {
    noPendaftaran: "00-00-00",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Nama Dokter Sp. M",
    practicHour: "08:00 - 10:00",
    tanggalDaftar: "10-10-2024 09:00",
    tanggalJadwal: "10-10-2024 10:00",
    no_SEP: "",
    insuranceAccountName: "TUNAI",
    polyclinic: "POLI MATA",
    gender: "P", // Perempuan
    phone: "081234567890",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-02",
    noREG: "REG2407010049",
    newPatient: false,
    statusPelayanan: "DIPERIKSA",
    statusPembayaran: "Belum Lunas",
  },
  {
    noPendaftaran: "00-00-00",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    practicHour: "08:00 - 10:00",
    tanggalDaftar: "10-10-2024 09:00",
    tanggalJadwal: "10-10-2024 10:00",
    no_SEP: "9999999999999999",
    insuranceAccountName: "BPJS",
    polyclinic: "POLI ANAK",
    gender: "L",
    phone: "082112341234",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-03",
    noREG: "REG2407010049",
    newPatient: true,
    statusPelayanan: "DIPERIKSA",
    statusPembayaran: "Belum Lunas",
  },
  {
    noPendaftaran: "00-00-00",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Nama Dokter Sp. M",
    practicHour: "08:00 - 10:00",
    tanggalDaftar: "10-10-2024 09:00",
    tanggalJadwal: "10-10-2024 10:00",
    no_SEP: "9999999999999999",
    insuranceAccountName: "BPJS",
    polyclinic: "POLI MATA",
    gender: "P", // Perempuan
    phone: "081234567890",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-04",
    noREG: "REG2407010049",
    newPatient: false,
    statusPelayanan: "DIPERIKSA",
    statusPembayaran: "Belum Lunas",
  },
   {
    noPendaftaran: "00-00-00",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    practicHour: "08:00 - 10:00",
    tanggalDaftar: "10-10-2024 09:00",
    tanggalJadwal: "10-10-2024 10:00",
    no_SEP: "9999999999999999",
    insuranceAccountName: "BPJS",
    polyclinic: "POLI ANAK",
    gender: "L",
    phone: "082112341234",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-03",
    noREG: "REG2407010049",
    newPatient: true,
    statusPelayanan: "DIBATALKAN",
  },
]);

watch(
  () => props.isResetPatient,
  (newValue) => {
    if (newValue) {
      resetSelection();
      // Reset the prop value after performing reset
      emit('isResetPatient', false);  // Emit event to reset the prop value
    }
  }
);


// Function to reset the selected patient
const resetSelection = () => {
  selectedPatient.value = [];
};
</script>

<template>
  {{ selectedPatient }}

  <DataTable
    v-if="itemsPasien.length"
    v-model:selection="selectedPatient"
    :value="itemsPasien"
    tableStyle="min-width: 50rem"
    scrollable
    scrollHeight="240px"
    class="-m-4"
    @row-click="openDialogRM"
    @row-select-all="handleSelectedAll"
    @row-unselect-all="handleUnselectAll"
    @row-select="handleSelectionChange" 
    @row-unselect="handleRowUnselect"
    :pt="{ headerRow: 'text-SM' }"
  >
    <Column field="nomor" headerClass="bg-adameds-50">
      <template #header>
        <div class="w-full font-semibold text-center">Nomor</div>
      </template>
      <template #body="slotProps">
        <div class="text-center">
          <div class="text-SM">{{ slotProps.data.noPendaftaran }}</div>
          <div
            class="max-w-[75px] mx-auto bg-adameds-50 text-adameds-300 rounded-[5px] text-SM font-semibold"
          >
            {{ slotProps.data.noMT }}
          </div>
          <div class="text-SM">{{ slotProps.data.noREG }}</div>
        </div>
      </template>
    </Column>
    <Column
      field="pasien"
      header="Pasien"
      headerClass="bg-adameds-50"
      class="w-[300px]"
    >
      <template #body="slotProps">
        <div class="text-SM">
          <span class="font-semibold">{{ slotProps.data.name }}</span>
          <span class="text-grey-300">
            ({{ slotProps.data.ageYear }}Th {{ slotProps.data.ageMonth }}Bln
            {{ slotProps.data.ageDay }}Hr)
          </span>
        </div>
        <div class="text-XS">{{ slotProps.data.address }}</div>
        <div class="flex flex-wrap/">
          <PhUserCirclePlus
            v-if="slotProps.data.newPatient"
            :size="22"
            class="text-adameds-300 mt-auto mr-[5px]"
            weight="fill"
          />
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.gender == 'P' ? 'Perempuan' : 'Laki-laki'"
            :bgColor="
              slotProps.data.gender == 'P' ? 'bg-female-75' : 'bg-male-75'
            "
            :textColor="
              slotProps.data.gender == 'P' ? 'text-female-300' : 'text-male-300'
            "
            customClass="h-5 pr-[6px] border-none mr-[5px]"
          />
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.phone"
            bgColor="bg-adameds-50"
            textColor="text-adameds-300"
            customClass="h-5 pr-[6px] border-none mr-[5px]"
          />
        </div>
      </template>
    </Column>
    <Column
      field="keperawatan"
      header="Keperawatan"
      headerClass="bg-adameds-50"
      class="w-[350px]"
    >
      <template #body="slotProps">
        <div class="flex gap-1.5">
          <div class="text-SM">{{ slotProps.data.doctor }}</div>
          <hr class="w-px min-h-5 bg-adameds-300" />
          <div class="text-SM">{{ slotProps.data.practicHour }}</div>
        </div>
        <div class="flex flex-wrap mt-1">
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.polyclinic"
            customClass="h-5 pr-[5px] mr-[5px]"
          />
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.insuranceAccountName"
            :bgColor="
              slotProps.data.insuranceAccountName == 'TUNAI'
                ? 'bg-adameds-50'
                : 'bg-warning-50'
            "
            :textColor="
              slotProps.data.insuranceAccountName == 'TUNAI'
                ? 'text-adameds-300'
                : 'text-warning-300'
            "
            :borderColor="
              slotProps.data.insuranceAccountName == 'TUNAI'
                ? 'border-adameds-300'
                : 'border-warning-300'
            "
            customClass="h-5 pr-[6px] mr-[5px]"
          />
          <CustomChip
            v-if="slotProps.data.no_SEP"
            :showCheckedIcon="false"
            :label="`SEP.${slotProps.data.no_SEP}`"
            bgColor="bg-warning-50"
            textColor="text-warning-300"
            borderColor="border-warning-300"
            customClass="h-5 pr-[6px]"
          />
        </div>
      </template>
    </Column>
    <Column
      field="data-kunjungan"
      header="Data Kunjungan"
      headerClass="bg-adameds-50"
      class="max-w-[240px]"
      
    >
      <template #body="slotProps">
        <div class="text-SM">
          <div
            class="grid content-center grid-cols-[80px_min-content_150px] auto-cols-min"
          >
            Daftar
            <PhArrowRight
              :size="18"
              class="my-auto mr-5 text-grey-300"
              weight="bold"
            />
            {{ slotProps.data.tanggalDaftar }}
          </div>
          <div
            class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]"
          >
            Jadwal
            <PhArrowRight
              :size="18"
              class="my-auto mr-5 text-blueJeans-300"
              weight="bold"
            />
            {{ slotProps.data.tanggalJadwal }}
          </div>
        </div>
      </template>
    </Column>
    <Column field="status" header="Status" headerClass="bg-adameds-50" class="w-[114px]">
      <template #body="slotProps">
        <div>
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.statusPelayanan"
            customClass="h-5 pr-[5px] mr-[5px] border-none"
            :bgColor="
              slotProps.data.statusPelayanan == 'DIPERIKSA'
                ? 'bg-blueJeans-75'
                : slotProps.data.statusPelayanan == 'ANTRI'
              ? 'bg-grey-75'
                : 'bg-danger-75'
            "
            :textColor="
              slotProps.data.statusPelayanan == 'DIPERIKSA'
                ? 'text-blueJeans-300'
                : slotProps.data.statusPelayanan == 'ANTRI'
                ? 'text-grey-400'
                : 'text-danger-300'
            "
          />
        </div>
        <div v-if="slotProps.data.statusPembayaran">
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.statusPembayaran"
            customClass="h-5 pr-[5px] mr-[5px] border-none"
            :bgColor="
              slotProps.data.statusPembayaran == 'Belum Lunas'
                ? 'bg-grey-100'
                : 'bg-none'
            "
            :textColor="
              slotProps.data.statusPembayaran == 'Belum Lunas'
                ? 'text-grey-400'
                : 'text-white'
            "
          />
        </div>
      </template>
    </Column>
    <Column
      v-if="props.showCancelVisit"
      selectionMode="multiple"
      headerStyle="width: 3rem"
      headerClass="bg-adameds-50"
      class="custom-checkbox"
    ></Column>
  </DataTable>
  <!-- Else -->
  <NoData v-else />
   <MedicalRecord ref="medicalRecord" />

   
</template>


<style>
/* TailwindCSS styles */
.custom-checkbox .p-checkbox-checked .p-checkbox-box {
  @apply border-danger-300 bg-danger-300; /* Kelas Tailwind untuk border dan warna latar */
}

.custom-checkbox .p-checkbox-checked .p-checkbox-box .p-checkbox-icon {
  @apply text-white; /* Kelas Tailwind untuk warna tanda centang */
}
</style>