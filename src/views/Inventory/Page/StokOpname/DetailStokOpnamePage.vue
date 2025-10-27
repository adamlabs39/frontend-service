<script lang="ts" setup>
import type { MenuItem } from "primevue/menuitem";
import { computed, onMounted, ref, watch } from "vue";
import { useStokOpnameStore } from "@/stores/inventory/stokOpname";
import { utilsStore } from "@/stores/utils";
import { epochToDate, dateToEpoch, formatPrice } from "@/utils/Helpers";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  selectedData: {
    type: Object,
  },
  lokasiStokUuid: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["back", "diterima"]);

// State Management Jenis Item
const jenisItem = ref<string>("");
const optionJenis = ref([
  { name: "Obat", value: "obat" },
  { name: "Alkes", value: "alkes" },
]);

// State Management
const searchQuery = ref<string>("");
const StokOpnameStore = useStokOpnameStore();
const UseUtilsStore = utilsStore();
const DetailPayload = ref<any[]>([]);
const DetailProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => DetailPayload.value && DetailPayload.value.length > 0
);

// Fetch Purchasing Of Supplier
const fetchDetail = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await StokOpnameStore.getApiDetail(
      props.selectedData?.uuid,
      searchQuery.value,
      jenisItem.value,
      DetailProperties.value.page,
      DetailProperties.value.page_size
    );

    if (response && response.payload) {
      DetailProperties.value.total = response.properties.total;
      DetailPayload.value = response.payload;
    } else {
      DetailPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    DetailPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// PERBAIKAN 4: Tambahkan fungsi handleSearch
const handleSearch = () => {
  DetailProperties.value.page = 1;
  fetchDetail();
};

// PERBAIKAN 5: Tambahkan fungsi handleReset
const handleReset = () => {
  searchQuery.value = "";
  jenisItem.value = "";
  DetailProperties.value.page = 1;
  fetchDetail();
};

// Handle Pagination
const handlePage = (event: any) => {
  DetailProperties.value.page = event.page + 1;
  DetailProperties.value.page_size = event.rows;
  fetchDetail();
};

onMounted(() => {
  if (props.selectedData?.uuid) {
    fetchDetail();
  }
});
</script>

<template>
  <Card pt:body:class="h-full pt-0 pb-0 overflow-auto" pt:content:class="h-full overflow-hidden" class="h-full overflow-hidden overflow-y-auto">
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
                :model="[
                  {
                    label: props.selectedData?.noStokOpname,
                  },
                ]"
              >
              </CustomBreadCrumb>
              <CustomChip
                :showCheckedIcon="false"
                :label="props.selectedData?.status"
                bgColor="bg-mint-75"
                textColor="text-mint-400"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
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
          <div class="grid grid-cols-6 gap-6 mt-[10px]">
            <!-- No. Stok Opname -->
            <div>
              <div class="font-semibold underline text-SM">No. Stok Opname</div>
              <div class="font-normal text-normal">{{}}</div>
            </div>
            <!-- Tgl. Cut Off -->
            <div>
              <div class="font-semibold underline text-SM">Tgl. Cut Off</div>
              <div class="font-normal text-normal">
                {{ epochToDate(props.selectedData?.tanggalCutOff, "date") }}
              </div>
            </div>
            <!-- Judul Stok Opname -->
            <div>
              <div class="font-semibold underline text-SM">
                Judul Stok Opname
              </div>
              <div class="font-normal text-normal">{{}}</div>
            </div>
            <!-- Jenis Stok -->
            <div>
              <div class="font-semibold underline text-SM">Jenis Stok</div>
              <div class="font-normal text-normal">{{}}</div>
            </div>
            <!-- Kategori Item -->
            <div>
              <div class="font-semibold underline text-SM">Kategori Item</div>
              <div class="font-normal text-normal">{{}}</div>
            </div>
            <!-- Jenis Item -->
            <div>
              <div class="font-semibold underline text-SM">Jenis Item</div>
              <div class="font-normal text-normal">{{}}</div>
            </div>
          </div>
          <hr class="border-grey-200 mt-[10px]" />
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
      <div class="flex flex-col gap-4">
        <div class="flex items-end gap-7">
          <CustomTextfield
            label="Cari Nama Item / Kode Item"
            class="grow"
            placeholder="Masukkan judul Stok Opname"
          />
          <CustomSelect
            label="Jenis Item"
            placeHolder="Pilih Jenis Item"
            v-model="jenisItem"
            :options="optionJenis"
            optionLabel="name"
            optionValue="value"
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
        <div>
          <NoData v-if="!hasData" />
          <DataTable
            v-else
            :value="DetailPayload"
            stripedRows
            class="text-xs"
            scrollable
            scrollHeight="flex"
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
                <div class="text-SM">{{ slotProps.data.namaItem }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    v-if="slotProps.data.kategoriItem == 'medis'"
                    label="MEDIS"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                  />
                  <CustomChip
                    v-if="slotProps.data.kategoriItem == 'non-medis'"
                    label="NON-MEDIS"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    class="ml-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.jenisItems == 'obat'"
                    label="OBAT"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    class="ml-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.jenisItems == 'alkes'"
                    label="ALKES"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    class="ml-[5px]"
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
            <Column headerClass="bg-adameds-50" class="w-[100px]">
              <template #header>
                <div class="font-semibold">Stok Fisik</div>
              </template>
              <template #body="slotProps">
                <div class="font-normal text-SM">
                  {{ slotProps.data.stokFisik }}
                </div>
                <div class="font-normal text-[8px] text-adameds-300">
                  Tablet
                </div>
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
          </DataTable>
        </div>
        <div class="flex justify-end">
          <CustomPaginator
            :rows="DetailProperties.page_size"
            :totalRecords="DetailProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <hr class="border-grey-200" />
      <div class="flex gap-5 mb-[20px] mt-[20px]">
        <CustomButton
          label="Cetak"
          class="my-auto bg-adameds-300"
          icon="PhPrinter"
        />
        <div>
          <div class="font-semibold underline text-SM">Total Item SO</div>
          <div class="font-normal text-normal">0 item</div>
        </div>
        <div>
          <div class="font-semibold underline text-SM">Tgl. Selesai SO</div>
          <div class="font-normal text-normal">01-01-2024</div>
        </div>
        <div>
          <div class="font-semibold underline text-SM">Petugas SO</div>
          <div class="font-normal text-normal">Nama Petugas</div>
        </div>
      </div>
    </template>
  </Card>
</template>
