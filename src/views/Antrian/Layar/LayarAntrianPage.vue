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
import CustomDialog from "@/components/Base/CustomDialog.vue";
import PreviewLayout3x3 from "@/views/Antrian/Konfigurasi/KonfigurasiLayar/PreviewLayar/Layout3x3Panggilan.vue";
import PreviewLayout3x2 from "@/views/Antrian/Konfigurasi/KonfigurasiLayar/PreviewLayar/Layout3x2Panggilan.vue";
import PreviewLayoutList3Panggilan3 from "@/views/Antrian/Konfigurasi/KonfigurasiLayar/PreviewLayar/LayoutList3Panggilan3.vue";
import PreviewLayout2List2Panggilan from "@/views/Antrian/Konfigurasi/KonfigurasiLayar/PreviewLayar/Layout2List2Panggilan.vue";
import PreviewLayout1List1Panggilan from "@/views/Antrian/Konfigurasi/KonfigurasiLayar/PreviewLayar/Layout1List1Panggilan.vue";
import { Vue3Marquee } from "vue3-marquee";
import adamedsLogo from "@/assets/images/adameds-logo.png";
import adamedsText from "@/assets/images/adameds.png";

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

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

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

const showPreviewDialog = ref(false);
const previewTitle = ref("");
const previewType = ref<number | null>(null);
const previewRow = ref<any | null>(null);

const activeOrderForRow = (row: any): Array<"poli" | "admisi" | "farmasi"> => {
  const defaultOrder: Array<"poli" | "admisi" | "farmasi"> = [
    "poli",
    "admisi",
    "farmasi",
  ];
  return defaultOrder.filter((k) =>
    k === "poli" ? isPoli(row) : k === "admisi" ? isAdmisi(row) : isFarmasi(row)
  );
};

const openPreview = (row: any) => {
  previewRow.value = row;
  // tipeLayar sudah numeric sesuai convertLayarType di kolom; gunakan langsung
  previewType.value = row?.tipeLayar ?? 0;
  previewTitle.value = `Preview - ${row?.namaLayar ?? ""} (${convertLayarType(
    previewType.value || 0
  )})`;
  showPreviewDialog.value = true;
};

const closePreview = () => {
  showPreviewDialog.value = false;
};

const previewComponent = computed(() => {
  switch (previewType.value) {
    case 1:
      return PreviewLayout3x3;
    case 2:
      return PreviewLayout3x2;
    case 3:
      return PreviewLayoutList3Panggilan3;
    case 4:
      return PreviewLayout2List2Panggilan;
    case 5:
      return PreviewLayout1List1Panggilan;
    default:
      return null;
  }
});

const previewProps = computed(() => {
  const row = previewRow.value || {};
  const payload = Array.isArray(row?.payload) ? row.payload : [];
  switch (previewType.value) {
    case 1: // 3x3 panggilan
      return {
        payload,
        isPoli: isPoli(row),
        activeOrder: activeOrderForRow(row),
      };
    case 2: // 3x2 panggilan
      return {
        payload,
        isPoli: isPoli(row),
        activeOrder: activeOrderForRow(row),
      };
    case 3: // 3 list & 3 panggilan
      return {
        payload,
        isPoli: isPoli(row),
        isAdmisi: isAdmisi(row),
        isFarmasi: isFarmasi(row),
      };
    // 2 list & 2 panggilan dan 1 list 1 panggilan 1 gambar tidak butuh props khusus
    default:
      return {};
  }
});

// Flash text untuk running text di bagian bawah preview dialog
const previewFlashText = computed<string[]>(() => {
  const row = previewRow.value || {};
  return Array.isArray(row.flashText) ? row.flashText : [];
});
</script>

<template>
  <Card
    v-if="dataBreadCrumb.length == 0"
    pt:body:class="overflow-auto pt-0 h-full"
    pt:content:class="overflow-auto h-full w-full"
    class="w-full"
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
        class="w-full"
        tableStyle="min-width: 50rem; width: 100%"
        stripedRows
        scrollable
        scrollHeight="flex"
        :pt="{
          headerRow: 'text-SM',
          table: { class: 'w-full' },
          root: { class: 'w-full' },
        }"
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
                @click="openPreview(slotProps.data)"
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
  <CustomDialog
    v-model:visible="showPreviewDialog"
    :fullScreen="true"
    dismissableMask
    @closeDialog="closePreview"
  >
    <template #header>
      {{ previewTitle }}
    </template>
    <template #body>
      <div class="h-full pt-5">
        <!-- Wrapper Preview: meniru struktur SectionTambahKonfigurasiLayar -->
        <div
          class="w-full h-full flex flex-col bg-adameds-75 overflow-hidden rounded-[10px] px-1 pt-1"
        >
          <!-- Navbar Preview Layar -->
          <div
            class="flex gap-4 items-center font-semibold text-white rounded-lg bg-adameds-300 text-subHeading"
          >
            <!-- Logo -->
            <div
              class="flex bg-white w-[180px] justify-center items-center gap-1 rounded-lg"
            >
              <img
                loading="lazy"
                :src="adamedsLogo"
                class="shrink-0 self-stretch my-auto mx-1 aspect-square w-[50px] h-[50px]"
              />
              <div
                class="bg-adameds-300 w-[3px] h-[50px] my-auto rounded-md"
              ></div>
              <img
                loading="lazy"
                :src="adamedsText"
                class="self-stretch object-cover w-[106px] my-auto shrink-0"
              />
            </div>
            <!-- Komponen di sebelah Logo -->
            <div class="">Klinik Adameds</div>
            <div class="mr-3 ml-auto font-semibold text-right">
              <div class="text-subHeading">09:00 AM</div>
              <div class="text-XS">Senin, 01 Jan 2024</div>
            </div>
          </div>

          <!-- Blok Konten -->
          <div class="flex-1 min-h-[500px] px-1" id="wrapper-antrian">
            <component
              v-if="previewComponent"
              :is="previewComponent"
              v-bind="previewProps"
              class="h-full"
            />
          </div>

          <!-- Running Text -->
          <div class="mt-1 rounded-tl-lg rounded-tr-lg bg-adameds-300">
            <Vue3Marquee>
              <span
                v-for="(item, index) in previewFlashText"
                :key="index"
                class="mx-2"
              >
                {{ item }}
              </span>
            </Vue3Marquee>
          </div>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>

<style>
:deep(.p-card) {
  width: 100%;
}

/* Pastikan area konten Card (p-card-content) juga penuh */
:deep(.p-card-content) {
  width: 100%;
}

/* Paksa DataTable dan tabel di dalamnya penuh lebar */
:deep(.p-datatable) {
  width: 100%;
}

:deep(.p-datatable-table) {
  width: 100%;
}
</style>
