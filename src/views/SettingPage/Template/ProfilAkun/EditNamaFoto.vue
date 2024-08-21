<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { computed } from "vue";

const props = defineProps({
  profileResponse: {
    type: Object,
    required: true,
  },
  editNamaFoto: {
    type: Function,
    required: true,
  }
});

import ProfilePhoto from '../../../../assets/icons/profil.svg';

const uploadImage = () => {
    fileInputRef.value?.click();
};

const handleImageUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            profileImage.value = reader.result as string;
            photo.value = reader.result as string; // Menggunakan photo.value yang sudah ada
        };
        reader.readAsDataURL(file);
    }
};

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;



const profileImage = ref(ProfilePhoto);
const fileInputRef = ref<HTMLInputElement | null>(null);

const schemaNamaLengkap = computed(() =>
    toTypedSchema(
        yup.object({
            name: yup.string().required("Nama wajib diisi"),
            phone: yup
                .string()
                .matches(phoneRegExp, "Format tidak sesuai")
                .required("No. Handphone wajib diisi"),
            awalanGelar: yup.string().required("Awalan Gelar wajib diisi"),
            akhiranGelar: yup.string().required("Akhiran Gelar wajib diisi"),
            photo: yup.string().required("Harus Mengupload Foto"),
        })
    )
);


const { errors: namaLengkapErrors, handleSubmit: handleSubmitNamaLengkap, defineField: defineFieldNamaLengkap } = useForm({
    validationSchema: schemaNamaLengkap,
});


const [name] = defineFieldNamaLengkap("name");
const [phone] = defineFieldNamaLengkap("phone");
const [awalanGelar] = defineFieldNamaLengkap("awalanGelar");
const [akhiranGelar] = defineFieldNamaLengkap("akhiranGelar");
const [photo] = defineFieldNamaLengkap("photo");
</script>

<template>
    <GreenCard cardHeading="Foto Profile dan Nama Lengkap" hrEnableCustomClass showButton
                    labelButton="Batal Edit" :button-click-handler="editNamaFoto" outlined
                    borderColor="border-adameds-300" textColor="text-adameds-300">
                    <div class="flex gap-10 ">
                        <!-- Image -->
                        <div class="w-[200px] h-[200px] flex justify-center items-center relative">
                            <img :src="props.profileResponse.photo ? props.profileResponse.photo : props.profileResponse.profileImage" alt="TES">
                            <div class="w-[50px] absolute bottom-3 right-0">
                                <img src="../../../../assets/icons/pencil_icon.svg" alt="Edit Icon" @click="uploadImage"
                                    style="cursor: pointer;">
                                <input type="file" ref="fileInputRef" style="display: none;" @change="handleImageUpload"
                                    accept="image/*">

                            </div>
                        </div>
                        <div class="flex flex-col justify-evenly">
                            <div class="flex gap-7">
                                <div class="w-[150px]">
                                    <CustomTextfield label="Awalan/Gelar" class="border-[#C7CBD2]"
                                        placeholder="Awalan/Gelar" v-model="awalanGelar"  :invalid="!!namaLengkapErrors.awalanGelar"
                                        :invalidMessage="namaLengkapErrors.awalanGelar" />
                                </div>
                                <div class="grow">
                                    <CustomTextfield label="Nama Lengkap" class="w-full" placeholder="Nama Lengkap"
                                        v-model="name" :invalid="!!namaLengkapErrors.name"
                                        :invalidMessage="namaLengkapErrors.name" />
                                </div>
                                <div class="w-[150px]">
                                    <CustomTextfield label="Akhiran/Gelar" class="w-full" placeholder="Akhiran/Gelar"
                                        v-model="akhiranGelar"  :invalid="!!namaLengkapErrors.akhiranGelar"
                                        :invalidMessage="namaLengkapErrors.akhiranGelar"/>
                                </div>
                            </div>


                            <div class="flex items-center gap-1">
                                <div class="w-80">
                                    <div class="text-sm underline">Role</div>
                                    <div class="font-bold text-heading">Admin</div>
                                </div>
                                <div class="w-80 ">
                                    <div class="text-sm underline">Email</div>
                                    <div class="font-bold text-heading">{{ props.profileResponse.email }}</div>
                                </div>
                                <div class="w-[150px] ">
                                    <CustomTextfield label="No. Handphone" class="w-full" placeholder="08123xx"
                                        v-model="phone" type="number"  :invalid="!!namaLengkapErrors.phone"
                                        :invalidMessage="namaLengkapErrors.phone" />
                                </div>
                            </div>

                        </div>

                    </div>
                    <hr class="border-[#D9DCE1] border-1 mt-5" />
                    <div class="flex items-end justify-end gap-3 py-2.5">
                        <CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                            borderColor="border-2 border-[#9DA4B1]" />
                        <CustomButton label="Simpan" @click="onSubmitNamaLengkap" />
                    </div>
                </GreenCard>
</template>