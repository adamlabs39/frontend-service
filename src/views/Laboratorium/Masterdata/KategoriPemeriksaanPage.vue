<script setup lang="ts">
import { ref, onMounted } from "vue";
import { utilsStore } from "@/stores/utils";
import { useKategoriPemeriksaanStore } from "@/stores/datamasterLaboratorium/kategoriPemeriksaan";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import DialogDelete from "@/views/Laboratorium/Layout/DialogDelete.vue";

const storeUtils = utilsStore();
const kategoriPemeriksaanPayload = ref<any[]>([]);
const addKategoriDialog = ref(false);
const status = ref(false);
const kategoriPemeriksaanStore = useKategoriPemeriksaanStore();
const kodeKategoriPemeriksaan = ref("");
const namaKategoriPemeriksaan = ref("");
const noUrut = ref<number>();
const kategoriPemeriksaanProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const searchQuery = ref<string>("");
const handleSearchQuery = (searchValue: string) => {
  searchQuery.value = searchValue;
};

// Fetch Data Kategori Pemeriksaan
const fetchKategoriPemeriksaan = async () => {
  storeUtils.setLoading(true);
  try {
    const response = await kategoriPemeriksaanStore.getApi({
      page: kategoriPemeriksaanProperties.value.page,
      limit: kategoriPemeriksaanProperties.value.page_size,
      name: searchQuery.value,
    });
    console.log("Response", response);

    if (response && response.payload) {
      kategoriPemeriksaanProperties.value.total =
        response.payload.pagination.total;
      kategoriPemeriksaanPayload.value = response.payload.data;
    } else {
      kategoriPemeriksaanPayload.value = [];
    }
    console.log("Data Kategori Pemeriksaan", kategoriPemeriksaanPayload.value);
  } catch (error) {
    console.error("Failed to fetch data", error);
    kategoriPemeriksaanPayload.value = [];
  } finally {
    storeUtils.setLoading(false);
  }
};

