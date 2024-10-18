<script lang="ts" setup>
import CustomChip from "@/components/Base/CustomChip.vue";
import NoData from "@/components/section/NoData.vue";
import MedicalRecord from "@/views/MedicalRecord/MedicalRecord.vue";
import { ref } from "vue";
import SectionPerpindahanBangsal from "../../Section/SectionPerpindahanBangsal.vue";

const medicalRecord = ref<any>();

const selectedPatient = ref([]);
const itemsPasien = ref([
  {
    noPendaftaran: "00-00-00",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    practicHour: "08:00 - 10:00",
    tanggalSPRI: "10-10-2024 09:00",
    tanggalDirawat: "10-10-2024 10:00",
    lamaDirawat: "2",
    no_SEP: "",
    ruangan: 'MAWAR 1',
    bed: 'Bed 1',
    insuranceAccountName: "TUNAI",
    polyclinic: "POLI ANAK",
    asal: 'MELATI',
    tujuan: 'ANGGREK',
    gender: "L",
    phone: "082112341234",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-01",
    noREG: "REG2407010049",
    newPatient: true,
    statusPelayanan: "DISCHARGE",
    statusPembayaran: "Belum Lunas",
  },
  {
    noPendaftaran: "00-00-00",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Nama Dokter Sp. M",
    practicHour: "08:00 - 10:00",
    tanggalSPRI: "10-10-2024 09:00",
    tanggalDirawat: "10-10-2024 10:00",
    lamaDirawat: "2",
    no_SEP: "",
    ruangan: 'MAWAR 1',
    bed: 'Bed 1',
    insuranceAccountName: "TUNAI",
    polyclinic: "POLI MATA",
    asal: 'MELATI',
    tujuan: 'ANGGREK',
    gender: "P", // Perempuan
    phone: "081234567890",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-02",
    noREG: "REG2407010049",
    newPatient: false,
    statusPelayanan: "DISCHARGE",
    statusPembayaran: "Belum Lunas",
  },
  {
    noPendaftaran: "00-00-00",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    practicHour: "08:00 - 10:00",
    tanggalSPRI: "10-10-2024 09:00",
    tanggalDirawat: "10-10-2024 10:00",
    lamaDirawat: "2",
    no_SEP: "9999999999999999",
    ruangan: 'MAWAR 1',
    bed: 'Bed 1',
    insuranceAccountName: "BPJS",
    polyclinic: "POLI ANAK",
    asal: 'MELATI',
    tujuan: 'ANGGREK',
    gender: "L",
    phone: "082112341234",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-03",
    noREG: "REG2407010049",
    newPatient: true,
    statusPelayanan: "DISCHARGE",
    statusPembayaran: "Lunas",
  },
  {
    noPendaftaran: "00-00-00",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Nama Dokter Sp. M",
    practicHour: "08:00 - 10:00",
    tanggalSPRI: "10-10-2024 09:00",
    tanggalDirawat: "10-10-2024 10:00",
    lamaDirawat: "2",
    no_SEP: "9999999999999999",
    ruangan: 'MAWAR 1',
    bed: 'Bed 1',
    insuranceAccountName: "BPJS",
    polyclinic: "POLI MATA",
    asal: 'MELATI',
    tujuan: 'ANGGREK',
    gender: "P", // Perempuan
    phone: "081234567890",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-04",
    noREG: "REG2407010049",
    newPatient: false,
    statusPelayanan: "DISCHARGE",
    statusPembayaran: "Lunas",
  },
]);

const sectionPerpindahanBangsal = ref<any>();
const openDialogPerpindahanBangsal = () => {
 sectionPerpindahanBangsal.value?.showDialogPerpindahanBangsal();
};
</script>

<template>
  <DataTable
    v-if="itemsPasien.length"
    v-model:selection="selectedPatient"
    :value="itemsPasien"
    tableStyle="min-width: 50rem"
    scrollable
    stripedRows
    class=""
    scrollHeight="flex"
    :pt="{ headerRow: 'text-SM' }"
    @row-click="openDialogPerpindahanBangsal"
  >
    <Column field="nomor" headerClass="bg-adameds-50">
      <template #header>
        <div class="w-full font-semibold text-center">Nomor</div>
      </template>
      <template #body="slotProps">
        <div class="text-center">
          <div class="text-SM">{{ slotProps.data.noPendaftaran }}</div>
          <!-- <div
            class="max-w-[75px] mx-auto bg-adameds-50 text-adameds-300 rounded-[5px] text-SM font-semibold"
          >
            {{ slotProps.data.noMT }}
          </div>
          <div class="text-SM">{{ slotProps.data.noREG }}</div> -->
        </div>
      </template>
    </Column>
    <Column field="pasien" header="Pasien" headerClass="bg-adameds-50">
      <template #body="slotProps">
        <div class="text-SM">
          <span class="font-semibold">{{ slotProps.data.name }}</span>
          <span class="text-grey-300">
            ({{ slotProps.data.ageYear }}Th {{ slotProps.data.ageMonth }}Bln
            {{ slotProps.data.ageDay }}Hr)
          </span>
        </div>
        <div class="text-XS">{{ slotProps.data.address }}</div>
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
    >
      <template #body="slotProps">
        <div class="text-SM">{{ slotProps.data.doctor }}</div>
        <div class="flex flex-wrap mt-1">
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.ruangan"
            customClass="h-5 pr-[5px] mr-[5px]"
          />
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.bed"
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
    >
      <template #body="slotProps">
        <div class="text-SM">
          <div
            class="flex content-center auto-cols-min"
          >
            SPRI
            <ArrowRightBrokenIcon
              :size="18"
              class="mx-[5px] my-auto text-grey-300"
            />
            {{ slotProps.data.tanggalSPRI }}
          </div>
          <div
            class="flex content-center mt-[5px]"
          >
            Dirawat
            <ArrowRightBrokenIcon
              :size="18"
              class="mx-[5px] my-auto text-blueJeans-300"
            />
            {{ slotProps.data.tanggalDirawat }}
          </div>
          <div
            class="flex content-center mt-[5px]"
          >
            Lama Dirawat
            <ArrowRightBrokenIcon
              :size="18"
              class="mx-[5px] my-auto text-blueJeans-300"
            />
            {{ slotProps.data.lamaHari }} Hari
          </div>
        </div>
      </template>
    </Column>
    <Column field="status" headerClass="bg-adameds-50">
      <template #header>
        <div class="flex font-semibold">
          <div>Asal</div>
          <ArrowRightBrokenIcon
            :size="18"
            class="my-auto mx-[5px] text-grey-300"
          />
          <div>Tujuan</div>
        </div>
      </template>
      <template #body="slotProps">
        <div class="text-SM">
          <div>
            {{ slotProps.data.asal }}
          </div>
          <div class="flex mt-[5px]">
            <PhArrowElbowDownRight
              :size="18"
              weight="bold"
              class="text-grey-300"
            />
            <span class="leading-6 ml-[5px]">
              {{ slotProps.data.tujuan }}
            </span>
          </div>
        </div>
      </template>
    </Column>
  </DataTable>
  <!-- Else -->
  <NoData v-else />
  <SectionPerpindahanBangsal ref="sectionPerpindahanBangsal" />
</template>
