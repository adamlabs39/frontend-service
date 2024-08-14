<script setup lang="ts">
import { ref } from "vue";
import MainHeaderSetting from "../MainHeaderSetting.vue";
import DataRow from "./DataRow.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import DataTable from "primevue/datatable";
import CustomChip from "@/components/Base/CustomChip.vue";
import EditPencilAction from "@/assets/icons/pencilEdit.svg?raw";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const items = ref([
    {
        id: 1,
        passwordList: "Pembayaran",
        status: "AKTIF",
        action: EditPencilAction,
    },
    { id: 2, passwordList: "Farmasi", status: "AKTIF", action: EditPencilAction },
    { id: 3, passwordList: "Lab", status: "AKTIF", action: EditPencilAction },
    {
        id: 4,
        passwordList: "Inventory",
        status: "AKTIF",
        action: EditPencilAction,
    },
    {
        id: 5,
        passwordList: "Datamaster",
        status: "AKTIF",
        action: EditPencilAction,
    },
    // Tambahkan data lainnya di sini
]);

const selectedItem = ref();

const handleEdit = (item: any) => {
    selectedItem.value = item;
    isDialogVisible.value = true;
    // Tambahkan logika edit di sini
};
const isDialogVisible = ref(false);

const status = ref();

const schema = toTypedSchema(
    yup.object({
        newPassword: yup
            .string()
            .min(8, "Password minimal 8 digit")
            .required("Password harus diisi"),
        verificationPassword: yup
            .string()
            .min(8, "Password minimal 8 digit")
            .required("Password harus diisi")
            .oneOf([yup.ref("newPassword")], "Password tidak sama"),
    })
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
    validationSchema: schema,
});

const onSubmit = handleSubmit((values) => {
    console.log("Submitted with", values);
});

const [newPassword] = defineField("newPassword");
const [verificationPassword] = defineField("verificationPassword");

const testLog = () => {
    console.log(newPassword.value);
};
</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Password Otorisasi" />
        <div class="p-4">
            <DataTable :value="items" dataKey="id" class="p-datatable-sm">
                <Column field="id" header="No" header-class="text-black bg-adameds-50"
                    class="w-10 p-5 text-center text-black text-SM" />
                <Column field="passwordList" header="Password List" header-class="text-black bg-adameds-50 "
                    class="text-black text-SM" style="min-width: 600px" />
                <Column field="status" header="Status" header-class="text-black bg-adameds-50" class="text-SM"
                    style="min-width: 100px">
                    <template #body="slotProps">
                        <CustomChip :label="slotProps.data.status" bg-color="bg-adameds-300"
                            border-color="border-transparent" text-color="text-white" icon-color="text-white" />
                    </template>
                </Column>
                <Column field="action" header="Action" header-class="text-black bg-adameds-50"
                    class="text-black text-SM" style="min-width: 110px">
                    <template #body="slotProps">
                        <div v-html="slotProps.data.action"
                            class="flex items-center justify-center w-10 h-10 bg-[#4285F4] rounded-lg cursor-pointer"
                            @click="handleEdit(slotProps.data)"></div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <CustomDialog class="" v-model:visible="isDialogVisible" headerBg="bg-adameds-300" width="600px">
            <template #header>
                <div class="">
                    {{ selectedItem.passwordList }}
                </div>
            </template>
            <template #body>
                <div class="my-5">
                    <div class="mb-2.5 flex flex-col gap-2">
                        <CustomTextfield label="Password Lama" class="border-[#C7CBD2]" placeholder="********"
                            append-icon="PhEyeSlash" />
                        <CustomTextfield label="Password Baru" class="border-[#C7CBD2]" placeholder="********"
                            append-icon="PhEyeSlash" v-model="newPassword" :invalid="errors.newPassword ? true : false"
                            :invalidMessage="errors.newPassword"  @input="testLog"/>
                        <CustomTextfield label="Verifikasi Password Baru" class="border-[#C7CBD2]"
                            placeholder="********" append-icon="PhEyeSlash"v-model="verificationPassword" :invalid="errors.verificationPassword ? true : false"
                            :invalidMessage="errors.verificationPassword" />
                    </div>
                    <hr class="border-[#D9DCE1] border-1 my-5" />
                    <div class="flex flex-col">
                        <div class="font-semibold mb-[5px]">Status</div>
                        <div class="flex items-center gap-2 h-10 rounded-lg text-[#6B7280]">
                            <CustomSwitch v-model="status" />
                            <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="w-full">
                    <hr class="border-[#D9DCE1] border-1 -mx-5 mb-5 bg-slate-400" />
                    <div class="flex items-end justify-end gap-2.5">
                        <CustomButton label="Batal" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                            borderColor="border-2 border-[#9DA4B1]" />
                        <CustomButton label="Simpan" />
                    </div>
                </div>
            </template>
        </CustomDialog>
    </div>
</template>

<style lang="scss" scoped></style>
