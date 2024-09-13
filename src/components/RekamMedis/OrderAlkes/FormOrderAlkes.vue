<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
const props = defineProps({
    method: {
        type: String,
        default: "form",
    },
});

const selectedLokasiTujuanOrder = ref("")
const listLokasiTujuanOrder = ref([
    { id: "1", label: "Farmasi Rawat Inap" },
    { id: "2", label: "Farmasi Rawat Jalan" },
]);


const satuanAlkes = ref([
    { id: "1", value: "Gulung" },
    { id: "2", value: "Kg" },
    { id: "2", value: "Kodi" }
])

const schema = toTypedSchema(
    yup.object({
        datas: yup.array().of(
            yup.object({
                listAlkes: yup.string().required("List tindakan harus diisi"),
                jumlah: yup.string(),
                satuan: yup.string(),
                sisaStok: yup.string(),
                petugas: yup.string(),
            })
        ),
    })
);

const { errors, handleSubmit, resetForm, setValues } = useForm({
    validationSchema: schema,

    initialValues: {
        datas: [{ listAlkes: "", jumlah: "", satuan: "", sisaStok: "", petugas: "" }],
    },
});

const { remove, push, fields } = useFieldArray("datas");

const myPushFunction = () => {
    push({ listAlkes: "", jumlah: "", satuan: "", sisaStok: "", petugas: "" });
};

const listAlkesOptions = ref([
    { id: "1", value: "Kasa" },
    { id: "2", value: "Tisu Basah" },
    { id: "3", value: "Tisu Kering" },
]);


const tambahAlkesMultipleDialog = ref(false);

const products = ref<any[]>([]);
onMounted(() => {
  products.value = [
    {
      nama: "Kasa",
      sisaStok: "2000",
    },
    {
      nama: "Perban",
      sisaStok: "2000",
    },
  ];
});

