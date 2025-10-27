<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { onMounted, ref, watch } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import TambahPermintaanBarang from "./Layout/PermintaanBarang/TambahPermintaanBarang.vue";
import DetailPermintaanBarang from "./Layout/PermintaanBarang/DetailPermintaanBarang.vue";
import { usePermintaanBarangStore } from "@/stores/stok/PermintaanBarang";
import { utilsStore } from "@/stores/utils";
import { formatStringDate } from "@/utils/Helpers";
import NoData from "@/components/section/NoData.vue";

const buttonSelect = ref("request"); //request, canceled, verified
const searchQuery = ref(""); //for search
const useUtilsStore = utilsStore(); //for loading

//variable for debounce search
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

//variable for dialog
const showTambah = ref(false);
const showDetail = ref(false);

//variable for fetch data permintaan barang
const permintaanBarangStore = usePermintaanBarangStore();
const permintaanBarangPayload = ref([]);
const PermintaanBarangProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

//function for fetch data permintaan barang
const fetchPermintaanBarang = async () => {
  useUtilsStore.setLoading(true);
  try {
    const response = await permintaanBarangStore.getAll(
      PermintaanBarangProperties.value.page,
      PermintaanBarangProperties.value.page_size,
      buttonSelect.value, //request, canceled, verified
      searchQuery.value
    );
    permintaanBarangPayload.value = response.payload || [];
    PermintaanBarangProperties.value.total = response.properties.totalData || 0;
    console.log("permintaanBarangPayload:", permintaanBarangPayload.value);
  } catch (error) {
    console.log(error);
  }
  useUtilsStore.setLoading(false);
};

const selectedRow = ref<any | null>(null);

const handlePage = (event: any) => {
  PermintaanBarangProperties.value.page = event.page + 1;
  PermintaanBarangProperties.value.page_size = event.rows;
  fetchPermintaanBarang();
};

const handleRowClick = (event: any) => {
  selectedRow.value = event?.data;
  showDetail.value = true;
  console.log("Navigating to detail with data:", selectedRow.value);
};

// Watcher untuk menangani perubahan status dan pencarian
watch(
  [searchQuery, buttonSelect],
  ([newSearch, newButton], [oldSearch, oldButton]) => {
    // Jika tombol status berubah, fetch langsung dan batalkan debounce yang berjalan
    if (newButton !== oldButton) {
      PermintaanBarangProperties.value.page = 1;
      if (searchTimeout) clearTimeout(searchTimeout);
      fetchPermintaanBarang();
    }

    // Jika pencarian berubah, jalankan fetch dengan debounce 500ms
    if (newSearch !== oldSearch) {
      if (searchTimeout) clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        PermintaanBarangProperties.value.page = 1;
        fetchPermintaanBarang();
      }, 500);
    }
  }
);

onMounted(() => {
  fetchPermintaanBarang();
});
</script>

