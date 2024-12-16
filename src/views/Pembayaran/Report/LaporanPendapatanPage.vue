<script setup lang="ts">
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import { onMounted, ref } from "vue";
import TotalLaporan from "../layout/TotalLaporan.vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";

const route = useRoute();
const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label: pageType.value == "pendapatan" ? "Pendapatan" : "",
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
    pt:content:class="h-full overflow-hidden"
    class="h-full overflow-hidden"
  >
    <template #header>
      <div class="flex justify-between w-full p-4 align-middle">
        <div class="flex items-center">
          <CustomButton icon="PhArrowClockwise" class="mr-5" />
          <CustomBreadCrumb
            :home="{
              label: 'Laporan',
              home: true,
            }"
            :model="dataBreadCrumb"
            class=""
          />
        </div>
        <div class="flex items-start">
          <CustomDatePicker
            v-model="startDateFilter"
            label=""
            class="w-[150px]"
          />
          <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
          <CustomDatePicker
            v-model="endDateFilter"
            :showLabel="false"
            class="mt-auto w-[150px]"
          />
        </div>
      </div>
    </template>

    <template #content>
      <hr />

      <div class="grid grid-cols-2 gap-5 py-5">
        <TotalLaporan
          backgroundIcon="UangIcon"
          titleCard="Total Pendapatan"
          :totalTest="10000000"
          satuanCard="Rp"
          bottomIcon="UangIcon"
        />
        <TotalLaporan
          backgroundIcon="PayMoneyIcon"
          titleCard="Total Tunai"
          :totalTest="10000000"
          satuanCard="Rp"
          bottomIcon="PayMoneyIcon"
        />
        <TotalLaporan
          backgroundIcon="WalletIcon"
          titleCard="Total Debit"
          :totalTest="10000000"
          satuanCard="Rp"
          bottomIcon="WalletIcon"
        />
        <TotalLaporan
          backgroundIcon="CreditCardIcon"
          titleCard="Total Kredit (Asuransi/Piutang)"
          :totalTest="10000000"
          satuanCard="Rp"
          bottomIcon="CreditCardIcon"
        />
      </div>
    </template>
    <template #footer>
      <hr />
      <div class="flex items-center justify-between pt-2">
        <CustomButton label="Export" icon="FileImportIcon" />
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
