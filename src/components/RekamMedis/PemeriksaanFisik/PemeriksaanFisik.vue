<script setup lang="ts">
import { onBeforeMount, onMounted, ref, type PropType } from "vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";

import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomCanvasDrawer from "./CustomCanvasDrawer.vue";
import OhisInput from "./OhisInput.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();

const emit = defineEmits(["editAsesmen"]);

const props = defineProps({
  header: {
    type: String,
    default: "Pemeriksaan Fisik",
  },
  method: {
    type: String,
    default: "form",
  },
  selectedPemeriksaanFisik: {
    type: String as PropType<string | null>,
    default: null,
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

const keadaanUmum = ref("");

const canvasKepala = ref<HTMLCanvasElement | null>(null);
const canvasMata = ref<HTMLCanvasElement | null>(null);
const canvasTelingaKanan = ref<HTMLCanvasElement | null>(null);
const canvasTelingaKiri = ref<HTMLCanvasElement | null>(null);
const canvasHidung = ref<HTMLCanvasElement | null>(null);
const canvasMulut = ref<HTMLCanvasElement | null>(null);
const canvasRonggaMulut = ref<HTMLCanvasElement | null>(null);
const canvasOHIS = ref<HTMLCanvasElement | null>(null);
const canvasTenggorkan = ref<HTMLCanvasElement | null>(null);
const canvasLeher = ref<HTMLCanvasElement | null>(null);
const canvasLeherDepan = ref<HTMLCanvasElement | null>(null);
const canvasDada = ref<HTMLCanvasElement | null>(null);
const canvasJantung = ref<HTMLCanvasElement | null>(null);
const canvasParu = ref<HTMLCanvasElement | null>(null);
const canvasAbdomen = ref<HTMLCanvasElement | null>(null);
const canvasAnus = ref<HTMLCanvasElement | null>(null);
const canvasUrogenital = ref<HTMLCanvasElement | null>(null);
const canvasEkstremAtas = ref<HTMLCanvasElement | null>(null);
const canvasEkstremBawah = ref<HTMLCanvasElement | null>(null);
const canvasMuskuloskeletal = ref<HTMLCanvasElement | null>(null);
const canvasPemeriksaanLainya = ref<HTMLCanvasElement | null>(null);

const arrCanvas = ref<any[]>([
  canvasKepala,
  canvasMata,
  canvasTelingaKanan,
  canvasTelingaKiri,
  canvasHidung,
  canvasMulut,
  canvasRonggaMulut,
  // FIXME Belum Ada
  // canvasOHIS,
  canvasTenggorkan,
  canvasLeher,
  canvasLeherDepan,
  canvasDada,
  canvasJantung,
  canvasParu,
  canvasAbdomen,
  canvasAnus,
  canvasUrogenital,
  canvasEkstremAtas,
  canvasEkstremBawah,
  canvasMuskuloskeletal,
  canvasPemeriksaanLainya,
]);
const openFilledCanvas = () => {
  arrCanvas.value.forEach((canvasRef) => {
    if (
      canvasRef.value &&
      rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik[
        (canvasRef.value as any).props?.type.toLowerCase()
      ]
    ) {
      (canvasRef.value as any).open();
    }
  });
};
const closeAllCanvas = () => {
  arrCanvas.value.forEach((canvasRef) => {
    if (canvasRef.value) {
      (canvasRef.value as any).close();
      if (typeof (canvasRef.value as any).close === "function") {
      }
    }
  });
};

const submitAllCanvas = () => {
  let tempObjectData: any = {};
  arrCanvas.value.forEach((canvasRef) => {
    if (canvasRef.value) {
      let data = (canvasRef.value as any).saveCanvas();
      tempObjectData = { ...tempObjectData, ...data };
    }
  });
  return tempObjectData;
};

const onSubmit = async () => {
  try {
    storeUtils.setLoading(true);
    const tempCanvasData = submitAllCanvas();
    const response = await rekamMedisStore.insertAssesment({
      sessionUuid: props.sessionUuid,
      rekamMedisUuid: props.rmUuid,
      isLatest: rekamMedisStore.openedRekamMedis.isLatest,
      key: "pemeriksaan_fisik",
      data: {
        keadaanUmum: keadaanUmum.value,
        ...tempCanvasData,
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

onMounted(() => {
  if (props.selectedPemeriksaanFisik) {
    goToEdit(props.selectedPemeriksaanFisik);
  }
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
const goToEdit = (ref: string) => {
  arrCanvas.value.forEach((canvasRef) => {
    if (canvasRef.value && (canvasRef.value as any).props?.type == ref) {
      (canvasRef.value as any).open();
    }
  });
};

defineExpose({
  open,
  close,
});
</script>

<template>
  <CustomAccordion ref="accordion" headerClass="bg-adameds-50">
    <template #header>{{ header }}</template>
    <template #content>
      <div class="pt-5">
        <div v-if="method == 'form'">
          <div class="font-semibold text-normal">Keadaan Umum</div>
          <div class="flex justify-between pb-5 mb-5 border-b border-grey-200">
            <div class="grid grid-cols-4 grow gap-x-5 mr-[12%]">
              <CustomRadio
                v-model="keadaanUmum"
                value="baik"
                sideLabel="Baik"
              />
              <CustomRadio
                v-model="keadaanUmum"
                value="ringan"
                sideLabel="Ringan"
              />
              <CustomRadio
                v-model="keadaanUmum"
                value="sedang"
                sideLabel="Sedang"
              />
              <CustomRadio
                v-model="keadaanUmum"
                value="buruk"
                sideLabel="Buruk"
              />
            </div>
            <div class="flex">
              <div class="border-l border-adameds-300"></div>
              <CustomButton
                @click="openFilledCanvas()"
                class="my-auto !rounded-md ml-5 mx-[10px]"
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                label="Buka Bagian Yang Sudah Terisi"
                size="small"
                outlined
              />
              <CustomButton
                @click="closeAllCanvas()"
                class="my-auto !rounded-md"
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                label="Tutup Semua"
                size="small"
                outlined
              />
            </div>
          </div>
        </div>
        <div v-else class="py-5 flex flex-col gap-[19px]">
          <CustomInfoRow
            label="Keadaan Umum"
            :value="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik.keadaanUmum"
          />
          <hr class="border-grey-200" />
        </div>

        <CustomCanvasDrawer
          ref="canvasKepala"
          header="Kepala"
          type="Kepala"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Kepala')"
        />
        <CustomCanvasDrawer
          ref="canvasMata"
          header="Mata"
          type="Mata"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Mata')"
        />
        <CustomCanvasDrawer
          ref="canvasTelingaKanan"
          header="Telinga Kanan"
          type="Telinga Kanan"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Telinga Kanan')"
        />
        <CustomCanvasDrawer
          ref="canvasTelingaKiri"
          header="Telinga Kiri"
          type="Telinga Kiri"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Telinga Kiri')"
        />
        <CustomCanvasDrawer
          ref="canvasHidung"
          header="Hidung"
          type="Hidung"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Hidung')"
        />
        <CustomCanvasDrawer
          ref="canvasMulut"
          header="Mulut"
          type="Mulut"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Mulut')"
        />
        <CustomCanvasDrawer
          ref="canvasRonggaMulut"
          header="Rongga Mulut"
          type="Rongga Mulut"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Rongga Mulut')"
        />
        <OhisInput
          ref="canvasOHIS"
          header="Oral Hyhiene Index Simplified (OHI-S)"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
        />
        <CustomCanvasDrawer
          ref="canvasTenggorkan"
          header="Tenggorokan"
          type="Tenggorokan"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Tenggorokan')"
        />
        <CustomCanvasDrawer
          ref="canvasLeher"
          header="Leher"
          type="Leher"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Leher')"
        />
        <CustomCanvasDrawer
          ref="canvasLeherDepan"
          header="Leher Depan"
          type="Leher Depan"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Leher Depan')"
        />
        <CustomCanvasDrawer
          ref="canvasDada"
          header="Dada"
          type="Dada"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Dada')"
        />
        <CustomCanvasDrawer
          ref="canvasJantung"
          header="Jantung"
          type="Jantung"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Jantung')"
        />
        <CustomCanvasDrawer
          ref="canvasParu"
          header="Paru"
          type="Paru"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Paru')"
        />
        <CustomCanvasDrawer
          ref="canvasAbdomen"
          header="Abdomen"
          type="Abdomen"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Abdomen')"
        />
        <CustomCanvasDrawer
          ref="canvasAnus"
          header="Anus"
          type="Anus"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Anus')"
        />
        <CustomCanvasDrawer
          ref="canvasUrogenital"
          header="Urogenital"
          type="Urogenital"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Urogenital')"
        />
        <CustomCanvasDrawer
          ref="canvasEkstremAtas"
          header="Ekstermitas Atas"
          type="Ekstermitas Atas"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Ekstermitas Atas')"
        />
        <CustomCanvasDrawer
          ref="canvasEkstremBawah"
          header="Ekstermitas Bawah"
          type="Ekstermitas Bawah"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Ekstermitas Bawah')"
        />
        <CustomCanvasDrawer
          ref="canvasMuskuloskeletal"
          header="Muskuloskeletal"
          type="Muskuloskeletal"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Muskuloskeletal')"
        />
        <CustomCanvasDrawer
          ref="canvasPemeriksaanLainya"
          header="Pemeriksaan Lainya"
          type="Pemeriksaan Lainya"
          class="mb-[10px]"
          :method="method"
          :openedData="rekamMedisStore.openedRekamMedis.data.pemeriksaanFisik"
          @editAsesmen="emit('editAsesmen', 'Pemeriksaan Lainya')"
        />
      </div>
    </template>
    <template #footer v-if="method == 'form'">
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          label="Reset"
          textColor="text-grey-300"
          borderColor="border-2 border-grey-200"
          outlined
        />
        <CustomButton @click="onSubmit" label="Simpan" />
        <!-- <CustomButton v-if="props.method=='detail'" label="Edit" /> -->
      </div>
    </template>
  </CustomAccordion>
</template>
