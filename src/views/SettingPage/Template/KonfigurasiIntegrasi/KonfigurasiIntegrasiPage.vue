<script setup lang="ts">
import MainHeaderSetting from '../MainHeaderSetting.vue';
import KonfigurasiVCLAIM from './KonfigurasiVCLAIM.vue';
import KonfigurasiLainnya from './KonfigurasiLainnya.vue';
import GreenCard from '../GreenCard.vue';

</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Konfigurasi Internal"/>
        <GreenCard cardHeading="Konfigurasi VCLAIM" hrEnableCustomClass showButton labelButton="Edit">
            <KonfigurasiVCLAIM/>
        </GreenCard>
        <GreenCard cardHeading="Konfigurasi Lainnya" hrEnableCustomClass showButton labelButton="Edit" showChip class="mb-4">
            <KonfigurasiLainnya/>
        </GreenCard>
    </div>
</template>