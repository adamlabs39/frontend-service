<script lang="ts" setup>
import { ref, watch } from 'vue';
import CustomDialog from '@/components/Base/CustomDialog.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomInputNumber from '@/components/Base/CustomInputNumber.vue';
import CustomTextArea from '@/components/Base/CustomTextArea.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
import CustomSwitch from '@/components/Base/CustomSwitch.vue';
import DetailPasien from './DetailPasien.vue';
import { useFieldArray, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

type ObatRacikan = {
    namaObat: string;
    jumlahTotal: number;
};
const props = defineProps({
    isDialogVisible: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
    },
    obatToEdit: Object,
    index: {
        type: Number,
        default:null
    },
});

const schema =
    toTypedSchema(
        yup.object({
            namaRacikan: yup.string().required("Nama Racikan Harus diisi"),
            sirup: yup.bool(),
            jumlahEmbalase: yup.string().required("Jumlah Embalase Harus diisi"),
            satuanEmbalase: yup.string().required("Satuan Embalase Harus diisi"),
            periode: yup.string().required("Periode Harus diisi"),
            jumlahKonsumsi: yup.number().required("Jumlah Konsumsi Harus diisi"),
            satuanDosis: yup.string().required("Satuan Dosis Harus diisi"),
            aturanPakai: yup.string().required("Aturan Pakai Harus diisi"),
            caraPakai: yup.string().required("Cara Pakai Harus diisi"),
            rutePemberian: yup.string().required("Rute Pemberian Harus diisi"),
            obatKronis: yup.bool(),
            catatan: yup.string(),
            racikan: yup.bool().required("Racikan Harus diisi"),
            datas: yup.array().of(
                yup.object({
                    namaObat: yup.string().required('Nama Obat is required'),
                    jumlahTotal: yup.number(),
                })
            ).min(1, "Harus ada minimal 1 data obat"),
        })
    )


const { errors, handleSubmit, resetForm, defineField, setValues } = useForm({
    validationSchema: schema,
    initialValues: {
        namaRacikan: "",
        sirup: false,
        jumlahEmbalase: "1",
        satuanEmbalase: "",
        periode: "",
        jumlahKonsumsi: 1,
        satuanDosis: "",
        aturanPakai: "",
        caraPakai: "",
        rutePemberian: "",
        obatKronis: false,
        catatan: "",
        racikan: true,
        datas: [
            { namaObat: "Panadol", jumlahTotal: 1 },
        ]
    },
});


const [namaRacikan] = defineField('namaRacikan');
const [sirup] = defineField('sirup');
const [jumlahEmbalase] = defineField('jumlahEmbalase');
const [satuanEmbalase] = defineField('satuanEmbalase');
const [periode] = defineField('periode');
const [jumlahKonsumsi] = defineField('jumlahKonsumsi');
const [satuanDosis] = defineField('satuanDosis');
const [aturanPakai] = defineField('aturanPakai');
const [caraPakai] = defineField('caraPakai');
const [rutePemberian] = defineField('rutePemberian');
const [obatKronis] = defineField('obatKronis');
const [catatan] = defineField('catatan');
const [racikan] = defineField('racikan');


const emit = defineEmits(["update:isDialogVisible", "add-obat-racikan", "after-edit-obat-racikan"]);

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

const satuanEmbalases = ref([
    { id: 1, satuanEmbalase: "Kapsul" },
    { id: 2, satuanEmbalase: "Pil" },
    { id: 3, satuanEmbalase: "Tablet" },
    { id: 4, satuanEmbalase: "Botol" }
])
const { remove, push, fields } = useFieldArray<ObatRacikan>("datas");

const addObatRacikan = () => {
    push({
        namaObat: '',
        jumlahTotal: 0,
    })
};

// Submit pas nambah Racikan 
const onSubmit = handleSubmit((values) => {
    emit('add-obat-racikan', values); // Emit event dengan data obat baru
    console.log(values)
    resetForm(); // Reset form setelah submit
    emit('update:isDialogVisible', false); // Tutup dialog
});

// EDIT Racikan yang sudah ada
const afterEditObatRacikan = handleSubmit((values) => {
    const editedObat = { ...values };
    console.log(editedObat)
    emit('after-edit-obat-racikan', editedObat); 
    resetForm(); 
    emit('update:isDialogVisible', false); 
});


function updateVisibility(value: boolean) {
    emit("update:isDialogVisible", value);
    resetForm()
}

const obatData = ref({ ...props.obatToEdit });


watch(() => props.obatToEdit, (newVal: any) => {
    console.log("Updated obatToEdit:", newVal);
    obatData.value = { ...newVal };
    setValues(newVal);
});

watch(() => sirup.value, (newVal) => {
    if (newVal) {
        satuanEmbalase.value = 'Botol'; // Atur nilai default jika sirup aktif
    } else {
        satuanEmbalase.value = undefined
    }
});

</script>


