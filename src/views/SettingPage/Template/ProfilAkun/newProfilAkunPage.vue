<script setup lang="ts">
import { ref } from 'vue';

const isEditNamaFoto = ref(false);
const isEditUsernamePassword = ref(false);

const editNamaFoto = () => {
    isEditNamaFoto.value = !isEditNamaFoto.value;
};

const editUsernamePassword = () => {
    isEditUsernamePassword.value = !isEditUsernamePassword.value;
};

const profileResponse = ref({});
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
                <EditNamaFoto />
            </template>

            <template v-if="!isEditUsernamePassword">
                <ProfileSetting :profileResponse="profileResponse" :editHandler="editUsernamePassword" />
            </template>
            <template v-else>
                <EditUsernamePassword />
            </template>
        </template>
    </Card>
</template>