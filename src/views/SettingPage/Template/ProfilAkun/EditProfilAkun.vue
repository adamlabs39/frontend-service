<script setup lang="ts">
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import GreenCard from "../GreenCard.vue";
import MainHeaderSetting from "../MainHeaderSetting.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
</script>


<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Profil Saya" />
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
                            <CustomTextfield label="Awalan/Gelar" class="border-[#C7CBD2]" placeholder="Awalan/Gelar" />
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
                            <CustomTextfield label="No. Handphone" class="w-full" placeholder="08123xx" appendIcon="PhXCircle" />
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

                    <CustomTextfield label="Password Lama" class="w-full" placeholder="************" appendIcon="PhEye" />
                </div>
                <div class="mb-4">
                    <CustomTextfield label="Password Baru" class="w-full" placeholder="************" appendIcon="PhEye"/>
                </div>
                <div class="mb-4">

                    <CustomTextfield label="Verify Password Baru" class="w-full" placeholder="************" appendIcon="PhEye"/>
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
                borderColor="border-2 border-[#9DA4B1]" />
            <CustomButton label="Simpan" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>