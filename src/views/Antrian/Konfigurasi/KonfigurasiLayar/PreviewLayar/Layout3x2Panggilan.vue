<script setup lang="ts">
import { computed, watch } from "vue";

const props = defineProps({
  payload: {
    type: Object,
    default: () => ({}),
  },
  isPoli: {
    type: Boolean,
    default: false,
  },
  activeOrder: {
    type: Array as () => Array<"poli" | "admisi" | "farmasi">,
    default: () => [],
  },
});

const poliAt = (idx: number) => {
  const arr = Array.isArray(props.payload) ? props.payload : [];
  if (arr.length === 0) return null;
  // gunakan modulo agar tidak error saat jumlah payload < 3
  return arr[idx % arr.length] ?? null;
};

// Tentukan 3 kolom secara dinamis:
// - Kolom paling kanan = item pertama pada activeOrder
// - Kolom berikutnya mengisi ke kiri
// - Jika isPoli = false, buang 'poli' dari activeOrder
// - Jika tidak ada yang aktif, tampilkan 3 placeholder
const columns = computed<Array<"poli" | "admisi" | "farmasi" | "placeholder">>(
  () => {
    // filter poli jika tidak diaktifkan
    const filtered = (props.activeOrder || []).filter(
      (k) => k !== "poli" || props.isPoli
    );
    // siapkan 3 kolom default placeholder
    const cols: Array<"poli" | "admisi" | "farmasi" | "placeholder"> = [
      "placeholder",
      "placeholder",
      "placeholder",
    ];
    // tempatkan dari kanan ke kiri
    for (let i = 0; i < Math.min(filtered.length, 3); i++) {
      const rightIndex = 2 - i;
      cols[rightIndex] = filtered[i] as "poli" | "admisi" | "farmasi";
    }
    return cols;
  }
);
</script>

<template>
  <!-- Header Panggilan -->
  <div
    class="flex gap-2 justify-center items-center py-1 my-3 w-full text-white rounded-lg bg-adameds-300"
  >
    <div>
      <PhMegaphone :size="18" class="scale-x-[-1]" weight="fill" />
    </div>
    <div>Panggilan</div>
  </div>

  <div class="grid-container">
    <!-- Loop kolom: kanan ke kiri sudah diatur oleh computed 'columns' -->
    <template v-for="(col, colIdx) in columns" :key="'col-' + colIdx">
      <!-- Kolom POLI -->
      <template v-if="col === 'poli'">
        <div
          v-for="item in 2"
          :key="'poli-' + item"
          class="grid grid-rows-2 h-full bg-white rounded-lg"
        >
          <div class="flex justify-center items-center text-4xl font-extrabold">
            {{ poliAt(item)?.codeAntrianPoli }}00{{ item }}
          </div>
          <div class="flex rounded-b-lg bg-adameds-50">
            <div class="flex items-center w-full">
              <div
                class="flex justify-center items-center p-6 h-full rounded-bl-lg bg-adameds-300 rounded-s-lg"
                dir="rtl"
              >
                <PhCaretDoubleRight :size="44" color="#ffffff" weight="bold" />
              </div>
              <div class="px-3 w-full">
                <div class="text-3xl font-black">Poli</div>
                <hr class="border-adameds-300" />
                <div class="text-xl font-bold">Ini Dokter</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Kolom ADMISI -->
      <template v-else-if="col === 'admisi'">
        <div
          v-for="item in 2"
          :key="'admisi-' + item"
          class="grid grid-rows-2 h-full bg-white rounded-lg"
        >
          <div class="flex justify-center items-center text-4xl font-extrabold">
            A00{{ item }}
          </div>
          <div class="flex rounded-b-lg bg-adameds-50">
            <div class="flex items-center w-full">
              <div
                class="flex justify-center items-center p-6 h-full rounded-bl-lg bg-adameds-300 rounded-s-lg"
                dir="rtl"
              >
                <PhCaretDoubleRight :size="44" color="#ffffff" weight="bold" />
              </div>
              <div class="px-3 w-full">
                <div class="text-3xl font-black">Udin Bin Wahab</div>
                <hr class="border-adameds-300" />
                <div class="text-xl font-bold">00-03-42</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Kolom FARMASI -->
      <template v-else-if="col === 'farmasi'">
        <div
          v-for="item in 2"
          :key="'farmasi-' + item"
          class="grid grid-rows-2 h-full bg-white rounded-lg"
        >
          <div class="flex justify-center items-center text-4xl font-extrabold">
            F00{{ item }}
          </div>
          <div class="flex rounded-b-lg bg-adameds-50">
            <div class="flex items-center w-full">
              <div
                class="flex justify-center items-center p-6 h-full rounded-bl-lg bg-adameds-300 rounded-s-lg"
                dir="rtl"
              >
                <PhCaretDoubleRight :size="44" color="#ffffff" weight="bold" />
              </div>
              <div class="px-3 w-full">
                <div class="text-3xl font-black">Loket Farmasi</div>
                <hr class="border-adameds-300" />
                <div class="text-xl font-bold">Farmasi</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Kolom PLACEHOLDER (tidak ada toggle aktif) -->
      <template v-else>
        <div
          v-for="i in 2"
          :key="'placeholder-' + i"
          class="grid grid-rows-2 h-full rounded-lg bg-adameds-50"
        >
          <div
            class="flex justify-center items-center text-4xl font-extrabold text-transparent"
          >
            —
          </div>
          <div class="flex rounded-b-lg bg-adameds-50">
            <div class="flex items-center w-full opacity-0">
              <div
                class="flex justify-center items-center p-6 h-full rounded-bl-lg bg-adameds-300 rounded-s-lg"
                dir="rtl"
              >
                <PhCaretDoubleRight :size="44" color="#ffffff" weight="bold" />
              </div>
              <div class="px-3 w-full">
                <div class="text-3xl font-black">Placeholder</div>
                <hr class="border-adameds-300" />
                <div class="text-xl font-bold">—</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  height: calc(100% - 57px); /* Kurangi tinggi header */
  grid-auto-flow: column;
  min-height: 300px;
  width: 100%;
}

.grid-item {
  background-color: #ef4444;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  min-height: 80px;
  font-size: 1rem;
}

/* Responsivitas untuk layar kecil */
@media (max-height: 600px) {
  .grid-container {
    min-height: 200px;
  }

  .grid-item {
    min-height: 60px;
    font-size: 0.875rem;
  }
}

/* Responsivitas untuk layar sangat kecil */
@media (max-height: 400px) {
  .grid-container {
    min-height: 150px;
    gap: 4px;
  }

  .grid-item {
    min-height: 40px;
    font-size: 0.75rem;
  }
}
</style>
