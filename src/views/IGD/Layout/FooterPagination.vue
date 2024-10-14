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
  value: {
    type: String,
  },
  showCancelVisit: {
    type: Boolean,
  },
  cancelReason: {
    type: String,
  },
});
const emit = defineEmits([
  "toggle-cancel-visit",
  "confirm-cancel",
  "update:valueCancle",
]);
const valueCancle = ref(props.value);
watch(valueCancle, (newValue) => {
  emit("update:valueCancle", newValue);
});
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
        :disabled="!cancelReason"
      />
      <CustomTextfield
        v-if="showCancelVisit"
        :showLabel="false"
        :value="valueCancle"
        @input="valueCancle = $event"
        class="my-auto w-[400px]"
        placeholder="Alasan Batal Kunjungan"
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
    <CustomPaginator :rows="2" :totalRecords="10" />
  </div>
</template>
