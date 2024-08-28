<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/FooterPaginator.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import TambahDataPenjaminDialog from "./TambahDataPenjaminDialog.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";

const products = ref<any[]>([]);

const router = useRouter();

onMounted(() => {
  products.value = [
    {
      id: "1",
      kode: "001",
      nama: "Cholera disease",
      tlp: "022",
      alamat: "Alamat Penjamin",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      kode: "001",
      nama: "Cholera disease",
      tlp: "022",
      alamat: "Alamat Penjamin",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      kode: "001",
      nama: "Cholera disease",
      tlp: "022",
      alamat: "Alamat Penjamin",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      kode: "001",
      nama: "Cholera disease",
      tlp: "022",
      alamat: "Alamat Penjamin",
      status: "AKTIF",
      action: "edit",
    },
  ];
});

const testDialog = ref(false);
const status = ref();
</script>

<template>
  <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto" class="">
    <template #header>
      <HeaderFilter page-type="penjamin" @tambah-data="testDialog = true" />
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
        <Column field="kode" header="Kode Penjamin" class="w-2/12" headerClass="bg-adameds-50"></Column>
        <Column field="nama" header="Nama Penjamin" class="w-3/12" headerClass="bg-adameds-50"></Column>
        <Column field="tlp" header="No. Telepon" class="w-3/12" headerClass="bg-adameds-50"></Column>
        <Column field="alamat" header="Alamat" class="w-3/12" headerClass="bg-adameds-50"></Column>
        <Column field="status" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full text-center font-semibold text-SM">
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
            <div class="w-full text-center font-semibold text-SM">
              Action
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg" class="h-6 w-[26px] p-0">
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton label="" background-color="bg-danger-300 rounded-lg" class="h-6 w-[26px] p-0">
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <CustomDialog width="600px" v-model:visible="testDialog" headerBg="bg-adameds-300">
        <template #header>Tambah Data Penjamin</template>
        <template #body>
          <TambahDataPenjaminDialog />
        </template>
        <template #footer>
          <div class="w-full">
            <hr class="-mx-5 border-grey-200" />
            <div class="mt-5 flex justify-end gap-2.5">
              <CustomButton label="Batal" border-color="border-grey-200" background-color="bg-white"
                text-color="text-grey-300">
              </CustomButton>
              <CustomButton label="Simpan"> </CustomButton>
            </div>
          </div>
        </template>
      </CustomDialog>
    </template>
    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
