<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import NoData from "@/components/section/NoData.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const reportType = ref("");
const pageType = ref("");
const route = useRoute();
const dataBreadCrumb = ref<MenuItem[]>([]);

const emits = defineEmits(["update:rows", "update:current-page"]);
const handleRowsUpdate = (rows: number) => {
  console.log("Rows updated:", rows);
};
const handlePageUpdate = (page: number) => {
  console.log("Page updated:", page);
};

const itemsPasien = ref([
  {
    noRM: "00-00-01",
    noReg: "REG2407010049",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctorData: {
      doctor: "dr. Spesialis Sp. A",
      schedule: "08:00-10:00",
    },
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    tanggal_checkin: "10-10-2024 09:30",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "-",
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "1",
    new_patient: true,
    platform: "ADMISI",
    status_rj: "1",
    status_ri: "1",
    is_newborn: false,
  },
  {
    noRM: "00-00-01",
    noReg: "REG2407010049",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctorData: {
      doctor: "dr. Spesialis Sp. A",
      schedule: "08:00-10:00",
    },
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    tanggal_checkin: "10-10-2024 09:30",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "-",
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "1",
    new_patient: true,
    platform: "ADMISI",
    status_rj: "1",
    status_ri: "1",
    is_newborn: false,
  },
  {
    noRM: "00-00-01",
    noReg: "REG2407010049",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctorData: {
      doctor: "dr. Spesialis Sp. A",
      schedule: "08:00-10:00",
    },
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    tanggal_checkin: "10-10-2024 09:30",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "-",
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "1",
    new_patient: true,
    platform: "ADMISI",
    status_rj: "1",
    status_ri: "1",
    is_newborn: false,
  },
  {
    noRM: "00-00-01",
    noReg: "REG2407010049",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctorData: {
      doctor: "dr. Spesialis Sp. A",
      schedule: "08:00-10:00",
    },
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    tanggal_checkin: "10-10-2024 09:30",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "-",
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "1",
    new_patient: true,
    platform: "ADMISI",
    status_rj: "1",
    status_ri: "1",
    is_newborn: false,
  },
  {
    noRM: "00-00-01",
    noReg: "REG2407010049",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctorData: {
      doctor: "dr. Spesialis Sp. A",
      schedule: "08:00-10:00",
    },
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    tanggal_checkin: "10-10-2024 09:30",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "-",
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "1",
    new_patient: true,
    platform: "ADMISI",
    status_rj: "1",
    status_ri: "1",
    is_newborn: false,
  },
  {
    noRM: "00-00-01",
    noReg: "REG2407010049",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctorData: {
      doctor: "dr. Spesialis Sp. A",
      schedule: "08:00-10:00",
    },
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    tanggal_checkin: "10-10-2024 09:30",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "-",
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "1",
    new_patient: true,
    platform: "ADMISI",
    status_rj: "1",
    status_ri: "1",
    is_newborn: false,
  },
]);

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
                <div class="">
                  <p
                    class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]"
                  >
                    Rekapitulasi Jumlah Pemeriksaan
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama / No. RM / No. Reg"
                class="mr-5 grow"
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
        <DataTable
          v-if="itemsPasien.length"
          :value="itemsPasien"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
        >
          <Column field="no" headerClass="bg-adameds-50 mr-5 w-5">
            <template #header>
              <div class="w-full font-semibold text-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-SM">{{ slotProps.index + 1 }}</div>
              </div>
            </template>
          </Column>
          <Column
            field="tanggal"
            header="Tanggal"
            header-class="text-black bg-adameds-50"
            class="w-1/6"
          >
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-left text-SM">
                  {{ slotProps.data.tanggal_jadwal.split(" ")[0] }}
                </div>
              </div>
            </template>
          </Column>
          <Column
            field="pemeriksaan"
            header="Pemeriksaan"
            headerClass="bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM"></div>
            </template>
          </Column>
          <Column field="total" header="Total" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM"></div>
            </template>
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
          <CustomPaginator
            :rows="10"
            :totalRecords="100"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
