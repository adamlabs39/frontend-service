<script setup lang="ts">
import { useRouter } from "vue-router";
import MainHeaderSetting from "../MainHeaderSetting.vue";
import GreenCard from "../GreenCard.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import { useSettingStore } from "@/stores/setting";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { computed } from "vue";

import ProfilePhoto from '../../../../assets/icons/profil.svg';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


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


const schemaUsernamePassword = computed(() =>
    toTypedSchema(
        yup.object({
            password: yup.string().required("Password Lama diperlukan"),
            passwordBaru: yup
                .string()
                .min(8, "Password minimal 8 karakter")
                .matches(
                    /[A-Z]/,
                    "Password harus mengandung setidaknya satu huruf besar"
                )
                .matches(
                    /[a-z]/,
                    "Password harus mengandung setidaknya satu huruf kecil"
                )
                .matches(/\d/, "Password harus mengandung setidaknya satu angka")
                .matches(
                    /[!@#$%^&*(),.?":{}|<>]/,
                    "Password harus mengandung setidaknya satu simbol khusus"
                ),
            verifikasiPasswordBaru: yup
                .string()
                .min(8, "Password minimal 8 digit")
                .matches(/[A-Z]/, "Password harus mengandung setidaknya satu huruf besar")
                .matches(/[a-z]/, "Password harus mengandung setidaknya satu huruf kecil")
                .matches(/\d/, "Password harus mengandung setidaknya satu angka")
                .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password harus mengandung setidaknya satu simbol khusus")
                .oneOf([yup.ref("passwordBaru")], "Password tidak sama"),
        })
    )
);

const { errors: namaLengkapErrors, handleSubmit: handleSubmitNamaLengkap, defineField: defineFieldNamaLengkap } = useForm({
    validationSchema: schemaNamaLengkap,
});

const { errors: usernamePasswordErrors, handleSubmit: handleSubmitUsernamePassword, defineField: defineFieldUsernamePassword } = useForm({
    validationSchema: schemaUsernamePassword,
});

const [name] = defineFieldNamaLengkap("name");
const [phone] = defineFieldNamaLengkap("phone");
const [awalanGelar] = defineFieldNamaLengkap("awalanGelar");
const [akhiranGelar] = defineFieldNamaLengkap("akhiranGelar");
const [photo] = defineFieldNamaLengkap("photo");


const [password] = defineFieldUsernamePassword("password");
const [passwordBaru] = defineFieldUsernamePassword("passwordBaru");
const [verifikasiPasswordBaru] = defineFieldUsernamePassword("verifikasiPasswordBaru");



const profileResponse = ref({
    name: '',
    email: '',
    phone: '',
    photo: '',
    role: {
        name: ''
    },
    username: '',
    password: '',
    inventoryMedis: '',
    inventoryNonMedis: ''
});

const isEditNamaFoto = ref(false);

const isEditUsernamePassword = ref(false)

const editUsernamePassword = () => {
    isEditUsernamePassword.value = !isEditUsernamePassword.value;
}

const editNamaFoto = () => {
    isEditNamaFoto.value = !isEditNamaFoto.value
}
onMounted(() => {
    fetchSettingData();
});


const settingStore = useSettingStore();

const fetchSettingData = async () => {
    try {
        const response = await settingStore.getApi();
        if (response && response.payload) {
            profileResponse.value = response.payload;
        } else {
            console.error("Unexpected response Structure", response);
        }
    } catch (error) {
        console.error("Failed to fetch data", error);

    }
}

const onSubmitNamaLengkap = handleSubmitNamaLengkap(async (values) => {
    try {
        const payload = {
            name: values.name,
            phone: values.phone,
            awalan_gelar: values.awalanGelar,
            akhiran_gelar: values.akhiranGelar,
            photo: values.photo,
        };
        const response = await settingStore.putApi(payload);
        if (response?.status === 200) {
            isEditNamaFoto.value = false;
            fetchSettingData();
        } else {
            console.error("Failed to update profile:");
        }
    } catch (error) {
        console.error("Error during submission:", error);
    }
});

const onSubmitUsernamePassword = handleSubmitUsernamePassword((values) => {
    if (password.value === profileResponse.value.password) {
        console.log("Submitted with", values);
    } else {
        alert("Password Lama tidak sesuai.");
    }
});


const showPasswordLama = ref(false);
const showPasswordBaru = ref(false);
const showVerifikasiPasswordBaru = ref(false);

const profileImage = ref(ProfilePhoto);
const fileInputRef = ref<HTMLInputElement | null>(null);

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

</script>

<template>
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto">
        <template #header>
            <MainHeaderSetting heading="Profil Saya" />
        </template>
        <template #content>
            <template v-if="!isEditNamaFoto">
                <GreenCard cardHeading="Foto Profile dan Nama Lengkap" hrEnableCustomClass showButton labelButton="Edit"
                    :buttonClickHandler="editNamaFoto">
                    <div class="flex gap-10 ">
                        <!-- Image -->
                        <div class="w-[200px] h-[200px] flex justify-center items-center relative">
                            <img :src="profileResponse.photo ? profileResponse.photo : profileImage" alt="">
                        </div>
                        <div class="flex flex-col justify-evenly ">
                            <div>
                                <div class="col-span-2 text-sm underline">Nama Lengkap</div>
                                <div class="font-bold text-heading">{{ awalanGelar }} {{ profileResponse.name }} {{ akhiranGelar }}</div>
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
            </template>

            <template v-else-if="isEditNamaFoto">
                <GreenCard cardHeading="Foto Profile dan Nama Lengkap" hrEnableCustomClass showButton
                    labelButton="Batal Edit" :button-click-handler="editNamaFoto" outlined
                    borderColor="border-adameds-300" textColor="text-adameds-300">
                    <div class="flex gap-10 ">
                        <!-- Image -->
                        <div class="w-[200px] h-[200px] flex justify-center items-center relative">
                            <img :src="profileResponse.photo ? profileResponse.photo : profileImage" alt="TES">
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
                                    <div class="font-bold text-heading">{{ profileResponse.email }}</div>
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

            <template v-if="!isEditUsernamePassword">
                <GreenCard cardHeading="Username & Password" hrEnableCustomClass showButton labelButton="Edit"
                    :buttonClickHandler="editUsernamePassword">
                    <div class="grid grid-cols-2 gap-3">
                        <div class="mb-4">
                            <div class="text-sm underline">Username</div>
                            <div class="font-bold text-heading">{{ profileResponse.username }}</div>
                        </div>
                        <div class="mb-4">
                            <div class="text-sm underline">Password</div>
                            <div class="font-bold text-heading"> {{ profileResponse.password ? '********' : '' }}</div>
                        </div>
                    </div>
                </GreenCard>
            </template>

            <template v-else-if="isEditUsernamePassword">
                <GreenCard cardHeading="Username & Password" hrEnableCustomClass showButton labelButton="Batal Edit"
                    :button-click-handler="editUsernamePassword" outlined borderColor="border-adameds-300"
                    textColor="text-adameds-300">
                    <div class="grid grid-cols-2 gap-7">
                        <div class="flex flex-col mt-2 ">
                            <div class="text-sm underline">Username</div>
                            <div class="font-bold text-heading">{{ profileResponse.username }}</div>
                        </div>
                        <div class="mb-4">
                            <CustomTextfield label="Password Lama" class="w-full" placeholder="***" v-model="password"
                                :type="showPasswordLama ? 'text' : 'password'"
                                :appendIcon="showPasswordLama ? 'PhEye' : 'PhEyeSlash'"
                                @clickAppend="showPasswordLama = !showPasswordLama"
                                :invalid="!!usernamePasswordErrors.password"
                                :invalidMessage="usernamePasswordErrors.password" />
                        </div>
                        <div class="mb-4">
                            <CustomTextfield label="Password Baru" class="w-full" placeholder="************"
                                v-model="passwordBaru" :invalid="!!usernamePasswordErrors.passwordBaru"
                                :invalidMessage="usernamePasswordErrors.passwordBaru"
                                :type="showPasswordBaru ? 'text' : 'password'"
                                :appendIcon="showPasswordBaru ? 'PhEye' : 'PhEyeSlash'"
                                @clickAppend="showPasswordBaru = !showPasswordBaru" />
                        </div>
                        <div class="mb-4">

                            <CustomTextfield label="Verifikasi Password Baru" class="w-full" placeholder="************"
                                v-model="verifikasiPasswordBaru"
                                :invalid="!!usernamePasswordErrors.verifikasiPasswordBaru"
                                :invalidMessage="usernamePasswordErrors.verifikasiPasswordBaru"
                                :type="showVerifikasiPasswordBaru ? 'text' : 'password'"
                                :appendIcon="showVerifikasiPasswordBaru ? 'PhEye' : 'PhEyeSlash'"
                                @clickAppend="showVerifikasiPasswordBaru = !showVerifikasiPasswordBaru" />
                        </div>
                    </div>
                    <hr class="border-[#D9DCE1] border-1 mt-5" />
                    <div class="flex items-end justify-end gap-3 py-2.5">
                        <CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                            borderColor="border-2 border-[#9DA4B1]" />
                        <CustomButton label="Simpan" @click="onSubmitUsernamePassword" />
                    </div>
                </GreenCard>
            </template>


            <GreenCard cardHeading="Hak Akses Verifikator" hrEnableCustomClass class="mb-4">
                <div class="grid grid-cols-2 gap-3">
                    <div class="mb-4">
                        <div class="text-sm underline">
                            Verifikator Usulan Pengadaan Barang Medis
                        </div>
                        <div class="font-bold text-heading">{{ profileResponse.inventoryMedis ? 'Penanggung Jawab' : '-'
                            }}</div>
                    </div>
                    <div class="mb-4">
                        <div class="text-sm underline">
                            Verifikator Usulan Pengadaan Barang Non-Medis
                        </div>
                        <div class="font-bold text-heading">{{ profileResponse.inventoryNonMedis ? 'Penanggung Jawab' :
                            '-' }}</div>
                    </div>
                </div>
            </GreenCard>
        </template>
    </Card>
</template>
<style lang="scss" scoped></style>
