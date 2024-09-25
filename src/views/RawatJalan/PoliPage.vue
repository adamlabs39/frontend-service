<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useIndexStore } from "@/stores";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { downloadPdf } from "@/utils/PdfMake";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import CustomCkEditor from "../../components/Base/CustomCkEditor.vue";
import CustomRadio from "../../components/Base/CustomRadio.vue";
import MedicalRecord from "../MedicalRecord/MedicalRecord.vue";
import RMCustomSelect from "@/components/Base/RMCustomSelect.vue";
import DataRawatJalanHeader from "./Layout/DataRawatJalanHeader.vue";
import Pelayanan from "@/views/RawatJalan/Layout/DataPelayananRawatJalan.vue"
import { useRoute } from 'vue-router';
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";




const props = defineProps({
  filter: {
    type: String,
    default: "Semua Poli",
  },
});
const value = ref("1");

const showCancelVisit = ref(false);
const cancelReason = ref<string>();
</script>
<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <DataRawatJalanHeader :activeTab="value" :filter-menu="props.filter">
        <template #content>
          <div class="flex items-center gap-2">
            <CustomButton
              label=""
              icon="PhListBullets"
              class="w-[60px] bg-white"
              text-color="text-adameds-300"
              border-color="border-adameds-300 border-2"
            />
             Filter = {{ props.filter }}
            <CustomButton
              label="PELAYANAN"
              class="grow"
              :text-color="value === '1' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '1' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '1' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '1'"
              :outlined="value !== '1'"
            />
            <CustomButton
              label="DISCHARGE"
              class="grow"
              :text-color="value === '2' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '2' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '2' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '2'"
              :outlined="value !== '2'"
            />
          </div>
        </template>
      </DataRawatJalanHeader>
    </template>
    <template #content>
      <Tabs v-model:value="value">
        <TabPanels>
          <TabPanel value="1">
            <Pelayanan :show-cancel-visit="showCancelVisit" />
          </TabPanel>
          <TabPanel value="2">
            <Ruangan />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <div class="flex">
          <CustomButton
            v-if="!showCancelVisit"
            @click="showCancelVisit = true"
            class="my-auto bg-danger-300"
            label="Batal Kunjungan"
          />
          <CustomButton
            v-if="showCancelVisit"
            @click="showCancelVisit = false"
            class="my-auto mr-[10px]"
            label="Batal"
            outlined
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            v-if="showCancelVisit"
            @click="showCancelVisit = true"
            class="my-auto mr-5 bg-danger-300"
            label="Iya, Batalkan"
            :disabled="!cancelReason"
          />
          <CustomTextfield
            v-if="showCancelVisit"
            v-model="cancelReason"
            :showLabel="false"
            class="my-auto w-[400px]"
            placeholder="Alasan Batal Kunjungan"
          />
        </div>
        <Paginator
          :rows="10"
          :totalRecords="120"
          :rowsPerPageOptions="[10, 20, 30]"
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{currentPage}"
        >
          <template #start="slotProps">Total Data: 0</template>
        </Paginator>
      </div>
    </template>
  </Card>
</template>
