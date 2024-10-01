<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { computed, ref, onBeforeMount } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import HistoriAlergi from "./HistoriAlergi.vue";

const emit = defineEmits(["edit"]);

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

// Local state for method
const currentMethod = ref(props.method);

const schemaAlergi = computed(() =>
  toTypedSchema(
    yup.object({
      isAlergi: yup.bool().default(true),
      pemicuAlergi: yup.string(),
      namaAlergi: yup.string(),
      reaksiAlergi: yup.string(),
      tingkatKeparahanAlergi: yup.string(),
      efekSampingAlergi: yup.string(),
      tanggalKejadianAlergi: yup.date(),
      petugas: yup.string().required("Petugas alergi is required"),
    })
  )
);

const {
  handleSubmit: handleSubmitAlergi,
  defineField: defineFieldAlergi,
  setValues,
} = useForm({
  validationSchema: schemaAlergi,
});

const listPemicuAlergi = ref([
  "Obat",
  "Makanan",
  "Lingkungan",
  "Airbone",
  "Sengatan Serangga",
  "Lateks / Zat lain yang disentuh",
]);

const [pemicuAlergi] = defineFieldAlergi("pemicuAlergi");
const [namaAlergi] = defineFieldAlergi("namaAlergi");
const [reaksiAlergi] = defineFieldAlergi("reaksiAlergi");
const [tingkatKeparahanAlergi] = defineFieldAlergi("tingkatKeparahanAlergi");
const [efekSampingAlergi] = defineFieldAlergi("efekSampingAlergi");
const [tanggalKejadianAlergi] = defineFieldAlergi("tanggalKejadianAlergi");
const [petugas] = defineFieldAlergi("petugas");

const onSubmitFormAlergi = handleSubmitAlergi((values: any) => {
  console.log("Adding new data", values);
  currentMethod.value = "detail";
  emit("edit");
});

onBeforeMount(() => {
  setValues({ petugas: "Nama Petugas" });
});

// Method to handle edit button click
const onEditClick = () => {
  currentMethod.value = "form";
};

