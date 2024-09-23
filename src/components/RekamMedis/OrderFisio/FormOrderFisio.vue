<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
  formDetail: {
    type: Array as () => Array<string>, // Mengubah menjadi array untuk iterasi
    default: () => ["ORDER", "PROSES", "SELESAI"],
  },
});

const emit = defineEmits(["edit"]);
const statusList = [
  { label: "ORDER", bgColor: "bg-[#D4D8DC]", textColor: "text-[#687077]" },
  {
    label: "PROSES",
    bgColor: "bg-blueJeans-75",
    textColor: "text-blueJeans-400",
  },
  { label: "SELESAI", bgColor: "bg-mint-75", textColor: "text-mint-400" },
];

const schema = toTypedSchema(
  yup.object({
    tanggalPemeriksaanFisio: yup.date(),
    petugas: yup.string().required("Petugas harus diisi"),
    datas: yup.array().of(
      yup.object({
        listTindakan: yup.string().required("List tindakan harus diisi"),
        harga: yup.number(),
        jumlah: yup.number(),
      })
    ),
  })
);

const { errors, handleSubmit, resetForm, setValues, defineField } = useForm({
  validationSchema: schema,

  initialValues: {
    petugas: "Nama Petugas",
    datas: [{ listTindakan: "", harga: 10000, jumlah: 0 }],
  },
});

const [tanggalPemeriksaanFisio] = defineField("tanggalPemeriksaanFisio");
const { remove, push, fields } = useFieldArray("datas");

const myPushFunction = () => {
  push({ listTindakan: "", harga: 10000, jumlah: "", petugas: "Nama Petugas" });
};

const listTindakanOptions = ref([
  { label: "Fisio 1", value: "spesialis", harga:"Rp. 30.000", jumlah: 1 },
  { label: "Kurang Tau", value: "biasa", harga: "Rp. 50.000", jumlah: 1 },
]);

const onSubmit = handleSubmit((values) => {
  console.log(values);
  emit("edit", values);
});

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
  <CustomAccordion headerClass="bg-adameds-50" v-if="props.method === 'form'" ref="accordion">
    <template #header>Order Fisio</template>
    <template #content>
      <div class="pt-5">
        <CustomDatePicker
          label="Tgl. Pemeriksaan Fisio"
          class="w-1/4 mb-5"
          v-model="tanggalPemeriksaanFisio"
        />
        <DataTable
          :value="fields"
          tableStyle="min-width: 50rem"
          class="overflow-hidden text-xs rounded-lg bg-adameds-50"
        >
          <Column
            headerClass="bg-adameds-50 font-semibold text-SM"
            class="w-[20px]"
          >
            <template #header>
              <div class="flex items-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>

          <Column headerClass="bg-adameds-50" class="w-3/5">
            <template #header>
              <div class="font-semibold">List Tindakan</div>
            </template>
            <template #body="slotProps">
              <CustomSelect
                prepend-icon="PhMagnifyingGlass"
                v-model="slotProps.data.value.listTindakan"
                :options="listTindakanOptions"
                optionValue="value"
                optionLabel="label"
                label=""
                place-holder="Cari & Pilih Tindakan"
                :invalid="!!errors[`datas[${slotProps.index}].listTindakan`]"
                :invalidMessage="
                  errors[`datas[${slotProps.index}].listTindakan`]
                "
              />
            </template>
          </Column>

          <Column headerClass="bg-adameds-50 " class="w-[150px]">
            <template #header>
              <div class="w-full font-semibold text-center">Jumlah</div>
            </template>
            <template #body="slotProps">
              <CustomInputNumber
                :show-label="false"
                v-model="slotProps.data.value.jumlah"
                :show-buttons="true"
              />
            </template>
          </Column>
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Harga</div>
            </template>
            <template #body="slotProps">
              
              <div class="text-center">{{ slotProps.data.value.harga }}</div>
            </template>
          </Column>

          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Action</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                <CustomButton
                  label=""
                  background-color="bg-danger-300 rounded-lg"
                  @click="remove(slotProps.index)"
                >
                  <img src="@/assets/icons/delete.svg" alt="" width="15px" />
                </CustomButton>
              </div>
            </template>
          </Column>
        </DataTable>
        <div
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
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="props.method == 'form'"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
          @click="resetForm"
        />
        <CustomButton
          v-if="props.method == 'form'"
          label="Simpan Order"
          @click="onSubmit"
        />
        <CustomButton v-else label="Edit" />
      </div>
    </template>
  </CustomAccordion>

  <CustomAccordion v-else headerClass="bg-adameds-50">
    <template #header>Fisioterapi</template>
    <template #content>
      <div class="flex flex-col gap-2.5 pt-5">
        <CustomAccordion
          v-for="(status, index) in statusList"
          :key="index"
          headerClass="bg-adameds-50"
        >
          <template #header>
            <div class="flex justify-between w-full">
              <div class="flex justify-start gap-2.5 items-center">
                <div>FIS1234</div>
                <CustomChip
                  :label="status.label"
                  :show-checked-icon="false"
                  :bgColor="status.bgColor"
                  :textColor="status.textColor"
                  customClass="h-6 pr-[6px] border-none w-auto"
                />
              </div>
              <div>Tgl. Order : 01-01-2024</div>
            </div>
          </template>
          <template #content>
            <div class="pt-5">
              <DataTable :value="listTindakanOptions" class="text-xs">
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
                    <div class="w-full font-semibold text-left">
                      List Tindakan
                    </div>
                  </template>
                  <template #body="slotProps">
                    <div>
                      {{ slotProps.data.label }}
                    </div>
                  </template>
                </Column>

                <Column headerClass="bg-adameds-50" class="w-auto text-center">
                  <template #header>
                    <div class="w-full font-semibold">Jumlah</div>
                  </template>
                  <template #body="slotProps">
                    {{ slotProps.data.jumlah }}
                  </template>
                </Column>

                <Column headerClass="bg-adameds-50" class="w-auto text-end">
                  <template #header>
                    <div class="w-full font-semibold">Harga</div>
                  </template>
                  <template #body="slotProps">
                    {{ slotProps.data.harga }}
                  </template>
                </Column>
              </DataTable>
              <div class="pt-5">
                <CustomInfoRow label="Petugas" value="Nama Petugas " />
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-end gap-3">
              <CustomButton
                v-if="status.label === 'ORDER'"
                label="Batal Order"
                backgroundColor="bg-danger-300"
              />
            </div>
          </template>
        </CustomAccordion>
      </div>
    </template>
  </CustomAccordion>
</template>
