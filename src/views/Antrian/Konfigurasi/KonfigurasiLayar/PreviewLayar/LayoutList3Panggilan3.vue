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
  isAdmisi: {
    type: Boolean,
    default: false,
  },
  isFarmasi: {
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
          <!-- Kolom 1: Admisi atau Placeholder -->
          <div
            class="flex overflow-hidden flex-col w-full h-full bg-white rounded-lg"
          >
            <template v-if="isAdmisi">
              <div class="py-2 font-bold text-center text-white bg-adameds-300">
                Admisi
              </div>
              <div class="grid flex-1 grid-rows-6">
                <div
                  v-for="i in 6"
                  :key="'admisi-' + i"
                  class="flex justify-center items-center px-4 text-2xl font-extrabold"
                  :class="i % 2 === 0 ? 'bg-adameds-50' : 'bg-white'"
                >
                  A00{{ i }}
                </div>
              </div>
            </template>
            <template v-else>
              <div class="py-2 font-bold text-center text-white bg-adameds-300">
                Lokasi 1
              </div>
              <div class="grid flex-1 grid-rows-6">
                <div
                  v-for="i in 6"
                  :key="'placeholder1-' + i"
                  class="flex justify-center items-center px-4 text-2xl font-extrabold"
                  :class="i % 2 === 0 ? 'bg-adameds-50' : 'bg-white'"
                >
                  -
                </div>
              </div>
            </template>
          </div>

          <!-- Kolom 2: Poli atau Placeholder -->
          <div
            class="flex overflow-hidden flex-col w-full h-full bg-white rounded-lg"
          >
            <template v-if="isPoli">
              <div class="py-2 font-bold text-center text-white bg-adameds-300">
                Poli
              </div>
              <div class="grid flex-1 grid-rows-6">
                <div
                  v-for="i in 6"
                  :key="'poli-' + i"
                  class="flex justify-center items-center px-4 text-2xl font-extrabold"
                  :class="i % 2 === 0 ? 'bg-adameds-50' : 'bg-white'"
                >
                  {{ poliAt(i)?.codeAntrianPoli }}00{{ i }}
                </div>
              </div>
            </template>
            <template v-else>
              <div class="py-2 font-bold text-center text-white bg-adameds-300">
                Lokasi 2
              </div>
              <div class="grid flex-1 grid-rows-6">
                <div
                  v-for="i in 6"
                  :key="'placeholder2-' + i"
                  class="flex justify-center items-center px-4 text-2xl font-extrabold"
                  :class="i % 2 === 0 ? 'bg-adameds-50' : 'bg-white'"
                >
                  -
                </div>
              </div>
            </template>
          </div>

          <!-- Kolom 3: Farmasi atau Placeholder -->
          <div
            class="flex overflow-hidden flex-col w-full h-full bg-white rounded-lg"
          >
            <template v-if="isFarmasi">
              <div class="py-2 font-bold text-center text-white bg-adameds-300">
                Farmasi
              </div>
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
            </template>
            <template v-else>
              <div class="py-2 font-bold text-center text-white bg-adameds-300">
                Lokasi 3
              </div>
              <div class="grid flex-1 grid-rows-6">
                <div
                  v-for="i in 6"
                  :key="'placeholder3-row-' + i"
                  class="grid grid-cols-2"
                >
                  <div
                    class="flex justify-center items-center px-4 text-2xl font-extrabold border-r border-adameds-100"
                    :class="i % 2 === 0 ? 'bg-adameds-50' : 'bg-white'"
                  >
                    -
                  </div>
                  <div
                    class="flex justify-center items-center px-4 text-2xl font-extrabold"
                    :class="i % 2 === 0 ? 'bg-adameds-50' : 'bg-white'"
                  >
                    -
                  </div>
                </div>
              </div>
            </template>
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
        <template v-if="isAdmisi">
          <div
            v-for="item in 3"
            :key="'panggilan-' + item"
            class="grid grid-rows-2 h-full bg-white rounded-lg"
          >
            <div
              class="flex justify-center items-center text-4xl font-extrabold"
            >
              A00{{ item }}
            </div>
            <div class="flex rounded-b-lg bg-adameds-50">
              <div class="flex items-center w-full">
                <div
                  class="flex justify-center items-center p-6 h-full rounded-bl-lg bg-adameds-300 rounded-s-lg"
                  dir="rtl"
                >
                  <PhCaretDoubleRight
                    :size="44"
                    color="#ffffff"
                    weight="bold"
                  />
                </div>
                <div class="px-3 w-full">
                  <div class="text-3xl font-black">Loket 1</div>
                  <hr class="border-adameds-300" />
                  <div class="text-xl font-bold">Admisi</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div
            v-for="item in 3"
            :key="'placeholder-panggilan-' + item"
            class="h-full rounded-lg bg-adameds-50"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-area {
  height: calc(100% - 40px); /* 40px = tinggi header internal */
}
</style>
