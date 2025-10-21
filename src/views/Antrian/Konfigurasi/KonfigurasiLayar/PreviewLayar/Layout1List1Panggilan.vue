<script setup lang="ts">
import { computed, ref } from "vue";

/* Props */
const props = defineProps<{
  media?: any;
  // Tambahan props untuk data Admisi dari API
  admisiCallsWaiting?: any[];
  admisiCallsActive?: any[];
}>();

/* Helper: convert various YouTube URLs to embed URL */
const toEmbedUrl = (url?: string) => {
  if (!url) return "";
  try {
    const u = new URL(url);
    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    // youtube.com/watch?v=<id>
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      // youtube.com/embed/<id>
      if (u.pathname.startsWith("/embed/")) return url;
    }
    return "";
  } catch {
    return "";
  }
};

const embedUrl = computed(() => toEmbedUrl(props.media));

/* Data dummy */
const waitingNos = computed<string[]>(() =>
  (Array.isArray(props.admisiCallsWaiting) ? props.admisiCallsWaiting : [])
    .map(
      (x: any) =>
        x?.patient_data?.antrian?.no_antrian_admisi ??
        x?.patientData?.antrian?.noAntrianAdmisi ??
        null
    )
    .filter((v: any) => !!v)
);

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
  return arr[0]?.patient_data?.name ?? arr[0]?.patientData?.name ?? undefined;
});

// ========= 3 kolom x 6 baris, isi secara kolom (column-major) =========
// Ambil maksimal 18 sel: 6 baris per kolom x 3 kolom.
// Urutan penempatan: isi kolom 1 (baris 1..6), lanjut kolom 2 (1..6), kolom 3 (1..6).
const displayedCells = computed(() => {
  const cells: string[] = [];
  for (let i = 0; i < 18; i++) {
    cells.push(waitingNos.value[i] ?? "-");
  }
  return cells;
});
const panggilanText = ref("");
</script>

<template>
  <div class="flex gap-2 pt-1 h-full">
    <!-- ===== Bagian Kiri : 1 List Antrian ===== -->
    <div class="flex flex-col flex-1">
      <!-- Header Informasi Antrian -->
      <div
        class="flex gap-2 justify-center items-center py-1 my-3 w-full text-white rounded-lg bg-adameds-300"
      >
        <PhInfo :size="18" weight="fill" />
        <span>Informasi Antrian</span>
      </div>

      <!-- List Antrian -->
      <div
        class="flex overflow-hidden flex-col bg-white rounded-lg border-2 content-area border-adameds-300"
      >
        <!-- Header Lokasi -->
        <div
          class="py-2 text-sm font-semibold text-center text-white rounded-t-lg bg-adameds-300"
        >
          Lokasi Pelayanan 1
        </div>
        <div class="flex-1">
          <!-- Grid 3 kolom x 6 baris, pengisian per kolom -->
          <div class="grid grid-cols-3 grid-rows-6 grid-flow-col h-full">
            <div
              v-for="(item, idx) in displayedCells"
              :key="idx"
              class="flex justify-center items-center text-black border border-gray-200 min-h-[60px]"
              :class="(idx % 6) % 2 === 1 ? 'bg-adameds-50' : 'bg-white'"
            >
              <span class="text-5xl font-bold">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== Bagian Kanan : 1 Panggilan + 1 Youtube ===== -->
    <div class="flex flex-col w-1/3 h-full">
      <!-- Header Panggilan -->
      <div
        class="flex gap-2 justify-center items-center py-1 my-3 w-full text-white rounded-lg bg-adameds-300"
      >
        <PhMegaphone :size="18" class="scale-x-[-1]" weight="fill" />
        <span>Panggilan</span>
      </div>

      <!-- Gunakan grid agar kotak Panggilan & Youtube seimbang -->
      <div class="grid grid-rows-2 gap-2 content-area">
        <!-- Kotak Panggilan -->
        <div
          class="grid grid-rows-2 bg-white rounded-lg border-2 border-adameds-300"
        >
          <div
            class="flex justify-center items-center text-5xl font-extrabold text-adameds-300"
          >
            {{ activeNos[0] ?? "-" }}
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
                <div class="text-3xl font-black">
                  {{ activeName ?? "-" }}
                </div>
                <hr class="border-adameds-300" />
                <div class="text-xl font-bold">Admisi</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Kotak Youtube -->
        <div
          class="flex justify-center items-center font-bold text-white rounded-lg border-2 bg-adameds-300 border-adameds-300"
        >
          <iframe
            v-if="embedUrl"
            :src="embedUrl"
            title="YouTube video"
            class="w-full h-full rounded-lg"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <span v-else>Youtube</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-area {
  height: calc(100% - 57px); /* Mengurangi tinggi header internal (≈57px) */
}
</style>
