<script lang="ts" setup>
import { ref, watch, defineProps, computed } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
const emit = defineEmits(["back"]);
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = computed(() =>
  toTypedSchema(
    yup.object({
      faskesUuid: yup.string(),
      praktisiUuid: yup.string(),
      phone: yup
        .string()
        .required("No. Handhpone harus diisi")
        .matches(phoneRegExp, "Format tidak sesuai"),
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
      status: yup.bool(),
      permission: yup.bool(),
    })
  )
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});



const [faskesUuid] = defineField("faskesUuid");
const [praktisiUuid] = defineField("praktisiUuid");
const [phone] = defineField("phone");
const [username] = defineField("username");
const [password] = defineField("password");
const [confirmPassword] = defineField("confirmPassword");
const [status] = defineField("status");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const dataBreadHome = ref({ label: "User", home: true });
const dataBreadCrumb = ref([{ label: "Tambah Data" }]);


// Initial permissions structure
const permissionsItem = ref([
  {
    module: "Antrian",
    sub_modules: [
      {
        name: "Konfigurasi",
        allows: ["READ", "CREATE", "UPDATE", "DELETE"],
      },
      {
        name: "Data Antrian",
        allows: ["READ"],
      },
      {
        name: "Layar",
        allows: ["READ"],
      },
      {
        name: "Apm",
        allows: [
          "CREATE PATIENT JKN",
          "CREATE PASIEN NON-JKN",
          "CHECKIN",
          "PRINT",
        ],
      },
    ],
  },
  {
    module: "Admisi",
    sub_modules: [
      {
        name: "Antrian",
        allows: ["PANGGIL", "LEWATI", "PROSES", "SELESAI", "CHECKIN"],
      },
      {
        name: "RJ",
        allows: [
          "READ",
          "CREATE PASIEN RJ",
          "CREATE GENERAL CONSENT",
          "UPDATE ADMISI RJ",
          "UPDATE GENERAl CONSENT",
          "CETAK KUNJUNGAN",
          "CETAK LABEL",
          "BATAL RJ",
        ],
      },
    ],
  },
]);


const permissions = ref(
  permissionsItem.value.map((item) => ({
    modul: item.module,
    checked: false, // Track if the module is checked
    sub_modules: item.sub_modules.map((subItem) => ({
      name: subItem.name,
      checked: false, // Track if the sub_module is checked
      allows: subItem.allows.map((allow) => ({
        name: allow,
        checked: false, // Track if the allow is checked
      })),
    })),
  }))
);

// Method to submit selected permissions
const onSubmit = () => {
  const selectedPermissions = permissions.value
    .filter((module) => module.checked) // Only selected modules
    .map((module) => ({
      modul: module.modul,
      sub_modules: module.sub_modules
        .filter((subModule) => subModule.checked) // Only selected sub_modules
        .map((subModule) => ({
          name: subModule.name,
          allows: subModule.allows
            .filter((allow) => allow.checked) // Only selected allows
            .map((allow) => allow.name),
        })),
    }));

  console.log(selectedPermissions); // Log the selected permissions for testing
};

</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
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
                label="Cari"
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
              placeholder="**"
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
              placeholder="**"
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
      <!-- Modul & Permission -->
      <CustomAccordion no-border initial-state="0">
        <template #header> Modul & Permission </template>
        <template #content>
          <div class="grid grid-cols-12 gap-5 pt-5">
            <CustomSelect
              label="Role"
              place-holder="Pilih Role"
              class="col-span-12"
            />
            <div
              v-for="(menuItem, menuIndex) in permissions"
              :key="menuItem.modul"
              class="col-span-12"
            >
              <!-- Menu level -->
              <CustomAccordion
                header-class="bg-adameds-50"
                :open-with-header="false"
              >
                <template #header>
                  <div class="flex items-center gap-2.5">
                    <Checkbox
                      v-model="menuItem.checked"
                      :inputId="menuItem.modul"
                      :value="menuItem.modul"
                      name="menuItem"
                      :dt="{
                        checkedBackground: '#14B8A6',
                        checkedHoverBackground: '#14B8A6',
                        borderColor: '#98A2B3',
                      }"
                    />
                    <label :for="menuItem.modul">{{ menuItem.modul }}</label>
                  </div>
                </template>
                <template #content>
                  <div
                    v-for="(subMenuItem, subMenuIndex) in menuItem.sub_modules"
                    :key="subMenuItem.name"
                  >
                    <!-- Submenu level -->
                    <CustomAccordion
                      class="col-span-12 pt-5"
                      header-class="bg-adameds-50"
                      :open-with-header="false"
                    >
                      <template #header>
                        <div class="flex items-center gap-2.5">
                          <Checkbox
                            v-model="subMenuItem.checked"
                            :inputId="subMenuItem.name"
                            :value="subMenuItem.name"
                            name="subMenuItem"
                            :dt="{
                              checkedBackground: '#14B8A6',
                              checkedHoverBackground: '#14B8A6',
                              borderColor: '#98A2B3',
                            }"
                          />
                          <label
                            :for="subMenuItem.name"
                            class="font-normal text-SM text-grey-400"
                          >
                            {{ subMenuItem.name }}
                          </label>
                        </div>
                      </template>
                      <template #content>
                        <!-- Actions level -->
                        <div class="flex flex-wrap gap-2.5 pt-5">
                          <div
                            v-for="(action, actionIndex) in subMenuItem.allows"
                            :key="action.name"
                          >
                            <CustomCheckbox
                              v-model="action.checked"
                              :title="action.name"
                              subTitle=""
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
    </template>
    <template #footer>
      <div class="flex justify-end gap-2.5 px-5 py-2.5">
        <CustomButton label="Batal" @click="emit('back')" />
        <CustomButton label="Simpan" @click="onSubmit" />
      </div>
    </template>
  </Card>
</template>
