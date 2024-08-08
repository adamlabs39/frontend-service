<script setup lang="ts">
import { useRouter } from "vue-router";
import MainHeaderSetting from "../MainHeaderSetting.vue";
import GreenCard from "../GreenCard.vue";

const router = useRouter();
const editProfilAkun = () => {
    router.push({ name: "setting-profil-faskes-edit" });
};
</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Profil Faskes" showButton labelButton="Edit" :buttonClickHandler="editProfilAkun" />

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
                        <div class="font-bold text-heading">Tuan Admin, S.Kom</div>
                    </div>

                    <div class="grid grid-cols-3">
                        <div class="w-80">
                            <div class="text-sm underline">Role</div>
                            <div class="font-bold text-heading">Admin</div>
                        </div>
                        <div class="grow">
                            <div class="text-sm underline">Email</div>
                            <div class="font-bold text-heading">user@gmail.com</div>
                        </div>
                        <div class="w-[180px]">
                            <div class="text-sm underline">No. Handphone</div>
                            <div class="font-bold text-heading">089172937728</div>
                        </div>
                    </div>

                </div>
            </div>
        </GreenCard>

        <GreenCard cardHeading="Username & Password" hrEnableCustomClass>
            <div class="grid grid-cols-2 gap-3">
                <div class="mb-4">
                    <div class="text-sm underline">Username</div>
                    <div class="font-bold text-heading">Username</div>
                </div>
                <div class="mb-4">
                    <div class="text-sm underline">Password</div>
                    <div class="font-bold text-heading">*************</div>
                </div>
            </div>
        </GreenCard>
        <GreenCard cardHeading="Hak Akses Verifikator" hrEnableCustomClass class="mb-4">
            <div class="grid grid-cols-2 gap-3">
                <div class="mb-4">
                    <div class="text-sm underline">
                        Verifikator Usulan Pengadaan Barang Medis
                    </div>
                    <div class="font-bold text-heading">Penanggung Jawab</div>
                </div>
                <div class="mb-4">
                    <div class="text-sm underline">
                        Verifikator Usulan Pengadaan Barang Non-Medis
                    </div>
                    <div class="font-bold text-heading">Penanggung Jawab</div>
                </div>
            </div>
        </GreenCard>
    </div>
</template>

<style lang="scss" scoped></style>
