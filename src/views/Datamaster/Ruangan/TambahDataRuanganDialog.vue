<script lang="ts" setup>
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";

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

const itemsRuangan = ref([
  { name: "Mawar", code: "MWR" },
  { name: "Melati", code: "MLT" },
  { name: "Anggrek", code: "AGR" },
  { name: "Dahlia", code: "DHL" },
]);

const itemsKategori = ref([
  { name: "Rawat Umum", code: "RU" },
  { name: "VVIP", code: "VVIP" },
  { name: "VIP", code: "VIP" },
]);

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode harus diisi"),
    name: yup.string(),
    kategoriRuangan: yup.string().required("Kategori ruangan harus dipilih"),
    no_room: yup.number().required("Nomor kamar harus diisi"),
    kelasRuangan: yup.string().required("Kelas ruangan harus dipilih"),
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
const [kategoriRuangan] = defineField("kategoriRuangan");
const [no_room] = defineField("no_room");
const [kelasRuangan] = defineField("kelasRuangan");
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
    <template #header>{{ title }} Ruangan</template>
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
            label="Nama Ruangan"
            v-model="name"
            placeholder="Nama Ruangan"
            class="col-span-8"
          />
          <CustomSelect
            label="Kategori Ruangan"
            v-model="kategoriRuangan"
            :options="itemsKategori"
            optionValue="code"
            optionLabel="name"
            placeholder="Kategori Ruangan"
            class="col-span-8"
            :invalid="!!errors.kategoriRuangan"
            :invalidMessage="errors.kategoriRuangan"
          />
          <CustomInputNumber
            label="Nomor Kamar"
            v-model="no_room"
            :invalid="!!errors.no_room"
            :invalidMessage="errors.no_room"
            class="col-span-4"

          />

        <CustomSelect
          label="Kelas Ruangan"
          v-model="kelasRuangan"
          :options="itemsRuangan"
          optionValue="code"
          optionLabel="name"
          placeholder="Kelas Ruangan"
          class="col-span-12"
          :invalid="!!errors.kelasRuangan"
          :invalidMessage="errors.kelasRuangan"
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
          />
          <CustomButton label="Simpan" @click="onSubmit" />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
