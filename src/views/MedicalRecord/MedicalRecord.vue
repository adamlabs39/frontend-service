<script setup lang="ts">
import { computed, ref } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import DataPatient from "./DataPatient.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import SessionTab from "./Section/SessionTab.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import PemeriksaanFisik from "@/components/RekamMedis/PemeriksaanFisik/PemeriksaanFisik.vue";
import BurnInput from "@/components/RekamMedis/LukaBakar/BurnInput.vue";
import RMCustomSelect from "@/components/Base/RMCustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import PemeriksaanGigi from "@/components/RekamMedis/PemeriksaanGigi/PemeriksaanGigi.vue";
import PemeriksaanMata from "@/components/RekamMedis/PemeriksaanMata/PemeriksaanMata.vue";
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
import FormImplementation from "@/components/Fisioterapi/Implementation/FormImplementation.vue";
import FormEvaluation from "@/components/Fisioterapi/Evaluation/FormEvaluation.vue";
import FormReassesment from "@/components/Fisioterapi/Reassesment/FormReassesment.vue";
import FormOrderObat from "@/components/RekamMedis/OrderObat/FormOrderObat.vue";
import FormOrderAlkes from "@/components/RekamMedis/OrderAlkes/FormOrderAlkes.vue";
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

const dialogRM = ref(false);
const selectedTab = ref("rekam-medis");
const selectedSessionTab = ref("non-sesi");
const deleteSessionDialog = ref(false);
const historyVisitDialog = ref(false);

const rmDate = ref("");
const rmDateList = ref([
  "Jum’at, 19 Agustus 2024",
  "Sabtu, 20 Agustus 2024",
  "Minggu, 21 Agustus 2024",
  "Senin, 22 Agustus 2024",
]);

const assesmentList = ref([
  "Alergi",
  "Anamnesis",
  "Anamnesis IGD",
  "Triase",
  "Tanda Vital",
  "Antropometri",
  "Asesmen Nyeri",
  "Kesadaran",
  "Pemeriksaan Fisik",
  "Pemeriksaan Gigi",
  "Pemeriksaan Mata",
  "Derajat Luka Bakar (RON)",
  "Catatan Hasil Penunjang",
  "Diagnosis Dokter",
  "Asuhan Keperawatan",
  "Catatan Perawat",
  "Intruksi Medis",
  "Pemeriksaan dan Tindakan",
]);
const selectedAssesment = ref("Alergi");
const onAssesmentSelect = (label: string) => {
  if (selectedAssesment.value != label) {
    selectedAssesment.value = label;
  }
};

const soapList = ref(["Subjective", "Objective", "Assesment", "Plan"]);
const selectedSoap = ref("Subjective");
const onSoapSelect = (label: string) => {
  if (selectedSoap.value != label) {
    selectedSoap.value = label;
  }
};

const soapierList = ref([
  "Subjective",
  "Objective",
  "Assesment",
  "Plan",
  "I",
  "E",
  "R",
]);
const selectedSoapier = ref("Subjective");
const onSoapierSelect = (label: string) => {
  if (selectedSoapier.value != label) {
    selectedSoapier.value = label;
  }
};

const jumpToFormList = (selectedPage: string) => {
  if (selectedPage == "Subjective") {
    return ["Alergi", "Anamnesis"];
  } else if (selectedPage == "Objective") {
    return [
      "Tanda Vital",
      "Antropometri",
      "Asesmen Nyeri",
      "Kesadaran",
      "Pemeriksaan Fisik",
      "Catatan Hasil Penunjang",
    ];
  } else if (selectedPage == "Assesment") {
    return ["Diagnosis Dokter", "Asuhan Keperawatan"];
  } else if (selectedPage == "Plan") {
    return [
      "Instruksi Medis",
      "Catatan Perawat",
      "Order Obat",
      "Pemeriksaan dan Tindakan",
    ];
  } else return [];
};
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

const alkesList = ref(["Order Alkes", "Order Lab", "Order Fisio"]);
const selectedAlkes = ref("Order Alkes");
const onAlkesSelect = (label: string) => {
  if (selectedAlkes.value != label) {
    selectedAlkes.value = label;
  }
};

