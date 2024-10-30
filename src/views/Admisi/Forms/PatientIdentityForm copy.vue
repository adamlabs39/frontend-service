<script setup lang="ts">
import { onMounted, onUpdated, ref, type PropType } from "vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";
import { utilsStore } from "@/stores/utils";
import { useAdmisiMasterPasienStore } from "@/stores/admisi/masterPasien";
import { setTimeToDate } from "@/utils/Helpers";

// NOTE Store
const storeUtils = utilsStore();
const masterPasienStore = useAdmisiMasterPasienStore();

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
    required: false,
  },
});

const setFormData = (data: any, uuid: string = "") => {
  if (Object.keys(data).length) {
    let tempPatientData = data;
    tempPatientData.birthDetail.birthDate = new Date(
      tempPatientData.birthDetail.birthDate
    );

    if (data.isNewBorn) {
      let tempBirthTime = setTimeToDate(tempPatientData.newBorn.birthTimeBaby);
      tempPatientData.birthDetail.birthTime = tempBirthTime;
    }

    if (uuid) {
      tempPatientData.patientUuid = uuid;
    }
    setValues({
      ...tempPatientData,
    });
  }
};

onMounted(() => {
  if (
    props.formType == "Daftar Bayi Baru Lahir" ||
    (props.patientData && props.patientData.isNewBorn)
  ) {
    newBorn.value = true;
  }

  setFormData(props.patientData);
});

onUpdated(() => {
  if (
    props.formType == "Daftar Bayi Baru Lahir" ||
    (props.patientData && props.patientData.isNewBorn)
  ) {
    newBorn.value = true;
  }
  setFormData(props.patientData);
});

const timer = ref<any>();
const listDataPatient = ref([]);
const loadingSearchPatient = ref(false);
const searchPatientData = async (filter: string) => {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
  timer.value = setTimeout(async () => {
    loadingSearchPatient.value = true;
    try {
      const response = await masterPasienStore.getMasterPasien({
        q: filter,
      });
      if (response && response.payload) {
        listDataPatient.value = response.payload;
      } else listDataPatient.value = [];
    } catch (error) {
      console.error("Failed to fetch data", error);
      return [];
    } finally {
    }
    loadingSearchPatient.value = false;
  }, 800);
};

const setSelectedPatientData = async (data: any) => {
  // FIXME Data kurang lengkap
  storeUtils.setLoading(true);
  try {
    const response = await masterPasienStore.getDetailMasterPasien(data.uuid);
    if (response && response.payload) {
      setFormData(response.payload, data.uuid);
    }
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    storeUtils.setLoading(false);
  }
  // if (data) {
  //   setValues({
  //     ...data,
  //     patientUuid: data.uuid,
  //   });
  // } else {
  //   resetForm();
  // }
};

const newBorn = ref(false);
const withoutIdentity = ref(false);
const selectedDataPatient = ref<any>();

