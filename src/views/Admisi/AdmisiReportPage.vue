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

const pageType = ref("");
const route = useRoute();

const dataBreadCrumb = ref<MenuItem[]>([]);

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

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

const resetFilter = () => {
  // filters.forEach((filter) => {
  //   filter.value = [];
  // });
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  // searchPatientFilter.value = "";
  // searchDPJPFilter.value = "";
};

const reportType = ref("");
const reportData = ref([1]);
const expandedRows = ref();

defineExpose({
  resetFilter,
});
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
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
                :model="dataBreadCrumb"
                class=""
              />
            </div>
          </div>
        </template>
        <template #content>
          <div
            v-if="pageType == 'kunjungan' || pageType == 'penjamin'"
            class="grid grid-cols-2 mt-[10px] gap-5"
          >
            <CustomTextfield
              label="Cari Pasien"
              placeholder="Cari Nama / Alamat / No. RM"
              class="grow"
            />
            <CustomSelect
              label="DPJP"
              class="grow"
              optionLabel=""
              optionValue=""
              :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
              prependIcon="PhMagnifyingGlass"
            />
          </div>
          <div class="flex mt-[10px]">
            <div class="flex grow">
              <CustomSelect
                v-if="pageType == 'penjamin'"
                label="Penjamin"
                class="mr-5 grow"
                optionLabel=""
                optionValue=""
                :options="['Semua']"
              />
              <CustomTextfield
                v-if="pageType != 'kunjungan' && pageType != 'penjamin'"
                label="Cari Pasien"
                placeholder="Cari Nama / Alamat / No. RM"
                class="mr-5 w-[60%]"
              />
              <CustomSelect
                v-if="
                  pageType == 'status-kamar' ||
                  pageType == 'keperawatan-inap-pasien'
                "
                label="Kelas"
                class="mr-5 grow"
                optionLabel=""
                optionValue=""
                :options="['Semua']"
              />
              <CustomSelect
                v-else
                label="Jenis Kunjungan"
                class="mr-5 grow"
                optionLabel=""
                optionValue=""
                :options="['Semua']"
              />
            </div>
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
              @click="resetFilter"
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
          <TabPanel value="kunjungan">
            <DataTable
              v-model:expandedRows="expandedRows"
              :value="reportData"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                expander
                style="width: 40px"
                header-class="text-black bg-adameds-50"
              />
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              ></Column>
              <Column
                field="registrationDate"
                header="Tgl. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="registrationNo"
                header="No. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="visitType"
                header="Jenis Kunjungan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="rmNumber"
                header="No. RM"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="patientName"
                header="Nama Pasien"
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
          </TabPanel>
          <TabPanel value="penjamin">
            <DataTable
              v-model:expandedRows="expandedRows"
              :value="reportData"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                expander
                style="width: 40px"
                header-class="text-black bg-adameds-50"
              />
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              ></Column>
              <Column
                field="registrationDate"
                header="Tgl. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="registrationNo"
                header="No. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="visitType"
                header="Jenis Kunjungan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="rmNumber"
                header="No. RM"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="patientName"
                header="Nama Pasien"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="insurance"
                header="Penjamin"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="insuranceNo"
                header="No. Penjamin"
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
          </TabPanel>
          <TabPanel value="batal-kunjungan">
            <DataTable
              v-model:expandedRows="expandedRows"
              :value="reportData"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                expander
                style="width: 40px"
                header-class="text-black bg-adameds-50"
              />
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              ></Column>
              <Column
                field="registrationDate"
                header="Tgl. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="registrationNo"
                header="No. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="visitType"
                header="Jenis Kunjungan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="rmNumber"
                header="No. RM"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="patientName"
                header="Nama Pasien"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="cancelDate"
                header="Tgl. Batal"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="officer"
                header="Petugas"
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
                      field="poli"
                      header="Poli"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="dpjpDokter"
                      header="Dokter DPJP"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="cancelReason"
                      header="Alasan Batal"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                  </DataTable>
                </div>
              </template>
            </DataTable>
          </TabPanel>
          <TabPanel value="status-kamar">
            <DataTable
              :value="reportData"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              ></Column>
              <Column
                field="class"
                header="Kelas"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="room"
                header="Room"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="patientTotal"
                header="Jumlah Pasien"
                header-class="text-black bg-adameds-50"
              ></Column>
            </DataTable>
          </TabPanel>
          <TabPanel value="keperawatan-inap-pasien">
            <DataTable
              :value="reportData"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              ></Column>
              <Column
                field="rmNumber"
                header="No. RM"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="room"
                header="Ruangan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="class"
                header="Kelas"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="bedNo"
                header="No. Bed"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="enterDate"
                header="Tgl. Masuk"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="exitDate"
                header="Tgl. Keluar"
                header-class="text-black bg-adameds-50"
              ></Column>
            </DataTable>
          </TabPanel>
          <TabPanel value="bayi-baru-lahir">
            <DataTable
              v-model:expandedRows="expandedRows"
              :value="reportData"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                expander
                style="width: 40px"
                header-class="text-black bg-adameds-50"
              />
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              ></Column>
              <Column
                field="registrationDate"
                header="Tgl. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="registrationNo"
                header="No. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="visitType"
                header="Jenis Kunjungan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="rmNumber"
                header="No. RM"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="babyName"
                header="Nama Bayi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="birthDate"
                header="Tgl. Lahir"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="birthTime"
                header="Jam Lahir"
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
                      field="birthPlace"
                      header="Tempat Lahir"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="motherIdentity"
                      header="Identitas Ibu"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="motherName"
                      header="Nama Ibu"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                  </DataTable>
                </div>
              </template>
            </DataTable>
          </TabPanel>
          <TabPanel value="rekap-pasien-bpjs">
            <DataTable
              v-model:expandedRows="expandedRows"
              :value="reportData"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                expander
                style="width: 40px"
                header-class="text-black bg-adameds-50"
              />
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              ></Column>
              <Column
                field="registrationDate"
                header="Tgl. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="registrationNo"
                header="No. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="visitType"
                header="Jenis Kunjungan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="rmNumber"
                header="No. RM"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="patientName"
                header="Nama Pasien"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="cardNo"
                header="No. Kartu"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="referenceNo"
                header="No. Rujukan"
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
                    <Column
                      field="insurance"
                      header="Penjamin"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="spri"
                      header="No. SPRI/SKDP"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                  </DataTable>
                </div>
              </template>
            </DataTable>
          </TabPanel>
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
</template>
