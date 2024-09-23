<script setup lang="ts">
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  method: {
    type: String,
    default: "detail",
  },
  payload: {
    type: Object,
    default: () => ({}),
  },
});

const schema = toTypedSchema(
  yup.object({
    system: yup.string().required("Referensi Sistem harus diisi"),
    code: yup.string().required("Kode SATUSEHAT harus diisi"),
    display: yup.string().required("Display SATUSEHAT harus diisi"),
    name: yup.string().required("Nama Kategori harus diisi"),
    status: yup.bool().default(false),
  })
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [system] = defineField("system");
const [code] = defineField("code");
const [display] = defineField("display");
const [name] = defineField("name");
const [status] = defineField("status");

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

const method = ref(props.method);
const title = ref(props.title);

const onSubmit = handleSubmit((values: any) => {
  if (method.value === "edit") {
    // Logic to save edited data
    console.log("Editing data:", values);
    emit("data-updated", values);
  } else if (method.value === "add") {
    // Logic to add new data
    console.log("Adding new data:", values);
    emit("data-updated", values);
  }
  closeDialog();
});

const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};

const resetDialogMode = () => {
  method.value = props.method;
  title.value = props.title;
};

const closeDialog = () => {
  emit("close");
  resetDialogMode();
};

watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (newValue) {
      // Dialog is opened
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

const handleEdit = () => {
  method.value = "edit";
  title.value = "Edit Data";
};
</script>

<template>
  <CustomDialog
    width="600px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Oklusi</template>
    <template #body>
      <div v-if="method !== 'detail'" class="grid grid-cols-2 gap-5 mt-5">
        <!-- Keadaan Gigi Input -->
        <CustomTextfield
          v-model="system"
          label="Referensi Sistem SATUSEHAT"
          placeholder="Masukkan Referensi Sistem SATUSEHAT"
          :invalid="!!errors.system"
          :invalidMessage="errors.system"
        />
        <CustomTextfield
          v-model="code"
          label="Code SATUSEHAT"
          placeholder="Masukkan Code SATUSEHAT"
          :invalid="!!errors.code"
          :invalidMessage="errors.code"
        />
        <CustomTextfield
          v-model="display"
          label="Display SATUSEHAT"
          placeholder="Masukkan Display SATUSEHAT"
          :invalid="!!errors.display"
          :invalidMessage="errors.display"
        />
        <CustomTextfield
          v-model="name"
          label="Oklusi"
          placeholder="Oklusi"
          :invalid="!!errors.name"
          :invalidMessage="errors.name"
        />
        <!-- Divider -->
        <hr class="col-span-2 border-gray-200" />
        <!-- Status Switch -->
        <CustomSwitch
          v-model="status"
          :show-label="true"
          label="Status"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
          class="col-span-2"
        />
      </div>
      <div v-else class="flex flex-col gap-5 mt-5">
        <CustomInfoRow label="Referensi Sistem SATUSEHAT" :value="system" />
        <CustomInfoRow label="Code SATUSEHAT" :value="code" />
        <CustomInfoRow label="Display SATUSEHAT" :value="display" />
        <CustomInfoRow label="Oklusi" :value="name" />
        <CustomInfoRow label="Status">
            <template #value>
                <CustomChip :label="status" bg-color="bg-adameds-300" text-color="text-white" icon-color="" border-color="border-adameds-300" />
              </template>
        </CustomInfoRow>
        
      </div>
    </template>

    <!-- Footer Section for Reset and Save Buttons -->
    <template #footer>
      <div class="flex justify-end space-x-3">
        <CustomButton
          v-if="method !== 'detail'"
          border-color="border-grey-200"
          text-color="text-grey-300"
          background-color="bg-transparent"
          label="Reset"
          @click="resetForm()"
        ></CustomButton>
        <CustomButton
          v-if="method !== 'detail'"
          label="Simpan"
          @click="onSubmit"
        ></CustomButton>
        <CustomButton
          v-if="method === 'detail'"
          label="Edit"
          @click="handleEdit"
        ></CustomButton>
      </div>
    </template>
  </CustomDialog>
</template>
