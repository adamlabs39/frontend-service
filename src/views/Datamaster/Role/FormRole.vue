<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { usePermissionStore } from "@/stores/datamaster/permission";
import { useRoleStore } from "@/stores/datamaster/role";
import * as yup from "yup";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const permissionsStore = usePermissionStore();
const roleStore = useRoleStore();
// Props definition
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

// Form validation schema
const schema = toTypedSchema(
  yup
    .object({
      code: yup.string().required("Kode Role harus diisi"),
      name: yup.string().required("Nama Role harus diisi"),
      status: yup.boolean().default(false),
    })
    .noUnknown()
);

const initialPermissionsState = ref(
  permissionsStore.permissionsItem.map((item) => ({
    module: item.module,
    checked: false,
    sub_modules: item.sub_modules.map((subItem) => ({
      name: subItem.name,
      checked: false,
      features: subItem.features
        ? subItem.features.map((featureItem) => ({
            name: featureItem.name,
            checked: false,
            allows: featureItem.allows.map((allow) => ({
              name: allow,
              checked: false,
            })),
          }))
        : [],
      allows: subItem.allows
        ? subItem.allows.map((allow) => ({
            name: allow,
            checked: false,
          }))
        : [],
    })),
  }))
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

// Emits
const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

// Form fields
const [code] = defineField("code");
const [name] = defineField("name");
const [status] = defineField("status");

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  const permissions = initialPermissionsState.value
    .filter((module) => module.checked)
    .map((module) => ({
      module: module.module,
      sub_modules: module.sub_modules
        .filter((subModule) => subModule.checked)
        .map((subModule) => ({
          name: subModule.name,
          features: subModule.features
            ? subModule.features
                .filter((feature) => feature.checked)
                .map((feature) => ({
                  name: feature.name,
                  allows: feature.allows
                    .filter((allow) => allow.checked)
                    .map((allow) => allow.name),
                }))
            : [],
          allows: subModule.allows
            ? subModule.allows
                .filter((allow) => allow.checked)
                .map((allow) => allow.name)
            : [],
        })),
    }));

  const allData = {
    ...values,
    permissions,
  };

  console.log("Adding new data with values:", allData);
  try {
    if (method.value === "edit") {
      if (!props.payload || !props.payload.uuid) {
        throw new Error("UUID is missing for edit operation");
      }
      const uuid = props.payload.uuid;
      const response = await roleStore.putApi(uuid, allData);
      console.log("Data updated successfully:", response);
      emit("data-updated");
    } else if (method.value === "add") {
      console.log("Adding new data with values:", allData);
      const response = await roleStore.postApi(allData);
      console.log("Adding response:", response);

      emit("data-updated");
    }
    closeDialog();
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
});

// Update checked status
const updateCheckedStatus = (
  moduleIndex: any,
  subModuleIndex: any,
  featureIndex: any,
  allowIndex: any,
  checked: any
) => {
  if (
    typeof moduleIndex !== "undefined" &&
    typeof subModuleIndex === "undefined"
  ) {
    // Update entire module
    const module = initialPermissionsState.value[moduleIndex];
    module.checked = checked;
    module.sub_modules.forEach((subModule) => {
      subModule.checked = checked;
      subModule.features.forEach((feature) => {
        feature.checked = checked;
        feature.allows.forEach((allow) => {
          allow.checked = checked;
        });
      });
      subModule.allows.forEach((allow) => {
        allow.checked = checked;
      });
    });
  } else if (
    typeof subModuleIndex !== "undefined" &&
    typeof featureIndex === "undefined"
  ) {
    // Update specific sub-module
    const subModule =
      initialPermissionsState.value[moduleIndex].sub_modules[subModuleIndex];
    subModule.checked = checked;
    subModule.features.forEach((feature) => {
      feature.checked = checked;
      feature.allows.forEach((allow) => {
        allow.checked = checked;
      });
    });
    subModule.allows.forEach((allow) => {
      allow.checked = checked;
    });
  } else if (
    typeof featureIndex !== "undefined" &&
    typeof allowIndex === "undefined"
  ) {
    const feature =
      initialPermissionsState.value[moduleIndex].sub_modules[subModuleIndex]
        .features[featureIndex];
    feature.checked = checked;
    feature.allows.forEach((allow) => {
      allow.checked = checked;
    });
  } else if (typeof allowIndex !== "undefined") {
    const allow =
      initialPermissionsState.value[moduleIndex].sub_modules[subModuleIndex]
        .features[featureIndex].allows[allowIndex];
    allow.checked = checked;
  }
};

