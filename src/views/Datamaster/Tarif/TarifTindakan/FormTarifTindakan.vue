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

const tarifStore = useTarifStore();
const penjaminStore = usePenjaminStore();
const tindakanStore = useTindakanStore();
const komponenTarifStore = useKomponenTarifStore();
const penjaminPayload = ref<any[]>([]);
const tindakanPayload = ref<any[]>([]);
const tempPelayanan = ref<any>([]);
const tempPenjamin = ref<any>([]);
const komponenTarifPayload = ref<any[]>([]);
const tempDeleteTindakan = ref<Tindakan[]>([]);
const tempTindakan = ref<Tindakan[]>([]);

interface ListKomponenTarif {
  tarifKomponenUuid: string;
  tarifPerKomponen: number;
}

interface Tindakan {
  tindakanUuid: string;
  listKomponenTarif: Array<ListKomponenTarif>;
}

interface LabEntry {
  tarifLabUuid: string;
}

//Fetch data

const fetchPenjamin = async () => {
  try {
    const response = await penjaminStore.getAktifApi();
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
    const response = await tindakanStore.getAktifApi();
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
    const response = await komponenTarifStore.getAktifApi();
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
  { name: "SGOT", harga: 50000, uuid: "0192426b-260a-7f6e-9cb2-ee03c83710a4" },
  { name: "SGPT", harga: 10000, uuid: "0192426b-260a-7f6e-9cb2-ee03c83710a5" },
]);

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

const schema = toTypedSchema(
  yup
    .object({
      jenisTarif: yup.string().default("Tindakan"),
      code: yup.string().required("Kode Tarif harus diisi"),
      name: yup.string().required("Nama Tarif harus diisi"),
      grandTotal: yup.number(),
      mode: yup.string(),
      status: yup.bool().default(true),
      isMcu: yup.bool().default(false),
      unitPelayanan: yup.array().of(
        yup.object({
          unitPelayanan: yup.number(),
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
      // tarifLab: yup
      //   .array()
      //   .when("isMcu", {
      //     is: true,
      //     then: yup.array().of(
      //       yup.object({
      //         tarifLabUuid: yup.string().when("isMcu", {
      //           is: (value: boolean) => value === true,
      //           then: (schema) => schema.required("Tarif Lab harus diisi"),
      //           otherwise: (schema) => schema.notRequired(),
      //         }),
      //       })
      //     ),
      //     otherwise: (schema) => schema.notRequired(),
      //   })
      //   .of(
      //     yup.object({
      //       tarifLabUuid: yup.string(),
      //     })
      //   ),
      unitPelayananSelected: yup
        .array()
        .of(yup.number().required("Unit Pelayanan harus dipilih"))
        .min(1, "Minimal satu Unit Pelayanan harus dipilih")
        .required("Unit Pelayanan harus dipilih"),
      penjaminSelected: yup
        .array()
        .of(yup.string().required("Penjamin harus dipilih"))
        .min(1, "Minimal satu Penjamin harus dipilih")
        .required("Penjamin harus dipilih"),
    })
    .noUnknown()
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

    tarifLab: [{ tarifLabUuid: "" }],
  },
});

const [code] = defineField("code");
const [name] = defineField("name");
const [mode] = defineField("mode");
const [isMcu] = defineField("isMcu");
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
  remove: removeTarifLab,
  push: pushTarifLab,
  fields: fieldsTarifLab,
} = useFieldArray<LabEntry>("tarifLab"); // Specify the type here

// Fungsi untuk menambah listKomponenTarif
const addListKomponenTarif = (index: number) => {
  fieldsTindakan.value[index].value.listKomponenTarif.push({
    tarifKomponenUuid: "",
    tarifPerKomponen: 0,
  });
};

