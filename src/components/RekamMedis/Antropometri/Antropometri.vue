<script lang="ts" setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import HistoriAntropometri from "@/components/RekamMedis/Antropometri/HistoriAntropometri.vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";
import { epochToDate } from "@/utils/Helpers";
import CustomSelect from "@/components/Base/CustomSelect.vue";

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
  patientData: {
    type: Object,
    default: () => ({}),
  },
});
const isEditing = ref(props.method === "form");
const emit = defineEmits(["edit", "submit", "editAsesmen"]);

const schema = toTypedSchema(
  yup.object({
    beratBadan: yup.number(),
    tinggiBadan: yup.number(),
    imt: yup.number(),
    catatan: yup.string(),
    petugas: yup.string().default("Super Admin"),
    createdAt: yup.mixed(),
  })
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});
const [beratBadan] = defineField("beratBadan");
const [tinggiBadan] = defineField("tinggiBadan");
const [imt] = defineField("imt");
const [catatan] = defineField("catatan");
const [petugas] = defineField("petugas");
const [createdAt] = defineField("createdAt");

const calculateIMT = () => {
  if (beratBadan.value && tinggiBadan.value) {
    imt.value = Number(
      (beratBadan.value / (tinggiBadan.value / 100) ** 2).toFixed(2)
    );
  } else {
    imt.value = 0;
  }
};

