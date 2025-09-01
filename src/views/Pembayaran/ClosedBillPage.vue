
<script setup lang="ts">
import { onMounted, ref, type PropType, computed, watch } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useReportCloseBillStore } from "@/stores/pembayaran/closeBill";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from '@/components/Base/CustomPaginator.vue';
import CustomSelect from "@/components/Base/CustomSelect.vue";
import ClosedBillDetailPage from "./layout/ClosedBillDetailPage.vue"
import { utilsStore } from "@/stores/utils";
import type { MenuItem } from "primevue/menuitem";
import NoData from "@/components/section/NoData.vue";
import { dateToEpoch, epochToDate } from "@/utils/Helpers";

// Inisialisasi
const route = useRoute();
const store = useReportCloseBillStore();
const storeUtils = utilsStore();
const searchQuery = ref("");

// State untuk UI & Navigasi
const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([]);
const detailData = ref(null);

// State untuk Data & Paginator
const closedBillList = ref<any[]>([]);
const closedBillProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// State untuk Filter
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(new Date().getDate() - 7);
const startDateFilter = ref<Date>(sevenDaysAgo);
const endDateFilter = ref<Date>(new Date());
const statusFilter = ref("Semua");
const selectedFilterPoli = ref<string[]>([]);
const selectedPaymentMethod = ref<string[]>([]);
const today = new Date();

// State untuk Pencarian
const searchResults = ref<any[]>([]);
const loadingSearch = ref(false);
const selectedPatientUuid = ref<string | null>(null);
const selectedBillUuid = ref<string | null>(null);
let searchTimer: ReturnType<typeof setTimeout> | null = null;

// Computed Properties & Data Statis dari BE
const hasData = computed(() => closedBillList.value.length > 0);
const filterPoliList = ref(["RAWAT INAP", "RAWAT JALAN", "IGD", "APS" , "OTC"]);
const poliMapping: { [key: string]: string } = { "RAWAT INAP": "RI", "RAWAT JALAN": "RJ", "IGD": "IGD", "APS": "APS", "OTC": "OTC" };

//untuk UI di column perawatan
const reversePoliMapping: { [key: string]: string } = {
  "RI": "RAWAT INAP",
  "RJ": "RAWAT JALAN",
  "IGD": "IGD",
  "APS": "APS",
  "OTC": "OTC"
};

const fetchClosedBills = async (searchUuid: string | null = null) => {
  storeUtils.setLoading(true);
  closedBillList.value = [];
  closedBillProperties.value.total = 0;

  try {
    //Calculation tanggal 
    const startDate = new Date(startDateFilter.value);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(endDateFilter.value);
    endDate.setHours(23, 59, 59, 999);

    const statusForApi = statusFilter.value.toUpperCase() === 'SEMUA' ? '' : statusFilter.value.toUpperCase();
    const poliForApi = selectedFilterPoli.value.map(poli => poliMapping[poli]);
    
    const paymentForApi = selectedPaymentMethod.value.length > 0 ? selectedPaymentMethod.value[0] : "";


    const response = await store.getApi(
      closedBillProperties.value.page,
      closedBillProperties.value.page_size,
      dateToEpoch(startDate),
      dateToEpoch(endDate),  
      searchUuid || selectedPatientUuid.value || "",
      statusForApi,
      poliForApi,
      paymentForApi
    );

    if (response && Array.isArray(response.payload) && response.properties) {
      closedBillList.value = response.payload.map((item: any) => ({
        uuid: item.uuid,
        name: item.patientName,
        noInvoice: item.invoiceCode,
        noReg:item.noReg,
        billCode: item.billCode,
        doctor: item.practitionerName,
        polyclinic: item.serviceTypeList,
        status: item.paymentStatus  ? 'LUNAS' : 'PIUTANG',
        address: item.fullAddress || "Alamat tidak tersedia",
        insurance_account_name: item.paymentType,
        noHandphone: item.noHandphone,   
        jenisKelamin: item.jenisKelamin, 
        noRm: item.noRm,   
        jeniskelamin: item.jenisKelamin, 
        ageYear: item.ageYear, 
        ageMonth: item.ageMonth, 
        ageDay: item.ageDay,
        completenessStatus: item.completenessStatus,
        phone: item.noHandphone ,
        polyclinic_name: item.polyclinicName,
        tanggal_jadwal: item.scheduleTime|| "",
      }));
      
      const properties = response.properties;
      closedBillProperties.value.page = properties.page || 1;
      closedBillProperties.value.page_size = properties.pagesize || 10;
      closedBillProperties.value.total = parseInt(properties.totalData, 10) || 0;
    }

  } catch (error) {
    console.error("Gagal mengambil data Closed Bill:", error);
  } finally {
    storeUtils.setLoading(false);
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
      const startDate = new Date(startDateFilter.value);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(endDateFilter.value);
      endDate.setHours(23, 59, 59, 999);
      const statusForApi = statusFilter.value.toUpperCase() === 'SEMUA' ? '' : statusFilter.value.toUpperCase();
      const response = await store.getApi(
        1,
        20,
        dateToEpoch(startDate),
        dateToEpoch(endDate),
        filterText,
        statusForApi,
        "", 
        ""
      );
      
      if (response && Array.isArray(response.payload)) {
        searchResults.value = response.payload;
      } else {
        searchResults.value = [];
      }
    } catch (error) {
      console.error("Gagal mencari data pasien:", error);
      searchResults.value = [];
    } finally {
      loadingSearch.value = false;
    }
  }, 500);
};

