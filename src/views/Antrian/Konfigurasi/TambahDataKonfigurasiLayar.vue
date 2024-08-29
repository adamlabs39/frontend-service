<script lang="ts" setup>
import { ref, computed } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomUpload from "@/components/Base/CustomUpload.vue";

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

const itemsLayar = ref([
  { name: "Layar 3 x 3 Panggilan", code: "L-1" },
  { name: "Layar 3 x 2 Panggilan", code: "L-2" },
  { name: "Layar 3 List & 3 Panggilan", code: "L-3" },
  { name: "Layar 2 List & 2 Panggilan", code: "L-4" },
  { name: "Layar 1 List, 1 Panggilan, 1 Gambar", code: "L-5" },
]);

const itemsPoli = ref([
  { name: "Poli Umum", code: "POLI-U" },
  { name: "Poli Anak", code: "POLI-A" },
  { name: "Poli Mata", code: "POLI-M" },
  { name: "Poli Kandungan", code: "POLI-K" },
  { name: "Poli Dalam", code: "POLI-D" },
]);

const itemsFlash = ref([
  { name: "Flash Text 1", code: "FT-1" },
  { name: "Flash Text 2", code: "FT-2" },
  { name: "Flash Text 3", code: "FT-3" },
]);

const defaultValues = {
  poliModel: undefined,
  flashModel: undefined,
  admisiStatus: false,
  poliStatus: false,
  farmasiStatus: false,
  status: false,
  textFieldLayar: undefined,
  textFieldValue: "Klinik Adameds",
};

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode harus diisi"),
    name: yup.string().required("Nama tindakan harus diisi"),
    layarModel: yup.string(),
    poliModel: yup.string(),
    flashModel: yup.string(),
    admisiStatus: yup.bool(),
    poliStatus: yup.bool(),
    farmasiStatus: yup.bool(),
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
const [layarModel] = defineField("layarModel");
const [poliModel] = defineField("poliModel");
const [flashModel] = defineField("flashModel");

const admisiStatus = ref(defaultValues.admisiStatus);
const poliStatus = ref(defaultValues.poliStatus);
const farmasiStatus = ref(defaultValues.farmasiStatus);
const status = ref(defaultValues.status);
const textFieldValue = ref(defaultValues.textFieldValue);
const textFieldLayar = ref(defaultValues.textFieldLayar);

const emit = defineEmits(["update:isDialogVisible", "close"]);

function updateVisibility(value: any) {
  emit("update:isDialogVisible", value);
}

function closeDialog() {
  emit("close");
}

const layarTitle = computed(() => {
  const selectedLayar = itemsLayar.value.find(
    (item) => item.code === layarModel.value
  );
  return selectedLayar ? selectedLayar.name : "Layar Antrian";
});

function handleReset() {
  const currentLayarModel = layarModel.value;

  resetForm();
  poliModel.value = defaultValues.poliModel;
  flashModel.value = defaultValues.flashModel;
  admisiStatus.value = defaultValues.admisiStatus;
  poliStatus.value = defaultValues.poliStatus;
  farmasiStatus.value = defaultValues.farmasiStatus;
  status.value = defaultValues.status;
  textFieldValue.value = defaultValues.textFieldValue;
  textFieldLayar.value = defaultValues.textFieldLayar;
  layarModel.value = currentLayarModel;
}
</script>

