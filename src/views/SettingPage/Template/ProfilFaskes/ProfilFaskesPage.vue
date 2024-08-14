<script setup lang="ts">
import { ref } from "vue";
import CardSettingTemplate from "../GreenCard.vue"
import MainHeaderSetting from "../MainHeaderSetting.vue";
import LogoWarna from "./LogoWarna.vue";
import GreenCard from "../GreenCard.vue";
import ProfilFaskesTemplate from "./ProfilFaskesTemplate.vue";
import FormEditProfilFaskes from "./FormEditProfilFaskes.vue";
import FormEditLogoWarna from "./FormEditLogoWarna.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const isEditProfilFaskes = ref(false);

const editProfilFaskes = () => {
    isEditProfilFaskes.value = !isEditProfilFaskes.value;  
};
</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting 
            heading="Profil Faskes" 
            v-if="!isEditProfilFaskes" 
            showButton 
            labelButton="Edit"
            :buttonClickHandler="editProfilFaskes" 
        />
        <MainHeaderSetting 
            heading="Profil Faskes" 
            v-else 
        />

        <template v-if="!isEditProfilFaskes">
            <GreenCard cardHeading="Profile">
                <ProfilFaskesTemplate />
            </GreenCard>
            <GreenCard class="mb-4" cardHeading="Logo & Warnnia">
                <LogoWarna />
            </GreenCard>
        </template>

        <template v-else>
            <GreenCard cardHeading="Profile">
                <FormEditProfilFaskes />
            </GreenCard>
            <GreenCard class="mb-4" cardHeading="Logo & Warna">
                <FormEditLogoWarna />
            </GreenCard>
            <hr class="border-[#D9DCE1] border-1 mt-5" />
            <div class="flex items-end justify-end gap-3 p-5">
                <CustomButton label="Batal" @click="editProfilFaskes"
                    textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                    borderColor="border-2 border-[#9DA4B1]" />
                <CustomButton label="Simpan" />
            </div>
        </template>
    </div>
</template>
