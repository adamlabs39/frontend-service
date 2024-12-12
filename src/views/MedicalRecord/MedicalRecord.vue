<script setup lang="ts">
import { ref } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import DataPatient from "@/components/RekamMedis/DataPatient.vue";
import PemeriksaanFisik from "@/components/RekamMedis/PemeriksaanFisik/PemeriksaanFisik.vue";
import RMCustomSelect from "@/components/Base/RMCustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import FormAlergi from "@/components/RekamMedis/Alergi/FormAlergi.vue";
import Anamnesis from "@/components/RekamMedis/Anamnesis/Anamnesis.vue";
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
import FormImplementation from "@/components/Fisioterapi/Implementation/FormImplementation.vue";
import FormEvaluation from "@/components/Fisioterapi/Evaluation/FormEvaluation.vue";
import FormReassesment from "@/components/Fisioterapi/Reassesment/FormReassesment.vue";
import FormOrderObat from "@/components/RekamMedis/OrderObat/AccordionOrderObat.vue";
import FormOrderAlkes from "@/components/RekamMedis/OrderAlkes/AccordionOrderAlkes.vue";
import OrderLab from "@/components/RekamMedis/OrderLab/OrderLab.vue";
import FormOrderFisio from "@/components/RekamMedis/OrderFisio/FormOrderFisio.vue";
import FormPersetujuanPasien from "@/components/RekamMedis/PersetujuanPasien/FormPersetujuanPasien.vue";
import FormPemberianObat from "@/components/RekamMedis/FPO/FormPemberianObat.vue";
import FormPerpindahan from "@/components/RekamMedis/Perpindahan/FormPerpindahan.vue";
import RiwayatPerpindahanBed from "@/components/RekamMedis/Perpindahan/riwayatPerpindahanBed.vue";
import FormUnggahBerkas from "@/components/RekamMedis/UnggahBerkas/FormUnggahBerkas.vue";
import TandaVital from "@/components/RekamMedis/ResumeDiscarge/TandaVital.vue";
import AnamnesisDischarge from "@/components/RekamMedis/ResumeDiscarge/Anamnesis.vue";
import Edukasi from "@/components/RekamMedis/ResumeDiscarge/Edukasi.vue";
import KeadaanWaktuPulang from "@/components/RekamMedis/ResumeDiscarge/KeadaanWaktuPulang.vue";
import StatusPulang from "@/components/RekamMedis/ResumeDiscarge/StatusPulang.vue";
import PemeriksaanFisikDischarge from "@/components/RekamMedis/ResumeDiscarge/PemeriksaanFisik.vue";
import Diagnosis from "@/components/RekamMedis/ResumeDiscarge/Diagnosis.vue";
import Tindakan from "@/components/RekamMedis/ResumeDiscarge/Tindakan.vue";
import Obat from "@/components/RekamMedis/ResumeDiscarge/Obat.vue";
import ListSuratKeterangan from "@/components/RekamMedis/ListSuratKeterangan/ListSuratKeterangan.vue";
import OdontogramInput from "@/components/RekamMedis/PemeriksaanGigi/OdontogramInput.vue";
import PrintLab from "@/components/RekamMedis/OrderLab/PrintLab.vue";
import MedicalRecordTab from "./SectionNavigator/MedicalRecordTab.vue";
import MedicalRecordNavigation from "./SectionNavigator/MedicalRecordNavigation.vue";
import MedicalRecordDetail from "./SectionContent/MedicalRecordDetail.vue";
import MedicalRecordAssesment from "./SectionContent/MedicalRecordAssesment.vue";

const props = defineProps({
  rmType: {
    type: String,
    default: "rawat-jalan",
  },
});

const dialogRM = ref(false);
const selectedTab = ref("rekam-medis");
const selectedSessionTab = ref("non-sesi");
const historyVisitDialog = ref(false);

const rmDate = ref("");
const rmDateList = ref([
  "Jum’at, 19 Agustus 2024",
  "Sabtu, 20 Agustus 2024",
  "Minggu, 21 Agustus 2024",
  "Senin, 22 Agustus 2024",
]);

const selectedAssesment = ref("Alergi");

const selectedSoap = ref("Subjective");

