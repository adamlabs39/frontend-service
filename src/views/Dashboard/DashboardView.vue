<script setup lang="ts">
import { ref } from 'vue';
import CardDashboard from './CardDashboard.vue'
import CustomDatePicker from '@/components/Base/CustomDatePicker.vue';

const startDateFilter = ref<Date>(new Date())
const endDateFilter = ref<Date>(new Date())

</script>



<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center gap-2.5 p-5 bg-white rounded-lg">
      <div class="p-2 text-white bg-teal-400 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2l4-4m2 1.5L9 21m0-7h3" />
        </svg>
      </div>
      <div class="flex items-center justify-between w-full font-semibold text-teal-500 text-subTitle ">Dashboard
        <div class="flex">
          <CustomDatePicker v-model="startDateFilter" label="" class="w-[150px]" />
          <PhMinus class="mt-auto mb-2 mx-[10px] text-black" />
          <CustomDatePicker v-model="endDateFilter" :showLabel="false" class="mt-auto w-[150px]" />
        </div>
      </div>
    </div>

    <div class="flex gap-2.5">
      <div class="w-1/4">
        <CardDashboard />
      </div>
      <div class="w-1/4">
        <CardDashboard />
      </div>
      <div class="w-1/4">
        <CardDashboard />
      </div>
      <div class="w-1/4">
        <CardDashboard />
      </div>
    </div>
  </div>

</template>
