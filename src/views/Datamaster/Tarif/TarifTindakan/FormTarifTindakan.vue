<script lang="ts" setup>
import { ref, watch, onMounted, computed } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { usePenjaminStore } from "@/stores/datamaster/penjamin";
import { useTarifStore } from "@/stores/datamaster/tarif";
import { useTindakanStore } from "@/stores/datamaster/tindakan";
import { useKomponenTarifStore } from "@/stores/datamaster/komponenTarif";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import TableKomponenTarifTindakan from "@/components/Datamaster/TableKomponenTarifTindakan.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

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
  payload: {
    type: Object,
    default: () => ({}),
  },
});

const tarifStore = useTarifStore();
const penjaminStore = usePenjaminStore();
const tindakanStore = useTindakanStore();
const komponenTarifStore = useKomponenTarifStore();
const penjaminPayload = ref<any[]>([]);
const tindakanPayload = ref<any[]>([]);
const komponenTarifPayload = ref<any[]>([]);

const fetchPenjamin = async () => {
  try {
    const response = await penjaminStore.getApi();
    if (response && response.payload) {
      penjaminPayload.value = response.payload;
    } else {
      penjaminPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch penjamin", error);
    penjaminPayload.value = [];
  }
};

const fetchTindakan = async () => {
  try {
    const response = await tindakanStore.getApi();
    if (response && response.payload) {
      tindakanPayload.value = response.payload;
    } else {
      tindakanPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch tindakan", error);
    tindakanPayload.value = [];
  }
};
const fetchKomponenTarif = async () => {
  try {
    const response = await komponenTarifStore.getApi();
    if (response && response.payload) {
      komponenTarifPayload.value = response.payload;
    } else {
      komponenTarifPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch komponen tarif", error);
    komponenTarifPayload.value = [];
  }
};

onMounted(() => {
  fetchPenjamin();
  fetchTindakan();
  fetchKomponenTarif();
});

const optionsPelayanan = ref([
  { label: "IGD", value: 1 },
  { label: "Rawat Jalan", value: 2 },
  { label: "Rawat Inap", value: 3 },
]);

const optionsLab = ref([
  { name: "SGOT", harga: 50000, uuid: "456789" },
  { name: "SGPT", harga: 10000, uuid: "987654" },
]);

const schema = toTypedSchema(
  yup.object({
    jenisTarif: yup.string().default("Tindakan"),
    code: yup.string().required("Kode Tarif harus diisi"),
    name: yup.string(),
    grandTotal: yup.number(),
    mode: yup.string(),
    status: yup.bool().default(false),
    isMcu: yup.bool().default(false),
    unitPelayanan: yup.array().of(
      yup.object({
        unitPelayanan: yup.number().required("Unit Pelayanan harus dipilih"),
      })
    ),
    penjamin: yup.array().of(
      yup.object({
        penjaminUuid: yup.string(),
      })
    ),
    tindakanPoli: yup.array().of(
      yup.object({
        tindakanUuid: yup.string().required("Tindakan harus dipilih"),
        listKomponenTarif: yup.array().of(
          yup.object({
            tarifKomponenUuid: yup
              .string()
              .required("Komponen Tarif harus dipilih"),
            tarifPerKomponen: yup.number().required("Harga bed harus diisi"),
          })
        ),
      })
    ),
    tarifLab: yup.array().of(
      yup.object({
        tarifLabUuid: yup.string().when("isMcu", {
          is: (value: boolean) => value === true,
          then: (schema) => schema.required("Tarif Lab harus diisi"),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
    ),
  })
);

const { errors, handleSubmit, resetForm, setValues, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    tindakanPoli: [
      {
        tindakanUuid: "",
        listKomponenTarif: [{ tarifKomponenUuid: "", tarifPerKomponen: 0 }],
      },
    ],
    
    // tarifLab: [{ tarifLabUuid: "" }],
  },
});

const listKomponenTarifRefs = ref<
  Array<InstanceType<typeof TableKomponenTarifTindakan> | null>
>([]);

interface ListKomponenTarif {
  tarifKomponenUuid: string;
  tarifPerKomponen: number;
}

interface Tindakan {
  tindakanUuid: string;
  listKomponenTarif: Array<ListKomponenTarif>;
}

const {
  remove: removeTindakan,
  push: pushTindakan,
  fields: fieldsTindakan,
} = useFieldArray<Tindakan>("tindakanPoli");

// Fungsi untuk menambah listKomponenTarif
const addListKomponenTarif = (index: number) => {
  fieldsTindakan.value[index].value.listKomponenTarif.push({
    tarifKomponenUuid: "",
    tarifPerKomponen: 0,
  });
};

// Fungsi untuk menghapus listKomponenTarif
const removeListKomponenTarif = (
  tindakanIndex: number,
  komponenIndex: number
) => {
  fieldsTindakan.value[tindakanIndex].value.listKomponenTarif.splice(
    komponenIndex,
    1
  );
};

// const onSubmit = handleSubmit(async (values) => {
//   values.grandTotal = grandTotal.value;
//   console.log(grandTotal)
//   console.log(penjamin);

//   console.log("Submitted luar with", values);
// });
const onSubmit = handleSubmit(async (values: any) => {
  try {
    values.grandTotal = grandTotal.value;
    if (method.value === "edit") {
      if (!props.payload || !props.payload.uuid) {
        throw new Error("UUID is missing for edit operation");
      }
      const uuid = props.payload.uuid;
      const response = await tarifStore.putApi(uuid, values);
      console.log("Data updated successfully:", response);
      emit("data-updated");
    } else if (method.value === "add") {
      console.log("Adding new data with values:", values);
      const response = await tarifStore.postApi(values);
      emit("data-updated");
    }
    closeDialog();
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
});

const [code] = defineField("code");
const [name] = defineField("name");
const [mode] = defineField("mode");
const [isMcu] = defineField("isMcu");
const [unitPelayanan] = defineField("unitPelayanan");
const [penjamin] = defineField("penjamin");
const [status] = defineField("status");
const unitPelayananSelected = ref([]);
const penjaminSelected = ref([]);

watch(unitPelayananSelected, (newVal) => {
  const formattedPelayanan = newVal.map((value) => ({ unitPelayanan: value }));
  unitPelayanan.value = formattedPelayanan;
});

watch(penjaminSelected, (newVal) => {
  const formattedPenjamin = newVal.map((value) => ({ penjaminUuid: value }));
  penjamin.value = formattedPenjamin;
});



const {
  remove: removeTarifLab,
  push: pushTarifLab,
  fields: fieldsTarifLab,
} = useFieldArray("tarifLab");

const handlePushTindakan = () => {
  pushTindakan({
    tindakanUuid: "",
    listKomponenTarif: [{ tarifKomponenUuid: "", tarifPerKomponen: 0 }],
  });
};

const handlePushTarifLab = () => {
  pushTarifLab({ tarifLabUuid: "" });
};

defineExpose({
  onSubmit,
});
const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

const method = ref(props.method);
const title = ref(props.title);

const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};

const resetDialogMode = () => {
  method.value = props.method;
  title.value = props.title;
};

const handleEdit = () => {
  method.value = "edit";
  title.value = "Edit Data";
};

const closeDialog = () => {
  emit("update:isDialogVisible", false);
  resetDialogMode();
  resetForm();
};

watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (newValue) {
      resetDialogMode();
      if (props.method !== "add" && props.payload) {
        setValues({
          ...props.payload,
        });
      }
    } else {
      resetForm();
      resetDialogMode();
    }
  }
);

// Fungsi untuk menghitung grandTotal
const grandTotal = computed(() => {
  // Hitung total dari listKomponenTarif
  const totalKomponen = fieldsTindakan.value.reduce((total, tindakan) => {
    const komponenTotal = tindakan.value.listKomponenTarif.reduce(
      (subTotal, komponen) => subTotal + (komponen.tarifPerKomponen || 0),
      0
    );
    return total + komponenTotal;
  }, 0);

 
  
  return totalKomponen;
});


const grandTotalFormatted = computed(() => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(grandTotal.value);
});
</script>

<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>Tambah Tarif</template>
    <template #body>
      <div class="flex flex-col h-full overflow-hidden">
        <div class="flex flex-col h-full min-h-screen gap-5">
          <!-- Grid Section -->
          <div class="grid grid-cols-12 gap-x-[30px] gap-y-5 mt-5">
            <CustomTextfield
              class="col-span-3"
              label="Kode Tarif"
              v-model="code"
              placeholder="Kode Tarif"
              :invalid="!!errors.code"
              :invalidMessage="errors.code"
              :required="errors.code ? true : false"
            />
            <CustomTextfield
              class="col-span-5"
              label="Nama Tarif Tindakan"
              v-model="name"
              placeholder="Nama Tarif Tindakan"
            />
            <div class="grid items-end w-full grid-cols-2 col-span-4 gap-5">
              <div class="col-span-2 -mb-4 font-semibold text-normal">
                Metode Pilihan Tarif
              </div>
              <CustomRadio
                v-for="data in ['Single', 'Multiple']"
                v-model="mode"
                :sideLabel="data"
                :value="data"
              />
            </div>
            <CustomMultiSelect
              label="Pelayanan"
              v-model="unitPelayananSelected"
              :options="optionsPelayanan"
              optionValue="value"
              optionLabel="label"
              placeholder="Pelayanan"
              class="col-span-6"
            />
            <CustomMultiSelect
              label="Metode Pembayaran"
              v-model="penjaminSelected"
              :options="penjaminPayload"
              optionValue="uuid"
              optionLabel="name"
              placeholder="Metode Pembayaran"
              class="col-span-6"
            />
          </div>

          <!-- Accordion Section -->
          <div class="overflow-y-auto h-1/2">
            <CustomAccordion
              class="col-span-12"
              initial-state="0"
              :open-with-header="false"
              no-border
            >
              <template #header>
                <div class="flex items-end w-full -ml-4">
                  <div class="font-semibold text-heading">List Tindakan</div>
                  <div class="grow ml-2.5">
                    <CustomSwitch
                      v-model="isMcu"
                      label=""
                      side-label="Non-MCU Tindakan Lab"
                      side-label-true="Non-MCU Tindakan Lab"
                    />
                  </div>
                  <CustomButton
                    icon="PhPlus"
                    label="Tindakan"
                    @click="handlePushTindakan"
                  />
                </div>
              </template>

              <template #content>
                <!-- Field Array -->
                <div
                  v-for="(fieldTindakan, idx) in fieldsTindakan"
                  :key="idx"
                  class="mt-5"
                >
                  <div
                    class="flex flex-col gap-5 p-5 pt-5 mb-5 -mx-4 border border-adameds-300 rounded-xl"
                  >
                    <div class="flex gap-2.5 items-start">
                      <CustomButton
                        :label="`${idx + 1}`"
                        class="w-10 h-10 p-3 rounded"
                      />
                      <CustomSelect
                        v-model="fieldTindakan.value.tindakanUuid"
                        :showLabel="false"
                        place-holder="Tindakan"
                        :options="tindakanPayload"
                        option-label="name"
                        option-value="uuid"
                        class="w-full"
                        :invalid="(errors as any)[`tindakanPoli[${idx}].tindakanUuid`] ? true : false"
                        :invalidMessage="(errors as any)[`tindakanPoli[${idx}].tindakanUuid`]"
                      />
                      <CustomButton
                        background-color="bg-danger-300"
                        @click="removeTindakan"
                      >
                        <img src="@/assets/icons/delete.svg" alt="" />
                        <span class="font-semibold text-normal">Hapus</span>
                      </CustomButton>
                    </div>
                    <div class="flex flex-col gap-1.5">
                      <DataTable
                        :value="fieldTindakan.value.listKomponenTarif"
                        tableStyle="min-width: 50rem"
                        class="overflow-hidden text-xs rounded-lg bg-adameds-50"
                      >
                        <Column
                          headerClass="bg-adameds-300 text-white"
                          class="w-8/12"
                          bodyClass="align-top"
                        >
                          <template #header>
                            <div>Komponen Tarif</div>
                          </template>
                          <template #body="slotProps">
                            <CustomSelect
                              v-model="slotProps.data.tarifKomponenUuid"
                              label=""
                              place-holder="Pilih Tindakan"
                              :options="tindakanPayload"
                              option-label="name"
                              optionValue="uuid"
                              :invalid="(errors as any)[`tindakanPoli[${idx}].listKomponenTarif[${slotProps.index}].tarifKomponenUuid`] ? true : false"
                              :invalidMessage="(errors as any)[`tindakanPoli[${idx}].listKomponenTarif[${slotProps.index}].tarifKomponenUuid`]"
                            />
                          </template>
                        </Column>
                        <Column
                          headerClass="bg-adameds-300 text-white"
                          bodyClass="align-top"
                        >
                          <template #header>
                            <div class="w-full font-semibold text-end">
                              Rupiah (Rp)
                            </div>
                          </template>
                          <template #body="slotProps">
                            <CustomInputNumber
                              v-model="slotProps.data.tarifPerKomponen"
                              label=""
                              align-number="text-end"
                              :invalid="(errors as any)[`tindakanPoli[${idx}].listKomponenTarif[${slotProps.index}].tarifPerKomponen`] ? true : false"
                              :invalidMessage="(errors as any)[`tindakanPoli[${idx}].listKomponenTarif[${slotProps.index}].tarifPerKomponen`]"
                            >
                              <template #prependText>
                                <div
                                  class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md"
                                >
                                  Rp.
                                </div>
                              </template>
                            </CustomInputNumber>
                          </template>
                        </Column>
                        <Column
                          header="Action"
                          headerClass="bg-adameds-300 text-white"
                          bodyClass="align-top"
                        >
                          <template #body="slotProps">
                            <CustomButton
                              label=""
                              background-color="bg-danger-300 rounded-lg"
                              class="h-6 w-[26px] p-0 mt-3"
                              @click="
                                removeListKomponenTarif(idx, slotProps.index)
                              "
                            >
                              <img src="@/assets/icons/delete.svg" alt="" />
                            </CustomButton>
                          </template>
                        </Column>
                      </DataTable>
                      <div class="flex flex-col gap-5 p-5">
                        <div
                          class="flex items-center justify-center p-5 border border-dashed rounded-lg border-adameds-300"
                        >
                          <CustomButton
                            icon="PhPlus"
                            label="Tindakan"
                            borderColor="border-adameds-300"
                            textColor="text-adameds-300"
                            backgroundColor="bg-white"
                            @click="addListKomponenTarif(idx)"
                          />
                        </div>
                      </div>
                      <!-- <CustomButton label="Submit" @click="onSubmit" /> -->
                    </div>
                  </div>
                </div>
              </template>
              <template #collapseIcon>
                <CustomButton
                  icon="PhCaretUp"
                  backgroundColor="bg-transparent"
                  textColor="text-adameds-300"
                />
              </template>

              <template #expandIcon>
                <CustomButton
                  icon="PhCaretDown"
                  backgroundColor="bg-transparent"
                  textColor="text-adameds-300"
                />
              </template>
            </CustomAccordion>

            <!-- List Tarif Laboratorium -->
            <CustomAccordion
              v-if="isMcu"
              class="col-span-12"
              initial-state="0"
              :open-with-header="false"
              no-border
            >
              <template #header>
                <div class="flex justify-between w-full -ml-4">
                  <div class="font-semibold text-heading">
                    List Tarif Laboratorium
                  </div>

                  <CustomButton
                    icon="PhPlus"
                    label="Tarif"
                    @click="handlePushTarifLab"
                  />
                </div>
              </template>

              <template #content>
                <DataTable
                  :value="fieldsTarifLab"
                  tableStyle="min-width: 50rem"
                  class="mt-5 -mx-4 overflow-hidden text-xs rounded-lg bg-adameds-50"
                >
                  <Column headerClass="bg-adameds-300 text-white" class="w-4/6">
                    <template #header>
                      <div>List Tarif</div>
                    </template>
                    <template #body="slotProps">
                      <CustomSelect
                        v-model="slotProps.data.value.tarifLabUuid"
                        label=""
                        :options="optionsLab"
                        option-label="name"
                        option-value="uuid"
                        place-holder="Pilih Komponen Tarif"
                      />
                      <!-- :invalid="(errors as any)[`tindakanPoli[${idx}].listKomponenTarif[${slotProps.index}].tarifKomponenUuid`] ? true : false"
              :invalidMessage="(errors as any)[`tindakanPoli[${idx}].listKomponenTarif[${slotProps.index}].tarifKomponenUuid`]" -->
                    </template>
                  </Column>
                  <Column headerClass="bg-adameds-300 ">
                    <template #header>
                      <div
                        class="w-full text-xs font-semibold text-white text-end"
                      >
                        Rupiah (Rp)
                      </div>
                    </template>
                    <template #body="slotProps">
                      <CustomInputNumber label="" align-number="text-end">
                        <template #prependText>
                          <div
                            class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md"
                          >
                            Rp.
                          </div>
                        </template>
                      </CustomInputNumber>
                    </template>
                  </Column>
                  <Column
                    header="Action"
                    headerClass="bg-adameds-300 text-white"
                  >
                    <template #body="slotProps">
                      <CustomButton
                        label=""
                        background-color="bg-danger-300 rounded-lg"
                        class="h-6 w-[26px] p-0"
                        @click="removeTarifLab(slotProps.index)"
                      >
                        <!-- <TrashFillIcon class="text-white w-[15px]"/> -->

                        <img src="@/assets/icons/delete.svg" alt="" />
                      </CustomButton>
                    </template>
                  </Column>
                </DataTable>
              </template>

              <template #collapseIcon>
                <CustomButton
                  icon="PhCaretUp"
                  backgroundColor="bg-transparent"
                  textColor="text-adameds-300"
                />
              </template>

              <template #expandIcon>
                <CustomButton
                  icon="PhCaretDown"
                  backgroundColor="bg-transparent"
                  textColor="text-adameds-300"
                />
              </template>
            </CustomAccordion>
          </div>
          <div class="flex items-center justify-end gap-4">
            <div class="pr-4 py-2.5 border-r border-grey-300 font-bold text-MD">
              Grand Total
            </div>
            <div class="min-w-[300px] text-end font-bold text-MD">
             {{ grandTotalFormatted }}
            </div>
          </div>
          <hr class="border-200" />
          <CustomSwitch
            v-model="status"
            :show-label="true"
            label="Status"
            sideLabel="Non-Aktif"
            sideLabelTrue="Aktif"
            class="col-span-6"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton
            label="Batal"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
            @click="closeDialog()"
          >
          </CustomButton>
          <CustomButton @click="onSubmit" label="Simpan" />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
