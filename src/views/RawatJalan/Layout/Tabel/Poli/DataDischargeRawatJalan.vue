<script lang="ts" setup>
import CustomChip from "@/components/Base/CustomChip.vue";
import NoData from "@/components/section/NoData.vue";
import { epochToDate, formatDate } from "@/utils/Helpers";
import MedicalRecord from "@/views/MedicalRecord/MedicalRecord.vue";
import { ref } from "vue";
import { useAdmisiRJStore } from "@/stores/admisi/rawatJalan";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  dataPatient: {
    type: Array,
    required: true,
  },
});

const medicalRecord = ref<any>();
const selectedPatientForRM = ref<any>({}); // State untuk menampung data lengkap
const admisiRJStore = useAdmisiRJStore();
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();
const toast = useToast();
// const openDialogRM = () => {
//   medicalRecord.value?.showDialogRM();
// };

const openDialogRM = async (event: any) => {
  try {
    storeUtils.setLoading(true);
    // 1. Ambil data detail dari API
    const responseDetailPelayanan = await admisiRJStore.getDetailRJ(event.data.uuid);

    if (!responseDetailPelayanan || !responseDetailPelayanan.payload) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Gagal mendapatkan detail data pelayanan.",
        life: 3000,
      });
      return;
    }

    // 2. Simpan data lengkap ke state
    selectedPatientForRM.value = responseDetailPelayanan.payload;
    selectedPatientForRM.value.rekamMedisUuid = event.data.rekamMedisUuid;

    // 3. Logika untuk mengambil atau membuat rekam medis (sama seperti komponen lain)
    const rekamMedisUuid = selectedPatientForRM.value.rekamMedisUuid;
    let responseRekamMedis: any;

    if (rekamMedisUuid) {
      responseRekamMedis = await rekamMedisStore.getRekamMedis({ rekamMedisUuid });
    } else {
      const dataPasien = selectedPatientForRM.value;
      const lokasiUuid = dataPasien?.lokasi?.uuid;
      if (!lokasiUuid) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Data lokasi poliklinik tidak ditemukan.",
          life: 3000,
        });
        return;
      }
      responseRekamMedis = await rekamMedisStore.createRekamMedis({
        noRm: dataPasien.patient?.noRm,
        noReg: dataPasien.noReg,
        date: formatDate(new Date(), true),
        pelayanan: "rj",
        lokasiUuid: lokasiUuid,
        noPelayanan: dataPasien.noPelayanan,
        paymentMethod: dataPasien.paymentMethod,
      });
    }

    // 4. Buka dialog rekam medis
    if (responseRekamMedis && responseRekamMedis.payload) {
      selectedPatientForRM.value.rekamMedisUuid = responseRekamMedis.payload.meta.rekamMedisUuid;
      rekamMedisStore.setOpenedRekamMedisData(responseRekamMedis.payload);
      medicalRecord.value?.showDialogRM();
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Gagal memproses data rekam medis pasien.",
        life: 3000,
      });
    }
  } catch (error) {
    console.error("Gagal membuka rekam medis:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Terjadi kesalahan saat memuat rekam medis.",
      life: 3000,
    });
  } finally {
    storeUtils.setLoading(false);
  }
};

