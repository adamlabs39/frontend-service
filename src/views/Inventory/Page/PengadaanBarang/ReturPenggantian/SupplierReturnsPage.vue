<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { useSupplierReturnsStore } from "@/stores/inventory/supplierReturns";
import { utilsStore } from "@/stores/utils";
import { epochToDate } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import NoData from "@/components/section/NoData.vue";
import DialogInvoice from "./DialogInvoice.vue"
import AddSupplierReturns from "./AddSupplierReturnsPage.vue";
import DetailSupplierReturns from "./DetailSupplierReturnsPage.vue";

// Filter
const onSelected = ref<string>("retur");

const funcOnSelected = (label: string) => {
  onSelected.value = label;
  fetchSupplierReturns()
};

// Title Label
const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

// State Management
const searchQuery = ref<string>("");
const SupplierReturnsStore = useSupplierReturnsStore();
const UseUtilsStore = utilsStore();
const SupplierReturnsPayload = ref<any[]>([]);
const SupplierReturnsProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => SupplierReturnsPayload.value && SupplierReturnsPayload.value.length > 0
);

// Fetch Supplier Returns
const fetchSupplierReturns = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await SupplierReturnsStore.getApi(
      '0196a8ca-1fda-71ca-a133-7383413ef200',
      onSelected.value,
      searchQuery.value,
      SupplierReturnsProperties.value.page,
      SupplierReturnsProperties.value.page_size,
    );

    if (response && response.payload) {
      SupplierReturnsProperties.value.total = response.properties.total;
      SupplierReturnsPayload.value = response.payload;
    } else {
      SupplierReturnsPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    SupplierReturnsPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchSupplierReturns();
  }, 500);
});

// Handle Pagination
const handlePage = (event: any) => {
  SupplierReturnsProperties.value.page = event.page + 1;
  SupplierReturnsProperties.value.page_size = event.rows;
  fetchSupplierReturns();
};

// Selected Row
const metaKey = ref(true);
const selectedData = ref();

const onRowSelect = (event: any) => {
  selectedData.value = event.data;  
  changeSection('Retur & Penggantian Barang Supplier');
};

// Dialog Management
const InvoiceDialog = ref(false);
const DeleteSupplierDialog = ref(false);

const dialogConfig = ref<any>({
  method: "add",
});

const openDialog = (method: string) => {
  dialogConfig.value = { method };
  InvoiceDialog.value = true;
};

const closeSupplierReturns = () => {
  dataBreadCrumb.value.pop();
  fetchSupplierReturns();
};

onMounted(() => {
  fetchSupplierReturns();
});
</script>

<template>
  <div>
    <Card v-if="dataBreadCrumb.length == 0" pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-hidden" class="h-full overflow-hidden">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" @click="fetchSupplierReturns"/>
                <CustomBreadCrumb
                  :home="{
                    label: 'Pengadaan Barang',
                    home: true,
                  }"
                />
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300"/>
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">
                    Retur & Penggantian Barang Supplier
                  </p>
                </div>
              </div>
              <CustomButton
                @click="openDialog('add')"
                icon="PhPlus"
                label="Retur"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 mt-[10px]">
              <CustomTextfield
                v-model="searchQuery"
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari No. Retur / Tujuan Retur"
              />
            </div>
            <!-- Filter -->
            <div class="grid grid-cols-2 mt-[15px]">
              <CustomButton
                @click="funcOnSelected('retur')"
                label="RETUR SUPPLIER"
                :outlined="onSelected != 'retur'"
                borderColor="border-adameds-300"
                :textColor="onSelected != 'retur' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="onSelected != 'retur' ? 'bg-transparent' : 'bg-adameds-300'"
                class="font-semibold"
              />
              <CustomButton
                @click="funcOnSelected('terima')"
                label="TERIMA PENGGANTI"
                :outlined="onSelected != 'terima'"
                borderColor="border-adameds-300"
                :textColor="onSelected != 'terima' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="onSelected != 'terima' ? 'bg-transparent' : 'bg-adameds-300'"
                class="ml-[20px] font-semibold "
              />
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
      </template>
      <template #content>
        <NoData v-if="!hasData" />
        <DataTable
          v-else
          :value="SupplierReturnsPayload"
          v-model:selection="selectedData"
          :metaKeySelection="metaKey"
          @rowClick="onRowSelect"
          tableStyle="min-width: 50rem"
          stripedRows
          class="text-xs"
          scrollable
          scrollHeight="flex"
          :dt="{
            rowSelectedColor: '#000000',
            rowSelectedBackground: 'transparent',
            bodyCellSelectedBorderColor: 'transparent',
            bodyCellBorderColor: 'transparent',
            rowStripedBackground: '#F8F8F8',
          }"
        > 
          <!-- Tanggal Pembelian -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Tanggal</div>
            </template>
            <template #body="slotProps">
              <div class="">{{ epochToDate(slotProps.data.tanggalRetur, "date") }}</div>
            </template>
          </Column>
          <!-- No. Pembelian -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">No. Pembelian</div>
            </template>
            <template #body="slotProps">
              <div class="mb-[5px]">{{ slotProps.data.noReturSupplier }}</div>
              <div class="flex flex-wrap">
                <CustomChip
                  v-if="slotProps.data.kategoriItem == 'medis'"
                  label="MEDIS"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                  class="mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.kategoriItem == 'non-medis'"
                  label="NON-MEDIS"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                  class="mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.jenisItem == 'obat'"
                  label="OBAT"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                  class="mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.jenisItem == 'alkes'"
                  label="ALKES"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                  class="mr-[5px]"
                />
              </div>
            </template>
          </Column>
          <!-- Supplier -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Supplier</div>
            </template>
            <template #body="slotProps">
              <div class="font-bold">{{ slotProps.data.supplier }}</div>
            </template>
          </Column>
          <!-- Petugas -->
          <Column field="petugas" header="Petugas" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <!-- Status -->
          <Column field="status" headerClass="bg-adameds-50">
            <template #header="">
              <div class="font-semibold text-center text-SM">Status</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                <CustomChip
                  v-if="slotProps.data.status == 'retur'"
                  label="RETUR"
                  :showCheckedIcon="false"
                  borderColor="border-lavender-300"
                  bgColor="bg-lavender-300" 
                  textColor="text-white"
                />
                <CustomChip
                  v-if="slotProps.data.status == 'diterima'"
                  label="RETUR"
                  :showCheckedIcon="false"
                  borderColor="border-success-300"
                  bgColor="bg-success-300" 
                  textColor="text-white"
                />
              </div>
            </template>
          </Column>
        </DataTable>
        <DialogInvoice
          v-model:isDialogVisible="InvoiceDialog"
          :method="dialogConfig.method"
        />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomPaginator
            :rows="SupplierReturnsProperties.page_size"
            :totalRecords="SupplierReturnsProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
    <AddSupplierReturns
      v-else-if="dataBreadCrumb[0].label == 'Tambah Retur'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      @back="closeSupplierReturns"
    />
    <DetailSupplierReturns
      v-else-if="dataBreadCrumb[0].label == 'Retur & Penggantian Barang Supplier'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      :selectedData="selectedData"
      @back="closeSupplierReturns"
    />
  </div>
</template>
