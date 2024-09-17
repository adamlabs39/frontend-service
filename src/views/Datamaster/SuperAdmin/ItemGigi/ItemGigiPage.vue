<script setup lang="ts">
import HeaderFilter from "../../Layout/HeaderFilter.vue";
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import FormItemGigi from "./FormItemGigi.vue";


const products = ref<any[]>([]);

onMounted(() => {
  products.value = [
    {
      nama_keadaan_gigi: "Partial Erupted",
      status: "AKTIF",
    },
    {
      nama_keadaan_gigi: "Partial Erupted",
      status: "AKTIF",
    },
  ];
});
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
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilter
        pageType="item-gigi"
        isSuperAdmin
        @tambah-data="openDialog('add', 'Tambah Data')"
      />
    </template>
    <template #content>
      <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
        stripedRows
        scrollable
        scrollHeight="flex"
        class="text-xs"
        :dt="{
          rowSelectedColor: '#000000',
          rowSelectedBackground: 'transparent',
          bodyCellSelectedBorderColor:'transparent',
          bodyCellBorderColor: 'rgba(0, 0, 0, 0)',
          rowStripedBackground: '#F8F8F8',
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
          field="nama_keadaan_gigi"
          header="Nama Keadaan Gigi"
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
                background-color="bg-adameds-300 rounded-lg"
                class="h-6 w-[26px] p-0"
              >
                <PhEye :size="13" weight="fill" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-[#3D84E5] rounded-lg"
                class="h-6 w-[26px] p-0"
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
      <FormItemGigi
        v-model:isDialogVisible="isTambahDataDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        :editData="dialogConfig.data"
        @close="closeDialog"
      />
    </template>
    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
