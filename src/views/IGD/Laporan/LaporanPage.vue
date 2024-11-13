<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { onBeforeRouteLeave, useRoute } from "vue-router";

import HeaderFilter from "../Layout/HeaderFilter.vue";
import KunjunganIgd from "./KunjunganIgd.vue";
import PembatalanDirawat from "./PembatalanDirawat.vue";
import RekapTindakanPasien from "./RekapTindakanPasien.vue";
import FooterPagination from "../Layout/FooterPagination.vue";
const dataBreadCrumb = ref<MenuItem[]>([]);
const route = useRoute();
const pageType = ref("");

const updatePageType = (path: string) => {
  // resetFilter();
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label:
        pageType.value == "kunjungan-igd"
        ? "Kunjungan IGD"
          : pageType.value == "pembatalan-dirawat"
          ? "Pembatalan Dirawat"
          : pageType.value == "rekap-tindakan-pasien"
          ? "Rekap Tindakan Pasien"
          : "",
    },
  ];
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
});
const hasData = ref(false);
const handleSearchExecuted = (status: boolean) => {
  hasData.value = status; // Set hasData menjadi true ketika event searchExecuted diemit
};
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilter :pageType="pageType" :dataBreadCrumb="dataBreadCrumb" />
    </template>
    <template #content>
      <!-- has data true -->
      <KunjunganIgd v-if="pageType === 'kunjungan-igd'" />
      <PembatalanDirawat v-if="pageType === 'pembatalan-dirawat'" />
      <RekapTindakanPasien v-if="pageType === 'rekap-tindakan-pasien'" />
      <!-- <NoData v-else/> -->
    </template>
    <template #footer>
      <FooterPagination/>
    </template>
  </Card>
</template>
