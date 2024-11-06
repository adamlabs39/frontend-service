<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useMedicalItemStore } from "@/stores/datamasterFarmasi/MedicalItem";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";

const selectedTelaah = ref([]);
const selectedTelaah2 = ref([]);
const selectedTelaah3 = ref([]);
const batalDialog = ref(false);
const pindahDialog = ref(false);
const editDialog = ref(false);
const gerusDialog = ref(false);
const recipeDetails = ref(false);

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

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode Item Medis harus diisi"),
    name: yup.string().required("Nama Item Medis harus diisi"),
    jenisItem: yup.string().required("Jenis Item harus diisi"),
    satuanPenggunaanUuid: yup.string().required("Satuan Pengguna harus diisi"),
    status: yup.bool().default(false),
  }).noUnknown()
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const MedicalItemStore = useMedicalItemStore();

const [code] = defineField("code");
const [name] = defineField("name");
const [jenisItem] = defineField("jenisItem");
const [satuanPenggunaanUuid] = defineField("satuanPenggunaanUuid");
const [status] = defineField("status");
const selectedTujuanOrder = ref();

const optionsPeriode = ref([
  { label: "Hari", value: "hari" },
  { label: "Jam", value: "jam" },
  { label: "Minggu", value: "minggu" },
  { label: "Tiap", value: "tiap" },
  { label: "Khusus", value: "khusus" },
]);

const itemsObat = ref([
  {
    stokObat: "",
    caraPakai: "3 x 1 (Sehari)",
    biaya: "1500",
    total: "25000"
  },
]);

const itemTelaah = ref([
  {
    farmasetik: "Nama Obat, Bentuk, dan Kekuatan Sediaan"
  },
  {
    farmasetik: "Dosis dan Jumlah Obat"
  },
  {
    farmasetik: "Stabilitas"
  },
  {
    farmasetik: "Aturan dan Cara Penggunaan"
  }
]);

const itemTelaah2 = ref([
  {
    administratif: "Benar Identitas pasien"
  },
  {
    administratif: "Identitas Dokter"
  },
  {
    administratif: "Tanggal Resep"
  },
  {
    administratif: "Unit Asal Resep"
  }
]);

const itemTelaah3 = ref([
  {
    klinik: "Ketepatan Indikasi, Dosis, dan Waktu Penggunaan Obat"
  },
  {
    klinik: "Duplikasi Pengobatan"
  },
  {
    klinik: "Alergi dan Reaksi Obat yang Tidak Dikehendaki (ROTD)"
  },
  {
    klinik: "Kontraindikasi"
  },
  {
    klinik: "Interaksi Obat"
  },
]);

const stokObat = ref([
  { label: "Umum", value: "umum" },
]);

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

