<script setup lang="ts">

</script>



<template>
  <div class="w-auto p-5 bg-white rounded-lg shadow-md">
    <!-- Header Section -->
    <div class="flex items-center gap-2.5 mb-4">
      <div class="w-10 h-10 text-white bg-teal-400 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5.121 19a4.5 4.5 0 006.379 0M9 12.75A6 6 0 1121 12.75M9 12.75a3 3 0 100-6h.75" />
        </svg>
      </div>
      <div class="font-semibold text-black text-SM">Total Kunjungan</div>
    </div>

    <!-- Main Content -->
    <div class="">
      <div class="flex flex-col justify-end">
        <div class="font-bold text-black text-[40px] ">125</div>
        <div class="text-gray-400 text-normal">Pasien</div>
      </div>
      <div class="flex justify-end -mt-6">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div class="text-normal text-success-300">20%</div>
      </div>

    </div>
  </div>
</template>
