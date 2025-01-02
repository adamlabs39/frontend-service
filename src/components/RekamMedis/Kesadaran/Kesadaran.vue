<script lang="ts" setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";

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
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import HistoriKesadaran from "@/components/RekamMedis/Kesadaran/HistoriKesadaran.vue";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();

const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
  rmUuid: {
    type: String,
    default: "",
  },
  sessionUuid: {
    type: String,
    default: "",
  },
});

const isEditing = ref(props.method === "form");
const emit = defineEmits(["edit", "submit", "editAsesmen"]);

const schema = toTypedSchema(
  yup.object({
    eye: yup.number(),
    motorik: yup.number(),
    verbal: yup.number(),
    gcsScore: yup.number(),
    gcsKesimpulan: yup.string(),
    petugas: yup.string().default("Super Admin"),
  })
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});
const [eye] = defineField("eye");
const [motorik] = defineField("motorik");
const [verbal] = defineField("verbal");
const [gcsScore] = defineField("gcsScore");
const [gcsKesimpulan] = defineField("gcsKesimpulan");
const [petugas] = defineField("petugas");

const onSubmit = handleSubmit(async (values: any) => {
  try {
    storeUtils.setLoading(true);
    const response = await rekamMedisStore.insertAssesment({
      sessionUuid: props.sessionUuid,
      rekamMedisUuid: props.rmUuid,
      isLatest: rekamMedisStore.openedRekamMedis.isLatest,
      key: "kesadaran",
      data: values,
    });
    if (response && response.payload) {
      rekamMedisStore.setAsesmentSummaryRekamMedisData(response.payload);
    }
  } catch (error) {
    console.error("Failed to post data", error);
  } finally {
    storeUtils.setLoading(false);
  }
});

const setFormData = () => {
  if (rekamMedisStore.openedRekamMedis.data.kesadaran) {
    const tempKesadaran = rekamMedisStore.openedRekamMedis.data.kesadaran;
    setValues({
      eye: tempKesadaran.eye,
      motorik: tempKesadaran.motorik,
      verbal: tempKesadaran.verbal,
      gcsScore: tempKesadaran.gcsScore,
      gcsKesimpulan: tempKesadaran.kesimpulan,
      petugas: tempKesadaran.petugas,
    });
    countKesimpulan();
  } else resetForm();
};

onBeforeMount(async () => {
  setFormData();
});

// NOTE Untuk merefresh form yang sedang dibuka jika ada perubahan data
const storedRMData = computed(() => rekamMedisStore.openedRekamMedis);
watch(storedRMData, (newRM) => {
  setFormData();
});

const toggleEdit = () => {
  isEditing.value = true;
  emit("edit");
};

const lastClicked = ref<{
  categoryIndex: number;
  responseIndex: number;
} | null>(null);

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
  opsiKesadaran[categoryIndex].selected.value = responseIndex + 1;
  lastClicked.value = { categoryIndex, responseIndex };
  countKesimpulan();
};

const getImageSrc = (categoryIndex: number, responseIndex: number) => {
  return opsiKesadaran[categoryIndex].selected.value === responseIndex + 1
    ? opsiKesadaran[categoryIndex].response[responseIndex].selectedImage
    : opsiKesadaran[categoryIndex].response[responseIndex].defaultImage;
};

const kesimpulanOption = ref([
  { name: "Sakit sedang" },
  { name: "Sakit Ringan" },
  { name: "Sakit Berat" },
]);
const getLabelFromValue = (value: any, responses: Array<{ label: string }>) => {
  return responses[value]?.label || "Unknown";
};

