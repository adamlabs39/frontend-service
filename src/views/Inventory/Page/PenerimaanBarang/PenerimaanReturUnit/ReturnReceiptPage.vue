<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { useReturnReceipteStore } from "@/stores/inventory/returnReceipt";
import { utilsStore } from "@/stores/utils";
import { epochToDate } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import DetailReturnReceipt from "./DetailReturnReceiptPage.vue";

const props = defineProps({
  lokasiStokUuid: {
    type: String,
    default: "",
  },
});

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

const reason = ref("");
const optionReason = ref([
  { name: "Rusak", value: "Rusak" },
  { name: "Kadaluarsa", value: "Kadaluarsa" },
  { name: "Salah/Ingin diganti", value: "Salah/Ingin diganti" },
  { name: "Sisa Pemakaian Ruangan", value: "Sisa Pemakaian Ruangan" },
]);

// State Management
const searchQuery = ref<string>("");
const ReturnReceiptStore = useReturnReceipteStore();
const UseUtilsStore = utilsStore();
const ReturnReceiptPayload = ref<any[]>([]);
const ReturnReceiptProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => ReturnReceiptPayload.value && ReturnReceiptPayload.value.length > 0
);

// Fetch Purchasing Of Supplier
const fetchReturnReceipt = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await ReturnReceiptStore.getApi(
      props.lokasiStokUuid,
      reason.value,
      searchQuery.value,
      ReturnReceiptProperties.value.page,
      ReturnReceiptProperties.value.page_size,
    );

    if (response && response.payload) {
      ReturnReceiptProperties.value.total = response.properties.total;
      ReturnReceiptPayload.value = response.payload;
    } else {
      ReturnReceiptPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    ReturnReceiptPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

watch(() => props.lokasiStokUuid, () => {
  ReturnReceiptProperties.value.page = 1; // Reset ke halaman pertama
  fetchReturnReceipt();
});

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchReturnReceipt();
  }, 500);
});

// Handle Pagination
const handlePage = (event: any) => {
  ReturnReceiptProperties.value.page = event.page + 1;
  ReturnReceiptProperties.value.page_size = event.rows;
  fetchReturnReceipt();
};

// Selected Row
const metaKey = ref(true);
const selectedData = ref();

const onRowSelect = (event: any) => {
  selectedData.value = event.data;
  changeSection('Detail');
};

const closePage = () => {
  dataBreadCrumb.value.pop();
  fetchReturnReceipt();
};

onMounted(() => {
  fetchReturnReceipt();
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
                <CustomButton icon="PhArrowClockwise" class="mr-5" @click="fetchReturnReceipt"/>
                <CustomBreadCrumb
                  :home="{
                    label: 'Penerimaan Barang',
                    home: true,
                  }"
                />
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300"/>
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">
                    Penerimaan Retur Unit
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                v-model="searchQuery"
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari No. Retur / Asal Retur"
                class="w-[60%] mr-[10px]"
              />
              <CustomSelect
                v-model="reason"
                place-holder="Pilih Alasan"
                label="Alasan"
                class="w-[25%] mr-[10px]"
                optionLabel="name"
                optionValue="value"
                :options="optionReason"
              />
              <CustomButton
                icon="PhMagnifyingGlass"
                label="Cari"
                class="mt-auto"
              />
              <CustomButton
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto ml-[10px]"
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
          :value="ReturnReceiptPayload"
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
          <!-- Tanggal -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Tanggal</div>
            </template>
            <template #body="slotProps">
              <div class="">{{ epochToDate(slotProps.data.tanggalRetur, "date") }}</div>
            </template>
          </Column>
          <!-- No. Permintaan -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">No. Permintaan</div>
            </template>
            <template #body="slotProps">
              <div class="mb-[5px]">{{ slotProps.data.noRetur }}</div>
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
                />
                <CustomChip
                  v-if="slotProps.data.jenisItem == 'obat'"
                  label="OBAT"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                />
                <CustomChip
                  v-if="slotProps.data.jenisItem == 'alkes'"
                  label="ALKES"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                />
              </div>
            </template>
          </Column>
          <!-- Asal Pengirim -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Asal Pengirim</div>
            </template>
            <template #body="slotProps">
              <div class="font-bold">{{ slotProps.data.lokasiStokAwal.name }}</div>
            </template>
          </Column>
          <!-- Alasan Retur -->
          <Column field="alasanRetur" header="Alasan Retur" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <!-- Petugas -->
          <Column field="petugasRetur" header="Petugas" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomPaginator
            :rows="ReturnReceiptProperties.page_size"
            :totalRecords="ReturnReceiptProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
    <DetailReturnReceipt
      v-else-if="dataBreadCrumb[0].label == 'Detail'"
      :selectedData="selectedData"
      @back="closePage"
    />
  </div>
</template>
