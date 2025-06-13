<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { computed, ref, type PropType } from "vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import DataPasien from "../Section/HasilPemeriksaan/DataPasien.vue";
import AsesmenMedis from "../Section/HasilPemeriksaan/AsesmenMedis.vue";
import ListOrder from "../Section/HasilPemeriksaan/ListOrder.vue";
import Catatan from "../Section/HasilPemeriksaan/Catatan.vue";
import CatatanExpertise from "../Section/HasilPemeriksaan/CatatanExpertise.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import { epochToDate, dateToEpoch, formatPrice } from "@/utils/Helpers";

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
  openedPatientData: {
    type: Object as PropType<any>,
    required: true,
  },
});

const emit = defineEmits(["back", "goToDetail", "goToEdit"]);
const popupDialog = ref(false);
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <Card class="h-min mb-[10px] absolute top-0 right-0 left-0">
      <template #content>
        <div class="flex justify-between">
          <CustomBreadCrumb
            :home="{
              label: 'Hasil Pemeriksaan',
              home: true,
            }"
          />
          <div class="flex">
            <div class="flex mr-[30px] mt-2">
              <div class="bg-adameds-300 w-[1px] h-[30px]"></div>
              <p class="text-sm ml-[10px] mt-[3px]">
                Tgl. Order :
                {{
                  epochToDate(
                    parseInt(openedPatientData.tglOrder) / 1000,
                    "date"
                  )
                }}
              </p>
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
        :openedPatientData="openedPatientData"
        @back="dataBreadCrumb.pop()"
      />
      <AsesmenMedis
        class=""
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
        :openedPatientData="openedPatientData"
        @back="dataBreadCrumb.pop()"
      />

      <ListOrder
        class=""
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
        :openedPatientData="openedPatientData"
        @back="dataBreadCrumb.pop()"
      />
      <Catatan
        class=""
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
        :openedPatientData="openedPatientData"
        @back="dataBreadCrumb.pop()"
      />
      <CatatanExpertise
        class=""
        :dataBreadCrumb="dataBreadCrumb"
        :pageType="pageType"
        :openedPatientData="openedPatientData"
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
          <div class="flex gap-3">
            <CustomButton
              label="Simpan Hasil"
              outlined
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
              @click=""
            />
            <CustomButton
              label="Selesai"
              class=""
              backgroundColor="bg-adameds-300"
              @click="popupDialog = true"
            />
          </div>
        </div>
      </template>
    </Card>

    <CustomDialog v-model:visible="popupDialog" width="700px">
      <template #header>
        <div class="flex text-heading">Selesai Pemeriksaan</div>
      </template>
      <template #body>
        <div>
          <div class="pt-5 mb-20">
            <p class="mb-5 text-warning-300">
              Pastikan sudah melakukan pengecekan (verifikasi) pada hasil
              Laboratorium.
            </p>
            <p>
              Setelah
              <span class="font-bold">Selesai</span>, hasil pemeriksaan lab
              <span class="font-bold">tidak dapat</span> diubah / update
              kembali.
            </p>
            <!-- <hr class="mt-3 border-[0.2px] border-grey-200" /> -->
          </div>
        </div>

        <Card class="absolute inset-x-0 bottom-0">
          <template #footer>
            <hr class="mb-3 border-gray-300" />
            <div class="flex justify-end">
              <CustomButton
                label="Tidak"
                class="mr-[10px]"
                outlined
                borderColor="border-grey-200"
                textColor="text-grey-300"
                @click="popupDialog = false"
              />

              <CustomButton
                label="Iya, Selesai"
                class=""
                backgroundColor="bg-adameds-300"
              />
            </div>
          </template>
        </Card>
      </template>
    </CustomDialog>
  </div>
</template>
