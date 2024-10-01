<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import DataRawatJalanHeader from './Layout/DataRawatJalanHeader.vue';
import { onMounted, ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';
import NoData from '@/components/section/NoData.vue';

const dataBreadCrumb = ref<MenuItem[]>([]);
const route = useRoute();
const pageType = ref("");

// Untuk mengetahui sekarang ada di rute mana

const updatePageType = (path: string) => {
  // resetFilter();
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label:
        pageType.value == "monitoring-kunjungan"
          ? "Monitoring Kunjungan"
          : pageType.value == "monitoring-riwayat-kunjungan"
          ? "Monitoring Riwayat Kunjungan"
          : "Monitoring Obat Kunjungan",
    },
  ];
};
onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
});

</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
  <template #header>
    <DataRawatJalanHeader :current-route-name="pageType"  :dataBreadCrumb="dataBreadCrumb">
    </DataRawatJalanHeader>
  </template>
  <template #content>
    <!-- Current Route Name: {{ currentRouteName }} -->
     <NoData/>
  </template>
  <template #footer>
    fokpfofkp
  </template>
  </Card>
</template>