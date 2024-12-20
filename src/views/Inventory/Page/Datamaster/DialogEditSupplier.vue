<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { computed, ref, watch, type PropType } from "vue";
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
  editSupplierData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:isDialogVisible", "submitEdit"]);

function updateVisibility(value: boolean) {
  emit("update:isDialogVisible", value);
}

const schema = computed(() =>
  toTypedSchema(
    yup
      .object({
        code: yup.string().required("Code Harus Diisi"),
        name: yup.string().required("Nama Haruus Diisi"),
        selectedVillageId: yup.string().notRequired(),
        alamat: yup.string().required("Alamat Harus Diisi"),
        noTlp: yup.string().required("Phone Harus Diisi"),
        kategoriItemSelected: yup
          .array()
          .of(yup.string().required("Poli harus dipilih"))
          .min(1, "Harus dipilih")
          .required("Unit Pelayanan harus dipilih"),
        status: yup.bool(),
      })
      .noUnknown()
  )
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [code] = defineField("code");
const [name] = defineField("name");
const [selectedVillageId] = defineField("selectedVillageId");
const [alamat] = defineField("alamat");
const [noTlp] = defineField("noTlp");
const [kategoriItemSelected] = defineField("kategoriItemSelected");
const [status] = defineField("status");
const provinsi = ref();
const kabupaten = ref();
const kecamatan = ref();

const districtStore = useDistrictStore();
const provinsiPayload = ref<any[]>([]);
const kabupatenPayload = ref<any[]>([]);
const kecamatanPayload = ref<any[]>([]);
const kelurahanPayload = ref<any[]>([]);

const kategoriItem = ref([
  { id: 1, name: "Medis" },
  { id: 2, name: "Non-Medis" },
]);

const onSubmit = handleSubmit((values: any) => {
  const dataToSubmit = {
    ...values,
    provinsiCode: provinsi.value,
    kabupatenCode: kabupaten.value,
    kecamatanCode: kecamatan.value
  };

  // Log or submit the data
  console.log(dataToSubmit);

  emit("submitEdit", dataToSubmit);
  closeDialog();
});

const closeDialog = () => {
  emit("update:isDialogVisible", false);
};

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
    const response = await districtStore.getKabupatenApi(provinsiId);
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
    const response = await districtStore.getKecamatanApi(kabupatenId);
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

// Watcher untuk Provinsi
watch(provinsi, (newProvinsi) => {
  if (newProvinsi) {
    fetchKabupaten(newProvinsi); // Ambil data kabupaten ketika provinsi berubah
    kabupaten.value = null; // Reset kabupaten dan kecamatan saat provinsi berubah
    kecamatan.value = null;
    kelurahanPayload.value = [];
  }
});

// Watcher untuk Kabupaten
watch(kabupaten, (newKabupaten) => {
  if (newKabupaten) {
    fetchKecamatan(newKabupaten); // Ambil data kecamatan ketika kabupaten berubah
    kecamatan.value = null; // Reset kecamatan dan kelurahan saat kabupaten berubah
    kelurahanPayload.value = [];
  }
});

// Watch ketika berhasil menerima data supplier yang akan diedit
watch(
  () => props.editSupplierData,
  async (newData) => {
    // console.log(props.editSupplierData);
    if (newData) {
      setValues({
        ...props.editSupplierData,
      });
      // Fetch ulang data lokasi
      if (props.editSupplierData) {
        provinsi.value = props.editSupplierData.provinsiCode;
        await fetchKabupaten(provinsi.value);
        kabupaten.value = props.editSupplierData.kabupatenCode;
        console.log(kabupaten.value);
        await fetchKecamatan(kabupaten.value);
        kecamatan.value = props.editSupplierData.kecamatanCode;
        selectedVillageId.value = props.editSupplierData.kelurahanCode;
      }
    }
  }
);

onMounted(() => {
  fetchProvinsi();
});
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
      <!-- {{ editSupplierData }} -->
      <div class="flex flex-col gap-2.5 py-5">
        <div class="flex gap-7">
          <CustomTextfield
            label="Kode Supplier"
            placeholder="Kode Supplier"
            class="w-[150px]"
            v-model="code"
            :invalid="!!errors.code"
            :invalidMessage="errors.code"
          />
          <CustomTextfield
            label="Nama Supplier"
            placeholder="Kode Supplier"
            class="grow"
            v-model="name"
            :invalid="!!errors.name"
            :invalidMessage="errors.name"
          />
        </div>
        <div class="grid grid-cols-4 gap-7">
          <CustomSelect
            label="Provinsi"
            placeHolder="Pilih Provinsi"
            v-model="provinsi"
            :options="provinsiPayload"
            optionValue="code"
            optionLabel="name"
            :isLoading="false"
            
          />
          <CustomSelect
            label="Kabupaten"
            placeHolder="Pilih Kabupaten"
            v-model="kabupaten"
            :options="kabupatenPayload"
            optionValue="code"
            optionLabel="name"
            :isLoading="false"
          
            :disabled="false"
          />
          <CustomSelect
            label="Kecamatan"
            placeHolder="Pilih Kecamtan"
            v-model="kecamatan"
            :options="kecamatanPayload"
            optionValue="code"
            optionLabel="name"
            :isLoading="false"
          
            :disabled="false"
          />
          <CustomTextfield
            label="Kelurahan"
            placeholder="Kelurahan"
            class="grow"
            v-model="selectedVillageId"
           
          />
        </div>
        <div>
          <CustomTextfield
            label="Alamat"
            placeholder="Alamat"
            class="grow"
            v-model="alamat"
            :invalid="!!errors.alamat"
            :invalidMessage="errors.alamat"
          />
        </div>
        <div class="flex gap-7">
          <CustomTextfield
            label="No. Telepon"
            placeholder="0123456789"
            class="w-[200px]"
            v-model="noTlp"
            :invalid="!!errors.noTlp"
            :invalidMessage="errors.noTlp"
          />
          <CustomMultiSelect
            class="grow"
            label="Kategori Item TOD"
            :options="kategoriItem"
            placeholder="Pilih Kategori Item"
            v-model:modelValue="kategoriItemSelected"
            optionValue="id"
            optionLabel="name"
            :invalid="!!errors.kategoriItemSelected"
            :invalidMessage="errors.kategoriItemSelected"
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
            label="Batal"
            borderColor="border-2 border-[#9DA4B1]"
            background-color="bg-transparent"
            text-color="text-grey-300"
            @click="closeDialog"
          />
          <CustomButton label="Simpan" @click="onSubmit" />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
