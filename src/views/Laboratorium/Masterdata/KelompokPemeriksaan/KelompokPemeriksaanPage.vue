<script setup lang="ts">
import { ref, onMounted } from "vue";
import { utilsStore } from "@/stores/utils";
import { useKelompokPemeriksaanStore } from "@/stores/datamasterLaboratorium/kelompokPemeriksaan";
import { useItemPemeriksaanStore } from "@/stores/datamasterLaboratorium/itemPemeriksaanLab";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import DialogKelompokPemeriksaan from "./DialogKelompokPemeriksaan.vue";
import DialogDelete from "@/views/Laboratorium/Layout/DialogDelete.vue";

const addKelompokDialog = ref(false);
const utils = utilsStore();
const kelompokPemeriksaanStore = useKelompokPemeriksaanStore();
const kelompokPemeriksaanPayload = ref(<any[]>[]);
const kelompokPemeriksaanProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const searchQuery = ref("");
const itemPemeriksaanStore = useItemPemeriksaanStore();
const itemPemeriksaanPayload = ref(<any[]>[]);

const fetchKelompokPemeriksaan = async () => {
  utils.setLoading(true);
  try {
    const response = await kelompokPemeriksaanStore.getApi({
      page: kelompokPemeriksaanProperties.value.page,
      limit: kelompokPemeriksaanProperties.value.page_size,
      name: searchQuery.value,
    });
    if (response && response.payload) {
      kelompokPemeriksaanProperties.value.total =
        response.payload.pagination.total;
      kelompokPemeriksaanPayload.value = response.payload.data;
    } else {
      kelompokPemeriksaanPayload.value = [];
    }
  } catch (error) {
    console.error("Error fetching kelompok pemeriksaan:", error);
    kelompokPemeriksaanPayload.value = [];
  } finally {
    utils.setLoading(false);
  }
};

const fetchItemPemeriksaan = async () => {
  try {
    const response = await itemPemeriksaanStore.getApi();
    if (response && response.payload) {
      itemPemeriksaanPayload.value = response.payload.data;
    } else {
      itemPemeriksaanPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch", error);
    itemPemeriksaanPayload.value = [];
  }
};

// Handle Page
const handlePage = (event: any) => {
  kelompokPemeriksaanProperties.value.page = event.page + 1;
  kelompokPemeriksaanProperties.value.page_size = event.rows;
  fetchKelompokPemeriksaan();
};

// Delete Data
const isDeleteDialogVisible = ref(false);
const dialogConfig = ref({
  method: "",
  title: "",
  data: {},
});

const openDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  addKelompokDialog.value = true;
};
const deleteDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  isDeleteDialogVisible.value = true;
};

const confirmDelete = async (item: any) => {
  if (item) {
    utils.setLoading(true);
    try {
      await kelompokPemeriksaanStore.deleteApi(item.uuid);
      fetchKelompokPemeriksaan();
    } catch (error) {
      console.error("Failed to delete data", error);
    } finally {
      utils.setLoading(false);
      isDeleteDialogVisible.value = false;
    }
  }
};

onMounted(() => {
  fetchKelompokPemeriksaan();
  fetchItemPemeriksaan();
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
                    Kelompok Pemeriksaan
                  </p>
                </div>
              </div>
              <CustomButton
                @click="openDialog('add', 'Tambah')"
                icon="PhPlus"
                label="Data"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 mt-[10px]">
              <CustomTextfield
                label="Cari Kelompok Pemeriksaan"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Kelompok Pemeriksaan"
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
          :value="kelompokPemeriksaanPayload"
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
            field="kodeKelompokPemeriksaan"
            header="Kode Kelompok Pemeriksaan"
            headerClass="bg-adameds-50"
            class="w-[25%]"
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.code }}</div>
            </template>
          </Column>
          <Column
            field="namaKelompokPemeriksaan"
            header="Nama Kelompok Pemeriksaan"
            headerClass="bg-adameds-50"
            class=""
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.name }}</div>
            </template>
          </Column>
          <Column
            field="itemPemeriksaan"
            header="Item Pemeriksaan"
            headerClass="bg-adameds-50 font-semibold text-SM"
          >
            <template #body="slotProps">
              <div class="flex flex-wrap gap-2 text-SM">
                <div
                  v-for="items in slotProps.data.itemPemeriksaan"
                  :key="items"
                >
                  <CustomChip
                    :label="items.name"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    customClass="h-6"
                    class="mr-[5px]"
                  />
                </div>
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
                  @click="openDialog('edit', 'Edit Data', slotProps.data)"
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
            :rows="kelompokPemeriksaanProperties.page_size"
            :totalRecords="kelompokPemeriksaanProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>

    <!-- addKelompokDialog -->
    <DialogKelompokPemeriksaan
      v-model:isDialogVisible="addKelompokDialog"
      :title="dialogConfig.title"
      :method="dialogConfig.method"
      :payload="dialogConfig.data"
      :dataItemPemeriksaan="itemPemeriksaanPayload"
      @data-updated="fetchKelompokPemeriksaan"
    />

    <DialogDelete
      v-model:isDialogVisible="isDeleteDialogVisible"
      :title="dialogConfig.title"
      :itemToDelete="dialogConfig.data"
      @delete="confirmDelete"
    />
  </div>
</template>
