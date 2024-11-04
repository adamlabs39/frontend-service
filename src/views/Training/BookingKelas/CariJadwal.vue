<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import HeaderFilterTraining from "../Layout/HeaderFilterTraining.vue";

const emit = defineEmits(["back"]);
const dataBreadCrumb = ref<MenuItem[]>([]);
const route = useRoute();
const pageType = ref("");
const updatePageType = (path: string) => {
  // resetFilter();
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[2] ?? "";
  dataBreadCrumb.value = [
    {
      label: pageType.value == "booking-kelas" ? "Cari Jadwal & Kelas" : "",
    },
  ];
};
onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
});
const bookPayload = ref([
  {
    slot: "Slot 1",
    nama: "Nama Lengkap",
    status: true,
  },
  {
    slot: "Slot 1",
    nama: "Nama Lengkap",
    status: false,
  },
  
]);
</script>
<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilterTraining
        page-type="cari-kelas"
        :dataBreadCrumb="dataBreadCrumb"
        @back="emit('back')"
      />
    </template>
    <template #content>
      <DataTable
        :value="bookPayload"
        selectionMode="single"
        tableStyle="min-width: 50rem"
        stripedRows
        class="text-xs"
        scrollable
        scrollHeight="flex"
     
      >
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{
                slotProps.index +
                1 +
              }}
            </div>
          </template>
        </Column>
        <Column
          field="slot"
          header="Slot"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="name"
          header="Nama Pasien"
          class="w-1/2"
          headerClass="bg-adameds-50"
        ></Column>
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div
              class="flex items-center justify-center w-full font-semibold text-SM"
            >
              Action
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton
                label=""
                background-color="bg-[#3D84E5] rounded-lg"
                class="h-6 w-[26px] p-0"
              >
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                class="h-6 w-[26px] p-0"
                
              >
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
