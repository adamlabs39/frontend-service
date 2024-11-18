<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderLaporan from "../../Layout/HeaderLaporan.vue";
import { ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import CustomButton from "@/components/Base/CustomButton.vue";
import { onMounted } from "vue";
import NoData from "@/components/section/NoData.vue";

const route = useRoute();

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label: pageType.value == "persediaan" ? "Persediaan" : "",
    },
  ];
  //   console.log(pageType.value);
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});

onMounted(() => {
  updatePageType(route.path);
});

const persediaanData= ref([
  {
    id: 1,
    lokasi: "Gudang Farmasi",
    kodeItem: 123456,
    namaItem: "0935204 DAFILON 4-0 CUTING 75 CM 3/8C 19 MM ALK",
    jenisStok: "Obat",
    stokAkhir: 5,
    satuan: "Tab",
    subMenu: [
      { id: 1, kategoriItem: "Medis", jenisItem:"Pcs", HNA:750, HPP:832.5, totalHarga:2497500 },
    ],
  },
  {
    id: 2,
    lokasi: "Gudang Farmasi",
    kodeItem: 123456,
    namaItem: "CENDO CARPINE MATA TET 2 % 5 ML",
    jenisStok: "Obat",
    stokAkhir: 5,
    satuan: "Tab",
    subMenu: [
      { id: 1, kategoriItem: "Medis", jenisItem:"Pcs", HNA:750, HPP:832.5, totalHarga:2497500 },
    ],
  },
  
]);

const expandedRows = ref<any[]>([]);
const totalRecords = ref(persediaanData.value.length);
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderLaporan :dataBreadCrumb="dataBreadCrumb" :pageType="pageType" />
    </template>
    <template #content>
      <DataTable
      v-if="persediaanData.length"
        :value="persediaanData"
        responsiveLayout="scroll"
        dataKey="id"
        :expandedRows="expandedRows"
        scrollable
        scrollHeight="flex"
        class="p-datatable-sm"
      >
        <Column
          expander
          style="width: 2em"
          header-class="text-black bg-adameds-50"
        >
        </Column>
        <Column
          field="id"
          header="No"
          header-class="text-black bg-adameds-50"
          class="w-10 p-5 text-center text-black text-SM"
        />
        <Column
          field="lokasi"
          header="Lokasi"
          header-class="text-black bg-adameds-50 "
          class="text-black text-SM"
          style="width: 150px"
        />
        <Column
          field="kodeItem"
          header="Kode Item"
          header-class="text-black bg-adameds-50"
          class="text-black text-SM"
        />
        <Column
          field="namaItem"
          header="Nama Item"
          header-class="text-black bg-adameds-50"
          class="text-black text-SM"
        />
        <Column
          field="jenisStok"
          header="Jenis Stok"
          header-class="text-black bg-adameds-50"
          class="text-black text-SM"
        />
        <Column
          field="stokAkhir"
          header="Stok Akhir"
          header-class="text-center text-black bg-adameds-50"
          class="w-[80px] text-center text-black text-SM"

        />
        <Column
          field="satuan"
          header="Satuan"
          header-class="text-black bg-adameds-50"
          class="text-black text-SM"
        />
        <template #expansion="slotProps">
          <div class="p-3 -mx-2 -my-1.5 bg-adameds-50">
            <DataTable
              :value="slotProps.data.subMenu"
              class="overflow-hidden rounded-lg bg-adameds-50"
            >
              <Column
                field="kategoriItem"
                header="Kategori Item"
                header-class="text-white bg-adameds-300"
                class="p-5 text-black text-SM"
              ></Column>
              <Column
                field="jenisItem"
                header="Jenis Item"
                header-class="text-white bg-adameds-300"
                class="text-black text-SM"
              ></Column>
              <Column
                field="HNA"
                header="HNA"
                header-class="text-white bg-adameds-300"
                class="text-black text-SM"
              ></Column>
              <Column
                field="HPP"
                header="HPP"
                header-class="text-white bg-adameds-300"
                class="text-black text-SM"
              ></Column>
              <Column
                field="totalHarga"
                header="Total Harga"
                header-class="text-white bg-adameds-300"
                class="text-black text-SM"
              ></Column>
            </DataTable>
          </div>
        </template>
      </DataTable>
      <NoData v-else />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <CustomButton
          label="Cetak"
          class="my-auto bg-adameds-300"
          icon="PhPrinter"
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
