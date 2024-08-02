<script setup lang="ts">
import HeaderSetting from "./HeaderSetting.vue";
import CardSettingTemplate from "./Template/CardSettingTemplate.vue";
import FaskesDetailTemplate from './Template/FaskesDetailTemplate.vue'
</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <HeaderSetting heading="Profil Faskes" showButton labelButton="Edit"/>
        <CardSettingTemplate class="">
            <!-- Untuk isinya profil di Profil Faskes -->
            <FaskesDetailTemplate />
        </CardSettingTemplate>
        <CardSettingTemplate>
            <!-- Logo dan Warna -->
        </CardSettingTemplate>
    </div>
</template>
