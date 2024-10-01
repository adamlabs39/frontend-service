<script lang="ts" setup>
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import { useVoucherStore } from "@/stores/datamaster/voucher";


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
  editData: {
    type: Object,
    default: () => ({}),
  },
});

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode Voucher harus diisi"),
    name: yup.string().required("Nama Voucher harus diisi"),
    qty: yup.number().required("Jumlah Voucher harus diisi"),
    startDate: yup.date().required("Tanggal harus diplih"),
    endtDate: yup.date().required("Tanggal harus diplih"),
    type: yup.string(),
    value: yup.number(),
    status: yup.bool().default(false),
  })
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const persenValue=ref()
const potonganValue=ref()

const opsiType = ref([
  { label: "Persen (%)", value: "persentase" },
  { label: "Rupiah (RP)", value: "potongan" },
]);

const voucherStore = useVoucherStore();

const onSubmit = handleSubmit(async (values: any) => {
  console.log("tes");
  
  try {
    if (props.method === "edit") {
      if (!props.editData || !props.editData.uuid) {
        throw new Error("UUID is missing for edit operation");
      }

      const uuid = props.editData.uuid;
      console.log("Editing data with UUID:", uuid, "and values:", values);

      const response = await voucherStore.putApi(uuid, values);
      console.log("Data updated successfully:", response);
    } else if (props.method === "add") {
      console.log("Adding new data with values:", values);

      const response = await voucherStore.postApi(values);
      console.log("Data added successfully:", response);
      emit('data-updated');
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
const [endtDate] = defineField("endtDate");
const [type] = defineField("type");
// const [value] = defineField("value");
const [status] = defineField("status");
const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

function updateVisibility(value: any) {
  emit("update:isDialogVisible", value);
}

function closeDialog() {
  emit("close");
}

watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (newValue && props.method === "edit" && props.editData) {
      setValues({
        ...props.editData,
      });
    } else if (!newValue) {
      resetForm();
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
      <div class="grid grid-cols-12 gap-5 mt-5">
        <CustomTextfield
          label="Kode Voucher"
          v-model="code"
          placeholder="Kode Voucher"
          :invalid="!!errors.code"
          :invalidMessage="errors.code"
          class="col-span-4"
        />
        <CustomTextfield
          label="Nama Voucher"
          v-model="name"
          placeholder="Nama Voucher"
          :invalid="!!errors.name"
          :invalidMessage="errors.name"
          class="col-span-8"
        />
        <div class="grid items-center justify-center grid-cols-12 col-span-6 gap-1">
          <div class="col-span-12">Tanggal</div>
          <CustomDatePicker
            v-model="startDate"
            :showLabel="false"
            class="col-span-5"
          />
          <PhMinus class="col-span-2 mt-auto mb-3 text-black" />
          <CustomDatePicker
            v-model="endtDate"
            :showLabel="false"
            class="col-span-5"
          />
        </div>
        <CustomInputNumber
          v-model="qty"
          label="Jumlah Voucher"
          class="col-span-6"
          :invalid="!!errors.qty"
          :invalidMessage="errors.qty"
        />
        <div class="grid items-end w-full grid-cols-2 col-span-6 gap-5">
          <div class="col-span-2 -mb-4 font-semibold text-MD">Tipe Voucher</div>
          <CustomRadio
            v-for="data in opsiType"
            v-model="type"
            :sideLabel="data.label"
            :value="data.value"
          />
        </div>
        <div class="flex flex-col col-span-6">
          <div class="block font-semibold">Tarif Voucher</div>
          <div class="flex items-end gap-5">
            <CustomInputNumber v-model="persenValue"
            label="" class="basis-1/3" :disabled="type==='potongan'">
              <template #appendText>
                <div class="flex items-center justify-center mr-2.5">%</div>
              </template>
            </CustomInputNumber>
            <CustomInputNumber v-model="potonganValue" class="" label="" :disabled="type==='persen'">
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
            @click="closeDialog"
          >
          </CustomButton>
          <CustomButton label="Simpan" @click="onSubmit"> </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
