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
const itemsTipe = ref([
  { name: "Tipe1", code: "1" },
  { name: "Tipe2", code: "2" },
  { name: "Tipe3", code: "3" },
  { name: "Tipe4", code: "4" },
]);

const itemsKelas = ref([
  { name: "Kelas1", code: "1" },
  { name: "Kelas2", code: "2" },
  { name: "Kelas3", code: "3" },
]);
const itemsPartOf = ref([
  { name: "Part1", code: "1" },
  { name: "Part2", code: "2" },
  { name: "Part3", code: "3" },
]);
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode harus diisi"),
    name: yup.string().required("Nama lokasi harus diisi"),
    description: yup.string().required("Deskripsi harus diisi"),
    phone: yup
      .string()
      .required("No. Telepon harus diisi")
      .matches(phoneRegExp, "Format tidak sesuai"),
    email: yup
      .string()
      .required("Email harus diisi")
      .email("Format email tidak sesuai"),
    url: yup.string(),
    location_type: yup.string().required("Tipe harus diisi"),
    class_name: yup.string(),
    part_of: yup.string(),
    status_operasional: yup.bool(),
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
const [description] = defineField("description");
const [phone] = defineField("phone");
const [email] = defineField("email");
const [url] = defineField("url");
const [location_type] = defineField("location_type");
const [class_name] = defineField("class_name");
const [part_of] = defineField("part_of");
const [status_operasional] = defineField("status_operasional");
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
    <template #header>{{ title }} Lokasi</template>
    <template #body>
      <div class="flex flex-col gap-5 mt-5">
        <div class="flex gap-2.5">
          <CustomTextfield
            label="Kode Lokasi"
            v-model="code"
            placeholder="Kode Lokasi"
            :invalid="!!errors.code"
            :invalidMessage="errors.code"
          />
          <CustomTextfield
            label="Nama Lokasi"
            v-model="name"
            placeholder="Nama Lokasi"
            class="grow"
            :invalid="!!errors.name"
            :invalidMessage="errors.name"
          />
        </div>
        <CustomTextfield
          v-model="description"
          label="Deskripsi"
          placeholder="Deskripsi"
          :invalid="!!errors.description"
          :invalidMessage="errors.description"
        />
        <div class="flex gap-2.5 justify-between">
          <CustomTextfield
            label="No. Telepon"
            v-model="phone"
            placeholder="08xx-xxxx-xxxx"
            class="w-full"
            :invalid="!!errors.phone"
            :invalidMessage="errors.phone"
          />
          <CustomTextfield
            v-model="email"
            label="Email"
            placeholder="Email"
            class="w-full"
            :invalid="!!errors.email"
            :invalidMessage="errors.email"
          />
        </div>
        <div class="flex gap-2.5 justify-between">
          <CustomTextfield
            label="URL Website"
            v-model="url"
            placeholder="URL Website"
            class="w-full"
          />
          <CustomSelect
            label="Tipe"
            v-model="location_type"
            place-holder="Pilih Tipe"
            class="w-full"
            :options="itemsTipe"
            optionValue="code"
            optionLabel="name"
          />
        </div>
        <div class="flex gap-2.5 justify-between">
          <CustomSelect
            label="Kelas"
            v-model="class_name"
            place-holder="Pilih Kelas"
            class="w-full"
            :options="itemsKelas"
            optionValue="code"
            optionLabel="name"
          />
          <CustomSelect
            label="Part Of"
            v-model="part_of"
            place-holder="Pilih Part Of"
            class="w-full"
            :options="itemsPartOf"
            optionValue="code"
            optionLabel="name"
          />
        </div>
        <hr />
        <div class="flex gap-2.5">
          <CustomSwitch
          v-model="status_operasional"
          :show-label="true"
          label="Status Operasional"
          sideLabel="Non-Occupied"
          sideLabelTrue="Occupied"
        />
        <CustomSwitch
          v-model="status_operasional"
          :show-label="true"
          label="Status"
          sideLabel="Non-Aktif"
          sideLabelTrue="Aktif"
        />
        </div>
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
