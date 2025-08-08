<script setup lang="ts">
import { ref } from "vue";

/* Data dummy */
const antrianData = ref(["-", "-", "-", "-", "-", "-"]); // 6 baris
const panggilanText = ref("");
</script>

<template>
  <div class="flex gap-2 pt-1 h-full">
    <!-- ===== Bagian Kiri : 1 List Antrian ===== -->
    <div class="flex flex-col flex-1">
      <!-- Header Informasi Antrian -->
      <div
        class="flex gap-2 justify-center items-center py-1 mb-2 w-full text-white rounded-lg bg-adameds-300"
      >
        <PhInfo :size="18" weight="fill" />
        <span>Informasi Antrian</span>
      </div>

      <!-- List Antrian -->
      <div
        class="flex overflow-hidden flex-col bg-white rounded-b-lg border-2 content-area border-adameds-300"
      >
        <!-- Header Lokasi -->
        <div
          class="py-2 text-sm font-semibold text-center text-white rounded-t-lg bg-adameds-300"
        >
          Lokasi Pelayanan 1
        </div>
        <div class="grid flex-1 grid-cols-3 divide-x divide-gray-200">
          <div
            v-for="(item, idx) in antrianData"
            :key="idx"
            class="flex justify-center items-center px-3 text-gray-600 border-b border-gray-200 last:border-b-0"
            :class="{ 'bg-gray-50': idx % 2 === 1 }"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <!-- ===== Bagian Kanan : 1 Panggilan + 1 Youtube ===== -->
    <div class="flex flex-col w-1/3 h-full">
      <!-- Header Panggilan -->
      <div
        class="flex gap-2 justify-center items-center py-1 mb-2 w-full text-white rounded-lg bg-adameds-300"
      >
        <PhMegaphone :size="18" class="scale-x-[-1]" weight="fill" />
        <span>Panggilan</span>
      </div>

      <div class="flex flex-col gap-2 content-area">
        <!-- Kotak Panggilan -->
        <div
          class="flex-1 bg-gray-200 border-2 border-adameds-300 rounded-lg flex items-center justify-center text-gray-500 font-semibold min-h-[80px]"
        >
          <span v-if="panggilanText">{{ panggilanText }}</span>
          <span v-else>-</span>
        </div>
        <!-- Kotak Youtube -->
        <div
          class="flex-1 bg-adameds-300 border-2 border-adameds-300 rounded-lg flex items-center justify-center text-white font-bold min-h-[80px]"
        >
          Youtube
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-area {
  height: calc(100% - 40px); /* Mengurangi tinggi header internal (≈40px) */
}
</style>
