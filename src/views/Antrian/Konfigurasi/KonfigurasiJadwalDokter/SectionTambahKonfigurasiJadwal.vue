<script lang="ts" setup>
import { ref, watch, onMounted, computed, type PropType } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import { useJadwalDokterStore } from "@/stores/antrian/jadwalDokter";
import { utilsStore } from "@/stores/utils";
import { useToast } from "primevue/usetoast";

const toast = useToast();

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
  excludedDokterUuids: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const jadwalDokterStore = useJadwalDokterStore();
const useUtilsStore = utilsStore();

const jadwalPoliPayload = ref<any[]>([]);
const jadwalPoliProperties = ref({
  name: "",
});

const jadwalDokterPayload = ref<any[]>([]);
const jadwalDokterProperties = ref({
  poliUuid: "",
  name: "",
});

// Computed property untuk mendapatkan kode antrian dokter yang dipilih
const selectedDokterCode = computed(() => {
  if (!dokterUuid.value) return "";
  const selectedDokter = jadwalDokterPayload.value.find(
    (dokter) => dokter.uuid === dokterUuid.value
  );
  return selectedDokter?.codeAntrianDokter || "";
});

const fetchGetPoli = async () => {
  useUtilsStore.setLoading(true);
  try {
    const response = await jadwalDokterStore.getApiPoli(
      jadwalPoliProperties.value.name
    );
    console.log("Hasil dari response:", response);
    if (response && response.payload) {
      jadwalPoliPayload.value = response.payload;
    }
  } catch (error) {
    console.log("Error:", error);
    jadwalPoliPayload.value = [];
  } finally {
    useUtilsStore.setLoading(false);
  }
};

const fetchGetDokter = async (poliUuid: string) => {
  if (!poliUuid) {
    jadwalDokterPayload.value = [];
    return;
  }

  useUtilsStore.setLoading(true);
  try {
    const response = await jadwalDokterStore.getApiListDokter(
      poliUuid,
      jadwalDokterProperties.value.name
    );
    if (response && response.payload) {
      jadwalDokterPayload.value = response.payload.filter(
        (dokter: any) => !props.excludedDokterUuids.includes(dokter.uuid)
      );
    }
  } catch (error) {
    console.log("Error:", error);
    jadwalDokterPayload.value = [];
  } finally {
    useUtilsStore.setLoading(false);
  }
};

const defaultData = [
  {
    day: undefined,
    startTime: new Date(),
    endTime: new Date(),
    kuotaJkn: "0",
    kuotaNonJkn: "0",
    durasiPelayanan: "0",
    aktif: true,
  },
];

defaultData.forEach((item) => item.startTime.setHours(0, 0, 0, 0));
defaultData.forEach((item) => item.endTime.setHours(0, 0, 0, 0));

// Initialize data with default values
const data = ref([...defaultData]);

const startDateFilter = ref<Date>(new Date());
startDateFilter.value.setHours(0, 0, 0, 0);
const endDateFilter = ref<Date>(new Date());
endDateFilter.value.setHours(0, 0, 0, 0);

const addRow = () => {
  data.value.push({
    day: undefined,
    startTime: new Date(startDateFilter.value),
    endTime: new Date(endDateFilter.value),
    kuotaJkn: "0",
    kuotaNonJkn: "0",
    durasiPelayanan: "0",
    aktif: true,
  });
};

const itemsHari = ref([
  { name: "Senin", code: "1" },
  { name: "Selasa", code: "2" },
  { name: "Rabu", code: "3" },
  { name: "Kamis", code: "4" },
  { name: "Jumat", code: "5" },
]);

// Helper format Jam -> "HH:mm"
const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

/**
 * Converts time format "HH:mm" or Date object to total minutes from midnight
 * @param {string|Date} time - Example: "09:30" or Date object
 * @returns {number} - Example: 570
 */
