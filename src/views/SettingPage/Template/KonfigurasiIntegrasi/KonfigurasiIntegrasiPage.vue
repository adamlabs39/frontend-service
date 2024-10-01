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
import { utilsStore } from "@/stores/utils";

const useUtilsStore = utilsStore();

const konfigurasiIntegrasiResponse = ref({
    baseUrl: "",
    userKey: "",
    consId: "",
    secretKey: "",
    PPK: "",
    apiKeyPost: "",
    method: "",
    endpoint: "",
    header: "",
    request: "",
    response: "",
    status: "",
    clientSecret: "",
    organizationId: "",
    clientId: "",
    statusSatuSehat: ""
})

const settingStore = useSettingStore();
const fetchKonfigurasiIntegrasiData = async () => {
    useUtilsStore.setLoading(true);
    try {
        const response = await settingStore.getKonfigurasiIntegrasiApi();
        if (response && response.payload) {
            konfigurasiIntegrasiResponse.value = response.payload
            useUtilsStore.setLoading(false)
            // console.log(konfigurasiIntegrasiResponse.value)
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
    console.log("NININI")
    isEditKonfigurasiSatuSehat.value = !isEditKonfigurasiSatuSehat.value
}


// Setelah Edit 
const handleKonfigurasiVCLAIM = (updatedKonfigurasiVCLAIM: any) => {
    konfigurasiIntegrasiResponse.value = updatedKonfigurasiVCLAIM;
    fetchKonfigurasiIntegrasiData();
};
const handleKonfigurasiLainnya = (updatedKonfigurasiLainnya: any) => {
    konfigurasiIntegrasiResponse.value = updatedKonfigurasiLainnya;
    fetchKonfigurasiIntegrasiData();
};
const handleKonfigurasiSatuSehat = (updatedKonfigurasiSatuSehat: any) => {
    konfigurasiIntegrasiResponse.value = updatedKonfigurasiSatuSehat;
    fetchKonfigurasiIntegrasiData()
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
                <FormEditKonfigurasiVCLAIM :isEditKonfigurasiVCLAIM="isEditKonfigurasiVCLAIM" :konfigurasi-integrasi-response="konfigurasiIntegrasiResponse"  @update:isEditKonfigurasiVCLAIM="isEditKonfigurasiVCLAIM = $event" @update:after-edit-konfigurasi-v-c-l-a-i-m="handleKonfigurasiVCLAIM"/>
            </template>

            <template v-if="!isEditKonfigurasiSatuSehat">
                    <KonfigurasiSatuSehat :edit-handler="editKonfigurasiSatuSehat" :konfigurasi-integrasi-response="konfigurasiIntegrasiResponse" />
            </template>
            <template v-else>
                    <FormEditKonfigurasiSatuSehat :is-edit-konfigurasi-satu-sehat="isEditKonfigurasiSatuSehat" :konfigurasi-integrasi-response="konfigurasiIntegrasiResponse" @update:is-edit-konfigurasi-satu-sehat="isEditKonfigurasiSatuSehat = $event" @update:after-edit-konfigurasi-satu-sehat="handleKonfigurasiSatuSehat" />
            </template>

            <!--  -->
            <template v-if="!isEditKonfigurasiLainnya">
                    <KonfigurasiLainnya :edit-handler="editKonfigurasiLainnya" :konfigurasi-integrasi-response="konfigurasiIntegrasiResponse"/>
            </template>
            <template v-else>
                    <FormEditKonfigurasiLainnya :is-edit-konfigurasi-lainnya="isEditKonfigurasiLainnya" :konfigurasi-integrasi-response="konfigurasiIntegrasiResponse" @update:is-edit-konfigurasi-lainnya="isEditKonfigurasiLainnya = $event" @update:after-edit-konfigurasi-lainnya="handleKonfigurasiLainnya"/>
            </template>
        </template>
    </Card>




</template>
