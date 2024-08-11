<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import Ruangan from "./Ruangan.vue";
import Tindakan from "./Tindakan.vue";

const value = ref("0");
</script>

<template>
  <div
    class="flex flex-col justify-between overflow-hidden bg-white border rounded border-neutral-lightActive"
  >
    <Header title="Tarif" :filter="false" :search="false">
      <template #header>
        <div class="flex items-center justify-end gap-2 mb-2">
          <CustomButton
            label="TINDAKAN"
            class="w-[320px]"
            :text-color="value === '0' ? 'text-white' : 'text-adameds-300'"
            :border-color="value === '0' ? 'border-none' : 'border-adameds-300'"
            :class="value === '0' ? 'bg-adameds-300' : 'bg-white'"
            @click="value = '0'"
            :outlined="value !== '0'"
          />
          <CustomButton
            label="RUANGAN"
            class="w-[320px]"
            :text-color="value === '1' ? 'text-white' : 'text-adameds-300'"
            :border-color="value === '1' ? 'border-none' : 'border-adameds-300'"
            :class="value === '1' ? 'bg-adameds-300' : 'bg-white'"
            @click="value = '1'"
            :outlined="value !== '1'"
          />
        </div>
      </template>
      <template #content>
        <div class="flex justify-between gap-2.5 py-5">
          <CustomSelect
            :is-loading="false"
            label="Cari Tarif"
            place-holder="Cari Tarif"
            class="grow"
          />
          <CustomSelect
            :is-loading="false"
            label="Unit Pelayanan"
            place-holder="Pilih Unit Pelayanan"
          />
          <CustomSelect
            :is-loading="false"
            label="Metode Pembayaran"
            place-holder="Pilih Metode Pembayaran"
          />
          <div class="flex justify-between items-end gap-2.5">
            <CustomButton icon="PhMagnifyingGlass" label="Cari" @click="" />
            <CustomButton
              label="Reset"
              @click=""
              border-color="border-adameds-300"
              background-color="bg-white"
              text-color="text-adameds-300"
            />
          </div>
        </div>
      </template>
    </Header>
    <div class="overflow-scroll grow px-5 pt-2.5">
      <Tabs v-model:value="value">
        <TabPanels>
          <TabPanel value="0">
            <Tindakan />
          </TabPanel>
          <TabPanel value="1">
            <Ruangan />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    <Footer />
  </div>
</template>

