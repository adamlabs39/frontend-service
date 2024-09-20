<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import DialogTambahAlkesMultiple from "./DialogTambahAlkesMultiple.vue";
const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
  formDetail: {
    type: Array as () => Array<string>,
    default: () => ["ORDER", "PROSES", "SELESAI"],
  },
});

const orderAlkess = ref<any[]>([]);

const orderAlkesSchema = toTypedSchema(
  yup.object({
    selectedLokasiTujuanOrder: yup.string(),
    petugas: yup.string().required("Petugas harus diisi"),
  })
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

const statusList = [
  { label: "ORDER", bgColor: "bg-[#D4D8DC]", textColor: "text-[#687077]" },
  {
    label: "PROSES",
    bgColor: "bg-blueJeans-75",
    textColor: "text-blueJeans-400",
  },
  { label: "SELESAI", bgColor: "bg-mint-75", textColor: "text-mint-400" },
];

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

const onSubmit = handleSubmit((values) => {
  const payload = {
    ...values,
    datas: JSON.parse(JSON.stringify(orderAlkess.value)), // Tambahkan data dari tabel
  };
  console.log("Submitted with", payload);
});

const deleteAlkes = (index: number) => {
  orderAlkess.value.splice(index, 1);
};

const resetFormFields = () => {
  orderAlkess.value = [];
};

function handleAddMultiple() {
  dialogTambahMultipleData.value.isVisible = true;
}

function addToArray(newAlkes:any) {
    orderAlkess.value.push(...newAlkes)
    console.log(orderAlkess.value);
}

const accordion = ref<HTMLCanvasElement | null>(null);
const open = () => {
  if (accordion.value) {
    (accordion.value as any).open();
  }
};
const close = () => {
  if (accordion.value) {
    (accordion.value as any).close();
  }
};
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" v-if="props.method === 'form'" ref="accordion">
    <template #header>Order Alkes</template>
    <template #content>
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

          <Column headerClass="bg-adameds-50" class="w-1/2">
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

          <Column headerClass="bg-adameds-50 " class="w-[150px]">
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
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="props.method == 'form'"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
          @click="resetForm"
        />
        <CustomButton
          v-if="props.method == 'form'"
          label="Simpan Order"
          @click="onSubmit"
        />
        <CustomButton v-else label="Edit" />
      </div>
       <DialogTambahAlkesMultiple
              v-model:isDialogVisible="dialogTambahMultipleData.isVisible"
              :title="dialogTambahMultipleData.title"
              @add-alkes="addToArray"
            />
    </template>
  </CustomAccordion>

  <CustomAccordion v-else headerClass="bg-adameds-50">
    <template #header>Alkes</template>
    <template #content>
      <div class="flex flex-col gap-2.5 pt-5">
        <CustomAccordion
          v-for="(status, index) in statusList"
          :key="index"
          headerClass="bg-adameds-50"
        >
          <template #header>
            <div class="flex justify-between w-full">
              <div class="flex justify-start gap-2.5 items-center">
                <div>ORD1234</div>
                <CustomChip
                  :label="status.label"
                  :show-checked-icon="false"
                  :bgColor="status.bgColor"
                  :textColor="status.textColor"
                  customClass="h-6 pr-[6px] border-none w-auto"
                />
              </div>
              <div>Tgl. Order : 01-01-2024</div>
            </div>
          </template>
          <template #content>
            <div class="pt-5">
              <DataTable class="text-xs">
                <Column
                  headerClass="bg-adameds-50 font-semibold text-SM"
                  class="w-2 text-center"
                >
                  <template #header>
                    <div class="text-center">No.</div>
                  </template>
                  <template #body="slotProps">
                    <div class="flex items-center justify-center">
                      {{ slotProps.index + 1 }}
                    </div>
                  </template>
                </Column>

                <Column
                  headerClass="bg-adameds-50"
                  class="max-w-[300px] text-left"
                >
                  <template #header>
                    <div class="w-full font-semibold text-left">
                      List Tindakan
                    </div>
                  </template>
                  <template #body="slotProps">
                    <div>
                      {{ slotProps.data.label }}
                    </div>
                  </template>
                </Column>

                <Column headerClass="bg-adameds-50" class="w-auto text-center">
                  <template #header>
                    <div class="w-full font-semibold">Jumlah</div>
                  </template>
                  <template #body="slotProps">
                    {{ slotProps.data.jumlah }}
                  </template>
                </Column>
                <Column headerClass="bg-adameds-50" class="w-auto text-center">
                  <template #header>
                    <div class="w-full font-semibold">Satuan</div>
                  </template>
                  <template #body="slotProps">
                    {{ slotProps.data.satuan }}
                  </template>
                </Column>

                <Column headerClass="bg-adameds-50" class="w-auto text-end">
                  <template #header>
                    <div class="w-full font-semibold">Harga</div>
                  </template>
                  <template #body="slotProps">
                    {{ slotProps.data.harga }}
                  </template>
                </Column>
              </DataTable>
              <div class="pt-5">
                <CustomInfoRow label="Petugas" value="Nama Petugas " />
              </div>
            </div>
           
          </template>
          <template #footer>
            <div class="flex justify-end gap-3">
              <CustomButton
                v-if="status.label === 'ORDER'"
                label="Batal Order"
                backgroundColor="bg-danger-300"
              />
            </div>
          </template>
        </CustomAccordion>
      </div>
    </template>
  </CustomAccordion>
</template>
