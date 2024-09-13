<script lang="ts" setup>
import CustomAccordion from '@/components/Base/CustomAccordion.vue';

import DataTable from 'primevue/datatable';
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { ref } from 'vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
import { onMounted } from 'vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import Card from 'primevue/card';
import CustomDialog from '@/components/Base/CustomDialog.vue';
import Coba from './Coba.vue';
import CustomInputNumber from '@/components/Base/CustomInputNumber.vue';
import CustomTextArea from '@/components/Base/CustomTextArea.vue';
import CustomSwitch from '@/components/Base/CustomSwitch.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';

const props = defineProps({
    method: {
        type: String,
        default: "form",
    },
});
const orderObatschema = toTypedSchema(
    yup.object({
        datas: yup.array().of(
            yup.object({
                namaObat: yup.string().required("Nama Obat harus diisi"),
                dosis: yup.string(),
                aturaiPakai: yup.string(),
                caraPakai: yup.string(),
                rutePemberian: yup.string()
            })
        ),
    })
);

const { errors, handleSubmit, resetForm, setValues } = useForm({
    validationSchema: orderObatschema,

    initialValues: {
        datas: [{ namaObat: "", dosis: "", aturaiPakai: "", caraPakai: "", rutePemberian: "" }],
    },
});

const { remove, push, fields } = useFieldArray("datas");

const addObat = () => {
    push({ namaObat: "", dosis: "", aturaiPakai: "", caraPakai: "", rutePemberian: "" });
};

const selectedLokasiTujuanOrder = ref("")
const listLokasiTujuanOrder = ref([
    { id: "1", label: "Farmasi Rawat Jalan" },
    { id: "2", label: "Farmasi Rawat Inap" },
]);


onMounted(() => {
    // Mengatur nilai awal dari form
    setValues({
        datas: [
            {
                namaObat: "Sanmol-Botol",
                dosis: "1 Sendok Makan",
                aturaiPakai: "3x Sehari",
                caraPakai: "Setelah Makan",
                rutePemberian: "Oral"
            },
            {
                namaObat: "Sanmol-Botol",
                dosis: "1 Sendok Makan",
                aturaiPakai: "3x Sehari",
                caraPakai: "Setelah Makan",
                rutePemberian: "Oral"
            },
            {
                namaObat: "Sanmol-Botol",
                dosis: "1 Sendok Makan",
                aturaiPakai: "3x Sehari",
                caraPakai: "Setelah Makan",
                rutePemberian: "Oral"
            }
        ]
    });
});


const selectedObatIndex = ref(0); // State for tracking edited item index
const obatToEdit = ref(); // Store obat data to be edited

const editObat = (index: number) => {
    isEditObat.value = true;
    selectedObatIndex.value = index;
    obatToEdit.value = fields.value[index]; // Assign the selected obat for editing
};

const saveObat = () => {
    fields.value[selectedObatIndex.value] = obatToEdit.value; // Update the obat data
    isEditObat.value = false;
};

const deleteObat = (index: number) => {
    console.log("HAPUS")
        remove(index); 
};
const tambahObatDialog = ref(false);
const tambahObatRacikanDialog = ref(false);
const isEditObat = ref(false);

const jumlahTotal = ref(0);
const jumlahKonsumsi = ref(0);

const isSirup = ref();

</script>

