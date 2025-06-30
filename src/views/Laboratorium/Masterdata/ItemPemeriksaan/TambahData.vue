<script setup lang="ts">
import { ref, watch, defineEmits, onMounted } from "vue";
import { utilsStore } from "@/stores/utils";
import { useForm, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomComboBox from "@/components/Base/CustomComboBox.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import { useKategoriPemeriksaanStore } from "@/stores/datamasterLaboratorium/kategoriPemeriksaan";
import { useLoincStore } from "@/stores/datamaster/loinc";
import { useIcd9Store } from "@/stores/datamaster/icd9";
import { useSnomedCTStore } from "@/stores/datamaster/snomedCT";

const visible = ref(false);
const emit = defineEmits(["submit", "reset"]);
const kategoriPemeriksaanStore = useKategoriPemeriksaanStore();
const kategoriPemeriksaanPayload = ref(<any>[]);
const UseUtilsStore = utilsStore();
const kategoriPemeriksaanOptions = ref<{ label: string; value: string }[]>([]);
const kategoriPemeriksaan = ref();
const loincStore = useLoincStore();
const loincPayload = ref(<any>[]);
const loincOptions = ref<{ label: string; value: string }[]>([]);
const loinc = ref();
const icd9Store = useIcd9Store();
const icd9Payload = ref(<any>[]);
const icd9Options = ref<{ label: string; value: string }[]>([]);
const icd9 = ref();
const snomedCTStore = useSnomedCTStore();
const snomedCTPayload = ref(<any>[]);
const snomedCTOptions = ref<{ label: string; value: string }[]>([]);
const snomedCT = ref();
const code = ref("");
const name = ref("");
const metode = ref("");
const noUrut = ref();
const jenisInput = ref();
const satuan = ref("");
const status = ref(true);
const statusNilaiRujukan = ref(false);
const pilihanHasilItemPemeriksaans = ref([]);
const editMode = ref(false);
const selectedItemId = ref<string | null>(null);

// Fetch Data Kategori Pemeriksaan
const fetchKategoriPemeriksaan = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await kategoriPemeriksaanStore.getApi({
      page: 1,
      limit: 9999,
      name: "",
    });

    if (response && response.payload) {
      kategoriPemeriksaanPayload.value = response.payload.data.filter(
        (item: any) => item.status === true
      );
      kategoriPemeriksaanOptions.value = kategoriPemeriksaanPayload.value.map(
        (item: any) => ({
          label: item.name,
          value: item.uuid,
        })
      );
    } else {
      kategoriPemeriksaanPayload.value = [];
      kategoriPemeriksaanOptions.value = [];
    }
    console.log("Data Kategori Pemeriksaan", kategoriPemeriksaanPayload.value);
  } catch (error) {
    console.error("Failed to fetch data", error);
    kategoriPemeriksaanPayload.value = [];
    kategoriPemeriksaanOptions.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// Fetch Data Loinc
const fetchLoinc = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await loincStore.getApi(1, 9999, "");

    if (response && response.payload) {
      loincPayload.value = response.payload;
      loincOptions.value = loincPayload.value.map((item: any) => ({
        label: item.name,
        value: item.uuid,
      }));
    } else {
      loincPayload.value = [];
      loincOptions.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    loincPayload.value = [];
    loincOptions.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// Fetch Data Icd9
const fetchIcd9 = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await icd9Store.getApi(1, 9999, "");

    if (response && response.payload) {
      icd9Payload.value = response.payload;
      icd9Options.value = icd9Payload.value.map((item: any) => ({
        label: item.name,
        value: item.uuid,
      }));
    } else {
      icd9Payload.value = [];
      loincOptions.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    icd9Payload.value = [];
    loincOptions.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// Fetch Data snomedCT
const fetchSnomed = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await snomedCTStore.getApi(1, 9999, "");

    if (response && response.payload) {
      snomedCTPayload.value = response.payload;
      snomedCTOptions.value = snomedCTPayload.value.map((item: any) => ({
        label: item.name,
        value: item.uuid,
      }));
    } else {
      snomedCTPayload.value = [];
      loincOptions.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    snomedCTPayload.value = [];
    loincOptions.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// Fungsi untuk mereset form
const resetForm = () => {
  code.value = "";
  metode.value = "";
  name.value = "";
  status.value = true;
  statusNilaiRujukan.value = false;
  satuan.value = "";
  jenisInput.value = "";
  kategoriPemeriksaan.value = "";
  (loinc.value = ""), (noUrut.value = "");
  icd9.value = "";
  snomedCT.value = "";
  selectedItemId.value = null;
  pilihanHasilItemPemeriksaans.value = [];
};

const optionJenisInput = ref([
  { label: "Angka", value: "angka" },
  { label: "Text", value: "text" },
  { label: "Long Text", value: "long text" },
  { label: "Pilihan", value: "pilihan" },
]);

// Fungsi untuk menangani saat dialog ditutup
const onDialogClose = (isVisible: boolean) => {
  if (!isVisible) {
    resetForm(); // Reset form ketika dialog ditutup
  }
};

// Fungsi untuk submit data
const submitData = () => {
  emit("submit", {
    code: code.value,
    name: name.value,
    statusNilaiRujukan: statusNilaiRujukan.value,
    categoryPemeriksaanUuid: kategoriPemeriksaan.value,
    satuan: satuan.value,
    metode: metode.value,
    jenisInput: jenisInput.value,
    pilihanHasilItemPemeriksaans: pilihanHasilItemPemeriksaans.value,
    loincUuid: loinc.value,
    status: status.value,
    noUrut: noUrut.value,
    id: selectedItemId.value,
    icd9Uuid: icd9.value,
    snomedUuid: snomedCT.value,
  });
};

defineExpose({
  visible,
  code,
  name,
  metode,
  noUrut,
  jenisInput,
  satuan,
  kategoriPemeriksaan,
  pilihanHasilItemPemeriksaans,
  statusNilaiRujukan,
  status,
  editMode,
  loinc,
  icd9,
  snomedCT,
  loincOptions,
  selectedItemId,
  resetForm,
});

// watch(
//   () => pilihanHasilItemPemeriksaans.value,
//   (newValue) => {
//     console.log("Nilai chips dari CustomComboBox:", newValue.join(", "));
//   },
//   { deep: true }
// );
onMounted(() => {
  fetchKategoriPemeriksaan();
  fetchLoinc();
  fetchIcd9();
  fetchSnomed();
});
</script>

<template>
  <CustomDialog
    v-model:visible="visible"
    @update:visible="onDialogClose"
    :style="{ width: '600px' }"
  >
    <template #header>
      <div class="grid grid-cols-1">
        <p>
          {{
            editMode
              ? "Edit Data Item Pemeriksaan"
              : "Tambah Data Item Pemeriksaan"
          }}
        </p>
      </div>
    </template>
    <template #body>
      <div class="grid grid-cols-[35%,45%,15%] gap-3 mt-5">
        <CustomTextfield
          v-model="code"
          label="Kode Item Pemeriksaan"
          placeholder="Kode Item Pemeriksaan"
        />
        <CustomTextfield
          v-model="name"
          label="Nama Item Pemeriksaan"
          placeholder="Nama Item Pemeriksaan"
        />
        <CustomInputNumber
          v-model="noUrut"
          label="No. Urut"
          :show-buttons="false"
          class="text-center"
        />
      </div>
      <div class="grid gap-6 mt-5 grid-cols-[50%,45%]">
        <CustomSelect
          v-model="kategoriPemeriksaan"
          label="Kategori Pemeriksaan"
          placeHolder="Pilih Kategori Pemeriksaan"
          optionLabel="label"
          optionValue="value"
          :options="kategoriPemeriksaanOptions"
        />
        <CustomTextfield v-model="satuan" label="Satuan" placeholder="Satuan" />
      </div>
      <div class="grid gap-6 mt-5 grid-cols-[50%,45%]">
        <CustomTextfield v-model="metode" label="Metode" placeholder="Metode" />
        <CustomSelect
          v-model="jenisInput"
          label="Jenis Input"
          placeHolder="Pilih Jenis Input"
          optionLabel="label"
          optionValue="value"
          :options="optionJenisInput"
        />
      </div>
      <CustomComboBox
        v-if="jenisInput == 'pilihan'"
        v-model="pilihanHasilItemPemeriksaans"
        label="Pilihan Hasil"
        placeholder="Input Hasil"
        class="mt-5 mb-5"
      />
      <CustomSelect
        v-model="snomedCT"
        label="Snomed - CT"
        placeHolder="Pilih Snomed - CT"
        class="mt-5"
        optionLabel="label"
        optionValue="value"
        :showFilter="false"
        :options="snomedCTOptions"
      />
      <CustomSelect
        v-model="icd9"
        label="ICD 9-CM"
        placeHolder="Pilih ICD 9-CM"
        class="mt-5"
        optionLabel="label"
        optionValue="value"
        :showFilter="false"
        :options="icd9Options"
      />
      <CustomSelect
        v-model="loinc"
        label="LOINC"
        placeHolder="Pilih LOINC"
        class="mt-5 mb-5"
        optionLabel="label"
        optionValue="value"
        :showFilter="false"
        :options="loincOptions"
      />
      <hr class="mt-[20px] border border-slate-200" />
      <div class="grid grid-cols-2 mt-[15px]">
        <CustomSwitch
          v-model="status"
          :show-label="true"
          label="Status"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
        />
        <CustomSwitch
          v-model="statusNilaiRujukan"
          :show-label="true"
          label="Nilai Rujukan"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2.5 mt-5">
        <CustomButton
          label="Reset"
          textColor="text-grey-300"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-grey-200"
          @click="resetForm"
        />
        <CustomButton label="Simpan" @click="submitData" />
      </div>
    </template>
  </CustomDialog>
</template>
