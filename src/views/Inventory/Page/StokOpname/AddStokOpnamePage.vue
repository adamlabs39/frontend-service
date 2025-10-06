<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStokOpnameStore } from "@/stores/inventory/stokOpname";
import { useStockTypeStore } from "@/stores/datamasterFarmasi/StockType";
import { utilsStore } from "@/stores/utils";
import { epochToDate } from "@/utils/Helpers";
import type { MenuItem } from "primevue/menuitem";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import NoData from "@/components/section/NoData.vue";
import LayoutDialog from "../../Layout/LayoutDialog.vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
});

// State Management Kategori Item
const kategoriItem = ref<string>("");
const optionKategori = ref([
  { name: "Medis", value: "medis" },
  { name: "Non-Medis", value: "non-medis" },
]);

// State Management Jenis Item
const jenisItem = ref<any[]>([]);
const optionJenis = ref([
  { name: "Obat", value: "obat" },
  { name: "Alkes", value: "alkes" },
]);

// State Management Stock Type
const jenisStokUuids = ref<any[]>([]);
const StockTypeStore = useStockTypeStore();
const StockTypePayload = ref<any[]>([]);

// Fetch Stock Type
const fetchStockType = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await StockTypeStore.getApi(1, 9999);

    if (response && response.payload) {
      StockTypePayload.value = response.payload;
    } else {
      StockTypePayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    StockTypePayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// State Management
const searchQuery = ref<string>("");
const StokOpnameStore = useStokOpnameStore();
const UseUtilsStore = utilsStore();
const StokOpnamePayload = ref<any[]>([]);
const StokOpnameProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => StokOpnamePayload.value && StokOpnamePayload.value.length > 0
);

// Fetch Purchasing Of Supplier
const fetchRekonsil = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await StokOpnameStore.getApiRekonsil(
      "0196a8ca-1fda-71ca-a133-7383413ef200",
      jenisStokUuids.value.join(","),
      jenisItem.value.join(","),
      kategoriItem.value,
      type.value,
      StokOpnameProperties.value.page,
      StokOpnameProperties.value.page_size
    );

    if (response && response.payload) {
      StokOpnameProperties.value.total = response.properties.total;
      StokOpnamePayload.value = response.payload;
    } else {
      StokOpnamePayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    StokOpnamePayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchRekonsil();
  }, 500);
});

// Handle Pagination
const handlePage = (event: any) => {
  StokOpnameProperties.value.page = event.page + 1;
  StokOpnameProperties.value.page_size = event.rows;
  fetchRekonsil();
};

const rekonsilTitle = ref<string | null>(null);
const type = ref("");

const rekonsilDariMasterItem = () => {
  isDataAvailable.value = true;
  rekonsilTitle.value = "Rekonsil Dari Master Item";
  type.value = "masterStok";
  fetchRekonsil();
};

const rekonsilDariStokItem = () => {
  isDataAvailable.value = true;
  rekonsilTitle.value = "Rekonsil Dari Stok Item";
  type.value = "masterItem";
  fetchRekonsil();
};

const emit = defineEmits(["back", "onSimpanDraft", "onSimpanAkhiriSO"]);

// State untuk data dan status
const isDataAvailable = ref(false);
const dataItems = ref([
  // Contoh data, ganti dengan data yang diambil dari API
  {
    id: 1,
    namaItem: "Obat 1",
    jenisStok: "Umum",
    jenisItem: "Obat",
    kategoriItem: "Medis",
    jenisObat: "Obat Keras",
    stokAwal: 900,
    stokMasuk: 900,
    stokKeluar: 900,
    stokSistem: 900,
    stokFisik: 0,
    selisih: 0,
    hargaDasar: 12000,
    hargaAkhir: 10000,
    expDate: "01-01-25",
  },
  {
    id: 2,
    namaItem: "Obat 2",
    jenisStok: "Umum",
    jenisItem: "Obat",
    kategoriItem: "Medis",
    stokAwal: 900,
    stokMasuk: 900,
    stokKeluar: 900,
    stokSistem: 900,
    stokFisik: 0,
    selisih: -1,
    hargaDasar: 600,
    hargaAkhir: 500,
    expDate: "01-01-25",
  },
]);

const selectedDataItem = ref<typeof dataItems.value>([]);

