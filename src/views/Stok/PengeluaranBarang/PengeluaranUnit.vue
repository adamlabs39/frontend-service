<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import DetailVerifikasiPengirimanUnit from "../Layout/VerifikasiPengirimanUnit/DetailVerifikasiPengirimanUnit.vue";
import TambahPengeluaranUnit from "../Layout/PengeluaranUnit/TambahPengeluaranUnit.vue";
import DetailPengeluaranBarang from "../Layout/PengeluaranUnit/DetailPengeluaranUnit.vue";
import DetailPengeluaranUnit from "../Layout/PengeluaranUnit/DetailPengeluaranUnit.vue";

const buttonSelect = ref("permintaan");
const searchQuery = ref("");

const tableData = ref([
  {
    // Sesuai gambar
    tanggal: "01-01-2025",
    permintaan: "PRM1234",
    jenisPengeluaran: "Pemakaian Unit",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT"],
    // Header detail
    kategoriItem: "Medis",
    jenisStok: "Umum",
    jenisItem: "Obat",
    tujuanPermintaan: "Gudang Farmasi",
    catatan: "-",
    // Tabel item
    items: [
      {
        no: 1,
        namaItem: "Paracetamol",
        minStok: 0,
        maxStok: 0,
        stokKetikaPermintaan: 3000,
        satuanIsi: 3000,
        hargaDasar: 1800,
        jumlahPermintaan: "1 Box",
        CITO: "CITO",
      },
      {
        no: 2,
        namaItem: "Sanmol",
        minStok: 0,
        maxStok: 0,
        stokKetikaPermintaan: 3000,
        satuanIsi: 3000,
        hargaDasar: 800,
        jumlahPermintaan: "2 Box",
        CITO: "CITO",
      },
    ],
  },
  {
    // Contoh tambahan untuk klik baris lain
    tanggal: "02-01-2025",
    permintaan: "PRM1235",
    jenisPengeluaran: "Pemakaian Unit",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT", "CITO"],
    kategoriItem: "Medis",
    jenisStok: "Umum",
    jenisItem: "Obat",
    tujuanPermintaan: "IGD",
    catatan: "Urgent",
    items: [
      {
        no: 1,
        namaItem: "Amoxicillin",
        minStok: 0,
        maxStok: 0,
        stokKetikaPermintaan: 1500,
        satuanIsi: 1000,
        hargaDasar: 2500,
        jumlahPermintaan: "3 Box",
        CITO: "CITO",
      },
    ],
  },
  {
    // Contoh tambahan untuk klik baris lain
    tanggal: "02-01-2025",
    permintaan: "PRM1235",
    jenisPengeluaran: "Pemakaian Unit",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT", "CITO"],
    kategoriItem: "Medis",
    jenisStok: "Umum",
    jenisItem: "Obat",
    tujuanPermintaan: "IGD",
    catatan: "Urgent",
    items: [
      {
        no: 1,
        namaItem: "Amoxicillin",
        minStok: 0,
        maxStok: 0,
        stokKetikaPermintaan: 1500,
        satuanIsi: 1000,
        hargaDasar: 2500,
        jumlahPermintaan: "3 Box",
        CITO: "CITO",
      },
    ],
  },
  {
    // Contoh tambahan untuk klik baris lain
    tanggal: "02-01-2025",
    permintaan: "PRM1235",
    jenisPengeluaran: "Pemakaian Unit",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT", "CITO"],
    kategoriItem: "Medis",
    jenisStok: "Umum",
    jenisItem: "Obat",
    tujuanPermintaan: "IGD",
    catatan: "Urgent",
    items: [
      {
        no: 1,
        namaItem: "Amoxicillin",
        minStok: 0,
        maxStok: 0,
        stokKetikaPermintaan: 1500,
        satuanIsi: 1000,
        hargaDasar: 2500,
        jumlahPermintaan: "3 Box",
        CITO: "CITO",
      },
    ],
  },
  {
    // Contoh tambahan untuk klik baris lain
    tanggal: "02-01-2025",
    permintaan: "PRM1235",
    jenisPengeluaran: "Pemakaian Unit",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT", "CITO"],
    kategoriItem: "Medis",
    jenisStok: "Umum",
    jenisItem: "Obat",
    tujuanPermintaan: "IGD",
    catatan: "Urgent",
    items: [
      {
        no: 1,
        namaItem: "Amoxicillin",
        minStok: 0,
        maxStok: 0,
        stokKetikaPermintaan: 1500,
        satuanIsi: 1000,
        hargaDasar: 2500,
        jumlahPermintaan: "3 Box",
        CITO: "CITO",
      },
    ],
  },
  {
    // Contoh tambahan untuk klik baris lain
    tanggal: "02-01-2025",
    permintaan: "PRM1235",
    jenisPengeluaran: "Pemakaian Unit",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT", "CITO"],
    kategoriItem: "Medis",
    jenisStok: "Umum",
    jenisItem: "Obat",
    tujuanPermintaan: "IGD",
    catatan: "Urgent",
    items: [
      {
        no: 1,
        namaItem: "Amoxicillin",
        minStok: 0,
        maxStok: 0,
        stokKetikaPermintaan: 1500,
        satuanIsi: 1000,
        hargaDasar: 2500,
        jumlahPermintaan: "3 Box",
        CITO: "CITO",
      },
    ],
  },
  {
    // Contoh tambahan untuk klik baris lain
    tanggal: "02-01-2025",
    permintaan: "PRM1235",
    jenisPengeluaran: "Pemakaian Unit",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT", "CITO"],
    kategoriItem: "Medis",
    jenisStok: "Umum",
    jenisItem: "Obat",
    tujuanPermintaan: "IGD",
    catatan: "Urgent",
    items: [
      {
        no: 1,
        namaItem: "Amoxicillin",
        minStok: 0,
        maxStok: 0,
        stokKetikaPermintaan: 1500,
        satuanIsi: 1000,
        hargaDasar: 2500,
        jumlahPermintaan: "3 Box",
        CITO: "CITO",
      },
    ],
  },
  {
    // Contoh tambahan untuk klik baris lain
    tanggal: "02-01-2025",
    permintaan: "PRM1235",
    jenisPengeluaran: "Pemakaian Unit",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT", "CITO"],
    kategoriItem: "Medis",
    jenisStok: "Umum",
    jenisItem: "Obat",
    tujuanPermintaan: "IGD",
    catatan: "Urgent",
    items: [
      {
        no: 1,
        namaItem: "Amoxicillin",
        minStok: 0,
        maxStok: 0,
        stokKetikaPermintaan: 1500,
        satuanIsi: 1000,
        hargaDasar: 2500,
        jumlahPermintaan: "3 Box",
        CITO: "CITO",
      },
    ],
  },
]);

