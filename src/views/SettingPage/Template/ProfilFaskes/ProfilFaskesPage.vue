<script setup lang="ts">
import { ref } from "vue";
import MainHeaderSetting from "../MainHeaderSetting.vue";
import LogoWarna from "./LogoWarna.vue";
import GreenCard from "../GreenCard.vue";
import ProfilFaskesTemplate from "./ProfilFaskesTemplate.vue";
import FormEditProfilFaskes from "./FormEditProfilFaskes.vue";
import FormEditLogoWarna from "./FormEditLogoWarna.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const isEditProfilFaskes = ref(false);
const isEditLogoWarna = ref(false);

const editProfilFaskes = () => {
    isEditProfilFaskes.value = !isEditProfilFaskes.value;
};

const editLogoWarna = () => {
    isEditLogoWarna.value = !isEditLogoWarna.value;
};
</script>

<template>
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto">
        <template #header>
            <MainHeaderSetting heading="Profil Faskes" />
        </template>
        <template #content>
            <!-- Menampilkan Profil Faskes -->
            <template v-if="!isEditProfilFaskes">
                <GreenCard cardHeading="Profile" showButton labelButton="Edit" hrEnableCustomClass class="font-bold"
                    :button-click-handler="editProfilFaskes">
                    <ProfilFaskesTemplate />
                </GreenCard>
            </template>
            <template v-else-if="isEditProfilFaskes">
                <GreenCard cardHeading="Profile" hr-enable-custom-class showButton labelButton="Batal Edit"
                    :button-click-handler="editProfilFaskes" outlined borderColor="border-adameds-300"
                    textColor="text-adameds-300">
                    <FormEditProfilFaskes />
                    <hr class="border-[#D9DCE1] border-1 mt-5" />
                    <div class="flex items-end justify-end gap-3 py-2.5">
                        <CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                            borderColor="border-2 border-[#9DA4B1]" />
                        <CustomButton label="Simpan" />
                    </div>
                </GreenCard>

            </template>

            <!-- Menampilkan Logo & Warna -->
            <template v-if="!isEditLogoWarna">
                <GreenCard class="mb-4" cardHeading="Logo & Warna" showButton labelButton="Edit" hrEnableCustomClass
                    :button-click-handler="editLogoWarna">
                    <LogoWarna />
                </GreenCard>
            </template>
            <template v-else-if="isEditLogoWarna">
                <GreenCard class="mb-4" cardHeading="Logo & Warna" hr-enable-custom-class showButton
                    labelButton="Batal Edit" :button-click-handler="editLogoWarna" outlined
                    borderColor="border-adameds-300" textColor="text-adameds-300">
                    <FormEditLogoWarna />
                    <hr class="border-[#D9DCE1] border-1 mt-5" />
                    <div class="flex items-end justify-end gap-3 py-2.5">
                        <CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                            borderColor="border-2 border-[#9DA4B1]" />
                        <CustomButton label="Simpan" />
                    </div>
                </GreenCard>
            </template>

        </template>
    </Card>
</template>
