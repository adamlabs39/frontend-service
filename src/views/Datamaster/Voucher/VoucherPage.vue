<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/FooterPaginator.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import TambahDataVoucherDialog from "./TambahDataVoucherDialog.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";

const products = ref<any[]>([]);


onMounted(() => {
  products.value = [
    {
      id: "1",
      kode: "001",
      nama: "Cholera disease",
      jumlah: "022",
      tarif: "Alamat Penjamin",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      kode: "001",
      nama: "Cholera disease",
      jumlah: "022",
      tarif: "Alamat Penjamin",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      kode: "001",
      nama: "Cholera disease",
      jumlah: "022",
      tarif: "Alamat Penjamin",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      kode: "001",
      nama: "Cholera disease",
      jumlah: "022",
      tarif: "Alamat Penjamin",
      status: "AKTIF",
      action: "edit",
    },
  ];
});

const testDialog = ref(false);
const status = ref();
// Dialog States
const isTambahDataDialogVisible = ref(false);

// Dialog Configuration
const dialogConfig = ref<any>({
  method: "add",
  title: "Tambah Data",
  data: null,
});

const openDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  isTambahDataDialogVisible.value = true;
};

const closeDialog = () => {
  isTambahDataDialogVisible.value = false;
};

</script>

<template>
  <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto" class="">
    <template #header>
      <HeaderFilter page-type="voucher" @tambah-data="openDialog('add', 'Tambah Data')" />
    </template>
    <template #content>
      <DataTable :value="products" tableStyle="min-width: 50rem" stripedRows class="text-xs" scrollable
        scrollHeight="flex">
        <Column header="No." headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column field="kode" header="Kode Voucher" headerClass="bg-adameds-50"></Column>
        <Column field="nama" header="Nama Voucher" class="w-4/12" headerClass="bg-adameds-50"></Column>
        <Column field="jumlah" header="Jumlah" headerClass="bg-adameds-50"></Column>
        <Column field="tarif" header="Tarif Voucher" headerClass="bg-adameds-50"></Column>
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
            <div class="w-full font-semibold text-center text-SM">
              Action
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg" class="h-6 w-[26px] p-0" @click="openDialog('edit', 'Edit Data')">
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton label="" background-color="bg-danger-300 rounded-lg" class="h-6 w-[26px] p-0">
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <TambahDataVoucherDialog
        v-model:isDialogVisible="isTambahDataDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        :editData="dialogConfig.data"
        @close="closeDialog"
      />
    </template>
    <template #footer>
      <Footer :rows="1" :totalRecords="1" />
    </template>
  </Card>
</template>
