<script lang="ts" setup>
import { ref } from 'vue';
import CustomDialog from '@/components/Base/CustomDialog.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
import CustomInputNumber from '@/components/Base/CustomInputNumber.vue';
import CustomTextArea from '@/components/Base/CustomTextArea.vue';
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import { useFieldArray, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import DetailPasien from './DetailPasien.vue';
import CustomSwitch from '@/components/Base/CustomSwitch.vue';

type Obat = {
    namaObat: string;
    jumlahTotal: number ; // Menggunakan null jika ada kemungkinan tidak diisi
    periode: string;
    jumlahKonsumsi: number;
    satuanDosis: string;
    aturanPakai: string;
    caraPakai: string;
    rutePemberian: string;
    obatPulang: boolean;
    obatKronis: boolean;
    catatan: string;
};


const props = defineProps({
    isDialogVisible: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: 'Tambah',
    },
    method: {
        type: String,
        default: 'add',
    },
});

const emit = defineEmits(["update:isDialogVisible", "add-obat"]);

const namaObats = ref([
    { id: 1, namaObat: "Panadol" },
    { id: 2, namaObat: "Paracetamol" },
    { id: 3, namaObat: "Amoxan" }
])

const periodes = ref([
    { id: 1, periode: "Hari" },
    { id: 2, periode: "Minggu" },
    { id: 3, periode: "Jam" },
    { id: 4, periode: "Tiap" },
    { id: 5, periode: "Khusus" }
])

const aturanPakais = ref([
    { id: 1, aturanPakai: "1x Sehari" },
    { id: 2, aturanPakai: "2x Sehari" },
    { id: 3, aturanPakai: "3x Sehari" }
])

const satuanDosiss = ref([
    { id: 1, satuanDosis: "Sendok Makan" },
    { id: 2, satuanDosis: "Kapsul" },
    { id: 3, satuanDosis: "Botol" },
    { id: 4, satuanDosis: "Tablet" }
])

const caraPakais = ref([
    { id: 1, caraPakai: "Setelah Makan" },
    { id: 2, caraPakai: "Sebelum Makan" },
    { id: 3, caraPakai: "Sebelum Tidur" }
])

const rutePemberians = ref([
    { id: 1, rutePemberian: "Oral" },
    { id: 2, rutePemberian: "Rektal" },
    { id: 3, rutePemberian: "Sublingual" }
])
// Definisikan skema validasi
const schema = toTypedSchema(
    yup.object({
        datas: yup.array().of(
            yup.object({
                namaObat: yup.string(),
                jumlahTotal: yup.number(),
                periode: yup.string(),
                jumlahKonsumsi: yup.number(),
                satuanDosis: yup.string(),
                aturanPakai: yup.string(),
                caraPakai: yup.string(),
                rutePemberian: yup.string(),
                obatPulang: yup.bool(),
                obatKronis: yup.bool(),
                catatan: yup.string()
            })
        )
    }),
);

// Inisialisasi form dengan Vee-Validate
const { errors, handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
        datas: []
    },
});

const { remove, push, fields } = useFieldArray<Obat>("datas");

// Handler submit form
const onSubmit = handleSubmit((values) => {
    emit('add-obat', values.datas); // Emit event dengan data obat baru
    console.log(values.datas)
    resetForm(); // Reset form setelah submit
    emit('update:isDialogVisible', false); // Tutup dialog
});

const addObat = () => {
    push({
        namaObat: '',
        jumlahTotal: 0,
        periode: '',
        jumlahKonsumsi: 0,
        satuanDosis: '',
        aturanPakai: '',
        caraPakai: '',
        rutePemberian: '',
        obatPulang: false,
        obatKronis: false,
        catatan: ''
    });
};

// Handler untuk menutup dialog tanpa menyimpan
// function closeDialog() {
//     emit('close');
//     resetForm();
// }

// Mengupdate visibilitas dialog
function updateVisibility(value: boolean) {
    emit("update:isDialogVisible", value);
    resetForm()
}
</script>


