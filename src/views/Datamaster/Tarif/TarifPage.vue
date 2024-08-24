<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import Ruangan from "./Ruangan.vue";
import Tindakan from "./Tindakan.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import DetailTarifTindakan from "./DetailTarifTindakan.vue";
import DetailTarifRuangan from "./DetailTarifRuangan.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";

const selectedTab = ref("0");
const handleSelectedTab = (newTab: any) => {
  selectedTab.value = newTab;
};
const testDialog = ref(false);
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
            <Tindakan />
          </TabPanel>
          <TabPanel value="1">
            <Ruangan />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <CustomDialog
        :full-screen="true"
        v-model:visible="testDialog"
        headerBg="bg-adameds-300"
      >
        <template #header>Tambah Tarif</template>
        <template #body>
          <div v-if="selectedTab === '0'"><DetailTarifTindakan /></div>
          <div v-if="selectedTab === '1'"><DetailTarifRuangan /></div>
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
              <CustomButton label="Simpan"> </CustomButton>
            </div>
          </div>
        </template>
      </CustomDialog>
    </template>
    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
