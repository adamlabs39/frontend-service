<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderPenerimaanBarang from "../../Layout/HeaderPenerimaanBarang.vue";
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import CustomChip from "@/components/Base/CustomChip.vue";
import DetailPenerimaanReturUnit from "./PenerimaanReturUnit/DetailPenerimaanReturUnit.vue";
import Paginator from "primevue/paginator";

const route = useRoute();

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);
const penerimaanReturUnitData = ref<any | null>(null);

const detailPenerimaanReturUnitData = ref();

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label:
        pageType.value == "penerimaan-retur-unit"
          ? "Penerimaan Retur Unit"
          : "",
    },
  ];
  //   console.log(pageType.value);
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
  penerimaanReturUnitData.value = [
    {
      noRetur: "RTR8872",
      tanggalRetur: "01-01-2024",
      petugasRetur: "Nama Petugas",
      catatan: "Halo semuanya",
      jenisStok: "Umum",
      jenisItem: "Obat",
      kategoriItem: "Medis",
      asalRetur: "Gudang Farmasi",
      tujuanRetur:"Farmasi",
      alasanRetur: "Rusak",
      datas: [
        {
          namaItems: "Paracetamol",
          minStok: 0,
          maxStok: 0,
          retur: 1,
          penerimaan: 1,
        },
      ],
    },
  ];
});

const changeSection = (label: string, data: any = null) => {
  dataBreadCrumb.value = [{ label }]; // Pastikan ini direset
  if (data) {
    detailPenerimaanReturUnitData.value = data; // Simpan data detail
  }
};

const handleRowClick = (rowData: any) => {
  changeSection("Detail Penerimaan Retur", rowData.data);
};
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    v-if="dataBreadCrumb[0].label == 'Penerimaan Retur Unit'"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderPenerimaanBarang
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
      />
    </template>
    <template #content>
      <DataTable
        v-if="penerimaanReturUnitData.length"
        :value="penerimaanReturUnitData"
        @row-click="handleRowClick"
        tableStyle="min-width: 50rem"
        scrollable
        scrollHeight="240px"
        :pt="{ headerRow: 'text-SM' }"
      >
        <Column field="tanggal" headerClass="bg-adameds-50">
          <template #header>
            <div class="font-semibold">Tanggal</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM">{{ slotProps.data.tanggalRetur }}</div>
            </div>
          </template>
        </Column>
        <Column field="noPembelian" headerClass="bg-adameds-50">
          <template #header>
            <div class="font-semibold">No. Pembelian</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM">{{ slotProps.data.noRetur }}</div>
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

        <Column field="supplier" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold">Asal Pengirim</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="font-bold text-SM">
                {{ slotProps.data.asalRetur }}
              </div>
            </div>
          </template>
        </Column>

        <Column field="petugas" headerClass="bg-adameds-50">
          <template #header>
            <div class="font-semibold">Alasan Retur</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM">{{ slotProps.data.alasanRetur }}</div>
            </div>
          </template>
        </Column>
        <Column field="petugas" headerClass="bg-adameds-50">
          <template #header>
            <div class="font-semibold">Petugas</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM">{{ slotProps.data.petugasRetur }}</div>
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
  <DetailPenerimaanReturUnit
    :dataBreadCrumb="dataBreadCrumb"
    :pageType="pageType"
    :detailData="detailPenerimaanReturUnitData"
    v-else-if="dataBreadCrumb[0].label == 'Detail Penerimaan Retur'"
    @kembali="dataBreadCrumb[0].label = 'Penerimaan Retur Unit'"
  />
</template>