const onSubmit = handleSubmit(async (values: any) => {
  try {
    storeUtils.setLoading(true);
    const response = await rekamMedisStore.insertAssesment({
      sessionUuid: props.sessionUuid,
      rekamMedisUuid: props.rmUuid,
      isLatest: rekamMedisStore.openedRekamMedis.isLatest,
      key: "antropometri",
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
  if (rekamMedisStore.openedRekamMedis.data.antropometri) {
    const tempAntropometri = rekamMedisStore.openedRekamMedis.data.antropometri;
    setValues({
      beratBadan: tempAntropometri.beratBadan,
      tinggiBadan: tempAntropometri.tinggiBadan,
      imt: tempAntropometri.imt,
      catatan: tempAntropometri.catatan,
      petugas: tempAntropometri.petugas,
      createdAt: tempAntropometri.createdAt,
    });
    calculateIMT();
  } else resetForm();
};

onBeforeMount(() => {
  setFormData();
});

// NOTE Untuk merefresh form yang sedang dibuka jika ada perubahan data
const storedRMData = computed(() => rekamMedisStore.openedRekamMedis);
watch(storedRMData, (newRM) => {
  setFormData();
});

const compareDialog = ref(false);
const historyData = ref<Array<any> | null>(null);
const historyPageIndex = ref(0);
const filterOptions = ref([
  { name: "Semua", value: "semua" },
  { name: "RJ", value: "rj" },
  { name: "RI", value: "ri" },
  { name: "IGD", value: "igd" },
]);
const selectedFilter = ref("semua");

// Fungsi baru untuk mengambil data riwayat
const fetchHistoryData = async () => {
  try {
    storeUtils.setLoading(true);
    const response = await rekamMedisStore.getCompare({
      noPelayanan: props.patientData?.noPelayanan || props.patientData?.no_pelayanan,
      noRm: props.patientData?.patient?.noRm,
      key: "antropometri",
      jenisKunjungan: selectedFilter.value === 'semua' ? '' : selectedFilter.value,
    });

    if (response && response.payload) {
      historyData.value = response.payload;
      historyPageIndex.value = 0; // Selalu reset paginasi saat data baru dimuat
    } else {
      historyData.value = null;
    }
  } catch (error) {
    console.error("Gagal mengambil data compare:", error);
    historyData.value = null;
  } finally {
    storeUtils.setLoading(false);
  }
};

const showDialogCompare = async () => {
  await fetchHistoryData(); // Panggil fungsi baru saat dialog dibuka
  compareDialog.value = true;
};

// Panggil ulang API setiap kali filter berubah
watch(selectedFilter, async (newValue, oldValue) => {
    if (compareDialog.value && newValue !== oldValue) {
        await fetchHistoryData();
    }
});


const leftHistoryItem = computed(() => {
  if (!historyData.value || !historyData.value[historyPageIndex.value]) return null;
  return historyData.value[historyPageIndex.value].data;
});

const rightHistoryItem = computed(() => {
  if (!historyData.value || !historyData.value[historyPageIndex.value + 1]) return null;
  return historyData.value[historyPageIndex.value + 1].data;
});

const canGoToPrevious = computed(() => historyPageIndex.value > 0);

const canGoToNext = computed(() => {
  if (!historyData.value) return false;
  return historyPageIndex.value + 2 < historyData.value.length;
});

const previousHistory = () => {
  if (canGoToPrevious.value) {
    historyPageIndex.value -= 2;
  }
};

const nextHistory = () => {
  if (canGoToNext.value) {
    historyPageIndex.value += 2;
  }
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
    <template #header>Antropometri</template>
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
      <div v-if="isEditing" class="flex gap-[30px] pt-5">
        <CustomInputNumber
          v-model="beratBadan"
          label="Berat Badan"
          @update:model-value="calculateIMT"
        >
          <template #appendText>
            <div class="flex items-center justify-center mr-2.5">Kg</div>
          </template>
        </CustomInputNumber>
        <CustomInputNumber
          v-model="tinggiBadan"
          label="Tinggi Badan"
          @update:model-value="calculateIMT"
        >
          <template #appendText>
            <div class="flex items-center justify-center mr-2.5">Cm</div>
          </template>
        </CustomInputNumber>
        <CustomInputNumber
          v-model="imt"
          label="IMT"
          placeholder="0"
          class=""
          readOnly
        >
          <template #appendText>
            <div class="flex items-center justify-center mr-2.5">Kg/m²</div>
          </template>
        </CustomInputNumber>
        <CustomTextArea
          v-model="catatan"
          class="grow"
          label="Catatan"
          placeholder="Catatan"
          height="h-10"
        />
      </div>
      <div v-if="!isEditing" class="py-5 flex flex-col gap-[19px]">
        <CustomInfoRow label="Berat Badan">
          <template #value>
            <div>{{ beratBadan }} Kg</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="Tinggi Badan">
          <template #value>
            <div>{{ tinggiBadan }} Cm</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="IMT">
          <template #value>
            <div>{{ imt }} Kg/m²</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="Catatan" :value="catatan" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" :value="petugas" />
        <CustomInfoRow
            label="Jam Input"
            :value="`${epochToDate(createdAt, 'time')}`"
          />
      </div>
      <CustomDialog
        class=""
        v-model:visible="compareDialog"
        width="80%"
        noScroll
      >
        <template #header>Antropometri</template>
        <template #body>
          <div class="pt-5 grid grid-cols-[1fr_min-content_1fr] h-full overflow-auto">
            <div class="flex flex-col overflow-auto pr-4">
              <div class="mb-[18px] flex justify-between items-center">
                <div class="font-semibold text-grey-400">
                  Riwayat Sebelumnya
                </div>
                <div class="flex items-center">
                  <CustomSelect
                    v-model="selectedFilter"
                    :options="filterOptions"
                    optionLabel="name"
                    optionValue="value"
                    :show-label="false"
                    class="w-40 mr-4"
                  />
                  <CustomButton
                    @click="previousHistory"
                    :disabled="!canGoToPrevious"
                    class="!rounded-md mr-[10px]"
                    size="small"
                    icon="PhCaretLeft"
                  />
                  <CustomButton
                    @click="nextHistory"
                    :disabled="!canGoToNext"
                    class="!rounded-md"
                    size="small"
                    icon="PhCaretRight"
                  />
                </div>
              </div>
              <div
                class="grid grid-cols-[1fr_min-content_1fr] grow overflow-auto gap-x-4"
              >
                <HistoriAntropometri v-if="leftHistoryItem" :history="leftHistoryItem" />
                <div v-else class="text-center text-grey-400 self-start pt-4 whitespace-nowrap">Tidak ada riwayat.</div>

                <div v-if="rightHistoryItem" class="border border-adameds-300"></div>
                
                <HistoriAntropometri v-if="rightHistoryItem" :history="rightHistoryItem" />
                <div v-else class="text-center text-grey-400 self-start pt-4 whitespace-nowrap">Tidak ada riwayat.</div>
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col overflow-hidden">
              <div class="flex flex-col pb-1 overflow-auto gap-y-5 grow">
                <div class="grid grid-cols-3 gap-5">
                  <CustomInputNumber
                    v-model="beratBadan"
                    label="Berat Badan"
                    @update:model-value="calculateIMT"
                  >
                    <template #appendText>
                      <div class="flex items-center justify-center mr-2.5">
                        Kg
                      </div>
                    </template>
                  </CustomInputNumber>
                  <CustomInputNumber
                    v-model="tinggiBadan"
                    label="Tinggi Badan"
                    @update:model-value="calculateIMT"
                  >
                    <template #appendText>
                      <div class="flex items-center justify-center mr-2.5">
                        Cm
                      </div>
                    </template>
                  </CustomInputNumber>
                  <CustomInputNumber
                    v-model="imt"
                    label="IMT"
                    placeholder="0"
                    class=""
                    readOnly
                  >
                    <template #appendText>
                      <div class="flex items-center justify-center mr-2.5">
                        Kg/m²
                      </div>
                    </template>
                  </CustomInputNumber>
                </div>
                <CustomTextArea
                  v-model="catatan"
                  class="grow"
                  label="Catatan"
                  placeholder="Catatan"
                  height="h-10"
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