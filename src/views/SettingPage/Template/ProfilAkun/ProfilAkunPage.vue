<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MainHeaderSetting from "../MainHeaderSetting.vue";
import GreenCard from "../GreenCard.vue";
import NamaFoto from "./NamaFoto.vue";
import EditNamaFoto from "./EditNamaFoto.vue"; // Pastikan import ini ada
import { useSettingStore } from '@/stores/setting';
import UsernamePassword from './UsernamePassword.vue';
import EditUsernamePassword from './EditUsernamePassword.vue';

const profileResponse = ref({
    name: '',
    email: '',
    phone: '',
    photo: '',
    role: {
        name: ''
    },
    username: '',
    password: '',
    inventoryMedis: '',
    inventoryNonMedis: '',
    awalanGelar: '',
    akhiranGelar: '',
});

const settingStore = useSettingStore();

const fetchSettingData = async () => {
    try {
        const response = await settingStore.getApi();
        if (response && response.payload) {
            profileResponse.value = response.payload;
        } else {
            console.error("Unexpected response Structure", response);
        }
    } catch (error) {
        console.error("Failed to fetch data", error);
    }
};

onMounted(() => {
    fetchSettingData();
});


// Setelah Edit Data
const handleProfileUpdate = (updatedProfile: any) => {
    profileResponse.value = updatedProfile;
    fetchSettingData();
};

const isEditNamaFoto = ref(false);
const isEditUsernamePassword = ref(false);

const editNamaFoto = () => {
    isEditNamaFoto.value = !isEditNamaFoto.value;
};

const editUsernamePassword = () => {
    isEditUsernamePassword.value = !isEditUsernamePassword.value;
};
</script>

<template>
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto">
        <template #header>
            <MainHeaderSetting heading="Profil Saya" />
        </template>
        <template #content>
            <template v-if="!isEditNamaFoto">
                <NamaFoto :profileResponse="profileResponse" :editHandler="editNamaFoto" />
            </template>
            <template v-else>
                <EditNamaFoto :profileResponse="profileResponse" :isEditNamaFoto="isEditNamaFoto"
                    @update:isEditNamaFoto="isEditNamaFoto = $event" @update:afterEditNamaFoto="handleProfileUpdate" />
            </template>


            <template v-if="!isEditUsernamePassword">
                <UsernamePassword :profileResponse="profileResponse" :editHandler="editUsernamePassword" />
            </template>
            <template v-else>
                <EditUsernamePassword :profileResponse="profileResponse" :isEditUsernamePassword="isEditUsernamePassword" @update:isEditUsernamePassword="isEditUsernamePassword = $event" @update:afterEditUsernamePassword="handleProfileUpdate"/>
            </template>

            <GreenCard cardHeading="Hak Akses Verifikator" hrEnableCustomClass class="mb-4">
                <div class="grid grid-cols-2 gap-3">
                    <div class="mb-4">
                        <div class="text-sm underline">
                            Verifikator Usulan Pengadaan Barang Medis
                        </div>
                        <div class="font-bold text-heading">{{ profileResponse.inventoryMedis ? 'Penanggung Jawab' : '-'
                            }}</div>
                    </div>
                    <div class="mb-4">
                        <div class="text-sm underline">
                            Verifikator Usulan Pengadaan Barang Non-Medis
                        </div>
                        <div class="font-bold text-heading">{{ profileResponse.inventoryNonMedis ? 'Penanggung Jawab' :
                            '-' }}</div>
                    </div>
                </div>
            </GreenCard>

        </template>
    </Card>
</template>
