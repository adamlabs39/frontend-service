<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useForm } from "vee-validate";
import { utilsStore } from "@/stores/utils";
import CustomButton from "@/components/Base/CustomButton.vue";
import { useKelompokPemeriksaanStore } from "@/stores/datamasterLaboratorium/kelompokPemeriksaan";
import { useLoincStore } from "@/stores/datamaster/loinc";
import { useIcd9Store } from "@/stores/datamaster/icd9";
import { useSnomedCTStore } from "@/stores/datamaster/snomedCT";
import { useKategoriPemeriksaanStore } from "@/stores/datamasterLaboratorium/kategoriPemeriksaan";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
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
  payload: {
    type: Object,
    default: () => ({}),
  },
  dataItemPemeriksaan: {
    type: Array,
    default: () => [],
  },
});

const utils = utilsStore();
const kelompokPemeriksaanStore = useKelompokPemeriksaanStore();

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);
const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};
const method = ref(props.method);
const title = ref(props.title);
const handleEdit = () => {
  method.value = "edit";
  title.value = "Edit Data";
};

const closeDialog = () => {
  emit("update:isDialogVisible", false);
  resetForm();
};
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
const kategoriPemeriksaanStore = useKategoriPemeriksaanStore();
const kategoriPemeriksaanPayload = ref(<any>[]);
const kategoriPemeriksaanOptions = ref<{ label: string; value: string }[]>([]);
const kategoriPemeriksaan = ref();
const code = ref("");
const name = ref("");
const status = ref(true);
const selectedItemPemeriksaan = ref<any[]>([]);

// Fetch Data Kategori Pemeriksaan
const fetchKategoriPemeriksaan = async () => {
  utils.setLoading(true);
  try {
    const response = await kategoriPemeriksaanStore.getApi();

    if (response && response.payload) {
      kategoriPemeriksaanPayload.value = response.payload.data;
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
  } catch (error) {
    console.error("Failed to fetch data", error);
    kategoriPemeriksaanPayload.value = [];
    kategoriPemeriksaanOptions.value = [];
  } finally {
    utils.setLoading(false);
  }
};

// Fetch Data Loinc
const fetchLoinc = async () => {
  utils.setLoading(true);
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
    utils.setLoading(false);
  }
};

// Fetch Data Icd9
const fetchIcd9 = async () => {
  utils.setLoading(true);
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
    utils.setLoading(false);
  }
};

// Fetch Data snomedCT
const fetchSnomed = async () => {
  utils.setLoading(true);
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
    utils.setLoading(false);
  }
};

const onSubmit = async () => {
  try {
    if (method.value === "add") {
      const payload = {
        code: code.value,
        name: name.value,
        loincUuid: loinc.value,
        itemPemeriksaans: selectedItemPemeriksaan.value,
        icd9Uuid: icd9.value,
        snomedCTUuid: snomedCT.value,
        status: status.value,
        categoryPemeriksaanUuid: kategoriPemeriksaan.value,
      };
      await kelompokPemeriksaanStore.postApi(payload);
      emit("data-updated");
    } else if (method.value === "edit") {
      const uuid = props.payload.uuid;
      const payload = {
        uuid: props.payload.uuid,
        code: code.value,
        name: name.value,
        loincUuid: loinc.value,
        itemPemeriksaans: selectedItemPemeriksaan.value,
        icd9Uuid: icd9.value,
        snomedCTUuid: snomedCT.value,
        status: status.value,
        categoryPemeriksaanUuid: kategoriPemeriksaan.value,
      };
      await kelompokPemeriksaanStore.putApi(uuid, payload);
      emit("data-updated");
    }
    closeDialog();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

const resetDialogMode = () => {
  method.value = props.method;
  title.value = props.title;
};

const resetForm = () => {
  code.value = "";
  name.value = "";
  kategoriPemeriksaan.value = null;
  loinc.value = null;
  icd9.value = null;
  snomedCT.value = null;
  selectedItemPemeriksaan.value = [];
  status.value = true;
};

const setValues = (values: any) => {
  code.value = values.code || "";
  name.value = values.name || "";
  kategoriPemeriksaan.value = values.categoryPemeriksaanUuid || null;
  loinc.value = values.loincUuid || null;
  icd9.value = values.icd9Uuid || null;
  snomedCT.value = values.snomedCTUuid || null;
  selectedItemPemeriksaan.value = values.itemPemeriksaans || [];
  status.value = values.status !== undefined ? values.status : true;
};

// watch(
//   () => props.isDialogVisible,
//   (newValue) => {
//     if (newValue) {
//       resetDialogMode();
//       if (props.method !== "add" && props.payload) {
//         console.log("props.payload", props.payload);
//         const selectedItemPemeriksaanUuid =
//           props.payload.itemPemeriksaan?.map((item: any) => item.uuid) || [];

//         setValues({
//           ...props.payload,
//           itemPemeriksaans: selectedItemPemeriksaanUuid,
//         });
//       }
//     } else {
//       resetForm();
//       resetDialogMode();
//     }
//   }
// );

watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (newValue) {
      resetDialogMode();
      if (props.method === "edit" && props.payload) {
        console.log("props.payload", props.payload);

        // Map itemPemeriksaan UUIDs
        const selectedItemPemeriksaanUuid =
          props.payload.itemPemeriksaan?.map((item: any) => item.uuid) || [];

        // Set values from props.payload
        setValues({
          code: props.payload.code,
          name: props.payload.name,
          categoryPemeriksaanUuid: props.payload.categoryPemeriksaanUuid,
          loincUuid: props.payload.loincUuid,
          icd9Uuid: props.payload.icd9Uuid,
          snomedCTUuid: props.payload.snomedUuid,
          itemPemeriksaans: selectedItemPemeriksaanUuid,
          status: props.payload.status,
        });
      }
    } else {
      resetForm();
      resetDialogMode();
    }
  }
);

