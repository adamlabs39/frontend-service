<script setup lang="ts">
import { onMounted, ref, watch, computed, type PropType , type Ref} from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import { useTagihanStore } from "@/stores/pembayaran/findBill";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import { utilsStore } from "@/stores/utils";
import type { DataTableRowClickEvent } from "primevue/datatable";
import { epochToDate, dateToEpoch } from "@/utils/Helpers";

const emits = defineEmits(["update:rows", "update:current-page"]);
const storeUtils = utilsStore();
const closeHarianDialog = ref(false);
const kasirCloseBillDialog = ref(false);
const closeKasirDialog = ref(false);
const isKasirOpen = ref(false);
const saldoAwalDisabled = ref(false);
const discountDisabled = ref(false);
const voucherDisabled = ref(false);
const shiftDisabled = ref(false);
const kasirData = ref<any>(null);
const itemTagihan = ref<any>(null);
const openedData = ref<any>({});
const codeVoucher = ref("");
const codeDiscount = ref<number>();
const saldoAwal = ref<number>();
const selectShift = ref("");
const cash = ref<number>();
const debit = ref<number>();
const insurance = ref<number>();
const kasirPayload = ref<any[]>([]);
const pembayaranBPJSDialog = ref(false);
const isBillClosed = ref(false);
const listTagihanRIDialog = ref(false);
const itemsPasien = ref<any[]>([]);
const amount = ref<number>();
const payment_type = ref("");
const payment_method = ref("");
const note = ref("");
const information = ref("");
let pollingInterval: number | null = null;
const kembalian = ref<number>(0);
const kasirCheckData = ref<any>({});
const closingHarianData = ref<any>({});

const hasData = computed(() => kasirData.value && kasirData.value.length > 0);

const handleKasirClick = () => {
  if (!isKasirOpen.value) {
    saldoAwalDisabled.value = true;
    shiftDisabled.value = true;
    isKasirOpen.value = true;
  } else {
    closeKasirDialog.value = true;
  }
};

const isClosingHarianDisabled = computed(
  () => saldoAwalDisabled.value && shiftDisabled.value
);

const handleClosingKasir = () => {
  saldoAwalDisabled.value = false;
  shiftDisabled.value = false;
  isKasirOpen.value = false;
  closeKasirDialog.value = false;
};

//closingharianDialogcheck
const openClosingHarianDialog = async () => {
  storeUtils.setLoading(true);
  try {
    const response = await tagihanStore.getCloseDayConfirmation(); 
    if (response && response.payload) {
      closingHarianData.value = response.payload;
      closeHarianDialog.value = true; 
    }
  } catch (error) {
    console.error("Gagal mengambil data closing harian:", error);
    closingHarianData.value = {};
  } finally {
    storeUtils.setLoading(false);
  }
};

//closeKasirDialog
const openDynamicDialog = async (dialogRef: Ref<boolean>) => {
  storeUtils.setLoading(true);
  try {
    const response = await tagihanStore.getKasirStatus();
    if (response && response.payload) {
      kasirCheckData.value = response.payload;
      dialogRef.value = true; 
    }
  } catch (error) {
    console.error("Gagal mengambil data status kasir:", error);
    kasirCheckData.value = {};
  } finally {
    storeUtils.setLoading(false);
  }
};

//kembalian
const getKembalian = () => {
  const grandTotal = kasirData.value?.grandTotal || 0;
  const jumlahBayar = amount.value || 0;

  if (jumlahBayar >= grandTotal) {
    kembalian.value = jumlahBayar - grandTotal;
  } else {
    kembalian.value = 0;
  }
};

// atur kembalian otomatis
let kembalianTimeout: ReturnType<typeof setTimeout> | null = null;
watch(amount, () => {
  if (kembalianTimeout) clearTimeout(kembalianTimeout);

  kembalianTimeout = setTimeout(() => {
    getKembalian();
  }, 700);
});

const handleRowsUpdate = (rows: number) => {
  console.log("Rows updated:", handleRowsUpdate);
};

const tagihanStore = useTagihanStore();
const searchQuery = ref("");

const timer = ref<any>();
const listDataPatient = ref([]);
const loadingSearchPatient = ref(false);
const searchPatientData = async (filter: string) => {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
  timer.value = setTimeout(async () => {
    loadingSearchPatient.value = true;
    try {
      const response = await tagihanStore.getApi(filter);
      if (response && response.payload) {
        kasirPayload.value = response.payload;
      } else kasirPayload.value = [];
    } catch (error) {
      console.error("Failed to fetch data", error);
      return [];
    } finally {
      loadingSearchPatient.value = false;
    }
  }, 800);
};

const processBillData = (data: any) => {
  console.log("data", data);
  if (data) {
    itemsPasien.value = data.map((service: any, index: number) => ({
      no: index + 1,
      uuid: service.uuid,
      layanan: service.serviceName,
      doctor: service.practitionerName,
      tanggal_jadwal: epochToDate(service.date, "date"),
      no_time: epochToDate(service.date, "time"),
    }));
  } else {
    itemsPasien.value = [];
  }
};

