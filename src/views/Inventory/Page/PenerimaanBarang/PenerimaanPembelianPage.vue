<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderPenerimaanBarang from "../../Layout/HeaderPenerimaanBarang.vue";
import { ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { onMounted } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import BelumDiterima from "./Tabel/BelumDiterima.vue";
import { computed } from "vue";

import DetailPenerimaan from "./PenerimaanPembelian/DetailPenerimaan.vue";
import Diterima from "./Tabel/Diterima.vue";

const route = useRoute();
const value = ref("1");

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);
const penerimaanPembelianData = ref<any | null>(null);

const detailPenerimaanPembelianData = ref();

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label:
        pageType.value == "penerimaan-pembelian" ? "Penerimaan Pembelian" : "",
    },
  ];
  //   console.log(pageType.value);
};

const changeSection = (label: string, data: any = null) => {
  dataBreadCrumb.value = [{ label }]; // Pastikan ini direset
  if (data) {
    detailPenerimaanPembelianData.value = data; // Simpan data detail
  }
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
  penerimaanPembelianData.value = [
    {
      petugasPembelian: "Nama Petugas",
      petugasVerifikasiPembelian: "Nama Petugas",
      metodePembayaran: "Tunai",
      status: "BELUM DITERIMA",
      ppn: true,
      materai: 10000,
      diskon: 1000,
      catatan: "Halo semuanya",
      tanggalPembelian: "2024-10-16T03:03:10.183Z",
      tanggalVerifikasiPembelian: "02-01-2024",
      tanggalPenerimaan: "01-01-2024",
      noFaktur: "FTK1234",
      tanggalFaktur: "01-01-2024",
      noSuratJalan: "123456",
      supplier: "PT. Sanbe",
      jenisStok: "Umum",
      jenisItem: "Obat",
      kategoriItem: "Medis",
      lokasiPenerima: "Gudang Farmasi",
      noPembelian: "PO8872",
      datas: [
        {
          namaItems: "Masker",
          hargaSatuan: 100000,
          satuanBeli: "Box/100",
          supplierItem: "PT. Sanbe",
          order: 2,
          expDate:"01-01-2025",
          terima: 2,
        },
      ],
      totalItem: 1,
    },
  ];
});

// Hanya menampilkan pengajuan saat di tabs Pengajuan Pembelian
const belumDiterimaData = computed(() => {
  return (
    penerimaanPembelianData.value?.filter(
      (item: any) => item.status === "BELUM DITERIMA"
    ) || []
  );
});

const sudahDiterimaData = computed(() => {
    return (
    penerimaanPembelianData.value?.filter(
      (item: any) => item.status === "DITERIMA"
    ) || []
  );
})

// Saat sudah diverifikasi dari page DetailPenerimaan
const diterimaData = ((updatedData: any) => {
   if (penerimaanPembelianData) {
    // Find the index of the item you want to update
     const index = penerimaanPembelianData.value.findIndex((item:any)=> item.noPembelian === updatedData.noPembelian);
    console.log(index)
    if (index !== -1) {
      // Update the existing item
      penerimaanPembelianData.value[index] = updatedData;
      dataBreadCrumb.value[0].label = 'Penerimaan Pembelian';
    }
  }
})
</script>

<template>
    <!-- {{ penerimaanPembelianData }} -->
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    v-if="dataBreadCrumb[0].label == 'Penerimaan Pembelian'"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderPenerimaanBarang
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
      >
        <template #tabs>
          <div class="grid grid-cols-2 gap-5">
            <CustomButton
              label="BELUM DITERIMA"
              :text-color="value === '1' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '1' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '1' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '1'"
              :outlined="value !== '1'"
            />
            <CustomButton
              label="DITERIMA"
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
      </HeaderPenerimaanBarang>
    </template>
    <template #content>
      <Tabs v-model:value="value">
        <TabPanels>
          <TabPanel value="1">
            <BelumDiterima
              :belumDiterimaData="belumDiterimaData"
              @row-clicked="changeSection('Detail Penerimaan', $event)"
            />
          </TabPanel>
          <TabPanel value="2">
            <Diterima :sudah-diterima-data="sudahDiterimaData" @row-clicked="changeSection('Detail Penerimaan', $event)"/>
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
  <DetailPenerimaan
    :dataBreadCrumb="dataBreadCrumb"
    :pageType="pageType"
    :detailData="detailPenerimaanPembelianData"
    v-else-if="dataBreadCrumb[0].label == 'Detail Penerimaan'"
    @kembali="dataBreadCrumb[0].label = 'Penerimaan Pembelian'"
    @diterima="diterimaData"
  />
</template>