const onSubmit = handleSubmit(async (values: any) => {
  try {
    if (method.value === "edit") {
      if (!props.payload || !props.payload.uuid) {
        throw new Error("UUID is missing for edit operation");
      }
      const uuid = props.payload.uuid;
      const response = await MedicalItemStore.putApi(uuid, values);
      console.log("Data updated successfully:", response);
      emit("data-updated");
    } else if (method.value === "add") {
      const response = await MedicalItemStore.postApi(values);
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

const closeDialog = () => {
  emit("update:isDialogVisible", false);
  resetDialogMode();
  resetForm();
};

const handleEdit = () => {
  method.value = "edit";
  title.value = "Edit Data";
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
                        <p class="text-sm font-bold text-white font-poppins mt-[5px] mr-[20px]">Tgl. Order : 3-10-2024</p>
                        <CustomButton
                            background-color="bg-white" 
                            size="small" 
                            class="w-[30px] h-[30px] rounded-full p-0"
                            @click="recipeDetails = false"
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
                    <CustomButton class="w-24 h-5 text-sm">00-00-00</CustomButton>
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
                    <p class="text-xs font-bold underline underline-offset-2 mt-[15px]">Tgl. Lahir</p>
                    <p class="">10 Januari 2090</p>
                    </div>
                    <div class="basis-1/4">
                    <p class="text-xs font-bold underline underline-offset-2 mt-[15px]">Umur</p>
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
                                <p class="text-xs font-bold underline underline-offset-2">Keluhan Utama</p>
                                <p>Demam</p>
                            </div>
                            <div>
                                <p class="text-xs font-bold underline underline-offset-2">Alergi</p>
                                <p>Tidak Ada</p>
                            </div>
                            <div>
                                <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Dokter Pengirim
                                <span>  
                                    <CustomButton 
                                    class="h-[20px] w-[40px] text-xs ml-[10px]"
                                    outlined
                                    borderColor="border-grey-300"
                                    textColor="text-grey-300"
                                    >IGD</CustomButton>
                                </span>
                                </p>
                                <p>dr. Anji Sp. M</p>
                            </div>
                            </div>
                        </div>
                        <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
                        <div class="basis-1/4">
                            <p class="text-xs font-bold underline underline-offset-2">Diagnosa Primer</p>
                            <p class="">H10.9 Conjuctivitis</p>
                            <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Diagnosa Sekunder</p>
                            <p class="">-</p>
                        </div>
                        <div class="basis-1/4">
                            <p class="text-xs font-bold underline underline-offset-2">Diagnosa Sekunder</p>
                            <p class="">-</p>
                            <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Diagnosa Sekunder</p>
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
                        <div class="mt-[20px] p-4 rounded-t-lg bg-adameds-50 shadow-md">
                            <div class="grid grid-cols-2 gap-2">
                            <div class="flex">
                                <CustomButton class="text-sm h-7">02</CustomButton>
                                <p class="my-auto ml-2 text-sm font-bold">
                                Amoxcillin
                                </p>
                                <PhArrowRight
                                :size="20"
                                class="my-auto ml-2 text-success-300"
                                weight="bold"
                                />
                                <p class="my-auto ml-2 text-sm font-bold">15 Tablet</p>
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
                                @click = "gerusDialog = true"
                                >
                                <img src="@/assets/icons/Exclude.svg" alt="" width="15" />
                                </CustomButton>
                                <CustomButton
                                label=""
                                background-color="bg-[#3D84E5] rounded-lg"
                                class="h-6 w-[26px] p-0"
                                @click = "editDialog = true"
                                >
                                <img src="@/assets/icons/edit.svg" alt="" />
                                </CustomButton>
                            </div>
                            </div>
                        </div>
                        <div class="h-[140px] p-4 overflow-auto bg-white rounded-b-lg shadow-md">
                            <DataTable :value="itemsObat" :pt="{ headerRow: 'text-SM' }">
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
                            <Column field="caraPakai" header="Aturan & Cara Pakai">
                                <template #body="slotProps">
                                <div>
                                    <p class="text-sm">{{ slotProps.data.caraPakai }}</p>
                                </div>
                                </template>
                            </Column>
                            <!-- Biaya Satuan -->
                            <Column field="biaya" header="Biaya Satuan">
                                <template #body="slotProps">
                                <div class="text-sm">{{ slotProps.data.biaya }}</div>
                                </template>
                            </Column>
                            <!-- Sub. Total -->
                            <Column field="total" header="Sub. Total">
                                <template #body="slotProps">
                                <div class="text-sm">{{ slotProps.data.total }}</div>
                                </template>
                            </Column>
                            </DataTable>
                        </div>
                        </div>
                        <div>
                        <div class="mt-[20px] p-4 rounded-t-lg bg-adameds-50 shadow-md">
                            <div class="grid grid-cols-2 gap-2">
                            <div class="flex">
                                <CustomButton class="text-sm h-7">02</CustomButton>
                                <p class="my-auto ml-2 text-sm font-bold">
                                Amoxcillin
                                </p>
                                <PhArrowRight
                                :size="20"
                                class="my-auto ml-2 text-success-300"
                                weight="bold"
                                />
                                <p class="my-auto ml-2 text-sm font-bold">15 Tablet</p>
                            </div>
                            <div class="flex justify-end">
                                <CustomButton
                                label=""
                                background-color="bg-grass-300 rounded-lg"
                                class="h-6 w-[26px] p-0 ml-[10px] mr-[10px]"
                                @click = "gerusDialog = true"
                                >
                                <img src="@/assets/icons/Exclude.svg" alt="" width="15" />
                                </CustomButton>
                                <CustomButton
                                label=""
                                background-color="bg-[#3D84E5] rounded-lg"
                                class="h-6 w-[26px] p-0"
                                @click = "editDialog = true"
                                >
                                <img src="@/assets/icons/edit.svg" alt="" />
                                </CustomButton>
                            </div>
                            </div>
                        </div>
                        <div class="h-[140px] p-4 overflow-auto bg-white rounded-b-lg shadow-md">
                            <DataTable :value="itemsObat" :pt="{ headerRow: 'text-SM' }">
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
                            <Column field="caraPakai" header="Aturan & Cara Pakai">
                                <template #body="slotProps">
                                <div>
                                    <p class="text-sm">{{ slotProps.data.caraPakai }}</p>
                                </div>
                                </template>
                            </Column>
                            <!-- Biaya Satuan -->
                            <Column field="biaya" header="Biaya Satuan">
                                <template #body="slotProps">
                                <div class="text-sm">{{ slotProps.data.biaya }}</div>
                                </template>
                            </Column>
                            <!-- Sub. Total -->
                            <Column field="total" header="Sub. Total">
                                <template #body="slotProps">
                                <div class="text-sm">{{ slotProps.data.total }}</div>
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
                            <p class="text-xs font-bold underline underline-offset-2">Penulisan Resep</p>
                            <p class="">dr. Nama Dokter</p>
                        </div>
                        <div class="basis-1/2">
                            <div class="flex">
                            <div class="bg-adameds-300 w-[1px] h-[40px] mr-[20px]"></div>
                            <p class="font-bold mt-[7px]">Total Tagihan Resep</p>
                            </div>
                        </div>
                        <div class="basis-1/4">
                            <p class="text-base font-bold text-right mt-[7px]">RP. 0, 00</p>
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
                            scrollable scrollHeight="380px"
                            :pt="{ headerRow: 'text-SM' }"
                            v-model:selection="selectedTelaah"
                            >
                            <Column field="farmasetik" headerClass="bg-adameds-50">
                                <template #header>
                                <div class="w-full font-bold">Aspek Farmasetik</div>
                                </template>
                                <template #body="slotProps">
                                <div class="flex">
                                    <p class="text-xs">{{ slotProps.data.farmasetik }}</p>
                                </div>
                                </template>
                            </Column>
                            <Column field="hasil" header="Hasil" headerClass="bg-adameds-50"></Column>
                            <Column selectionMode="multiple" headerClass="bg-adameds-50" class="custom-checkbox"></Column>
                            </DataTable>
                        </div>
                        <!-- itemTelaah2 -->
                        <div class="mt-[20px]">
                            <DataTable
                            :value="itemTelaah2"
                            v-model:selection="selectedTelaah2"
                            scrollable scrollHeight="380px"
                            :pt="{ headerRow: 'text-SM' }"
                            >
                            <Column field="farmasetik" headerClass="bg-adameds-50">
                                <template #header>
                                <div class="w-full font-bold">Aspek Administratif</div>
                                </template>
                                <template #body="slotProps">
                                <div class="flex">
                                    <p class="text-xs">{{ slotProps.data.administratif }}</p>
                                </div>
                                </template>
                            </Column>
                            <Column field="hasil" header="Hasil" headerClass="bg-adameds-50"></Column>
                            <Column selectionMode="multiple" headerClass="bg-adameds-50" class="custom-checkbox"></Column>
                            </DataTable>
                        </div>
                        <!-- itemTelaah3 -->
                        <div class="mt-[20px]">
                            <DataTable
                            :value="itemTelaah3"
                            v-model:selection="selectedTelaah3"
                            scrollable scrollHeight="430px"
                            :pt="{ headerRow: 'text-SM' }"
                            >
                            <Column field="farmasetik" headerClass="bg-adameds-50">
                                <template #header>
                                <div class="w-full font-bold">Aspek Klinik</div>
                                </template>
                                <template #body="slotProps">
                                <div class="flex">
                                    <p class="text-xs">{{ slotProps.data.klinik }}</p>
                                </div>
                                </template>
                            </Column>
                            <Column field="hasil" header="Hasil" headerClass="bg-adameds-50"></Column>
                            <Column selectionMode="multiple" headerClass="bg-adameds-50" class="custom-checkbox"></Column>
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
                <hr class="mt-5 border-[1px] border-grey-200">
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
                    <CustomButton 
                        label="Simpan Telaah"
                    />
                    </div>
                </div>
                <hr class="mt-5 border-[1px] border-grey-200">
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
                        <p class="text-xs font-bold text-right underline underline-offset-2">Diverifikasi Oleh</p>
                        <p>Nama Petugas</p>
                    </div>
                    <div class="mt-[20px]">
                        <div class="bg-mediumGrey-300 w-[1px] h-[33px] ml-[20px] mt-1"></div>
                    </div>
                    <div class="mt-[20px]">
                        <CustomButton
                        label="Verifikasi"
                        class="ml-[20px]"
                        />
                    </div>
                    </div>
                </div>
            </div>
        </div>
</template>
