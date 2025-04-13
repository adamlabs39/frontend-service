<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { utilsStore } from "@/stores/utils";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import TambahDataItem from "@/views/Laboratorium/Masterdata/ItemPemeriksaan/TambahData.vue";
import DialogNilaiRujukanAngka from "./DialogNilaiRujukanAngka.vue";
import DialogRujukanText from "./DialogRujukanText.vue";
import { useItemPemeriksaanStore } from "@/stores/datamasterLaboratorium/itemPemeriksaanLab";
import DialogDelete from "../../Layout/DialogDelete.vue";

const addItemDialog = ref(false);

const nilaiRujukanText = ref(false);
const UseUtilsStore = utilsStore();
const itemPemeriksaanStore = useItemPemeriksaanStore();

const itemPemeriksaanProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const itemPemeriksaanPayload = ref(<any>[]);
const searchQuery = ref("");
const handleSearchQuery = (searchValue: string) => {
  searchQuery.value = searchValue;
};

// Fetch Data Item Pemeriksaan
const fetchItemPemeriksaan = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await itemPemeriksaanStore.getApi({
      page: itemPemeriksaanProperties.value.page,
      limit: itemPemeriksaanProperties.value.page_size,
      name: searchQuery.value,
    });
    console.log("Response", response);

    if (response && response.payload) {
      itemPemeriksaanProperties.value.total = response.payload.pagination.total;
      itemPemeriksaanPayload.value = response.payload.data;
    } else {
      itemPemeriksaanPayload.value = [];
    }
    console.log("Data Kategori Pemeriksaan", itemPemeriksaanPayload.value);
  } catch (error) {
    console.error("Failed to fetch data", error);
    itemPemeriksaanPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

//  dialog rujukan angka
const nilaiRujukanAngka = ref(false);
const dialogNilaiRujukanAngkaConfig = ref<any>({
  method: "add",
  data: null,
});
const dialogNilaiRujukanAngka = (method: string, data: any = null) => {
  dialogNilaiRujukanAngkaConfig.value = { method, data };
  nilaiRujukanAngka.value = true;
};

// Add and edit
const tambahDataDialogRef = ref();

// Fungsi untuk membuka dialog tambah data
const openAddDialog = () => {
  tambahDataDialogRef.value.resetForm(); // Reset form sebelum membuka dialog
  tambahDataDialogRef.value.visible = true; // Buka dialog
};

// Fungsi untuk membuka dialog edit data
const editDialog = (item: any) => {
  tambahDataDialogRef.value.editMode = true;
  tambahDataDialogRef.value.selectedItemId = item.uuid;
  tambahDataDialogRef.value.kategoriPemeriksaan = item.categoryPemeriksaanUuid;
  tambahDataDialogRef.value.satuan = item.satuan;
  tambahDataDialogRef.value.metode = item.metode;
  tambahDataDialogRef.value.noUrut = item.noUrut;
  tambahDataDialogRef.value.jenisInput = item.jenisInput;
  tambahDataDialogRef.value.nilaiRujukan = item.nilaiRujukan;
  tambahDataDialogRef.value.pilihanHasilItemPemeriksaans =
    item.pilihanHasilItemPemeriksaans;
  tambahDataDialogRef.value.loinc = item.loincUuid;
  tambahDataDialogRef.value.code = item.code;
  tambahDataDialogRef.value.name = item.name;
  tambahDataDialogRef.value.status = item.status;
  tambahDataDialogRef.value.statusNilaiRujukan = item.statusNilaiRujukan;
  tambahDataDialogRef.value.visible = true;
  tambahDataDialogRef.value.icd9 = item.icd9Uuid;
  tambahDataDialogRef.value.snomedCT = item.snomedUuid;
};
const submitData = async (payload: any) => {
  UseUtilsStore.setLoading(true);
  try {
    let response;
    if (payload.id) {
      response = await itemPemeriksaanStore.putApi(payload.id, payload);
    } else {
      response = await itemPemeriksaanStore.postApi(payload);
    }

    if (response) {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      searchQuery.value = "";
      await fetchItemPemeriksaan();
      resetForm();
      tambahDataDialogRef.value.visible = false;
    }
  } catch (error) {
    console.error("Error submitting data", error);
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// Delete Data
const isDeleteDialogVisible = ref(false);
const dialogConfig = ref({
  method: "",
  title: "",
  data: {},
});

const deleteDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  isDeleteDialogVisible.value = true;
};

const confirmDelete = async (item: any) => {
  if (item) {
    UseUtilsStore.setLoading(true);
    try {
      await itemPemeriksaanStore.deleteApi(item.uuid);
      fetchItemPemeriksaan();
    } catch (error) {
      console.error("Failed to delete data", error);
    } finally {
      UseUtilsStore.setLoading(false);
      isDeleteDialogVisible.value = false;
    }
  }
};

// Reset Data
const resetForm = () => {
  tambahDataDialogRef.value?.resetForm();
};

// Handle Page
const handlePage = (event: any) => {
  itemPemeriksaanProperties.value.page = event.page + 1;
  itemPemeriksaanProperties.value.page_size = event.rows;
  fetchItemPemeriksaan();
};

onMounted(async () => {
  await fetchItemPemeriksaan();
});

const jenisInput = ref();
const optionJenisInput = ref([
  { label: "Angka", value: "1" },
  { label: "Text", value: "2" },
  { label: "Long Text", value: "3" },
  { label: "Pilihan", value: "4" },
]);

console.log("jenis input", optionJenisInput.value);

const dataNilaiRujukan = ref([
  {
    item_pemeriksaan_uuid: "019527ec-2459-77dc-97a7-2552a662e521",
    jenis_kelamin: "general",
    umur_bawah_tahun: 1,
    umur_bawah_bulan: 1,
    umur_bawah_hari: 1,
    umur_atas_tahun: 12,
    umur_atas_hari: 1,
    umur_atas_bulan: 1,
    batas_bawah_nilai_normal: 5,
    batas_atas_nilai_normal: 10,
    kritis_bawah: 3,
    kritis_atas: 15,
    operator_kritis_bawah: "<",
    operator_kritis_atas: ">",
    operator_nilai_normal: "-",
    status: true,
    tampilan: "gacor",
    text: [
      "Negative",
      "Negative ",
      "NEGATIVE",
      "NEGATIVE ",
      "negative",
      " negative ",
      "Negatif",
      "Negatif ",
      "NEGATIF",
      " NEGATIF ",
      "negatif",
      "negatif ",
      "-",
      "- ",
      "Neg",
      "Neg ",
      "NEG",
      "NEG ",
      "neg",
      "neg",
      "Negatip",
      "Negatip ",
      "NEGATIP",
      "NEGATIP ",
      "negatip",
      "negatip ",
      "Neg/-",
      "Neg/- ",
      "NEG/-",
      "NEG/- ",
      "neg/-",
      "neg/-",
    ],
  },
]);
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initial-state="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Datamaster',
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
                    Item Pemeriksaan
                  </p>
                </div>
              </div>
              <CustomButton
                @click="openAddDialog"
                icon="PhPlus"
                label="Data"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 mt-[10px]">
              <CustomTextfield
                label="Cari Item Pemeriksaan"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Item Pemeriksaan"
                class=""
              />
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
          :value="itemPemeriksaanPayload"
          tableStyle="min-width: 50rem"
          stripedRows
          class="text-xs"
          scrollable
          scrollHeight="flex"
        >
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="w-full text-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>
          <Column
            field="kodeItem"
            header="Kode Item"
            headerClass="bg-adameds-50"
            class=""
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.code }}</div>
            </template>
          </Column>
          <Column
            field="namaItem"
            header="Nama Item"
            headerClass="bg-adameds-50"
            class=""
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.name }}</div>
            </template>
          </Column>
          <Column
            field="kategori"
            header="Kategori"
            headerClass="bg-adameds-50"
            class=""
          >
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.categoryPemeriksaan.name }}
              </div>
            </template>
          </Column>
          <Column
            field="satuan"
            header="Satuan"
            headerClass="bg-adameds-50"
            class=""
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.satuan }}</div>
            </template>
          </Column>
          <Column
            field="test"
            header="test kolom"
            headerClass="bg-adameds-50"
            class=""
          >
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.uuid }}
              </div>
            </template>
          </Column>
          <Column
            field="metode"
            header="Metode"
            headerClass="bg-adameds-50"
            class=""
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.metode }}</div>
            </template>
          </Column>
          <Column
            headerClass="bg-adameds-50 font-semibold text-SM"
            class="w-[10%]"
          >
            <template #header>
              <div class="w-full text-center">No. Urut</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center text-SM">
                {{ slotProps.data.noUrut }}
              </div>
            </template>
          </Column>
          <Column
            field="status"
            headerClass="bg-adameds-50 font-semibold text-SM"
          >
            <template #header>
              <div class="w-full text-center">Status</div>
            </template>
            <template #body="slotProps">
              <div class="flex justify-center items-center min-w-[120px]">
                <CustomChip
                  :label="
                    slotProps.data.status === true ? 'AKTIF' : 'NON-AKTIF'
                  "
                  :textColor="
                    slotProps.data.status === true
                      ? 'text-white'
                      : 'text-[#80868d]'
                  "
                  :bgColor="
                    slotProps.data.status === true
                      ? 'bg-adameds-300'
                      : 'bg-white'
                  "
                  :borderColor="
                    slotProps.data.status === true
                      ? 'border-none'
                      : 'border-[#80868d]'
                  "
                  :icon-color="
                    slotProps.data.status === true ? 'white' : '#80868d'
                  "
                  customClass="text-xs font-semibold h-5 flex"
                />
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50">
            <template #header="slotProps">
              <div class="w-full font-semibold text-center text-SM">Action</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center gap-2.5 justify-center">
                <CustomButton
                  label=""
                  background-color="bg-[#3D84E5] rounded-lg"
                  @click="editDialog(slotProps.data)"
                  class="h-6 w-[26px] p-0"
                >
                  <img src="@/assets/icons/edit.svg" alt="" />
                </CustomButton>
                <CustomButton
                  v-if="slotProps.data.jenisInput === 'angka'"
                  icon="PhListNumbers"
                  class="h-6 w-[26px] p-0"
                  background-color="rounded-lg bg-adameds-300"
                  @click="dialogNilaiRujukanAngka('detail', slotProps.data)"
                />
                <CustomButton
                  v-if="slotProps.data.jenisInput !== 'angka'"
                  icon="PhListNumbers"
                  class="h-6 w-[26px] p-0"
                  background-color="rounded-lg bg-adameds-300"
                  @click="nilaiRujukanText = true"
                />
                <CustomButton
                  label=""
                  background-color="bg-danger-300 rounded-lg"
                  class="h-6 w-[26px] p-0"
                  @click="
                    deleteDialog(
                      'delete',
                      `${slotProps.data.code}-${slotProps.data.name}`,
                      slotProps.data
                    )
                  "
                >
                  <img src="@/assets/icons/delete.svg" alt="" />
                </CustomButton>
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-between px-5 py-2.5">
          <div class="flex items-center gap-2.5">
            <CustomButton label="Import">
              <img src="@/assets/icons/File Import.svg" alt="" />Import
            </CustomButton>
            <CustomButton label="Eksport">
              <img src="@/assets/icons/File Import.svg" alt="" />Eksport
            </CustomButton>
            <CustomButton label="Eksport" @click="">
              <img src="@/assets/icons/download.svg" alt="" />Download
            </CustomButton>
          </div>
          <CustomPaginator
            :rows="itemPemeriksaanProperties.page_size"
            :totalRecords="itemPemeriksaanProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>

    <!-- nilaiRujukanAngka Dialog -->
    <DialogNilaiRujukanAngka
      v-model:isDialogVisible="nilaiRujukanAngka"
          :method="dialogNilaiRujukanAngkaConfig.method"
          :payload="dialogNilaiRujukanAngkaConfig.data"
    />

    <DialogRujukanText
      v-model:visible="nilaiRujukanText"
      :dataNilaiRujukan="dataNilaiRujukan"
    />

    <TambahDataItem
      ref="tambahDataDialogRef"
      @submit="submitData"
      @reset="resetForm"
    />
    <DialogDelete
      v-model:isDialogVisible="isDeleteDialogVisible"
      :title="dialogConfig.title"
      :itemToDelete="dialogConfig.data"
      @delete="confirmDelete"
    />
  </div>
</template>