const schema = toTypedSchema(
  yup
    .object({
      patientUuid: yup.string(),
      noRm: yup.string(),
      title: yup.string().required("Awalan/Gelar harus dipilih"),
      name: yup.string().required("Nama lengkap harus diisi"),
      identity: yup.string().required("Identitas harus dipilih"),
      noIdentity: yup.string().required("No identitas harus diisi"),
      birthDetail: yup
        .object({
          birthPlace: yup.string().required("Tempat lahir harus diisi"),
          birthDate: yup.date().required("Tanggal lahir harus dipilih"),
          // NOTE Daftar bayi baru lahir
          birthTime: yup.date().required("Tanggal lahir harus dipilih"),
        })
        .noUnknown(),
      gender: yup.string().required("Jenis kelamin harus dipilih"),
      phone: yup.string().required("No. Handphone harus diisi"),
      religion: yup.string().required("Agama harus dipilih"),
      language: yup.string().required("Bahasa yang dikuasai harus dipilih"),
      maritialStatus: yup.string().required("Status pernikahan harus dipilih"),
      motherName: yup.string().required("Nama ibu kandung harus diisi"),
      address: yup
        .object({
          prov: yup.string().required("Provinsi harus dipilih"),
          city: yup.string().required("Kabupaten / Kota harus dipilih"),
          district: yup.string().required("Kecamatan harus dipilih"),
          rt: yup.string().required("RT harus diisi"),
          rw: yup.string().required("RW harus diisi"),
          fullAddress: yup.string().required("Alamat harus diisi"),
          country: yup.string().required("Negara harus diisi"),
          village: yup.string().required("Kelurahan / Desa harus dipilih"),
          postalCode: yup.string().required("Kode Pos harus dipilih"),
        })
        .noUnknown(),
    })
    .noUnknown()
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [noRm] = defineField("noRm");
const [title] = defineField("title");
const [name] = defineField("name");
const [identity] = defineField("identity");
const [noIdentity] = defineField("noIdentity");
const [birthDetailPlace] = defineField("birthDetail.birthPlace");
const [birthDetailDate] = defineField("birthDetail.birthDate");
const [birthDetailTime] = defineField("birthDetail.birthTime");
const [gender] = defineField("gender");
const [phone] = defineField("phone");
const [religion] = defineField("religion");
const [language] = defineField("language");
const [maritialStatus] = defineField("maritialStatus");
const [motherName] = defineField("motherName");
const [addressProv] = defineField("address.prov");
const [addressCity] = defineField("address.city");
const [addressDistrict] = defineField("address.district");
const [addressRt] = defineField("address.rt");
const [addressRw] = defineField("address.rw");
const [addressFullAddress] = defineField("address.fullAddress");
const [addressCountry] = defineField("address.country");
const [addressVillage] = defineField("address.village");
const [addressPostalCode] = defineField("address.postalCode");

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
  <CustomAccordion :openWithHeader="false" initialState="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <span class="leading-10 text-adameds-300 text-heading">
            Identitas Pasien
          </span>
        </div>
      </div>
    </template>
    <template #content>
      <div class="pt-5">
        <div class="flex">
          <CustomSelect
            v-if="
              pageType != 'rawat-inap' &&
              formType != 'Edit Data Pasien' &&
              formType != 'Detail Edit' &&
              formType != 'Detail'
            "
            v-model="selectedDataPatient"
            @update:model-value="setSelectedPatientData"
            label="Cari Nama / No. RM"
            placeHolder="Cari Nama / No. RM"
            class="grow mr-[30px]"
            :class="{ '': pageType != 'datamaster' }"
            optionLabel="name"
            optionValue=""
            :options="listDataPatient"
            prependIcon="PhMagnifyingGlass"
            :disabled="withoutIdentity || newBorn || isDetail"
            :isLoading="loadingSearchPatient"
            @filter="searchPatientData"
          >
            <template #customOptions="{ option }">
              {{ option.name }} ~ {{ option.noRm }}
            </template>
          </CustomSelect>
          <CustomSwitch
            v-if="pageType == 'igd'"
            v-model="newBorn"
            label="Bayi Baru Lahir"
            class="mr-[50px]"
            @update:model-value="withoutIdentity = false"
            :disabled="isDetail"
          />
          <CustomSwitch
            v-if="pageType == 'igd'"
            v-model="withoutIdentity"
            label="Tanpa Identitas"
            class="mr-[35px]"
            @update:model-value="newBorn = false"
            :disabled="isDetail"
          />
          <div
            v-if="
              pageType != 'rawat-inap' &&
              formType != 'Edit Data Pasien' &&
              formType != 'Detail Edit' &&
              formType != 'Detail'
            "
            class="border-[1px] border-grey-200 mr-[35px]"
          ></div>
          <CustomTextfield
            v-model="noRm"
            label="No. RM"
            class="w-[23.5%]"
            placeholder="No. RM"
            readOnly
          />
        </div>
        <hr class="mt-5 mb-[30px]" />
        <div
          v-if="newBorn || withoutIdentity"
          class="grid grid-cols-2 mb-5 gap-x-[30px]"
        >
          <CustomTextfield
            v-model="name"
            label="Nama Lengkap"
            class="w-full mr-[30px]"
            placeholder="Nama Lengkap"
            :disabled="isDetail"
          />
          <div class="grid grid-cols-4 gap-y-5 gap-x-[30px]">
            <CustomSelect
              v-model="identity"
              label="Identitas"
              placeHolder="Pilih Identitas"
              class="mr-[10px]"
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['KTP', 'Passport', 'SIM', 'Lainya']"
              :disabled="isDetail"
            />
            <CustomTextfield
              v-model="noIdentity"
              :label="newBorn ? 'No. KTP Ibu' : ''"
              class="col-span-3"
              :class="{ 'mt-auto': withoutIdentity }"
              placeholder="KTP"
              :disabled="isDetail"
            />
          </div>
        </div>
        <div v-else class="flex mb-5">
          <CustomSelect
            v-model="title"
            label="Awalan / Gelar"
            placeHolder="Pilih Awalan / Gelar"
            class="pr-[20px] w-1/4"
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="[
              'Tn. (Tuan)',
              'Ny. (Nyonya)',
              'Sdr. (Saudara)',
              'Nn. (Nona)',
              'An. (Anak)',
              'By. (Bayi)',
            ]"
            :disabled="isDetail"
            :invalid="!!errors.title"
            :invalidMessage="errors.title"
          />
          <div class="flex ml-[10px] grow">
            <CustomTextfield
              v-model="name"
              label="Nama Lengkap"
              class="w-full mr-[30px]"
              placeholder="Nama Lengkap"
              :disabled="isDetail"
              :invalid="!!errors.name"
              :invalidMessage="errors.name"
            />
            <CustomSelect
              v-model="identity"
              label="Identitas"
              placeHolder="Pilih Identitas"
              class="mr-[10px]"
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['KTP', 'Passport', 'SIM', 'Lainya']"
              :disabled="isDetail"
              :invalid="!!errors.identity"
              :invalidMessage="errors.identity"
            />
          </div>
          <CustomTextfield
            v-model="noIdentity"
            label=" "
            class="w-[23.5%] mt-5"
            placeholder="KTP"
            :disabled="isDetail"
            :invalid="!!errors.noIdentity"
            :invalidMessage="errors.noIdentity"
          />
        </div>
        <div class="grid grid-cols-4 gap-y-5 gap-x-[30px]">
          <!-- Row 1 -->
          <CustomTextfield
            v-if="!withoutIdentity"
            v-model="birthDetailPlace"
            label="Tempat Lahir"
            class=""
            placeholder="Tempat Lahir"
            :disabled="isDetail"
            :invalid="!!errors['birthDetail.birthPlace']"
            :invalidMessage="errors['birthDetail.birthPlace']"
          />
          <CustomDatePicker
            v-model="birthDetailDate"
            label="Tanggal Lahir"
            placeHolder="01-01-2024"
            class=""
            :disabled="isDetail"
            :invalid="!!errors['birthDetail.birthDate']"
            :invalidMessage="errors['birthDetail.birthDate']"
          />
          <CustomDatePicker
            v-if="newBorn"
            v-model="birthDetailTime"
            label="Jam Lahir"
            placeHolder="00:00"
            class=""
            timeOnly
            :disabled="isDetail"
          />
          <CustomTextfield
            v-else
            label="Umur"
            class=""
            placeholder="Umur"
            :disabled="isDetail"
          />
          <CustomSelect
            v-model="gender"
            label="Jenis Kelamin"
            placeHolder="Pilih Jenis Kelamin"
            class=""
            optionLabel="label"
            optionValue="value"
            :showFilter="false"
            :options="[
              { label: 'Laki-laki', value: 'Male' },
              { label: 'Perempuan', value: 'Female' },
            ]"
            :disabled="isDetail"
            :invalid="!!errors.gender"
            :invalidMessage="errors.gender"
          />
          <!-- Row 2 -->
          <CustomTextfield
            v-if="!newBorn"
            v-model="phone"
            label="No. Handphone"
            class=""
            placeholder="08XX-XXXX-XXXX"
            :disabled="isDetail"
            :invalid="!!errors.phone"
            :invalidMessage="errors.phone"
          />
          <CustomSelect
            v-if="!newBorn && !withoutIdentity"
            v-model="religion"
            label="Agama"
            placeHolder="Pilih Agama"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="[
              'Islam',
              'Kristen',
              'Katolik',
              'Hindu',
              'Buddha',
              'Konghucu',
              'Lain-lain',
            ]"
            :disabled="isDetail"
            :invalid="!!errors.religion"
            :invalidMessage="errors.religion"
          />
          <CustomSelect
            v-if="!newBorn && !withoutIdentity"
            v-model="addressCountry"
            label="Negara"
            placeHolder="Pilih Negara"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Indonesia', 'Jepang', 'Amerika Serikat']"
            :disabled="isDetail"
            :invalid="!!errors['address.country']"
            :invalidMessage="errors['address.country']"
          />
          <CustomSelect
            v-if="!newBorn && !withoutIdentity"
            v-model="language"
            label="Bahasa yang Dikuasai"
            placeHolder="Pilih Bahasa yang Dikuasai"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Bahasa Indonesia', 'Bahasa Inggris', 'Bahasa Jawa']"
            :disabled="isDetail"
            :invalid="!!errors.language"
            :invalidMessage="errors.language"
          />
          <!-- Row 3 -->
          <CustomSelect
            v-if="!newBorn && !withoutIdentity"
            v-model="maritialStatus"
            label="Status Pernikahan"
            placeHolder="Pilih Status Pernikahan"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati']"
            :disabled="isDetail"
            :invalid="!!errors.maritialStatus"
            :invalidMessage="errors.maritialStatus"
          />
          <CustomTextfield
            v-if="!withoutIdentity"
            v-model="motherName"
            label="Nama Ibu Kandung"
            :class="[newBorn ? 'col-span-2' : 'col-span-3']"
            placeholder="Nama Ibu Kandung"
            :disabled="isDetail"
            :invalid="!!errors.motherName"
            :invalidMessage="errors.motherName"
          />
          <CustomSwitch
            v-if="newBorn"
            label="Bayi Kembar"
            class=""
            :disabled="isDetail"
          />
        </div>
        <hr v-if="!withoutIdentity" class="my-[30px]" />
        <div
          v-if="!withoutIdentity"
          class="grid grid-cols-4 gap-y-5 gap-x-[30px]"
        >
          <!-- FIXME Dummy -->
          <CustomSelect
            v-model="addressProv"
            label="Provinsi"
            placeHolder="Pilih Provinsi"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['DKI Jakarta', 'Jawa Barat', 'Jawa Timur']"
            :disabled="isDetail"
            :invalid="!!errors['address.prov']"
            :invalidMessage="errors['address.prov']"
          />
          <!-- FIXME Dummy -->
          <CustomSelect
            v-model="addressCity"
            label="Kabupaten / Kota"
            placeHolder="Pilih Kabupaten / Kota"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Kota Jakarta Pusat', 'Kota Bandung', 'Kota Surabaya']"
            :disabled="isDetail"
            :invalid="!!errors['address.city']"
            :invalidMessage="errors['address.city']"
          />
          <!-- FIXME Dummy -->
          <CustomSelect
            v-model="addressDistrict"
            label="Kecamatan"
            placeHolder="Pilih Kecamatan"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="[
              'Kecamatan Gambir',
              'Kecamatan Cidadap',
              'Kecamatan Wonokromo',
            ]"
            :disabled="isDetail"
            :invalid="!!errors['address.district']"
            :invalidMessage="errors['address.district']"
          />
          <!-- FIXME Dummy -->
          <CustomSelect
            v-model="addressVillage"
            label="Kelurahan / Desa"
            placeHolder="Pilih Kelurahan / Desa"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="[
              'Kelurahan Menteng',
              'Desa Ciburial',
              'Kelurahan Dukuh Menanggal',
            ]"
            :disabled="isDetail"
            :invalid="!!errors['address.village']"
            :invalidMessage="errors['address.village']"
          />
          <div class="grid grid-cols-2 gap-y-5 gap-x-[30px]">
            <CustomTextfield
              v-model="addressRt"
              label="RT"
              class=""
              placeholder="0"
              :disabled="isDetail"
              :invalid="!!errors['address.rt']"
              :invalidMessage="errors['address.rt']"
            />
            <CustomTextfield
              v-model="addressRw"
              label="RW"
              class=""
              placeholder="0"
              :disabled="isDetail"
              :invalid="!!errors['address.rw']"
              :invalidMessage="errors['address.rw']"
            />
          </div>
          <!-- FIXME Dummy -->
          <CustomSelect
            v-model="addressPostalCode"
            label="Kode Pos"
            placeHolder="Pilih Kode Pos"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['10110', '40115', '60241']"
            :disabled="isDetail"
            :invalid="!!errors['address.postalCode']"
            :invalidMessage="errors['address.postalCode']"
          />
          <CustomTextArea
            v-model="addressFullAddress"
            label="Alamat"
            class="col-span-2"
            placeholder="Alamat"
            height="h-10"
            :disabled="isDetail"
            :invalid="!!errors['address.fullAddress']"
            :invalidMessage="errors['address.fullAddress']"
          />
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
