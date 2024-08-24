<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import TambahDataNakesDialog from "./TambahDataNakesDialog.vue";
import DetailNakesDialog from "./DetailNakesDialog.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
const products = ref<any[]>([]);
const selectedNakes = ref(null);

onMounted(() => {
  products.value = [
    {
      id: "1",
      nik: "1666666666",
      STR: "10000000000000",
      name_nakes: "Nama Lengkap Nakes",
      jenis_kelamin: "Laki-laki",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      nik: "1666666666",
      STR: "10000000000000",
      name_nakes: "Nama Lengkap Nakes",
      jenis_kelamin: "Laki-laki",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      nik: "1666666666",
      STR: "10000000000000",
      name_nakes: "Nama Lengkap Nakes",
      jenis_kelamin: "Perempuan",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      nik: "1666666666",
      STR: "10000000000000",
      name_nakes: "Nama Lengkap Nakes",
      jenis_kelamin: "Laki-laki",
      status: "AKTIF",
      action: "edit",
    },
  ];
});

const isTambahDataDialogVisible = ref(false);
const isDetailNakesDialogVisible = ref(false);

const metaKey = ref(true);

// Dialog Configuration
const dialogConfig = ref({
  method: "add",
  title: "Tambah Data",
  data: null,
});
// Handle add and edit of the dialog
const openDialog = (method: any, title: any, data: any = null) => {
  dialogConfig.value  = { method, title, data };
  isTambahDataDialogVisible.value = true;
};
// Handle closing of the dialog
const closeDialog= () => {
  isTambahDataDialogVisible.value = false;
}
// Toggle detail dialog visibility
const handleRowSelect = (data:any) => {
  selectedNakes.value = data;
  isDetailNakesDialogVisible.value = true;
};
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilter page-type="nakes" @tambah-data="openDialog('add', 'Tambah Data')" />
    </template>

    <template #content>
      <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
        class="text-xs"
        selectionMode="single"
        stripedRows
        v-model:selection="selectedNakes"
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
        <Column field="nik" header="NIK" headerClass="bg-adameds-50"></Column>
        <Column field="STR" header="STR" headerClass="bg-adameds-50"></Column>
        <Column
          field="name_nakes"
          header="Name Nakes"
          headerClass="bg-adameds-50"
        ></Column>
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">
              Jenis Kelamin
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              <CustomChip
                :label="slotProps.data.jenis_kelamin"
                :show-checked-icon="false"
                :textColor="
                  slotProps.data.jenis_kelamin === 'Laki-laki'
                    ? 'text-male-300'
                    : 'text-female-300'
                "
                :bgColor="
                  slotProps.data.jenis_kelamin === 'Laki-laki'
                    ? 'bg-male-75'
                    : 'bg-female-75'
                "
                :border-color="
                  slotProps.data.jenis_kelamin === 'Laki-laki'
                    ? 'border-male-75'
                    : 'border-female-75'
                "
                customClass="text-xs font-semibold h-5 flex"
              />
            </div> </template
        ></Column>
        <Column field="status" headerClass="bg-adameds-50">
          <template #header="slotProps">
            <div class="w-full w-full text-center font-semibold text-SM">
              Status
            </div>
          </template>
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
        <Column headerClass="bg-adameds-50">
          <template #header="slotProps">
            <div class="w-full text-center font-semibold text-SM">Action</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton
                label=""
                background-color="bg-[#3D84E5] rounded-lg"
                class="h-6 w-[26px] p-0"
                @click="openDialog('edit', 'Edit Data')"
              >
                <img src="@/assets/icons/edit.svg" alt="" />
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
      <!-- Dialog for Tambah Data Nakes -->
       <TambahDataNakesDialog
       v-model:isDialogVisible="isTambahDataDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        @close="closeDialog"
        />
      <!-- Dialog for Detail Nakes -->
      <DetailNakesDialog v-model:isDialogVisible="isDetailNakesDialogVisible" />

    </template>
    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
