<script setup lang="ts">
import { ref } from "vue";
import MainHeaderSetting from "../MainHeaderSetting.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";

const permission = ref([
    {
        id: 1,
        namaPermission: "Admisi",
        kode: "ADM",
        kategori: "Main Menu",
        status: "AKTIF",
        subMenu: [
            { id: 1, namaSubMenu: "Rawat Jalan" },
            { id: 2, namaSubMenu: "Rawat Inap" },
            { id: 3, namaSubMenu: "IGD" },
            { id: 4, namaSubMenu: "SEP" },
            { id: 5, namaSubMenu: "Data Pasien" },
            { id: 6, namaSubMenu: "Monitoring Kamar" },
        ],
    },
    {
        id: 2,
        namaPermission: "Antrian",
        kode: "ANT",
        kategori: "Main Menu",
        status: "AKTIF",
        subMenu: [], // Add submenu items here if any
    },
]);

const expandedRows = ref<any[]>([]);
const totalRecords = ref(permission.value.length);

const isDialogVisible = ref(false);

const showDialog = () => {
    isDialogVisible.value = true;
};
const selectedKategori = ref();
const kategori = ref([
    { name: "Main Menu", code: "MAIN" },
    { name: "Sub Menu", code: "SUBM" },
]);

</script>

<template>
    <div class="bg-white rounded-lg shadow-md ">
        <MainHeaderSetting heading="Permission Menu" showButton labelButton="Menu" iconButton="PhPlus"
            :button-click-handler="showDialog" />
        <CustomDialog class="" v-model:visible="isDialogVisible" headerBg="bg-adameds-300" width="600px" >
            <template #header>
                Tambah Menu
            </template>
            <template #body>
                <div class="p-5">
                    <CustomSelect label="Kategori" v-model="selectedKategori" :options="kategori" optionValue="code"
                        optionLabel="name" :isLoading="false" :invalid="false" invalidMessage="Wajib diisi"
                        :disabled="false" placeHolder="Pilih Kategori" customSelectClass="border-[#C7CBD2]"/>
                </div>
            </template>
            <template #footer>3</template>
        </CustomDialog>
        <div class="p-4">
            <DataTable :value="permission" responsiveLayout="scroll" dataKey="id" :expandedRows="expandedRows"
                class="p-datatable-sm">
                <Column expander style="width: 2em" header-class="text-black bg-adameds-50">
                </Column>
                <Column field="id" header="No" header-class="text-black bg-adameds-50"
                    class="w-10 p-5 text-center text-black text-SM" />
                <Column field="namaPermission" header="Nama Permission" header-class="text-black bg-adameds-50 "
                    class="text-black text-SM" style="min-width: 600px" />
                <Column field="kode" header="Kode" header-class="text-black bg-adameds-50" class="text-black text-SM"
                    style="min-width: 140px" />
                <Column field="kategori" header="Kategori" header-class="text-black bg-adameds-50"
                    class="text-black text-SM" style="min-width: 110px" />
                <Column field="status" header="Status" header-class="text-black bg-adameds-50" class="text-SM"
                    style="min-width: 100px">
                    <template #body="slotProps">
                        <CustomChip :label="slotProps.data.status" bg-color="bg-adameds-300"
                            border-color="border-transparent" text-color="text-white" icon-color="text-white" />
                    </template>
                </Column>

                <template #expansion="slotProps">
                    <div class="p-3 -mx-2 -my-1.5 bg-adameds-50">
                        <DataTable :value="slotProps.data.subMenu" class="overflow-hidden rounded-lg bg-adameds-50">
                            <Column field="id" header="No." header-class="text-white bg-adameds-300"
                                class="w-10 p-5 text-center text-black text-SM"></Column>
                            <Column field="namaSubMenu" header="Nama Sub Menu" header-class="text-white bg-adameds-300"
                                class="text-black text-SM"></Column>
                        </DataTable>
                    </div>
                </template>
            </DataTable>
            <hr class="border-[#D9DCE1] border-1  mt-16 mb-2" />
            <div class="flex justify-end gap-10 p-5">
                <!-- Pagination -->
                <div>
                    <CustomPaginator :rows="10" :totalRecords="totalRecords" />
                </div>
            </div>
        </div>

    </div>
</template>

<style>
.p-datatable-row-toggle-icon {
    width: 10px;
    height: 10px;
    color: #14b8a6;
}

.p-datatable-footer {
    display: flex;
    justify-content: space-between;
    border: none;
}
</style>
