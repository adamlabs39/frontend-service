<script setup lang="ts">
import { ref } from 'vue';
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const props = defineProps({
  selectedTab: {
    type: String,
    default: "asesmen",
  },
});

const emit = defineEmits(["soapSoapierJump", "resumeDischargeJump"]);

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
  </div>
</template>
