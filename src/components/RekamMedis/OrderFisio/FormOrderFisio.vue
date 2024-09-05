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

const schema = toTypedSchema(
    yup.object({
        datas: yup.array().of(
            yup.object({
                listTindakan: yup.string().required("List tindakan harus diisi"),
                harga: yup.string(),
                jumlah: yup.string(),
                petugas: yup.string(),
            })
        ),
    })
);

const { errors, handleSubmit, resetForm, setValues } = useForm({
    validationSchema: schema,

    initialValues: {
        datas: [{ listTindakan: "", harga: "", jumlah: "", petugas: "" }],
    },
});

const { remove, push, fields } = useFieldArray("datas");

const myPushFunction = () => {
    push({ listTindakan: "", harga: "", jumlah: "", petugas: "" });
};

const listTindakanOptions = ref([
    { label: "Fisio 1", value: "spesialis" },
    { label: "Kurang Tau", value: "biasa" },
]);


const tambahTindakan = ref(false);


const dateFilter = ref<Date>(new Date())
</script>
<template>
    <CustomAccordion headerClass="bg-adameds-50">
        <template #header>Order Fisio</template>
        <template #content>
            <div v-if="props.method == 'form'" class="pt-5">
                <CustomDatePicker label="Tgl. Pemeriksaan Fisio" class="w-1/4 mb-5" v-model="dateFilter"/>
                <DataTable :value="fields" tableStyle="min-width: 50rem" class="overflow-hidden text-xs rounded-lg bg-adameds-50">
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

                    <Column headerClass="bg-adameds-50" class="w-3/5">
                        <template #header>
                            <div class="font-semibold">List Tindakan</div>
                        </template>
                        <template #body="slotProps">
                            <CustomSelect prepend-icon="PhMagnifyingGlass" v-model="slotProps.data.value.listTindakan"
                                :options="listTindakanOptions" optionValue="value" optionLabel="label" label=""
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
                            <div class="w-full font-semibold text-center">Harga</div>
                        </template>
                        <template #body="slotProps">
                            <CustomInputNumber class="" label="">
                                <template #prependText>
                                    <div
                                        class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md">
                                        Rp.
                                    </div>
                                </template>
                            </CustomInputNumber>

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
                    <CustomButton icon="PhPlus" label="Tambah Tindakan" borderColor="border-adameds-300"
                        textColor="text-adameds-300" backgroundColor="bg-white" @click="myPushFunction" />
                </div>
            </div>
            <div v-if="props.method == 'detail'" class="py-5 flex flex-col gap-[19px]">
                <CustomInfoRow label="List Tindakan" value="Pemeriksaan Dokter Spesialis" />
                <CustomInfoRow label="Harga" value="Rp. 100,000" />
                <CustomInfoRow label="Jumlah" value="1" />
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
