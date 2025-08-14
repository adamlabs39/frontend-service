<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref, computed } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import NoData from "@/components/section/NoData.vue";
import PatientIdentityForm from "./Forms/PatientIdentityFormRJ.vue";
import { utilsStore } from "@/stores/utils";
import { useAdmisiMasterPasienStore } from "@/stores/admisi/masterPasien";
import { useAdmisiGeneralConsent } from "@/stores/admisi/admisionGeneralConsent";
import type { DataTableRowClickEvent } from "primevue/datatable";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import { epochToDate, formatDate, getDateNow } from "@/utils/Helpers";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";
import { createGeneralConsentPdf } from "@/utils/PdfMake";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import Qrcode from "qrcode.vue";
import { useGeneralConsentStore } from "@/stores/datamaster/generalConsent";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import { createPatientCard } from "@/utils/PdfMake";

// NOTE Store
const storeUtils = utilsStore();
const masterPasienStore = useAdmisiMasterPasienStore();
const admisiGeneralConsentStore = useAdmisiGeneralConsent();
const generalConsentStore = useGeneralConsentStore();
const dataBreadCrumb = ref<MenuItem[]>([]);
 const handleExport = () => {};

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

const itemsPasien = ref<any[]>([]);
const itemsMedicalRecord = ref([
  // {
  //   fileName: "Berkas File Pasien Lama - adameds bin adam",
  //   type: "Pdf",
  //   uploadDate: "10 Jan 2024 09:00",
  // },
]);

const detailPatientDialog = ref(false);
const showUploadForm = ref(false);

const isDetail = () => {
  const label = dataBreadCrumb.value[0].label;
  if (typeof label == "string" && label.includes("Detail")) return true;
  else return false;
};

const timer = ref<any>();
const searchData = () => {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
  timer.value = setTimeout(async () => {
    await fetchData();
  }, 800);
};

const properties = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});
const propertiesHistory = ref({
  page: 1,
  pageSize: 5,
  total: 0,
});
const search = ref("");

const fetchData = async () => {
  storeUtils.setLoading(true);
  try {
    const response = await masterPasienStore.getMasterPasien({
      page: properties.value.page,
      limit: properties.value.pageSize,
      q: search.value,
    });
    if (response && response.payload) {
      properties.value.total = response.properties.totalData;
      itemsPasien.value = response.payload;
    } else itemsPasien.value = [];
  } catch (error) {
    console.error("Failed to fetch data", error);
    return [];
  } finally {
    storeUtils.setLoading(false);
  }
};

