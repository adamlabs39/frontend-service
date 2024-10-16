<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import HeaderPengadaanBarang from "../../Layout/HeaderPengadaanBarang.vue";
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import ReturSupplier from "./Tabel/ReturPenggantian/ReturSupplier.vue";
import { computed } from "vue";
import TambahRetur from "./ReturPenggantian/TambahRetur.vue";

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
        pageType.value == "retur-penggantian-barang-supplier"
          ? "Retur & Penggantian Barang Supplier"
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
      status: "DIRETUR",
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

// Hanya menampilkan RETUR saat di tabs RETUR SUPPLIER
const returSupplierData = computed(() => {
  return (
    pembelianData.value?.filter((item: any) => item.status === "DIRETUR") || []
  );
});

const terimaPenggantianData = computed(() => {
  return (
    pembelianData.value?.filter((item: any) => item.status === "DITERIMA") || []
  );
});
</script>

<template>
  <Card
    v-if="dataBreadCrumb[0].label == 'Retur & Penggantian Barang Supplier'"
    pt:content:class="h-full overflow-auto"
    class=""
    pt:body:class="h-full pt-0 overflow-auto"
  >
    <template #header>
      <HeaderPengadaanBarang
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
        @tambah-retur="changeSection('Tambah Retur')"
      >
        <template #tabs>
          <div class="grid grid-cols-2 gap-5">
            <CustomButton
              label="RETUR SUPPLIER"
              :text-color="value === '1' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '1' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '1' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '1'"
              :outlined="value !== '1'"
            />
            <CustomButton
              label="TERIMA PENGGANTIAN"
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
            <ReturSupplier
              :retur-data="returSupplierData"
              @row-clicked="changeSection('Detail Permintaan', $event)"
            />
          </TabPanel>
          <TabPanel value="2"> kmdsmd </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
  </Card>
  <TambahRetur v-else-if="dataBreadCrumb[0].label == 'Tambah Retur'"
  :pageType="pageType" :dataBreadCrumb="dataBreadCrumb" @kembali="dataBreadCrumb[0].label = 'Retur & Penggantian Barang Supplier'"/>
</template>
