<script lang="ts" setup>
import { ref, watch, onMounted, computed } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import NoData from "@/components/section/NoData.vue";

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

const penjaminPayload = ref<any[]>([]);
const tindakanPayload = ref<any[]>([]);
const tempPelayanan = ref<any>([]);
const tempPenjamin = ref<any>([]);
const komponenTarifPayload = ref<any[]>([]);
const tempDeleteTindakan = ref<any[]>([]);
const tempTindakan = ref<any[]>([]);

interface ListKomponenTarif {
  tarifKomponenUuid: string;
  tarifPerKomponen: number;
  persentase: number;
}

interface Tindakan {
  tindakanUuid: string;
  listKomponenTarif: Array<ListKomponenTarif>;
  isPresentase: boolean;
  total: number;
}

interface LabEntry {
  tarifLabUuid: string;
}

const optionsPelayanan = ref([
  { label: "IGD", value: 1 },
  { label: "Rawat Jalan", value: 2 },
  { label: "Rawat Inap", value: 3 },
]);

const optionsLab = ref([
  { name: "SGOT", harga: 50000, uuid: "0192426b-260a-7f6e-9cb2-ee03c83710a4" },
  { name: "SGPT", harga: 10000, uuid: "0192426b-260a-7f6e-9cb2-ee03c83710a5" },
]);

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

const { errors, handleSubmit, resetForm, setValues, defineField } = useForm();

const [code] = defineField("code");
const [name] = defineField("name");
const [grandTotal] = defineField("grandTotal");
const [unitPelayanan] = defineField("unitPelayanan");
const [penjamin] = defineField("penjamin");
const [status] = defineField("status");
const [unitPelayananSelected] = defineField("unitPelayananSelected");
const [penjaminSelected] = defineField("penjaminSelected");

const {
  remove: removeTindakan,
  push: pushTindakan,
  fields: fieldsTindakan,
} = useFieldArray<Tindakan>("tindakanPoli");

const { push: pushUnitPelayanan } = useFieldArray("unitPelayanan");
const { push: pushPenjamin } = useFieldArray("penjamin");
const {
  fields: fieldsTarifLab,
} = useFieldArray<LabEntry>("tarifLab");


const addListKomponenTarif = (index: number) => {
  fieldsTindakan.value[index].value.listKomponenTarif.push({
    tarifKomponenUuid: "",
    tarifPerKomponen: 0,
    persentase: 0,
  });
};
const addListItemTarif = (index: number) => {
  fieldsTindakan.value[index].value.listKomponenTarif.push({
    tarifKomponenUuid: "",
    tarifPerKomponen: 0,
    persentase: 0,
  });
};

const removeListKomponenTarif = (
  tindakanIndex: number,
  komponenIndex: number
) => {
  fieldsTindakan.value[tindakanIndex].value.listKomponenTarif.splice(
    komponenIndex,
    1
  );
};

const handleRemoveTindakan = (tindakanIndex: number) => {
  removeTindakan(tindakanIndex);
};

const handlePushTindakan = () => {
  pushTindakan({
    tindakanUuid: "",
    listKomponenTarif: [
      { tarifKomponenUuid: "", tarifPerKomponen: 0, persentase: 0 },
    ],
    isPresentase: false,
    total: 0,
  });
};

const handleUnitPelayananUpdate = (selectedValues: number[]) => {
  unitPelayanan.value = tempPelayanan.value.map(
    (item: { unitPelayanan: number; uuid: string }) => {
      if (!selectedValues.includes(item.unitPelayanan)) {
        return {
          unitPelayanan: item.unitPelayanan,
          uuid: item.uuid,
          isDelete: true,
        };
      } else {
        return {
          unitPelayanan: item.unitPelayanan,
          uuid: item.uuid,
        };
      }
    }
  );

  selectedValues.forEach((value) => {
    const existsInTemp = tempPelayanan.value.some(
      (item: { unitPelayanan: number }) => item.unitPelayanan === value
    );

    if (!existsInTemp) {
      pushUnitPelayanan({
        unitPelayanan: value,
      });
    }
  });
};

