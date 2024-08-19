<script setup lang="ts">
import { useRouter } from "vue-router";
import MainHeaderSetting from "../MainHeaderSetting.vue";
import GreenCard from "../GreenCard.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import { useSettingStore } from "@/stores/setting";


const profileResponse = ref({
    name: '',
    email: '',
    phone: '',
    role: {
        name: ''
    },
    username: '',
    password: '',
    inventory_medis: '',
    inventory_non_medis: ''
});


const settingStore = useSettingStore();
const isEditProfilAkun = ref(false);

const cancelProfileAccount = () => {
    isEditProfilAkun.value = !isEditProfilAkun.value;
};

onBeforeMount(async () => {
    const response = await settingStore.getApi();
    profileResponse.value = response.payload;
});


</script>

<template>
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto">
        <template #header>
            <MainHeaderSetting heading="Profil Saya" v-if="!isEditProfilAkun" />
            <!-- <MainHeaderSetting heading="Profil Saya" v-else /> -->
        </template>
        <template #content>
            <GreenCard cardHeading="Foto Profile dan Nama Lengkap" hrEnableCustomClass>
                <div class="flex gap-10 ">
                    <!-- Image -->
                    <div class="w-[200px] h-[200px] flex justify-center items-center relative">
                        <img src="../../../../assets/icons/profil.svg" alt="">
                        <div class="w-[50px] absolute bottom-3 right-0">
                            <img src="../../../../assets/icons/pencil_icon.svg" alt="">

                        </div>
                    </div>
                    <div class="flex flex-col justify-evenly ">
                        <div>
                            <div class="col-span-2 text-sm underline">Nama Lengkap</div>
                            <div class="font-bold text-heading">{{ profileResponse.name }}</div>
                        </div>

                        <div class="grid grid-cols-3">
                            <div class="w-80">
                                <div class="text-sm underline">Role</div>
                                <div class="font-bold text-heading">{{ profileResponse.role.name }}</div>
                            </div>
                            <div class="grow">
                                <div class="text-sm underline">Email</div>
                                <div class="font-bold text-heading">{{ profileResponse.email }}</div>
                            </div>
                            <div class="w-[180px]">
                                <div class="text-sm underline">No. Handphone</div>
                                <div class="font-bold text-heading">{{ profileResponse.phone }}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </GreenCard>

            <GreenCard cardHeading="Username & Password" hrEnableCustomClass>
                <div class="grid grid-cols-2 gap-3">
                    <div class="mb-4">
                        <div class="text-sm underline">Username</div>
                        <div class="font-bold text-heading">{{ profileResponse.username }}</div>
                    </div>
                    <div class="mb-4">
                        <div class="text-sm underline">Password</div>
                        <div class="font-bold text-heading">{{ profileResponse.password }}</div>
                    </div>
                </div>
            </GreenCard>

            <GreenCard cardHeading="Hak Akses Verifikator" hrEnableCustomClass class="mb-4">
                <div class="grid grid-cols-2 gap-3">
                    <div class="mb-4">
                        <div class="text-sm underline">
                            Verifikator Usulan Pengadaan Barang Medis
                        </div>
                        <div class="font-bold text-heading">{{ profileResponse.inventory_medis }}</div>
                    </div>
                    <div class="mb-4">
                        <div class="text-sm underline">
                            Verifikator Usulan Pengadaan Barang Non-Medis
                        </div>
                        <div class="font-bold text-heading">{{ profileResponse.inventory_non_medis }}</div>
                    </div>
                </div>
            </GreenCard>
        </template>
    </Card>
</template>

<style lang="scss" scoped></style>
