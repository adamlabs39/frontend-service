<script lang="ts" setup>
import CustomDialog from "@/components/Base/CustomDialog.vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { onMounted, ref } from "vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import DialogTambahAlkesMultiple from "./DialogTambahAlkesMultiple.vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
import { useMedicalItemStore } from "@/stores/datamasterFarmasi/MedicalItem";
import { useRoomPharmacyStore } from "@/stores/farmasi/RoomPharmacy";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();
const stockLocationStore = useStockLocationStore();
const medicalItemStore = useMedicalItemStore();
const roomPharmacyStore = useRoomPharmacyStore();

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Tambah",
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
  rmDate: {
    type: String,
    default: "",
  },
});

const orderAlkess = ref<any[]>([]);

const emit = defineEmits(["update:isDialogVisible", "submit-order"]);

function updateVisibility(value: boolean) {
  emit("update:isDialogVisible", value);
}

const orderAlkesSchema = toTypedSchema(
  yup
    .object({
      selectedLokasiTujuanOrder: yup.string(),
      petugas: yup.string().required("Petugas harus diisi"),
    })
    .noUnknown()
);
const { handleSubmit, resetForm, defineField } = useForm({
  validationSchema: orderAlkesSchema,
  initialValues: {
    selectedLokasiTujuanOrder: "",
    petugas: "Nama Petugas",
  },
});

const [selectedLokasiTujuanOrder] = defineField("selectedLokasiTujuanOrder");
const [petugas] = defineField("petugas");

const listLokasiTujuanOrder = ref([]);

onMounted(async () => {
  await fetchLokasiTujuanStok();
  await getListAlkes();
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

const getListAlkes = async () => {
  const response = await medicalItemStore.getWithoutPaginationApi("alkes");
  if (response && response.payload) {
    listAlkes.value = response.payload;
  }
};

const dialogTambahMultipleData = ref({
  isVisible: false,
  title: "Tambah Alkes Multiple",
});

const listAlkes = ref([]);

const myPushFunction = () => {
  orderAlkess.value.push({
    listAlkes: null,
    qty: 0,
  });
};

function handleAddMultiple() {
  dialogTambahMultipleData.value.isVisible = true;
}

const deleteAlkes = (index: number) => {
  orderAlkess.value.splice(index, 1);
};

const onSubmit = handleSubmit(async (values) => {
  const payloadListAlkes = orderAlkess.value.map((dataAlkes) => {
    return { itemMedisUuid: dataAlkes?.listAlkes?.uuid, qty: dataAlkes.qty };
  });

  try {
    storeUtils.setLoading(true);
    const response = await roomPharmacyStore.createApi({
      noReg: props.patientData?.noReg,
      patientUuid: props.patientData?.patient.uuid,
      noRm: props.patientData?.noRm,
      jenisPelayanan:
        props.rmType == "rawat-jalan"
          ? "rj"
          : props.rmType == "rawat-inap"
          ? "ri"
          : props.rmType == "igd"
          ? "igd"
          : "fisio",
      rekamMedisUuid: props.rmUuid,
      rekamMedisDate: props.rmDate,
      alkes: payloadListAlkes,
      lokasiUuid: selectedLokasiTujuanOrder.value,
      paymentMethod: props.patientData?.paymentMethod,
    });
    if (response && response.payload) {
      rekamMedisStore.setAsesmentRekamMedisData(response.payload);
      handleCloseDialog();
      emit("submit-order");
      emit("update:isDialogVisible", false);
    }
  } catch (error) {
    console.error("Failed to post data", error);
  } finally {
    storeUtils.setLoading(false);
  }

  // const payload = {
  //   ...values,
  //   datas: JSON.parse(JSON.stringify(orderAlkess.value)), // Tambahkan data dari tabel
  // };
  // console.log("Submitted with", payload);
});

const handleCloseDialog = () => {
  resetForm();
  orderAlkess.value = [];
};

// Terima data dari Alkes Multiple
function addToArray(newAlkes: any) {
  orderAlkess.value.push(...newAlkes);
}
</script>

<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    headerBg="bg-adameds-300"
    @update:visible="updateVisibility"
    @close-dialog="handleCloseDialog"
  >
    <template #header>{{ title }}</template>
    <template #body>
      <div class="flex flex-col gap-5 py-3">
        <CustomSelect
          prepend-icon="PhMagnifyingGlass"
          v-model="selectedLokasiTujuanOrder"
          :options="listLokasiTujuanOrder"
          optionLabel="name"
          optionValue="uuid"
          label="Lokasi Tujuan Order"
          place-holder="Pilih Lokasi Tujuan Order"
          class="w-1/3"
        />
        <DataTable
          :value="orderAlkess"
          tableStyle="min-width: 50rem"
          class="overflow-hidden text-xs rounded-lg bg-adameds-50"
        >
          <Column
            headerClass="bg-adameds-50 font-semibold text-SM"
            class="w-[20px]"
          >
            <template #header>
              <div class="flex items-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>

          <Column headerClass="bg-adameds-50" class="w-[500px]">
            <template #header>
              <div class="font-semibold">List Alkes</div>
            </template>
            <template #body="slotProps">
              <CustomSelect
                prepend-icon="PhMagnifyingGlass"
                v-model="slotProps.data.listAlkes"
                :options="listAlkes"
                optionLabel="name"
                optionValue=""
                dataKey="uuid"
                label=""
                place-holder="Cari & Pilih Tindakan"
              >
                <template #customOptions="{ option }">
                  {{ option.name }} -
                  {{ option.bentukSediaan?.name }}
                  {{ option.manufacture ? `- ${option.manufacture.name}` : "" }}
                </template>
              </CustomSelect>
            </template>
          </Column>

          <Column headerClass="bg-adameds-50 " class="w-[300px]">
            <template #header>
              <div class="w-full font-semibold text-center">Jumlah</div>
            </template>
            <template #body="slotProps">
              <CustomInputNumber
                :show-label="false"
                v-model="slotProps.data.qty"
                :show-buttons="true"
              />
            </template>
          </Column>
          <Column headerClass="bg-adameds-50 w-[300px]">
            <template #header>
              <div class="w-full font-semibold text-center">Satuan</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.listAlkes?.satuanPenggunaan?.name ?? "-" }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-[300px]">
            <template #header>
              <div class="w-full font-semibold text-center">Sisa Stok</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                {{ slotProps.data.listAlkes?.sisaStok ?? " Statis" }}
              </div>
            </template>
          </Column>

          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Action</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                <CustomButton
                  label=""
                  background-color="bg-danger-300 rounded-lg"
                  @click="deleteAlkes(slotProps.index)"
                >
                  <img src="@/assets/icons/delete.svg" alt="" width="15px" />
                </CustomButton>
              </div>
            </template>
          </Column>
        </DataTable>

        <div
          class="flex items-center justify-center p-5 m-5 border border-dashed rounded-lg border-adameds-300 gap-2.5"
        >
          <CustomButton
            icon="PhPlus"
            label="Tambah Alkes"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="myPushFunction"
          />
          <CustomButton
            icon="PhPlus"
            label="Tambah Alkes Multiple"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="handleAddMultiple"
          />
        </div>
      </div>
      <DialogTambahAlkesMultiple
        v-model:isDialogVisible="dialogTambahMultipleData.isVisible"
        :title="dialogTambahMultipleData.title"
        :dataAlkes="listAlkes"
        @add-alkes="addToArray"
      />
    </template>
    <template #footer>
      <div class="flex justify-end">
        <CustomButton label="Simpan Alkes" @click="onSubmit" />
      </div>
    </template>
  </CustomDialog>
</template>