onMounted(() => {
  fetchKategoriPemeriksaan();
  fetchLoinc();
  fetchIcd9();
  fetchSnomed();
});
</script>

<template>
  <CustomDialog
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    :style="{ width: '600px' }"
  >
    <template #header>
      <div v-if="method !== 'edit'" class="grid grid-cols-1">
        <p>Tambah Data Kelompok Pemeriksaan</p>
      </div>
      <div v-if="method === 'edit'" class="grid grid-cols-1">
        <p>Edit Data Kelompok Pemeriksaan</p>
      </div>
    </template>
    <template #body>
      <div class="flex gap-3">
        <div class="mt-[20px]">
          <CustomTextfield
            v-model="code"
            label="Kode Kelompok Pemeriksaan"
            placeholder="Kode Kelompok Pemeriksaan"
            class="mr-2"
          />
        </div>
        <div class="mt-[20px] grow">
          <CustomTextfield
            v-model="name"
            label="Nama Kelompok Pemeriksaan"
            placeholder="Nama Kelompok Pemeriksaan"
            class=""
          />
        </div>
      </div>
      <CustomSelect
        v-model="kategoriPemeriksaan"
        :options="kategoriPemeriksaanOptions"
        label="Kategori Pemeriksaan"
        placeHolder="Pilih Kategori Pemeriksaan"
        class="mt-5"
        optionLabel="label"
        optionValue="value"
        :showFilter="false"
      />
      <CustomSelect
        v-model="snomedCT"
        label="Snomed - CT"
        placeHolder="Pilih Snomed - CT"
        class="mt-5"
        optionLabel="label"
        optionValue="value"
        :showFilter="true"
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
        class="mt-5"
        optionLabel="label"
        optionValue="value"
        :showFilter="false"
        :options="loincOptions"
      />
      <CustomMultiSelect
        v-model="selectedItemPemeriksaan"
        placeholder="Pilih Item Pemeriksaan"
        label="Item Pemeriksaan"
        optionLabel="name"
        optionValue="uuid"
        :maxSelectedLabels="4"
        :options="dataItemPemeriksaan"
        class="mt-5 mb-5"
      />

      <hr class="mt-[40px] border border-slate-200" />

      <div class="grid grid-cols-1 mt-[15px]">
        <div>
          <CustomSwitch
            v-model="status"
            :show-label="true"
            label="Status"
            sideLabel="NON-AKTIF"
            sideLabelTrue="AKTIF"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <!-- <hr class="-mx-5 border-grey-200" /> -->
        <div class="mt-5 flex justify-end gap-2.5">
          <!-- <CustomButton
            label="Reset"
            textColor="text-grey-300"
            backgroundColor="bg-transparent"
            borderColor="border-2 border-grey-200"
            @click="resetForm"
          />
          <CustomButton label="Simpan" @click="onSubmit" /> -->
          <CustomButton
            v-if="method === 'edit'"
            label="Batal"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
            @click="closeDialog"
          />
          <CustomButton
            v-if="method !== 'edit'"
            label="Reset"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
            @click="resetForm"
          />
          <CustomButton label="Simpan" @click="onSubmit" />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
