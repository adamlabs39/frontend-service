<script setup lang="ts">
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
</script>


<template>
    <CustomAccordion initial-state="0" header-class="bg-adameds-50">
        <template #header>
            Keadaan Waktu Pulang
        </template>
        <template #content>
            <div class="pt-5">
                <CustomSelect label="Kondisi Pasien Pulang" />
            </div>
        </template>
    </CustomAccordion>
</template>