const jumpToFormDischargeList = ref([
  "Tanda Vital",
  "Ringkasan Riwayat Penyakit",
  "Edukasi",
  "Keadaan Waktu Pulang",
  "Status Pulang",
  "Pemeriksaan Fisik",
  "Diagnosis",
  "Tindakan",
  "Obat",
]);
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

const cetakSuratList = ref(["Cetak Hasil Pemeriksaan", "Surat Keterangan"]);
const selectedSuratList = ref("Cetak Hasil Pemeriksaan");
const onSuratListSelect = (label: string) => {
  if (selectedSuratList.value != label) {
    selectedSuratList.value = label;
  }
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
          <DataPatient />
          <div class="flex flex-col overflow-hidden grow">
            <div class="flex justify-between mb-4">
              <div class="flex mr-5">
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
            <Tabs
              v-model:value="selectedTab"
              :dt="{
                tabActiveBackground: '#E8F8F6',
                tabActiveColor: '#14B8A6',
                tabActiveBorderColor: '#14B8A6',
              }"
            >
              <TabList :pt="{ tabList: 'h-10 text-SM' }">
                <Tab
                  class="py-0 px-[10px]"
                  value="rekam-medis"
                  :pt="{ root: 'rounded-t-lg' }"
                >
                  <div class="flex">
                    <PhListPlus
                      v-if="selectedTab == 'rekam-medis'"
                      :size="18"
                      weight="fill"
                      class="mr-[10px]"
                    />
                    Rekam Medis
                  </div>
                </Tab>
                <Tab
                  class="py-0 px-[10px]"
                  value="asesmen"
                  :pt="{ root: 'rounded-t-lg' }"
                >
                  <div class="flex">
                    <PhListChecks
                      v-if="selectedTab == 'asesmen'"
                      :size="18"
                      weight="fill"
                      class="mr-[10px]"
                    />
                    Asesmen
                  </div>
                </Tab>
                <Tab
                  class="py-0 px-[10px]"
                  value="soap"
                  :pt="{ root: 'rounded-t-lg' }"
                >
                  <div class="flex">
                    <PhStethoscope
                      v-if="selectedTab == 'soap'"
                      :size="18"
                      weight="fill"
                      class="mr-[10px]"
                    />
                    S.O.A.P
                  </div>
                </Tab>
                <Tab
                  class="py-0 px-[10px]"
                  value="soapier"
                  :pt="{ root: 'rounded-t-lg' }"
                >
                  <div class="flex">
                    <PhStethoscope
                      v-if="selectedTab == 'soapier'"
                      :size="18"
                      weight="fill"
                      class="mr-[10px]"
                    />
                    S.O.A.P.I.E.R
                  </div>
                </Tab>
                <Tab
                  class="py-0 px-[10px]"
                  value="alkes-penunjang"
                  :pt="{ root: 'rounded-t-lg' }"
                >
                  <div class="flex">
                    <PhFirstAidKit
                      v-if="selectedTab == 'alkes-penunjang'"
                      :size="18"
                      weight="fill"
                      class="mr-[10px]"
                    />
                    Alkes & Penunjang
                  </div>
                </Tab>
                <Tab
                  class="py-0 px-[10px]"
                  value="alkes"
                  :pt="{ root: 'rounded-t-lg' }"
                >
                  <div class="flex">
                    <PhFirstAidKit
                      v-if="selectedTab == 'alkes'"
                      :size="18"
                      weight="fill"
                      class="mr-[10px]"
                    />
                    Alkes
                  </div>
                </Tab>
                <Tab
                  class="py-0 px-[10px]"
                  value="inform-consent"
                  :pt="{ root: 'rounded-t-lg' }"
                >
                  <div class="flex">
                    <PhFileText
                      v-if="selectedTab == 'inform-consent'"
                      :size="18"
                      weight="fill"
                      class="mr-[10px]"
                    />
                    Inform Consent
                  </div>
                </Tab>
                <Tab
                  class="px-0 py-0"
                  value="-"
                  :pt="{ root: 'rounded-t-lg' }"
                  disabled
                >
                  <PhLineVertical
                    :size="26"
                    weight="bold"
                    class="text-adameds-300"
                  />
                </Tab>
                <Tab
                  class="py-0 px-[10px]"
                  value="fpo"
                  :pt="{ root: 'rounded-t-lg' }"
                >
                  <div class="flex">
                    <PhPill
                      v-if="selectedTab == 'fpo'"
                      :size="18"
                      weight="fill"
                      class="mr-[10px]"
                    />
                    FPO
                  </div>
                </Tab>
                <Tab
                  class="py-0 px-[10px]"
                  value="perpindahan"
                  :pt="{ root: 'rounded-t-lg' }"
                >
                  <div class="flex">
                    <PhArrowsClockwise
                      v-if="selectedTab == 'perpindahan'"
                      :size="18"
                      weight="bold"
                      class="mr-[10px]"
                    />
                    perpindahan
                  </div>
                </Tab>
                <Tab
                  class="py-0 px-[10px]"
                  value="unggah-berkas"
                  :pt="{ root: 'rounded-t-lg' }"
                >
                  <div class="flex">
                    <UploadPictureIcon
                      v-if="selectedTab == 'unggah-berkas'"
                      :size="18"
                      class="mr-[10px]"
                    />
                    Unggah Berkas
                  </div>
                </Tab>
                <Tab
                  class="py-0 px-[10px]"
                  value="resume-discharge"
                  :pt="{ root: 'rounded-t-lg' }"
                >
                  <div class="flex">
                    <PhListStar
                      v-if="selectedTab == 'resume-discharge'"
                      :size="18"
                      weight="fill"
                      class="mr-[10px]"
                    />
                    Resume & Discharge
                  </div>
                </Tab>
                <Tab
                  class="py-0 px-[10px]"
                  value="cetak-hasil-surat"
                  :pt="{ root: 'rounded-t-lg' }"
                >
                  <div class="flex">
                    <PhEnvelopeSimple
                      v-if="selectedTab == 'cetak-hasil-surat'"
                      :size="18"
                      weight="fill"
                      class="mr-[10px]"
                    />
                    Cetak Hasil & Surat
                  </div>
                </Tab>
              </TabList>
            </Tabs>
            <div
              v-if="
                selectedTab == 'rekam-medis' ||
                selectedTab == 'asesmen' ||
                selectedTab == 'soap'
              "
              class="flex"
            >
              <SessionTab
                :key="selectedTab"
                v-model="selectedSessionTab"
                :selectedTab="selectedTab"
                :dataSession="['Sesi 1', 'Sesi 2']"
                class="mt-[10px] grow"
              />
              <div class="flex border-b border-grey-100">
                <CustomButton
                  @click="deleteSessionDialog = true"
                  class="my-auto bg-danger-300 !rounded-md"
                  label="Hapus Sesi"
                  size="small"
                  icon="PhTrash"
                  iconType="fill"
                />
              </div>
            </div>

            <div v-if="selectedTab == 'asesmen'" class="mt-[10px] mb-[10px]">
              <CustomChip
                v-for="(assesment, index) in assesmentList"
                :key="assesment + index"
                :label="assesment"
                :showCheckedIcon="false"
                :outlined="false"
                class="mr-[10px] mb-[10px]"
                customClass="h-6"
                textSize="text-SM"
                textColor="text-black"
                selectedTextColor="text-white"
                bgColor="bg-grey-75"
                selectedColor="bg-adameds-300"
                :isSelected="selectedAssesment == assesment"
                @selected="onAssesmentSelect"
              />
            </div>
            <div v-if="selectedTab == 'soap'" class="my-5">
              <div class="flex">
                <CustomButton
                  v-for="(soapData, index) in soapList"
                  @click="onSoapSelect(soapData)"
                  :label="soapData"
                  class="mr-[10px]"
                  borderColor="border-adameds-300"
                  :textColor="
                    selectedSoap.includes(soapData)
                      ? 'text-white'
                      : 'text-adameds-300'
                  "
                  :outlined="!selectedSoap.includes(soapData)"
                />
                <div class="border-[0.5px] mr-[25px] ml-[15px]"></div>
                <div>
                  <div
                    class="flex font-semibold text-gray-400 underline text-XS"
                  >
                    Lompat Ke Form
                    <PhArrowSquareIn
                      :size="16"
                      weight="fill"
                      class="ml-[5px]"
                    />
                  </div>
                  <CustomChip
                    v-for="(jumpToForm, index) in jumpToFormList(selectedSoap)"
                    @click="soapSoapierScrollController(jumpToForm)"
                    :showCheckedIcon="false"
                    :label="jumpToForm"
                    bgColor="bg-adameds-50"
                    textColor="text-adameds-300"
                    borderColor="border-adameds-300"
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                </div>
              </div>
            </div>
            <div v-if="selectedTab == 'soapier'" class="my-5">
              <div class="flex">
                <CustomButton
                  v-for="(soapierData, index) in soapierList"
                  @click="onSoapierSelect(soapierData)"
                  :label="soapierData"
                  class="mr-[10px]"
                  borderColor="border-adameds-300"
                  :textColor="
                    selectedSoapier.includes(soapierData)
                      ? 'text-white'
                      : 'text-adameds-300'
                  "
                  :outlined="!selectedSoapier.includes(soapierData)"
                />
                <div class="border-[0.5px] mr-[25px] ml-[15px]"></div>
                <div>
                  <div
                    v-if="jumpToFormList(selectedSoapier).length"
                    class="flex font-semibold text-gray-400 underline text-XS"
                  >
                    Lompat Ke Form
                    <PhArrowSquareIn
                      :size="16"
                      weight="fill"
                      class="ml-[5px]"
                    />
                  </div>
                  <CustomChip
                    v-for="(jumpToForm, index) in jumpToFormList(
                      selectedSoapier
                    )"
                    @click="soapSoapierScrollController(jumpToForm)"
                    :showCheckedIcon="false"
                    :label="jumpToForm"
                    bgColor="bg-adameds-50"
                    textColor="text-adameds-300"
                    borderColor="border-adameds-300"
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="selectedTab == 'alkes-penunjang'"
              class="mt-[10px] mb-[10px]"
            >
              <CustomChip
                v-for="(penunjang, index) in alkesList"
                :key="penunjang + index"
                :label="penunjang"
                :showCheckedIcon="false"
                :outlined="false"
                class="mr-[10px] mb-[10px]"
                customClass="h-6"
                textSize="text-SM"
                textColor="text-black"
                selectedTextColor="text-white"
                bgColor="bg-grey-75"
                selectedColor="bg-adameds-300"
                :isSelected="selectedAlkes.includes(penunjang)"
                @selected="onAlkesSelect"
              />
            </div>
            <div
              v-if="selectedTab == 'cetak-hasil-surat'"
              class="mt-[10px] mb-[10px]"
            >
              <CustomChip
                v-for="(action, index) in cetakSuratList"
                :key="action + index"
                :label="action"
                :showCheckedIcon="false"
                :outlined="false"
                class="mr-[10px] mb-[10px]"
                customClass="h-6"
                textSize="text-SM"
                textColor="text-black"
                selectedTextColor="text-white"
                bgColor="bg-grey-75"
                selectedColor="bg-adameds-300"
                :isSelected="selectedSuratList.includes(action)"
                @selected="onSuratListSelect"
              />
            </div>
            <div v-if="selectedTab == 'resume-discharge'" class="">
              <div class="flex h-[60px]">
                <div class="flex">
                  <PhListStar
                    :size="20"
                    weight="fill"
                    class="my-auto text-adameds-300 mr-[10px]"
                  />
                  <div class="my-auto font-semibold text-MD text-grey-400">
                    Form Resume Medis
                  </div>
                </div>
                <div class="border-[0.5px] mr-[25px] ml-[15px] my-[10px]"></div>
                <div class="my-auto">
                  <div
                    class="flex font-semibold text-gray-400 underline text-XS"
                  >
                    Lompat Ke Form
                    <PhArrowSquareIn
                      :size="16"
                      weight="fill"
                      class="ml-[5px]"
                    />
                  </div>
                  <CustomChip
                    v-for="(jumpToForm, index) in jumpToFormDischargeList"
                    @click="resumeDischargeScrollController(jumpToForm)"
                    :showCheckedIcon="false"
                    :label="jumpToForm"
                    bgColor="bg-adameds-50"
                    textColor="text-adameds-300"
                    borderColor="border-adameds-300"
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                </div>
              </div>
            </div>

            <div
              v-if="selectedTab == 'rekam-medis'"
              class="flex mt-5 overflow-auto"
            >
              <!-- <NoData class="grow" title="Belum Ada Pemeriksaan" /> -->
              <div class="grid grid-cols-2 grow gap-2.5 overflow-x-hidden">
                <FormAlergi method="detail" />
                <Anamnesis method="detail" />
                <AnamnesisIGD method="detail" />
                <Triase method="detail" />
                <FormTandaVital method="detail" />
                <Antropometri method="detail" />
                <FormAsesmenNyeri method="detail" />
                <Kesadaran method="detail" />
                <PemeriksaanFisik method="detail" />
                <PemeriksaanGigi method="detail" />
                <PemeriksaanMata method="detail" />
                <BurnInput method="detail" />
                <CatatanHasilPenunjang method="detail" />
                <FormDiagnosaDokterICD10 method="detail" />
                <AsuhanKeperawatan method="detail" />
                <FormCatatanPerawat method="detail" />
                <InstruksiMedis method="detail" />
                <FormOrderObat method="detail" />
                <PemeriksaanTindakan method="detail" />
                <FormImplementation method="detail" />
                <FormEvaluation method="detail" />
                <FormReassesment method="detail" />
                <FormOrderAlkes method="detail" />
                <OrderLab method="detail" />
                <FormOrderFisio method="detail" />
                <FormPersetujuanPasien method="detail" />
              </div>
              <div class="flex flex-col mx-[10px]">
                <CustomButton icon="PhArrowsInLineVertical" class="mb-[10px]" />
                <CustomButton icon="PhArrowsOutLineVertical" class="" />
              </div>
            </div>

            <div v-if="selectedTab == 'asesmen'" class="overflow-auto">
              <FormAlergi
                v-if="selectedAssesment == 'Alergi'"
                method="form"
                initialState="0"
              />
              <Anamnesis
                v-if="selectedAssesment == 'Anamnesis'"
                method="form"
                initialState="0"
              />
              <AnamnesisIGD
                v-if="selectedAssesment == 'Anamnesis IGD'"
                method="form"
                initialState="0"
              />
              <Triase
                v-if="selectedAssesment == 'Triase'"
                method="form"
                initialState="0"
              />
              <FormTandaVital
                v-if="selectedAssesment == 'Tanda Vital'"
                method="form"
                initialState="0"
              />
              <Antropometri
                v-if="selectedAssesment == 'Antropometri'"
                method="form"
                initialState="0"
              />
              <FormAsesmenNyeri
                v-if="selectedAssesment == 'Asesmen Nyeri'"
                method="form"
                initialState="0"
              />
              <Kesadaran
                v-if="selectedAssesment == 'Kesadaran'"
                method="form"
                initialState="0"
              />
              <CatatanHasilPenunjang
                v-if="selectedAssesment == 'Catatan Hasil Penunjang'"
                method="form"
                initialState="0"
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
                  <FormAlergi id="Alergi" method="form" class="mb-[10px]" />
                  <Anamnesis id="Anamnesis" method="form" class="" />
                </div>

                <div
                  v-if="
                    (selectedTab == 'soap' && selectedSoap == 'Objective') ||
                    (selectedTab == 'soapier' && selectedSoapier == 'Objective')
                  "
                >
                  <FormTandaVital
                    id="Tanda Vital"
                    method="form"
                    class="mb-[10px]"
                  />
                  <Antropometri
                    id="Antropometri"
                    method="form"
                    class="mb-[10px]"
                  />
                  <FormAsesmenNyeri
                    id="Asesmen Nyeri"
                    method="form"
                    class="mb-[10px]"
                  />
                  <Kesadaran id="Kesadaran" method="form" class="mb-[10px]" />
                  <PemeriksaanFisik id="Pemeriksaan Fisik" class="mb-[10px]" />
                  <CatatanHasilPenunjang
                    id="Catatan Hasil Penunjang"
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
                    method="form"
                    class="mb-[10px]"
                  />
                  <AsuhanKeperawatan
                    id="Asuhan Keperawatan"
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
                    method="form"
                    class="mb-[10px]"
                  />
                  <FormCatatanPerawat
                    id="Catatan Perawat"
                    method="form"
                    class="mb-[10px]"
                  />
                  <FormOrderObat
                    id="Order Obat"
                    method="form"
                    class="mb-[10px]"
                  />
                  <PemeriksaanTindakan
                    id="Pemeriksaan dan Tindakan"
                    method="form"
                    class=""
                  />
                </div>

                <div v-if="selectedTab == 'soapier' && selectedSoapier == 'I'">
                  <FormImplementation method="form" />
                </div>

                <div v-if="selectedTab == 'soapier' && selectedSoapier == 'E'">
                  <FormEvaluation method="form" />
                </div>

                <div v-if="selectedTab == 'soapier' && selectedSoapier == 'R'">
                  <FormReassesment method="form" />
                </div>
              </div>
              <div class="flex flex-col mx-[10px]">
                <CustomButton icon="PhArrowsInLineVertical" class="mb-[10px]" />
                <CustomButton icon="PhArrowsOutLineVertical" class="" />
              </div>
            </div>

            <div v-if="selectedTab == 'alkes-penunjang'" class="overflow-auto">
              <FormOrderAlkes
                v-if="selectedAlkes == 'Order Alkes'"
                method="form"
                initialState="0"
              />
              <OrderLab
                v-if="selectedAlkes == 'Order Lab'"
                method="form"
                initialState="0"
              />
              <FormOrderFisio
                v-if="selectedAlkes == 'Order Fisio'"
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
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <AnamnesisDischarge
                  id="Ringkasan Riwayat Penyakit"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <Edukasi
                  id="Edukasi"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <KeadaanWaktuPulang
                  id="Keadaan Waktu Pulang"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <StatusPulang
                  id="Status Pulang"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <PemeriksaanFisikDischarge
                  id="Pemeriksaan Fisik"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <Diagnosis
                  id="Diagnosis"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <Tindakan
                  id="Tindakan"
                  method="form"
                  initialState="0"
                  class="mb-[10px]"
                />
                <Obat id="Obat" method="form" initialState="0" class="" />
              </div>
              <div class="flex flex-col mx-[10px]">
                <CustomButton icon="PhArrowsInLineVertical" class="mb-[10px]" />
                <CustomButton icon="PhArrowsOutLineVertical" class="" />
              </div>
            </div>

            <div
              v-if="selectedTab == 'cetak-hasil-surat'"
              class="overflow-auto"
            >
              <ListSuratKeterangan
                v-if="selectedSuratList == 'Surat Keterangan'"
                method="form"
                initialState="0"
              />
            </div>
          </div>
        </div>
      </template>
    </CustomDialog>
    <!-- Dialog konfirmasi hapus sesi -->
    <CustomDialog
      class=""
      v-model:visible="deleteSessionDialog"
      headerBg="bg-danger-300"
      width="600px"
    >
      <template #header>Hapus Sesi</template>
      <template #body>
        <div class="pt-5">
          <CustomTextfield
            label="Alasan Menghapus Sesi"
            class="w-full mr-[30px]"
            placeholder="Alasan Menghapus Sesi"
          />
          <div class="mt-5 text-normal">
            <div>Seluruh data pemeriksaan pasien pada sesi akan terhapus.</div>
            <div class="mt-1">
              Anda yakin akan menghapus <span class="font-bold">Sesi 1</span> ?
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div>
          <CustomButton
            @click="() => {}"
            label="Tidak"
            outlined
            class="mr-[10px]"
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            @click="() => {}"
            class="my-auto bg-danger-300"
            label="Iya, Hapus"
            iconType="fill"
          />
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
