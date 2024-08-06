<script setup lang="ts">
import GreenCard from '../GreenCard.vue';
import MainHeaderSetting from '../MainHeaderSetting.vue';
import LogoWarna from '../ProfilFaskes/LogoWarna.vue';
import ProfilFaskesTemplate from '../ProfilFaskes/ProfilFaskesTemplate.vue';


</script>

<template>
     <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Permission Menu" showButton labelButton="Menu" iconButton="PhPlus"/>
        <GreenCard class="mb-4" cardHeading="Logo & Warna">
            <LogoWarna />
        </GreenCard>

    </div>
</template>


<style lang="scss" scoped>

</style>