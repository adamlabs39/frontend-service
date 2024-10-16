<script lang="ts" setup>
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import { useRoleStore } from "@/stores/datamaster/role";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  title: {
    type: String,
  },
  method: {
    type: String,
  },
  payload: {
    type: Object,
    default: () => ({}),
  },
});

const itemsPermission = ref([
  { name_mainMenu: "dashboard" },
  { name_mainMenu: "pasien" },
  { name_mainMenu: "setting" },
  { name_mainMenu: "profile" },
  { name_mainMenu: "datamaster" },
]);

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode harus diisi"),
    name: yup.string().required("Nama Role harus diisi"),
    status: yup.bool(),
  })
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

const roleStore = useRoleStore();

const [code] = defineField("code");
const [name] = defineField("name");
const [status] = defineField("status");

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
          "CREATE PASIEN JKN",
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
      {
        name: "RI",
        allows: [
          "READ",
          "CREATE BAYI BARU LAHIR",
          "CREATE GENERAL CONSENT",
          "UPDATE ADMISI RI",
          "UPDATE GENERAL CONSENT",
          "BATAL REQUEST RI",
          "CETAK GENERAL CONSENT",
          "CETAK KUNJUNGAN",
          "CETAK LABEL",
        ],
      },
      {
        name: "IGD",
        allows: [
          "READ",
          "CREATE PASIEN IGD",
          "CREATE GENERAL CONSENT",
          "UPDATE ADMISI IGD",
          "UPDATE GENERAL CONSENT",
          "BATAL IGD",
          "CETAK GENERAL CONSENT",
          "CETAK KUNJUNGAN",
          "CETAK LABEL",
        ],
      },
      {
        name: "SEP",
        allows: [
          "READ",
          "CREATE SEP",
          "CREATE SEP MANUAL",
          "DELETE SEP",
          "SIMPAN SEP MANUAL",
        ],
      },
      {
        name: "Data Pasien",
        allows: [
          "READ",
          "CREATE PASIEN",
          "UPDATE BERKAS RM",
          "UPDATE DATA PASIEN",
          "DELETE PASIEN",
          "DELETE BERKAS RM",
          "IMPORT DATA PASIEN",
          "CETAK KARTU PASIEN",
          "UPLOAD BERKAS RM",
          "PREVIEW BERKAS RM",
          "GENERAL CONSENT",
        ],
      },
      {
        name: "Monitoring Kamar",
        allows: ["READ", "SETTING BED", "CREATE BED", "DELETE BED"],
      },
    ],
  },
  {
    module: "Rawat Jalan",
    sub_modules: [
      {
        name: "Antrian",
        allows: ["PANGGIL", "LEWATI", "PROSSES", "SELESAI"],
      },
      {
        name: "Poli",
        allows: ["READ", "BATAL KUNJUNGAN"],
      },
      {
        name: "BPJS-PCARE",
        features: [
          {
            name: "Monitoring Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
          {
            name: "Monitoring Riwayat Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
          {
            name: "Monitoring Obat Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
        ],
      },
      {
        name: "Laporan Rawat Jalan",
        features: [
          {
            name: "Pembatalan Poli",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "rekap Pembatalan Pasien",
            allows: ["READ", "CETAK LAPORAN"],
          },
        ],
      },
      {
        name: "RME",
        features: [
          {
            name: "Rekap Medis",
            allows: [
              "READ",
              "UPDATE PEMERIKSAAN GIGI",
              "UPDATE PEMERIKSAAN MATA",
              "UPDATE PEMERIKSAAN FISIK",
              "UPDATE DERAJAT LUKA BAKAR",
              "UPDATE PEMERIKSAAN DAN TINDAKAN",
              "UPDATE REKAM MEDIS",
              "CETAK LABEL",
              "TUTUP SEMUA FORM",
              "BUKAN SEMUA FORM",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TAMPILKAN DETAIL PASIEN",
            ],
          },
          {
            name: "Asemen",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "CREATE DIAGNOSIS",
              "DELETE DIAGNOSIS",
              "UPDATE CATATAN PERAWAT",
              "BALAS CATATAN PERAWAT",
              "KIRIM CATATAN",
              "KIRIM INTRUKSI",
              "CREATE TINDAKAN",
              "CREATE MULTIPLE TINDAKAN",
              "DELETE TINDAKAN",
            ],
          },
          {
            name: "SOAP",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DATA PASIEN",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "CREATE OBAT",
              "CREATE RACIKAN OBAT",
              "ITEM OBAT RACIKAN",
              "UPDATE OBAT",
              "DELETE OBAT",
              "DELETE ITEM OBAT RACIKAN",
            ],
          },
          {
            name: "Akses Dan Penunjang",
            allows: [
              "READ",
              "CREATE ALKES",
              "CREATE MULTIPLE ALKES",
              "DELETE LIST ALKES",
              "DELETE MULTIPLE ITEM ALKES",
              "DELETE SEMUA",
              "CREATE TINDAKAN",
              "DELETE LIST TINDAKAN",
            ],
          },
          {
            name: "Inform Consent",
            allows: ["READ"],
          },
          {
            name: "Unggah Berkas",
            allows: ["READ", "UPDATE FILE", "DELETE FILE", ""],
          },
          {
            name: "Resume Dan Discarge",
            allows: ["READ"],
          },
          {
            name: "Cetak Hasil Dan Surat",
            allows: [
              "READ",
              "CREATE SURAT KETERANGAN",
              "DELETE SURAT KETERANGAN",
            ],
          },
        ],
      },
    ],
  },
  {
    module: "Rawat Inap",
    sub_modules: [
      {
        name: "Rawat Inap",
        allows: ["READ"],
      },
      {
        name: "Perpindahan Bangsal",
        allows: ["READ", "BATAL TERIMA", "SETUJU DAN TERIMA"],
      },
      {
        name: "BPJS-PCARE",
        features: [
          {
            name: "Monitoring Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
          {
            name: "Monitoring Riwayat Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
          {
            name: "Monitoring Obat Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
        ],
      },
      {
        name: "Laporan",
        features: [
          {
            name: "Monitoring Rawat Inap",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Perpindahan Pasien",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Pembatalan Berobat",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Rekap Tindakan Pasien",
            allows: ["READ", "CETAK LAPORAN"],
          },
        ],
      },
      {
        name: "Detail Pasien",
        features: [
          {
            name: "Rekam Medis",
            allows: [
              "READ",
              "UPDATE PEMERIKSAAN FISIK",
              "UPDATE DERAJAT LUKA BAKAR",
              "UPDATE PEMERIKSAAN DAN TINDAKAN",
              "UPDATE REKAM MEDIS",
              "DELETE SESI",
              "",
            ],
          },
          {
            name: "Asesmen",
            allows: [
              "READ",
              "CREATE DIAGNOSIS",
              "DELETE DIAGNOSIS",
              "UPDATE CATATAN PERAWAT",
              "BALAS CATATAN PERAWAT",
              "KIRIM CATATAN PERAWAT",
              "KIRIM INTERUKSI MEDIS",
              "CREATE MULTIPLE TINDAKAN",
              "DELETE TINDAKAN",
              "DELETE MULTIPLE TINDAKAN",
              "DELETE SEMUA",
            ],
          },
          {
            name: "SOAP Dokter",
            allows: [
              "READ",
              "CREATE OBAT",
              "CREATE RACIKAN",
              "UPDATE OBAT",
              "DELETE OBAT",
              "DELETE ITEM OBAT RACIKAN",
            ],
          },
          {
            name: "Inform Consent",
            allows: ["READ"],
          },
          {
            name: "Inform Consent",
            allows: ["READ"],
          },
          {
            name: "Alkes Dan Penunjang",
            allows: [
              "CREATE ALKES",
              "CREATE MULTIPLE ALKES",
              "DELETE ALKES",
              "DELETE MULTIPLE ALKES",
              "DELETE SEMUA",
              "CREATE TINDAKAN",
              "DELETE TINDAKAN",
            ],
          },
        ],
      },
    ],
  },
]);

const onSubmit = handleSubmit(async (values: any) => {
  try {
    if (method.value === "edit") {
      if (!props.payload || !props.payload.uuid) {
        throw new Error("UUID is missing for edit operation");
      }
      const uuid = props.payload.uuid;
      const response = await roleStore.putApi(uuid, values);
      console.log("Data updated successfully:", response);
      emit("data-updated");
    } else if (method.value === "add") {
      console.log("Adding new data with values:", values);
      const response = await roleStore.postApi(values);
      emit("data-updated");
    }
    closeDialog();
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
});

const method = ref(props.method);
const title = ref(props.title);

const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};

const resetDialogMode = () => {
  method.value = props.method;
  title.value = props.title;
};

const handleEdit = () => {
  method.value = "edit";
  title.value = "Edit Data";
};

const closeDialog = () => {
  emit("update:isDialogVisible", false);
  resetDialogMode();
  resetForm();
};

watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (newValue) {
      resetDialogMode();
      if (props.method !== "add" && props.payload) {
        setValues({
          ...props.payload,
        });
      }
    } else {
      resetForm();
      resetDialogMode();
    }
  }
);
</script>