<template>
    <CustomAccordion headerClass="bg-adameds-50">
        <template #header>Order Obat</template>
        <template #content>
            <div class="flex flex-col gap-5 py-3">
                <CustomSelect prepend-icon="PhMagnifyingGlass" v-model="selectedLokasiTujuanOrder"
                    :options="listLokasiTujuanOrder" optionValue="label" optionLabel="label" label="Lokasi Tujuan Order"
                    place-holder="Pilih Lokasi Tujuan Order" class="w-1/3" />

                <DataTable :value="fields" class="text-xs bg-adameds-50 ">
                    <Column headerClass="bg-adameds-50 font-semibold text-SM" class="max-w-[60px] ">
                        <template #header>
                            <div class="flex items-center">No.</div>
                        </template>
                        <template #body="slotProps">
                            <div class="flex items-center justify-center">
                                {{ slotProps.index + 1 }}
                            </div>
                        </template>
                    </Column>

                    <Column headerClass="bg-adameds-50" class="min-w-[150px] text-center">
                        <template #header>
                            <div class="w-full font-semibold text-center">Nama Obat</div>
                        </template>
                        <template #body="slotProps">
                            {{ slotProps.data.value.namaObat }}
                        </template>
                    </Column>

                    <Column headerClass="bg-adameds-50" class="min-w-[240px] text-center">
                        <template #header>
                            <div class="w-full font-semibold text-center">Dosis</div>
                        </template>
                        <template #body="slotProps">
                            {{ slotProps.data.value.dosis }}
                        </template>
                    </Column>

                    <Column headerClass="bg-adameds-50" class="min-w-[240px] text-center">
                        <template #header>
                            <div class="w-full font-semibold text-center ">Aturan Pakai</div>
                        </template>
                        <template #body="slotProps">
                            {{ slotProps.data.value.aturaiPakai }}
                        </template>
                    </Column>

                    <Column headerClass="bg-adameds-50" class="min-w-[210px] text-center">
                        <template #header>
                            <div class="w-full font-semibold text-center">Cara Pakai</div>
                        </template>
                        <template #body="slotProps">
                            {{ slotProps.data.value.caraPakai }}
                        </template>
                    </Column>
                    <Column headerClass="bg-adameds-50" class="min-w-[200px] text-center">
                        <template #header>
                            <div class="w-full font-semibold text-center">Rute Pemberian</div>
                        </template>
                        <template #body="slotProps">
                            {{ slotProps.data.value.rutePemberian }}
                        </template>
                    </Column>

                    <Column headerClass="bg-adameds-50" class="min-w-[200px] flex justify-center">
                        <template #header>
                            <div class="w-full font-semibold text-center">Status</div>
                        </template>
                        <template #body="slotProps">
                            <div class="flex gap-2.5">
                                <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg"
                                    class="h-6 w-[26px] p-0" @click="editObat(slotProps.index)">
                                    <img src="@/assets/icons/edit.svg" alt="" />
                                </CustomButton>
                                <CustomButton label="" background-color="bg-danger-300 rounded-lg"
                                    class="h-6 w-[26px] p-0">
                                    <img src="@/assets/icons/delete.svg" @click="deleteObat(slotProps.index)" alt="" />
                                </CustomButton>
                            </div>

                        </template>
                    </Column>
                </DataTable>
                <CustomDialog v-model:visible="isEditObat" width="1000px" headerBg="bg-adameds-300">
                    <template #header>Edit Obat</template>
                    <template #body>
                        <!--  -->
                        <div class="flex my-5 gap-7">
                            <div class="flex flex-col gap-5 min-w-[280px]">
                                <div class="flex justify-between">
                                    <div class="flex flex-col gap-1">
                                        <div class="font-semibold underline text-XS">Jenis Kelamin</div>
                                        <div
                                            class="text-center px-2.5 font-semibold text-male-300 bg-male-75 rounded-[50px] text-XS">
                                            Laki-laki
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-start gap-1">
                                        <div class="w-full font-semibold underline text-XS">Tanggal Lahir</div>
                                        <div class="flex items-center">
                                            <div class="font-normal text-SM">01-01-2000</div>
                                            <div class="mx-2 font-normal text-black text-SM">|</div>
                                            <div class="font-bold text-adameds-300 text-SM">24Th 0Bl 1Hr</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Kotak Kedua -->
                                <div>
                                    <Coba />
                                </div>
                                <!-- Kotak Ketiga -->
                                <div class="rounded-md bg-adameds-50 px-2.5 py-2 flex flex-col gap-2">
                                    <div class="flex flex-col gap-1">
                                        <div class="font-semibold text-XS">Keluhan</div>
                                        <div class="font-normal bg-white text-SM rounded-[4px] px-1">Sakit</div>
                                    </div>
                                    <div class="flex flex-col gap-1">
                                        <div class="font-semibold text-XS">Diagnosa Primer</div>
                                        <div class="font-normal bg-white text-SM rounded-[4px] px-1">G12.1 - OTHER
                                            INHERITED
                                            SPINAL MUSCULAR ATROPHY</div>
                                    </div>
                                </div>
                            </div>
                            <hr class="min-h-[440px] border border-gray-300">
                            <div class="grow">
                                <Card pt:body:class="h-full p-0 overflow-auto" pt:content:class="h-full overflow-auto"
                                    pt:root:class="shadow shadow-inherit">
                                    <template #header>
                                        <div class="flex items-center">
                                            <div class="font-semibold text-MD">Obat 1</div>
                                        </div>
                                        <hr class="my-4 bg-grey-200 border-1">
                                    </template>
                                    <template #content>
                                        <div class="px-5 py-2.5">
                                            <div class="flex flex-col gap-5">
                                                <div class="flex gap-7">
                                                    <div class="min-w-[420px]">
                                                        <CustomSelect label="Nama Obat" />
                                                    </div>
                                                    <div class="grow">
                                                        <CustomInputNumber label="Jumlah Total" v-model="jumlahTotal"
                                                            :show-buttons="true" />
                                                    </div>
                                                </div>

                                                <div class="flex gap-5">
                                                    <div class="w-1/4">
                                                        <CustomSelect label="Periode" />
                                                    </div>
                                                    <div class="w-1/4">
                                                        <CustomSelect label="Aturan Pakai" />
                                                    </div>
                                                    <div class="w-1/3">
                                                        <CustomInputNumber label="Jumlah Konsumsi"
                                                            v-model="jumlahKonsumsi" :show-buttons="true" />
                                                    </div>
                                                    <div class="w-1/4">
                                                        <CustomSelect label="Satuan Dosis" />
                                                    </div>
                                                </div>
                                                <div class="flex gap-7">
                                                    <div class="w-1/2">
                                                        <CustomSelect label="Cara Pakai" />
                                                    </div>
                                                    <div class="w-1/2">
                                                        <CustomSelect label="Rute Pemberian" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <CustomTextArea label="Catatan" placeholder="-" />
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
                                <CustomButton label="Reset" b borderColor="border-2 border-[#9DA4B1]"
                                    background-color="bg-transparent" text-color="text-grey-300">
                                </CustomButton>
                                <CustomButton label="Simpan"> </CustomButton>
                            </div>
                        </div>
                    </template>
                </CustomDialog>
            </div>
            <div
                class="flex items-center justify-center p-5 my-7 border border-dashed rounded-lg border-adameds-300 gap-2.5">
                <CustomButton icon="PhPlus" label="Tambah Obat" borderColor="border-adameds-300"
                    textColor="text-adameds-300" backgroundColor="bg-white" @click="tambahObatDialog = true" />
                <CustomButton icon="PhPlus" label="Tambah Obat Racikan" borderColor="border-adameds-300"
                    textColor="text-adameds-300" backgroundColor="bg-white" @click="tambahObatRacikanDialog = true" />
            </div>
            <CustomDialog width="1000px" class="" v-model:visible="tambahObatDialog" headerBg="bg-adameds-300">
                <template #header>Tambah Obat</template>
                <template #body>
                    <!--  -->
                    <div class="flex my-5 gap-7">
                        <div class="flex flex-col gap-5 min-w-[280px]">
                            <div class="flex justify-between">
                                <div class="flex flex-col gap-1">
                                    <div class="font-semibold underline text-XS">Jenis Kelamin</div>
                                    <div
                                        class="text-center px-2.5 font-semibold text-male-300 bg-male-75 rounded-[50px] text-XS">
                                        Laki-laki
                                    </div>
                                </div>
                                <div class="flex flex-col items-start gap-1">
                                    <div class="w-full font-semibold underline text-XS">Tanggal Lahir</div>
                                    <div class="flex items-center">
                                        <div class="font-normal text-SM">01-01-2000</div>
                                        <div class="mx-2 font-normal text-black text-SM">|</div>
                                        <div class="font-bold text-adameds-300 text-SM">24Th 0Bl 1Hr</div>
                                    </div>
                                </div>
                            </div>
                            <!-- Kotak Kedua -->
                            <div>
                                <Coba />
                            </div>
                            <!-- Kotak Ketiga -->
                            <div class="rounded-md bg-adameds-50 px-2.5 py-2 flex flex-col gap-2">
                                <div class="flex flex-col gap-1">
                                    <div class="font-semibold text-XS">Keluhan</div>
                                    <div class="font-normal bg-white text-SM rounded-[4px] px-1">Sakit</div>
                                </div>
                                <div class="flex flex-col gap-1">
                                    <div class="font-semibold text-XS">Diagnosa Primer</div>
                                    <div class="font-normal bg-white text-SM rounded-[4px] px-1">G12.1 - OTHER INHERITED
                                        SPINAL MUSCULAR ATROPHY</div>
                                </div>
                            </div>
                        </div>
                        <hr class="min-h-[580px] border border-gray-300">
                        <div class="grow">
                            <Card pt:body:class="h-full p-0 overflow-auto" pt:content:class="h-full overflow-auto"
                                pt:root:class="shadow shadow-inherit">
                                <template #header>
                                    <div class="flex items-center justify-between">
                                        <div class="font-semibold text-MD">Total Obat Terpilih : 2</div>
                                        <CustomButton label="Tambah Obat" showIcon icon-pos="left" icon="PhPlus" />
                                    </div>
                                    <hr class="my-4 bg-grey-200 border-1">
                                </template>
                                <template #content>
                                    <div class="flex flex-col gap-3">
                                        <CustomAccordion headerClass="bg-adameds-50">
                                            <template #header>Obat 1</template>
                                        </CustomAccordion>
                                        <CustomAccordion headerClass="bg-adameds-50">
                                            <template #header>Obat 2</template>
                                            <template #content>
                                                <div class="my-5">
                                                    <div class="flex flex-col gap-5">
                                                        <div class="flex gap-7">
                                                            <div class="min-w-[420px]">
                                                                <CustomSelect label="Nama Obat" />
                                                            </div>
                                                            <div class="grow">
                                                                <CustomInputNumber label="Jumlah Total"
                                                                    v-model="jumlahTotal" :show-buttons="true" />
                                                            </div>
                                                        </div>

                                                        <div class="flex gap-5">
                                                            <div class="w-1/4">
                                                                <CustomSelect label="Periode" />
                                                            </div>
                                                            <div class="w-1/4">
                                                                <CustomSelect label="Aturan Pakai" />
                                                            </div>
                                                            <div class="w-1/3">
                                                                <CustomInputNumber label="Jumlah Konsumsi"
                                                                    v-model="jumlahKonsumsi" :show-buttons="true" />
                                                            </div>
                                                            <div class="w-1/4">
                                                                <CustomSelect label="Satuan Dosis" />
                                                            </div>
                                                        </div>
                                                        <div class="flex gap-7">
                                                            <div class="w-1/2">
                                                                <CustomSelect label="Cara Pakai" />
                                                            </div>
                                                            <div class="w-1/2">
                                                                <CustomSelect label="Rute Pemberian" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div>
                                                                <CustomTextArea label="Catatan" placeholder="-" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                        </CustomAccordion>
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
                            <CustomButton label="Reset" b borderColor="border-2 border-[#9DA4B1]"
                                background-color="bg-transparent" text-color="text-grey-300">
                            </CustomButton>
                            <CustomButton label="Simpan"> </CustomButton>
                        </div>
                    </div>
                </template>
            </CustomDialog>

            <CustomDialog width="1000px" class="" v-model:visible="tambahObatRacikanDialog" headerBg="bg-adameds-300">
                <template #header>Tambah Obat Racikan</template>
                <template #body>
                    <!--  -->
                    <div class="flex my-5 gap-7">
                        <div class="flex flex-col gap-5 min-w-[280px]">
                            <div class="flex justify-between">
                                <div class="flex flex-col gap-1">
                                    <div class="font-semibold underline text-XS">Jenis Kelamin</div>
                                    <div
                                        class="text-center px-2.5 font-semibold text-male-300 bg-male-75 rounded-[50px] text-XS">
                                        Laki-laki
                                    </div>
                                </div>
                                <div class="flex flex-col items-start gap-1">
                                    <div class="w-full font-semibold underline text-XS">Tanggal Lahir</div>
                                    <div class="flex items-center">
                                        <div class="font-normal text-SM">01-01-2000</div>
                                        <div class="mx-2 font-normal text-black text-SM">|</div>
                                        <div class="font-bold text-adameds-300 text-SM">24Th 0Bl 1Hr</div>
                                    </div>
                                </div>
                            </div>
                            <!-- Kotak Kedua -->
                            <div>
                                <Coba />
                            </div>
                            <!-- Kotak Ketiga -->
                            <div class="rounded-md bg-adameds-50 px-2.5 py-2 flex flex-col gap-2">
                                <div class="flex flex-col gap-1">
                                    <div class="font-semibold text-XS">Keluhan</div>
                                    <div class="font-normal bg-white text-SM rounded-[4px] px-1">Sakit</div>
                                </div>
                                <div class="flex flex-col gap-1">
                                    <div class="font-semibold text-XS">Diagnosa Primer</div>
                                    <div class="font-normal bg-white text-SM rounded-[4px] px-1">G12.1 - OTHER INHERITED
                                        SPINAL MUSCULAR ATROPHY</div>
                                </div>
                            </div>
                        </div>
                        <hr class="min-h-[580px] border border-gray-300">
                        <div class="grow">
                            <Card pt:body:class="h-full p-0 overflow-auto" pt:content:class="h-full overflow-auto"
                                pt:root:class="shadow shadow-inherit">
                                <template #header>
                                    <div class="flex items-center justify-between">
                                        <div class="min-w-[280px]">
                                            <CustomTextfield label="Nama Racikan" class="border-[#C7CBD2]"
                                                placeholder="Masukkan Nama Racikan" />
                                        </div>
                                        <CustomSwitch v-model="isSirup" label="Sirup" />
                                        <CustomButton label="Tambah Obat" showIcon icon-pos="left" icon="PhPlus" />
                                    </div>
                                    <hr class="my-4 bg-grey-200 border-1">
                                </template>
                                <template #content>
                                    <div class="flex flex-col gap-5">
                                        <!-- Atas -->
                                        <div class="flex items-end justify-between gap-4">
                                            <div class="min-w-[400px]">
                                                <CustomSelect label="Nama Obat - 1" />
                                            </div>
                                            <div class="min-w-[130px]">
                                                <CustomInputNumber label="Jumlah Total" v-model="jumlahTotal"
                                                    :show-buttons="true" />
                                            </div>
                                            <div class="h-10 w-[45px] ">
                                                <CustomButton label="" background-color="bg-danger-300 rounded-lg"
                                                    class="h-10 w-[45px] p-0">
                                                    <img src="@/assets/icons/delete.svg" alt="" width="15px" />
                                                </CustomButton>
                                            </div>
                                        </div>
                                        <!-- Bawah -->
                                        <div class="flex items-end justify-between gap-4">
                                            <div class="min-w-[400px]">
                                                <CustomSelect label="Nama Obat - 2" />
                                            </div>
                                            <div class="min-w-[130px]">
                                                <CustomInputNumber label="Jumlah Total" v-model="jumlahTotal"
                                                    :show-buttons="true" />
                                            </div>
                                            <div class="h-10 w-[45px] ">
                                                <CustomButton label="" background-color="bg-danger-300 rounded-lg"
                                                    class="h-10 w-[45px] p-0">
                                                    <img src="@/assets/icons/delete.svg" alt="" width="15px" />
                                                </CustomButton>
                                            </div>
                                        </div>
                                        <hr class="bg-grey-200 border-1">
                                    </div>
                                    <div
                                        class="flex items-center justify-between gap-5 p-5 mt-5 rounded-lg bg-adameds-50">
                                        <div class="font-semibold text-MD">Dibuat sebanyak (Embalase)</div>
                                        <div class="max-w-[100px]">
                                            <CustomTextfield label="" type="number" />
                                        </div>
                                        <div class="grow">
                                            <CustomSelect label="" />
                                        </div>
                                    </div>
                                    <div class="my-5">
                                        <div class="flex flex-col gap-5">
                                            <div class="flex gap-5">
                                                <div class="w-1/4">
                                                    <CustomSelect label="Periode" />
                                                </div>
                                                <div class="w-1/4">
                                                    <CustomSelect label="Aturan Pakai" />
                                                </div>
                                                <div class="w-1/3">
                                                    <CustomInputNumber label="Jumlah Konsumsi" v-model="jumlahKonsumsi"
                                                        :show-buttons="true" />
                                                </div>
                                                <div class="w-1/4">
                                                    <CustomSelect label="Satuan Dosis" />
                                                </div>
                                            </div>
                                            <div class="flex gap-7">
                                                <div class="w-1/2">
                                                    <CustomSelect label="Cara Pakai" />
                                                </div>
                                                <div class="w-1/2">
                                                    <CustomSelect label="Rute Pemberian" />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <CustomTextArea label="Catatan" placeholder="-" />
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
                            <CustomButton label="Reset" b borderColor="border-2 border-[#9DA4B1]"
                                background-color="bg-transparent" text-color="text-grey-300">
                            </CustomButton>
                            <CustomButton label="Simpan"> </CustomButton>
                        </div>
                    </div>
                </template>
            </CustomDialog>
        </template>
        <template #footer>
            <div class="flex items-end justify-end gap-3">
                <CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                    borderColor="border-2 border-[#9DA4B1]" />
                <CustomButton label="Simpan" />
            </div>
        </template>
    </CustomAccordion>
</template>
