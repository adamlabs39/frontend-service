<script lang="ts" setup>
import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import DataLaporanHeader from "../Layout/Header/DataLaporanHeader.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import DataKunjunganRawatJalan from "../Layout/Tabel/Laporan/DataKunjunganRawatJalan.vue";
import DataPembatalanPoli from "../Layout/Tabel/Laporan/DataPembatalanPoli.vue";
import DataRekapTindakanPasien from "../Layout/Tabel/Laporan/DataRekapTindakanPasien.vue";

const dataBreadCrumb = ref<MenuItem[]>([]);
const route = useRoute();
const pageType = ref("");

const searchPoliklinikFilter = ref<string>("");
const searchDokterDPJPFilter = ref<string>("");
const searchPraktisiFilter = ref<string>("");

// Untuk mengetahui sekarang ada di rute mana

const updatePageType = (path: string) => {
  // resetFilter();
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label:
        pageType.value == "kunjungan-rawat-jalan"
          ? "Kunjungan Rawat Jalan"
          : pageType.value == "pembatalan-poli"
          ? "Pembatalan Poli"
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
      <!-- {{ pageType }} -->
      <DataLaporanHeader
        :current-route-name="pageType"
        :data-bread-crumb="dataBreadCrumb"
      >
        <template
          #before-content
          v-if="
            pageType === 'pembatalan-poli' ||
            pageType === 'rekap-tindakan-pasien'
          "
        >
          <div class="grid grid-cols-2 gap-5 pt-2.5">
            <CustomSelect
              v-if="
                pageType === 'pembatalan-poli' ||
                pageType === 'rekap-tindakan-pasien'
              "
              v-model="searchPoliklinikFilter"
              label="Poliklinik"
              class=""
              optionLabel=""
              optionValue=""
              place-holder="Pilih Poliklinik"
              :options="['Semua', 'Beberapa', 'Banyak']"
            />
            <CustomSelect
              v-if="pageType === 'pembatalan-poli'"
              v-model="searchDokterDPJPFilter"
              label="Dokter DPJP"
              class=""
              optionLabel=""
              optionValue=""
              place-holder="Pilih Dokter"
              :options="['Semua', 'Beberapa', 'Banyak']"
            />
            <CustomSelect
              v-if="pageType === 'rekap-tindakan-pasien'"
              v-model="searchPraktisiFilter"
              label="Praktisi"
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
       <DataKunjunganRawatJalan  v-if="pageType === 'kunjungan-rawat-jalan'"/>
       <DataPembatalanPoli v-if="pageType === 'pembatalan-poli'"/>
       <DataRekapTindakanPasien v-if="pageType==='rekap-tindakan-pasien'"/>
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
