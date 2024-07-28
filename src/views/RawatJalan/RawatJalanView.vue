<script setup lang="ts">
import Sidebar from "@/components/section/Sidebar.vue";
import { linkType } from "@/utils/Enum";
import type { SidebarBody } from "@/utils/Interface";
import { ref } from "vue";

const sidebarBodyList = ref<SidebarBody[]>([
  {
    name: "1",
    type: linkType.SECTION,
    child: [
      {
        name: "BPJS",
        icon: "BPJS",
        type: linkType.DROPDOWN,
        child: [
          { name: "Monitoring Kunjungan", type: linkType.LINK, url: '/bpjs/monitoring-kunjungan' },
          { name: "Monitoring Riwayat Kunjungan", type: linkType.LINK },
          { name: "Monitoring Obat Kunjungan", type: linkType.LINK },
        ],
      },
      {
        name: "Laporan",
        icon: "Report",
        type: linkType.DROPDOWN,
        child: [
          { name: "Kunjungan Rawat Jalan", type: linkType.LINK },
          { name: "Pembatalan Poli", type: linkType.LINK },
          { name: "Rekap Tindakan Pasien", type: linkType.LINK },
        ],
      },
    ],
  },
]);
const filter = ref('')
</script>

<template>
  <div class="flex h-full gap-3">
    <Sidebar
      sidebarTitle="Rawat Jalan"
      sidebarTitleUrl="/rawat-jalan"
      class="flex-none"
      :sidebar-body-list="sidebarBodyList"
      showFilterPoli
      showStockBtn
      v-model:filter="filter"
    />
    <component
      class="max-h-full overflow-auto grow"
      :is="$route.meta.page || 'div'"
      :filter="filter"
    ></component>
  </div>
</template>