const toMinutes = (time: any): number => {
  if (!time) return 0;

  // Handle Date object input
  if (time instanceof Date) {
    return time.getHours() * 60 + time.getMinutes();
  }

  // Handle "HH:mm" string format
  if (typeof time === "string" && /^\d{2}:\d{2}$/.test(time)) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Handle string that can be converted to Date
  if (typeof time === "string") {
    const dateObj = new Date(time);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.getHours() * 60 + dateObj.getMinutes();
    }
  }

  return 0;
};

// Function untuk menghitung durasi pelayanan otomatis
const calculateDurasiPelayanan = (
  startTime: any,
  endTime: any,
  kuotaJkn: any,
  kuotaNonJkn: any
) => {
  const totalKuota = (parseInt(kuotaJkn) || 0) + (parseInt(kuotaNonJkn) || 0);

  if (totalKuota > 0 && startTime && endTime) {
    const totalMenit = toMinutes(endTime) - toMinutes(startTime);
    return Math.floor(totalMenit / totalKuota).toString();
  }

  return "0";
};

// Schema validasi yang diperbaiki
const schema = toTypedSchema(
  yup.object({
    poliUuid: yup.string().required("Poliklinik harus dipilih"),
    dokterUuid: yup.string().required("Dokter harus dipilih"),
    jadwalData: yup
      .array()
      .of(
        yup.object({
          day: yup.number().required("Hari harus dipilih"),
          startTime: yup.date().required("Jam mulai harus diisi"),
          endTime: yup
            .date()
            .required("Jam selesai harus diisi")
            .test(
              "is-greater",
              "Jam selesai harus lebih besar dari jam mulai",
              function (value) {
                const { startTime } = this.parent;
                // Lewati jika salah satu belum diisi
                if (!startTime || !value) return true;

                // Helper untuk konversi Date/string → menit
                const toMinutes = (t: any) => {
                  if (typeof t === "string" && /^\d{2}:\d{2}$/.test(t)) {
                    const [h, m] = t.split(":").map(Number);
                    return h * 60 + m;
                  }
                  const dateObj =
                    t instanceof Date
                      ? t
                      : typeof t === "string"
                      ? new Date(t)
                      : null;
                  if (dateObj && !isNaN(dateObj.getTime())) {
                    return dateObj.getHours() * 60 + dateObj.getMinutes();
                  }
                  return 0;
                };

                return toMinutes(value) > toMinutes(startTime);
              }
            ),
          durasiPelayanan: yup.string().required(" harus diisi"),
          kuotaJkn: yup.string().required("harus diisi"),
          kuotaNonJkn: yup.string().required("harus diisi"),
          aktif: yup.boolean().required("Status harus dipilih"),
        })
      )
      .min(1, "Minimal harus ada 1 jadwal"),
  })
);

const isEndTimeInvalid = (row: any) => {
  if (!row.startTime || !row.endTime) return !row.endTime;
  return toMinutes(row.endTime) <= toMinutes(row.startTime);
};

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [poliUuid] = defineField("poliUuid");
const [dokterUuid] = defineField("dokterUuid");

// Computed property untuk menentukan apakah dropdown dokter disabled
const isDokterDisabled = computed(() => {
  return !poliUuid.value || poliUuid.value === "";
});

const isCodeDoctorDisabled = computed(() => {
  return !dokterUuid.value || dokterUuid.value === "";
});

// Computed property untuk mendapatkan kode antrian poli yang dipilih
const selectedPoliCode = computed(() => {
  if (!poliUuid.value) return "";
  const selectedPoli = jadwalPoliPayload.value.find(
    (poli) => poli.uuid === poliUuid.value
  );
  return selectedPoli?.codeAntrianPoli || "";
});

// Watch untuk poliModel - ketika poli berubah, fetch dokter dan reset dokter selection
watch(
  () => poliUuid.value,
  (newPoliValue) => {
    dokterUuid.value = undefined;
    jadwalDokterPayload.value = [];

    if (newPoliValue) {
      // Langsung gunakan newPoliValue sebagai UUID
      fetchGetDokter(newPoliValue);
    }
  }
);

