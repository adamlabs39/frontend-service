<script setup lang="ts">


import MainHeaderSetting from "../MainHeaderSetting.vue";

import GreenCard from "../GreenCard.vue";
import FormEditProfilFaskes from "./FormEditProfilFaskes.vue";
import FormEditLogoWarna from "./FormEditLogoWarna.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Profil Faskes" showButton labelButton="Edit" />
        <GreenCard cardHeading="Profile" hrEnableCustomClass>
            <!-- Untuk isinya profil di Profil Faskes -->
            <FormEditProfilFaskes />
        </GreenCard>
        <GreenCard class="" cardHeading="Logo & Warna" hrEnableCustomClass>
            <FormEditLogoWarna />
        </GreenCard>

        <hr class="border-[#D9DCE1] border-1 mt-5" />
        <div class="flex items-end justify-end gap-3 p-5">
            <CustomButton  label="Batal" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent" borderColor="border-2 border-[#9DA4B1]" />
            <CustomButton  label="Simpan"/>
        </div>
    </div>
</template>