const setSelectedPatientData = async (uuid: string) => {
  if (uuid) {
    storeUtils.setLoading(true);
    try {
      const response = await tagihanStore.getDetailBill(uuid);
      if (response && response.payload) {
        const dataFromApi = response.payload;
        kasirData.value = dataFromApi;

        processBillData(dataFromApi.serviceBill);
        const sudahLunas = dataFromApi.paid === true;

        if (dataFromApi.closeBill || sudahLunas) {
          isBillClosed.value = true; // "Close Bill"
          discountDisabled.value = true;
          voucherDisabled.value = true;
        } else {
          isBillClosed.value = false; //  "Bayar"
          discountDisabled.value = false;
          voucherDisabled.value = false;
        }
      }
    } catch (error) {
      console.error("Failed to process the data:", error);
    } finally {
      storeUtils.setLoading(false);
    }
  }
};

const fetchSearchTransactions = async () => {
  try {
    const response = await tagihanStore.getApi(searchQuery.value);

    if (response && response.payload) {
      kasirPayload.value = response.payload;
    } else {
      kasirPayload.value = [];
    }
  } catch (error) {
    console.error("Text Error", error);
    kasirPayload.value = [];
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(searchQuery, (newValue) => {
  console.log("Search Query Updated:", newValue);
  if (searchTimeout) clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    fetchSearchTransactions();
  }, 500);
});

const detailTagihan = async (event: DataTableRowClickEvent) => {
  openedData.value = event.data;
  storeUtils.setLoading(true);
  try {
    const response = await tagihanStore.getItemBill(openedData.value.uuid);
    if (response && response.payload) {
      itemTagihan.value = response.payload;
      console.log("response", itemTagihan.value);
    }
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    storeUtils.setLoading(false);
  }
  listTagihanRIDialog.value = true;
};