<template>
  <CustomDialog
    width="600px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Role</template>
    <template #body>
      <!-- Form Input -->
      <div v-if="method !== 'detail'" class="grid grid-cols-12 gap-5 mt-5">
        <CustomTextfield
          label="Kode"
          v-model="code"
          placeholder="Kode Role"
          :invalid="!!errors.code"
          :invalidMessage="errors.code"
          :required="errors.code ? true : false"
          class="col-span-5"
        />
        <CustomTextfield
          label="Nama Role"
          v-model="name"
          placeholder="Nama Role"
          class="col-span-7"
          :invalid="!!errors.name"
          :invalidMessage="errors.name"
          :required="errors.name ? true : false"
        />
        <hr class="col-span-12 border-grey-200" />
        <CustomAccordion class="col-span-12" no-border initial-state="0">
          <template #header>
            <div class="-mx-4 text-normal">Modul</div>
          </template>
          <template #content>
            <!-- <div class="flex flex-wrap gap-2.5 pt-5 -mx-4">
              <div v-for="item of itemsPermission" :key="item.name_mainMenu">
                <CustomCheckbox
                  :value="item.name_mainMenu"
                  :title="item.name_mainMenu"
                  v-model="permission"
                  sub-title=""
                  :binary="false"
                />
              </div>
            </div> -->
            <div class="flex flex-wrap gap-2.5 pt-5">
              <div
                v-for="(menuItem, menuIndex) in permissionsItem"
                :key="menuItem.module"
              >
                <CustomCheckbox :title="menuItem.module" subTitle="" />
              </div>
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-transparent"
              textColor="text-adameds-300"
              class="-mr-5"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-transparent"
              textColor="text-adameds-300"
              class="-mr-5"
            />
          </template>
        </CustomAccordion>
        <hr class="col-span-12 border-grey-200" />
        <CustomSwitch
          v-model="status"
          :show-label="true"
          label="Status"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
          class="col-span-12"
        />
      </div>
      <!-- Detail Data -->
      <div v-if="method === 'detail'" class="flex flex-col gap-5 mt-5">
        <CustomInfoRow label="Kode Role" :value="code" />
        <CustomInfoRow label="Nama Role" :value="name" />
        <CustomInfoRow label="Modul">
          <template #value>
            <div
              v-if="payload.permission && payload.permission.length"
              class="flex flex-wrap w-full h-full gap-1"
            >
              <CustomChip
                v-for="permission in payload.permission"
                :label="permission"
                textColor="text-white"
                bgColor="bg-adameds-300"
                borderColor="border-none"
                :showCheckedIcon="false"
                customClass="text-xs font-semibold h-5 flex w-fit"
              />
            </div>
            <div v-else>-</div>
          </template>
        </CustomInfoRow>
        <hr class="col-span-12 border-grey-200" />
        <CustomInfoRow label="Status">
          <template #value>
            <CustomChip
              :label="status ? 'AKTIF' : 'NON-AKTIF'"
              :textColor="status ? 'text-white' : 'text-[#80868d]'"
              :bgColor="status ? 'bg-adameds-300' : 'bg-white'"
              :borderColor="status ? 'border-none' : 'border-[#80868d]'"
              :icon-color="status ? 'white' : '#80868d'"
              customClass="text-xs font-semibold h-5 flex w-fit"
            />
          </template>
        </CustomInfoRow>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton
            v-if="method !== 'detail'"
            label="Batal"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
            @click="closeDialog"
          />
          <CustomButton
            v-if="method !== 'detail'"
            label="Simpan"
            @click="onSubmit"
          />
          <CustomButton
            v-if="method === 'detail'"
            label="Edit"
            @click="handleEdit"
          />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
