<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import GeneralIcon from "@/assets/icons/Avatar/general.svg";
import { PhCaretLeft, PhCaretRight, PhCalendarDots, PhClock, PhPaperPlaneTilt } from "@phosphor-icons/vue";
import { computed, onBeforeMount, ref, watch } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import HistoriCatatanPerawat from "@/components/RekamMedis/CatatanPerawat/HistoriCatatanPerawat.vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";
import { epochToDate } from "@/utils/Helpers";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";

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

const emit = defineEmits(["edit", "editAsesmen"]);

const currentMethod = ref(props.method);
const modeChat = ref("Add");

const messages = ref<any[]>([]);
const petugasInput = ref<string>("-");
const createdAt = ref<number | null>(null);

const schemaCatatanPerawat = computed(() =>
  yup.object({
    catatanPerawat: yup.string(),
  })
);

const {
  handleSubmit: handleSubmitCatatanPerawat,
  defineField: defineFieldCatatanPerawat,
  resetForm,
} = useForm({
  validationSchema: schemaCatatanPerawat,
});

const [catatanPerawat] = defineFieldCatatanPerawat("catatanPerawat");

const replyMessageRole = ref<string | null>(null);
const editMessageRole = ref<string | null>(null);
const editMessageIndex = ref<number | null>(null);
const textLama = ref("");

const handleActionClick = (actionText: string, message: any, index: number) => {
  if (actionText === "Balas") {
    onReplyMessage(message);
  } else if (actionText === "Edit") {
    onEditMessage(message, index);
  }
};

const onEditMessage = (message: any, index: number) => {
  editMessageRole.value = message.role;
  catatanPerawat.value = message.text;
  editMessageIndex.value = index;
  modeChat.value = "Edit";
};

const onReplyMessage = (message: any) => {
  replyMessageRole.value = message.role;
  modeChat.value = "Balas";
  textLama.value = message.text;
  catatanPerawat.value = "";
};

const onSubmitCatatanPerawat = handleSubmitCatatanPerawat(
  async (values: any) => {
    if (modeChat.value === "Edit" && editMessageIndex.value !== null) {
      messages.value[editMessageIndex.value].text = values.catatanPerawat;
      resetForm();
    } else if (modeChat.value === "Add") {
      try {
        storeUtils.setLoading(true);
        const response = await rekamMedisStore.insertCatatan({
          sessionUuid: props.sessionUuid,
          message: values.catatanPerawat,
        });
        if (response && response.payload) {
          rekamMedisStore.setAsesmentRekamMedisData(response.payload);
          resetForm();
          await setFormData();
        }
      } catch (error) {
        console.error("Failed to post data", error);
      } finally {
        storeUtils.setLoading(false);
      }
    } else if (modeChat.value === "Balas") {
      const newReplyMessage = {
        role: "Anda",
        roleYangDibalas: replyMessageRole.value || "",
        text: values.catatanPerawat,
        textLama: textLama.value,
        date: new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSender: true,
        avatar: GeneralIcon,
        actions: [
          { text: "Edit", icon: "PhPencil" },
          { text: "Balas", icon: "PhArrowUUpLeft" },
        ],
      };
      messages.value.push(newReplyMessage);
      emit("edit", newReplyMessage);
      resetForm();
    }
    modeChat.value = "Add";
    replyMessageRole.value = null;
    editMessageRole.value = null;
    editMessageIndex.value = null;
  }
);

const setFormData = async () => {
  if (!props.sessionUuid) {
    messages.value = [];
    petugasInput.value = "-";
    createdAt.value = null;
    resetForm();
    return;
  }
  try {
    const responseCatatan = await rekamMedisStore.getCatatan(props.sessionUuid);
    if (responseCatatan && responseCatatan.payload) {
      messages.value = responseCatatan.payload.data || [];
      petugasInput.value = responseCatatan.payload.petugas || "-";
      createdAt.value = responseCatatan.payload.createdAt || null;
    } else {
      messages.value = [];
      petugasInput.value = "-";
      createdAt.value = null;
    }
  } catch (error) {
    console.error("Gagal mengambil catatan perawat:", error);
    messages.value = [];
    petugasInput.value = "-";
    createdAt.value = null;
  }
};

onBeforeMount(() => {
  setFormData();
});

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

