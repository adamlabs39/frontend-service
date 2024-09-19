<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";

import DataTable from "primevue/datatable";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { onBeforeMount, ref } from "vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Card from "primevue/card";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import DialogTambahObat from "./DialogTambahObat.vue";
import { onMounted } from "vue";
import DialogEdit from "./DialogEdit.vue";
import DialogObatRacikan from "./DialogObatRacikan.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import DialogDetailObat from "./DialogDetailObat.vue";

const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
});
const orderObats = ref<any[]>([]);

const orderObatschema = toTypedSchema(
  yup.object({
    selectedLokasiTujuanOrder: yup.string(),
  })
);

const { errors, handleSubmit, resetForm, defineField } = useForm({
  validationSchema: orderObatschema,
  initialValues: {
    selectedLokasiTujuanOrder: "",
  },
});

const [selectedLokasiTujuanOrder] = defineField("selectedLokasiTujuanOrder");

const listLokasiTujuanOrder = ref([
  { id: "1", label: "Farmasi Rawat Jalan" },
  { id: "2", label: "Farmasi Rawat Inap" },
]);

onMounted(() => {
  orderObats.value = [
    {
      aturanPakai: "2x Sehari",
      caraPakai: "Setelah Makan",
      namaObat: "Paracetamol",
      rutePemberian: "Rektal",
      satuanDosis: "Sendok Makan",
      catatan: "",
      jumlahKonsumsi: 1,
      jumlahTotal: 1,
      obatKronis: true,
      obatPulang: true,
      periode: "Minggu",
    },
    {
      aturanPakai: "3x Sehari",
      caraPakai: "Setelah Makan",
      namaObat: "Paracetamol",
      rutePemberian: "Rektal",
      satuanDosis: "Sendok Makan",
      catatan: "",
      jumlahKonsumsi: 4,
      jumlahTotal: 1,
      obatKronis: false,
      obatPulang: true,
      periode: "Hari",
    },
    {
      aturanPakai: "2x Sehari",
      caraPakai: "Setelah Makan",
      namaObat: "Paracetamol",
      rutePemberian: "Oral",
      satuanDosis: "Sendok Makan",
      catatan: "",
      jumlahKonsumsi: 1,
      jumlahTotal: 1,
      obatKronis: false,
      obatPulang: false,
      periode: "Minggu",
    },
    {
      namaRacikan: "PuyerIndo",
      aturanPakai: "2x Sehari",
      caraPakai: "Setelah Makan",
      rutePemberian: "Oral",
      satuanDosis: "Sendok Makan",
      catatan: "",
      datas: [{ namaObat: "Amoxan", jumlahTotal: 3 }],
      jumlahKonsumsi: 1,
      obatKronis: false,
      obatPulang: false,
      periode: "Minggu",
      sirup: true,
      racikan: true,
      satuanEmbalase: "Tablet",
      jumlahEmbalase: "1",
    },
  ];
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

// pas detail
const dialogDetailData = ref({
  isVisible: false,
  title: "",
  obatDetail: null as any | null,
});

const selectedObatIndex = ref(0);

// SUPAYA DIALOG MUNCUL

function handleAdd() {
  dialogTambahData.value.isVisible = true;
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

function handleAddObat(newObat: any) {
  orderObats.value.push(...newObat);
  console.log(orderObats.value);
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

const onSubmit = handleSubmit((values) => {
  const payload = {
    ...values,
    orderObats: JSON.parse(JSON.stringify(orderObats.value)), // Tambahkan data dari tabel
  };

  console.log("Submitted with", payload);
});

const resetFormFields = () => {
  resetForm();
  orderObats.value = [];
};
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" v-if="props.method === 'form'">
    <template #header>Order Obat</template>
    <template #content>
      <div class="flex flex-col gap-5 py-3">
        <CustomSelect
          prepend-icon="PhMagnifyingGlass"
          v-model="selectedLokasiTujuanOrder"
          :options="listLokasiTujuanOrder"
          optionValue="label"
          optionLabel="label"
          label="Lokasi Tujuan Order"
          place-holder="Pilih Lokasi Tujuan Order"
          class="w-1/3"
        />
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
              <div v-if="slotProps.data.racikan">
                {{ slotProps.data.namaRacikan }}
                <span v-if="slotProps.data.sirup">- Sirup</span>
              </div>
              <div v-else>
                {{ slotProps.data.namaObat }}
              </div>
              <div class="flex gap-1.5 justify-left">
                <CustomChip
                  v-if="slotProps.data.racikan"
                  :showCheckedIcon="false"
                  label="RACIKAN"
                  bgColor="bg-none"
                  textColor="text-grass-300"
                  customClass="h-5 pr-[6px] border-[#A0D468] border-1"
                />
                <CustomChip
                  v-if="slotProps.data.obatPulang"
                  :showCheckedIcon="false"
                  label="OBAT PULANG"
                  bgColor="bg-none"
                  textColor="text-info-300"
                  customClass="h-5 pr-[6px] border-info-300 min-w-[85px]"
                />
                <CustomChip
                  v-if="slotProps.data.obatKronis"
                  :showCheckedIcon="false"
                  label="OBAT KRONIS"
                  bgColor="bg-none"
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
              {{ slotProps.data.jumlahKonsumsi }}
              {{ slotProps.data.satuanDosis }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Dosis</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.jumlahKonsumsi }}
              {{ slotProps.data.satuanDosis }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Aturan Pakai</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.aturanPakai }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Cara Pakai</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.caraPakai }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Rute Pemberian</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.rutePemberian }}
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
      <div
        class="flex items-center justify-center p-5 my-7 border border-dashed rounded-lg border-adameds-300 gap-2.5"
      >
        <CustomButton
          icon="PhPlus"
          label="Tambah Obat"
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          backgroundColor="bg-white"
          @click="handleAdd"
        />
        <CustomButton
          icon="PhPlus"
          label="Tambah Obat Racikan"
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          backgroundColor="bg-white"
          @click="handleAddRacikan"
        />
      </div>

      <!-- DialogTambahObat -->
      <DialogTambahObat
        v-model:isDialogVisible="dialogTambahData.isVisible"
        :title="dialogTambahData.title"
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
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
          @click="resetFormFields"
        />
        <CustomButton label="Simpan" @click="onSubmit" />
      </div>
    </template>
  </CustomAccordion>

  <CustomAccordion v-else headerClass="bg-adameds-50">
    <template #header>Obat</template>
    <template #content>
      <CustomAccordion headerClass="bg-adameds-50" class="p-5">
        <template #header>
          <div class="flex justify-between w-full">
            <div>RSPK82L</div>
            <div>Tgl. Order : 01-01-2024</div>
          </div>
        </template>
        <template #content>
          <div class="px-5 py-2.5">
            <DataTable
              :value="orderObats"
              class="text-xs bg-adameds-50 min-h-[160px]"
              scrollable
              scrollHeight="flex"
            >
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
                  <div class="w-full font-semibold text-left">Nama Obat</div>
                </template>
                <template #body="slotProps">
                  <div v-if="slotProps.data.racikan">
                    {{ slotProps.data.namaRacikan }}
                    <span v-if="slotProps.data.sirup">- Sirup</span>
                  </div>
                  <div v-else>
                    {{ slotProps.data.namaObat }}
                  </div>
                  <div class="flex gap-1.5 justify-left">
                    <CustomChip
                      v-if="slotProps.data.racikan"
                      :showCheckedIcon="false"
                      label="RACIKAN"
                      bgColor="bg-none"
                      textColor="text-grass-300"
                      customClass="h-5 pr-[6px] border-grass-300 "
                    />
                    <CustomChip
                      v-if="slotProps.data.obatPulang"
                      :showCheckedIcon="false"
                      label="OBAT PULANG"
                      bgColor="bg-none"
                      textColor="text-info-300"
                      customClass="h-5 pr-[6px] border-info-300 min-w-[85px]"
                    />
                    <CustomChip
                      v-if="slotProps.data.obatKronis"
                      :showCheckedIcon="false"
                      label="OBAT KRONIS"
                      bgColor="bg-none"
                      textColor="text-sunFlower-300"
                      customClass="h-5 border-sunFlower-300"
                    />
                  </div>
                </template>
              </Column>

              <Column headerClass="bg-adameds-50" class="w-auto text-left">
                <template #header>
                  <div class="w-full font-semibold text-left">Aturan Pakai</div>
                </template>
                <template #body="slotProps">
                  {{ slotProps.data.aturanPakai }}
                </template>
              </Column>
            </DataTable>

            <div class="pt-5">
              <CustomInfoRow label="Petugas" value="Nama Petugas " />
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-between gap-3">
            <CustomButton
              label="Detail"
              textColor="text-white"
              backgroundColor="bg-adameds-300"
              @click="handleDetail"
            />
            <CustomButton label="Batal Order" backgroundColor="bg-danger-300" />
          </div>
        </template>
      </CustomAccordion>
      <DialogDetailObat
        v-model:is-dialog-visible="dialogDetailData.isVisible"
        :title="dialogDetailData.title"
        :obatDetail="dialogDetailData.obatDetail"
      />
    </template>
  </CustomAccordion>
</template>