const onSubmitDraft = () => {
  const payload = {
    tglCutOff: "01-01-2024",
    noStokOpname: "1243",
    judul: "Judul Stok Opname",
    petugasStokOpname: "Nama Petugas",
    datas: dataItems.value,
    totalItem: dataItems.value.length,
    status: "DRAFT",
    jenisStok: "Umum",
    jenisItem: "Alkes",
    kategoriItem: "Medis",
  };

  console.log("Submitted with", payload);
  emit("onSimpanDraft", payload);
};

const onSubmitAkhiriSO = () => {
  const payload = {
    tglCutOff: "01-01-2024",
    noStokOpname: "1243",
    judul: "Judul Stok Opname",
    petugasStokOpname: "Nama Petugas",
    datas: dataItems.value,
    totalItem: dataItems.value.length,
    status: "SELESAI",
    jenisStok: "Umum",
    jenisItem: "Alkes",
    kategoriItem: "Medis",
  };
  console.log("Submitted with", payload);
  emit("onSimpanAkhiriSO", payload);
};

const isDialogVisible = ref(false);

const dialogConfig = ref({
  title: "",
  buttonFooterLeft: "",
  buttonFooterRight: "",
  message: "",
});

onMounted(() => {
  fetchStockType();
});
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 pb-0 overflow-auto"
    pt:content:class="h-full overflow-hidden"
    class="h-full overflow-hidden overflow-y-auto"
    >>
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder initialState="0">
        <template #header>
          <div class="flex items-center justify-between w-full align-middle">
            <div class="flex items-center">
              <CustomButton icon="PhArrowClockwise" class="mr-5" />
              <CustomBreadCrumb
                :home="{
                  label: 'Stok Opname',
                  home: true,
                }"
              />

              <div v-if="isDataAvailable" class="flex">
                <hr class="h-6 mx-2.5 border-2 border-adameds-300" />
                <div class="font-semibold text-adameds-300 text-MD">
                  Tgl. Cut off : 01-01-2024
                </div>
              </div>
            </div>
            <CustomButton
              @click="emit('back')"
              icon="PhCaretLeft"
              label="Kembali"
              class="mr-[10px]"
              outlined
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
            />
          </div>
        </template>
        <template #content>
          <div class="grid grid-cols-4 gap-4 mt-[10px]">
            <CustomTextfield
              label="Judul Stok Opname"
              placeholder="Masukkan judul Stok Opname"
            />
            <CustomMultiSelect
              label="Jenis Stok"
              placeHolder="Pilih Jenis Stok"
              v-model="jenisStokUuids"
              :options="StockTypePayload"
              optionLabel="name"
              optionValue="uuid"
            />
            <CustomSelect
              label="Kategori Obat"
              placeHolder="Pilih Kategori Obat"
              v-model="kategoriItem"
              :options="optionKategori"
              optionLabel="name"
              optionValue="value"
              class="grow"
            />
            <CustomMultiSelect
              label="Jenis Item"
              placeHolder="Pilih Jenis Item"
              v-model="jenisItem"
              :options="optionJenis"
              optionLabel="name"
              optionValue="value"
            />
          </div>
          <hr class="border-grey-200 mt-[15px]" />
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
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between pb-2.5">
          <div class="flex gap-2.5">
            <div class="font-semibold text-MD text-adameds-300">
              Daftar Item Stok Opname
            </div>
            <div
              v-if="rekonsilTitle"
              class="font-semibold text-grey-300 text-MD"
            >
              ({{ rekonsilTitle }})
            </div>
          </div>
          <div v-if="!isDataAvailable">
            <CustomButton
              label="Rekonsil Dari Master Item"
              class="mr-[10px]"
              @click="rekonsilDariMasterItem"
            />
            <CustomButton
              label="Rekonsil Dari Stok Item"
              @click="rekonsilDariStokItem"
            />
          </div>
          <div v-else>
            <CustomButton
              icon="PhDownloadSimple"
              label="Kartu Stok"
              class="mr-[10px]"
            />
            <CustomButton
              icon="PhUploadSimple"
              label="Import Excel"
              class="mr-[10px]"
            />

            <!-- <hr class="pt-5 border-grey-200" /> -->
            <CustomButton
              v-if="selectedDataItem.length > 0"
              icon="PhTrash"
              label="Hapus Item"
              class="bg-danger-300"
            />
          </div>
        </div>
        <hr class="border-grey-200" />
        <div v-if="isDataAvailable" class="flex flex-col gap-5">
          <div class="flex items-end gap-4 mt-[10px]">
            <CustomTextfield
              label="Cari Nama Item / Kode Item"
              class="grow"
              placeholder="Masukkan judul Stok Opname"
            />
            <CustomSelect
              label="Jenis Item"
              placeHolder="Pilih Jenis Item"
              optionValue="code"
              optionLabel="name"
              :isLoading="false"
              class="w-[200px]"
            />
            <div class="flex gap-2.5">
              <CustomButton icon="PhMagnifyingGlass" label="Cari" />
              <CustomButton
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
              />
            </div>
          </div>
          <div class="relative overflow-y-auto" style="max-height: 200px">
            <DataTable :rowClass="(data) => ({ 'bg-danger-50': selectedDataItem.includes(data) })"
              dataKey="id"
              selectionMode="multiple"
              v-model:selection="selectedDataItem"
              :value="dataItems"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="250px"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column headerClass="bg-adameds-50" class="w-[40px]">
                <template #header>
                  <div class="font-semibold">No</div>
                </template>
                <template #body="slotProps">
                  <div>
                    <div class="text-SM">{{ slotProps.index + 1 }}</div>
                  </div>
                </template>
              </Column>
              <Column field="noPembelian" headerClass="bg-adameds-50">
                <template #header>
                  <div class="font-semibold">Nama Item</div>
                </template>
                <template #body="slotProps">
                  <div>
                    <div class="text-SM">{{ slotProps.data.namaItem }}</div>
                    <CustomChip
                      :showCheckedIcon="false"
                      :label="slotProps.data.kategoriItem"
                      bgColor="bg-adameds-300"
                      textColor="text-white"
                      customClass="h-5 pr-[6px] border-none mr-[5px]"
                    />
                    <CustomChip
                      :showCheckedIcon="false"
                      :label="slotProps.data.jenisStok"
                      bgColor="bg-adameds-300"
                      textColor="text-white"
                      customClass="h-5 pr-[6px] border-none mr-[5px]"
                    />
                    <CustomChip
                      :showCheckedIcon="false"
                      :label="slotProps.data.jenisItem"
                      bgColor="bg-adameds-300"
                      textColor="text-white"
                      customClass="h-5 pr-[6px] border-none mr-[5px]"
                    />
                    <CustomChip
                      v-if="slotProps.data.jenisObat"
                      :showCheckedIcon="false"
                      :label="slotProps.data.jenisObat"
                      bgColor="bg-adameds-300"
                      textColor="text-white"
                      customClass="h-5 pr-[6px] border-none mr-[5px]"
                    />
                  </div>
                </template>
              </Column>
              <Column headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-semibold">Stok Awal</div>
                </template>
                <template #body="slotProps">
                  <div class="font-normal text-SM">
                    {{ slotProps.data.stokAwal }}
                  </div>
                  <div class="font-normal text-[8px] text-adameds-300">
                    Tablet
                  </div>
                </template>
              </Column>
              <Column headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-semibold">Stok Masuk</div>
                </template>
                <template #body="slotProps">
                  <div class="font-normal text-SM">
                    {{ slotProps.data.stokMasuk }}
                  </div>
                  <div class="font-normal text-[8px] text-adameds-300">
                    Tablet
                  </div>
                </template>
              </Column>
              <Column headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-semibold">Stok Keluar</div>
                </template>
                <template #body="slotProps">
                  <div class="font-normal text-SM">
                    {{ slotProps.data.stokKeluar }}
                  </div>
                  <div class="font-normal text-[8px] text-adameds-300">
                    Tablet
                  </div>
                </template>
              </Column>
              <Column headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-semibold">Stok Sistem</div>
                </template>
                <template #body="slotProps">
                  <div class="font-normal text-SM">
                    {{ slotProps.data.stokSistem }}
                  </div>
                  <div class="font-normal text-[8px] text-adameds-300">
                    Tablet
                  </div>
                </template>
              </Column>
              <Column headerClass="bg-adameds-50" class="w-[130px]">
                <template #header>
                  <div class="w-full font-semibold text-center">Stok Fisik</div>
                </template>
                <template #body="slotProps">
                  <CustomInputNumber
                    label=""
                    v-model:modelValue="slotProps.data.stokFisik"
                    disabled
                  >
                    <template #appendText>
                      <div
                        class="flex items-center justify-center px-2 text-XS"
                      >
                        Tablet
                      </div>
                    </template>
                  </CustomInputNumber>
                </template>
              </Column>
              <Column headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-semibold">Selisih</div>
                </template>
                <template #body="slotProps">
                  <div class="flex gap-1 ustify-between i">
                    <div class="flex flex-col">
                      <div class="text-SM">
                        {{ Math.abs(slotProps.data.selisih) }}
                      </div>
                      <div class="font-normal text-[8px] text-adameds-300">
                        Tablet
                      </div>
                    </div>

                    <!-- Conditionally render PhArrowCircleDown or PhArrowCircleUp based on mutasiStok value -->
                    <PhArrowCircleDown
                      v-if="slotProps.data.selisih < 0"
                      :size="18"
                      color="#E9594C"
                      weight="fill"
                    />
                    <PhArrowCircleUp
                      v-else
                      :size="18"
                      color="#E89F29"
                      weight="fill"
                    />
                  </div>
                </template>
              </Column>
              <Column headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-semibold">Exp. Date</div>
                </template>
                <template #body="slotProps">
                  <div class="font-normal text-SM">
                    {{ slotProps.data.expDate }}
                  </div>
                </template>
              </Column>
              <Column headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-semibold">Harga Dasar</div>
                </template>
                <template #body="slotProps">
                  <div class="font-normal text-SM">
                    Rp {{ slotProps.data.hargaDasar }}
                  </div>
                </template>
              </Column>
              <Column headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-semibold">Harga Akhir</div>
                </template>
                <template #body="slotProps">
                  <div class="font-normal text-SM">
                    Rp {{ slotProps.data.hargaAkhir }}
                  </div>
                </template>
              </Column>
              <Column
                header="Action"
                body-class="text-center"
                selectionMode="multiple"
                headerStyle="width: 3rem"
                headerClass="bg-adameds-50"
                class="custom-checkbox"
              >
              </Column>
            </DataTable>
          </div>
          <div class="flex justify-end">
            <CustomPaginator
              :rows="1"
              :totalRecords="10"
              :rowsPerPageOptions="[10, 20, 30]"
              @page="[]"
            />
          </div>
        </div>
      </div>
      <LayoutDialog
        v-model:isDialogVisible="isDialogVisible"
        :buttonFooterLeft="dialogConfig.buttonFooterLeft"
        :buttonFooterRight="dialogConfig.buttonFooterRight"
        :message="dialogConfig.message"
        :title="dialogConfig.title"
      />
    </template>
    <template #footer>
      <div class="flex justify-between mb-[10px]">
        <div :class="`grid gap-7 ${isDataAvailable ? 'grid-cols-3' : 'grid-cols-2'}`">
          <div>
            <div class="font-semibold underline text-SM">Total Item SO</div>
            <div class="font-normal text-normal">0 item</div>
          </div>
          <div>
            <div class="font-semibold underline text-SM">Tgl. Selesai SO</div>
            <div class="font-normal text-normal">01-01-2024</div>
          </div>
          <div v-if="isDataAvailable">
            <div class="font-semibold underline text-SM">Petugas SO</div>
            <div class="font-normal text-normal">Nama Petugas</div>
          </div>
        </div>
        <div>
          <CustomButton
            label="Simpan (Draft)"
            class="my-auto mr-2 bg-warning-300"
            :disabled="!isDataAvailable"
            @click="onSubmitDraft"
          />
          <CustomButton
            label="Simpan & Akhiri SO"
            class="my-auto bg-adameds-300"
            :disabled="!isDataAvailable"
            @click="onSubmitAkhiriSO"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<style>
.custom-checkbox .p-checkbox-checked .p-checkbox-box {
  @apply border-danger-300 bg-danger-300; /* Kelas Tailwind untuk border dan warna latar */
}

.custom-checkbox .p-checkbox-checked .p-checkbox-box .p-checkbox-icon {
  @apply text-white; /* Kelas Tailwind untuk warna tanda centang */
}
</style>
