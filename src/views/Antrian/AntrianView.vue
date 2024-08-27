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
        name: "Konfigurasi",
        icon: "sliders-fill",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Jadwal Dokter",
            icon: "",
            type: linkType.LINK,
            url: "/antrian/konfigurasi/jadwal-dokter",
          },
          {
            name: "Layar Antrian",
            icon: "",
            type: linkType.LINK,
            url: "/antrian/konfigurasi/layar-antrian",
          },
        ],
      },
      {
        name: "Data antrian",
        icon: "user-list-bold",
        type: linkType.LINK,
        url: "/antrian/data-antrian",
      },
      {
        name: "Monitoring antrian",
        icon: "list-bullets-bold",
        type: linkType.LINK,
        url: "/antrian/monitoring-antrian",
      },
    ],
  },
  {
    name: "2",
    type: linkType.SECTION,
    child: [
      {
        name: "Layar",
        icon: "screencast-fill",
        type: linkType.LINK,
        url: "/antrian/layar",
      },
      {
        name: "APM",
        icon: "airplay-fill",
        type: linkType.LINK,
        url: "/antrian/apm",
      },
    ],
  },
]);
</script>

<template>
  <div class="flex h-full gap-3">
    <Sidebar
      sidebarTitle="Antrian"
      sidebarTitleUrl="/antrian"
      class="flex-none"
      :sidebar-body-list="sidebarBodyList"
      showStockBtn
    />
    <component
      class="max-h-full overflow-auto grow"
      :is="$route.meta.page || 'div'"
    ></component>
  </div>
</template>
