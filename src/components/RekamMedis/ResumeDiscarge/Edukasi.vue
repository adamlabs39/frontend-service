<script setup lang="ts">
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';
</script>

<template>
    <CustomAccordion initial-state="0" header-class="bg-adameds-50">
        <template #header>
            Edukasi
        </template>
        <template #content>
            <div class="grid grid-cols-2 gap-[30px] pt-5">
                <CustomSelect label="Edukasi Berkenan Dengan Kondisi Pasien" place-holder="Pilih Edukasi"/>
                <CustomTextfield label="Keterangan" placeholder="Keterangan"/>
            </div>
        </template>
    </CustomAccordion>
</template>