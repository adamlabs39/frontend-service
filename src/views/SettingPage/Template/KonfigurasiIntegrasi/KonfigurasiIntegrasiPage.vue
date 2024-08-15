<script setup lang="ts">
import MainHeaderSetting from '../MainHeaderSetting.vue';
import KonfigurasiVCLAIM from './KonfigurasiVCLAIM.vue';
import KonfigurasiLainnya from './KonfigurasiLainnya.vue';
import GreenCard from '../GreenCard.vue';
import { ref } from 'vue';
import FormEditKonfigurasiVCLAIM from './FormEditKonfigurasiVCLAIM.vue';
import FormEditKonfigurasiLainnya from './FormEditKonfigurasiLainnya.vue';
import CustomButton from '@/components/Base/CustomButton.vue';

const isEditKonfigurasiIntegrasi = ref(false);


const editKonfigurasiIntegrasi = () => {
    console.log("NININI")
    isEditKonfigurasiIntegrasi.value = !isEditKonfigurasiIntegrasi.value;
};
</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Konfigurasi Integrasi" />


        <template v-if="!isEditKonfigurasiIntegrasi">
            <GreenCard cardHeading="Konfigurasi VCLAIM" hrEnableCustomClass showButton labelButton="Edit"
                :buttonClickHandler="editKonfigurasiIntegrasi">
                <KonfigurasiVCLAIM />
            </GreenCard>

            <GreenCard cardHeading="Konfigurasi Lainnya" hrEnableCustomClass showButton labelButton="Edit"
                :buttonClickHandler="editKonfigurasiIntegrasi" class="mb-4">
                <KonfigurasiLainnya />
            </GreenCard>
        </template>

        <template v-else>


            <GreenCard cardHeading="Konfigurasi VCLAIM">
                <FormEditKonfigurasiVCLAIM :buttonClickHandler="editKonfigurasiIntegrasi"/>
            </GreenCard>

            <GreenCard cardHeading="Konfigurasi Lainnya" class="mb-4">
                <FormEditKonfigurasiLainnya :buttonClickHandler="editKonfigurasiIntegrasi" />
            </GreenCard>
        </template>
    </div>
</template>
