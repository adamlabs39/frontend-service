<script setup lang="ts">

import CardSettingTemplate from "../GreenCard.vue"
import MainHeaderSetting from "../MainHeaderSetting.vue";
import LogoWarna from "./LogoWarna.vue";
import GreenCard from "../GreenCard.vue";
import ProfilFaskesTemplate from "./ProfilFaskesTemplate.vue";




</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Profil Faskes" showButton labelButton="Edit"/>
        <GreenCard cardHeading="Profile">
            <!-- Untuk isinya profil di Profil Faskes -->
            <ProfilFaskesTemplate />
        </GreenCard>
        <CardSettingTemplate class="mb-4" cardHeading="Logo & Warna">
            <LogoWarna/>
        </CardSettingTemplate>
    </div>
</template>
