<script setup lang="ts">
import Sidebar from "@/components/section/Sidebar.vue";
import { useLokasiStore } from "@/stores/datamaster/lokasi";
import { utilsStore } from "@/stores/utils";
import { linkType } from "@/utils/Enum";
import type { SidebarBody } from "@/utils/Interface";
import { computed } from "vue";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// State Management
const lokasiStore = useLokasiStore();
const UseUtilsStore = utilsStore();
const lokasiPayload = ref<any[]>([]);
const lokasiProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Fetch data dari API
const fetchLokasiData = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await lokasiStore.getApi(
      lokasiProperties.value.page,
      lokasiProperties.value.page_size
    );
    // console.log("API Response:", response);

    if (response && response.payload) {
      // console.log("Response contains payload:", response.payload);
      lokasiProperties.value.total = response.properties.total;

      // Gabungkan data baru ke dalam lokasiPayload
      lokasiPayload.value = [...response.payload];

      // Update sidebar body list setiap kali data baru diambil
      updateSidebarBodyList();

      // Jika jumlah data yang diambil sama dengan page_size, tambahkan halaman berikutnya
      if (response.payload.length === lokasiProperties.value.page_size) {
        lokasiProperties.value.page += 1;
        await fetchLokasiData(); // Panggil kembali untuk halaman berikutnya
      }
    } else {
      lokasiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    lokasiPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// Sidebar body list structure
const sidebarBodyList = ref<SidebarBody[]>([
  {
    name: "1",
    type: linkType.SECTION,
    child: [
      {
        name: "Poli",
        icon: "PhStethoscope",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Semua Poli",
            datas: "",
            icon: "",
            type: linkType.LINK,
            url: "/rawat-jalan/poli",
          },
        ], // Ini akan diupdate dengan data dari API
      },
    ],
  },
  {
    name: "2",
    type: linkType.SECTION,
    child: [
      {
        name: "BPJS",
        icon: "BPJSIcon",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Monitoring Kunjungan",
            type: linkType.LINK,
            url: "/rawat-jalan/bpjs/monitoring-kunjungan",
          },
          {
            name: "Monitoring Riwayat Kunjungan",
            type: linkType.LINK,
            url: "/rawat-jalan/bpjs/monitoring-riwayat-kunjungan",
          },
          {
            name: "Monitoring Obat Kunjungan",
            type: linkType.LINK,
            url: "/rawat-jalan/bpjs/monitoring-obat-kunjungan",
          },
        ],
      },
      {
        name: "Laporan",
        icon: "FileReportIcon",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Kunjungan Rawat Jalan",
            type: linkType.LINK,
            url: "/rawat-jalan/laporan/kunjungan-rawat-jalan",
          },
          {
            name: "Pembatalan Poli",
            type: linkType.LINK,
            url: "/rawat-jalan/laporan/pembatalan-poli",
          },
          {
            name: "Rekap Tindakan Pasien",
            type: linkType.LINK,
            url: "/rawat-jalan/laporan/rekap-tindakan-pasien",
          },
        ],
      },
    ],
  },
]);

// Filter state
const filter = ref<{ uuid: string; name: string }>({ uuid: "", name: "" });

// Update sidebar body list dengan data dari API
const updateSidebarBodyList = () => {
  const poliSection = sidebarBodyList.value[0]?.child?.[0]?.child ?? [];

  // Menambahkan data dari `lokasiPayload` ke dalam `poliSection`
  lokasiPayload.value.forEach((item) => {
    if (item.status && item.isPoli) {
      // Hanya menambahkan item dengan status true dan isPoli true
      poliSection.push({
        name: item.name, // Menggunakan nama dari payload
        datas: item.uuid, // UUID sebagai filter atau identifier
        icon: "",
        type: linkType.LINK,
        url: "", // Sesuaikan URL jika diperlukan
      });
    }
  });

  // Mengambil filter default dari poliSection pertama jika tersedia
  if (poliSection.length > 0) {
    const defaultFilter = poliSection[0].datas; // Ambil UUID dari poliSection pertama
    const defaultName = poliSection[0].name; // Ambil nama dari poliSection pertama

    // Update filter dengan objek { uuid, name }
    filter.value = { uuid: defaultFilter, name: defaultName };

    // Mengupdate URL dengan query filter sesuai nilai defaultFilter
    router.replace({
      path: "/rawat-jalan/poli",
      query: { filter: defaultName },
    });
  }
};

// Update filter value
const updateFilterMenu = (newFilter: { uuid: string; name: string }) => {
  filter.value = { uuid: newFilter.uuid, name: newFilter.name };
  router.replace({
    path: "/rawat-jalan/poli",
    query: { filter: newFilter.name },
  });
};

// Search Poli
let searchTimeout: ReturnType<typeof setTimeout>;

const handleSearchPoli = (searchTerm: string) => {
  clearTimeout(searchTimeout);
  const poliSection = sidebarBodyList.value[0]?.child?.[0]?.child ?? [];

  if (searchTerm === "") {
    // Kembalikan sidebarBodyList ke keadaan semula tanpa menambahkan item baru
    if (!sidebarBodyList.value[0].child?.[0].child) {
      sidebarBodyList.value[0].child![0].child = [];
    }

    sidebarBodyList.value[0].child![0].child!.push({
      name: "Semua Poli",
      icon: "",
      type: linkType.LINK,
      url: "/rawat-jalan/poli",
    });
    updateSidebarBodyList();
  } else {
    // Filter poliSection berdasarkan searchTerm
    searchTimeout = setTimeout(() => {
      // Filter poliSection berdasarkan searchTerm
      const filteredPoli = poliSection.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (!sidebarBodyList.value[0].child?.[0].child) {
        sidebarBodyList.value[0].child![0].child = [];
      }
      sidebarBodyList.value[0].child![0].child!.push(...filteredPoli);
    }, 300); // P
  }
};

// Mengambil data API saat komponen di-mount
onMounted(() => {
  fetchLokasiData();

  // Jika ada query filter pada URL saat halaman dimuat ulang, set filter ke nilai tersebut
  if (route.query.filter) {
    filter.value = { uuid: "", name: route.query.filter as string };
  }
});
</script>

<template>
  <!-- {{lokasiPayload}} -->
  <!-- {{ route.query.filter }} -->
  <div class="flex h-full gap-3">
    <!-- Sidebar component with the filter bound -->
    <Sidebar
      sidebarTitle="Rawat Jalan"
      sidebarTitleUrl="/rawat-jalan/poli"
      class="flex-none"
      :sidebar-body-list="sidebarBodyList"
      showFilter
      showStockBtn
      v-model:filter="filter"
      @filter-changed="updateFilterMenu"
      @update:searchPoli="handleSearchPoli"
    />
    <component
      class="max-h-full overflow-auto grow"
      :is="$route.meta.page || 'div'"
      :filter="filter"
    ></component>
  </div>
</template>
