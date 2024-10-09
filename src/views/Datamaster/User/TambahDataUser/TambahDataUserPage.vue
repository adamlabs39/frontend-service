<script lang="ts" setup>
import { ref } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";

const emit = defineEmits(["back"]);

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

// // Setup permissions structure
// const permissions = ref(
//   permissionsItem.value.map((item) => ({
//     modul: item.module,
//     checked: false, // Track if the module is checked
//     sub_modules: item.sub_modules.map((subItem) => ({
//       name: subItem.name,
//       checked: false, // Track if the sub_module is checked
//       allows: subItem.allows.map((allow) => ({
//         name: allow,
//         checked: false, // Track if the allow is checked
//       })),
//     })),
//   }))
// );

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
// Method to toggle all submodules when the module is checked
const toggleModule = (module:any) => {
  module.checked = !module.checked; // Toggle module checked state
  module.sub_modules.forEach((subModule:any) => {
    subModule.checked = module.checked; // Set subModule checked state to module's state
    subModule.allows.forEach((allow:any) => {
      allow.checked = module.checked; // Set allow checked state to module's state
    });
  });
};

const toggleSubModule = (subModule:any) => {
  subModule.checked = !subModule.checked; // Toggle subModule checked state
  subModule.allows.forEach((allow:any) => {
    allow.checked = subModule.checked; // Set allow checked state to subModule's state
  });
};

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
    <template #content>
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