const removeListKomponenTarif = (
  tindakanIndex: number,
  komponenIndex: number
) => {
  const tindakanToRemove = fieldsTindakan.value[tindakanIndex].value;
  const komponenToRemove =
    fieldsTindakan.value[tindakanIndex].value.listKomponenTarif[komponenIndex];

  const tempTindakanToCheck = tempTindakan.value?.find(
    (tempTindakan: Tindakan) =>
      tempTindakan.tindakanUuid === tindakanToRemove.tindakanUuid
  );

  if (tempTindakanToCheck) {
    const tempKomponen = tempTindakanToCheck.listKomponenTarif.find(
      (tempKomponen: ListKomponenTarif) =>
        tempKomponen.tarifKomponenUuid === komponenToRemove.tarifKomponenUuid
    );

    if (tempKomponen) {
      const deletedKomponen = {
        ...tempKomponen,
        isDeleted: true,
      };

      const deletedTindakan = {
        ...tindakanToRemove,
        listKomponenTarif: tindakanToRemove.listKomponenTarif.map((komponen) =>
          komponen.tarifKomponenUuid === deletedKomponen.tarifKomponenUuid
            ? deletedKomponen
            : komponen
        ),
      };
      const existingTindakanIndex = tempDeleteTindakan.value.findIndex(
        (temp: Tindakan) => temp.tindakanUuid === deletedTindakan.tindakanUuid
      );

      if (existingTindakanIndex !== -1) {
        tempDeleteTindakan.value[existingTindakanIndex] = deletedTindakan;
      } else {
        tempDeleteTindakan.value.push(deletedTindakan);
      }
    }
  }
  console.log("tempDeleteTindakan", tempDeleteTindakan);
  fieldsTindakan.value[tindakanIndex].value.listKomponenTarif.splice(
    komponenIndex,
    1
  );
};

const handleRemoveTindakan = (tindakanIndex: number) => {
  const tindakanToRemove = fieldsTindakan.value[tindakanIndex].value;
  tindakanToRemove.listKomponenTarif.forEach((komponen: any) => {
    komponen.isDeleted = true;
  });
  tempDeleteTindakan.value.push(tindakanToRemove);
  console.log("tempDeleteTindakan hendele tindakan", tempDeleteTindakan);
  removeTindakan(tindakanIndex);
  console.log(
    "Removed tindakan and marked komponen as deleted:",
    tindakanToRemove
  );
};

const tempDeletedLab = ref<TempTarifLab[]>([]);

interface TempTarifLab {
  harga: number;
  name: string;
  tarifLabUuid: string;
  isDeleted?: boolean;
}
const handleRemoveLab = (index: number) => {
  // if (fieldsTarifLab.value.length === 1) {
  //   // Set isMcu to false if this is the last item
  //   isMcu.value = false;
  // }

  const komponenToRemove = fieldsTarifLab.value[index].value;
  const parseItem = JSON.parse(JSON.stringify(komponenToRemove));

  // Check if tarifLabUuid is an empty string
  if (!parseItem.tarifLabUuid) {
    // Remove the last item from tempDeletedLab if the UUID is empty
    tempDeletedLab.value.pop();
  } else {
    // Check if the item is in tempPenjamin
    const tempKomponen = tempTarifLab.value.find(
      (temp: any) => temp.tarifLabUuid === parseItem.tarifLabUuid
    );

    if (tempKomponen) {
      const deletedItem = { ...tempKomponen, isDeleted: true };
      tempDeletedLab.value.push(deletedItem);
    }
  }

  // Remove the component from the fields array
  removeTarifLab(index);
};

const handlePushTindakan = () => {
  pushTindakan({
    tindakanUuid: "",
    listKomponenTarif: [{ tarifKomponenUuid: "", tarifPerKomponen: 0 }],
  });
};

