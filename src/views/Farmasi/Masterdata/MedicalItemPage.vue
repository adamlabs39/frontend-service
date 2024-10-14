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
import { log } from "console";

const emits = defineEmits(['update:rows', 'update:current-page']);
const itemMedisDialog = ref(false);
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
  "TUNAI",
  "BPJS"
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

const dataItemMedis = ref([
  { kodeItem: "OBT.12345", namaItem: "Gudang Farmasi", jenisItem: "Obat", jenisStok: "TUNAI", pabrik: "PT. SANBE", status:"NON-AKTIF" },
  { kodeItem: "ALK.12345", namaItem: "Gudang Logistik", jenisItem: "Alkes", jenisStok: "TUNAI", pabrik: "PT. SANBE", status:"NON-AKTIF" },
  { kodeItem: "OBT.12345", namaItem: "Farmasi Rawat Jalan", jenisItem: "Obat", jenisStok: "BPJS", pabrik: "PT. KIMIA FARMA", status:"AKTIF" },
  { kodeItem: "ALK.12345", namaItem: "Farmasi Rawat Inap", jenisItem: "Alkes", jenisStok: "BPJS", pabrik: "PT. SANBE", status:"AKTIF" },
  { kodeItem: "OBT.12345", namaItem: "Farmasi IGD", jenisItem: "Obat", jenisStok: "TUNAI", pabrik: "PT. KIMIA FARMA", status:"AKTIF" },
]);

const dataKonversi = [
  { no: 1, pembelian: "Box", penggunaan: "Pcs", konversi: "1"},
];
const dataKonversi2 = ref([]);
const newDataKonversi = ref([...dataKonversi]);
const addRow = () => {
  newDataKonversi.value.push({
    no: newDataKonversi.value.length + 1,
    pembelian: "",
    penggunaan: "",
    konversi: ""
  });
};

