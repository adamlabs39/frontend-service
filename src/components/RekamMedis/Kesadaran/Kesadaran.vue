<script lang="ts" setup>
import { ref,onBeforeMount } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
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
    default: "detail",
  },
});
const isEditing = ref(props.method === "form");
const emit = defineEmits(['edit', 'submit']);

const schema = toTypedSchema(
  yup.object({
    eye: yup.number(),
    motorik: yup.number(),
    verbal: yup.number(),
    GCS_score: yup.number(),
    GCS_kesimpulan: yup.string(),
    petugas: yup.string().required(),
  })
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});
const [eye] = defineField("eye");
const [motorik] = defineField("motorik");
const [verbal] = defineField("verbal");
const [GCS_score] = defineField("GCS_score");
const [GCS_kesimpulan] = defineField("GCS_kesimpulan");
const [petugas] = defineField("petugas");

onBeforeMount(async () => {
  setValues({ 
    eye:2,
    motorik:1,
    verbal:0,
    GCS_score:50,
    GCS_kesimpulan:"Sakit sedang",
    petugas: "Adam"
   });
});

const onSubmit = handleSubmit((values: any) => {
  console.log("Adding new data:", values);
  emit('submit', values); 
  isEditing.value = false;

});

const toggleEdit = () => {
  isEditing.value = true;
  emit('edit');
};

const lastClicked = ref<{ categoryIndex: number; responseIndex: number } | null>(null);

const opsiKesadaran = [
  {
    title: "Mata (Respon Membuka Mata)",
    selected: eye,
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
    selected: motorik,
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
    selected: verbal,
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

const kesimpulanOption = ref([
  { name: "Sakit sedang" },
  { name: "Sakit Ringan" },
  { name: "Sakit Berat" },
]);
const getLabelFromValue = (value: number, responses: Array<{ label: string }>) => {
  return responses[value]?.label || "Unknown";
};

const accordion = ref<HTMLCanvasElement | null>(null);
const open = () => {
  if (accordion.value) {
    (accordion.value as any).open();
  }
};
const close = () => {
  if (accordion.value) {
    (accordion.value as any).close();
  }
};

defineExpose({
  open,
  close,
});
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" ref="accordion">
    <template #header>Kesadaran</template>
    <template #content>
      <div  v-if="isEditing" class="grid grid-cols-2 gap-6 pt-5">
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
        <CustomSelect v-model="GCS_kesimpulan" label="Kesimpulan GCS" placeHolder="Pilih Kesimpulan GCS" :options="kesimpulanOption" option-label="name" option-value="name"/>
      </div>
      <div v-if="!isEditing" class="py-5 flex flex-col gap-[19px]">
        <!-- <CustomInfoRow label="Mata">
          <template #value>
            <div
            v-if=""
            >
              
            </div>
          </template>
        </CustomInfoRow> -->
        <CustomInfoRow label="Mata" :value="getLabelFromValue(eye, opsiKesadaran[0].response)"/>
        <CustomInfoRow label="Motorik" :value="getLabelFromValue(motorik, opsiKesadaran[1].response)"/>
        <CustomInfoRow label="Verbal" :value="getLabelFromValue(verbal, opsiKesadaran[2].response)"/>
        <CustomInfoRow label="Kesimpulan GCS" :value="GCS_kesimpulan" />
        <hr class="border-grey-200">
        <CustomInfoRow label="Petugas Input" :value="petugas" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="isEditing"
          @click="resetForm"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton
          v-if="isEditing"
          label="Simpan"
          @click="onSubmit"
        />
        <CustomButton
          v-else
          label="Edit"
          @click="toggleEdit"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
