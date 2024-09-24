<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/FooterPaginator.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import TambahDataOrganisasiDialog from "./TambahDataOrganisasiDialog.vue";
import DetailDataOrganisasi from "./DetailDataOrganisasi.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";

const products = ref<any[]>([]);
onMounted(() => {
  products.value = [
    {
      id: "1",
      kode: "001",
      nama: "Cholera disease",
      tlp: "022",
      email: "dep.lab@gmail.com",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      kode: "001",
      nama: "Cholera disease",
      tlp: "022",
      email: "dep.lab@gmail.com",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      kode: "001",
      nama: "Cholera disease",
      tlp: "022",
      email: "dep.lab@gmail.com",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      kode: "001",
      nama: "Cholera disease",
      tlp: "022",
      email: "dep.lab@gmail.com",
      status: "AKTIF",
      action: "edit",
    },
  ];
});
const metaKey = ref(true);
const dialogData = ref({
  isVisible: false,
  method: "add",
  title: "Tambah Data",
});

function handleAdd() {
  dialogData.value = {
    isVisible: true,
    method: "add",
    title: "Tambah Data",
  };
}

function handleEdit() {
  dialogData.value = {
    isVisible: true,
    method: "edit",
    title: "Edit Data",
  };
}
function handleClose() {
  dialogData.value.isVisible = false;
}

const handleDetail = ref(false)
const selectedOrganisasi = ref(null);

const onRowSelect = (event: any) => {
  selectedOrganisasi.value = event.data;
  handleDetail.value = true;
};

</script>

<template>
  <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto" class="">
    <template #header>
      <HeaderFilter page-type="organisasi" @tambah-data="handleAdd" />
    </template>

    <template #content>
      <DataTable :value="products" tableStyle="min-width: 50rem" class="text-xs" scrollable scrollHeight="flex"
        selectionMode="single" :metaKeySelection="metaKey" v-model:selection="selectedOrganisasi" stripedRows
        @rowSelect="onRowSelect">
        <Column header="No." headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column field="kode" header="Kode Organisasi" class="w-2/12" headerClass="bg-adameds-50"></Column>
        <Column field="nama" header="Nama Organisasi" class="w-3/12" headerClass="bg-adameds-50"></Column>
        <Column field="tlp" header="No. Telepon" class="w-3/12" headerClass="bg-adameds-50"></Column>
        <Column field="email" header="Email" class="w-3/12" headerClass="bg-adameds-50"></Column>
        <Column field="status" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">
              Status
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex justify-center items-center min-w-[120px]">
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
            <div class="flex items-center justify-center w-full font-semibold text-SM">
              Action
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg" class="h-6 w-[26px] p-0"
                @click="handleEdit">
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton label="" background-color="bg-danger-300 rounded-lg" class="h-6 w-[26px] p-0">
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <!-- Dialog for Tambah Data Dokter -->
      <TambahDataOrganisasiDialog v-model:isDialogVisible="dialogData.isVisible" :title="dialogData.title"
        :method="dialogData.method" @close="handleClose" />

      <!-- Dialog for Detail Organisasi -->
      <DetailDataOrganisasi v-model:isDialogVisible="handleDetail" />
    </template>

    <template #footer>
      <Footer :rows="1" :totalRecords="1" />
    </template>
  </Card>
</template>
