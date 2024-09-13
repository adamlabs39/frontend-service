<script setup lang="ts">
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomDatePicker from '@/components/Base/CustomDatePicker.vue';
import CustomDragDrop from '@/components/Base/CustomDragDrop.vue';
import CustomRadio from '@/components/Base/CustomRadio.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
import CustomTextArea from '@/components/Base/CustomTextArea.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';
import fileTerunggah from '@/assets/images/RekamMedis/UnggahBerkas/fileTerunggah.svg'
import RONTGENT from '@/assets/images/RekamMedis/UnggahBerkas/RONTGENT.svg'
import EKG from '@/assets/images/RekamMedis/UnggahBerkas/EKG.svg'
import GatalPadaKulit from '@/assets/images/RekamMedis/UnggahBerkas/Gatal Pada Kulit.svg'
import NamaFile from '@/assets/images/RekamMedis/UnggahBerkas/Nama File.svg'
import { onMounted, ref } from 'vue';
import CustomUpload from '@/components/Base/CustomUpload.vue';
import { computed } from 'vue';
import DataTable from 'primevue/datatable';
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const props = defineProps({
    method: {
        type: String,
        default: "form",
    },
    clickIcon: {
        type: String,
        default: "list"
    }

});

const schema = toTypedSchema(
    yup.object({
        datas: yup.array().of(
            yup.object({
                namaFile: yup.string().required("List tindakan harus diisi"),
                tipeFile: yup.string(),
                tanggalUpload: yup.string(),
                petugas: yup.string(),
            })
        ),
    })
);

const { errors, handleSubmit, resetForm, setValues } = useForm({
    validationSchema: schema,

    initialValues: {
        datas: [{ namaFile: "", tipeFile: "", tanggalUpload: "", petugas: "" }],
    },
});

const { remove, push, fields } = useFieldArray("datas");

const myPushFunction = () => {
    push({ namaFile: "", tipeFile: "", tanggalUpload: "", petugas: "" });
};
const modeIcon = ref(props.clickIcon);
const toggleViewMode = () => {
    modeIcon.value = modeIcon.value === 'list' ? 'table' : 'list';
};

const currentIcon = computed(() => {
    return modeIcon.value === 'list' ? 'PhListBullets' : 'PhGridFour';
});

onMounted(() => {
    // Mengatur nilai awal dari form
    setValues({
        datas: [
            {
                namaFile: "Rontgent",
                tipeFile: ".PNG",
                tanggalUpload: "20-10-2024",
                petugas: "Dr Fahmi",
            },
            {
                namaFile: "EKG",
                tipeFile: ".JPG",
                tanggalUpload: "20-10-2024",
                petugas: "Dr Fahmi",
            },
            {
                namaFile: "Gatal Pada Kulit",
                tipeFile: ".PNG",
                tanggalUpload: "20-10-2024",
                petugas: "Dr Fahmi",
            },
            {
                namaFile: "Nama File",
                tipeFile: ".PNG",
                tanggalUpload: "20-10-2024",
                petugas: "Dr Fahmi",
            }
        ]
    });
});
</script>

