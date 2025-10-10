<script setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";

const emit = defineEmits(["back"]);

const searchQuery = ref("");
const buttonSelect = ref("permintaan-barang");
const jenisItemSwitch = ref(false);
</script>

<template>
  <div>
    <Card>
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Permintaan Barang',
                    home: true,
                  }"
                />
                <PhCaretRight
                  :size="25"
                  weight="bold"
                  class="ml-[10px] mt-[8px] text-adameds-300"
                />
                <div class="">
                  <p
                    class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]"
                  >
                    Permintaan Unit
                  </p>
                </div>
              </div>
              <CustomButton
                @click="emit('back')"
                icon="PhCaretLeft"
                label="Kembali"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="py-3 space-y-3">
              <div class="flex gap-2">
                <div class="flex items-end">
                  <CustomDatePicker class="w-36" label="Tgl. Permintaan" />
                  <div class="flex items-center">
                    <PhMinus :size="32" />
                    <CustomDatePicker class="w-36" :showLabel="false" />
                  </div>
                </div>
                <div class="flex gap-2 w-full">
                  <CustomSelect
                    class="w-full"
                    label="Kategori Item"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                  <CustomSelect
                    class="w-full"
                    label="Kategori Item"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                  <CustomSelect
                    class="w-full"
                    label="Jenis Item"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                </div>
              </div>
              <div class="flex gap-2">
                <CustomSelect
                  class="w-full"
                  label="Tujuan Permintaan"
                  :options="[{ label: 'Unit 1', value: '1' }]"
                />
                <CustomSelect
                  class="w-full"
                  label="Catatan"
                  :options="[{ label: 'Unit 1', value: '1' }]"
                />
                <CustomSwitch
                  v-model="jenisItemSwitch"
                  class="w-full"
                  label="Jenis Item"
                />
              </div>
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
      </template>
      <template #content>Halo</template>
    </Card>
  </div>
</template>

<style lang="scss" scoped></style>
