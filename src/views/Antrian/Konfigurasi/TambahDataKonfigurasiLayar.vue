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
// import CustomUpload from "@/components/Base/CustomUpload.vue";
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

const itemsAdmisi = ref([
  { name: "Admisi IGD", code: "ADM-IGD" },
  { name: "Admisi Rawat Jalan", code: "ADM-RJ" },
  { name: "Admisi Rawat Inap", code: "ADM-RI" },
]);

const itemsFarmasi = ref([
  { name: "Farmasi Umum", code: "FARM-UMUM" },
  { name: "Farmasi Rawat Jalan", code: "FARM-RJ" },
  { name: "Farmasi Rawat Inap", code: "FARM-RI" },
]);

const itemsFlash = ref([
  { name: "Flash Text 1", code: "FT-1" },
  { name: "Flash Text 2", code: "FT-2" },
  { name: "Flash Text 3", code: "FT-3" },
]);

const defaultValues = {
  poliModel: [],
  flashModel: [],
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
    poliModel: yup.array().required(),
    flashModel: yup.array().required(),
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
            class="mr-5 w-1/2 text-black"
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
              class="mt-4 mr-5 w-full text-black"
              v-model="textFieldValue"
            />
            <div class="flex gap-2.5 items-end mt-4 text-black">
              <CustomSwitch
                v-model="admisiStatus"
                label="Admisi"
                sideLabel="Non-Aktif"
                sideLabelTrue="Aktif"
              />
            </div>
            <CustomMultiSelect
              label="Pilih Admisi"
              placeholder="Pilih Admisi"
              v-model="poliModel"
              :options="itemsAdmisi"
              optionValue="name"
              optionLabel="name"
              class="mt-4 mr-5 w-full text-black multiselect-wrap"
              v-show="admisiStatus"
            />
            <div class="flex gap-2.5 items-end mt-4 text-black">
              <CustomSwitch
                v-model="poliStatus"
                label="Poli"
                sideLabel="Non-Aktif"
                sideLabelTrue="Aktif"
              />
            </div>
            <CustomMultiSelect
              label="Pilih Poli"
              placeholder="Pilih Poli"
              v-model="poliModel"
              :options="itemsPoli"
              optionValue="name"
              optionLabel="name"
              class="mt-4 mr-5 w-full text-black multiselect-wrap"
              v-show="poliStatus"
            />
            <div class="flex gap-2.5 items-end mt-4 text-black">
              <CustomSwitch
                v-model="farmasiStatus"
                label="Farmasi"
                sideLabel="Non-Aktif"
                sideLabelTrue="Aktif"
              />
            </div>
            <CustomMultiSelect
              label="Pilih Farmasi"
              placeholder="Pilih Farmasi"
              v-model="poliModel"
              :options="itemsFarmasi"
              optionValue="name"
              optionLabel="name"
              class="mt-4 mr-5 w-full text-black multiselect-wrap"
              v-show="farmasiStatus"
            />
            <CustomMultiSelect
              label="Flash Text"
              placeholder="Flash Text"
              v-model="flashModel"
              :options="itemsFlash"
              optionValue="name"
              optionLabel="name"
              class="mt-4 mr-5 w-full text-black"
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
              class="mt-4 mr-5 w-full text-black"
              v-model="textFieldValue"
            />
            <CustomSelect
              label="Lokasi Pelayanan & Panggilan 1"
              place-holder="Pilih Lokasi Pelayanan & Panggilan 1"
              optionValue="code"
              optionLabel="name"
              class="mt-4 mr-5 w-full text-black"
            />
            <CustomSelect
              v-if="layarModel === 'L-3' || layarModel === 'L-4'"
              label="Lokasi Pelayanan & Panggilan 2"
              place-holder="Pilih Lokasi Pelayanan & Panggilan 2"
              optionValue="code"
              optionLabel="name"
              class="mt-4 mr-5 w-full text-black"
            />
            <CustomSelect
              v-if="layarModel === 'L-3'"
              label="Lokasi Pelayanan & Panggilan 3"
              place-holder="Pilih Lokasi Pelayanan & Panggilan 3"
              optionValue="code"
              optionLabel="name"
              class="mt-4 mr-5 w-full text-black"
            />
            123
            <!-- <CustomUpload
              v-if="layarModel === 'L-5'"
              label="Gambar"
              place-holder="File JPG / PNG"
              optionValue="code"
              optionLabel="name"
              class="mt-4 mr-5 w-full text-black"
            /> -->
            <CustomMultiSelect
              label="Flash Text"
              placeholder="Flash Text"
              v-model="flashModel"
              :options="itemsFlash"
              optionValue="name"
              optionLabel="name"
              class="mt-4 mr-5 w-full text-black"
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
          class="flex gap-2.5 items-end text-black"
        >
          <CustomSwitch
            v-model="status"
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
        <div class="flex gap-2.5 justify-end mt-5">
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

<style scoped>
.multiselect-wrap :deep(.p-multiselect-label-container) {
  @apply flex-wrap content-start min-h-10 h-auto px-2 py-1;
}

.multiselect-wrap :deep(.p-multiselect-chip) {
  @apply mb-1 mr-1;
}

.multiselect-wrap :deep(.p-multiselect) {
  @apply h-auto min-h-10;
}

.multiselect-wrap :deep(.p-multiselect .p-multiselect-label) {
  @apply flex flex-wrap items-start py-1 min-h-6 h-auto;
}

.multiselect-wrap :deep(.p-multiselect-token) {
  @apply mb-1 mr-1;
}
</style>
