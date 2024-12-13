<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useDoctorPrescriptionStore } from "@/stores/farmasi/DoctorPrescription";
import { utilsStore } from "@/stores/utils";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
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
const StockLocationPayload = ref<any[]>([]);
const DoctorPrescriptionStore = useDoctorPrescriptionStore();
const UseUtilsStore = utilsStore();
const searchQuery = ref<string>("");

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
      startDate: dateToEpoch(startDateFilter.value),
      endDate: dateToEpoch(endDateFilter.value),
      // startDate: 0,
      // endDate: 9828966473567,
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

const incomingRecipesOpen = () => {
  readyMedicine.value = false;
  drugHandover.value = false;
  incomingRecipesDetails.value = true;
};

const incomingRecipesClose = () => {
  readyMedicine.value = true;
  drugHandover.value = true;
  incomingRecipesDetails.value = false;
};

// Ready Medicine
const readyMedicine = ref(true);
const readyMedicineDetails = ref(false);

const readyMedicineOpen = () => {
  incomingRecipes.value = false;
  drugHandover.value = false;
  readyMedicineDetails.value = true;
};

const readyMedicineClose = () => {
  incomingRecipes.value = true;
  drugHandover.value = true;
  readyMedicineDetails.value = false;
};

// Drug Handover
const drugHandover = ref(true);
const drugHandoverDetails = ref(false);

const drugHandoverOpen = () => {
  incomingRecipes.value = false;
  readyMedicine.value = false;
  drugHandoverDetails.value = true;
};

const drugHandoverClose = () => {
  incomingRecipes.value = true;
  readyMedicine.value = true;
  drugHandoverDetails.value = false;
};

