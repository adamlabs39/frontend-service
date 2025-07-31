<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
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

const defaultData = [
  {
    noJadwal: 1,
    hariModel: "H1",
    startDateFilter: new Date(),
    endDateFilter: new Date(),
    kuota: "20",
    durasi: "20",
    slot_booking: "5",
    slot_jkn: "15",
    slot_non_jkn: "5",
  },
  {
    noJadwal: 2,
    hariModel: "H2",
    startDateFilter: new Date(),
    endDateFilter: new Date(),
    kuota: "20",
    durasi: "20",
    slot_booking: "5",
    slot_jkn: "15",
    slot_non_jkn: "5",
  },
  {
    noJadwal: 3,
    hariModel: "H3",
    startDateFilter: new Date(),
    endDateFilter: new Date(),
    kuota: "20",
    durasi: "20",
    slot_booking: "5",
    slot_jkn: "15",
    slot_non_jkn: "5",
  },
];

// Initialize data with default values
const data = ref([...defaultData]);

const startDateFilter = ref<Date>(new Date());
startDateFilter.value.setHours(0, 0, 0, 0);
const endDateFilter = ref<Date>(new Date());
endDateFilter.value.setHours(0, 0, 0, 0);

const addRow = () => {
  data.value.push({
    noJadwal: data.value.length + 1,
    hariModel: "",
    startDateFilter: startDateFilter.value,
    endDateFilter: endDateFilter.value,
    kuota: "20",
    durasi: "20",
    slot_booking: "5",
    slot_jkn: "5",
    slot_non_jkn: "5",
  });
};

const itemsPoli = ref([
  { name: "Poli Umum", code: "POLI-U" },
  { name: "Poli Anak", code: "POLI-A" },
  { name: "Poli Mata", code: "POLI-M" },
  { name: "Poli Kandungan", code: "POLI-K" },
  { name: "Poli Dalam", code: "POLI-D" },
]);
const itemsHari = ref([
  { name: "Senin", code: "Senin" },
  { name: "Selasa", code: "Selasa" },
  { name: "Rabu", code: "Rabu" },
  { name: "Kamis", code: "Kamis" },
  { name: "Jumat", code: "Jumat" },
]);

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode harus diisi"),
    name: yup.string().required("Nama tindakan harus diisi"),
    dokterModel: yup.string(),
    poliModel: yup.string(),
    hariModel: yup.string(),
    status: yup.bool(),
  })
);

const itemsJadwal = ref([
  {
    noJadwal: "1",
    kuota: "20",
    durasi: "20",
    slot_booking: "5",
    slot_jkn: "5",
  },
  {
    noJadwal: "2",
    kuota: "20",
    durasi: "20",
    slot_booking: "5",
    slot_jkn: "5",
  },
]);

const itemsKeterangan = ref([
  {
    namaDokter: "dr. Nama Dokter Sp. M",
    antrianPoli: "MT",
    antrianDokter: "01",
    spesialis: "Mata (Sp. M)",
    poli: "Poli Mata",
    status: true,
  },
]);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit((values: any) => {
  if (props.method === "edit") {
    // Logic to save edited data
    console.log("Editing data:", values);
  } else if (props.method === "add") {
    // Logic to add new data
    console.log("Adding new data:", values);
  }
  closeDialog();
});

const [code] = defineField("code");
const [name] = defineField("name");
const [dokterModel] = defineField("dokterModel");
const [poliModel] = defineField("poliModel");
const [hariModel] = defineField("hariModel");
const [status] = defineField("status");

const emit = defineEmits(["update:isDialogVisible", "close"]);

function updateVisibility(value: any) {
  emit("update:isDialogVisible", value);
}
function closeDialog() {
  emit("close");
}

// to trigger handleReset at the start
onMounted(() => {
  handleReset();
});

// Tambahkan reactive data untuk mapped jadwal
const mappedJadwalData = ref([]);

watch(
  () => props.editData,
  (newData) => {
    console.log("Data yang diterima dari parent:", newData);

    // Map data dari parent ke format yang sesuai dengan komponen
    if (newData && newData.jadwalDokter) {
      mappedJadwalData.value = newData.jadwalDokter.map((item) => ({
        ...item,
        // Konversi status dari string ke boolean
        status: item.status === "aktif",
        // day sudah sesuai format string, tidak perlu mapping
        day: item.day,
        // Mapping properti lainnya sesuai kebutuhan
        kuota: item.kuotaJkn + item.kuotaNonJkn,
      }));
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (!newValue) {
      resetForm();
      // Reset the DataTable data to the initial default state
      data.value = [...defaultData];
    }
  }
);

function handleReset() {
  // Reset form fields
  resetForm();

  // Clear selections and date filters
  dokterModel.value = "";
  poliModel.value = "";
  hariModel.value = "";
  status.value = true; // Default status value for the form

  // Clear date picker value
  startDateFilter.value = new Date();
  startDateFilter.value.setHours(0, 0, 0, 0);
  endDateFilter.value = new Date();
  endDateFilter.value.setHours(0, 0, 0, 0);

  // Reset the DataTable to its default values
  data.value = defaultData.map((item) => ({
    ...item,
    startDateFilter: new Date(item.startDateFilter.getTime()), // Create a new Date instance to ensure a fresh state
    endDateFilter: new Date(item.endDateFilter.getTime()), // Create a new Date instance to ensure a fresh state
  }));

  // Reset the switches to their default status (e.g., true or false based on the requirement)
  itemsKeterangan.value = itemsKeterangan.value.map((item) => ({
    ...item,
    status: true, // Reset to default status
  }));
}

const selectedPatient = ref([]);
</script>
<template>
  <CustomDialog
    :fullScreen="true"
    width="1000px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Jadwal</template>
    <template #body>
      <div class="flex flex-col gap-5 mt-5">
        <div class="text-lg font-bold text-black">
          {{ editData.doctor.name }}
        </div>
        <hr />
        <div class="grid grid-cols-3 gap-y-0 gap-x-4 ml-2 text-xs text-center">
          <div class="font-bold text-black underline">Poliklinik</div>
          <div class="font-bold text-black underline">Kode Antrian Poli</div>
          <div class="font-bold text-black underline">Kode Antrian Dokter</div>
          <div class="text-sm text-black">{{ editData.poli.name }}</div>
          <div class="text-sm text-black">{{ editData.poli.kodeAntrian }}</div>
          <div class="text-sm text-black">
            {{ editData.doctor.kodeAntrian }}
          </div>
        </div>

        <hr />
        <div class="overflow-y-auto relative">
          <DataTable
            v-if="itemsJadwal.length"
            v-model:selection="selectedPatient"
            :value="mappedJadwalData"
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
                    class="w-[120px] text-grey-400 text-xs"
                  />
                  <PhMinus class="mx-[5px] text-black" />
                  <CustomDatePicker
                    place-holder="00:00"
                    timeOnly
                    v-model="slotProps.data.endTime"
                    label=""
                    class="w-[120px] text-grey-400 text-sm"
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
                </div>
              </template>
              <template #body="slotProps">
                <div class="flex justify-center items-center">
                  <CustomInputNumber
                    class="w-[120px] h-[40px]"
                    placeholder="0"
                    v-model:modelValue="slotProps.data.durasiPelayanan"
                    type="number"
                    :showLabel="false"
                  >
                    <template #appendText>
                      <div class="flex items-center mr-2">mnt</div>
                    </template>
                  </CustomInputNumber>
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
                  {{ slotProps.data.kuota }} Pasien
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
                    v-model="slotProps.data.status"
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
          >
          </CustomButton>
          <CustomButton label="Simpan" @click="onSubmit"> </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
