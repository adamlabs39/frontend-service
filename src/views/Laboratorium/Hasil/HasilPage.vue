<script lang="ts" setup>
import { ref } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/HasilHeader.vue";
import Periksa from "./HasilPeriksa.vue";
import Selesai from "./HasilSelesai.vue";
import LaboratoriumFooter from "../Layout/LaboratoriumFooter.vue";

const value = ref("0");
</script>

<template>
  <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto">
    <template #header>
      <Header :activeTab="value" title="Data Antrian" :filter="false" :search="false">
        <template #header>
          <div class="flex flex-row items-center justify-end gap-2">
            <CustomButton
              label="PERIKSA"
              class="w-[200px]"
              :text-color="value === '0' ? 'text-white' : 'text-adameds-300'"
              :border-color="value === '0' ? 'border-none' : 'border-adameds-300'"
              :class="value === '0' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '0'"
              :outlined="value !== '0'"
            />
            <CustomButton
              label="SELESAI"
              class="w-[200px]"
              :text-color="value === '1' ? 'text-white' : 'text-adameds-300'"
              :border-color="value === '1' ? 'border-none' : 'border-adameds-300'"
              :class="value === '1' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '1'"
              :outlined="value !== '1'"
            />
          </div>
        </template> 
      </Header>
    </template>
    <template #content>
      <Tabs v-model:value="value">
        <TabPanels>
          <TabPanel value="0">
            <Periksa />
          </TabPanel>
          <TabPanel value="1">
            <Selesai />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
    <template #footer>
      <LaboratoriumFooter />
    </template>
  </Card>
</template>