onMounted(() => {
  fetchDoctorPrescription();
  fetchStockLocation();
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
                <div class="text-adameds-300 text-MD font-bold font-poppins flex justify-center items-center">{{ DoctorPrescriptionPayload.resepMasuk.length }}</div>
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
                v-on:click="incomingRecipesOpen"
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
                <div class="text-adameds-300 text-MD font-bold font-poppins flex justify-center items-center">{{ DoctorPrescriptionPayload.obatDisiapkan.length }}</div>
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
                :key="prescription.uuid" v-on:click="readyMedicineOpen" class="">
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
                <div class="text-adameds-300 text-MD font-bold font-poppins flex justify-center items-center">{{ DoctorPrescriptionPayload.penyerahanObat.length }}</div>
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
                :key="prescription.uuid" v-on:click="drugHandoverOpen" class="">
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
          <div v-show="incomingRecipesDetails" class="col-span-2">
            <div class="mt-[10px] p-3 bg-adameds-75">
              <!-- Title -->
              <div
                class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md h-[60px]"
              >
                <div class="grid grid-cols-2 gap-2">
                  <div class="flex">
                    <p class="font-bold text-white font-poppins">RSP1234</p>
                    <CustomChip
                      label="TUNAI"
                      :showCheckedIcon="false"
                      borderColor="border-adameds-300"
                      bgColor="bg-adameds-50"
                      textColor="text-adameds-300"
                      customClass="h-5"
                      class="ml-[5px] mt-[2px]"
                    />
                  </div>
                  <div class="flex justify-end">
                    <div class="bg-white w-[0.5px] h-[30px] mr-[20px]"></div>
                    <p
                      class="text-sm font-bold text-white font-poppins mt-[5px] mr-[20px]"
                    >
                      Tgl. Order : 3-10-2024
                    </p>
                    <CustomButton
                      background-color="bg-white"
                      size="small"
                      class="w-[30px] h-[30px] rounded-full p-0"
                      @click="incomingRecipesClose"
                    >
                      <img src="@/assets/icons/x-bold.svg" alt="" width="" />
                    </CustomButton>
                  </div>
                </div>
              </div>
              <!-- Body -->
              <div class="p-4 bg-white rounded-b-lg shadow-md">
                <div class="flex flex-row">
                  <div class="basis-1/2">
                    <p class="font-bold text-MD">Nama lengkap pasien</p>
                    <p>REG1231235</p>
                    <CustomButton class="w-24 h-5 text-sm"
                      >00-00-00</CustomButton
                    >
                    <CustomChip
                      :showCheckedIcon="false"
                      label="Laki-laki"
                      bgColor="bg-male-75"
                      textColor="text-male-300"
                      customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
                    />
                    <!-- <CustomChip
                      :showCheckedIcon="false"
                      label="Perempuan"
                      bgColor="bg-female-75"
                      textColor="text-female-300"
                      customClass="h-5 pr-[6px] border-none mr-[5px]"
                    /> -->
                  </div>
                  <div
                    class="bg-mediumGrey-300 w-[1px] h-[70px] mr-[20px]"
                  ></div>
                  <div class="basis-1/4">
                    <p
                      class="text-xs font-bold underline underline-offset-2 mt-[15px]"
                    >
                      Tgl. Lahir
                    </p>
                    <p class="">10 Januari 2090</p>
                  </div>
                  <div class="basis-1/4">
                    <p
                      class="text-xs font-bold underline underline-offset-2 mt-[15px]"
                    >
                      Umur
                    </p>
                    <p class="">24Thn 2Bln 1Hari</p>
                  </div>
                </div>
                <!-- Asesmen Medis -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>
                      <div class="">Asesmen Medis</div>
                    </template>
                    <template #content>
                      <div class="flex flex-row mt-[20px]">
                        <div class="basis-1/2">
                          <div class="grid grid-cols-2">
                            <div>
                              <p
                                class="text-xs font-bold underline underline-offset-2"
                              >
                                Keluhan Utama
                              </p>
                              <p>Demam</p>
                            </div>
                            <div>
                              <p
                                class="text-xs font-bold underline underline-offset-2"
                              >
                                Alergi
                              </p>
                              <p>Tidak Ada</p>
                            </div>
                            <div>
                              <p
                                class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                              >
                                Dokter Pengirim
                                <span>
                                  <CustomButton
                                    class="h-[20px] w-[40px] text-xs ml-[10px]"
                                    outlined
                                    borderColor="border-grey-300"
                                    textColor="text-grey-300"
                                    >IGD</CustomButton
                                  >
                                </span>
                              </p>
                              <p>dr. Anji Sp. M</p>
                            </div>
                          </div>
                        </div>
                        <div
                          class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"
                        ></div>
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            Diagnosa Primer
                          </p>
                          <p class="">H10.9 Conjuctivitis</p>
                          <p
                            class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                          >
                            Diagnosa Sekunder
                          </p>
                          <p class="">-</p>
                        </div>
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            Diagnosa Sekunder
                          </p>
                          <p class="">-</p>
                          <p
                            class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                          >
                            Diagnosa Sekunder
                          </p>
                          <p class="">-</p>
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
                <!-- List Obat -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>List Obat</template>
                    <template #content>
                      <div>
                        <div
                          class="mt-[20px] p-4 rounded-t-lg bg-adameds-50 shadow-md"
                        >
                          <div class="grid grid-cols-2 gap-2">
                            <div class="flex">
                              <CustomButton class="text-sm h-7"
                                >02</CustomButton
                              >
                              <p class="my-auto ml-2 text-sm font-bold">
                                Amoxcillin
                              </p>
                              <PhArrowRight
                                :size="20"
                                class="my-auto ml-2 text-success-300"
                                weight="bold"
                              />
                              <p class="my-auto ml-2 text-sm font-bold">
                                15 Tablet
                              </p>
                            </div>
                            <div class="flex justify-end">
                              <CustomChip
                                :showCheckedIcon="false"
                                label="OBAT KRONIS"
                                bgColor="bg-warning-50"
                                textColor="text-warning-300"
                                borderColor="border-warning-300"
                                customClass="h-6 pr-[6px]"
                              />
                              <CustomButton
                                label=""
                                background-color="bg-grass-300 rounded-lg"
                                class="h-6 w-[26px] p-0 ml-[10px] mr-[10px]"
                                @click="gerusDialog = true"
                              >
                                <img
                                  src="@/assets/icons/Exclude.svg"
                                  alt=""
                                  width="15"
                                />
                              </CustomButton>
                              <CustomButton
                                label=""
                                background-color="bg-[#3D84E5] rounded-lg"
                                class="h-6 w-[26px] p-0"
                                @click="editDialog = true"
                              >
                                <img src="@/assets/icons/edit.svg" alt="" />
                              </CustomButton>
                            </div>
                          </div>
                        </div>
                        <div
                          class="h-[140px] p-4 overflow-auto bg-white rounded-b-lg shadow-md"
                        >
                          <DataTable
                            :value="itemsObat"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <!-- Stok Obat -->
                            <Column field="itemsObat" header="Stok Obat">
                              <template #body="slotProps">
                                <div class="">
                                  <CustomSelect
                                    v-model="slotProps.data.itemsObat"
                                    :show-label="false"
                                    place-holder="Pilih Stok"
                                    optionValue="value"
                                    optionLabel="label"
                                    :options="stokObat"
                                  />
                                </div>
                              </template>
                            </Column>
                            <!-- Aturan & Cara Pakai -->
                            <Column
                              field="caraPakai"
                              header="Aturan & Cara Pakai"
                            >
                              <template #body="slotProps">
                                <div>
                                  <p class="text-sm">
                                    {{ slotProps.data.caraPakai }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <!-- Biaya Satuan -->
                            <Column field="biaya" header="Biaya Satuan">
                              <template #body="slotProps">
                                <div class="text-sm">
                                  {{ slotProps.data.biaya }}
                                </div>
                              </template>
                            </Column>
                            <!-- Sub. Total -->
                            <Column field="total" header="Sub. Total">
                              <template #body="slotProps">
                                <div class="text-sm">
                                  {{ slotProps.data.total }}
                                </div>
                              </template>
                            </Column>
                          </DataTable>
                        </div>
                      </div>
                      <div>
                        <div
                          class="mt-[20px] p-4 rounded-t-lg bg-adameds-50 shadow-md"
                        >
                          <div class="grid grid-cols-2 gap-2">
                            <div class="flex">
                              <CustomButton class="text-sm h-7"
                                >02</CustomButton
                              >
                              <p class="my-auto ml-2 text-sm font-bold">
                                Amoxcillin
                              </p>
                              <PhArrowRight
                                :size="20"
                                class="my-auto ml-2 text-success-300"
                                weight="bold"
                              />
                              <p class="my-auto ml-2 text-sm font-bold">
                                15 Tablet
                              </p>
                            </div>
                            <div class="flex justify-end">
                              <CustomButton
                                label=""
                                background-color="bg-grass-300 rounded-lg"
                                class="h-6 w-[26px] p-0 ml-[10px] mr-[10px]"
                                @click="gerusDialog = true"
                              >
                                <img
                                  src="@/assets/icons/Exclude.svg"
                                  alt=""
                                  width="15"
                                />
                              </CustomButton>
                              <CustomButton
                                label=""
                                background-color="bg-[#3D84E5] rounded-lg"
                                class="h-6 w-[26px] p-0"
                                @click="editDialog = true"
                              >
                                <img src="@/assets/icons/edit.svg" alt="" />
                              </CustomButton>
                            </div>
                          </div>
                        </div>
                        <div
                          class="h-[140px] p-4 overflow-auto bg-white rounded-b-lg shadow-md"
                        >
                          <DataTable
                            :value="itemsObat"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <!-- Stok Obat -->
                            <Column field="itemsObat" header="Stok Obat">
                              <template #body="slotProps">
                                <div class="">
                                  <CustomSelect
                                    v-model="slotProps.data.itemsObat"
                                    :show-label="false"
                                    place-holder="Pilih Stok"
                                    optionValue="value"
                                    optionLabel="label"
                                    :options="stokObat"
                                  />
                                </div>
                              </template>
                            </Column>
                            <!-- Aturan & Cara Pakai -->
                            <Column
                              field="caraPakai"
                              header="Aturan & Cara Pakai"
                            >
                              <template #body="slotProps">
                                <div>
                                  <p class="text-sm">
                                    {{ slotProps.data.caraPakai }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <!-- Biaya Satuan -->
                            <Column field="biaya" header="Biaya Satuan">
                              <template #body="slotProps">
                                <div class="text-sm">
                                  {{ slotProps.data.biaya }}
                                </div>
                              </template>
                            </Column>
                            <!-- Sub. Total -->
                            <Column field="total" header="Sub. Total">
                              <template #body="slotProps">
                                <div class="text-sm">
                                  {{ slotProps.data.total }}
                                </div>
                              </template>
                            </Column>
                          </DataTable>
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
                <!-- Penulis Resep -->
                <div class="grid grid-cols-1">
                  <card class="bg-adameds-50">
                    <template #content>
                      <div class="flex flex-row">
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            Penulisan Resep
                          </p>
                          <p class="">dr. Nama Dokter</p>
                        </div>
                        <div class="basis-1/2">
                          <div class="flex">
                            <div
                              class="bg-adameds-300 w-[1px] h-[40px] mr-[20px]"
                            ></div>
                            <p class="font-bold mt-[7px]">
                              Total Tagihan Resep
                            </p>
                          </div>
                        </div>
                        <div class="basis-1/4">
                          <p class="text-base font-bold text-right mt-[7px]">
                            RP. 0, 00
                          </p>
                        </div>
                      </div>
                    </template>
                  </card>
                </div>
                <!-- Telaah Resep -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>Telaah Resep</template>
                    <template #content>
                      <div class="grid grid-cols-3 gap-3">
                        <!-- itemTelaah -->
                        <div class="mt-[20px]">
                          <DataTable
                            :value="itemTelaah"
                            scrollable
                            scrollHeight="380px"
                            :pt="{ headerRow: 'text-SM' }"
                            v-model:selection="selectedTelaah"
                          >
                            <Column
                              field="farmasetik"
                              headerClass="bg-adameds-50"
                            >
                              <template #header>
                                <div class="w-full font-bold">
                                  Aspek Farmasetik
                                </div>
                              </template>
                              <template #body="slotProps">
                                <div class="flex">
                                  <p class="text-xs">
                                    {{ slotProps.data.farmasetik }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <Column
                              field="hasil"
                              header="Hasil"
                              headerClass="bg-adameds-50"
                            ></Column>
                            <Column
                              selectionMode="multiple"
                              headerClass="bg-adameds-50"
                              class="custom-checkbox"
                            ></Column>
                          </DataTable>
                        </div>
                        <!-- itemTelaah2 -->
                        <div class="mt-[20px]">
                          <DataTable
                            :value="itemTelaah2"
                            v-model:selection="selectedTelaah2"
                            scrollable
                            scrollHeight="380px"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <Column
                              field="farmasetik"
                              headerClass="bg-adameds-50"
                            >
                              <template #header>
                                <div class="w-full font-bold">
                                  Aspek Administratif
                                </div>
                              </template>
                              <template #body="slotProps">
                                <div class="flex">
                                  <p class="text-xs">
                                    {{ slotProps.data.administratif }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <Column
                              field="hasil"
                              header="Hasil"
                              headerClass="bg-adameds-50"
                            ></Column>
                            <Column
                              selectionMode="multiple"
                              headerClass="bg-adameds-50"
                              class="custom-checkbox"
                            ></Column>
                          </DataTable>
                        </div>
                        <!-- itemTelaah3 -->
                        <div class="mt-[20px]">
                          <DataTable
                            :value="itemTelaah3"
                            v-model:selection="selectedTelaah3"
                            scrollable
                            scrollHeight="430px"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <Column
                              field="farmasetik"
                              headerClass="bg-adameds-50"
                            >
                              <template #header>
                                <div class="w-full font-bold">Aspek Klinik</div>
                              </template>
                              <template #body="slotProps">
                                <div class="flex">
                                  <p class="text-xs">
                                    {{ slotProps.data.klinik }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <Column
                              field="hasil"
                              header="Hasil"
                              headerClass="bg-adameds-50"
                            ></Column>
                            <Column
                              selectionMode="multiple"
                              headerClass="bg-adameds-50"
                              class="custom-checkbox"
                            ></Column>
                          </DataTable>
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
                <hr class="mt-5 border-[1px] border-grey-200" />
                <!-- Petugas Telaah -->
                <div class="grid grid-cols-2 gap-2">
                  <div class="mt-[20px]">
                    <CustomSelect
                      place-holder="Nama Petugas"
                      label="Petugas Telaah"
                      optionLabel=""
                      optionValue=""
                      :options="['Pagi', 'Siang', 'Sore', 'Malem']"
                    />
                  </div>
                  <div class="mt-[45px] text-right">
                    <CustomButton label="Simpan Telaah" />
                  </div>
                </div>
                <hr class="mt-5 border-[1px] border-grey-200" />
                <!-- Diverifikasi Oleh -->
                <div class="grid grid-cols-[40%,20%,40%]">
                  <div class="flex">
                    <div class="mt-[20px]">
                      <CustomButton
                        label="Batal Order"
                        backgroundColor="bg-danger-300"
                        borderColor="border-danger-300"
                        textColor="text-white"
                        @click="batalDialog = true"
                      />
                      <CustomButton
                        label="Pindah Lokasi Order"
                        class="ml-[10px]"
                        @click="pindahDialog = true"
                      />
                    </div>
                  </div>
                  <div class="mt-[20px] ml-[-10px]">
                    <CustomButton>
                      <div class="flex items-center gap-2">
                        <PhPrinter :size="18" color="#ffffff" weight="fill" />
                        <div class="text-sm">Cetak</div>
                      </div>
                    </CustomButton>
                  </div>
                  <div class="flex justify-end">
                    <div class="mt-[20px]">
                      <p
                        class="text-xs font-bold text-right underline underline-offset-2"
                      >
                        Diverifikasi Oleh
                      </p>
                      <p>Nama Petugas</p>
                    </div>
                    <div class="mt-[20px]">
                      <div
                        class="bg-mediumGrey-300 w-[1px] h-[33px] ml-[20px] mt-1"
                      ></div>
                    </div>
                    <div class="mt-[20px]">
                      <CustomButton label="Verifikasi" class="ml-[20px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Detail Resep - Obat Siap Diserahkan -->
          <div v-show="readyMedicineDetails" class="col-span-2">
            <div class="mt-[10px] p-3 bg-adameds-75">
              <!-- Title -->
              <div
                class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md h-[60px]"
              >
                <div class="grid grid-cols-2 gap-2">
                  <div class="flex">
                    <p class="font-bold text-white font-poppins">RSP1234</p>
                    <CustomChip
                      label="TUNAI"
                      :showCheckedIcon="false"
                      borderColor="border-adameds-300"
                      bgColor="bg-adameds-50"
                      textColor="text-adameds-300"
                      customClass="h-5"
                      class="ml-[5px] mt-[2px]"
                    />
                  </div>
                  <div class="flex justify-end">
                    <div class="bg-white w-[0.5px] h-[30px] mr-[20px]"></div>
                    <p
                      class="text-sm font-bold text-white font-poppins mt-[5px] mr-[20px]"
                    >
                      Tgl. Order : 3-10-2024
                    </p>
                    <CustomButton
                      background-color="bg-white"
                      size="small"
                      class="w-[30px] h-[30px] rounded-full p-0"
                      @click="readyMedicineClose"
                    >
                      <img src="@/assets/icons/x-bold.svg" alt="" width="" />
                    </CustomButton>
                  </div>
                </div>
              </div>
              <!-- Body -->
              <div class="p-4 bg-white rounded-b-lg shadow-md">
                <div class="flex flex-row">
                  <div class="basis-1/2">
                    <p class="font-bold text-MD">Nama lengkap pasien</p>
                    <p>REG1231235</p>
                    <CustomButton class="w-24 h-5 text-sm"
                      >00-00-00</CustomButton
                    >
                    <CustomChip
                      :showCheckedIcon="false"
                      label="Laki-laki"
                      bgColor="bg-male-75"
                      textColor="text-male-300"
                      customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
                    />
                    <!-- <CustomChip
                      :showCheckedIcon="false"
                      label="Perempuan"
                      bgColor="bg-female-75"
                      textColor="text-female-300"
                      customClass="h-5 pr-[6px] border-none mr-[5px]"
                    /> -->
                  </div>
                  <div
                    class="bg-mediumGrey-300 w-[1px] h-[70px] mr-[20px]"
                  ></div>
                  <div class="basis-1/4">
                    <p
                      class="text-xs font-bold underline underline-offset-2 mt-[15px]"
                    >
                      Tgl. Lahir
                    </p>
                    <p class="">10 Januari 2090</p>
                  </div>
                  <div class="basis-1/4">
                    <p
                      class="text-xs font-bold underline underline-offset-2 mt-[15px]"
                    >
                      Umur
                    </p>
                    <p class="">24Thn 2Bln 1Hari</p>
                  </div>
                </div>
                <!-- Asesmen Medis -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>
                      <div class="">Asesmen Medis</div>
                    </template>
                    <template #content>
                      <div class="flex flex-row mt-[20px]">
                        <div class="basis-1/2">
                          <div class="grid grid-cols-2">
                            <div>
                              <p
                                class="text-xs font-bold underline underline-offset-2"
                              >
                                Keluhan Utama
                              </p>
                              <p>Demam</p>
                            </div>
                            <div>
                              <p
                                class="text-xs font-bold underline underline-offset-2"
                              >
                                Alergi
                              </p>
                              <p>Tidak Ada</p>
                            </div>
                            <div>
                              <p
                                class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                              >
                                Dokter Pengirim
                                <span>
                                  <CustomButton
                                    class="h-[20px] w-[40px] text-xs ml-[10px]"
                                    outlined
                                    borderColor="border-grey-300"
                                    textColor="text-grey-300"
                                    >IGD</CustomButton
                                  >
                                </span>
                              </p>
                              <p>dr. Anji Sp. M</p>
                            </div>
                          </div>
                        </div>
                        <div
                          class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"
                        ></div>
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            Diagnosa Primer
                          </p>
                          <p class="">H10.9 Conjuctivitis</p>
                          <p
                            class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                          >
                            Diagnosa Sekunder
                          </p>
                          <p class="">-</p>
                        </div>
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            Diagnosa Sekunder
                          </p>
                          <p class="">-</p>
                          <p
                            class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                          >
                            Diagnosa Sekunder
                          </p>
                          <p class="">-</p>
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
                <!-- List Obat -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>List Obat</template>
                    <template #content>
                      <div>
                        <div
                          class="mt-[20px] p-4 rounded-t-lg bg-adameds-50 shadow-md"
                        >
                          <div class="grid grid-cols-2 gap-2">
                            <div class="flex">
                              <CustomButton class="text-sm h-7"
                                >02</CustomButton
                              >
                              <p class="my-auto ml-2 text-sm font-bold">
                                Amoxcillin
                              </p>
                              <PhArrowRight
                                :size="20"
                                class="my-auto ml-2 text-success-300"
                                weight="bold"
                              />
                              <p class="my-auto ml-2 text-sm font-bold">
                                15 Tablet
                              </p>
                            </div>
                            <div class="flex justify-end">
                              <CustomChip
                                :showCheckedIcon="false"
                                label="OBAT KRONIS"
                                bgColor="bg-warning-50"
                                textColor="text-warning-300"
                                borderColor="border-warning-300"
                                customClass="h-6 pr-[6px]"
                              />
                              <CustomButton
                                label=""
                                background-color="bg-grass-300 rounded-lg"
                                class="h-6 w-[26px] p-0 ml-[10px] mr-[10px]"
                                @click="gerusDialog = true"
                              >
                                <img
                                  src="@/assets/icons/Exclude.svg"
                                  alt=""
                                  width="15"
                                />
                              </CustomButton>
                              <CustomButton
                                label=""
                                background-color="bg-[#3D84E5] rounded-lg"
                                class="h-6 w-[26px] p-0"
                                @click="editDialog = true"
                              >
                                <img src="@/assets/icons/edit.svg" alt="" />
                              </CustomButton>
                            </div>
                          </div>
                        </div>
                        <div
                          class="h-[150px] p-4 overflow-auto bg-white rounded-b-lg shadow-md"
                        >
                          <DataTable
                            :value="itemsObat"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <!-- Stok Obat -->
                            <Column field="itemsObat">
                              <template #header>
                                <div class="grid grid-cols-2">
                                  <div class="font-bold">Stok Obat</div>
                                  <div class="text-right mr-[-50px]">
                                    <CustomButton
                                      icon="PhCheck"
                                      backgroundColor="bg-success-300"
                                      size="small"
                                      class="w-[18px] h-[18px] rounded-full"
                                    />
                                  </div>
                                </div>
                              </template>
                              <template #body="slotProps">
                                <div class="">
                                  <CustomSelect
                                    disabled
                                    v-model="slotProps.data.itemsObat"
                                    :show-label="false"
                                    place-holder="Pilih Stok"
                                    optionValue="value"
                                    optionLabel="label"
                                    :options="stokObat"
                                  />
                                </div>
                              </template>
                            </Column>
                            <!-- Aturan & Cara Pakai -->
                            <Column
                              field="caraPakai"
                              header="Aturan & Cara Pakai"
                            >
                              <template #body="slotProps">
                                <div>
                                  <p class="text-sm">
                                    {{ slotProps.data.caraPakai }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <!-- Biaya Satuan -->
                            <Column field="biaya" header="Biaya Satuan">
                              <template #body="slotProps">
                                <div class="text-sm">
                                  {{ slotProps.data.biaya }}
                                </div>
                              </template>
                            </Column>
                            <!-- Sub. Total -->
                            <Column field="total" header="Sub. Total">
                              <template #body="slotProps">
                                <div class="text-sm">
                                  {{ slotProps.data.total }}
                                </div>
                              </template>
                            </Column>
                          </DataTable>
                        </div>
                      </div>
                      <div>
                        <div
                          class="mt-[20px] p-4 rounded-t-lg bg-adameds-50 shadow-md"
                        >
                          <div class="grid grid-cols-2 gap-2">
                            <div class="flex">
                              <CustomButton class="text-sm h-7"
                                >02</CustomButton
                              >
                              <p class="my-auto ml-2 text-sm font-bold">
                                Amoxcillin
                              </p>
                              <PhArrowRight
                                :size="20"
                                class="my-auto ml-2 text-success-300"
                                weight="bold"
                              />
                              <p class="my-auto ml-2 text-sm font-bold">
                                15 Tablet
                              </p>
                            </div>
                            <div class="flex justify-end">
                              <CustomButton
                                label=""
                                background-color="bg-grass-300 rounded-lg"
                                class="h-6 w-[26px] p-0 ml-[10px] mr-[10px]"
                                @click="gerusDialog = true"
                              >
                                <img
                                  src="@/assets/icons/Exclude.svg"
                                  alt=""
                                  width="15"
                                />
                              </CustomButton>
                              <CustomButton
                                label=""
                                background-color="bg-[#3D84E5] rounded-lg"
                                class="h-6 w-[26px] p-0"
                                @click="editDialog = true"
                              >
                                <img src="@/assets/icons/edit.svg" alt="" />
                              </CustomButton>
                            </div>
                          </div>
                        </div>
                        <div
                          class="h-[150px] p-4 overflow-auto bg-white rounded-b-lg shadow-md"
                        >
                          <DataTable
                            :value="itemsObat"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <!-- Stok Obat -->
                            <Column field="itemsObat">
                              <template #header>
                                <div class="grid grid-cols-2">
                                  <div class="font-bold">Stok Obat</div>
                                  <div class="text-right mr-[-50px]">
                                    <CustomButton
                                      icon="PhCheck"
                                      backgroundColor="bg-success-300"
                                      size="small"
                                      class="w-[18px] h-[18px] rounded-full"
                                    />
                                  </div>
                                </div>
                              </template>
                              <template #body="slotProps">
                                <div class="">
                                  <CustomSelect
                                    disabled
                                    v-model="slotProps.data.itemsObat"
                                    :show-label="false"
                                    place-holder="Pilih Stok"
                                    optionValue="value"
                                    optionLabel="label"
                                    :options="stokObat"
                                  />
                                </div>
                              </template>
                            </Column>
                            <!-- Aturan & Cara Pakai -->
                            <Column
                              field="caraPakai"
                              header="Aturan & Cara Pakai"
                            >
                              <template #body="slotProps">
                                <div>
                                  <p class="text-sm">
                                    {{ slotProps.data.caraPakai }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <!-- Biaya Satuan -->
                            <Column field="biaya" header="Biaya Satuan">
                              <template #body="slotProps">
                                <div class="text-sm">
                                  {{ slotProps.data.biaya }}
                                </div>
                              </template>
                            </Column>
                            <!-- Sub. Total -->
                            <Column field="total" header="Sub. Total">
                              <template #body="slotProps">
                                <div class="text-sm">
                                  {{ slotProps.data.total }}
                                </div>
                              </template>
                            </Column>
                          </DataTable>
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
                <!-- Penulis Resep -->
                <div class="grid grid-cols-1">
                  <card class="bg-adameds-50">
                    <template #content>
                      <div class="flex flex-row">
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            Penulisan Resep
                          </p>
                          <p class="">dr. Nama Dokter</p>
                        </div>
                        <div class="basis-1/2">
                          <div class="flex">
                            <div
                              class="bg-adameds-300 w-[1px] h-[40px] mr-[20px]"
                            ></div>
                            <p class="font-bold mt-[7px]">
                              Total Tagihan Resep
                            </p>
                          </div>
                        </div>
                        <div class="basis-1/4">
                          <p class="text-base font-bold text-right mt-[7px]">
                            RP. 0, 00
                          </p>
                        </div>
                      </div>
                    </template>
                  </card>
                </div>
                <!-- Telaah Resep -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>Telaah Resep</template>
                    <template #content>
                      <div class="grid grid-cols-3 gap-3">
                        <!-- itemTelaah -->
                        <div class="mt-[20px]">
                          <DataTable
                            :value="itemTelaah"
                            scrollable
                            scrollHeight="380px"
                            :pt="{ headerRow: 'text-SM' }"
                            v-model:selection="selectedTelaah"
                          >
                            <Column
                              field="farmasetik"
                              headerClass="bg-adameds-50"
                            >
                              <template #header>
                                <div class="w-full font-bold">
                                  Aspek Farmasetik
                                </div>
                              </template>
                              <template #body="slotProps">
                                <div class="flex">
                                  <p class="text-xs">
                                    {{ slotProps.data.farmasetik }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <Column headerClass="bg-adameds-50">
                              <template #header>
                                <div class="w-full font-bold">Hasil</div>
                              </template>
                              <template #body="slotProps">
                                <CustomButton
                                  icon="PhCheck"
                                  backgroundColor="bg-success-300"
                                  size="small"
                                  class="w-[20px] h-[20px] rounded-full"
                                />
                              </template>
                            </Column>
                          </DataTable>
                        </div>
                        <!-- itemTelaah2 -->
                        <div class="mt-[20px]">
                          <DataTable
                            :value="itemTelaah2"
                            scrollable
                            scrollHeight="380px"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <Column
                              field="farmasetik"
                              headerClass="bg-adameds-50"
                            >
                              <template #header>
                                <div class="w-full font-bold">
                                  Aspek Administratif
                                </div>
                              </template>
                              <template #body="slotProps">
                                <div class="flex">
                                  <p class="text-xs">
                                    {{ slotProps.data.administratif }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <Column headerClass="bg-adameds-50">
                              <template #header>
                                <div class="w-full font-bold">Hasil</div>
                              </template>
                              <template #body="slotProps">
                                <CustomButton
                                  icon="PhCheck"
                                  backgroundColor="bg-success-300"
                                  size="small"
                                  class="w-[20px] h-[20px] rounded-full"
                                />
                              </template>
                            </Column>
                          </DataTable>
                        </div>
                        <!-- itemTelaah3 -->
                        <div class="mt-[20px]">
                          <DataTable
                            :value="itemTelaah3"
                            scrollable
                            scrollHeight="430px"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <Column
                              field="farmasetik"
                              headerClass="bg-adameds-50"
                            >
                              <template #header>
                                <div class="w-full font-bold">Aspek Klinik</div>
                              </template>
                              <template #body="slotProps">
                                <div class="flex">
                                  <p class="text-xs">
                                    {{ slotProps.data.klinik }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <Column headerClass="bg-adameds-50">
                              <template #header>
                                <div class="w-full font-bold">Hasil</div>
                              </template>
                              <template #body="slotProps">
                                <CustomButton
                                  icon="PhCheck"
                                  backgroundColor="bg-success-300"
                                  size="small"
                                  class="w-[20px] h-[20px] rounded-full"
                                />
                              </template>
                            </Column>
                          </DataTable>
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
                <hr class="mt-5 border-[1px] border-grey-200" />
                <!-- Diverifikasi Oleh -->
                <div class="grid grid-cols-2">
                  <div class="mt-[20px]">
                    <CustomButton>
                      <div class="flex items-center gap-2">
                        <PhPrinter :size="18" color="#ffffff" weight="fill" />
                        <div class="text-sm">Cetak</div>
                      </div>
                    </CustomButton>
                  </div>
                  <div class="flex justify-end">
                    <div class="mt-[20px]">
                      <p
                        class="text-xs font-bold text-right underline underline-offset-2"
                      >
                        Diverifikasi Oleh
                      </p>
                      <p>Nama Petugas</p>
                    </div>
                    <div class="mt-[20px]">
                      <div
                        class="bg-mediumGrey-300 w-[1px] h-[33px] ml-[20px] mt-1"
                      ></div>
                    </div>
                    <div class="mt-[20px]">
                      <CustomButton
                        label="Obat Siap Diserahkan"
                        class="ml-[20px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Detail Resep - Serahkan Obat -->
          <div v-show="drugHandoverDetails" class="col-span-2">
            <div class="mt-[10px] p-3 bg-adameds-75">
              <!-- Title -->
              <div
                class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md h-[60px]"
              >
                <div class="grid grid-cols-2 gap-2">
                  <div class="flex">
                    <p class="font-bold text-white font-poppins">RSP1234</p>
                    <CustomChip
                      label="TUNAI"
                      :showCheckedIcon="false"
                      borderColor="border-adameds-300"
                      bgColor="bg-adameds-50"
                      textColor="text-adameds-300"
                      customClass="h-5"
                      class="ml-[5px] mt-[2px]"
                    />
                  </div>
                  <div class="flex justify-end">
                    <div class="bg-white w-[0.5px] h-[30px] mr-[20px]"></div>
                    <p
                      class="text-sm font-bold text-white font-poppins mt-[5px] mr-[20px]"
                    >
                      Tgl. Order : 3-10-2024
                    </p>
                    <CustomButton
                      background-color="bg-white"
                      size="small"
                      class="w-[30px] h-[30px] rounded-full p-0"
                      @click="drugHandoverClose"
                    >
                      <img src="@/assets/icons/x-bold.svg" alt="" width="" />
                    </CustomButton>
                  </div>
                </div>
              </div>
              <!-- Body -->
              <div class="p-4 bg-white rounded-b-lg shadow-md">
                <div class="flex flex-row">
                  <div class="basis-1/2">
                    <p class="font-bold text-MD">Nama lengkap pasien</p>
                    <p>REG1231235</p>
                    <CustomButton class="w-24 h-5 text-sm"
                      >00-00-00</CustomButton
                    >
                    <CustomChip
                      :showCheckedIcon="false"
                      label="Laki-laki"
                      bgColor="bg-male-75"
                      textColor="text-male-300"
                      customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
                    />
                    <!-- <CustomChip
                      :showCheckedIcon="false"
                      label="Perempuan"
                      bgColor="bg-female-75"
                      textColor="text-female-300"
                      customClass="h-5 pr-[6px] border-none mr-[5px]"
                    /> -->
                  </div>
                  <div
                    class="bg-mediumGrey-300 w-[1px] h-[70px] mr-[20px]"
                  ></div>
                  <div class="basis-1/4">
                    <p
                      class="text-xs font-bold underline underline-offset-2 mt-[15px]"
                    >
                      Tgl. Lahir
                    </p>
                    <p class="">10 Januari 2090</p>
                  </div>
                  <div class="basis-1/4">
                    <p
                      class="text-xs font-bold underline underline-offset-2 mt-[15px]"
                    >
                      Umur
                    </p>
                    <p class="">24Thn 2Bln 1Hari</p>
                  </div>
                </div>
                <!-- Asesmen Medis -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>
                      <div class="">Asesmen Medis</div>
                    </template>
                    <template #content>
                      <div class="flex flex-row mt-[20px]">
                        <div class="basis-1/2">
                          <div class="grid grid-cols-2">
                            <div>
                              <p
                                class="text-xs font-bold underline underline-offset-2"
                              >
                                Keluhan Utama
                              </p>
                              <p>Demam</p>
                            </div>
                            <div>
                              <p
                                class="text-xs font-bold underline underline-offset-2"
                              >
                                Alergi
                              </p>
                              <p>Tidak Ada</p>
                            </div>
                            <div>
                              <p
                                class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                              >
                                Dokter Pengirim
                                <span>
                                  <CustomButton
                                    class="h-[20px] w-[40px] text-xs ml-[10px]"
                                    outlined
                                    borderColor="border-grey-300"
                                    textColor="text-grey-300"
                                    >IGD</CustomButton
                                  >
                                </span>
                              </p>
                              <p>dr. Anji Sp. M</p>
                            </div>
                          </div>
                        </div>
                        <div
                          class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"
                        ></div>
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            Diagnosa Primer
                          </p>
                          <p class="">H10.9 Conjuctivitis</p>
                          <p
                            class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                          >
                            Diagnosa Sekunder
                          </p>
                          <p class="">-</p>
                        </div>
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            Diagnosa Sekunder
                          </p>
                          <p class="">-</p>
                          <p
                            class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                          >
                            Diagnosa Sekunder
                          </p>
                          <p class="">-</p>
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
                <!-- List Obat -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>List Obat</template>
                    <template #content>
                      <div>
                        <div
                          class="mt-[20px] p-4 rounded-t-lg bg-adameds-50 shadow-md"
                        >
                          <div class="grid grid-cols-2 gap-2">
                            <div class="flex">
                              <CustomButton class="text-sm h-7"
                                >02</CustomButton
                              >
                              <p class="my-auto ml-2 text-sm font-bold">
                                Amoxcillin
                              </p>
                              <PhArrowRight
                                :size="20"
                                class="my-auto ml-2 text-success-300"
                                weight="bold"
                              />
                              <p class="my-auto ml-2 text-sm font-bold">
                                15 Tablet
                              </p>
                            </div>
                            <div class="flex justify-end">
                              <CustomChip
                                :showCheckedIcon="false"
                                label="OBAT KRONIS"
                                bgColor="bg-warning-50"
                                textColor="text-warning-300"
                                borderColor="border-warning-300"
                                customClass="h-6 pr-[6px]"
                              />
                              <CustomButton
                                label=""
                                background-color="bg-grass-300 rounded-lg"
                                class="h-6 w-[26px] p-0 ml-[10px] mr-[10px]"
                                @click="gerusDialog = true"
                              >
                                <img
                                  src="@/assets/icons/Exclude.svg"
                                  alt=""
                                  width="15"
                                />
                              </CustomButton>
                              <CustomButton
                                label=""
                                background-color="bg-[#3D84E5] rounded-lg"
                                class="h-6 w-[26px] p-0"
                                @click="editDialog = true"
                              >
                                <img src="@/assets/icons/edit.svg" alt="" />
                              </CustomButton>
                            </div>
                          </div>
                        </div>
                        <div
                          class="h-[150px] p-4 overflow-auto bg-white rounded-b-lg shadow-md"
                        >
                          <DataTable
                            :value="itemsObat"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <!-- Stok Obat -->
                            <Column field="itemsObat">
                              <template #header>
                                <div class="grid grid-cols-2">
                                  <div class="font-bold">Stok Obat</div>
                                  <div class="text-right mr-[-50px]">
                                    <CustomButton
                                      icon="PhCheck"
                                      backgroundColor="bg-success-300"
                                      size="small"
                                      class="w-[18px] h-[18px] rounded-full"
                                    />
                                  </div>
                                </div>
                              </template>
                              <template #body="slotProps">
                                <div class="">
                                  <CustomSelect
                                    disabled
                                    v-model="slotProps.data.itemsObat"
                                    :show-label="false"
                                    place-holder="Pilih Stok"
                                    optionValue="value"
                                    optionLabel="label"
                                    :options="stokObat"
                                  />
                                </div>
                              </template>
                            </Column>
                            <!-- Aturan & Cara Pakai -->
                            <Column
                              field="caraPakai"
                              header="Aturan & Cara Pakai"
                            >
                              <template #body="slotProps">
                                <div>
                                  <p class="text-sm">
                                    {{ slotProps.data.caraPakai }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <!-- Biaya Satuan -->
                            <Column field="biaya" header="Biaya Satuan">
                              <template #body="slotProps">
                                <div class="text-sm">
                                  {{ slotProps.data.biaya }}
                                </div>
                              </template>
                            </Column>
                            <!-- Sub. Total -->
                            <Column field="total" header="Sub. Total">
                              <template #body="slotProps">
                                <div class="text-sm">
                                  {{ slotProps.data.total }}
                                </div>
                              </template>
                            </Column>
                          </DataTable>
                        </div>
                      </div>
                      <div>
                        <div
                          class="mt-[20px] p-4 rounded-t-lg bg-adameds-50 shadow-md"
                        >
                          <div class="grid grid-cols-2 gap-2">
                            <div class="flex">
                              <CustomButton class="text-sm h-7"
                                >02</CustomButton
                              >
                              <p class="my-auto ml-2 text-sm font-bold">
                                Amoxcillin
                              </p>
                              <PhArrowRight
                                :size="20"
                                class="my-auto ml-2 text-success-300"
                                weight="bold"
                              />
                              <p class="my-auto ml-2 text-sm font-bold">
                                15 Tablet
                              </p>
                            </div>
                            <div class="flex justify-end">
                              <CustomButton
                                label=""
                                background-color="bg-grass-300 rounded-lg"
                                class="h-6 w-[26px] p-0 ml-[10px] mr-[10px]"
                                @click="gerusDialog = true"
                              >
                                <img
                                  src="@/assets/icons/Exclude.svg"
                                  alt=""
                                  width="15"
                                />
                              </CustomButton>
                              <CustomButton
                                label=""
                                background-color="bg-[#3D84E5] rounded-lg"
                                class="h-6 w-[26px] p-0"
                                @click="editDialog = true"
                              >
                                <img src="@/assets/icons/edit.svg" alt="" />
                              </CustomButton>
                            </div>
                          </div>
                        </div>
                        <div
                          class="h-[150px] p-4 overflow-auto bg-white rounded-b-lg shadow-md"
                        >
                          <DataTable
                            :value="itemsObat"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <!-- Stok Obat -->
                            <Column field="itemsObat">
                              <template #header>
                                <div class="grid grid-cols-2">
                                  <div class="font-bold">Stok Obat</div>
                                  <div class="text-right mr-[-50px]">
                                    <CustomButton
                                      icon="PhCheck"
                                      backgroundColor="bg-success-300"
                                      size="small"
                                      class="w-[18px] h-[18px] rounded-full"
                                    />
                                  </div>
                                </div>
                              </template>
                              <template #body="slotProps">
                                <div class="">
                                  <CustomSelect
                                    disabled
                                    v-model="slotProps.data.itemsObat"
                                    :show-label="false"
                                    place-holder="Pilih Stok"
                                    optionValue="value"
                                    optionLabel="label"
                                    :options="stokObat"
                                  />
                                </div>
                              </template>
                            </Column>
                            <!-- Aturan & Cara Pakai -->
                            <Column
                              field="caraPakai"
                              header="Aturan & Cara Pakai"
                            >
                              <template #body="slotProps">
                                <div>
                                  <p class="text-sm">
                                    {{ slotProps.data.caraPakai }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <!-- Biaya Satuan -->
                            <Column field="biaya" header="Biaya Satuan">
                              <template #body="slotProps">
                                <div class="text-sm">
                                  {{ slotProps.data.biaya }}
                                </div>
                              </template>
                            </Column>
                            <!-- Sub. Total -->
                            <Column field="total" header="Sub. Total">
                              <template #body="slotProps">
                                <div class="text-sm">
                                  {{ slotProps.data.total }}
                                </div>
                              </template>
                            </Column>
                          </DataTable>
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
                <!-- Penulis Resep -->
                <div class="grid grid-cols-1">
                  <card class="bg-adameds-50">
                    <template #content>
                      <div class="flex flex-row">
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            Penulisan Resep
                          </p>
                          <p class="">dr. Nama Dokter</p>
                        </div>
                        <div class="basis-1/2">
                          <div class="flex">
                            <div
                              class="bg-adameds-300 w-[1px] h-[40px] mr-[20px]"
                            ></div>
                            <p class="font-bold mt-[7px]">
                              Total Tagihan Resep
                            </p>
                          </div>
                        </div>
                        <div class="basis-1/4">
                          <p class="text-base font-bold text-right mt-[7px]">
                            RP. 0, 00
                          </p>
                        </div>
                      </div>
                    </template>
                  </card>
                </div>
                <!-- Telaah Resep -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>Telaah Resep</template>
                    <template #content>
                      <div class="grid grid-cols-3 gap-3">
                        <!-- itemTelaah -->
                        <div class="mt-[20px]">
                          <DataTable
                            :value="itemTelaah"
                            scrollable
                            scrollHeight="380px"
                            :pt="{ headerRow: 'text-SM' }"
                            v-model:selection="selectedTelaah"
                          >
                            <Column
                              field="farmasetik"
                              headerClass="bg-adameds-50"
                            >
                              <template #header>
                                <div class="w-full font-bold">
                                  Aspek Farmasetik
                                </div>
                              </template>
                              <template #body="slotProps">
                                <div class="flex">
                                  <p class="text-xs">
                                    {{ slotProps.data.farmasetik }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <Column headerClass="bg-adameds-50">
                              <template #header>
                                <div class="w-full font-bold">Hasil</div>
                              </template>
                              <template #body="slotProps">
                                <CustomButton
                                  icon="PhCheck"
                                  backgroundColor="bg-success-300"
                                  size="small"
                                  class="w-[20px] h-[20px] rounded-full"
                                />
                              </template>
                            </Column>
                          </DataTable>
                        </div>
                        <!-- itemTelaah2 -->
                        <div class="mt-[20px]">
                          <DataTable
                            :value="itemTelaah2"
                            scrollable
                            scrollHeight="380px"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <Column
                              field="farmasetik"
                              headerClass="bg-adameds-50"
                            >
                              <template #header>
                                <div class="w-full font-bold">
                                  Aspek Administratif
                                </div>
                              </template>
                              <template #body="slotProps">
                                <div class="flex">
                                  <p class="text-xs">
                                    {{ slotProps.data.administratif }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <Column headerClass="bg-adameds-50">
                              <template #header>
                                <div class="w-full font-bold">Hasil</div>
                              </template>
                              <template #body="slotProps">
                                <CustomButton
                                  icon="PhCheck"
                                  backgroundColor="bg-success-300"
                                  size="small"
                                  class="w-[20px] h-[20px] rounded-full"
                                />
                              </template>
                            </Column>
                          </DataTable>
                        </div>
                        <!-- itemTelaah3 -->
                        <div class="mt-[20px]">
                          <DataTable
                            :value="itemTelaah3"
                            scrollable
                            scrollHeight="430px"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <Column
                              field="farmasetik"
                              headerClass="bg-adameds-50"
                            >
                              <template #header>
                                <div class="w-full font-bold">Aspek Klinik</div>
                              </template>
                              <template #body="slotProps">
                                <div class="flex">
                                  <p class="text-xs">
                                    {{ slotProps.data.klinik }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <Column headerClass="bg-adameds-50">
                              <template #header>
                                <div class="w-full font-bold">Hasil</div>
                              </template>
                              <template #body="slotProps">
                                <CustomButton
                                  icon="PhCheck"
                                  backgroundColor="bg-success-300"
                                  size="small"
                                  class="w-[20px] h-[20px] rounded-full"
                                />
                              </template>
                            </Column>
                          </DataTable>
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
                <!-- Edukasi Pemberian Obat -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>Edukasi Pemberian Obat</template>
                    <template #content>
                      <div class="grid grid-cols-2 gap-6">
                        <div class="mt-[20px]">
                          <DataTable
                            :value="itemEdukasi"
                            v-model:selection="selectedEdukasi"
                            scrollable
                            scrollHeight="380px"
                            :pt="{ headerRow: 'text-SM' }"
                          >
                            <Column
                              field="farmasetik"
                              headerClass="bg-adameds-50"
                            >
                              <template #header>
                                <div class="w-full font-bold">Edukasi</div>
                              </template>
                              <template #body="slotProps">
                                <div class="flex">
                                  <p class="text-xs">
                                    {{ slotProps.data.edukasi }}
                                  </p>
                                </div>
                              </template>
                            </Column>
                            <Column
                              field="hasil"
                              header="Hasil"
                              headerClass="bg-adameds-50"
                            ></Column>
                            <Column
                              selectionMode="multiple"
                              headerClass="bg-adameds-50"
                              class="custom-checkbox"
                            ></Column>
                          </DataTable>
                        </div>
                        <div class="mt-[20px]">
                          <CustomSelect
                            place-holder="Nama Petugas"
                            label="Petugas Edukasi"
                            optionLabel=""
                            optionValue=""
                            :options="['Pagi', 'Siang', 'Sore', 'Malem']"
                          />
                          <CustomTextfield
                            label="No. Handphone Penerima"
                            placeholder="08XX-XXXX-XXXX"
                            class="mt-[20px]"
                          />
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
                <hr class="mt-5 border-[1px] border-grey-200" />
                <!-- Petugas Edukasi -->
                <div class="grid grid-cols-2">
                  <div class="mt-[20px]">
                    <CustomSelect
                      place-holder="Nama Petugas"
                      label="Petugas Edukasi"
                      optionLabel=""
                      optionValue=""
                      :options="['Pagi', 'Siang', 'Sore', 'Malem']"
                    />
                  </div>
                </div>
                <hr class="mt-5 border-[1px] border-grey-200" />
                <!-- Diverifikasi Oleh -->
                <div class="grid grid-cols-[30%,30%,40%]">
                  <div class="flex">
                    <div class="mt-[20px]">
                      <CustomButton
                        label="Batal Penyerahan"
                        backgroundColor="bg-danger-300"
                        borderColor="border-danger-300"
                        textColor="text-white"
                        @click="batalDialog = true"
                      />
                    </div>
                  </div>
                  <div class="mt-[20px] ml-[-60px]">
                    <CustomButton>
                      <div class="flex items-center gap-2">
                        <PhPrinter :size="18" color="#ffffff" weight="fill" />
                        <div class="text-sm">Cetak</div>
                      </div>
                    </CustomButton>
                  </div>
                  <div class="flex justify-end">
                    <div class="mt-[20px]">
                      <p
                        class="text-xs font-bold text-right underline underline-offset-2"
                      >
                        Diverifikasi Oleh
                      </p>
                      <p>Nama Petugas</p>
                    </div>
                    <div class="mt-[20px]">
                      <div
                        class="bg-mediumGrey-300 w-[1px] h-[33px] ml-[20px] mt-1"
                      ></div>
                    </div>
                    <div class="mt-[20px]">
                      <CustomButton label="Serahkan Obat" class="ml-[20px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- Batal Notification -->
    <CustomDialog
      v-model:visible="batalDialog"
      width="550px"
      headerBg="bg-danger-300"
    >
      <template #header>Batal Order</template>
      <template #body>
        <div class="grid grid-cols-1">
          <div class="mt-[20px]">
            <p class="font-bold">Alasan Membatalkan Order</p>
          </div>
          <div class="mt-[10px]">
            <CustomTextfield
              :showLabel="false"
              placeholder="Alasan Membatalkan Order"
            />
          </div>
          <div class="mt-[10px]">
            <p class="text-sm italic text-danger-300">
              *Setelah membatalkan, <span class="font-bold">Dokter</span> harus
              mengorderkan ulang obatnya
            </p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton
            @click="batalDialog = false"
            label="Batal"
            outlined
            class=""
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            label="Iya, Batalkan"
            backgroundColor="bg-danger-300"
            borderColor="border-danger-300"
            textColor="text-white"
            class="ml-[10px]"
          />
        </div>
      </template>
    </CustomDialog>

    <!-- Pindah Lokasi Dialog -->
    <CustomDialog v-model:visible="pindahDialog" width="550px">
      <template #header>Pindah Lokasi Order</template>
      <template #body>
        <div class="grid grid-cols-[45%,10%,45%]">
          <div class="mt-[20px]">
            <CustomSelect
              place-holder="Lokasi Awal Order"
              label="Lokasi Awal Order"
              class=""
              optionLabel=""
              optionValue=""
              :options="['Pagi', 'Siang', 'Sore', 'Malem']"
            />
          </div>
          <div class="mt-[20px]">
            <ArrowRightBrokenIcon
              :size="20"
              class="text-adameds-300 mt-[23px] ml-[15px]"
              weight="bold"
            />
          </div>
          <div class="mt-[20px]">
            <CustomSelect
              place-holder="Pilih Lokasi"
              label="Pindah Lokasi Ke"
              class=""
              optionLabel=""
              optionValue=""
              :options="['Pagi', 'Siang', 'Sore', 'Malem']"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton
            @click="pindahDialog = false"
            label="Batal"
            outlined
            class=""
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton label="Pindahkan" class="ml-[10px]" />
        </div>
      </template>
    </CustomDialog>

    <!-- Edit Dialog -->
    <CustomDialog v-model:visible="editDialog" width="1030px">
      <template #header>Edit Obat</template>
      <template #body>
        <div class="grid grid-cols-[40%,3%,57%]">
          <!-- Part 1 & Part 2 -->
          <div>
            <div class="grid grid-cols-2 gap-2">
              <div class="mt-[20px]">
                <p class="text-xs font-bold underline underline-offset-2">
                  Jenis Kelamin
                </p>
                <CustomChip
                  :showCheckedIcon="false"
                  label="Laki-laki"
                  bgColor="bg-male-75"
                  textColor="text-male-300"
                  customClass="h-5 border-none"
                  class="mt-[10px]"
                />
              </div>
              <div class="mt-[20px]">
                <p class="text-xs font-bold underline underline-offset-2">
                  Tanggal Lahir
                </p>
                <p class="text-sm mt-[10px]">
                  17-10-2024 <span class="font-bold">|</span>
                  <span class="font-bold text-adameds-300">24Th 0Bl 1Hr</span>
                </p>
              </div>
            </div>
            <!-- Part 1 -->
            <div class="grid grid-cols-1">
              <div
                class="mt-[20px] rounded-lg bg-adameds-50 h-[250px] grid grid-cols-2"
              >
                <!-- T.Darah -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">T.Darah</p>
                  <div class="bg-white rounded-lg h-[25px] w-[120px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">110/70 mmHg</p>
                  </div>
                </div>
                <!-- Frek.Nadi -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Frek.Nadi</p>
                  <div class="bg-white rounded-lg h-[25px] w-[100px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">80 x/mnt</p>
                  </div>
                </div>
                <!-- Frek.Nafas -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Frek.Nafas</p>
                  <div class="bg-white rounded-lg h-[25px] w-[100px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">20 x/mnt</p>
                  </div>
                </div>
                <!-- Suhu -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Suhu</p>
                  <div class="bg-white rounded-lg h-[25px] w-[50px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">30</p>
                  </div>
                </div>
                <!-- Berat -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Berat</p>
                  <div class="bg-white rounded-lg h-[25px] w-[60px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">20 kg</p>
                  </div>
                </div>
                <!-- Tinggi -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Tinggi</p>
                  <div class="bg-white rounded-lg h-[25px] w-[80px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">160 cm</p>
                  </div>
                </div>
                <!-- Scor GCS -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Scor GCS</p>
                  <div class="bg-white rounded-lg h-[25px] w-[50px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">0</p>
                  </div>
                </div>
                <!-- Skala Nyeri -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Skala Nyeri</p>
                  <div class="bg-white rounded-lg h-[25px] w-[50px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">-</p>
                  </div>
                </div>
                <!-- Alergi -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Alergi</p>
                  <div class="bg-white rounded-lg h-[25px] w-[50px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">0</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Part 2 -->
            <div class="grid grid-cols-1">
              <div
                class="mt-[20px] rounded-lg bg-adameds-50 h-[160px] grid grid-cols-1"
              >
                <!-- Keluhan & Diagnosa Primer -->
                <div class="mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Keluhan</p>
                  <div class="bg-white rounded-lg h-[23px] w-[370px] mt-[10px]">
                    <p class="text-sm ml-[10px]">Nyeri pantat disuruduk babi</p>
                  </div>
                  <p class="text-sm font-bold mt-[20px]">Diagnosa Primer</p>
                  <div class="bg-white rounded-lg h-[23px] w-[370px] mt-[10px]">
                    <p class="text-sm ml-[10px]">
                      G12.1 - OTHER INHERITED SPINAL MUSCULAR ATROPHY
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-mediumGrey-300 w-[2px] h-[500px] mt-[20px] ml-[13px]"
          ></div>
          <!-- Form Obat -->
          <div>
            <p class="mt-[15px] font-bold">Obat 1</p>
            <hr class="border border-slate-200 mt-[10px]" />
            <div class="grid grid-cols-[80%,20%]">
              <!-- Nama Obat -->
              <div class="mt-[20px]">
                <CustomSelect
                  place-holder="Cari Nama Obat"
                  label="Nama Obat"
                  class="mr-[20px]"
                  optionLabel=""
                  optionValue=""
                  :options="['Pagi', 'Siang', 'Sore', 'Malem']"
                />
              </div>
              <!-- Jumlah Total -->
              <div class="mt-[20px]">
                <CustomInputNumber label="Jumlah Total" :show-buttons="true" />
              </div>
            </div>
            <div class="grid grid-cols-4 gap-4">
              <!-- Periode -->
              <div class="mt-[20px]">
                <CustomSelect
                  place-holder="Hari"
                  label="Periode"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :options="['Hari', 'Jam']"
                />
              </div>
              <!-- Aturan Pakai -->
              <div class="mt-[20px]">
                <CustomSelect
                  place-holder="Hari"
                  label="Aturan Pakai"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :options="['Hari', 'Jam']"
                />
              </div>
              <!-- Jumlah Konsumsi -->
              <div class="mt-[20px]">
                <CustomInputNumber
                  label="Jumlah Konsumsi"
                  :show-buttons="true"
                />
              </div>
              <!-- Satuan Dosis -->
              <div class="mt-[20px]">
                <CustomSelect
                  place-holder="Mg"
                  label="Satuan Dosis"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :options="['Hari', 'Jam']"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <!-- Cara Pakai -->
              <div class="mt-[20px]">
                <CustomSelect
                  place-holder="Cari Cara Pakai"
                  label="Cara Pakai"
                  class="mr-[10px]"
                  optionLabel=""
                  optionValue=""
                  :options="['Pagi', 'Siang', 'Sore', 'Malem']"
                />
              </div>
              <!-- Rute Pemberian -->
              <div class="mt-[20px]">
                <CustomSelect
                  place-holder="Cari Rute Pemberian"
                  label="Rute Pemberian"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :options="['Pagi', 'Siang', 'Sore', 'Malem']"
                />
              </div>
              <!-- Obat Pulang -->
              <div class="mt-[10px]">
                <CustomSwitch
                  :show-label="true"
                  label="Obat Pulang"
                  sideLabel="Tidak"
                  sideLabelTrue="Ya"
                />
              </div>
              <!-- Obat Kronis -->
              <div class="mt-[10px]">
                <CustomSwitch
                  :show-label="true"
                  label="Obat Kronis"
                  sideLabel="Tidak"
                  sideLabelTrue="Ya"
                />
              </div>
              <!-- Catatan -->
              <div class="mt-[10px]">
                <CustomTextArea
                  label="Catatan"
                  placeholder="-"
                  class="mr-[10px]"
                />
              </div>
              <!-- Alasan Diganti -->
              <div class="mt-[10px]">
                <CustomTextArea
                  label="Alasan Diganti"
                  placeholder="Masukan alasan diubah"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton
            label="Reset"
            outlined
            class=""
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton label="Simpan Edit" class="ml-[10px]" />
        </div>
      </template>
    </CustomDialog>

    <!-- Gerus Dialog -->
    <CustomDialog v-model:visible="gerusDialog" width="1030px">
      <template #header>Obat Digerus</template>
      <template #body>
        <div class="grid grid-cols-[40%,3%,57%]">
          <!-- Part 1 & Part 2 -->
          <div>
            <div class="grid grid-cols-2 gap-2">
              <div class="mt-[20px]">
                <p class="text-xs font-bold underline underline-offset-2">
                  Jenis Kelamin
                </p>
                <CustomChip
                  :showCheckedIcon="false"
                  label="Laki-laki"
                  bgColor="bg-male-75"
                  textColor="text-male-300"
                  customClass="h-5 border-none"
                  class="mt-[10px]"
                />
              </div>
              <div class="mt-[20px]">
                <p class="text-xs font-bold underline underline-offset-2">
                  Tanggal Lahir
                </p>
                <p class="text-sm mt-[10px]">
                  17-10-2024 <span class="font-bold">|</span>
                  <span class="font-bold text-adameds-300">24Th 0Bl 1Hr</span>
                </p>
              </div>
            </div>
            <!-- Part 1 -->
            <div class="grid grid-cols-1">
              <div
                class="mt-[20px] rounded-lg bg-adameds-50 h-[250px] grid grid-cols-2"
              >
                <!-- T.Darah -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">T.Darah</p>
                  <div class="bg-white rounded-lg h-[25px] w-[120px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">110/70 mmHg</p>
                  </div>
                </div>
                <!-- Frek.Nadi -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Frek.Nadi</p>
                  <div class="bg-white rounded-lg h-[25px] w-[100px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">80 x/mnt</p>
                  </div>
                </div>
                <!-- Frek.Nafas -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Frek.Nafas</p>
                  <div class="bg-white rounded-lg h-[25px] w-[100px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">20 x/mnt</p>
                  </div>
                </div>
                <!-- Suhu -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Suhu</p>
                  <div class="bg-white rounded-lg h-[25px] w-[50px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">30</p>
                  </div>
                </div>
                <!-- Berat -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Berat</p>
                  <div class="bg-white rounded-lg h-[25px] w-[60px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">20 kg</p>
                  </div>
                </div>
                <!-- Tinggi -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Tinggi</p>
                  <div class="bg-white rounded-lg h-[25px] w-[80px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">160 cm</p>
                  </div>
                </div>
                <!-- Scor GCS -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Scor GCS</p>
                  <div class="bg-white rounded-lg h-[25px] w-[50px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">0</p>
                  </div>
                </div>
                <!-- Skala Nyeri -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Skala Nyeri</p>
                  <div class="bg-white rounded-lg h-[25px] w-[50px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">-</p>
                  </div>
                </div>
                <!-- Alergi -->
                <div class="flex mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Alergi</p>
                  <div class="bg-white rounded-lg h-[25px] w-[50px] ml-[10px]">
                    <p class="text-sm ml-[10px] mt-[3px]">0</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Part 2 -->
            <div class="grid grid-cols-1">
              <div
                class="mt-[20px] rounded-lg bg-adameds-50 h-[160px] grid grid-cols-1"
              >
                <!-- Keluhan & Diagnosa Primer -->
                <div class="mt-[10px] ml-[10px]">
                  <p class="text-sm font-bold">Keluhan</p>
                  <div class="bg-white rounded-lg h-[23px] w-[370px] mt-[10px]">
                    <p class="text-sm ml-[10px]">Nyeri pantat disuruduk babi</p>
                  </div>
                  <p class="text-sm font-bold mt-[20px]">Diagnosa Primer</p>
                  <div class="bg-white rounded-lg h-[23px] w-[370px] mt-[10px]">
                    <p class="text-sm ml-[10px]">
                      G12.1 - OTHER INHERITED SPINAL MUSCULAR ATROPHY
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-mediumGrey-300 w-[2px] h-[500px] mt-[20px] ml-[13px]"
          ></div>

          <!-- Form Obat -->
          <div>
            <!-- Nama Racikan -->
            <div class="grid grid-cols-3 gap-3">
              <div class="mt-[20px]">
                <CustomTextfield
                  label="Nama Racikan"
                  placeholder="Masukan Nama Racikan"
                  class=""
                />
              </div>
              <div class="mt-[20px]">
                <CustomSwitch
                  :show-label="true"
                  label="Sirup"
                  sideLabel="Tidak"
                  sideLabelTrue="Ya"
                />
              </div>
              <div class="mt-[40px]">
                <CustomButton
                  icon="PhPlus"
                  label="Tambahkan Obat"
                  class=""
                  @click="addRow"
                />
              </div>
            </div>
            <hr class="border border-slate-200 mt-[20px]" />
            <div class="grid grid-cols-[70%,20%,10%]">
              <!-- Nama Obat -->
              <div class="mt-[20px]">
                <CustomSelect
                  v-model="namaObat"
                  place-holder="Cari Nama Obat"
                  label="Nama Obat"
                  class="mr-[20px]"
                  optionLabel=""
                  optionValue=""
                  :options="['Pagi', 'Siang', 'Sore', 'Malem']"
                />
              </div>
              <!-- Jumlah Total -->
              <div class="mt-[20px]">
                <CustomInputNumber
                  v-model="jumlahTotal"
                  label="Jumlah Total"
                  :show-buttons="true"
                />
              </div>
              <!-- Delete -->
              <div class="mt-[48px] ml-[15px]">
                <CustomButton
                  label=""
                  background-color="bg-danger-300 rounded-lg"
                  class="h-9 w-[36px] p-0"
                >
                  <img src="@/assets/icons/delete.svg" alt="" width="20" />
                </CustomButton>
              </div>
            </div>
            <hr class="border border-slate-200 mt-[20px]" />
            <!-- Embalase -->
            <div class="rounded-lg bg-adameds-50 h-[60px] mt-[20px]">
              <div class="grid grid-cols-[50%,20%,30%]">
                <p class="font-bold mt-[18px] ml-[10px]">
                  Dibuat Sebanyak (Embalase)
                </p>
                <div class="mt-[10px]">
                  <CustomSelect
                    place-holder="Hari"
                    :show-label="false"
                    class=""
                    optionLabel=""
                    optionValue=""
                    :options="['Hari', 'Jam']"
                  />
                </div>
                <div class="mt-[10px]">
                  <CustomSelect
                    place-holder="Hari"
                    :show-label="false"
                    class="ml-[10px] mr-[10px]"
                    optionLabel=""
                    optionValue=""
                    :options="['Hari', 'Jam']"
                  />
                </div>
              </div>
            </div>

            <!-- Periode -->
            <div class="grid grid-cols-4 gap-4">
              <div class="mt-[30px]">
                <CustomSelect
                  place-holder="Hari"
                  label="Periode"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :options="['Hari', 'Jam']"
                />
              </div>
              <!-- Aturan Pakai -->
              <div class="mt-[30px]">
                <CustomSelect
                  place-holder="Hari"
                  label="Aturan Pakai"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :options="['Hari', 'Jam']"
                />
              </div>
              <!-- Jumlah Konsumsi -->
              <div class="mt-[30px]">
                <CustomInputNumber
                  label="Jumlah Konsumsi"
                  :show-buttons="true"
                />
              </div>
              <!-- Satuan Dosis -->
              <div class="mt-[30px]">
                <CustomSelect
                  place-holder="Mg"
                  label="Satuan Dosis"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :options="['Hari', 'Jam']"
                />
              </div>
            </div>

            <!-- Cara Pakai -->
            <div class="grid grid-cols-2 gap-2">
              <div class="mt-[20px]">
                <CustomSelect
                  place-holder="Cari Cara Pakai"
                  label="Cara Pakai"
                  class="mr-[10px]"
                  optionLabel=""
                  optionValue=""
                  :options="['Pagi', 'Siang', 'Sore', 'Malem']"
                />
              </div>
              <!-- Rute Pemberian -->
              <div class="mt-[20px]">
                <CustomSelect
                  place-holder="Cari Rute Pemberian"
                  label="Rute Pemberian"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :options="['Pagi', 'Siang', 'Sore', 'Malem']"
                />
              </div>
              <!-- Obat Pulang -->
              <div class="mt-[10px]">
                <CustomSwitch
                  :show-label="true"
                  label="Obat Pulang"
                  sideLabel="Tidak"
                  sideLabelTrue="Ya"
                />
              </div>
              <!-- Obat Kronis -->
              <div class="mt-[10px]">
                <CustomSwitch
                  :show-label="true"
                  label="Obat Kronis"
                  sideLabel="Tidak"
                  sideLabelTrue="Ya"
                />
              </div>
              <!-- Catatan -->
              <div class="mt-[10px]">
                <CustomTextArea
                  label="Catatan"
                  placeholder="-"
                  class="mr-[10px]"
                />
              </div>
              <!-- Alasan Diganti -->
              <div class="mt-[10px]">
                <CustomTextArea
                  label="Alasan Diganti"
                  placeholder="Masukan alasan diubah"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton
            label="Reset"
            outlined
            class=""
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton label="Simpan & Ubah Menjadi Racik" class="ml-[10px]" />
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
