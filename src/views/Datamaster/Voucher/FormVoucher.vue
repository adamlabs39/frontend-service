<script lang="ts" setup>
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { dateToEpoch, formatDate, epochToDate } from "@/utils/Helpers";
import { useVoucherStore } from "@/stores/datamaster/voucher";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

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

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode Voucher harus diisi"),
    name: yup.string().required("Nama Voucher harus diisi"),
    qty: yup.number().required("Jumlah Voucher harus diisi"),
    startDate: yup.date().default(new Date()).required("Tanggal harus diplih"),
    endDate: yup.date().default(new Date()).required("Tanggal harus diplih"),
    type: yup.string(),
    value: yup.number(),
    status: yup.bool().default(false),
  }).noUnknown()
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const persenValue = ref();
const potonganValue = ref();

const opsiType = ref([
  { label: "Persen (%)", value: "persentase" },
  { label: "Rupiah (RP)", value: "potongan" },
]);

const voucherStore = useVoucherStore();

const onSubmit = handleSubmit(async (values: any) => {
  console.log(type);

  try {
    if (values.type === "persentase") {
      values.value = persenValue.value;
    } else if (values.type === "potongan") {
      values.value = potonganValue.value;
    }
    values.startDate = dateToEpoch(new Date(values.startDate));
    values.endDate = dateToEpoch(new Date(values.endDate));
    if (method.value === "edit") {
      if (!props.payload || !props.payload.uuid) {
        throw new Error("UUID is missing for edit operation");
      }
      const uuid = props.payload.uuid;
      const response = await voucherStore.putApi(uuid, values);
      console.log("Data updated successfully:", response);
      emit("data-updated");
    } else if (method.value === "add") {
      console.log("Adding new data with values:", values);
      const response = await voucherStore.postApi(values);
      emit("data-updated");
    }
    closeDialog();
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
});

const [code] = defineField("code");
const [name] = defineField("name");
const [qty] = defineField("qty");
const [startDate] = defineField("startDate");
const [endDate] = defineField("endDate");
const [type] = defineField("type");
const [status] = defineField("status");

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
watch(type, (newType) => {
  if (newType === "persentase") {
    potonganValue.value = 0; // Clear potongan value if switching to percentage
  } else if (newType === "potongan") {
    persenValue.value = 0; // Clear percentage value if switching to potongan
  }
});
watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (newValue) {
      resetDialogMode();
      if (props.method !== "add" && props.payload) {
        setValues({
          ...props.payload,
          startDate: epochToDate(props.payload.startDate) as Date,
          endDate: epochToDate(props.payload.endDate) as Date,
        });
        if (props.payload.type === "persentase") {
          persenValue.value = props.payload.value;
          potonganValue.value = 0;
        } else if (props.payload.type === "potongan") {
          potonganValue.value = props.payload.value;
          persenValue.value = 0;
        }
      }
    } else {
      resetForm();
      resetDialogMode();
      persenValue.value = 0;
      potonganValue.value = 0;
    }
  }
);
</script>
<template>
  <CustomDialog
    width="600px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Voucher</template>
    <template #body>
      <!-- Form Input -->
      <div v-if="method !== 'detail'" class="grid grid-cols-12 gap-5 mt-5">
        <CustomTextfield
          label="Kode Voucher"
          v-model="code"
          placeholder="Kode Voucher"
          :invalid="!!errors.code"
          :invalidMessage="errors.code"
          class="col-span-4"
          :required="errors.code ? true : false"
        />
        <CustomTextfield
          label="Nama Voucher"
          v-model="name"
          placeholder="Nama Voucher"
          :invalid="!!errors.name"
          :invalidMessage="errors.name"
          class="col-span-8"
          :required="errors.name ? true : false"
        />
        <div class="flex flex-col grid-cols-12 col-span-7 gap-1">
          <div class="col-span-12 font-semibold text-normal">Tanggal</div>
          <div class="flex justify-between items-center gap-2.5">
            <CustomDatePicker v-model="startDate" :showLabel="false" />
            <PhMinus class="mt-auto mb-3 text-black" />
            <CustomDatePicker v-model="endDate" :showLabel="false" />
          </div>
        </div>
        <CustomInputNumber
          v-model="qty"
          label="Jumlah Voucher"
          class="col-span-5"
          :invalid="!!errors.qty"
          :invalidMessage="errors.qty"
          :required="errors.qty ? true : false"
        />
        <div class="grid items-end w-full grid-cols-2 col-span-7 gap-5">
          <div class="col-span-2 -mb-4 font-semibold text-normal">
            Tipe Voucher
          </div>
          <CustomRadio
            v-for="data in opsiType"
            v-model="type"
            :sideLabel="data.label"
            :value="data.value"
          />
        </div>
        <div class="flex flex-col col-span-5">
          <div class="block font-semibold text-normal">Tarif Voucher</div>
          <div class="grid grid-cols-3 items-end gap-5">
            <CustomInputNumber
              v-model="persenValue"
              label=""
              class="col-span-1"
              :disabled="type === 'potongan'"
            >
              <template #appendText>
                <div class="flex items-center justify-center mr-2.5">%</div>
              </template>
            </CustomInputNumber>
            <CustomInputNumber
              v-model="potonganValue"
              class="col-span-2"
              label=""
              :disabled="type === 'persentase'"
            >
              <template #prependText>
                <div
                  class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD text-adameds-300 bg-adameds-300 rounded-l-md"
                >
                  Rp.
                </div>
              </template>
            </CustomInputNumber>
          </div>
        </div>
        <hr class="col-span-12 border-grey-200" />

        <CustomSwitch
          v-model="status"
          :show-label="true"
          label="Status"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
          class="col-span-12"
        />
      </div>
      <!-- Detail Data -->
      <div v-if="method === 'detail'" class="flex flex-col gap-5 mt-5">
        <CustomInfoRow label="Kode Voucher" :value="payload.code" />
        <CustomInfoRow label="Nama Voucher" :value="payload.name" />
        <CustomInfoRow
          label="Waktu Voucher"
          :value="`${startDate ? formatDate(startDate) : ''} - ${
            endDate ? formatDate(endDate) : ''
          }`"
        />

        <CustomInfoRow label="Jumlah" :value="payload.qty" />
        <CustomInfoRow label="Tipe Voucher" :value="payload.type" />
        <CustomInfoRow label="Tarif Voucher">
          <template #value>
            <span v-if="payload.type === 'potongan'">
              Rp. {{ payload.value }}
            </span>
            <span v-else-if="payload.type === 'persentase'">
              {{ payload.value }}%
            </span>
          </template>
        </CustomInfoRow>
        <hr class="col-span-12 border-grey-200" />
        <CustomInfoRow label="Status">
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
