<script setup lang="ts">
import { ref } from "vue";
import MainHeaderSetting from "../MainHeaderSetting.vue";
import DataRow from "./DataRow.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";

const items = ref([
    { id: 1, name: "Pembayaran", status: "AKTIF" },
    { id: 2, name: "Farmasi", status: "AKTIF" },
    { id: 3, name: "Lab", status: "NON-AKTIF" },
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
</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Password Otorisasi" />
        <DataRow v-for="item in items" :key="item.id" :nomor="item.id" :menuPassword="item.name" :status="item.status"
            @edit="handleEdit(item)" />
        <CustomDialog class="" v-model:visible="isDialogVisible" headerBg="bg-adameds-300" width="600px">
            <template #header>
                <div class="">
                    {{ selectedItem.name }}
                </div>
            </template>
            <template #body>
                <div class="my-5">
                    <div class="mb-2.5 flex flex-col gap-2">
                        <CustomTextfield label="Password Lama" class="border-[#C7CBD2]" placeholder="********" append-icon="PhEyeSlash"  color="98a2b3"/>
                        <CustomTextfield label="Password Baru" class="border-[#C7CBD2]" placeholder="********" append-icon="PhEyeSlash"/>
                        <CustomTextfield label="Verifikasi Password Baru" class="border-[#C7CBD2]"
                            placeholder="********" append-icon="PhEyeSlash"/>
                    </div>
                    <hr class="border-[#D9DCE1] border-1 my-5" />
                    <div class="flex flex-col">
                        <div class="font-semibold mb-[5px]">Status</div>
                        <div class="flex items-center gap-2 h-10 rounded-lg  text-[#6B7280]">
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