<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Layar Antrian</template>
    <template #body>
      <div class="flex flex-col gap-5 mt-5">
        <div class="flex gap-2.5 w-full">
          <CustomTextfield
            label="Nama Layar"
            placeholder="Nama Layar"
            v-model="textFieldLayar"
            optionValue="code"
            optionLabel="name"
            class="w-1/2 mr-5 text-black"
          />
          <CustomSelect
            label="Tipe Layar"
            place-holder="Pilih Tipe Layar"
            v-model="layarModel"
            :options="itemsLayar"
            optionValue="code"
            optionLabel="name"
            class="w-1/2 text-black"
          />
        </div>

        <!-- Conditional rendering based on layarModel -->
        <div
          v-if="layarModel === 'L-1' || layarModel === 'L-2'"
          class="grid grid-cols-3 gap-x-4 gap-y-6"
        >
          <div class="col-span-1">
            <div class="text-xl font-bold text-black">
              {{ layarTitle }}
            </div>
            <hr class="mt-4" />
            <CustomTextfield
              label="Teks Judul"
              placeholder="Teks Judul"
              optionValue="code"
              optionLabel="name"
              class="w-full mt-4 mr-5 text-black"
              v-model="textFieldValue"
            />
            <div class="flex items-end gap-2.5 text-black mt-4">
              <CustomSwitch v-model="admisiStatus" label="Admisi" />
              <div>{{ admisiStatus ? "Aktif" : "Non-Aktif" }}</div>
            </div>
            <div class="flex items-end gap-2.5 text-black mt-4">
              <CustomSwitch v-model="poliStatus" label="Poli" />
              <div>{{ poliStatus ? "Aktif" : "Non-Aktif" }}</div>
            </div>
            <CustomSelect
              label="Pilih Poli"
              place-holder="Pilih Poli"
              v-model="poliModel"
              :options="itemsPoli"
              optionValue="code"
              optionLabel="name"
              class="w-full mt-4 mr-5 text-black"
            />
            <div class="flex items-end gap-2.5 text-black mt-4">
              <CustomSwitch v-model="farmasiStatus" label="Farmasi" />
              <div>{{ farmasiStatus ? "Aktif" : "Non-Aktif" }}</div>
            </div>
            <CustomSelect
              label="Flash Text"
              place-holder="Flash Text"
              v-model="flashModel"
              :options="itemsFlash"
              optionValue="code"
              optionLabel="name"
              class="w-full mt-4 mr-5 text-black"
            />
          </div>
          <div class="col-span-2">
            <div class="text-xl font-bold text-black">Preview Layar</div>
            <hr class="mt-4" />
          </div>
        </div>

        <div
          v-if="
            layarModel === 'L-3' || layarModel === 'L-4' || layarModel === 'L-5'
          "
          class="grid grid-cols-3 gap-x-4 gap-y-6"
        >
          <div class="col-span-1">
            <div class="text-xl font-bold text-black">
              {{ layarTitle }}
            </div>
            <hr class="mt-4" />
            <CustomTextfield
              label="Teks Judul"
              placeholder="Teks Judul"
              optionValue="code"
              optionLabel="name"
              class="w-full mt-4 mr-5 text-black"
              v-model="textFieldValue"
            />
            <CustomSelect
              label="Lokasi Pelayanan & Panggilan 1"
              place-holder="Pilih Lokasi Pelayanan & Panggilan 1"
              optionValue="code"
              optionLabel="name"
              class="w-full mt-4 mr-5 text-black"
            />
            <CustomSelect
              v-if="layarModel === 'L-3' || layarModel === 'L-4'"
              label="Lokasi Pelayanan & Panggilan 2"
              place-holder="Pilih Lokasi Pelayanan & Panggilan 2"
              optionValue="code"
              optionLabel="name"
              class="w-full mt-4 mr-5 text-black"
            />
            <CustomSelect
              v-if="layarModel === 'L-3'"
              label="Lokasi Pelayanan & Panggilan 3"
              place-holder="Pilih Lokasi Pelayanan & Panggilan 3"
              optionValue="code"
              optionLabel="name"
              class="w-full mt-4 mr-5 text-black"
            />
            <CustomUpload
              v-if="layarModel === 'L-5'"
              label="Gambar"
              place-holder="File JPG / PNG"
              optionValue="code"
              optionLabel="name"
              class="w-full mt-4 mr-5 text-black"
            />
            <CustomSelect
              label="Flash Text"
              place-holder="Flash Text"
              v-model="flashModel"
              :options="itemsFlash"
              optionValue="code"
              optionLabel="name"
              class="w-full mt-4 mr-5 text-black"
            />
          </div>
          <div class="col-span-2">
            <div class="text-xl font-bold text-black">Preview Layar</div>
            <hr class="mt-4" />
          </div>
        </div>

        <hr />
        <div
          v-if="
            layarModel === 'L-1' ||
            layarModel === 'L-2' ||
            layarModel === 'L-3' ||
            layarModel === 'L-4' ||
            layarModel === 'L-5'
          "
          class="flex items-end gap-2.5 text-black"
        >
          <CustomSwitch v-model="status" label="Status" />
          <div>{{ status ? "Aktif" : "Non-Aktif" }}</div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <hr class="-mx-5 border-grey-200" />
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton
            label="Reset"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
            @click="handleReset"
          >
          </CustomButton>
          <CustomButton label="Simpan" @click="onSubmit"> </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
