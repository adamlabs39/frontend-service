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
import { useRoleStore } from "@/stores/datamaster/role";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

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
  payload: {
    type: Object,
    default: () => ({}),
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
      .of(yup.string().required("Permission harus dipilih")), // Validate that each permission is a string and required
    status: yup.bool(),
  })
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

const roleStore = useRoleStore();

const [code] = defineField("code");
const [name] = defineField("name");
const [permission] = defineField("permission");
const [status] = defineField("status");

const onSubmit = handleSubmit(async (values: any) => {
  try {
    if (method.value === "edit") {
      if (!props.payload || !props.payload.uuid) {
        throw new Error("UUID is missing for edit operation");
      }
      const uuid = props.payload.uuid;
      const response = await roleStore.putApi(uuid, values);
      console.log("Data updated successfully:", response);
      emit("data-updated");
    } else if (method.value === "add") {
      console.log("Adding new data with values:", values);
      const response = await roleStore.postApi(values);
      emit("data-updated");
    }
    closeDialog();
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
});

const method = ref(props.method);
const title = ref(props.title);

const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};

const resetDialogMode = () => {
  method.value = props.method;
  title.value = props.title;
};

const handleEdit = () => {
  method.value = "edit";
  title.value = "Edit Data";
};

const closeDialog = () => {
  emit("update:isDialogVisible", false);
  resetDialogMode();
  resetForm();
};

watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (newValue) {
      resetDialogMode();
      if (props.method !== "add" && props.payload) {
        setValues({
          ...props.payload,
        });
      }
    } else {
      resetForm();
      resetDialogMode();
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
    <template #header>{{ title }} Role</template>
    <template #body>
      <!-- Form Input -->
      <div class="grid grid-cols-12 gap-5 mt-5">
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
        <hr class="col-span-12 border-grey-200" />
        <CustomAccordion class="col-span-12" no-border initial-state="0">
          <template #header>
            <div class="-mx-4 text-normal">Modul</div>
          </template>
          <template #content>
            <div class="flex flex-wrap gap-2.5 pt-5 -mx-4">
              <div v-for="item of itemsPermission" :key="item.name_mainMenu">
                <CustomCheckbox
                  :value="item.name_mainMenu"
                  :title="item.name_mainMenu"
                  v-model="permission"
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
              class="-mr-5"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-transparent"
              textColor="text-adameds-300"
              class="-mr-5"
            />
          </template>
        </CustomAccordion>
        <hr class="col-span-12 border-grey-200" />
        <CustomSwitch
          v-model="status"
          :show-label="true"
          label="Status"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
          class="col-span-12"
        />
      </div>
      <!-- Detail Data -->
      <div v-if="method === 'detail'" class="flex flex-col gap-5 mt-5">
        <CustomInfoRow label="Kode Role" :value="code" />
        <CustomInfoRow label="Nama Role" :value="name" />
        <CustomInfoRow label="Status">
          <template #value>
            <CustomChip
              :label="status ? 'AKTIF' : 'NON-AKTIF'"
              :textColor="status ? 'text-white' : 'text-[#80868d]'"
              :bgColor="status ? 'bg-adameds-300' : 'bg-white'"
              :borderColor="status ? 'border-none' : 'border-[#80868d]'"
              :icon-color="status ? 'white' : '#80868d'"
              customClass="text-xs font-semibold h-5 flex w-fit"
            />
          </template>
        </CustomInfoRow>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton
            v-if="method !== 'detail'"
            label="Batal"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
            @click="closeDialog"
          />
          <CustomButton
            v-if="method !== 'detail'"
            label="Simpan"
            @click="onSubmit"
          />
          <CustomButton
            v-if="method === 'detail'"
            label="Edit"
            @click="handleEdit"
          />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
