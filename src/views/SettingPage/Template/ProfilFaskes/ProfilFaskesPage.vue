<script setup lang="ts">

import CardSettingTemplate from "../GreenCard.vue"
import MainHeaderSetting from "../MainHeaderSetting.vue";
import LogoWarna from "./LogoWarna.vue";
import GreenCard from "../GreenCard.vue";
import ProfilFaskesTemplate from "./ProfilFaskesTemplate.vue";
import { useRouter } from "vue-router";


const router = useRouter();
const editProfilFaskes = () => {
    router.push({ name: "setting-profil-faskes-edit" });
};

</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Profil Faskes" showButton labelButton="Edit"
            :buttonClickHandler="editProfilFaskes" />
        <GreenCard cardHeading="Profile">
            <!-- Untuk isinya profil di Profil Faskes -->
            <ProfilFaskesTemplate />
        </GreenCard>
        <GreenCard class="mb-4" cardHeading="Logo & Warna">
            <LogoWarna />
        </GreenCard>

    </div>
</template>