const dynamicOptionLabelKey = computed(() => {
  const query = searchQuery.value;
  const queryUC = query.toUpperCase();
  const addressKeywords = ["JL", "DS", "DSN", "RT", "RW", "NO", "GG", "BLOK"];
  const isAddressQuery = addressKeywords.some(keyword => queryUC.includes(keyword));

  // Pola untuk No. RM
  const isRmPattern = /^\d{2}-/.test(query);

  if (queryUC.includes("INV")) {
    return 'invoiceCode';
  }
  if (isRmPattern) {
    return 'noRm'; 
  }
  if (isAddressQuery) {
    return 'fullAddress';
  }
  return 'patientName';
});
const searchData = () => {
  closedBillProperties.value.page = 1;
  fetchClosedBills();
};

const resetData = () => {
  const todayReset = new Date();
  const sevenDaysAgoReset = new Date();
  sevenDaysAgoReset.setDate(todayReset.getDate() - 7);
  
  startDateFilter.value = sevenDaysAgoReset;
  endDateFilter.value = todayReset;
  statusFilter.value = "Semua";
  selectedFilterPoli.value = [];
  selectedPaymentMethod.value = [];
  selectedPatientUuid.value = null;
  searchResults.value = [];
  closedBillProperties.value.page = 1;

  fetchClosedBills();
};

const handlePage = (event: any) => {
  closedBillProperties.value.page = event.page + 1;
  closedBillProperties.value.page_size = event.rows;
  fetchClosedBills();
};

const onPoliSelect = (label: string) => {
  const index = selectedFilterPoli.value.indexOf(label);
  if (index > -1) {
    // Jika sudah ada, hapus dari array
    selectedFilterPoli.value.splice(index, 1);
  } else {
    // Jika belum ada, tambahkan ke array
    selectedFilterPoli.value.push(label);
  }
  searchData(); 
};

const onPaymentMethodSelect = (label: string) => {
  if (selectedPaymentMethod.value.includes(label)) {
    selectedPaymentMethod.value = [];
  } else {
    selectedPaymentMethod.value = [label];
  }
  searchData();
};

const showPatientDetail = (event: any) => {
  selectedBillUuid.value = event.data.uuid; 
  changeSection("Detail Transaksi Pasien");
};

const changeSection = (label: string) => { dataBreadCrumb.value.push({ label: label }); };
const updatePageType = (path: string) => { let tempArrPath = path.split("/"); pageType.value = tempArrPath[2] ?? ""; };
onBeforeRouteLeave((to, from) => { updatePageType(to.path); });

const handlePatientSelection = (uuid: string) => {
  selectedPatientUuid.value = uuid; 
  closedBillProperties.value.page = 1;
  fetchClosedBills();
};

watch(startDateFilter, (newDate) => {
  if (newDate) {
    // Atur waktu ke awal hari (00:00:00)
    newDate.setHours(0, 0, 0, 0);
  }
}, { immediate: true });

watch(endDateFilter, (newDate) => {
  if (newDate) {
    // Atur waktu ke akhir hari (23:59:59)
    newDate.setHours(23, 59, 59, 999);
  }
}, { immediate: true });

