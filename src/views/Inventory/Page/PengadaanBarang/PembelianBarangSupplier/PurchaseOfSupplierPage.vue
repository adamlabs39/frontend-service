<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { usePurchasingOfSupplierStore } from "@/stores/inventory/purchasingOfSupplier";
import { utilsStore } from "@/stores/utils";
import { epochToDate } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import NoData from "@/components/section/NoData.vue";
import AddPurchaseOfSupplier from "./AddPurchaseOfSupplierPage.vue";
import DetailPurchaseOfSupplierPage from "./DetailPurchaseOfSupplierPage.vue";

// Filter
const onSelected = ref<string>("pending");

const funcOnSelected = (label: string) => {
  onSelected.value = label;
  fetchPurchasingOfSupplier()
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
const PurchasingOfSupplierStore = usePurchasingOfSupplierStore();
const UseUtilsStore = utilsStore();
const PurchasingOfSupplierPayload = ref<any[]>([]);
const PurchasingOfSupplierProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => PurchasingOfSupplierPayload.value && PurchasingOfSupplierPayload.value.length > 0
);

// Fetch Purchasing Of Supplier
const fetchPurchasingOfSupplier = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await PurchasingOfSupplierStore.getApi(
      onSelected.value,
      searchQuery.value,
      PurchasingOfSupplierProperties.value.page,
      PurchasingOfSupplierProperties.value.page_size,
    );

    if (response && response.payload) {
      PurchasingOfSupplierProperties.value.total = response.properties.total;
      PurchasingOfSupplierPayload.value = response.payload;
    } else {
      PurchasingOfSupplierPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    PurchasingOfSupplierPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchPurchasingOfSupplier();
  }, 500);
});

// Handle Pagination
const handlePage = (event: any) => {
  PurchasingOfSupplierProperties.value.page = event.page + 1;
  PurchasingOfSupplierProperties.value.page_size = event.rows;
  fetchPurchasingOfSupplier();
};

// Selected Row
const metaKey = ref(true);
const selectedData = ref();

const onRowSelect = (event: any) => {
  selectedData.value = event.data;
  changeSection('Pembelian Barang Supplier');
};

const closePurchaseOfSupplierPage = () => {
  dataBreadCrumb.value.pop();
  fetchPurchasingOfSupplier();
};

onMounted(() => {
  fetchPurchasingOfSupplier();
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
                <CustomButton icon="PhArrowClockwise" class="mr-5" @click="fetchPurchasingOfSupplier"/>
                <CustomBreadCrumb
                  :home="{
                    label: 'Pengadaan Barang',
                    home: true,
                  }"
                />
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300"/>
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">
                    Pembelian Barang Supplier
                  </p>
                </div>
              </div>
              <CustomButton
                @click="changeSection('Tambah Pembelian')"
                icon="PhPlus"
                label="Permintaan"
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
                placeholder="Cari No. Pembelian / Supplier"
              />
            </div>

            <!-- Filter -->
            <div class="grid grid-cols-3 mt-[15px]">
              <CustomButton
                @click="funcOnSelected('pending')"
                label="PENGAJUAN PEMBELIAN"
                :outlined="onSelected != 'pending'"
                borderColor="border-adameds-300"
                :textColor="onSelected != 'pending' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="onSelected != 'pending' ? 'bg-transparent' : 'bg-adameds-300'"
                class="font-semibold"
              />
              <CustomButton
                @click="funcOnSelected('cancel')"
                label="DIBATALKAN"
                :outlined="onSelected != 'cancel'"
                borderColor="border-adameds-300"
                :textColor="onSelected != 'cancel' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="onSelected != 'cancel' ? 'bg-transparent' : 'bg-adameds-300'"
                class="ml-[20px] font-semibold "
              />
              <CustomButton
                @click="funcOnSelected('verifikasi')"
                label="SUDAH DIVERIFIKASI"
                :outlined="onSelected != 'verifikasi'"
                borderColor="border-adameds-300"
                :textColor="onSelected != 'verifikasi' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="onSelected != 'verifikasi' ? 'bg-transparent' : 'bg-adameds-300'"
                class="ml-[20px] font-semibold"
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
          :value="PurchasingOfSupplierPayload"
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
              <div class="">{{ epochToDate(slotProps.data.tanggalPembelian, "date") }}</div>
            </template>
          </Column>
          <!-- No. Pembelian -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">No. Pembelian</div>
            </template>
            <template #body="slotProps">
              <div class="mb-[5px]">{{ slotProps.data.noPo }}</div>
              <div class="flex flex-wrap">
                <CustomChip
                  :label="slotProps.data.kategoriItem"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                  customClass="h-5"
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
              <div class="font-bold">{{ slotProps.data.spplr?.name }}</div>
            </template>
          </Column>
          <!-- Petugas -->
          <Column field="petugasPembuatPo" header="Petugas" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <!-- Status -->
          <Column field="status" headerClass="bg-adameds-50">
            <template #header="">
              <div class="w-full font-semibold text-center text-SM">Status</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                <CustomChip
                  v-if="slotProps.data.status == 'pending'"
                  label="PENGAJUAN"
                  :showCheckedIcon="false"
                  borderColor="border-grey-300"
                  bgColor="bg-grey-300" 
                  textColor="text-white"
                  customClass="h-6"
                />
                <CustomChip
                  v-if="slotProps.data.status == 'cancel'"
                  label="DIBATALKAN"
                  :showCheckedIcon="false"
                  borderColor="border-danger-300"
                  bgColor="bg-danger-300" 
                  textColor="text-white"
                  customClass="h-6"
                />
                <CustomChip
                  v-if="slotProps.data.status == 'verifikasi'"
                  label="DIVERIFIKASI"
                  :showCheckedIcon="false"
                  borderColor="border-success-300"
                  bgColor="bg-success-300" 
                  textColor="text-white"
                  customClass="h-6"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomPaginator
            :rows="PurchasingOfSupplierProperties.page_size"
            :totalRecords="PurchasingOfSupplierProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
    <AddPurchaseOfSupplier
      v-else-if="dataBreadCrumb[0].label == 'Tambah Pembelian'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      @back="closePurchaseOfSupplierPage"
    />
    <DetailPurchaseOfSupplierPage
      v-else-if="dataBreadCrumb[0].label == 'Pembelian Barang Supplier'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      :selectedData="selectedData"
      @back="closePurchaseOfSupplierPage"
    />
  </div>
</template>
