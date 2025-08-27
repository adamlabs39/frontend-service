<script setup lang="ts">
import { computed } from "vue";
import { watch } from "vue";

const props = defineProps({
  payload: {
    type: Array,
    default: () => [],
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
  if (!Array.isArray(props.payload) || props.payload.length === 0) {
    return null;
  }
  return props.payload[(idx - 1) % props.payload.length] ?? null;
};

const columns = computed(() => {
  const cols: Array<"placeholder" | "poli" | "admisi" | "farmasi"> = [
    "placeholder",
    "placeholder",
    "placeholder",
  ];
  // tempatkan dari kanan sesuai urutan toggle
  let pos = 2; // indeks kanan
  for (const key of props.activeOrder) {
    if (pos < 0) break;
    // jika poli dinonaktifkan (props.isPoli false), jangan tampilkan poli
    if (key === "poli" && !props.isPoli) continue;
    cols[pos] = key;
    pos--;
  }
  return cols;
});

watch(
  () => props.payload,
  (newPayload) => {
    console.log("Payload data:", newPayload);
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <!-- Header Panggilan -->
  <div
    class="flex gap-2 justify-center items-center py-1 my-1 w-full text-white rounded-lg bg-adameds-300"
  >
    <div>
      <PhMegaphone :size="18" class="scale-x-[-1]" weight="fill" />
    </div>
    <div>Panggilan</div>
  </div>

  <div class="grid-container">
    <template v-for="(colType, colIdx) in columns" :key="colIdx">
      <!-- Kolom Poli -->
      <template v-if="colType === 'poli'">
        <div
          v-for="item in 3"
          class="grid grid-rows-2 h-full bg-white rounded-lg"
        >
          <div class="flex justify-center items-center text-4xl font-extrabold">
            {{ poliAt(item)?.codeAntrianPoli ?? poliAt(item)?.code ?? "" }}00{{
              item
            }}
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

      <!-- Kolom Admisi -->
      <template v-else-if="colType === 'admisi'">
        <div
          v-for="item in 3"
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
                <div class="text-3xl font-black">Loket 1</div>
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
          v-for="item in 3"
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

      <!-- Kolom Placeholder -->
      <template v-else>
        <div v-for="item in 3" class="h-full rounded-lg bg-adameds-50"></div>
      </template>
    </template>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  gap: 4px;
  height: calc(100% - 40px); /* Kurangi tinggi header */
  min-height: 400px;
}
</style>
