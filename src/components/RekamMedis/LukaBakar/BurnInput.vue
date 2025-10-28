<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from "vue";
import Adult from "./BurnSVG/Adult.vue";
import AdultWomen from "./BurnSVG/AdultWomen.vue";
import Child from "./BurnSVG/Child.vue";
import ChildWomen from "./BurnSVG/ChildWomen.vue";
import Baby from "./BurnSVG/Baby.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";
import { epochToDate } from "@/utils/Helpers";
import CustomSelect from "@/components/Base/CustomSelect.vue";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();

const emit = defineEmits(["editAsesmen"]);

const props = defineProps({
  header: {
    type: String,
    default: "Derajat Luka Bakar",
  },
  method: {
    type: String,
    default: "form",
  },
  initialState: {
    type: String,
    default: "null",
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
  },
});

const persentaseLukaBakar = ref<number>(0);
const lpt = ref<number>(0);
const petugas = ref<string>("Super Admin");
const adultSvgRefs = ref<any>(null);
const adultWomanSvgRefs = ref<any>(null);

const submit = async () => {
  try {
    storeUtils.setLoading(true);
    const bodiesData =
      props.patientData?.patient.gender == "Male"
        ? adultSvgRefs.value?.submitObject()
        : adultWomanSvgRefs.value?.submitObject();
    const response = await rekamMedisStore.insertAssesment({
      sessionUuid: props.sessionUuid,
      rekamMedisUuid: props.rmUuid,
      isLatest: rekamMedisStore.openedRekamMedis.isLatest,
      key: "luka_bakar",
      data: {
        bodies: bodiesData,
        persentaseLuka: persentaseLukaBakar.value,
        lpt: lpt.value,
        petugas: petugas.value,
      },
    });
    if (response && response.payload) {
      rekamMedisStore.setAsesmentSummaryRekamMedisData(response.payload);
    }
  } catch (error) {
    console.error("Failed to post data", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const setFormData = () => {
  if (rekamMedisStore.openedRekamMedis.data.lukaBakar) {
    persentaseLukaBakar.value =
      rekamMedisStore.openedRekamMedis.data.lukaBakar.persentaseLuka;
      lpt.value = rekamMedisStore.openedRekamMedis.data.lukaBakar.lpt;
      petugas.value = rekamMedisStore.openedRekamMedis.data.lukaBakar.petugas;
    } else {
    persentaseLukaBakar.value = 0;
    lpt.value = 0;
    petugas.value = "Super Admin";
  }
};

onBeforeMount(() => {
  setFormData();
});

const storedRMData = computed(() => rekamMedisStore.openedRekamMedis);
watch(storedRMData, (newRM) => {
  setFormData();
});

const historyData = ref<any>(null);
const historyPageIndex = ref(0);
const historyDialog = ref(false);
const filterOptions = ref([
  { name: "Semua", value: "semua" },
  { name: "RJ", value: "rj" },
  { name: "RI", value: "ri" },
  { name: "IGD", value: "igd" },
]);
const selectedFilter = ref("semua");

const fetchHistoryData = async () => {
  if (!props.patientData?.patient) {
    console.warn("Data Pasien tidak lengkap untuk mengambil riwayat.");
    historyData.value = null;
    return;
  }
  try {
    storeUtils.setLoading(true);
    const response = await rekamMedisStore.getCompare({
      noPelayanan: props.patientData.noPelayanan || props.patientData.no_pelayanan,
      noRm: props.patientData.patient.noRm,
      // Gunakan nilai dari filter yang dipilih
      jenisKunjungan: selectedFilter.value === 'semua' ? '' : selectedFilter.value,
      key: "luka_bakar",
    });
    if (response && response.payload && response.payload.length > 0) {
      historyData.value = response.payload;
    } else {
      historyData.value = null;
    }
  } catch (error) {
    console.error("Gagal mengambil data perbandingan untuk luka bakar:", error);
    historyData.value = null;
  } finally {
    storeUtils.setLoading(false);
  }
};

const showDialogHistory = async () => {
  await fetchHistoryData();
  historyPageIndex.value = 0; 
  historyDialog.value = true;
};

watch(selectedFilter, async (newValue, oldValue) => {
    if (historyDialog.value && newValue !== oldValue) {
        await fetchHistoryData();
        historyPageIndex.value = 0;
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
const detailDialog = ref(false);

defineExpose({
  open,
  close,
});
</script>

<template>
  <div>
    <CustomAccordion
      ref="accordion"
      headerClass="bg-adameds-50"
      :initialState="initialState"
    >
      <template #header>{{ header }}</template>
      <template #content>
        <div v-if="method == 'form'" class="flex flex-col">
          <CustomButton
            @click="showDialogHistory"
            class="!rounded-md my-[10px] ml-auto"
            label="Riwayat Pemeriksaan"
            size="small"
            icon="PhClockCounterClockwise"
          />
          <hr class="mb-[30px]" />
        </div>
        <div v-if="method == 'form'" class="flex justify-between pt-5">
          <div class="grow mr-[30px]">
            <CustomInputNumber
              v-model="persentaseLukaBakar"
              label="Presentase Luka Bakar"
              type="number"
            >
              <template #appendText>
                <div class="flex items-center mr-2">%</div>
              </template>
            </CustomInputNumber>
            <CustomInputNumber
              v-model="lpt"
              label="LPT"
              type="number"
              class="mt-5"
            >
              <template #appendText>
                <div class="flex items-center mr-2">M²</div>
              </template>
            </CustomInputNumber>
          </div>
          <Adult
            v-if="patientData?.patient.gender == 'Male'"
            :openedData="rekamMedisStore.openedRekamMedis.data.lukaBakar"
            ref="adultSvgRefs"
            class="w-[800px]"
          />
          <AdultWomen
            v-else
            :openedData="rekamMedisStore.openedRekamMedis.data.lukaBakar"
            ref="adultWomanSvgRefs"
            class="w-[800px]"
          />
          <!-- <Child class="w-[800px]" /> -->
          <!-- <ChildWomen class="w-[800px]" /> -->
          <!-- <Baby class="w-[800px]" /> -->
          <div class="font-semibold text-normal grow ml-[30px]">
            <div class="flex bg-adameds-50 rounded-[10px] h-10 w-full px-5">
              <span class="my-auto text-adameds-300"> Derajat Luka Bakar </span>
            </div>
            <div class="flex px-5 mt-4 text-sunFlower-300">
              <PhFire :size="20" weight="fill" class="mr-[5px]" />
              Grade 1
            </div>
            <div class="flex px-5 mt-6 text-warning-300">
              <PhFire :size="20" weight="fill" class="mr-[5px]" />
              Grade 2
            </div>
            <div class="flex px-5 mt-6 text-danger-300">
              <PhFire :size="20" weight="fill" class="mr-[5px]" />
              Grade 3
            </div>
          </div>
        </div>
        <div v-else class="pt-5">
          <div class="py-5 flex flex-col gap-[19px]">
            <CustomInfoRow
              label="Presentase Luka Bakar"
              :value="`${persentaseLukaBakar} %`"
            />
            <CustomInfoRow label="LPT" :value="`${lpt} M²`" />
            <hr class="border-grey-200" />
            <CustomInfoRow label="Petugas Input" :value="petugas" />
          </div>
        </div>
      </template>
      <template #footer>
        <div v-if="method == 'detail'" class="flex justify-between">
          <CustomButton
            @click="detailDialog = true"
            label="Detail"
            icon="DetailIcon"
          />
          <CustomButton @click="emit('editAsesmen')" label="Edit" />
        </div>
        <div v-else class="flex items-end justify-end gap-3">
          <CustomButton
            label="Reset"
            textColor="text-grey-300"
            backgroundColor="bg-transparent"
            borderColor="border-2 border-grey-200"
          />
          <CustomButton @click="submit" label="Simpan" />
        </div>
      </template>
    </CustomAccordion>
    <CustomDialog class="" v-model:visible="detailDialog" width="1036px">
      <template #header>Detail Derajat Luka Bakar (RON)</template>
      <template #body>
        <div class="pt-5">
          <div class="flex justify-between pt-5">
            <Adult
              v-if="patientData?.patient.gender == 'Male'"
              :openedData="rekamMedisStore.openedRekamMedis.data.lukaBakar"
              ref="adultSvgRefs"
              class="w-[800px]"
            />
            <AdultWomen
              v-else
              :openedData="rekamMedisStore.openedRekamMedis.data.lukaBakar"
              ref="adultWomanSvgRefs"
              class="w-[800px]"
            />
            <!-- <Child class="w-[800px]" /> -->
            <!-- <ChildWomen class="w-[800px]" /> -->
            <!-- <Baby class="w-[800px]" /> -->
            <div class="font-semibold text-normal grow ml-[30px]">
              <div class="flex bg-adameds-50 rounded-[10px] h-10 w-full px-5">
                <span class="my-auto text-adameds-300">
                  Derajat Luka Bakar
                </span>
              </div>
              <div class="flex px-5 mt-4 text-sunFlower-300">
                <PhFire :size="20" weight="fill" class="mr-[5px]" />
                Grade 1
              </div>
              <div class="flex px-5 mt-6 text-warning-300">
                <PhFire :size="20" weight="fill" class="mr-[5px]" />
                Grade 2
              </div>
              <div class="flex px-5 mt-6 text-danger-300">
                <PhFire :size="20" weight="fill" class="mr-[5px]" />
                Grade 3
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton @click="emit('editAsesmen')" label="Edit" />
        </div>
      </template>
    </CustomDialog>
    <!-- Dialog History -->
     <CustomDialog class="" v-model:visible="historyDialog" width="80%">
  <template #header>Pemeriksaan Fisik</template>
  <template #body>
    <div class="pt-5 grid grid-cols-[1fr_min-content_1fr]">
      <div class="mb-[18px] flex justify-between col-span-3 items-center">
        <div class="font-semibold text-grey-400">Riwayat Sebelumnya</div>
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

      <div>
        <div v-if="leftHistoryItem">
          <CustomAccordion headerClass="bg-adameds-50" :initialState="'0'">
            <template #header>
              {{ epochToDate(leftHistoryItem.updatedAt, 'date') || "Data Riwayat" }}
            </template>
            <template #content>
              <Adult
                v-if="patientData?.patient.gender == 'Male'"
                :openedData="leftHistoryItem"
                class="w-full mt-4"
              />
              <AdultWomen
                v-else
                :openedData="leftHistoryItem"
                class="w-full mt-4"
              />
              <div class="py-5 flex flex-col gap-[19px]">
                <CustomInfoRow label="Presentase Luka Bakar" :value="`${leftHistoryItem.persentaseLuka || '0'} %`" />
                <CustomInfoRow label="LPT" :value="`${leftHistoryItem.lpt || '0'} M²`" />
                <hr class="border-grey-200" />
                <CustomInfoRow label="Petugas Input" :value="leftHistoryItem.petugas || '-'" />
                <CustomInfoRow label="Jam Input" :value="String(epochToDate(leftHistoryItem.updatedAt, 'time'))" />
              </div>
            </template>
          </CustomAccordion>
        </div>
        <div v-else class="text-center text-grey-400 p-4">
          Tidak ada riwayat.
        </div>
      </div>

      <div class="border border-adameds-300 mx-[15px]"></div>

      <div>
        <div v-if="rightHistoryItem">
          <CustomAccordion headerClass="bg-adameds-50" :initialState="'0'">
            <template #header>
              {{ epochToDate(rightHistoryItem.updatedAt, 'date') || "Data Riwayat" }}
            </template>
            <template #content>
              <Adult
                v-if="patientData?.patient.gender == 'Male'"
                :openedData="rightHistoryItem"
                class="w-full mt-4"
              />
              <AdultWomen
                v-else
                :openedData="rightHistoryItem"
                class="w-full mt-4"
              />
              <div class="py-5 flex flex-col gap-[19px]">
                <CustomInfoRow label="Presentase Luka Bakar" :value="`${rightHistoryItem.persentaseLuka || '0'} %`" />
                <CustomInfoRow label="LPT" :value="`${rightHistoryItem.lpt || '0'} M²`" />
                <hr class="border-grey-200" />
                <CustomInfoRow label="Petugas Input" :value="rightHistoryItem.petugas || '-'" />
                <CustomInfoRow label="Jam Input" :value="String(epochToDate(rightHistoryItem.updatedAt, 'time'))" />
              </div>
            </template>
          </CustomAccordion>
        </div>
        <div v-else class="text-center text-grey-400 p-4">
          Tidak ada data riwayat selanjutnya.
        </div>
      </div>
    </div>
  </template>
</CustomDialog>
    <!-- <CustomDialog class="" v-model:visible="historyDialog" width="80%">
      <template #header>Pemeriksaan Fisik</template>
      <template #body>
        <div class="pt-5 grid grid-cols-[1fr_min-content_1fr]">
          <div class="mb-[18px] flex justify-between col-span-3">
            <div class="font-semibold text-grey-400">Riwayat Sebelumnya</div>
            <div class="flex">
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

          <div>
            <div v-if="leftHistoryItem">
              <Adult
                v-if="patientData?.patient.gender == 'Male'"
                :openedData="leftHistoryItem"
                class="w-[800px]"
              />
              <AdultWomen
                v-else
                :openedData="leftHistoryItem"
                class="w-[800px]"
              />
              <div class="py-5 flex flex-col gap-[19px]">
                <CustomInfoRow label="Presentase Luka Bakar" :value="`${leftHistoryItem.persentaseLuka || '0'} %`" />
                <CustomInfoRow label="LPT" :value="`${leftHistoryItem.lpt || '0'} M²`" />
                <hr class="border-grey-200" />
                <CustomInfoRow label="Petugas Input" :value="leftHistoryItem.petugas || '-'" />
                <CustomInfoRow label="Jam Input" :value="String(epochToDate(leftHistoryItem.updatedAt, 'time'))" />
              </div>
            </div>
            <div v-else class="text-center text-grey-400 p-4">
              Tidak ada riwayat.
            </div>
          </div>

          <div class="border border-adameds-300 mx-[15px]"></div>

          <div>
            <div v-if="rightHistoryItem">
              <Adult
                v-if="patientData?.patient.gender == 'Male'"
                :openedData="rightHistoryItem"
                class="w-[800px]"
              />
              <AdultWomen
                v-else
                :openedData="rightHistoryItem"
                class="w-[800px]"
              />
              
              <div class="py-5 flex flex-col gap-[19px]">
                <CustomInfoRow label="Presentase Luka Bakar" :value="`${rightHistoryItem.persentaseLuka || '0'} %`" />
                <CustomInfoRow label="LPT" :value="`${rightHistoryItem.lpt || '0'} M²`" />
                <hr class="border-grey-200" />
                <CustomInfoRow label="Petugas Input" :value="rightHistoryItem.petugas || '-'" />
                <CustomInfoRow label="Jam Input" :value="String(epochToDate(rightHistoryItem.updatedAt, 'time'))" />
              </div>
            </div>
            <div v-else class="text-center text-grey-400 p-4">
              Tidak ada data riwayat selanjutnya.
            </div>
          </div>
        </div>
      </template>
    </CustomDialog> -->
  </div>
</template>
