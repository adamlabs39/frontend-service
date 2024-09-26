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
const reportData = ref([1]);
const expandedRows = ref();
const pageType = ref("");
const route = useRoute();
const dataBreadCrumb = ref<MenuItem[]>([]);

const emits = defineEmits(['update:rows', 'update:current-page']);
const handleRowsUpdate = (rows: number) => {
  console.log('Rows updated:', rows);
};
const handlePageUpdate = (page: number) => {
  console.log('Page updated:', page);
};

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
        <CustomAccordion :openWithHeader="false" noBorder>
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
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama / address / No. RM"
                class="mr-5 grow"
              />
              <CustomSelect
                label="Jenis Pelayanan"
                class="mr-5 w-[250px]"
                optionLabel=""
                optionValue=""
                :options="['Semua','Lunas', 'Piutang']"
              />
              <CustomDatePicker
                v-model="startDateFilter"
                label="Tanggal"
                class="w-[150px]"
              />
              <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
              <CustomDatePicker
                v-model="endDateFilter"
                :showLabel="false"
                class="mt-auto w-[150px]"
              />
              <CustomButton
                icon="PhMagnifyingGlass"
                label="Cari"
                class="ml-5 mr-[10px] mt-auto"
              />
              <CustomButton
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto"
              />
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
        <Tabs v-if="reportData.length" v-model:value="reportType">
        <TabPanels class="p-0">
            <DataTable
              v-model:expandedRows="expandedRows"
              :value="reportData"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                expander
                style="width: 40px"
                header-class="text-black bg-adameds-50"
              />
              <!-- No -->
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              ></Column>
              <!-- No. Invoice -->
              <Column
                field="registrationDate"
                header="No. Invoice"
                header-class="text-black bg-adameds-50"
              ></Column>
              <!-- Tgl Kunjungan -->
              <Column
                field="registrationNo"
                header="Tgl Kunjungan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="registrationNo"
                header="No. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="rmNumber"
                header="No. RM"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="patientName"
                header="Jenis Pelayanan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="poli"
                header="Poli"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="doctor"
                header="Dokter"
                header-class="text-black bg-adameds-50"
              ></Column>
              <template #expansion="slotProps">
                <div class="p-3 -mx-3 -my-1.5 bg-adameds-75">
                  <DataTable
                    :value="slotProps.data.orders"
                    class="overflow-hidden rounded-lg bg-adameds-50"
                    :pt="{ headerRow: 'text-SM' }"
                  >
                    <Column
                      field="gender"
                      header="Jenis Kelamin"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="birthDate"
                      header="Tgl. Lahir"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="age"
                      header="Umur"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="address"
                      header="Alamat"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="idType"
                      header="Jenis ID"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="identityNo"
                      header="No. Identitas"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                  </DataTable>
                </div>
              </template>
            </DataTable>
        </TabPanels>
        </Tabs>
        <NoData v-else />
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