const fetchHistoryData = async () => {
  try {
    storeUtils.setLoading(true);
    const response = await rekamMedisStore.getCompare({
      noPelayanan: props.patientData?.noPelayanan || props.patientData?.no_pelayanan,
      noRm: props.patientData?.patient?.noRm,
      key: "catatan_perawat",
      jenisKunjungan: selectedFilter.value === 'semua' ? '' : selectedFilter.value,
    });

    if (response && response.payload) {
      historyData.value = response.payload;
      historyPageIndex.value = 0;
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
  await fetchHistoryData();
  compareDialog.value = true;
};

watch(selectedFilter, async (newValue, oldValue) => {
    if (compareDialog.value && newValue !== oldValue) {
        await fetchHistoryData();
    }
});

const currentHistoryItem = computed(() => {
  if (!historyData.value || !historyData.value[historyPageIndex.value]) return null;
  return historyData.value[historyPageIndex.value];
});

const canGoToPrevious = computed(() => historyPageIndex.value > 0);
const canGoToNext = computed(() => {
  if (!historyData.value) return false;
  return historyPageIndex.value + 1 < historyData.value.length;
});

const previousHistory = () => {
  if (canGoToPrevious.value) {
    historyPageIndex.value--;
  }
};

const nextHistory = () => {
  if (canGoToNext.value) {
    historyPageIndex.value++;
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
    <template #header>Catatan Perawat</template>
    <template #content>
      <div v-if="currentMethod == 'form'" class="flex flex-col">
        <CustomButton
          @click="showDialogCompare"
          class="!rounded-md my-[10px] ml-auto"
          label="Mode Compare"
          size="small"
          icon="LayoutIcon"
        />
        <hr class="mb-[30px]" />
      </div>
      <div class="pt-5 space-y-2.5">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="flex items-start gap-2.5"
          :class="{ 'flex-row-reverse': message.isMe }"
        >
          <img :src="GeneralIcon" alt="Avatar" />
          <div class="space-y-2.5">
            <div class="flex items-center w-full gap-5">
              <div class="font-semibold text-adameds-300 text-SM">
                {{ message.isMe ? "Anda" : message.name }}
              </div>
              <div class="flex gap-2.5 font-medium text-SM text-grey-400">
                <div class="flex items-center gap-[2px]">
                  <PhCalendarDots :size="12" weight="fill" />
                  {{ epochToDate(message.time, "date") }}
                </div>
                <div class="flex items-center gap-[2px]">
                  <PhClock :size="12" weight="fill" />
                  {{ epochToDate(message.time, "time") }}
                </div>
              </div>
            </div>
            <div
              :class="[
                message.isMe
                  ? 'rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px]'
                  : 'rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]',
                'min-h-[45px] bg-adameds-50 px-4 text-SM font-normal flex items-center',
              ]"
            >
              {{ message.message }}
            </div>
          </div>
        </div>
        
        <div v-if="currentMethod == 'form'">
            <hr class="border-grey-200 my-2.5" />
            <div class="space-y-2.5">
                <CustomTextArea
                    v-model="catatanPerawat"
                    label="Catatan Antar Perawat"
                    placeholder="Ketik Catatan..."
                />
                <CustomButton
                    :full="true"
                    icon="PhPaperPlaneTilt"
                    label="Kirim Catatan"
                    @click="onSubmitCatatanPerawat"
                />
            </div>
        </div>
        
        <div v-if="currentMethod === 'detail'" class="flex flex-col gap-[19px] py-2">
          <hr class="border-grey-200 my-2.5" />
          <CustomInfoRow label="Petugas Input" :value="petugasInput" />
          <CustomInfoRow label="Jam Input" :value="createdAt ? String(epochToDate(createdAt, 'time')) : '-'" />
        </div>
      </div>

      <CustomDialog class="" v-model:visible="compareDialog" width="80%" noScroll>
        <template #header>Catatan Perawat</template>
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
                  >
                    <PhCaretLeft :size="16" />
                  </CustomButton>
                  <CustomButton
                    @click="nextHistory"
                    :disabled="!canGoToNext"
                    class="!rounded-md"
                    size="small"
                  >
                    <PhCaretRight :size="16" />
                  </CustomButton>
                </div>
              </div>
              <div>
                <HistoriCatatanPerawat v-if="currentHistoryItem" :history="currentHistoryItem" />
                <div v-else class="text-center text-grey-400 self-start pt-4 whitespace-nowrap">Tidak ada riwayat.</div>
              </div>
            </div>

            <div class="border border-adameds-300 mx-[15px]"></div>

            <div class="flex flex-col overflow-hidden">
              <div class="flex flex-col pb-1 overflow-auto gap-y-5 grow">
                <div
                  v-for="(message, index) in messages"
                  :key="index"
                  class="flex items-start gap-2.5"
                  :class="{ 'flex-row-reverse': message.isMe }"
                >
                  <img :src="GeneralIcon" alt="Avatar" />
                  <div class="space-y-2.5">
                    <div class="flex items-center w-full gap-5">
                      <div class="font-semibold text-adameds-300 text-SM">
                        {{ message.isMe ? "Anda" : message.name }}
                      </div>
                      <div class="flex gap-2.5 font-medium text-SM text-grey-400">
                        <div class="flex items-center gap-[2px]">
                          <PhCalendarDots :size="12" weight="fill" />
                          {{ epochToDate(message.time, "date") }}
                        </div>
                        <div class="flex items-center gap-[2px]">
                          <PhClock :size="12" weight="fill" />
                          {{ epochToDate(message.time, "time") }}
                        </div>
                      </div>
                    </div>
                    <div
                      :class="[
                        message.isMe
                          ? 'rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px]'
                          : 'rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]',
                        'min-h-[45px] bg-adameds-50 px-4 text-SM font-normal flex items-center',
                      ]"
                    >
                      {{ message.message }}
                    </div>
                  </div>
                </div>
              </div>

              <hr class="border-grey-200 my-2.5" />
              <div class="space-y-2.5">
                <CustomTextArea
                  v-model="catatanPerawat"
                  label="Catatan Antar Perawat"
                  placeholder="Ketik Catatan..."
                />
                <CustomButton
                  :full="true"
                  icon="PhPaperPlaneTilt"
                  label="Kirim Catatan"
                  @click="onSubmitCatatanPerawat"
                />
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          </template>
      </CustomDialog>
    </template>
    
    <template #footer>
      <div v-if="currentMethod == 'detail'" class="flex items-end justify-end gap-3">
          <CustomButton
            @click="emit('editAsesmen')"
            label="Edit"
          />
        </div>
      <div v-else class="flex items-end justify-end gap-3">
        <CustomButton
            @click="resetForm"
            label="Reset"
            textColor="text-[#9DA4B1]"
            backgroundColor="bg-transparent"
            borderColor="border-2 border-[#9DA4B1]"
          />
        <CustomButton
          @click="onSubmitCatatanPerawat"
          label="Simpan"
        />
      </div>
    </template>
  </CustomAccordion>
</template>