// Add Data Kategori Pemeriksaan
const submitKategoriPemeriksaan = async () => {
  storeUtils.setLoading(true);
  try {
    const payload = {
      code: kodeKategoriPemeriksaan.value,
      name: namaKategoriPemeriksaan.value,
      noUrut: noUrut.value,
      status: status.value,
    };
    const response = await kategoriPemeriksaanStore.postApi(payload);

    if (response) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      searchQuery.value = "";
      addKategoriDialog.value = false;
      await fetchKategoriPemeriksaan();
      resetForm();
    }
  } catch (error) {
    console.error("Error submitting data", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

// Edit Data
const editKategoriDialog = ref(false);
const selectedKategori = ref<any>(null);

const openEditDialog = (kategori: any) => {
  selectedKategori.value = kategori;
  kodeKategoriPemeriksaan.value = kategori.code;
  namaKategoriPemeriksaan.value = kategori.name;
  noUrut.value = kategori.noUrut;
  status.value = kategori.status;
  editKategoriDialog.value = true;
};

const updateKategoriPemeriksaan = async () => {
  storeUtils.setLoading(true);
  try {
    const payload = {
      code: kodeKategoriPemeriksaan.value,
      name: namaKategoriPemeriksaan.value,
      noUrut: noUrut.value,
      status: status.value,
    };
    await kategoriPemeriksaanStore.putApi(selectedKategori.value.uuid, payload);
    editKategoriDialog.value = false;
    await fetchKategoriPemeriksaan();
  } catch (error) {
    console.error("Error updating data", error);
  } finally {
    storeUtils.setLoading(false);
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
    storeUtils.setLoading(true);
    try {
      await kategoriPemeriksaanStore.deleteApi(item.uuid);
      fetchKategoriPemeriksaan();
    } catch (error) {
      console.error("Failed to delete data", error);
    } finally {
      storeUtils.setLoading(false);
      isDeleteDialogVisible.value = false;
    }
  }
};

// Reset Data
const resetForm = () => {
  kodeKategoriPemeriksaan.value = "";
  namaKategoriPemeriksaan.value = "";
  noUrut.value = 0;
  status.value = false;
};

// Handle Pagination
const handlePage = (event: any) => {
  kategoriPemeriksaanProperties.value.page = event.page + 1;
  kategoriPemeriksaanProperties.value.page_size = event.rows;
  fetchKategoriPemeriksaan();
};

onMounted(async () => {
  await fetchKategoriPemeriksaan();
});
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
                    Kategori Pemeriksaan
                  </p>
                </div>
              </div>
              <CustomButton
                @click="addKategoriDialog = true"
                icon="PhPlus"
                label="Data"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 mt-[10px]">
              <CustomTextfield
                v-model="searchQuery"
                @input="handleSearchQuery($event.target.value)"
                label="Cari Kategori Pemeriksaan"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Kategori Pemeriksaan"
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
          :value="kategoriPemeriksaanPayload"
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
            field="code"
            header="Kode Kategori Pemeriksaan"
            headerClass="bg-adameds-50"
            class="w-[25%]"
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.code }}</div>
            </template>
          </Column>
          <Column
            field="namaKategoriPemeriksaan"
            header="Nama Kategori Pemeriksaan"
            headerClass="bg-adameds-50"
            class="w-[55%]"
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.name }}</div>
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
                  class="h-6 w-[26px] p-0"
                  @click="openEditDialog(slotProps.data)"
                >
                  <img src="@/assets/icons/edit.svg" alt="edit" />
                </CustomButton>
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
            :rows="kategoriPemeriksaanProperties.page_size"
            :totalRecords="kategoriPemeriksaanProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>

    <!-- addKategoriDialog -->
    <CustomDialog
      v-model:visible="addKategoriDialog"
      :style="{ width: '600px' }"
    >
      <template #header>
        <div class="grid grid-cols-1">
          <p>Tambah Data Kategori Pemeriksaan</p>
        </div>
      </template>
      <template #body>
        <div class="grid grid-cols-[35%,45%,10%] gap-3">
          <div class="mt-[20px]">
            <CustomTextfield
              v-model="kodeKategoriPemeriksaan"
              label="Kode Kategori Pemeriksaan"
              placeholder="Kode Kategori Pemeriksaan"
              class="mr-2"
            />
          </div>
          <div class="mt-[20px]">
            <CustomTextfield
              v-model="namaKategoriPemeriksaan"
              label="Nama Kategori Pemeriksaan"
              placeholder="Nama Kategori Pemeriksaan"
              class="mr-2"
            />
          </div>
          <div class="mt-[20px]">
            <CustomInputNumber
              v-model="noUrut"
              label="No. Urut"
              :show-buttons="false"
              class="text-center"
            />
          </div>
        </div>

        <hr class="mt-[20px] border border-slate-200" />
        <div class="grid grid-cols-1 mt-[15px]">
          <div>
            <CustomSwitch
              v-model="status"
              :show-label="true"
              label="Status"
              sideLabel="NON-AKTIF"
              sideLabelTrue="AKTIF"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="w-full">
          <!-- <hr class="-mx-5 border-grey-200" /> -->
          <div class="mt-5 flex justify-end gap-2.5">
            <CustomButton
              label="Reset"
              textColor="text-grey-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-grey-200"
              @click="resetForm"
            />
            <CustomButton label="Simpan" @click="submitKategoriPemeriksaan" />
          </div>
        </div>
      </template>
    </CustomDialog>

    <!-- editKategoriDialog -->
    <CustomDialog
      v-model:visible="editKategoriDialog"
      :style="{ width: '600px' }"
    >
      <template #header>
        <div class="grid grid-cols-1">
          <p>Edit Data Kategori Pemeriksaan</p>
        </div>
      </template>
      <template #body>
        <div class="grid grid-cols-[35%,45%,10%] gap-3">
          <div class="mt-[20px]">
            <CustomTextfield
              v-model="kodeKategoriPemeriksaan"
              label="Kode Kategori Pemeriksaan"
              placeholder="Kode Kategori Pemeriksaan"
              class="mr-2"
            />
          </div>
          <div class="mt-[20px]">
            <CustomTextfield
              v-model="namaKategoriPemeriksaan"
              label="Nama Kategori Pemeriksaan"
              placeholder="Nama Kategori Pemeriksaan"
              class="mr-2"
            />
          </div>
          <div class="mt-[20px]">
            <CustomInputNumber
              v-model="noUrut"
              label="No. Urut"
              :show-buttons="false"
              class="text-center"
            />
          </div>
        </div>

        <hr class="mt-[20px] border border-slate-200" />
        <div class="grid grid-cols-1 mt-[15px]">
          <div>
            <CustomSwitch
              v-model="status"
              :show-label="true"
              label="Status"
              sideLabel="NON-AKTIF"
              sideLabelTrue="AKTIF"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="w-full">
          <div class="mt-5 flex justify-end gap-2.5">
            <CustomButton
              label="Batal"
              textColor="text-grey-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-grey-200"
              @click="editKategoriDialog = false"
            />
            <CustomButton label="Simpan" @click="updateKategoriPemeriksaan" />
          </div>
        </div>
      </template>
    </CustomDialog>

    <DialogDelete
      v-model:isDialogVisible="isDeleteDialogVisible"
      :title="dialogConfig.title"
      :itemToDelete="dialogConfig.data"
      @delete="confirmDelete"
    />
  </div>
</template>
