<script setup lang="ts">
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import { utilsStore } from "@/stores/utils";
import type { DataTableRowClickEvent } from "primevue/datatable";
import NoData from "@/components/section/NoData.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import FooterPagination from "../Layout/FooterPagination.vue";

const storeUtils = utilsStore();

const pageType = ref("");
const route = useRoute();

const headerFilterRef = ref<typeof HeaderFilter>();
const resetFilter = () => {
  headerFilterRef.value?.resetFilter();
};

const dataBreadCrumb = ref<MenuItem[]>([]);
const updatePageType = (path: string) => {
  resetFilter();
  dataBreadCrumb.value = [];
  const tempArrPath = path.split("/");
  pageType.value = tempArrPath[2] ?? "";
};

const changeSection = (label: string, data: any = null) => {
  let tempData = { label };
  if (data) {
    tempData = { ...tempData, ...data };
  }
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = tempData;
  } else {
    dataBreadCrumb.value.push(tempData);
  }
};

onBeforeRouteLeave((to) => {
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
    noRM: "00-00-00",
    noreg: "REG2407010049",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctorData: {
      doctor: "dr. Spesialis Sp. A",
      schedule: "08:00-10:00",
    },
    tanggalDaftar: "10-10-2024 09:00",
    tanggalDirawat: "10-10-2024 10:00",
    dischargeDate: "10-10-2024 09:30",
    noSEP: "",
    paymentMethod: "tunai",
    gender: "L",
    phone: "082112341234",
    ageYear: 10,
    ageMonth: 3,
    ageDay: 5,
    no_antrian: "1",
    new_patient: true,
    statusIgd: "1",
    newborn: false,
    statusPembayaran: "Lunas",
  },
  {
    noRM: "00-00-00",
    noreg: "REG2407010049",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctorData: {
      doctor: "dr. Spesialis Sp. A",
      schedule: "08:00-10:00",
    },
    tanggalDaftar: "10-10-2024 09:00",
    tanggalDirawat: "10-10-2024 10:00",
    dischargeDate: "10-10-2024 09:30",
    noSEP: "",
    paymentMethod: "tunai",
    gender: "L",
    phone: "082112341234",
    ageYear: 10,
    ageMonth: 3,
    ageDay: 5,
    no_antrian: "1",
    new_patient: true,
    statusIgd: "2",
    newborn: false,
    statusPembayaran: "Lunas",
  },
  {
    noRM: "00-00-00",
    noreg: "REG2407010049",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctorData: {
      doctor: "dr. Spesialis Sp. A",
      schedule: "08:00-10:00",
    },
    tanggalDaftar: "10-10-2024 09:00",
    tanggalDirawat: "10-10-2024 10:00",
    dischargeDate: "10-10-2024 09:30",
    noSEP: "",
    paymentMethod: "asuransi",
    gender: "L",
    phone: "082112341234",
    ageYear: 10,
    ageMonth: 3,
    ageDay: 5,
    no_antrian: "1",
    new_patient: true,
    statusIgd: "1",
    newborn: false,
    statusPembayaran: "Belum Lunas",
  },
  {
    noRM: "00-00-00",
    noreg: "REG2407010049",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctorData: {
      doctor: "dr. Spesialis Sp. A",
      schedule: "08:00-10:00",
    },
    tanggalDaftar: "10-10-2024 09:00",
    tanggalDirawat: "10-10-2024 10:00",
    dischargeDate: "10-10-2024 09:30",
    noSEP: "",
    paymentMethod: "asuransi",
    gender: "L",
    phone: "082112341234",
    ageYear: 10,
    ageMonth: 3,
    ageDay: 5,
    no_antrian: "1",
    new_patient: true,
    statusIgd: "1",
    newborn: false,
    statusPembayaran: "Belum Lunas",
  },
  {
    noRM: "00-00-00",
    noreg: "REG2407010049",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctorData: {
      doctor: "dr. Spesialis Sp. A",
      schedule: "08:00-10:00",
    },
    tanggalDaftar: "10-10-2024 09:00",
    tanggalDirawat: "10-10-2024 10:00",
    dischargeDate: "10-10-2024 09:30",
    noSEP: "",
    paymentMethod: "TUNAI",
    gender: "L",
    phone: "082112341234",
    ageYear: 10,
    ageMonth: 3,
    ageDay: 5,
    no_antrian: "1",
    new_patient: true,
    statusIgd: "2",
    newborn: false,
    statusPembayaran: "Belum Lunas",
  },
]);

const selectedPatient = ref([]);
const showCancelVisit = ref(false);
const cancelReason = ref<string | undefined>();
const openedPatientData = ref<any>({});
const selectedTab = ref("2");

