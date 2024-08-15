<script setup lang="ts">
import { useRouter } from "vue-router";
import MainHeaderSetting from "../MainHeaderSetting.vue";
import GreenCard from "../GreenCard.vue";
import { ref } from "vue";
import EditProfilAkun from "./EditProfilAkun.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const isEditProfilAkun = ref(false);

const editProfilAkun = () => {
    isEditProfilAkun.value = !isEditProfilAkun.value;
};
</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Profil Saya" v-if="!isEditProfilAkun" showButton labelButton="Edit"
            :buttonClickHandler="editProfilAkun" />
        <MainHeaderSetting heading="Profil Saya" v-else />

        <template v-if="!isEditProfilAkun">
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



        </template>
        <template v-else>
            <GreenCard cardHeading="Foto Profile dan Nama Lengkap" hrEnableCustomClass>
                <div class="flex gap-10 ">
                    <!-- Image -->
                    <div class="w-[200px] h-[200px] flex justify-center items-center relative">
                        <img src="../../../../assets/icons/profil.svg" alt="">
                        <div class="w-[50px] absolute bottom-3 right-0">
                            <img src="../../../../assets/icons/pencil_icon.svg" alt="">

                        </div>
                    </div>
                    <div class="flex flex-col justify-evenly">
                        <div class="flex gap-7">
                            <div class="w-[150px]">
                                <CustomTextfield label="Awalan/Gelar" class="border-[#C7CBD2]"
                                    placeholder="Awalan/Gelar" />
                            </div>
                            <div class="grow">
                                <CustomTextfield label="Nama Lengkap" class="w-full" placeholder="Nama Lengkap" />
                            </div>
                            <div class="w-[150px]">
                                <CustomTextfield label="Akhiran/Gelar" class="w-full" placeholder="Akhiran/Gelar" />
                            </div>
                        </div>


                        <div class="flex items-center gap-1">
                            <div class="w-80">
                                <div class="text-sm underline">Role</div>
                                <div class="font-bold text-heading">Admin</div>
                            </div>
                            <div class="w-80 ">
                                <div class="text-sm underline">Email</div>
                                <div class="font-bold text-heading">user@gmail.com</div>
                            </div>
                            <div class="w-[150px] ">
                                <CustomTextfield label="No. Handphone" class="w-full" placeholder="08123xx"
                                    appendIcon="PhXCircle" />
                            </div>
                        </div>

                    </div>
                </div>
            </GreenCard>

            <GreenCard cardHeading="Username & Password" hrEnableCustomClass>
                <div class="grid grid-cols-2 gap-7">
                    <div class="flex flex-col mt-2 ">
                        <div class="text-sm underline">Username</div>
                        <div class="font-bold text-heading">Username</div>
                    </div>
                    <div class="mb-4">

                        <CustomTextfield label="Password Lama" class="w-full" placeholder="************"
                            appendIcon="PhEye" />
                    </div>
                    <div class="mb-4">
                        <CustomTextfield label="Password Baru" class="w-full" placeholder="************"
                            appendIcon="PhEye" />
                    </div>
                    <div class="mb-4">

                        <CustomTextfield label="Verify Password Baru" class="w-full" placeholder="************"
                            appendIcon="PhEye" />
                    </div>
                </div>
            </GreenCard>
            <GreenCard cardHeading="Hak Akses Verifikator" hrEnableCustomClass class="mb-4">
                <div class="grid grid-cols-2 gap-7">
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
            <hr class="border-[#D9DCE1] border-1 mt-5" />
            <div class="flex items-end justify-end gap-3 p-5">
                <CustomButton label="Batal" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                    borderColor="border-2 border-[#9DA4B1]"  @click="editProfilAkun"/>
                <CustomButton label="Simpan" />
            </div>
        </template>

    </div>
</template>

<style lang="scss" scoped></style>
