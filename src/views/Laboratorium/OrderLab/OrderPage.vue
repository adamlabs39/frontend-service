<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import { onMounted, ref, computed, type PropType } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import HeaderFilter from "../Layout/OrderHeader.vue";
import NoData from "@/components/section/NoData.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import DaftarOrderLabPage from "./DaftarOrderLabPage.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import MedicalRecord from "@/views/MedicalRecord/MedicalRecord.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

const pageType = ref("");
const route = useRoute();
const rowsPerPage = ref(10);
const patientData = ref<any>({});
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

const emits = defineEmits(["update:rows", "update:current-page"]);
const handleRowsUpdate = (rows: number) => {
  console.log("Rows updated:", rows);
};
const handlePageUpdate = (page: number) => {
  console.log("Page updated:", page);
};

const headerFilterRef = ref<typeof HeaderFilter>();
const resetFilter = () => {
  headerFilterRef.value?.resetFilter();
};

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

const updatePageType = (path: string) => {
  resetFilter();
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[2] ?? "";
};
onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
});

const selectedStatus = ref<any>();
const itemStatus = ref([
  { name: "Semua", code: "S1" },
  { name: "Belum Lunas", code: "S2" },
  { name: "Batal Order", code: "S3" },
]);

const itemsPasien = ref([
  {
    noRM: "123456",
    no_registrasi: "REG000001",
    no_antrian: "000001",
    name: "Nama Pasien Lengkap",
    ageYear: 20,
    age_month: 3,
    age_day: 5,
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    new_patient: true,
    gender: "L",
    phone: "081234567890",
    doctor: "dr. Spesialis Sp. M",
    polyclinic: "POLI MATA",
    insurance_account_name: "TUNAI",
    tanggal_order: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    status: "Belum Lunas",
  },
  {
    noRM: "123456",
    no_registrasi: "REG000002",
    no_antrian: "000001",
    name: "Nama Pasien Lengkap",
    ageYear: 20,
    age_month: 3,
    age_day: 5,
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    gender: "L",
    phone: "081234567890",
    doctor: "dr. Spesialis Sp. D",
    polyclinic: "MAWAR I",
    bed: "Bed 1",
    insurance_account_name: "TUNAI",
    tanggal_order: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    status: "Belum Lunas",
  },
  {
    noRM: "123456",
    no_registrasi: "REG000003",
    no_antrian: "000001",
    name: "Nama Pasien Lengkap",
    ageYear: 20,
    age_month: 3,
    age_day: 5,
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    gender: "P",
    phone: "081234567890",
    doctor: "dr. Spesialis Sp. M",
    polyclinic: "POLI MATA",
    insurance_account_name: "BPJS",
    no_SEP: "1999999999999999999",
    tanggal_order: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    status: "Belum Lunas",
  },
  {
    noRM: "123456",
    no_registrasi: "REG000004",
    no_antrian: "000001",
    name: "Nama Pasien Lengkap",
    ageYear: 20,
    age_month: 3,
    age_day: 5,
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    new_patient: true,
    gender: "P",
    phone: "081234567890",
    doctor: "dr. Spesialis Sp. D",
    tanggal_order: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    polyclinic: "MAWAR I",
    bed: "Bed 2",
    insurance_account_name: "BPJS",
    no_SEP: "1999999999999999999",
    status: "Batal Order",
  },
  {
    noRM: "123456",
    no_registrasi: "REG000005",
    no_antrian: "000001",
    name: "Nama Pasien Lengkap",
    ageYear: 20,
    age_month: 3,
    age_day: 5,
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    gender: "P",
    phone: "081234567890",
    doctor: "dr. Spesialis Sp. Pk",
    polyclinic: "APS",
    insurance_account_name: "TUNAI",
    tanggal_order: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    status: "Belum Lunas",
  },
]);

const showCancelVisit = ref(false);
const cancelReason = ref<string>();

const selectedPatient = ref([]);
const selectedOrderType = ref<string>("Order");

const onSelectOrderType = (label: string) => {
  selectedOrderType.value = label;
  console.log(selectedOrderType, "selectedOrderType");
};

const medicalRecord = ref<typeof MedicalRecord>();
const openDialogRM = () => {
  medicalRecord.value?.showDialogRM();
};
const popupDialog = ref(false);

const selectedRow = (data: any) => {
  popupDialog.value = true;
  dialogData.value = data.data;
  console.log(`Data`, dialogData);
};

