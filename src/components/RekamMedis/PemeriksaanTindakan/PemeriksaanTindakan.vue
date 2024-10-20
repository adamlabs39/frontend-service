<script lang="ts" setup>
import { ref, onMounted, onBeforeMount, computed, watch } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import HistoriPemeriksaanTindakan from "@/components/RekamMedis/PemeriksaanTindakan/HistoriPemeriksaanTindakan.vue";

const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
});

const isEditing = ref(props.method === "form");
const emit = defineEmits(["edit", "submit"]);

const tambahTindakan = ref();
const detail = ref();
const deletedData = ref<any[]>([]);
const selectedItems = ref<any[]>([]);
const cariItemMultiple = ref();
const itemsPetugas = ref(["dr.Spesialis Sp. M", "Perawat"]);
const products = ref<any[]>([]);
onMounted(() => {
  products.value = [
    { nama: "Pemeriksaan Poli Umum", harga: 100000, mode: "Single" },
    { nama: "Pemeriksaan Poli Gigi", harga: 50000, mode: "Multiple" },
    { nama: "Pemeriksaan Poli Mata", harga: 50000, mode: "Single" },
  ];
});

const schema = toTypedSchema(
  yup.object({
    datas: yup.array().of(
      yup.object({
        namaTindakan: yup.string().required("List tindakan harus dipilih"),
        hargaTindakan: yup.number(),
        qtyTindakan: yup.number(),
        petugas: yup
          .array()
          .of(yup.string())
          .min(1, "Petugas harus dipilih")
          .required("Petugas harus dipilih"),
      })
    ),
  })
);

const { errors, handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    datas: [
      { namaTindakan: "", hargaTindakan: 0, qtyTindakan: 0, petugas: [] },
    ],
  },
});
const { remove, push, fields } = useFieldArray("datas");

const myPushFunction = (index: any) => {
  const newItem = {
    namaTindakan: "",
    hargaTindakan: 0,
    qtyTindakan: 0,
    petugas: [],
    isNew: true,
  };

  push(newItem);
};
const onSubmit = handleSubmit((values: any) => {
  const parseData = JSON.parse(JSON.stringify(deletedData.value));
  const allData = [...values.datas, ...parseData];
  console.log(allData);
  emit("submit", allData);
  isEditing.value = false;
});

const toggleEdit = () => {
  isEditing.value = true;
  emit("edit");
};

const getHargaTindakan = (namaTindakan: string) => {
  const tindakan = products.value.find(
    (product) => product.nama === namaTindakan
  );
  return tindakan ? tindakan.harga : 0;
};

const getModeTindakan = (namaTindakan: string) => {
  const tindakan = products.value.find(
    (product) => product.nama === namaTindakan
  );
  return tindakan ? tindakan.mode : "Multiple";
};

const handleRemove = (index: number) => {
  const item = fields.value[index].value;
  const parseItem = JSON.parse(JSON.stringify(item));

  if (parseItem.isNew) {
    remove(index);
  } else {
    const deletedItem = { ...parseItem, isDeleted: true };
    const parseDelete = JSON.parse(JSON.stringify(deletedItem));
    deletedData.value.push(parseDelete);
    remove(index);
  }
};

onBeforeMount(async () => {
  setValues({
    datas: [
      {
        namaTindakan: "Pemeriksaan Poli Gigi",
        hargaTindakan: 0,
        qtyTindakan: 3,
        petugas: ["dr.Spesialis Sp. M"],
      },
      {
        namaTindakan: "Pemeriksaan Poli Mata",
        hargaTindakan: 100000,
        qtyTindakan: 1,
        petugas: ["dr.Spesialis Sp. M"],
      },
    ],
  });
});

interface TindakanData {
  namaTindakan: string;
  hargaTindakan?: number;
  qtyTindakan?: number;
  petugas: (string | undefined)[];
  isNew?: boolean;
}

const resetNewData = () => {
  const allItems = fields.value.map((field) => field.value as TindakanData);
  const newItems = allItems.filter((item) => item.isNew);

  if (newItems.length > 0) {
    const updatedItems = allItems.filter((item) => !item.isNew);
    resetForm({
      values: { datas: updatedItems },
    });
    console.log("Data yang di-reset:", newItems);
  } else {
    console.log("Tidak ada data yang perlu di-reset.");
  }
};

