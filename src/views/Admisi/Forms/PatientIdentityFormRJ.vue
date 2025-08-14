<script setup lang="ts">
import { onMounted, onUpdated, ref, type PropType } from "vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
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
import { useDistrictStore } from "@/stores/datamaster/district";
import { countAge } from "@/utils/Helpers";

// NOTE Store
const storeUtils = utilsStore();
const masterPasienStore = useAdmisiMasterPasienStore();
const districtStore = useDistrictStore();

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

const fetchProvinsi = async () => {
  try {
    const response = await districtStore.getProvinsiApi(); // Ambil data provinsi
    if (response && response.payload) {
      provinsiPayload.value = response.payload;
    } else {
      provinsiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch provinsi", error);
    provinsiPayload.value = [];
  }
};

const fetchKabupaten = async (provinsiId: string) => {
  try {
    const response = await districtStore.getKabupatenApi(provinsiId); // Berikan ID provinsi sebagai parameter
    if (response && response.payload) {
      kabupatenPayload.value = response.payload;
    } else {
      kabupatenPayload.value = [];
    }
    addressCity.value = undefined;
    addressDistrict.value = undefined;
    addressVillage.value = undefined;
  } catch (error) {
    console.error("Failed to fetch kabupaten", error);
    kabupatenPayload.value = [];
  }
};

const fetchKecamatan = async (kabupatenId: string) => {
  try {
    const response = await districtStore.getKecamatanApi(kabupatenId); // Berikan ID kabupaten sebagai parameter
    if (response && response.payload) {
      kecamatanPayload.value = response.payload;
    } else {
      kecamatanPayload.value = [];
    }
    addressDistrict.value = undefined;
    addressVillage.value = undefined;
  } catch (error) {
    console.error("Failed to fetch kecamatan", error);
    kecamatanPayload.value = [];
  }
};

const fetchKelurahan = async (kecamatanId: string) => {
  try {
    const response = await districtStore.getKelurahanApi(kecamatanId); // Berikan ID kecamatan sebagai parameter
    if (response && response.payload) {
      kelurahanPayload.value = response.payload;
    } else {
      kelurahanPayload.value = [];
    }
    addressVillage.value = undefined;
  } catch (error) {
    console.error("Failed to fetch kelurahan", error);
    kelurahanPayload.value = [];
  }
};

const provinsiPayload = ref<any[]>([]);
const kabupatenPayload = ref<any[]>([]);
const kecamatanPayload = ref<any[]>([]);
const kelurahanPayload = ref<any[]>([]);

const setFormData = async (data: any, uuid: string = "") => {
  if (Object.keys(data).length) {
    let tempPatientData = data;

    await fetchKabupaten(tempPatientData.address.prov);
    await fetchKecamatan(tempPatientData.address.city);
    await fetchKelurahan(tempPatientData.address.district);

    tempPatientData.birthDetail.birthDate = new Date(
      tempPatientData.birthDetail.birthDate
    );
    if (uuid) {
      tempPatientData.patientUuid = uuid;
    }
    setValues({
      ...tempPatientData,
    });
    patientAge.value = `${tempPatientData.birthDetail.ageYear} Tahun, ${tempPatientData.birthDetail.ageMonth} Bulan, ${tempPatientData.birthDetail.ageDay} Hari`;
  }
};

onMounted(() => {
  setFormData(props.patientData);
  fetchProvinsi();
});

onUpdated(() => {
  setFormData(props.patientData);
  fetchProvinsi();
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
      loadingSearchPatient.value = false;
    }
  }, 800);
};

const setSelectedPatientData = async (data: any) => {
  if (data) {
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
  }
};

const selectedDataPatient = ref<any>();
const patientAge = ref("");

