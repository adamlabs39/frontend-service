<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomCanvasDrawer from "../PemeriksaanFisik/CustomCanvasDrawer.vue";
import SkriningMata from "./SkriningMata.vue";
import TemuanLainnya from "./TemuanLainnya.vue";

const props = defineProps({
  header: {
    type: String,
    default: "Pemeriksaan Mata",
  },
  method: {
    type: String,
    default: "form",
  },
});
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>{{ header }}</template>
    <template #content>
      <div class="pt-5">
        <div class="flex justify-end mb-5">
          <div class="flex">
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
              @click="() => {}"
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
        />
        <CustomCanvasDrawer
          ref="canvasAnterior"
          header="Anterior"
          type="Anterior"
          class="mb-[10px]"
        />
        <CustomCanvasDrawer
          ref="canvasPosterior"
          header="Posterior"
          type="Posterior"
          class="mb-[10px]"
        />
        <SkriningMata ref="skriningMata" class="mb-[10px]" />
        <TemuanLainnya ref="temuanLainnya" class="mb-[10px]" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          label="Reset"
          textColor="text-grey-300"
          borderColor="border-2 border-grey-200"
          outlined
        />
        <CustomButton label="Simpan" />
        <!-- <CustomButton v-if="props.method=='detail'" label="Edit" /> -->
      </div>
    </template>
  </CustomAccordion>
</template>
