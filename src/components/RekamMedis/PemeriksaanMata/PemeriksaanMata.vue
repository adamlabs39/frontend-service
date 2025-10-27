<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomCanvasDrawer from "../PemeriksaanFisik/CustomCanvasDrawer.vue";
import SkriningMata from "./SkriningMata.vue";
import TemuanLainnya from "./TemuanLainnya.vue";
import { isCanvasEmpty } from "../PemeriksaanFisik/pemeriksaanFisikUtils";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";
import { ref } from "vue";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();

const emit = defineEmits(["edit", "editAsesmen"]);

const props = defineProps({
  header: {
    type: String,
    default: "Pemeriksaan Mata",
  },
  method: {
    type: String,
    default: "form",
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

const canvasOftalmologis = ref<HTMLCanvasElement | null>(null);
const canvasAnterior = ref<HTMLCanvasElement | null>(null);
const canvasPosterior = ref<HTMLCanvasElement | null>(null);
const skriningMata = ref<any>(null);
const temuanLainnya = ref<any>(null);

const arrRefElement = ref<any[]>([
  canvasOftalmologis,
  canvasAnterior,
  canvasPosterior,
  skriningMata,
  temuanLainnya,
]);

const openFilledCanvas = () => {
  const pemeriksaanMata =
    rekamMedisStore.openedRekamMedis?.data?.pemeriksaanMata;

  if (!pemeriksaanMata) return;

  arrRefElement.value.forEach((elementRef) => {
    const element = elementRef.value;

    if (!element) return;

    const { props, checkFilledForm, open } = element || {};
    const gambarKey = `gambar${props.type}`;
    const isNotEmptyCanvas =
    pemeriksaanMata[gambarKey] && !isCanvasEmpty(pemeriksaanMata[gambarKey]);

    switch (props.type) {
      case "skriningMata":
        if (checkFilledForm()) open();
        console.log("🚀 ~ arrRefElement.value.forEach ~ checkFilledForm:", checkFilledForm())
        break;

      case "temuanLainnya":
        if (pemeriksaanMata.temuanLainnya) open();
        break;

      case "Anterior":
        if (
          isNotEmptyCanvas ||
          pemeriksaanMata.ketOd ||
          pemeriksaanMata.ketOs
        ) {
          open();
        }
        break;

      default:
        if (isNotEmptyCanvas) {
          open();
        }
        break;
    }
  });
};
const closeAllAccordion = () => {
  arrRefElement.value.forEach((canvasRef) => {
    if (canvasRef.value) {
      (canvasRef.value as any).close();
      if (typeof (canvasRef.value as any).close === "function") {
      }
    }
  });
};

const submitData = () => {
  let tempObjectData: any = {};
  arrRefElement.value.forEach((elementRef) => {
    if (elementRef.value) {
      if (
        (elementRef.value as any).props.type != "skriningMata" &&
        (elementRef.value as any).props.type != "temuanLainnya"
      ) {
        let data = (elementRef.value as any).saveCanvas();
        tempObjectData = { ...tempObjectData, ...data };
      } else {
        let data = (elementRef.value as any).saveData();
        tempObjectData = { ...tempObjectData, ...data };
      }
    }
  });
  return tempObjectData;
};

const onSubmit = async () => {
  try {
    storeUtils.setLoading(true);
    const tempPemeriksaanMataData = submitData();
    const response = await rekamMedisStore.insertAssesment({
      sessionUuid: props.sessionUuid,
      rekamMedisUuid: props.rmUuid,
      isLatest: rekamMedisStore.openedRekamMedis.isLatest,
      key: "pemeriksaan_mata",
      data: tempPemeriksaanMataData,
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
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>{{ header }}</template>
    <template #content>
      <div class="pt-5">
        <div v-if="method == 'form'" class="flex justify-end mb-5">
          <div class="flex">
            <CustomButton
              @click="openFilledCanvas"
              class="my-auto !rounded-md ml-5 mx-[10px]"
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
              label="Buka Bagian Yang Sudah Terisi"
              size="small"
              outlined
            />
            <CustomButton
              @click="closeAllAccordion"
              class="my-auto !rounded-md"
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
              label="Tutup Semua"
              size="small"
              outlined
            />
          </div>
        </div>

        <CustomCanvasDrawer
          ref="canvasOftalmologis"
          header="Oftalmologis"
          type="Oftalmologis"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanMata"
          :historyKey="'pemeriksaan_mata'"
          :patientData="patientData"
        />
        <CustomCanvasDrawer
          ref="canvasAnterior"
          header="Anterior"
          type="Anterior"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanMata"
          :historyKey="'pemeriksaan_mata'"
          :patientData="patientData"
        />
        <CustomCanvasDrawer
          ref="canvasPosterior"
          header="Posterior"
          type="Posterior"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanMata"
          :historyKey="'pemeriksaan_mata'"
          :patientData="patientData"
        />
        <SkriningMata
          ref="skriningMata"
          class="mb-[10px]"
          :method="method"
          type="skriningMata"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanMata"
          :patientData="props.patientData"
        />
        <TemuanLainnya
          ref="temuanLainnya"
          class="mb-[10px]"
          :method="method"
          type="temuanLainnya"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanMata"
          :patientData="props.patientData"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="method == 'form'"
          label="Reset"
          textColor="text-grey-300"
          borderColor="border-2 border-grey-200"
          outlined
        />
        <CustomButton
          v-if="method == 'form'"
          @click="onSubmit"
          label="Simpan "
        />
        <CustomButton
          v-if="props.method == 'detail'"
          @click="emit('editAsesmen')"
          label="Edit"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