const showPatientDetail = (event: DataTableRowClickEvent) => {
  openedPatientData.value = event.data;
  if (pageType.value === "rawat-jalan") {
    if (openedPatientData.value.status_rj === "1") {
      changeSection("Checkin", { platform: openedPatientData.value.platform });
    } else {
      changeSection("Detail");
    }
  } else if (pageType.value === "rawat-inap") {
    if (
      openedPatientData.value.status_ri === "1" ||
      openedPatientData.value.status_ri === "2"
    ) {
      changeSection("Daftar");
    } else {
      changeSection("Detail");
    }
  } else {
    changeSection("Detail");
  }
};

const handleSelectedTab = (newTab: string) => {
  selectedTab.value = newTab;
};

const toggleCancelVisit = () => {
  showCancelVisit.value = !showCancelVisit.value;
};

const confirmCancel = () => {
  if (!cancelReason.value) {
    return;
  }
  // Logic for confirming cancelation
  showCancelVisit.value = false;
  cancelReason.value = undefined;
};
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilter pageType="pasien-igd" @selected-tab="handleSelectedTab" />
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
              <div class="text-SM">{{ slotProps.data.noRM }}</div>
              <div class="text-SM">{{ slotProps.data.noreg }}</div>
            </div>
          </template>
        </Column>
        <Column field="pasien" header="Pasien" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="text-SM">
              <span class="font-semibold">{{ slotProps.data.name }}</span>
              <span class="text-grey-300">
                ({{ slotProps.data.ageYear }}Th {{ slotProps.data.ageMonth }}Bln
                {{ slotProps.data.ageDay }}Hr)
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
            <div class="flex mb-[5px] text-SM">
              <div>{{ slotProps.data.doctorData.doctor }}</div>
              <div class="border border-adameds-300 mx-[5px] my-1"></div>
              <div>{{ slotProps.data.doctorData.schedule }}</div>
            </div>
            <div class="flex flex-wrap">
              <CustomChip
                :showCheckedIcon="false"
                label="DATA LENGKAP"
                customClass="h-5 pr-[5px] mr-[5px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="
                  slotProps.data.paymentMethod == 'tunai' ? 'TUNAI' : 'ASURANSI'
                "
                :bgColor="
                  slotProps.data.paymentMethod == 'tunai'
                    ? 'bg-adameds-50'
                    : 'bg-warning-50'
                "
                :textColor="
                  slotProps.data.paymentMethod == 'tunai'
                    ? 'text-adameds-300'
                    : 'text-warning-300'
                "
                :borderColor="
                  slotProps.data.paymentMethod == 'tunai'
                    ? 'border-adameds-300'
                    : 'border-warning-300'
                "
                customClass="h-5 pr-[6px] mr-[5px]"
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
                <ArrowRightBrokenIcon
                  :size="18"
                  class="my-auto mr-5 text-grey-300"
                  weight="bold"
                />
                {{ slotProps.data.tanggalDaftar }}
              </div>
              <div
                class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]"
              >
                Discharge
                <ArrowRightBrokenIcon
                  :size="18"
                  class="my-auto mr-5 text-male-300"
                  weight="bold"
                />
                {{ slotProps.data.dischargeDate }}
              </div>
            </div>
          </template>
        </Column>
        <Column
          field="status"
          header="Status"
          headerClass="bg-adameds-50"
          class="w-[114px]"
        >
          <template #body="slotProps">
            <div>
              <CustomChip
                :showCheckedIcon="false"
                :label="
                  slotProps.data.statusIgd == 0
                    ? 'Cancle'
                    : slotProps.data.statusIgd == 1
                    ? 'Dirawat'
                    : 'Discharge'
                "
                customClass="h-5 pr-[5px] mr-[5px] border-none"
                :bgColor="
                  slotProps.data.statusIgd == 0
                    ? 'bg-danger-75'
                    : slotProps.data.statusIgd == 1
                    ? 'bg-blueJeans-75'
                    : 'bg-mint-75'
                "
                :textColor="
                  slotProps.data.statusIgd == 0
                    ? 'text-danger-300'
                    : slotProps.data.statusIgd == 1
                    ? 'text-blueJeans-300'
                    : 'text-mint-300'
                "
              />
            </div>
            <div>
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.statusPembayaran"
                customClass="h-5 pr-[5px] mr-[5px] border-none"
                :bgColor="
                  slotProps.data.statusPembayaran == 'Belum Lunas'
                    ? 'bg-grey-100'
                    : 'bg-success-75'
                "
                :textColor="
                  slotProps.data.statusPembayaran == 'Belum Lunas'
                    ? 'text-grey-400'
                    : 'text-success-300'
                "
              />
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
      <FooterPagination
        cancleButton
        :value-cancle="cancelReason"
        :show-cancel-visit="showCancelVisit"
        :cancel-reason="cancelReason"
        @toggle-cancel-visit="toggleCancelVisit"
        @confirm-cancel="confirmCancel"
        @update:valueCancle="cancelReason = $event"
      />
    </template>
  </Card>
</template>
