<script setup lang="ts">
import { ref } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";


const addKategoriDialog = ref(false);
const rowsPerPage = ref(10);
const currentPage = ref(0);
const status = ref(false);

const handleRowsUpdate = (newRows: number) => {
  rowsPerPage.value = newRows;
  currentPage.value = 0;
};

const handlePageUpdate = (newPage: number) => {
  currentPage.value = newPage;
};

const dataBedruangan = ref([
  { namaRuangan: "Ruangan 1", jumlahBed: "10", status: "AKTIF" },
  { namaRuangan: "Ruangan 2", jumlahBed: "15", status: "AKTIF" },
  { namaRuangan: "Ruangan 3", jumlahBed: "17", status: "AKTIF" },
  { namaRuangan: "Ruangan 4", jumlahBed: "18", status: "AKTIF" },
  { namaRuangan: "Ruangan 5", jumlahBed: "12", status: "NON-AKTIF" },
  { namaRuangan: "Ruangan 6", jumlahBed: "15", status: "NON-AKTIF" },
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
          :value="dataBedruangan"
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
            field="kodeKategoriPemeriksaan"
            header="Kode Kategori Pemeriksaan"
            headerClass="bg-adameds-50"
            class="w-[25%]"
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.namaRuangan }}</div>
            </template>
          </Column>
          <Column
            field="namaKategoriPemeriksaan"
            header="Nama Kategori Pemeriksaan"
            headerClass="bg-adameds-50"
            class="w-[55%]"
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.namaRuangan }}</div>
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
              <div class="flex items-center justify-center text-SM">{{ slotProps.data.jumlahBed }}</div>
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
                  :label="slotProps.data.status"
                  :textColor="
                    slotProps.data.status === 'AKTIF'
                      ? 'text-white'
                      : 'text-[#80868d]'
                  "
                  :bgColor="
                    slotProps.data.status === 'AKTIF'
                      ? 'bg-adameds-300'
                      : 'bg-white'
                  "
                  :borderColor="
                    slotProps.data.status === 'AKTIF'
                      ? 'border-none'
                      : 'border-[#80868d]'
                  "
                  :icon-color="
                    slotProps.data.status === 'AKTIF' ? 'white' : '#80868d'
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
                >
                  <img src="@/assets/icons/edit.svg" alt="" />
                </CustomButton>
                <CustomButton
                  label=""
                  background-color="bg-danger-300 rounded-lg"
                  class="h-6 w-[26px] p-0"
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
            :rows="rowsPerPage"
            :totalRecords="dataBedruangan.length"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>

    <!-- addKategoriDialog -->
    <CustomDialog v-model:visible="addKategoriDialog" :style="{ width: '600px' }">
      <template #header>
        <div class="grid grid-cols-1">
          <p>Tambah Data Kategori Pemeriksaan</p>
        </div>
      </template>
      <template #body>
        <div class="grid grid-cols-[35%,45%,10%] gap-3">
          <div class="mt-[20px]">
            <CustomTextfield
              label="Kode Kategori Pemeriksaan"
              placeholder="Kode Kategori Pemeriksaan"
              class="mr-2"
            />
          </div>
          <div class="mt-[20px]">
            <CustomTextfield
              label="Nama Kategori Pemeriksaan"
              placeholder="Nama Kategori Pemeriksaan"
              class="mr-2"
            />
          </div>
          <div class="mt-[20px]">
           <CustomInputNumber
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
              @click="addKategoriDialog = false"
            />
            <CustomButton label="Simpan" />
          </div>
        </div>
      </template>
    </CustomDialog>
    
  </div>
</template>
