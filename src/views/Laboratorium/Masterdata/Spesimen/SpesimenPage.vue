<script setup lang="ts">
import { ref, onMounted } from "vue";
import { utilsStore } from "@/stores/utils";
import { useSpesimenLabStore } from "@/stores/datamasterLaboratorium/spesimenLab";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import DialogDelete from "../../Layout/DialogDelete.vue";
import DialogSpesimen from "./DialogSpesimen.vue";

const spesimenStore = useSpesimenLabStore();
const storeUtils = utilsStore();
const spesimenPayload = ref(<any[]>[]);
const searchQuery = ref("");
const spesimenProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const handleSearchQuery = (searchValue: string) => {
  searchQuery.value = searchValue;
};

// Fetch data
const fetchSpesimen = async () => {
  storeUtils.setLoading(true);
  try {
    const response = await spesimenStore.getApi({
      page: spesimenProperties.value.page,
      limit: spesimenProperties.value.page_size,
      name: searchQuery.value,
    });
    if (response && response.payload) {
      spesimenProperties.value.total = response.payload.pagination.total;
      spesimenPayload.value = response.payload.data;
    } else {
      spesimenPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch spesimen", error);
    spesimenPayload.value = [];
  } finally {
    storeUtils.setLoading(false);
  }
};

// Add and edit Spesimen
const spesimenDialogRef = ref();

// Fungsi untuk membuka dialog tambah data
const openAddDialog = () => {
  spesimenDialogRef.value.resetForm(); // Reset form sebelum membuka dialog
  spesimenDialogRef.value.visible = true; // Buka dialog
};

// Fungsi untuk membuka dialog edit data
const editDialog = (item: any) => {
  spesimenDialogRef.value.editMode = true;
  spesimenDialogRef.value.selectedSpesimenId = item.uuid;
  spesimenDialogRef.value.kodeSpesimen = item.code;
  spesimenDialogRef.value.namaSpesimen = item.name;
  spesimenDialogRef.value.status = item.status;
  spesimenDialogRef.value.visible = true;
};
const submitSpesimen = async (payload: any) => {
  storeUtils.setLoading(true);
  try {
    let response;
    if (payload.id) {
      response = await spesimenStore.putApi(payload.id, payload);
    } else {
      response = await spesimenStore.postApi(payload);
    }

    if (response) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      searchQuery.value = "";
      await fetchSpesimen();
      resetForm();
      spesimenDialogRef.value.visible = false;
    }
  } catch (error) {
    console.error("Error submitting data", error);
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
      await spesimenStore.deleteApi(item.uuid);
      fetchSpesimen();
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
  spesimenDialogRef.value?.resetForm();
};

// Handle Page
const handlePage = (event: any) => {
  spesimenProperties.value.page = event.page + 1;
  spesimenProperties.value.page_size = event.rows;
  fetchSpesimen();
};

onMounted(async () => {
  await fetchSpesimen();
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
                    Spesimen
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
                label="Cari Spesimen"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Spesimen"
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
          :value="spesimenPayload"
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
            field="kodeSpesimen"
            header="Kode Spesimen"
            headerClass="bg-adameds-50"
            class="w-[25%]"
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.code }}</div>
            </template>
          </Column>
          <Column
            field="namaSpesimen"
            header="Nama Spesimen"
            headerClass="bg-adameds-50"
            class="w-[55%]"
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.name }}</div>
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
            :rows="spesimenProperties.page_size"
            :totalRecords="spesimenProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>

    <!-- DialogSpesimen -->
    <DialogSpesimen
      ref="spesimenDialogRef"
      @submit="submitSpesimen"
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