<template>
    <CustomAccordion headerClass="bg-adameds-50">

        <template #header>Unggah Berkas</template>
        <template #content>
            <div class="flex py-5 gap-2.5">
                <div class="">
                    <CustomDragDrop class="h-[400px] w-[300px]"
                        :allowed-file-types="['image/png', 'image/jpeg', 'application/pdf']"
                        icon-button="PhMagnifyingGlass" />
                </div>
                <div class="h-[300px] px-5 grow py-5">
                    <div class="flex justify-between">
                        <div class="py-1.5 flex gap-2.5">
                            <div><img :src=fileTerunggah alt=""></div>
                            <div class="font-semibold text-grey-400 text-MD">File Terunggah</div>
                        </div>
                        <div class="">
                            <CustomButton :icon="currentIcon" show-icon background-color="bg-transparent"
                                text-color="text-adameds-300" @click="toggleViewMode" />
                        </div>
                    </div>
                    <hr class="border-1 border-grey-100 my-2.5">
                    <div class="">
                        <div class="py-2.5 grid grid-cols-4 gap-6" v-if="modeIcon == 'list'">
                            <div>
                                <div><img :src=RONTGENT alt=""></div>
                                <div class="flex items-center justify-between ">
                                    <div class="p-2.5 font-normal text-SM text-grey-600">Rontgent.PNG</div>
                                    <div>
                                        <CustomButton icon="PhDotsThreeVertical" show-icon
                                            background-color="bg-transparent" text-color="text-adameds-300" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div><img :src=EKG alt=""></div>
                                <div class="flex items-center justify-between ">
                                    <div class="p-2.5 font-normal text-SM text-grey-600">EKG.PNG</div>
                                    <div>
                                        <CustomButton icon="PhDotsThreeVertical" show-icon
                                            background-color="bg-transparent" text-color="text-adameds-300" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div><img :src=GatalPadaKulit alt=""></div>
                                <div class="flex items-center justify-between ">
                                    <div class="p-2.5 font-normal text-SM text-grey-600">Gatal Pada Kulit.PNG</div>
                                    <div>
                                        <CustomButton icon="PhDotsThreeVertical" show-icon
                                            background-color="bg-transparent" text-color="text-adameds-300" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div><img :src=NamaFile alt=""></div>
                                <div class="flex items-center justify-between ">
                                    <div class="p-2.5 font-normal text-SM text-grey-600">Nama File.PNG</div>
                                    <div>
                                        <CustomButton icon="PhDotsThreeVertical" show-icon
                                            background-color="bg-transparent" text-color="text-adameds-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <DataTable :value="fields" tableStyle="min-width: 50rem"
                                class="text-xs rounded-lg bg-adameds-50">
                                <Column headerClass="bg-adameds-50" class="w-1/2">
                                    <template #header>
                                        <div class="font-semibold">Nama File</div>
                                    </template>
                                    <template #body="slotProps">
                                        {{ slotProps.data.value.namaFile }}
                                        <ErrorMessage :name="`datas[${slotProps.index}].jenisPembayaran`"
                                            class="text-danger-300" />
                                    </template>
                                </Column>

                                <Column headerClass="bg-adameds-50 " class="w-[150px]">
                                    <template #header>
                                        <div class="w-full font-semibold text-center">Tipe File</div>
                                    </template>
                                    <template #body="slotProps">
                                        <div class="w-full text-center"> {{ slotProps.data.value.tipeFile }}</div>

                                    </template>
                                </Column>
                                <Column headerClass="bg-adameds-50">
                                    <template #header>
                                        <div class="w-full font-semibold text-center">Tanggal Upload</div>
                                    </template>
                                    <template #body="slotProps">
                                        <div class="w-full text-center"> {{ slotProps.data.value.tanggalUpload }}</div>

                                    </template>
                                </Column>

                                <Column headerClass="bg-adameds-50">
                                    <template #header>
                                        <div class="w-full font-semibold text-center">Action</div>
                                    </template>
                                    <template #body="slotProps">
                                        <div class="flex items-center justify-center gap-2.5">
                                            <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg">
                                                <img src="@/assets/icons/edit.svg" alt="" width="15px" />
                                            </CustomButton>
                                            <CustomButton label="" background-color="bg-danger-300 rounded-lg"
                                                @click="remove(slotProps.index)">
                                                <img src="@/assets/icons/delete.svg" alt="" width="15px" />
                                            </CustomButton>
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                </div>

            </div>
        </template>
        <template #footer>
            <div class="flex items-end justify-end gap-3">
                <CustomButton v-if="props.method == 'form'" label="Reset" textColor="text-[#9DA4B1]"
                    backgroundColor="bg-transparent" borderColor="border-2 border-[#9DA4B1]" />
                <CustomButton v-if="props.method == 'form'" label="Simpan" />
                <CustomButton v-if="props.method == 'detail'" label="Edit" />
            </div>
        </template>
    </CustomAccordion>
</template>