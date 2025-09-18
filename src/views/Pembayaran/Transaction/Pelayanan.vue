<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { utilsStore } from "@/stores/utils";
import { dateToEpoch, epochToDate } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import Paginator from 'primevue/paginator';
import TransactionDetailPage from "@/views/Pembayaran/layout/TransactionPelayanan.vue";
import type { DataTableRowClickEvent } from "primevue/datatable";
import type { MenuItem } from "primevue/menuitem";
import NoData from "@/components/section/NoData.vue";
import { usePelayananTransaction as usePelayananStore } from "@/stores/pembayaran/pelayanan";



const today = new Date();
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(today.getDate() - 7);

const startDateFilter = ref<Date>(sevenDaysAgo);
const endDateFilter = ref<Date>(today);
const pageType = ref("");
const searchQuery = ref<string>("");
const selectedBillUuid = ref<string>();

const filterPoliList = ref([
  "RAWAT JALAN",
  "RAWAT INAP",
  "IGD",
]);

const pelayananStore = usePelayananStore();
const UseUtilsStore = utilsStore();
const pelayananPayload = ref<any[]>([]);
const pelayananProperties = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

// State untuk Pencarian Dropdown
const searchResults = ref<any[]>([]);
const loadingSearch = ref(false);
const selectedPatientUuid = ref<string | null>(null);
let searchTimer: ReturnType<typeof setTimeout> | null = null;

const hasData = computed(
  () => pelayananPayload.value && pelayananPayload.value.length > 0
);

watch(startDateFilter, (newDate) => {
  if (newDate) newDate.setHours(0, 0, 0, 0);
}, { immediate: true });

watch(endDateFilter, (newDate) => {
  if (newDate) newDate.setHours(23, 59, 59, 999);
}, { immediate: true });

const poliMapping: { [key: string]: string } = {
  "RAWAT JALAN": "RJ",
  "RAWAT INAP": "RI",
  "IGD": "IGD",
  "APS & OTC": "APS",
};

// Mapping untuk menampilkan nama layanan dari kode 
const reversePoliMapping: { [key: string]: string } = {
  "RJ": "RAWAT JALAN",
  "RI": "RAWAT INAP",
  "IGD": "IGD",
  "APS": "APS & OTC"
};



