<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderDatamaster from "../../Layout/HeaderDatamaster.vue";
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import FileUpload from "primevue/fileupload";
import CustomButton from "@/components/Base/CustomButton.vue";

const route = useRoute();

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label: pageType.value == "supplier" ? "Supplier" : "",
    },
  ];
  //   console.log(pageType.value);
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
      <HeaderDatamaster
        :data-bread-crumb="dataBreadCrumb"
        :page-type="pageType"
      >
      </HeaderDatamaster>
    </template>
    <template #content> dlmpdm </template>
    <template #footer>
      <div class="flex justify-between py-2.5">
        <div class="flex items-center gap-2.5">
          <!-- Show Import Button if enabled via props -->
          <FileUpload
            mode="basic"
            accept=".xls,.xlsx"
            :maxFileSize="1000000"
            label="Import"
            chooseLabel="Import"
            auto
            :pt="{
              pcButton: {
                class: 'font-back', // OR { class: 'w-64' }
              },
            }"
            class="bg-adameds-300 rounded-[10px] font-black text-normal h-10 text-white border-adameds-300"
            custom-upload
            name="dems[]"
          >
            <template #uploadicon>
              <FileImportIcon />
            </template>
          </FileUpload>

          <!-- Show Export Button if enabled via props -->
          <CustomButton label="Eksport" icon="FileImportIcon" />
        </div>

        <!-- Pagination Component -->
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
</template>

<style scoped>
:deep(.p-button-label){
  @apply font-semibold;
}
</style>
