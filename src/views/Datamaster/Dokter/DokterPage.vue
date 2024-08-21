<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import TambahDataDokter from "./TambahDataDokterDialog.vue";
import DetailDokterDialog from "./DetailDokterDialog.vue";
import PemeriksaanDialog from "./PemeriksaanDialog.vue";

// State Variables
const products = ref<any[]>([]);
const selectedDokter = ref(null);

// Dialog States
const isTambahDataDialogVisible = ref(false);
const isDetailDokterDialogVisible = ref(false);
const isPemeriksaanDialogVisible = ref(false);


const metaKey = ref(true);

// Dialog Configuration
const dialogConfig = ref({
  method: "add",
  title: "Tambah Data",
});

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

// Handle dialog for adding or editing data
function openDialog(method:any, title:any) {
  dialogConfig.value = { method, title };
  isTambahDataDialogVisible.value = true;
}

// Handle closing of the dialog
function closeDialog() {
  isTambahDataDialogVisible.value = false;
}

// Handle row selection and open detail dialog
function handleRowSelect(event:any) {
  selectedDokter.value = event.data;
  openDetailDialog(true);
}

// Toggle detail dialog visibility
function openDetailDialog(isVisible:any) {
  isDetailDokterDialogVisible.value = isVisible;
}

// Toggle pemeriksaan dialog visibility
function openPemeriksaanDialog(isVisible:any) {
  isPemeriksaanDialogVisible.value = isVisible;
}
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <Header title="Dokter" :filter="false" class="mb-5">
        <template #header>
          <CustomButton label="Data" icon="PhPlus" @click="openDialog('add', 'Tambah Data')" />
        </template>
      </Header>
    </template>

    <template #content>
      <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
        class="text-xs"
        selectionMode="single"
        :metaKeySelection="metaKey"
        v-model:selection="selectedDokter"
        stripedRows
        @rowSelect="handleRowSelect"
        scrollable
        scrollHeight="flex"
      >
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
        <Column
          field="code_bpjs"
          header="kode HFIS (BPJS)"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="SIP"
          header="Kode SIP"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="STR"
          header="STR"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="code_antrian"
          header="Kode Antrian"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="name_dokter"
          header="Nama Dokter"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="telepon"
          header="No. Telepon"
          headerClass="bg-adameds-50 flex items-center justify-center"
        >
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              <CustomChip
                :label="slotProps.data.status"
                :textColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'text-white'
                    : 'text-[#80868d]'
                "
                :bgColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'bg-adameds-300'
                    : 'bg-white'
                "
                :borderColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'border-none'
                    : 'border-[#80868d]'
                "
                :icon-color="
                  slotProps.data.status === 'AKTIF' ? 'white' : '#80868d'
                "
                customClass="text-xs font-semibold h-5 flex"
              />
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" >
          <template #header="slotProps">
            <div
              class="flex items-center justify-center w-full font-semibold text-SM"
            >
              Action
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg" class="h-6 w-[26px] p-0" @click="openDialog('edit', 'Edit Data')">
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-adameds-300 rounded-lg"
                class="h-6 w-[26px] p-0"
                @click="openPemeriksaanDialog(true)"
              >
                <img src="@/assets/icons/dokter.svg" alt="" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                class="h-6 w-[26px] p-0"
              >
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <!-- Dialog for Tambah Data Dokter -->
      <TambahDataDokter
        v-model:isDialogVisible="isTambahDataDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        @close="closeDialog"
      />
      <DetailDokterDialog v-model:isDialogVisible="isDetailDokterDialogVisible" />
      <PemeriksaanDialog v-model:isDialogVisible="isPemeriksaanDialogVisible" />

    </template>

    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
