<script lang="ts" setup>
import { ref, onMounted, computed,onUnmounted } from "vue";
import { useSnomedCTStore } from "@/stores/datamaster/snomedCT";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Footer from "../Layout/Footer.vue";
import TambahDataSnomedCTDialog from "./TambahDataSnomedCTDialog.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import NoData from "@/components/section/NoData.vue";

const snomedCTStore = useSnomedCTStore();
const snomedResponse = ref<any[]>([]);
const loading = ref(true);

const fetchSnomedData = async () => {
  try {
    const response = await snomedCTStore.getApi();
    snomedResponse.value = response.payload || [];

    // Check if the response and payload exist
    if (response && response.payload) {
      snomedResponse.value = response.payload;
    } else {
      console.error("Unexpected response structure", response);
      snomedResponse.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    snomedResponse.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSnomedData();
});

const hasData = computed(
  () => snomedResponse.value && snomedResponse.value.length > 0
);

// Dialog States
const isTambahDataDialogVisible = ref(false);

// Dialog Configuration
const dialogConfig = ref<any>({
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
  fetchSnomedData();
};

const handleDelete = (dataItem: any) => {
  const confirmed = confirm(
    `Are you sure you want to delete ${dataItem.name}?`
  );

  if (confirmed) {
    loading.value = true;
    snomedCTStore
      .deleteApi(dataItem.uuid)
      .then(() => {
        fetchSnomedData();
      })
      .catch((error) => {
        console.error("Failed to delete data", error);
        loading.value = false;
      });
  }
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
        page-type="snomed-ct"
        @tambah-data="openDialog('add', 'Tambah Data')"
      />
    </template>
    <template #content>
      <div v-if="loading" class="flex items-center justify-center h-full">
        Loading...
      </div>
      <NoData v-else-if="!hasData" />
      <DataTable
        v-else
        :value="snomedResponse"
        tableStyle="min-width: 50rem"
        stripedRows
        class="text-xs"
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
        <Column field="code" header="Kode" headerClass="bg-adameds-50"></Column>
        <Column
          field="name"
          header="Nama Snomed CT"
          class="w-1/2"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="status"
          header="Status"
          headerClass="bg-adameds-50 flex items-center justify-center"
        >
          <template #body="slotProps">
            <div class="flex justify-center items-center min-w-[120px]">
              <CustomChip
                :label="slotProps.data.status ? 'AKTIF' : 'NON-AKTIF'"
                :textColor="
                  slotProps.data.status ? 'text-white' : 'text-[#80868d]'
                "
                :bgColor="slotProps.data.status ? 'bg-adameds-300' : 'bg-white'"
                :borderColor="
                  slotProps.data.status ? 'border-none' : 'border-[#80868d]'
                "
                :icon-color="slotProps.data.status ? 'white' : '#80868d'"
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
                @click="openDialog('edit', 'Edit Data', slotProps.data)"
                class="h-6 w-[26px] p-0"
              >
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                class="h-6 w-[26px] p-0"
                @click="handleDelete(slotProps.data)"
              >
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <TambahDataSnomedCTDialog
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
