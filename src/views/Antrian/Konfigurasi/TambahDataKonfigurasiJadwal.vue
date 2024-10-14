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
});

const defaultData = [
  {
    noJadwal: 1,
    hariModel: undefined,
    startDateFilter: new Date(),
    endDateFilter: new Date(),
    kuota: "20",
    durasi: "0",
    slot_jkn: "0",
    slot_non_jkn: "0",
  },
  {
    noJadwal: 2,
    hariModel: undefined,
    startDateFilter: new Date(),
    endDateFilter: new Date(),
    kuota: "20",
    durasi: "0",
    slot_jkn: "0",
    slot_non_jkn: "0",
  },
];

defaultData.forEach((item) => item.startDateFilter.setHours(0, 0, 0, 0));
defaultData.forEach((item) => item.endDateFilter.setHours(0, 0, 0, 0));

// Initialize data with default values
const data = ref([...defaultData]);

const startDateFilter = ref<Date>(new Date());
startDateFilter.value.setHours(0, 0, 0, 0);
const endDateFilter = ref<Date>(new Date());
endDateFilter.value.setHours(0, 0, 0, 0);

const addRow = () => {
  data.value.push({
    noJadwal: data.value.length + 1,
    hariModel: undefined,
    startDateFilter: new Date(startDateFilter.value),
    endDateFilter: new Date(endDateFilter.value),
    kuota: "20",
    durasi: "0",
    slot_jkn: "0", // Corrected from slot_jkn to slotJkn
    slot_non_jkn: "0", // Added missing slotNonJkn for consistency
  });
};

const itemsDokter = ref([
  { name: "dr. Umum", code: "DR-U" },
  { name: "dr. Spesialis Sp. A", code: "DR-A" },
  { name: "dr. Spesialis Sp. M", code: "DR-M" },
  { name: "dr. Spesialis Sp. Og", code: "DR-OG" },
  { name: "dr. Spesialis Sp. D", code: "DR-D" },
]);
const itemsPoli = ref([
  { name: "Poli Umum", code: "POLI-U" },
  { name: "Poli Anak", code: "POLI-A" },
  { name: "Poli Mata", code: "POLI-M" },
  { name: "Poli Kandungan", code: "POLI-K" },
  { name: "Poli Dalam", code: "POLI-D" },
]);
const itemsHari = ref([
  { name: "Senin", code: "H1" },
  { name: "Selasa", code: "H2" },
  { name: "Rabu", code: "H3" },
  { name: "Kamis", code: "H4" },
  { name: "Jumat", code: "H5" },
  { name: "Sabtu", code: "H6" },
  { name: "Minggu", code: "H7" },
]);

const frekuensiNadi = ref<number | undefined>(undefined);

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
  dokterModel.value = undefined;
  poliModel.value = undefined;
  hariModel.value = undefined;
  status.value = false; // or default value if required

  // Clear date picker value
  startDateFilter.value = new Date();
  startDateFilter.value.setHours(0, 0, 0, 0);
  endDateFilter.value = new Date();
  endDateFilter.value.setHours(0, 0, 0, 0);

  // Reset the DataTable to its default values
  data.value = [...defaultData];

  // Ensure that CustomSelect, CustomDatePicker, and CustomInputNumber are reset properly
  data.value.forEach((item) => {
    // Reset select and date pickers
    item.hariModel = undefined;
    item.startDateFilter = new Date();
    item.startDateFilter.setHours(0, 0, 0, 0);
    item.endDateFilter = new Date();
    item.endDateFilter.setHours(0, 0, 0, 0);

    // Reset input number fields
    item.kuota = "20"; // or default value
    item.durasi = "0"; // or default value
    item.slot_jkn = "0"; // or default value
    item.slot_non_jkn = "0"; // or default value
  });
}