const PermintaanBarangProperties = ref({
  page: 1,
  page_size: 10,
  total: 100,
});

const showTambah = ref(false);
const showDetail = ref(false);

const selectedRow = ref<any | null>(null);

const handlePage = (event: any) => {
  PermintaanBarangProperties.value.page = event.page + 1;
  PermintaanBarangProperties.value.page_size = event.rows;
  // fetch data here if needed
};

const handleRowClick = (event: any) => {
  selectedRow.value = event?.data;
  showDetail.value = true;
  console.log("Navigating to detail with data:", selectedRow.value);
};
</script>

<template>
  <div>
    <Card
      pt:body:class="overflow-auto pt-0 h-full"
      pt:content:class="overflow-hidden h-full"
      class="overflow-hidden h-full"
      v-if="!showTambah && !showDetail"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Pengeluaran Barang',
                    home: true,
                  }"
                />
                <PhCaretRight
                  :size="25"
                  weight="bold"
                  class="ml-[10px] mt-[8px] text-adameds-300"
                />
                <div class="">
                  <p
                    class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]"
                  >
                    Pengeluaran Unit
                  </p>
                </div>
              </div>
              <CustomButton
                icon="PhPlus"
                label="Pengeluaran"
                class="mr-[10px]"
                @click="showTambah = true"
              />
            </div>
          </template>
          <template #content>
            <div class="space-y-2.5">
              <div class="grid grid-cols-1 mt-[10px]">
                <CustomTextfield
                  v-model="searchQuery"
                  label="Cari Satuan"
                  prependIcon="PhMagnifyingGlass"
                  placeholder="Cari No. Permintaan / Tujuan Permintaan"
                />
              </div>
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
      </template>
      <template #content>
        <DataTable
          tableStyle="min-width: 50rem"
          stripedRows
          class="text-xs"
          scrollable
          scrollHeight="flex"
          :value="tableData"
          @row-click="handleRowClick"
        >
          <Column
            field="tanggal"
            header="Tanggal"
            headerClass="bg-adameds-50 font-semibold text-SM"
          ></Column>

          <Column
            field="permintaan"
            header="No. Pengeluaran"
            headerClass="bg-adameds-50 font-semibold text-SM"
          >
            <template #body="slotProps">
              <div class="space-y-1">
                <div class="font-semibold">{{ slotProps.data.permintaan }}</div>
                <div class="flex gap-2">
                  <CustomChip
                    v-for="t in slotProps.data.tags"
                    :key="t"
                    :label="t"
                    :outlined="true"
                    :showCheckedIcon="false"
                    :customClass="'h-5 px-2'"
                    :borderColor="
                      t === 'CITO' ? 'border-danger-300' : 'border-adameds-300'
                    "
                    :textColor="t === 'CITO' ? 'text-white' : 'text-white'"
                    :bgColor="t === 'CITO' ? 'bg-danger-300' : 'bg-adameds-300'"
                  />
                </div>
              </div>
            </template>
          </Column>

          <Column
            header="Jenis Pengeluaran"
            headerClass="bg-adameds-50 font-bold text-SM"
            class=""
          >
            <template #body="slotProps">
              <div class="space-y-1">
                <div class="font-bold">
                  {{ slotProps.data.jenisPengeluaran }}
                </div>
                <div class="flex gap-1 items-center">
                  <PhArrowRight :size="16" color="#14b8a6" />
                  <div>{{ slotProps.data.tujuanPermintaan }}</div>
                </div>
              </div>
            </template>
          </Column>

          <Column
            field="petugas"
            header="Petugas"
            headerClass="bg-adameds-50 font-semibold text-SM"
          >
          </Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-end border-t border-grey-200">
          <CustomPaginator
            :rows="PermintaanBarangProperties.page_size"
            :totalRecords="PermintaanBarangProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
    <!-- Detail -->
    <DetailPengeluaranUnit
      v-else-if="showDetail"
      :data="selectedRow"
      @back="showDetail = false"
    />

    <!-- Tambah -->
    <TambahPengeluaranUnit v-else @back="showTambah = false" />
  </div>
</template>

<style lang="scss" scoped></style>
