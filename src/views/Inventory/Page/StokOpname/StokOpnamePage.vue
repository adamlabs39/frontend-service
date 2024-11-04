<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderStokOpname from "../../Layout/HeaderStokOpname.vue";
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import NoData from "@/components/section/NoData.vue";
import TambahStokOpname from "./TambahStokOpname.vue";

const route = useRoute();

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);
const detailStokOpname = ref();

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[2] ?? "";
  dataBreadCrumb.value = [
    {
      label: pageType.value == "stok-opname" ? "Stok Opname" : "",
    },
  ];
  //   console.log(pageType.value);
};

const changeSection = (label: string, data: any = null) => {
  dataBreadCrumb.value = [{ label }]; // Pastikan ini direset
  if (data) {
    detailStokOpname.value = data; // Simpan data detail
    }
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
    v-if="dataBreadCrumb[0].label == 'Stok Opname'"
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderStokOpname
        :data-bread-crumb="dataBreadCrumb"
        :page-type="pageType"
        @tambah-stok-opname="changeSection('Tambah Stok Opname')"
      />
    </template>
    <template #content>
      <NoData />
    </template>
    <template #footer>
      <div class="flex justify-end">
        <Paginator
          :rows="10"
          :totalRecords="120"
          :rowsPerPageOptions="[10, 20, 30]"
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{currentPage}"
        >
          <template #start="slotProps">Total Data: 0</template>
        </Paginator>
      </div>
    </template>
  </Card>

  <TambahStokOpname
     v-else-if="dataBreadCrumb[0].label == 'Tambah Stok Opname'"
    :pageType="pageType"
    :dataBreadCrumb="dataBreadCrumb"
    @kembali = "dataBreadCrumb[0].label = 'Stok Opname'"
  />
</template>
