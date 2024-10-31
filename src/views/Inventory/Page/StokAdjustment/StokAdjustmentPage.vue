<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from "vue-router";
import HeaderStokAdjustment from "../../Layout/HeaderStokAdjustment.vue";
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import DialogDetailAdjustment from "./DialogDetailAdjustment.vue";

const route = useRoute();

const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([{}]);

const stokAdjustmentData = ref();

const detailStokAdjustmentData = ref(null);

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[2] ?? "";
  dataBreadCrumb.value = [
    {
      label: pageType.value == "stok-adjustment" ? "Stock Adjustment" : "",
    },
  ];
  //   console.log(pageType.value);
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});

onMounted(() => {
  updatePageType(route.path);
  stokAdjustmentData.value = [
    {
      namaItem: "Paracetamol",
      jenisStok: "Umum",
      jenisItem: "Obat",
      kategoriItem: "Medis",
      jenisObat: "Obat Keras",
      minStok: 0,
      maxStok: 0,
      sisaStok: 1000,
      subData: [
        {
          namaItem: "Paracetamol",
          jenisStok: "Umum",
          jenisItem: "Obat",
          kategoriItem: "Medis",
          jenisObat: "Obat Keras",
          expDate: "01-01-2025",
          stok: 800,
        },
      ],
    },
  ];
});

const handleAdjustment = (rowData: any) => {
  console.log("Adjustment data:", rowData);
  handleDetailStok(rowData);
};

const dialogDetailStok = ref({
  isVisible: false,
});

function handleDetailStok(values: any) {
  //   console.log(values.data);

  dialogDetailStok.value.isVisible = true;
 detailStokAdjustmentData.value = values;
}
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    v-if="dataBreadCrumb[0].label == 'Stock Adjustment'"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderStokAdjustment
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
      />
    </template>
    <template #content>
      <DataTable
        v-if="stokAdjustmentData.length"
        :value="stokAdjustmentData"
        tableStyle="min-width: 50rem"
        scrollable
        scrollHeight="240px"
        :pt="{ headerRow: 'text-SM' }"
      >
        <Column field="tanggal" headerClass="bg-adameds-50" class="w-[40px]">
          <template #header>
            <div class="font-semibold">No</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM">{{ slotProps.index + 1 }}</div>
            </div>
          </template>
        </Column>
        <Column field="noPembelian" headerClass="bg-adameds-50">
          <template #header>
            <div class="font-semibold">Nama Item</div>
          </template>
          <template #body="slotProps">
            <div>
              <div class="text-SM">{{ slotProps.data.namaItem }}</div>
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
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.jenisObat"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
            </div>
          </template>
        </Column>

        <Column field="minStok" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold">Min. Stok</div>
          </template>
          <template #body="slotProps">
            <div class="font-normal text-SM">
              {{ slotProps.data.minStok }}
            </div>
            <div class="font-normal text-[8px] text-adameds-300">Tablet</div>
          </template>
        </Column>
        <Column field="maxStok" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold">Max. Stok</div>
          </template>
          <template #body="slotProps">
            <div class="font-normal text-SM">
              {{ slotProps.data.maxStok }}
            </div>
            <div class="font-normal text-[8px] text-adameds-300">Tablet</div>
          </template>
        </Column>
        <Column field="sisaStok" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold">Sisa Stok</div>
          </template>
          <template #body="slotProps">
            <div class="font-normal text-SM">
              {{ slotProps.data.sisaStok }}
            </div>
            <div class="font-normal text-[8px] text-adameds-300">Tablet</div>
          </template>
        </Column>

        <Column field="action" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">Action</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              <CustomButton
                label="Adjustment"
                class="my-auto bg-adameds-300"
                @click="handleAdjustment(slotProps.data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>

      <DialogDetailAdjustment
        v-model:is-dialog-visible="dialogDetailStok.isVisible"
        :detailData="detailStokAdjustmentData"
      />
    </template>
  </Card>
</template>
