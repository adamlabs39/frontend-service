<script lang="ts" setup>
import { ref, watch, defineProps, computed } from "vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomCheckBoxUser from "@/components/Datamaster/CustomCheckBoxUser.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import NoData from "@/components/section/NoData.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";

const emit = defineEmits(["back"]);

const showSelected = ref(false);
const showNama = ref(false);
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = computed(() =>
  toTypedSchema(
    yup.object({
      username: yup.string().required("Username harus diisi"),
      password: yup
        .string()
        .min(8, "Password minimal 8 karakter")
        .matches(
          /[A-Z]/,
          "Password harus mengandung setidaknya satu huruf besar"
        )
        .matches(
          /[a-z]/,
          "Password harus mengandung setidaknya satu huruf kecil"
        )
        .matches(/\d/, "Password harus mengandung setidaknya satu angka")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password harus mengandung setidaknya satu simbol khusus"
        )
        .required("Password harus diisi"),
      confirmPassword: yup
        .string()
        .min(8, "Password minimal 8 digit")
        .matches(
          /[A-Z]/,
          "Password harus mengandung setidaknya satu huruf besar"
        )
        .matches(
          /[a-z]/,
          "Password harus mengandung setidaknya satu huruf kecil"
        )
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
      status: yup.bool(),
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
const [status] = defineField("status");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const dataBreadHome = ref({ label: "User", home: true });
const dataBreadCrumb = ref([{ label: "Tambah Data" }]);

const selectedRole = ref();
const roleOptions = ref([
  { label: "Admin", value: "admin" },
  { label: "Super Admin", value: "superAdmin" },
  { label: "Dokter", value: "dokter" },
  { label: "Perawat", value: "perawat" },
]);
console.log("text", selectedRole);

const checkCategorie = ref();
const permission = ref([
  {
    menu: "Dashboard",
    subMenu: [
      {
        name: "Rawat Jalan",
        actionPermission: ["Creat", "Read", "Update", "Delete"],
      },
    ],
  },
  {
    menu: "Datamaster",
    subMenu: [
      {
        name: "User",
        actionPermission: ["Creat", "Read", "Update", "Delete"],
      },
      {
        name: "Role",
        actionPermission: ["Creat", "Read", "Update", "Delete"],
      },
      {
        name: "Pegawai",
        actionPermission: ["Creat", "Read", "Update", "Delete"],
      },
      {
        name: "Praktisi",
        actionPermission: ["Creat", "Read", "Update", "Delete"],
      },
    ],
  },
  {
    menu: "Antrian",
    subMenu: [
      {
        name: "Jadwal Dokter",
        actionPermission: ["Creat", "Read", "Update", "Delete"],
      },
    ],
  },
]);

const categories = ref([
  { name: "Accounting", key: "A" },
  { name: "Marketing", key: "M" },
  { name: "Production", key: "P" },
  { name: "Research", key: "R" },
]);

// Watch for changes in selectedRole and reset form
watch(selectedRole, (newRole) => {
  resetForm(); // Reset the form

  // You can also set the initial values for specific fields if needed
  if (newRole === "dokter") {
    showSelected.value = true;
    showNama.value = false;
  } else {
    showSelected.value = false;
    showNama.value = true;
  }
});
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
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
          @click="emit('back')"
          background-color="bg-white"
          border-color="border-adameds-300"
          text-color="text-adameds-300"
        />
      </div>
    </template>
    <template #content>
      <CustomAccordion no-border initial-state="0">
        <template #header> Data Faskes </template>
        <template #content>
          <CustomSelect
            label="Faskes"
            place-holder="Pilih Faskes"
            class="mt-5"
          />
        </template>
        <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>
      <CustomAccordion no-border initial-state="0">
        <template #header> Data User </template>
        <template #content>
          <div class="grid grid-cols-12 gap-5 mt-4">
            <div class="flex items-end col-span-12 gap-y-5">
              <CustomSelect
                label="Praktisi"
                place-holder="Cari & Pilih Praktisi"
                class="grow"
              />
              <CustomButton
                label="Cara"
                icon="PhMagnifyingGlass"
                class="ml-5 mr-2.5"
              />
              <CustomButton
                label="Reset"
                background-color="bg-transparent"
                border-color="border-adameds-300"
                text-color="text-adameds-300"
              />
            </div>
            <div
              class="grid grid-flow-col grid-cols-12 grid-rows-2 gap-5 border rounded-[10px] border-adameds-300 col-span-12 p-5"
            >
              <div class="flex flex-col col-span-4">
                <div class="font-semibold underline text-SM">Nama Pegawai</div>
                <div class="font-normal text-normal">Nama Lengkap1</div>
              </div>
              <div class="flex flex-col col-span-4">
                <div class="font-semibold underline text-SM">Nama Pegawai</div>
                <div class="font-normal text-normal">Nama Lengkap2</div>
              </div>
              <div class="flex flex-col col-span-4">
                <div class="font-semibold underline text-SM">Nama Pegawai</div>
                <div class="font-normal text-normal">Nama Lengkap3</div>
              </div>
              <div class="flex flex-col col-span-4">
                <div class="font-semibold underline text-SM">Nama Pegawai</div>
                <div class="font-normal text-normal">Nama Lengkap4</div>
              </div>
            </div>

            <CustomInputNumber
              label="No. Handphone"
              placeholder="08xx-xxxx-xxxx"
              class="col-span-6"
            />
            <CustomTextfield
              label="Email"
              placeholder="Email"
              class="col-span-6"
            />
          </div>
        </template>
        <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>
      <CustomAccordion no-border initial-state="0">
        <template #header> Akun </template>
        <template #content>
          <div class="grid grid-cols-12 gap-5 mt-5">
            <CustomTextfield
              v-model="username"
              label="Username"
              placeholder="Username"
              :invalid="errors.username ? true : false"
              :invalidMessage="errors.username"
              class="col-span-4"
            />

            <CustomTextfield
              v-model="password"
              label="Password"
              placeholder="****"
              :type="showPassword ? 'text' : 'password'"
              :invalid="errors.password ? true : false"
              :invalidMessage="errors.password"
              :appendIcon="showPassword ? 'PhEyeSlash' : 'PhEye'"
              @clickAppend="showPassword = !showPassword"
              class="col-span-4"
            />
            <CustomTextfield
              v-model="confirmPassword"
              label="Verify Password"
              placeholder="****"
              :type="showConfirmPassword ? 'text' : 'password'"
              :invalid="errors.confirmPassword ? true : false"
              :invalidMessage="errors.confirmPassword"
              :appendIcon="showConfirmPassword ? 'PhEyeSlash' : 'PhEye'"
              @clickAppend="showConfirmPassword = !showConfirmPassword"
              class="col-span-4"
            />
          </div>
        </template>
        <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>
      <CustomAccordion no-border initial-state="0">
        <template #header> Modul & Permission </template>
        <template #content>
          <div class="grid grid-cols-12 gap-5 pt-5">
            <CustomSelect
              label="Role"
              place-holder="Pilih Role"
              class="col-span-12"
            />
            <!-- <NoData class="col-span-12" /> -->
            <div
              v-for="(menuItem, menuIndex) in permission"
              :key="menuIndex"
              class="col-span-12"
            >
              <CustomAccordion
                header-class="bg-adameds-50"
                :open-with-header="false"
              >
                <template #header>
                  <div class="flex items-center gap-2.5">
                    <Checkbox :binary="true" />

                    {{ menuItem.menu }}
                  </div>
                </template>
                <template #content>
                  <div
                    v-for="(subMenuItem, subMenuIndex) in menuItem.subMenu"
                    :key="subMenuIndex"
                  >
                    <CustomAccordion
                      class="col-span-12 pt-5"
                      header-class="bg-adameds-50"
                      :open-with-header="false"
                    >
                      <template #header>
                        <div class="flex items-center gap-2.5">
                          <Checkbox :binary="true" />

                          {{ subMenuItem.name }}
                        </div>
                      </template>
                      <template #content>
                        <div class="flex flex-wrap gap-2.5 pt-5">
                          <div
                            v-for="(
                              action, actionIndex
                            ) in subMenuItem.actionPermission"
                            :key="actionIndex"
                          >
                          <CustomCheckbox
                             :value="action"
                             :title="action"
                             sub-title=""
                            />
                          </div>
                        </div>
                      </template>
                    </CustomAccordion>
                  </div>
                </template>
              </CustomAccordion>
            </div>
          </div>
        </template>
        <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>
      <CustomSwitch
        v-model="status"
        :show-label="true"
        label="Status"
        sideLabel="NON-AKTIF"
        sideLabelTrue="AKTIF"
        class="col-span-12 ml-5"
      />
    </template>
    <template #footer>
      <div class="flex justify-end gap-2.5 px-5 py-2.5">
        <CustomButton label="Batal" @click="emit('back')" />
        <CustomButton label="Simpan" @click="onSubmit" />
      </div>
    </template>
  </Card>
</template>
