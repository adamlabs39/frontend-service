<script setup lang="ts">
import Sidebar from "@/components/section/Sidebar.vue";
import { linkType } from "@/utils/Enum";
import type { SidebarBody } from "@/utils/Interface";
import { ref } from "vue";

const sidebarBodyList = ref<SidebarBody[]>([
  {
    name: "1",
    type: linkType.SECTION,
    child: [
      {
        name: "Resep Dokter",
        icon: "PillFillIcon",
        type: linkType.LINK,
        url: "/farmasi/resep-dokter",
      },
      {
        name: "Penjualan Obat",
        icon: "ShoppingBagIcon",
        type: linkType.LINK,
        url: "/farmasi/penjualan-obat",
      },
      {
        name: "Retur Obat & Material",
        icon: "UndoFillIcon",
        type: linkType.LINK,
        url: "/farmasi/retur-obat-&-material",
      },
      {
        name: "Farmasi Ruangan",
        icon: "SyringeFillIcon",
        type: linkType.LINK,
        url: "/farmasi/farmasi-ruangan",
      },
      {
        name: "Riwayat Transaksi",
        icon: "HistoryIcon",
        type: linkType.LINK,
        url: "/farmasi/riwayat-transaksi",
      },
    ],
  },
  {
    name: "2",
    type: linkType.SECTION,
    child: [
      {
        name: "Datamaster",
        icon: "DatabaseFill",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Aturan Pakai",
            type: linkType.LINK,
            url: "/farmasi/datamaster/aturan-pakai",
          },
          {
            name: "Satuan",
            type: linkType.LINK,
            url: "/farmasi/datamaster/satuan",
          },
          {
            name: "Bentuk Sediaan",
            type: linkType.LINK,
            url: "/farmasi/datamaster/bentuk-sediaan",
          },
          {
            name: "Kategori Obat",
            type: linkType.LINK,
            url: "/farmasi/datamaster/kategori-obat",
          },
          {
            name: "Manufaktur",
            type: linkType.LINK,
            url: "/farmasi/datamaster/manufaktur",
          },
          {
            name: "Jenis Stok",
            type: linkType.LINK,
            url: "/farmasi/datamaster/jenis-stok",
          },
          {
            name: "Lokasi Stok",
            type: linkType.LINK,
            url: "/farmasi/datamaster/lokasi-stok",
          },
          {
            name: "Item Medis",
            type: linkType.LINK,
            url: "/farmasi/datamaster/item-medis",
          },
          {
            name: "Cara Pakai",
            type: linkType.LINK,
            url: "/farmasi/datamaster/cara-pakai",
          },
          {
            name: "Komposisi",
            type: linkType.LINK,
            url: "/farmasi/datamaster/komposisi",
          },
          {
            name: "Konfigurasi Harga",
            type: linkType.LINK,
            url: "/farmasi/datamaster/konfigurasi-harga",
          },
        ],
      },
      {
        name: "Laporan",
        icon: "FileReportIcon",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Pendapatan",
            type: linkType.LINK,
            url: "/farmasi/laporan/pendapatan",
          },
          {
            name: "Waktu Tunggu",
            type: linkType.LINK,
            url: "/farmasi/laporan/waktu-tunggu",
          },
          {
            name: "Rekap Pendapatan Resep Per Apotik",
            type: linkType.LINK,
            url: "/farmasi/laporan/rekap-pendapatan-dokter-resep-per-apotik",
          },
        ],
      },
    ],
  },
]);
</script>

<template>
  <div class="flex h-full gap-3">
    <Sidebar
      sidebarTitle="Farmasi"
      sidebarTitleUrl="/farmasi"
      class="flex-none"
      :sidebar-body-list="sidebarBodyList"
      showStockBtn
    />
    <component
      class="max-h-full overflow-auto grow"
      :is="$route.meta.page || 'div'"
    ></component>
  </div>
</template>
