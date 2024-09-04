<script lang="ts" setup>
import CustomAccordion from '@/components/Base/CustomAccordion.vue';


</script>
<template>
    <CustomAccordion initial-state="0" header-class="bg-adameds-50">
        <template #header>
            Tanda Vital
        </template>
        <template #content>
            <div class="grid grid-cols-4 pt-5">
                <div class="flex flex-col">
                    <div class="font-semibold text-SM">Tekanan Darah</div>
                    <div class="font-normal text-normal">100 / 80 mmHg</div>
                </div>
                <div class="flex flex-col">
                    <div class="font-semibold text-SM underline">Frekuensi Nafas</div>
                    <div class="font-normal text-normal">20 x/mnt</div>
                </div>
                <div class="flex flex-col">
                    <div class="font-semibold text-SM underline">Frekuensi Nadi</div>
                    <div class="font-normal text-normal">80 x/mnt</div>
                </div>
                <div class="flex flex-col">
                    <div class="font-semibold text-SM">Suhu</div>
                    <div class="font-normal text-normal">36°C</div>
                </div>
            </div>
        </template>
    </CustomAccordion>
</template>