const deleteRow = (index: any) => {
  // console.log(index, 'index');
  newDataKonversi.value.splice(index);
};


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
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Item Medis</p>
                </div>
              </div>
              <CustomButton
                @click="itemMedisDialog = true"
                icon="PhPlus"
                label="Data"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 mt-[10px]">
              <CustomTextfield
                label="Cari Item Medis"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama Item Medis (Obat / Alkes / dll)"
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
          :value="dataItemMedis"
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
          <Column field="kodeItem" header="Kode Item" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <Column field="namaItem" header="Nama Item Medis (Obat, Alkes, dll)" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <Column field="jenisItem" header="Jenis Item" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <Column field="jenisStok" header="Jenis Stok" headerClass="bg-adameds-50 font-semibold text-SM">
            <template #body="slotProps">
              <div>
                <CustomChip
                  :label="slotProps.data.jenisStok"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                  customClass="h-6"
                />
              </div>
            </template>
          </Column>
          <Column field="pabrik" header="Pabrik" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
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
            :totalRecords="dataItemMedis.length"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>
    
    <CustomDialog v-model:visible="itemMedisDialog" width="600px">
      <template #header>
        <div class="grid grid-cols-1">
          <p>Tambah Item Medis</p>
        </div>
      </template>
      <template #body>
        <div class="grid grid-cols-[30%,70%]">
          <!-- Kode Item Medis -->
          <div class="mt-[20px]">
            <CustomTextfield
              label="Kode Item Medis"
              placeholder="Kode Item Medis"
              class="mr-2"
            />
          </div>
          <!-- Nama Item Medis -->
          <div class="mt-[20px]">
            <CustomTextfield
              label="Nama Item Medis"
              placeholder="Nama Item Medis"
              class="ml-2"
            />
          </div>
          <!-- Jenis Item  -->
          <div class="mt-[20px]">
            <CustomSelect
              place-holder="Pilih Jenis Item"
              label="Jenis Item"
              optionLabel=""
              optionValue=""
              :options="['Gudang', 'Depo Pelayanan']"
              class="mr-2"
            />
          </div>
          <!-- Satuan Penggunaan -->
          <div class="mt-[20px]">
            <CustomSelect
              place-holder="Pilih Satuan Penggunaan"
              label="Satuan Penggunaan"
              optionLabel=""
              optionValue=""
              :options="['Gudang', 'Depo Pelayanan']"
              class="ml-2"
            />
          </div>
        </div>
        
        <!-- Jenis Stok -->
        <div class="grid grid-cols-1">
          <div class="mt-[20px]">
            <CustomMultiSelect
              placeholder="Pilih Jenis Stok"
              label="Jenis Stok"
              v-model="selectedTujuanOrder"
              optionLabel=""
              optionValue=""
              :maxSelectedLabels="3"
              :options="['TUNAI', 'BPJS']"
            />
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-2">
          <!-- Pabrik -->
          <div class="mt-[20px]">
            <CustomSelect
              place-holder="Pilih Pabrik"
              label="Pabrik"
              optionLabel=""
              optionValue=""
              :options="['Gudang', 'Depo Pelayanan']"
              class=""
            />
          </div>
          <!-- Bentuk Sediaan -->
          <div class="mt-[20px]">
            <CustomSelect
              place-holder="Pilih Bentuk Sediaan"
              label="Bentuk Sediaan"
              optionLabel=""
              optionValue=""
              :options="['Gudang', 'Depo Pelayanan']"
              class="ml-2"
            />
          </div>
        </div>
        
        <div class="grid grid-cols-[20%,30%,20%,30%]">
          <!-- Dosis Kemasan -->
          <div class="mt-[20px]">
            <CustomTextfield
              label="Dosis Kemasan"
              placeholder="0"
              class=""
            />
          </div>
          <!-- Satuan -->
          <div class="mt-[20px]">
            <CustomSelect
              place-holder="Pilih Satuan"
              label="Satuan"
              optionLabel=""
              optionValue=""
              :options="['Gudang', 'Depo Pelayanan']"
              class="ml-2 mr-1"
            />
          </div>
          <!-- Isi Kemasan -->
          <div class="mt-[20px]">
            <CustomTextfield
              label="Isi Kemasan"
              placeholder="0"
              class="ml-3"
            />
          </div>
          <!-- Satuan -->
          <div class="mt-[20px]">
            <CustomSelect
              place-holder="Pilih Satuan"
              label="Satuan"
              optionLabel=""
              optionValue=""
              :options="['Gudang', 'Depo Pelayanan']"
              class="ml-2"
            />
          </div>
        </div>
        
         <!-- Kategori Item -->
         <div class="grid grid-cols-1">
          <div class="mt-[20px]">
            <CustomSelect
              place-holder="Pilih Kategori Item"
              label="Kategori Item"
              optionLabel=""
              optionValue=""
              :options="['Gudang', 'Depo Pelayanan']"
              class=""
            />
          </div>
        </div>
        
        <div class="grid grid-cols-3 gap-3">
          <!-- Harga Awal -->
          <div class="mt-[20px]">
            <CustomTextfield label="Harga Dasar" placeholder="0">
              <template #prependText>
                <div
                  class="font-semibold text-sm text-white bg-adameds-300 rounded-l-lg w-[53.34px] flex items-center justify-center"
                >
                  Rp.
                </div>
              </template>
            </CustomTextfield>
          </div>
          <!-- HNA -->
          <div class="mt-[20px]">
            <CustomTextfield pr label="HNA" placeholder="0">
              <template #prependText>
                <div
                  class="font-semibold text-sm text-white bg-adameds-300 rounded-l-lg w-[53.34px] flex items-center justify-center"
                >
                  Rp.
                </div>
              </template>
            </CustomTextfield>
          </div>
          <!-- HJA/Harga Jual -->
          <div class="mt-[20px]">
            <CustomTextfield pr label="HJA / Harga Jual" placeholder="0">
              <template #prependText>
                <div
                  class="font-semibold text-sm text-white bg-adameds-300 rounded-l-lg w-[53.34px] flex items-center justify-center"
                >
                  Rp.
                </div>
              </template>
            </CustomTextfield>
          </div>
        </div>

        <!-- Komposisi -->
        <div class="grid grid-cols-1">
          <div class="mt-[20px]">
            <CustomMultiSelect
              placeholder="Pilih Komposisi"
              label="Komposisi"
              v-model="selectedTujuanOrder"
              optionLabel=""
              optionValue=""
              :maxSelectedLabels="3"
              :options="['Komposisi', 'Komposisi']"
            />
          </div>
        </div>
        <hr class="mt-[20px] border border-slate-300"/>
        
        <!-- Konversi Satuan -->
        <div class="grid grid-cols-1 mt-[40px]">
          <p class="text-xl font-bold">Konversi Satuan</p>
        </div>
        <hr class="mt-[10px] border border-slate-200"/>
        
        <div class="grid grid-cols-[50%,25%,25%]">
          <!-- Satuan Pembelian -->
          <div class="mt-[10px]">
            <CustomSelect
              place-holder="Pilih Satuan Pembelian"
              label="Satuan Pembelian"
              optionLabel=""
              optionValue=""
              :options="['Box', 'Pcs']"
              class=""
            />
          </div>
          <!-- Konversi -->
          <div class="mt-[10px]">
            <CustomTextfield label="Konversi" placeholder="0" class="mr-[15px] ml-[15px]">
              <template #appendText>
                <div
                  class="font-semibold text-sm text-adameds-300 mr-[15px] mt-[10px]"
                >
                  Pcs
                </div>
              </template>
            </CustomTextfield>
          </div>
          <!-- Tambahkan -->
          <div class="mt-[36px]">
            <CustomButton
              icon="PhPlus"
              label="Tambahkan"
              class=""
              @click="addRow"
            />
          </div>
        </div>
        
        <!-- Datatable -->
        <div class="grid grid-cols-1 mt-[20px]">
          <DataTable
            v-model:selection="dataKonversi2"
            :value="newDataKonversi"
            stripedRows
            class="text-xs"
            scrollable
            scrollHeight="flex"
          >
            <Column headerClass="bg-adameds-50 font-semibold text-SM">
              <template #header>
                <div class="">No.</div>
              </template>
              <template #body="slotProps">
                <div class="">
                  {{ slotProps.data.no }}
                </div>
              </template>
            </Column>
            <Column field="pembelian" header="Satuan Pembelian" headerClass="bg-adameds-50 font-semibold text-SM">
              <template #body="slotProps">
                <div class="text-sm">{{ slotProps.data.pembelian }}</div>
              </template>
            </Column>
            <Column field="penggunaan" header="Satuan Penggunaan" headerClass="bg-adameds-50 font-semibold text-SM">
              <template #body="slotProps">
                <div class="text-sm">{{ slotProps.data.penggunaan }}</div>
              </template>
            </Column>
            <Column field="konversi" header="Konversi" headerClass="bg-adameds-50 font-semibold text-SM">
              <template #body="slotProps">
                <div class="text-sm">{{ slotProps.data.konversi }}</div>
              </template>
            </Column>
            <Column headerClass="bg-adameds-50">
              <template #header="slotProps">
                <div class="font-semibold text-SM">
                  Action
                </div>
              </template>
              <template #body="slotProps">
                <div class="">
                  <CustomButton
                    label=""
                    background-color="bg-danger-300 rounded-lg"
                    class="h-6 w-[26px] p-0"
                    @click="deleteRow(slotProps.index)"
                  >
                    <img src="@/assets/icons/delete.svg" alt="" />
                  </CustomButton>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        
        <!-- Status -->
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
