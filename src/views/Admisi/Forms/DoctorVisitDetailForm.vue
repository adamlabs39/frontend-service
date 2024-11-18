<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, type PropType } from "vue";
import { utilsStore } from "@/stores/utils";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";

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
  doctorVisitData: {
    type: Object as PropType<any>,
    required: true,
  },
});

const setFormData = () => {
  if (Object.keys(props.doctorVisitData).length) {
    let tempDoctorVisitData = props.doctorVisitData;
    setPoliDpjpJadwal(tempDoctorVisitData.jadwalDokterUuid);
    if (tempDoctorVisitData.paymentMethod == 2) {
      const tempInsurance = listPenjamin.value.find(
        (penjamin) => penjamin.code == tempDoctorVisitData.insurance.code
      );
      if (tempInsurance) {
        tempDoctorVisitData.insurance.penjaminUuid = tempInsurance.uuid;
      } else tempDoctorVisitData.insurance.penjaminUuid = "";
    }

    setValues({
      ...tempDoctorVisitData,
    });
    onPaymentMethodSelect(
      tempDoctorVisitData.paymentMethod == "1" ? "TUNAI" : "ASURANSI"
    );
  }
};

onMounted(() => {
  setFormData();
});

onUpdated(() => {
  setFormData();
});

const listDataJadwalDokter = ref([
  {
    uuid: "0191c056-f9f7-7beb-a116-ca60bf4a5422",
    name: "Rudi tabuti",
    poli: "Faskes Example",
    day: "Senin",
    startTime: "08:00:00",
    endTime: "16:00:00",
  },
  {
    uuid: "0191c056-f9f7-7beb-a116-ca60bf4a5423",
    name: "Dr. Ali",
    poli: "Faskes Example",
    day: "Senin",
    startTime: "16:00:00",
    endTime: "22:00:00",
  },
  {
    uuid: "0191c056-f9f7-7beb-a116-ca60bf4a5423",
    name: "Dr. Doom",
    poli: "Faskes Example",
    day: "Senin",
    startTime: "22:00:00",
    endTime: "24:00:00",
  },
]);
const listPenjamin = ref([
  {
    uuid: "019304bc-39d4-7e9f-86ab-0c55c786af1f",
    name: "BPJS Kesehatan",
    code: "BPJS",
  },
  {
    uuid: "2ed6a3cb-94aa-47f6-bca1-a99ae568e1e2",
    name: "Asuransi Prudential",
    code: "Prudential",
  },
  {
    uuid: "2ed6a3cb-94aa-47f6-bca1-a99ae568e1e3",
    name: "Asuransi Allianz",
    code: "Allianz",
  },
]);
const selectedJadwalPoli = ref("");
const selectedJadwalDpjp = ref("");
const setPoliDpjpJadwal = (uuid: any) => {
  if (uuid) {
    let tempDataJadwal = listDataJadwalDokter.value.find(
      (data) => data.uuid == uuid
    );
    if (tempDataJadwal) {
      selectedJadwalPoli.value = tempDataJadwal.poli;
      selectedJadwalDpjp.value = tempDataJadwal.name;
    } else {
      selectedJadwalPoli.value = "";
      selectedJadwalDpjp.value = "";
    }
  }
};

const selectedPaymentMethod = ref<string>("TUNAI");
const onPaymentMethodSelect = (label: string) => {
  selectedPaymentMethod.value = label;
  paymentMethod.value = label;
};

