<script setup lang="ts">
import FormAlergi from "@/components/RekamMedis/Alergi/FormAlergi.vue";
import Anamnesis from "@/components/RekamMedis/Anamnesis/Anamnesis.vue";
import AnamnesisIGD from "@/components/RekamMedis/AnamnesisIGD/AnamnesisIGD.vue";
import Triase from "@/components/RekamMedis/Triase/Triase.vue";
import FormTandaVital from "@/components/RekamMedis/TandaVital/FormTandaVital.vue";
import Antropometri from "@/components/RekamMedis/Antropometri/Antropometri.vue";
import FormAsesmenNyeri from "@/components/RekamMedis/AsesmenNyeri/FormAsesmenNyeri.vue";
import Kesadaran from "@/components/RekamMedis/Kesadaran/Kesadaran.vue";
import CatatanHasilPenunjang from "@/components/RekamMedis/CatatanHasilPenunjang/CatatanHasilPenunjang.vue";
import FormDiagnosaDokterICD10 from "@/components/RekamMedis/DiagnosaDokter/FormDiagnosaDokterICD10.vue";
import AsuhanKeperawatan from "@/components/RekamMedis/AsuhanKeperawatan/AsuhanKeperawatan.vue";
import FormCatatanPerawat from "@/components/RekamMedis/CatatanPerawat/FormCatatanPerawat.vue";
import InstruksiMedis from "@/components/RekamMedis/IntruksiMedis/InstruksiMedis.vue";
import PemeriksaanTindakan from "@/components/RekamMedis/PemeriksaanTindakan/PemeriksaanTindakan.vue";
import PemeriksaanFisik from "@/components/RekamMedis/PemeriksaanFisik/PemeriksaanFisik.vue";
import PemeriksaanGigi from "@/components/RekamMedis/PemeriksaanGigi/PemeriksaanGigi.vue";
import PemeriksaanMata from "@/components/RekamMedis/PemeriksaanMata/PemeriksaanMata.vue";
import BurnInput from "@/components/RekamMedis/LukaBakar/BurnInput.vue";
import type { PropType } from "vue";

const emit = defineEmits([]);

const props = defineProps({
  selectedAssesment: {
    type: String,
    default: "Alergi",
  },
  rmUuid: {
    type: String,
    default: "",
  },
  sessionUuid: {
    type: String,
    default: "",
  },
  asesmenData: {
    type: Object as PropType<any>,
    default: () => {},
  },
  isLatest: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="overflow-auto">
    <FormAlergi
      v-if="selectedAssesment == 'Alergi'"
      method="form"
      initialState="0"
      :rmUuid="rmUuid"
      :sessionUuid="sessionUuid"
    />
    <Anamnesis
      v-if="selectedAssesment == 'Anamnesis'"
      method="form"
      initialState="0"
      :rmUuid="rmUuid"
      :sessionUuid="sessionUuid"
    />
    <AnamnesisIGD
      v-if="selectedAssesment == 'Anamnesis IGD'"
      method="form"
      initialState="0"
      :rmUuid="rmUuid"
      :sessionUuid="sessionUuid"
    />
    <Triase
      v-if="selectedAssesment == 'Triase'"
      method="form"
      initialState="0"
      :rmUuid="rmUuid"
      :sessionUuid="sessionUuid"
    />
    <FormTandaVital
      v-if="selectedAssesment == 'Tanda Vital'"
      method="form"
      initialState="0"
      :rmUuid="rmUuid"
      :sessionUuid="sessionUuid"
    />
    <Antropometri
      v-if="selectedAssesment == 'Antropometri'"
      method="form"
      initialState="0"
      :rmUuid="rmUuid"
      :sessionUuid="sessionUuid"
    />
    <FormAsesmenNyeri
      v-if="selectedAssesment == 'Asesmen Nyeri'"
      method="form"
      initialState="0"
      :rmUuid="rmUuid"
      :sessionUuid="sessionUuid"
    />
    <Kesadaran
      v-if="selectedAssesment == 'Kesadaran'"
      method="form"
      initialState="0"
      :rmUuid="rmUuid"
      :sessionUuid="sessionUuid"
    />
    <CatatanHasilPenunjang
      v-if="selectedAssesment == 'Catatan Hasil Penunjang'"
      method="form"
      initialState="0"
      :rmUuid="rmUuid"
      :sessionUuid="sessionUuid"
    />
    <FormDiagnosaDokterICD10
      v-if="selectedAssesment == 'Diagnosis Dokter'"
      method="form"
      initialState="0"
    />
    <AsuhanKeperawatan
      v-if="selectedAssesment == 'Asuhan Keperawatan'"
      method="form"
      initialState="0"
      :rmUuid="rmUuid"
      :sessionUuid="sessionUuid"
    />
    <FormCatatanPerawat
      v-if="selectedAssesment == 'Catatan Perawat'"
      method="form"
      initialState="0"
    />
    <InstruksiMedis
      v-if="selectedAssesment == 'Intruksi Medis'"
      method="form"
      initialState="0"
    />
    <PemeriksaanTindakan
      v-if="selectedAssesment == 'Pemeriksaan dan Tindakan'"
      method="form"
      initialState="0"
    />
    <PemeriksaanFisik
      v-if="selectedAssesment == 'Pemeriksaan Fisik'"
      initialState="0"
    />
    <PemeriksaanGigi
      v-if="selectedAssesment == 'Pemeriksaan Gigi'"
      initialState="0"
    />
    <PemeriksaanMata
      v-if="selectedAssesment == 'Pemeriksaan Mata'"
      initialState="0"
    />
    <BurnInput
      v-if="selectedAssesment == 'Derajat Luka Bakar (RON)'"
      initialState="0"
    />
  </div>
</template>
