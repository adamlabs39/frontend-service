<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { ref } from "vue";
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

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

const itemsPasien = ref([
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    gender: "L",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "1",
    new_patient: true,
    platform: "ADMISI",
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "9999999999999999",
    insurance_account_name: "BPJS",
    polyclinic: "POLI KANDUNGAN",
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "2",
    new_patient: false,
    platform: "ADMISI",
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. Og",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: true,
    platform: "APM",
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: false,
    platform: "MOBILE APP",
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: false,
    platform: "APM",
  },
]);
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
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
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
                  @click="changeSection('Tambah Data Pasien')"
                  icon="PhPlus"
                  label="Pasien"
                  class="mr-[10px]"
                />
              </div>
            </div>
          </template>
          <template #content>
            <CustomTextfield
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
          @rowClick="detailPatientDialog = true"
        >
          <Column
            field="nomor"
            headerClass="bg-adameds-50"
            style="width: 100px"
          >
            <template #header>
              <div class="w-full font-semibold text-center">Nomor</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-SM">RM.{{ slotProps.data.noRM }}</div>
              </div>
            </template>
          </Column>
          <Column field="pasien" header="Pasien" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <span class="font-semibold">{{ slotProps.data.name }}</span>
                <span class="text-grey-300">
                  ({{ slotProps.data.age_year }}Th
                  {{ slotProps.data.age_month }}Bln
                  {{ slotProps.data.age_day }}Hr)
                </span>
              </div>
              <div class="text-XS">{{ slotProps.data.address }}</div>
              <div class="flex flex-wrap">
                <PhUserCirclePlus
                  v-if="slotProps.data.new_patient"
                  :size="22"
                  class="text-adameds-300 mt-auto mr-[5px]"
                  weight="fill"
                />
                <CustomChip
                  v-if="slotProps.data.platform != 'ADMISI'"
                  :showCheckedIcon="false"
                  :label="slotProps.data.platform"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="
                    slotProps.data.gender == 'P' ? 'Perempuan' : 'Laki-laki'
                  "
                  :bgColor="
                    slotProps.data.gender == 'P' ? 'bg-female-75' : 'bg-male-75'
                  "
                  :textColor="
                    slotProps.data.gender == 'P'
                      ? 'text-female-300'
                      : 'text-male-300'
                  "
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.phone"
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
          <Paginator
            :rows="10"
            :totalRecords="120"
            :rowsPerPageOptions="[10, 20, 30]"
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="{currentPage}"
          >
            <template #start="slotProps">Total Data: 0</template>
          </Paginator>
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
                @click="dataBreadCrumb.pop()"
                icon="PhCaretLeft"
                label="Kembali"
                class="mr-[10px]"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
              />
              <CustomButton
                v-if="isDetail()"
                @click="changeSection('Edit Data Pasien')"
                label="Edit"
                class="mr-[10px]"
                backgroundColor="bg-adameds-300"
              />
            </div>
          </div>
        </template>
      </Card>
      <div class="relative h-full overflow-auto top-[90px] pb-[180px]">
        <PatientIdentityForm pageType="datamaster" :isDetail="isDetail()" />
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
              label="Reset"
              class="mr-[10px]"
              outlined
              borderColor="border-grey-200"
              textColor="text-grey-300"
            />
            <CustomButton
              @click="() => {}"
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
            RM.123456
          </div>
          <span class="mx-[10px]">Adam Bin Adam</span>
          <span class="font-normal leading-6 text-normal">(20Th 3Bln 5Hr)</span>
        </div>
      </template>
      <template #body>
        <CustomAccordion noBorder headerClass="text-black py-[15px]">
          <template #header>Riwayat Pemeriksaan</template>
          <template #content>
            <div class="pt-[10px]"></div>
            <ExaminationHistoryCard v-for="data in [1, 2]" class="mt-[10px]" />
          </template>
        </CustomAccordion>
        <CustomAccordion noBorder headerClass="text-black py-[15px]">
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
        <CustomAccordion noBorder headerClass="text-black py-[15px]">
          <template #header>Data Lengkap Pasien</template>
          <template #content>
            <div class="grid grid-cols-2 gap-y-[10px] mt-5">
              <CustomInfoRow label="No. RM" value="123456" />
              <CustomInfoRow label="Nama Lengkap" value="Adam Bin Adam" />
              <CustomInfoRow label="Tempat Lahir" value="Surabaya" />
              <CustomInfoRow label="Tanggal lahir" value="10 Jan 2000" />
              <CustomInfoRow label="Umur" value="24" />
              <CustomInfoRow label="Jenis kelamin" value="laki-laki" />
              <CustomInfoRow label="No. Handphone" value="0820-1234-5678" />
              <CustomInfoRow label="Agama" value="Islam" />
              <CustomInfoRow label="Provinsi" value="Jawa Barat" />
              <CustomInfoRow label="Kabupaten/Kota" value="Surabaya" />
              <CustomInfoRow label="Kecamatan" value="Keputih" />
              <CustomInfoRow label="Alamat" value="Eastern Park, No. 23" />
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
              @click="
                (detailPatientDialog = false), changeSection('Edit Data Pasien')
              "
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
