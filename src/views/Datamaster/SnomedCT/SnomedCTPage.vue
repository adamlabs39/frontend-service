<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { useSnomedCTStore } from "@/stores/datamaster/snomedCT";
import { downloadPdf } from "@/utils/PdfMake";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Footer from "../Layout/FooterPaginator.vue";
import TambahDataSnomedCTDialog from "./TambahDataSnomedCTDialog.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import NoData from "@/components/section/NoData.vue";

const snomedCTStore = useSnomedCTStore();
const snomedPayload = ref<any[]>([]);
const snomedProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const searchQuery = ref<string>("");
const loading = ref(true);

const fetchSnomedData = async () => {
  try {
    const response = await snomedCTStore.getApi(
      snomedProperties.value.page,
      snomedProperties.value.page_size,
      searchQuery.value
    );
    if (response && response.payload) {
      snomedPayload.value = response.payload;
      snomedProperties.value.total = response.properties.total;
    } else {
      snomedPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    snomedPayload.value = [];
  } finally {
    loading.value = false;
  }
};

watch([searchQuery], fetchSnomedData);

onMounted(() => {
  fetchSnomedData();
});

const handlePage = (event: any) => {
  snomedProperties.value.page = event.page + 1;
  snomedProperties.value.page_size = event.rows;
  fetchSnomedData();
};

const hasData = computed(
  () => snomedPayload.value && snomedPayload.value.length > 0
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
         :value-search="searchQuery"
        @update:valueSearch="searchQuery = $event"
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
        :value="snomedPayload"
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
        @data-updated="fetchSnomedData"
      />
    </template>

    <template #footer>
      <Footer
        :rows="snomedProperties.page_size"
        :totalRecords="snomedProperties.total"
        @page="handlePage"
        @eksport="downloadPdf({ data: { nama: 'fahmi' } })"
      />
    </template>
  </Card>
</template>
