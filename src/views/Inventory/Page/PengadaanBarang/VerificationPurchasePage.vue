<script lang="ts" setup>
import type { MenuItem } from "primevue/menuitem";
import { computed, onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderPengadaanBarang from "../../Layout/HeaderPengadaanBarang.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import VerifikasiPengajuanPembelian from "./Tabel/VerifikasiPembelianBarangSupplier/VerifikasiPengajuanPembelian.vue";
import DetailPembelian from "./VerifikasiPembelianBarangSupplier/DetailPembelian.vue";
import Verifikasi from "./Tabel/VerifikasiPembelianBarangSupplier/Verifikasi.vue";

const route = useRoute();
const value = ref("1");

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);
const pembelianData = ref<any | null>(null); 


const detailPermintaanData = ref();

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label:
        pageType.value == "verifikasi-pembelian-barang-supplier"
          ? "Verifikasi Pembelian Barang Supplier"
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
  pembelianData.value = [
    {
      petugasPembuatPO: "Nama Petugas",
      status: "PENGAJUAN",
      isCito: true,
      ppn: true,
      materai: 10000,
      diskon: 1000,
      catatan: "Halo semuanya",
      metodePembelian: "Tunai",
      tanggalPembelian: "2024-10-16T03:03:10.183Z",
      supplier: "PT. Sanbe",
      jenisStok: "Umum",
      jenisItem: "Obat",
      kategoriItem: "Medis",
      lokasiPenerima: "Gudang Farmasi",
      noPembelian: "PO8872",
      datas: [
        {
          namaItems: "Paracetamol",
          jumlahBeli: 2,
          hargaSatuan: 1000,
          satuanBeli: "Box/100",
          jumlahPermintaan: 100000,
        },
      ],
      totalItem: 1,
    },
  ];
});

// Saat sudah diverifikasi dari page DetailPembelian
const verifikasiData = ((updatedData: any) => {
   if (pembelianData) {
    // Find the index of the item you want to update
     const index = pembelianData.value.findIndex((item:any)=> item.noPembelian === updatedData.noPembelian);
    console.log(index)
    if (index !== -1) {
      // Update the existing item
      pembelianData.value[index] = updatedData;
      dataBreadCrumb.value[0].label = 'Verifikasi Pembelian Barang Supplier';
    }
  }
})

// Hanya menampilkan pengajuan saat di tabs Pengajuan Pembelian
const pengajuanPembelianData = computed(() => {
  return pembelianData.value?.filter((item:any )=> item.status === 'PENGAJUAN') || [];
});

const verifikasiPembelianData = computed(() => {
  return pembelianData.value?.filter((item:any )=> item.status === 'DIVERIFIKASI') || [];
});
</script>

<template>
    <!-- {{ pembelianData }} -->
  <Card pt:body:class="h-full pt-0 overflow-auto"
  v-if="dataBreadCrumb[0].label == 'Verifikasi Pembelian Barang Supplier'"
    pt:content:class="h-full overflow-auto"
    class="">
    <template #header>
      <HeaderPengadaanBarang
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
      >
        <template #tabs>
          <div class="grid grid-cols-2 gap-5">
            <CustomButton
              label="PENGAJUAN PEMBELIAN"
              :text-color="value === '1' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '1' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '1' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '1'"
              :outlined="value !== '1'"
            />
            <CustomButton
              label="VERIFIKASI"
              :text-color="value === '2' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '2' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '2' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '2'"
              :outlined="value !== '2'"
            />
          </div>
        </template>
      </HeaderPengadaanBarang>
    </template>
    <template #content>
      <Tabs v-model:value="value">
        <TabPanels>
          <TabPanel value="1">
            <VerifikasiPengajuanPembelian  :pembelianData="pengajuanPembelianData" @row-clicked="changeSection('Detail Permintaan', $event)"/>
          </TabPanel>
          <TabPanel value="2">
            <Verifikasi :verifiedData="verifikasiPembelianData" @row-clicked="changeSection('Detail Permintaan', $event)"/>
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

  <DetailPembelian :data-bread-crumb="dataBreadCrumb" :page-type="pageType" :detail-data="detailPermintaanData" v-else-if="dataBreadCrumb[0].label == 'Detail Permintaan'"  @kembali="dataBreadCrumb[0].label = 'Verifikasi Pembelian Barang Supplier'" @verifikasi="verifikasiData"/>
</template>