const selectedSoapier = ref("Subjective");

// Ref container untuk elemen yang dapat discroll
const soapSoapierScrollContainer = ref<HTMLElement | null>(null);

const soapSoapierScrollController = (id: string) => {
  const target = document.getElementById(id);
  if (target && soapSoapierScrollContainer.value) {
    // Ensure soapSoapierScrollContainer is properly scrolled
    const container = soapSoapierScrollContainer.value;
    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    container.scrollTop += targetRect.top - containerRect.top;
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const selectedPenunjang = ref("Order Lab");

// Ref container untuk elemen yang dapat discroll
const resumeDischargeScrollContainer = ref<HTMLElement | null>(null);

const resumeDischargeScrollController = (id: string) => {
  const target = document.getElementById(id);
  if (target && resumeDischargeScrollContainer.value) {
    // Ensure resumeDischargeScrollContainer is properly scrolled
    const container = resumeDischargeScrollContainer.value;
    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    container.scrollTop += targetRect.top - containerRect.top;
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const selectedSuratList = ref("Cetak Hasil Pemeriksaan");

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

const showDialogRM = () => {
  dialogRM.value = true;
};

defineExpose({ showDialogRM });
</script>

<template>
  <div>
    <CustomDialog v-model:visible="dialogRM" class="" fullScreen>
      <template #header>
        <div class="flex justify-between">
          <div class="flex my-auto">
            <span> Detail Pasien </span>
            <span class="mx-[10px]"> | </span>
            <span> Rawat Jalan </span>
            <PhArrowRight :size="18" class="my-auto mx-[10px]" weight="bold" />
            <div
              class="bg-white rounded-lg text-adameds-300 px-[10px] mr-[10px]"
            >
              00-00-00
            </div>
            Nama Lengkap Pasien
          </div>
          <CustomButton
            @click="() => {}"
            icon="PhPrinter"
            label="Cetak Label"
            class="mr-5"
            backgroundColor="bg-white"
            textColor="text-adameds-300"
          />
        </div>
      </template>
      <template #body>
        <div class="pt-[10px] h-full overflow-hidden flex flex-col">
          <DataPatient :rmType="rmType" />
          <div class="flex flex-col overflow-hidden grow">
            <div class="flex justify-between mb-4">
              <div
                v-if="rmType == 'rawat-inap' || rmType == 'igd'"
                class="flex mr-5"
              >
                <RMCustomSelect
                  v-model="rmDate"
                  :options="rmDateList"
                  class="mr-[10px]"
                  optionLabel=""
                  optionValue=""
                />
                <CustomButton icon="PhPlus" size="small" class="!rounded-md" />
              </div>
              <div class="flex">
                <PhStethoscope
                  :size="24"
                  weight="bold"
                  class="text-adameds-300 mr-[10px]"
                />
                <span class="font-semibold leading-6 text-grey-500 text-MD">
                  Pemeriksaan
                </span>
              </div>
              <CustomButton
                @click="historyVisitDialog = true"
                icon="PhClockCounterClockwise"
                label="Riwayat"
                size="small"
                class="!rounded-md ml-auto"
              />
            </div>
            <MedicalRecordTab
              v-model:selected-tab="selectedTab"
              v-model:selected-session-tab="selectedSessionTab"
              :rmType="rmType"
            />
            <MedicalRecordNavigation
              :selectedTab="selectedTab"
              v-model:selected-assesment="selectedAssesment"
              v-model:selected-soap="selectedSoap"
              v-model:selected-soapier="selectedSoapier"
              v-model:selected-penunjang="selectedPenunjang"
              v-model:selected-surat-list="selectedSuratList"
              @soap-soapier-jump="soapSoapierScrollController"
              @resume-discharge-jump="resumeDischargeScrollController"
              :rmType="rmType"
            />

            <MedicalRecordDetail
              v-if="selectedTab == 'rekam-medis'"
              :rmType="rmType"
            />

            <MedicalRecordAssesment
              v-if="selectedTab == 'asesmen'"
              :selectedAssesment="selectedAssesment"
            />

            <div
              v-if="selectedTab == 'soap' || selectedTab == 'soapier'"
              class="flex mt-5 overflow-auto"
              ref="soapSoapierScrollContainer"
            >
              <div class="overflow-x-hidden grow">
                <div
                  v-if="
                    (selectedTab == 'soap' && selectedSoap == 'Subjective') ||
                    (selectedTab == 'soapier' &&
                      selectedSoapier == 'Subjective')
                  "
                >
                  <FormAlergi
                    id="Alergi"
                    :ref="refs.alergi"
                    method="form"
                    class="mb-[10px]"
                  />
                  <Anamnesis
                    id="Anamnesis"
                    :ref="refs.anamnesis"
                    method="form"
                    class=""
                  />
                </div>

                <div
                  v-if="
                    (selectedTab == 'soap' && selectedSoap == 'Objective') ||
                    (selectedTab == 'soapier' && selectedSoapier == 'Objective')
                  "
                >
                  <FormTandaVital
                    id="Tanda Vital"
                    :ref="refs.tandaVital"
                    method="form"
                    class="mb-[10px]"
                  />
                  <Antropometri
                    id="Antropometri"
                    :ref="refs.antropometri"
                    method="form"
                    class="mb-[10px]"
                  />
                  <FormAsesmenNyeri
                    id="Asesmen Nyeri"
                    :ref="refs.asesmenNyeri"
                    method="form"
                    class="mb-[10px]"
                  />
                  <Kesadaran
                    id="Kesadaran"
                    :ref="refs.kesadaran"
                    method="form"
                    class="mb-[10px]"
                  />
                  <PemeriksaanFisik
                    id="Pemeriksaan Fisik"
                    :ref="refs.pemeriksaanFisik"
                    class="mb-[10px]"
                  />
                  <CatatanHasilPenunjang
                    id="Catatan Hasil Penunjang"
                    :ref="refs.catatanHasilPenunjang"
                    method="form"
                    class=""
                  />
                </div>

                <div
                  v-if="
                    (selectedTab == 'soap' && selectedSoap == 'Assesment') ||
                    (selectedTab == 'soapier' && selectedSoapier == 'Assesment')
                  "
                >
                  <FormDiagnosaDokterICD10
                    id="Diagnosis Dokter"
                    :ref="refs.diagnosisDokter"
                    method="form"
                    class="mb-[10px]"
                  />
                  <AsuhanKeperawatan
                    id="Asuhan Keperawatan"
                    :ref="refs.asuhanKeperawatan"
                    method="form"
                    class=""
                  />
                </div>

                <div
                  v-if="
                    (selectedTab == 'soap' && selectedSoap == 'Plan') ||
                    (selectedTab == 'soapier' && selectedSoapier == 'Plan')
                  "
                >
                  <InstruksiMedis
                    id="Instruksi Medis"
                    :ref="refs.instruksiMedis"
                    method="form"
                    class="mb-[10px]"
                  />
                  <FormCatatanPerawat
                    id="Catatan Perawat"
                    :ref="refs.catatanPerawat"
                    method="form"
                    class="mb-[10px]"
                  />
                  <FormOrderObat
                    id="Order Obat"
                    :ref="refs.orderObat"
                    method="form"
                    class="mb-[10px]"
                  />
                  <PemeriksaanTindakan
                    id="Pemeriksaan dan Tindakan"
                    :ref="refs.pemeriksaanTindakan"
                    method="form"
                    class=""
                  />
                </div>

                <div v-if="selectedTab == 'soapier' && selectedSoapier == 'I'">
                  <FormImplementation
                    :ref="refs.implementation"
                    method="form"
                  />
                </div>

                <div v-if="selectedTab == 'soapier' && selectedSoapier == 'E'">
                  <FormEvaluation :ref="refs.evaluation" method="form" />
                </div>

                <div v-if="selectedTab == 'soapier' && selectedSoapier == 'R'">
                  <FormReassesment :ref="refs.reassessment" method="form" />
                </div>
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

            <div v-if="selectedTab == 'penunjang'" class="overflow-auto">
              <OrderLab
                v-if="selectedPenunjang == 'Order Lab'"
                method="form"
                initialState="0"
              />
              <FormOrderFisio
                v-if="selectedPenunjang == 'Order Fisio'"
                method="form"
                initialState="0"
              />
            </div>

            <div v-if="selectedTab == 'alkes'" class="overflow-auto mt-[10px]">
              <FormOrderAlkes method="form" initialState="0" />
            </div>

            <div
              v-if="selectedTab == 'inform-consent'"
              class="overflow-auto mt-[10px]"
            >
              <FormPersetujuanPasien method="form" initialState="0" />
            </div>

            <div v-if="selectedTab == 'fpo'" class="overflow-auto mt-[10px]">
              <FormPemberianObat method="form" initialState="0" />
            </div>

            <div
              v-if="selectedTab == 'perpindahan'"
              class="overflow-auto mt-[10px]"
            >
              <FormPerpindahan
                method="form"
                initialState="0"
                class="mb-[10px]"
              />
              <FormTandaVital
                method="form"
                initialState="0"
                class="mb-[10px]"
              />
              <RiwayatPerpindahanBed method="form" initialState="0" class="" />
            </div>

            <div
              v-if="selectedTab == 'unggah-berkas'"
              class="overflow-auto mt-[10px]"
            >
              <FormUnggahBerkas method="form" initialState="0" />
            </div>

            <div
              v-if="selectedTab == 'resume-discharge'"
              class="overflow-auto mt-[10px] flex"
              ref="resumeDischargeScrollContainer"
            >
              <div class="overflow-auto grow">
                <TandaVital
                  id="Tanda Vital"
                  :ref="refs.tandaVital"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <AnamnesisDischarge
                  id="Ringkasan Riwayat Penyakit"
                  :ref="refs.anamnesis"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <Edukasi
                  id="Edukasi"
                  :ref="refs.edukasi"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <KeadaanWaktuPulang
                  id="Keadaan Waktu Pulang"
                  :ref="refs.keadaanWaktuPulang"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <StatusPulang
                  id="Status Pulang"
                  :ref="refs.statusPulang"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <PemeriksaanFisikDischarge
                  id="Pemeriksaan Fisik"
                  :ref="refs.pemeriksaanFisik"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <Diagnosis
                  id="Diagnosis"
                  :ref="refs.diagnosisDokter"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <Tindakan
                  id="Tindakan"
                  :ref="refs.pemeriksaanTindakan"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <Obat
                  id="Obat"
                  :ref="refs.orderObat"
                  method="form"
                  initialState="0"
                  class=""
                />
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

            <div
              v-if="selectedTab == 'cetak-hasil-surat'"
              class="flex overflow-auto"
            >
              <div
                v-if="selectedSuratList == 'Cetak Hasil Pemeriksaan'"
                class="flex overflow-auto grow"
              >
                <div class="overflow-auto grow">
                  <OdontogramInput :ref="refs.pemeriksaanGigi" method="print" />
                  <PrintLab :ref="refs.orderLab" class="mt-5" />
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
              <ListSuratKeterangan
                v-if="selectedSuratList == 'Surat Keterangan'"
                method="form"
                initialState="0"
                class="grow"
              />
            </div>
          </div>
        </div>
      </template>
    </CustomDialog>
    <!-- Dialog history -->
    <CustomDialog
      class=""
      v-model:visible="historyVisitDialog"
      position="bottomright"
      headerHeight="h-5"
      width="350px"
      closeIcon="PhTextIndent"
    >
      <template #header>
        <div class="flex">
          <PhClockCounterClockwise
            color="white"
            :size="20"
            weight="bold"
            class="my-auto"
          />
          <span class="ml-[10px] text-normal"> Riwayat Kujungan </span>
        </div>
      </template>
      <template #body>
        <div class="h-[60vh]">
          <!-- <div>
            <div>
              Rawat Jalan - Poli Mata
              <CustomChip
                :showCheckedIcon="false"
                label="BPJS"
                bgColor="bg-warning-50"
                textColor="text-warning-300"
                borderColor="border-warning-300"
                customClass="h-5 pr-[6px] mr-[5px]"
              />
            </div>
          </div> -->
        </div>
      </template>
      <template #customCloseIcon>
        <MenuOpenIcon class="text-white" />
      </template>
    </CustomDialog>
  </div>
</template>
