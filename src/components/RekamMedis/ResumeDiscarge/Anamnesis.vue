<script setup lang="ts">
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';
</script>


<template>
    <CustomAccordion initial-state="0" header-class="bg-adameds-50">
        <template #header>
            Ringkasan Riwayat Penyakit / Anamnesis
        </template>
        <template #content>
            <div class="pt-5">
                <CustomTextfield label="Ringkasan Riwayat Penyakit / Anamnesis" />
            </div>
        </template>
    </CustomAccordion>
</template>