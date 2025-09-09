<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import HeaderFilter from "../Layout/LayarHeader.vue";
import { onMounted, ref, computed } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import AntrianFooter from "../Layout/AntrianFooter.vue";
import NoData from "@/components/section/NoData.vue";
import { utilsStore } from "@/stores/utils";
import { useConfigLayarAntrianStore } from "@/stores/antrian/configLayarAntrian";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const pageType = ref("");
const route = useRoute();

const searchQuery = ref("");
const selectedStatus = ref<string[]>([]);

const configLayarAntrianStore = useConfigLayarAntrianStore();
const useUtilsStore = utilsStore();

const jadwalAntrianPayload = ref<any[]>();
const jadwalLayarAntrianProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
  nama_layar: "",
  aktif: undefined as boolean | undefined,
});

const fetchLayarAntrian = async () => {
  useUtilsStore.setLoading(true);
  try {
    const res = await configLayarAntrianStore.getApi(
      jadwalLayarAntrianProperties.value.page,
      jadwalLayarAntrianProperties.value.page_size,
      jadwalLayarAntrianProperties.value.nama_layar,
      undefined,
      jadwalLayarAntrianProperties.value.aktif
    );
    jadwalAntrianPayload.value = res.payload;
    jadwalLayarAntrianProperties.value.total = res.properties.total;

    console.log("layar Antrian:", res);
  } catch (error) {
    console.log(error);
    // Pastikan state kosong saat error
    jadwalAntrianPayload.value = [];
    jadwalLayarAntrianProperties.value.total = 0;
  } finally {
    useUtilsStore.setLoading(false);
  }
};

const handlePage = (event: any) => {
  jadwalLayarAntrianProperties.value.page = event.page + 1;
  jadwalLayarAntrianProperties.value.page_size = event.rows;
  fetchLayarAntrian();
};

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
  fetchLayarAntrian();
});

const selectedPatient = ref([]);

const convertLayarType = (type: number): string => {
  const layarTypes = {
    1: "Layar 3 x 3 Panggilan",
    2: "Layar 3 x 2 Panggilan",
    3: "Layar 3 List & 3 Panggilan",
    4: "Layar 2 List & 2 Panggilan",
    5: "Layar 1 List, 1 Panggilan, 1 Gambar",
  };
  return layarTypes[type as keyof typeof layarTypes] || "Unknown Type";
};

const getLayarTypeNumber = (description: string): number => {
  const reverseLayarTypes = {
    "Layar 3 x 3 Panggilan": 1,
    "Layar 3 x 2 Panggilan": 2,
    "Layar 3 List & 3 Panggilan": 3,
    "Layar 2 List & 2 Panggilan": 4,
    "Layar 1 List, 1 Panggilan, 1 Gambar": 5,
  };
  return reverseLayarTypes[description as keyof typeof reverseLayarTypes] || 0;
};

const isAdmisi = (row: any) =>
  row?.is_admisi === true || row?.isAdmisi === true;
const isPoli = (row: any) => row?.is_poli === true || row?.isPoli === true;
const isFarmasi = (row: any) =>
  row?.is_farmasi === true || row?.isFarmasi === true;

const handleSearch = (query: string, statusFilters: string[]) => {
  // set parameter pencarian untuk API
  jadwalLayarAntrianProperties.value.page = 1;
  jadwalLayarAntrianProperties.value.nama_layar = query || "";

  // status: jika hanya satu dipilih, terjemahkan ke boolean; jika 0 atau 2 (keduanya), jangan kirim filter (undefined)
  if (statusFilters.length === 1) {
    jadwalLayarAntrianProperties.value.aktif =
      statusFilters[0] === "AKTIF" ? true : false;
  } else {
    jadwalLayarAntrianProperties.value.aktif = undefined;
  }

  // panggil API dengan parameter di atas
  fetchLayarAntrian();
};

