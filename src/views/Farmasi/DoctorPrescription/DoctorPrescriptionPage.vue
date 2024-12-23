<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useDoctorPrescriptionStore } from "@/stores/farmasi/DoctorPrescription";
import { utilsStore } from "@/stores/utils";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
import { useMedicalItemStore } from "@/stores/datamasterFarmasi/MedicalItem";
import { epochToDate } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import NoData from "@/components/section/NoData.vue";
import DetailPrescription from "./DetailPrescription.vue";
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const selectedTelaah = ref([]);
const selectedTelaah2 = ref([]);
const selectedTelaah3 = ref([]);
const selectedEdukasi = ref([]);
const batalDialog = ref(false);
const pindahDialog = ref(false);
const editDialog = ref(false);
const gerusDialog = ref(false);
const lokasiStok = ref("");
const layanan = ref("");

const optionsLayanan = ref([
  { label: "IGD", value: "igd" },
  { label: "Rawat Jalan", value: "rj" },
  { label: "Rawat Inap", value: "ri" },
]);

function dateToEpoch(date: any) {
  if (!(date instanceof Date)) {
    throw new Error("Input harus berupa objek Date");
  }
  return date.getTime();
}

// Filter Jenis Resep
const selectedRecipe = ref<string[]>([]);
const onRecipeSelect = (label: string) => {
  if (selectedRecipe.value.includes(label)) {
    selectedRecipe.value = selectedRecipe.value.filter((item) => item != label);
  } else {
    selectedRecipe.value.push(label);
  }
  // console.log(selectedRecipe.value, 'selectedRecipe.value');
  fetchDoctorPrescription();
};
interface Prescription {
  uuid: string;
  noRm: string;
  noReg: string;
  noResep: string;
  dokterOrder: string;
  jenisPelayanan: string;
  orderDate: number;
  isTakeaway?: boolean;
  isChronic?: boolean;
  isCompound?: boolean;
  patient: string;
  lokasiStok: { name: string };
}
interface ApiResponse {
  resepMasuk: Prescription[];
  obatDisiapkan: Prescription[];
  penyerahanObat: Prescription[];
}

const DoctorPrescriptionPayload = ref<ApiResponse>({
  resepMasuk: [],
  obatDisiapkan: [],
  penyerahanObat: []
});


// State Management
const StockLocationStore = useStockLocationStore();
const MedicalItemStore = useMedicalItemStore();
const StockLocationPayload = ref<any[]>([]);
const DoctorPrescriptionStore = useDoctorPrescriptionStore();
const UseUtilsStore = utilsStore();
const searchQuery = ref<string>("");
const PrescriptionDetail=ref<any>();
const stockObatPayload=ref();
// Check if Data Exists
// const hasData = computed(
//   () =>
//     DoctorPrescriptionPayload.value &&
//     DoctorPrescriptionPayload.value.length > 0
// );

