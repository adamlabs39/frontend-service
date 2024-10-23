<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import HeaderPengadaanBarang from "../../Layout/HeaderPengadaanBarang.vue";
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import ReturSupplier from "./Tabel/ReturPenggantian/ReturSupplier.vue";
import { computed } from "vue";
import TambahRetur from "./ReturPenggantian/TambahRetur.vue";
import DetailRetur from "./ReturPenggantian/DetailRetur.vue";
import TerimaPenggantian from "./Tabel/ReturPenggantian/TerimaPenggantian.vue";

const route = useRoute();
const value = ref("1");

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);

const returData = ref<any | null>(null);

const detailReturData = ref();

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
    detailReturData.value = data; // Simpan data detail
  }
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
  returData.value = [];
});

// Hanya menampilkan RETUR saat di tabs RETUR SUPPLIER
const returSupplierData = computed(() => {
  return (
    returData.value?.filter((item: any) => item.status === "DIRETUR") || []
  );
});

const terimaPenggantianData = computed(() => {
  return (
    returData.value?.filter((item: any) => item.status === "DITERIMA") || []
  );
});

const tes = (value: any) => {
  console.log(value);
  dataBreadCrumb.value[0].label = "Retur & Penggantian Barang Supplier";

  returData.value.push(value);
};

const diterimaData = (updatedData:any) => {
  if (returData.value) {
    // Find the index of the item you want to update
     const index = returData.value.findIndex((item:any)=> item.noPembelian === updatedData.noPembelian);
    console.log(index)
    if (index !== -1) {
      // Update the existing item
      returData.value[index] = updatedData;
      dataBreadCrumb.value[0].label = 'Retur & Penggantian Barang Supplier';
    }
  }
}
</script>

<template>
  <!-- {{ returData }} -->
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
              @row-clicked="changeSection('Detail Retur', $event)"
            />
          </TabPanel>
          <TabPanel value="2">
            <TerimaPenggantian :penggantian-data="terimaPenggantianData" @row-clicked="changeSection('Detail Retur', $event)"/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
  </Card>
  <TambahRetur
    v-else-if="dataBreadCrumb[0].label == 'Tambah Retur'"
    :pageType="pageType"
    :dataBreadCrumb="dataBreadCrumb"
    @kembali="dataBreadCrumb[0].label = 'Retur & Penggantian Barang Supplier'"
    @on-simpan-retur="tes"
  />

  <DetailRetur
    v-else-if="dataBreadCrumb[0].label == 'Detail Retur'"
    :data-bread-crumb="dataBreadCrumb"
    :page-type="pageType"
    :detail-retur-data="detailReturData"
    @kembali="dataBreadCrumb[0].label = 'Retur & Penggantian Barang Supplier'"
    @diterima="diterimaData"
  />
</template>
