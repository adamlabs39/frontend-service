<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useOrganisasiStore } from "@/stores/datamaster/organisasi";
import { useDistrictStore } from "@/stores/datamaster/district";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";

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

const organisasiStore = useOrganisasiStore();
const organisasiPayload = ref<any[]>([]);

const districtStore = useDistrictStore();
const provinsiPayload = ref<any[]>([]);
const kabupatenPayload = ref<any[]>([]);
const kecamatanPayload = ref<any[]>([]);
const kelurahanPayload = ref<any[]>([]);

const fetchOrganisasi = async () => {
  try {
    const response = await organisasiStore.getApi();
    if (response && response.payload) {
      organisasiPayload.value = response.payload;
    } else {
      organisasiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch kategori ruangan", error);
    organisasiPayload.value = [];
  }
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
onMounted(() => {
  fetchOrganisasi();
  fetchProvinsi();
});

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode Organisasi harus diisi"),
    name: yup.string().required("Nama Organisasi harus diisi"),
    phone: yup.string().required("No. Telepon harus diisi"),
    email: yup.string().required("Email harus diisi"),
    url: yup.string().required("URL harus diisi"),
    addressCode: yup.string(),
    kodePos: yup.string().required("Kode Pos harus diisi"),
    alamat: yup.string().required("Alamat harus diisi"),
    partOfUuid: yup.string(),
    status: yup.bool().default(false),
  }).noUnknown()
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [code] = defineField("code");
const [name] = defineField("name");
const [phone] = defineField("phone");
const [email] = defineField("email");
const [url] = defineField("url");
const [addressCode] = defineField("addressCode");
const [kodePos] = defineField("kodePos");
const [alamat] = defineField("alamat");
const [partOfUuid] = defineField("partOfUuid");
const [status] = defineField("status");
const provinsi = ref();
const kabupaten = ref();
const kecamatan = ref();

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

