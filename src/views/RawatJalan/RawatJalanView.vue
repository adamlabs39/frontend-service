<script setup lang="ts">
import Sidebar from "@/components/section/Sidebar.vue";
import { linkType } from "@/utils/Enum";
import type { SidebarBody } from "@/utils/Interface";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const sidebarBodyList = ref<SidebarBody[]>([
  {
    name: "1",
    type: linkType.SECTION,
    child: [
      {
        name: "Poli",
        icon: "BPJS",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Semua Poli",
            icon: "",
            type: linkType.LINK,
            url: "/rawat-jalan",
          },
          {
            name: "Poli Umum",
            icon: "",
            type: linkType.LINK,
            url: "",
          },
          {
            name: "Poli Anak",
            icon: "",
            type: linkType.LINK,
            url: "",
          },
          {
            name: "Poli Mata",
            icon: "",
            type: linkType.LINK,
            url: "",
          },
        ],
      },
    ],
  },
  {
    name: "2",
    type: linkType.SECTION,
    child: [
      {
        name: "BPJS",
        icon: "BPJS",
        type: linkType.DROPDOWN,
        child: [
          { name: "Monitoring Kunjungan", type: linkType.LINK, url: '/bpjs/monitoring-kunjungan'},
          { name: "Monitoring Riwayat Kunjungan", type: linkType.LINK , url:'/bpjs/monitoring-riwayat-kunjungan'},
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
const filter = ref("Semua Poli")


const updateFilterMenu = (newFilter: string) => {
  filter.value = newFilter;

};


onMounted(() => {
  if (route.query.filter) {
    router.replace({ path: "/rawat-jalan" });
  }
});
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
      @filter-changed="updateFilterMenu"
    />
    <component
      class="max-h-full overflow-auto grow"
      :is="$route.meta.page || 'div'"
      :filter="filter"
    ></component>
  </div>
</template>
