<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderStokOpname from "../../Layout/HeaderStokOpname.vue";
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import NoData from "@/components/section/NoData.vue";
import TambahStokOpname from "./TambahStokOpname.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const route = useRoute();

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);
const dataStokOpname = ref<any[]>([]);
const detailStokOpname = ref();

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[2] ?? "";
  dataBreadCrumb.value = [
    {
      label: pageType.value == "stok-opname" ? "Stok Opname" : "",
    },
  ];
  //   console.log(pageType.value);
};

const changeSection = (label: string, data: any = null) => {
  dataBreadCrumb.value = [{ label }]; // Pastikan ini direset
  if (data) {
    detailStokOpname.value = data; // Simpan data detail
  }
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
});

const handleSimpanDraft = (data: any) => {
  if (dataStokOpname.value === null) {
    dataStokOpname.value = [];
  }
  dataStokOpname.value.push(data);
  dataBreadCrumb.value[0].label = "Stok Opname";
};
</script>

<template>
  <Card
    v-if="dataBreadCrumb[0].label == 'Stok Opname'"
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderStokOpname
        :data-bread-crumb="dataBreadCrumb"
        :page-type="pageType"
        @tambah-stok-opname="changeSection('Tambah Stok Opname')"
      />
    </template>
    <template #content>
      <DataTable
      v-if="dataStokOpname && dataStokOpname.length"
   :value="dataStokOpname"
        tableStyle="min-width: 50rem"
        scrollable
        scrollHeight="240px"
        :pt="{ headerRow: 'text-SM' }"
      >
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="font-semibold">Tgl. Cut Off</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM">{{ slotProps.data.tglCutOff }}</div>
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="w-[250px]">
          <template #header>
            <div class="font-semibold">No Stok Opname</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM">SO{{ slotProps.data.noStokOpname}}</div>
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

        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold">Judul Stok Opname</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="font-bold text-SM">
                {{ slotProps.data.judul }}
              </div>
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold">Petugas</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold underline text-SM">Petugas Stok Opname</div>
            <div class="font-normal text-normal">{{slotProps.data.petugasStokOpname}}</div>
          </template>
        </Column>

        <Column field="petugas" headerClass="bg-adameds-50">
          <template #header>
            <div class="font-semibold">Status</div>
          </template>
          <template #body="slotProps">
              <CustomChip
            :showCheckedIcon="false"
            :label="slotProps.data.status"
            bgColor="bg-warning-75"
            textColor="text-warning-300"
            customClass="h-5 pr-[6px] border-none mr-[5px]"
          />
          </template>
        </Column>
      </DataTable>
      <NoData v-else/>
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

  <TambahStokOpname
    v-else-if="dataBreadCrumb[0].label == 'Tambah Stok Opname'"
    :pageType="pageType"
    :dataBreadCrumb="dataBreadCrumb"
    @kembali="dataBreadCrumb[0].label = 'Stok Opname'"
    @on-simpan-draft="handleSimpanDraft"
  />
</template>
