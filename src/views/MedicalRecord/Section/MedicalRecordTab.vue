<script setup lang="ts">
import { ref } from "vue";
import SessionTab from "./SessionTab.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

const emit = defineEmits(["soapSoapierJump", "resumeDischargeJump"]);

const selectedTab = defineModel<string>("selectedTab", {
  default: "rekam-medis",
});
const selectedSessionTab = defineModel<string>("selectedSessionTab", {
  default: "non-sesi",
});

const deleteSessionDialog = ref(false);

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
const selectedAssesment = defineModel<string>("selectedAssesment", {
  default: "Alergi",
});
const onAssesmentSelect = (label: string) => {
  if (selectedAssesment.value != label) {
    selectedAssesment.value = label;
  }
};

const soapList = ref(["Subjective", "Objective", "Assesment", "Plan"]);
const selectedSoap = defineModel<string>("selectedSoap", {
  default: "Subjective",
});
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
const selectedSoapier = defineModel<string>("selectedSoapier", {
  default: "Subjective",
});
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

const alkesList = ref(["Order Alkes", "Order Lab", "Order Fisio"]);
const selectedAlkes = defineModel<string>("selectedAlkes", {
  default: "Order Alkes",
});
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

const cetakSuratList = ref(["Cetak Hasil Pemeriksaan", "Surat Keterangan"]);
const selectedSuratList = defineModel<string>("selectedSuratList", {
  default: "Cetak Hasil Pemeriksaan",
});
const onSuratListSelect = (label: string) => {
  if (selectedSuratList.value != label) {
    selectedSuratList.value = label;
  }
};
</script>

<template>
  <div>
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
        <Tab class="py-0 px-[10px]" value="soap" :pt="{ root: 'rounded-t-lg' }">
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
          <PhLineVertical :size="26" weight="bold" class="text-adameds-300" />
        </Tab>
        <Tab class="py-0 px-[10px]" value="fpo" :pt="{ root: 'rounded-t-lg' }">
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
            selectedSoap.includes(soapData) ? 'text-white' : 'text-adameds-300'
          "
          :outlined="!selectedSoap.includes(soapData)"
        />
        <div class="border-[0.5px] mr-[25px] ml-[15px]"></div>
        <div>
          <div class="flex font-semibold text-gray-400 underline text-XS">
            Lompat Ke Form
            <PhArrowSquareIn :size="16" weight="fill" class="ml-[5px]" />
          </div>
          <CustomChip
            v-for="(jumpToForm, index) in jumpToFormList(selectedSoap)"
            @click="emit('soapSoapierJump', jumpToForm)"
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
            <PhArrowSquareIn :size="16" weight="fill" class="ml-[5px]" />
          </div>
          <CustomChip
            v-for="(jumpToForm, index) in jumpToFormList(selectedSoapier)"
            @click="emit('soapSoapierJump', jumpToForm)"
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
    <div v-if="selectedTab == 'alkes-penunjang'" class="mt-[10px] mb-[10px]">
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
    <div v-if="selectedTab == 'cetak-hasil-surat'" class="mt-[10px] mb-[10px]">
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
          <div class="flex font-semibold text-gray-400 underline text-XS">
            Lompat Ke Form
            <PhArrowSquareIn :size="16" weight="fill" class="ml-[5px]" />
          </div>
          <CustomChip
            v-for="(jumpToForm, index) in jumpToFormDischargeList"
            @click="emit('resumeDischargeJump', jumpToForm)"
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
  </div>
</template>