const schema = computed(() =>
  toTypedSchema(
    yup
      .object({
        paymentMethod: yup.string().default("TUNAI"),
        jadwalDokterUuid:
          props.pageType == "igd"
            ? yup.string()
            : yup.string().required("Jadwal harus dipilih"),
        maternity: yup.boolean(),
        complaint: yup.string().default(""),
        note: yup.string().default(""),
        insurance: yup
          .object({
            penjaminUuid: yup.string().nullable(),
            accountNumber: yup.string().nullable(),
            classEntitle: yup.string().nullable(),
          })
          .when("paymentMethod", ([paymentMethod], schema) => {
            return paymentMethod == "TUNAI"
              ? schema
              : schema.shape({
                  penjaminUuid: yup
                    .string()
                    .required("Nama Penjamin harus dipilih"),
                  accountNumber: yup
                    .string()
                    .required("No. Penjamin harus diisi"),
                  classEntitle: yup.string().required("Kelas harus dipilih"),
                });
          })
          .noUnknown(),
        // NOTE IGD
        practitionerUuid:
          props.pageType == "igd"
            ? yup.string().required("DPJP harus dipilih")
            : yup.string(),
      })
      .noUnknown()
  )
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [paymentMethod] = defineField("paymentMethod");
const [maternity] = defineField("maternity");
const [complaint] = defineField("complaint");
const [note] = defineField("note");
const [insuranceUuid] = defineField("insurance.penjaminUuid");
const [insuranceAccount] = defineField("insurance.accountNumber");
const [insuranceClass] = defineField("insurance.classEntitle");
// NOTE Rawat Jalan
const [jadwalDokterUuid] = defineField("jadwalDokterUuid");
// NOTE IGD
const [practitionerUuid] = defineField("practitionerUuid");

const onSubmit = handleSubmit(async (values) => {
  if (props.pageType == "rawat-jalan") {
    delete values.practitionerUuid;
  }
  return values;
});
const onResetForm = () => {
  resetForm();
};

defineExpose({
  onSubmit,
  onResetForm,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" class="mt-[10px]" initialState="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <span class="leading-10 text-adameds-300 text-heading">
            {{
              pageType == "rawat-inap"
                ? "Detail Kunjungan & Ruangan"
                : "Detail Kunjungan Dokter"
            }}
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
        <div class="grid grid-cols-2 gap-y-5 gap-x-[30px]">
          <div
            class="gap-x-[30px] col-span-2"
            :class="[
              pageType == 'rawat-jalan'
                ? 'grid grid-cols-3'
                : 'grid grid-cols-4',
            ]"
          >
            <CustomSelect
              v-if="pageType == 'rawat-jalan'"
              v-model="selectedJadwalPoli"
              label="Poli"
              placeHolder="Pilih Poli"
              class=""
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['POLI UMUM', 'POLI ANAK', 'POLI GIGI POLI MATA']"
              :disabled="isDetail"
            />
            <!-- FIXME Dummy Data -->
            <!-- v-model="selectedJadwalDpjp" -->
            <CustomSelect
              v-model="practitionerUuid"
              label="DPJP"
              placeHolder="Pilih DPJP"
              :class="{
                'col-span-2': pageType == 'igd',
              }"
              optionLabel="name"
              optionValue="uuid"
              :options="[
                {
                  uuid: '0191a18a-22e4-79f7-9da5-a10a6e1a60f9',
                  name: 'Rudi tabuti',
                },
                { uuid: '7379hdishdjsfggy73984', name: 'dr. Ali' },
                { uuid: '7379hdishdjsfggy73985', name: 'dr. Doom' },
              ]"
              :showFilter="false"
              :disabled="isDetail"
              :invalid="!!errors.practitionerUuid"
              :invalidMessage="errors.practitionerUuid"
            />
            <!-- FIXME Dummy data -->
            <!-- NOTE Harus ada api baru untuk menampilkan data jadwal dengan filter dokter poli dan jam saat ini -->
            <CustomSelect
              v-if="pageType == 'rawat-jalan'"
              v-model="jadwalDokterUuid"
              @update:model-value="setPoliDpjpJadwal"
              label="Jadwal"
              placeHolder="Pilih Jadwal"
              class=""
              optionLabel="name"
              optionValue="uuid"
              :showFilter="false"
              :options="listDataJadwalDokter"
              :disabled="isDetail"
              :invalid="!!errors.jadwalDokterUuid"
              :invalidMessage="errors.jadwalDokterUuid"
            >
              <template #customOptions="{ option }">
                {{ option.poli }} ({{ option.name }}) | {{ option.day }} -
                {{ option.startTime }}
              </template>
            </CustomSelect>
            <CustomTextfield
              v-if="pageType == 'igd'"
              v-model="complaint"
              label="Keluhan Utama"
              class="col-span-2"
              placeholder="Keluhan Utama"
              :disabled="isDetail"
            />
          </div>
        </div>
        <div class="grid gap-y-5 gap-x-[30px] mt-5 grid-cols-5">
          <CustomSwitch
            v-model="maternity"
            label="Pasien Maternitas"
            sideLabel="Iya"
            :disabled="isDetail"
          />
          <CustomTextfield
            v-if="pageType == 'rawat-jalan'"
            v-model="complaint"
            label="Keluhan Utama"
            class="col-span-2"
            placeholder="Keluhan Utama"
            :disabled="isDetail"
          />
          <CustomTextArea
            v-model="note"
            label="Catatan"
            class="col-span-2"
            :class="{ 'col-span-4': pageType == 'igd' }"
            placeholder="Catatan"
            height="h-10"
            :disabled="isDetail"
          />
        </div>
        <div v-if="selectedPaymentMethod.includes('ASURANSI')">
          <hr class="my-[30px]" />
          <div class="grid grid-cols-3 gap-y-5 gap-x-[30px]">
            <!-- FIXME Dummy data -->
            <CustomSelect
              v-model="insuranceUuid"
              label="Nama Penjamin"
              placeHolder="Pilih Nama Penjamin"
              class=""
              optionLabel="name"
              optionValue="uuid"
              :showFilter="false"
              :options="listPenjamin"
              :disabled="isDetail"
              :invalid="!!errors['insurance.penjaminUuid']"
              :invalidMessage="errors['insurance.penjaminUuid']"
            />
            <!-- FIXME Belum ada key untuk menyimpan no penjamin -->
            <CustomTextfield
              v-model="insuranceAccount"
              label="No. Penjamin"
              class=""
              placeholder="No. Penjamin"
              :disabled="isDetail"
              :invalid="!!errors['insurance.accountNumber']"
              :invalidMessage="errors['insurance.accountNumber']"
            />
            <CustomSelect
              v-model="insuranceClass"
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
              :invalid="!!errors['insurance.classEntitle']"
              :invalidMessage="errors['insurance.classEntitle']"
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
