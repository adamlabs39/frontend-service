<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useTarifStore } from "@/stores/datamaster/tarif";
import CustomButton from "@/components/Base/CustomButton.vue";
import { utilsStore } from "@/stores/utils";
import Footer from "../Layout/FooterPaginator.vue";
import TablesRuangan from "./TablesRuangan.vue";
import TablesTindakan from "./TablesTindakan.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import FormTarifTindakan from "./FormTarifTindakan.vue";
import FormTarifRuangan from "./FormTarifRuangan.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";

const selectedTab = ref("0");
const handleSelectedTab = (newTab: any) => {
  selectedTab.value = newTab;
};
const testDialog = ref(false);

const tarifStore = useTarifStore();
const UseUtilsStore = utilsStore();
const tarifPayload = ref<any[]>([]);
const tindakanPayload = ref<any[]>([]);
const ruanganPayload = ref<any[]>([]);

const tarifProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

const fetchTarifData = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await tarifStore.getApi(
      tarifProperties.value.page,
      tarifProperties.value.page_size
    );

    if (response && response.payload) {
      tarifProperties.value.total = response.properties.total;

      // Full payload
      tarifPayload.value = response.payload;

      // Filter tindakan and ruangan
      tindakanPayload.value = tarifPayload.value.filter(
        (item: any) => item.jenisTarif === "Tindakan"
      );
      ruanganPayload.value = tarifPayload.value.filter(
        (item: any) => item.jenisTarif === "Ruangan"
      );
    } else {
      tarifPayload.value = [];
      tindakanPayload.value = [];
      ruanganPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    tarifPayload.value = [];
    tindakanPayload.value = [];
    ruanganPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const formTarifTindakanRef = ref<InstanceType<typeof FormTarifTindakan> | null>(
  null
);

const onSubmit = () => {
  if (formTarifTindakanRef.value) {
    formTarifTindakanRef.value.onSubmit();
  }
};

onMounted(() => {
  fetchTarifData();
});
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilter
        page-type="tarif"
        @tambah-data="testDialog = true"
        @selected-tab="handleSelectedTab"
      />
    </template>
    <template #content>
      <Tabs v-model:value="selectedTab">
        <TabPanels>
          <TabPanel value="0">
            <TablesTindakan :payload="tindakanPayload" />
          </TabPanel>
          <TabPanel value="1">
            <TablesRuangan :payload="ruanganPayload" />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <CustomDialog
        width="1000px"
        v-model:visible="testDialog"
        headerBg="bg-adameds-300"
      >
        <template #header>Tambah Tarif</template>
        <template #body>
          <div class="flex flex-col h-full overflow-hidden">
            <div v-if="selectedTab === '0'" class="flex-1 overflow-hidden">
              <FormTarifTindakan ref="formTarifTindakanRef" />
            </div>
            <div v-if="selectedTab === '1'">
              <FormTarifRuangan />
            </div>
          </div>
        </template>
        <template #footer>
          <div class="w-full">
            <hr class="-mx-5 border-grey-200" />
            <div class="mt-5 flex justify-end gap-2.5">
              <CustomButton
                label="Batal"
                border-color="border-grey-200"
                background-color="bg-white"
                text-color="text-grey-300"
              >
              </CustomButton>
              <CustomButton @click="onSubmit" label="Simpan" />
            </div>
          </div>
        </template>
      </CustomDialog>
    </template>
    <template #footer>
      <Footer :rows="1" :totalRecords="1" />
    </template>
  </Card>
</template>
