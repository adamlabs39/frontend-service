<script setup lang="ts">
import { ref } from "vue";

// Data dummy untuk informasi antrian
const antrianData = ref([
  { lokasi: "Lokasi 1", antrian: ["-", "-", "-", "-", "-", "-"] },
  { lokasi: "Lokasi 2", antrian: ["-", "-", "-", "-", "-", "-"] },
]);

// Data dummy untuk panggilan
const panggilanData = ref([
  { id: 1, text: "" },
  { id: 2, text: "" },
]);
</script>

<template>
  <div class="flex gap-2 pt-1 h-full">
    <!-- Bagian Kiri: Informasi Antrian (3 Kolom List) -->
    <div class="flex flex-1 gap-2">
      <!-- Header Informasi Antrian -->
      <div class="w-full">
        <div
          class="flex gap-2 justify-center items-center py-1 my-3 w-full text-white rounded-lg bg-adameds-300"
        >
          <div>
            <PhInfo :size="18" weight="fill" />
          </div>
          <div>Informasi Antrian</div>
        </div>

        <!-- 3 Kolom List -->
        <div class="flex gap-3 content-area">
          <div
            v-for="(data, index) in antrianData"
            :key="index"
            class="flex flex-col flex-1"
          >
            <!-- Header Lokasi -->
            <div
              class="py-2 text-sm font-semibold text-center text-white rounded-t-lg bg-adameds-300"
            >
              {{ data.lokasi }}
            </div>

            <!-- List Antrian -->
            <div
              class="flex overflow-hidden flex-col flex-1 bg-white rounded-b-lg border-2 border-t-0 border-adameds-300"
            >
              <div
                v-for="(item, itemIndex) in data.antrian"
                :key="itemIndex"
                class="flex flex-1 justify-center items-center px-3 text-center text-gray-600 border-b border-gray-200 last:border-b-0"
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
    <div class="flex flex-col w-1/3 h-full">
      <!-- Header Panggilan -->
      <div
        class="flex gap-2 justify-center items-center py-1 my-3 w-full text-white rounded-lg bg-adameds-300"
      >
        <div>
          <PhMegaphone :size="18" class="scale-x-[-1]" weight="fill" />
        </div>
        <div>Panggilan</div>
      </div>

      <!-- 3 Kotak Panggilan -->
      <div class="flex flex-col gap-3 content-area">
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
  height: calc(100% - 57px); /* 40px = tinggi header internal */
}
</style>
