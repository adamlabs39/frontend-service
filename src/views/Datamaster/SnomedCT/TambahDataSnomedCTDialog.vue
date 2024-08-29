<script lang="ts" setup>
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import { useSnomedCTStore } from "@/stores/datamaster/snomedCT";

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
  editData: {
    type: Object,
    default: () => ({}),
  },
});
const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode harus diisi"),
    name: yup.string().required("Nama Snomed CT harus diisi"),
    status: yup.bool().default(false),
  })
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const snomedCTStore=useSnomedCTStore();

const onSubmit = handleSubmit(async (values: any) => {
  try {
    if (props.method === "edit") {
      if (!props.editData || !props.editData.uuid) {
        throw new Error("UUID is missing for edit operation");
      }

      const uuid = props.editData.uuid;
      console.log("Editing data with UUID:", uuid, "and values:", values);

      const response = await snomedCTStore.putApi(uuid, values);
      console.log("Data updated successfully:", response);

    } else if (props.method === "add") {
      console.log("Adding new data with values:", values);

      const response = await snomedCTStore.postApi(values);
      console.log("Data added successfully:", response);
    }
    closeDialog();
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
});

const [code] = defineField("code");
const [name] = defineField("name");
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
    if (newValue && props.method === "edit" && props.editData) {
      setValues({
        ...props.editData,
      });
    } else if (!newValue) {
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
    <template #header>{{ title }} Snomed CT</template>
    <template #body>
      <div class="flex flex-col gap-5 mt-5">
        <div class="flex gap-2.5">
          <CustomTextfield
            label="Kode Snomed-CT"
            v-model="code"
            placeholder="Kode Snomed-CT"
            :invalid="!!errors.code"
            :invalidMessage="errors.code"
          />
          <CustomTextfield
            label="Nama Snomed CT"
            v-model="name"
            placeholder="Nama Snomed CT"
            class="basis-3/4"
            :invalid="!!errors.name"
            :invalidMessage="errors.name"
          />
        </div>
        <hr />
        <CustomSwitch
          v-model="status"
          :show-label="true"
          label="Status"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
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
