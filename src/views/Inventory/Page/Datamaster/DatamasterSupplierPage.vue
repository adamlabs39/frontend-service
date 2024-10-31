<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderDatamaster from "../../Layout/HeaderDatamaster.vue";
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import FileUpload from "primevue/fileupload";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import DialogTambahSupplier from "@/views/Inventory/Page/Datamaster/DialogTambahSupplier.vue";
import DialogDetailSupplier from "./DialogDetailSupplier.vue";

const route = useRoute();

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);
const datamasterSupplierData = ref<any | null>(null);

const detailSupplierData = ref(null);

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label: pageType.value == "supplier" ? "Supplier" : "",
    },
  ];
  //   console.log(pageType.value);
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
  datamasterSupplierData.value = [
    {
      id: 1,
      code: "SPL1234",
      name: "Supplier 1",
      provinsi: "Jawa Timur",
      kabupaten: "Surabaya",
      kecamatan:"Keputih",
      noTelpon: "022-12345",
      status: true,
      kategoriItem:"1",
      alamat: "Jalan Jalan",
    },
  ];
});

const dialogTambahSupplier = ref({
  isVisible: false,
  title: "",
});
const dialogDetailSupplier = ref({
  isVisible: false,
  title: "",
});

function handleTambahSupplier() {
  dialogTambahSupplier.value.isVisible = true;
  dialogTambahSupplier.value.title = "Tambah Data Supplier";
}

function handleDetailSupplier(values: any) {
//   console.log(values.data);

  dialogDetailSupplier.value.isVisible = true;
  dialogDetailSupplier.value.title = "Detail Data Supplier";
  detailSupplierData.value = values.data;
}

// Function untuk menambah data baru ke array datamasterSupplierData
const handleSupplierDataSubmit = (data: any) => {
  datamasterSupplierData.value.push(data); // Tambah data yang diterima ke array
};
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
      >
      </HeaderDatamaster>
    </template>
    <template #content>
      <DataTable
        :value="datamasterSupplierData"
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
              <div class="text-SM">{{ slotProps.data.noTelpon }}</div>
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
              >
                <img src="@/assets/icons/edit.svg" alt="Edit" />
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

      <DialogDetailSupplier
        v-model:is-dialog-visible="dialogDetailSupplier.isVisible"
        :title="dialogDetailSupplier.title"
        :detail-data="detailSupplierData"
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
        <Paginator
          :rows="10"
          :totalRecords="120"
          :rowsPerPageOptions="[10, 20, 30]"
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{currentPage}"
        >
          <template #start="slotProps">Total Data: 0</template>
        </Paginator>
      </div>
    </template>
  </Card>
</template>

<style scoped>
:deep(.p-button-label) {
  @apply font-semibold;
}
</style>
