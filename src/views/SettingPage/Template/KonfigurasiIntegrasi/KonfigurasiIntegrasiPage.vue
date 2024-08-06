<script setup lang="ts">
import MainHeaderSetting from '../MainHeaderSetting.vue';
import KonfigurasiVCLAIM from './KonfigurasiVCLAIM.vue';
import KonfigurasiLainnya from './KonfigurasiLainnya.vue';
import GreenCard from '../GreenCard.vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const editKonfigurasiIntegrasi = () => {
    router.push({ name: "setting-konfigurasi-integrasi-edit" });
};
</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Konfigurasi Internal"/>
        <GreenCard cardHeading="Konfigurasi VCLAIM" hrEnableCustomClass showButton labelButton="Edit" :buttonClickHandler="editKonfigurasiIntegrasi">
            <KonfigurasiVCLAIM/>
        </GreenCard>
        <GreenCard cardHeading="Konfigurasi Lainnya" hrEnableCustomClass showButton labelButton="Edit" showChip class="mb-4" :buttonClickHandler="editKonfigurasiIntegrasi">
            <KonfigurasiLainnya/>
        </GreenCard>
    </div>
</template>