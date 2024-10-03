<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
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
    console.error("Failed to fetch kategori ruangan", error);
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
    console.error("Failed to fetch kategori ruangan", error);
    tindakanPayload.value = [];
  }
};
const fetchKomponenTarif = async () => {
  try {
    const response = await penjaminStore.getApi();
    if (response && response.payload) {
      komponenTarifPayload.value = response.payload;
    } else {
      komponenTarifPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch kategori ruangan", error);
    komponenTarifPayload.value = [];
  }
};
onMounted(() => {
  fetchPenjamin();
  fetchTindakan();
  fetchKomponenTarif();
});

const optionsTarif = ref(["Tindakan", "Ruangan"]);
const optionsPelayanan = ref([
  { label: "IGD", value: 1 },
  { label: "Rawat Jalan", value: 2 },
  { label: "Rawat Inap", value: 3 },
]);

const schema = toTypedSchema(
  yup.object({
    jenisTarif: yup.string(),
    code: yup.string(),
    name: yup.string(),
    grandTotal: yup.number().nullable(),
    mode: yup.string(),
    status: yup.bool().default(false),
    isMcu: yup.bool().default(false),
    unitPelayanan: yup
      .array()
      .of(
        yup.object({
          unitPelayanan: yup.number(),
        })
      )
      .nullable(),
    penjamin: yup
      .array()
      .of(
        yup.object({
          penjaminUuid: yup.string(),
        })
      )
      .nullable(),
    tindakanPoli: yup.array().of(
      yup.object({
        tindakanUuid: yup.string(),
        
      })
    ),
    tarifLab: yup
      .array()
      .of(
        yup.object({
          tarifLabUuid: yup.string(),
          
        })
      )
      .nullable(),
  })
);

const { errors, handleSubmit, resetForm, setValues, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    tindakanPoli: [
      {
        tindakanUuid: "",
        
      },
    ],
    tarifLab: [{ tarifLabUuid: "" }],
  },
});

const listKomponenTarifRef = ref();

const onSubmit = handleSubmit((values) => {
  console.log("Submitted with", values);
  console.log(unitPelayananSelected.value);
});

const [jenisTarif] = defineField("jenisTarif");
const [code] = defineField("code");
const [name] = defineField("name");
const [mode] = defineField("mode");
const [isMcu] = defineField("isMcu");
const [unitPelayanan] = defineField("unitPelayanan");
const [status] = defineField("status");

const unitPelayananSelected = ref();

const {
  remove: removeTindakan,
  push: pushTindakan,
  fields: fieldsTindakan,
} = useFieldArray("tindakanPoli");

const {
  remove: removePelayanan,
  push: pushPelayanan,
  fields: fieldsPelayanan,
} = useFieldArray("unitPelayanan");

const {
  remove: removeTarifLab,
  push: pushTarifLab,
  fields: fieldsTarifLab,
} = useFieldArray("tarifLab");

const handlePushTindakan = () => {
  pushTindakan({ tarifLabUuid: "" });
};
const handlePushTarifLab = () => {
  pushTarifLab({ tarifLabUuid: "" });
};
</script>

<template>
  <div class="flex flex-col h-full min-h-screen gap-5">
    <!-- Grid Section -->
    <div class="grid grid-cols-12 gap-x-[30px] gap-y-5 mt-5">
      <CustomSelect
        class="col-span-2"
        label="Jenis Tarif"
        v-model="jenisTarif"
        place-holder="Jenis Tarif"
        :options="optionsTarif"
        option-label=""
        option-value=""
      />
      <CustomTextfield
        class="col-span-2"
        label="Kode Tarif"
        v-model="code"
        placeholder="Kode Tarif"
      />
      <CustomTextfield
        class="col-span-5"
        label="Nama Tarif Tindakan"
        v-model="name"
        placeholder="Nama Tarif Tindakan"
      />
      <div class="grid items-end w-full grid-cols-2 col-span-3 gap-5">
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
        v-model="unitPelayanan"
        :options="optionsPelayanan"
        option-label="label"
        options-value="value"
        placeholder="Pelayanan"
        class="col-span-6"
      />
      <CustomMultiSelect
        label="Metode Pembayaran"
        :options="penjaminPayload"
        option-label="name"
        options-value="uuid"
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
          <div v-for="(fieldTindakan, idx) in fieldsTindakan" :key="idx">
            <div
              class="flex flex-col gap-5 p-5 pt-5 mb-5 -mx-4 border border-adameds-300 rounded-xl"
            >
              <div class="flex gap-2.5 items-end">
                <CustomButton label="1" class="w-10 h-10 p-3 rounded" />
                <CustomSelect
                  label=""
                  place-holder="Tindakan"
                  :options="tindakanPayload"
                  option-label="name"
                  option-value="uuid"
                  class="w-full"
                />
                <CustomButton
                  background-color="bg-danger-300"
                  @click="removeTindakan"
                >
                  <img src="@/assets/icons/delete.svg" alt="" />
                  <span class="font-semibold text-normal">Hapus</span>
                </CustomButton>
              </div>
              <TableKomponenTarifTindakan ref="listKomponenTarifRef" @update:list-komponen-tarif="" />
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
                  place-holder="Pilih Komponen Tarif"
                />
              </template>
            </Column>
            <Column headerClass="bg-adameds-300 ">
              <template #header>
                <div class="w-full text-xs font-semibold text-white text-end">
                  Rupiah (Rp)
                </div>
              </template>
              <template #body="slotProps">
                <CustomInputNumber label="" align-number="text-end">
                  <template #prependText>
                    <div
                      class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD text-adameds-300 bg-adameds-300 rounded-l-md"
                    >
                      Rp.
                    </div>
                  </template>
                </CustomInputNumber>
              </template>
            </Column>
            <Column header="Action" headerClass="bg-adameds-300 text-white">
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
      <div class="min-w-[300px] text-end font-bold text-MD">Rp. 150,000</div>
    </div>
    <CustomButton
      label="Submit"
      textColor="text-adameds-300"
      @click="onSubmit"
    />
  </div>
</template>