// Field array untuk mengelola data jadwal
const { remove, push, replace, fields } = useFieldArray("jadwalData");

const onSubmit = handleSubmit(async (values: any) => {
  const hasEmptyFields = data.value.some((item) => {
    return (
      !item.day ||
      !item.startTime ||
      !item.endTime ||
      !item.durasiPelayanan ||
      item.durasiPelayanan === "0" ||
      !item.kuotaJkn ||
      item.kuotaJkn === "0" ||
      !item.kuotaNonJkn ||
      item.kuotaNonJkn === "0"
    );
  });
  if (hasEmptyFields) {
    toast.add({
      severity: "error",
      summary: "Validasi Error",
      detail: "Semua field jadwal harus diisi dengan benar",
      life: 3000,
    });
    return;
  }

  // Bangun payload - poliUuid.value sudah berupa UUID
  const payload = {
    dokter_uuid: dokterUuid.value,
    poliklinik_uuid: poliUuid.value, // sudah UUID
    jadwal: data.value.map((item) => ({
      day: Number(item.day), // pastikan number
      start_time: formatTime(item.startTime),
      end_time: formatTime(item.endTime),
      kuota_jkn: parseInt(item.kuotaJkn),
      kuota_non_jkn: parseInt(item.kuotaNonJkn),
      aktif: item.aktif ?? true,
    })),
  };

  try {
    useUtilsStore.setLoading(true);
    await jadwalDokterStore.addJadwalDoctor(payload);
    toast.add({
      severity: "success",
      summary: "Sukses",
      detail: "Jadwal dokter berhasil disimpan",
      life: 3000,
    });
    emit("refresh");
    closeDialog();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Gagal",
      detail: "Gagal menyimpan jadwal dokter",
      life: 3000,
    });
  } finally {
    useUtilsStore.setLoading(false);
  }
});

const emit = defineEmits(["update:isDialogVisible", "close", "refresh"]);

function updateVisibility(value: any) {
  emit("update:isDialogVisible", value);
}

function closeDialog() {
  emit("close");
}

// to trigger handleReset at the start
onMounted(() => {
  handleReset();
  fetchGetPoli();
  // Set initial data untuk field array
  replace(defaultData);
});

watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (!newValue) {
      handleReset();
    }
  }
);

// Watcher untuk auto-calculate durasi pelayanan
watch(
  () => data.value,
  (newData) => {
    newData.forEach((item) => {
      if (
        item.startTime &&
        item.endTime &&
        (item.kuotaJkn || item.kuotaNonJkn)
      ) {
        const calculatedDurasi = calculateDurasiPelayanan(
          item.startTime,
          item.endTime,
          item.kuotaJkn,
          item.kuotaNonJkn
        );

        // Update durasi hanya jika berbeda untuk menghindari infinite loop
        if (item.durasiPelayanan !== calculatedDurasi) {
          item.durasiPelayanan = calculatedDurasi;
        }
      }
    });
  },
  { deep: true }
);

function handleReset() {
  resetForm();

  // Clear selections
  poliUuid.value = undefined;
  dokterUuid.value = undefined;
  jadwalDokterPayload.value = [];

  // Reset date filters
  startDateFilter.value = new Date();
  startDateFilter.value.setHours(0, 0, 0, 0);
  endDateFilter.value = new Date();
  endDateFilter.value.setHours(0, 0, 0, 0);

  // Reset DataTable data
  data.value = [...defaultData];
  replace(defaultData);

  data.value.forEach((item) => {
    item.day = undefined;
    item.startTime = new Date();
    item.startTime.setHours(0, 0, 0, 0);
    item.endTime = new Date();
    item.endTime.setHours(0, 0, 0, 0);
    item.kuotaJkn = "0";
    item.kuotaNonJkn = "0";
    item.durasiPelayanan = "0";
  });
}

// Function untuk menghapus row
const removeRow = (index: number) => {
  remove(index); // hapus di field array vee-validate
  data.value.splice(index, 1); // hapus di sumber DataTable
};

