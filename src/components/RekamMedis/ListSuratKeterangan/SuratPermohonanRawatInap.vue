<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import { utilsStore } from "@/stores/utils";
import { useLokasiStore } from "@/stores/datamaster/lokasi";

const emit = defineEmits(["onDelete", "update:dataSurat"]);

const props = defineProps({
  nomorSurat: {
    type: String,
    default: "",
  },
});

const schema = toTypedSchema(
  yup
    .object({
      noSurat: yup.string().default("No. 12345").notRequired(),
      tanggalRawat: yup
        .date()
        .required("Tanggal Rencana Rawat Inap harus dipilih"),
      dokter: yup.string().required("Dokter harus dipilih"),
      tujuan: yup.string().required("Tujuan Ruangan Rawat Inap harus dipilih"),
      keterangan: yup.string().required("Keterangan harus diisi"),
    })
    .noUnknown()
);
const { errors, handleSubmit, defineField, resetForm, setFieldValue } = useForm({
  validationSchema: schema,
});

const [noSurat] = defineField("noSurat");
const [tanggalRawat] = defineField("tanggalRawat");
const [dokter] = defineField("dokter");
const [tujuan] = defineField("tujuan");
const [keterangan] = defineField("keterangan");


const doctorOptions = ref<any[]>([]);
const itemsTujuan = ref(["Oprasi", "Rawat Inap"]);

const praktisiStore = usePraktisiStore();
const UseUtilsStore = utilsStore();
const lokasiStore = useLokasiStore();


const loadDropdownData = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const params = {
      page: 1,
      limit: 9999,
      name: "",
      isDoctor: true,
    };
    const response = await praktisiStore.getApi(params);
    if (response && response.payload) {
      doctorOptions.value = response.payload;
    } else {
      doctorOptions.value = [];
    }
  } catch (error) {
    console.error("Gagal mengambil data dokter:", error);
    doctorOptions.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

onMounted(() => {
  loadDropdownData();
});

const submitForm = handleSubmit((values) => {
  emit("update:dataSurat", values);
  return values;
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

const selectedTab = ref("non-bpjs");

watch(
  () => props.nomorSurat,
  (newVal) => {
    if (newVal) {
      setFieldValue("noSurat", newVal);
    }
  },
  { immediate: true }
);

defineExpose({
  submitForm,
  open,
  close,
});
</script>
<template>
  <CustomAccordion
    headerClass="bg-adameds-50"
    initial-state="0"
    ref="accordion"
  >
    <template #header>
      <div class="flex items-center justify-between w-full pr-2.5">
        Surat Permohonan Rawat Inap (SPRI)
        <PhX :size="20" @click="emit('onDelete')" />
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-12 gap-5 pt-5">
        <div class="col-span-12 flex gap-2.5">
          <CustomButton
            label="NON-BPJS"
            class="grow"
            :text-color="
              selectedTab === 'non-bpjs' ? 'text-white' : 'text-adameds-300'
            "
            :border-color="
              selectedTab === 'non-bpjs' ? 'border-none' : 'border-adameds-300'
            "
            :class="selectedTab === 'non-bpjs' ? 'bg-adameds-300' : 'bg-white'"
            @click="selectedTab = 'non-bpjs'"
            :outlined="selectedTab !== 'non-bpjs'"
          />
          <CustomButton
            label="BPJS"
            class="grow"
            :text-color="
              selectedTab === 'bpjs' ? 'text-white' : 'text-adameds-300'
            "
            :border-color="
              selectedTab === 'bpjs' ? 'border-none' : 'border-adameds-300'
            "
            :class="selectedTab === 'bpjs' ? 'bg-adameds-300' : 'bg-white'"
            @click="selectedTab = 'bpjs'"
            :outlined="selectedTab !== 'bpjs'"
            :disabled="true"
          />
        </div>
        <hr class="col-span-12 border-grey-200" />
        <CustomTextfield
          label="No. Surat"
          v-model="noSurat"
          class="col-span-6"
          :disabled="true"
        />
        <CustomDatePicker
          label="Tanggal rencana Rawat Inap"
          class="col-span-6"
          v-model="tanggalRawat"
          :invalid="!!errors.tanggalRawat"
          :invalidMessage="errors.tanggalRawat"
        />
        <CustomSelect
          label="Dokter"
          v-model="dokter"
          place-holder="Pilih Dokter"
          :options="doctorOptions"
          option-label="pegawai.name"
          option-value="uuid"
          class="col-span-7"
          :invalid="!!errors.dokter"
          :invalidMessage="errors.dokter"
        />
        <CustomSelect
          label="Tujuan Ruangan Rawat Inap"
          v-model="tujuan"
          place-holder="Pilih Dokter"
          :options="itemsTujuan"
          option-label=""
          option-value=""
          class="col-span-5"
          :invalid="!!errors.tujuan"
          :invalidMessage="errors.tujuan"
        />
        <CustomTextArea
          label="Keterangan / Catatan"
          v-model="keterangan"
          placeholder="Keterangan / Catatan ..."
          class="col-span-12"
          :invalid="!!errors.keterangan"
          :invalidMessage="errors.keterangan"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
