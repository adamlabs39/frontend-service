<script setup lang="ts">
import Sidebar from "@/components/section/Sidebar.vue";
import { linkType } from "@/utils/Enum";
import type { SidebarBody } from "@/utils/Interface";
import { ref } from "vue";

const filter = ref("Semua Ruangan");

const sidebarBodyList = ref<SidebarBody[]>([
  {
    name: "1",
    type: linkType.SECTION,
    child: [
      {
        name: "Perpindahan Bangsal",
        icon: "HandshakeIcon",
        type: linkType.LINK,
        url: "/",
      },
    ],
  },
  {
    name: "2",
    type: linkType.SECTION,
    child: [
      {
        name: "BPJS",
        icon: "BPJSIcon",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Monitoring Kunjungan",
            type: linkType.LINK,
            url: "/rawat-inap/bpjs/monitoring-kunjungan",
          },
          {
            name: "Monitoring Riwayat Kunjungan",
            type: linkType.LINK,
            url: "/rawat-inap/bpjs/monitoring-riwayat-kunjungan",
          },
          {
            name: "Monitoring Obat Kunjungan",
            type: linkType.LINK,
            url: "/rawat-inap/bpjs/monitoring-obat-kunjungan",
          },
        ],
      },
      {
        name: "Laporan",
        icon: "FileReportIcon",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Kunjungan Rawat Inap",
            type: linkType.LINK,
            url: "/",
          },
          {
            name: "Perpindahan Pasien",
            type: linkType.LINK,
            url: "/",
          },
          {
            name: "Pembatalan Dirawat",
            type: linkType.LINK,
            url: "/",
          },
          {
            name: "Rekap Tindakan Pasien",
            type: linkType.LINK,
            url: "/",
          },
        ],
      },
    ],
  },
]);
</script>

<template>
  <div class="flex h-full gap-3">
    <Sidebar
      sidebarTitle="Rawat Inap"
      sidebarTitleUrl="/rawat-inap"
      class="flex-none"
      :sidebar-body-list="sidebarBodyList"
      showFilterRuangan
      showStockBtn
      v-model:filterRuang="filter"
    />
    <component
      class="max-h-full overflow-auto grow"
      :is="$route.meta.page || 'div'"
      :filterRuang="filter"
    ></component>
  </div>
</template>
