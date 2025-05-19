<script setup lang="ts">
import { onMounted, computed, ref, type PropType, onUpdated } from "vue";
import { utilsStore } from "@/stores/utils";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import { usePenjaminStore } from "@/stores/datamaster/penjamin";
import { useLokasiStore } from "@/stores/datamaster/lokasi";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  formType: {
    type: String,
    default: "",
  },
  isDetail: {
    type: Boolean,
    required: false,
  },
  patientData: {
    type: Object as PropType<any>,
    required: true,
  },
});

const status = ref(false);
const praktisiStore = usePraktisiStore();
const storeUtils = utilsStore();
const penjaminStore = usePenjaminStore();
const lokasiStore = useLokasiStore();
const listDpjp = ref<any[]>([]);
const listPenjamin = ref<any[]>([]);
const listLokasi = ref<any[]>([]);

const fetchUtils = async () => {
  try {
    const responseDpjp = await praktisiStore.getApi({
      limit: 9999,
      // nonDoctor: false,
    });
    if (responseDpjp && responseDpjp.payload) {
      listDpjp.value = responseDpjp.payload.filter(
        (praktisi: any) => praktisi.isDoctor && praktisi.status
      );
    }

    const responsePenjamin = await penjaminStore.getAktifApi();

    if (responsePenjamin && responsePenjamin.payload) {
      listPenjamin.value = responsePenjamin.payload;
      console.log("listPenjamin.value", listPenjamin.value);
    } else {
      listPenjamin.value = [];
    }

    const lokasiresponse = await lokasiStore.getApi();

    if (lokasiresponse && lokasiresponse.payload) {
      listLokasi.value = lokasiresponse.payload;
      console.log("listLokasi.value", listLokasi.value);
    } else {
      listLokasi.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const selectedPaymentMethod = ref<string[]>(["TUNAI"]);
const onPaymentMethodSelect = (label: string) => {
  selectedPaymentMethod.value[0] = label;
  paymentMethod.value = label;
};

const schema = computed(() =>
  toTypedSchema(
    yup
      .object({
        paymentMethod: yup.string().default("TUNAI"),
        pasienMaternitas: yup.boolean(),
        keluhanUtama: yup.string().default(""),
        catatan: yup.string().default(""),
        penjaminUuid: yup.string().required("Nama Penjamin harus dipilih"),
        dokterPengirimUuid: yup.string().required("Dokter harus dipilih"),
        lokasiUuid: yup.string().required("Unit Asal harus dipilih"),
        accountNumber: yup.string(),
        classEntitle: yup.string(),
      })
      .noUnknown()
  )
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [paymentMethod] = defineField("paymentMethod");
const [pasienMaternitas] = defineField("pasienMaternitas");
const [keluhanUtama] = defineField("keluhanUtama");
const [catatan] = defineField("catatan");
const [penjaminUuid] = defineField("penjaminUuid");
const [dokterPengirimUuid] = defineField("dokterPengirimUuid");
const [lokasiUuid] = defineField("lokasiUuid");
const [accountNumber] = defineField("accountNumber");
const [classEntitle] = defineField("classEntitle");

const onSubmit = handleSubmit(async (values) => {
  return values;
});

onMounted(() => {
  fetchUtils();
});

onUpdated(() => {
  fetchUtils();
});

const submitForm = () => {
  console.log("Submited Doctor Visit Detail Form");
};

defineExpose({
  submitForm,
  onSubmit,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" class="mt-[10px]" initialState="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <span class="leading-10 text-adameds-300 text-heading">
            Detail Kunjungan & Dokter
          </span>
          <CustomChip
            label="TUNAI"
            borderColor="border-adameds-300"
            bgColor="bg-adameds-50"
            iconColor="text-adameds-300"
            textColor="text-adameds-300"
            customClass="h-5"
            class="my-auto ml-5"
            :isSelected="selectedPaymentMethod.includes('TUNAI')"
            @selected="onPaymentMethodSelect"
            selectedColor="bg-adameds-300 border-adameds-300"
          />
          <CustomChip
            label="ASURANSI"
            borderColor="border-warning-300"
            bgColor="bg-warning-50"
            iconColor="text-warning-300"
            textColor="text-warning-300"
            customClass="h-5"
            class="ml-[10px] my-auto"
            :isSelected="selectedPaymentMethod.includes('ASURANSI')"
            @selected="onPaymentMethodSelect"
            selectedColor="bg-warning-300 border-warning-300"
          />
        </div>
      </div>
    </template>
    <template #content>
      <div class="pt-5">
        <div class="flex gap-y-5 gap-x-[30px]">
          <CustomSelect
            v-model="lokasiUuid"
            label="Unit Asal"
            placeHolder="Pilih Unit Asal"
            optionValue="uuid"
            optionLabel="name"
            :showFilter="false"
            :options="listLokasi"
            :disabled="isDetail"
            :invalid="!!errors.lokasiUuid"
            :invalidMessage="errors.lokasiUuid"
            class="mr-3 grow"
          />
          <CustomSelect
            v-model="dokterPengirimUuid"
            label="Dokter Pengirim"
            placeholder="Dokter Pengirim"
            class="w-1/3 mr-3"
            optionLabel="pegawai.name"
            optionValue="uuid"
            :options="listDpjp"
            :showFilter="false"
            :disabled="isDetail"
            :invalid="!!errors.dokterPengirimUuid"
            :invalidMessage="errors.dokterPengirimUuid"
          />
          <CustomSwitch
            v-model="pasienMaternitas"
            :show-label="true"
            label="Pasien Maternitas"
            sideLabel="Tidak"
            sideLabelTrue="Iya"
            class="w-[150px] mr-3"
            :disabled="isDetail"
          />
        </div>
        <div class="flex gap-y-5 gap-x-[30px] mt-5">
          <CustomTextfield
            v-model="keluhanUtama"
            label="Keluhan Utama"
            class="w-1/2 col-span-2 mr-3 grow"
            placeholder="Keluhan Utama"
          />
          <CustomTextArea
            v-model="catatan"
            label="Catatan"
            class="w-1/2 col-span-2 mr-3"
            placeholder="Catatan"
            height="h-10"
          />
        </div>
        <div v-if="selectedPaymentMethod.includes('ASURANSI')">
          <hr class="my-[30px]" />
          <div class="grid grid-cols-3 gap-y-5 gap-x-[30px]">
            <CustomSelect
              v-model="penjaminUuid"
              label="Nama Penjamin"
              placeHolder="Pilih Nama Penjamin"
              class=""
              optionLabel="name"
              optionValue="uuid"
              :showFilter="false"
              :options="listPenjamin"
              :disabled="isDetail"
              :invalid="!!errors['penjaminUuid']"
              :invalidMessage="errors['penjaminUuid']"
            />
            <CustomTextfield
              v-model="accountNumber"
              label="No. Penjamin"
              class=""
              placeholder="No. Penjamin"
              :disabled="isDetail"
            />
            <CustomSelect
              v-model="classEntitle"
              label="Kelas"
              placeHolder="Pilih Kelas"
              class=""
              optionLabel="name"
              optionValue="uuid"
              :showFilter="false"
              :options="[
                {
                  uuid: 'kelas1',
                  name: 'Kelas 1',
                },
                {
                  uuid: 'kelas2',
                  name: 'Kelas 2',
                },
                {
                  uuid: 'kelas3',
                  name: 'Kelas 3',
                },
                {
                  uuid: 'kelasVip',
                  name: 'Kelas VIP',
                },
                {
                  uuid: 'kelasVvip',
                  name: 'Kelas VVIP',
                },
                {
                  uuid: 'kelasReguler',
                  name: 'Kelas Reguler',
                },
                {
                  uuid: 'kelasEksekutif',
                  name: 'Kelas Eksekutif',
                },
              ]"
              :disabled="isDetail"
            />
          </div>
        </div>
      </div>
    </template>
    <template #collapseIcon>
      <CustomButton
        icon="PhCaretUp"
        backgroundColor="bg-adameds-75"
        textColor="text-adameds-300"
      />
    </template>
    <template #expandIcon>
      <CustomButton
        icon="PhCaretDown"
        backgroundColor="bg-adameds-75"
        textColor="text-adameds-300"
      />
    </template>
  </CustomAccordion>
</template>
