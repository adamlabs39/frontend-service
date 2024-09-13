<script setup lang="ts">
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';

import CustomTextfield from '@/components/Base/CustomTextfield.vue';

import { computed, ref } from "vue";
import GreenCard from '../GreenCard.vue';
import { useSettingStore } from '@/stores/setting';
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const props = defineProps({
    konfigurasiIntegrasiResponse: {
        type: Object,
        required: true,
    },
    isEditKonfigurasiVCLAIM: {
        type: Boolean,
        required: true,
    },
})

const emit = defineEmits(['update:isEditKonfigurasiVCLAIM', 'update:afterEditKonfigurasiVCLAIM']);


const settingStore = useSettingStore();

const schemaKonfigurasiVCLAIM = computed(() =>
    toTypedSchema(
        yup.object({
            baseUrl: yup.string(),
            userKey: yup.string(),
            consId: yup.string(),
            secretKey: yup.string(),
            PPK: yup.string()
        })
    )
);

const { handleSubmit: handleSubmitKonfigurasiVCLAIM, defineField: defineFieldKonfigurasiVCLAIM, resetForm: resetKonfigurasiVCLAIMForm } = useForm({
    validationSchema: schemaKonfigurasiVCLAIM, // Pastikan ini sesuai dengan schema yang digunakan
    initialValues: {
        baseUrl: props.konfigurasiIntegrasiResponse.baseUrl,
        userKey: props.konfigurasiIntegrasiResponse.userKey,
        consId: props.konfigurasiIntegrasiResponse.consId,
        secretKey: props.konfigurasiIntegrasiResponse.secretKey,
        PPK: props.konfigurasiIntegrasiResponse.PPK
    },
});

const [baseUrl] = defineFieldKonfigurasiVCLAIM("baseUrl");
const [userKey] = defineFieldKonfigurasiVCLAIM("userKey");
const [consId] = defineFieldKonfigurasiVCLAIM("consId");
const [secretKey] = defineFieldKonfigurasiVCLAIM("secretKey");
const [PPK] = defineFieldKonfigurasiVCLAIM("PPK");

const resetForm = () => {
    resetKonfigurasiVCLAIMForm({
        values: {
            baseUrl: '',
            userKey: '',
            consId: '',
            secretKey: '',
            PPK: ''
        },
    });
};

const onSubmitKonfigurasiVCLAIM = handleSubmitKonfigurasiVCLAIM(async (values) => {
    try {
        const payload = {
            baseUrl: values.baseUrl,
            userKey: values.userKey,
            consId: values.consId,
            secretKey: values.secretKey,
            PPK: values.PPK
        };
        const response = await settingStore.putKonfigurasiVCLAIM(payload)

        if (response?.status === 200) {
            emit('update:isEditKonfigurasiVCLAIM', false);
            emit('update:afterEditKonfigurasiVCLAIM', { ...props.konfigurasiIntegrasiResponse, ...payload });
        } else {
            console.error("Failed to update");
        }
    } catch (error) {
        console.error("Error during submission:", error);
    }
})

</script>


<template>

    <GreenCard cardHeading="Konfigurasi VCLAIM" hr-enable-custom-class showButton labelButton="Batal Edit" outlined
        borderColor="border-adameds-300" textColor="text-adameds-300"
        :button-click-handler="() => emit('update:isEditKonfigurasiVCLAIM', false)">

        <div class="grid grid-cols-2 gap-7 text-normal">
            <CustomTextfield label="Base URL" class="border-[#C7CBD2]" placeholder="Base URL"
                v-model:modelValue="baseUrl" />
            <CustomTextfield label="User Key" class="border-[#C7CBD2]" placeholder="User Key"
                v-model:modelValue="userKey" />
            <CustomTextfield label="Cons ID (BPJS)" class="border-[#C7CBD2]" placeholder="Port"
                v-model:modelValue="consId" />
            <CustomTextfield label="Secret Key" class="border-[#C7CBD2]" placeholder="Secret Key"
                v-model:modelValue="secretKey" />
            <div class="grid">
                <CustomTextfield label="PPK" class="border-[#C7CBD2]" placeholder="PPK" v-model:modelValue="PPK" />
            </div>
        </div>
        <hr class="border-[#D9DCE1] border-1 mt-12 mb-5 w-full" />
        <div class="flex items-end justify-end gap-3">
            <CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                borderColor="border-2 border-[#9DA4B1]" @click="resetForm" />
            <CustomButton label="Simpan" @click="onSubmitKonfigurasiVCLAIM" />
        </div>
    </GreenCard>
</template>


<style lang="scss" scoped></style>