interface DialogData {
  noPendaftaran: string;
  name: string;
  address: string;
  doctor: string;
  practicHour: string;
  tanggalDaftar: string;
  tanggalJadwal: string;
  no_SEP: string;
  insuranceAccountName: string;
  polyclinic: string;
  gender: string;
  phone: string;
  ageYear: number;
  ageMonth: number;
  ageDay: number;
  noMT: string;
  noREG: string;
  newPatient: boolean;
  statusPelayanan: string;
  statusPembayaran: string;
}
const dialogData = ref<DialogData>();

const editIdentitas = () => {
  popupDialog.value = false;
  changeSection("Edit Order");
};
const handleBack = () => {
  popupDialog.value = true; // Menampilkan popup dialog
  dataBreadCrumb.value = [];
};
const editOrderDialog = ref(false);
</script>

<template>
  <div class="flex flex-col w-full h-full overflow-hidden">
    <Card
      v-if="dataBreadCrumb.length == 0"
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-auto"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Order Lab',
                    home: true,
                  }"
                />
                <!-- <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300" />
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Bed Ruangan</p>
                </div> -->
              </div>
              <CustomButton
                @click="changeSection('Daftar')"
                icon="PhPlus"
                label="Order"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama / Alamat / No. RM"
                class="mr-5 grow"
              />
              <CustomSelect
                v-model="selectedStatus"
                :options="itemStatus"
                label="Status"
                class="mr-5 w-[250px]"
                optionLabel="name"
                optionValue="code"
                place-holder="Semua"
              />
              <CustomDatePicker
                v-model="startDateFilter"
                label="Tanggal"
                class="w-[130px]"
              />
              <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
              <CustomDatePicker
                v-model="endDateFilter"
                :showLabel="false"
                class="mt-auto w-[130px]"
              />
              <CustomButton
                icon="PhMagnifyingGlass"
                label="Cari"
                borderColor="border-adameds-300"
                class="ml-5 mr-[10px] mt-auto"
              />
              <CustomButton
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto"
              />
            </div>
            <div class="flex mt-[10px]">
              <CustomButton
                @click="onSelectOrderType('Order')"
                label="ORDER"
                :outlined="selectedOrderType != 'Order'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedOrderType != 'Order'
                    ? 'text-adameds-300'
                    : 'text-white'
                "
                :backgroundColor="
                  selectedOrderType != 'Order'
                    ? 'bg-transparent'
                    : 'bg-adameds-300'
                "
                class="mt-auto mr-[5px] font-semibold"
                full
              />
              <CustomButton
                @click="onSelectOrderType('Lunas')"
                label="BATAL"
                :outlined="selectedOrderType != 'Lunas'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedOrderType != 'Lunas'
                    ? 'text-adameds-300'
                    : 'text-white'
                "
                :backgroundColor="
                  selectedOrderType != 'Lunas'
                    ? 'bg-transparent'
                    : 'bg-adameds-300'
                "
                class="mt-auto ml-[5px] font-semibold"
                full
              />
            </div>
            <div
              class="flex my-[10px] mt-5 font-semibold text-SM text-grey-300"
            >
              <div class="w-[15%]">Filter Pembayaran</div>
              <div class="flex">
                |
                <CustomChip
                  label="TUNAI"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-50"
                  iconColor="text-adameds-300"
                  textColor="text-adameds-300"
                  customClass="h-5"
                  class="ml-[10px]"
                  selectedColor="bg-adameds-300 border-adameds-300"
                />
                <CustomChip
                  label="ASURANSI"
                  borderColor="border-warning-300"
                  bgColor="bg-warning-50"
                  iconColor="text-warning-300"
                  textColor="text-warning-300"
                  customClass="h-5"
                  class="ml-[10px]"
                  selectedColor="bg-warning-300 border-warning-300"
                />
              </div>
            </div>
            <hr class="mt-5 border-[1px] border-grey-200" />
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
          v-model:selection="selectedPatient"
          :value="itemsPasien"
          tableStyle="min-width: 50rem"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          @rowClick="selectedRow"
        >
          <Column field="nomor" headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Nomor</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-SM">RM.{{ slotProps.data.noRM }}</div>
                <div class="text-SM">{{ slotProps.data.no_registrasi }}</div>
                <div class="text-SM">No.{{ slotProps.data.no_antrian }}</div>
              </div>
            </template>
          </Column>
          <Column field="pasien" header="Pasien" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <span class="font-semibold">{{ slotProps.data.name }}</span>
                <span class="text-grey-300">
                  ({{ slotProps.data.ageYear }}Th
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
                  bgColor="bg-adameds-50"
                  textColor="text-adameds-300"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
              </div>
            </template>
          </Column>
          <Column
            field="keperawatan"
            header="Keperawatan"
            headerClass="bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.doctor }}</div>
              <div class="flex flex-wrap">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.polyclinic"
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.bed"
                  :showCheckedIcon="false"
                  :label="slotProps.data.bed"
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.insurance_account_name"
                  :bgColor="
                    slotProps.data.insurance_account_name == 'TUNAI'
                      ? 'bg-adameds-50'
                      : 'bg-warning-50'
                  "
                  :textColor="
                    slotProps.data.insurance_account_name == 'TUNAI'
                      ? 'text-adameds-300'
                      : 'text-warning-300'
                  "
                  :borderColor="
                    slotProps.data.insurance_account_name == 'TUNAI'
                      ? 'border-adameds-300'
                      : 'border-warning-300'
                  "
                  customClass="h-5 pr-[6px] mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.no_SEP"
                  :showCheckedIcon="false"
                  :label="`SEP.${slotProps.data.no_SEP}`"
                  bgColor="bg-warning-50"
                  textColor="text-warning-300"
                  borderColor="border-warning-300"
                  customClass="h-5 pr-[6px]"
                />
              </div>
            </template>
          </Column>
          <Column
            field="data-kunjungan"
            header="Data Kunjungan"
            headerClass="bg-adameds-50"
            style="width: 25%"
          >
            <template #body="slotProps">
              <div class="text-SM">
                <div
                  class="grid content-center grid-cols-[80px_min-content_150px] auto-cols-min"
                >
                  Daftar
                  <PhArrowRight
                    :size="18"
                    class="my-auto mr-5 text-info-300"
                    weight="bold"
                  />
                  {{ slotProps.data.tanggal_order }}
                </div>
                <div
                  class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]"
                >
                  Jadwal
                  <PhArrowRight
                    :size="18"
                    class="my-auto mr-5 text-sunFlower-300"
                    weight="bold"
                  />
                  {{ slotProps.data.tanggal_jadwal }}
                </div>
              </div>
            </template>
          </Column>
          <Column
            v-if="showCancelVisit"
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
            <CustomButton
              v-if="!showCancelVisit"
              @click="showCancelVisit = true"
              class="my-auto bg-danger-300"
              label="Batal Order"
            />

            <CustomButton
              v-if="showCancelVisit"
              @click="showCancelVisit = false"
              class="my-auto mr-[10px]"
              label="Batal"
              outlined
              borderColor="border-grey-200"
              textColor="text-grey-300"
            />

            <CustomButton
              v-if="showCancelVisit"
              @click="showCancelVisit = true"
              class="my-auto mr-[10px] bg-danger-300 w-[20%]"
              label="Iya, Batalkan"
              :disabled="!cancelReason"
            />

            <CustomTextfield
              v-if="showCancelVisit"
              v-model="cancelReason"
              :showLabel="false"
              class="my-auto w-[400px]"
              placeholder="Alasan Batal Order"
            />
          </div>
          <CustomPaginator
            :rows="rowsPerPage"
            :totalRecords="100"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>

    <DaftarOrderLabPage
      v-else-if="dataBreadCrumb[0].label == 'Daftar'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      :patientData="patientData"
      @back="dataBreadCrumb.pop()"
    />

    <!-- Pop Up Dialog -->
    <CustomDialog v-model:visible="popupDialog" width="1000px">
      <template #header>
        <div class="flex justify-between">
          <div class="flex">
            <p>
              Detail Order Lab
              <CustomChip
                label="Poli"
                :showCheckedIcon="false"
                borderColor="border-adameds-300"
                bgColor="bg-adameds-50"
                textColor="text-adameds-300"
                customClass="h-6"
                class="ml-[5px]"
              />
              <CustomChip
                label="TUNAI"
                :showCheckedIcon="false"
                borderColor="border-adameds-300"
                bgColor="bg-adameds-50"
                textColor="text-adameds-300"
                customClass="h-6"
                class="ml-[5px]"
              />
            </p>
          </div>
          <div></div>
          <div class="flex ml-[470px]">
            <div class="bg-white w-[1px] h-[30px]"></div>
            <p class="text-sm ml-[10px] mt-[3px]">Tgl. Order : 3-10-2024</p>
          </div>
          <div></div>
        </div>
      </template>
      <template #body>
        <div>
          <div class="pt-5 mb-20">
            <div class="grid grid-cols-3 gap-4 mt-8">
              <div class="basis-1/4">
                <p class="font-bold text-MD">Nama lengkap pasien</p>
                <p>REG1231235</p>
                <CustomButton class="w-24 h-5 text-sm">00-00-00</CustomButton>
                <CustomChip
                  :showCheckedIcon="false"
                  label="Laki-laki"
                  bgColor="bg-male-75"
                  textColor="text-male-300"
                  customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
                />
              </div>
              <div class="flex">
                <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
                <div class="mt-[20px] mr-[40px]">
                  <p class="text-xs font-bold underline underline-offset-2">
                    Tgl. Lahir
                  </p>
                  <p class="">10 Januari 2090</p>
                </div>
              </div>
              <div class="mt-[20px] mr-[40px]">
                <p class="text-xs font-bold underline underline-offset-2">
                  Umur
                </p>
                <p class="">
                  {{ dialogData?.ageYear }}Th {{ dialogData?.ageMonth }}Bln
                  {{ dialogData?.ageDay }}Hr
                </p>
              </div>
            </div>

            <!-- Profil Pasien  -->

            <div class="grid grid-cols-1 mt-2">
              <CustomAccordion
                no-border
                :openWithHeader="false"
                initial-state="0"
              >
                <template #header>
                  <div class="flex justify-between w-full mt-5">
                    <div class="mt-4 basis-1/4">
                      <p class="font-bold text-MD">Profil Pasien</p>
                    </div>
                  </div>
                </template>
                <template #content>
                  <div class="grid grid-cols-3 gap-4 mt-8">
                    <div class="">
                      <p class="text-xs font-bold underline underline-offset-2">
                        KTP
                      </p>
                      <p>1666666666666666</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Provinsi
                        <span> </span>
                      </p>
                      <p>Jawa Timur</p>
                      <p
                        class="mt-3 text-xs font-bold underline underline-offset-2"
                      >
                        Kelurahahn / Desa
                      </p>
                      <p>Keputih</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Alamat
                        <span> </span>
                      </p>
                      <p>Jl. Ijo Abang no. 17</p>
                    </div>

                    <div>
                      <p class="text-xs font-bold underline underline-offset-2">
                        No. Handphone
                      </p>
                      <p class="">081234567890</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Kabupaten / Kota
                      </p>
                      <p class="">Surabaya</p>
                      <div class="flex flex-row mt-[10px]">
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            RT
                          </p>
                          <p>01</p>
                        </div>
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            RW
                          </p>
                          <p>02</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-xs font-bold underline underline-offset-2">
                        Agama
                      </p>
                      <p class="">Islam</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Kecamatan
                      </p>
                      <p class="">Sukolilo</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Kode Pos
                      </p>
                      <p class="">12345</p>
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
            </div>

            <!-- Asesmen Medis -->
            <div class="grid grid-cols-1 mt-2">
              <CustomAccordion
                no-border
                :openWithHeader="false"
                initial-state="0"
              >
                <template #header>
                  <div class="flex justify-between w-full mt-5">
                    <div class="mt-4 basis-1/4">
                      <p class="font-bold text-MD">Asesmen Medis</p>
                    </div>
                    <div>
                      <CustomButton
                        @click="openDialogRM"
                        label="Rekam Medis"
                        class="mr-4"
                      />
                    </div>
                  </div>
                </template>
                <template #content>
                  <div class="grid grid-cols-3 gap-4 mt-8">
                    <div class="basis-1/4">
                      <p class="text-xs font-bold underline underline-offset-2">
                        Unit Asal
                      </p>
                      <p>Laboratorium</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Maternitas
                        <span> </span>
                      </p>
                      <p>Tidak</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Catatan
                        <span> </span>
                      </p>
                      <p>-</p>
                    </div>

                    <div>
                      <div class="flex">
                        <p
                          class="mr-2 text-xs font-bold underline underline-offset-2"
                        >
                          Dokter Pengirim
                        </p>
                        <CustomChip
                          :showCheckedIcon="false"
                          :label="dialogData?.polyclinic"
                          customClass="h-5 pr-[5px] mr-[5px]"
                        />
                      </div>
                      <p class="">dr. Ibab</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Keluhan Utama
                      </p>
                      <p class="">Sakit</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Alergi
                      </p>
                      <p class="">Tidak Ada</p>
                    </div>
                    <div class="flex mr-[80px]">
                      <div
                        class="bg-mediumGrey-300 w-[1px] h-[135px] mr-[20px]"
                      ></div>
                      <div class="">
                        <p
                          class="text-xs font-bold underline underline-offset-2"
                        >
                          Diagnosa Sekunder
                        </p>
                        <p class="">H10.9 Conjuctivitis</p>
                        <p
                          class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                        >
                          Diagnosa Sekunder
                        </p>
                        <p class="">-</p>
                      </div>
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
            </div>

            <!-- List Order  -->
            <div class="grid grid-cols-1 mt-[20px]">
              <CustomAccordion
                no-border
                :openWithHeader="false"
                initial-state="0"
              >
                <template #header>
                  <div class="flex justify-between w-full">
                    <div class="mt-2">
                      <p>List Pemeriksaan Lab</p>
                    </div>
                    <div class="flex mt-2 ml-[300px]">
                      <div class="bg-mediumGrey-300 w-[1px] h-[30px]"></div>
                      <p class="text-xs ml-2 mt-[3px]">
                        Tgl. Pemeriksaan Lab : 3-10-2024
                      </p>
                    </div>

                    <div class="ml-[10px] items-center">
                      <CustomButton
                        v-if="dialogData?.polyclinic === 'APS'"
                        label="Edit Order"
                        @click="editIdentitas"
                        class="mr-4"
                      />
                      <CustomButton
                        v-if="dialogData?.polyclinic !== 'APS'"
                        label="Edit Order"
                        @click="editOrderDialog = true"
                        class="mr-4"
                      />
                    </div>
                  </div>
                </template>
                <template #content>
                  <div class="mt-[20px]">
                    <card class="bg-adameds-50">
                      <template #content>
                        <div class="flex justify-between">
                          <div class="flex">
                            <p class="text-base font-bold text-adameds-300">
                              LAB1234
                            </p>
                            <div
                              class="bg-black w-[2px] h-[15px] ml-2 mt-1"
                            ></div>
                            <p class="ml-2 text-base">
                              Nama Tarif Pemeriksaan
                            </p>
                          </div>
                        </div>
                      </template>
                    </card>
                    <div class="pt-5 mt-[-20px]">
                      <DataTable
                        class="overflow-hidden rounded-[10px]"
                        scrollable
                        scrollHeight="flex"
                        :pt="{ headerRow: 'text-SM', thead: 'z-0' }"
                      >
                        <Column
                          field="pemeriksaanName"
                          header="Nama Pemeriksaan"
                        >
                          <template #body="slotProps">
                            <div class="flex justify-between">
                              <div>
                                <p class="text-SM">
                                  {{ slotProps.data.pemeriksaanName }}
                                </p>
                              </div>
                            </div>
                          </template>
                        </Column>

                        <Column field="diagnosa" header="Diagnosis">
                          <template #body="slotProps">
                            <div>
                              <p class="text-sm">
                                {{ slotProps.data.diagnosa }}
                              </p>
                            </div>
                          </template>
                        </Column>

                        <!-- Harga -->
                        <Column field="harga">
                          <template #header>
                            <div class="font-bold text-end">Harga</div>
                          </template>
                          <template #body="slotProps">
                            <div class="text-SM text-end">
                              {{ slotProps.data.harga }}
                            </div>
                          </template>
                        </Column>
                      </DataTable>
                    </div>
                    <div class="mt-4">
                      <card class="bg-adameds-50">
                        <template #content>
                          <div class="grid grid-cols-3">
                            <div>
                              <p
                                class="text-xs font-bold underline underline-offset-2"
                              >
                                Dokter Pengirim
                              </p>
                              <p>dr. Anji Sp. M</p>
                            </div>
                            <div class="flex">
                              <div class="bg-black w-[1px] h-[30px] ml-2"></div>
                              <p class="mt-1 ml-4 text-base font-bold">
                                Total Tagihan Lab
                              </p>
                            </div>
                            <div>
                              <p
                                class="flex justify-end mt-1 text-base font-bold"
                              >
                                RP. 0, 00
                              </p>
                            </div>
                          </div>
                        </template>
                      </card>
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
            </div>
          </div>
        </div>
        <Card class="absolute inset-x-0 bottom-0">
          <template #footer>
            <div class="flex justify-end">
              <CustomButton
                label="Validasi Order"
                backgroundColor="bg-adameds-300"
              />
            </div>
          </template>
        </Card>
      </template>
    </CustomDialog>
  </div>
</template>
