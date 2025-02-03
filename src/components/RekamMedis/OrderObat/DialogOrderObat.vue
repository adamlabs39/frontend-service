<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import { onMounted, ref } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import DialogTambahObat from "./DialogTambahObat.vue";
import DialogEdit from "./DialogEdit.vue";
import DialogObatRacikan from "./DialogObatRacikan.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";
import { useDoctorPrescriptionStore } from "@/stores/farmasi/DoctorPrescription";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();
const doctorPrescriptionStore = useDoctorPrescriptionStore();
const stockLocationStore = useStockLocationStore();

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Tambah",
  },
  method: {
    type: String,
    default: "add",
  },
  rmType: {
    type: String,
    default: "rawat-jalan",
  },
  patientData: {
    type: Object,
  },
  rmUuid: {
    type: String,
    default: "",
  },
  sessionUuid: {
    type: String,
    default: "",
  },
});

const dialogTambahData = ref({
  isVisible: false,
  title: "Tambah Obat",
});

const dialogEditData = ref({
  isVisible: false,
  title: "Edit",
  obatToEdit: null as any | null,
});

// Untuk Tambah,dan Edit Racikan Data
const dialogRacikanData = ref({
  isVisible: false,
  title: "Tambah Obat Racikan",
  obatToEdit: null as any | null,
});

const emit = defineEmits(["update:isDialogVisible", "submitOrder"]);

function updateVisibility(value: boolean) {
  emit("update:isDialogVisible", value);
}

const orderObatschema = toTypedSchema(
  yup.object({
    selectedLokasiTujuanOrder: yup.string(),
    obatPulang: yup.bool(),
  })
);

const { errors, handleSubmit, resetForm, defineField } = useForm({
  validationSchema: orderObatschema,
  initialValues: {
    selectedLokasiTujuanOrder: "",
    obatPulang: false,
  },
});

const [selectedLokasiTujuanOrder] = defineField("selectedLokasiTujuanOrder");
const [obatPulang] = defineField("obatPulang");

const listLokasiTujuanOrder = ref<any[]>([]);
const orderObats = ref<any[]>([]);

onMounted(async () => {
  await fetchLokasiTujuanStok();
});

const fetchLokasiTujuanStok = async () => {
  const response = await stockLocationStore.getApi(
    1,
    9999,
    "",
    "",
    props.rmType == "rawat-inap"
      ? "0"
      : props.rmType == "rawat-jalan"
      ? "1"
      : props.rmType == "igd"
      ? "2"
      : "3"
  );
  if (response && response.payload) {
    listLokasiTujuanOrder.value = response.payload.filter(
      (lokasiTujuan: any) => lokasiTujuan.status
    );
  }
};

const dialogDetailData = ref({
  isVisible: false,
  title: "",
  obatDetail: null as any | null,
});

const selectedObatIndex = ref(0);

// SUPAYA DIALOG MUNCUL

function handleAdd() {
  dialogTambahData.value.isVisible = true;
  console.log("ononnon");
}

// Detail Dialog
function handleDetail() {
  const obatDetail = orderObats.value;
  dialogDetailData.value = {
    isVisible: true,
    title: "Detail Obat",
    obatDetail: obatDetail,
  };
}

function handleAddRacikan() {
  dialogRacikanData.value.isVisible = true;
}

function handleCloseEdit() {
  dialogEditData.value.isVisible = false;
}

// Edit Obat (Racikan atau BUKAN)

function handleEdit(index: number) {
  const obatToEdit = orderObats.value[index];

  // Cek apakah obat yang diedit adalah racikan
  if (obatToEdit.namaRacikan) {
    dialogRacikanData.value = {
      isVisible: true,
      title: "Edit Obat Racikan",
      obatToEdit: { ...obatToEdit },
    };
    selectedObatIndex.value = index;
  } else {
    dialogEditData.value = {
      isVisible: true,
      title: "Edit",
      obatToEdit: { ...obatToEdit }, // Clone data obat untuk diedit
    };
    selectedObatIndex.value = index;
  }
  // console.log(dialogRacikanData.value);
}

const handleAddObat = (newObat: any) => {
  orderObats.value.push(...newObat);
}

// Menerima data obat yang diperbarui dari DialogEdit & DialogRacikan
function handleEditObat(updatedObat: any) {
  if (selectedObatIndex.value !== null) {
    orderObats.value[selectedObatIndex.value] = updatedObat;
  }
  handleCloseEdit();
}

function handleAddObatRacikan(newObat: any) {
  if (Array.isArray(newObat)) {
    // Jika yang diterima adalah array, ambil objek pertama saja
    orderObats.value.push(newObat[0]);
  } else {
    // Jika yang diterima adalah satu objek langsung
    orderObats.value.push(newObat);
  }
  console.log(orderObats.value);
}

const deleteObat = (index: number) => {
  orderObats.value.splice(index, 1);
  console.log(orderObats.value.length);
};

const onSubmit = handleSubmit(async (values: any) => {
  try {
    storeUtils.setLoading(true);
    console.log("orderObats", orderObats.value);

    // const response = await doctorPrescriptionStore.createPrescription({
    //   noReg: props.patientData?.noReg,
    //   noRm: props.patientData?.noRm,
    //   isTakeaway: obatPulang.value,
    //   patientUuid: props.patientData?.patient.uuid,
    //   lokasiStokUuid: selectedLokasiTujuanOrder.value,
    //   jenisPelayanan:
    //     props.rmType == "rawat-jalan"
    //       ? "rj"
    //       : props.rmType == "rawat-inap"
    //       ? "ri"
    //       : props.rmType == "igd"
    //       ? "igd"
    //       : "fisio",
    //   sessionUuid: props.sessionUuid,
    //   rekamMedisUuid: props.rmUuid,
    //   obat: orderObats.value,
    // });
    // if (response && response.payload) {
    //   rekamMedisStore.setAsesmentRekamMedisData(response.payload);
    //   resetForm();
    // }
  } catch (error) {
    console.error("Failed to post data", error);
  } finally {
    storeUtils.setLoading(false);
  }
  // const payload = {
  //   ...values,
  //   orderObats: JSON.parse(JSON.stringify(orderObats.value)), // Tambahkan data dari tabel
  // };

  // emit("submitOrder", payload);
  // resetFormFields();
  // emit("update:isDialogVisible", false);

  // console.log("Submitted with", payload);
});

