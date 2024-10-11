<script lang="ts" setup>
import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderPengadaanBarang from "../../HeaderPengadaanBarang.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import PengajuanPembelian from "./Tabel/PengajuanPembelian.vue";
import Paginator from "primevue/paginator";
import TambahPermintaan from "@/views/Inventory/Page/PengadaanBarang/TambahPermintaan.vue";

const route = useRoute();
const value = ref("1");

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label:
        pageType.value == "pembelian-barang-supplier"
          ? "Pembelian Barang Supplier"
          : pageType.value == "verifikasi-pembelian-barang-supplier"
          ? "Verifikasi Pembelian Barang Supplier"
          : "Retur & Penggantian Barang Supplier",
    },
  ];
  //   console.log(pageType.value);
};

const changeSection = (label: string, data: any = null) => {
  let tempData = { label: label };
  if (data) {
    tempData = { ...tempData, ...data };
  }
  console.log(tempData);
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = tempData;
  } else {
    dataBreadCrumb.value.push(tempData);
  }
  console.log(dataBreadCrumb.value.length);
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
    v-if="dataBreadCrumb[0].label == 'Pembelian Barang Supplier'"
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderPengadaanBarang
        :data-bread-crumb="dataBreadCrumb"
        :page-type="pageType"
        @tambah-permintaan="changeSection('Tambah Permintaan')"
      >
        <template #tabs>
          <div class="flex items-center gap-2">
            <!-- Filter = {{ props.filter }} -->
            <CustomButton
              label="Pengajuan Pembelian"
              class="grow"
              :text-color="value === '1' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '1' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '1' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '1'"
              :outlined="value !== '1'"
            />
            <CustomButton
              label="DIBATALKAN"
              class="grow"
              :text-color="value === '2' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '2' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '2' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '2'"
              :outlined="value !== '2'"
            />
            <CustomButton
              label="SUDAH DIVERIFIKASI"
              class="grow"
              :text-color="value === '3' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '3' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '3' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '3'"
              :outlined="value !== '3'"
            />
          </div>
        </template>
      </HeaderPengadaanBarang>
    </template>
    <template #content>
      <Tabs v-model:value="value">
        <TabPanels>
          <TabPanel value="1">
            <PengajuanPembelian />
          </TabPanel>
          <TabPanel value="2"> lmlm </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
    <template #footer>
      <div class="flex justify-end">
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
  <!-- {{ dataBreadCrumb[0].label }} -->
  <!-- {{ dataBreadCrumb }} -->
  <TambahPermintaan
    v-else-if="dataBreadCrumb[0].label == 'Tambah Permintaan'"
    :pageType="pageType"
    :dataBreadCrumb="dataBreadCrumb"
    @kembali="dataBreadCrumb[0].label = 'Pembelian Barang Supplier'"
  />
</template>
