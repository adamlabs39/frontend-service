<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch } from 'vue';
import CustomDialog from '@/components/Base/CustomDialog.vue';
import DetailPasien from './DetailPasien.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomTextArea from '@/components/Base/CustomTextArea.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
import CustomInputNumber from '@/components/Base/CustomInputNumber.vue';
import CustomSwitch from '@/components/Base/CustomSwitch.vue';
import { useFieldArray, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

// Menerapkan props yang sama dengan DialogTambahObat.vue
const props = defineProps({
    isDialogVisible: {
        default: false,
    },
    method: {
        type: String,
    },
    obatToEdit: Object,
    index: {
        type: Number,
        default:null
    },
});

const emit = defineEmits(["update:isDialogVisible", "update-obat"]);

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

// function closeDialog() {
//     emit('close');  
// }

function updateVisibility(value: boolean) {
    emit("update:isDialogVisible", value);
}
const obatData = ref({ ...props.obatToEdit });



watch(() => props.obatToEdit, (newVal: any) => {
    console.log("Updated obatToEdit:", newVal);
    obatData.value = { ...newVal };
    setValues(newVal);
});


const schema = toTypedSchema(
    yup.object({
        namaObat: yup.string(),
        jumlahTotal: yup.number(),
        periode: yup.string(),
        jumlahKonsumsi: yup.number(),
        satuanDosis: yup.string(),
        aturanPakai: yup.string(),
        caraPakai: yup.string(),
        rutePemberian: yup.string(),
        obatKronis: yup.bool(),
        catatan: yup.string()
    })
);

const { handleSubmit, resetForm, defineField, setValues } = useForm({
    validationSchema: schema,
    initialValues: props.obatToEdit
});

const [namaObat] = defineField("namaObat");
const [jumlahTotal] = defineField("jumlahTotal");
const [periode] = defineField("periode");
const [jumlahKonsumsi] = defineField("jumlahKonsumsi");
const [satuanDosis] = defineField("satuanDosis");
const [aturanPakai] = defineField("aturanPakai");
const [caraPakai] = defineField("caraPakai");
const [rutePemberian] = defineField("rutePemberian");
const [obatKronis] = defineField("obatKronis");
const [catatan] = defineField("catatan");

// const { fields, update } = useFieldArray("datas")

const onSubmit = handleSubmit((values) => {
    const updatedObat = { ...values };
    emit('update-obat', updatedObat); // Pastikan `edit-obat` adalah nama event yang sesuai
    resetForm(); 
    emit('update:isDialogVisible', false); 
});

</script>

<template>
    <CustomDialog width="1000px" :visible="isDialogVisible" headerBg="bg-adameds-300"
        @update:visible="updateVisibility">
        <template #header>Edit Obat</template>
        <template #body>
            <div class="flex my-5 gap-7">
                <DetailPasien />
                <hr class="min-h-[440px] border border-adameds-300">
                <div class="grow">
                    <Card pt:body:class="h-full p-0 overflow-auto" pt:content:class="h-full overflow-auto"
                        pt:root:class="shadow shadow-inherit">
                        <template #header>
                            <div class="flex items-center">
                                <div class="font-semibold text-MD">Obat  {{ index + 1 }}</div>
                                <!-- {{ namaObat }} {{ jumlahKonsumsi }} {{ periode }} -->
                            </div>
                            <hr class="my-4 bg-grey-200 border-1">
                        </template>
                        <template #content>
                            <div class="">
                                <div class="flex flex-col gap-5">
                                    <div class="flex gap-7">
                                        <div class="min-w-[420px]">
                                            <CustomSelect label="Nama Obat" v-model="namaObat" :options="namaObats"
                                                optionValue="namaObat" optionLabel="namaObat" />
                                        </div>
                                        <div class="grow">
                                            <CustomInputNumber label="Jumlah Total" :show-buttons="true"
                                                v-model="jumlahTotal" />
                                        </div>
                                    </div>

                                    <div class="flex gap-5">
                                        <div class="w-1/4">
                                            <CustomSelect label="Periode" v-model="periode" :options="periodes"
                                                optionValue="periode" optionLabel="periode" />
                                        </div>
                                        <div class="w-1/4">
                                            <CustomSelect label="Aturan Pakai" v-model="aturanPakai"
                                                :options="aturanPakais" optionValue="aturanPakai"
                                                optionLabel="aturanPakai" />
                                        </div>
                                        <div class="w-1/3">
                                            <CustomInputNumber label="Jumlah Konsumsi" :show-buttons="true"
                                                v-model="jumlahKonsumsi" />
                                        </div>
                                        <div class="w-1/4">
                                            <CustomSelect label="Satuan Dosis" v-model="satuanDosis"
                                                :options="satuanDosiss" optionValue="satuanDosis"
                                                optionLabel="satuanDosis" />
                                        </div>
                                    </div>
                                    <div class="flex gap-7">
                                        <div class="w-1/2">
                                            <CustomSelect label="Cara Pakai" v-model="caraPakai" :options="caraPakais"
                                                optionValue="caraPakai" optionLabel="caraPakai" />
                                        </div>
                                        <div class="w-1/2">
                                            <CustomSelect label="Rute Pemberian" v-model="rutePemberian"
                                                :options="rutePemberians" optionValue="rutePemberian"
                                                optionLabel="rutePemberian" />
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
                        </template>
                    </Card>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="w-full">
                <hr class="-mx-5 border-grey-200" />
                <div class="mt-5 flex justify-end gap-2.5">
                    <CustomButton label="Reset" borderColor="border-2 border-[#9DA4B1]"
                        background-color="bg-transparent" text-color="text-grey-300" />
                    <CustomButton label="Simpan" @click="onSubmit" />
                </div>
            </div>
        </template>
    </CustomDialog>
</template>
