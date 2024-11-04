<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import NoData from "@/components/section/NoData.vue";
import type { MenuItem } from "primevue/menuitem";
import { ref, type PropType } from "vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
});

const emit = defineEmits(["kembali"]);

const jenisStok = ref([
  { id: 1, name: "Umum" },
  { id: 2, name: "BPJS" },
]);

const jenisStokSelected = ref([]);
const jenisItem = ref([
  { id: 1, name: "Obat" },
  { id: 2, name: "Alkes" },
]);

const jenisItemSelected = ref([]);

// State untuk data dan status
const isDataAvailable = ref(false);
const dataItems = ref([
  // Contoh data, ganti dengan data yang diambil dari API
  {
    id: 1,
    namaItem: "Obat 1",
    jenisStok: "Umum",
    jenisItem: "Obat",
    kategoriItem: "Medis",
    jenisObat: "Obat Keras",
    stokAwal: 900,
    stokMasuk: 900,
    stokKeluar: 900,
    stokSistem: 900,
    stokFisik: 100,
    selisih: 100,
    hargaDasar: 12000,
    hargaAkhir: 10000,
    expDate: "01-01-25",
  },
  {
    id: 2,
    namaItem: "Obat 2",
    jenisStok: "Umum",
    jenisItem: "Obat",
    kategoriItem: "Medis",
    stokAwal: 900,
    stokMasuk: 900,
    stokKeluar: 900,
    stokSistem: 900,
    stokFisik: 0,
    selisih: 100,
    hargaDasar: 600,
    hargaAkhir: 500,
    expDate: "01-01-25",
  },
]);

const selectedDataItem = ref([]);
const rekonsilTitle = ref<string | null>(null);

const rekonsilDariMasterItem = () => {
  isDataAvailable.value = true;
  rekonsilTitle.value = "Rekonsil Dari Master Item";
  console.log("Data dari Master Item di-fetch");
};

const rekonsilDariStokItem = () => {
  isDataAvailable.value = true;
  rekonsilTitle.value = "Rekonsil Dari Stok Item";
  console.log("Data dari Stok Item di-fetch");
};
</script>

