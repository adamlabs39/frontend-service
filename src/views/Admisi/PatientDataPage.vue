<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import ExaminationHistoryCard from "./Section/ExaminationHistoryCard.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import NoData from "@/components/section/NoData.vue";
import PatientIdentityForm from "./Section/PatientIdentityForm.vue";
import { utilsStore } from "@/stores/utils";
import { useAdmisiMasterPasienStore } from "@/stores/admisi/masterPasien";
import type { DataTableRowClickEvent } from "primevue/datatable";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import { formatDate } from "@/utils/Helpers";

// NOTE Store
const storeUtils = utilsStore();
const masterPasienStore = useAdmisiMasterPasienStore();

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

const itemsPasien = ref<any[]>([]);
const itemsMedicalRecord = ref([
  {
    fileName: "Berkas File Pasien Lama - adameds bin adam",
    type: "Pdf",
    uploadDate: "10 Jan 2024 09:00",
  },
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
const showDetailPatient = async (event: DataTableRowClickEvent) => {
  storeUtils.setLoading(true);
  try {
    const response = await masterPasienStore.getDetailMasterPasien(
      event.data.uuid
    );
    if (response && response.payload) {
      openedPatientData.value = response.payload;
      detailPatientDialog.value = true;
    } else {
      openedPatientData.value = {};
    }
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
    storeUtils.setLoading(true);
    const patientData = await patientIdentityForm.value.onSubmit();
    try {
      let tempBirthDate = formatDate(
        patientData!.birthDetail.birthDate,
        true
      );
      patientData!.birthDetail.birthDate = tempBirthDate as unknown as Date;
      if (method.value == "add") {
        await masterPasienStore.createMasterPasien(patientData);
      } else if (method.value == "edit") {
        await masterPasienStore.updateMasterPasien(
          openedPatientData.value.uuid,
          patientData
        );
      }
      closePatientForm();
    } catch (error) {
      console.error("Failed to process the data:", error);
    } finally {
      storeUtils.setLoading(false);
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
              <div class="flex">
                <CustomButton
                  @click="() => {}"
                  icon="PhFileArrowDown"
                  label="Import"
                  class="mr-[10px]"
                />
                <CustomButton
                  @click="openPatientForm('add')"
                  icon="PhPlus"
                  label="Pasien"
                  class="mr-[10px]"
                />
              </div>
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
          tableStyle="min-width: 50rem"
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
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
                <!-- FIXME Belum Ada -->
                <CustomChip
                  :showCheckedIcon="false"
                  :label="data.phone"
                  bgColor="bg-adameds-75"
                  textColor="text-adameds-300"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
              </div>
            </template>
          </Column>
        </DataTable>
        <NoData v-else />
      </template>
      <template #footer>
        <div class="flex justify-between">
          <CustomButton
            @click="() => {}"
            class="my-auto bg-danger-300"
            label="Hapus Pasien"
          />
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
          <div v-if="isDetail()" class="flex">
            <CustomButton
              @click="() => {}"
              icon="PhPrinter"
              label="Cetak Kartu Pasien"
              class=""
              backgroundColor="bg-adameds-300"
            />
            <div class="bg-adameds-300 w-[1px] my-[5px] mx-[15px]"></div>
            <CustomButton
              @click="() => {}"
              label="General Consent"
              class="mr-[10px]"
              backgroundColor="bg-adameds-300"
            />
          </div>
          <div v-else class="flex justify-end">
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
            <div class="pt-[10px]"></div>
            <ExaminationHistoryCard v-for="data in [1, 2]" class="mt-[10px]" />
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
              :value="itemsMedicalRecord"
              class="mt-5 overflow-hidden rounded-lg"
              tableStyle="min-width: 50rem"
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
              v-if="showUploadForm"
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
              <CustomInfoRow label="No. RM" :value="openedPatientData.noRm" />
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
                :value="openedPatientData.birthDetail.birthDate"
              />
              <CustomInfoRow
                label="Umur"
                :value="`${openedPatientData.birthDetail.ageYear} Tahun, ${openedPatientData.birthDetail.ageMonth} Bulan, ${openedPatientData.birthDetail.ageDay} Hari`"
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
          </template>
        </CustomAccordion>
      </template>
      <template #footer>
        <div class="flex justify-between w-full">
          <div class="flex">
            <CustomButton
              @click="() => {}"
              icon="PhPrinter"
              label="Cetak Kartu Pasien"
              class=""
              backgroundColor="bg-adameds-300"
            />
            <div class="bg-adameds-300 w-[1px] my-[5px] mx-[15px]"></div>
            <CustomButton
              @click="() => {}"
              label="General Consent"
              class="mr-[10px]"
              backgroundColor="bg-adameds-300"
            />
          </div>
          <div class="flex">
            <CustomButton
              @click="showUploadForm = true"
              label="Upload berkas RM"
              class="mr-[10px]"
              backgroundColor="bg-adameds-300"
            />
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
  </div>
</template>
