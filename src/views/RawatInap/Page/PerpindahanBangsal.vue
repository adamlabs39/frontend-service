<script setup lang="ts">
import { onMounted, ref } from "vue";
import DataPoliBPJSHeader from "../Layout/Header/DataPoliBPJSHeader.vue";
import DataPerpindahanBangsal from "../Layout/Tabel/Perpindahan/DataPerpindahanBangsal.vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import type { MenuItem } from "primevue/menuitem";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import type { FilterAdmisi } from "@/utils/Interface";

const props = defineProps({
  filterRuang: {
    type: String,
    default: "",
  },
});
const value = ref("1");
const dataBreadCrumb = ref<MenuItem[]>([{ label: "Perpindahan Bangsal" }]);
// Data Patient From API
const patientData = ref<any>([]);

const route = useRoute();
const currentRouteName = ref("");
// PROPERTIES FOR PAGINATION
const properties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});


// Menyimpan emit ke variabel
const searchQuery = ref("");
const dokter = ref("");
const selectedFilterPayment = ref<string[]>([]);

// Event emit FROM HEADER
const handleSearchQuery = (value: string) => {
  searchQuery.value = value;
};
const handleDokter = (value: string) => {
  dokter.value = value;
};
const handleReset = () => {
  resetFilter();
  reloadData();
}
const handleChipPayment = (filters: string[]) => {
  selectedFilterPayment.value = filters;
  reloadData();
};


// Filter Data
const filterData = ref<FilterAdmisi>({});

// Ambil dari API
const fetchRIPerpindahanBangsal = async (filter: FilterAdmisi) => {
  console.log("Filter", filter);
};


// Reload dan Terapkan Filter
const reloadData = async () => {
  let filter = {} as FilterAdmisi;
  filter = setFilter();
  patientData.value = await fetchRIPerpindahanBangsal(filter);
};

// SET FILTER
const setFilter = () => {
  let filter = {} as FilterAdmisi
  filter.page = properties.value.page;
  filter.limit = properties.value.page_size;
  filter.q = searchQuery.value;
  filter.paymentMethod =
    selectedFilterPayment.value.length > 1 ||
    !selectedFilterPayment.value.length
      ? ""
      : selectedFilterPayment.value[0];
  filter.dpjp = dokter.value;
  
  return filter
}


// ACCESSING FROM OUTSIDE COMPONENT
const resetFormRef = ref();

const resetFilter = () => {
  searchQuery.value = "";
  resetFormRef.value.resetForm(); 
  dokter.value = "";
}

// PAGINATION
const handlePage = (event: any) => {
  properties.value.page = event.page + 1;
  properties.value.page_size = event.rows;
  reloadData();
};


// WHEN PAGE CHANGE
const updatePageType = (path: string) => {
  resetFilter();
  const tempArrPath = path.split("/");
  currentRouteName.value = tempArrPath[2] ?? "";
  reloadData();
  
};
onBeforeRouteLeave((to) => {
  updatePageType(to.path)
})
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
      <DataPoliBPJSHeader
        ref="resetFormRef"
        :activeTab="value"
        @update:value-dokter ="handleDokter"
        :current-route-name="currentRouteName"
        :dataBreadCrumb="dataBreadCrumb"
        @update:value-search="handleSearchQuery"
        @search="reloadData()"
        @reset="handleReset()"
        @payment = "handleChipPayment"
      />
    </template>
    <template #content>
      <DataPerpindahanBangsal />
    </template>
    <template #footer>
      <div class="flex justify-end">
        <CustomPaginator :rows="properties.page_size"
          :totalRecords="properties.total"
          @page="handlePage"/>
      </div>
    </template>
  </Card>
</template>
