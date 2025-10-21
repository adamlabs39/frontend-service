<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { useStokOpnameStore } from "@/stores/inventory/stokOpname";
import { utilsStore } from "@/stores/utils";
import { epochToDate } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import NoData from "@/components/section/NoData.vue";
import AddStokOpname from "./AddStokOpnamePage.vue";
import DetailStokOpname from "./DetailStokOpnamePage.vue";

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
const StokOpnameStore = useStokOpnameStore();
const UseUtilsStore = utilsStore();
const StokOpnamePayload = ref<any[]>([]);
const StokOpnameProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => StokOpnamePayload.value && StokOpnamePayload.value.length > 0
);

// Fetch Purchasing Of Supplier
const fetchPurchasingOfSupplier = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await StokOpnameStore.getApi(
      "0196a8ca-1fda-71ca-a133-7383413ef200",
      StokOpnameProperties.value.page,
      StokOpnameProperties.value.page_size
    );

    if (response && response.payload) {
      StokOpnameProperties.value.total = response.properties.total;
      StokOpnamePayload.value = response.payload;
    } else {
      StokOpnamePayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    StokOpnamePayload.value = [];
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
  StokOpnameProperties.value.page = event.page + 1;
  StokOpnameProperties.value.page_size = event.rows;
  fetchPurchasingOfSupplier();
};

// Selected Row
const metaKey = ref(true);
const selectedData = ref();

const onRowSelect = (event: any) => {
  selectedData.value = event.data;
  changeSection("Detail");
};

const closePurchaseOfSupplierPage = () => {
  dataBreadCrumb.value.pop();
  fetchPurchasingOfSupplier();
};

const closeEditPage = async () => {
  dataBreadCrumb.value.pop();
  dataBreadCrumb.value.pop();
  await fetchPurchasingOfSupplier();
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
                    label: 'Stok Opname',
                    home: true,
                  }"
                />
              </div>
              <CustomButton
                @click="changeSection('Tambah Stok Opname')"
                icon="PhPlus"
                label="Stok Opname"
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
                placeholder="Cari No. Stok Opname / Nama Judul Stok Opname"
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
          :value="StokOpnamePayload"
          v-model:selection="selectedData"
          :metaKeySelection="metaKey"
          @rowClick="onRowSelect"
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
          <!-- Tgl. Cut Off -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Tgl. Cut Off</div>
            </template>
            <template #body="slotProps">
              <div class="">
                {{ epochToDate(slotProps.data.tanggalCutOff, "date") }}
              </div>
            </template>
          </Column>
          <!-- No. Stok Opname -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">No. Stok Opname</div>
            </template>
            <template #body="slotProps">
              <div class="mb-[5px]">{{ slotProps.data.noStokOpname }}</div>
              <div class="flex flex-wrap">
                <CustomChip
                  v-if="slotProps.data.kategoriItem == 'medis'"
                  label="MEDIS"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                />
                <CustomChip
                  v-if="slotProps.data.kategoriItem == 'non-medis'"
                  label="NON-MEDIS"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  class="ml-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.jenisItems == 'obat'"
                  label="OBAT"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  class="ml-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.jenisItems == 'alkes'"
                  label="ALKES"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  class="ml-[5px]"
                />
              </div>
            </template>
          </Column>
          <!-- Judul Stok Opname -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Judul Stok Opname</div>
            </template>
            <template #body="slotProps">
              <div class="font-bold">{{ slotProps.data.judulStokOpname }}</div>
            </template>
          </Column>
          <!-- Petugas -->
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold">Petugas</div>
            </template>
            <template #body="slotProps">
              <div class="font-semibold underline text-SM">
                Petugas Stok Opname
              </div>
              <div class="font-normal text-normal mb-[10px]">
                {{ slotProps.data.petugasSo }}
              </div>
              <div class="font-semibold underline text-SM">
                Petugas Yang Merubah
              </div>
              <div class="font-normal text-normal">
                {{ slotProps.data.petugasPengubah }}
              </div>
            </template>
          </Column>
          <!-- Status -->
          <Column field="status" headerClass="bg-adameds-50">
            <template #header="">
              <div class="w-full font-semibold text-center text-SM">Status</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                <CustomChip
                  v-if="slotProps.data.status == 'draft'"
                  label="DRAFT"
                  :showCheckedIcon="false"
                  borderColor="border-warning-75"
                  bgColor="bg-warning-75"
                  textColor="text-warning-300"
                />
                <CustomChip
                  v-if="slotProps.data.status == 'selesai'"
                  label="SELESAI"
                  :showCheckedIcon="false"
                  borderColor="border-danger-300"
                  bgColor="bg-danger-300"
                  textColor="text-white"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomPaginator
            :rows="StokOpnameProperties.page_size"
            :totalRecords="StokOpnameProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
    <AddStokOpname
      v-else-if="dataBreadCrumb[0].label == 'Tambah Stok Opname'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      @back="closePurchaseOfSupplierPage"
      @backEdit="closeEditPage"
    />
    <DetailStokOpname
      v-else-if="dataBreadCrumb[0].label == 'Detail'"
      :pageType="pageType"
      :selectedData="selectedData"
      @back="closePurchaseOfSupplierPage"
    />
  </div>
</template>
