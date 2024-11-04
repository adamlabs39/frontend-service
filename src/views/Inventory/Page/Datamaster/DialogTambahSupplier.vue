<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { computed, ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useDistrictStore } from "@/stores/datamaster/district";
import { onMounted } from "vue";

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});

const dialogTambahSupplier = ref({
  isVisible: false,
  title: "Tambah Data Supplier",
});
const emit = defineEmits(["update:isDialogVisible", "submitSupplierData"]);

function updateVisibility(value: boolean) {
  emit("update:isDialogVisible", value);
}

const schema = computed(() =>
  toTypedSchema(
    yup.object({
      code: yup.string().required("Code Harus Diisi"),
      name: yup.string().required("Nama Haruus Diisi"),
      selectedProvinceId: yup.string().notRequired(),
      selectedRegencyId: yup.string().notRequired(),
      selectedDistrictId: yup.string().notRequired(),
      alamat: yup.string().required("Alamat Harus Diisi"),
      noTelpon: yup.string().required("Phone Harus Diisi"),
      kategoriItemSelected: yup
        .array()
        .of(yup.string().required("Poli harus dipilih"))
        .min(1, "Harus dipilih")
        .required("Unit Pelayanan harus dipilih"),
      status: yup.bool(),
    })
  )
);
const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    code: "",
    name: "",
    selectedProvinceId: "",
    selectedRegencyId: "",
    selectedDistrictId: "",
    alamat: "",
    noTelpon: "",
    status: false,
  },
});
const [code] = defineField("code");
const [name] = defineField("name");
const [selectedProvinceId] = defineField("selectedProvinceId");
const [selectedRegencyId] = defineField("selectedRegencyId");
const [selectedDistrictId] = defineField("selectedDistrictId");
const [alamat] = defineField("alamat");
const [noTelpon] = defineField("noTelpon");
const [kategoriItemSelected] = defineField("kategoriItemSelected");
const [status] = defineField("status");

const districtStore = useDistrictStore();

const provinsiPayload = ref<any[]>([]);
const kabupatenPayload = ref<any[]>([]);
const kecamatanPayload = ref<any[]>([]);
const kelurahanPayload = ref<any[]>([]);

const kategoriItem = ref([
  { id: 1, name: "Medis" },
  { id: 2, name: "Non-Medis" },
]);

// Fetch Provinsi
const fetchProvinsi = async () => {
  try {
    const response = await districtStore.getProvinsiApi(); // Ambil data provinsi
    if (response && response.payload) {
      provinsiPayload.value = response.payload;
    } else {
      provinsiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch provinsi", error);
    provinsiPayload.value = [];
  }
};

// Fetch Kabupaten berdasarkan Provinsi terpilih
const fetchKabupaten = async (provinsiId: string) => {
  try {
    const response = await districtStore.getKabupatenApi(provinsiId); // Berikan ID provinsi sebagai parameter
    if (response && response.payload) {
      kabupatenPayload.value = response.payload;
    } else {
      kabupatenPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch kabupaten", error);
    kabupatenPayload.value = [];
  }
};

// Fetch Kecamatan berdasarkan Kabupaten terpilih
const fetchKecamatan = async (kabupatenId: string) => {
  try {
    const response = await districtStore.getKecamatanApi(kabupatenId); // Berikan ID kabupaten sebagai parameter
    if (response && response.payload) {
      kecamatanPayload.value = response.payload;
    } else {
      kecamatanPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch kecamatan", error);
    kecamatanPayload.value = [];
  }
};

// Fetch Kelurahan berdasarkan Kecamatan terpilih
const fetchKelurahan = async (kecamatanId: string) => {
  try {
    const response = await districtStore.getKelurahanApi(kecamatanId); // Berikan ID kecamatan sebagai parameter
    if (response && response.payload) {
      kelurahanPayload.value = response.payload;
    } else {
      kelurahanPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch kelurahan", error);
    kelurahanPayload.value = [];
  }
};

watch(
  () => [
    selectedProvinceId.value,
    selectedRegencyId.value,
    selectedDistrictId.value,
  ],
  ([newProvinceId, newRegencyId, newDistrictId]) => {
    if (newProvinceId) fetchKabupaten(newProvinceId);
    if (newRegencyId) fetchKecamatan(newRegencyId);
    if (newDistrictId) {
      fetchKelurahan(newDistrictId);
      // fetchPostalCode(newRegencyId || '', newDistrictId);
    }
  }
);
onMounted(() => {
  fetchProvinsi();
});

const onSubmit = handleSubmit((values: any) => {
  console.log(values);
  emit("submitSupplierData", values);
  closeDialog();
});

const closeDialog = () => {
  emit("update:isDialogVisible", false);
  resetForm();
};
</script>

<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    headerBg="bg-adameds-300"
    @update:visible="updateVisibility"
  >
    <template #header>{{ title }}</template>
    <template #body>
      <div class="flex flex-col gap-2.5 py-5">
        <div class="flex gap-7">
          <CustomTextfield
            label="Kode Supplier"
            placeholder="Kode Supplier"
            class="w-[150px]"
            v-model="code"
          />
          <CustomTextfield
            label="Nama Supplier"
            placeholder="Kode Supplier"
            class="grow"
            v-model="name"
          />
        </div>
        <div class="grid grid-cols-3 gap-7">
          <CustomSelect
            label="Provinsi"
            placeHolder="Pilih Provinsi"
            v-model="selectedProvinceId"
            :options="provinsiPayload"
            optionValue="code"
            optionLabel="name"
            :isLoading="false"
            :invalid="!!errors.selectedProvinceId"
            :invalidMessage="errors.selectedProvinceId"
          />
          <CustomSelect
            label="Kabupaten"
            placeHolder="Pilih Kabupaten"
            v-model="selectedRegencyId"
            :options="kabupatenPayload"
            optionValue="code"
            optionLabel="name"
            :isLoading="false"
            :invalid="!!errors.selectedRegencyId"
            :invalidMessage="errors.selectedRegencyId"
            :disabled="false"
          />
          <CustomSelect
            label="Kecamatan"
            placeHolder="Pilih Kecamtan"
            v-model="selectedDistrictId"
            :options="kecamatanPayload"
            optionValue="code"
            optionLabel="name"
            :isLoading="false"
            :invalid="!!errors.selectedDistrictId"
            :invalidMessage="errors.selectedDistrictId"
            :disabled="false"
          />
        </div>
        <div>
          <CustomTextfield
            label="Alamat"
            placeholder="Alamat"
            class="grow"
            v-model="alamat"
          />
        </div>
        <div class="flex gap-7">
          <CustomTextfield
            label="No. Telepon"
            placeholder="0123456789"
            class="w-[200px]"
            v-model="noTelpon"
          />
          <CustomMultiSelect
            class="grow"
            label="Kategori Item"
            :options="kategoriItem"
            placeholder="Pilih Kategori Item"
            v-model:modelValue="kategoriItemSelected"
            optionValue="id"
            optionLabel="name"
          />
        </div>
        <hr class="my-2.5 border-grey-200" />
        <div>
          <CustomSwitch
            label="Status"
            v-model="status"
            sideLabel="Tidak Aktif"
            sideLabelTrue="Aktif"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton
            label="Reset"
            borderColor="border-2 border-[#9DA4B1]"
            background-color="bg-transparent"
            text-color="text-grey-300"
            @click="resetForm"
          />
          <CustomButton label="Simpan" @click="onSubmit" />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
