<script setup lang="ts">
import { ref } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import FormAlergi from "@/components/RekamMedis/Alergi/FormAlergi.vue";
import Anamnesis from "@/components/RekamMedis/Anamnesis/Anamnesis.vue";
import AnamnesisIGD from "@/components/RekamMedis/AnamnesisIGD/AnamnesisIGD.vue";
import Triase from "@/components/RekamMedis/Triase/Triase.vue";
import FormTandaVital from "@/components/RekamMedis/TandaVital/FormTandaVital.vue";
import Antropometri from "@/components/RekamMedis/Antropometri/Antropometri.vue";
import FormAsesmenNyeri from "@/components/RekamMedis/AsesmenNyeri/FormAsesmenNyeri.vue";
import Kesadaran from "@/components/RekamMedis/Kesadaran/Kesadaran.vue";
import PemeriksaanFisik from "@/components/RekamMedis/PemeriksaanFisik/PemeriksaanFisik.vue";
import PemeriksaanGigi from "@/components/RekamMedis/PemeriksaanGigi/PemeriksaanGigi.vue";
import PemeriksaanMata from "@/components/RekamMedis/PemeriksaanMata/PemeriksaanMata.vue";
import BurnInput from "@/components/RekamMedis/LukaBakar/BurnInput.vue";
import CatatanHasilPenunjang from "@/components/RekamMedis/CatatanHasilPenunjang/CatatanHasilPenunjang.vue";
import FormDiagnosaDokterICD10 from "@/components/RekamMedis/DiagnosaDokter/FormDiagnosaDokterICD10.vue";
import AsuhanKeperawatan from "@/components/RekamMedis/AsuhanKeperawatan/AsuhanKeperawatan.vue";
import FormCatatanPerawat from "@/components/RekamMedis/CatatanPerawat/FormCatatanPerawat.vue";
import InstruksiMedis from "@/components/RekamMedis/IntruksiMedis/InstruksiMedis.vue";
import FormOrderObat from "@/components/RekamMedis/OrderObat/AccordionOrderObat.vue";
import PemeriksaanTindakan from "@/components/RekamMedis/PemeriksaanTindakan/PemeriksaanTindakan.vue";
import FormImplementation from "@/components/Fisioterapi/Implementation/FormImplementation.vue";
import FormEvaluation from "@/components/Fisioterapi/Evaluation/FormEvaluation.vue";
import FormReassesment from "@/components/Fisioterapi/Reassesment/FormReassesment.vue";
import FormOrderAlkes from "@/components/RekamMedis/OrderAlkes/AccordionOrderAlkes.vue";
import OrderLab from "@/components/RekamMedis/OrderLab/OrderLab.vue";
import FormOrderFisio from "@/components/RekamMedis/OrderFisio/FormOrderFisio.vue";
import FormPersetujuanPasien from "@/components/RekamMedis/PersetujuanPasien/FormPersetujuanPasien.vue";

const props = defineProps({
  rmType: {
    type: String,
    default: "rawat-jalan",
  },
});

const refs = {
  alergi: ref<any>(null),
  anamnesis: ref<any>(null),
  anamnesisIGD: ref<any>(null),
  triase: ref<any>(null),
  tandaVital: ref<any>(null),
  antropometri: ref<any>(null),
  asesmenNyeri: ref<any>(null),
  kesadaran: ref<any>(null),
  pemeriksaanFisik: ref<any>(null),
  pemeriksaanGigi: ref<any>(null),
  pemeriksaanMata: ref<any>(null),
  lukaBakar: ref<any>(null),
  catatanHasilPenunjang: ref<any>(null),
  diagnosisDokter: ref<any>(null),
  asuhanKeperawatan: ref<any>(null),
  catatanPerawat: ref<any>(null),
  instruksiMedis: ref<any>(null),
  orderObat: ref<any>(null),
  pemeriksaanTindakan: ref<any>(null),
  implementation: ref<any>(null),
  evaluation: ref<any>(null),
  reassessment: ref<any>(null),
  orderAlkes: ref<any>(null),
  orderLab: ref<any>(null),
  orderFisio: ref<any>(null),
  persetujuanPasien: ref<any>(null),
  edukasi: ref<any>(null),
  keadaanWaktuPulang: ref<any>(null),
  statusPulang: ref<any>(null),
};

