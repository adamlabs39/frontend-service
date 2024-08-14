<script lang="ts" setup>
import { ref, watch, defineProps,computed } from "vue";
import { useRouter } from "vue-router";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const router = useRouter();

function goBack() {
  router.back();
}
const showSelected = ref(false);
const showNama = ref(false);
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = computed(()=>
toTypedSchema(
  yup.object({
    username: yup.string().required("Username harus diisi") ,
    password: yup
      .string()
      .min(8, "Password minimal 8 karakter")
      .matches(/[A-Z]/, "Password harus mengandung setidaknya satu huruf besar")
      .matches(/[a-z]/, "Password harus mengandung setidaknya satu huruf kecil")
      .matches(/\d/, "Password harus mengandung setidaknya satu angka")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password harus mengandung setidaknya satu simbol khusus"
      )
      .required("Password harus diisi"),
    confirmPassword: yup
      .string()
      .min(8, "Password minimal 8 digit")
      .matches(/[A-Z]/, "Password harus mengandung setidaknya satu huruf besar")
      .matches(/[a-z]/, "Password harus mengandung setidaknya satu huruf kecil")
      .matches(/\d/, "Password harus mengandung setidaknya satu angka")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password harus mengandung setidaknya satu simbol khusus"
      )
      .required("Password harus diisi")
      .oneOf([yup.ref("password")], "Password tidak sama"),
    namaLengkap: showNama
    ? yup.string().required("Nama Lengkap harus diisi")
    : yup.string().nullable(),
    email: yup
      .string()
      .required("Email harus diisi")
      .email("Format email tidak sesuai")
      .required("Email harus diisi"),
    phoneNumber: yup
      .string()
      .required("No. Handhpone harus diisi")
      .matches(phoneRegExp, "Format tidak sesuai"),
    selectedDokter: showSelected
    ? yup.string().required("Nama Dokter harus diisi")
    : yup.string().nullable(),
    status: yup
      .bool()
      .required("Status harus dipilih")
  })
)
);


const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit((values) => {
  console.log("Submitted with", values);
});


const [username] = defineField("username");
const [password] = defineField("password");
const [confirmPassword] = defineField("confirmPassword");
const [namaLengkap] = defineField("namaLengkap");
const [email] = defineField("email");
const [phoneNumber] = defineField("phoneNumber");
const [selectedDokter] = defineField("selectedDokter");
const [status] = defineField("status");

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const verifikatorMedis = ref();
const verifikatorNonMedis = ref();
const dokterOptions = ref([
  { label: "dr.Budi", value: "dr.Budi" },
  { label: "dr.Susi", value: "dr.Susi" },
  { label: "dr.Adam", value: "dr.Adam" },
]);

const dataBreadHome = ref({ label: "User", home: true });
const dataBreadCrumb = ref([{ label: "Tambah Data" }]);