const schema = toTypedSchema(
  yup
    .object({
      patientUuid: yup.string(),
      noRm: yup.string(),
      title: yup.string().required("Awalan/Gelar harus dipilih"),
      name: yup.string().required("Nama lengkap harus diisi"),
      identity: yup.string().required("Identitas harus dipilih"),
      noIdentity: yup
          .string()
          .required("No identitas harus diisi")
          .when(["identity"], (identityValues, schema) => {
            const identity = Array.isArray(identityValues)
              ? identityValues[0]
              : identityValues;

            if (identity === "KTP") {
              return schema.min(16, "No identitas KTP minimal 16 karakter");
            }

            if (identity === "Passport") {
              return schema
                .min(9, "No identitas Passport minimal 9 karakter")
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                  "No identitas Passport harus mengandung huruf dan angka"
                );
            }

            return schema;
          }),
      birthDetail: yup
        .object({
          birthPlace: yup.string().required("Tempat lahir harus diisi"),
          birthDate: yup.date().required("Tanggal lahir harus dipilih"),
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

const getAge = (date: Date) => {
  const { tahun, bulan, hari } = countAge(date);
  patientAge.value = `${tahun} Tahun, ${bulan} Bulan, ${hari} Hari`;
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
            :disabled="isDetail"
            :isLoading="loadingSearchPatient"
            @filter="searchPatientData"
          >
            <template #customOptions="{ option }">
              {{ option.name }} ~ {{ option.noRm }}
            </template>
          </CustomSelect>
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
        <div class="flex mb-5">
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
            @update:model-value="getAge"
            :maxDate="new Date()"
            label="Tanggal Lahir"
            placeHolder="01-01-2024"
            class=""
            :disabled="isDetail"
            :invalid="!!errors['birthDetail.birthDate']"
            :invalidMessage="errors['birthDetail.birthDate']"
          />
          <CustomTextfield
            v-model="patientAge"
            label="Umur"
            class=""
            placeholder="Umur"
            :disabled="isDetail"
            readOnly
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
            v-model="phone"
            label="No. Handphone"
            class=""
            placeholder="08XX-XXXX-XXXX"
            :disabled="isDetail"
            :invalid="!!errors.phone"
            :invalidMessage="errors.phone"
          />
          <CustomSelect
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
            v-model="addressCountry"
            label="Negara"
            placeHolder="Pilih Negara"
            class=""
            optionLabel="label"
            optionValue="value"
            :showFilter="false"
            :options="[{ label: 'Indonesia', value: 'id-ID' }]"
            :disabled="isDetail"
            :invalid="!!errors['address.country']"
            :invalidMessage="errors['address.country']"
          />
          <CustomSelect
            v-model="language"
            label="Bahasa yang Dikuasai"
            placeHolder="Pilih Bahasa yang Dikuasai"
            class=""
            optionLabel="label"
            optionValue="value"
            :showFilter="false"
            :options="[{ label: 'Bahasa Indonesia', value: 'ID' }]"
            :disabled="isDetail"
            :invalid="!!errors.language"
            :invalidMessage="errors.language"
          />
          <!-- Row 3 -->
          <CustomSelect
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
            v-model="motherName"
            label="Nama Ibu Kandung"
            class="col-span-3"
            placeholder="Nama Ibu Kandung"
            :disabled="isDetail"
            :invalid="!!errors.motherName"
            :invalidMessage="errors.motherName"
          />
        </div>
        <hr class="my-[30px]" />
        <div class="grid grid-cols-4 gap-y-5 gap-x-[30px]">
          <CustomSelect
            v-model="addressProv"
            @update:model-value="fetchKabupaten"
            label="Provinsi"
            placeHolder="Pilih Provinsi"
            class=""
            optionLabel="name"
            optionValue="name"
            :options="provinsiPayload"
            :disabled="isDetail"
            :invalid="!!errors['address.prov']"
            :invalidMessage="errors['address.prov']"
          />
          <CustomSelect
            v-model="addressCity"
            @update:model-value="fetchKecamatan"
            label="Kabupaten / Kota"
            placeHolder="Pilih Kabupaten / Kota"
            class=""
            optionLabel="name"
            optionValue="name"
            :options="kabupatenPayload"
            :disabled="isDetail"
            :invalid="!!errors['address.city']"
            :invalidMessage="errors['address.city']"
          />
          <CustomSelect
            v-model="addressDistrict"
            @update:model-value="fetchKelurahan"
            label="Kecamatan"
            placeHolder="Pilih Kecamatan"
            class=""
            optionLabel="name"
            optionValue="name"
            :options="kecamatanPayload"
            :disabled="isDetail"
            :invalid="!!errors['address.district']"
            :invalidMessage="errors['address.district']"
          />
          <CustomSelect
            v-model="addressVillage"
            label="Kelurahan / Desa"
            placeHolder="Pilih Kelurahan / Desa"
            class=""
            optionLabel="name"
            optionValue="name"
            :options="kelurahanPayload"
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
          <CustomTextfield
            v-model="addressPostalCode"
            label="Kode Pos"
            placeholder="Kode Pos"
            class=""
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
