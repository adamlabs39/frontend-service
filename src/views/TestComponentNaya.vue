<script setup lang="ts">
import DatePickers from "@/components/Base/DatePicker.vue";
import Select from "@/components/Base/Select.vue";
import { ref } from "vue";

const selectedItems = ref();

const items = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);

const testLog = (data: any) => {
  console.log("city data: ", data);
  console.log("city: ", selectedItems.value);
};

const selectedDate = ref();
const testDate = (data: any) => {
  console.log("Date: ", data);
};

const selectedTime = ref();
const testTime = (data: any) => {
  console.log("Time: ", data);
};
</script>

<template>
  <div class="justify-center m-10">
    <Select 
      :showLabel="true"
      label="Choose a City" 
      v-model="selectedItems" 
      :options="items" 
      optionValue="code" 
      optionLabel="name" 
      :isLoading="false" 
      :invalid="false"
      invalidMessage="Wajib diisi" 
      :disabled="false" 
      @change="testLog" 
    />
    <p>Kota: {{ selectedItems }}</p>
    <br>
    <DatePickers
      :showLabel="true"
      label="Choose a Date" 
      v-model="selectedDate" 
      :invalid="false"
      invalidMessage="Wajib diisi" 
      :disabled="false" 
      @date-select="testDate" 
    />
    <p>Date: {{ selectedDate }}</p>
    <br>
    <DatePickers
      :showLabel="true"
      label="Choose a Time" 
      timeOnly
      v-model="selectedTime" 
      :invalid="false"
      invalidMessage="Wajib diisi" 
      :disabled="false" 
      @date-select="testTime" 
    />
    <p>Time: {{ selectedTime }}</p>
  </div>
</template>
