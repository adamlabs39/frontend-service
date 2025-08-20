// ClosedBillDetailPage.vue

<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { useReportCloseBillStore } from "@/stores/pembayaran/closeBill";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import PatientIdentityForm from "../Section/PatientIdentityForm.vue";
import TransactionHistory from "../Section/TransactionHistory.vue";
import PaymentForm from "../Section/PaymentForm.vue";
import HistoryPayment from "../Section/HistoryPayment.vue";
import { utilsStore } from "@/stores/utils";
import { useRouter } from 'vue-router';

const props = defineProps({
  billUuid: {
    type: String,
    required: true,
  },
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
});

const emit = defineEmits(["back", "goToDetail", "goToEdit"]);

const store = useReportCloseBillStore();
const storeUtils = utilsStore();
const router = useRouter();

const patientDetailData = ref<any>(null);
const isPaidStatus = ref<boolean>(true);

const wasEverUnpaid = ref<boolean>(false); // <-- [DITAMBAHKAN] State baru untuk melacak status piutang

const handlePaymentStatusUpdate = (isPaid: boolean) => {
  isPaidStatus.value = isPaid;
  // Jika tagihan pernah berstatus 'false' (piutang), tandai wasEverUnpaid menjadi true
  if (isPaid === false) {
    wasEverUnpaid.value = true;
  }
};

const goToPelunasan = () => {
  if (props.billUuid) {
    router.push({
      path: '/pembayaran/kasir', // Pastikan path ini sesuai dengan route ke CashierPage.vue
      query: {
        bill_uuid: props.billUuid,
        mode: 'pelunasan' 
      }
    });
  }
};



const fetchPatientDetails = async () => {
  if (!props.billUuid) return;
  storeUtils.setLoading(true);
  try {
    const response = await store.getDetailPasienBill(props.billUuid);
    if (response.payload && response.payload.patient && response.payload.bill) {
      const combinedData = { ...response.payload.patient, ...response.payload.bill };
      patientDetailData.value = combinedData;
    }
  } catch (error) {
    console.error("Gagal mengambil detail pasien:", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

onMounted(() => {
  fetchPatientDetails();
});
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <Card class="h-min mb-[10px] absolute top-0 right-0 left-0">
      <template #content>
        <div class="flex justify-between">
          <CustomBreadCrumb
            :home="{
              label: 'Closed Bill',
              home: true,
            }"
            :model="dataBreadCrumb"
            class=""
          />
          <div class="flex">
            <CustomButton
              @click="emit('back')"
              icon="PhCaretLeft"
              label="Kembali"
              outlined
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
            />
          </div>
        </div>
      </template>
    </Card>
    
    <div class="relative h-full overflow-auto top-[90px] pb-[180px]">
      <PatientIdentityForm class="mt-2" :patient-data="patientDetailData" />
      <TransactionHistory class="mt-4" :service-bills="patientDetailData?.serviceBill" /> 
      
      <PaymentForm
        class="mt-4"
        :bill-uuid="billUuid"
        @update:payment-status="handlePaymentStatusUpdate"
      />
      <HistoryPayment
        class="mt-4"
        :bill-uuid="billUuid"
        @update:payment-status="handlePaymentStatusUpdate"
      />
    </div>

    <Card class="absolute inset-x-0 bottom-0">
      <template #content>
        <div class="flex justify-end">
          <CustomButton
            v-if="!isPaidStatus"
            label="Lunaskan"
            class=""
            backgroundColor="bg-adameds-300"
            @click="goToPelunasan"
          />
        </div>
      </template>
    </Card>
  </div>
</template>