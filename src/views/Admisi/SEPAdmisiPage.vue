<script setup lang="ts">
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderFilter from "./Layout/HeaderFilter.vue";
import type { MenuItem } from "primevue/menuitem";
import CustomChip from "@/components/Base/CustomChip.vue";
import type { DataTableRowClickEvent } from "primevue/datatable";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import PatientIdentitySEPForm from "./Section/PatientIdentitySEPForm.vue";
import SEPForm from "./Section/SEPForm.vue";
import NoData from "@/components/section/NoData.vue";

const pageType = ref("");
const route = useRoute();

const dataBreadCrumb = ref<MenuItem[]>([]);

const updatePageType = (path: string) => {
  // resetFilter();
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label:
        pageType.value == "rawat-jalan"
          ? "Rawat Jalan"
          : pageType.value == "rawat-inap"
          ? "Rawat Inap"
          : "IGD",
    },
  ];
};
onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
});

const itemsPasien = ref([
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    gender: "L",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "1",
    new_patient: true,
    platform: "ADMISI",
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "9999999999999999",
    insurance_account_name: "BPJS",
    polyclinic: "POLI KANDUNGAN",
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "2",
    new_patient: false,
    platform: "ADMISI",
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. Og",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: true,
    platform: "APM",
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: false,
    platform: "MOBILE APP",
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: false,
    platform: "APM",
  },
]);

const showSEPDetail = (event: DataTableRowClickEvent) => {
  let data = event.data;
  dataBreadCrumb.value.push({
    label: data.name,
    noRM: data.noRM,
    age: `(${data.age_year}Th ${data.age_month}Bln ${data.age_day}Hr)`,
  });
};
</script>

