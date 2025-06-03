<script setup lang="ts">
import { onMounted, computed, ref, type PropType } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import type { DataTableRowClickEvent } from "primevue/datatable";
import type { MenuItem } from "primevue/menuitem";
import NoData from "@/components/section/NoData.vue";
import DetailHasilPemeriksaanPage from "./DetailHasilPemeriksaanPage.vue";
import { useHasilPemeriksaanLab } from "@/stores/Laboratorium/hasilPemeriksaan";
import { utilsStore } from "@/stores/utils";
import { epochToDate, dateToEpoch, formatPrice } from "@/utils/Helpers";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const pageType = ref("");
const patientData = ref<any>({});
const useHasilPemeriksaanLabStore = useHasilPemeriksaanLab();
const stores = utilsStore();
const hasilPemeriksaanProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const hasilPemeriksaanPayload = ref<any[]>([]);
const searchQuery = ref<string>("");
const selectedOrderType = ref<string>("Periksa");
const selectedPatient = ref([]);

const onSelectOrderType = (label: string) => {
  selectedOrderType.value = label;
  fetchHasilPemeriksaan();
};

const selectedPaymentMethod = ref<string[]>([]);

const onPaymentMethodSelect = (label: string) => {
  if (selectedPaymentMethod.value.includes(label)) {
    selectedPaymentMethod.value = selectedPaymentMethod.value.filter(
      (item) => item != label
    );
  } else {
    selectedPaymentMethod.value.push(label);
  }
  fetchHasilPemeriksaan();
};

