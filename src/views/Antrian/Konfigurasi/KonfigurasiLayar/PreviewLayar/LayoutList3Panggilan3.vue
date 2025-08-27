<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  payload: {
    type: Object,
    default: () => ({}),
  },
  isPoli: {
    type: Boolean,
    default: false,
  },
});

const poliAt = (idx: number) => {
  const arr = Array.isArray(props.payload) ? props.payload : [];
  if (arr.length === 0) return null;
  // gunakan modulo agar tidak error saat jumlah payload < 3
  return arr[idx % arr.length] ?? null;
};

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
  <div class="flex gap-2 pt-1 h-full">
    <!-- Bagian Kiri: Informasi Antrian (3 Kolom List) -->
    <div class="flex flex-1 gap-2">
      <!-- Header Informasi Antrian -->
      <div class="w-full">
        <div
          class="flex gap-2 justify-center items-center py-1 mb-2 w-full text-white rounded-lg bg-adameds-300"
        >
          <div>
            <PhInfo :size="18" weight="fill" />
          </div>
          <div>Informasi Antrian</div>
        </div>

        <!-- 3 Kolom List -->
        <div class="flex gap-2 content-area">
          <!-- Admisi -->
          <div
            class="flex overflow-hidden flex-col w-full h-full bg-white rounded-lg"
          >
            <div class="py-2 font-bold text-center text-white bg-adameds-300">
              Admisi
            </div>
            <div class="grid flex-1 grid-rows-6">
              <div
                v-for="i in 6"
                :key="'poli-anak-' + i"
                class="flex justify-center items-center px-4 text-2xl font-extrabold"
                :class="i % 2 === 0 ? 'bg-adameds-50' : 'bg-white'"
              >
                A00{{ i }}
              </div>
            </div>
          </div>

          <!-- Poli Anak -->
          <div
            class="flex overflow-hidden flex-col w-full h-full bg-white rounded-lg"
          >
            <div class="py-2 font-bold text-center text-white bg-adameds-300">
              Poli Anak
            </div>
            <!-- Grid 6 baris dengan tinggi merata -->
            <div class="grid flex-1 grid-rows-6">
              <div
                v-for="i in 6"
                :key="'poli-anak-' + i"
                class="flex justify-center items-center px-4 text-2xl font-extrabold"
                :class="i % 2 === 0 ? 'bg-adameds-50' : 'bg-white'"
              >
                AN00{{ i }}
              </div>
            </div>
          </div>

          <!-- Farmasi -->
          <div
            class="flex overflow-hidden flex-col w-full h-full bg-white rounded-lg"
          >
            <div class="py-2 font-bold text-center text-white bg-adameds-300">
              Farmasi
            </div>
            <!-- Grid 6 baris; tiap baris punya 2 kolom -->
            <div class="grid flex-1 grid-rows-6">
              <div
                v-for="i in 6"
                :key="'farmasi-row-' + i"
                class="grid grid-cols-2"
              >
                <div
                  class="flex justify-center items-center px-4 text-2xl font-extrabold border-r border-adameds-100"
                  :class="i % 2 === 0 ? 'bg-adameds-50' : 'bg-white'"
                >
                  R00{{ i }}
                </div>
                <div
                  class="flex justify-center items-center px-4 text-2xl font-extrabold"
                  :class="i % 2 === 0 ? 'bg-adameds-50' : 'bg-white'"
                >
                  NR00{{ i }}
                </div>
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
        class="flex gap-2 justify-center items-center py-1 mb-2 w-full text-white rounded-lg bg-adameds-300"
      >
        <div>
          <PhMegaphone :size="18" class="scale-x-[-1]" weight="fill" />
        </div>
        <div>Panggilan</div>
      </div>

      <!-- 3 Kotak Panggilan -->
      <div class="flex flex-col gap-2 content-area">
        <div
          v-for="(panggilan, index) in panggilanData"
          :key="panggilan.id"
          class="flex-1 bg-adameds-50 border-2 border-adameds-300 rounded-lg flex items-center justify-center text-gray-500 font-semibold min-h-[80px]"
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