const handlePenjaminUpdate = (selectedValues: string[]) => {
  penjamin.value = tempPenjamin.value.map(
    (item: { penjaminUuid: string; uuid: string }) => {
      if (!selectedValues.includes(item.penjaminUuid)) {
        return {
          penjaminUuid: item.penjaminUuid,
          uuid: item.uuid,
          isDeleted: true,
        };
      } else {
        return {
          penjaminUuid: item.penjaminUuid,
          uuid: item.uuid,
        };
      }
    }
  );

  selectedValues.forEach((value) => {
    const existsInTemp = tempPenjamin.value.some(
      (item: { penjaminUuid: string }) => item.penjaminUuid === value
    );

    if (!existsInTemp) {
      pushPenjamin({
        penjaminUuid: value,
      });
    }
  });
};

const onSubmit = handleSubmit(async (values: any) => {
  try {
    closeDialog();
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
});

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
  tempDeleteTindakan.value = [];
};

watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (newValue) {
      resetDialogMode();
      if (props.method !== "add" && props.payload) {
        const unitPelayananPayload =
          props.payload.pelayanan?.map(
            (item: { unitPelayanan: number; uuid: string }) =>
              item.unitPelayanan
          ) || [];

        const tempUnitPelayanan =
          props.payload.pelayanan?.map(
            (item: { unitPelayanan: number; uuid: string }) => ({
              unitPelayanan: item.unitPelayanan,
              uuid: item.uuid,
            })
          ) || [];
        const penjaminPayload =
          props.payload.penjamin?.map(
            (item: { penjaminUuid: string }) => item.penjaminUuid
          ) || [];
        const tempPenjaminObject =
          props.payload.penjamin?.map(
            (item: { penjaminUuid: string; uuid: string }) => ({
              penjaminUuid: item.penjaminUuid,
              uuid: item.uuid,
            })
          ) || [];

        setValues({
          ...props.payload,
          unitPelayananSelected: unitPelayananPayload,
          penjaminSelected: penjaminPayload,
          tarifLab: props.payload.lab,
        });
        tempPelayanan.value = tempUnitPelayanan;
        tempPenjamin.value = tempPenjaminObject;
        tempTindakan.value = props.payload.tindakanPoli;
      }
    } else {
      resetForm();
      resetDialogMode();
      tempDeleteTindakan.value = [];
    }
  }
);

const totalLabPrices = computed(() => {
  return fieldsTarifLab.value.reduce((total, entry) => {
    const lab = optionsLab.value.find(
      (option) => option.uuid === entry.value.tarifLabUuid
    );
    return total + (lab ? lab.harga : 0);
  }, 0);
});

const grandTotalData = ref<number>(0);
const grandTotalValues = computed(() => {
  grandTotalData.value = 0;
  const totalDataTindakan = fieldsTindakan.value.reduce(
    (grandTotal, tindakanWrapper) => {
      return grandTotal + (tindakanWrapper.value.total || 0);
    },
    0
  );
  const totalLabPricesValue = totalLabPrices?.value || 0;
  const total = totalDataTindakan + totalLabPricesValue;
  grandTotalData.value = total;
  return formatCurrency(total);
});

const getHargaLab = (labUuid: string) => {
  const lab = optionsLab.value.find((option) => option.uuid === labUuid);
  return lab ? lab.harga : 0;
};

const handlePersentase = (
  inputPersentase: any,
  tindakanIndex: number,
  komponenIndex: number
) => {
  const tindakan = fieldsTindakan.value[tindakanIndex].value;
  const tarifPerKomponen = (inputPersentase / 100) * tindakan.total;
  tindakan.listKomponenTarif[komponenIndex].tarifPerKomponen = parseFloat(
    tarifPerKomponen.toFixed(2)
  );
};

const handleTotalKomponen = (tindakanIndex: any) => {
  const tindakan = fieldsTindakan.value[tindakanIndex].value;
  tindakan.total = tindakan.listKomponenTarif.reduce((sum, komponen) => {
    return sum + (komponen.tarifPerKomponen || 0);
  }, 0);
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(value);
};

const totalTindakan = (tindakanIndex: number): string => {
  const tindakan = fieldsTindakan.value[tindakanIndex];

  if (!tindakan || !Array.isArray(tindakan.value.listKomponenTarif)) {
    return formatCurrency(0);
  }

  if (!tindakan.value.isPresentase) {
    const total = tindakan.value.listKomponenTarif.reduce((sum, komponen) => {
      return sum + (komponen.tarifPerKomponen || 0);
    }, 0);

    return formatCurrency(total);
  }

  return formatCurrency(0);
};
</script>

