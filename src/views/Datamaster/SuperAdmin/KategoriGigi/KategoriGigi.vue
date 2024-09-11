<script setup lang="ts">
import HeaderFilter from "../../Layout/HeaderFilter.vue";
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const payload = ref<any[]>([]);

onMounted(() => {
  payload.value = [
    {
      system: "Surface[identifier] Tooth",
      code: "343434",
      display: "structur of permanent",
      name: "permukaan gigi",
      status: "AKTIF",
    },
    {
      system: "Surface[identifier] Tooth",
      code: "343434",
      display: "structur of permanent",
      name: "Permukaan gigi",
      status: "AKTIF",
    },
  ];
});
const selectedGigi = ref(null);
// Dialog States
const isTambahDataDialogVisible = ref(false);
const isDetailGigiDialogVisible = ref(false);
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
};
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilter
        pageType="kategori-gigi"
        isSuperAdmin
        @tambah-data="openDialog('add', 'Tambah Data')"
      />
    </template>
    <template #content>
      <DataTable
        :value="payload"
        v-model:selection="selectedGigi"
        tableStyle="min-width: 50rem"
        stripedRows
        scrollable
        scrollHeight="flex"
        class="text-xs"
        @rowSelect="openDialog('detail', 'Detail Data')"
        selectionMode="single"
        :metaKeySelection="metaKey"
        :dt="{
          rowSelectedColor: '#000000',
          rowSelectedBackground: 'rgba(0, 0, 0, 0)',
          rowSelectedRingColor: '#000000',
        }"
      >
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
        <Column
          field="display"
          header="Display SATUSEHAT"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="name"
          header="Kategori Gigi"
          class="w-full"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="status"
          headerClass="bg-adameds-50 font-semibold text-SM"
        >
          <template #header>
            <div class="w-full text-center">Status</div>
          </template>
          <template #body="slotProps">
            <div class="flex justify-center items-center min-w-[120px]">
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
            <div
              class="flex items-center justify-center w-full font-semibold text-SM"
            >
              Action
            </div>
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
      <TambahDataGigiDiaolog
        v-model:isDialogVisible="isTambahDataDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        @close="closeDialog"
      />
      <!-- <DetailGigiDialog
      v-model:isDialogVisible="isDetailGigiDialogVisible"
      /> -->
    </template>
    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
