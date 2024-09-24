<script lang="ts" setup>
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  title: {
    type: String,
  },
  method: {
    type: String,
  },
});
const itemsSnomedCt = ref([
  { name: "Amoxilin002", code: "SNOMED-003" },
  { name: "Paramex002", code: "SNOMED-004" },
  { name: "Acarbose002", code: "SNOMED-005" },
]);
const itemsIcd9 = ref([
  { name: "ICD9 Name 002", code: "ICD9-002" },
  { name: "ICD9 Name 003", code: "ICD9-003" },
  { name: "ICD9 Name 004", code: "ICD9-004" },
  { name: "ICD9 Name 005", code: "ICD9-005" },
]);

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode harus diisi"),
    name: yup.string().required("Nama tindakan harus diisi"),
    snomedCt: yup.string(),
    icd9: yup.string(),
    status: yup.bool(),
  })
);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit((values: any) => {
  if (props.method === "edit") {
    // Logic to save edited data
    console.log("Editing data:", values);
  } else if (props.method === "add") {
    // Logic to add new data
    console.log("Adding new data:", values);
  }
  closeDialog();
});

const [code] = defineField("code");
const [name] = defineField("name");
const [snomedCt] = defineField("snomedCt");
const [icd9] = defineField("icd9");
const [status] = defineField("status");

const emit = defineEmits(["update:isDialogVisible", "close"]);

function updateVisibility(value: any) {
  emit("update:isDialogVisible", value);
}
function closeDialog() {
  emit("close");
}
watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (!newValue) {
      resetForm();
    }
  }
);
</script>
<template>
  <CustomDialog
    width="600px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Tindakan</template>
    <template #body>
      <div class="grid grid-cols-12 gap-5 mt-5">
        <CustomTextfield
          label="Kode Ruangan"
          v-model="code"
          placeholder="Kode Ruangan"
          :invalid="!!errors.code"
          :invalidMessage="errors.code"
          class="col-span-4"
        />
        <CustomTextfield
          label="Nama Tindakan"
          v-model="name"
          placeholder="Nama Tindakan"
          :invalid="!!errors.name"
          :invalidMessage="errors.name"
          class="col-span-8"
        />
        <CustomSelect
          label="Snomed CT"
          place-holder="Pilih Snomed CT"
          v-model="snomedCt"
          :options="itemsSnomedCt"
          optionValue="code"
          optionLabel="name"
          class="col-span-12"
        />
        <CustomSelect
          label="ICD-9 CM"
          place-holder="Pilih ICD-9 CM"
          v-model="icd9"
          :options="itemsIcd9"
          optionValue="code"
          optionLabel="name"
          class="col-span-12"
        />
        <hr class="border-grey-200 col-span-12" />
        <CustomSwitch
          v-model="status"
          :show-label="true"
          label="Status"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
          class="col-span-12"
        />
      </div>
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
            @click="closeDialog"
          >
          </CustomButton>
          <CustomButton label="Simpan" @click="onSubmit"> </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
