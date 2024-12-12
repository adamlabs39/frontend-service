<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const reportType = ref("");
const reportData = ref([]);
const pageType = ref("");
const route = useRoute();
const dataBreadCrumb = ref<MenuItem[]>([]);

const emits = defineEmits(["update:rows", "update:current-page"]);

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  reportType.value = pageType.value;
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});

onMounted(() => {
  updatePageType(route.path);
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initial-state="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Laporan',
                    home: true,
                  }"
                />
                <PhCaretRight
                  :size="25"
                  weight="bold"
                  class="ml-[10px] mt-[8px] text-adameds-300"
                />
                <div>
                  <p
                    class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]"
                  >
                    Rekap Pendapatan Resep Per Apotik
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-2 gap-4 mt-[10px]">
              <div>
                <CustomSelect
                  label="Metode Pembayaran"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :options="['Tunai', 'BPJS', 'ASURANSI LAIN']"
                  place-holder="Tunai"
                />
              </div>
              <div>
                <CustomSelect
                  label="Lokasi Stok"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :options="['Semua', 'Farmasi Rawat Jalan', 'Farmasi IGD']"
                  place-holder="Semua"
                />
              </div>
              <div>
                <CustomTextfield
                  label="Cari Pasien"
                  prependIcon="PhMagnifyingGlass"
                  placeholder="Cari Asal Resep / No. RM"
                />
              </div>
              <div class="flex justify-between">
                <CustomDatePicker
                  v-model="startDateFilter"
                  label="Tanggal"
                  class="w-[150px]"
                />
                <PhMinus class="mt-auto mb-3 text-black" />
                <div class="flex">
                  <CustomDatePicker
                    v-model="endDateFilter"
                    :showLabel="false"
                    class="mt-auto w-[150px]"
                  />
                  <CustomButton
                    icon="PhMagnifyingGlass"
                    label="Cari"
                    borderColor="border-adameds-300"
                    class="mt-auto ml-[20px]"
                  />
                  <CustomButton
                    label="Reset"
                    outlined
                    borderColor="border-adameds-300"
                    textColor="text-adameds-300"
                    class="mt-auto"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
      </template>

      <template #content>
        <DataTable
          v-if="reportData.length"
          :value="reportData"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          class="text-SM"
        >
          <Column field="nomor" headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-SM">{{ slotProps.data.noInvoice }}</div>
              </div>
            </template>
          </Column>
          <Column field="tanggal" header="Tanggal" headerClass="bg-adameds-50">
          </Column>
          <Column
            field="stock_location"
            header="Lokasi Stok"
            headerClass="bg-adameds-50"
          >
          </Column>
          <Column
            field="pembayaran"
            header="Metode Pembayaran"
            headerClass="bg-adameds-50"
          >
          </Column>
          <Column field="jumlah" header="Jumlah" headerClass="bg-adameds-50">
          </Column>
        </DataTable>
        <NoData />
      </template>
      <template #footer>
        <div class="flex justify-between">
          <CustomButton
            @click="() => {}"
            icon="PhPrinter"
            label="Cetak"
            class="mr-[10px]"
            backgroundColor="bg-adameds-300"
          />
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
  </div>
</template>