const selectedPatient = ref([]);
</script>

<template>
  <CustomDialog
    :fullScreen="true"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
    class="relative"
  >
    <template #header>{{ title }} Jadwal</template>
    <template #body>
      <div class="flex flex-col gap-3 mt-5 max-h-svh">
        <div class="flex gap-2.5 w-full">
          <CustomSelect
            label="Poliklinik"
            place-holder="Pilih Poliklinik"
            v-model="poliUuid"
            :options="jadwalPoliPayload"
            optionValue="uuid"
            optionLabel="name"
            class="mr-5 w-3/4 text-black"
            :invalid="!!errors.poliUuid"
            :invalidMessage="errors.poliUuid"
          />
          <CustomTextfield
            label="Kode Antrian Poli"
            v-model="selectedPoliCode"
            placeholder="Kode Antrian Poli"
            class="w-1/4"
            :disabled="isDokterDisabled"
            :readOnly="true"
          />
        </div>
        <div class="flex gap-2.5 w-full">
          <CustomSelect
            label="Nama Dokter"
            place-holder="Cari & Pilih Nama Dokter"
            prependIcon="PhMagnifyingGlass"
            v-model="dokterUuid"
            :options="jadwalDokterPayload"
            optionValue="uuid"
            optionLabel="pegawai.name"
            class="mr-5 w-3/4 text-black"
            :disabled="isDokterDisabled"
            :invalid="!!errors.dokterUuid"
            :invalidMessage="errors.dokterUuid"
          />
          <CustomTextfield
            label="Kode Antrian Dokter"
            v-model="selectedDokterCode"
            placeholder="Kode Antrian Dokter"
            class="w-1/4"
            :disabled="isCodeDoctorDisabled"
            :readOnly="true"
          />
        </div>
        <hr />
        <div class="overflow-y-auto relative">
          <DataTable
            v-model:selection="selectedPatient"
            :value="data"
            tableStyle="min-width: 50rem"
            class="text-black"
            stripedRows
            scrollable
            scrollHeight="500px"
            :pt="{ headerRow: 'text-SM' }"
          >
            <Column field="No." headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">No.</div>
              </template>
              <template #body="slotProps">
                <div class="text-center">
                  <div class="text-sm">{{ slotProps.index + 1 }}</div>
                </div>
              </template>
            </Column>
            <Column field="hari" header="Hari" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <CustomSelect
                  place-holder="Pilih Hari"
                  v-model="slotProps.data.day"
                  :options="itemsHari"
                  optionValue="code"
                  optionLabel="name"
                  class="text-sm text-black"
                  label=""
                  :invalid="!slotProps.data.day"
                  invalidMessage="Hari harus dipilih"
                />
              </template>
            </Column>
            <Column
              field="jam praktek"
              header="Jam Praktek"
              headerClass="bg-adameds-50"
              class="max-w-60"
            >
              <template #body="slotProps">
                <div class="flex items-center space-x-2">
                  <CustomDatePicker
                    place-holder="00:00"
                    timeOnly
                    v-model="slotProps.data.startTime"
                    label=""
                    class="w-[120px] text-xs text-grey-400"
                    :invalid="!slotProps.data.startTime"
                  />
                  <PhMinus class="mx-[5px] text-black" />
                  <CustomDatePicker
                    place-holder="00:00"
                    timeOnly
                    v-model="slotProps.data.endTime"
                    label=""
                    class="w-[120px] text-grey-400 text-sm"
                    :invalid="isEndTimeInvalid(slotProps.data)"
                    invalidMessage="Jam selesai harus lebih besar dari jam mulai"
                  />
                </div>
              </template>
            </Column>
            <Column
              field="durasi per-pasien"
              headerClass="bg-adameds-50 whitespace-nowrap"
            >
              <template #header>
                <div
                  class="flex justify-center items-center w-full h-full font-bold"
                >
                  Durasi Per-pasien
                  <small class="block ml-1 text-xs font-normal text-gray-500"
                    >(Auto)</small
                  >
                </div>
              </template>
              <template #body="slotProps">
                <div
                  class="flex justify-center items-center whitespace-nowrap text-SM"
                >
                  {{ slotProps.data.durasiPelayanan }} menit
                </div>
              </template>
            </Column>
            <Column field="slot jkn" headerClass="bg-adameds-50">
              <template #header>
                <div
                  class="flex justify-center items-center w-full h-full font-bold"
                >
                  Slot JKN
                </div>
              </template>
              <template #body="slotProps">
                <div class="flex justify-center items-center">
                  <CustomInputNumber
                    class="w-[120px] h-[40px]"
                    placeholder="0"
                    v-model:modelValue="slotProps.data.kuotaJkn"
                    type="number"
                    :showLabel="false"
                    :invalid="
                      !slotProps.data.kuotaJkn ||
                      slotProps.data.kuotaJkn === '0'
                    "
                  >
                    <template #appendText>
                      <div class="flex items-center mr-2">Slot</div>
                    </template>
                  </CustomInputNumber>
                </div>
              </template>
            </Column>
            <Column field="slot non-jkn" headerClass="bg-adameds-50">
              <template #header>
                <div
                  class="flex justify-center items-center w-full h-full font-bold"
                >
                  Slot Non-JKN
                </div>
              </template>
              <template #body="slotProps">
                <div class="flex justify-center items-center">
                  <CustomInputNumber
                    class="w-[120px] h-[40px]"
                    placeholder="0"
                    v-model:modelValue="slotProps.data.kuotaNonJkn"
                    type="number"
                    :showLabel="false"
                    :invalid="
                      !slotProps.data.kuotaNonJkn ||
                      slotProps.data.kuotaNonJkn === '0'
                    "
                  >
                    <template #appendText>
                      <div class="flex items-center mr-2">Slot</div>
                    </template>
                  </CustomInputNumber>
                </div>
              </template>
            </Column>
            <Column
              field="total_kuota"
              headerClass="bg-adameds-50 whitespace-nowrap"
            >
              <template #header>
                <div
                  class="flex justify-center items-center w-full h-full font-bold"
                >
                  Total Kuota
                </div>
              </template>
              <template #body="slotProps">
                <div
                  class="flex justify-center items-center whitespace-nowrap text-SM"
                >
                  {{
                    (parseInt(slotProps.data.kuotaJkn) || 0) +
                    (parseInt(slotProps.data.kuotaNonJkn) || 0)
                  }}
                  Pasien
                </div>
              </template>
            </Column>
            <Column field="" headerClass="bg-adameds-50 whitespace-nowrap">
              <template #header>
                <div
                  class="flex justify-center items-center w-full h-full font-bold"
                >
                  Status
                </div>
              </template>
              <template #body="slotProps">
                <div class="flex justify-center items-center w-full">
                  <CustomSwitch
                    v-model="slotProps.data.aktif"
                    :showLabel="false"
                    sideLabelTrue="Aktif"
                    sideLabel="Non - Aktif"
                  />
                </div>
              </template>
            </Column>
            <Column
              field="action"
              headerClass="bg-adameds-50 whitespace-nowrap"
            >
              <template #header>
                <div
                  class="flex justify-center items-center w-full h-full font-bold"
                >
                  Action
                </div>
              </template>
              <template #body="slotProps">
                <div class="flex justify-center items-center">
                  <CustomButton
                    icon="PhTrash"
                    textColor="text-white"
                    backgroundColor="bg-red-500"
                    @click="removeRow(slotProps.index)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div
          class="flex justify-center items-center p-5 rounded-lg border border-dashed border-adameds-300"
        >
          <CustomButton
            class=""
            icon="PhPlus"
            label="Jadwal Hari"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="addRow"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <div class="flex gap-2.5 justify-end mt-5">
          <CustomButton
            label="Reset"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
            @click="handleReset"
          />
          <CustomButton label="Simpan" @click="onSubmit" />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
