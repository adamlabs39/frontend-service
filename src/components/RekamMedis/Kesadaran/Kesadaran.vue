<script lang="ts" setup>
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";

// Import gambar mata
import spontanMeresponOn from "@/assets/images/RekamMedis/Kesadaran/spontanMeresponOn.svg";
import spontanMeresponOff from "@/assets/images/RekamMedis/Kesadaran/spontanMeresponOff.svg";
import responSuaraOn from "@/assets/images/RekamMedis/Kesadaran/responSuaraOn.svg";
import responSuaraOff from "@/assets/images/RekamMedis/Kesadaran/responSuaraOff.svg";
import responNyeriOn from "@/assets/images/RekamMedis/Kesadaran/responNyeriOn.svg";
import responNyeriOff from "@/assets/images/RekamMedis/Kesadaran/responNyeriOff.svg";
import mataTidakResponOn from "@/assets/images/RekamMedis/Kesadaran/mataTidakResponOn.svg";
import mataTidakResponOff from "@/assets/images/RekamMedis/Kesadaran/mataTidakResponOff.svg";

// Import gambar motorik
import mengikutiPerintahOn from "@/assets/images/RekamMedis/Kesadaran/mengikutiPerintahOn.svg";
import mengikutiPerintahOff from "@/assets/images/RekamMedis/Kesadaran/mengikutiPerintahOff.svg";
import melokalisirNyeriOn from "@/assets/images/RekamMedis/Kesadaran/melokalisirNyeriOn.svg";
import melokalisirNyeriOff from "@/assets/images/RekamMedis/Kesadaran/melokalisirNyeriOff.svg";
import fleksiNormalOn from "@/assets/images/RekamMedis/Kesadaran/fleksiNormalOn.svg";
import fleksiNormalOff from "@/assets/images/RekamMedis/Kesadaran/fleksiNormalOff.svg";
import fleksiAbnormalOn from "@/assets/images/RekamMedis/Kesadaran/fleksiAbnormalOn.svg";
import fleksiAbnormalOff from "@/assets/images/RekamMedis/Kesadaran/fleksiAbnormalOff.svg";
import ekstensiAbnormalOn from "@/assets/images/RekamMedis/Kesadaran/ekstensiAbnormalOn.svg";
import ekstensiAbnormalOff from "@/assets/images/RekamMedis/Kesadaran/ekstensiAbnormalOff.svg";
import motorikTidakResponOn from "@/assets/images/RekamMedis/Kesadaran/motorikTidakResponOn.svg";
import motorikTidakResponOff from "@/assets/images/RekamMedis/Kesadaran/motorikTidakResponOff.svg";

// Import gambar verbal
import orientasiBaikOn from "@/assets/images/RekamMedis/Kesadaran/orientasiBaikOn.svg";
import orientasiBaikOff from "@/assets/images/RekamMedis/Kesadaran/orientasiBaikOff.svg";
import bingungBerbicaraOn from "@/assets/images/RekamMedis/Kesadaran/bingungBerbicaraOn.svg";
import bingungBerbicaraOff from "@/assets/images/RekamMedis/Kesadaran/bingungBerbicaraOff.svg";
import tidakJelasOn from "@/assets/images/RekamMedis/Kesadaran/tidakJelasOn.svg";
import tidakJelasOff from "@/assets/images/RekamMedis/Kesadaran/tidakJelasOff.svg";
import mengerangOn from "@/assets/images/RekamMedis/Kesadaran/mengerangOn.svg";
import mengerangOff from "@/assets/images/RekamMedis/Kesadaran/mengerangOff.svg";
import verbalTidakResponOn from "@/assets/images/RekamMedis/Kesadaran/verbalTidakResponOn.svg";
import verbalTidakResponOff from "@/assets/images/RekamMedis/Kesadaran/verbalTidakResponOff.svg";
import CustomSelect from "@/components/Base/CustomSelect.vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const selectedMata = ref<number | null>(null);
const selectedMotorik = ref<number | null>(null);
const selectedVerbal = ref<number | null>(null);
const lastClicked = ref<{ categoryIndex: number; responseIndex: number } | null>(null);

