<script lang="ts" setup>
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";

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

const itemsPermission = ref([
  { name_mainMenu: "dashboard", code_mainMenu: "dashboard" },
  { name_mainMenu: "pasien", code_mainMenu: "pasien" },
  { name_mainMenu: "setting", code_mainMenu: "setting" },
  { name_mainMenu: "profile", code_mainMenu: "profile" },
  { name_mainMenu: "datamaster", code_mainMenu: "datamaster" },
]);

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode harus diisi"),
    name: yup.string().required("Nama Role harus diisi"),
    permission: yup
      .array()
      .of(yup.string())
      .required("Menu Akses harus dipilih"),
    status: yup.bool(),
  })
);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit((values: any) => {
  if (props.method === "edit") {
    console.log("Editing data:", values);
  } else if (props.method === "add") {
    console.log("Adding new data:", values);
  }
  closeDialog();
});

const [code] = defineField("code");
const [name] = defineField("name");
const [permission] = defineField("permission");
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
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    width="600px"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Role</template>
    <template #body>
      <form class="flex flex-col gap-5 mt-5">
        <div class="flex gap-2.5">
          <CustomTextfield
            label="Kode"
            v-model="code"
            placeholder="Kode"
            :invalid="!!errors.code"
            :invalidMessage="errors.code"
          />
          <CustomTextfield
            label="Nama Role"
            v-model="name"
            placeholder="Nama Role"
            class="basis-3/4"
            :invalid="!!errors.name"
            :invalidMessage="errors.name"
          />
        </div>
        <hr class="border-grey-200" />
        <CustomMultiSelect
          v-model="permission"
          :options="itemsPermission"
          label="Menu Akses"
          optionLabel="name_mainMenu"
          optionValue="code_mainMenu"
          :invalid="!!errors.permission"
          maxSelectedLabels=""

        />
        <hr class="border-grey-200" />
        <div class="flex items-end gap-2.5">
          <CustomSwitch
            v-model="status"
            :invalid="!!errors.status"
            :invalidMessage="errors.status"
            label="Status"
          />
          <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
        </div>
      </form>
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
          />
          <CustomButton label="Simpan" @click="onSubmit" />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
