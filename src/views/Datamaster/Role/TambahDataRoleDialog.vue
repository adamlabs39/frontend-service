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
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";

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
  { name_mainMenu: "dashboard" },
  { name_mainMenu: "pasien" },
  { name_mainMenu: "setting" },
  { name_mainMenu: "profile" },
  { name_mainMenu: "datamaster" },
]);

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode harus diisi"),
    name: yup.string().required("Nama Role harus diisi"),
    permission: yup
      .array()
      .of(yup.string().required("Permission harus dipilih")),  // Validate that each permission is a string and required
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
const cobaPermission=ref([])
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
      <form class="grid grid-cols-12 gap-5 mt-5">
        <CustomTextfield
          label="Kode"
          v-model="code"
          placeholder="Kode Role"
          :invalid="!!errors.code"
          :invalidMessage="errors.code"
          class="col-span-5"
        />
        <CustomTextfield
          label="Nama Role"
          v-model="name"
          placeholder="Nama Role"
          class="col-span-7"
          :invalid="!!errors.name"
          :invalidMessage="errors.name"
        />
        <hr class="border-grey-200 col-span-12" />
        <CustomAccordion class="col-span-12" no-border initial-state="0" >
          <template #header>
            <div>Modul</div>
          </template>
          <template #content>
            <div class="flex flex-wrap gap-2.5 pt-5">
              <div
              v-for="item of itemsPermission"
              :key="item.name_mainMenu"
            >
              <CustomCheckbox
                :value="item.name_mainMenu"
                :title="item.name_mainMenu"
                v-model="cobaPermission"
                sub-title=""
                 :binary="false"
              />
            </div>
            </div>
          </template>
          <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
        </CustomAccordion>
        <hr class="border-grey-200 col-span-12" />
        <CustomSwitch
          v-model="status"
          :show-label="true"
          label="Status"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
          class="col-span-12"
        />
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
