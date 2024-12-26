<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useMedicalItemStore } from "@/stores/datamasterFarmasi/MedicalItem";
import { useDoctorPrescriptionStore } from "@/stores/farmasi/DoctorPrescription";
import { utilsStore } from "@/stores/utils";
import { epochToDate } from "@/utils/Helpers";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
import { usePegawaiStore } from "@/stores/datamaster/pegawai";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import FormObat from "./FormObat.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";

// define props 
const props = defineProps({
  payloadDetail: {
    type: Object,
    default: () => ({}),
  },
});

const payload = ref({ ...props.payloadDetail });
const emit = defineEmits(["close"]);

// data user from local storage
const userData = ref<userData | undefined>(undefined);
userData.value = JSON.parse(localStorage.getItem("user") ?? "");

// define ref variabel
const DoctorPrescriptionStore = useDoctorPrescriptionStore();
const MedicalItemStore = useMedicalItemStore();
const UseUtilsStore = utilsStore();
const pegawaiStore = usePegawaiStore();
const pegawaiPayload = ref<any[]>([]);
const StockLocationPayload = ref<any[]>([]);
const StockLocationStore = useStockLocationStore();
const stockObatPayload = ref();
const penerima = ref("");
const noHpPenerima = ref("");
const alasanBatal = ref("");
const awalLokasi = ref("");
const lokasiTujuan = ref("");
const totalTagihan = ref();
// define ref dialog
const batalDialog = ref(false);
const pindahDialog = ref(false);
const cetakDialog = ref(false);
const isTambahDataDialogVisible = ref(false);
// define ref selected
const selectedTelaah = ref<any[]>([]);
const selectedTelaah2 = ref<any[]>([]);
const selectedTelaah3 = ref<any[]>([]);
const selectedEdukasi = ref<any[]>([]);
const selectedPegawai = ref();
// dialog config
const dialogConfig = ref<any>({
  method: "add",
  title: "Tambah Data",
  data: null,
});

const openDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  isTambahDataDialogVisible.value = true;
};

// define ref datatable items obat dan racikan
const itemsObat = ref([
  {
    stokObat: "",
    sisa: "",
    aturanPakai: "",
    biayaSatuan: "",
    subTotal: "",
  },
]);

const itemsRacikan = ref([
  {
    caraPakai: "",
    embalase: "",
    racik: "",
    subTotal: "",
  },
]);
//interface
interface userData {
  name: string;
  role: string;
}

interface Racikan {
  hargaSatuan: string;
  medicationQty: number;
  subTotal: number;
  sisaStok: number;
}

interface AturanPakai {
  name: string;
}

interface Obat {
  uuid: string;
  isCompound: boolean;
  namaObat: string;
  medicationQty: number;
  aturanPakai: AturanPakai;
  racikan: Array<Racikan>;
  grandTotal: number;
  bentukRacikan: any;
  biayaEmbalase: number;
  biayaRacik: number;
  hargaSatuan: number;
  sisaStok: number;
  jenisStokUuid: string;
  caraPakai: any;
  isTakeaway: boolean;
  isChronic: boolean;
}