<template>
  <Card
    v-if="dataBreadCrumb.length == 1"
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilter
        ref="headerFilterRef"
        :pageType="pageType"
        :dataBreadCrumb="dataBreadCrumb"
        isSEP
        @daftar="() => {}"
      />
    </template>
    <template #content>
      <DataTable
        v-if="itemsPasien.length"
        :value="itemsPasien"
        tableStyle="min-width: 50rem"
        scrollable
        scrollHeight="flex"
        :pt="{ headerRow: 'text-SM' }"
        @rowClick="showSEPDetail"
      >
        <Column field="nomor" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">Nomor</div>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <div class="text-SM">RM.{{ slotProps.data.noRM }}</div>
              <div
                v-if="slotProps.data.no_antrian"
                class="w-[21px] mx-auto bg-adameds-75 text-adameds-300 rounded-[5px] text-SM font-semibold"
              >
                {{ slotProps.data.no_antrian }}
              </div>
            </div>
          </template>
        </Column>
        <Column field="pasien" header="Pasien" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="text-SM">
              <span class="font-semibold">{{ slotProps.data.name }}</span>
              <span class="text-grey-300">
                ({{ slotProps.data.age_year }}Th
                {{ slotProps.data.age_month }}Bln
                {{ slotProps.data.age_day }}Hr)
              </span>
            </div>
            <div class="text-XS">{{ slotProps.data.address }}</div>
            <div class="flex flex-wrap">
              <PhUserCirclePlus
                v-if="slotProps.data.new_patient"
                :size="22"
                class="text-adameds-300 mt-auto mr-[5px]"
                weight="fill"
              />
              <CustomChip
                v-if="slotProps.data.platform != 'ADMISI'"
                :showCheckedIcon="false"
                :label="slotProps.data.platform"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="
                  slotProps.data.gender == 'P' ? 'Perempuan' : 'Laki-laki'
                "
                :bgColor="
                  slotProps.data.gender == 'P' ? 'bg-female-75' : 'bg-male-75'
                "
                :textColor="
                  slotProps.data.gender == 'P'
                    ? 'text-female-300'
                    : 'text-male-300'
                "
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.phone"
                bgColor="bg-adameds-75"
                textColor="text-adameds-300"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
            </div>
          </template>
        </Column>
        <Column
          field="keperawatan"
          header="Keperawatan"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.doctor }}</div>
            <div class="flex flex-wrap">
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.polyclinic"
                customClass="h-5 pr-[5px] mr-[5px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.insurance_account_name"
                :bgColor="
                  slotProps.data.insurance_account_name == 'TUNAI'
                    ? 'bg-adameds-50'
                    : 'bg-warning-50'
                "
                :textColor="
                  slotProps.data.insurance_account_name == 'TUNAI'
                    ? 'text-adameds-300'
                    : 'text-warning-300'
                "
                :borderColor="
                  slotProps.data.insurance_account_name == 'TUNAI'
                    ? 'border-adameds-300'
                    : 'border-warning-300'
                "
                customClass="h-5 pr-[6px] mr-[5px]"
              />
              <CustomChip
                v-if="slotProps.data.no_SEP"
                :showCheckedIcon="false"
                :label="`SEP.${slotProps.data.no_SEP}`"
                bgColor="bg-warning-50"
                textColor="text-warning-300"
                borderColor="border-warning-300"
                customClass="h-5 pr-[6px]"
              />
            </div>
          </template>
        </Column>
        <Column
          field="data-kunjungan"
          header="Data Kunjungan"
          headerClass="bg-adameds-50"
          style="width: 25%"
        >
          <template #body="slotProps">
            <div class="text-SM">
              <div
                class="grid content-center grid-cols-[80px_min-content_150px] auto-cols-min"
              >
                Daftar
                <PhArrowRight
                  :size="18"
                  class="my-auto mr-5 text-info-300"
                  weight="bold"
                />
                {{ slotProps.data.tanggal_daftar }}
              </div>
              <div
                class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]"
              >
                Jadwal
                <PhArrowRight
                  :size="18"
                  class="my-auto mr-5 text-sunFlower-300"
                  weight="bold"
                />
                {{ slotProps.data.tanggal_jadwal }}
              </div>
            </div>
          </template>
        </Column>
      </DataTable>
      <NoData v-else />
    </template>
    <template #footer>
      <div class="flex justify-end">
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
  <div
    v-else-if="dataBreadCrumb.length == 2"
    class="relative w-full overflow-hidden"
  >
    <Card class="h-min mb-[10px] absolute right-0 left-0">
      <template #content>
        <div class="flex justify-between">
          <CustomBreadCrumb
            :home="{
              label:
                pageType == 'rawat-jalan'
                  ? 'Rawat Jalan'
                  : pageType == 'rawat-inap'
                  ? 'Rawat Inap'
                  : 'IGD',
              home: true,
            }"
            :model="dataBreadCrumb"
            class=""
          >
            <template #customItem="{ item }">
              <div class="flex">
                <div
                  v-if="item.noRM"
                  class="rounded-lg bg-adameds-300 px-[10px] text-white mr-[10px]"
                >
                  RM.{{ item.noRM }}
                </div>
                <span
                  :class="{
                    'text-adameds-300': item.home,
                    'text-grey-400': !item.home,
                  }"
                >
                  {{ item.label }}
                </span>
                <span
                  v-if="item.age"
                  class="leading-8 text-grey-300 text-normal ml-[10px]"
                >
                  {{ item.age }}
                </span>
              </div>
            </template>
          </CustomBreadCrumb>
          <div class="flex">
            <CustomButton
              @click="dataBreadCrumb.pop()"
              icon="PhCaretLeft"
              label="Kembali"
              class="mr-[10px]"
              outlined
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
            />
          </div>
        </div>
      </template>
    </Card>
    <div class="relative h-full overflow-auto top-[90px] pb-[180px]">
      <PatientIdentitySEPForm />
      <SEPForm />
    </div>
    <Card class="h-min mt-[10px] absolute bottom-0 right-0 left-0">
      <template #content>
        <div class="flex justify-end">
          <CustomButton
            label="Reset"
            class="mr-[10px]"
            outlined
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            @click="() => {}"
            label="Simpan"
            class=""
            backgroundColor="bg-adameds-300"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
