<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CustomAccordion from '@/components/Base/CustomAccordion.vue';

const tandaVital = ref({
  tekananDarah: '',
  frekuensiNafas: '',
  frekuensiNadi: '',
  suhu: ''
});

onMounted(() => {
  tandaVital.value = {
    tekananDarah: "100/80",
    frekuensiNafas: "20",
    frekuensiNadi: "80",
    suhu: "36"
  };
});
</script>

<template>
    <CustomAccordion initial-state="0" header-class="bg-adameds-50">
        <template #header>
            Tanda Vital
        </template>
        <template #content>
            <div class="grid grid-cols-4 pt-5 gap-4">
                <div class="flex flex-col">
                    <div class="font-semibold text-sm">Tekanan Darah</div>
                    <div class="font-normal text-normal">{{ tandaVital.tekananDarah }} mmHg</div>
                </div>
                <div class="flex flex-col">
                    <div class="font-semibold text-sm underline">Frekuensi Nafas</div>
                    <div class="font-normal text-normal">{{ tandaVital.frekuensiNafas }} x/mnt</div>
                </div>
                <div class="flex flex-col">
                    <div class="font-semibold text-sm underline">Frekuensi Nadi</div>
                    <div class="font-normal text-normal">{{ tandaVital.frekuensiNadi }} x/mnt</div>
                </div>
                <div class="flex flex-col">
                    <div class="font-semibold text-sm">Suhu</div>
                    <div class="font-normal text-normal">{{ tandaVital.suhu }} °C</div>
                </div>
            </div>
        </template>
    </CustomAccordion>
</template>
