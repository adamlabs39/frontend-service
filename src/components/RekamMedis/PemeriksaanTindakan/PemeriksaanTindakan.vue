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
import { utilsStore } from "@/stores/utils";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import { useTarifStore } from "@/stores/datamaster/tarif";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";

// NOTE Store
const storeUtils = utilsStore();
const praktisiStore = usePraktisiStore();
const tarifStore = useTarifStore();
const rekamMedisStore = useRekamMedisStore();

const props = defineProps({
  method: {
    type: String,
    default: "detail",
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

const isEditing = ref(props.method === "form");
const emit = defineEmits(["edit", "submit", "editAsesmen"]);

const tambahTindakan = ref();
const detail = ref();
const deletedData = ref<any[]>([]);
const selectedItems = ref<any[]>([]);
const cariItemMultiple = ref();
const products = ref<any[]>([]);

onMounted(() => {
  try {
    storeUtils.setLoading(true);
    fetchPraktisi();
    fetchTarif();
  } catch (error) {
    console.error("Failed to get data", error);
  } finally {
    storeUtils.setLoading(false);
  }
});

const praktisiPayload = ref<any[]>([]);
const tarifPayload = ref<any[]>([]);
const fetchPraktisi = async () => {
  try {
    const response = await praktisiStore.getAktifApi();
    if (response && response.payload) {
      praktisiPayload.value = response.payload;
    } else {
      praktisiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch praktisi", error);
    praktisiPayload.value = [];
  }
};
const fetchTarif = async () => {
  try {
    const response = await tarifStore.getApi(1, 9999, "", "Tindakan");
    if (response && response.payload) {
      const filteredTarif = response.payload.filter((tarifData: any) =>
        tarifData.pelayanan.some(
          (pelayananData: any) => pelayananData.unitPelayanan == 1
        )
      );
      tarifPayload.value = filteredTarif;
    } else {
      tarifPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch tarif", error);
    tarifPayload.value = [];
  }
};

const schema = toTypedSchema(
  yup.object({
    datas: yup.array().of(
      yup.object({
        tindakan: yup.mixed<any>().required("Tindakan harus dipilih"),
        hargaTindakan: yup.number(),
        qtyTindakan: yup.number().min(1, "Jumlah setidaknya harus 1"),
        petugas: yup
          .array()
          .of(yup.mixed<any>())
          .min(1, "Petugas harus dipilih")
          .required("Petugas harus dipilih"),
        isNew: yup.boolean(),
      })
    ),
  })
);

const { errors, handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    datas: [
      {
        tindakan: null,
        hargaTindakan: 0,
        qtyTindakan: 1,
        petugas: [],
        isNew: true,
      },
    ],
  },
});
const { remove, push, fields } = useFieldArray("datas");

const myPushFunction = (index: any) => {
  const newItem = {
    tindakan: "",
    hargaTindakan: 0,
    qtyTindakan: 1,
    petugas: [],
    isNew: true,
  };

  push(newItem);
};

interface PayloadPetugasData {
  nama: string;
  isDoctor: boolean;
  practitionerUuid: string;
}

interface PayloadTindakanData {
  tarifUuid: string;
  namaTindakan: string;
  hargaTindakan: number;
  qtyTindakan: number;
  isMcu: boolean;
  petugas: PayloadPetugasData[];
  isNew?: boolean;
  isDeleted?: boolean;
}

const onSubmit = handleSubmit(async (values: any) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  // const parseData = JSON.parse(JSON.stringify(deletedData.value));
  // const allData = [...values.datas, ...parseData];
  // console.log(allData);
  // emit("submit", allData);
  // isEditing.value = false;
  try {
    storeUtils.setLoading(true);
    const payloadData: PayloadTindakanData[] = values.datas.map(
      (tindakanData: any) => {
        // Membuat array petugas menggunakan map
        const payloadPetugas: PayloadPetugasData[] = tindakanData.petugas.map(
          (petugasData: any) => ({
            nama: petugasData.pegawai.name,
            isDoctor: petugasData.isDoctor,
            practitionerUuid: petugasData.uuid,
          })
        );

        // Membuat objek tindakan, dengan menggunakan spread untuk properti opsional
        const tempData: TindakanData = {
          tarifUuid: tindakanData.tindakan.uuid,
          namaTindakan: tindakanData.tindakan.name,
          hargaTindakan: tindakanData.tindakan.grandTotal,
          qtyTindakan: tindakanData.qtyTindakan,
          isMcu: tindakanData.tindakan.isMcu,
          petugas: payloadPetugas,
          ...(tindakanData.isNew && { isNew: true }),
          ...(tindakanData.isDeleted && { isDeleted: true }),
        };

        return tempData;
      }
    );
    const response = await rekamMedisStore.insertTindakan({
      sessionUuid: props.sessionUuid,
      data: payloadData,
    });
    if (response && response.payload) {
      rekamMedisStore.setAsesmentRekamMedisData(response.payload);
    }
    console.log("🚀 ~ onSubmit ~ payloadData:", payloadData);
  } catch (error) {
    console.error("Failed to post data", error);
  } finally {
    storeUtils.setLoading(false);
  }
});

const toggleEdit = () => {
  isEditing.value = true;
  emit("edit");
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

const setFormData = () => {
  if (rekamMedisStore.openedRekamMedis.data.pemeriksaanTindakan?.length) {
    const tempTindakan =
      rekamMedisStore.openedRekamMedis.data.pemeriksaanTindakan;

    const reversedData = tempTindakan.map(
      (tindakanData: PayloadTindakanData) => {
        const petugas = tindakanData.petugas.map(
          (petugasData: PayloadPetugasData) => ({
            uuid: petugasData.practitionerUuid,
            isDoctor: petugasData.isDoctor,
            pegawai: {
              name: petugasData.nama,
            },
          })
        );

        return {
          tindakan: {
            uuid: tindakanData.tarifUuid,
            name: tindakanData.namaTindakan,
            grandTotal: tindakanData.hargaTindakan,
            isMcu: tindakanData.isMcu,
          },
          qtyTindakan: tindakanData.qtyTindakan,
          petugas,
        };
      }
    );
    setValues({
      datas: reversedData,
    });
  } else resetForm();
};

onBeforeMount(async () => {
  setFormData();
});

// NOTE Untuk merefresh form yang sedang dibuka jika ada perubahan data
const storedRMData = computed(() => rekamMedisStore.openedRekamMedis);
watch(storedRMData, (newRM) => {
  setFormData();
});

interface TindakanData {
  tindakan: any;
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
  selectedItems.value.push({
    tindakan: item,
    qtyTindakan: item.mode === "Single" ? 1 : 0,
    petugas: [],
    isNew: true,
  });
  cariItemMultiple.value = "";
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
              <div v-if="isEditing">
                <CustomSelect
                  prepend-icon="PhMagnifyingGlass"
                  v-model="slotProps.data.value.tindakan"
                  :options="tarifPayload"
                  optionLabel="name"
                  optionValue=""
                  dataKey="uuid"
                  label=""
                  place-holder="Pilih Tindakan"
                  :disabled="!slotProps.data.value.isNew"
                  :invalid="!slotProps.data.value.tindakan"
                />
                <ErrorMessage
                  :name="`datas[${slotProps.index}].tindakan`"
                  class="pt-10 text-danger-300 text-XS"
                />
              </div>
              <div v-if="!isEditing">
                {{ slotProps.data.value.tindakan?.name }}
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
                    slotProps.data.value.tindakan?.grandTotal === 0,
                }"
              >
                Rp.
                {{ slotProps.data.value.tindakan?.grandTotal ?? 0 }}
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-[150px]">
            <template #header>
              <div class="w-full font-semibold text-center">Jumlah</div>
            </template>
            <template #body="slotProps">
              <div v-if="!isEditing" class="w-full text-center">
                <span> {{ slotProps.data.value.qtyTindakan }}</span>
              </div>
              <div v-else>
                <CustomInputNumber
                  v-if="
                    slotProps.data.value.tindakan?.mode === 'Multiple' &&
                    isEditing
                  "
                  :show-label="false"
                  v-model="slotProps.data.value.qtyTindakan"
                  :show-buttons="true"
                  :disabled="!slotProps.data.value.isNew"
                  @change="
                    slotProps.data.value.tindakan === null
                      ? 0
                      : slotProps.data.value.qtyTindakan
                  "
                />
                <div v-else-if="isEditing" class="w-full text-center">
                  <span>1</span>
                </div>
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
                :options="praktisiPayload"
                optionLabel="pegawai.name"
                optionValue=""
                dataKey="uuid"
                label=""
                place-holder="Pilih Petugas"
                :disabled="!slotProps.data.value.isNew"
                :invalid="slotProps.data.value.petugas.length == 0"
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
                    slotProps.data.value.tindakan?.grandTotal === 0,
                }"
                class="w-full text-end"
              >
                Rp.
                {{ slotProps.data.value.tindakan?.grandTotal ?? 0 }}
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
                  :options="tarifPayload"
                  optionLabel="name"
                  optionValue=""
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
                  field="tindakan.name"
                  header="List Tindakan"
                  headerClass="bg-adameds-50"
                ></Column>
                <Column
                  field="tindakan.grandTotal"
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
                field="value.tindakan.name"
                header="List Tindakan"
                headerClass="bg-adameds-50"
              ></Column>
              <Column
                field="value.tindakan.grandTotal"
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
                        :label="items.pegawai.name"
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
              <CustomButton label="Edit" @click="emit('editAsesmen')" />
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

        <CustomButton label="Edit" @click="emit('editAsesmen')" />
      </div>
    </template>
  </CustomAccordion>
</template>
