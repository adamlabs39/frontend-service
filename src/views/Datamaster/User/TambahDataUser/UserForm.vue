<script lang="ts" setup>
import { ref, watch, defineProps } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = toTypedSchema(
  yup.object({
    username: yup.string().required("Username harus diisi"),
    password: yup.string().required("Password harus diisi"),
    confirmPassword: yup
      .string()
      .required("Password harus diisi")
      .oneOf([yup.ref("password")], "Password tidak sama"),
    namaLengkap: yup.string().required("Nama Lengkap harus diisi"),
    email: yup
      .string()
      .required("Email harus diisi")
      .email("Format email tidak sesuai")
      .required("Email harus diisi"),
    phoneNumber: yup
      .string()
      .required("No. Handhpone harus diisi")
      .matches(phoneRegExp, "Format tidak sesuai"),
    selectedDokter: yup
      .string()
      .required("Nama Dokter harus diisi"),
  })
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});
const emit = defineEmits(["submitForm"]);

const onSubmit = handleSubmit((values) => {
  emit("submitForm", values);
});
const [username] = defineField("username");
const [password] = defineField("password");
const [confirmPassword] = defineField("confirmPassword");
const [namaLengkap] = defineField("namaLengkap");
const [email] = defineField("email");
const [phoneNumber] = defineField("phoneNumber");
const [selectedDokter] = defineField("selectedDokter");

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const props = defineProps({
  role: {
    type: String,
    default: "",
  },
});

const selectedRole = ref(props.role);

watch(
  () => props.role,
  (newRole) => {
    selectedRole.value = newRole;
  }
);

const verifikatorMedis = ref();
const verifikatorNonMedis = ref();
const dokterOptions = ref([
  { label: "dr.Budi", value: "dr.Budi" },
  { label: "dr.Susi", value: "dr.Susi" },
  { label: "dr.Adam", value: "dr.Adam" },
]);
const status = ref();
</script>
<template>
  <div class="overflow-auto grow">
    <form @submit.prevent="onSubmit"  class="flex flex-col gap-5">
      <CustomAccordion headerClass="">
        <template #collapseIcon>
          <PhCaretUp :size="20" class="text-adameds-300" />
        </template>
        <template #expandIcon>
          <PhCaretDown :size="20" class="text-adameds-300" />
        </template>
        <template #header>Akun</template>
        <template #content>
          <div class="flex flex-col gap-5 py-5">
            <CustomTextfield
              v-model="username"
              label="Username"
              placeholder="Username"
              :disabled="!selectedRole"
              :invalid="errors.username ? true : false"
              :invalidMessage="errors.username"
            />
            <CustomTextfield
              v-model="password"
              label="Password"
              placeholder="********"
              :disabled="!selectedRole"
              :type="showPassword ? 'text' : 'password'"
              :invalid="errors.password ? true : false"
              :invalidMessage="errors.password"
              :appendIcon="showPassword ? 'PhEyeSlash' : 'PhEye'"
              @clickAppend="showPassword = !showPassword"
            />
            <CustomTextfield
              v-model="confirmPassword"
              label="Verify Password"
              placeholder="********"
              :disabled="!selectedRole"
              :type="showConfirmPassword ? 'text' : 'password'"
              :invalid="errors.confirmPassword ? true : false"
              :invalidMessage="errors.confirmPassword"
              :appendIcon="showConfirmPassword ? 'PhEyeSlash' : 'PhEye'"
              @clickAppend="showConfirmPassword = !showConfirmPassword"
            />
          </div>
        </template>
      </CustomAccordion>
      <CustomAccordion headerClass="">
        <template #collapseIcon>
          <PhCaretUp :size="20" class="text-adameds-300" />
        </template>
        <template #expandIcon>
          <PhCaretDown :size="20" class="text-adameds-300" />
        </template>
        <template #header>
          <div>
            {{ selectedRole === "dokter" ? "Data User Dokter" : "Data User" }}
          </div>
        </template>
        <template #content>
          <div class="flex flex-col gap-5 py-5">
            <CustomTextfield
              v-if="selectedRole !== 'dokter'"
              v-model="namaLengkap"
              label="Nama Lengkap User"
              placeholder="Nama Lengkap User"
              :disabled="!selectedRole"
              :invalid="errors.namaLengkap ? true : false"
              :invalidMessage="errors.namaLengkap"
            />
            <CustomSelect
              v-if="selectedRole === 'dokter'"
              :options="dokterOptions"
              v-model="selectedDokter"
              :isLoading="false"
              label="Nama Lengkap Dokter"
              placeHolder="Nama Lengkap Dokter"
              :invalid="errors.selectedDokter ? true : false"
              :invalidMessage="errors.selectedDokter"
            />
            <div class="flex gap-5">
              <CustomTextfield
                v-model="phoneNumber"
                label="No. Handphone"
                placeholder="08xx-xxxx-xxxx"
                :disabled="!selectedRole"
                :invalid="errors.phoneNumber ? true : false"
                :invalidMessage="errors.phoneNumber"
              />
              <CustomTextfield
                label="Email"
                v-model="email"
                placeholder="Email"
                :disabled="!selectedRole"
                class="basis-5/6"
                :invalid="errors.email ? true : false"
                :invalidMessage="errors.email"
              />
            </div>
          </div>
        </template>
      </CustomAccordion>
      <CustomAccordion v-if="selectedRole === 'admin'" headerClass="">
        <template #collapseIcon>
          <PhCaretUp :size="20" class="text-adameds-300" />
        </template>
        <template #expandIcon>
          <PhCaretDown :size="20" class="text-adameds-300" />
        </template>
        <template #header>Hak Akses Verifikator</template>
        <template #content>
          <div class="flex flex-col gap-5 py-5">
            <div class="flex flex-col gap-2.5">
              <div>Verifikator Pengadaan Barang Medis</div>
              <div class="flex w-full border rounded-lg p-2.5 gap-2.5">
                <CustomSwitch v-model="verifikatorMedis" :show-label="false" />
                <div>Penanggung Jawab</div>
              </div>
            </div>
            <div v-if="verifikatorMedis === true" class="flex flex-col gap-2.5">
              <div>Verifikator Pengadaan Barang Non-Medis</div>
              <div class="flex w-full border rounded-lg p-2.5 gap-2.5">
                <CustomSwitch v-model="verifikatorNonMedis" :show-label="false" />
                <div>Penanggung Jawab</div>
              </div>
            </div>
          </div>
        </template>
      </CustomAccordion>
      <div>
        <div>Status</div>
        <div class="w-full border rounded-lg p-2.5">
          <div class="flex items-center gap-2.5">
            <CustomSwitch
              v-model="status"
              :disabled="!selectedRole"
              :show-label="false"
            />
            <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
