<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import UserForm from "./UserForm.vue";

const router = useRouter();

function goBack() {
  router.back();
}

const dataBreadHome = ref({ label: "User", home: true });
const dataBreadCrumb = ref([{ label: "Tambah Data" }]);

const selectedRole = ref();
const roleOptions = ref([
  { label: "Admin", value: "admin" },
  { label: "Dokter", value: "dokter" },
  { label: "Perawat", value: "perawat" },
]);
const sections = ref([
  {
    name: "Admisi",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
  {
    name: "Antrian",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
  {
    name: "Rawat Jalan",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
  {
    name: "Rawat Inap",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
  {
    name: "IGD",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
  {
    name: "Farmasi",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
  {
    name: "Pembayaran",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
]);
</script>

<template>
  <div class="flex flex-col justify-between h-full overflow-hidden bg-white">
    <div class="flex items-center justify-between gap-5 p-5">
      <CustomButton label="" icon="PhArrowClockwise" @click="" />
      <CustomBreadCrumb
        :home="dataBreadHome"
        :model="dataBreadCrumb"
        class="grow"
      />
      <CustomButton
        label="Kembali"
        icon="PhCaretLeft"
        @click="goBack"
        background-color="bg-white"
        border-color="border-adameds-300"
        text-color="text-adameds-300"
      />
    </div>
    <div class="flex flex-row pl-5 overflow-hidden grow">
      <div class="basis-1/2 flex flex-col gap-2.5 overflow-hidden">
        <CustomSelect
          label="Role"
          placeHolder="Pilih Role"
          v-model="selectedRole"
          :options="roleOptions"
          :isLoading="false"
        />
        <div class="h-full overflow-auto">
          <!-- Empty Role -->
          <div
            v-if="!selectedRole"
            class="flex flex-col items-center justify-center w-full h-full border border-dashed rounded-md"
          >
            <img src="@/assets/icons/empty role.svg" alt="" />
            <div
              class="font-normal text-sm text-[#9CA3AF] leading-5 mt-[18.5px]"
            >
              Pilih Role Terlebih Dahulu
            </div>
          </div>
          <!-- Admin Role -->
          <div
            v-if="selectedRole === 'admin'"
            class="flex flex-col w-full gap-3"
          >
            <CustomAccordion
              headerClass="bg-adameds-50"
              v-for="section in sections"
              :key="section.name"
            >
              <template #header>{{ section.name }}</template>
              <template #content>
                <CustomCheckbox
                  :categories="section.values"
                  custom-class="grid justify-center grid-cols-2 gap-4 pt-5"
                />
              </template>
            </CustomAccordion>
          </div>
          <!-- Dokter Role -->
          <div
            v-if="selectedRole === 'dokter'"
            class="flex flex-col w-full gap-3"
          >
            <CustomAccordion
              headerClass="bg-adameds-50"
              v-for="section in sections"
              :key="section.name"
            >
              <template #header>{{ section.name }}</template>
              <template #content>
                <CustomCheckbox
                  class=""
                  :categories="section.values"
                  custom-class="grid justify-center grid-cols-2 gap-4 pt-5"
                />
              </template>
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div class="basis-1/2 px-5 flex flex-col gap-2.5 overflow-hidden">
        <UserForm :role="selectedRole" />
      </div>
    </div>
    <div class="flex justify-end gap-2.5 px-5 py-2.5">
      <CustomButton label="Batal" @click="goBack" />
      <CustomButton label="Simpan" @click="" />
    </div>
  </div>
</template>