// Fetch data for option selection
const fetchPegawai = async () => {
  try {
    const response = await pegawaiStore.getAktifApi();
    if (response && response.payload) {
      pegawaiPayload.value = response.payload;
    } else {
      pegawaiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data pegawai", error);
    pegawaiPayload.value = [];
  }
};

const fetchStockObat = async (uuid: string) => {
  UseUtilsStore.setLoading(true);
  console.log(uuid);
  try {
    const response = await MedicalItemStore.getAvailableStockApi(uuid);

    if (response && response.payload) {
      stockObatPayload.value = response.payload;
    } else {
      stockObatPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    stockObatPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

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

// Item telaaah dan edukasi
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


const schema = toTypedSchema(
  yup
    .object({
      obat: yup.array().of(
        yup.object({
          jenisStokUuid: yup.string().when("isCompound", {
            is: (value: boolean) => value === false,
            then: (schema) => schema.required("Komponen Tarif harus dipilih"),
            otherwise: (schema) => schema.notRequired(),
          }),
          racikan: yup.array().when("isCompound", {
            is: true,
            then: (schema) =>
              schema
                .of(
                  yup.object({
                    jenisStokUuid: yup
                      .string()
                      .required("Komponen Tarif harus dipilih"),
                  })
                )
                .strict(),
            otherwise: (schema) => schema.notRequired(),
          }),
        })
      ),
    })
    .noUnknown()
);

const { errors, handleSubmit, resetForm, setValues, defineField } = useForm({
  validationSchema: schema,
});

const { remove, push, fields } = useFieldArray<Obat>("obat");

const updateStokObat = async (
  racikan: any,
  uuidObat: string,
  uuidStock: string,
  indexObat: number,
  indexRacikan: number
) => {
  UseUtilsStore.setLoading(true);

  const value = {
    isRacikan: racikan,
    jenisStokUuid: uuidStock,
  };
  try {
    const response = await DoctorPrescriptionStore.updateStokObat(
      uuidObat,
      value
    );

    // find data stok obat
    const selectedStock = stockObatPayload.value.find(
      (stock: any) => stock.uuid === uuidStock
    );

    if (fields.value[indexObat].value.isCompound) {
      const selectedRacikan =
        fields.value[indexObat].value.racikan[indexRacikan];
      console.log("selected stock", selectedRacikan);

      selectedRacikan.hargaSatuan = selectedStock.harga;
      selectedRacikan.sisaStok = selectedStock.totalStok;
      selectedRacikan.subTotal =
        selectedStock.harga * selectedRacikan.medicationQty;

      // Hitung grandTotal
      const racikanItems = fields.value[indexObat].value.racikan;
      const grandTotal = racikanItems.reduce((total: number, item: any) => {
        return total + (item.subTotal || 0);
      }, 0);

      // Tambahkan grandTotal ke fields[indexObat]
      fields.value[indexObat].value.grandTotal = grandTotal;
    } else {
      const selectedObat = fields.value[indexObat].value;
      selectedObat.hargaSatuan = selectedStock.harga;
      selectedObat.sisaStok = selectedStock.totalStok;
      selectedObat.grandTotal =
        selectedObat.hargaSatuan * selectedObat.medicationQty;
    }

    // Hitung Total Tagihan secara aman
    totalTagihan.value = fields.value.reduce((total, item) => {
      const itemGrandTotal = item.value?.grandTotal || 0;
      return total + itemGrandTotal;
    }, 0);
  } catch (error) {
    console.error("Failed to update data", error);
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

onMounted(() => {
  if (payload.value?.lokasiStokUuid) {
    fetchStockObat(payload.value.lokasiStokUuid);
  }
  fetchPegawai();
  fetchStockLocation();
});

const fetchDetailPrescription = async () => {
  try {
    // Set loading state to true
    UseUtilsStore.setLoading(true);
    const response = await DoctorPrescriptionStore.detailApi(
      payload.value.uuid
    );

    payload.value = response?.payload || {};
  } catch (error) {
    console.error("Failed to fetch data:", error);
    payload.value = {};
  } finally {
    UseUtilsStore.setLoading(false);
  }
  setValues({
    obat:
      payload.value.obat?.map((item: any) => ({
        ...item,
      })) || [],
  });
  totalTagihan.value = 0;
  if (payload.value?.lokasiStokUuid) {
    fetchStockObat(payload.value.lokasiStokUuid);
    awalLokasi.value = payload.value.lokasiStokUuid;
  }
};

watch(
  () => props.payloadDetail,
  (newPayload: any) => {
    payload.value = newPayload;
    if (payload.value?.lokasiStokUuid) {
      fetchStockObat(payload.value.lokasiStokUuid);
      awalLokasi.value = newPayload.lokasiStokUuid;
    }
    console.log("Payload:", newPayload);

    setValues({
      obat:
        payload.value.obat?.map((item: any) => ({
          ...item,
        })) || [],
    });

    console.log("Payload fields:", fields);
  },
  { immediate: true }
);

// Format rupiah
const formatRupiah = (value: any) => {
  const number = Number(value);
  if (isNaN(number)) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(0);
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const checkEdukasi = computed(() => {
  return selectedEdukasi.value.length === itemEdukasi.value.length;
});

const checkTelaah = computed(() => {
  return (
    selectedTelaah.value.length === itemTelaah.value.length &&
    selectedTelaah2.value.length === itemTelaah2.value.length &&
    selectedTelaah3.value.length === itemTelaah3.value.length
  );
});
const simpanTelaah = async (uuid: string) => {
  try {
    const response = await DoctorPrescriptionStore.updateTelaah({
      uuid: uuid,
      petugasTelaah: selectedPegawai.value,
    });
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
  fetchDetailPrescription();
};

const verifikasiPetugas = async (uuid: string) => {
  try {
    if (payload.value.orderStatus === 2) {
      const response = await DoctorPrescriptionStore.statusVerifikasi({
        uuid: uuid,
      });
    } else if (payload.value.orderStatus === 3) {
      const response = await DoctorPrescriptionStore.statusSiapDiserahkan({
        uuid: uuid,
      });
    } else if (payload.value.orderStatus === 4) {
      const response = await DoctorPrescriptionStore.statusDiserahkan({
        uuid: uuid,
        penerima: penerima.value,
        noHpPenerima: noHpPenerima.value,
        petugasEdukasi: selectedPegawai.value,
      });
    }
    fetchDetailPrescription();
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
};

const batalOrder = async (uuid: string) => {
  try {
    const response = await DoctorPrescriptionStore.batalOrder({
      uuid: uuid,
      alasanBatal: alasanBatal.value,
    });

  } catch (error) {
    console.error("Failed to process the data:", error);
  }
  fetchDetailPrescription();
  batalDialog.value = false;
  alasanBatal.value = "";
};

const batalPenyerahan = async (uuid: string) => {
  try {
    const response = await DoctorPrescriptionStore.batalSiapDiserahkan({
      uuid: uuid,
    });
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
  fetchDetailPrescription();
};

const pindahLokasi = async (uuid: string) => {
  try {
    const response = await DoctorPrescriptionStore.lokasiStok({
      uuid: uuid,
      lokasiStokUuid: lokasiTujuan.value,
    });
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
  pindahDialog.value = false;
  lokasiTujuan.value = "";
  fetchDetailPrescription();
};

const closeBatalDialog = () => {
  alasanBatal.value = "";
};
const closePindahLokasiDialog = () => {
  lokasiTujuan.value = "";
};

if (userData.value) {
  selectedPegawai.value = userData.value.name;
}
</script>
<template>
  <div class="col-span-2">
    <div class="mt-[10px] p-3 bg-adameds-75">
      <!-- Title -->
      <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md h-[60px]">
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
              Tgl. Order : {{ epochToDate(payload.orderDate, "date") }}
            </p>
            <CustomButton
              background-color="bg-white"
              size="small"
              class="w-[30px] h-[30px] rounded-full p-0"
              @click="emit('close')"
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
            <p>{{ payload.noReg }}</p>
            <CustomButton class="w-24 h-5 text-sm">{{
              payload.noRm
            }}</CustomButton>
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
          <div class="bg-mediumGrey-300 w-[1px] h-[70px] mr-[20px]"></div>
          <div class="basis-1/4">
            <p class="text-xs font-bold underline underline-offset-2 mt-[15px]">
              Tgl. Lahir
            </p>
            <p class="">10 Januari 2090</p>
          </div>
          <div class="basis-1/4">
            <p class="text-xs font-bold underline underline-offset-2 mt-[15px]">
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
                      <p class="text-xs font-bold underline underline-offset-2">
                        Keluhan Utama
                      </p>
                      <p>Demam</p>
                    </div>
                    <div>
                      <p class="text-xs font-bold underline underline-offset-2">
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
                <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
                <div class="basis-1/4">
                  <p class="text-xs font-bold underline underline-offset-2">
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
                  <p class="text-xs font-bold underline underline-offset-2">
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
              <div v-for="(obat, idx) in fields">
                <div class="mt-[20px] p-4 rounded-t-lg bg-adameds-50 shadow-md">
                  <div class="grid grid-cols-2 gap-2">
                    <div class="flex">
                      <CustomButton class="text-sm h-7">{{
                        idx + 1
                      }}</CustomButton>
                      <p class="my-auto ml-2 text-sm font-bold">
                        {{ obat.value.namaObat }}
                      </p>
                      <PhArrowRight
                        :size="20"
                        class="my-auto ml-2 text-success-300"
                        weight="bold"
                      />
                      <p class="my-auto ml-2 text-sm font-bold">
                        {{ obat.value.medicationQty }}
                        {{ obat.value.bentukRacikan?.namaBentukRacikan }}
                      </p>
                    </div>
                    <div class="flex justify-end">
                      <CustomChip
                        v-if="obat.value.isTakeaway"
                        label="OBAT PULANG"
                        borderColor="border-male-300"
                        bgColor="bg-male-50"
                        :showCheckedIcon="false"
                        textColor="text-male-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                      <CustomChip
                        v-if="obat.value.isChronic"
                        label="OBAT KRONIS"
                        borderColor="border-sunFlower-300"
                        bgColor="bg-sunFlower-50"
                        :showCheckedIcon="false"
                        textColor="text-sunFlower-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                      <CustomChip
                        v-if="obat.value.isCompound"
                        label="MENGANDUNG RACIKAN"
                        borderColor="border-grass-300"
                        bgColor="bg-grass-50"
                        :showCheckedIcon="false"
                        textColor="text-grass-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                      <CustomButton
                        v-if="!obat.value.isCompound"
                        label=""
                        background-color="bg-grass-300 rounded-lg"
                        class="h-6 w-[26px] p-0 ml-[10px] mr-[10px]"
                        @click="
                          openDialog('digerus', 'Tambah Data', obat.value)
                        "
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
                        @click="openDialog('edit', 'Edit Data', obat.value)"
                      >
                        <img src="@/assets/icons/edit.svg" alt="" />
                      </CustomButton>
                    </div>
                  </div>
                </div>
                <div class="p-4 bg-white rounded-b-lg shadow-md">
                  <DataTable
                    :value="
                      obat.value.isCompound ? obat.value.racikan : itemsObat
                    "
                    class="text-xs"
                  >
                    <!-- Stok Obat -->
                    <Column v-if="obat.value.isCompound" header="No.">
                      <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                      </template>
                    </Column>
                    <Column
                      v-if="obat.value.isCompound"
                      field="itemMedis.name"
                      header="Obat"
                    />
                    <Column field="itemsObat">
                      <template #header>
                        <div class="flex justify-between items-center w-full">
                          <div class="font-semibold">Stok Obat</div>
                          <CustomButton
                            v-if="
                              payload.orderStatus !== 1 &&
                              payload.orderStatus !== 2
                            "
                            icon="PhCheck"
                            backgroundColor="bg-success-300"
                            size="small"
                            class="w-[20px] h-[20px] rounded-full"
                          />
                        </div>
                      </template>
                      <template #body="slotProps">
                        <div class="">
                          <CustomSelect
                            v-if="obat.value.isCompound"
                            v-model="slotProps.data.jenisStokUuid"
                            :show-label="false"
                            place-holder="Pilih Stok"
                            optionValue="uuid"
                            optionLabel="detailStok.name"
                            :options="stockObatPayload"
                            :invalid="(errors as any)[`obat[${idx}].racikan[${slotProps.index}].jenisStokUuid`] ? true : false"
                            :invalidMessage="(errors as any)[`obat[${idx}].racikan[${slotProps.index}].jenisStokUuid`]"
                            @update:model-value="
                              updateStokObat(
                                obat.value.isCompound,
                                slotProps.data.uuid,
                                slotProps.data.jenisStokUuid,
                                idx,
                                slotProps.index
                              )
                            "
                            :disabled="
                              payload.orderStatus !== 1 &&
                              payload.orderStatus !== 2
                            "
                          />
                          <CustomSelect
                            v-else
                            v-model="obat.value.jenisStokUuid"
                            :show-label="false"
                            place-holder="Pilih Stok"
                            optionValue="uuid"
                            optionLabel="detailStok.name"
                            :options="stockObatPayload"
                            :invalid="(errors as any)[`obat[${idx}].jenisStokUuid`] ? true : false"
                            :invalidMessage="(errors as any)[`obat[${idx}].jenisStokUuid`]"
                            @update:model-value="
                              updateStokObat(
                                obat.value.isCompound,
                                obat.value.uuid,
                                obat.value.jenisStokUuid,
                                idx,
                                slotProps.index
                              )
                            "
                            :disabled="
                              payload.orderStatus !== 1 &&
                              payload.orderStatus !== 2
                            "
                          />
                        </div>
                      </template>
                    </Column>

                    <!-- Sisa Stok -->
                    <Column
                      headerClass="font-semibold"
                      class="text-center"
                      bodyClass="align-top text-center"
                    >
                      <template #header>
                        <div class="w-full text-center">Sisa Stok</div>
                      </template>
                      <template #body="slotProps">
                        {{
                          obat.value.isCompound
                            ? slotProps.data.sisaStok || "-"
                            : obat.value.sisaStok || "-"
                        }}
                      </template>
                    </Column>
                    <!-- Aturan & Cara Pakai -->
                    <Column
                      v-if="!obat.value.isCompound"
                      field="caraPakai"
                      header="Aturan & Cara Pakai"
                    >
                      <template #body="slotProps">
                        <div>
                          <p class="text-sm">
                            {{ obat.value.aturanPakai?.name }} <br />
                            {{ obat.value.caraPakai?.caraPakai }}
                          </p>
                        </div>
                      </template>
                    </Column>
                    <!-- Jumlah -->
                    <Column
                      v-if="obat.value.isCompound"
                      headerClass="font-semibold"
                      class="text-center"
                      bodyClass="align-top text-center"
                    >
                      <template #header>
                        <div class="w-full text-center">Jumlah</div>
                      </template>
                      <template #body="slotProps">
                        {{ slotProps.data.medicationQty }}
                        {{ slotProps.data.itemMedis?.satuanPenggunaan?.name }}
                      </template>
                    </Column>
                    <!-- Biaya Satuan -->
                    <Column
                      headerClass="font-semibold"
                      class="w-2/12 text-end"
                      bodyClass="align-top text-end"
                    >
                      <template #header>
                        <div class="w-full text-end">Biaya Satuan</div>
                      </template>
                      <template #body="slotProps">
                        {{
                          obat.value.isCompound
                            ? formatRupiah(slotProps.data.hargaSatuan) || "-"
                            : formatRupiah(obat.value.hargaSatuan) || "-"
                        }}
                      </template>
                    </Column>
                    <!-- Sub. Total -->
                    <Column
                      headerClass="font-semibold"
                      class="w-2/12 text-end"
                      bodyClass="align-top text-end"
                    >
                      <template #header>
                        <div class="w-full text-end">Sub. Total</div>
                      </template>
                      <template #body="slotProps">
                        {{
                          obat.value.isCompound
                            ? formatRupiah(slotProps.data.subTotal) || "-"
                            : formatRupiah(obat.value.grandTotal) || "-"
                        }}
                      </template>
                    </Column>
                  </DataTable>

                  <DataTable
                    v-if="obat.value.isCompound"
                    :value="itemsRacikan"
                    class="text-xs"
                  >
                    <Column class="w-4/12" header="Aturan & Cara Pakai">
                      <template #body>
                        {{ obat.value.aturanPakai?.name }} <br />
                        {{ obat.value.caraPakai?.caraPakai }}
                      </template>
                    </Column>
                    <Column
                      headerClass="font-semibold"
                      class="w-3/12 text-end"
                      bodyClass="align-top text-end"
                    >
                      <template #header>
                        <div class="w-full text-end">Biaya Embalase</div>
                      </template>
                      <template #body>
                        {{ formatRupiah(obat.value.biayaEmbalase) }}
                      </template>
                    </Column>
                    <Column
                      headerClass="font-semibold"
                      class="w-2/12 text-end"
                      bodyClass="align-top text-end"
                    >
                      <template #header>
                        <div class="w-full text-end">Biaya Racik</div>
                      </template>
                      <template #body>
                        {{ formatRupiah(obat.value.biayaRacik) }}
                      </template>
                    </Column>

                    <Column
                      headerClass="font-semibold"
                      class="w-2/12 text-end"
                      bodyClass="align-top text-end"
                    >
                      <template #header>
                        <div class="w-full text-end">Sub. Total</div>
                      </template>
                      <template #body="slotProps">
                        {{
                          obat.value.grandTotal
                            ? formatRupiah(obat.value.grandTotal)
                            : "-"
                        }}
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
                  <p class="text-xs font-bold underline underline-offset-2">
                    Penulisan Resep
                  </p>
                  <p class="">dr. Nama Dokter</p>
                </div>
                <div class="basis-1/2">
                  <div class="flex">
                    <div
                      class="bg-adameds-300 w-[1px] h-[40px] mr-[20px]"
                    ></div>
                    <p class="font-bold mt-[7px]">Total Tagihan Resep</p>
                  </div>
                </div>
                <div class="basis-1/4">
                  <p class="text-base font-bold text-right mt-[7px]">
                    {{ totalTagihan ? formatRupiah(totalTagihan) : "-" }}
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
                    v-model:selection="selectedTelaah"
                    scrollable
                    scrollHeight="380px"
                    :pt="{ headerRow: 'text-SM' }"
                  >
                    <Column field="farmasetik" headerClass="bg-adameds-50">
                      <template #header>
                        <div class="w-full font-bold">Aspek Farmasetik</div>
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
                      v-if="
                        payload.orderStatus !== 1 && payload.orderStatus !== 2
                      "
                      headerClass="bg-adameds-50"
                    >
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
                    <Column
                      v-if="
                        payload.orderStatus === 1 || payload.orderStatus === 2
                      "
                      selectionMode="multiple"
                      headerStyle="width: 3rem"
                      headerClass="bg-adameds-50"
                      class="custom-checkbox"
                      ><template #header>
                        <div class="w-full font-bold">Hasil</div>
                      </template></Column
                    >
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
                    <Column field="farmasetik" headerClass="bg-adameds-50">
                      <template #header>
                        <div class="w-full font-bold">Aspek Administratif</div>
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
                      v-if="
                        payload.orderStatus !== 1 && payload.orderStatus !== 2
                      "
                      headerClass="bg-adameds-50"
                    >
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
                    <Column
                      v-if="
                        payload.orderStatus === 1 || payload.orderStatus === 2
                      "
                      selectionMode="multiple"
                      headerStyle="width: 3rem"
                      headerClass="bg-adameds-50"
                      class="custom-checkbox"
                      ><template #header>
                        <div class="w-full font-bold">Hasil</div>
                      </template></Column
                    >
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
                    <Column field="farmasetik" headerClass="bg-adameds-50">
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
                      v-if="
                        payload.orderStatus !== 1 && payload.orderStatus !== 2
                      "
                      headerClass="bg-adameds-50"
                    >
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
                    <Column
                      v-if="
                        payload.orderStatus === 1 || payload.orderStatus === 2
                      "
                      selectionMode="multiple"
                      headerStyle="width: 3rem"
                      headerClass="bg-adameds-50"
                      class="custom-checkbox"
                      ><template #header>
                        <div class="w-full font-bold">Hasil</div>
                      </template></Column
                    >
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
        <div v-if="payload.orderStatus === 4" class="grid grid-cols-1">
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
                    <Column field="farmasetik" headerClass="bg-adameds-50">
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
                  <div v-if="payload.isTakeway" class="mt-[20px] mb-[20px]">
                    <p
                      class="text-xs font-bold text-left underline underline-offset-2"
                    >
                      Diberikan Oleh
                    </p>
                    <p>{{ userData?.name }}</p>
                  </div>
                  <CustomTextfield
                    v-if="payload.isTakeway"
                    v-model="penerima"
                    label="Diberikan Ke"
                    placeholder="Diberikan Ke"
                    class="mt-[20px]"
                  />
                  <CustomSelect
                    v-if="!payload.isTakeway"
                    v-model="penerima"
                    label="Diberikan Ke"
                    place-holder="Diberikan Ke"
                    :options="pegawaiPayload"
                    optionValue="name"
                    optionLabel="name"
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

        <hr class="my-5 border-[1px] border-grey-200" />
        <div
          v-if="
            payload.orderStatus === 1 ||
            payload.orderStatus === 2 ||
            payload.orderStatus === 4
          "
          class="flex justify-between items-end"
        >
          <CustomSelect
            v-if="
              payload.orderStatus === 1 ||
              payload.orderStatus === 2 ||
              payload.orderStatus === 4
            "
            v-model="selectedPegawai"
            :label="
              payload.orderStatus === 4 ? 'Petugas Edukasi' : 'Petugas Telaah'
            "
            place-holder="Pilih Petugas"
            :options="pegawaiPayload"
            optionValue="name"
            optionLabel="name"
            class="w-1/3"
          />
          <CustomButton
            v-if="payload.orderStatus === 1 || payload.orderStatus === 2"
            @click="simpanTelaah(payload.uuid)"
            :disabled="
              !checkTelaah || !selectedPegawai || Object.keys(errors).length > 0
            "
          >
            <div class="flex items-center gap-2">
              <div class="text-sm">Simpan Telaah</div>
            </div>
          </CustomButton>
        </div>
        <hr class="mt-5 border-[1px] border-grey-200" />
        <!-- Diverifikasi Oleh -->

        <div class="grid grid-cols-2">
          <div class="flex gap-2.5 item-center mt-[20px]">
            <CustomButton
              v-if="payload.orderStatus === 1 || payload.orderStatus === 2"
              background-color="bg-danger-300"
              @click="batalDialog = true"
            >
              <div class="flex items-center gap-2">
                <div class="text-sm">Batal Order</div>
              </div>
            </CustomButton>
            <CustomButton
              v-if="payload.orderStatus === 4"
              background-color="bg-danger-300"
              @click="batalPenyerahan(payload.uuid)"
            >
              <div class="flex items-center gap-2">
                <div class="text-sm">Batal Penyerahan</div>
              </div>
            </CustomButton>

            <CustomButton
              v-if="payload.orderStatus === 1 || payload.orderStatus === 2"
              @click="pindahDialog = true"
            >
              <div class="flex items-center gap-2">
                <div class="text-sm">Pindah Lokasi Order</div>
              </div>
            </CustomButton>
            <CustomButton @click="cetakDialog = true">
              <div class="flex items-center gap-2">
                <PhPrinter :size="18" colorc="#ffffff" weight="fill" />
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
              <p>{{ userData?.name }}</p>
            </div>
            <div class="mt-[20px]">
              <div
                class="bg-mediumGrey-300 w-[1px] h-[33px] ml-[20px] mt-1"
              ></div>
            </div>
            <div class="mt-[20px]">
              <CustomButton
                :label="
                  payload.orderStatus === 1
                    ? 'Verifikasi'
                    : payload.orderStatus === 2
                    ? 'Verifikasi'
                    : payload.orderStatus === 3
                    ? 'Obat Siap Diserahkan'
                    : payload.orderStatus === 4
                    ? 'Serahkan Obat'
                    : ''
                "
                :disabled="
                  payload.orderStatus === 1
                "
                class="ml-[20px]"
                @click="verifikasiPetugas(payload.uuid)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FormObat
    v-model:isDialogVisible="isTambahDataDialogVisible"
    :method="dialogConfig.method"
    :title="dialogConfig.title"
    :payload="dialogConfig.data"
    @data-updated="fetchDetailPrescription"
  />

  <!-- Batal Notification -->
  <CustomDialog
    v-model:visible="batalDialog"
    width="550px"
    headerBg="bg-danger-300"
    @close-dialog="closeBatalDialog"
  >
    <template #header>Batal Order</template>
    <template #body>
      <div class="grid grid-cols-1">
        <div class="mt-[20px]">
          <p class="font-bold">Alasan Membatalkan Order</p>
        </div>
        <div class="mt-[10px]">
          <CustomTextfield
            v-model="alasanBatal"
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
          @click="batalOrder(payload.uuid)"
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
  <CustomDialog
    v-model:visible="pindahDialog"
    width="550px"
    @close-dialog="closePindahLokasiDialog"
  >
    <template #header>Pindah Lokasi Order</template>
    <template #body>
      <div class="grid grid-cols-[45%,10%,45%]">
        <div class="mt-[20px]">
          <CustomSelect
            v-model="awalLokasi"
            place-holder="Lokasi Awal Order"
            label="Lokasi Awal Order"
            class=""
            optionLabel="name"
            optionValue="uuid"
            :options="StockLocationPayload"
            disabled
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
            v-model="lokasiTujuan"
            place-holder="Pilih Lokasi"
            label="Pindah Lokasi Ke"
            class=""
            optionLabel="name"
            optionValue="uuid"
            :options="StockLocationPayload"
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
        <CustomButton
          @click="pindahLokasi(payload.uuid)"
          label="Pindahkan"
          class="ml-[10px]"
        />
      </div>
    </template>
  </CustomDialog>
  <!-- Cetak Dialog -->
  <CustomDialog v-model:visible="cetakDialog" width="550px">
    <template #header>Cetak</template>
    <template #body>
      <div class="flex justify-between mt-[20px]">
        <CustomButton>
          <div class="flex items-center gap-2">
            <PhPrinter :size="18" colorc="#ffffff" weight="fill" />
            <div class="text-sm">E-Tiket</div>
          </div>
        </CustomButton>
        <CustomButton>
          <div class="flex items-center gap-2">
            <PhPrinter :size="18" colorc="#ffffff" weight="fill" />
            <div class="text-sm">E-Resep</div>
          </div>
        </CustomButton>
        <CustomButton>
          <div class="flex items-center gap-2">
            <PhPrinter :size="18" colorc="#ffffff" weight="fill" />
            <div class="text-sm">Salinan E-Resep</div>
          </div>
        </CustomButton>
      </div>
    </template>
  </CustomDialog>
</template>
<style scoped>
/* Menggunakan ::v-deep untuk menargetkan elemen dalam shadow DOM */
:deep(.custom-checkbox .p-checkbox-checked .p-checkbox-box) {
  @apply border-adameds-300 bg-adameds-300;
}

:deep(.custom-checkbox .p-checkbox-checked .p-checkbox-box .p-checkbox-icon) {
  @apply text-white;
}
</style>