const selectedRole = ref();
const roleOptions = ref([
  { label: "Admin", value: "admin" },
  { label: "Dokter", value: "dokter" },
  { label: "Perawat", value: "perawat" },
]);
const sections = ref([
  {
    name: "Admisi",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
  {
    name: "Antrian",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
  {
    name: "Rawat Jalan",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
  {
    name: "Rawat Inap",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
  {
    name: "IGD",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
  {
    name: "Farmasi",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
  {
    name: "Pembayaran",
    values: [
      { name: "Rawat Jalan", key: "RJ" },
      { name: "SEP", key: "S" },
      { name: "IGD", key: "I" },
      { name: "Data Pasien", key: "DS" },
    ],
  },
]);
// Watch for changes in selectedRole and reset form
watch(selectedRole, (newRole) => {
  resetForm(); // Reset the form

  // You can also set the initial values for specific fields if needed
  // if (newRole === 'dokter') {
  //   showSelected.value = true;
  //   showNama.value = false;
  // } else {
  //   showSelected.value = false;
  //   showNama.value = true;
  // }
});
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-hidden"
    class="h-full"
  >
    <template #header>
      <div class="flex items-center justify-between gap-5 p-5">
        <CustomButton label="" icon="PhArrowClockwise" @click="" />
        <CustomBreadCrumb
          :home="dataBreadHome"
          :model="dataBreadCrumb"
          class="grow"
        />
        <CustomButton
          label="Kembali"
          icon="PhCaretLeft"
          @click="goBack"
          background-color="bg-white"
          border-color="border-adameds-300"
          text-color="text-adameds-300"
        />
      </div>
    </template>
    <template #content>
      <div class="flex flex-row h-full pl-5 overflow-hidden grow">
        <div class="basis-1/2 flex flex-col gap-2.5 overflow-hidden">
          <CustomSelect
            label="Role"
            placeHolder="Pilih Role"
            v-model="selectedRole"
            :options="roleOptions"
            :isLoading="false"
          />
          <div class="h-full overflow-auto">
            <!-- Empty Role -->
            <div
              v-if="!selectedRole"
              class="flex flex-col items-center justify-center w-full h-full border border-dashed rounded-md"
            >
              <img src="@/assets/icons/empty role.svg" alt="" />
              <div
                class="font-normal text-sm text-[#9CA3AF] leading-5 mt-[18.5px]"
              >
                Pilih Role Terlebih Dahulu
              </div>
            </div>
            <!-- Admin Role -->
            <div
              v-if="selectedRole === 'admin'"
              class="flex flex-col w-full gap-3"
            >
              <CustomAccordion
                headerClass="bg-adameds-50"
                v-for="section in sections"
                :key="section.name"
              >
                <template #header>{{ section.name }}</template>
                <template #content>
                  <CustomCheckbox
                    :categories="section.values"
                    custom-class="grid justify-center grid-cols-2 gap-4 pt-5"
                  />
                </template>
              </CustomAccordion>
            </div>
            <!-- Dokter Role -->
            <div
              v-if="selectedRole === 'dokter'"
              class="flex flex-col w-full gap-3"
            >
              <CustomAccordion
                headerClass="bg-adameds-50"
                v-for="section in sections"
                :key="section.name"
              >
                <template #header>{{ section.name }}</template>
                <template #content>
                  <CustomCheckbox
                    class=""
                    :categories="section.values"
                    custom-class="grid justify-center grid-cols-2 gap-4 pt-5"
                  />
                </template>
              </CustomAccordion>
            </div>
          </div>
        </div>
        <div class="basis-1/2 px-5 flex flex-col gap-2.5 overflow-hidden">
          <div class="overflow-auto grow">
            <div class="flex flex-col gap-5">
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
                      :invalid="
                        !selectedRole ? false : errors.username ? true : false
                      "
                      :invalidMessage="errors.username"
                    />
                    <CustomTextfield
                      v-model="password"
                      label="Password"
                      placeholder="********"
                      :disabled="!selectedRole"
                      :type="showPassword ? 'text' : 'password'"
                      :invalid="
                        !selectedRole ? false : errors.password ? true : false
                      "
                      :invalidMessage="!selectedRole ? '' : errors.password"
                      :appendIcon="showPassword ? 'PhEyeSlash' : 'PhEye'"
                      @clickAppend="showPassword = !showPassword"
                    />

                    <CustomTextfield
                      v-model="confirmPassword"
                      label="Verify Password"
                      placeholder="********"
                      :disabled="!selectedRole"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      :invalid="
                        !selectedRole
                          ? false
                          : errors.confirmPassword
                          ? true
                          : false
                      "
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
                    {{
                      selectedRole === "dokter"
                        ? "Data User Dokter"
                        : "Data User"
                    }}
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
                      :invalid="
                        !selectedRole
                          ? false
                          : errors.namaLengkap
                          ? true
                          : false
                      "
                      :invalidMessage="errors.namaLengkap"
                    />
                    <CustomSelect
                      v-if="selectedRole === 'dokter'"
                      :options="dokterOptions"
                      v-model="selectedDokter"
                      :isLoading="false"
                      label="Nama Lengkap Dokter"
                      placeHolder="Nama Lengkap Dokter"
                      :invalid="
                        !selectedRole
                          ? false
                          : errors.selectedDokter
                          ? true
                          : false
                      "
                      :invalidMessage="errors.selectedDokter"
                    />
                    <div class="flex gap-5">
                      <CustomTextfield
                        v-model="phoneNumber"
                        label="No. Handphone"
                        placeholder="08xx-xxxx-xxxx"
                        :disabled="!selectedRole"
                        :invalid="
                          !selectedRole
                            ? false
                            : errors.phoneNumber
                            ? true
                            : false
                        "
                        :invalidMessage="errors.phoneNumber"
                      />
                      <CustomTextfield
                        label="Email"
                        v-model="email"
                        placeholder="Email"
                        :disabled="!selectedRole"
                        class="basis-5/6"
                        :invalid="
                          !selectedRole ? false : errors.email ? true : false
                        "
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
                        <CustomSwitch
                          v-model="verifikatorMedis"
                          :show-label="false"
                        />
                        <div>Penanggung Jawab</div>
                      </div>
                    </div>
                    <div
                      v-if="verifikatorMedis === true"
                      class="flex flex-col gap-2.5"
                    >
                      <div>Verifikator Pengadaan Barang Non-Medis</div>
                      <div class="flex w-full border rounded-lg p-2.5 gap-2.5">
                        <CustomSwitch
                          v-model="verifikatorNonMedis"
                          :show-label="false"
                        />
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
                      :invalid="
                          !selectedRole ? false : errors.status ? true : false
                        "
                        :invalidMessage="errors.status"
                    />
                    <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2.5 px-5 py-2.5">
        <CustomButton label="Batal" @click="goBack" />
        <CustomButton label="Simpan" @click="onSubmit"  />
      </div>
    </template>
  </Card>
</template>
