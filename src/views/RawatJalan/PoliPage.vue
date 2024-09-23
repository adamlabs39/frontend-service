<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useIndexStore } from "@/stores";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
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

const props = defineProps({
  filter: {
    type: String,
    default: "",
  },
});

const value = ref("0");

</script>
<template>
  <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto" class="">
    <template #header>
      <DataRawatJalanHeader :activeTab="value" title="Semua Poli">
        <template #content>
          <div>
            
          </div>
        </template>
      </DataRawatJalanHeader>
    </template>
  </Card>
</template>
