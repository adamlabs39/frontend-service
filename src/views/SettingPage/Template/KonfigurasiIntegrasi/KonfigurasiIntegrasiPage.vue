<script setup lang="ts">
import MainHeaderSetting from '../MainHeaderSetting.vue';
import KonfigurasiVCLAIM from './KonfigurasiVCLAIM.vue';
import KonfigurasiLainnya from './KonfigurasiLainnya.vue';
import GreenCard from '../GreenCard.vue';
import { ref } from 'vue';
import FormEditKonfigurasiVCLAIM from './FormEditKonfigurasiVCLAIM.vue';
import FormEditKonfigurasiLainnya from './FormEditKonfigurasiLainnya.vue';
import CustomButton from '@/components/Base/CustomButton.vue';

const isEditKonfigurasiVCLAIM = ref(false);
const isEditKonfigurasiLainnya = ref(false);




const editKonfigurasiVCLAIM = () => {
    console.log("NININI")
    isEditKonfigurasiVCLAIM.value = !isEditKonfigurasiVCLAIM.value;
};

const editKonfigurasiLainnya = () => {
    console.log("NININI")
    isEditKonfigurasiLainnya.value = !isEditKonfigurasiLainnya.value;
};
</script>

<template>

    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto">
        <template #header>
            <MainHeaderSetting heading="Konfigurasi Integrasi" />
        </template>
        <template #content>
            <template v-if="!isEditKonfigurasiVCLAIM">
                <GreenCard cardHeading="Konfigurasi VCLAIM" hrEnableCustomClass showButton labelButton="Edit"
                    :buttonClickHandler="editKonfigurasiVCLAIM">
                    <KonfigurasiVCLAIM />
                </GreenCard>
            </template>

            <template v-else-if="isEditKonfigurasiVCLAIM">
                <GreenCard cardHeading="Konfigurasi VCLAIM" hr-enable-custom-class showButton labelButton="Batal Edit"
                    outlined borderColor="border-adameds-300" textColor="text-adameds-300"
                    :buttonClickHandler="editKonfigurasiVCLAIM">
                    <FormEditKonfigurasiVCLAIM />
                </GreenCard>
            </template>

            <!--  -->
            <template v-if="!isEditKonfigurasiLainnya">
                <GreenCard cardHeading="Konfigurasi Lainnya" hrEnableCustomClass showButton labelButton="Edit"
                    :buttonClickHandler="editKonfigurasiLainnya">
                    <KonfigurasiLainnya />
                </GreenCard>
            </template>

            <template v-else-if="isEditKonfigurasiLainnya">
                <GreenCard cardHeading="Konfigurasi Lainnya" hr-enable-custom-class
                        showButton labelButton="Batal Edit" outlined borderColor="border-adameds-300"
                        textColor="text-adameds-300" :buttonClickHandler="editKonfigurasiLainnya">
                    <FormEditKonfigurasiLainnya  />
                </GreenCard>
            </template>
        </template>
    </Card>




</template>
