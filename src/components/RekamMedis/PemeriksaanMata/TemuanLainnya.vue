<script setup lang="ts">
import { computed, onMounted, ref, watch, type PropType } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import HistoriTemuanLainnya from "@/components/RekamMedis/PemeriksaanMata/HistoriTemuanLainnya.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
  type: {
    type: String,
    required: true,
  },
  openedData: {
    type: Object as PropType<any>,
    default: null,
  },
  patientData: {
    type: Object,
    default: () => ({}),
  }, 
});

const temuanLainnya = ref();
const compareDialog = ref(false);

const saveData = () => {
  return {
    temuanLainnya: temuanLainnya.value,
  };
};

const setFormData = () => {
  if (props.openedData) {
    temuanLainnya.value = props.openedData.temuanLainnya;
  } else temuanLainnya.value = undefined;
};

const historyData = ref<Array<any> | null>(null);
const historyPageIndex = ref(0);

const fetchHistoryData = async () => {
  try {
    storeUtils.setLoading(true);
    const response = await rekamMedisStore.getCompare({
      noPelayanan: props.patientData?.noPelayanan || props.patientData?.no_pelayanan,
      noRm: props.patientData?.patient?.noRm,
      key: "pemeriksaan_mata",
    });

    if (response && response.payload) {
      historyData.value = response.payload;
      historyPageIndex.value = 0;
    } else {
      historyData.value = null;
    }
  } catch (error) {
    console.error("Gagal mengambil data compare untuk Temuan Lainnya:", error);
    historyData.value = null;
  } finally {
    storeUtils.setLoading(false);
  }
};

const showDialogCompare = async () => {
  await fetchHistoryData();
  compareDialog.value = true;
};

const leftHistoryItem = computed(() => {
  if (!historyData.value || !historyData.value[historyPageIndex.value]) return null;
  return historyData.value[historyPageIndex.value];
});

const rightHistoryItem = computed(() => {
  if (!historyData.value || !historyData.value[historyPageIndex.value + 1]) return null;
  return historyData.value[historyPageIndex.value + 1];
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

const storedRMData = computed(() => rekamMedisStore.openedRekamMedis);
watch(storedRMData, (newRM) => {
  setFormData();
});

onMounted(() => {
  setFormData();
});

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
  saveData,
  props,
});
</script>

<template>
  <CustomAccordion ref="accordion" headerClass="bg-adameds-50">
    <template #header>Temuan Lainnya</template>
    <template #content>
      <div class="pt-5">
        <div v-if="method == 'form'" class="flex flex-col">
          <CustomButton
            @click="showDialogCompare"
            class="!rounded-md my-[10px] ml-auto"
            label="Mode Compare"
            size="small"
            icon="LayoutIcon"
          />
          <hr class="mb-[30px]" />
        </div>
        <CustomTextArea
          v-if="method == 'form'"
          v-model="temuanLainnya"
          label="Temuan Lainnya"
          placeholder="Masukkan Temuan Lainnya..."
        />
        <CustomInfoRow v-else label="Temuan Lainnya" :value="temuanLainnya" />
      </div>

      <!-- Dialog compare -->
      <CustomDialog
        class=""
        v-model:visible="compareDialog"
        width="80%"
        noScroll
      >
        <template #header>Antropometri</template>
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
              <div class="grid grid-cols-[1fr_min-content_1fr] grow overflow-auto gap-x-4">
                <HistoriTemuanLainnya v-if="leftHistoryItem" :history="leftHistoryItem.data" />
                <div v-else class="text-center text-grey-400 self-start pt-4">Tidak ada riwayat.</div>

                <div v-if="rightHistoryItem" class="border border-adameds-300"></div>
                
                <HistoriTemuanLainnya v-if="rightHistoryItem" :history="rightHistoryItem.data" />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col overflow-hidden">
              <div class="flex flex-col pb-1 overflow-auto gap-y-5 grow">
                <CustomTextArea
                  label="Temuan Lainnya"
                  placeholder="Masukkan Temuan Lainnya..."
                />
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex items-end justify-end gap-3">
            <CustomButton
              v-if="method == 'form'"
              label="Reset"
              textColor="text-grey-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-grey-200"
            />
            <CustomButton
              v-if="method == 'form'"
              label="Simpan"
              @click="() => {}"
            />
            <CustomButton
              v-if="method == 'detail'"
              label="Edit"
              @click="() => {}"
            />
          </div>
        </template>
      </CustomDialog>
    </template>
  </CustomAccordion>
</template>
