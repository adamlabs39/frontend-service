<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { computed, ref, type PropType } from "vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import DataPasien from "../Section/Expertise/DataPasien.vue";
import AsesmenMedis from "../Section/Expertise/AsesmenMedis.vue";
import ListOrder from "../Section/Expertise/ListOrder.vue";
import Catatan from "../Section/Expertise/Catatan.vue";
import CatatanExpertise from "../Section/Expertise/CatatanExpertise.vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  formType: {
    type: String,
    default: "",
  },
  isDetail: {
    type: Boolean,
    required: false,
  },
  patientData: {
    type: Object as PropType<any>,
    required: true,
  },
});

const emit = defineEmits(["back", "goToDetail", "goToEdit"]);
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <Card class="h-min mb-[10px] absolute top-0 right-0 left-0">
      <template #content>
        <div class="flex justify-between">
          <CustomBreadCrumb
            :home="{
              label: 'Expertise',
              home: true,
            }"
          />
          <div class="flex">
            <div class="flex mr-[30px] mt-2">
              <div class="bg-adameds-300 w-[1px] h-[30px]"></div>
              <p class="text-sm ml-[10px] mt-[3px]">Tgl. Order : 3-10-2024</p>
            </div>
            <CustomButton
              @click="emit('back')"
              icon="PhCaretLeft"
              label="Kembali"
              outlined
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
            />
          </div>
        </div>
      </template>
    </Card>
    <div class="relative h-full overflow-auto top-[90px] pb-[180px]">
      <DataPasien
        class="mt-2"
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
        :patientData="patientData"
        @back="dataBreadCrumb.pop()"
      />
      <AsesmenMedis
        class=""
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
        :patientData="patientData"
        @back="dataBreadCrumb.pop()"
      />

      <ListOrder
        class=""
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
        :patientData="patientData"
        @back="dataBreadCrumb.pop()"
      />
      <Catatan
        class=""
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
        :patientData="patientData"
        @back="dataBreadCrumb.pop()"
      />
      <CatatanExpertise
        class=""
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
        :patientData="patientData"
        @back="dataBreadCrumb.pop()"
      />
    </div>

    <Card class="absolute inset-x-0 bottom-0">
      <template #footer>
        <div class="flex justify-between">
          <CustomButton
            @click="() => {}"
            icon="PhPrinter"
            label="Print Hasil"
            class="mr-[10px]"
            backgroundColor="bg-adameds-300"
          />
          <!-- <CustomButton
            label="Simpan Hasil"
            outlined
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            @click=""
          /> -->
          <CustomButton
            label="Simpan Expertise"
            class=""
            backgroundColor="bg-adameds-300"
            disabled
          />
        </div>
      </template>
    </Card>
  </div>
</template>
