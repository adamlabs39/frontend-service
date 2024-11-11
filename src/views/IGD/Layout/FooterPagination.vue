<script setup lang="ts">
import { watch, ref } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
const props = defineProps({
  cancleButton: {
    type: Boolean,
    default: false,
  },
  showCancelVisit: {
    type: Boolean,
  },
  rows: {
    type: Number,
    required: true,
  },
  totalRecords: {
    type: Number,
    required: true,
  },

});
const emit = defineEmits([
  "toggle-cancel-visit",
  "confirm-cancel",
  "update:valueCancle",
  "page",
  "update:cancleReason"
]);
const cancleReason=ref<string>("")
const handlePage = (event: any) => {
  emit("page", event);
};
</script>

<template>
  <div class="flex justify-between">
    <div v-if="cancleButton" class="flex">
      <CustomButton
        v-if="!showCancelVisit"
        @click="$emit('toggle-cancel-visit', true)"
        class="my-auto bg-danger-300"
        label="Batal Kunjungan"
      />
      <CustomButton
        v-if="showCancelVisit"
        @click="$emit('toggle-cancel-visit', false)"
        class="my-auto mr-[10px]"
        label="Batal"
        outlined
        borderColor="border-grey-200"
        textColor="text-grey-300"
      />
      <CustomButton
        v-if="showCancelVisit"
        @click="$emit('confirm-cancel')"
        class="my-auto mr-5 bg-danger-300"
        label="Iya, Batalkan"
        :disabled="!cancleReason"
      />
      <CustomTextfield
        v-if="showCancelVisit"
        :showLabel="false"
        v-model="cancleReason"
        class="my-auto w-[400px]"
        placeholder="Alasan Batal Kunjungan"
        @update:modelValue="$emit('update:cancleReason', cancleReason)"
      />
    </div>
    <CustomButton
      v-else
      icon="PhPrinter"
      icon-pos="left"
      icon-type="fill"
      class="my-auto bg-adameds-300"
      label="Cetak"
    />
    <CustomPaginator :rows="rows"
      :totalRecords="totalRecords"
      @page="handlePage" />
  </div>
</template>
