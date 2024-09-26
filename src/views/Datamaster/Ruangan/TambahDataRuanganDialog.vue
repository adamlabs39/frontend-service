<script lang="ts" setup>
import { ref, watch,onMounted } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useKategoriRuanganStore } from "@/stores/datamaster/kategoriRuangan";
import { useRuanganStore } from "@/stores/datamaster/ruangan";
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
  editData: {
    type: Object,
    default: () => ({}),
  },
});


const kategoriRuanganStore = useKategoriRuanganStore();
const ruanganStore = useRuanganStore();
const kategoriRuanganPayload = ref<any[]>([]); 

const fetchKategoriRuangan = async () => {
  try {
    const response = await kategoriRuanganStore.getApi();
    if (response && response.payload) {
      kategoriRuanganPayload.value = response.payload;
    } else {
      kategoriRuanganPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch kategori ruangan", error);
    kategoriRuanganPayload.value = [];
  }
};
onMounted(() => {
  fetchKategoriRuangan();
});
const opstionsKelas = ref([
  { label: "kelas 1", value: 1 },
  { label: "kelas 2", value: 2 },
  { label: "kelas 3", value: 3 },
  { label: "VIP", value: 4 },
  { label: "VVIP", value: 5 },
]);

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode harus diisi"),
    name: yup.string(),
    kategoriRuanganUuid: yup.string().required("Kategori ruangan harus dipilih"),
    noRoom: yup.number().required("Nomor kamar harus diisi"),
    kelasRuangan: yup.number().required("Kelas ruangan harus dipilih"),
    status: yup.bool(),
  })
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values: any) => {
  try {
    if (props.method === "edit") {
      if (!props.editData || !props.editData.uuid) {
        throw new Error("UUID is missing for edit operation");
      }

      const uuid = props.editData.uuid;
      console.log("Editing data with UUID:", uuid, "and values:", values);

      const response = await ruanganStore.putApi(uuid, values);
      console.log("Data updated successfully:", response);
    } else if (props.method === "add") {
      console.log("Adding new data with values:", values);

      const response = await ruanganStore.postApi(values);
      console.log("Data added successfully:", response);
      emit('data-updated');
    }
    closeDialog();
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
});

const [code] = defineField("code");
const [name] = defineField("name");
const [kategoriRuanganUuid] = defineField("kategoriRuanganUuid");
const [noRoom] = defineField("noRoom");
const [kelasRuangan] = defineField("kelasRuangan");
const [status] = defineField("status");

const emit = defineEmits(["update:isDialogVisible", "close","data-updated"]);

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
        kategoriRuanganUuid: props.editData.kategoriRuanganUuid
      });
    } else if (!newValue) {
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
      {{ props.editData }}

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
            v-model="kategoriRuanganUuid"
            :options="kategoriRuanganPayload"
            optionValue="uuid"
            optionLabel="name"
            placeholder="Kategori Ruangan"
            class="col-span-8"
            :invalid="!!errors.kategoriRuanganUuid"
            :invalidMessage="errors.kategoriRuanganUuid"
          />
          <CustomInputNumber
            label="Nomor Kamar"
            v-model="noRoom"
            :invalid="!!errors.noRoom"
            :invalidMessage="errors.noRoom"
            class="col-span-4"

          />
        <CustomSelect
          label="Kelas Ruangan"
          v-model="kelasRuangan"
          :options="opstionsKelas"
          optionValue="value"
          optionLabel="label"
          placeholder="Kelas Ruangan"
          class="col-span-12"
          :invalid="!!errors.kelasRuangan"
          :invalidMessage="errors.kelasRuangan"
        />

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
