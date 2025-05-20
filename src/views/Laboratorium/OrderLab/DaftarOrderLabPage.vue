<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { computed, ref, type PropType } from "vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import PatientIdentityForm from "../Section/DaftarOrderLab/PatientIdentityForm.vue";
import DoctorVisitForm from "../Section/DaftarOrderLab/DoctorVisitForm.vue";
import OrderTindakan from "../Section/DaftarOrderLab/OrderTindakan.vue";
import { useOrderLab } from "@/stores/Laboratorium/orderLab";
import { utilsStore } from "@/stores/utils";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  formType: {
    type: String,
    default: "",
  },
  isDetail: {
    type: Boolean,
    required: false,
  },
  patientData: {
    type: Object as PropType<any>,
    required: true,
  },
});

const orderLabStore = useOrderLab();
const storeUtils = utilsStore();
const patientIdentityForm = ref<InstanceType<
  typeof PatientIdentityForm
> | null>(null);
const doctorVisitForm = ref<InstanceType<typeof DoctorVisitForm> | null>(null);
const openedPatientData = ref<any>({});
const emit = defineEmits(["back", "goToDetail", "goToEdit"]);

console.log("pageType", props.pageType);

const postRegisterPatient = async () => {
  let tempPatientData: any;
  let tempDocterVisitData: any;
  tempDocterVisitData = await doctorVisitForm.value?.onSubmit();
  tempPatientData = await patientIdentityForm.value?.onSubmit();
  let payload: any = { patientData: tempPatientData, ...tempDocterVisitData };
  console.log("tempDocterVisitData", tempDocterVisitData);
  console.log("tempPatientData", tempPatientData);
  storeUtils.setLoading(true);
  try {
    let response;
    if (props.pageType === "order-lab") {
      payload.noRm = tempPatientData.noRm;
      payload.pelayanan = "aps";
      response = await orderLabStore.postApi(payload);
    } else {
      response = await orderLabStore.putApi(payload);
    }
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    storeUtils.setLoading(false);
  }
};
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <Card class="h-min mb-[10px] absolute top-0 right-0 left-0">
      <template #content>
        <div class="flex justify-between">
          <CustomBreadCrumb
            :home="{
              label: 'Order Lab',
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
      <PatientIdentityForm
        class="mt-2"
        :dataBreadCrumb="dataBreadCrumb"
        ref="patientIdentityForm"
        :pageType="pageType"
        :formType="formType"
        :isDetail="isDetail"
        :patientData="openedPatientData"
        @back="dataBreadCrumb.pop()"
      />
      <DoctorVisitForm
        class="mt-2"
        ref="doctorVisitForm"
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
        :patientData="openedPatientData"
        :isDetail="isDetail"
        @back="dataBreadCrumb.pop()"
      />

      <OrderTindakan
        class="mt-2"
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
        :patientData="openedPatientData"
        @back="dataBreadCrumb.pop()"
      />
    </div>

    <Card class="absolute inset-x-0 bottom-0">
      <template #footer>
        <div class="flex justify-end">
          <CustomButton
            label="Reset"
            class="mr-[10px]"
            outlined
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            label="Simpan"
            class=""
            backgroundColor="bg-adameds-300"
            @click="postRegisterPatient"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
