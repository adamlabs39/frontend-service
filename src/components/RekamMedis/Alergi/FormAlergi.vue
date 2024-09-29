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

const emit = defineEmits(["edit"]);

// const accordionRef = ref<InstanceType<typeof CustomAccordion> | null>(null); // Ref untuk mengakses metode `close`

// Fungsi untuk menutup Accordion
// const closeAccordion = () => {
//     console.log("JOJ")
//     if (accordionRef.value) {

//     accordionRef.value.checkOpen(); // Panggil metode close dari CustomAccordion
//   }
// };

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
    <template #header> Alergi</template>
    <template #content>
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
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
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
