<script setup lang="ts">
import CardSettingTemplate from "./Template/CardSettingTemplate.vue";
import ProfilFaskesTemplate from "./Template/KonfigurasiIntegrasi/KonfigurasiVCLAIM.vue";
import MainHeaderSetting from "./Template/MainHeaderSetting.vue";
import LogoWarna from "./Template/ProfilFaskes/LogoWarna.vue";




</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Profil Faskes" showButton labelButton="Edit"/>
        <CardSettingTemplate cardHeading="Profile">
            <!-- Untuk isinya profil di Profil Faskes -->
            <ProfilFaskesTemplate />
        </CardSettingTemplate>
        <CardSettingTemplate class="mb-4" cardHeading="Logo & Warna">
            <LogoWarna/>
        </CardSettingTemplate>
    </div>
</template>