const fetchPelayanan = async () => {
  UseUtilsStore.setLoading(true);
  try {
    let statusForApi = '';
      if (selectedPayType.value === 'MenungguPembayaran') {
        statusForApi = 'PIUTANG';
      } else if (selectedPayType.value === 'Lunas') {
        statusForApi = 'LUNAS';
      }
// Jika selectedPayType.value adalah 'Semua', statusForApi akan tetap string kosong ''
    const poliForApi = selectedFilterPoli.value.map(poli => poliMapping[poli] || poli);
    const paymentForApi = selectedPaymentMethod.value;
    
    const response = await pelayananStore.getApi(
      pelayananProperties.value.page,
      pelayananProperties.value.pageSize,
      dateToEpoch(startDateFilter.value),
      dateToEpoch(endDateFilter.value),
      selectedPatientUuid.value || searchQuery.value, 
      statusForApi,
      poliForApi,
      paymentForApi
    );

    const plainResponse = JSON.parse(JSON.stringify(response));
    if (plainResponse && plainResponse.payload && plainResponse.properties) {
      pelayananPayload.value = plainResponse.payload.map((item: any) => ({
        uuid: item.uuid,
        billCode: item.billCode,
        invoiceCode: item.invoiceCode,
        noRm: item.noRm,
        noReg: item.noReg,
        patientName: item.patientName,
        ageYear: item.ageYear,
        ageMonth: item.ageMonth,
        ageDay: item.ageDay,
        fullAddress: item.fullAddress,
        jenisKelamin: item.jenisKelamin,
        noHandphone: item.noHandphone,
        practitionerName: item.practitionerName,
        scheduleStartTime: item.scheduleStartTime,
        scheduleEndTime: item.scheduleEndTime,
        polyclinicName: item.polyclinicName,
        mainServiceCategory: item.mainServiceCategory, // e.g., "RJ", "RI"
        paymentType: item.paymentType,
        completenessStatus: item.completenessStatus, // e.g., "Data Lengkap"
        roomName: item.roomName,
        bedNumber: item.bedNumber,
      }));

      const apiProperties = plainResponse.properties;
      pelayananProperties.value.page = apiProperties.page;
      pelayananProperties.value.pageSize = apiProperties.pageSize; 
      pelayananProperties.value.total = parseInt(apiProperties.totalData, 10) || 0; 
    } else {
      pelayananPayload.value = [];
      pelayananProperties.value.total = 0;
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    pelayananPayload.value = [];
    pelayananProperties.value.total = 0;
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const findTransactionsForDropdown = async (filter: string) => {
  const filterText = filter || "";
  searchQuery.value = filterText;
  if (searchTimer) {
    clearTimeout(searchTimer);
  }

  if (!filterText) {
    searchResults.value = [];
    return;
  }

  searchTimer = setTimeout(async () => {
    loadingSearch.value = true;
    try {
      // Mengambil filter aktif saat ini
      let statusForApi = '';
      if (selectedPayType.value === 'MenungguPembayaran') {
        statusForApi = 'PIUTANG';
      } else if (selectedPayType.value === 'Lunas') {
        statusForApi = 'LUNAS';
      }
      const poliForApi = selectedFilterPoli.value.map(poli => poliMapping[poli] || poli);
      const paymentForApi = selectedPaymentMethod.value;

      // Memanggil API dengan limit kecil untuk dropdown
      const response = await pelayananStore.getApi(
        1,
        20, 
        dateToEpoch(startDateFilter.value),
        dateToEpoch(endDateFilter.value),
        filterText, 
        statusForApi,
        poliForApi,
        paymentForApi
      );

      const plainResponse = JSON.parse(JSON.stringify(response));
      if (plainResponse && Array.isArray(plainResponse.payload)) {
        searchResults.value = plainResponse.payload;
      } else {
        searchResults.value = [];
      }
    } catch (error) {
      console.error("Gagal mencari data dropdown:", error);
      searchResults.value = [];
    } finally {
      loadingSearch.value = false;
    }
  }, 500); // Jeda 500ms
};

const applyFilter = () => {
  pelayananProperties.value.page = 1;
  fetchPelayanan();
};

const resetFilter = () => {
  const todayReset = new Date();
  const sevenDaysAgoReset = new Date();
  sevenDaysAgoReset.setDate(todayReset.getDate() - 7);

  startDateFilter.value = sevenDaysAgoReset;
  endDateFilter.value = todayReset;
  searchQuery.value = "";
  selectedPayType.value = "MenungguPembayaran";
  selectedFilterPoli.value = [];
  selectedPaymentMethod.value = [];
  selectedPatientUuid.value = null;
  searchResults.value = [];
  applyFilter();
};

const selectedPayType = ref<string>("Semua");
const onSelectPayType = (label: string) => {
  selectedPayType.value = label;
  applyFilter();
};

const selectedFilterPoli = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  const index = selectedFilterPoli.value.indexOf(label);
  if (index > -1) {
    selectedFilterPoli.value.splice(index, 1);
  } else {
    selectedFilterPoli.value.push(label);
  }
  applyFilter();
};

const selectedPaymentMethod = ref<string[]>([]);
const onPaymentMethodSelect = (label: string) => {
  const index = selectedPaymentMethod.value.indexOf(label);
  if (index > -1) {
    // Jika sudah ada, hapus dari array
    selectedPaymentMethod.value.splice(index, 1);
  } else {
    // Jika belum ada, tambahkan ke array
    selectedPaymentMethod.value.push(label);
  }
  applyFilter();
};


const handlePage = (event: any) => {
  pelayananProperties.value.page = event.page + 1;
  pelayananProperties.value.pageSize = event.rows;
  fetchPelayanan();
};

const dataBreadCrumb = ref<MenuItem[]>([
  { label: 'Pelayanan' }
]);

const changeSection = (label: string) => {
  dataBreadCrumb.value.push({ label: label });
};

const dynamicOptionLabelKey = computed(() => {
  const query = searchQuery.value;
  const queryUC = query.toUpperCase();
  const addressKeywords = ["JL", "DS", "DSN", "RT", "RW", "NO", "GG", "BLOK"];
  const isAddressQuery = addressKeywords.some(keyword => queryUC.includes(keyword));

  // Pola untuk No. RM
  const isRmPattern = /^\d{2}-/.test(query);

  if (isRmPattern) {
    return 'noRm'; 
  }
  if (isAddressQuery) {
    return 'fullAddress';
  }
  return 'patientName';
});

const handlePatientSelection = (uuid: string) => {
  if (!uuid) return;
  selectedPatientUuid.value = uuid;
  pelayananProperties.value.page = 1; // Reset halaman ke 1
  fetchPelayanan(); // Panggil fungsi fetch utama
};

const showDetail = (event: DataTableRowClickEvent) => {
  selectedBillUuid.value = event.data.uuid; // Simpan UUID
  changeSection("Detail Tagihan");
};

onMounted(() => {
  fetchPelayanan();
});
</script>


<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      v-if="dataBreadCrumb.length === 1"
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" @click="fetchPelayanan" />
                <CustomBreadCrumb
                  :model="dataBreadCrumb"
                  :home="{
                    label: 'Transaksi',
                    home: true,
                  }"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomSelect
                v-model="selectedPatientUuid"
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                place-holder="Cari Nama / Alamat / No. RM"
                class="mr-5 grow"
                :options="searchResults"
                :optionLabel="dynamicOptionLabelKey"
                optionValue="uuid"
                :loading="loadingSearch"
                @filter="findTransactionsForDropdown"
                @update:model-value="handlePatientSelection"
              />
              <CustomDatePicker
                v-model="startDateFilter"
                label="Tanggal"
                class="w-[150px]"
                :maxDate="endDateFilter"
              />
              <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
              <CustomDatePicker
                v-model="endDateFilter"
                :showLabel="false"
                class="mt-auto w-[150px]"
                :minDate="startDateFilter"
                :maxDate="today"
              />
              <CustomButton
                @click="applyFilter"
                icon="PhMagnifyingGlass"
                label="Cari"
                class="ml-5 mr-[10px] mt-auto"
              />
              <CustomButton
                @click="resetFilter"
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto"
              />
            </div>
            <div class="flex mt-[10px]">
              <div>
                <CustomButton
                  @click="onSelectPayType('Semua')"
                  icon="PhListBullets"
                  :outlined="selectedPayType != 'Semua'"
                  borderColor="border-adameds-300"
                  :textColor="selectedPayType != 'Semua' ? 'text-adameds-300' : 'text-white'"
                  :backgroundColor="selectedPayType != 'Semua' ? 'bg-transparent' : 'bg-adameds-300'"
                  class="mr-[10px]"
                />
              </div>
              <CustomButton
                @click="onSelectPayType('MenungguPembayaran')"
                label="MENUNGGU PEMBAYARAN"
                :outlined="selectedPayType != 'MenungguPembayaran'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedPayType != 'MenungguPembayaran' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedPayType != 'MenungguPembayaran' ? 'bg-transparent' : 'bg-adameds-300'
                "
                class="mt-auto mr-[5px] font-semibold"
                full
              />
              <CustomButton
                @click="onSelectPayType('Lunas')"
                label="LUNAS"
                :outlined="selectedPayType != 'Lunas'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedPayType != 'Lunas' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedPayType != 'Lunas' ? 'bg-transparent' : 'bg-adameds-300'
                "
                class="mt-auto ml-[5px] font-semibold"
                full
              />
            </div>
            <div class="flex mb-[10px] mt-5 font-semibold text-SM text-grey-300">
              <div class="w-[15%]">Filter Pelayanan</div>
                <div class="flex">
                  |
                  <CustomChip
                    v-for="(poli, index) in filterPoliList"
                    :key="poli + index"
                    :label="poli"
                    class="ml-[10px]"
                    :isSelected="selectedFilterPoli.includes(poli)"
                    @selected="onPoliSelect"
                  />
                </div>
            </div>
            <div class="flex my-[10px] mt-5 font-semibold text-SM text-grey-300">
                <div class="w-[15%]">Filter Pembayaran</div>
                  <div class="flex">
                    |
                    <CustomChip
                      label="TUNAI"
                      borderColor="border-adameds-300"
                      bgColor="bg-adameds-50"
                      iconColor="text-adameds-300"
                      textColor="text-adameds-300"
                      customClass="h-5"
                      class="ml-[10px]"
                      :isSelected="selectedPaymentMethod.includes('TUNAI')"
                      @selected="onPaymentMethodSelect"
                      selectedColor="bg-adameds-300 border-adameds-300"
                    />
                    <CustomChip
                      label="ASURANSI"
                      borderColor="border-warning-300"
                      bgColor="bg-warning-50"
                      iconColor="text-warning-300"
                      textColor="text-warning-300"
                      customClass="h-5"
                      class="ml-[10px]"
                      :isSelected="selectedPaymentMethod.includes('ASURANSI')"
                      @selected="onPaymentMethodSelect"
                      selectedColor="bg-warning-300 border-warning-300"
                    />
                  </div>
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
          :value="pelayananPayload"
          tableStyle="min-width: 50rem"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          @rowClick="showDetail"
        >
          <Column field="nomor" headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Nomor</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-SM">{{ slotProps.data.noRm }}</div>
                <div class="text-SM">{{ slotProps.data.noReg }}</div>
                <div class="text-SM">{{ slotProps.data.invoiceCode }}</div>
              </div>
            </template>
          </Column>
          <Column field="pasien" header="Pasien" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <span class="font-semibold">{{ slotProps.data.patientName }}</span>
                <span class="text-grey-300">
                  ({{ slotProps.data.ageYear }}Th
                  {{ slotProps.data.ageMonth }}Bln
                  {{ slotProps.data.ageDay }}Hr)
                </span>
              </div>
              <div class="text-XS">{{ slotProps.data.fullAddress }}</div>
              <div class="flex flex-wrap">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="['Perempuan', 'Female'].includes((slotProps.data.jenisKelamin || '').toString().trim()) ? 'Perempuan' : 'Laki-laki'"
                  :bgColor="['Perempuan', 'Female'].includes((slotProps.data.jenisKelamin || '').toString().trim()) ? 'bg-female-75' : 'bg-male-75'"
                  :textColor="['Perempuan', 'Female'].includes((slotProps.data.jenisKelamin || '').toString().trim()) ? 'text-female-300' : 'text-male-300'"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.noHandphone"
                  bgColor="bg-adameds-50"
                  textColor="text-adameds-300"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
              </div>
            </template>
          </Column>
          <Column
            field="keperawatan"
            header="Keperawatan"
            headerClass="bg-adameds-50"
          >
            <template #body="slotProps">
            <div class="text-SM">
                  {{ slotProps.data.practitionerName }}
                  
                  <span v-if="slotProps.data.scheduleStartTime">
                    <span class="text-adameds-300"> | </span>
                    {{ epochToDate(slotProps.data.scheduleStartTime, 'time') }}
                    
                    <template v-if="slotProps.data.scheduleEndTime"> - {{ epochToDate(slotProps.data.scheduleEndTime, 'time') }}</template>
                  </span>
                </div>               
              <div class="flex flex-wrap mt-1">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="reversePoliMapping[slotProps.data.mainServiceCategory] || slotProps.data.mainServiceCategory"
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.roomName"
                  :showCheckedIcon="false"
                  label="RUANGAN"  
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.bedNumber"
                  :showCheckedIcon="false"
                  label="BED"  
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.completenessStatus === 'Data Lengkap'"
                  :showCheckedIcon="false"
                  label="Data Lengkap"
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.polyclinicName"
                  :showCheckedIcon="false"
                  :label="slotProps.data.polyclinicName"
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.paymentType"
                  :bgColor="
                    slotProps.data.paymentType == 'TUNAI'
                      ? 'bg-adameds-50'
                      : 'bg-warning-50'
                  "
                  :textColor="
                    slotProps.data.paymentType == 'TUNAI'
                      ? 'text-adameds-300'
                      : 'text-warning-300'
                  "
                  :borderColor="
                    slotProps.data.paymentType == 'TUNAI'
                      ? 'border-adameds-300'
                      : 'border-warning-300'
                  "
                  customClass="h-5 pr-[6px] mr-[5px]"
                />
              </div>

            </template>
          </Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-end">
            <Paginator
              :first="(pelayananProperties.page - 1) * pelayananProperties.pageSize"
              :rows="pelayananProperties.pageSize"
              :totalRecords="pelayananProperties.total"
              :rowsPerPageOptions="[10, 20, 30]"
              @page="handlePage"
              template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
              currentPageReportTemplate="{currentPage}"
            >
              <template #start>
                <span class="font-md mr-4">Total Data: {{ pelayananProperties.total }}</span>
              </template>
            </Paginator>
        </div>
      </template>
    </Card>
    <TransactionDetailPage
      v-else
      :bill-uuid="selectedBillUuid" :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      @back="dataBreadCrumb.pop()"
    />
  </div>
</template>