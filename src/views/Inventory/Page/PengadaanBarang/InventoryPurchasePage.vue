<script lang="ts" setup>
import type { MenuItem } from "primevue/menuitem";
import { computed, onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderPengadaanBarang from "../../Layout/HeaderPengadaanBarang.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import PengajuanPembelian from "./Tabel/PembelianBarangSupplier/PengajuanPembelian.vue";
import Paginator from "primevue/paginator";
import DetailPembelian from "./PembelianBarangSupplier/DetailPembelian.vue";
import DatabaseFill from "@/components/icons/DatabaseFill.vue";
import Dibatalkan from "./Tabel/PembelianBarangSupplier/Dibatalkan.vue";
import SudahDiverifikasi from "./Tabel/PembelianBarangSupplier/SudahDiverifikasi.vue";
import TambahPermintaan from "./PembelianBarangSupplier/TambahPermintaan.vue";

const route = useRoute();
const value = ref("1");

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);

const detailPermintaanData = ref();

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label:
        pageType.value == "pembelian-barang-supplier"
          ? "Pembelian Barang Supplier"
          : "",
    },
  ];
  //   console.log(pageType.value);
};

const changeSection = (label: string, data: any = null) => {
  dataBreadCrumb.value = [{ label }]; // Pastikan ini direset
  if (data) {
    detailPermintaanData.value = data; // Simpan data detail
  }
};


onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);

});


const pembelianData = ref<any | null>(null); 

const handleSimpanPembelian = (data: any) => {
  if (pembelianData.value === null) {
    pembelianData.value = [];  
  }
  pembelianData.value.push(data);  
  dataBreadCrumb.value[0].label = 'Pembelian Barang Supplier'; 
};

// Saat sudah dibatalkan dari page DetailPembelian
const pembatalanData = ((updatedData: any) => {
   if (pembelianData.value) {
    // Find the index of the item you want to update
     const index = pembelianData.value.findIndex((item:any)=> item.noPembelian === updatedData.noPembelian);
    console.log(index)
    if (index !== -1) {
      // Update the existing item
      pembelianData.value[index] = updatedData;
      dataBreadCrumb.value[0].label = 'Pembelian Barang Supplier';
    }
  }
})

// Hanya menampilkan pengajuan saat di tabs Pengajuan Pembelian
const pengajuanPembelianData = computed(() => {
  return pembelianData.value?.filter((item:any )=> item.status === 'PENGAJUAN') || [];
});
const pembatalanPembelianData = computed(() => {
  return pembelianData.value?.filter((item:any )=> item.status === 'DIBATALKAN') || [];
});
</script>

<template>
  <!-- {{ pembelianData  }} -->
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
              label="PENGAJUAN PEMBELIAN"
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
            <PengajuanPembelian :pembelian-data = "pengajuanPembelianData" @row-clicked="changeSection('Detail Permintaan', $event)"/>
          </TabPanel>
          <TabPanel value="2">
            <Dibatalkan :canceledData="pembatalanPembelianData" @row-clicked="changeSection('Detail Permintaan', $event)" />
          </TabPanel>
          <TabPanel value="3">
            <SudahDiverifikasi/>
          </TabPanel>
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
    @on-simpan-pembelian="handleSimpanPembelian"
  />

  <DetailPembelian :data-bread-crumb="dataBreadCrumb" :page-type="pageType" :detail-data="detailPermintaanData" v-else-if="dataBreadCrumb[0].label == 'Detail Permintaan'"  @kembali="dataBreadCrumb[0].label = 'Pembelian Barang Supplier'" @pembatalan="pembatalanData"/>
</template>
