<script setup lang="ts">
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomDatePicker from '@/components/Base/CustomDatePicker.vue';
import CustomInfoRow from '@/components/Base/CustomInfoRow.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';
import { computed, ref, onBeforeMount } from 'vue';
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const props = defineProps({
    method: {
        type: String,
        default: "detail",
    }
});

// Local state for method
const currentMethod = ref(props.method);

const schemaAlergi = computed(() =>
    toTypedSchema(
        yup.object({
            isAlergi: yup.bool().default(true),
            pemicuAlergi: yup.string(),
            namaAlergi: yup.string(),
            reaksiAlergi: yup.string(),
            tingkatKeparahanAlergi: yup.string(),
            efekSampingAlergi: yup.string(),
            tanggalKejadianAlergi: yup.date(),
            petugas: yup.string().required('Petugas alergi is required')
        })
    )
);

const {
    handleSubmit: handleSubmitAlergi,
    defineField: defineFieldAlergi,
    setValues
} = useForm({
    validationSchema: schemaAlergi,
});

const [pemicuAlergi] = defineFieldAlergi("pemicuAlergi");
const [namaAlergi] = defineFieldAlergi("namaAlergi");
const [reaksiAlergi] = defineFieldAlergi("reaksiAlergi");
const [tingkatKeparahanAlergi] = defineFieldAlergi("tingkatKeparahanAlergi");
const [efekSampingAlergi] = defineFieldAlergi("efekSampingAlergi");
const [tanggalKejadianAlergi] = defineFieldAlergi("tanggalKejadianAlergi");
const [petugas] = defineFieldAlergi("petugas");

const onSubmitFormAlergi = handleSubmitAlergi((values: any) => {
    console.log("Adding new data", values);
    currentMethod.value = 'detail';
});

onBeforeMount(() => {
    setValues({ petugas: "MBOH" });
});

// Method to handle edit button click
const onEditClick = () => {
    currentMethod.value = 'form';
};

</script>

<template>
    <CustomAccordion headerClass="bg-adameds-50">
        <template #header> Alergi</template>
        <template #content>
            <!-- Form Section -->
            <div v-if="currentMethod === 'form'" class="grid grid-cols-2 gap-[30px] py-3">
                <CustomTextfield label="Pemicu Alergi" placeholder="Masukkan Pemicu Alergi"
                    v-model:modelValue="pemicuAlergi" />
                <CustomTextfield label="Nama/Jenis Alergi" placeholder="Masukkan Nama Alergi"
                    v-model:modelValue="namaAlergi" />
                <CustomTextfield label="Reaksi" placeholder="Masukkan Reaksi" v-model:modelValue="reaksiAlergi" />
                <CustomTextfield label="Tingkat Keparahan" placeholder="Masukkan Tingkat Keparahan"
                    v-model:modelValue="tingkatKeparahanAlergi" />
                <CustomTextfield label="Efek Samping" placeholder="Masukkan Efek Samping"
                    v-model:modelValue="efekSampingAlergi" />
                <CustomDatePicker v-model="tanggalKejadianAlergi" label="Tanggal Kejadian" />
            </div>

            <!-- Detail Section -->
            <div v-if="currentMethod === 'detail'" class="py-5 flex flex-col gap-[19px]">
                <CustomInfoRow label="Pemicu Alergi" value="Makanan" />
                <CustomInfoRow label="Nama / Jenis Alergi" value="Makanan sejenis ikan-ikanan" />
                <CustomInfoRow label="Reaksi" value="Gatal-gatal" />
                <CustomInfoRow label="Tingkat Keparahan" value="Tidak terlalu parah" />
                <CustomInfoRow label="Efek Samping" value="Kulit Memerah" />
                <CustomInfoRow label="Tanggal Kejadian" value="01-01-2020" />
                <hr class="border-grey-200">
                <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
            </div>
        </template>
        <template #footer>
            <div class="flex items-end justify-end gap-3">
                <CustomButton v-if="currentMethod === 'form'" label="Tidak Ada Alergi" textColor="text-adameds-300"
                    backgroundColor="bg-transparent" borderColor="border-2 border-adameds-300" />
                <CustomButton v-if="currentMethod === 'form'" label="Simpan" @click="onSubmitFormAlergi" />
                <CustomButton v-if="currentMethod === 'detail'" label="Edit" @click="onEditClick" />
            </div>
        </template>
    </CustomAccordion>
</template>
