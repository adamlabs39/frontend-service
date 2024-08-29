<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/FooterPaginator.vue";
import TambahDataRoleDialog from "./TambahDataRoleDialog.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
const products = ref<any[]>([]);

onMounted(() => {
  products.value = [
    {
      id: "1",
      code: "SAD",
      name: "Admin",
      permission: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      status: "AKTIF",
    },
    {
      no: "2",
      code: "ADM",
      name: "Admin",
      permission: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      status: "AKTIF",
    },
    {
      no: "3",
      code: "DKT",
      name: "Admin",
      permission: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      status: "AKTIF",
    },
    {
      no: "4",
      code: "RRW",
      name: "Admin",
      permission: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      status: "AKTIF",
    },
  ];
});

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

const search = ref()
</script>

<template>
  <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto" class="">
    <template #header>
      <HeaderFilter page-type="role" @tambah-data="handleAdd" v-model:value-search="search"/>
    </template>

    <template #content>
      <DataTable :value="products" tableStyle="min-width: 50rem" stripedRows scrollable scrollHeight="flex"
        class="text-xs">
        <Column headerClass="bg-adameds-50 font-semibold text-SM">
          <template #header>
            <div class="flex items-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column field="code" header="Kode Role" class="w-2/12" headerClass="bg-adameds-50"></Column>
        <Column field="name" header="Nama Role" class="w-3/12" headerClass="bg-adameds-50"></Column>
        <Column field="permission" header="Menu Akses" class="w-6/12" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex flex-wrap gap-2">
              <div v-for="items in slotProps.data.permission" :key="items">
                <CustomChip :label="items" :showCheckedIcon="false" border-color="border-none" bg-color="bg-adameds-300"
                  customClass="text-xs font-semibold cursor-auto h-5 bg-adameds-300 text-white" />
              </div>
            </div>
          </template>
        </Column>
        <Column field="status" headerClass="bg-adameds-50 font-semibold text-SM">
          <template #header>
            <div class="w-full text-center">Status</div>
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
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg" @click="handleEdit"
                class="h-6 w-[26px] p-0">
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton label="" background-color="bg-danger-300 rounded-lg" class="h-6 w-[26px] p-0">
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <TambahDataRoleDialog v-model:isDialogVisible="dialogData.isVisible" :title="dialogData.title"
        :method="dialogData.method" @close="handleClose" />
    </template>

    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