const resetFormFields = () => {
  resetForm();
  orderObats.value = [];
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
      <div class="flex flex-col gap-5 py-3">
        <div class="flex gap-7">
          <CustomSelect
            prepend-icon="PhMagnifyingGlass"
            v-model="selectedLokasiTujuanOrder"
            :options="listLokasiTujuanOrder"
            optionLabel="name"
            optionValue="uuid"
            label="Lokasi Tujuan Order"
            place-holder="Pilih Lokasi Tujuan Order"
            class="grow"
          />

          <CustomSwitch label="Obat Pulang" v-model="obatPulang" />
          <!-- <hr class="h-auto border border-adameds-300" /> -->

          <div class="flex items-end gap-2.5">
            <CustomButton
              icon="PhPlus"
              label="Obat"
              textColor="text-white"
              @click="handleAdd"
            />
            <CustomButton
              icon="PhPlus"
              label="Obat Racikan"
              textColor="text-white"
              @click="handleAddRacikan"
            />
          </div>
        </div>

        <DataTable
          :value="orderObats"
          class="overflow-y-scroll text-xs bg-adameds-50 max-h-[300px]"
          scrollable
          scrollHeight="flex"
          table-style="min-width:50 rem"
        >
          <Column
            headerClass="bg-adameds-50 font-semibold text-SM"
            class="max-w-[60px] text-center"
          >
            <template #header>
              <div class="w-full text-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Nama Obat</div>
            </template>
            <template #body="slotProps">
              <div v-if="slotProps.data.isCompound">
                {{ slotProps.data.namaRacikan }} {{ slotProps.data.satuanEmbalase ? `- ${slotProps.data.satuanEmbalase.name}` : '' }}
              </div>
              <div v-else>
                {{ slotProps.data.itemMedis?.name }}
              </div>
              <div class="flex gap-1.5 justify-left">
                <!-- <CustomChip
                  v-if="slotProps.data.isCompound"
                  :showCheckedIcon="false"
                  label="RACIKAN"
                  bgColor="bg-none"
                  textColor="text-grass-300"
                  customClass="h-5 pr-[6px] border-grass-200 border-1"
                /> -->
                <CustomChip
                  v-if="slotProps.data.isChronic"
                  :showCheckedIcon="false"
                  label="OBAT KRONIS"
                  bgColor="bg-sunFlower-50"
                  textColor="text-sunFlower-300"
                  customClass="h-5 border-sunFlower-300"
                />
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Total Obat</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.medicationDoseQty }}
              {{ slotProps.data.medicationDoseSatuan?.name }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Dosis</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.medicationDoseQty }}
              {{ slotProps.data.medicationDoseSatuan?.name }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Aturan Pakai</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.aturanPakai?.name }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Cara Pakai</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.caraPakai?.caraPakai }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Rute Pemberian</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.route?.rutePemberian }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto">
            <template #header>
              <div class="w-full font-semibold text-center">Status</div>
            </template>
            <template #body="slotProps">
              <div class="flex justify-center gap-1.5">
                <CustomButton
                  label=""
                  background-color="bg-[#3D84E5] rounded-lg"
                  class="h-6 w-[26px] p-0"
                  @click="handleEdit(slotProps.index)"
                >
                  <img src="@/assets/icons/edit.svg" alt="Edit" />
                </CustomButton>
                <CustomButton
                  label=""
                  background-color="bg-danger-300 rounded-lg"
                  class="h-6 w-[26px] p-0"
                  @click="deleteObat(slotProps.index)"
                >
                  <img src="@/assets/icons/delete.svg" alt="Delete" />
                </CustomButton>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- DialogTambahObat -->
      <DialogTambahObat
        v-model:isDialogVisible="dialogTambahData.isVisible"
        :title="dialogTambahData.title"
        :patientData="patientData"
        @add-obat="handleAddObat"
      />

      <!-- DialogEdit -->
      <DialogEdit
        v-model:isDialogVisible="dialogEditData.isVisible"
        :title="dialogEditData.title"
        :obatToEdit="dialogEditData.obatToEdit"
        @update-obat="handleEditObat"
        :index="selectedObatIndex"
      />

      <!-- DialogTambahObatRacikan -->
      <DialogObatRacikan
        v-model:is-dialog-visible="dialogRacikanData.isVisible"
        :title="dialogRacikanData.title"
        @add-obat-racikan="handleAddObatRacikan"
        :index="selectedObatIndex"
        :obatToEdit="dialogRacikanData.obatToEdit"
        @after-edit-obat-racikan="handleEditObat"
      />
    </template>
    <template #footer>
      <div class="w-full">
        <!-- <hr class="-mx-5 border-grey-200" /> -->
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton
            label="Reset"
            borderColor="border-2 border-[#9DA4B1]"
            background-color="bg-transparent"
            text-color="text-grey-300"
            @click="resetFormFields"
          />
          <CustomButton label="Simpan" @click="onSubmit" />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
