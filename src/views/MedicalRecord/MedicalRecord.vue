<script setup lang="ts">
import { ref } from "vue";
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

const dialogRM = ref(false);
const selectedTab = ref("rekam-medis");
const selectedSessionTab = ref("non-sesi");
const deleteSessionDialog = ref(false);
const historyVisitDialog = ref(false);

const assesmentList = ref([
  "Alergi",
  "Anamnesis",
  "Tanda Vital",
  "Antropometri",
  "Asesmen Nyeri",
  "Kesadaran",
  "Pemeriksaan Fisik",
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

const alkesList = ref(["Order Alkes", "Order Lab", "Order Fisio"]);
const selectedAlkes = ref("Order Alkes");
const onAlkesSelect = (label: string) => {
  if (selectedAlkes.value != label) {
    selectedAlkes.value = label;
  }
};

const cetakSuratList = ref(["Cetak Hasil Pemeriksaan", "Surat Keterangan"]);
const selectedSuratList = ref("Cetak Hasil Pemeriksaan");
const onSuratListSelect = (label: string) => {
  if (selectedSuratList.value != label) {
    selectedSuratList.value = label;
  }
};

const rmDate = ref("");
const rmDateList = ref([
  "Jum’at, 19 Agustus 2024",
  "Sabtu, 20 Agustus 2024",
  "Minggu, 21 Agustus 2024",
  "Senin, 22 Agustus 2024",
]);

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
        <div class="pt-[10px] h-full">
          <DataPatient />
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
                value="unggah-berkas"
                :pt="{ root: 'rounded-t-lg' }"
              >
                <div class="flex">
                  <img
                    v-if="selectedTab == 'unggah-berkas'"
                    class="h-[18px] mr-[10px]"
                    src="../../assets/icons/medical-record/UploadPicture.svg"
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
          <div class="flex">
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
              :isSelected="selectedAssesment.includes(assesment)"
              @selected="onAssesmentSelect"
            />
          </div>
          <div v-if="selectedTab == 'soap'" class="my-5">
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
          </div>

          <div v-if="selectedTab == 'rekam-medis'" class="flex mt-5 h-3/5">
            <NoData class="grow" title="Belum Ada Pemeriksaan" />
            <div class="flex flex-col mx-[10px]">
              <CustomButton icon="PhArrowsInLineVertical" class="mb-[10px]" />
              <CustomButton icon="PhArrowsOutLineVertical" class="" />
            </div>
          </div>

          <div v-if="selectedTab == 'asesmen'">
            <PemeriksaanFisik v-if="selectedAssesment == 'Pemeriksaan Fisik'" />
            <BurnInput v-if="selectedAssesment == 'Derajat Luka Bakar (RON)'" />
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
