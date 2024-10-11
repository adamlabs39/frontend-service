<script lang="ts" setup>
import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import DataLaporanHeader from "../Layout/Header/DataLaporanHeader.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import DataKunjunganRawatInap from "../Layout/Tabel/Laporan/DataKunjunganRawatInap.vue";
import DataPerpindahanPasien from "../Layout/Tabel/Laporan/DataPerpindahanPasien.vue";
import DataPembatalanDirawat from "../Layout/Tabel/Laporan/DataPembatalanDirawat.vue";
import DataRekapTindakanPasien from "../Layout/Tabel/Laporan/DataRekapTindakanPasien.vue";

const dataBreadCrumb = ref<MenuItem[]>([]);
const route = useRoute();
const pageType = ref("");

const searchRuanganFilter = ref<string>("");
const searchKelasFilter = ref<string>("");
const searchDokterDPJPFilter = ref<string>("");

// Untuk mengetahui sekarang ada di rute mana

const updatePageType = (path: string) => {
  // resetFilter();
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label:
        pageType.value == "kunjungan-rawat-inap"
          ? "Kunjungan Rawat Inap"
          : pageType.value == "perpindahan-pasien"
          ? "Perpindahan Pasien"
          : pageType.value == "pembatalan-dirawat"
          ? "Pembatalan Dirawat"
          : "Rekap Tindakan Pasien",
    },
  ];
};
onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
});
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <DataLaporanHeader
        :current-route-name="pageType"
        :data-bread-crumb="dataBreadCrumb"
      >
        <template
          #before-content
          v-if="
            pageType === 'kunjungan-rawat-inap' ||
            pageType === 'pembatalan-dirawat'
          "
        >
          <div class="grid grid-cols-3 gap-5 pt-2.5">
            <CustomSelect
              v-model="searchRuanganFilter"
              label="Ruangan"
              class=""
              optionLabel=""
              optionValue=""
              place-holder="Pilih Ruangan"
              :options="['Semua', 'Beberapa', 'Banyak']"
            />
            <CustomSelect
              v-model="searchKelasFilter"
              label="Kelas"
              class=""
              optionLabel=""
              optionValue=""
              place-holder="Pilih Kelas"
              :options="['Semua', 'Beberapa', 'Banyak']"
            />
            <CustomSelect
              v-model="searchDokterDPJPFilter"
              label="Dokter DPJP"
              class=""
              optionLabel=""
              optionValue=""
              place-holder="Pilih Dokter"
              :options="['Semua', 'Beberapa', 'Banyak']"
            />
          </div>
        </template>
      </DataLaporanHeader>
    </template>
    <template #content>
      <!-- <NoData /> -->
      <DataKunjunganRawatInap v-if="pageType === 'kunjungan-rawat-inap'" />
      <DataPerpindahanPasien v-if="pageType === 'perpindahan-pasien'" />
      <DataPembatalanDirawat v-if="pageType === 'pembatalan-dirawat'" />
      <DataRekapTindakanPasien v-if="pageType === 'rekap-tindakan-pasien'" />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <CustomButton
          icon="PhPrinter"
          icon-pos="left"
          icon-type="fill"
          class="my-auto bg-adameds-300"
          label="Cetak"
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
</template>
