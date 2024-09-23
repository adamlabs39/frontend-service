<script setup lang="ts">
import { ref } from 'vue';
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';
const optionsEdukasi = ref([
  { label: "Proses penyakit, diagnosis, dan rencana asuhan", value: "84635008" },
  { label: "Obat-obatan", value:"967006" },
  { label: "Rehabilitasi medis", value: "410082002" },
  { label: "Manajemen nyeri", value: "712651001" },
  { label: "Gizi", value: "61310001" },
  { label: "Cuci tangan", value: "698608004" },
  { label: "Penggunaan alat medis", value: "362978005" },
]);
const edukasi=ref()
const keterangan=ref()
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
    <CustomAccordion initial-state="0" header-class="bg-adameds-50" ref="accordion">
        <template #header>
            Edukasi
        </template>
        <template #content>
            <div class="grid grid-cols-2 gap-[30px] pt-5">
                <CustomSelect v-model="edukasi" :options="optionsEdukasi" option-label="label" option-value="value" label="Edukasi Berkenan Dengan Kondisi Pasien" place-holder="Pilih Edukasi"/>
                <CustomTextfield v-model="keterangan" label="Keterangan" placeholder="Keterangan"/>
            </div>
        </template>
    </CustomAccordion>
</template>