const toggleShowAllDetailMR = (method = "show") => {
  // refs['pemeriksaanFisik'].value.open()
  Object.keys(refs).forEach((key) => {
    const refKey = key as keyof typeof refs; // pastikan key cocok dengan kunci refs

    const element = refs[refKey].value; // akses elemen dari ref

    if (element) {
      if (method == "show") {
        element.open?.();
      } else {
        element.close?.();
      }
    }
  });
};
</script>

<template>
  <div class="flex mt-5 overflow-auto">
    <!-- <NoData class="grow" title="Belum Ada Pemeriksaan" /> -->
    <div class="grid grid-cols-2 grow gap-2.5 overflow-x-hidden">
      <FormAlergi :ref="refs.alergi" method="detail" />
      <Anamnesis :ref="refs.anamnesis" method="detail" />
      <AnamnesisIGD
        v-if="rmType == 'igd'"
        :ref="refs.anamnesisIGD"
        method="detail"
      />
      <Triase v-if="rmType == 'igd'" :ref="refs.triase" method="detail" />
      <FormTandaVital :ref="refs.tandaVital" method="detail" />
      <Antropometri :ref="refs.antropometri" method="detail" />
      <FormAsesmenNyeri :ref="refs.asesmenNyeri" method="detail" />
      <Kesadaran :ref="refs.kesadaran" method="detail" />
      <PemeriksaanFisik :ref="refs.pemeriksaanFisik" method="detail" />
      <PemeriksaanGigi :ref="refs.pemeriksaanGigi" method="detail" />
      <PemeriksaanMata :ref="refs.pemeriksaanMata" method="detail" />
      <BurnInput :ref="refs.lukaBakar" method="detail" />
      <CatatanHasilPenunjang
        :ref="refs.catatanHasilPenunjang"
        method="detail"
      />
      <FormDiagnosaDokterICD10 :ref="refs.diagnosisDokter" method="detail" />
      <AsuhanKeperawatan :ref="refs.asuhanKeperawatan" method="detail" />
      <FormCatatanPerawat :ref="refs.catatanPerawat" method="detail" />
      <InstruksiMedis :ref="refs.instruksiMedis" method="detail" />
      <FormOrderObat :ref="refs.orderObat" method="detail" />
      <PemeriksaanTindakan :ref="refs.pemeriksaanTindakan" method="detail" />
      <FormImplementation
        v-if="rmType == 'fisio'"
        :ref="refs.implementation"
        method="detail"
      />
      <FormEvaluation
        v-if="rmType == 'fisio'"
        :ref="refs.evaluation"
        method="detail"
      />
      <FormReassesment
        v-if="rmType == 'fisio'"
        :ref="refs.reassessment"
        method="detail"
      />
      <FormOrderAlkes :ref="refs.orderAlkes" method="detail" />
      <OrderLab :ref="refs.orderLab" method="detail" />
      <FormOrderFisio :ref="refs.orderFisio" method="detail" />
      <FormPersetujuanPasien :ref="refs.persetujuanPasien" method="detail" />
    </div>
    <div class="flex flex-col mx-[10px]">
      <CustomButton
        @click="toggleShowAllDetailMR('hide')"
        icon="PhArrowsInLineVertical"
        class="mb-[10px]"
      />
      <CustomButton
        @click="toggleShowAllDetailMR('show')"
        icon="PhArrowsOutLineVertical"
        class=""
      />
    </div>
  </div>
</template>
