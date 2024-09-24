<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import { onMounted, ref, computed, type PropType } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import HeaderFilter from "../Layout/OrderHeader.vue";
import AntrianFooter from "../Layout/LaboratoriumFooter.vue";
import NoData from "@/components/section/NoData.vue";

const pageType = ref("");
const route = useRoute();

const headerFilterRef = ref<typeof HeaderFilter>();
const resetFilter = () => {
  headerFilterRef.value?.resetFilter();
};

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
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
});

const itemsPasien = ref([
  {
    noRM: "123456",
    no_antrian: "000001",
    name: "Nama Pasien Lengkap",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    new_patient: true,
    gender: "L",
    phone: "081234567890",
    doctor: "dr. Spesialis Sp. M",
    polyclinic: "POLI MATA",
    insurance_account_name: "TUNAI",
    tanggal_order: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    status: "Belum Lunas",
  },
  {
    noRM: "123456",
    no_antrian: "000001",
    name: "Nama Pasien Lengkap",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    gender: "L",
    phone: "081234567890",
    doctor: "dr. Spesialis Sp. D",
    polyclinic: "MAWAR I",
    bed: "Bed 1",
    insurance_account_name: "TUNAI",
    tanggal_order: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    status: "Belum Lunas",
  },
  {
    noRM: "123456",
    no_antrian: "000001",
    name: "Nama Pasien Lengkap",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    gender: "P",
    phone: "081234567890",
    doctor: "dr. Spesialis Sp. M",
    polyclinic: "POLI MATA",
    insurance_account_name: "BPJS",
    no_SEP: "1999999999999999999",
    tanggal_order: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    status: "Belum Lunas",
  },
  {
    noRM: "123456",
    no_antrian: "000001",
    name: "Nama Pasien Lengkap",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    new_patient: true,
    gender: "P",
    phone: "081234567890",
    doctor: "dr. Spesialis Sp. D",
    tanggal_order: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    polyclinic: "MAWAR I",
    bed: "Bed 2",
    insurance_account_name: "BPJS",
    no_SEP: "1999999999999999999",
    status: "Batal Order",
  },
  {
    noRM: "123456",
    no_antrian: "000001",
    name: "Nama Pasien Lengkap",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    gender: "P",
    phone: "081234567890",
    doctor: "dr. Spesialis Sp. Pk",
    polyclinic: "APS",
    insurance_account_name: "TUNAI",
    tanggal_order: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    status: "Belum Lunas",
  },
]);

const getChipBgColor = (status: string) => {
  switch (status) {
    case "Belum Lunas":
      return ""; // Set color for 'Belum Lunas'
    case "Batal Order":
      return "bg-danger-50"; // Set color for 'Batal Order'
    default:
      return "bg-blue-50";
  }
};

const getChipTextColor = (status: string) => {
  switch (status) {
    case "Belum Lunas":
      return "text-grey-400"; // Set text color for 'Belum Lunas'
    case "Batal Order":
      return "text-danger-300"; // Set text color for 'Batal Order'
    default:
      return "text-blue-300";
  }
};

const getChipCustomClass = (status: string) => {
  switch (status) {
    case "Belum Lunas":
      return "h-5 ml-[10px]"; // Custom class for 'Belum Lunas'
    case "Batal Order":
      return "h-5 ml-[10px]"; // Custom class for 'Batal Order'
    default:
      return "h-5 ml-[10px]";
  }
};

const showCancelVisit = ref(false);

const selectedPatient = ref([]);
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
      >
        <Column field="nomor" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">Nomor</div>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <div class="text-SM">RM.{{ slotProps.data.noRM }}</div>
              <div class="text-SM">No.{{ slotProps.data.no_antrian }}</div>
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
                bgColor="bg-adameds-50"
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
                v-if="slotProps.data.bed"
                :showCheckedIcon="false"
                :label="slotProps.data.bed"
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
                {{ slotProps.data.tanggal_order }}
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
        <Column
          field="status"
          header="Status"
          header-class="flex items-center justify-center text-black bg-adameds-50"
          class="text-center"
        >
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              <CustomChip
                :showCheckedIcon="false"
                :bgColor="getChipBgColor(slotProps.data.status)"
                :textColor="getChipTextColor(slotProps.data.status)"
                :customClass="getChipCustomClass(slotProps.data.status)"
                class="border-none"
                :label="
                  slotProps.data.status === 'Belum Lunas'
                    ? 'Belum lunas'
                    : slotProps.data.status === 'Batal Order'
                    ? 'Batal order'
                    : 'Belum lunas'
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
      <AntrianFooter />
    </template>
  </Card>
</template>

<style></style>
