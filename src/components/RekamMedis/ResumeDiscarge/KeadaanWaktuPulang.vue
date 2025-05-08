<script setup lang="ts">
import { ref, onMounted } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
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

const optionsKondisiPasien = ref([
  { label: "Stabil", value: "359746009" },
  { label: "Tidak Stabil", value: "162668006" },
  { label: "Perbaikian", value: "268910001" },
]);

const modelValue = defineModel<string>("modelValue", {
  default: () => "",
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
    <template #header> Keadaan Waktu Pulang </template>
    <template #content>
      <div class="grid grid-cols-12 gap-5 pt-5">
        <div class="flex flex-col col-span-3">
          <div class="font-semibold text-SM">Tekanan Darah</div>
          <div class="font-normal text-normal">
            {{ tandaVital.tekananDarah }} mmHg
          </div>
        </div>
        <div class="flex flex-col col-span-3">
          <div class="font-semibold underline text-SM">Frekuensi Nafas</div>
          <div class="font-normal text-normal">
            {{ tandaVital.frekuensiNafas }} x/mnt
          </div>
        </div>
        <div class="flex flex-col col-span-3">
          <div class="font-semibold underline text-SM">Frekuensi Nadi</div>
          <div class="font-normal text-normal">
            {{ tandaVital.frekuensiNadi }} x/mnt
          </div>
        </div>
        <div class="flex flex-col col-span-3">
          <div class="font-semibold text-SM">Suhu</div>
          <div class="font-normal text-normal">{{ tandaVital.suhu }} °C</div>
        </div>
        <CustomSelect
          v-model="modelValue"
          :options="optionsKondisiPasien"
          option-label="label"
          option-value="value"
          class="col-span-12"
          label="Kondisi Pasien Saat Pulang"
          place-holder="Pilih Kondisi Pasien Saat Pulang"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
