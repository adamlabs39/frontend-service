<script setup lang="ts">
import Sidebar from "@/components/section/Sidebar.vue";
import { linkType } from "@/utils/Enum";
import { ref } from "vue";

interface SidebarBody {
  name: string;
  icon?: string;
  type: linkType;
  child?: SidebarBody[];
}

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
          { name: "Monitoring Kunjungan", type: linkType.LINK },
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
</script>

<template>
  <div class="flex h-full gap-3">
    <Sidebar
      sidebarTitle="Rawat Jalan"
      class="flex-none"
      :sidebar-body-list="sidebarBodyList"
      showFilterPoli
      showStockBtn
    />
    <div class="max-h-full overflow-auto grow">Pasien Rawat Jalan</div>
  </div>
</template>