// Watch for changes
initialPermissionsState.value.forEach((module, moduleIndex) => {
  watch(
    () => module.checked,
    (newChecked) => {
      updateCheckedStatus(
        moduleIndex,
        undefined,
        undefined,
        undefined,
        newChecked
      );
    }
  );

  module.sub_modules.forEach((subModule, subModuleIndex) => {
    watch(
      () => subModule.checked,
      (newChecked) => {
        updateCheckedStatus(
          moduleIndex,
          subModuleIndex,
          undefined,
          undefined,
          newChecked
        );
      }
    );

    subModule.features.forEach((feature, featureIndex) => {
      watch(
        () => feature.checked,
        (newChecked) => {
          updateCheckedStatus(
            moduleIndex,
            subModuleIndex,
            featureIndex,
            undefined,
            newChecked
          );
        }
      );

      feature.allows.forEach((allow, allowIndex) => {
        watch(
          () => allow.checked,
          (newChecked) => {
            updateCheckedStatus(
              moduleIndex,
              subModuleIndex,
              featureIndex,
              allowIndex,
              newChecked
            );
          }
        );
      });
    });

    subModule.allows.forEach((allow, allowIndex) => {
      watch(
        () => allow.checked,
        (newChecked) => {
          updateCheckedStatus(
            moduleIndex,
            subModuleIndex,
            undefined,
            allowIndex,
            newChecked
          );
        }
      );
    });
  });
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

const resetCheckBox = () => {
  initialPermissionsState.value.forEach((module) => {
    module.checked = false;
    module.sub_modules.forEach((subModule) => {
      subModule.checked = false;
      subModule.features.forEach((feature) => {
        feature.checked = false;
        feature.allows.forEach((allow) => {
          allow.checked = false;
        });
      });
      subModule.allows.forEach((allow) => {
        allow.checked = false;
      });
    });
  });
};

// Close dialog
const closeDialog = () => {
  emit("update:isDialogVisible", false);
  resetDialogMode();
  resetForm();
  resetCheckBox();
};

// Watch for dialog visibility changes
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
      resetCheckBox();
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
      <div v-if="method !== 'detail'" class="grid grid-cols-12 gap-5 mt-5">
        <CustomTextfield
          label="Kode"
          v-model="code"
          placeholder="Kode Role"
          :invalid="!!errors.code"
          :invalidMessage="errors.code"
          :required="errors.code ? true : false"
          class="col-span-5"
        />
        <CustomTextfield
          label="Nama Role"
          v-model="name"
          placeholder="Nama Role"
          class="col-span-7"
          :invalid="!!errors.name"
          :invalidMessage="errors.name"
          :required="errors.name ? true : false"
        />
        <hr class="col-span-12 border-grey-200" />
        <CustomAccordion class="col-span-12" no-border initial-state="0">
          <template #header>
            <div class="-mx-4 text-normal">Modul</div>
          </template>
          <template #content>
            <div class="flex flex-wrap gap-2.5 pt-5">
              <div
                v-for="menuItem in initialPermissionsState"
                :key="menuItem.module"
              >
                <CustomCheckbox
                  v-model="menuItem.checked"
                  :title="menuItem.module"
                  subTitle=""
                  :value="menuItem.module"
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
        <CustomInfoRow label="Modul">
          <template #value>
            <div
              v-if="payload.permissions && payload.permissions.length"
              class="flex flex-wrap w-full h-full gap-1"
            >
              <CustomChip
                v-for="permission in payload.permissions"
                :label="permission.module"
                textColor="text-white"
                bgColor="bg-adameds-300"
                borderColor="border-none"
                :showCheckedIcon="false"
                customClass="text-xs font-semibold h-5 flex w-fit"
              />
            </div>
            <div v-else>-</div>
          </template>
        </CustomInfoRow>
        <hr class="col-span-12 border-grey-200" />
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
