<script lang="ts" setup>
import { ref } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/DataHeader.vue";
import Admisi from "./DataAntrianAdmisi.vue";
import RawatJalan from "./DataAntrianRawatJalan.vue";
import Farmasi from "./DataAntrianFarmasi.vue";
import AntrianFooter from "../Layout/AntrianFooter.vue";

const value = ref("0");
</script>

<template>
  <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto">
    <template #header>
      <Header :activeTab="value" title="Data Antrian" :filter="false" :search="false">
        <template #header>
          <div class="flex flex-row items-center justify-end gap-2">
            <CustomButton
              label="ADMISI"
              class="w-[200px]"
              :text-color="value === '0' ? 'text-white' : 'text-adameds-300'"
              :border-color="value === '0' ? 'border-none' : 'border-adameds-300'"
              :class="value === '0' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '0'"
              :outlined="value !== '0'"
            />
            <CustomButton
              label="RAWAT JALAN"
              class="w-[200px]"
              :text-color="value === '1' ? 'text-white' : 'text-adameds-300'"
              :border-color="value === '1' ? 'border-none' : 'border-adameds-300'"
              :class="value === '1' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '1'"
              :outlined="value !== '1'"
            />
            <CustomButton
              label="FARMASI"
              class="w-[200px]"
              :text-color="value === '2' ? 'text-white' : 'text-adameds-300'"
              :border-color="value === '2' ? 'border-none' : 'border-adameds-300'"
              :class="value === '2' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '2'"
              :outlined="value !== '2'"
            />
          </div>
        </template>
      </Header>
    </template>
    <template #content>
      <Tabs v-model:value="value">
        <TabPanels>
          <TabPanel value="0">
            <Admisi />
          </TabPanel>
          <TabPanel value="1">
            <RawatJalan />
          </TabPanel>
          <TabPanel value="2">
            <Farmasi />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
    <template #footer>
      <AntrianFooter />
    </template>
  </Card>
</template>
