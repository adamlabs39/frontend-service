<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useTarifStore } from "@/stores/datamaster/tarif";
import CustomButton from "@/components/Base/CustomButton.vue";
import { utilsStore } from "@/stores/utils";
import Footer from "../Layout/FooterPaginator.vue";
import TablesRuangan from "./TarifRuangan/TablesRuangan.vue";
import TablesTindakan from "./TarifTindakan/TablesTindakan.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import FormTarifTindakan from "./TarifTindakan/FormTarifTindakan.vue";
import FormTarifRuangan from "./TarifRuangan/FormTarifRuangan.vue";
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

const isTambahTindakanDialogVisible = ref(false);
const isTambahRuanganDialogVisible = ref(false);
const isDeleteDialogVisible = ref(false);

const dialogConfig = ref<any>({
  method: "add",
  title: "Tambah Data",
  data: null,
});

const FormTindakanDialog = (
  method: string,
  title: string,
  data: any = null
) => {
  dialogConfig.value = { method, title, data };
  isTambahTindakanDialogVisible.value = true;
};

const FormRUanganDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  isTambahRuanganDialogVisible.value = true;
};

const deleteDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  isDeleteDialogVisible.value = true;
};
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
        @tambah-data="FormTindakanDialog('add', 'Tambah Data')"
        @tarif-ruangan="FormRUanganDialog('add', 'Tambah Data')"
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
      <FormTarifTindakan
        v-model:isDialogVisible="isTambahTindakanDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        :payload="dialogConfig.data"
        @data-updated="fetchTarifData"
      />
      <FormTarifRuangan
        v-model:isDialogVisible="isTambahRuanganDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        :payload="dialogConfig.data"
        @data-updated="fetchTarifData"
      />
    </template>
    <template #footer>
      <Footer :rows="1" :totalRecords="1" />
    </template>
  </Card>
</template>