</script>
<template>
  <DataTable
    v-if="props.dataPatient && props.dataPatient.length"
    :value="props.dataPatient"
    scrollable
    class="flex-1"
    scrollHeight="flex"
    :pt="{ headerRow: 'text-SM' }"
    @row-click="openDialogRM($event)"
  >
    <Column field="nomor" headerClass="bg-adameds-50">
      <template #header>
        <div class="w-full font-semibold text-center">Nomor</div>
      </template>
      <template #body="slotProps">
        <div class="text-center">
          <div class="text-SM">{{ slotProps.data.noRm }}</div>
          <div
            class="max-w-[75px] mx-auto bg-adameds-50 text-adameds-300 rounded-[5px] text-SM font-semibold"
          >
            {{ slotProps.data.noAntrianPoli }}
          </div>
          <div class="text-SM">{{ slotProps.data.noReg }}</div>
          <div class="text-SM">{{ slotProps.data.noPelayanan }}</div>
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
          <span class="font-semibold">{{ slotProps.data.patient?.name }}</span>
          <span class="text-grey-300" v-if="slotProps.data.birthDetail">
            ({{ slotProps.data.birthDetail.ageYear }}Th {{ slotProps.data.birthDetail.ageMonth }}Bln
            {{ slotProps.data.birthDetail.ageDay }}Hr)
          </span>
        </div>
        <div class="text-XS">{{ slotProps.data?.patient?.address?.fullAddress }}</div>
        <div class="flex flex-wrap">
          <PhUserCirclePlus
            v-if="slotProps.data.newPatient"
            :size="22"
            class="text-adameds-300 mt-auto mr-[5px]"
            weight="fill"
          />
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.patient?.gender == 'Female' ? 'Perempuan' : 'Laki-laki'"
            :bgColor="
              slotProps.data.patient?.gender == 'Female' ? 'bg-female-75' : 'bg-male-75'
            "
            :textColor="
              slotProps.data.patient?.gender == 'Female' ? 'text-female-300' : 'text-male-300'
            "
            customClass="h-5 pr-[6px] border-none mr-[5px]"
          />
          <CustomChip
            v-if="slotProps.data.patient?.phone"
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
          <div class="text-SM" v-if="slotProps.data.practitioner">{{ slotProps.data.practitioner.nama }}</div>
          <hr v-if="slotProps.data.practitioner && slotProps.data.schedule" class="w-px min-h-5 bg-adameds-300" />
          <div class="text-SM" v-if="slotProps.data.schedule">{{ slotProps.data.schedule.startTime }} - {{ slotProps.data.schedule.endTime }}</div>
        </div>
        <div class="flex flex-wrap mt-1">
          <CustomChip
            v-if="slotProps.data.polyclinic"
            :showCheckedIcon="false"
            :label="slotProps.data.polyclinic.name"
            customClass="h-5 pr-[5px] mr-[5px]"
          />
          <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.paymentDethod == 1 ? 'TUNAI' : 'BPJS'"
            :bgColor="slotProps.data.paymentDethod == 1 ? 'bg-adameds-50' : 'bg-warning-50'"
            :textColor="slotProps.data.paymentDethod == 1 ? 'text-adameds-300' : 'text-warning-300'"
            :borderColor="slotProps.data.paymentDethod == 1 ? 'border-adameds-300' : 'border-warning-300'"
            customClass="h-5 pr-[6px] mr-[5px]"
          />
          <CustomChip
            v-if="slotProps.data.no_sep"
            :showCheckedIcon="false"
            :label="`SEP.${slotProps.data.no_sep}`"
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
              String(slotProps.data.statusRj) == '0' ? 'DIBATALKAN'
              : String(slotProps.data.statusRj) == '1' ? 'BOOKING'
              : ['2', '3'].includes(String(slotProps.data.statusRj)) ? 'ANTRI'
              : String(slotProps.data.statusRj) == '4' ? 'DIPERIKSA'
              : 'DISCHARGE'
            "
            customClass="h-5 pr-[5px] mr-[5px] border-none"
            :bgColor="
              String(slotProps.data.statusRj) == '0' ? 'bg-danger-75'
              : String(slotProps.data.statusRj) == '1' ? 'bg-orange-75'
              : ['2', '3'].includes(String(slotProps.data.statusRj)) ? 'bg-grey-75'
              : String(slotProps.data.statusRj) == '4' ? 'bg-blueJeans-75'
              : 'bg-mint-75'
            "
            :textColor="
              String(slotProps.data.statusRj) == '0' ? 'text-danger-300'
              : String(slotProps.data.statusRj) == '1' ? 'text-orange-300'
              : ['2', '3'].includes(String(slotProps.data.statusRj)) ? 'text-grey-400'
              : String(slotProps.data.statusRj) == '4' ? 'text-blueJeans-300'
              : 'text-mint-300'
            "
          />
        </div>
        </template>
    </Column>
  </DataTable>
  <NoData v-else />
  <MedicalRecord ref="medicalRecord" rmType="rawat-jalan" :patientData="selectedPatientForRM" />
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