const openedPatientData = ref<any>({});
const listHistoryPatient = ref<any[]>([]);
const showDetailPatient = async (event: DataTableRowClickEvent) => {
  storeUtils.setLoading(true);
  try {
    const responsePatient = await masterPasienStore.getDetailMasterPasien(
      event.data.uuid
    );
    if (responsePatient && responsePatient.payload) {
      openedPatientData.value = responsePatient.payload;
    } else {
      openedPatientData.value = {};
    }
    const responseHistory = await masterPasienStore.getPatientHistory(
      event.data.uuid,
      {
        page: propertiesHistory.value.page,
        limit: propertiesHistory.value.pageSize,
      }
    );
    if (responseHistory && responseHistory.payload) {
      propertiesHistory.value.total = responseHistory.properties.totalData;
      listHistoryPatient.value = responseHistory.payload;
    } else {
      listHistoryPatient.value = [];
    }
    detailPatientDialog.value = true;
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const patientIdentityForm = ref<InstanceType<
  typeof PatientIdentityForm
> | null>(null);

const method = ref<"add" | "edit">("add");
const openPatientForm = (type: "add" | "edit") => {
  method.value = type;

  if (type == "add") {
    openedPatientData.value = {};
    changeSection("Tambah Data Pasien");
  } else {
    changeSection("Edit Data Pasien");
  }
};
const closePatientForm = () => {
  if (patientIdentityForm.value) {
    patientIdentityForm.value.onResetForm();
    openedPatientData.value = {};
    dataBreadCrumb.value.pop();
    fetchData();
  }
};

const onSubmit = async () => {
  if (patientIdentityForm.value) {
    const tempPatientData = await patientIdentityForm.value.onSubmit();
    if (tempPatientData) {
      storeUtils.setLoading(true);
      try {
        let tempBirthDate = formatDate(
          tempPatientData!.birthDetail.birthDate,
          true
        );
        tempPatientData!.birthDetail.birthDate =
          tempBirthDate as unknown as Date;
        if (method.value == "add") {
          await masterPasienStore.createMasterPasien(tempPatientData);
        } else if (method.value == "edit") {
          await masterPasienStore.updateMasterPasien(
            openedPatientData.value.uuid,
            tempPatientData
          );
        }
        closePatientForm();
      } catch (error) {
        console.error("Failed to process the data:", error);
      } finally {
        storeUtils.setLoading(false);
      }
    }
  }
};

const resetForm = async () => {
  if (patientIdentityForm.value) {
    patientIdentityForm.value.onResetForm();
  }
};

const handlePage = (event: any) => {
  properties.value.page = event.page + 1;
  properties.value.pageSize = event.rows;
  fetchData();
};
const handlePageHistory = (event: any) => {
  propertiesHistory.value.page = event.page + 1;
  propertiesHistory.value.pageSize = event.rows;
  fetchData();
};

const onUpload = async (event: any) => {
  const uploadedFiles = event.files[0];
  const dataUpload = new FormData();
  dataUpload.append("file", uploadedFiles);
  try {
    storeUtils.setLoading(true);
    const response = await masterPasienStore.importMasterPasien(dataUpload);
    await fetchData();
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const showDeletePasien = ref(false);
const deleteReason = ref<string>();
const selectedPatient = ref<any[]>([]);
// FIXME Ada perubahan dari sisi BE
const deletePatient = async () => {
  try {
    storeUtils.setLoading(true);
    let payload = {
      listUuid: [] as any[],
      deleteReason: deleteReason.value,
    };
    selectedPatient.value.forEach((patientData: any) => {
      payload.listUuid.push(patientData.uuid);
    });
    await masterPasienStore.deleteMasterPasien(payload)
    showDeletePasien.value = false;
    deleteReason.value = undefined;
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

// NOTE General Consent
const selectedGeneralConsent = ref<"Pasien" | "Keluarga">("Pasien");
const onGeneralConsentTypeSelect = (label: "Pasien" | "Keluarga") => {
  selectedGeneralConsent.value = label;
};

const schema = computed(() =>
  toTypedSchema(
    yup
      .object({
        uuid: yup.string().notRequired(),
        familyData: yup
          .object({
            name:
              selectedGeneralConsent.value == "Pasien"
                ? yup.string().nullable()
                : yup.string().required("Nama harus diisi"),
            address:
              selectedGeneralConsent.value == "Pasien"
                ? yup.string().nullable()
                : yup.string().required("Alamat harus diisi"),
            gender:
              selectedGeneralConsent.value == "Pasien"
                ? yup.string().nullable()
                : yup.string().required("Jenis kelamin harus dipilih"),
            relationship:
              selectedGeneralConsent.value == "Pasien"
                ? yup.string().nullable()
                : yup.string().required("Hubungan keluarga harus dipilih"),
          })
          .noUnknown(),
        name: yup.string().required("Format general consent harus dipilih"),
        generalConsent: yup.string().notRequired(),
      })
      .noUnknown()
  )
);

const {
  errors,
  handleSubmit: submitGeneralConsent,
  defineField,
  resetForm: resetGeneralConsentForm,
  setValues,
} = useForm({
  validationSchema: schema,
});

const [uuid] = defineField("uuid");
const [familyDataName] = defineField("familyData.name");
const [familyDataAddress] = defineField("familyData.address");
const [familyDataGender] = defineField("familyData.gender");
const [familyDataRelationship] = defineField("familyData.relationship");
const [name] = defineField("name");

const onSubmitGeneralConsent = submitGeneralConsent(async (values) => {
  storeUtils.setLoading(true);
  try {
    values.familyData = Object.keys(values.familyData).length
      ? values.familyData
      : (null as any);
    const tempGeneralConsentData = createGeneralConsentPdf({
      data: selectedDataGeneralConsent.value.isiSurat,
      patientData: openedPatientData.value,
      familyData: values.familyData,
    });
    values.generalConsent = await new Promise((resolve, reject) => {
      tempGeneralConsentData.getBase64((base64) => {
        if (base64) {
          resolve(base64);
        } else {
          reject("Gagal mendapatkan Base64 dari dokumen PDF.");
        }
      });
    });
    values.name = selectedDataGeneralConsent.value.name;
    await admisiGeneralConsentStore.createGeneralConsent(
      openedPatientData.value.uuid,
      values
    );
    inputGeneralConsentDialog.value = false;
  } catch (error) {
    console.error("Failed to post data", error);
  } finally {
    storeUtils.setLoading(false);
  }
});

const listDatamasterGeneralConsent = ref([]);
const fetchListGeneralConsent = async () => {
  try {
    storeUtils.setLoading(true);
    // FIXME Masih API biasa filter dari FE
    const response = await generalConsentStore.getApi(1, 9999);
    if (response && response.payload) {
      listDatamasterGeneralConsent.value = response.payload.filter(
        (generalConsent: any) => generalConsent.status
      );
    } else listDatamasterGeneralConsent.value = [];
  } catch (error) {
    console.error("Failed to post data", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const selectedDataGeneralConsent = ref();
const setSelectedGeneralConsent = (uuid: string) => {
  selectedDataGeneralConsent.value = listDatamasterGeneralConsent.value.find(
    (gc: any) => gc.uuid == uuid
  );
};

const inputGeneralConsentDialog = ref(false);
const generalConsentDialog = ref(false);
const generalConsentDialogInputType = ref("create");
const listOpenedPatientGeneralConsent = ref<any[]>([]);
const urlGeneralConsent = ref();
const showDialogGeneralConsent = async (
  type: "detail" | "list" | "add",
  uuid = ""
) => {
  fetchListGeneralConsent();
  generalConsentDialogInputType.value = type;
  if (type == "add") {
    selectedGeneralConsent.value = "Pasien";
    inputGeneralConsentDialog.value = true;
  }
  if (type == "list") {
    console.log("masuk sini");

    try {
      storeUtils.setLoading(true);
      const response =
        await admisiGeneralConsentStore.getAllPatientGeneralConsent(
          openedPatientData.value.uuid
        );
      if (response && response.payload) {
        listOpenedPatientGeneralConsent.value = response.payload;
      }
      generalConsentDialog.value = true;
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      storeUtils.setLoading(false);
    }
  }
  if (type == "detail") {
    try {
      storeUtils.setLoading(true);
      const response = await admisiGeneralConsentStore.getDetailGeneralConsent(
        uuid
      );
      if (response && response.payload) {
        setValues({
          ...response.payload,
        });
        selectedGeneralConsent.value = response.payload.patientFamily
          ? "Keluarga"
          : "Pasien";
        inputGeneralConsentDialog.value = true;
        const blob = base64toBlob(response.payload.generalConsent);
        urlGeneralConsent.value = URL.createObjectURL(blob);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      storeUtils.setLoading(false);
    }
  }
};

const base64toBlob = (data: string) => {
  const bytes = atob(data);
  let length = bytes.length;
  let out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type: "application/pdf" });
};

const deleteGeneralConsent = async () => {
  try {
    storeUtils.setLoading(true);
    await admisiGeneralConsentStore.deleteGeneralConsent(uuid.value ?? "");
    generalConsentDialog.value = false;
    inputGeneralConsentDialog.value = false;
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      v-if="dataBreadCrumb.length == 0"
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton
                  @click="fetchData"
                  icon="PhArrowClockwise"
                  class="mr-5"
                />
                <CustomBreadCrumb
                  :home="{
                    label: 'Data Pasien',
                    home: true,
                  }"
                  :model="dataBreadCrumb"
                  class=""
                />
              </div>
              <CustomButton
                @click="openPatientForm('add')"
                icon="PhPlus"
                label="Pasien"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <CustomTextfield
              v-model="search"
              @update:model-value="searchData"
              label="Pencarian"
              prependIcon="PhMagnifyingGlass"
              placeholder="Cari Nama / address / No. RM"
              class="mt-[10px]"
            />
            <hr class="border-grey-200 mt-[10px] mb-[2px]" />
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
      <template #content>
        <DataTable
          v-if="itemsPasien.length"
          :value="itemsPasien"
          v-model:selection="selectedPatient"
          tableStyle="min-width: 50rem"
          stripedRows
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          @rowClick="showDetailPatient"
        >
          <Column
            field="nomor"
            headerClass="bg-adameds-50"
            style="width: 100px"
          >
            <template #header>
              <div class="w-full font-semibold text-center">Nomor</div>
            </template>
            <template #body="{ data }">
              <div class="text-center">
                <div class="text-SM">{{ data.noRm }}</div>
              </div>
            </template>
          </Column>
          <Column field="pasien" header="Pasien" headerClass="bg-adameds-50">
            <template #body="{ data }">
              <div class="text-SM">
                <span class="font-semibold">{{ data.name }}</span>
                <span class="text-grey-300">
                  ({{ data.birthDetail.ageYear }}Th
                  {{ data.birthDetail.ageMonth }}Bln
                  {{ data.birthDetail.ageDay }}Hr)
                </span>
              </div>
              <div class="text-XS">{{ data.address.fullAddress }}</div>
              <div class="flex flex-wrap">
                <!-- <PhUserCirclePlus
                  v-if="data.new_patient"
                  :size="22"
                  class="text-adameds-300 mt-auto mr-[5px]"
                  weight="fill"
                /> -->
                <CustomChip
                  :showCheckedIcon="false"
                  :label="data.gender == 'Female' ? 'Perempuan' : 'Laki-laki'"
                  :bgColor="
                    data.gender == 'Female' ? 'bg-female-75' : 'bg-male-75'
                  "
                  :textColor="
                    data.gender == 'Female'
                      ? 'text-female-300'
                      : 'text-male-300'
                  "
                  customClass="h-5 pr-[9px] border-none mr-[5px]"
                />
                <!-- FIXME Belum Ada -->
                <CustomChip
                  :showCheckedIcon="false"
                  :label="data.phone"
                  bgColor="bg-adameds-75"
                  textColor="text-adameds-300"
                  customClass="h-5 pr-[8px] border-none mr-[5px]"
                />
              </div>
            </template>
          </Column>
          <Column
            v-if="showDeletePasien"
            selectionMode="multiple"
            headerStyle="width: 3rem"
            headerClass="bg-adameds-50"
            class="custom-checkbox"
          ></Column>
        </DataTable>
        <NoData v-else />
      </template>
      <template #footer>
        <div class="flex justify-between">
          <div class="flex">
            <FileUpload
              mode="basic"
              accept=".xls,.xlsx"
              :maxFileSize="1000000"
              label="Import"
              chooseLabel="Import"
              auto
              :pt="{
                pcButton: {
                  class: 'font-back', // OR { class: 'w-64' }
                },
              }"
              class="bg-adameds-300 rounded-[10px] font-black text-normal h-10 text-white border-adameds-300"
              @select="onUpload"
              custom-upload
              name="dems[]"
              >
              <template #chooseicon>
                <FileImportIcon />
              </template>
            </FileUpload>
            <CustomButton style=" margin-left: 11px; margin-top: 3px; margin-right: -4px;"
                @click="handleExport"
                icon="PhDownload"
                label="Download"
                class="mr-[10px]"
                backgroundColor="bg-adameds-300"
            />
            <div class="bg-adameds-300 w-[1px] my-[5px] mx-[15px]"></div>
            <CustomButton
              v-if="!showDeletePasien"
              @click="showDeletePasien = true"
              class="my-auto bg-danger-300"
              label="Hapus Data Pasien"
            />
            <CustomButton
              v-if="showDeletePasien"
              @click="showDeletePasien = false"
              class="my-auto mr-[10px]"
              label="Batal"
              outlined
              borderColor="border-grey-200"
              textColor="text-grey-300"
            />
            <CustomButton
              v-if="showDeletePasien"
              @click="deletePatient"
              class="my-auto mr-5 bg-danger-300"
              label="Iya, Hapus"
              :disabled="!deleteReason || selectedPatient.length == 0"
            />
            <CustomTextfield
              v-if="showDeletePasien"
              v-model="deleteReason"
              :showLabel="false"
              class="my-auto w-[400px]"
              placeholder="Alasan Hapus Data Pasien"
            />
          </div>
          <CustomPaginator
            :rows="properties.pageSize"
            :totalRecords="properties.total"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
    <div v-else class="relative w-full h-full overflow-hidden">
      <Card class="h-min mb-[10px] absolute right-0 left-0">
        <template #content>
          <div class="flex justify-between">
            <CustomBreadCrumb
              :home="{
                label: 'Data Pasien',
                home: true,
              }"
              :model="dataBreadCrumb"
              class=""
            />
            <div class="flex">
              <CustomButton
                @click="closePatientForm"
                icon="PhCaretLeft"
                label="Kembali"
                class="mr-[10px]"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
              />
              <CustomButton
                v-if="isDetail()"
                @click="openPatientForm('edit')"
                label="Edit"
                class="mr-[10px]"
                backgroundColor="bg-adameds-300"
              />
            </div>
          </div>
        </template>
      </Card>
      <div class="relative h-full overflow-auto top-[90px] pb-[180px]">
        <PatientIdentityForm
          ref="patientIdentityForm"
          pageType="datamaster"
          :formType="dataBreadCrumb[0].label as string"
          :isDetail="isDetail()"
          :patientData="openedPatientData"
        />
      </div>
      <Card class="h-min mt-[10px] absolute bottom-0 right-0 left-0">
        <template #content>
          <div class="flex justify-end">
            <CustomButton
              @click="resetForm"
              label="Reset"
              class="mr-[10px]"
              outlined
              borderColor="border-grey-200"
              textColor="text-grey-300"
            />
            <CustomButton
              @click="onSubmit"
              label="Simpan"
              class=""
              backgroundColor="bg-adameds-300"
            />
          </div>
        </template>
      </Card>
    </div>

    <CustomDialog v-model:visible="detailPatientDialog" width="1000px">
      <template #header>
        <div class="flex">
          <div class="bg-white rounded-lg text-adameds-300 px-[10px]">
            {{ openedPatientData.noRm }}
          </div>
          <span class="mx-[10px]">{{ openedPatientData.name }}</span>
          <span class="font-normal leading-6 text-normal"
            >({{ openedPatientData.birthDetail.ageYear }}Th
            {{ openedPatientData.birthDetail.ageMonth }}Bln
            {{ openedPatientData.birthDetail.ageDay }}Hr)</span
          >
        </div>
      </template>
      <template #body>
        <CustomAccordion
          noBorder
          headerClass="text-black py-[15px]"
          initialState="0"
        >
          <template #header>Riwayat Pemeriksaan</template>
          <template #content>
            <div class="pt-[10px]">
              <DataTable
                :value="listHistoryPatient"
                tableStyle="min-width: 50rem"
                scrollable
                scrollHeight="flex"
                :pt="{ headerRow: 'text-SM' }"
              >
                <Column field="nomor" headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold text-center">Nomor</div>
                  </template>
                  <template #body="slotProps">
                    <div class="text-center">
                      {{ slotProps.index + 1 }}
                    </div>
                  </template>
                </Column>
                <Column
                  field="jenisKunjungan"
                  header="Pelayanan"
                  headerClass="bg-adameds-50"
                >
                  <template #body="slotProps">
                    {{
                      slotProps.data.jenisKunjungan == "RI"
                        ? "Rawat Inap"
                        : slotProps.data.jenisKunjungan == "RJ"
                        ? "Rawat Jalan"
                        : slotProps.data.jenisKunjungan
                    }}
                  </template>
                </Column>
                <Column
                  field="practitioner.nama"
                  header="DPJP"
                  headerClass="bg-adameds-50"
                >
                </Column>
                <Column
                  field="paymentMethod"
                  header="Metode Pembayaran"
                  headerClass="bg-adameds-50"
                >
                  <template #body="slotProps">
                    <CustomChip
                      :showCheckedIcon="false"
                      :label="
                        slotProps.data.paymentMethod == 1 ? 'TUNAI' : 'ASURANSI'
                      "
                      :bgColor="
                        slotProps.data.paymentMethod == 1
                          ? 'bg-adameds-50'
                          : 'bg-warning-50'
                      "
                      :textColor="
                        slotProps.data.paymentMethod == 1
                          ? 'text-adameds-300'
                          : 'text-warning-300'
                      "
                      :borderColor="
                        slotProps.data.paymentMethod == 1
                          ? 'border-adameds-300'
                          : 'border-warning-300'
                      "
                      customClass="h-5 pr-[9px] mr-[5px]"
                    />
                    <!-- NOTE Belum Ada BPJS -->
                    <CustomChip
                      v-if="slotProps.data.no_SEP"
                      :showCheckedIcon="false"
                      :label="`SEP.${slotProps.data.no_SEP}`"
                      bgColor="bg-warning-50"
                      textColor="text-warning-300"
                      borderColor="border-warning-300"
                      customClass="h-5 pr-[6px]"
                    />
                  </template>
                </Column>
                <Column field="tglRegistrasi" headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold text-center">Tanggal</div>
                  </template>
                  <template #body="slotProps">
                    <div class="text-center">
                      {{ epochToDate(slotProps.data.tglRegistrasi, "date") }}
                    </div>
                  </template>
                </Column>
                <Column field="statusPembayaran" headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold text-center">
                      Status Pembayaran
                    </div>
                  </template>
                </Column>
              </DataTable>
              <div class="flex justify-end">
                <CustomPaginator
                  :rows="propertiesHistory.pageSize"
                  :totalRecords="propertiesHistory.total"
                  :rowsPerPageOptions="[5]"
                  @page="handlePageHistory"
                />
              </div>
            </div>
          </template>
        </CustomAccordion>
        <CustomAccordion
          noBorder
          headerClass="text-black py-[15px]"
          initialState="0"
        >
          <template #header>Riwayat Unggah Berkas Rekam Medis</template>
          <template #content>
            <DataTable
              v-if="itemsMedicalRecord.length"
              :value="itemsMedicalRecord"
              class="mt-5 overflow-hidden rounded-lg"
              tableStyle="min-width: 50rem"
              stripedRows
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                field="nomor"
                headerClass="bg-adameds-50"
                style="width: 50px"
              >
                <template #header>
                  <div class="w-full font-semibold text-center">No.</div>
                </template>
                <template #body="slotProps">
                  <div class="text-center">
                    <div class="text-SM">{{ slotProps.index + 1 }}</div>
                  </div>
                </template>
              </Column>
              <Column
                field="fileName"
                header="Nama File"
                headerClass="bg-adameds-50"
                bodyClass="text-SM"
              ></Column>
              <Column
                field="type"
                header="Tipe"
                headerClass="bg-adameds-50"
                bodyClass="text-SM"
              ></Column>
              <Column field="uploadDate" headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-semibold text-center">
                    Tanggal Unggah
                  </div>
                </template>
                <template #body="slotProps">
                  <div class="text-center">
                    <div class="text-SM">{{ slotProps.data.uploadDate }}</div>
                  </div>
                </template>
              </Column>
              <Column field="preview" headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-semibold text-center">Preview</div>
                </template>
                <template #body="slotProps">
                  <div class="flex justify-center">
                    <CustomButton
                      @click="() => {}"
                      icon="PhEye"
                      label=""
                      class="h-[30px]"
                      backgroundColor="bg-adameds-300"
                    />
                    <CustomButton
                      @click="() => {}"
                      icon="PhPencilSimple"
                      label=""
                      class="h-[30px] mx-[5px]"
                      backgroundColor="bg-info-300"
                    />
                    <CustomButton
                      @click="() => {}"
                      icon="PhTrash"
                      label=""
                      class="h-[30px]"
                      backgroundColor="bg-danger-300"
                    />
                  </div>
                </template>
              </Column>
            </DataTable>
            <div
              v-if="showUploadForm || itemsMedicalRecord.length == 0"
              class="h-20 border-dashed border-[1px] border-adameds-300 rounded-[10px] mt-5 overflow-hidden"
            >
              <FileUpload
                chooseLabel="Pilih File"
                chooseIcon="pi pi-upload"
                :pt="{ root: 'border-none', content: 'hidden' }"
              >
                <template #header="{ files, chooseCallback, uploadCallback }">
                  <div class="flex mx-auto">
                    <span class="leading-10 text-SM">{{
                      files[0] ? files[0].name : "No File Chosen"
                    }}</span>
                    <CustomButton
                      @click="chooseCallback()"
                      icon="PhUploadSimple"
                      label="Pilih File"
                      outlined
                      class="mx-[10px]"
                      borderColor="border-adameds-300"
                      textColor="text-adameds-300"
                    />
                    <CustomButton
                      @click="uploadCallback()"
                      label="Upload"
                      class=""
                      :disabled="!files[0]"
                      backgroundColor="bg-adameds-300"
                    />
                  </div>
                </template>
              </FileUpload>
            </div>
          </template>
        </CustomAccordion>
        <CustomAccordion
          noBorder
          headerClass="text-black py-[15px]"
          initialState="0"
        >
          <template #header>Data Lengkap Pasien</template>
          <template #content>
            <div class="grid grid-cols-2 gap-y-[10px] mt-5">
              <CustomInfoRow 
                label="No. identitas" 
                :value="openedPatientData.noIdentity"
              />
              <CustomInfoRow 
                label="No. RM"
                :value="openedPatientData.noRm"
              />
              <CustomInfoRow
                label="Nama Lengkap"
                :value="openedPatientData.name"
              />
              <CustomInfoRow
                label="Tempat Lahir"
                :value="openedPatientData.birthDetail.birthPlace"
              />
              <CustomInfoRow
                label="Tanggal lahir"
                :value="openedPatientData.birthDetail.birthDate?.split('T')[0] ?? '-'"
              />
              <CustomInfoRow
                label="Umur"
                :value="`${openedPatientData.birthDetail.ageYear} Tahun`"
              />
              <CustomInfoRow
                label="Jenis kelamin"
                :value="
                  openedPatientData.gender == 'Male' ? 'laki-laki' : 'Perempuan'
                "
              />
              <CustomInfoRow
                label="No. Handphone"
                :value="openedPatientData.phone"
              />
              <CustomInfoRow
                label="Agama"
                :value="openedPatientData.religion"
              />
              <CustomInfoRow
                label="Provinsi"
                :value="openedPatientData.address.prov"
              />
              <CustomInfoRow
                label="Kabupaten/Kota"
                :value="openedPatientData.address.city"
              />
              <CustomInfoRow
                label="Kecamatan"
                :value="openedPatientData.address.district"
              />
              <CustomInfoRow
                label="Alamat"
                :value="openedPatientData.address.fullAddress"
              />
            </div>
            <hr class ="hidden" style="margin-top: 20px;"/>
            <div class="grid grid-cols-2 gap-y-[10px] mt-5 hidden">
              <CustomInfoRow
                label="ID SATUSEHAT"
                :value="openedPatientData.satuSehatId"
              />
            </div>
          </template>
        </CustomAccordion>
      </template>
      <template #footer>
        <div class="flex justify-between w-full">
          <div class="flex">
            <CustomButton
              @click="createPatientCard({ data: openedPatientData })"
              icon="PhPrinter"
              label="Cetak Kartu Pasien"
              class=""
              backgroundColor="bg-adameds-300"
            />
            <div class="bg-adameds-300 w-[1px] my-[5px] mx-[15px]"></div>
            <CustomButton
              @click="showDialogGeneralConsent('list')"
              label="General Consent"
              class="mr-[10px]"
              backgroundColor="bg-adameds-300"
            />
          </div>
          <div class="flex">
            <CustomButton
              @click="(detailPatientDialog = false), openPatientForm('edit')"
              label="Edit Data Pasien"
              class=""
              backgroundColor="bg-adameds-300"
            />
          </div>
        </div>
      </template>
    </CustomDialog>

    <CustomDialog
      v-model:visible="inputGeneralConsentDialog"
      width="1000px"
      @closeDialog="resetGeneralConsentForm"
    >
      <template #header>
        <div class="flex">
          <div>General Consent</div>
          <CustomChip
            v-if="
              (generalConsentDialogInputType != 'add' &&
                selectedGeneralConsent == 'Pasien') ||
              generalConsentDialogInputType == 'add'
            "
            label="Pasien"
            borderColor="border-white"
            iconColor="text-white"
            textColor="text-white"
            selected-icon-color="text-adameds-300"
            selectedTextColor="text-adameds-300"
            :iconSize="16"
            class="ml-[10px]"
            selectedColor="bg-white border-white"
            :isSelected="selectedGeneralConsent == 'Pasien'"
            @selected="onGeneralConsentTypeSelect"
          />
          <CustomChip
            v-if="
              (generalConsentDialogInputType != 'add' &&
                selectedGeneralConsent == 'Keluarga') ||
              generalConsentDialogInputType == 'add'
            "
            label="Keluarga"
            borderColor="border-white"
            iconColor="text-white"
            textColor="text-white"
            selected-icon-color="text-adameds-300"
            selectedTextColor="text-adameds-300"
            :iconSize="16"
            class="ml-[10px]"
            selectedColor="bg-white border-white"
            :isSelected="selectedGeneralConsent == 'Keluarga'"
            @selected="onGeneralConsentTypeSelect"
          />
        </div>
      </template>
      <template #body>
        <div class="mt-5">
          <div
            v-if="
              selectedGeneralConsent == 'Keluarga' &&
              generalConsentDialogInputType == 'add'
            "
            class="grid grid-cols-2 gap-x-[30px] gap-y-5 mb-5"
          >
            <CustomTextfield
              v-model="familyDataName"
              label="Nama Lengkap Keluarga"
              class=""
              placeholder="Nama Lengkap Keluarga"
              :invalid="!!errors['familyData.name']"
              :invalidMessage="errors['familyData.name']"
            />
            <CustomTextArea
              v-model="familyDataAddress"
              label="Alamat"
              class=""
              placeholder="Alamat"
              height="h-10"
              :invalid="!!errors['familyData.address']"
              :invalidMessage="errors['familyData.address']"
            />
            <CustomSelect
              v-model="familyDataGender"
              label="Jenis Kelamin"
              placeHolder="Pilih Jenis Kelamin"
              class=""
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['Laki-laki', 'Perempuan']"
              :invalid="!!errors['familyData.gender']"
              :invalidMessage="errors['familyData.gender']"
            />
            <CustomSelect
              v-model="familyDataRelationship"
              label="Hubungan Dengan Pasien"
              placeHolder="Pilih Hubungan Dengan Pasien"
              class=""
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="[
                'Kepala Keluarga',
                'Mertua',
                'Menantu',
                'Kepokanan',
                'Sepupu',
                'Teman',
                'Kerabat',
                'Asisten Rumah Tangga',
                'Suami',
                'Istri',
                'Ayah',
                'Ibu',
                'Anak',
                'Kakak',
                'Adik',
                'Cucu',
                'Kakek',
                'Nenek',
                'Lainnya',
                'Family Lain',
              ]"
              :invalid="!!errors['familyData.relationship']"
              :invalidMessage="errors['familyData.relationship']"
            />
          </div>
          <CustomSelect
            v-if="generalConsentDialogInputType == 'add'"
            v-model="name"
            @update:model-value="setSelectedGeneralConsent"
            label="Format General Consent"
            placeHolder="General Consent"
            class=""
            optionLabel="name"
            optionValue="uuid"
            :options="listDatamasterGeneralConsent"
            prependIcon="PhMagnifyingGlass"
            :invalid="!!errors.name"
            :invalidMessage="errors.name"
          />
          <CustomTextfield
            v-else
            v-model="name"
            label="Format General Consent"
            class=""
            placeholder="Format General Consent"
            :disabled="generalConsentDialogInputType == 'detail'"
          />
          <div
            v-if="generalConsentDialogInputType == 'add'"
            class="h-[400px] border-[1px] border-grey-200 border-dashed rounded-[10px] mt-5 flex overflow-auto"
          >
            <div
              v-if="selectedDataGeneralConsent"
              v-html="selectedDataGeneralConsent.isiSurat"
              class="w-full px-10"
            ></div>
            <div v-else class="m-auto font-semibold text-normal">
              Default General Consent Rawat Jalan Pilihan Awal
            </div>
          </div>
          <iframe
            v-else
            :src="urlGeneralConsent"
            height="400px"
            width="100%"
            class="mt-5"
          ></iframe>
          <div
            v-if="generalConsentDialogInputType == 'add'"
            class="grid grid-cols-2 mt-10 text-center"
          >
            <div class="font-semibold text-normal">Petugas</div>
            <div class="font-semibold text-normal">
              {{ selectedGeneralConsent == "Pasien" ? "Pasien" : "Keluarga" }}
            </div>
            <Qrcode
              class="mx-auto my-[10px]"
              :value="`Dikeluarkan di Klinik ADAMEDS, Ditandatangani secara elektronik oleh Petugas, Pada tanggal ${getDateNow()}`"
            />
            <Qrcode
              class="mx-auto my-[10px]"
              :value="`Dikeluarkan di Klinik ADAMEDS, Ditandatangani secara elektronik oleh ${
                selectedGeneralConsent == 'Pasien'
                  ? 'Pasien'
                  : 'Keluarga Pasien'
              }, Pada tanggal ${getDateNow()}`"
            />
            <div class="text-SM">Nama Petugas</div>
            <div class="text-SM">
              {{
                selectedGeneralConsent == "Pasien"
                  ? "Nama Pasien"
                  : "Nama Keluarga Pasien"
              }}
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div
          v-if="generalConsentDialogInputType == 'detail'"
          class="flex w-full"
        >
          <CustomButton
            @click="inputGeneralConsentDialog = false"
            icon="PhPrinter"
            label="Cetak"
            class="mr-auto"
            backgroundColor="bg-adameds-300"
          />
          <CustomButton
            @click="deleteGeneralConsent"
            label="Hapus"
            class="bg-danger-300"
            backgroundColor="bg-adameds-300"
            icon="PhTrash"
            iconType="fill"
          />
        </div>
        <div v-else-if="generalConsentDialogInputType == 'edit'" class="flex">
          <CustomButton
            @click="inputGeneralConsentDialog = false"
            label="Batal Edit"
            outlined
            class="mr-[10px]"
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            @click="inputGeneralConsentDialog = false"
            label="Simpan Edit"
            class=""
            backgroundColor="bg-adameds-300"
          />
        </div>
        <div v-else class="flex justify-end w-full">
          <CustomButton
            @click="inputGeneralConsentDialog = false"
            label="Batal"
            outlined
            class="mr-[10px]"
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            @click="onSubmitGeneralConsent"
            label="Setuju & Simpan"
            class=""
            backgroundColor="bg-adameds-300"
          />
        </div>
      </template>
    </CustomDialog>

    <CustomDialog v-model:visible="generalConsentDialog" width="600px">
      <template #header>General Consent</template>
      <template #body>
        <div class="mt-[10px]">
          <div v-for="data in listOpenedPatientGeneralConsent">
            <div
              @click="showDialogGeneralConsent('detail', data.uuid)"
              class="text-black cursor-pointer text-SM"
            >
              <div class="font-bold">
                {{ data.name }}
              </div>
              <!-- <div class="text-adameds-300">Rawat Jalan</div> -->
              <div class="flex">
                Tanggal
                <PhArrowRight
                  :size="18"
                  class="mx-5 ml-2 mr-3 text-success-300"
                  weight="bold"
                />
                {{ epochToDate(data.createdAt, "dateTime") }}
              </div>
            </div>
            <hr class="my-[10px]" />
          </div>
          <div
            class="border-[1px] border-dashed border-grey-200 h-20 rounded-[10px] flex"
          >
            <CustomButton
              @click="
                (generalConsentDialog = false), showDialogGeneralConsent('add')
              "
              icon="PhPlus"
              label="General Consent Baru"
              class="m-auto"
              backgroundColor="bg-adameds-300"
            />
          </div>
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
