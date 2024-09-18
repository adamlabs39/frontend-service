<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
const emit = defineEmits(["onDelete"]);
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>
      <div class="flex items-center justify-between w-full pr-2.5">
        Surat Resep Kacamata
        <PhX :size="20" @click="emit('onDelete')" />
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-12 gap-y-5 pt-5">
        <CustomTextfield label="No. Surat" class="col-span-4" />
        <div
          class="w-full border border-adameds-300 col-span-12 flex items-center justify-center"
        >
          <img src="@/assets/images/Resep Pemeriksaan Mata.svg" />
        </div>
        <CustomSelect
          label="Pemeriksaan"
          place-holder="Pilih Pemeriksaan"
          class="col-span-12"
        />
        <div class="col-span-6 border-r pr-5 boder-grey-200">
          <div class="font-semibold text-normal mb-2.5">Resep OD</div>
          <Tabs
            value="0"
            :dt="{
              tabHoverBackground: '#E8F8F6',
              tabActiveBackground: '#E8F8F6',
              tabColor: '#D0D5DD',
              tabHoverColor: '#14B8A6',
              tabActiveColor: '#14B8A6',
              tabpanelFocusRingColor: '#000000',
            }"
          >
            <TabList>
              <Tab
                v-for="tab in tabs"
                :key="tab.title"
                :value="tab.value"
                :pt="{
                  root: {
                    class:
                      'font-semibold text-SM h-[40px] flex items-center border-b-[2px]',
                  },
                }"
                >{{ tab.title }}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel v-for="tab in tabs" :value="tab.value">
                <div class="grid grid-cols-2 gap-x-5 gap-y-2.5">
                  <CustomInputNumber label="Vitrum Spher" />
                  <CustomInputNumber label="Vitrum Cylndr" />
                  <CustomInputNumber label="Axis" />
                  <CustomInputNumber label="Prisma Basis" />
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
        <div class="col-span-6 pl-5">
          <div class="font-semibold text-normal mb-2.5">Resep OD</div>
          <Tabs
            value="0"
            :dt="{
              tabHoverBackground: '#E8F8F6',
              tabActiveBackground: '#E8F8F6',
              tabColor: '#D0D5DD',
              tabHoverColor: '#14B8A6',
              tabActiveColor: '#14B8A6',
              tabpanelFocusRingColor: '#000000',
            }"
          >
            <TabList>
              <Tab
                v-for="tab in tabs"
                :key="tab.title"
                :value="tab.value"
                :pt="{
                  root: {
                    class:
                      'font-semibold text-SM h-[40px] flex items-center border-b-[2px]',
                  },
                }"
                >{{ tab.title }}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel v-for="tab in tabs" :value="tab.value">
                <div class="grid grid-cols-2 gap-x-5 gap-y-2.5">
                  <CustomInputNumber label="Vitrum Spher" />
                  <CustomInputNumber label="Vitrum Cylndr" />
                  <CustomInputNumber label="Axis" />
                  <CustomInputNumber label="Prisma Basis" />
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
        <CustomInputNumber label="Distant Vitror" class="col-span-4 pr-5" />
        <CustomInputNumber label="Forma Vitror" class="col-span-4 pr-5" />
        <CustomInputNumber label="Colr Vitror" class="col-span-4" />
      </div>
    </template>
  </CustomAccordion>
</template>