<template>
  <Card pt:body:class="h-full pt-0" pt:content:class="h-full">
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder initialState="0">
        <template #header>
          <div class="flex items-center justify-between w-full align-middle">
            <div class="flex">
              <CustomButton icon="PhArrowClockwise" class="mr-5" />
              <CustomBreadCrumb
                :home="{
                  label: 'Stok Opname', // Selalu tampilkan 'Pengadaan Barang'
                  home: true,
                }"
                :model="[
                  ...dataBreadCrumb, // Model lainnya tetap dari dataBreadCrumb
                ]"
                class=""
              />
            </div>
            <CustomButton
              @click="emit('kembali')"
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
          <div class="flex gap-7 py-2.5">
            <CustomTextfield
              label="Judul Stok Opname"
              class="w-[350px]"
              placeholder="Masukkan judul Stok Opname"
            />
            <CustomMultiSelect
              class="w-[350px]"
              label="Jenis Stok"
              :options="jenisStok"
              placeholder="Pilih Kategori Item"
              v-model:modelValue="jenisStokSelected"
              optionValue="id"
              optionLabel="name"
            />
            <CustomSelect
              label="Kategori Item"
              placeHolder="Pilih Kategori Item"
              optionValue="code"
              optionLabel="name"
              :isLoading="false"
              class="grow"
            />
            <CustomMultiSelect
              class="w-[350px]"
              label="Jenis Item"
              :options="jenisItem"
              placeholder="Pilih Jenis Item"
              v-model:modelValue="jenisItemSelected"
              optionValue="id"
              optionLabel="name"
            />
          </div>
          <hr class="border-grey-200" />
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
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between pb-2.5">
          <div class="flex gap-2.5">
            <div class="font-semibold text-MD text-adameds-300">
              Daftar Item Stok Opname
            </div>
            <div
              v-if="rekonsilTitle"
              class="font-semibold text-grey-300 text-MD"
            >
              ({{ rekonsilTitle }})
            </div>
          </div>
          <div v-if="!isDataAvailable">
            <CustomButton
              label="Rekonsil Dari Master Item"
              class="mr-[10px]"
              @click="rekonsilDariMasterItem"
            />
            <CustomButton
              label="Rekonsil Dari Stok Item"
              @click="rekonsilDariStokItem"
            />
          </div>
          <div v-else>
            <CustomButton
              icon="PhDownloadSimple"
              label="Kartu Stok"
              class="mr-[10px]"
              @click="rekonsilDariMasterItem"
            />
            <CustomButton
              icon="PhUploadSimple"
              label="Import Excel"
              @click="rekonsilDariStokItem"
            />
          </div>
        </div>
        <div v-if="isDataAvailable" class="flex flex-col gap-5">
          <div class="flex items-end gap-7">
            <CustomTextfield
              label="Cari Nama Item / Kode Item"
              class="grow"
              placeholder="Masukkan judul Stok Opname"
            />
            <CustomSelect
              label="Jenis Item"
              placeHolder="Pilih Jenis Item"
              optionValue="code"
              optionLabel="name"
              :isLoading="false"
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

          <DataTable
          v-model:selection="selectedDataItem"
            :value="dataItems"
            tableStyle="min-width: 50rem"
            scrollable
            scrollHeight="240px"
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
                <div>
                  <div class="text-SM">{{ slotProps.data.namaItem }}</div>
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.kategoriItem"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    customClass="h-5 pr-[6px] border-none mr-[5px]"
                  />
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.jenisStok"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    customClass="h-5 pr-[6px] border-none mr-[5px]"
                  />
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.jenisItem"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    customClass="h-5 pr-[6px] border-none mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.jenisObat"
                    :showCheckedIcon="false"
                    :label="slotProps.data.jenisObat"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    customClass="h-5 pr-[6px] border-none mr-[5px]"
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
            <Column headerClass="bg-adameds-50" class="w-[130px]">
              <template #header>
                <div class="w-full font-semibold">Stok Fisik</div>
              </template>
              <template #body="slotProps">
                <CustomInputNumber
                  label=""
                  v-model:modelValue="slotProps.data.stokFisik"
                  disabled
                >
                  <template #appendText>
                    <div class="flex items-center justify-center px-2 text-XS">
                      Tablet
                    </div>
                  </template>
                </CustomInputNumber>
              </template>
            </Column>
            <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold">Selisih</div>
              </template>
              <template #body="slotProps">
                <div class="font-normal text-SM">
                  {{ slotProps.data.selisih }}
                </div>
                <div class="font-normal text-[8px] text-adameds-300">
                  Tablet
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
            <Column
              header="Action"
              body-class="text-center"
              selectionMode="multiple"
              headerStyle="width: 3rem"
              headerClass="bg-adameds-50"
              class="custom-checkbox"
            >
            </Column>
          </DataTable>
        </div>

        <NoData v-else />
      </div>
    </template>
    <template #footer>
      <hr class="pt-5 border-grey-200" />
      <div class="flex justify-between">
        <div class="grid grid-cols-2 gap-7">
          <div>
            <div class="font-semibold underline text-SM">Total Item SO</div>
            <div class="font-normal text-normal">0 item</div>
          </div>
          <div>
            <div class="font-semibold underline text-SM">Tgl. Selesai SO</div>
            <div class="font-normal text-normal">01-01-2024</div>
          </div>
        </div>
        <div>
          <CustomButton
            label="Simpan (Draft)"
            class="my-auto mr-2 bg-adameds-300"
            disabled
          />
          <CustomButton
            label="Simpan & Akhiri SO"
            class="my-auto bg-adameds-300"
            disabled
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<style>
.custom-checkbox .p-checkbox-checked .p-checkbox-box {
  @apply border-adameds-300 bg-adameds-300; /* Kelas Tailwind untuk border dan warna latar */
}

.custom-checkbox .p-checkbox-checked .p-checkbox-box .p-checkbox-icon {
  @apply text-white; /* Kelas Tailwind untuk warna tanda centang */
}
</style>