const opsiKesadaran = [
  {
    title: "Mata (Respon Membuka Mata)",
    selected: selectedMata,
    response: [
      {
        label: "Spontan merespon",
        defaultImage: spontanMeresponOff,
        selectedImage: spontanMeresponOn,
      },
      {
        label: "Ada respon dengan rangsang suara",
        defaultImage: responSuaraOff,
        selectedImage: responSuaraOn,
      },
      {
        label: "Ada respon dengan rangsang nyeri",
        defaultImage: responNyeriOff,
        selectedImage: responNyeriOn,
      },
      {
        label: "Tidak ada respon",
        defaultImage: mataTidakResponOff,
        selectedImage: mataTidakResponOn,
      },
    ],
  },
  {
    title: "Motorik (Respon Gerak)",
    selected: selectedMotorik,
    response: [
      {
        label: "Mengikuti perintah",
        defaultImage: mengikutiPerintahOff,
        selectedImage: mengikutiPerintahOn,
      },
      {
        label: "Melokalisir nyeri",
        defaultImage: melokalisirNyeriOff,
        selectedImage: melokalisirNyeriOn,
      },
      {
        label: "Fleksi normal",
        defaultImage: fleksiNormalOff,
        selectedImage: fleksiNormalOn,
      },
      {
        label: "Fleksi abnormal",
        defaultImage: fleksiAbnormalOff,
        selectedImage: fleksiAbnormalOn,
      },
      {
        label: "Ekstensi abnormal",
        defaultImage: ekstensiAbnormalOff,
        selectedImage: ekstensiAbnormalOn,
      },
      {
        label: "Tidak ada respon",
        defaultImage: motorikTidakResponOff,
        selectedImage: motorikTidakResponOn,
      },
    ],
  },
  {
    title: "Verbal (Respon Verbal)",
    selected: selectedVerbal,
    response: [
      {
        label: "Orientasi baik",
        defaultImage: orientasiBaikOff,
        selectedImage: orientasiBaikOn,
      },
      {
        label: "Bingung berbicara",
        defaultImage: bingungBerbicaraOff,
        selectedImage: bingungBerbicaraOn,
      },
      {
        label: "Kata-kata tidak jelas",
        defaultImage: tidakJelasOff,
        selectedImage: tidakJelasOn,
      },
      {
        label: "Suara tanpa arti (mengarang)",
        defaultImage: mengerangOff,
        selectedImage: mengerangOn,
      },
      {
        label: "Tidak ada respon",
        defaultImage: verbalTidakResponOff,
        selectedImage: verbalTidakResponOn,
      },
    ],
  },
];

const selectOption = (categoryIndex: number, responseIndex: number) => {

    opsiKesadaran[categoryIndex].selected.value = responseIndex;
    lastClicked.value = { categoryIndex, responseIndex };

};

const getImageSrc = (categoryIndex: number, responseIndex: number) => {
  return opsiKesadaran[categoryIndex].selected.value === responseIndex
    ? opsiKesadaran[categoryIndex].response[responseIndex].selectedImage
    : opsiKesadaran[categoryIndex].response[responseIndex].defaultImage;
};
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Kesadaran</template>
    <template #content>
      <div v-if="props.method=='form'" class="grid grid-cols-2 gap-6 pt-5">
        <div
          v-for="(option, categoryIndex) in opsiKesadaran"
          :key="categoryIndex"
        >
          <div class="flex flex-col gap-5">
            <div class="font-semibold text-md">{{ option.title }}</div>
            <div
              :class="{
                'grid grid-cols-4': option.title.includes('Mata'),
                'grid grid-cols-6': option.title.includes('Motorik'),
                'grid grid-cols-5': option.title.includes('Verbal'),
              }"
            >
              <div
                v-for="(response, responseIndex) in option.response"
                :key="responseIndex"
              >
                <div
                  class="flex flex-col gap-2.5 items-center text-center justify-center cursor-pointer"
                  @click="selectOption(categoryIndex, responseIndex)"
                >
                  <img
                    :src="getImageSrc(categoryIndex, responseIndex)"
                    alt="Response Image"
                  />
                  <div class="font-normal text-SM">{{ response.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CustomSelect label="Kesimpulan GCS" placeHolder="Pilih Kesimpulan GCS"/>
      </div>
      <div v-if="props.method=='detail'" class="py-5 flex flex-col gap-[19px]">
        <CustomInfoRow label="Mata (Respon Membuka Mata)" value="Spontan merespon"/>
        <CustomInfoRow label="Motorik (Respon Gerakan)" value="Melokalisir nyeri" />
        <CustomInfoRow label="Verbal (Respon Verbal)" value="Tidak ada respon" />
        <CustomInfoRow label="Kesimpulan GCS" value="Sehat" />
        <hr class="border-grey-200">
        <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
        v-if="props.method=='form'"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton v-if="props.method=='form'" label="Simpan" />
        <CustomButton v-if="props.method=='detail'" label="Edit" />

      </div>
    </template>
  </CustomAccordion>
</template>