const onSubmit = handleSubmit(async (values: any) => {
  try {
    if (method.value === "edit") {
      if (!props.payload || !props.payload.uuid) {
        throw new Error("UUID is missing for edit operation");
      }
      const uuid = props.payload.uuid;
      const response = await organisasiStore.putApi(uuid, values);
      console.log("Data updated successfully:", response);
      emit("data-updated");
    } else if (method.value === "add") {
      console.log("Adding new data with values:", values);
      const response = await organisasiStore.postApi(values);
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

// Watcher untuk Kecamatan
watch(kecamatan, (newKecamatan) => {
  if (newKecamatan) {
    fetchKelurahan(newKecamatan); // Ambil data kelurahan ketika kecamatan berubah
  }
});

watch(
  () => props.isDialogVisible,
  async (newValue) => {
    if (newValue) {
      resetDialogMode();
      
      // Check if we are editing, and if so, set initial values
      if (props.method !== "add" && props.payload) {
        setValues({
          ...props.payload,
        });

        // Set provinsi, kabupaten, kecamatan, and kelurahan based on payload data
        if (props.payload.detailAlamat) {
          // Set provinsi
          provinsi.value = props.payload.detailAlamat.provinsi.code;
          await fetchKabupaten(provinsi.value);  // Fetch kabupaten after provinsi is set

          // Set kabupaten
          kabupaten.value = props.payload.detailAlamat.kabupaten.code;
          await fetchKecamatan(kabupaten.value);  // Fetch kecamatan after kabupaten is set

          // Set kecamatan
          kecamatan.value = props.payload.detailAlamat.kecamatan.code;
          await fetchKelurahan(kecamatan.value);  // Fetch kelurahan after kecamatan is set

          // Set kelurahan
          addressCode.value = props.payload.detailAlamat.kelurahan.code;
        }
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
    <template #header>{{ title }} Organisasi</template>
    <template #body>
      <!-- Form Input -->
      <div v-if="method !== 'detail'" class="grid grid-cols-12 gap-5 mt-5">
        <CustomTextfield
          label="Kode Organisasi"
          v-model="code"
          placeholder="Kode Organisasi"
          class="col-span-4"
          :invalid="!!errors.code"
          :invalidMessage="errors.code"
          :required="errors.code ? true : false"
        />
        <CustomTextfield
          label="Nama Organisasi"
          v-model="name"
          placeholder="Nama Organisasi"
          class="col-span-8"
          :invalid="!!errors.name"
          :invalidMessage="errors.name"
          :required="errors.name ? true : false"
        />
        <CustomTextfield
          label="No. Telepon"
          v-model="phone"
          placeholder="0"
          class="col-span-4"
          :invalid="!!errors.phone"
          :invalidMessage="errors.phone"
          :required="errors.phone ? true : false"
        />
        <CustomTextfield
          label="Email"
          v-model="email"
          placeholder="Email"
          class="col-span-8"
          :invalid="!!errors.email"
          :invalidMessage="errors.email"
          :required="errors.email ? true : false"
        />
        <CustomTextfield
          label="URL"
          v-model="url"
          placeholder="URL"
          class="col-span-12"
           :invalid="!!errors.url"
          :invalidMessage="errors.url"
          :required="errors.url ? true : false"
        />
        <CustomSelect
          label="Provinsi"
          v-model="provinsi"
          place-holder="Pilih Provinsi"
          class="col-span-6"
          :options="provinsiPayload"
          option-label="name"
          option-value="code"
        />
        <CustomSelect
          label="Kab/Kota"
          v-model="kabupaten"
          place-holder="Pilih Kab/Kota"
          class="col-span-6"
          :options="kabupatenPayload"
          option-label="name"
          option-value="code"
        />
        <CustomSelect
          label="Kecamatan"
          v-model="kecamatan"
          place-holder="Pilih Kecamatan"
          class="col-span-6"
          :options="kecamatanPayload"
          option-label="name"
          option-value="code"
        />
        <CustomSelect
          label="Kelurahan/Desa"
          v-model="addressCode"
          place-holder="Pilih Kelurahan/Desa"
          class="col-span-6"
          :options="kelurahanPayload"
          option-label="name"
          option-value="code"
        />
        <CustomTextfield
          label="Kode Pos"
          v-model="kodePos"
          placeholder="Pilih Kode Pos"
          class="col-span-4"
          :invalid="!!errors.kodePos"
          :invalidMessage="errors.kodePos"
          :required="errors.kodePos ? true : false"
        />
        <CustomTextArea
          label="Alamat"
          v-model="alamat"
          place-holder="Alamat"
          class="col-span-8"
          :invalid="!!errors.alamat"
          :invalidMessage="errors.alamat"
          :required="errors.kodePos ? true : false"
        />
        <CustomSelect
          label="Part Of"
          v-model="partOfUuid"
          :options="organisasiPayload"
          option-label="name"
          option-value="uuid"
          place-holder="Pilih Part Of"
          class="col-span-12"
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
      <!-- Detail Data -->
      <div v-if="method === 'detail'" class="flex flex-col gap-5 mt-5">
        <!-- {{ payload }} -->
        <div class="font-bold leading-8 text-heading">Data Organisasi</div>
        <hr class="border-grey-200" />
        <CustomInfoRow label="Kode Organisasi" :value="payload.code" />
        <CustomInfoRow label="Nama Organisasi" :value="payload.name" />
        <CustomInfoRow label="No. Telephone" :value="payload.phone" />
        <CustomInfoRow label="E-mail" :value="payload.email" />
        <CustomInfoRow label="URL" :value="payload.url" />
        <CustomInfoRow
          label="Provinsi"
          :value="payload.detailAlamat.provinsi.nama ?? '-'"
        />
        <CustomInfoRow
          label="Kab/Kota"
          :value="payload.detailAlamat.kabupaten.nama ?? '-'"
        />
        <CustomInfoRow
          label="Kecamatan"
          :value="payload.detailAlamat.kecamatan.nama ?? '-'"
        />
        <CustomInfoRow
          label="Kelurahan/Desa"
          :value="payload.detailAlamat.kelurahan.nama ?? '-'"
        />
        <CustomInfoRow label="Kode Pos" :value="payload.kodePos ?? '-'" />
        <CustomInfoRow label="Alamat" :value="payload.alamat ?? '-'" />
        <CustomInfoRow label="Part Of Id" :value="payload.partOf ?? '-'" />
        <CustomInfoRow
          label="Part Of Name"
          :value="payload.partOfName ?? '-'"
        />
        <CustomInfoRow
          label="ID SATUSEHAT"
          :value="payload.satuSehatId ?? '-'"
        />
        <hr class="border-grey-200" />
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
        <CustomInfoRow label="Status SATUSEHAT">
          <template #value>
            <CustomChip
              :label="payload.satuSehatId ? 'AKTIF' : 'NON-AKTIF'"
              :textColor="payload.satuSehatId ? 'text-white' : 'text-[#80868d]'"
              :bgColor="payload.satuSehatId ? 'bg-adameds-300' : 'bg-white'"
              :borderColor="payload.satuSehatId ? 'border-none' : 'border-[#80868d]'"
              :icon-color="payload.satuSehatId ? 'white' : '#80868d'"
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
