<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, type PropType } from "vue";
import { utilsStore } from "@/stores/utils";
import { useMonitoringKamarStore } from "@/stores/admisi/monitoringKamar";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";

// NOTE Store
const storeUtils = utilsStore();
const monitoringKamarStore = useMonitoringKamarStore();

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
  fetchListRoomData();
  if (Object.keys(props.doctorVisitData).length) {
    let tempDoctorVisitData = props.doctorVisitData;

    noSpri.value = tempDoctorVisitData.noSpri ?? "";
    selectedRoomCategory.value = tempDoctorVisitData.kategoriRuanganUuid ?? "";
    selectedRoomClass.value = tempDoctorVisitData.roomClass ?? "";
    selectedRoom.value = tempDoctorVisitData.roomUuid ?? "";
    selectedBed.value = [tempDoctorVisitData.monitoringRoomUuid ?? ""];
    if (selectedRoom.value) {
      fetchListBedData(selectedRoom.value);
    }
    setValues({
      ...tempDoctorVisitData,
    });
    onPaymentMethodSelect(
      tempDoctorVisitData.paymentMethod == "1" ? "TUNAI" : "ASURANSI"
    );
  }
};

const fetchListRoomData = async () => {
  try {
    storeUtils.setLoading(true);
    const response = await monitoringKamarStore.getMonitoringKamar({});
    if (response && response.payload) {
      listRuangan.value = response.payload;
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const getRoomName = () => {
  const result = listRuangan.value.find(
    (data: any) => data.uuid == selectedRoom.value
  );
  if (result) {
    return result.name;
  } else return "-";
};

const fetchListBedData = async (uuid: string) => {
  try {
    storeUtils.setLoading(true);
    const response = await monitoringKamarStore.getDetailMonitoringKamar(uuid);
    if (response && response.payload) {
      listBed.value = [];
      listBedCadangan.value = [];
      listBoxBayi.value = [];
      response.payload.detail.forEach((bed: any) => {
        if (bed.bedName == "Bed") {
          listBed.value.push(bed);
        } else if (bed.bedName == "Bed Cadangan") {
          listBedCadangan.value.push(bed);
        } else if (bed.bedName == "Box Bayi") {
          listBoxBayi.value.push(bed);
        }
      });
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

onMounted(() => {
  if (props.formType == "Daftar Bayi Baru Lahir") {
    boxBaby.value = true;
  }
  setFormData();
});

onUpdated(() => {
  setFormData();
});

const listKelasRuangan = ref([
  { label: "kelas 1", value: "1" },
  { label: "kelas 2", value: "2" },
  { label: "kelas 3", value: "3" },
  { label: "VIP", value: "4" },
  { label: "VVIP", value: "5" },
]);
const listRuangan = ref<any[]>([]);
const listBed = ref<any[]>([]);
const listBedCadangan = ref<any[]>([]);
const listBoxBayi = ref<any[]>([]);

const noSpri = ref("");
const selectedRoomCategory = ref();
const selectedRoomClass = ref();
const selectedRoom = ref();
const selectedBed = ref<string[]>([]);

const selectedPaymentMethod = ref<string>("TUNAI");
const onPaymentMethodSelect = (label: string) => {
  selectedPaymentMethod.value = label;
  paymentMethod.value = label;
};

const setSelectedBed = (data: any) => {
  if (data.length) {
    monitoringRoomUuid.value = data[0];
  }
};

const schema = computed(() =>
  toTypedSchema(
    yup
      .object({
        paymentMethod: yup.string().default("TUNAI"),
        familyBill: yup.boolean().default(false),
        maternity: yup.boolean().default(false),
        entrustedPatient: yup.boolean().default(false),
        upgradeClass: yup.boolean().default(false),
        previousBill: yup.boolean().default(false),
        complaint: yup.string().default(""),
        note: yup.string().default(""),
        assuranceAccountId: yup
          .string()
          .when("paymentMethod", ([paymentMethod], schema) => {
            return paymentMethod != "TUNAI"
              ? schema.required("Nama Penjamin Harus Dipilih")
              : schema;
          }),
        practitionerUuid: yup.string().required("DPJP harus dipilih"),
        monitoringRoomUuid: yup
          .string()
          .required("Harus memilih bed terlebih dahulu"),
        spareBed: yup.boolean().default(false),
        boxBaby: yup.boolean().default(false),
      })
      .noUnknown()
  )
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [paymentMethod] = defineField("paymentMethod");
const [practitionerUuid] = defineField("practitionerUuid");
const [complaint] = defineField("complaint");
const [familyBill] = defineField("familyBill");
const [maternity] = defineField("maternity");
const [entrustedPatient] = defineField("entrustedPatient");
const [upgradeClass] = defineField("upgradeClass");
const [previousBill] = defineField("previousBill");
const [assuranceAccountId] = defineField("assuranceAccountId");
const [monitoringRoomUuid] = defineField("monitoringRoomUuid");
const [spareBed] = defineField("spareBed");
const [boxBaby] = defineField("boxBaby");

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
        {{ errors }}
        <div
          class="grid gap-y-5 gap-x-[30px]"
          :class="[
            patientData.isNewBorn || formType == 'Daftar Bayi Baru Lahir'
              ? 'grid-cols-5'
              : 'grid-cols-2',
          ]"
        >
          <div
            class="gap-x-[30px] grid grid-cols-4"
            :class="[
              patientData.isNewBorn || formType == 'Daftar Bayi Baru Lahir'
                ? 'col-span-4'
                : 'col-span-2',
            ]"
          >
            <!-- FIXME Dummy Data -->
            <!-- v-model="selectedJadwalDpjp" -->
            <CustomSelect
              v-model="practitionerUuid"
              label="DPJP"
              placeHolder="Pilih DPJP"
              class="col-span-2"
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
            <CustomTextfield
              v-model="complaint"
              label="Keluhan Utama"
              class="col-span-2"
              placeholder="Keluhan Utama"
              :disabled="isDetail"
            />
          </div>
          <CustomSwitch
            v-if="patientData.isNewBorn || formType == 'Daftar Bayi Baru Lahir'"
            v-model="familyBill"
            :disabled="isDetail"
            label="Tagihan Keluarga"
            sideLabel="Iya"
          />
        </div>
        <div
          v-if="!patientData.isNewBorn && formType != 'Daftar Bayi Baru Lahir'"
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
            v-model="entrustedPatient"
            label="Pasien Titipan"
            sideLabel="Iya"
            :disabled="isDetail"
          />
          <CustomSwitch
            v-model="upgradeClass"
            label="Naik Kelas"
            sideLabel="Iya"
            :disabled="isDetail"
          />
          <CustomSwitch
            v-model="previousBill"
            label="Gabung Tagihan Sebelumnya"
            sideLabel="Iya"
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
              :invalid="!!errors.assuranceAccountId"
              :invalidMessage="errors.assuranceAccountId"
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
              readOnly
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
              @update:model-value="fetchListBedData"
              label="Ruangan"
              placeHolder="Pilih Ruangan"
              class="col-span-2"
              optionLabel="name"
              optionValue="uuid"
              :showFilter="false"
              :options="listRuangan"
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
                  <span class="text-adameds-300">{{ getRoomName() }}</span> >
                  Pilih Bed
                </div>
                <div class="grid grid-cols-2 gap-[10px] mr-[15px]">
                  <CustomCheckbox
                    v-for="(data, index) in listBed"
                    v-model="selectedBed"
                    @update:model-value="setSelectedBed"
                    :title="data.patientUuid ? data.patient.name : '-'"
                    :subTitle="'Bed ' + data.noBed"
                    :endText="
                      selectedBed[0] == data.uuid
                        ? 'Terpilih'
                        : data.patientUuid
                        ? 'Terisi'
                        : 'Kosong'
                    "
                    :key="data.uuid"
                    :binary="false"
                    :value="`${data.uuid}`"
                    :multiple="false"
                    :disabled="
                      !!data.patientUuid ||
                      isDetail ||
                      formType == 'Daftar Bayi Baru Lahir' ||
                      doctorVisitData.statusRi == 3
                    "
                  />
                </div>
              </div>
              <div v-if="spareBed">
                <div class="font-semibold text-normal">
                  <span class="text-adameds-300">{{ getRoomName() }}</span> >
                  Pilih Bed
                </div>
                <div class="grid grid-cols-2 gap-[10px] mr-[15px]">
                  <!-- FIXME Uncomment on prod -->
                  <CustomCheckbox
                    v-for="(data, index) in listBedCadangan"
                    v-model="selectedBed"
                    @update:model-value="setSelectedBed"
                    :title="data.patientUuid ? data.patient.name : '-'"
                    :subTitle="'Bed ' + data.noBed"
                    :endText="
                      selectedBed[0] == data.uuid
                        ? 'Terpilih'
                        : data.patientUuid
                        ? 'Terisi'
                        : 'Kosong'
                    "
                    :key="data.uuid"
                    :binary="false"
                    :value="`${data.uuid}`"
                    :multiple="false"
                    :disabled="
                      !!data.patientUuid ||
                      isDetail ||
                      formType == 'Daftar Bayi Baru Lahir' ||
                      doctorVisitData.statusRi == 3
                    "
                  />
                </div>
              </div>
              <div v-if="boxBaby">
                <div class="mt-5 font-semibold text-normal">
                  <span class="text-adameds-300">{{ getRoomName() }}</span> >
                  Pilih Bed - Box Bayi
                </div>
                <div class="grid grid-cols-2 col-span-2 gap-[10px] mr-[15px]">
                  <!-- FIXME Uncomment on prod -->
                  <CustomCheckbox
                    v-for="(data, index) in listBoxBayi"
                    v-model="selectedBed"
                    @update:model-value="setSelectedBed"
                    :title="data.patientUuid ? data.patient.name : '-'"
                    :subTitle="'Box ' + data.noBed"
                    :endText="
                      selectedBed[0] == data.uuid
                        ? 'Terpilih'
                        : data.patientUuid
                        ? 'Terisi'
                        : 'Kosong'
                    "
                    :key="data.uuid"
                    :binary="false"
                    :value="`${data.uuid}`"
                    :multiple="false"
                    :disabled="
                      !!data.patientUuid ||
                      isDetail ||
                      doctorVisitData.statusRi == 3
                    "
                  />
                </div>
              </div>
            </div>
            <div
              v-if="formType != 'Daftar Bayi Baru Lahir'"
              class="border-l-[1px] border-gray-100 pl-[15px]"
            >
              <CustomSwitch
                v-model="spareBed"
                label="Tambahan"
                class="mb-[30px]"
                sideLabel="Bed Cadangan"
                sideLabelTrue="Bed Cadangan"
                :disabled="isDetail || doctorVisitData.statusRi == 3"
              />
              <CustomSwitch
                v-model="boxBaby"
                label=""
                sideLabel="Box Bayi"
                sideLabelTrue="Box Bayi"
                :disabled="isDetail || doctorVisitData.statusRi == 3"
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