const fetchHasilPemeriksaan = async () => {
  stores.setLoading(true);
  try {
    const params: any = {
      page: hasilPemeriksaanProperties.value.page,
      limit: hasilPemeriksaanProperties.value.page_size,
      search: searchQuery.value,
    };

    if (selectedOrderType.value === "Periksa") {
      params.orderStatus = 2;
    } else if (selectedOrderType.value === "Selesai") {
      params.orderStatus = 3;
    }

    if (selectedPaymentMethod.value !== null) {
      if (
        selectedPaymentMethod.value.includes("1") &&
        selectedPaymentMethod.value.includes("2")
      ) {
        params.paymentMethod = [];
      } else {
        params.paymentMethod = selectedPaymentMethod.value;
      }
    }

    const response = await useHasilPemeriksaanLabStore.getApi(params);
    if (response && response.payload) {
      hasilPemeriksaanProperties.value.total =
        response.payload.pagination.total;
      hasilPemeriksaanPayload.value = response.payload.data;
    } else {
      hasilPemeriksaanPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    return [];
  } finally {
    stores.setLoading(false);
  }
};

const handleCancelValidasi = async () => {
  stores.setLoading(true);
  try {
    const tempUuid: any[] = [];
    selectedPatient.value.forEach((item: any) => {
      tempUuid.push(item.uuid);
    });

    const updatedPayload = {
      orderLabUuids: tempUuid,
      orderStatus: 1,
      alasanBatalValidasi: cancelReason.value,
    };

    const responseCancel =
      await useHasilPemeriksaanLabStore.putApiBatalValidasi(updatedPayload);
    if (responseCancel && responseCancel.data) {
      showBatal.value = false;
      cancelReason.value = "";
      selectedPatient.value = [];
      fetchHasilPemeriksaan();
    }
  } catch (error) {
    console.error("Failed to cancel order:", error);
  } finally {
    stores.setLoading(false);
  }
};

const emits = defineEmits(["update:rows", "update:current-page"]);

const dataBreadCrumb = ref<MenuItem[]>([]);
const openedPatientData = ref<any>({});
const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

const showDetail = async (event: DataTableRowClickEvent) => {
  stores.setLoading(true);
  try {
    const responsePatient = await useHasilPemeriksaanLabStore.getDetailPasien(
      event.data.uuid
    );
    if (responsePatient && responsePatient.payload) {
      openedPatientData.value = responsePatient.payload;
      console.log("Opened Patient Data:", openedPatientData.value.uuid);
    } else {
      openedPatientData.value = {};
    }
    changeSection("Hasil Pemeriksaan");
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    stores.setLoading(false);
  }
};

const showBatal = ref(false);
const cancelReason = ref<string>();

// Filter Search Data
const searchData = () => {
  searchQuery.value;
  dateToEpoch(startDateFilter.value);
  dateToEpoch(endDateFilter.value);
  fetchHasilPemeriksaan();
};

// Filter Reset Data
const resetData = () => {
  searchQuery.value = "";
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  selectedPaymentMethod.value = [];
  fetchHasilPemeriksaan();
};

const handlePage = (event: any) => {
  hasilPemeriksaanProperties.value.page = event.page + 1;
  hasilPemeriksaanProperties.value.page_size = event.rows;
  fetchHasilPemeriksaan();
};

onMounted(async () => {
  await fetchHasilPemeriksaan();
});
</script>

<template>
  <div class="flex flex-col w-full h-full overflow-hidden">
    <Card
      v-if="dataBreadCrumb.length == 0"
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton
                  icon="PhArrowClockwise"
                  class="mr-5"
                  @click="fetchHasilPemeriksaan"
                />
                <CustomBreadCrumb
                  :home="{
                    label: 'Hasil Pemeriksaan',
                    home: true,
                  }"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                v-model="searchQuery"
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama, Alamat, No RM"
                class="mr-5 grow"
              />
              <CustomDatePicker
                v-model="startDateFilter"
                label="Tanggal"
                class="w-[150px]"
              />
              <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
              <CustomDatePicker
                v-model="endDateFilter"
                :showLabel="false"
                class="mt-auto w-[150px]"
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
            <div class="flex mt-[10px]">
              <CustomButton
                @click="onSelectOrderType('Periksa')"
                label="PERIKSA"
                :outlined="selectedOrderType != 'Periksa'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedOrderType != 'Periksa'
                    ? 'text-adameds-300'
                    : 'text-white'
                "
                :backgroundColor="
                  selectedOrderType != 'Periksa'
                    ? 'bg-transparent'
                    : 'bg-adameds-300'
                "
                class="mt-auto mr-[5px] font-semibold"
                full
              />
              <CustomButton
                @click="onSelectOrderType('Selesai')"
                label="SELESAI"
                :outlined="selectedOrderType != 'Selesai'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedOrderType != 'Selesai'
                    ? 'text-adameds-300'
                    : 'text-white'
                "
                :backgroundColor="
                  selectedOrderType != 'Selesai'
                    ? 'bg-transparent'
                    : 'bg-adameds-300'
                "
                class="mt-auto ml-[5px] font-semibold"
                full
              />
            </div>

            <div
              class="flex my-[10px] mt-5 font-semibold text-SM text-grey-300"
            >
              <div class="w-[15%]">Filter Pembayaran</div>
              <div class="flex">
                |
                <CustomChip
                  label="TUNAI"
                  value="1"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-50"
                  iconColor="text-adameds-300"
                  textColor="text-adameds-300"
                  customClass="h-5"
                  class="ml-[10px]"
                  selectedColor="bg-adameds-300 border-adameds-300"
                  :isSelected="selectedPaymentMethod.includes('1')"
                  @selected="onPaymentMethodSelect"
                />
                <CustomChip
                  label="ASURANSI"
                  value="2"
                  borderColor="border-warning-300"
                  bgColor="bg-warning-50"
                  iconColor="text-warning-300"
                  textColor="text-warning-300"
                  customClass="h-5"
                  class="ml-[10px]"
                  selectedColor="bg-warning-300 border-warning-300"
                  :isSelected="selectedPaymentMethod.includes('2')"
                  @selected="onPaymentMethodSelect"
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
        <DataTable
          v-if="hasilPemeriksaanPayload.length"
          v-model:selection="selectedPatient"
          :value="hasilPemeriksaanPayload"
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
                <div class="text-SM">{{ slotProps.data.noreg }}</div>
                <div class="text-SM">{{ slotProps.data.noOrder }}</div>
              </div>
            </template>
          </Column>
          <Column field="pasien" header="Pasien" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <!-- {{ slotProps.data.patient?.birthDetail }} -->
                <span class="font-semibold">{{
                  slotProps.data.patient?.name
                }}</span>
                <span class="text-grey-300">
                  ({{ slotProps.data.patient?.birthDetail?.ageYear }}Th
                  {{ slotProps.data.ageMonth }}Bln
                  {{ slotProps.data.ageDay }}Hr)
                </span>
              </div>
              <div class="text-XS">
                {{ slotProps.data.patientAddress }},
                {{ slotProps.data.patient?.address?.districtData?.name }},
                {{ slotProps.data.patient?.address?.cityData?.name }},
                {{ slotProps.data.patient?.address?.provData?.name }}
              </div>
              <div class="flex flex-wrap">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="
                    slotProps.data.patient.gender == 'Female'
                      ? 'Perempuan'
                      : 'Laki-laki'
                  "
                  :bgColor="
                    slotProps.data.patient.gender == 'Female'
                      ? 'bg-female-75'
                      : 'bg-male-75'
                  "
                  :textColor="
                    slotProps.data.patient.gender == 'Female'
                      ? 'text-female-300'
                      : 'text-male-300'
                  "
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.patient.phone"
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
                {{ slotProps.data.dokterPengirim?.firstTitle }}
                {{ slotProps.data.dokterPengirim?.name }}
                {{ slotProps.data.dokterPengirim?.lastTitle }}
              </div>
              <div class="flex flex-wrap">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.pelayanan"
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.lokasi?.name"
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="
                    slotProps.data.paymentMethod == 1 ? 'TUNAI' : 'ASURANSI'
                  "
                  :bgColor="
                    slotProps.data.paymentMethod == 1
                      ? 'bg-adameds-50'
                      : 'bg-warning-50'
                  "
                  :textColor="
                    slotProps.data.paymentMethod == 1
                      ? 'text-adameds-300'
                      : 'text-warning-300'
                  "
                  :borderColor="
                    slotProps.data.paymentMethod == 1
                      ? 'border-adameds-300'
                      : 'border-warning-300'
                  "
                  customClass="h-5 pr-[6px] mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.no_SEP"
                  :showCheckedIcon="false"
                  :label="`SEP.${slotProps.data.no_SEP}`"
                  bgColor="bg-warning-50"
                  textColor="text-warning-300"
                  borderColor="border-warning-300"
                  customClass="h-5 pr-[6px]"
                />
              </div>
            </template>
          </Column>
          <Column
            field="data-kunjungan"
            header="Data Kunjungan"
            headerClass="bg-adameds-50"
            style="width: 25%"
          >
            <template #body="slotProps">
              <div class="text-SM">
                <div
                  class="grid content-center grid-cols-[80px_min-content_150px] auto-cols-min"
                >
                  Daftar
                  <PhArrowRight
                    :size="18"
                    class="my-auto mr-5 text-info-300"
                    weight="bold"
                  />
                  {{
                    epochToDate(
                      parseInt(slotProps.data.tglOrder) / 1000,
                      "date"
                    )
                  }}

                  {{
                    epochToDate(
                      parseInt(slotProps.data.tglOrder) / 1000,
                      "time"
                    )
                  }}
                </div>
                <div
                  class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]"
                >
                  Jadwal
                  <PhArrowRight
                    :size="18"
                    class="my-auto mr-5 text-sunFlower-300"
                    weight="bold"
                  />
                  {{
                    epochToDate(parseInt(slotProps.data.tglPemeriksaan), "date")
                  }}
                  {{
                    epochToDate(parseInt(slotProps.data.tglPemeriksaan), "time")
                  }}
                </div>
              </div>
            </template>
          </Column>
          <Column
            v-if="showBatal"
            selectionMode="multiple"
            headerStyle="width: 3rem"
            headerClass="bg-adameds-50"
            class="custom-checkbox"
          ></Column>
        </DataTable>
        <NoData v-else />
      </template>
      <template #footer>
        <div class="flex justify-between">
          <div class="flex">
            <CustomButton
              v-if="!showBatal"
              @click="showBatal = true"
              class="my-auto bg-danger-300"
              label="Batal Validasi"
            />

            <CustomButton
              v-if="showBatal"
              @click="showBatal = false"
              class="my-auto mr-[10px]"
              label="Batal"
              outlined
              borderColor="border-grey-200"
              textColor="text-grey-300"
            />

            <CustomButton
              v-if="showBatal"
              @click="handleCancelValidasi"
              class="my-auto mr-[10px] bg-danger-300 w-[20%]"
              label="Iya, Batalkan"
              :disabled="!cancelReason"
            />

            <CustomTextfield
              v-if="showBatal"
              v-model="cancelReason"
              :showLabel="false"
              class="my-auto w-[400px]"
              placeholder="Alasan Batal Validasi"
            />
          </div>
          <CustomPaginator
            :rows="hasilPemeriksaanProperties.page_size"
            :totalRecords="hasilPemeriksaanProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
    <DetailHasilPemeriksaanPage
      v-else-if="dataBreadCrumb[0].label == 'Hasil Pemeriksaan'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      :openedPatientData="openedPatientData"
      @back="dataBreadCrumb.pop()"
    />
  </div>
</template>
