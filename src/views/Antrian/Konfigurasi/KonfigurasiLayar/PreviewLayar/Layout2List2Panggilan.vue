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
  admisiCallsActive: {
    type: Array,
    default: () => [],
  },
  admisiCallsWaiting: {
    type: Array,
    default: () => [],
  },
});

// Informasi antrian
const admisiWaitingNoAt = (idx: number) => {
  const arr = Array.isArray(props.admisiCallsWaiting)
    ? props.admisiCallsWaiting
    : [];
  if (arr.length === 0 || idx - 1 >= arr.length) return null;
  const item = arr[idx - 1];
  return item?.patientData?.antrian?.noAntrianAdmisi ?? null;
};

// Panggilan
const admisiActiveNoAt = (idx: number) => {
  const arr = Array.isArray(props.admisiCallsActive)
    ? props.admisiCallsActive
    : [];
  if (arr.length === 0 || idx - 1 >= arr.length) return null;
  const item = arr[idx - 1];
  return item?.patientData?.antrian?.noAntrianAdmisi ?? null;
};

const admisiActiveName = (idx: number) => {
  const arr = Array.isArray(props.admisiCallsActive)
    ? props.admisiCallsActive
    : [];
  if (arr.length === 0 || idx - 1 >= arr.length) return null;
  const item = arr[idx - 1];
  return item?.patientData?.name ?? null;
};
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
                  class="flex justify-center items-center px-4 text-5xl font-extrabold"
                  :class="i % 2 === 0 ? 'bg-adameds-50' : 'bg-white'"
                >
                  {{ admisiWaitingNoAt(i) ?? "-" }}
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
                Lokasi 2
              </div>
              <div class="grid flex-1 grid-rows-6">
                <div
                  v-for="i in 6"
                  :key="'poli-' + i"
                  class="flex justify-center items-center px-4 text-2xl font-extrabold"
                  :class="i % 2 === 0 ? 'bg-adameds-50' : 'bg-white'"
                >
                  -
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
      <div class="flex flex-col gap-2 content-area">
        <template v-if="isAdmisi">
          <div
            v-for="item in 2"
            :key="'panggilan-' + item"
            class="grid grid-rows-2 h-full bg-white rounded-lg"
          >
            <div
              class="flex justify-center items-center text-5xl font-extrabold text-adameds-300"
            >
              {{ admisiActiveNoAt(item) ?? "-" }}
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
                  <div class="text-3xl font-black">
                    {{ admisiActiveName(item) ?? "-" }}
                  </div>
                  <hr class="border-adameds-300" />
                  <div class="text-xl font-bold">Admisi</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div
            v-for="item in 2"
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
  height: calc(100% - 57px); /* 40px = tinggi header internal */
}
</style>
