<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useCompositionStore } from "@/stores/datamasterFarmasi/Composition";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import SidebarStok from "@/components/Stok/SidebarStok.vue";
import { linkType } from "@/utils/Enum";
import VerifikasiPengirimanUnit from "./PengeluaranBarang/VerifikasiPengirimanUnit.vue";
import PengeluaranUnit from "./PengeluaranBarang/PengeluaranUnit.vue";
import ReturUnit from "./PengeluaranBarang/ReturUnit.vue";
import type { SidebarBody } from "@/utils/Interface";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import PermintaanBarang from "./PermintaanBarang.vue";
import { shallowRef } from "vue";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
import { utilsStore } from "@/stores/utils";

const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  title: {
    type: String,
  },
  method: {
    type: String,
  },
  payload: {
    type: Object,
    default: () => ({}),
  },
});

const UseUtilsStore = utilsStore();

const stockLocationStore = useStockLocationStore();
const stockLocationPayload = ref([]);

const fetchStockLocation = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await stockLocationStore.getApi(1, 9999999);
    stockLocationPayload.value = response.payload || [];
    console.log("stockLocationPayload:", stockLocationPayload.value);
  } catch (error) {
    console.log(error);
  }
  UseUtilsStore.setLoading(false);
};

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};

const currentComponent = shallowRef(PermintaanBarang);
const selectedKey = ref("permintaan-barang");
const lokasiStok = ref();

const sidebarBodyList: SidebarBody[] = [
  {
    name: "Stok",
    type: linkType.DROPDOWN,
    child: [
      {
        name: "Permintaan Barang",
        icon: "BoxPlusIcon",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Permintaan Unit",
            type: linkType.LINK,
            datas: "permintaan-barang",
          },
        ],
      },
      {
        name: "Pengeluaran Barang",
        icon: "BoxPlusIcon",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Verifikasi & Pengiriman Unit",
            type: linkType.LINK,
            datas: "verifikasi-pengiriman-unit",
          },
          {
            name: "Pengeluaran Unit",
            type: linkType.LINK,
            datas: "pengeluaran-unit",
          },
          { name: "Retur Unit", type: linkType.LINK, datas: "retur-unit" },
        ],
      },
    ],
  },
];

const handleSelect = (key: string) => {
  selectedKey.value = key;
  if (key === "permintaan-barang") currentComponent.value = PermintaanBarang;
  else if (key === "verifikasi-pengiriman-unit")
    currentComponent.value = VerifikasiPengirimanUnit;
  else if (key === "pengeluaran-unit") currentComponent.value = PengeluaranUnit;
  else if (key === "retur-unit") currentComponent.value = ReturUnit;
};

// onMounted(() => {
//   fetchStockLocation();
// });

watch(
  () => props.isDialogVisible,
  (visible) => {
    if (visible) fetchStockLocation();
  }
);
</script>

<template>
  <CustomDialog
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    width="1000px"
  >
    <template #header>
      <div class="flex gap-2 items-center">
        <div>Lokasi Stok</div>
        <CustomSelect
          v-model="lokasiStok"
          :options="stockLocationPayload"
          optionLabel="name"
          optionValue="uuid"
          dataKey="uuid"
          :showLabel="false"
          placeHolder="Pilih lokasi stok"
          :class="['rounded-md border bg-adameds-300 border-adameds-white']"
        />
      </div>
    </template>
    <template #body>
      <div class="flex gap-3 pt-4 h-full">
        <SidebarStok
          sidebar-title="Stok"
          sidebar-title-url="/stok"
          :sidebar-body-list="sidebarBodyList"
          :selected-key="selectedKey"
          @select-component="handleSelect"
        />
        <component
          :is="currentComponent"
          class="overflow-auto max-h-full grow"
        ></component>
      </div>
    </template>
  </CustomDialog>
</template>
