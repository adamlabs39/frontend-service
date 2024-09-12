<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import { ref } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";

const props = defineProps({
    method: {
        type: String,
        default: "detail",
    },
});
const currentMethod = ref(props.method);


const schema = yup.object({
    primer: yup.string().required('Primer is required'),
    petugas: yup.string().required('Petugas is required'),
    diagnosisDiferensial: yup.string(),
    datas: yup.array().of(
        yup.object({
            sekunder: yup.string().required('Sekunder is required'),
            diagnosisDiferensialDinamis: yup.string(),
        })
    ),
});

const { errors, handleSubmit, resetForm, defineField } = useForm({
    validationSchema: schema,
    initialValues: {
        primer: '',
        petugas: 'MBOH',
        diagnosisDiferensial: "",
        datas: [], // Inisialisasi array kosong
    },
});

const [primer] = defineField('primer');
const [petugas] = defineField('petugas');
const [diagnosisDiferensial] = defineField('diagnosisDiferensial');

const { remove, push, fields } = useFieldArray("datas");

const addDiagnosis = () => {
    push({ sekunder: '', diagnosisDiferensialDinamis: '' });
};

const diagnosaPrimers = ref([
    { id: "1", diagnosaPrimer: "Sakit Kepala" },
    { id: "2", diagnosaPrimer: "Sakit Perut" },
    { id: "3", diagnosaPrimer: "Sakit Jantung" },
    { id: "4", diagnosaPrimer: "Tekanan Darah Tinggi" },
]);

const diagnosaSekunders = ref([
    { id: "1", diagnosaSekunder: "Sakit Perut 3" },
    { id: "2", diagnosaSekunder: "Jantung Berdebar" },
    { id: "3", diagnosaSekunder: "Hepatitis" },
    { id: "4", diagnosaSekunder: "Sakit Demam" },
]);

const diagnosaDds = ref([
    { id: "1", diagnosaDd: "Tangan Berdarah" },
    { id: "2", diagnosaDd: "Luka Hati" },
    { id: "3", diagnosaDd: "Masuk Angin" },
    { id: "4", diagnosaDd: "Gabisa Ngapa-ngapain" },
]);

const onSubmit = handleSubmit((values) => {
    console.log("Submitted with", values);
    currentMethod.value = 'detail'
});

// Fungsi reset yang juga mengosongkan array
const onReset = () => {
    resetForm({
        values: {
            primer: '',
            petugas: 'MBOH',
            diagnosisDiferensial: '',
        },
    })
};

const onEditClick = () => {
    currentMethod.value = 'form';  // Mengubah method menjadi 'form'
};

</script>

<template>
    <CustomAccordion headerClass="bg-adameds-50">
        <template #header>Diagnosa Dokter (ICD 10)</template>
        <template #content v-if="currentMethod == 'form'"> 
            <div class="flex flex-col gap-5 py-3">
                <div class="grid grid-cols-2 gap-5">
                    <CustomSelect label="Primer" v-model:model-value="primer" :options="diagnosaPrimers"
                        optionValue="diagnosaPrimer" optionLabel="diagnosaPrimer" :isLoading="false"
                        :invalid="!!errors.primer" :invalidMessage="errors.primer" :disabled="false"
                        placeHolder="Pilih Diagnosis" customSelectClass="border-[#C7CBD2]"
                        prependIcon="PhMagnifyingGlass">
                    </CustomSelect>

                    <CustomSelect label="Diagnosis Diferensial" v-model="diagnosisDiferensial"
                        :options="diagnosaSekunders" optionValue="diagnosaSekunder" optionLabel="diagnosaSekunder"
                        :isLoading="false" :invalid="false" invalidMessage="Wajib diisi" :disabled="false"
                        placeHolder="Pilih Diagnosis" customSelectClass="border-[#C7CBD2]"
                        prependIcon="PhMagnifyingGlass" />
                </div>

                <div class="flex gap-[30px] w-full" v-for="(field, index) in fields" :key="index">
                    <div class="basis-2/5">
                        <CustomSelect label="Sekunder" v-model="field.value.sekunder" :options="diagnosaSekunders"
                            optionValue="diagnosaSekunder" optionLabel="diagnosaSekunder" :isLoading="false"
                            :invalid="!!errors[`datas[${index}].sekunder`]"
                            :invalidMessage="errors[`datas[${index}].sekunder`]" :disabled="false"
                            placeHolder="Pilih Diagnosis" customSelectClass="border-[#C7CBD2]"
                            prependIcon="PhMagnifyingGlass" />
                    </div>
                    <div class="grow">
                        <CustomSelect label="Diagnosis Diferensial" v-model="field.value.diagnosisDiferensialDinamis"
                            :options="diagnosaDds" optionValue="diagnosaDd" optionLabel="diagnosaDd" :isLoading="false"
                            :invalid="false" invalidMessage="Wajib diisi" :disabled="false"
                            placeHolder="Pilih Diagnosis" customSelectClass="border-[#C7CBD2]"
                            prependIcon="PhMagnifyingGlass" />
                    </div>
                    <div class="flex items-center justify-start">
                        <CustomButton label="Hapus Diagnosa" textColor="text-white" backgroundColor="bg-danger-300"
                            @click="remove(index)" />
                    </div>
                </div>
            </div>

            <div
                class="flex items-center justify-center p-5 my-7 border border-dashed rounded-lg border-adameds-300 gap-2.5">
                <CustomButton icon="PhPlus" label="Diagnosis" borderColor="border-adameds-300"
                    textColor="text-adameds-300" backgroundColor="bg-white" @click="addDiagnosis" />
            </div>
        </template>

        <template #content v-else>
            <div class="py-5 flex flex-col gap-[19px]">
                <CustomInfoRow label="Primer" value="ICD-10" />
                <CustomInfoRow label="Diagnosis Diferensial" value="ICD-10" />
                <CustomInfoRow label="Sekunder" value="ICD-10" />
                <CustomInfoRow label="Diagnosis Diferensial" value="ICD-10" />
                <CustomInfoRow label="Sekunder" value="ICD-10" />
                <CustomInfoRow label="Diagnosis Diferensial" value="ICD-10" />
                <hr class="border-grey-200">
                <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
            </div>
        </template>
        
        <template #footer>
            <div class="flex items-end justify-end gap-3">
                <CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                    borderColor="border-2 border-[#9DA4B1]" @click="onReset" v-if="currentMethod === 'form'" />
                <CustomButton label="Simpan" @click="onSubmit" v-if="currentMethod === 'form'" />
                <CustomButton v-if="currentMethod === 'detail'" label="Edit" @click="onEditClick" />
            </div>
            <!-- {{ fields }} -->
        </template>
    </CustomAccordion>
</template>
