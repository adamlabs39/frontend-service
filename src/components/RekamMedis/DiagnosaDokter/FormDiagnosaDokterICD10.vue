<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import { onBeforeMount, ref } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const props = defineProps({
    method: {
        type: String,
        default: "detail",
    },
});

const schema = toTypedSchema(
    yup.object({
        datas: yup.array().of(
            yup.object({
                primer: yup.string(),
                sekunder: yup.string(),
                diagnosisDiferensial: yup.string(),
                petugas: yup.string().required('Petugas is required'),
            })
        ),
    })
);

const { errors, handleSubmit, resetForm, setValues } = useForm({
    validationSchema: schema,
    initialValues: {
        datas: [{ primer: "", diagnosisDiferensial: "" , petugas: "MBOH" }],
    },
});

const { remove, push, fields } = useFieldArray("datas");

const addDiagnosis = () => {
    // Type assertion untuk memastikan fields.value adalah array yang sesuai dengan schema
    const tipeFields = fields.value as Array<{ value: { sekunder?: string; diagnosisDiferensial?: string; petugas?: string } }>;
    
    // Cek apakah ada field yang sudah diisi sebelumnya, gunakan petugas dari field pertama
    const petugas = tipeFields.length > 0 ? tipeFields[0].value.petugas : "Default Petugas";

    push({ sekunder: "", diagnosisDiferensial: "", petugas });
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
    console.log("Submitted with", values.datas);
});

const onReset = () => {
    const typedFields = fields.value as Array<{ value: { petugas: string } }>;

    resetForm({
        values: {
            datas: typedFields.map((field, index) => ({
                primer: "",
                sekunder: index > 0 ? "" : undefined,
                diagnosisDiferensial: "",
                petugas: field.value.petugas || "MBOH",
            })),
        },
    });
};

</script>


<template>
    <CustomAccordion headerClass="bg-adameds-50">
        <template #header>Diagnosa Dokter (ICD 10)</template>
        <template #content>
            <div v-for="(field, index) in fields" :key="index" class="flex flex-col gap-5 py-3">
                <div v-if="index === 0" class="grid grid-cols-2 gap-5">
                    <CustomSelect label="Primer" v-model="field.value.primer" :options="diagnosaPrimers"
                        optionValue="diagnosaPrimer" optionLabel="diagnosaPrimer" :isLoading="false" :invalid="false"
                        invalidMessage="Wajib diisi" :disabled="false" placeHolder="Pilih Diagnosis"
                        customSelectClass="border-[#C7CBD2]" prependIcon="PhMagnifyingGlass" />
                   
                    <CustomSelect label="Diagnosis Diferensial" v-model="field.value.diagnosisDiferensial"
                        :options="diagnosaSekunders" optionValue="diagnosaSekunder" optionLabel="diagnosaSekunder" :isLoading="false"
                        :invalid="false" invalidMessage="Wajib diisi" :disabled="false" placeHolder="Pilih Diagnosis"
                        customSelectClass="border-[#C7CBD2]" prependIcon="PhMagnifyingGlass" />
                </div>
                <div class="flex gap-[30px] w-full" v-if="index > 0">
                    <div class="basis-2/5">
                        <CustomSelect label="Sekunder" v-model="field.value.sekunder" :options="diagnosaSekunders"
                            optionValue="diagnosaSekunder" optionLabel="diagnosaSekunder" :isLoading="false"
                            :invalid="false" invalidMessage="Wajib diisi" :disabled="false" placeHolder="Pilih Diagnosis"
                            customSelectClass="border-[#C7CBD2]" prependIcon="PhMagnifyingGlass" />
                    </div>
                    <div class="grow">
                        <CustomSelect label="Diagnosis Diferensial" v-model="field.value.diagnosisDiferensial"
                            :options="diagnosaDds" optionValue="diagnosaDd" optionLabel="diagnosaDd" :isLoading="false"
                            :invalid="false" invalidMessage="Wajib diisi" :disabled="false" placeHolder="Pilih Diagnosis"
                            customSelectClass="border-[#C7CBD2]" prependIcon="PhMagnifyingGlass" />
                    </div>
                    <div class="flex items-end justify-start">
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
        <template #footer>
            <div class="flex items-end justify-end gap-3">
                <CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                    borderColor="border-2 border-[#9DA4B1]" @click="onReset" />
                <CustomButton label="Simpan" @click="onSubmit" />
            </div>
            {{ fields }}
            <!-- {{ errors['datas.addresses[0]'] }} -->
        </template>
    </CustomAccordion>
</template>
