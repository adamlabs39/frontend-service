<script lang="ts" setup>
import CustomChip from "@/components/Base/CustomChip.vue";
import NoData from "@/components/section/NoData.vue";
import { epochToDate } from "@/utils/Helpers";
import MedicalRecord from "@/views/MedicalRecord/MedicalRecord.vue";
import { ref } from "vue";

const props = defineProps({
  dataPatient: {
    type: Array,
    required: true,
  },
});

const medicalRecord = ref<any>();
const openDialogRM = () => {
  medicalRecord.value?.showDialogRM();
};
// const itemsPasien = ref([
//   // {
//   //   noPendaftaran: "00-00-00",
//   //   name: "Nama Pasien Lengkap",
//   //   address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
//   //   doctor: "dr. Spesialis Sp. A",
//   //   practicHour: "08:00 - 10:00",
//   //   tanggalDaftar: "10-10-2024 09:00",
//   //   tanggalJadwal: "10-10-2024 10:00",
//   //   tanggalDischarge: "10-10-2024 12:00",
//   //   no_SEP: "",
//   //   insuranceAccountName: "TUNAI",
//   //   polyclinic: "POLI ANAK",
//   //   gender: "L",
//   //   phone: "082112341234",
//   //   ageYear: 20,
//   //   ageMonth: 3,
//   //   ageDay: 5,
//   //   noMT: "MT-01-01",
//   //   noREG: "REG2407010049",
//   //   newPatient: true,
//   //   statusPelayanan: "DISCHARGE",
//   //   statusPembayaran: "Belum Lunas",
//   // },
//   // {
//   //   noPendaftaran: "00-00-00",
//   //   name: "Nama Pasien Lengkap",
//   //   address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
//   //   doctor: "dr. Nama Dokter Sp. M",
//   //   practicHour: "08:00 - 10:00",
//   //   tanggalDaftar: "10-10-2024 09:00",
//   //   tanggalJadwal: "10-10-2024 10:00",
//   //   tanggalDischarge: "10-10-2024 12:00",
//   //   no_SEP: "",
//   //   insuranceAccountName: "TUNAI",
//   //   polyclinic: "POLI MATA",
//   //   gender: "P", // Perempuan
//   //   phone: "081234567890",
//   //   ageYear: 20,
//   //   ageMonth: 3,
//   //   ageDay: 5,
//   //   noMT: "MT-01-02",
//   //   noREG: "REG2407010049",
//   //   newPatient: false,
//   //   statusPelayanan: "DISCHARGE",
//   //   statusPembayaran: "Belum Lunas",
//   // },
//   // {
//   //   noPendaftaran: "00-00-00",
//   //   name: "Nama Pasien Lengkap",
//   //   address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
//   //   doctor: "dr. Spesialis Sp. A",
//   //   practicHour: "08:00 - 10:00",
//   //   tanggalDaftar: "10-10-2024 09:00",
//   //   tanggalJadwal: "10-10-2024 10:00",
//   //   tanggalDischarge: "10-10-2024 12:00",
//   //   no_SEP: "9999999999999999",
//   //   insuranceAccountName: "BPJS",
//   //   polyclinic: "POLI ANAK",
//   //   gender: "L",
//   //   phone: "082112341234",
//   //   ageYear: 20,
//   //   ageMonth: 3,
//   //   ageDay: 5,
//   //   noMT: "MT-01-03",
//   //   noREG: "REG2407010049",
//   //   newPatient: true,
//   //   statusPelayanan: "DISCHARGE",
//   //   statusPembayaran: "Lunas",
//   // },
//   // {
//   //   noPendaftaran: "00-00-00",
//   //   name: "Nama Pasien Lengkap",
//   //   address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
//   //   doctor: "dr. Nama Dokter Sp. M",
//   //   practicHour: "08:00 - 10:00",
//   //   tanggalDaftar: "10-10-2024 09:00",
//   //   tanggalJadwal: "10-10-2024 10:00",
//   //   tanggalDischarge: "10-10-2024 12:00",
//   //   no_SEP: "9999999999999999",
//   //   insuranceAccountName: "BPJS",
//   //   polyclinic: "POLI MATA",
//   //   gender: "P", // Perempuan
//   //   phone: "081234567890",
//   //   ageYear: 20,
//   //   ageMonth: 3,
//   //   ageDay: 5,
//   //   noMT: "MT-01-04",
//   //   noREG: "REG2407010049",
//   //   newPatient: false,
//   //   statusPelayanan: "DISCHARGE",
//   //   statusPembayaran: "Lunas",
//   // },
// ]);
</script>

