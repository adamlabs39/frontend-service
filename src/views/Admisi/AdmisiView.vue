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
        name: "Rawat Jalan",
        icon: "user-plus",
        type: linkType.LINK,
        url: "/admisi/rawat-jalan",
      },
      {
        name: "Rawat Inap",
        icon: "user-plus",
        type: linkType.LINK,
        url: "/admisi/rawat-inap",
      },
      {
        name: "IGD",
        icon: "user-plus",
        type: linkType.LINK,
        url: "/admisi/igd",
      },
    ],
  },
  {
    name: "2",
    type: linkType.SECTION,
    child: [
      {
        name: "SEP",
        icon: "BPJS",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Rawat Jalan",
            icon: "Rawat Jalan",
            type: linkType.LINK,
            url: "/admisi/sep/rawat-jalan",
          },
          {
            name: "Rawat Inap",
            icon: "Rawat Inap",
            type: linkType.LINK,
            url: "/admisi/sep/rawat-inap",
          },
          {
            name: "IGD",
            icon: "IGD",
            type: linkType.LINK,
            url: "/admisi/sep/igd",
          },
        ],
      },
      {
        name: "Data Pasien",
        icon: "database-user",
        type: linkType.LINK,
        url: "/admisi/data-pasien",
      },
      {
        name: "Monitoring Kamar",
        icon: "monitoring-bed",
        type: linkType.LINK,
        url: "/admisi/monitoring-kamar",
      },
    ],
  },
  {
    name: "2",
    type: linkType.SECTION,
    child: [
      {
        name: "Laporan",
        icon: "Report",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Kunjungan",
            icon: "Kunjungan",
            type: linkType.LINK,
          },
          {
            name: "Penjamin",
            icon: "Penjamin",
            type: linkType.LINK,
          },
          {
            name: "Batal Kunjungan",
            icon: "Batal Kunjungan",
            type: linkType.LINK,
          },
          {
            name: "Status Kamar",
            icon: "Status Kamar",
            type: linkType.LINK,
          },
          {
            name: "Keperawatan Inap Pasien",
            icon: "Keperawatan Inap Pasien",
            type: linkType.LINK,
          },
          {
            name: "Bayi Baru Lahir",
            icon: "Bayi Baru Lahir",
            type: linkType.LINK,
          },
          {
            name: "Rekap Jumlah Pasien BPJS",
            icon: "Rekap Jumlah Pasien BPJS",
            type: linkType.LINK,
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
      sidebarTitle="Admisi"
      sidebarTitleUrl="/admisi"
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