const compareDialog = ref(false);
const showDialogCompare = () => {
  compareDialog.value = true;
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
    <template #header>Alergi</template>
    <template #content>
      <div v-if="currentMethod === 'form'" class="flex flex-col">
        <CustomButton
          @click="showDialogCompare"
          class="!rounded-md my-[10px] ml-auto"
          label="Mode Compare"
          size="small"
          icon="LayoutIcon"
        />
        <hr class="mb-[30px]" />
      </div>
      <!-- Form Section -->
      <div
        v-if="currentMethod === 'form'"
        class="grid grid-cols-2 gap-[30px] py-3"
      >
        <CustomSelect
          label="Pemicu Alergi"
          placeHolder="Masukkan Pemicu Alergi"
          v-model="pemicuAlergi"
          :options="listPemicuAlergi"
          optionValue=""
          optionLabel=""
          :isLoading="false"
          :invalid="false"
          invalidMessage="Wajib diisi"
          customSelectClass="border-[#C7CBD2]"
        />
        <CustomTextfield
          label="Nama/Jenis Alergi"
          placeholder="Masukkan Nama Alergi"
          v-model:modelValue="namaAlergi"
        />
        <CustomTextfield
          label="Reaksi"
          placeholder="Masukkan Reaksi"
          v-model:modelValue="reaksiAlergi"
        />
        <CustomTextfield
          label="Tingkat Keparahan"
          placeholder="Masukkan Tingkat Keparahan"
          v-model:modelValue="tingkatKeparahanAlergi"
        />
        <CustomTextfield
          label="Efek Samping"
          placeholder="Masukkan Efek Samping"
          v-model:modelValue="efekSampingAlergi"
        />
        <CustomDatePicker
          v-model="tanggalKejadianAlergi"
          label="Tanggal Kejadian"
        />
      </div>

      <!-- Detail Section -->
      <div
        v-if="currentMethod === 'detail'"
        class="py-5 flex flex-col gap-[19px]"
      >
        <CustomInfoRow label="Pemicu Alergi" :value="pemicuAlergi" />
        <CustomInfoRow label="Nama / Jenis Alergi" :value="namaAlergi" />
        <CustomInfoRow label="Reaksi" :value="reaksiAlergi" />
        <CustomInfoRow
          label="Tingkat Keparahan"
          :value="tingkatKeparahanAlergi"
        />
        <CustomInfoRow label="Efek Samping" :value="efekSampingAlergi" />
        <CustomInfoRow
          label="Tanggal Kejadian"
          :value="`${tanggalKejadianAlergi}`"
        />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" :value="petugas" />
      </div>

      <!-- Dialog compare -->
      <CustomDialog class="" v-model:visible="compareDialog" width="80%">
        <template #header>Alergi</template>
        <template #body>
          <div class="pt-5 grid grid-cols-[1fr_min-content_1fr]">
            <div>
              <div class="mb-[18px] flex justify-between">
                <div class="font-semibold text-grey-400">
                  Riwayat Sebelumnya
                </div>
                <div class="flex">
                  <CustomButton
                    @click="()=>{}"
                    class="!rounded-md mr-[10px]"
                    size="small"
                    icon="PhCaretLeft"
                  />
                  <CustomButton
                    @click="()=>{}"
                    class="!rounded-md"
                    size="small"
                    icon="PhCaretRight"
                  />
                </div>
              </div>
              <div class="grid grid-cols-[1fr_min-content_1fr]">
                <HistoriAlergi />
                <div class="border border-adameds-300 mx-[15px]"></div>
                <HistoriAlergi />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col gap-y-5">
              <CustomSelect
                label="Pemicu Alergi"
                placeHolder="Masukkan Pemicu Alergi"
                v-model="pemicuAlergi"
                :options="listPemicuAlergi"
                optionValue=""
                optionLabel=""
                :isLoading="false"
                :invalid="false"
                invalidMessage="Wajib diisi"
                customSelectClass="border-[#C7CBD2]"
              />
              <CustomTextfield
                label="Nama/Jenis Alergi"
                placeholder="Masukkan Nama Alergi"
                v-model:modelValue="namaAlergi"
              />
              <CustomTextfield
                label="Reaksi"
                placeholder="Masukkan Reaksi"
                v-model:modelValue="reaksiAlergi"
              />
              <CustomTextfield
                label="Tingkat Keparahan"
                placeholder="Masukkan Tingkat Keparahan"
                v-model:modelValue="tingkatKeparahanAlergi"
              />
              <CustomTextfield
                label="Efek Samping"
                placeholder="Masukkan Efek Samping"
                v-model:modelValue="efekSampingAlergi"
              />
              <CustomDatePicker
                v-model="tanggalKejadianAlergi"
                label="Tanggal Kejadian"
              />
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex items-end justify-end gap-3">
            <CustomButton
              v-if="props.method == 'form'"
              label="Reset"
              textColor="text-grey-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-grey-200"
            />
            <CustomButton
              v-if="currentMethod === 'form'"
              label="Tidak Ada Alergi"
              textColor="text-adameds-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-adameds-300"
            />
            <CustomButton
              v-if="currentMethod === 'form'"
              label="Simpan"
              @click="onSubmitFormAlergi"
            />
            <CustomButton
              v-if="currentMethod === 'detail'"
              label="Edit"
              @click="onEditClick"
            />
          </div>
        </template>
      </CustomDialog>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="props.method == 'form'"
          label="Reset"
          textColor="text-grey-300"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-grey-200"
        />
        <CustomButton
          v-if="currentMethod === 'form'"
          label="Tidak Ada Alergi"
          textColor="text-adameds-300"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-adameds-300"
        />
        <CustomButton
          v-if="currentMethod === 'form'"
          label="Simpan"
          @click="onSubmitFormAlergi"
        />
        <CustomButton
          v-if="currentMethod === 'detail'"
          label="Edit"
          @click="onEditClick"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
