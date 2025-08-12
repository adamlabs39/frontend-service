<script setup lang="ts">
import { ref } from "vue";

// Data dummy untuk informasi antrian
const antrianData = ref([
  { lokasi: "Lokasi 1", antrian: ["-", "-", "-", "-", "-", "-"] },
  { lokasi: "Lokasi 2", antrian: ["-", "-", "-", "-", "-", "-"] },
  { lokasi: "Lokasi 3", antrian: ["-", "-", "-", "-", "-", "-"] },
]);

// Data dummy untuk panggilan
const panggilanData = ref([
  { id: 1, text: "" },
  { id: 2, text: "" },
  { id: 3, text: "" },
]);
</script>

<template>
  <div class="flex h-full gap-2 pt-1">
    <!-- Bagian Kiri: Informasi Antrian (3 Kolom List) -->
    <div class="flex-1 flex gap-2">
      <!-- Header Informasi Antrian -->
      <div class="w-full">
        <div
          class="flex gap-2 justify-center items-center py-1 w-full text-white rounded-lg bg-adameds-300 mb-2"
        >
          <div>
            <PhInfo :size="18" weight="fill" />
          </div>
          <div>Informasi Antrian</div>
        </div>

        <!-- 3 Kolom List -->
        <div class="content-area flex gap-2">
          <div
            v-for="(data, index) in antrianData"
            :key="index"
            class="flex-1 flex flex-col"
          >
            <!-- Header Lokasi -->
            <div
              class="bg-adameds-300 text-white text-center py-2 rounded-t-lg font-semibold text-sm"
            >
              {{ data.lokasi }}
            </div>

            <!-- List Antrian -->
            <div
              class="flex-1 bg-white border-2 border-adameds-300 border-t-0 rounded-b-lg flex flex-col overflow-hidden"
            >
              <div
                v-for="(item, itemIndex) in data.antrian"
                :key="itemIndex"
                class="flex-1 border-b border-gray-200 last:border-b-0 px-3 text-center text-gray-600 flex items-center justify-center"
                :class="{
                  'bg-gray-50': itemIndex % 2 === 1,
                }"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bagian Kanan: Panggilan (3 Kotak) -->
    <div class="w-1/3 flex flex-col h-full">
      <!-- Header Panggilan -->
      <div
        class="flex gap-2 justify-center items-center py-1 w-full text-white rounded-lg bg-adameds-300 mb-2"
      >
        <div>
          <PhMegaphone :size="18" class="scale-x-[-1]" weight="fill" />
        </div>
        <div>Panggilan</div>
      </div>

      <!-- 3 Kotak Panggilan -->
      <div class="content-area flex flex-col gap-2">
        <div
          v-for="(panggilan, index) in panggilanData"
          :key="panggilan.id"
          class="flex-1 bg-gray-200 border-2 border-adameds-300 rounded-lg flex items-center justify-center text-gray-500 font-semibold min-h-[80px]"
        >
          <span v-if="panggilan.text">{{ panggilan.text }}</span>
          <span v-else class="text-gray-400">-</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-area {
  height: calc(100% - 40px); /* 40px = tinggi header internal */
}
</style>