</script>
<template>
    <CustomAccordion headerClass="bg-adameds-50">
        <template #header>Order Alkes</template>
        <template #content>

            <div v-if="props.method == 'form'" class="flex flex-col gap-5 py-3">
                <CustomSelect prepend-icon="PhMagnifyingGlass" v-model="selectedLokasiTujuanOrder"
                    :options="listLokasiTujuanOrder" optionValue="label" optionLabel="label" label="Lokasi Tujuan Order"
                    place-holder="Pilih Lokasi Tujuan Order" class="w-1/3" />
                <DataTable :value="fields" tableStyle="min-width: 50rem"
                    class="overflow-hidden text-xs rounded-lg bg-adameds-50">
                    <Column headerClass="bg-adameds-50 font-semibold text-SM" class="w-[20px]">
                        <template #header>
                            <div class="flex items-center">No.</div>
                        </template>
                        <template #body="slotProps">
                            <div class="flex items-center justify-center ">
                                {{ slotProps.index + 1 }}
                            </div>
                        </template>
                    </Column>

                    <Column headerClass="bg-adameds-50" class="w-1/2">
                        <template #header>
                            <div class="font-semibold">List Alkes</div>
                        </template>
                        <template #body="slotProps">
                            <CustomSelect prepend-icon="PhMagnifyingGlass" v-model="slotProps.data.value.listAlkes"
                                :options="listAlkesOptions" optionValue="value" optionLabel="value" label=""
                                place-holder="Cari & Pilih Tindakan" />
                            <ErrorMessage :name="`datas[${slotProps.index}].jenisPembayaran`" class="text-danger-300" />
                        </template>
                    </Column>

                    <Column headerClass="bg-adameds-50 " class="w-[150px]">
                        <template #header>
                            <div class="w-full font-semibold text-center">Jumlah</div>
                        </template>
                        <template #body="slotProps">
                            <CustomInputNumber :show-label="false" v-model="slotProps.data.value.jumlah"
                                :show-buttons="true" />
                        </template>
                    </Column>
                    <Column headerClass="bg-adameds-50">
                        <template #header>
                            <div class="w-full font-semibold text-center">Satuan</div>
                        </template>
                        <template #body="slotProps">
                            <CustomSelect prepend-icon="PhMagnifyingGlass" v-model="slotProps.data.value.satuan"
                                :options="satuanAlkes" optionValue="value" optionLabel="value" label=""
                                place-holder="Pilih Satuan" />

                        </template>
                    </Column>
                    <Column headerClass="bg-adameds-50">
                        <template #header>
                            <div class="w-full font-semibold text-center">Sisa Stok</div>
                        </template>
                        <template #body="slotProps">
                            <div class="text-center"> 2000</div>


                        </template>
                    </Column>

                    <Column headerClass="bg-adameds-50">
                        <template #header>
                            <div class="w-full font-semibold text-center">Action</div>
                        </template>
                        <template #body="slotProps">
                            <div class="flex items-center justify-center">
                                <CustomButton label="" background-color="bg-danger-300 rounded-lg"
                                    @click="remove(slotProps.index)">
                                    <img src="@/assets/icons/delete.svg" alt="" width="15px" />
                                </CustomButton>
                            </div>
                        </template>
                    </Column>
                </DataTable>
                <div
                    class="flex items-center justify-center p-5 m-5 border border-dashed rounded-lg border-adameds-300 gap-2.5">
                    <CustomButton icon="PhPlus" label="Tambah Alkes" borderColor="border-adameds-300"
                        textColor="text-adameds-300" backgroundColor="bg-white" @click="myPushFunction" />
                    <CustomButton icon="PhPlus" label="Tambah Alkes Multiple" borderColor="border-adameds-300"
                        textColor="text-adameds-300" backgroundColor="bg-white"
                        @click="tambahAlkesMultipleDialog = true" />
                </div>
                <CustomDialog width="800px" class="" v-model:visible="tambahAlkesMultipleDialog" headerBg="bg-adameds-300">
                    <template #header> Tambah Tindakan Multiple </template>
                    <template #body>
                        <div class="flex flex-col gap-5 mt-5">
                            <div class="flex items-end w-full gap-5">
                                <CustomSelect prepend-icon="PhMagnifyingGlass" label="Cari Item"
                                    place-holder="Kasa" class="grow" />
                                <CustomButton>
                                    <PhPlus :size="16" />
                                </CustomButton>
                            </div>
                            <DataTable :value="products" tableStyle="min-width: 40rem" stripedRows class="text-xs"
                                scrollable scrollHeight="flex">
                                <Column headerClass="bg-adameds-50">
                                    <template #header>
                                        <div class="w-full font-semibold text-center">No.</div>
                                    </template>
                                    <template #body="slotProps">
                                        <div class="flex items-center justify-center">
                                            {{ slotProps.index + 1 }}
                                        </div>
                                    </template>
                                </Column>
                                <Column field="nama" header="Nama Obat" headerClass="bg-adameds-50" class="w-3/5 "></Column>
                                <Column field="sisaStok" header="Sisa Stok" headerClass="bg-adameds-50 text-center"></Column>
                                <Column headerClass="bg-adameds-50">
                                    <template #header>
                                        <div class="flex items-center justify-center w-full font-semibold text-SM">
                                            Action
                                        </div>
                                    </template>
                                    <template #body="slotProps">
                                        <div class="flex items-center gap-2.5 justify-center">
                                            <CustomButton label="" background-color="bg-danger-300 rounded-lg"
                                                class="h-6 w-[26px] p-0">
                                                <img src="@/assets/icons/delete.svg" alt="" />
                                            </CustomButton>
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                            <hr class="border-grey-200" />
                            <div class="font-semibold text-MD">Total Item Terpilih : 2</div>
                        </div>
                    </template>
                    <template #footer>
                        <div class="w-full">
                            <hr class="-mx-5 border-grey-200" />
                            <div class="mt-5 flex justify-end gap-2.5">
                                <CustomButton label="Hapus Semua" border-color=" border-2 border-danger-300" background-color="bg-white"
                                    text-color="text-danger-300">
                                </CustomButton>
                                <CustomButton label="Ambil Item"> </CustomButton>
                            </div>
                        </div>
                    </template>
                </CustomDialog>
            </div>

            <div v-if="props.method == 'detail'" class="py-5 flex flex-col gap-[19px]">
                <CustomInfoRow label="List Tindakan" value="Pemeriksaan Dokter Spesialis" />
                <CustomInfoRow label="jumlah" value="Rp. 100,000" />
                <CustomInfoRow label="satuan" value="1" />
                <CustomInfoRow label="Petugas" value="dr. Spesialis Sp. M" />
                <hr class="border-grey-200" />
                <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
            </div>
        </template>
        <template #footer>
            <div class="flex items-end justify-end gap-3">
                <CustomButton v-if="props.method == 'form'" label="Reset" textColor="text-[#9DA4B1]"
                    backgroundColor="bg-transparent" borderColor="border-2 border-[#9DA4B1]" />
                <CustomButton v-if="props.method == 'form'" label="Simpan Order" />
                <CustomButton v-if="props.method == 'detail'" label="Edit" />
            </div>
        </template>
    </CustomAccordion>
</template>
