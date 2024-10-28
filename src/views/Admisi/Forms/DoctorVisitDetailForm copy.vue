<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, type PropType } from "vue";
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

// NOTE Store
const storeUtils = utilsStore();

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

    setValues({
      ...tempDoctorVisitData,
    });
    onPaymentMethodSelect(
      tempDoctorVisitData.paymentMethod == "1" ? "TUNAI" : "ASURANSI"
    );
  }
};

onMounted(() => {
  if (props.formType == "Daftar Bayi Baru Lahir") {
    babyBox.value = true;
  }
  // if (storeUtils.selectedRoom) {
  //   selectedRoomCategory.value = storeUtils.selectedRoom.roomCategory;
  //   selectedRoomClass.value = storeUtils.selectedRoom.roomClass;
  //   selectedRoom.value = storeUtils.selectedRoom.room;
  //   selectedBed.value.push(`${storeUtils.selectedRoom.bed}`);
  //   storeUtils.setSelectedRoom(null);
  // }
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

const listKelasRuangan = ref([
  { label: "kelas 1", value: 1 },
  { label: "kelas 2", value: 2 },
  { label: "kelas 3", value: 3 },
  { label: "VIP", value: 4 },
  { label: "VVIP", value: 5 },
]);

const mergeBill = ref(false);
const selectedRoomCategory = ref();
const selectedRoomClass = ref();
const selectedRoom = ref();
const selectedBed = ref<string[]>([]);
const babyBox = ref(false);

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
        jadwalDokterUuid: yup.string().required("Jadwal harus dipilih"),
        maternity: yup.boolean(),
        complaint: yup.string(),
        note: yup.string(),
        assuranceAccountId: yup
          .string()
          .when("paymentMethod", ([paymentMethod], schema) => {
            return paymentMethod != "TUNAI"
              ? schema.required("Nama Penjamin Harus Dipilih")
              : schema;
          }),
        // NOTE Rawat Inap
        practitionerUuid: yup.string().required("DPJP harus dipilih"),
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
const [assuranceAccountId] = defineField("assuranceAccountId");
// NOTE Rawat Jalan
const [jadwalDokterUuid] = defineField("jadwalDokterUuid");
// NOTE Rawat Inap
const [practitionerUuid] = defineField("practitionerUuid");

const onSubmit = handleSubmit(async (values) => {
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
        <div
          class="grid gap-y-5 gap-x-[30px]"
          :class="[
            (patientData.isNewBorn || formType == 'Daftar Bayi Baru Lahir') &&
            pageType == 'rawat-inap'
              ? 'grid-cols-5'
              : 'grid-cols-2',
          ]"
        >
          <div
            class="gap-x-[30px]"
            :class="[
              (patientData.isNewBorn || formType == 'Daftar Bayi Baru Lahir') &&
              pageType == 'rawat-inap'
                ? 'col-span-4'
                : 'col-span-2',
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
                'col-span-2':
                  ((patientData.isNewBorn ||
                    formType == 'Daftar Bayi Baru Lahir') &&
                    pageType == 'rawat-inap') ||
                  pageType == 'igd',
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
              v-if="pageType == 'igd' || pageType == 'rawat-inap'"
              v-model="complaint"
              label="Keluhan Utama"
              :class="{
                'col-span-2':
                  ((patientData.isNewBorn ||
                    formType == 'Daftar Bayi Baru Lahir') &&
                    pageType == 'rawat-inap') ||
                  pageType == 'igd',
              }"
              placeholder="Keluhan Utama"
              :disabled="isDetail"
            />
          </div>
          <CustomSwitch
            v-if="
              (patientData.isNewBorn || formType == 'Daftar Bayi Baru Lahir') &&
              pageType == 'rawat-inap'
            "
            :disabled="!mergeBill || isDetail"
            label="Tagihan Keluarga"
            sideLabel="Iya"
          />
        </div>
        <div
          v-if="
            (!patientData.isNewBorn &&
              formType != 'Daftar Bayi Baru Lahir' &&
              pageType == 'rawat-inap') ||
            pageType != 'rawat-inap'
          "
          class="grid gap-y-5 gap-x-[30px] mt-5"
          :class="[pageType == 'rawat-inap' ? 'grid-cols-4' : 'grid-cols-5']"
        >
          <CustomSwitch
            v-model="maternity"
            label="Pasien Maternitas"
            sideLabel="Iya"
            :disabled="isDetail"
          />
          <CustomSwitch
            v-if="pageType == 'rawat-inap'"
            label="Pasien Titipan"
            sideLabel="Iya"
            :disabled="isDetail"
          />
          <CustomSwitch
            v-if="pageType == 'rawat-inap'"
            label="Naik Kelas"
            sideLabel="Iya"
            :disabled="isDetail"
          />
          <CustomSwitch
            v-if="pageType == 'rawat-inap'"
            v-model="mergeBill"
            label="Gabung Tagihan Sebelumnya"
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
            v-if="pageType != 'rawat-inap'"
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
          <div class="grid grid-cols-2 gap-y-5 gap-x-[30px]">
            <!-- FIXME Dummy data -->
            <CustomSelect
              v-model="assuranceAccountId"
              label="Nama Penjamin"
              placeHolder="Pilih Nama Penjamin"
              class=""
              optionLabel="name"
              optionValue="uuid"
              :showFilter="false"
              :options="[
                {
                  uuid: '2ed6a3cb-94aa-47f6-bca1-a99ae568e1e1',
                  name: 'BPJS Kesehatan',
                },
                {
                  uuid: '2ed6a3cb-94aa-47f6-bca1-a99ae568e1e2',
                  name: 'Asuransi Prudential',
                },
                {
                  uuid: '2ed6a3cb-94aa-47f6-bca1-a99ae568e1e3',
                  name: 'Asuransi Allianz',
                },
              ]"
              :disabled="isDetail"
            />
            <!-- FIXME Belum ada key untuk menyimpan no penjamin -->
            <CustomTextfield
              label="No. Penjamin"
              class=""
              placeholder="No. Penjamin"
              :disabled="isDetail"
            />
          </div>
        </div>
        <div v-if="pageType == 'rawat-inap'">
          <hr class="my-[30px]" />
          <div class="grid grid-cols-6 gap-x-[30px]">
            <CustomTextfield
              label="SPRI"
              class=""
              placeholder="SPRI"
              disabled
            />
            <!-- FIXME Dummy Data -->
            <CustomSelect
              v-model="selectedRoomCategory"
              label="Kategori Ruangan"
              placeHolder="Pilih Kategori Ruangan"
              class="col-span-2"
              optionLabel="name"
              optionValue="uuid"
              :showFilter="false"
              :options="[
                { name: 'VIP', uuid: '0191690f-1cb3-7884-afeb-6ad62f0e0a1a' },
              ]"
              :disabled="isDetail"
            />
            <CustomSelect
              v-model="selectedRoomClass"
              label="Kelas"
              placeHolder="Pilih Kelas"
              class=""
              optionLabel="label"
              optionValue="value"
              :showFilter="false"
              :options="listKelasRuangan"
              :disabled="isDetail"
            />
            <!-- FIXME Dummy Data -->
            <CustomSelect
              v-model="selectedRoom"
              label="Ruangan"
              placeHolder="Pilih Ruangan"
              class="col-span-2"
              optionLabel="name"
              optionValue="uuid"
              :showFilter="false"
              :options="[
                { name: '101', uuid: '0191690f-1cb3-7a48-8bad-b21700bd19f4' },
              ]"
              :disabled="isDetail"
            />
          </div>
          <div v-if="selectedRoom" class="grid grid-cols-3 mt-[30px]">
            <div
              class=""
              :class="[
                formType == 'Daftar Bayi Baru Lahir'
                  ? 'col-span-3'
                  : 'col-span-2',
              ]"
            >
              <div>
                <div class="font-semibold text-normal">
                  <span class="text-adameds-300">{{ selectedRoom }}</span> >
                  Pilih Bed
                </div>
                <div class="grid grid-cols-2 gap-[10px] mr-[15px]">
                  <CustomCheckbox
                    v-for="(data, index) in ['1', '2', '3', '4', '5', '6']"
                    v-model="selectedBed"
                    :title="
                      selectedBed[0] == data || data == '2' || data == '4'
                        ? 'Nama Lengkap Pasien'
                        : '-'
                    "
                    :subTitle="'Bed ' + data"
                    :endText="
                      selectedBed[0] == data
                        ? 'Terpilih'
                        : data == '2' || data == '4'
                        ? 'Terisi'
                        : 'Kosong'
                    "
                    :key="data + index"
                    :binary="false"
                    :value="`${data}`"
                    :multiple="false"
                    :disabled="
                      data == '2' ||
                      data == '4' ||
                      isDetail ||
                      formType == 'Daftar Bayi Baru Lahir'
                    "
                  />
                </div>
              </div>
              <div v-if="babyBox">
                <div class="mt-5 font-semibold text-normal">
                  <span class="text-adameds-300">{{ selectedRoom }}</span> >
                  Pilih Bed - Box Bayi
                </div>
                <div class="grid grid-cols-2 col-span-2 gap-[10px] mr-[15px]">
                  <CustomCheckbox
                    v-for="(data, index) in [
                      'Bed 1',
                      'Bed 2',
                      'Bed 3',
                      'Bed 4',
                      'Bed 5',
                      'Bed 6',
                    ]"
                    v-model="selectedBed"
                    title="-"
                    :subTitle="'Box ' + data"
                    endText="Kosong"
                    :key="data + index"
                    :binary="false"
                    :value="`${data}`"
                    :multiple="false"
                    :disabled="isDetail"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="formType != 'Daftar Bayi Baru Lahir'"
              class="border-l-[1px] border-gray-100 pl-[15px]"
            >
              <CustomSwitch
                label="Tambahan"
                class="mb-[30px]"
                sideLabel="Bed Cadangan"
                :disabled="isDetail"
              />
              <CustomSwitch
                v-model="babyBox"
                label=""
                sideLabel="Box Bayi"
                :disabled="isDetail"
              />
            </div>
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
