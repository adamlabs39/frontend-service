<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/FooterPaginator.vue";
import TambahDataDokter from "./TambahDataDokterDialog.vue";
import DetailDokterDialog from "./DetailDokterDialog.vue";
import PemeriksaanDialog from "./PemeriksaanDialog.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";

// State Variables
const products = ref<any[]>([]);
const selectedDokter = ref(null);

// Lifecycle Hook
onMounted(() => {
  loadProducts();
});

// Functions

// Load initial product data
function loadProducts() {
  products.value = [
    {
      id: "1",
      code_bpjs: "001",
      SIP: "Cholera disease",
      STR: "10000000",
      code_antrian: "UMUM",
      name_dokter: "dr. Umum",
      telepon: "087898765678",
      status: "AKTIF",
      action: "edit",
    },
    // Additional product objects...
  ];
}

// Dialog States
const isTambahDataDialogVisible = ref(false);
const isDetailDokterDialogVisible = ref(false);
const isPemeriksaanDialogVisible = ref(false);

const metaKey = ref(true);

// Dialog Configuration
const dialogConfig = ref({
  method: "add",
  title: "Tambah Data",
  data: null,
});
// Handle add and edit of the dialog
const openDialog = (method: any, title: any, data: any = null) => {
  dialogConfig.value = { method, title, data };
  isTambahDataDialogVisible.value = true;
};
// Handle closing of the dialog
const closeDialog = () => {
  isTambahDataDialogVisible.value = false;
}

// Toggle detail dialog visibility
const handleRowSelect = (data: any) => {
  selectedDokter.value = data;
  isDetailDokterDialogVisible.value = true;
};

// Toggle pemeriksaan dialog visibility
const openPemeriksaanDialog = (data: any) => {
  selectedDokter.value = data;
  isPemeriksaanDialogVisible.value = true;
};
</script>

<template>
  <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto" class="">
    <template #header>
      <HeaderFilter page-type="dokter" @tambah-data="openDialog('add', 'Tambah Data')" />
    </template>
    <template #content>
      <DataTable :value="products" tableStyle="min-width: 50rem" class="text-xs" selectionMode="single"
        :metaKeySelection="metaKey" v-model:selection="selectedDokter" stripedRows @rowSelect="handleRowSelect"
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
        <Column field="code_bpjs" header="kode HFIS (BPJS)" headerClass="bg-adameds-50"></Column>
        <Column field="SIP" header="Kode SIP" headerClass="bg-adameds-50"></Column>
        <Column field="STR" header="STR" headerClass="bg-adameds-50"></Column>
        <Column field="code_antrian" header="Kode Antrian" headerClass="bg-adameds-50"></Column>
        <Column field="name_dokter" header="Nama Dokter" headerClass="bg-adameds-50"></Column>
        <Column field="telepon" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full text-center font-semibold text-SM">
              Telepon
            </div>
          </template>
          <template #body="slotProps">
            <div class="w-full text-center">
              {{ slotProps.data.telepon }}
            </div>
          </template>
        </Column>
        <Column field="status" headerClass="bg-adameds-50">
          <template #header>
            <div class=" w-full text-center font-semibold text-SM">
              Status
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              <CustomChip :label="slotProps.data.status" :textColor="slotProps.data.status === 'AKTIF'
                  ? 'text-white'
                  : 'text-[#80868d]'
                " :bgColor="slotProps.data.status === 'AKTIF'
                    ? 'bg-adameds-300'
                    : 'bg-white'
                  " :borderColor="slotProps.data.status === 'AKTIF'
                    ? 'border-none'
                    : 'border-[#80868d]'
                  " :icon-color="slotProps.data.status === 'AKTIF' ? 'white' : '#80868d'
                  " customClass="text-xs font-semibold h-5 flex" />
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50">
          <template #header="slotProps">
            <div class="w-full text-center font-semibold text-SM">
              Action
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg" class="h-6 w-[26px] p-0"
                @click="openDialog('edit', 'Edit Data')">
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton label="" background-color="bg-adameds-300 rounded-lg" class="h-6 w-[26px] p-0"
                @click="openPemeriksaanDialog(true)">
                <img src="@/assets/icons/dokter.svg" alt="" />
              </CustomButton>
              <CustomButton label="" background-color="bg-danger-300 rounded-lg" class="h-6 w-[26px] p-0">
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <!-- Dialog for Tambah Data Dokter -->
      <TambahDataDokter v-model:isDialogVisible="isTambahDataDialogVisible" :title="dialogConfig.title"
        :method="dialogConfig.method" @close="closeDialog" />
      <DetailDokterDialog v-model:isDialogVisible="isDetailDokterDialogVisible" />
      <PemeriksaanDialog v-model:isDialogVisible="isPemeriksaanDialogVisible" />
    </template>

    <template #footer>
      <Footer />
    </template>
  </Card>

</template>