const addToSelectedItems = (item: any) => {
  const selectedProduct = products.value.find(
    (product) => product.nama === item
  );
  if (selectedProduct) {
    selectedItems.value.push({
      namaTindakan: selectedProduct.nama,
      hargaTindakan: selectedProduct.harga,
      qtyTindakan: selectedProduct.mode === "Single" ? 1 : 0,
      petugas: [],
      isNew: true,
    });
    cariItemMultiple.value = "";
  }
};
const removeFromSelectedItems = (index: any) => {
  selectedItems.value.splice(index, 1);
};
const handleTambahMultiple = () => {
  selectedItems.value.forEach((item) => {
    push(item);
  });
  selectedItems.value = [];
  tambahTindakan.value = false;
};

watch(tambahTindakan, (newValue) => {
  if (!newValue) {
    cariItemMultiple.value = "";
    selectedItems.value = [];
  }
});

const historyDialog = ref(false);
const showDialogHistory = () => {
  historyDialog.value = true;
};

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

defineExpose({
  open,
  close,
});
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" ref="accordion">
    <template #header>Pemeriksaan dan Tindakan</template>
    <template #content>
      <div class="pt-5">
        <div v-if="method == 'form'" class="flex flex-col">
          <CustomButton
            @click="showDialogHistory"
            class="!rounded-md my-[10px] ml-auto"
            label="Riwayat Pemeriksaan"
            size="small"
            icon="PhClockCounterClockwise"
          />
          <hr class="mb-[30px]" />
        </div>
        <DataTable :value="fields" class="text-xs bg-adameds-50">
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="w-full text-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>
          <Column
            headerClass="bg-adameds-50"
            :class="isEditing ? 'w-2/6' : 'w-3/4'"
          >
            <template #header>
              <div class="font-semibold">List Tindakan</div>
            </template>
            <template #body="slotProps">
              <CustomSelect
                v-if="isEditing"
                prepend-icon="PhMagnifyingGlass"
                v-model="slotProps.data.value.namaTindakan"
                :options="products"
                optionValue="nama"
                optionLabel="nama"
                label=""
                place-holder="Pilih Tindakan"
                @change="
                  slotProps.data.value.qtyTindakan =
                    getModeTindakan(slotProps.data.value.namaTindakan) ===
                    'Single'
                      ? 1
                      : slotProps.data.value.qtyTindakan
                "
                :disabled="!slotProps.data.value.isNew"
                :invalid="!slotProps.data.value.namaTindakan"
              />
              <ErrorMessage
                :name="`datas[${slotProps.index}].namaTindakan`"
                class="pt-10 text-danger-300 text-XS"
              />
              <div v-if="!isEditing">
                {{ slotProps.data.value.namaTindakan }}
              </div>
            </template>
          </Column>
          <Column v-if="isEditing" headerClass="bg-adameds-50">
            <template #header>
              <div class="font-semibold">Harga</div>
            </template>
            <template #body="slotProps">
              <div
                :class="{
                  'text-grey-300':
                    getHargaTindakan(slotProps.data.value.namaTindakan) === 0,
                }"
              >
                Rp.
                {{
                  (slotProps.data.value.hargaTindakan = getHargaTindakan(
                    slotProps.data.value.namaTindakan
                  ))
                }}
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-[150px]">
            <template #header>
              <div class="w-full font-semibold text-center">Jumlah</div>
            </template>
            <template #body="slotProps">
              <div
                v-if="
                  getModeTindakan(slotProps.data.value.namaTindakan) ===
                    'Single' && isEditing
                "
                class="w-full text-center"
              >
                <span> {{ (slotProps.data.value.qtyTindakan = 1) }}</span>
              </div>
              <div v-if="!isEditing" class="w-full text-center">
                <span> {{ slotProps.data.value.qtyTindakan }}</span>
              </div>

              <div v-else>
                <CustomInputNumber
                  v-if="
                    getModeTindakan(slotProps.data.value.namaTindakan) ===
                      'Multiple' && isEditing
                  "
                  :show-label="false"
                  v-model="slotProps.data.value.qtyTindakan"
                  :show-buttons="true"
                  :disabled="!slotProps.data.value.isNew"
                  @change="
                    slotProps.data.value.namaTindakan === null
                      ? 0
                      : slotProps.data.value.qtyTindakan
                  "
                />
              </div>
            </template>
          </Column>
          <Column v-if="isEditing" headerClass="bg-adameds-50" class="w-2/6">
            <template #header>
              <div class="w-full font-semibold text-center">Petugas</div>
            </template>
            <template #body="slotProps">
              <CustomMultiSelect
                prepend-icon="PhMagnifyingGlass"
                v-model="slotProps.data.value.petugas"
                :options="itemsPetugas"
                optionValue=""
                optionLabel=""
                label=""
                place-holder="Pilih Petugas"
                :disabled="!slotProps.data.value.isNew"
                :invalid="!slotProps.data.value.petugas"
              />
              <ErrorMessage
                :name="`datas[${slotProps.index}].petugas`"
                class="pt-10 text-danger-300 text-XS"
              />
            </template>
          </Column>
          <Column v-if="isEditing" headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Action</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                <CustomButton
                  label=""
                  background-color="bg-danger-300 rounded-lg"
                  @click="handleRemove(slotProps.index)"
                >
                  <img src="@/assets/icons/delete.svg" alt="" width="15px" />
                </CustomButton>
              </div>
            </template>
          </Column>
          <Column v-if="!isEditing" headerClass="bg-adameds-50" class="w-1/4">
            <template #header>
              <div class="w-full font-semibold text-end">Harga</div>
            </template>
            <template #body="slotProps">
              <div
                :class="{
                  'text-grey-300':
                    getHargaTindakan(slotProps.data.value.namaTindakan) === 0,
                }"
                class="w-full text-end"
              >
                Rp.
                {{
                  (slotProps.data.value.hargaTindakan = getHargaTindakan(
                    slotProps.data.value.namaTindakan
                  ))
                }}
              </div>
            </template>
          </Column>
        </DataTable>
        <div
          v-if="isEditing"
          class="flex items-center justify-center p-5 m-5 border border-dashed rounded-lg border-adameds-300 gap-2.5"
        >
          <CustomButton
            icon="PhPlus"
            label="Tambah Tindakan"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="myPushFunction"
          />
          <CustomButton
            icon="PhPlus"
            label="Tambah Tindakan Multiple"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="tambahTindakan = true"
          />
        </div>
        <CustomDialog
          width="800px"
          class=""
          v-model:visible="tambahTindakan"
          headerBg="bg-adameds-300"
        >
          <template #header> Tambah Tindakan Multiple </template>
          <template #body>
            <div class="flex flex-col gap-5 mt-5">
              <div class="flex items-end w-full gap-5">
                <CustomSelect
                  prepend-icon="PhMagnifyingGlass"
                  :options="products"
                  optionValue="nama"
                  optionLabel="nama"
                  v-model="cariItemMultiple"
                  label="Cari Item"
                  place-holder="Asuhan Keperawatan"
                  class="grow"
                />
                <CustomButton @click="addToSelectedItems(cariItemMultiple)">
                  <PhPlus :size="16" />
                </CustomButton>
              </div>
              <DataTable
                :value="selectedItems"
                tableStyle="min-width: 40rem"
                stripedRows
                class="text-xs"
                scrollable
                scrollHeight="flex"
              >
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
                <Column
                  field="namaTindakan"
                  header="List Tindakan"
                  headerClass="bg-adameds-50"
                ></Column>
                <Column
                  field="hargaTindakan"
                  header="Harga"
                  headerClass="bg-adameds-50"
                ></Column>
                <Column headerClass="bg-adameds-50">
                  <template #header>
                    <div
                      class="flex items-center justify-center w-full font-semibold text-SM"
                    >
                      Action
                    </div>
                  </template>
                  <template #body="slotProps">
                    <div class="flex items-center gap-2.5 justify-center">
                      <CustomButton
                        label=""
                        background-color="bg-danger-300 rounded-lg"
                        class="h-6 w-[26px] p-0"
                        @click="removeFromSelectedItems(slotProps.index)"
                      >
                        <img src="@/assets/icons/delete.svg" alt="" />
                      </CustomButton>
                    </div>
                  </template>
                </Column>
              </DataTable>
              <hr class="border-grey-200" />
              <div class="font-semibold text-MD">
                Total Item Terpilih : {{ selectedItems.length }}
              </div>
            </div>
          </template>
          <template #footer>
            <div class="w-full">
              <hr class="-mx-5 border-grey-200" />
              <div class="mt-5 flex justify-end gap-2.5">
                <CustomButton
                  label="Batal"
                  border-color="border-grey-200"
                  background-color="bg-white"
                  text-color="text-grey-300"
                  @click="tambahTindakan = false"
                >
                </CustomButton>
                <CustomButton label="Simpan" @click="handleTambahMultiple">
                </CustomButton>
              </div>
            </div>
          </template>
        </CustomDialog>
        <CustomDialog
          headerBg="bg-adameds-300"
          width="800px"
          v-model:visible="detail"
        >
          <template #header>
            <div>Detail Pemeriksaan dan Tindakan</div>
          </template>
          <template #body>
            <DataTable
              :value="fields"
              tableStyle="min-width: 40rem"
              stripedRows
              class="mt-5 text-xs"
              scrollable
              scrollHeight="flex"
            >
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
              <Column
                field="value.namaTindakan"
                header="List Tindakan"
                headerClass="bg-adameds-50"
              ></Column>
              <Column
                field="value.hargaTindakan"
                header="Harga"
                headerClass="bg-adameds-50"
              ></Column>
              <Column headerClass="bg-adameds-50">
                <template #header>
                  <div class="flex items-center w-full font-semibold text-SM">
                    Petugas
                  </div>
                </template>
                <template #body="slotProps">
                  <div class="flex flex-wrap gap-2">
                    <div
                      v-for="items in slotProps.data.value.petugas"
                      :key="items"
                    >
                      <CustomChip
                        :label="items"
                        :showCheckedIcon="false"
                        border-color="border-none"
                        bg-color="bg-adameds-300"
                        customClass="text-xs font-semibold cursor-auto h-5 bg-adameds-300 text-white"
                      />
                    </div>
                  </div>
                </template>
              </Column>
            </DataTable>
          </template>
          <template #footer v-if="!isEditing">
            <div>
              <CustomButton label="Edit" @click="toggleEdit" />
            </div>
          </template>
        </CustomDialog>
        <!-- Dialog History -->
        <CustomDialog class="" v-model:visible="historyDialog" width="80%">
          <template #header>Pemeriksaan Fisik</template>
          <template #body>
            <div
              class="pt-5 grid grid-cols-[1fr_min-content_1fr_min-content_1fr]"
            >
              <div class="mb-[18px] flex justify-between col-span-5">
                <div class="font-semibold text-grey-400">
                  Riwayat Sebelumnya
                </div>
                <div class="flex">
                  <CustomButton
                    @click="() => {}"
                    class="!rounded-md mr-[10px]"
                    size="small"
                    icon="PhCaretLeft"
                  />
                  <CustomButton
                    @click="() => {}"
                    class="!rounded-md"
                    size="small"
                    icon="PhCaretRight"
                  />
                </div>
              </div>
              <HistoriPemeriksaanTindakan
                @showDetail="detail = true"
                :fields="fields"
                :product="products"
              />
              <div class="border border-adameds-300 mx-[15px]"></div>
              <HistoriPemeriksaanTindakan
                @showDetail="detail = true"
                :fields="fields"
                :product="products"
              />
              <div class="border border-adameds-300 mx-[15px]"></div>
              <HistoriPemeriksaanTindakan
                @showDetail="detail = true"
                :fields="fields"
                :product="products"
              />
            </div>
          </template>
        </CustomDialog>
      </div>
    </template>
    <template #footer>
      <div v-if="isEditing" class="flex items-end justify-end gap-3">
        <CustomButton
          @click="resetNewData()"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton label="Simpan" @click="onSubmit" />
      </div>
      <div v-if="!isEditing" class="flex justify-between">
        <CustomButton label="Detail" icon="DetailIcon" @click="detail = true" />

        <CustomButton label="Edit" @click="toggleEdit" />
      </div>
    </template>
  </CustomAccordion>
</template>
