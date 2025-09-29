<script setup lang="ts">
import { computed, ref } from "vue";

/* Props */
const props = defineProps<{ media?: any }>();

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
const antrianData = ref([
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
]); // 6 baris
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
          <div class="grid grid-cols-3 h-full">
            <div
              v-for="(item, idx) in antrianData"
              :key="idx"
              class="flex justify-center items-center text-gray-600 bg-gray-50 border border-gray-200 min-h-[60px]"
            >
              <span class="text-lg font-medium">{{ item }}</span>
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

      <div class="flex flex-col gap-2 content-area">
        <!-- Kotak Panggilan -->
        <div
          class="flex-1 bg-gray-200 border-2 border-adameds-300 rounded-lg flex items-center justify-center text-gray-500 font-semibold min-h-[80px]"
        >
          <span v-if="panggilanText">{{ panggilanText }}</span>
          <span v-else>-</span>
        </div>
        <!-- Kotak Youtube -->
        <div
          class="flex-1 bg-adameds-300 border-2 border-adameds-300 rounded-lg flex items-center justify-center text-white font-bold min-h-[80px]"
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