<template>
  <DataTable
  v-if="props.dataPatient && props.dataPatient.length"
  :value="props.dataPatient"
    scrollable
    class=""
     scrollHeight="240px"
    :pt="{ headerRow: 'text-SM' }"
    @row-click="openDialogRM"
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
          <div class="text-SM">{{ slotProps.data.noReg }}</div>
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
          <span class="font-semibold">{{ slotProps.data.patient.name }}</span>
          <span class="text-grey-300">
            ({{ slotProps.data.ageYear }}Th {{ slotProps.data.ageMonth }}Bln
            {{ slotProps.data.ageDay }}Hr)
          </span>
        </div>
        <div class="text-XS">{{ slotProps.data?.address?.fullAddress }}</div>
        <div class="flex flex-wrap">
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
            :label="slotProps.data.patient.phone"
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
          <div class="text-SM">{{ slotProps.data.practitioner.nama }}</div>
          <hr class="w-px min-h-5 bg-adameds-300" />
          <div class="text-SM">{{ slotProps.data.schedule.startTime }} - {{ slotProps.data.schedule.endTime }}</div>
        </div>
        <div class="flex flex-wrap mt-1">
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.polyclinic.name"
            customClass="h-5 pr-[5px] mr-[5px]"
          />
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.paymentMethod == '1' ? 'TUNAI' : 'BPJS'"
            :bgColor="slotProps.data.paymentMethod == '1' ? 'bg-adameds-50' : 'bg-warning-50'"
            :textColor="slotProps.data.paymentMethod == '1' ? 'text-adameds-300' : 'text-warning-300'"
            :borderColor="slotProps.data.paymentMethod == '1' ? 'border-adameds-300' : 'border-warning-300'"
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
            {{ epochToDate(slotProps.data.tanggalDaftar, "dateTime") }}
          </div>
          <div
            class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]"
          >
            Diperiksa
            <PhArrowRight
              :size="18"
              class="my-auto mr-5 text-blueJeans-300"
              weight="bold"
            />
            {{ epochToDate(slotProps.data.jadwalPeriksa, "dateTime") }}
          </div>
          <div
            class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]"
          >
            Discharge
            <PhArrowRight
              :size="18"
              class="my-auto mr-5 text-mint-300"
              weight="bold"
            />
            {{ epochToDate(slotProps.data.dischargeDate, "dateTime") }}
          </div>
        </div>
      </template>
    </Column>
    <Column field="status" header="Status" headerClass="bg-adameds-50" class="w-[114px]">
      <template #body="slotProps">
        <div>
          <CustomChip
            :showCheckedIcon="false"
            :label="
              slotProps.data.statusRj == '0' ? 'DIBATALKAN'
              : slotProps.data.statusRj == '1' ? 'BOOKING'
              : slotProps.data.statusRj == '2' ? 'ANTRI'
              : slotProps.data.statusRj == '3' ? 'ANTRIAN'
              : slotProps.data.statusRj == '4' ? 'DIPERIKSA'
              : 'DISCHARGE'
            "
            customClass="h-5 pr-[5px] mr-[5px] border-none"
            :bgColor="
              slotProps.data.statusRj == '0' ? 'bg-danger-75'
              : slotProps.data.statusRj == '1' ? 'bg-orange-75'
              : slotProps.data.statusRj == '2' || slotProps.data.statusRj == '3' ? 'bg-grey-75'
              : slotProps.data.statusRj == '4' ? 'bg-blueJeans-75'
              : 'bg-mint-75'
            "
            :textColor="
              slotProps.data.statusRj == '0' ? 'text-danger-300'
              : slotProps.data.statusRj == '1' ? 'text-orange-300'
              : slotProps.data.statusRj == '2' || slotProps.data.statusRj == '3' ? 'text-grey-400'
              : slotProps.data.statusRj == '4' ? 'text-blueJeans-300'
              : 'text-mint-300'
            "
          />
        </div>
        <div>
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.statusPembayaran"
            customClass="h-5 pr-[5px] mr-[5px] border-none"
            :bgColor="
              slotProps.data.statusPembayaran == 'Belum Lunas'
                ? 'bg-grey-100'
                : 'bg-success-75'
            "
            :textColor="
              slotProps.data.statusPembayaran == 'Belum Lunas'
                ? 'text-grey-400'
                : 'text-success-300'
            "
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <!-- Else -->
  <NoData v-else />
  <MedicalRecord ref="medicalRecord" :patientData="{}" />
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
