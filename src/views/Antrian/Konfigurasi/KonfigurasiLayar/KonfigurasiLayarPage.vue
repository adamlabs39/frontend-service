<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import HeaderFilter from "../../Layout/KonfigurasiLayarHeader.vue";
import { onMounted, ref, computed } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import AntrianFooter from "../../Layout/AntrianFooter.vue";
import TambahDataKonfigurasiLayar from "./TambahDataKonfigurasiLayar.vue";
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

const itemsLayar = ref([
  {
    noLayar: "1",
    nama_layar: "Antrian 1",
    tipe_layar: "2 List & 2 Panggilan",
    isi_konten: ["Admisi", "Poli"],
    flash_text: [
      "Selamat Datang Di Klinik Adameds",
      "#ImprovingHealthCare",
      "#SATUSEHAT",
    ],
    status: "AKTIF",
  },
  {
    noLayar: "2",
    nama_layar: "Antrian 2",
    tipe_layar: "3 x 3 Panggilan",
    isi_konten: "Poli",
    flash_text: "Selamat Datang Di Klinik Adameds",
    status: "AKTIF",
  },
]);

const dialogData = ref({
  isVisible: false,
  method: "add",
  title: "Tambah",
});

function handleAdd() {
  dialogData.value = {
    isVisible: true,
    method: "add",
    title: "Tambah",
  };
}

function handleEdit() {
  dialogData.value = {
    isVisible: true,
    method: "edit",
    title: "Edit",
  };
}

function handleClose() {
  dialogData.value.isVisible = false;
}

const totalItems = computed(() => itemsLayar.value.length);

const selectedPatient = ref([]);
</script>

<template>
  <Card
    v-if="dataBreadCrumb.length == 0"
    pt:body:class="overflow-auto pt-0 h-full"
    pt:content:class="overflow-auto h-full"
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
        v-if="itemsLayar.length"
        v-model:selection="selectedPatient"
        :value="itemsLayar"
        tableStyle="min-width: 50rem"
        stripedRows
        scrollable
        scrollHeight="flex"
        :pt="{ headerRow: 'text-SM' }"
      >
        <Column field="No." headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <div class="text-sm">{{ slotProps.data.noLayar }}</div>
            </div>
          </template>
        </Column>
        <Column
          field="Nama Layar"
          header="Nama Layar"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.nama_layar }}</div>
          </template>
        </Column>
        <Column
          field="Tipe Layar"
          header="Tipe Layar"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.tipe_layar }}</div>
          </template>
        </Column>
        <Column
          field="Isi Konten"
          header="Isi Konten"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="flex flex-wrap">
              <div
                v-if="Array.isArray(slotProps.data.isi_konten)"
                class="flex justify-center items-center"
              >
                <CustomChip
                  v-for="(konten, index) in slotProps.data.isi_konten"
                  :key="index"
                  :showCheckedIcon="false"
                  :label="konten"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 border-none mr-[5px]"
                />
              </div>
              <div v-else>
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.isi_konten"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 border-none mr-[5px]"
                />
              </div>
            </div>
          </template>
        </Column>
        <Column
          field="flash-text"
          header="Flash Text"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="flex flex-wrap">
              <div
                v-if="
                  Array.isArray(slotProps.data.flash_text) &&
                  slotProps.data.flash_text.length
                "
              >
                <CustomChip
                  v-for="(konten, index) in slotProps.data.flash_text"
                  :key="index"
                  :showCheckedIcon="false"
                  :label="konten"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 border-none mr-[5px]"
                />
              </div>
              <div v-else-if="slotProps.data.flash_text">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.flash_text"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
              </div>
            </div>
          </template>
        </Column>
        <Column
          field="status"
          header="Status"
          headerClass="bg-adameds-50 items-center justify-center"
        >
          <template #body="slotProps">
            <div class="flex justify-center items-center min-w-[120px]">
              <CustomChip
                :label="slotProps.data.status"
                :textColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'text-white'
                    : 'text-[#80868d]'
                "
                :bgColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'bg-adameds-300'
                    : 'bg-white'
                "
                :borderColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'border-none'
                    : 'border-[#80868d]'
                "
                :icon-color="
                  slotProps.data.status === 'AKTIF' ? 'white' : '#80868d'
                "
                customClass="text-xs font-semibold h-6 flex"
              />
            </div>
          </template>
        </Column>
        <Column
          field="Action"
          header="Action"
          headerClass="bg-adameds-50 flex items-center justify-center"
        >
          <template #body="slotProps">
            <div class="flex gap-2.5 justify-center items-center">
              <CustomButton
                label=""
                background-color="bg-[#3D84E5] rounded-lg"
                @click="handleAdd"
              >
                <img src="@/assets/icons/edit.svg" alt="" width="15px" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
              >
                <img src="@/assets/icons/delete.svg" alt="" width="15px" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>

      <NoData v-else />
      <TambahDataKonfigurasiLayar
        :full-screen="true"
        v-model:isDialogVisible="dialogData.isVisible"
        :title="dialogData.title"
        :method="dialogData.method"
        @close="handleClose"
      />
    </template>
    <template #footer>
      <AntrianFooter />
    </template>
  </Card>
</template>

<style></style>
