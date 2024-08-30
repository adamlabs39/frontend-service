<script setup lang="ts">
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import { utilsStore } from "@/stores/utils";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import HeaderFilter from "./Layout/HeaderFilter.vue";
import RegisterForm from "./Layout/RegisterForm.vue";
import NoData from "@/components/section/NoData.vue";
import type { DataTableRowClickEvent } from "primevue/datatable";

const storeUtils = utilsStore();

const pageType = ref("");
const route = useRoute();

const headerFilterRef = ref<typeof HeaderFilter>();
const resetFilter = () => {
  headerFilterRef.value?.resetFilter();
};

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string, data: any = null) => {
  let tempData = { label: label };
  if (data) {
    tempData = { ...tempData, ...data };
  }
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = tempData;
  } else {
    dataBreadCrumb.value.push(tempData);
  }
};

const updatePageType = (path: string) => {
  resetFilter();
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[2] ?? "";
};
onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
  if (storeUtils.selectedRoom) {
    changeSection("Daftar");
  }
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
    status_rj: "1",
    status_ri: "1",
    is_newborn: false,
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
    status_rj: "1",
    status_ri: "1",
    is_newborn: true,
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
    status_rj: "2",
    status_ri: "2",
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
    status_rj: "2",
    status_ri: "3",
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
    status_rj: "1",
    status_ri: "3",
  },
]);
const selectedPatient = ref([]);

const showCancelVisit = ref(false);
const cancelReason = ref<string>();

const openedPatientData = ref<any>({})
const showPatientDetail = (event: DataTableRowClickEvent) => {
  openedPatientData.value = event.data
  if (pageType.value == "rawat-jalan") {
    if (openedPatientData.value.status_rj == "1") {
      changeSection("Checkin", { platform: openedPatientData.value.platform });
    } else {
      changeSection("Detail");
    }
  } else if (pageType.value == "rawat-inap") {
    if (openedPatientData.value.status_ri == "1" || openedPatientData.value.status_ri == "2") {
      changeSection("Daftar");
    } else {
      changeSection("Detail");
    }
  } else {
    changeSection("Detail");
  }
};
</script>

<template>
  <Card
    v-if="dataBreadCrumb.length == 0"
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilter
        ref="headerFilterRef"
        :pageType="pageType"
        @daftar="changeSection('Daftar')"
        @daftarBayi="changeSection('Daftar Bayi Baru Lahir')"
      />
    </template>
    <template #content>
      <DataTable
        v-if="itemsPasien.length"
        v-model:selection="selectedPatient"
        :value="itemsPasien"
        tableStyle="min-width: 50rem"
        scrollable
        scrollHeight="flex"
        :pt="{ headerRow: 'text-SM' }"
        @rowClick="showPatientDetail"
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
                v-if="pageType == 'rawat-jalan'"
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
                v-if="pageType == 'rawat-jalan'"
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
              <div
                v-if="pageType == 'rawat-inap'"
                class="grid content-center grid-cols-[80px_min-content_150px] auto-cols-min"
              >
                SPRI
                <PhArrowRight
                  :size="18"
                  class="my-auto mr-5 text-grey-300"
                  weight="bold"
                />
                {{ slotProps.data.tanggal_daftar }}
              </div>
              <div
                v-if="pageType == 'rawat-inap'"
                class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]"
              >
                Dirawat
                <PhArrowRight
                  :size="18"
                  class="my-auto mr-5 text-info-300"
                  weight="bold"
                />
                {{ slotProps.data.tanggal_daftar }}
              </div>
              <div
                v-if="pageType == 'igd'"
                class="grid content-center grid-cols-[80px_min-content_150px] auto-cols-min"
              >
                Daftar
                <PhArrowRight
                  :size="18"
                  class="my-auto mr-5 text-grey-300"
                  weight="bold"
                />
                {{ slotProps.data.tanggal_daftar }}
              </div>
              <div
                v-if="pageType == 'igd'"
                class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]"
              >
                Dirawat
                <PhArrowRight
                  :size="18"
                  class="my-auto mr-5 text-info-300"
                  weight="bold"
                />
                {{ slotProps.data.tanggal_daftar }}
              </div>
            </div>
          </template>
        </Column>
        <Column
          v-if="showCancelVisit"
          selectionMode="multiple"
          headerStyle="width: 3rem"
          headerClass="bg-adameds-50"
          class="custom-checkbox"
        ></Column>
      </DataTable>
      <NoData v-else />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <div class="flex">
          <CustomButton
            v-if="!showCancelVisit"
            @click="showCancelVisit = true"
            class="my-auto bg-danger-300"
            label="Batal Kunjungan"
          />
          <CustomButton
            v-if="showCancelVisit"
            @click="showCancelVisit = false"
            class="my-auto mr-[10px]"
            label="Batal"
            outlined
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            v-if="showCancelVisit"
            @click="showCancelVisit = true"
            class="my-auto mr-5 bg-danger-300"
            label="Iya, Batalkan"
            :disabled="!cancelReason"
          />
          <CustomTextfield
            v-if="showCancelVisit"
            v-model="cancelReason"
            :showLabel="false"
            class="my-auto w-[400px]"
            placeholder="Alasan Batal Kunjungan"
          />
        </div>
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
  <RegisterForm
    v-else-if="
      dataBreadCrumb[0].label == 'Checkin' ||
      dataBreadCrumb[0].label == 'Daftar' ||
      dataBreadCrumb[0].label == 'Daftar Bayi Baru Lahir' ||
      dataBreadCrumb[0].label == 'Detail' ||
      dataBreadCrumb[0].label == 'Detail Edit'
    "
    :dataBreadCrumb="dataBreadCrumb"
    :pageType="pageType"
    :patientData="openedPatientData"
    @back="dataBreadCrumb.pop()"
    @goToDetail="dataBreadCrumb[0].label = 'Detail'"
    @goToEdit="dataBreadCrumb[0].label = 'Detail Edit'"
  />
</template>

<style>
/* TailwindCSS styles */
.custom-checkbox .p-checkbox-checked .p-checkbox-box {
  @apply border-danger-300 bg-danger-300; /* Kelas Tailwind untuk border dan warna latar */
}

.custom-checkbox .p-checkbox-checked .p-checkbox-box .p-checkbox-icon {
  @apply text-white; /* Kelas Tailwind untuk warna tanda centang */
}
</style>
