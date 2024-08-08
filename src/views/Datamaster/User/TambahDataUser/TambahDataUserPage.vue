<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
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
const selectedDokter = ref();
const dokterOptions = ref([
  { label: "dr.Budi", value: "dr.Budi" },
  { label: "dr.Susi", value: "dr.Susi" },
  { label: "dr. Adam", value: "dr.Adam" },
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
  { name: "Antrian", values: [] },
  { name: "Rawat Jalan", values: [] },
  { name: "Rawat Inap", values: [] },
  { name: "IGD", values: [] },
  { name: "Farmasi", values: [] },
  { name: "Pembayaran", values: [] },
]);
const toggleSwitch = ref();
</script>

<template>
  <div class="bg-white flex flex-col justify-between overflow-hidden h-full">
    <div class="flex justify-between px-5 items-center">
      <CustomButton label="" icon="PhArrowClockwise" @click.stop="" />
      <CustomBreadCrumb
        :home="dataBreadHome"
        :model="dataBreadCrumb"
        class="grow"
      />
      <CustomButton
        label="Kembali"
        icon="PhCaretLeft"
        @click.stop="goBack"
        background-color="bg-white"
        border-color="border-adameds-300"
        text-color="text-adameds-300"
      />
    </div>
    <div class="grow flex flex-row pl-5 overflow-hidden">
      <div class="basis-1/2 flex flex-col gap-2.5 overflow-hidden">
        <CustomSelect
          label="Role"
          placeHolder="Pilih Role"
          v-model="selectedRole"
          :options="roleOptions"
          :isLoading="false"
        />
        <div class="overflow-auto h-full">
          <!-- Empty Role -->
          <div
            v-if="!selectedRole"
            class="flex flex-col items-center justify-center h-full w-full border border-dashed rounded-md "
          >
            <img src="@/assets/icons/empty role.svg" alt="" />
            <div
              class="font-normal text-sm text-[#9CA3AF] leading-5 mt-[18.5px]"
            >
              Pilih Role Terlebih Dahulu
            </div>
          </div>
          <!-- Admin Role -->
          <div v-if="selectedRole === 'admin'" class="w-full flex flex-col gap-3">
            <CustomAccordion
              headerClass="bg-adameds-50"
              v-for="section in sections"
              :key="section.name"
            >
              <template #header>{{ section.name }}</template>
              <template #content>
                <CustomCheckbox
                  :categories="section.values"
                  custom-class="grid grid-cols-2 justify-center gap-4 pt-5"
                />
              </template>
            </CustomAccordion>
          </div>
          <!-- Dokter Role -->
          <div v-if="selectedRole === 'dokter'" class="w-full flex flex-col gap-3">
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
                  custom-class="grid grid-cols-2 justify-center gap-4 pt-5"
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
      <CustomButton label="Batal" @click.stop="" />
      <CustomButton label="Simpan" @click.stop="" />
    </div>
  </div>
</template>
