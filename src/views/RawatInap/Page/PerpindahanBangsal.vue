<script setup lang="ts">
import { onMounted, ref } from "vue";
import DataPoliBPJSHeader from "../Layout/Header/DataPoliBPJSHeader.vue";
import DataPerpindahanBangsal from "../Layout/Tabel/Perpindahan/DataPerpindahanBangsal.vue";
import { useRoute } from "vue-router";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import type { MenuItem } from "primevue/menuitem";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const props = defineProps({
  filterRuang: {
    type: String,
    default: "",
  },
});
const value = ref("1");

const dataBreadCrumb = ref<MenuItem[]>([{ label: "Perpindahan Bangsal" }]);

const route = useRoute();
const currentRouteName = ref("");

onMounted(() => {
  currentRouteName.value = route.name ? String(route.name) : "";
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
        :activeTab="value"
        :current-route-name="currentRouteName"
        :dataBreadCrumb="dataBreadCrumb"
      />
    </template>
    <template #content>
      <DataPerpindahanBangsal />
    </template>
    <template #footer>
      <div class="flex justify-end">
        <CustomPaginator :rows="10" :totalRecords="120" @page="() => {}" />
      </div>
    </template>
  </Card>
</template>