onMounted(() => {
  updatePageType(route.path);
  fetchClosedBills();
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      v-if="dataBreadCrumb.length == 0"
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Closed Bill',
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
              <CustomSelect
                label="Status"
                class="mr-5 w-[150px]"
                v-model="statusFilter"
                optionLabel=""
                optionValue=""
                :options="['SEMUA','LUNAS', 'PIUTANG']"
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
                @click="searchData"
                icon="PhMagnifyingGlass"
                label="Cari"
                class="ml-5 mr-[10px] mt-auto"
              />
              <CustomButton
                @click="resetData"
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto"
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

      <!-- Datatable -->
      <template #content>
        <DataTable
          v-if="hasData"
          :value="closedBillList"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          @rowClick="showPatientDetail"
        >
          <Column header="Nomor" headerClass="bg-adameds-50" style="width: 10%">
            <template #body="slotProps">
              <div class="text-center text-SM">
                <div v-if="slotProps.data.noRm"
                  class="text-SM">
                  {{ slotProps.data.noRm }}
                </div>
                <div>{{ slotProps.data.noReg }}</div>
                <div>{{ slotProps.data.noInvoice }}</div>
              </div>
            </template>
          </Column>

          <Column header="Pasien" headerClass="bg-adameds-50" style="width: 35%">
            <template #body="slotProps">
              <div class="text-SM">
                <span class="font-semibold">{{ slotProps.data.name }}</span>
                <span class="text-grey-300">
                  ({{ slotProps.data.ageYear }}Th {{ slotProps.data.ageMonth }}Bln {{ slotProps.data.ageDay }}Hr)
                </span>
              </div>
              <div class="text-XS">{{ slotProps.data.address }}</div>
              <div class="flex flex-wrap mt-1">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.jenisKelamin === 'Perempuan' ? 'Perempuan' : 'Laki-laki'"
                  :bgColor="slotProps.data.jenisKelamin === 'Perempuan' ? 'bg-female-75' : 'bg-male-75'"
                  :textColor="slotProps.data.jenisKelamin === 'Perempuan' ? 'text-female-300' : 'text-male-300'"
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

          <Column header="Keperawatan" headerClass="bg-adameds-50" style="width: 35%">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.doctor }} <span v-if="slotProps.data.tanggal_jadwal" class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
              <div class="flex flex-wrap mt-1">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="reversePoliMapping[slotProps.data.polyclinic] || slotProps.data.polyclinic"
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.completenessStatus === 'Data Lengkap'"
                  :showCheckedIcon="false"
                  label="Data Lengkap"
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.polyclinic_name "
                  :showCheckedIcon="false"
                  :label="slotProps.data.polyclinic_name"
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.insurance_account_name"
                  :bgColor="slotProps.data.insurance_account_name == 'TUNAI' ? 'bg-adameds-50' : 'bg-warning-50'"
                  :textColor="slotProps.data.insurance_account_name == 'TUNAI' ? 'text-adameds-300' : 'text-warning-300'"
                  :borderColor="slotProps.data.insurance_account_name == 'TUNAI' ? 'border-adameds-300' : 'border-warning-300'"
                  customClass="h-5 pr-[6px] mr-[5px]"
                />
              </div>
            </template>
          </Column>

          <Column header="Status" headerClass="bg-adameds-50" style="width: 5%">
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.status"
                  :bgColor="slotProps.data.status.toUpperCase() == 'LUNAS' ? 'bg-success-75' : 'bg-danger-75'"
                  :textColor="slotProps.data.status.toUpperCase() == 'LUNAS' ? 'text-success-300' : 'text-danger-300'"
                  customClass="h-5 pr-[6px] border-none"
                />
              </div>
            </template>
          </Column>
        </DataTable>
        <NoData v-else />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <Paginator
            :first="(closedBillProperties.page - 1) * closedBillProperties.page_size"
            :rows="closedBillProperties.page_size"
            :totalRecords="closedBillProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="{currentPage}"
          >
          <template #start>
          <span class="font-semibold mr-4">Total Data: {{ closedBillProperties.total }}</span>
        </template>
          </Paginator>
        </div>
      </template>
    </Card>
    <!-- <ClosedBillDetailPage
      v-else-if="dataBreadCrumb[0].label == 'Detail Transaksi Pasien'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      @back="dataBreadCrumb.pop()"
      @goToDetail="dataBreadCrumb[0].label = 'Detail Transaksi Pasien'"
    /> -->
    <ClosedBillDetailPage
      v-else-if="dataBreadCrumb[0].label == 'Detail Transaksi Pasien' && selectedBillUuid"
      :bill-uuid="selectedBillUuid"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      @back="dataBreadCrumb.pop()"
      @goToDetail="dataBreadCrumb[0].label = 'Detail Transaksi Pasien'"
    />
  </div>
</template>