const handlePushTarifLab = () => {
  pushTarifLab({ tarifLabUuid: "" });
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
      console.log("Menambahkan unitPelayanan baru:", value);
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
    values.grandTotal = grandTotal.value;
    delete values.unitPelayananSelected;
    delete values.penjaminSelected;

    tempDeleteTindakan.value.forEach((deletedTindakan) => {
      const indexToReplace = values.tindakanPoli.findIndex(
        (tindakan: Tindakan) =>
          tindakan.tindakanUuid === deletedTindakan.tindakanUuid
      );

      if (indexToReplace !== -1) {
        values.tindakanPoli[indexToReplace] = deletedTindakan;
      } else {
        values.tindakanPoli.push(deletedTindakan);
      }
    });
    if (!values.isMcu) {
      values.tarifLab = (values.tarifLab || []).map((lab: any) => ({
        ...lab,
        isDeleted: true,
      }));
    } else {
      const combinedPenjaminData = [
        ...(values.tarifLab || []),
        ...tempDeletedLab.value,
      ];
      values.tarifLab = JSON.parse(JSON.stringify(combinedPenjaminData));
    }

    if (method.value === "edit") {
      if (!props.payload || !props.payload.uuid) {
        throw new Error("UUID is missing for edit operation");
      }
      const uuid = props.payload.uuid;
      console.log("value edit", values);
      const response = await tarifStore.putApi(uuid, values);
      emit("data-updated");
    } else if (method.value === "add") {
      console.log(values);
      const response = await tarifStore.postApi(values);
      emit("data-updated");
    }
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
        tempTarifLab.value = props.payload.lab;
      }
    } else {
      resetForm();
      resetDialogMode();
      tempDeleteTindakan.value = [];
      tempTarifLab.value = [];
      tempDeletedLab.value = [];
    }
  }
);
const tempTarifLab = ref<TempTarifLab[]>([]);

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

const totalLabPrices = computed(() => {
  return fieldsTarifLab.value.reduce((total, entry) => {
    const lab = optionsLab.value.find(
      (option) => option.uuid === entry.value.tarifLabUuid
    );
    return total + (lab ? lab.harga : 0);
  }, 0);
});

const grandTotalFormatted = computed(() => {
  const total = grandTotal.value + totalLabPrices.value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(total);
});

const getHargaLab = (labUuid: string) => {
  const lab = optionsLab.value.find((option) => option.uuid === labUuid);
  return lab ? lab.harga : 0;
};
</script>

<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Tarif</template>
    <template #body>
      {{ isMcu }}
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
              :invalid="!!errors.code"
              :invalidMessage="errors.code"
              :required="errors.code ? true : false"
            />
            <CustomTextfield
              class="col-span-5"
              label="Nama Tarif Tindakan"
              v-model="name"
              placeholder="Nama Tarif Tindakan"
              :invalid="!!errors.name"
              :invalidMessage="errors.name"
              :required="errors.code ? true : false"
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
              @update:modelValue="handleUnitPelayananUpdate"
              optionLabel="label"
              placeholder="Pelayanan"
              class="col-span-6"
              :invalid="!!errors.unitPelayananSelected"
              :invalidMessage="errors.unitPelayananSelected"
              :required="errors.unitPelayananSelected ? true : false"
            />
            <CustomMultiSelect
              label="Metode Pembayaran"
              v-model="penjaminSelected"
              :options="penjaminPayload"
              @update:modelValue="handlePenjaminUpdate"
              optionValue="uuid"
              optionLabel="name"
              placeholder="Metode Pembayaran"
              class="col-span-6"
              :invalid="!!errors.penjaminSelected"
              :invalidMessage="errors.penjaminSelected"
              :required="errors.penjaminSelected ? true : false"
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
                        @click="handleRemoveTindakan(idx)"
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
                              place-holder="Pilih Komponen Tarif"
                              :options="komponenTarifPayload"
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
                      <div>List Tarif Lab</div>
                    </template>
                    <template #body="slotProps">
                      <CustomSelect
                        v-model="slotProps.data.value.tarifLabUuid"
                        label=""
                        :options="optionsLab"
                        option-label="name"
                        option-value="uuid"
                        place-holder="Pilih Tarif Lab"
                        :invalid="(errors as any)[`tarifLab[${slotProps.index}].tarifLabUuid`] ? true : false"
                        :invalidMessage="(errors as any)[`tarifLab[${slotProps.index}].tarifLabUuid`]"
                      />
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
                      <span
                        >Rp.
                        {{
                          getHargaLab(slotProps.data.value.tarifLabUuid)
                        }}</span
                      >
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
                        @click="handleRemoveLab(slotProps.index)"
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
        <div class="flex flex-col col-span-4">
          <div class="font-semibold underline text-SM">Mode Pilih Tarif</div>
          <div class="font-normal text-normal">
            {{ payload.mode }}
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
            {{ grandTotalFormatted }}
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
