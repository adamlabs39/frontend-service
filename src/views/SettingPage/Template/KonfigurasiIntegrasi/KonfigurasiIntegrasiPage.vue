<script setup lang="ts">
import MainHeaderSetting from '../MainHeaderSetting.vue';
import KonfigurasiLainnya from './KonfigurasiLainnya.vue';
import GreenCard from '../GreenCard.vue';
import { onMounted, ref } from 'vue';
import FormEditKonfigurasiVCLAIM from './FormEditKonfigurasiVCLAIM.vue';
import FormEditKonfigurasiLainnya from './FormEditKonfigurasiLainnya.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import KonfigurasiSatuSehat from './KonfigurasiSatuSehat.vue';
import FormEditKonfigurasiSatuSehat from './FormEditKonfigurasiSatuSehat.vue';
import KonfigurasiVCLAIM from './KonfigurasiVCLAIM.vue';
import { useSettingStore } from '@/stores/setting';

const konfigurasiIntegrasiResponse = ref({
    baseUrl: "",
    userKey: "",
    consId: "",
    secretKey: "",
    PPK: ""
})

const settingStore = useSettingStore();
const fetchKonfigurasiIntegrasiData = async () => {
    try {
        const response = await settingStore.getKonfigurasiIntegrasiApi();
        if (response && response.payload) {
            konfigurasiIntegrasiResponse.value = response.payload
        } else {
            console.error("Unexpected response Structure", response);
        }
    } catch (error) {
        console.error("Failed to fetch data", error);
    }

}

onMounted(() => {
    fetchKonfigurasiIntegrasiData();
    console.log(konfigurasiIntegrasiResponse.value)
})
const isEditKonfigurasiVCLAIM = ref(false);
const isEditKonfigurasiLainnya = ref(false);
const isEditKonfigurasiSatuSehat = ref(false);




const editKonfigurasiVCLAIM = () => {
    console.log("NININI")
    isEditKonfigurasiVCLAIM.value = !isEditKonfigurasiVCLAIM.value;
};

const editKonfigurasiLainnya = () => {
    console.log("NININI")
    isEditKonfigurasiLainnya.value = !isEditKonfigurasiLainnya.value;
};

const editKonfigurasiSatuSehat = () => {
    isEditKonfigurasiSatuSehat.value = !isEditKonfigurasiSatuSehat.value
}
</script>

<template>

    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto">
        <template #header>
            <MainHeaderSetting heading="Konfigurasi Integrasi" />
        </template>
        <template #content>
            <template v-if="!isEditKonfigurasiVCLAIM">
                <KonfigurasiVCLAIM :editHandler="editKonfigurasiVCLAIM"
                    :konfigurasi-integrasi-response="konfigurasiIntegrasiResponse" />
            </template>
            <template v-else>
                <GreenCard cardHeading="Konfigurasi VCLAIM" hr-enable-custom-class showButton labelButton="Batal Edit"
                    outlined borderColor="border-adameds-300" textColor="text-adameds-300"
                    :buttonClickHandler="editKonfigurasiVCLAIM">
                    <FormEditKonfigurasiVCLAIM />
                </GreenCard>
            </template>

            <template v-if="!isEditKonfigurasiSatuSehat">

                <GreenCard cardHeading="Konfigurasi SATUSEHAT" hrEnableCustomClass showButton labelButton="Edit"
                    :buttonClickHandler="editKonfigurasiSatuSehat">
                    <KonfigurasiSatuSehat />
                </GreenCard>
            </template>
            <template v-else>
                <GreenCard cardHeading="Konfigurasi SATUSEHAT" hrEnableCustomClass showButton labelButton="Batal Edit"
                    outlined borderColor="border-adameds-300" textColor="text-adameds-300"
                    :buttonClickHandler="editKonfigurasiSatuSehat">
                    <FormEditKonfigurasiSatuSehat />
                </GreenCard>
            </template>

            <!--  -->
            <template v-if="!isEditKonfigurasiLainnya">
                <GreenCard cardHeading="Konfigurasi Lainnya" hrEnableCustomClass showButton labelButton="Edit"
                    :buttonClickHandler="editKonfigurasiLainnya">
                    <KonfigurasiLainnya />
                </GreenCard>
            </template>
            <template v-else>
                <GreenCard cardHeading="Konfigurasi Lainnya" hr-enable-custom-class showButton labelButton="Batal Edit"
                    outlined borderColor="border-adameds-300" textColor="text-adameds-300"
                    :buttonClickHandler="editKonfigurasiLainnya">
                    <FormEditKonfigurasiLainnya />
                </GreenCard>
            </template>


        </template>
    </Card>




</template>
