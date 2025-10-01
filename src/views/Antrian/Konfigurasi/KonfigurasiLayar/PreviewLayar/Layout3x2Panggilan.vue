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
  admisiCallsActive: {
    type: Array,
    default: () => [],
  },
});

const activeNos = computed<string[]>(() =>
  (Array.isArray(props.admisiCallsActive) ? props.admisiCallsActive : [])
    .map(
      (x: any) =>
        x?.patient_data?.antrian?.no_antrian_admisi ??
        x?.patientData?.antrian?.noAntrianAdmisi ??
        null
    )
    .filter((v: any) => !!v)
);

const activeName = computed<string | undefined>(() => {
  const arr = Array.isArray(props.admisiCallsActive)
    ? props.admisiCallsActive
    : [];
  if (!arr.length) return undefined;
  return arr[0]?.patientData?.name ?? arr[0]?.patientData?.name ?? undefined;
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
const columns = computed(() => {
  const cols: Array<"placeholder" | "poli" | "admisi" | "farmasi"> = [
    "placeholder",
    "placeholder",
    "placeholder",
  ];
  let pos = 2; // isi dari kanan sesuai toggle
  for (const key of props.activeOrder) {
    if (pos < 0) break;
    if (key === "poli" && !props.isPoli) continue;
    cols[pos] = key;
    pos--;
  }
  return cols;
});
</script>

<template>
  <!-- Header Panggilan -->
  <div class="flex flex-col h-full">
    <div
      class="flex gap-2 justify-center items-center py-1 my-3 w-full text-white rounded-lg bg-adameds-300"
    >
      <div>
        <PhMegaphone :size="18" class="scale-x-[-1]" weight="fill" />
      </div>
      <div>Panggilan</div>
    </div>

    <!-- gunakan utilitas grid tailwind + content-area agar tinggi proporsional -->
    <div class="grid grid-cols-3 grid-rows-2 grid-flow-col gap-2 content-area">
      <template v-for="(colType, colIdx) in columns" :key="colIdx">
        <!-- Kolom Poli -->
        <template v-if="colType === 'poli'">
          <div
            v-for="item in 2"
            class="grid grid-rows-2 h-full bg-white rounded-lg"
          >
            <div
              class="flex justify-center items-center text-5xl font-extrabold text-adameds-300"
            >
              -
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
                  <div class="text-3xl font-black">Poli</div>
                  <hr class="border-adameds-300" />
                  <div class="text-xl font-bold">Ini Dokter</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Kolom Admisi -->
        <template v-else-if="colType === 'admisi'">
          <div
            v-for="item in 2"
            class="grid grid-rows-2 h-full bg-white rounded-lg"
          >
            <div
              class="flex justify-center items-center text-5xl font-extrabold text-adameds-300"
            >
              {{ activeNos[item - 1] ?? "-" }}
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
                  <div class="text-3xl font-black">{{ activeName }}</div>
                  <hr class="border-adameds-300" />
                  <div class="text-xl font-bold">Admisi</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Kolom Farmasi -->
        <template v-else-if="colType === 'farmasi'">
          <div
            v-for="item in 2"
            class="grid grid-rows-2 h-full bg-white rounded-lg"
          >
            <div
              class="flex justify-center items-center text-5xl font-extrabold text-adameds-300"
            >
              -
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
                  <div class="text-3xl font-black">Loket Farmasi</div>
                  <hr class="border-adameds-300" />
                  <div class="text-xl font-bold">Farmasi</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Kolom Placeholder -->
        <template v-else>
          <div v-for="item in 2" class="h-full rounded-lg bg-adameds-50"></div>
        </template>
      </template>
    </div>
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

.content-area {
  height: calc(100% - 57px); /* Mengurangi tinggi header internal (≈57px) */
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