<template>
  <div>
    <Card
      pt:body:class="overflow-auto pt-0 h-full"
      pt:content:class="overflow-hidden h-full"
      class="overflow-hidden h-full"
      v-if="!showTambah && !showDetail"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Permintaan Barang',
                    home: true,
                  }"
                />
                <PhCaretRight
                  :size="25"
                  weight="bold"
                  class="ml-[10px] mt-[8px] text-adameds-300"
                />
                <div class="">
                  <p
                    class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]"
                  >
                    Permintaan Unit
                  </p>
                </div>
              </div>
              <CustomButton
                icon="PhPlus"
                label="Data"
                class="mr-[10px]"
                @click="showTambah = true"
              />
            </div>
          </template>
          <template #content>
            <div class="space-y-2.5">
              <div class="grid grid-cols-1 mt-[10px]">
                <CustomTextfield
                  v-model="searchQuery"
                  label="Cari Satuan"
                  prependIcon="PhMagnifyingGlass"
                  placeholder="Cari No. Permintaan / Tujuan Permintaan"
                />
              </div>
              <div class="flex gap-5">
                <CustomButton
                  :full="true"
                  label="PERMINTAAN BARANG"
                  :outlined="buttonSelect !== 'request'"
                  borderColor="border-adameds-300"
                  :textColor="
                    buttonSelect === 'request'
                      ? 'text-white'
                      : 'text-adameds-300'
                  "
                  :backgroundColor="
                    buttonSelect === 'request' ? 'bg-adameds-300' : 'bg-white'
                  "
                  @click="buttonSelect = 'request'"
                />
                <CustomButton
                  :full="true"
                  label="DIBATALKAN"
                  :outlined="buttonSelect !== 'cancel'"
                  borderColor="border-adameds-300"
                  :textColor="
                    buttonSelect === 'cancel'
                      ? 'text-white'
                      : 'text-adameds-300'
                  "
                  :backgroundColor="
                    buttonSelect === 'cancel' ? 'bg-adameds-300' : 'bg-white'
                  "
                  @click="buttonSelect = 'cancel'"
                />
                <CustomButton
                  :full="true"
                  label="SUDAH DIVERIFIKASI"
                  :outlined="buttonSelect !== 'verified'"
                  borderColor="border-adameds-300"
                  :textColor="
                    buttonSelect === 'verified'
                      ? 'text-white'
                      : 'text-adameds-300'
                  "
                  :backgroundColor="
                    buttonSelect === 'verified' ? 'bg-adameds-300' : 'bg-white'
                  "
                  @click="buttonSelect = 'verified'"
                />
              </div>
            </div>
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
          v-if="permintaanBarangPayload.length"
          tableStyle="min-width: 50rem"
          stripedRows
          class="text-xs"
          scrollable
          scrollHeight="flex"
          :value="permintaanBarangPayload"
          @row-click="handleRowClick"
        >
          <Column
            field="tanggalPermintaan"
            header="Tanggal"
            headerClass="bg-adameds-50 font-semibold text-SM"
          >
            <template #body="slotProps">
              {{ formatStringDate(slotProps.data.tanggalPermintaan, "date") }}
            </template>
          </Column>

          <Column
            field="noPermintaan"
            header="No. Permintaan"
            headerClass="bg-adameds-50 font-semibold text-SM"
          >
            <template #body="slotProps">
              <div class="space-y-1">
                <div class="font-semibold">
                  {{ slotProps.data.noPermintaan }}
                </div>
                <div class="flex gap-1">
                  <CustomChip
                    v-if="slotProps.data.kategoriItem"
                    :label="slotProps.data.kategoriItem"
                    :outlined="true"
                    :showCheckedIcon="false"
                    :customClass="'h-5 px-2'"
                    borderColor="border-adameds-300"
                    textColor="text-white"
                    bgColor="bg-adameds-300"
                  />
                  <CustomChip
                    v-if="slotProps.data.jenisItem"
                    :label="slotProps.data.jenisItem"
                    :outlined="true"
                    :showCheckedIcon="false"
                    :customClass="'h-5 px-2'"
                    borderColor="border-adameds-300"
                    textColor="text-white"
                    bgColor="bg-adameds-300"
                  />
                  <CustomChip
                    v-if="slotProps.data.cito"
                    :label="'CITO'"
                    :outlined="true"
                    :showCheckedIcon="false"
                    :customClass="'h-5 px-2'"
                    borderColor="border-danger-300"
                    textColor="text-white"
                    bgColor="bg-danger-300"
                  />
                </div>
              </div>
            </template>
          </Column>

          <Column
            field="lokasiTujuan"
            header="Tujuan Permintaan"
            headerClass="bg-adameds-50 font-bold text-SM"
            class="font-bold"
          >
            <template #body="slotProps">
              {{ slotProps.data.lokasiTujuan || "tidak ada" }}
            </template>
          </Column>

          <Column
            field="petugasPermintaan"
            header="Petugas"
            headerClass="bg-adameds-50 font-semibold text-SM"
          />

          <Column
            field="status"
            header="Status"
            headerClass="bg-adameds-50 font-semibold text-SM"
          >
            <template #body="slotProps">
              <CustomChip
                :label="slotProps.data.status"
                :outlined="true"
                :showCheckedIcon="false"
                :customClass="'h-6 px-3'"
                :borderColor="
                  buttonSelect === 'cancel'
                    ? 'border-danger-300'
                    : buttonSelect === 'verified'
                    ? 'border-adameds-300'
                    : 'border-grey-300'
                "
                textColor="text-white"
                :bgColor="
                  buttonSelect === 'cancel'
                    ? 'bg-danger-300'
                    : buttonSelect === 'verified'
                    ? 'bg-adameds-300'
                    : 'bg-grey-300'
                "
              />
            </template>
          </Column>
        </DataTable>
        <NoData v-else />
      </template>
      <template #footer>
        <div class="flex justify-end border-t border-grey-200">
          <CustomPaginator
            :rows="PermintaanBarangProperties.page_size"
            :totalRecords="PermintaanBarangProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
    <!-- Detail -->
    <DetailPermintaanBarang
      v-else-if="showDetail"
      :data="selectedRow"
      @back="showDetail = false"
    />

    <!-- Tambah -->
    <TambahPermintaanBarang v-else @back="showTambah = false" />
  </div>
</template>

<style lang="scss" scoped></style>
