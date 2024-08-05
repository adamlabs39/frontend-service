<script setup lang="ts">


import MainHeaderSetting from "../MainHeaderSetting.vue";

import GreenCard from "../GreenCard.vue";
import FormEditProfilFaskes from "./FormEditProfilFaskes.vue";
import FormEditLogoWarna from "./FormEditLogoWarna.vue";

</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Profil Faskes" showButton labelButton="Edit"/>
        <GreenCard cardHeading="Profile" hrEnableCustomClass>
            <!-- Untuk isinya profil di Profil Faskes -->
            <FormEditProfilFaskes/>
        </GreenCard>
        <GreenCard class="mb-4" cardHeading="Logo & Warna" hrEnableCustomClass>
            <FormEditLogoWarna/>
        </GreenCard>
    </div>
</template>
