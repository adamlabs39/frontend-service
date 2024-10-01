<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { computed, ref, type PropType } from "vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import PatientIdentityForm from "../Section/PatientIdentityForm.vue";
import TransactionHistory from "../Section/TransactionHistory.vue";
import PaymentForm from "../Section/PaymentForm.vue";

const props = defineProps({
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
              class="mr-[10px]"
              outlined
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
            />
          </div>
        </div>
      </template>
    </Card>
    <div class="relative h-full overflow-auto top-[90px] pb-[180px]">
      <PatientIdentityForm class="mt-2" />
      <!-- form bikin lag -->
      <TransactionHistory class="mt-4" /> 
      <PaymentForm class="mt-4" />
    </div>
    <Card class="absolute inset-x-0 bottom-0">
      <template #content>
        <div class="flex justify-end">
          <CustomButton
            label="Lunaskan"
            class=""
            backgroundColor="bg-adameds-300"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
