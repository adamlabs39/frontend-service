<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderDatamaster from "../../Layout/HeaderDatamaster.vue";
import { onMounted, ref, watch } from "vue";
import type { MenuItem } from "primevue/menuitem";
import FileUpload from "primevue/fileupload";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import DialogTambahSupplier from "@/views/Inventory/Page/Datamaster/DialogTambahSupplier.vue";
import DialogDetailSupplier from "./DialogDetailSupplier.vue";

import {useSupplierStore} from "@/stores/inventory/supplier"
import { utilsStore } from "@/stores/utils";
import type { FilterAdmisi } from "@/utils/Interface";
import DialogEditSupplier from "@/views/Inventory/Page/Datamaster/DialogEditSupplier.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

// STORE
const supplierStore = useSupplierStore()
const storeUtils = utilsStore();

// PROPERTIES FOR PAGINATION
const properties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Data Supplier From API
const supplierData = ref<any>([]);


const route = useRoute();

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);


const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label: pageType.value == "supplier" ? "Supplier" : "",
    },
  ];
  reload()
  //   console.log(pageType.value);
};

// FETCH
const fetchDatamasterSupplier = async (filter: FilterSupplier = {}) => {
  storeUtils.setLoading(true);
  try {
    const response = await supplierStore.getAllSupplier(filter);
    if (response && response.payload) {
      properties.value.total = response.properties.total;
      return response.payload;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
  }finally {
    storeUtils.setLoading(false);
  }
}

// Reload
const reload = async() => {
  let filter = {} as FilterSupplier;
  filter = setFilter();
  supplierData.value = await fetchDatamasterSupplier(filter)
}

// Filter
const setFilter = () => {
  let filter = {} as FilterSupplier
  filter.page = properties.value.page
  filter.limit = properties.value.page_size;
  filter.name = name.value;
  return filter

}

interface FilterSupplier{
  page?: number,
  limit?: number,
  name?: string
}

// Menyimpan emit ke variabel
const name = ref("");


// SEARCH QUERY
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(name, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    reload()
  }, 500);
});

// Event emit FROM HEADER
const handleValueSupplier = (value:string) => {
  name.value = value
}



// DIALOG CONFIGURATION
const dialogTambahSupplier = ref({
  isVisible: false,
  title: "",
  data:null
});
const dialogDetailSupplier = ref({
  isVisible: false,
  title: "",
  data:null
});

const dialogEditSupplier = ref<{
  isVisible: boolean;
  title: string;
  data: Record<string, any> | undefined;
}>({
  isVisible: false,
  title: "",
  data: undefined
});

// Function ADD,DETAIL,EDIT
function handleTambahSupplier() {
  dialogTambahSupplier.value.isVisible = true;
  dialogTambahSupplier.value.title = "Tambah Data Supplier";
}
function handleDetailSupplier(values: any) {
  // console.log(values.data);
  dialogDetailSupplier.value.isVisible = true;
  dialogDetailSupplier.value.title = "Detail Data Supplier";
  dialogDetailSupplier.value.data = values.data;
}
function handleEditSupplier(values: any) {
  // console.log("wwww")
  dialogEditSupplier.value.isVisible = true;
  dialogEditSupplier.value.title = "Edit Data Supplier";
  dialogEditSupplier.value.data = values;
}

// DARI DIALOG DETAIL KE DIALOG EDIT
function handleClickEdit() {
  dialogDetailSupplier.value.isVisible = false;
  handleEditSupplier(dialogDetailSupplier.value.data);
}

// Function untuk menambah data baru ke array datamasterSupplierData
const handleSupplierDataSubmit = async (data: any) => {
  // console.log(data)
  
  storeUtils.setLoading(true)
  try {
    const payload = {
    code: data.code,
    name: data.name,
    alamat: data.alamat,
    noTlp: data.noTelpon,
    status: data.status,
    provinsiCode: data.selectedProvinceId,
    kabupatenCode: data.selectedRegencyId,
    kecamatanCode: data.selectedDistrictId,
    kelurahanCode: data.selectedVillageId,
  };
    const response = await supplierStore.createSupplier(payload)
    console.log(response)
  } catch (error) {
     console.error("Failed to fetch data", error);
  }finally {
    storeUtils.setLoading(false)
  }
};
// Function untuk mengedit data supplier
const handleSubmitEditSupplier = async (data:any) => {
  // console.log(data)
  storeUtils.setLoading(true)
  try {
    const uuidToEdit = dialogEditSupplier.value.data?.uuid
    // console.log(uuid)
    const response = await supplierStore.updateSupplier(uuidToEdit, data)
   
    if(response.message == "data berhasil diupdate"){
      reload()
    }
  } catch (error) {
     console.error("Failed to fetch data", error);
  }finally {
    storeUtils.setLoading(false)
  }
}

