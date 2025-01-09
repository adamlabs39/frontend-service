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

// NOTE Untuk merefresh form yang sedang dibuka jika ada perubahan data
const storedRMData = computed(() => rekamMedisStore.openedRekamMedis);
watch(storedRMData, (newRM) => {
  setFormData();
});

const historyDialog = ref(false);
const showDialogHistory = () => {
  historyDialog.value = true;
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
          <div class="mb-[18px] flex justify-between col-span-3">
            <div class="font-semibold text-grey-400">Riwayat Sebelumnya</div>
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
          <div>
            <Adult class="w-[800px]" />
            <div class="py-5 flex flex-col gap-[19px]">
              <CustomInfoRow label="Presentase Luka Bakar" value="0 %" />
              <CustomInfoRow label="LPT" value="0 M²" />
              <hr class="border-grey-200" />
              <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
              <CustomInfoRow label="Jam Input" :value="`petugas`" />
            </div>
          </div>
          <div class="border border-adameds-300 mx-[15px]"></div>
          <div>
            <Adult class="w-[800px]" />
            <div class="py-5 flex flex-col gap-[19px]">
              <CustomInfoRow label="Presentase Luka Bakar" value="0 %" />
              <CustomInfoRow label="LPT" value="0 M²" />
              <hr class="border-grey-200" />
              <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
              <CustomInfoRow label="Jam Input" :value="`petugas`" />
            </div>
          </div>
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
