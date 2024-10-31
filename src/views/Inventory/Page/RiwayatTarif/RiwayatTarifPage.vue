<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderRiwayatTarif from "../../Layout/HeaderRiwayatTarif.vue";
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import Paginator from "primevue/paginator";
import CustomChip from "@/components/Base/CustomChip.vue";
import DetailRiwayatTarif from "./DetailRiwayatTarif.vue";

const route = useRoute();

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);
const riwayatTarifData = ref<any | null>(null);


const detailRiwayatTarifData = ref();

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[2] ?? "";
  dataBreadCrumb.value = [
    {
      label: pageType.value == "riwayat-tarif" ? "Riwayat Tarif" : "",
    },
  ];
  //   console.log(pageType.value);
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});

onMounted(() => {
  updatePageType(route.path);
  riwayatTarifData.value = [
    {
      id: 1,
      kodeItem: 1234,
      pabrik: "Nama Pabrik",
      namaItem: "Nama Item",
      jenisStok: "Umum",
          jenisItem: "Obat",
      satuanPenggunaan:"Pcs",
      kategoriItem: "Medis",
      expDate: "01-01-2025",
      stok: 2000,
      satuanJual: "Box",
      hargaDasar: 10000,
      HNA: 10000,
      HPP: 10000,
    },
  ];
});

const changeSection = (label: string, data: any = null) => {
  dataBreadCrumb.value = [{ label }]; // Pastikan ini direset
  if (data) {
    detailRiwayatTarifData.value = data; // Simpan data detail
  }
};
const handleRowClick = (rowData: any) => {
    console.log(rowData.data)
  changeSection("Detail Riwayat Tarif", rowData.data);
};
</script>

<template>
  <Card
  v-if="dataBreadCrumb[0].label == 'Riwayat Tarif'"
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderRiwayatTarif
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
      />
    </template>
    <template #content>
      <DataTable
        :value="riwayatTarifData"
        @row-click="handleRowClick"
        tableStyle="min-width: 50rem"
        scrollable
        scrollHeight="240px"
        :pt="{ headerRow: 'text-SM' }"
      >
        <Column field="no" headerClass="bg-adameds-50" class="w-[50px]">
          <template #header>
            <div class="font-semibold">No</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-center text-SM">{{ slotProps.index + 1 }}</div>
            </div>
          </template>
        </Column>
        <Column field="namaItem" headerClass="bg-adameds-50" class="w-[500px]">
          <template #header>
            <div class="font-semibold">Nama Item</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM">{{ slotProps.data.namaItem}}</div>
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.kategoriItem"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.jenisStok"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.jenisItem"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
            </div>
          </template>
        </Column>
        <Column field="expDate" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">Exp Date</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-center text-SM">{{ slotProps.data.expDate}}</div>
            </div>
          </template>
        </Column>
        <Column field="stok" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">Stok</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-center text-SM">{{ slotProps.data.stok }}</div>
            </div>
          </template>
        </Column>
        <Column field="satuanJual" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">Satuan Jual</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-center text-SM">{{ slotProps.data.satuanJual }}</div>
            </div>
          </template>
        </Column>
        <Column field="hargaDasar" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-end">Harga Dasar</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-end text-SM">Rp {{ slotProps.data.hargaDasar}}</div>
            </div>
          </template>
        </Column>
        <Column field="HNA" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-end">HNA</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM text-end">Rp {{ slotProps.data.HNA}}</div>
            </div>
          </template>
        </Column>
        <Column field="HPP" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-end">HPP</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-end text-SM">Rp {{ slotProps.data.HPP}}</div>
            </div>
          </template>
        </Column>
      </DataTable>
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
  <DetailRiwayatTarif
    :dataBreadCrumb="dataBreadCrumb"
    :pageType="pageType"
    :detailData="detailRiwayatTarifData"
    v-else-if="dataBreadCrumb[0].label == 'Detail Riwayat Tarif'"
    @kembali="dataBreadCrumb[0].label = 'Riwayat Tarif'"
  />
</template>
