<script setup lang="ts">
import DatePickers from "@/components/Base/DatePicker.vue";
import Select from "@/components/Base/Select.vue";
import Switch from "@/components/Base/Switch.vue";
import CardPanggilan from "@/components/Base/CardPanggilan.vue";
import { ref } from "vue";
import TiketAntrian from "@/components/Base/TiketAntrian.vue";

//For Test Selected Component
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

//For Test Date Picker Component
const selectedDate = ref();
const testDate = (data: any) => {
  console.log("Date: ", data);
};
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let firstDayOfCurrentMonth = new Date(year, month+1, 10);

//For Test Time Picker Component
const selectedTime = ref();
const testTime = (data: any) => {
  console.log("Time: ", data);
};

//For Test Toggle Switch Component
const toggleSwitch = ref();
const testSwitch = (data: any) => {
  console.log("value: ", toggleSwitch.value);
};
</script>

<template>
  <div class="h-screen m-10 overflow-scroll">
    <Select 
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
      label="Choose a Date" 
      v-model="selectedDate" 
      :invalid="false"
      invalidMessage="Wajib diisi" 
      :disabled="false" 
     
      :maxDate=firstDayOfCurrentMonth
    />
    
    <p>Date: {{ selectedDate }}</p>
    <br>
    <DatePickers
      label="Choose a Time" 
      timeOnly
      v-model="selectedTime" 
      :invalid="false"
      invalidMessage="Wajib diisi" 
      :disabled="false" 
      @date-select="testTime" 
    />
    <p>Time: {{ selectedTime }}</p>
    <br>
    <Switch 
    label="Switch"
    v-model="toggleSwitch" 
    @input="testSwitch"
    :invalid="false"
    invalidMessage="Wajib diisi" 
    :disabled="false" 
    />
    <p>Switch: {{ toggleSwitch }}</p>
    <br>
    <div class="w-[300px]">
      <CardPanggilan/>
    </div>
    <br>
    <div class="w-3/4 h-[100px]">
      <TiketAntrian />
    </div>
    
  </div>
</template>
