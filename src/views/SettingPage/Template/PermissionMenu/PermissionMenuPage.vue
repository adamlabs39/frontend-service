<script setup lang="ts">
import { ref } from "vue";
import MainHeaderSetting from "../MainHeaderSetting.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import CustomChip from "@/components/Base/CustomChip.vue";

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
</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Permission Menu" showButton labelButton="Menu" iconButton="PhPlus" />
        <div class="p-4">
            <DataTable :value="permission" responsiveLayout="scroll" dataKey="id" :expandedRows="expandedRows"
                class="p-datatable-sm">
                <Column expander style="width: 2em" header-class="text-black bg-adameds-50">
                </Column>
                <Column field="id" header="No" header-class="text-black bg-adameds-50"
                    class="w-10 p-5 text-center text-black text-SM" />
                <Column field="namaPermission" header="Nama Permission" header-class="text-black bg-adameds-50"
                    class=" text-SM bg-slate-400" />
                <Column field="kode" header="Kode" header-class="text-black bg-adameds-50" class="text-SM" />
                <Column field="kategori" header="Kategori" header-class="text-black bg-adameds-50" class="text-SM" />
                <Column field="status" header="Status" header-class="text-black bg-adameds-50" class="text-SM">
                    <template #body="slotProps">

                        <CustomChip :label="slotProps.data.status" />

                    </template>
                </Column>

                <template #expansion="slotProps" class="">
                    <div class="p-3 -mx-3 -my-1.5 bg-adameds-50">
                        <DataTable :value="slotProps.data.subMenu"
                            class="overflow-hidden rounded-lg bg-adameds-50">
                            <Column field="id" header="No." header-class="text-white bg-adameds-300"
                                class="w-10 p-5 text-center text-black text-SM"></Column>
                            <Column field="namaSubMenu" header="Nama Sub Menu" header-class="text-white bg-adameds-300"
                                class="text-black text-SM"></Column>
                        </DataTable>
                    </div>
                </template>
            </DataTable>
        </div>
    </div>
</template>

<style></style>