<template>
    <CustomDialog width="1000px" :visible="isDialogVisible" headerBg="bg-adameds-300"
        @update:visible="updateVisibility">
        <template #header>{{ title }}</template>
        <template #body>
            <!--  -->
            <div class="flex my-5 gap-7">
                <DetailPasien />
                <hr class="h-auto border border-gray-300">

                <!--  Mulai Diisi -->
                <div class="grow">
                    <div class="flex items-center justify-between">
                        <div class="font-semibold text-MD">Total Obat Terpilih : {{ fields.length }}</div>
                        <CustomButton label="Tambah Obat" showIcon icon-pos="left" icon="PhPlus" @click="addObat" />
                    </div>
                    <hr class="my-4 bg-grey-200 border-1">
                    <div class="flex flex-col gap-3 overflow-y-auto max-h-[400px]">
                        <div v-for="(field, index) in fields" :key="index">
                            <CustomAccordion headerClass="bg-adameds-50">
                                <template #header>Obat {{ index + 1 }}</template>
                                <template #content>
                                    <div class="py-5">
                                        <div class="flex flex-col gap-5">
                                            <div class="flex gap-7">
                                                <div class="min-w-[420px]">
                                                    <CustomSelect label="Nama Obat" v-model="field.value.namaObat"
                                                        :options="namaObats" optionValue="namaObat"
                                                        optionLabel="namaObat" />
                                                </div>
                                                <div class="grow">
                                                    <CustomInputNumber label="Jumlah Total" :show-buttons="true"
                                                        v-model="field.value.jumlahTotal" />
                                                </div>
                                            </div>

                                            <div class="flex gap-5">
                                                <div class="w-1/4">
                                                    <CustomSelect label="Periode" v-model="field.value.periode"
                                                        :options="periodes" optionValue="periode"
                                                        optionLabel="periode" />
                                                </div>
                                                <div class="w-1/4">
                                                    <CustomSelect label="Aturan Pakai" v-model="field.value.aturanPakai"
                                                        :options="aturanPakais" optionValue="aturanPakai"
                                                        optionLabel="aturanPakai" />
                                                </div>
                                                <div class="w-1/3">
                                                    <CustomInputNumber label="Jumlah Konsumsi" :show-buttons="true"
                                                        v-model="field.value.jumlahKonsumsi" />
                                                </div>
                                                <div class="w-1/4">
                                                    <CustomSelect label="Satuan Dosis" v-model="field.value.satuanDosis"
                                                        :options="satuanDosiss" optionValue="satuanDosis"
                                                        optionLabel="satuanDosis" />
                                                </div>
                                            </div>
                                            <div class="flex gap-7">
                                                <div class="w-1/2">
                                                    <CustomSelect label="Cara Pakai" v-model="field.value.caraPakai"
                                                        :options="caraPakais" optionValue="caraPakai"
                                                        optionLabel="caraPakai" />
                                                </div>
                                                <div class="w-1/2">
                                                    <CustomSelect label="Rute Pemberian"
                                                        v-model="field.value.rutePemberian" :options="rutePemberians"
                                                        optionValue="rutePemberian" optionLabel="rutePemberian" />
                                                </div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-7">
                                                <div class="grid grid-cols-2 gap-5">
                                                    <CustomSwitch label="Obat Pulang"
                                                        v-model="field.value.obatPulang" />
                                                    <CustomSwitch label="Obat Kronis"
                                                        v-model="field.value.obatKronis" />
                                                    <!-- <div class="mt-2.5">{{ status === true ? "Aktif" : "Non-Aktif" }}</div> -->
                                                </div>
                                                <div>
                                                    <CustomTextArea label="Catatan" placeholder="-"
                                                        v-model="field.value.catatan" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </CustomAccordion>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="w-full">
                <hr class="-mx-5 border-grey-200" />
                <div class="mt-5 flex justify-end gap-2.5">
                    <CustomButton label="Reset" borderColor="border-2 border-[#9DA4B1]"
                        background-color="bg-transparent" text-color="text-grey-300" @click="resetForm" />
                    <CustomButton label="Simpan" @click="onSubmit" />
                </div>
            </div>
        </template>
    </CustomDialog>
</template>
