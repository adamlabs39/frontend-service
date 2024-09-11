<script setup lang="ts">
import { ref } from "vue";

import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomCanvasDrawer from "./CustomCanvasDrawer.vue";

const keadaanUmum = ref('baik');

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

const closeAllCanvas = () => {
  // Daftar semua ref canvas
  const canvases = [
    canvasKepala,
    canvasMata,
    canvasTelingaKanan,
    canvasTelingaKiri,
    canvasHidung,
    canvasMulut,
    canvasRonggaMulut,
    canvasOHIS,
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
  ];

  canvases.forEach((canvasRef) => {
    if (canvasRef.value) {
      (canvasRef.value as any).close();
      if (typeof (canvasRef.value as any).close === "function") {
      }
    }
  });
};
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>Pemeriksaan Fisik</template>
    <template #content>
      <div class="pt-5">
        <div class="font-semibold text-normal">Keadaan Umum</div>
        <div class="flex justify-between pb-5 mb-5 border-b border-grey-200">
          <div class="grid grid-cols-4 grow gap-x-5 mr-[12%]">
            <CustomRadio v-model="keadaanUmum" value="baik" sideLabel="Baik" />
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
              @click="() => {}"
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

        <CustomCanvasDrawer
          ref="canvasKepala"
          header="Kepala"
          type="Kepala"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasMata"
          header="Mata"
          type="Mata"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasTelingaKanan"
          header="Telinga Kanan"
          type="Telinga Kanan"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasTelingaKiri"
          header="Telinga Kiri"
          type="Telinga Kiri"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasHidung"
          header="Hidung"
          type="Hidung"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasMulut"
          header="Mulut"
          type="Mulut"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasRonggaMulut"
          header="Rongga Mulut"
          type="Rongga Mulut"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasOHIS"
          header="Oral Hyhiene Index Simplified (OHI-S)"
          type="Oral Hyhiene Index Simplified (OHI-S)"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasTenggorkan"
          header="Tenggorokan"
          type="Tenggorokan"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasLeher"
          header="Leher"
          type="Leher"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasLeherDepan"
          header="Leher Depan"
          type="Leher Depan"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasDada"
          header="Dada"
          type="Dada"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasJantung"
          header="Jantung"
          type="Jantung"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasParu"
          header="Paru"
          type="Paru"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasAbdomen"
          header="Abdomen"
          type="Abdomen"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasAnus"
          header="Anus"
          type="Anus"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasUrogenital"
          header="Urogenital"
          type="Urogenital"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasEkstremAtas"
          header="Ekstermitas Atas"
          type="Ekstermitas Atas"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasEkstremBawah"
          header="Ekstermitas Bawah"
          type="Ekstermitas Bawah"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasMuskuloskeletal"
          header="Muskuloskeletal"
          type="Muskuloskeletal"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasPemeriksaanLainya"
          header="Pemeriksaan Lainya"
          type="Pemeriksaan Lainya"
          class="mb-[10px]"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton label="Simpan" />
        <!-- <CustomButton v-if="props.method=='detail'" label="Edit" /> -->
      </div>
    </template>
  </CustomAccordion>
</template>
