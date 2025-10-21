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
  let pos = 2; // isi dari kanan sesuai toggle
  for (const key of props.activeOrder) {
    if (pos < 0) break;
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
    <div class="grid grid-cols-3 grid-rows-3 grid-flow-col gap-2 content-area">
      <template v-for="(colType, colIdx) in columns" :key="colIdx">
        <!-- Kolom Poli -->
        <template v-if="colType === 'poli'">
          <div
            v-for="item in 3"
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
            v-for="item in 3"
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
            v-for="item in 3"
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
          <div v-for="item in 3" class="h-full rounded-lg bg-adameds-50"></div>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  gap: 12px;
  height: calc(100% - 57px); /* Kurangi tinggi header */
  min-height: 400px;
}

.content-area {
  height: calc(100% - 57px); /* Mengurangi tinggi header internal (≈57px) */
}
</style>
