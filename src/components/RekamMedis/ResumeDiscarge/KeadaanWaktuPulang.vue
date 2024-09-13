<script setup lang="ts">
import { ref } from 'vue';
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
const kondisiPasien=ref()
const itemsKondisi = ref([
  { name: "Stabil"},
  { name: "Tidak Stabil"},
  { name: "Perbaikian" },
]);
</script>



<template>
    <CustomAccordion initial-state="0" header-class="bg-adameds-50">
        <template #header>
            Keadaan Waktu Pulang
        </template>
        <template #content>
            <div class="grid grid-cols-12 gap-5 pt-5">
                <div class="flex flex-col col-span-3">
                    <div class="font-semibold text-SM">Tekanan Darah</div>
                    <div class="font-normal text-normal">100 / 80 mmHg</div>
                </div>
                <div class="flex flex-col col-span-3">
                    <div class="font-semibold underline text-SM">Frekuensi Nafas</div>
                    <div class="font-normal text-normal">20 x/mnt</div>
                </div>
                <div class="flex flex-col col-span-3">
                    <div class="font-semibold underline text-SM">Frekuensi Nadi</div>
                    <div class="font-normal text-normal">80 x/mnt</div>
                </div>
                <div class="flex flex-col col-span-3">
                    <div class="font-semibold text-SM">Suhu</div>
                    <div class="font-normal text-normal">36°C</div>
                </div>
                <CustomSelect v-model="kondisiPasien" class="col-span-12" :options="itemsKondisi" option-label="name" option-value="name" label="Kondisi Pasien Saat Pulang" place-holder="Pilih Kondisi Pasien Saat Pulang" />

            </div>

        </template>
    </CustomAccordion>
</template>