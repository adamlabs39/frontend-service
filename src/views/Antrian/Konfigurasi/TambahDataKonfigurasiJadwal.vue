<script lang="ts" setup>
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
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
  { noJadwal: 1, hariModel: undefined, startDateFilter: new Date(), kuota: "20", durasi: "20", slot_booking: "5", slot_jkn: "5" },
  { noJadwal: 2, hariModel: undefined, startDateFilter: new Date(), kuota: "20", durasi: "20", slot_booking: "5", slot_jkn: "5" },
];

defaultData.forEach(item => item.startDateFilter.setHours(0, 0, 0, 0));

// Initialize data with default values
const data = ref([...defaultData]);

const startDateFilter = ref<Date>(new Date());
startDateFilter.value.setHours(0, 0, 0, 0);

const addRow = () => {
  data.value.push({
    noJadwal: data.value.length + 1,
    hariModel: undefined, 
    startDateFilter: startDateFilter.value,
    kuota: "20",
    durasi: "20",
    slot_booking: "5",
    slot_jkn: "5",
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
  
  // Reset the DataTable to its default values
  data.value = [...defaultData];
  
  // Ensure that CustomSelect and CustomDatePicker are reset properly
  data.value.forEach(item => {
    item.hariModel = undefined;  // Reset each entry's hariModel
    item.startDateFilter = new Date(); // Reset each entry's startDateFilter
    item.startDateFilter.setHours(0, 0, 0, 0); // Ensure time is set to start of the day
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
      <div class="flex flex-col gap-5 mt-5">
        <div class="flex gap-2.5 w-full">
          <CustomSelect
            label="Nama Dokter"
            place-holder="Cari & Pilih Nama Dokter"
            prependIcon="PhMagnifyingGlass"
            v-model="dokterModel"
            :options="itemsDokter"
            optionValue="code"
            optionLabel="name"
            class="w-2/3 mr-5 text-black"
          />
          <CustomSelect
            label="Poli"
            place-holder="Poli"
            v-model="poliModel"
            :options="itemsPoli"
            optionValue="code"
            optionLabel="name"
            class="w-1/3"
            disabled
          />
        </div>
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
                <CustomDatePicker
                  place-holder="00:00"
                  timeOnly
                  v-model="slotProps.data.startDateFilter"
                  label=""
                  class="w-[200px] text-grey-400 text-sm"
                />
              </template>
            </Column>
            <Column field="kuota" header="Kuota" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.kuota }} Pasien</div>
              </template>
            </Column>
            <Column
              field="durasi per-pasien"
              header="Durasi Per-Pasien"
              headerClass="bg-adameds-50"
            >
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.durasi }} Menit</div>
              </template>
            </Column>
            <Column
              field="slot booking"
              header="Slot Booking"
              headerClass="bg-adameds-50"
            >
              <template #body="slotProps">
                <div class="text-SM">
                  {{ slotProps.data.slot_booking }} Slot
                </div>
              </template>
            </Column>
            <Column
              field="slot jkn mobile"
              header="Slot JKN Mobile"
              headerClass="bg-adameds-50"
            >
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.slot_jkn }} Slot</div>
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
          <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <hr class="-mx-5 border-grey-200" />
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