const selectedPatient = ref([]);
</script>
<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Jadwal</template>
    <template #body>
      <div class="flex flex-col gap-3 mt-5">
        <div class="flex gap-2.5 w-full">
          <CustomSelect
            label="Poliklinik"
            place-holder="Pilih Poliklinik"
            v-model="poliModel"
            :options="itemsPoli"
            optionValue="code"
            optionLabel="name"
            class="w-3/4 mr-5 text-black"
          />
          <CustomTextfield
            label="Kode Antrian Poli"
            v-model="poliModel"
            :options="itemsPoli"
            Value="code"
            placeholder="Kode Antrian Poli"
            class="w-1/4"
            disabled
          />
        </div>
        <div class="flex gap-2.5 w-full">
          <CustomSelect
            label="Nama Dokter"
            place-holder="Cari & Pilih Nama Dokter"
            prependIcon="PhMagnifyingGlass"
            v-model="dokterModel"
            :options="itemsDokter"
            optionValue="code"
            optionLabel="name"
            class="w-3/4 mr-5 text-black"
          />
          <CustomTextfield
            label="Kode Antrian Dokter"
            v-model="dokterModel"
            :options="itemsDokter"
            Value="code"
            placeholder="Kode Antrian Dokter"
            class="w-1/4"
            disabled
          />
        </div>
        <hr />
        <div class="relative overflow-y-auto" style="max-height: 190px">
          <DataTable
            v-if="itemsJadwal.length"
            v-model:selection="selectedPatient"
            :value="data"
            tableStyle="min-width: 50rem"
            class="text-black"
            stripedRows
            scrollable
            :scrollHeight="'flex'"
            :pt="{ headerRow: 'text-SM' }"
          >
            <Column field="No." headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">No.</div>
              </template>
              <template #body="slotProps">
                <div class="text-center">
                  <div class="text-sm">{{ slotProps.data.noJadwal }}</div>
                </div>
              </template>
            </Column>
            <Column field="hari" header="Hari" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <CustomSelect
                  place-holder="Pilih Hari"
                  v-model="slotProps.data.hariModel"
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
            >
              <template #body="slotProps">
                <div class="flex items-center space-x-2">
                  <CustomDatePicker
                    place-holder="00:00"
                    timeOnly
                    v-model="slotProps.data.startDateFilter"
                    label=""
                    class="w-[90px] text-grey-400 text-xs"
                  />
                  <PhMinus class="mx-[5px] text-black" />
                  <CustomDatePicker
                    place-holder="00:00"
                    timeOnly
                    v-model="slotProps.data.endDateFilter"
                    label=""
                    class="w-[90px] text-grey-400 text-sm"
                  />
                </div>
              </template>
            </Column>
            <Column
              field="durasi per-pasien"
              header="Durasi Per-pasien"
              headerClass="bg-adameds-50 whitespace-nowrap"
            >
              <template #body="slotProps">
                <CustomInputNumber
                  placeholder="0"
                  v-model:modelValue="slotProps.data.durasi"
                  type="number"
                  :showLabel="false"
                >
                  <template #appendText>
                    <div class="flex items-center mr-2">mnt</div>
                  </template>
                </CustomInputNumber>
              </template>
            </Column>
            <Column
              field="slot jkn"
              header="Slot JKN"
              headerClass="bg-adameds-50"
            >
              <template #body="slotProps">
                <CustomInputNumber
                  placeholder="0"
                  v-model:modelValue="slotProps.data.slot_jkn"
                  type="number"
                  :showLabel="false"
                >
                  <template #appendText>
                    <div class="flex items-center mr-2">Slot</div>
                  </template>
                </CustomInputNumber>
              </template>
            </Column>

            <Column
              field="slot non-jkn"
              header="Slot Non-JKN"
              headerClass="bg-adameds-50"
            >
              <template #body="slotProps">
                <CustomInputNumber
                  placeholder="0"
                  v-model:modelValue="slotProps.data.slot_non_jkn"
                  type="number"
                  :showLabel="false"
                >
                  <template #appendText>
                    <div class="flex items-center mr-2">Slot</div>
                  </template>
                </CustomInputNumber>
              </template>
            </Column>
            <Column
              field="total_kuota"
              header="Total Kuota"
              headerClass="bg-adameds-50 whitespace-nowrap"
            >
              <template #body="slotProps">
                <div class="text-SM whitespace-nowrap">
                  {{ slotProps.data.kuota }} Pasien
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div
          class="flex items-center justify-center p-5 border border-dashed rounded-lg border-adameds-300"
        >
          <CustomButton
            icon="PhPlus"
            label="Jadwal Hari"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="addRow"
          />
        </div>
        <hr />
        <div class="flex items-end gap-2.5 text-black">
          <CustomSwitch v-model="status" label="Status" />
          <div>{{ status ? "Aktif" : "Non-Aktif" }}</div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <div class="mt-5 flex justify-end gap-2.5">
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
