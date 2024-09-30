<script lang="ts" setup>
import { ref, watch, onMounted, computed } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import { usePegawaiStore } from "@/stores/datamaster/pegawai";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";

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

const tipePraktisi = ref([
  { name: "Dokter", value: true },
  { name: "Non-Dokter", value: false },
]);
const pegawaiStore = usePegawaiStore();
const praktisiStore = usePraktisiStore();
const pegawaiPayload = ref<any[]>([]);
const isSearchPerformed = ref(false); // New reactive property

const selectedPegawai = computed(() => {
  return pegawaiPayload.value.find(pegawai => pegawai.uuid === pegawaiUuid.value);
});

const fetchPegawai = async () => {
  try {
    const response = await pegawaiStore.getApi(

    );
    if (response && response.payload) {
      pegawaiPayload.value = response.payload;
    } else {
      pegawaiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch kategori ruangan", error);
    pegawaiPayload.value = [];
  }
};

const searchPegawai = async () => {
  // Call fetchKategoriRuangan when searching for employees
  await fetchPegawai();
  isSearchPerformed.value = true; // Set to true when search is performed
};

const resetSearch = () => {
  pegawaiPayload.value = []; // Clear the payload
  isSearchPerformed.value = false; // Reset the search state
};

onMounted(() => {
  fetchPegawai();
});

const schema = toTypedSchema(
  yup.object({
    pegawaiUuid: yup.string().required("Pegawai harus dipilih"),
    codeBpjs: yup.string(),
    sip: yup.string(),
    str: yup.string(),
    isDokter: yup.boolean().required("Tipe Praktisi harus dipilih"),
    codeAntrianDokter: yup.string().required("Pegawai harus dipilih"),
    practisionerPoli: yup
      .array()
      .of(yup.string().required("Permission harus dipilih")),
    status: yup.bool().default(false),
  })
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [pegawaiUuid] = defineField("pegawaiUuid");
const [codeBpjs] = defineField("codeBpjs");
const [sip] = defineField("sip");
const [str] = defineField("str");
const [isDokter] = defineField("isDokter");
const [codeAntrianDokter] = defineField("codeAntrianDokter");
const [practisionerPoli] = defineField("practisionerPoli");
const [status] = defineField("status");

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

const onSubmit = handleSubmit(async (values: any) => {
  try {
    if (method.value === "edit") {
      if (!props.payload || !props.payload.uuid) {
        throw new Error("UUID is missing for edit operation");
      }
      const uuid = props.payload.uuid;
      const response = await praktisiStore.putApi(uuid, values);
      console.log("Data updated successfully:", response);
      emit("data-updated");
    } else if (method.value === "add") {
      console.log("Adding new data with values:", values);
      const response = await praktisiStore.postApi(values);
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
  resetSearch(); // Reset search when closing the dialog
};

watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (newValue) {
      resetDialogMode();
      if (props.method !== "add" && props.payload) {
        setValues({
          ...props.payload,
        });
      }
    } else {
      resetForm();
      resetDialogMode();
      resetSearch(); // Reset when dialog is closed
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
    <template #header>{{ title }} Praktisi</template>
    <template #body>
      <!-- Form Input -->
      <div v-if="method !== 'detail'" class="grid grid-cols-12 gap-5 mt-5">
        <CustomSelect
          v-model="isDokter"
          label="Tipe Praktisi"
          :options="tipePraktisi"
          option-label="name"
          option-value="value"
          place-holder="Cari & Pilih Praktisi"
          class="w-1/2 col-span-12"
          :invalid="!!errors.isDokter"
          :invalidMessage="errors.isDokter"
        />
        <hr class="col-span-12 border-grey-200" />
        <CustomSelect
          label="Nama Pegawai"
          v-model="pegawaiUuid"
          :options="pegawaiPayload"
          optionValue="uuid"
          optionLabel="name"
          place-holder="Cari & Pilih Pegawai"
          class="col-span-8"
          :invalid="!!errors.pegawaiUuid"
          :invalidMessage="errors.pegawaiUuid"
        />

        <div class="flex items-end justify-between col-span-4">
          <CustomButton
            label="Cari"
            icon="PhMagnifyingGlass"
            @click="searchPegawai"
          />
          <CustomButton
            label="Reset"
            background-color="bg-transparent"
            border-color="border-adameds-300"
            text-color="text-adameds-300"
            @click="resetSearch"
          />
        </div>
        <div v-if="isSearchPerformed && selectedPegawai" class="col-span-12">
          <div
            v-for="pegawai in pegawaiPayload"
            :key="pegawai.uuid"
            class="grid grid-flow-col grid-cols-2 grid-rows-2 gap-5 border rounded-[10px] border-adameds-300 p-5"
          >
            <div class="flex flex-col">
              <div class="font-semibold underline text-SM">Nama Pegawai</div>
              <div class="font-normal text-normal">{{ selectedPegawai.name }}</div>
              <!-- Correctly access the name -->
            </div>
            <div class="flex flex-col">
              <div class="font-semibold underline text-SM">Tanggal Lahir</div>
              <div class="font-normal text-normal">
                {{ selectedPegawai.tanggalLahir }}
              </div>
              <!-- Replace with the correct field -->
            </div>
            <div class="flex flex-col">
              <div class="font-semibold underline text-SM">Nik</div>
              <div class="font-normal text-normal">{{ selectedPegawai.nik }}</div>
              <!-- Replace with the correct field -->
            </div>
            <div class="flex flex-col">
              <div class="font-semibold underline text-SM">Jenis Kelamin</div>
              <div class="font-normal text-normal">
                {{ selectedPegawai.gender }}
              </div>
            </div>
          </div>
        </div>

        <CustomInputNumber
          v-if="isDokter"
          label="Kode HFIS (BPJS)"
          v-model="codeBpjs"
          placeholder="000"
          class="col-span-4"
        />
        <CustomInputNumber
          v-if="isDokter"
          label="SIP"
          v-model="sip"
          placeholder="000"
          class="col-span-4"
        />
        <CustomInputNumber
          v-if="isDokter"
          label="STR"
          v-model="str"
          placeholder="0"
          :class="isDokter ? 'col-span-4' : 'col-span-12'"
          />
          <CustomTextfield
          v-if="isDokter"
          label="Kode Antrian Dokter"
          v-model="codeAntrianDokter"
          placeholder="Kode Antrian Dokter"
          class="col-span-4"
          />
        <CustomMultiSelect
          v-if="isDokter"
          label="Poli"
          v-model="practisionerPoli"
          placeholder="Pilih Poli"
          class="col-span-8"
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
        <CustomInfoRow label="Nama Lengkap" :value="payload.name" />
        <CustomInfoRow label="NIK" :value="payload.nik" />
        <CustomInfoRow label="Tanggal Lahir" :value="payload.tanggalLahir" />
        <CustomInfoRow label="Jenis Kelamin" :value="payload.gender" />
        <CustomInfoRow label="Kode HFIS (BPJS)" :value="payload.codeBpjs" />
        <CustomInfoRow label="SIP" :value="sip" />
        <CustomInfoRow label="STR" :value="str" />
        <CustomInfoRow label="Kode Antrian Dokter" :value="codeAntrianDokter" />
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
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <hr class="-mx-5 border-grey-200" />
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
