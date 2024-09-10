<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const isEditing = ref(props.method === "form");
const tambahTindakan = ref()

const schema = toTypedSchema(
  yup.object({
    datas: yup.array().of(
      yup.object({
        namaTindakan: yup.string().required("List tindakan harus dipilih"),
        hargaTindakan: yup.number(),
        qtyTindakan: yup.number(),
        petugas: yup.array().of(yup.string()).required("Petugas harus dipilih"),
      })
    ),
  })
);

const { errors, handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,

  initialValues: {
    datas: [
      { namaTindakan: "", hargaTindakan: 0, qtyTindakan: 0, petugas: []},
    ],
  },
});

const { remove, push, fields } = useFieldArray("datas");

const myPushFunction = () => {
  push({ namaTindakan: "", hargaTindakan: 0, qtyTindakan: 0, petugas: [] });
};

const onSubmit = handleSubmit((values: any) => {
  console.log("Adding new data:", values);
});

const products = ref<any[]>([]);
onMounted(() => {
  products.value = [
    { nama: "Pemeriksaan Poli Umum", harga: 100000, mode: "Single" },
    { nama: "Pemeriksaan Poli Gigi", harga: 50000, mode: "Multiple" },
    { nama: "Pemeriksaan Poli Mata", harga: 50000, mode: "Single" },
  ];
});

// Function to get hargaTindakan from the product based on namaTindakan
const getHargaTindakan = (namaTindakan: string) => {
  const tindakan = products.value.find(
    (product) => product.nama === namaTindakan
  );
  
  return tindakan ? tindakan.harga : 0;
};

// Function to get the mode (Single/Multiple) of the selected tindakan
const getModeTindakan = (namaTindakan: string) => {
  const tindakan = products.value.find(
    (product) => product.nama === namaTindakan
  );
  return tindakan ? tindakan.mode : "Multiple";
};
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Pemeriksaan dan Tindakan</template>
    <template #content>
      <div v-if="isEditing" class="pt-5">
        <DataTable :value="fields" tableStyle="min-width: 50rem" class="text-xs bg-adameds-50">
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="flex items-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-2/6">
            <template #header>
              <div class="font-semibold">List Tindakan</div>
            </template>
            <template #body="slotProps">
              <CustomSelect prepend-icon="PhMagnifyingGlass" v-model="slotProps.data.value.namaTindakan"
                :options="products" optionValue="nama" optionLabel="nama" label="" place-holder="Pilih Tindakan"
                @change="
                  slotProps.data.value.qtyTindakan =
                  getModeTindakan(slotProps.data.value.namaTindakan) ===
                    'Single'
                    ? 0
                    : slotProps.data.value.qtyTindakan
                  " />
              <ErrorMessage :name="`datas[${slotProps.index}].namaTindakan`" class="text-danger-300" />
            </template>
          </Column>
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="font-semibold">Harga</div>
            </template>
            <template #body="slotProps">
              <div :class="{
                'text-grey-300':
                  getHargaTindakan(slotProps.data.value.namaTindakan) === 0,
              }">
                Rp. {{ slotProps.data.value.hargaTindakan=getHargaTindakan(slotProps.data.value.namaTindakan) }}
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-[150px]">
            <template #header>
              <div class="w-full font-semibold text-center">Jumlah</div>
            </template>
            <template #body="slotProps">

              <div v-if="getModeTindakan(slotProps.data.value.namaTindakan) === 'Single'" class="w-full text-center">
                <span> {{ slotProps.data.value.qtyTindakan=1 }}</span>
              </div>
              <div v-else>
                <CustomInputNumber :show-label="false" v-model="slotProps.data.value.qtyTindakan"
                  :show-buttons="true" />
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-2/6">
            <template #header>
              <div class="w-full font-semibold text-center">Petugas</div>
            </template>
            <template #body="slotProps">
              <CustomMultiSelect prepend-icon="PhMagnifyingGlass" v-model="slotProps.data.value.petugas"
                :options="[{ name: 'dr.Spesialis Sp. M' }, { name: 'Perawat' }]" optionValue="name" optionLabel="name"
                label="" place-holder="Pilih Petugas" />
              <ErrorMessage :name="`datas[${slotProps.index}].petugas`" class="text-danger-300" />
            </template>
          </Column>
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Action</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                <CustomButton label="" background-color="bg-danger-300 rounded-lg" @click="remove(slotProps.index)">
                  <img src="@/assets/icons/delete.svg" alt="" width="15px" />
                </CustomButton>
              </div>
            </template>
          </Column>
        </DataTable>
        <div
          class="flex items-center justify-center p-5 m-5 border border-dashed rounded-lg border-adameds-300 gap-2.5">
          <CustomButton icon="PhPlus" label="Tambah Tindakan" borderColor="border-adameds-300"
            textColor="text-adameds-300" backgroundColor="bg-white" @click="myPushFunction" />
          <CustomButton icon="PhPlus" label="Tambah Tindakan Multiple" borderColor="border-adameds-300"
            textColor="text-adameds-300" backgroundColor="bg-white" @click="tambahTindakan = true" />
        </div>
        <CustomDialog width="800px" class="" v-model:visible="tambahTindakan" headerBg="bg-adameds-300">
          <template #header> Tambah Tindakan Multiple </template>
          <template #body>
            <div class="flex flex-col gap-5 mt-5">
              <div class="flex items-end w-full gap-5">
                <CustomSelect prepend-icon="PhMagnifyingGlass" label="Cari Item" place-holder="Asuhan Keperawatan"
                  class="grow" />
                <CustomButton>
                  <PhPlus :size="16" />
                </CustomButton>
              </div>
              <DataTable :value="products" tableStyle="min-width: 40rem" stripedRows class="text-xs" scrollable
                scrollHeight="flex">
                <Column headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold text-center">No.</div>
                  </template>
                  <template #body="slotProps">
                    <div class="flex items-center justify-center">
                      {{ slotProps.index + 1 }}
                    </div>
                  </template>
                </Column>
                <Column field="nama" header="Nama Obat" headerClass="bg-adameds-50"></Column>
                <Column field="harga" header="Harga" headerClass="bg-adameds-50"></Column>
                <Column headerClass="bg-adameds-50">
                  <template #header>
                    <div class="flex items-center justify-center w-full font-semibold text-SM">
                      Action
                    </div>
                  </template>
                  <template #body="slotProps">
                    <div class="flex items-center gap-2.5 justify-center">
                      <CustomButton label="" background-color="bg-danger-300 rounded-lg" class="h-6 w-[26px] p-0">
                        <img src="@/assets/icons/delete.svg" alt="" />
                      </CustomButton>
                    </div>
                  </template>
                </Column>
              </DataTable>
              <hr class="border-grey-200" />
              <div class="font-semibold text-MD">Total Item Terpilih : 2</div>
            </div>
          </template>
          <template #footer>
            <div class="w-full">
              <hr class="-mx-5 border-grey-200" />
              <div class="mt-5 flex justify-end gap-2.5">
                <CustomButton label="Batal" border-color="border-grey-200" background-color="bg-white"
                  text-color="text-grey-300">
                </CustomButton>
                <CustomButton label="Simpan"> </CustomButton>
              </div>
            </div>
          </template>
        </CustomDialog>
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton v-if="isEditing" @click="resetForm" label="Reset" textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent" borderColor="border-2 border-[#9DA4B1]" />
        <CustomButton v-if="isEditing" label="Simpan" @click="onSubmit" />
      </div>
    </template>
  </CustomAccordion>
</template>