<template>
    <CustomDialog width="1000px" class="" :visible="isDialogVisible" headerBg="bg-adameds-300"
        @update:visible="updateVisibility">
        <template #header>{{ title }}</template>
        <template #body>
            <!--  -->
            <div class="flex my-5 gap-7">
                <DetailPasien />
                <hr class="h-auto border border-adameds-300">
                <!-- {{ index }} -->
                <div class="grow">
                    <div class="flex items-center justify-between">
                        <div class="min-w-[280px]">
                            <CustomTextfield label="Nama Racikan" class="border-[#C7CBD2]"
                                placeholder="Masukkan Nama Racikan" v-model="namaRacikan"
                                :invalid="!!errors.namaRacikan" :invalidMessage="errors.namaRacikan" />
                        </div>
                        <CustomSwitch v-model="sirup" label="Sirup" />
                        <CustomButton label="Tambah Obat" showIcon icon-pos="left" icon="PhPlus" @click="addObatRacikan"
                            :invalid="!!errors.sirup" :invalidMessage="errors.sirup" />
                    </div>
                    <hr class="my-4 bg-grey-200 border-1">

                    <div class="flex flex-col gap-5  overflow-y-auto max-h-[400px] w-auto">
                        <!-- Atas -->
                        <div class="flex items-end justify-between gap-4" v-for="(field, index) in fields" :key="index">
                            <div class="min-w-[400px]">
                                <CustomSelect :label="`Nama Obat - ${index + 1}`" v-model="field.value.namaObat"
                                    :options="namaObats" optionValue="namaObat" optionLabel="namaObat"
                                    :invalid="!!errors[`datas[${index}].namaObats` as keyof typeof errors]"
                                    :invalidMessage="errors[`datas[${index}].namaObats` as keyof typeof errors]" :disabled="false" />
                            </div>
                            <div class="min-w-[130px]">
                                <CustomInputNumber label="Jumlah Total" v-model="field.value.jumlahTotal"
                                    :show-buttons="true" />
                            </div>
                            <div class="h-10 w-[45px] ">
                                <CustomButton label="" background-color="bg-danger-300 rounded-lg"
                                    class="h-10 w-[45px] p-0" @click="remove(index)" :disabled="index === 0">
                                    <img src="@/assets/icons/delete.svg" alt="" width="15px" />
                                </CustomButton>
                            </div>
                        </div>
                        <!-- Bawah -->
                        <hr class="bg-grey-200 border-1">
                    </div>

                    <div class="flex items-center justify-between gap-5 p-5 mt-5 rounded-lg bg-adameds-50">
                        <div class="font-semibold text-MD">Dibuat sebanyak (Embalase)</div>
                        <div class="max-w-[100px]">
                            <CustomTextfield label="" v-model="jumlahEmbalase" type="number"
                                :invalid="!!errors.jumlahEmbalase" :invalidMessage="errors.jumlahEmbalase" />
                        </div>
                        <div class="grow">
                            <CustomSelect label="" v-model="satuanEmbalase" :options="satuanEmbalases"
                                optionValue="satuanEmbalase" optionLabel="satuanEmbalase"
                                :invalid="!!errors.satuanEmbalase" :invalidMessage="errors.satuanEmbalase" :disabled="sirup"/>
                        </div>
                    </div>
                    <div class="pt-5">
                        <div class="flex flex-col gap-5">
                            <div class="flex gap-5">
                                <div class="w-1/4">
                                    <CustomSelect label="Periode" v-model="periode" :options="periodes"
                                        optionValue="periode" optionLabel="periode" :invalid="!!errors.periode"
                                        :invalidMessage="errors.periode" />
                                </div>
                                <div class="w-1/4">
                                    <CustomSelect label="Aturan Pakai" v-model="aturanPakai" :options="aturanPakais"
                                        optionValue="aturanPakai" optionLabel="aturanPakai"
                                        :invalid="!!errors.aturanPakai" :invalidMessage="errors.aturanPakai" />
                                </div>
                                <div class="w-1/3">
                                    <CustomInputNumber label="Jumlah Konsumsi" v-model="jumlahKonsumsi"
                                        :show-buttons="true" :invalid="!!errors.jumlahKonsumsi"
                                        :invalidMessage="errors.jumlahKonsumsi" />
                                </div>
                                <div class="w-1/4">
                                    <CustomSelect label="Satuan Dosis" v-model="satuanDosis" :options="satuanDosiss"
                                        optionValue="satuanDosis" optionLabel="satuanDosis"
                                        :invalid="!!errors.satuanDosis" :invalidMessage="errors.satuanDosis" />
                                </div>
                            </div>
                            <div class="flex gap-7">
                                <div class="w-1/2">
                                    <CustomSelect label="Cara Pakai" v-model="caraPakai" :options="caraPakais"
                                        optionValue="caraPakai" optionLabel="caraPakai" :invalid="!!errors.caraPakai"
                                        :invalidMessage="errors.caraPakai" />
                                </div>
                                <div class="w-1/2">
                                    <CustomSelect label="Rute Pemberian" v-model="rutePemberian"
                                        :options="rutePemberians" optionValue="rutePemberian"
                                        optionLabel="rutePemberian" :invalid="!!errors.rutePemberian"
                                        :invalidMessage="errors.rutePemberian" />
                                </div>
                            </div>
                            <div class="flex gap-7">
                                    <CustomSwitch label="Obat Kronis" v-model="obatKronis" />
                                    <!-- <div class="mt-2.5">{{ status === true ? "Aktif" : "Non-Aktif" }}</div> -->
                                <div class="grow">
                                    <CustomTextArea label="Catatan" placeholder="-" v-model="catatan" />
                                </div>
                            </div>
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
                        background-color="bg-transparent" text-color="text-grey-300" @click="resetForm">
                    </CustomButton>
                    <CustomButton label="SimpanTAMBAH" v-if="props.title === 'Tambah Obat Racikan'" @click="onSubmit"> </CustomButton>
                    <CustomButton label="SimpanEDIT" v-else @click="afterEditObatRacikan"> </CustomButton>
                </div>
            </div>
        </template>
    </CustomDialog>

</template>