const handleResetFilters = () => {
  searchQuery.value = "";
  selectedStatus.value = [];

  // Reset semua parameter pencarian
  jadwalLayarAntrianProperties.value.page = 1;
  jadwalLayarAntrianProperties.value.nama_layar = "";
  jadwalLayarAntrianProperties.value.aktif = undefined;

  // Fetch data fresh dari server
  fetchLayarAntrian();
};
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
        @search="handleSearch"
        @reset="handleResetFilters"
      />
    </template>
    <template #content>
      <DataTable
        v-if="jadwalLayarAntrianProperties.total > 0"
        v-model:selection="selectedPatient"
        :value="jadwalAntrianPayload"
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
              <div class="text-sm">
                {{
                  (jadwalLayarAntrianProperties.page - 1) *
                    jadwalLayarAntrianProperties.page_size +
                  slotProps.index +
                  1
                }}
              </div>
            </div>
          </template>
        </Column>
        <Column field="Layar" header="Layar" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.namaLayar }}</div>
            <div class="flex items-center flex-wrap">
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.judul"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 border-none mr-[5px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="convertLayarType(slotProps.data.tipeLayar)"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 border-none mr-[5px]"
              />
            </div>
          </template>
        </Column>
        <Column
          field="Isi Konten"
          header="Isi Konten"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="flex flex-wrap gap-1">
              <template
                v-if="
                  isAdmisi(slotProps.data) ||
                  isPoli(slotProps.data) ||
                  isFarmasi(slotProps.data)
                "
              >
                <CustomChip
                  v-if="isAdmisi(slotProps.data)"
                  :showCheckedIcon="false"
                  label="Admisi"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="px-2 py-[2px] border-none whitespace-normal break-words leading-tight"
                />
                <CustomChip
                  v-if="isPoli(slotProps.data)"
                  :showCheckedIcon="false"
                  label="Poli"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="px-2 py-[2px] border-none whitespace-normal break-words leading-tight"
                />
                <CustomChip
                  v-if="isFarmasi(slotProps.data)"
                  :showCheckedIcon="false"
                  label="Farmasi"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="px-2 py-[2px] border-none whitespace-normal break-words leading-tight"
                />
              </template>
              <div v-else class="flex justify-center items-center">
                <PhMinus :size="18" weight="bold" />
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
            <div class="flex items-center flex-wrap">
              <div class="flex flex-wrap">
                <div
                  v-if="
                    Array.isArray(slotProps.data.flashText) &&
                    slotProps.data.flashText.length > 0
                  "
                >
                  <CustomChip
                    v-for="(konten, index) in slotProps.data.flashText"
                    :key="index"
                    :showCheckedIcon="false"
                    :label="konten"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    customClass="h-5 border-none mr-[5px]"
                  />
                </div>
                <div v-else class="flex justify-center items-center">
                  <PhMinus :size="18" weight="bold" />
                </div>
              </div>
            </div>
          </template>
        </Column>
        <Column field="status" headerClass="bg-adameds-50 ">
          <template #header>
            <div class="w-full font-semibold text-center">Status</div>
          </template>
          <template #body="slotProps">
            <div class="flex justify-center items-center min-w-[120px]">
              <CustomChip
                :label="slotProps.data.status ? 'AKTIF' : 'NON-AKTIF'"
                :textColor="
                  slotProps.data.status ? 'text-white' : 'text-[#80868d]'
                "
                :bgColor="slotProps.data.status ? 'bg-adameds-300' : 'bg-white'"
                :borderColor="
                  slotProps.data.status ? 'border-none' : 'border-[#80868d]'
                "
                :icon-color="slotProps.data.status ? 'white' : '#80868d'"
                customClass="text-xs font-semibold h-6 flex"
              />
            </div>
          </template>
        </Column>
        <Column
          field="action"
          header="action"
          headerClass="bg-adameds-50 justify-center"
        >
          <template #body="slotProps">
            <div class="flex gap-2.5 items-center">
              <CustomButton
                size="small"
                icon="PhScreencast"
                customClass="bg-adameds-300 rounded-full p-0 flex"
              >
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>

      <NoData v-else />
    </template>
    <template #footer>
      <div class="flex justify-between px-5 py-2.5">
        <CustomPaginator
          class="ml-auto"
          :rows="jadwalLayarAntrianProperties.page_size"
          :totalRecords="jadwalLayarAntrianProperties.total"
          :rowsPerPageOptions="[10, 20, 30]"
          @page="handlePage"
        />
      </div>
    </template>
  </Card>
</template>

<style></style>