const submitVoucher = async () => {
  storeUtils.setLoading(true);
  try {
    const payload = {
      code: codeVoucher.value,
    };
    const response = await tagihanStore.postVoucher(
      kasirData.value.uuid,
      payload
    );
    const responseDetailBill = await tagihanStore.getDetailBill(
      kasirData.value.uuid
    );
    if (responseDetailBill && responseDetailBill.payload) {
      kasirData.value = responseDetailBill.payload;

      processBillData(responseDetailBill.payload.serviceBill);
    }
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const submitDiscount = async () => {
  storeUtils.setLoading(true);

  try {
    const payload = {
      value: codeDiscount.value,
    };
    const response = await tagihanStore.postDiscount(
      kasirData.value.uuid,
      payload
    );
    const responseDetailBill = await tagihanStore.getDetailBill(
      kasirData.value.uuid
    );
    if (responseDetailBill && responseDetailBill.payload) {
      kasirData.value = responseDetailBill.payload;

      processBillData(responseDetailBill.payload.serviceBill);
    }
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const optionShiftItem = ref([
  { label: "Pagi", value: "1" },
  { label: "Siang", value: "2" },
  { label: "Malam", value: "3" },
]);

const selectedCaraBayar = ref("");
const optionCaraBayar = ref([
  { label: "Tunai", value: "CASH" },
  { label: "Asuransi", value: "INSURANCE" },
]);

const optionMetodeBayar = ref([
  { label: "Tunai", value: "CASH" },
  { label: "Transfer", value: "TRANSFER" },
  { label: "Debit", value: "DEBIT" },
  { label: "Kredit", value: "CREDIT" },
]);

const submitOpenKasir = async () => {
  storeUtils.setLoading(true);
  try {
    if (!isKasirOpen.value) {
      const payload = {
        beginning_balance: saldoAwal.value,
        shift_type: selectShift.value,
      };
      await tagihanStore.postOpenKasir(payload);
      saldoAwalDisabled.value = true;
      shiftDisabled.value = true;
      isKasirOpen.value = true;
      startShortPolling();
    } else {
      await openDynamicDialog(closeKasirDialog);
    }
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const startShortPolling = () => {
  pollingInterval = window.setInterval(async () => {
    try {
      console.log("Soft polling: checking kasir status...");

      const status = await tagihanStore.getKasirStatus();
      if (status.payload.isOpen) {
        console.log("Kasir telah ditutup, menghentikan polling.");
        console.log(status);
        saldoAwal.value = status.payload.beginningBalance;
        selectShift.value = status.payload.shiftType;
        saldoAwalDisabled.value = true;
        shiftDisabled.value = true;
        isKasirOpen.value = true;
      } else {
        saldoAwalDisabled.value = false;
        shiftDisabled.value = false;
        isKasirOpen.value = false;
        closeKasirDialog.value = false;
      }
    } catch (error) {
      console.error("Error during polling:", error);
    }
  }, 50000);
};

const stopShortPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
};

const submitCloseKasir = async () => {
  storeUtils.setLoading(true);

  try {
    const payload = {
      cash: cash.value,
      debit: debit.value,
      insurance: insurance.value,
    };
    console.log("payloadSaldo", payload);
    const response = await tagihanStore.postCloseKasir(payload);
    saldoAwalDisabled.value = false;
    shiftDisabled.value = false;
    isKasirOpen.value = false;
    closeKasirDialog.value = false;
    saldoAwal.value = 0;
    selectShift.value = "";

    //
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const submitClosingHarianKasir = async () => {
  storeUtils.setLoading(true);
  try {
    const response = await tagihanStore.postCloseHarianKasir();
    closeHarianDialog.value = false;
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const submitPaymentKasir = async () => {
  storeUtils.setLoading(true);
  try {
    const payload = {
      amount: amount.value,
      payment_type: payment_type.value,
      payment_method: payment_method.value,
      note: note.value,
      information: information.value,
    };
    const response = await tagihanStore.postPayment(
      kasirData.value.uuid,
      payload
    );
    pembayaranBPJSDialog.value = false;
    isBillClosed.value = true;
    discountDisabled.value = true;
    voucherDisabled.value = true;
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const submitKasirCloseBill = async () => {
  storeUtils.setLoading(true);
  try {
    const payload = {};
    const response = await tagihanStore.postKasirCloseBill(
      kasirData.value.uuid,
      payload
    );
    kasirCloseBillDialog.value = false;
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

onMounted(() => {
  fetchSearchTransactions();
  startShortPolling();
  // stopSoftPolling();
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card pt:body:class="h-full pt-0" pt:content:class="h-full" class="h-full overflow-hidden overflow-y-auto">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb :home="{
                  label: 'Kasir',
                  home: true,
                }" />
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex flex-row mt-[10px]">
              <CustomSelect label="Pencarian Transaksi" prependIcon="PhMagnifyingGlass"
                place-holder="Cari Nama / No.Transaksi / No. RM" class="w-[48%] mr-4" v-model="searchQuery"
                @update:model-value="setSelectedPatientData" optionLabel="patientName" optionValue="uuid"
                :options="kasirPayload" @filter="searchPatientData" />
              <div class="bg-adameds-300 w-[2px] h-[35px] mt-[30px] mr-[15px]"></div>
              <CustomInputNumber v-model="saldoAwal" label="Saldo Awal" placeholder="0" class="basis-[15%]"
                :disabled="saldoAwalDisabled">
                <template #prependText>
                  <div
                    class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md">
                    Rp.
                  </div>
                </template>
              </CustomInputNumber>
              <CustomSelect v-model="selectShift" :disabled="shiftDisabled" label="Pilih Shift" class="ml-3 basis-[10%]"
                optionLabel="label" optionValue="value" :options="optionShiftItem" />
              <CustomButton @click="submitOpenKasir" :label="isKasirOpen ? 'Close Kasir' : 'Open Kasir'"
                class="ml-3 mt-[25px]" />
              <CustomButton @click="openClosingHarianDialog" label="Closing Harian" :disabled="isClosingHarianDisabled"
                outlined borderColor="border-adameds-300" textColor="text-adameds-300" class="ml-3 mt-[25px]" />
            </div>
            <div class="flex mt-[10px]"></div>
          </template>
          <template #collapseIcon>
            <CustomButton icon="PhCaretUp" backgroundColor="bg-adameds-75" textColor="text-adameds-300" />
          </template>
          <template #expandIcon>
            <CustomButton icon="PhCaretDown" backgroundColor="bg-adameds-75" textColor="text-adameds-300" />
          </template>
        </CustomAccordion>
      </template>
      <template #content>
        <div v-if="!kasirData" class="grid grid-cols-[50%_50%] gap-5 h-full mr-5">
          <div class="flex flex-col text-center border-[3px] border-dashed border-grey-300 rounded-lg">
            <div class="m-auto text-SM">
              <img src="../../assets/icons/no data icon.svg" alt="no data" class="mx-auto" />
              <div class="text-grey-300">Silahkan Cari Tagihan Pasien</div>
            </div>
          </div>

          <!-- Kolom Pembayaran -->
          <div class="p-5 rounded-lg bg-adameds-50">
            <!-- Total Pembayaran -->
            <div class="flex items-center justify-between">
              <div class="text-base font-bold font-poppins">
                Total Pembayaran
              </div>
            </div>
            <hr class="mt-2 mb-2 border border-slate-300" />
            <!-- Biaya Administrasi -->
            <div class="flex justify-between mt-6">
              <div class="text-sm text-black font-poppins">
                Biaya Administrasi
              </div>
              <div class="text-sm font-poppins">Rp, 0</div>
            </div>
            <!-- Biaya Tindakan -->
            <div class="flex justify-between mt-4">
              <div class="text-sm font-poppins">Biaya Tindakan</div>
              <div class="text-sm font-poppins">Rp, 0</div>
            </div>
            <!-- Biaya Obat -->
            <div class="flex justify-between mt-4">
              <div class="text-sm font-poppins">Biaya Obat</div>
              <div class="text-sm font-poppins">Rp, 0</div>
            </div>
            <!-- Biaya Kamar -->
            <div class="flex justify-between mt-4">
              <div class="text-sm font-poppins">Biaya Kamar</div>
              <div class="text-sm font-poppins">Rp, 0</div>
            </div>
            <!-- PPN -->
            <div class="flex justify-between mt-4">
              <div class="text-sm font-poppins">PPN</div>
              <div class="text-sm font-poppins">Rp, 0</div>
            </div>
            <hr class="mt-4 border-dashed border-[1px] border-slate-300" />
            <!-- Diskon -->
            <div class="flex justify-between mt-6">
              <div class="text-sm font-poppins">Diskon</div>
              <div class="text-sm font-poppins">%</div>
            </div>
            <hr class="mt-6 mb-2 border-black border-1" />
            <!-- Grand Total -->
            <div class="flex justify-between mt-6">
              <div class="text-sm font-bold font-poppins">Grand Total</div>
              <div class="text-sm font-bold font-poppins">Rp, 0</div>
            </div>
            <div class="">
              <div class="flex">
                <!-- <CustomButton
                    label="Bayar"
                    class="w-full mr-4"
                  /> -->
                <CustomButton label="Bayar" class="w-full mt-[70px]" textColor="text-slate-400"
                  backgroundColor="bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="grid grid-cols-2 gap-2">
          <div class="h-[21%] border-2 border-adameds-300 rounded-lg flex flex-row mr-[20px]">
            <div class="basis-1/2">
              <p class="font-bold text-MD mt-[15px] ml-[15px]">
                {{ kasirData.patientName }}
              </p>
              <p class="ml-[15px] text-sm">{{ kasirData.invoiceCode }}</p>
              <CustomButton class="h-5 text-xs ml-[15px]">00-00-00</CustomButton>
              <CustomChip :showCheckedIcon="false" label="Laki-laki" bgColor="bg-male-75" textColor="text-male-300"
                customClass="h-5 pr-[6px] border-none ml-[10px]" />
              <CustomChip :showCheckedIcon="false" label="Perempuan" bgColor="bg-female-75" textColor="text-female-300"
                customClass="h-5 pr-[6px] border-none mr-[5px]" />
            </div>
            <div class="bg-mediumGrey-300 w-[1px] h-[74px] mr-[20px] mt-[15px]"></div>
            <div class="mt-[30px] mr-[40px]">
              <p class="text-xs font-bold underline underline-offset-2">Umur</p>
              <p class="">24Thn 2Bln 1Hari</p>
            </div>
          </div>

          <!-- Kolom Pembayaran -->
          <div class="p-5 rounded-lg bg-adameds-50">
            <!-- Total Pembayaran -->
            <div class="flex justify-between">
              <p class="text-base font-bold font-poppins">Total Pembayaran</p>
              <div class="flex">
                <CustomButton label="Cetak Invoice" class="mt-[-10px] mr-[10px]" />
                <CustomButton label="Cetak Rincian Biaya" class="mt-[-10px]" />
              </div>
            </div>
            <hr class="mt-2 mb-2 border border-slate-300" />
            <!-- Biaya Administrasi -->
            <div class="flex justify-between mt-6">
              <div class="text-sm text-black font-poppins">
                Biaya Administrasi
              </div>
              <div class="text-sm font-poppins">
                Rp, {{ kasirData.adminFee }}
              </div>
            </div>
            <!-- Biaya Tindakan -->
            <div class="flex justify-between mt-4">
              <div class="text-sm font-poppins">Biaya Tindakan</div>
              <div class="text-sm font-poppins">
                Rp, {{ kasirData.totalTindakan }}
              </div>
            </div>
            <!-- Biaya Obat -->
            <div class="flex justify-between mt-4">
              <div class="text-sm font-poppins">Biaya Obat</div>
              <div class="text-sm font-poppins">
                Rp, {{ kasirData.totalObat }}
              </div>
            </div>
            <!-- Biaya Kamar -->
            <div class="flex justify-between mt-4">
              <div class="text-sm font-poppins">Biaya Kamar</div>
              <div class="text-sm font-poppins">
                Rp, {{ kasirData.totalRuangan }}
              </div>
            </div>
            <!-- PPN -->
            <div class="flex justify-between mt-4">
              <div class="text-sm font-poppins">PPN</div>
              <div class="text-sm font-poppins">Rp, 0</div>
            </div>
            <hr class="mt-4 border-dashed border-[1px] border-slate-300" />
            <!-- Diskon -->
            <div class="flex justify-between mt-6">
              <div class="text-sm font-poppins">Diskon</div>
              <div class="text-sm font-poppins">{{ kasirData.discount }} %</div>
            </div>
            <hr class="mt-6 mb-2 border-black border-1" />
            <!-- Grand Total -->
            <div class="flex justify-between mt-6">
              <div class="text-sm font-bold font-poppins">Grand Total</div>
              <div class="text-sm font-bold font-poppins">
                Rp, {{ kasirData.grandTotal }}
              </div>
            </div>

            <div class="flex mt-[30px]">
              <CustomInputNumber v-model="codeDiscount" placeholder="5" :show-label="false"
                class="w-[80px] bg-white rounded-xl" :disable="discountDisabled">
                <template #appendText>
                  <div
                    class="font-semibold bg-white text-sm text-adameds-300 ml-[10px] mt-[10px] rounded-r-xl w-[20px]">
                    %
                  </div>
                </template>
              </CustomInputNumber>
              <CustomButton label="Pakai Diskon" class="ml-[10px]" @click="submitDiscount"
                :disabled="discountDisabled" />

              <CustomTextfield v-model="codeVoucher" :showLabel="false" placeholder="Masukkan Kode Voucher"
                class="w-[30%] ml-[50px] mr-[10px]" :disable="voucherDisabled" />
              <CustomButton label="Pakai Voucher" class="" @click="submitVoucher" :disabled="voucherDisabled" />
            </div>

            <!-- Button Bayar -->
            <div class="mt-[60px]">
              <div class="flex">
                <CustomButton v-if="!isBillClosed" @click="pembayaranBPJSDialog = true" label="Bayar" class="w-full" />
                <CustomButton v-else @click="kasirCloseBillDialog = true" label="Close Bill" class="w-full"
                  backgroundColor="bg-danger-300" borderColor="border-danger-300" textColor="text-white" />
              </div>
            </div>
            <!-- <div class="mt-[60px]">
              <div class="flex">
                <CustomButton 
                  @click="closeBillDialog = true"
                  label="Close Bill" 
                  class="w-full"
                  backgroundColor="bg-danger-300"
                  borderColor="border-danger-300"
                  textColor="text-white"
                />
              </div>
            </div> -->
          </div>

          <!-- List Tagihan Pelayanan -->
          <div class="mt-[-440px] mr-[20px]">
            <DataTable :value="itemsPasien" scrollable scrollHeight="380px" class="overflow-hidden rounded-[10px]"
              :pt="{ headerRow: 'text-SM' }" @rowClick="detailTagihan">
              <Column field="no" headerClass="bg-adameds-300 text-white" bodyClass="text-SM" style="width: 60px">
                <template #header>
                  <div class="w-full font-bold">List Tagihan Pelayanan</div>
                </template>
                <template #body="slotProps">
                  <div class="flex">
                    <p class="font-bold text-normal">
                      {{ slotProps.data.layanan }}
                    </p>
                    <CustomChip class="ml-2" :showCheckedIcon="false" label="TUNAI" bgColor="bg-adameds-50"
                      textColor="text-adameds-300" borderColor="border-adameds-300" />
                    <CustomChip class="ml-2" :showCheckedIcon="false" label="BPJS" bgColor="bg-warning-50"
                      textColor="text-warning-300" borderColor="border-warning-300" />
                  </div>
                  <div class="flex">
                    <UserDoctorIcon class="mt-2" />
                    <p class="mt-2 text-sm text-grey-400">
                      {{ slotProps.data.doctor }}
                    </p>
                  </div>
                  <div class="flex">
                    <p class="text-sm">Tanggal</p>
                    <PhArrowRight :size="18" class="my-auto ml-2 text-success-300" weight="bold" />
                    <p class="ml-2 text-sm">
                      {{ slotProps.data.tanggal_jadwal }}
                    </p>
                    <p class="ml-2 text-sm">{{ slotProps.data.no_time }}</p>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </template>
    </Card>

    <!-- Closing Harian -->
    <CustomDialog v-model:visible="closeHarianDialog" width="600px">
      <template #header>
        <div class="">Closing Harian</div>
      </template>
      <template #body>
        <div class="grid grid-flow-col grid-rows-1">
          <div class="row-span-1">
            <img src="../../assets/icons/profil.svg" class="w-[50px] h-[50px] mt-[20px]" />
          </div>
          <div class="mr-[250px]">
            <p class="font-bold mt-[20px]">{{ closingHarianData.namaAkun }}</p>
            <p class="text-sm text-grey-300">
              Terakhir login {{ epochToDate(closingHarianData.terakhirLogin,"dateTime") }}
            </p>
          </div>
        </div>
        <div>
          <p class="mt-[30px] font-bold">
            Tanggal & Jam Closing
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="font-normal">: {{ epochToDate(closingHarianData.tanggalJamClosing, "dateTime") }}</span>
          </p>
        </div>
        <hr class="mt-8 border-1 border-grey-200" />
        <div class="text-center">
          <p class="mt-6 text-base font-bold text-grey-300">
            Apakah anda yakin ingin melakukan penutupan hari ini?
          </p>
        </div>
        <hr class="mt-6 border-1 border-grey-200" />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton @click="closeHarianDialog = false" label="Batal" outlined class="" borderColor="border-grey-200"
            textColor="text-grey-300" />
          <CustomButton @click="submitClosingHarianKasir" label="Closing Harian" class="ml-2"
            backgroundColor="bg-adameds-300" />
        </div>
      </template>
    </CustomDialog>

    <!-- Close Bill -->
    <CustomDialog v-model:visible="kasirCloseBillDialog" width="600px">
      <template #header class="text-white bg-danger-300">Closing Bill</template>
      <template #body>
        <div class="mt-6 text-sm">
          <p>
            Pastikan semua biaya dan tagihan sudah tercantum dan terbayarkan
            hingga lunas, <strong>Close Bill</strong> pasien?
          </p>
        </div>
        <div class="text-sm">
          <p class="mt-6 text-base italic text-danger-300">
            *Tidak dapat mengubah/menambah tagihan, jika sudah
            <span class="font-bold">Close Bill</span>
          </p>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton @click="kasirCloseBillDialog = false" label="Batal" outlined class=""
            borderColor="border-grey-200" textColor="text-grey-300" />
          <CustomButton @click="submitKasirCloseBill" label="Close Bill" class="ml-2" backgroundColor="bg-danger-300" />
        </div>
      </template>
    </CustomDialog>

    <!-- Kasir Harian -->
    <CustomDialog v-model:visible="closeKasirDialog" width="600px">
      <template #header>Closing Kasir</template>
      <template #body>
        <div class="grid grid-flow-col grid-rows-1">
          <div class="row-span-1">
            <img src="../../assets/icons/profil.svg" class="w-[50px] h-[50px] mt-[20px]" />
          </div>
          <div class="mr-[250px]">
            <p class="font-bold mt-[20px]">{{ kasirCheckData.namaAkun }}</p>
            <p class="text-sm text-grey-300">
              Terakhir login {{ epochToDate(kasirCheckData.terakhirLogin,"dateTime") }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-[15%_15%_40%_30%]">
          <div>
            <p class="mt-[30px] text-sm font-bold">Shift</p>
          </div>
          <div>
            <p class="mt-[30px] text-sm">: {{ kasirCheckData.shift }}</p>
          </div>
          <div>
            <p class="mt-[30px] ml-[30px] text-sm font-bold">
              Tanggal & Jam Closing
            </p>
          </div>
          <div>
            <p class="mt-[30px] ml-[10px] text-sm">: {{ epochToDate(kasirCheckData.tanggalJamClosing, "dateTime") }}</p>
          </div>
        </div>
        <hr class="mt-8 border-1 border-grey-200" />

        <!-- Saldo Awal -->
        <div class="flex justify-between">
          <div>
            <p class="mt-6 text-sm font-bold">Saldo Awal (Kas)</p>
          </div>
          <div>
            <p class="mt-6 text-sm">{{ saldoAwal }}</p>
          </div>
        </div>

        <!-- Tunai -->
        <div class="flex justify-between">
          <div>
            <p class="mt-6 text-sm font-bold">Tunai</p>
          </div>
          <div>
            <CustomInputNumber v-model="cash" :show-label="false" class="mt-[15px]" placeholder="">
              <template #prependText>
                <div
                  class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md">
                  Rp.
                </div>
              </template>
            </CustomInputNumber>
          </div>
        </div>

        <!-- Debit -->
        <div class="flex justify-between">
          <div>
            <p class="mt-6 text-sm font-bold">Debit</p>
          </div>
          <div>
            <CustomInputNumber v-model="debit" :show-label="false" class="mt-[15px]" placeholder="0">
              <template #prependText>
                <div
                  class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md">
                  Rp.
                </div>
              </template>
            </CustomInputNumber>
          </div>
        </div>

        <!-- Kredit -->
        <div class="flex justify-between">
          <div>
            <p class="mt-6 text-sm font-bold">Kredit (Asuransi)</p>
          </div>
          <div>
            <CustomInputNumber v-model="insurance" :show-label="false" class="mt-[15px]" placeholder="0">
              <template #prependText>
                <div
                  class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md">
                  Rp.
                </div>
              </template>
            </CustomInputNumber>
          </div>
        </div>
        <hr class="mt-6 border-1 border-grey-200" />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton @click="closeKasirDialog = false" label="Batal" outlined class="" borderColor="border-grey-200"
            textColor="text-grey-300" />
          <CustomButton @click="submitCloseKasir" label="Closing Kasir" class="ml-2" backgroundColor="bg-adameds-300" />
        </div>
      </template>
    </CustomDialog>

    <!-- Pembayaran -->
    <CustomDialog v-model:visible="pembayaranBPJSDialog" width="600px">
      <template #header>Pembayaran</template>
      <template #body>
        <div class="flex justify-between">
          <div>
            <p class="font-bold mt-[20px]">Grand Total</p>
          </div>
          <div>
            <p class="font-bold mt-[20px]">Rp. {{ kasirData.grandTotal }}</p>
          </div>
        </div>
        <hr class="mt-6 border-1 border-grey-200" />
        
        <!-- Bagian ini akan tampil jika cara bayar BUKAN Asuransi -->
        <div v-if="payment_type !== 'INSURANCE'">
          <div class="flex justify-between">
            <div>
              <p class="font-bold mt-[30px] text-sm">Jumlah Bayar</p>
            </div>
            <div>
              <CustomInputNumber v-model="amount" :show-label="false" class="mt-[15px]" placeholder="0">
                <template #prependText>
                  <div
                    class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md">
                    Rp.
                  </div>
                </template>
              </CustomInputNumber>
            </div>
          </div>
          
          <div class="flex justify-between">
            <div>
              <p class="font-bold mt-[30px] text-sm">Kembalian</p>
            </div>
            <div>
              <CustomInputNumber :model-value="kembalian" :show-label="false" class="mt-[15px]" placeholder="0" :disabled="true">
                <template #prependText>
                  <div
                    class="font-semibold text-MD leading-7 bg-adameds-300 text-white w-[53.34px] flex items-center justify-center border-r rounded-l-md">
                    Rp.
                  </div>
                </template>
              </CustomInputNumber>
            </div>
          </div>
          <hr class="mt-6 border-1 border-grey-200" />
        </div>

        <!-- Bagian ini akan tampil JIKA cara bayar adalah Asuransi -->
        <div v-else>
          <div class="flex justify-between">
            <div>
              <p class="font-bold mt-[30px] text-sm">Dijamin</p>
            </div>
            <div>
              <CustomInputNumber v-model="amount" :show-label="false" class="mt-[15px]" placeholder="0">
                <template #prependText>
                  <div
                    class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md">
                    Rp.
                  </div>
                </template>
              </CustomInputNumber>
            </div>
          </div>
          <hr class="mt-6 border-1 border-grey-200" />
        </div>

        <!-- Keterangan -->
        <div>
          <CustomTextfield v-model="note" class="mt-[30px]" label="Catatan" placeholder="Keterangan" />
        </div>

        <!-- Metode Pembayaran -->
        <div class="flex mt-[20px] gap-4">
          <div>
            <CustomSelect label="Cara Bayar" class="flex-1" optionLabel="label" optionValue="value"
              :options="optionCaraBayar" v-model="payment_type" />
          </div>
          <div v-if="payment_type !== 'INSURANCE'">
            <CustomSelect label="Metode Pembayaran" class="flex-1" optionLabel="label" optionValue="value"
              :options="optionMetodeBayar" v-model="payment_method" />
          </div>
          <div>
            <CustomTextfield v-model="information" class="flex-1" label="Keterangan" placeholder="Keterangan" />
          </div>
          <div class="mt-[25px] flex items-end">
            <!-- Tombol ini akan melakukan hit API ke-2 -->
            <CustomButton label="Bayar" class="" @click="submitPaymentKasir" />
          </div>
        </div>
      </template>
    </CustomDialog>

    <!-- List Tagihan Rawat Inap -->
    <CustomDialog v-model:visible="listTagihanRIDialog" width="1000px">
      <template #header>Detail Tagihan Pelayanan</template>
      <template #body>
        <div>
          <div class="pt-5">
            <div class="flex">
              <p class="font-bold">{{ openedData.layanan }}</p>
              <CustomChip class="ml-2" :showCheckedIcon="false" label="TUNAI" bgColor="bg-adameds-50"
                textColor="text-adameds-300" borderColor="border-adameds-300" />
              <CustomChip class="ml-2" :showCheckedIcon="false" label="BPJS" bgColor="bg-warning-50"
                textColor="text-warning-300" borderColor="border-warning-300" />
            </div>
            <div class="flex">
              <UserDoctorIcon class="mt-2" />
              <p class="mt-2 text-sm text-grey-400">
                {{ openedData.doctor }}
              </p>
            </div>
            <div class="flex">
              <p class="text-sm">Tanggal</p>
              <PhArrowRight :size="18" class="my-auto ml-2 text-success-300" weight="bold" />
              <p class="ml-2 text-sm">{{ openedData.tanggal_jadwal }}</p>
              <p class="ml-2 text-sm">{{ openedData.no_time }} </p>
            </div>
          </div>

          <!-- table kamar-->
          <div class="pt-5 shadow-md rounded-xl" v-if="itemTagihan?.item?.ruangan?.list?.length > 0">
            <DataTable :value="itemTagihan.item.ruangan.list" class="overflow-hidden rounded-t-[10px]"
              :pt="{ headerRow: 'text-SM' }">
              <Column header="Tanggal" headerClass="bg-adameds-50" style="width: 12%">
                <template #body="slotProps">
                  <p class="text-SM">{{ epochToDate(slotProps.data.dateUsed, "date") }}</p>
                </template>
              </Column>
              <Column header="Kamar" headerClass="bg-adameds-50" style="width: 20%">
                <template #body="slotProps">
                  <p class="text-sm">{{ slotProps.data.kamar }}</p>
                </template>
              </Column>
              <Column header="Jenis Ruangan" headerClass="bg-adameds-50" style="width: 20%">
                <template #body="slotProps">
                  <p class="text-sm">{{ slotProps.data.jenisRuangan }}</p>
                </template>
              </Column>
              <Column header="Kelas Ruangan" headerClass="bg-adameds-50" style="width: 13%">
                <template #body="slotProps">
                  <p class="text-sm">{{ slotProps.data.kelasRuangan }}</p>
                </template>
              </Column>
              <Column header="Waktu" headerClass="bg-adameds-50 text-right" bodyClass="text-right" style="width: 10%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.waktu }} Hari</div>
                </template>
              </Column>
              <Column header="Tarif" headerClass="bg-adameds-50 text-right" bodyClass="text-right" style="width: 15%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.tarif }}</div>
                </template>
              </Column>
              <Column header="Total" headerClass="bg-adameds-50 text-right" bodyClass="text-right" style="width: 15%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.waktu * slotProps.data.total }}</div>
                </template>
              </Column>
            </DataTable>
            <div class="flex justify-between p-2 font-bold bg-white rounded-b-[10px]">
              <p class="text-base font-bold ">Total</p>
              <p class="text-base font-bold">
                Total Rp {{ itemTagihan.item.ruangan.total }}
              </p>
            </div>
          </div>

          <!-- table penunjang -->
          <div class="pt-5 shadow-md rounded-xl" v-if="itemTagihan?.item?.penunjang?.list?.length > 0">
            <DataTable :value="itemTagihan.item.penunjang.list" class="overflow-hidden rounded-t-[10px]"
              :pt="{ headerRow: 'text-SM' }">
              <Column header="Tanggal" headerClass="bg-adameds-50" style="width: 15%">
                <template #body="slotProps">
                  <p class="text-SM">{{ epochToDate(slotProps.data.dateUsed, "date") }}</p>
                </template>
              </Column>
              <Column header="Penunjang" headerClass="bg-adameds-50" style="width: 45%">
                <template #body="slotProps">
                  <p class="text-sm">{{ slotProps.data.itemName }}</p>
                </template>
              </Column>
              <Column header="Jumlah" headerClass="bg-adameds-50 text-right" bodyClass="text-center" style="width: 10%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.qty }}</div>
                </template>
              </Column>
              <Column header="Tarif" headerClass="bg-adameds-50 text-right" bodyClass="text-right" style="width: 15%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.price }}</div>
                </template>
              </Column>
              <Column header="Total" headerClass="bg-adameds-50 text-right" bodyClass="text-right" style="width: 15%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.qty * slotProps.data.price }}</div>
                </template>
              </Column>
            </DataTable>
            <div class="flex justify-between p-3 font-bold bg-white rounded-b-[10px]">
              <p class="text-base font-bold ">Total</p>
              <p class="text-base font-bold">
                RP {{ itemTagihan.item.penunjang.total }}
              </p>
            </div>
          </div>

          <!-- table tindakan -->
          <div class="pt-5 shadow-md rounded-xl" v-if="itemTagihan?.item?.tindakan?.list?.length > 0">
            <DataTable :value="itemTagihan.item.tindakan.list" class="overflow-hidden rounded-t-[10px]"
              :pt="{ headerRow: 'text-SM' }">
              <Column header="Tanggal" headerClass="bg-adameds-50" style="width: 15%">
                <template #body="slotProps">
                  <p class="text-SM">{{ epochToDate(slotProps.data.dateUsed, "date") }}</p>
                </template>
              </Column>
              <Column header="Tindakan, Pemeriksaan, dan Administrasi" headerClass="bg-adameds-50" style="width: 45%">
                <template #body="slotProps">
                  <p class="text-sm">{{ slotProps.data.itemName }}</p>
                </template>
              </Column>
              <Column header="Jumlah" headerClass="bg-adameds-50 text-right" bodyClass="text-center" style="width: 10%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.qty }}</div>
                </template>
              </Column>
              <Column header="Tarif" headerClass="bg-adameds-50 text-right" bodyClass="text-right" style="width: 15%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.price }}</div>
                </template>
              </Column>
              <Column header="Total" headerClass="bg-adameds-50 text-right" bodyClass="text-right" style="width: 15%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.qty * slotProps.data.price }}</div>
                </template>
              </Column>
            </DataTable>
            <div class="flex justify-between p-3 font-bold bg-white rounded-b-[10px]">
              <p class="text-base font-bold ">Total</p>
              <p class="text-base font-bold">
                RP {{ itemTagihan.item.tindakan.total }}
              </p>
            </div>
          </div>

          <!-- table obat -->
          <div class="pt-5 shadow-md rounded-xl" v-if="itemTagihan?.item?.obat?.list?.length > 0">
            <DataTable :value="itemTagihan.item.obat.list" class="overflow-hidden rounded-t-[10px]"
              :pt="{ headerRow: 'text-SM' }">
              <Column header="Tanggal" headerClass="bg-adameds-50" style="width: 15%">
                <template #body="slotProps">
                  <p class="text-SM">{{ epochToDate(slotProps.data.dateUsed, "date") }}</p>
                </template>
              </Column>
              <Column header="Obat" headerClass="bg-adameds-50" style="width: 25%">
                <template #body="slotProps">
                  <p class="text-sm">{{ slotProps.data.itemName }}</p>
                </template>
              </Column>
              <Column header="Golongan Obat" headerClass="bg-adameds-50" style="width: 15%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.additionalField }}</div>
                </template>
              </Column>
              <Column header="Jumlah" headerClass="bg-adameds-50 text-right" bodyClass="text-center" style="width: 10%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.qty }}</div>
                </template>
              </Column>
              <Column header="Tarif" headerClass="bg-adameds-50 text-right" bodyClass="text-right" style="width: 10%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.price }}</div>
                </template>
              </Column>
              <Column header="Jasa" headerClass="bg-adameds-50 text-right" bodyClass="text-right" style="width: 10%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.serviceFee ?? 0 }}</div>
                </template>
              </Column>
              <Column header="Total" headerClass="bg-adameds-50 text-right" bodyClass="text-right" style="width: 15%">
                <template #body="slotProps">
                  <div class="text-SM">
                    {{ slotProps.data.qty * slotProps.data.price + (slotProps.data.serviceFee ?? 0) }}
                  </div>
                </template>
              </Column>
            </DataTable>
            <div class="flex justify-between p-3 font-bold bg-white rounded-b-[10px]">
              <p class="text-base font-bold ">Total</p>
              <p class="text-base font-bold">
                RP {{ itemTagihan.item.obat.total }}
              </p>
            </div>
          </div>

          <!-- table alkes -->
          <div class="pt-5 shadow-md rounded-xl" v-if="itemTagihan?.item?.alkes?.list?.length > 0">
            <DataTable :value="itemTagihan.item.alkes.list" class="overflow-hidden rounded-t-[10px]"
              :pt="{ headerRow: 'text-SM' }">
              <Column header="Tanggal" headerClass="bg-adameds-50" style="width: 15%">
                <template #body="slotProps">
                  <p class="text-SM">{{ epochToDate(slotProps.data.dateUsed, "date") }}</p>
                </template>
              </Column>
              <Column header="Alkes" headerClass="bg-adameds-50" style="width: 45%">
                <template #body="slotProps">
                  <p class="text-sm">{{ slotProps.data.itemName }}</p>
                </template>
              </Column>
              <Column header="Jumlah" headerClass="bg-adameds-50 text-right" bodyClass="text-center" style="width: 10%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.qty }}</div>
                </template>
              </Column>
              <Column header="Tarif" headerClass="bg-adameds-50 text-right" bodyClass="text-right" style="width: 15%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.price }}</div>
                </template>
              </Column>
              <Column header="Total" headerClass="bg-adameds-50 text-right" bodyClass="text-right" style="width: 15%">
                <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.qty * slotProps.data.price }}</div>
                </template>
              </Column>
            </DataTable>
            <div class="flex justify-between p-3 font-bold bg-white rounded-b-[10px]">
              <p class="text-base font-bold ">Total</p>
              <p class="text-base font-bold">
                RP {{ itemTagihan.item.alkes.total }}
              </p>
            </div>
          </div>

          <div class="mt-4">
            <card class="bg-adameds-50">
              <template #content>
                <div class="flex justify-between">
                  <p class="text-base font-bold">Total Keseluruhan</p>
                  <p class="text-base font-bold">
                    RP. {{ itemTagihan.total }},00
                  </p>
                </div>
              </template>
            </card>
          </div>
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