// Pagination
const handlePage = (event: any) => {
  properties.value.page = event.page + 1;
  properties.value.page_size = event.rows;
  reload();
};




onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
  
});
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderDatamaster
        :data-bread-crumb="dataBreadCrumb"
        :page-type="pageType"
        @tambah-supplier="handleTambahSupplier"
        @update:valueNoSupplier = "handleValueSupplier"
      >
      </HeaderDatamaster>
    </template>
    <template #content>
      <DataTable
        :value="supplierData"
        @row-click="handleDetailSupplier"
        tableStyle="min-width: 50rem"
        scrollable
        scrollHeight="240px"
        :pt="{ headerRow: 'text-SM' }"
      >
        <Column field="no" headerClass="bg-adameds-50" class="w-[50px]">
          <template #header>
            <div class="font-semibold">No</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-center text-SM">{{ slotProps.index + 1 }}</div>
            </div>
          </template>
        </Column>
        <Column field="kodeOrganisasi" headerClass="bg-adameds-50">
          <template #header>
            <div class="font-semibold">Kode Organisasi</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM">{{ slotProps.data.code }}</div>
            </div>
          </template>
        </Column>
        <Column field="namaOrganisasi" headerClass="bg-adameds-50">
          <template #header>
            <div class="font-semibold">Nama Organisasi</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM">{{ slotProps.data.name }}</div>
            </div>
          </template>
        </Column>
        <Column field="noTelpon" headerClass="bg-adameds-50">
          <template #header>
            <div class="font-semibold">No. Telepon</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM">{{ slotProps.data.noTlp }}</div>
            </div>
          </template>
        </Column>
        <Column field="status" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">Status</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
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
                customClass="text-xs font-semibold h-5"
              />
            </div>
          </template>
        </Column>
        <Column field="noTelpon" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">Action</div>
          </template>
          <template #body="slotProps">
            <div class="flex justify-center gap-1.5">
              <CustomButton
                label=""
                background-color="bg-[#3D84E5] rounded-lg"
                class="h-6 w-[26px] p-0"
                @click = "handleEditSupplier(slotProps.data)"
              >
                <img src="@/assets/icons/edit.svg" alt="Edit"/>
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                class="h-6 w-[26px] p-0"
              >
                <img src="@/assets/icons/delete.svg" alt="Delete" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <DialogTambahSupplier
        v-model:is-dialog-visible="dialogTambahSupplier.isVisible"
        :title="dialogTambahSupplier.title"
        @submit-supplier-data="handleSupplierDataSubmit"
      />

      <DialogEditSupplier
        v-model:is-dialog-visible="dialogEditSupplier.isVisible"
        :title="dialogEditSupplier.title"
        :edit-supplier-data="dialogEditSupplier.data"
        @submit-edit ="handleSubmitEditSupplier"
      />

      <DialogDetailSupplier
        v-model:is-dialog-visible="dialogDetailSupplier.isVisible"
        :title="dialogDetailSupplier.title"
        :detail-data="dialogDetailSupplier.data"
        @clickEditDialog = "handleClickEdit"
      />
    </template>
    <template #footer>
      <div class="flex justify-between py-2.5">
        <div class="flex items-center gap-2.5">
          <!-- Show Import Button if enabled via props -->
          <FileUpload
            mode="basic"
            accept=".xls,.xlsx"
            :maxFileSize="1000000"
            label="Import"
            chooseLabel="Import"
            auto
            :pt="{
              pcButton: {
                class: 'font-back', // OR { class: 'w-64' }
              },
            }"
            class="bg-adameds-300 rounded-[10px] font-black text-normal h-10 text-white border-adameds-300"
            custom-upload
            name="dems[]"
          >
            <template #chooseicon>
              <FileImportIcon />
              
            </template>
          </FileUpload>

          <!-- Show Export Button if enabled via props -->
          <CustomButton label="Eksport" icon="FileImportIcon" />
        </div>

        <!-- Pagination Component -->
        <CustomPaginator
          :rows="properties.page_size"
          :totalRecords="properties.total"
          @page="handlePage"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>
:deep(.p-button-label) {
  @apply font-semibold;
}
</style>

