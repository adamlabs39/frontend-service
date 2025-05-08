<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";

const tandaVital = ref({
  tekananDarah: "",
  frekuensiNafas: "",
  frekuensiNadi: "",
  suhu: "",
});

onMounted(() => {
  tandaVital.value = {
    tekananDarah: "100/80",
    frekuensiNafas: "20",
    frekuensiNadi: "80",
    suhu: "36",
  };
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
});
</script>

<template>
  <CustomAccordion
    initial-state="0"
    header-class="bg-adameds-50"
    ref="accordion"
  >
    <template #header> Tanda Vital Ketika Masuk </template>
    <template #content>
      <div class="grid grid-cols-4 gap-4 pt-5">
        <div class="flex flex-col">
          <div class="text-sm font-semibold">Tekanan Darah</div>
          <div class="font-normal text-normal">
            {{ tandaVital.tekananDarah }} mmHg
          </div>
        </div>
        <div class="flex flex-col">
          <div class="text-sm font-semibold underline">Frekuensi Nafas</div>
          <div class="font-normal text-normal">
            {{ tandaVital.frekuensiNafas }} x/mnt
          </div>
        </div>
        <div class="flex flex-col">
          <div class="text-sm font-semibold underline">Frekuensi Nadi</div>
          <div class="font-normal text-normal">
            {{ tandaVital.frekuensiNadi }} x/mnt
          </div>
        </div>
        <div class="flex flex-col">
          <div class="text-sm font-semibold">Suhu</div>
          <div class="font-normal text-normal">{{ tandaVital.suhu }} °C</div>
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