<template>
  <CustomDialog
    width="850px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Tambah Tarif Lab</template>
    <template #body>
      <!-- Form Input -->
      <div
        v-if="method !== 'detail'"
        class="flex flex-col h-full overflow-hidden"
      >
        <div class="flex flex-col h-full min-h-screen gap-5">
          <!-- Grid Section -->
          <div class="grid grid-cols-12 gap-x-[30px] gap-y-5 mt-5">
            <CustomTextfield
              class="col-span-3"
              label="Kode Tarif"
              v-model="code"
              placeholder="Kode Tarif"
            />
            <CustomTextfield
              class="col-span-9"
              label="Nama Tarif Tindakan"
              v-model="name"
              placeholder="Nama Tarif Tindakan"
            />
            
            <CustomMultiSelect
              label="Pelayanan"
              v-model="unitPelayananSelected"
              :options="optionsPelayanan"
              optionValue="value"
              @update:modelValue="handleUnitPelayananUpdate"
              optionLabel="label"
              placeholder="Pelayanan"
              class="col-span-12"
            />
            <CustomMultiSelect
              label="Metode Pembayaran"
              v-model="penjaminSelected"
              :options="penjaminPayload"
              @update:modelValue="handlePenjaminUpdate"
              optionValue="uuid"
              optionLabel="name"
              placeholder="Metode Pembayaran"
              class="col-span-12"
            />
          </div>

          <!-- Accordion Kelompok Section -->
          <div class="overflow-y-auto h-1/2">
            <CustomAccordion
              class="col-span-12"
              initial-state="0"
              :open-with-header="false"
              no-border
            >
              <template #header>
                <div class="flex items-end w-full -ml-4">
                  <div class="font-semibold text-heading">Kelompok Pemeriksaan</div>
                  <div class="grow ml-2.5">
                   
                  </div>
                  <CustomButton
                    icon="PhPlus"
                    label="Kelompok"
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
                    class="flex flex-col gap-5 p-5 pt-5 -mx-4 border border-adameds-300 rounded-xl"
                  >
                    <div class="flex gap-2.5 items-start">
                      <CustomButton
                        :label="`${idx + 1}`"
                        class="w-10 h-10 p-3 rounded"
                      />
                      <CustomSelect
                        v-model="fieldTindakan.value.tindakanUuid"
                        :showLabel="false"
                        place-holder="Kelompok"
                        :options="tindakanPayload"
                        option-label="name"
                        option-value="uuid"
                        class="w-full"
                      />
                      <CustomButton
                        background-color="bg-danger-300"
                        @click="handleRemoveTindakan(idx)"
                      >
                        <img src="@/assets/icons/delete.svg" alt="" />
                        <span class="font-semibold text-normal">Hapus</span>
                      </CustomButton>
                    </div>
                    <div class="flex flex-col gap-1.5">
                      <DataTable
                        :value="fieldTindakan.value.listKomponenTarif"
                        tableStyle="min-width: 30rem"
                        class="overflow-hidden text-xs rounded-lg bg-adameds-50"
                      >
                        <Column
                          headerClass="bg-adameds-300 text-white"
                          class="w-7/12"
                          bodyClass="align-top"
                        >
                          <template #header>
                            <div>Komponen Tarif</div>
                          </template>
                          <template #body="slotProps">
                            <CustomSelect
                              v-model="slotProps.data.tarifKomponenUuid"
                              label=""
                              place-holder="Pilih Komponen Tarif"
                              :options="komponenTarifPayload"
                              option-label="name"
                              optionValue="uuid"
                            />
                          </template>
                        </Column>
                        <Column
                          headerClass="bg-adameds-300 text-white"
                          bodyClass="align-top"
                          class="w-2/12"
                        >
                          <template #header>
                            <div class="w-full font-semibold text-end">
                              Persen (%)
                            </div>
                          </template>
                          <template #body="slotProps">
                            <CustomInputNumber
                              v-model="slotProps.data.persentase"
                              label=""
                              :disabled="!fieldTindakan.value.isPresentase"
                              @update:model-value="
                                handlePersentase(
                                  slotProps.data.persentase,
                                  idx,
                                  slotProps.index
                                )
                              "
                            >
                              <template #appendText>
                                <div
                                  class="flex items-center justify-center mr-2.5"
                                >
                                  %
                                </div>
                              </template>
                            </CustomInputNumber>
                          </template>
                        </Column>
                        <Column
                          headerClass="bg-adameds-300 text-white"
                          bodyClass="align-top"
                          class="w-4/12"
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
                              :disabled="fieldTindakan.value.isPresentase"
                              @update:model-value="handleTotalKomponen(idx)"
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
                            label="Komponen Tarif"
                            borderColor="border-adameds-300"
                            textColor="text-adameds-300"
                            backgroundColor="bg-white"
                            @click="addListKomponenTarif(idx)"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center justify-between gap-4">
                      <CustomSwitch
                        v-model="fieldTindakan.value.isPresentase"
                        :show-label="false"
                        label=""
                        sideLabel="Persentase"
                        sideLabelTrue="Persentase"
                        class="col-span-6"
                      />
                      <div class="flex items-center">
                        <div
                          class="pr-4 py-2.5 border-r border-grey-300 font-bold text-MD"
                        >
                          Total
                        </div>
                        <div
                          class="min-w-[300px] flex justify-end font-bold text-MD"
                        >
                          <CustomInputNumber
                            v-if="fieldTindakan.value.isPresentase"
                            v-model="fieldTindakan.value.total"
                            label=""
                            align-number="text-end"
                            class="w-[200px]"
                          >
                            <template #prependText>
                              <div
                                class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md"
                              >
                                Rp.
                              </div>
                            </template>
                          </CustomInputNumber>
                          <div v-else>
                            {{ totalTindakan(idx) }}
                          </div>
                        </div>
                      </div>
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
          </div>
          <hr class="border-200" />
          
          <!-- Accordion Item Section -->
          <div class="overflow-y-auto h-1/2">
            <CustomAccordion
              class="col-span-12"
              initial-state="0"
              :open-with-header="false"
              no-border
            >
              <template #header>
                <div class="flex items-end w-full -ml-4">
                  <div class="font-semibold text-heading">Item Pemeriksaan</div>
                  <div class="grow ml-2.5">
                   
                  </div>
                  <CustomButton
                    icon="PhPlus"
                    label="Item"
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
                    class="flex flex-col gap-5 p-5 pt-5 -mx-4 border border-adameds-300 rounded-xl"
                  >
                    <div class="flex gap-2.5 items-start">
                      <CustomButton
                        :label="`${idx + 1}`"
                        class="w-10 h-10 p-3 rounded"
                      />
                      <CustomSelect
                        v-model="fieldTindakan.value.tindakanUuid"
                        :showLabel="false"
                        place-holder="Kelompok"
                        :options="tindakanPayload"
                        option-label="name"
                        option-value="uuid"
                        class="w-full"
                      />
                      <CustomButton
                        background-color="bg-danger-300"
                        @click="handleRemoveTindakan(idx)"
                      >
                        <img src="@/assets/icons/delete.svg" alt="" />
                        <span class="font-semibold text-normal">Hapus</span>
                      </CustomButton>
                    </div>
                    <div class="flex flex-col gap-1.5">
                      <DataTable
                        :value="fieldTindakan.value.listKomponenTarif"
                        tableStyle="min-width: 30rem"
                        class="overflow-hidden text-xs rounded-lg bg-adameds-50"
                      >
                        <Column
                          headerClass="bg-adameds-300 text-white"
                          class="w-7/12"
                          bodyClass="align-top"
                        >
                          <template #header>
                            <div>Komponen Tarif</div>
                          </template>
                          <template #body="slotProps">
                            <CustomSelect
                              v-model="slotProps.data.tarifKomponenUuid"
                              label=""
                              place-holder="Pilih Komponen Tarif"
                              :options="komponenTarifPayload"
                              option-label="name"
                              optionValue="uuid"
                            />
                          </template>
                        </Column>
                        <Column
                          headerClass="bg-adameds-300 text-white"
                          bodyClass="align-top"
                          class="w-2/12"
                        >
                          <template #header>
                            <div class="w-full font-semibold text-end">
                              Persen (%)
                            </div>
                          </template>
                          <template #body="slotProps">
                            <CustomInputNumber
                              v-model="slotProps.data.persentase"
                              label=""
                              :disabled="!fieldTindakan.value.isPresentase"
                              @update:model-value="
                                handlePersentase(
                                  slotProps.data.persentase,
                                  idx,
                                  slotProps.index
                                )
                              "
                            >
                              <template #appendText>
                                <div
                                  class="flex items-center justify-center mr-2.5"
                                >
                                  %
                                </div>
                              </template>
                            </CustomInputNumber>
                          </template>
                        </Column>
                        <Column
                          headerClass="bg-adameds-300 text-white"
                          bodyClass="align-top"
                          class="w-4/12"
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
                              :disabled="fieldTindakan.value.isPresentase"
                              @update:model-value="handleTotalKomponen(idx)"
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
                            label="Komponen Tarif"
                            borderColor="border-adameds-300"
                            textColor="text-adameds-300"
                            backgroundColor="bg-white"
                            @click="addListItemTarif(idx)"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center justify-between gap-4">
                      <CustomSwitch
                        v-model="fieldTindakan.value.isPresentase"
                        :show-label="false"
                        label=""
                        sideLabel="Persentase"
                        sideLabelTrue="Persentase"
                        class="col-span-6"
                      />
                      <div class="flex items-center">
                        <div
                          class="pr-4 py-2.5 border-r border-grey-300 font-bold text-MD"
                        >
                          Total
                        </div>
                        <div
                          class="min-w-[300px] flex justify-end font-bold text-MD"
                        >
                          <CustomInputNumber
                            v-if="fieldTindakan.value.isPresentase"
                            v-model="fieldTindakan.value.total"
                            label=""
                            align-number="text-end"
                            class="w-[200px]"
                          >
                            <template #prependText>
                              <div
                                class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md"
                              >
                                Rp.
                              </div>
                            </template>
                          </CustomInputNumber>
                          <div v-else>
                            {{ totalTindakan(idx) }}
                          </div>
                        </div>
                      </div>
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
          </div>
          <hr class="border-200" />

          <div class="flex items-center justify-end gap-4">
            <div class="pr-4 py-2.5 border-r border-grey-300 font-bold text-MD">
              Grand Total
            </div>
            <div class="min-w-[300px] flex justify-end font-bold text-MD">
              <div>
                {{ grandTotalValues }}
              </div>
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

      <!-- Detail Data -->
      <div v-if="method === 'detail'" class="grid grid-cols-12 gap-5 mt-5">
        <div class="flex flex-col col-span-4">
          <div class="font-semibold underline text-SM">Kode Tarif</div>
          <div class="font-normal text-normal">
            {{ payload.code }}
          </div>
        </div>
        <div class="flex flex-col col-span-4">
          <div class="font-semibold underline text-SM">Nama Tarif Tindakan</div>
          <div class="font-normal text-normal">
            {{ payload.name }}
          </div>
        </div>
       
        <div class="flex flex-col col-span-6">
          <div class="font-semibold underline text-SM">Pelayanan</div>
          <div
            v-if="payload.pelayanan && payload.pelayanan.length"
            class="flex flex-wrap w-full h-full gap-1"
          >
            <CustomChip
              v-for="pelayanan in payload.pelayanan"
              :label="pelayanan.unitPelayananName"
              textColor="text-white"
              bgColor="bg-adameds-300"
              borderColor="border-none"
              :showCheckedIcon="false"
              customClass="text-xs font-semibold h-5 flex w-fit"
            />
          </div>
        </div>
        <div class="flex flex-col col-span-4">
          <div class="font-semibold underline text-SM">Mode Pembayaran</div>
          <div
            v-if="payload.penjamin && payload.penjamin.length"
            class="flex flex-wrap w-full h-full gap-1"
          >
            <CustomChip
              v-for="penjamin in payload.penjamin"
              :label="penjamin.penjaminName"
              textColor="text-white"
              bgColor="bg-adameds-300"
              borderColor="border-none"
              :showCheckedIcon="false"
              customClass="text-xs font-semibold h-5 flex w-fit"
            />
          </div>
        </div>
        <CustomAccordion
          class="col-span-12"
          initial-state="0"
          :open-with-header="false"
          no-border
        >
          <template #header> List Tindakan </template>
          <template #content>
            <div
              v-for="(tindakanPoli, idx) in payload.tindakanPoli"
              :key="idx"
              class="mt-5"
            >
              <div
                class="flex flex-col gap-5 p-5 pt-5 mb-5 -mx-4 border border-adameds-300 rounded-xl"
              >
                <div class="flex gap-2.5 items-center">
                  <CustomButton
                    :label="`${idx + 1}`"
                    class="w-10 h-10 p-3 rounded"
                  />
                  <div class="font-semibold text-normal">
                    {{ tindakanPoli.tindakanName }}
                  </div>
                </div>
                <DataTable
                  :value="tindakanPoli.listKomponenTarif"
                  tableStyle="min-width: 50rem"
                  class="overflow-hidden text-xs rounded-lg"
                >
                  <Column
                    header="Komponen Tarif"
                    headerClass="bg-adameds-300 text-white"
                    bodyClass="align-top"
                  >
                    <template #body="slotProps">
                      {{ slotProps.data.tarifPerKomponenName || "-" }}
                    </template>
                  </Column>
                  <Column
                    headerClass="bg-adameds-300 text-white font-semibold text-SM"
                    class="w-6/12 text-end"
                    bodyClass="align-top text-end"
                  >
                    <template #header>
                      <div class="w-full text-end">Rupiah (Rp)</div>
                    </template>
                    <template #body="slotProps">
                      {{ slotProps.data.tarifPerKomponen || "-" }}
                    </template>
                  </Column>
                </DataTable>
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
        <CustomAccordion
          v-if="props.payload.isMcu"
          class="col-span-12"
          initial-state="0"
          :open-with-header="false"
          no-border
        >
          <template #header> List Tindakan Laboratorium </template>
          <template #content>
            <DataTable
              :value="fieldsTarifLab"
              tableStyle="min-width: 50rem"
              class="mt-5 overflow-hidden text-xs rounded-lg"
            >
              <Column
                header="List Tarif Lab"
                headerClass="bg-adameds-300 text-white"
                bodyClass="align-top"
              >
                <template #body="slotProps">
                  {{ slotProps.data.value.tarifLabUuid }}
                </template>
              </Column>
              <Column
                headerClass="bg-adameds-300 text-white font-semibold text-SM"
                class="w-6/12 text-end"
                bodyClass="align-top text-end"
              >
                <template #header>
                  <div class="w-full text-end">Rupiah (Rp)</div>
                </template>
                <template #body="slotProps">
                  <span
                    >Rp.
                    {{ getHargaLab(slotProps.data.value.tarifLabUuid) }}</span
                  >
                </template>
              </Column>
            </DataTable>
          </template>
        </CustomAccordion>
        <hr class="col-span-12 border-grey-200" />
        <div class="flex items-center justify-end col-span-12 gap-4">
          <div class="pr-4 py-2.5 border-r border-grey-300 font-bold text-MD">
            Grand Total
          </div>
          <div class="min-w-[300px] text-end font-bold text-MD">
            {{ grandTotalValues }}
          </div>
        </div>
        <hr class="col-span-12 border-grey-200" />
        <CustomInfoRow label="Status" class="col-span-12">
          <template #value>
            <CustomChip
              :label="status ? 'AKTIF' : 'NON-AKTIF'"
              :textColor="status ? 'text-white' : 'text-[#80868d]'"
              :bgColor="status ? 'bg-adameds-300' : 'bg-white'"
              :borderColor="status ? 'border-none' : 'border-[#80868d]'"
              :icon-color="status ? 'white' : '#80868d'"
              customClass="text-xs font-semibold h-5 flex w-fit"
            />
          </template>
        </CustomInfoRow>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton
            v-if="method !== 'detail'"
            label="Batal"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
            @click="closeDialog"
          />
          <CustomButton
            v-if="method !== 'detail'"
            label="Simpan"
            @click="onSubmit"
          />
          <CustomButton
            v-if="method === 'detail'"
            label="Edit"
            @click="handleEdit"
          />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
