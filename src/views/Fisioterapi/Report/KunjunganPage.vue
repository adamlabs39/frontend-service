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
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const reportType = ref("");
const reportData = ref([
  {
    noRM: "00-00-00",
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
    polyclinic: "POLI Anak",
    gender: "L",
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
const expandedRows = ref();
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
        <CustomAccordion :openWithHeader="false" noBorder initial-state="1">
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
                    Kunjungan
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
              <CustomSelect
                label="Metode Bayar"
                class="mr-5 w-[250px]"
                optionLabel=""
                optionValue=""
                :options="['Semua', 'Lunas', 'Piutang']"
                place-holder="Semua"
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
                borderColor="border-adameds-300"
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
          v-if="reportData.length"
          v-model:expandedRows="expandedRows"
          :value="reportData"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          class="text-SM"
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
          >
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-right text-SM">{{ slotProps.index + 1 }}</div>
              </div>
            </template>
          </Column>
          <!-- Tanggal -->
          <Column
            field="tanggal_daftar"
            header="Tangal"
            header-class="text-black bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-center">
                <div>{{ slotProps.data.tanggal_daftar.split(" ")[0] }}</div>
              </div>
            </template>
          </Column>
          <Column
            field="noReg"
            header="No. Registrasi"
            header-class="text-black bg-adameds-50"
          ></Column>
          <Column
            field="noRM"
            header="No. RM"
            header-class="text-black bg-adameds-50"
          ></Column>
          <Column
            field="name"
            header="Nama Pasien"
            header-class="text-black bg-adameds-50"
          ></Column>
          <Column
            field="insurance_account_name"
            header="Metode Pembayaran"
            header-class="text-black bg-adameds-50"
          ></Column>
          <Column
            field="faseRehab"
            header="Fase Rehabilitasi"
            header-class="text-black bg-adameds-50"
          ></Column>
          <Column
            field="terapisName"
            header="Terapis"
            header-class="text-black bg-adameds-50"
          ></Column>
          <template #expansion="slotProps">
            <div class="p-3 -mx-3 -my-1.5 bg-adameds-50">
              <DataTable
                :value="[slotProps.data]"
                class="overflow-hidden rounded-lg bg-adameds-50"
                :pt="{ headerRow: 'text-SM' }"
              >
                <Column
                  field="age_year"
                  header="Usia"
                  header-class="text-white bg-adameds-300"
                >
                  <template #body="slotProps">
                    <div>
                      {{ slotProps.data.age_year }} Th
                      {{ slotProps.data.age_month }} Bl
                      {{ slotProps.data.age_day }} Hr
                    </div>
                  </template>
                </Column>
                <Column
                  field="gender"
                  header="Jenis Kelamin"
                  header-class="text-white bg-adameds-300"
                >
                  <template #body="slotProps">
                    <div>
                      <div v-if="slotProps.data.gender.includes('L')">
                        Laki-Laki
                      </div>
                      <div v-else-if="slotProps.data.gender.includes('P')">
                        Perempuan
                      </div>
                      <div v-else></div>
                    </div>
                  </template>
                </Column>
                <Column
                  field="diagnosa"
                  header="Diagnosa Fisioterapi"
                  header-class="text-white bg-adameds-300"
                ></Column>
                <Column
                  field="painScale"
                  header="Numeric Rating Scale (Pain Scale)"
                  header-class="text-white bg-adameds-300"
                ></Column>
                <Column
                  field="note"
                  header="Catatan Fisioterapi (SOAPIER)"
                  header-class="text-white bg-adameds-300"
                ></Column>
              </DataTable>
            </div>
          </template>
        </DataTable>

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
          <CustomPaginator
            :rows="10"
            :totalRecords="reportData.length"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