// Fetch Doctor Prescription
const fetchDoctorPrescription = async () => {
  UseUtilsStore.setLoading(true);
  let returnMedicine: string | boolean = "";
  let chronicDrugs: string | boolean = "";
  let concoction: string | boolean = "";
  if (selectedRecipe.value.includes("OBAT PULANG")) {
    returnMedicine = true;
  } else if (selectedRecipe.value.includes("OBAT KRONIS")) {
    chronicDrugs = true;
  } else if (selectedRecipe.value.includes("MENGANDUNG RACIKAN")) {
    concoction = true;
  } else if (selectedRecipe.value.length === 3) {
    returnMedicine = "";
    chronicDrugs = "";
    concoction = "";
  }
  console.log(returnMedicine, "returnMedicine");
  console.log(chronicDrugs, "chronicDrugs");
  console.log(concoction, "chronicDrugs");

  try {
    const response = await DoctorPrescriptionStore.getApi({
      // startDate: dateToEpoch(startDateFilter.value),
      // endDate: dateToEpoch(endDateFilter.value),
      startDate: 0,
      endDate: 9828966473567,
      status: [1, 5],
      search: searchQuery.value,
      takeaway: returnMedicine,
      isChronic: chronicDrugs,
      racikan: concoction,
      jenisPelayanan: layanan.value,
      lokasiStokUuid: lokasiStok.value,
    });

    if (response && response.payload) {
      DoctorPrescriptionPayload.value = response.payload;
    } else {
      DoctorPrescriptionPayload.value = { resepMasuk: [], obatDisiapkan: [], penyerahanObat: [] };
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    DoctorPrescriptionPayload.value = { resepMasuk: [], obatDisiapkan: [], penyerahanObat: [] };
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const detailPrescription = async (uuid:string) => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await DoctorPrescriptionStore.detailApi(uuid);

    if (response && response.payload) {
      PrescriptionDetail.value = response.payload;
    } else {
      PrescriptionDetail.value = {};
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    PrescriptionDetail.value = {};
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// Fetch Stock Location
const fetchStockLocation = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await StockLocationStore.getApi();

    if (response && response.payload) {
      StockLocationPayload.value = response.payload;
    } else {
      StockLocationPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    StockLocationPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// Fetch Stock Obat
const fetchStockObat = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await MedicalItemStore.getApi(
      {
        page : 1,
        limit :9999
      }
    );

    if (response && response.payload) {
      stockObatPayload.value = response.payload.filter((item:any) => item.status === true);
    } else {
      StockLocationPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    stockObatPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const updateStokObat = async (uuid:string) => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await DoctorPrescriptionStore.updateStokObat(uuid);
  } catch (error) {
    console.error("Failed to update data", error);
  } finally {
    UseUtilsStore.setLoading(false);
  }
};



const emits = defineEmits(["update:rows", "update:current-page"]);

const namaObat = ref("");
const jumlahTotal = ref();

const defaultData = [
  {
    namaObat: "",
    jumlahTotal: "",
  },
];

const addRow = () => {
  data.value.push({
    namaObat: "",
    jumlahTotal: "",
  });
  console.log(data, "data");
};

const data = ref([...defaultData]);

const itemTelaah = ref([
  {
    farmasetik: "Nama Obat, Bentuk, dan Kekuatan Sediaan",
  },
  {
    farmasetik: "Dosis dan Jumlah Obat",
  },
  {
    farmasetik: "Stabilitas",
  },
  {
    farmasetik: "Aturan dan Cara Penggunaan",
  },
]);

const itemTelaah2 = ref([
  {
    administratif: "Benar Identitas pasien",
  },
  {
    administratif: "Identitas Dokter",
  },
  {
    administratif: "Tanggal Resep",
  },
  {
    administratif: "Unit Asal Resep",
  },
]);

const itemTelaah3 = ref([
  {
    klinik: "Ketepatan Indikasi, Dosis, dan Waktu Penggunaan Obat",
  },
  {
    klinik: "Duplikasi Pengobatan",
  },
  {
    klinik: "Alergi dan Reaksi Obat yang Tidak Dikehendaki (ROTD)",
  },
  {
    klinik: "Kontraindikasi",
  },
  {
    klinik: "Interaksi Obat",
  },
]);

const itemEdukasi = ref([
  {
    edukasi: "Cara Penggunaan",
  },
  {
    edukasi: "Dosis",
  },
  {
    edukasi: "Efek Samping",
  },
  {
    edukasi: "Khasiat Obat",
  },
  {
    edukasi: "Nama Obat",
  },
]);

const stokObat = ref([{ label: "Umum", value: "umum" }]);

const itemsObat = ref([
  {
    stokObat: "",
    caraPakai: "3 x 1 (Sehari)",
    biaya: "1500",
    total: "25000",
  },
]);

// Incoming Recipes
const incomingRecipes = ref(true);
const incomingRecipesDetails = ref(false);

const incomingRecipesOpen = (uuid:string) => {
  readyMedicine.value = false;
  drugHandover.value = false;
  incomingRecipesDetails.value = true;
  detailPrescription(uuid);
};

const incomingRecipesClose = () => {
  readyMedicine.value = true;
  drugHandover.value = true;
  incomingRecipesDetails.value = false;
};

// Ready Medicine
const readyMedicine = ref(true);
const readyMedicineDetails = ref(false);

const readyMedicineOpen = (uuid:string) => {
  incomingRecipes.value = false;
  drugHandover.value = false;
  readyMedicineDetails.value = true;
  detailPrescription(uuid);
};

const readyMedicineClose = () => {
  incomingRecipes.value = true;
  drugHandover.value = true;
  readyMedicineDetails.value = false;
};

// Drug Handover
const drugHandover = ref(true);
const drugHandoverDetails = ref(false);

const drugHandoverOpen = (uuid:string) => {
  incomingRecipes.value = false;
  readyMedicine.value = false;
  drugHandoverDetails.value = true;
  detailPrescription(uuid);
};

const drugHandoverClose = () => {
  incomingRecipes.value = true;
  readyMedicine.value = true;
  drugHandoverDetails.value = false;
};

onMounted(() => {
  fetchDoctorPrescription();
  fetchStockLocation();
  fetchStockObat();
});

const handleReset = () => {
  searchQuery.value = "";
  lokasiStok.value = "";
  layanan.value = "";
  fetchDoctorPrescription();
};
</script>

<template>
  <div>
    <Card
      pt:body:class="h-full pt-0"
      pt:content:class="h-full"
      class="h-full overflow-hidden overflow-y-auto"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton
                  icon="PhArrowClockwise"
                  class="mr-5"
                  @click="fetchDoctorPrescription"
                />
                <CustomBreadCrumb
                  :home="{
                    label: 'Resep Dokter',
                    home: true,
                  }"
                />
              </div>
              <div class="flex mr-[20px]">
                <CustomDatePicker
                  v-model="startDateFilter"
                  @update:model-value="fetchDoctorPrescription"
                  :showLabel="false"
                  class="w-[150px]"
                />
                <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
                <CustomDatePicker
                  v-model="endDateFilter"
                  @update:model-value="fetchDoctorPrescription"
                  :showLabel="false"
                  class="w-[150px]"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                v-model="searchQuery"
                label="Pencarian Transaksi"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama / No. RM / Nama Pasien"
                class="w-[40%] mr-5"
              />
              <CustomSelect
                v-model="lokasiStok"
                place-holder="Pilih Lokasi"
                label="Lokasi"
                class="mr-5 w-[25%]"
                optionLabel="name"
                optionValue="uuid"
                :options="StockLocationPayload"
              />
              <CustomSelect
                v-model="layanan"
                place-holder="Pilih Jenis Pelayanan"
                label="Jenis Pelayanan"
                class="w-[25%]"
                optionLabel="label"
                optionValue="value"
                :options="optionsLayanan"
              />
              <CustomButton
                icon="PhMagnifyingGlass"
                label="Cari"
                class="ml-5 mr-[10px] mt-auto"
                @click="fetchDoctorPrescription"
              />
              <CustomButton
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto"
                @click="handleReset"
              />
            </div>
            
            <!-- Filter Jenis Resep -->
            <div class="flex my-[10px] mt-5">
              <div class="w-[15%] font-semibold text-SM text-grey-300">
                Filter Jenis Resep
              </div>
              <div class="flex">
                <span class="font-semibold text-grey-300">|</span>
                <CustomChip
                  label="OBAT PULANG"
                  borderColor="border-male-300"
                  bgColor="bg-male-50"
                  iconColor="text-male-300"
                  textColor="text-male-300"
                  customClass="h-6"
                  class="ml-[10px]"
                  :isSelected="selectedRecipe.includes('OBAT PULANG')"
                  @selected="onRecipeSelect"
                  selectedColor="bg-male-300 border-male-300"
                />
                <CustomChip
                  label="OBAT KRONIS"
                  borderColor="border-warning-300"
                  bgColor="bg-warning-50"
                  iconColor="text-warning-300"
                  textColor="text-warning-300"
                  customClass="h-6"
                  class="ml-[10px]"
                  :isSelected="selectedRecipe.includes('OBAT KRONIS')"
                  @selected="onRecipeSelect"
                  selectedColor="bg-warning-300 border-warning-300"
                />
                <CustomChip
                  label="MENGANDUNG RACIKAN"
                  borderColor="border-grass-300"
                  bgColor="bg-grass-50"
                  iconColor="text-grass-300"
                  textColor="text-grass-300"
                  customClass="h-6"
                  class="ml-[10px]"
                  :isSelected="selectedRecipe.includes('MENGANDUNG RACIKAN')"
                  @selected="onRecipeSelect"
                  selectedColor="bg-grass-300 border-grass-300"
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
        <div class="grid grid-cols-3 gap-3">
          <!-- Resep Masuk -->
          <div v-show="incomingRecipes">
            <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md flex justify-between ">
              <div class="text-lg font-bold text-white font-poppins">
                Resep Masuk
              </div>
              <div class="w-[40px] bg-white rounded-lg">
                <div class="flex items-center justify-center font-bold text-adameds-300 text-MD font-poppins">{{ DoctorPrescriptionPayload.resepMasuk.length }}</div>
              </div>
            </div>
            <div
              class="h-[430px] p-4 overflow-auto bg-white rounded-b-lg shadow-md"
            >
              <div
              v-if="DoctorPrescriptionPayload.resepMasuk.length"
                v-for="(
                  prescription, prescriptionIndex
                ) in DoctorPrescriptionPayload.resepMasuk"
                :key="prescription.uuid"
                @click="incomingRecipesOpen( prescription.uuid)"
                class=""
              >
                <div class="grid grid-cols-2">
                  
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">{{ prescription.noRm }}</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">{{ prescription.patient }}</div>
                    <div
                      class="text-xs font-bold underline underline-offset-2 mt-[5px]"
                    >
                      Penulis Resep
                    </div>
                    <div class="mt-[5px]">{{ prescription.dokterOrder }}</div>
                    <div
                      class="text-xs font-bold underline underline-offset-2 mt-[5px]"
                    >
                      Lokasi Tujuan Order
                    </div>
                    <div class="mt-[5px]">{{ prescription.lokasiStok.name }}</div>
                    <div>
                      <CustomChip
                        :label="prescription.jenisPelayanan==='igd'? 'IGD' : prescription.jenisPelayanan==='ri'?'RAWAT JALAN' :prescription.jenisPelayanan==='rj'?'RAWAT JALAN':''"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                      <CustomChip
                      v-if="prescription.isTakeaway"
                        label="OBAT PULANG"
                        borderColor="border-male-300"
                        bgColor="bg-male-50"
                        :showCheckedIcon="false"
                        textColor="text-male-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                      <CustomChip
                      v-if="prescription.isChronic"
                        label="OBAT KRONIS"
                        borderColor="border-sunFlower-300"
                        bgColor="bg-sunFlower-50"
                        :showCheckedIcon="false"
                        textColor="text-sunFlower-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                      <CustomChip
                      v-if="prescription.isCompound"
                        label="MENGANDUNG RACIKAN"
                        borderColor="border-grass-300"
                        bgColor="bg-grass-50"
                        :showCheckedIcon="false"
                        textColor="text-grass-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">{{ prescription.noResep }}</div>
                    <div class="text-sm font-bold mt-[5px]">{{ prescription.noReg }}</div>
                    <div
                      class="text-xs font-bold underline underline-offset-2 mt-[5px]"
                    >
                      Tgl. Order
                    </div>
                    <div class="mt-[5px]"> {{ epochToDate(prescription.orderDate, "date") }}</div>
                    <div class="mt-[5px] invisible">test</div>
                    <div class="mt-[5px] invisible">test</div>
                    <div>
                      <CustomChip
                        label="TUNAI"
                        borderColor="border-adameds-300"
                        bgColor="bg-adameds-50"
                        :showCheckedIcon="false"
                        textColor="text-adameds-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200" />
              </div>
              <NoData v-else/>
              <!-- hapus Sebagian array -->
            </div>
          </div>

          <!-- Obat Disiapkan -->
          <div v-show="readyMedicine">
            <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md flex justify-between">
              <div class="text-lg font-bold text-white font-poppins">
                Obat Disiapkan
              </div>
              <div class="w-[40px] bg-white rounded-lg">
                <div class="flex items-center justify-center font-bold text-adameds-300 text-MD font-poppins">{{ DoctorPrescriptionPayload.obatDisiapkan.length }}</div>
              </div>
            </div>
            <div
              class="h-[430px] p-4 overflow-auto bg-white rounded-b-lg shadow-md"
            >
              <div  
              v-if="DoctorPrescriptionPayload.obatDisiapkan.length"
              v-for="(
                  prescription, prescriptionIndex
                ) in DoctorPrescriptionPayload.obatDisiapkan"
                :key="prescription.uuid" @click="readyMedicineOpen(prescription.uuid)" class="">
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">{{ prescription.noRm }}</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">{{ prescription.patient }}</div>
                    <div
                      class="text-xs font-bold underline underline-offset-2 mt-[5px]"
                    >
                      Penulis Resep
                    </div>
                    <div class="mt-[5px]">{{ prescription.dokterOrder }}</div>
                    <div
                      class="text-xs font-bold underline underline-offset-2 mt-[5px]"
                    >
                      Lokasi Tujuan Order
                    </div>
                    <div class="mt-[5px]">{{ prescription.lokasiStok.name }}</div>
                    <div>
                      <CustomChip
                      :label="prescription.jenisPelayanan==='igd'? 'IGD' : prescription.jenisPelayanan==='ri'?'RAWAT JALAN' :prescription.jenisPelayanan==='rj'?'RAWAT JALAN':''"
                      borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                      <CustomChip
                      v-if="prescription.isTakeaway"
                        label="OBAT PULANG"
                        borderColor="border-male-300"
                        bgColor="bg-male-50"
                        :showCheckedIcon="false"
                        textColor="text-male-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                      <CustomChip
                      v-if="prescription.isChronic"
                        label="OBAT KRONIS"
                        borderColor="border-sunFlower-300"
                        bgColor="bg-sunFlower-50"
                        :showCheckedIcon="false"
                        textColor="text-sunFlower-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                      <CustomChip
                      v-if="prescription.isCompound"
                        label="MENGANDUNG RACIKAN"
                        borderColor="border-grass-300"
                        bgColor="bg-grass-50"
                        :showCheckedIcon="false"
                        textColor="text-grass-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">{{ prescription.noResep }}</div>
                    <div class="text-sm font-bold mt-[5px]">{{ prescription.noReg }}</div>
                    <div
                      class="text-xs font-bold underline underline-offset-2 mt-[5px]"
                    >
                      Tgl. Order
                    </div>
                    <div class="mt-[5px]"> {{ epochToDate(prescription.orderDate, "date") }}</div>
                    <div class="mt-[5px] invisible">test</div>
                    <div class="mt-[5px] invisible">test</div>
                    <div>
                      <CustomChip
                        label="TUNAI"
                        borderColor="border-adameds-300"
                        bgColor="bg-adameds-50"
                        :showCheckedIcon="false"
                        textColor="text-adameds-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200" />
              </div>
              <NoData v-else/>
              <!-- hapus sebagian array -->
            </div>
          </div>

          <!-- Penyerahan Obat -->
          <div v-show="drugHandover">
            <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md flex justify-between">
              <div class="text-lg font-bold text-white font-poppins">
                Penyerahan Obat
              </div>
              <div class="w-[40px] bg-white rounded-lg">
                <div class="flex items-center justify-center font-bold text-adameds-300 text-MD font-poppins">{{ DoctorPrescriptionPayload.penyerahanObat.length }}</div>
              </div>
            </div>
            <div
              class="h-[430px] p-4 overflow-auto bg-white rounded-b-lg shadow-md"
            >
              <div 
              v-if="DoctorPrescriptionPayload.penyerahanObat.length"
              v-for="(
                  prescription, prescriptionIndex
                ) in DoctorPrescriptionPayload.penyerahanObat"
                :key="prescription.uuid" @click="drugHandoverOpen(prescription.uuid)" class="">
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">{{ prescription.noRm }}</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">{{ prescription.patient }}</div>
                    <div
                      class="text-xs font-bold underline underline-offset-2 mt-[5px]"
                    >
                      Penulis Resep
                    </div>
                    <div class="mt-[5px]">{{ prescription.dokterOrder }}</div>
                    <div
                      class="text-xs font-bold underline underline-offset-2 mt-[5px]"
                    >
                      Lokasi Tujuan Order
                    </div>
                    <div class="mt-[5px]">{{ prescription.lokasiStok.name }}</div>
                    <div>
                      <CustomChip
                      :label="prescription.jenisPelayanan==='igd'? 'IGD' : prescription.jenisPelayanan==='ri'?'RAWAT JALAN' :prescription.jenisPelayanan==='rj'?'RAWAT JALAN':''"

                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                      <CustomChip
                      v-if="prescription.isTakeaway"
                        label="OBAT PULANG"
                        borderColor="border-male-300"
                        bgColor="bg-male-50"
                        :showCheckedIcon="false"
                        textColor="text-male-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                      <CustomChip
                      v-if="prescription.isChronic"
                        label="OBAT KRONIS"
                        borderColor="border-sunFlower-300"
                        bgColor="bg-sunFlower-50"
                        :showCheckedIcon="false"
                        textColor="text-sunFlower-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                      <CustomChip
                      v-if="prescription.isCompound"
                        label="MENGANDUNG RACIKAN"
                        borderColor="border-grass-300"
                        bgColor="bg-grass-50"
                        :showCheckedIcon="false"
                        textColor="text-grass-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">{{ prescription.noResep }}</div>
                    <div class="text-sm font-bold mt-[5px]">{{ prescription.noReg }}</div>
                    <div
                      class="text-xs font-bold underline underline-offset-2 mt-[5px]"
                    >
                      Tgl. Order
                    </div>
                    <div class="mt-[5px]">{{ epochToDate(prescription.orderDate, "date") }}</div>
                    <div class="mt-[5px] invisible">test</div>
                    <div class="mt-[5px] invisible">test</div>
                    <div>
                      <CustomChip
                        label="TUNAI"
                        borderColor="border-adameds-300"
                        bgColor="bg-adameds-50"
                        :showCheckedIcon="false"
                        textColor="text-adameds-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200" />
              </div>
              <NoData v-else/>
              <!-- hapus data -->
            </div>
          </div>

          <!-- Detail Resep - Telaah -->
          <DetailPrescription v-if="incomingRecipesDetails"  :payload="PrescriptionDetail" @close="incomingRecipesClose"/>
          <!-- Detail Resep - Obat Siap Diserahkan -->
          <DetailPrescription v-if="readyMedicineDetails"  :payload="PrescriptionDetail" @close="readyMedicineClose"/>
          <!-- Detail Resep - Serahkan Obat -->
          <DetailPrescription v-if="drugHandoverDetails"  :payload="PrescriptionDetail" @close="drugHandoverClose"/>
        </div>
      </template>
    </Card>

    <!-- Batal Notification -->


    <!-- Pindah Lokasi Dialog -->


    <!-- Edit Dialog -->
 

    <!-- Gerus Dialog -->

  </div>
</template>
