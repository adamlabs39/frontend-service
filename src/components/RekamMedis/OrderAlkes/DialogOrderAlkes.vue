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

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Tambah",
  },
});

const orderAlkess = ref<any[]>([]);

const emit = defineEmits(["update:isDialogVisible", "submit-order"]);

function updateVisibility(value: boolean) {
  emit("update:isDialogVisible", value);
}

const orderAlkesSchema = toTypedSchema(
  yup.object({
    selectedLokasiTujuanOrder: yup.string(),
    petugas: yup.string().required("Petugas harus diisi"),
  }).noUnknown()
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

const listLokasiTujuanOrder = ref([
  { id: "1", value: "Farmasi Rawat Inap" },
  { id: "2", value: "Farmasi Rawat Jalan" },
]);

onMounted(() => {
  orderAlkess.value = [
    {
      listAlkes: "Kasa",
      jumlah: 2,
      satuan: "Gulung",
      sisaStok: 2000,
    },
  ];
});

const dialogTambahMultipleData = ref({
  isVisible: false,
  title: "Tambah Alkes Multiple",
});

const listAlkes = ref([
  { id: "1", value: "Kasa" },
  { id: "2", value: "Perban" },
  { id: "2", value: "Pil" },
]);

const satuanAlkes = ref([
  { id: "1", value: "Gulung" },
  { id: "2", value: "Kaleng" },
  { id: "2", value: "Botol" },
]);

const myPushFunction = () => {
  orderAlkess.value.push({
    listAlkes: "",
    jumlah: "",
    satuan: "",
    sisaStok: 100,
  });
};

function handleAddMultiple() {
  dialogTambahMultipleData.value.isVisible = true;
}

const deleteAlkes = (index: number) => {
  orderAlkess.value.splice(index, 1);
};

const onSubmit = handleSubmit((values) => {
  const payload = {
    ...values,
    datas: JSON.parse(JSON.stringify(orderAlkess.value)), // Tambahkan data dari tabel
    };
    emit("submit-order", payload);
    resetForm();
    emit('update:isDialogVisible', false); 
    console.log("Submitted with", payload);
});


// Terima data dari Alkes Multiple
function addToArray(newAlkes: any) {
  orderAlkess.value.push(...newAlkes);
  console.log(orderAlkess.value);
}
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
        <CustomSelect
          prepend-icon="PhMagnifyingGlass"
          v-model="selectedLokasiTujuanOrder"
          :options="listLokasiTujuanOrder"
          optionValue="value"
          optionLabel="value"
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
                optionValue="value"
                optionLabel="value"
                label=""
                place-holder="Cari & Pilih Tindakan"
              />
            </template>
          </Column>

          <Column headerClass="bg-adameds-50 " class="w-[200px]">
            <template #header>
              <div class="w-full font-semibold text-center">Jumlah</div>
            </template>
            <template #body="slotProps">
              <CustomInputNumber
                :show-label="false"
                v-model="slotProps.data.jumlah"
                :show-buttons="true"
              />
            </template>
          </Column>
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Satuan</div>
            </template>
            <template #body="slotProps">
              <CustomSelect
                prepend-icon="PhMagnifyingGlass"
                v-model="slotProps.data.satuan"
                :options="satuanAlkes"
                optionValue="value"
                optionLabel="value"
                label=""
                place-holder="Pilih Satuan"
              />
            </template>
          </Column>
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Sisa Stok</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">{{ slotProps.data.sisaStok }}</div>
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
        @add-alkes="addToArray"
      />
    </template>
    <template #footer>
        <div class="flex justify-end">
            <CustomButton label="Simpan Alkes" @click="onSubmit"/>
        </div>
    </template>
  </CustomDialog>
</template>
