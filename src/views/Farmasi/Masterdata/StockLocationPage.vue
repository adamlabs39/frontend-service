<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const emits = defineEmits(['update:rows', 'update:current-page']);
const lokasiStokDialog = ref(false);
const selectedJenisLokasi = ref();
const selectedTujuanOrder = ref();
const status = ref(false);
const rowsPerPage = ref(10);
const currentPage = ref(0);

const handleRowsUpdate = (newRows: number) => {
  rowsPerPage.value = newRows;
  currentPage.value = 0;
};

const handlePageUpdate = (newPage: number) => {
  currentPage.value = newPage;
};

const filterLokasi = ref([
  "GUDANG",
  "DEPO PELAYANAN"
]);

const selectedFilterLokasi = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  if (selectedFilterLokasi.value.includes(label)) {
    // console.log(selectedFilterLokasi, 'selectedFilterLokasi');
    
    selectedFilterLokasi.value = selectedFilterLokasi.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterLokasi.value.push(label);
  }
};

const dataLokasiStok = ref([
  { kodeLokasi: "GFM", namaLokasi: "Gudang Farmasi", jenisLokasi: "GUDANG", tujuanOrder: "-", status:"NON-AKTIF" },
  { kodeLokasi: "GLG", namaLokasi: "Gudang Logistik", jenisLokasi: "DEPO PELAYANAN", tujuanOrder: "-", status:"NON-AKTIF" },
  { kodeLokasi: "FRJ", namaLokasi: "Farmasi Rawat Jalan", jenisLokasi: "GUDANG", tujuanOrder: "Rawat Jalan", status:"AKTIF" },
  { kodeLokasi: "FRI", namaLokasi: "Farmasi Rawat Inap", jenisLokasi: "DEPO PELAYANAN", tujuanOrder: "Rawat Inap", status:"AKTIF" },
  { kodeLokasi: "FGD", namaLokasi: "Farmasi IGD", jenisLokasi: "DEPO PELAYANAN", tujuanOrder: "IGD", status:"AKTIF" },
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
        <CustomAccordion :openWithHeader="false" noBorder>
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
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300" />
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Lokasi Stok</p>
                </div>
              </div>
              <CustomButton
                @click="lokasiStokDialog = true"
                icon="PhPlus"
                label="Data"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 mt-[10px]">
              <CustomTextfield
                label="Cari Lokasi Stok"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Lokasi Stok"
                class=""
              />
            </div>
            <!-- Filter Jenis Lokasi -->
            <div class="flex mb-[10px] mt-5">
              <div class="w-[15%] font-semibold text-SM text-grey-300">Filter Jenis Lokasi</div>
                <div class="flex">
                  <span class="font-semibold text-grey-300">|</span>
                  <CustomChip
                    v-for="(lokasiStok, index) in filterLokasi" :key="lokasiStok + index"
                    :label="lokasiStok"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-50"
                    iconColor="text-adameds-300"
                    textColor="text-adameds-300"
                    customClass="h-7"
                    class="ml-[10px]"
                    :isSelected="selectedFilterLokasi.includes(lokasiStok)"
                    @selected="onPoliSelect"
                    selectedColor="bg-adameds-300 border-adameds-300"
                  />
                </div>
            </div>
            <hr class="mt-5 border-[1px] border-grey-200">
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
          :value="dataLokasiStok"
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
          <Column field="kodeLokasi" header="Kode Lokasi Stok" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <Column field="namaLokasi" header="Nama Lokasi Stok" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <Column field="jenisLokasi" header="Jenis Lokasi" headerClass="bg-adameds-50 font-semibold text-SM">
            <template #body="slotProps">
              <CustomChip
                :label="slotProps.data.jenisLokasi"
                :showCheckedIcon="false"
                borderColor="border-adameds-300"
                bgColor="bg-adameds-300" 
                textColor="text-white"
                customClass="h-6"
              />
            </template>
          </Column>
          <Column field="tujuanOrder" header="Default Tujuan Order & Permintaan" headerClass="bg-adameds-50 font-semibold text-SM">
            <template #body="slotProps">
              <div v-if="slotProps.data.tujuanOrder == '-'">
                <p class="font-bold">-</p>
              </div>
              <div v-else>
                <CustomChip
                  :label="slotProps.data.tujuanOrder"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                  customClass="h-6"
                />
              </div>
            </template>
          </Column>
          <Column field="status" headerClass="bg-adameds-50 font-semibold text-SM">
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
              <div class="w-full font-semibold text-center text-SM">
                Action
              </div>
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
          </div>
          <CustomPaginator
            :rows="rowsPerPage"
            :totalRecords="dataLokasiStok.length"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>
    <CustomDialog v-model:visible="lokasiStokDialog" width="500px">
      <template #header>
        <div class="grid grid-cols-1">
          <p>Tambah Lokasi Stok</p>
        </div>
      </template>
      <template #body>
        <div class="grid grid-cols-[30%,70%]">
          <div class="mt-[20px]">
            <CustomTextfield
              label="Kode Lokasi Stok"
              placeholder="Kode Lokasi Stok"
              class="mr-2"
            />
          </div>
          <div class="mt-[20px]">
            <CustomTextfield
              label="Nama Lokasi Stok"
              placeholder="Nama Lokasi Stok"
              class="ml-2"
            />
          </div>
        </div>
        <div class="grid grid-cols-1">
          <div class="mt-[20px]">
            <CustomSelect
              place-holder="Pilih Jenis Lokasi"
              label="Pilih Jenis Lokasi"
              v-model="selectedJenisLokasi"
              optionLabel=""
              optionValue=""
              :options="['Gudang', 'Depo Pelayanan']"
            />
          </div>
        </div>
        <div class="grid grid-cols-1" v-if="selectedJenisLokasi == 'Depo Pelayanan'">
          <div class="mt-[20px]">
            <CustomMultiSelect
              placeholder="Pilih Tujuan Order & Permintaan"
              label="Default Tujuan Order & Permintaan"
              v-model="selectedTujuanOrder"
              optionLabel=""
              optionValue=""
              :maxSelectedLabels="3"
              :options="['Rawat Jalan', 'Rawat Inap', 'IGD']"
            />
          </div>
        </div>
        <hr class="mt-[20px] border border-slate-300"/>
        <div class="grid grid-cols-2 mt-[15px]">
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
            />
            <CustomButton label="Simpan"/>
          </div>
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