const countKesimpulan = () => {
  if (eye.value && motorik.value && verbal.value) {
    gcsKesimpulan.value = "";

    let totalSkor = eye.value + motorik.value + verbal.value;

    gcsScore.value = totalSkor;

    if (totalSkor == 3) {
      gcsKesimpulan.value = "Coma";
    } else if (totalSkor == 4) {
      gcsKesimpulan.value = "Semi-coma";
    } else if (totalSkor == 5 || totalSkor == 6) {
      gcsKesimpulan.value = "Sopor";
    } else if (totalSkor > 6 && totalSkor <= 9) {
      gcsKesimpulan.value = "Somnolence";
    } else if (totalSkor == 10 || totalSkor == 11) {
      gcsKesimpulan.value = "Delirium";
    } else if (totalSkor == 12 || totalSkor == 13) {
      gcsKesimpulan.value = "Apatis";
    } else if (totalSkor == 14 || totalSkor == 15) {
      gcsKesimpulan.value = "Compos Mentis";
    }
  }
};

const compareDialog = ref(false);
const showDialogCompare = () => {
  compareDialog.value = true;
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
      <div v-if="isEditing" class="flex flex-col">
        <CustomButton
          @click="showDialogCompare"
          class="!rounded-md my-[10px] ml-auto"
          label="Mode Compare"
          size="small"
          icon="LayoutIcon"
        />
        <hr class="mb-[30px]" />
      </div>
      <div v-if="isEditing" class="grid grid-cols-2 gap-6 pt-5">
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
        <CustomTextfield
          v-model="gcsKesimpulan"
          label="Kesimpulan GCS"
          placeholder="Pilih Kesimpulan GCS"
          class=""
          readOnly
        />
      </div>
      <div v-if="!isEditing" class="py-5 flex flex-col gap-[19px]">
        <CustomInfoRow
          label="Mata"
          :value="getLabelFromValue(eye, opsiKesadaran[0].response)"
        />
        <CustomInfoRow
          label="Motorik"
          :value="getLabelFromValue(motorik, opsiKesadaran[1].response)"
        />
        <CustomInfoRow
          label="Verbal"
          :value="getLabelFromValue(verbal, opsiKesadaran[2].response)"
        />
        <CustomInfoRow label="Kesimpulan GCS" :value="gcsKesimpulan" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" :value="petugas" />
      </div>
      <!-- Dialog compare -->
      <CustomDialog
        class=""
        v-model:visible="compareDialog"
        width="80%"
        noScroll
      >
        <template #header>Kesadaran</template>
        <template #body>
          <div class="pt-5 grid grid-cols-[1fr_min-content_1fr] overflow-auto">
            <div class="flex flex-col overflow-auto">
              <div class="mb-[18px] flex justify-between">
                <div class="font-semibold text-grey-400">
                  Riwayat Sebelumnya
                </div>
                <div class="flex">
                  <CustomButton
                    @click="() => {}"
                    class="!rounded-md mr-[10px]"
                    size="small"
                    icon="PhCaretLeft"
                  />
                  <CustomButton
                    @click="() => {}"
                    class="!rounded-md"
                    size="small"
                    icon="PhCaretRight"
                  />
                </div>
              </div>
              <div
                class="grid grid-cols-[1fr_min-content_1fr] grow overflow-auto"
              >
                <HistoriKesadaran />
                <div class="border border-adameds-300 mx-[15px]"></div>
                <HistoriKesadaran />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col overflow-hidden">
              <div class="flex flex-col pb-1 overflow-auto gap-y-5 grow">
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
                          <div class="font-normal text-SM">
                            {{ response.label }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CustomTextfield
                  v-model="gcsKesimpulan"
                  label="Kesimpulan GCS"
                  placeholder="Pilih Kesimpulan GCS"
                  class=""
                  readOnly
                />
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex items-end justify-end gap-3">
            <CustomButton
              v-if="isEditing"
              label="Reset"
              textColor="text-grey-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-grey-200"
            />
            <CustomButton v-if="isEditing" label="Simpan" @click="onSubmit" />
            <CustomButton
              v-if="!isEditing"
              label="Edit"
              @click="emit('editAsesmen')"
            />
          </div>
        </template>
      </CustomDialog>
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
        <CustomButton v-if="isEditing" label="Simpan" @click="onSubmit" />
        <CustomButton v-else label="Edit" @click="emit('editAsesmen')" />
      </div>
    </template>
  </CustomAccordion>
</template>
