<script setup lang="ts">
import { ref, watch } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import TambahDataItem from "@/views/Laboratorium/Masterdata/ItemPemeriksaan/TambahData.vue";
import DialogNilaiRujukanAngka from "./DialogNilaiRujukanAngka.vue";
import DialogRujukanText from "./DialogRujukanText.vue";

const addItemDialog = ref(false);
const rowsPerPage = ref(10);
const currentPage = ref(0);
const status = ref(false);
const nilaiRujukanAngka = ref(false);
const nilaiRujukanText = ref(false);

const handleRowsUpdate = (newRows: number) => {
  rowsPerPage.value = newRows;
  currentPage.value = 0;
};

const handlePageUpdate = (newPage: number) => {
  currentPage.value = newPage;
};

const dataItemPemeriksaan = ref([
  {
    kodeItem: "HGB",
    namaItem: "Hemogoblin",
    kategori: "HEMATOLOGI",
    satuan: "g/dL",
    metode: "Colorimatic",
    noUrut: "1",
    status: "AKTIF",
    jenisInput: "Angka",
  },
  {
    kodeItem: "HMT",
    namaItem: "Hematokrit",
    kategori: "HEMATOLOGI",
    satuan: "%",
    metode: "Impedance",
    noUrut: "3",
    status: "AKTIF",
    jenisInput: "Text",
  },
]);
const jenisInput = ref();
const optionJenisInput = ref([
  { label: "Angka", value: "1" },
  { label: "Text", value: "2" },
  { label: "Long Text", value: "3" },
  { label: "Pilihan", value: "4" },
]);

console.log("jenis input", optionJenisInput.value);

const itemPemeriksaan = ref();
const optionItemPemeriksaan = ref([
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
]);

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
                @click="addItemDialog = true"
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
          :value="dataItemPemeriksaan"
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
              <div class="text-SM">{{ slotProps.data.kodeItem }}</div>
            </template>
          </Column>
          <Column
            field="namaItem"
            header="Nama Item"
            headerClass="bg-adameds-50"
            class=""
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.namaItem }}</div>
            </template>
          </Column>
          <Column
            field="kategori"
            header="Kategori"
            headerClass="bg-adameds-50"
            class=""
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.kategori }}</div>
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
            class="w-[5%]"
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
                  v-if="slotProps.data.jenisInput === 'Angka'"
                  icon="PhListNumbers"
                  class="h-6 w-[26px] p-0"
                  background-color="rounded-lg bg-adameds-300"
                  @click="nilaiRujukanAngka = true"
                />
                <CustomButton
                  v-if="slotProps.data.jenisInput !== 'Angka'"
                  icon="PhListNumbers"
                  class="h-6 w-[26px] p-0"
                  background-color="rounded-lg bg-adameds-300"
                  @click="nilaiRujukanText = true"
                />
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
            :totalRecords="dataItemPemeriksaan.length"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>

    <!-- nilaiRujukanAngka Dialog -->
    <DialogNilaiRujukanAngka
      v-model:visible="nilaiRujukanAngka"
      :dataNilaiRujukan="dataNilaiRujukan"
    />
    
    <DialogRujukanText
      v-model:visible="nilaiRujukanText"
      :dataNilaiRujukan="dataNilaiRujukan"
      />

    <TambahDataItem v-model:visible="addItemDialog" />
  </div>
</template>
