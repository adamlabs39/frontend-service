<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderPenerimaanBarang from "../../Layout/HeaderPenerimaanBarang.vue";
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";

const route = useRoute();

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);
const penerimaanReturUnitData = ref<any | null>(null);

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label:
        pageType.value == "penerimaan-retur-unit"
          ? "Penerimaan Retur Unit"
          : "",
    },
  ];
  //   console.log(pageType.value);
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
    updatePageType(route.path);
    penerimaanReturUnitData.value = [
        {
            tanggalPenerimaan
        }
    ]
});
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    v-if="dataBreadCrumb[0].label == 'Penerimaan Retur Unit'"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderPenerimaanBarang
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
      />
    </template>
    <template #content>
        <DataTable>
            
        </DataTable>
    </template>
  </Card>
</template>
