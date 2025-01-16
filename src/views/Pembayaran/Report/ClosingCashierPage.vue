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
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_jadwal: "08.00 - 11.00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    gender: "L",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "00-00-00",
    new_patient: true,
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_jadwal: "-",
    no_SEP: "9999999999999999",
    insurance_account_name: "BPJS",
    polyclinic: "POLI KANDUNGAN",
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "00-00-00",
    new_patient: false,
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. Og",
    tanggal_jadwal: "08.00 - 11.00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: true,
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_jadwal: "08.00 - 11.00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: false,
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_jadwal: " - ",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: "00-00-00",
    new_patient: false,
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
                <PhCaretRight
                  :size="25"
                  weight="bold"
                  class="ml-[10px] mt-[8px] text-adameds-300"
                />
                <div class="">
                  <p
                    class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]"
                  >
                    Closing Kasir
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
                placeholder="Cari Nama / address / No. RM"
                class="mr-5 grow"
              />
              <CustomSelect
                label="Jenis Pelayanan"
                class="mr-5 w-[250px]"
                optionLabel=""
                optionValue=""
                :options="['Semua', 'Lunas', 'Piutang']"
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
          <Column
            field="pasien"
            header="Jenis Kasir"
            headerClass="bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.address }}</div>
            </template>
          </Column>
          <Column
            field="keperawatan"
            header="Tgl. Buka Kasir"
            headerClass="bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.doctor }}
                <span class="text-adameds-300">|</span>
                {{ slotProps.data.tanggal_jadwal }}
              </div>
            </template>
          </Column>
          <Column
            field="keperawatan"
            header="Tgl. Tutup Kasir"
            headerClass="bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.doctor }}
                <span class="text-adameds-300">|</span>
                {{ slotProps.data.tanggal_jadwal }}
              </div>
            </template>
          </Column>
          <Column
            field="keperawatan"
            header="Shift"
            headerClass="bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.doctor }}
                <span class="text-adameds-300">|</span>
                {{ slotProps.data.tanggal_jadwal }}
              </div>
            </template>
          </Column>
          <Column
            field="keperawatan"
            header="Tgl. Closing Harian"
            headerClass="bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.doctor }}
                <span class="text-adameds-300">|</span>
                {{ slotProps.data.tanggal_jadwal }}
              </div>
            </template>
          </Column>
          <Column field="Petugas" header="Petugas" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.doctor }}
                <span class="text-adameds-300">|</span>
                {{ slotProps.data.tanggal_jadwal }}
              </div>
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
