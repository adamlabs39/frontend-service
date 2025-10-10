<script setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import TambahPermintaanBarang from "./Layout/PermintaanBarang/TambahPermintaanBarang.vue";

const buttonSelect = ref("permintaan-barang");
const searchQuery = ref("");

const tableData = ref([
  {
    tanggal: "01-01-2025",
    permintaan: "PRM1234",
    tujuan: "Poli Mata",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT", "CITO"],
  },
  {
    tanggal: "01-01-2025",
    permintaan: "PRM1234",
    tujuan: "IGD",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT"],
  },
  {
    tanggal: "01-01-2025",
    permintaan: "PRM1234",
    tujuan: "R. Mawar",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT"],
  },
  {
    tanggal: "01-01-2025",
    permintaan: "PRM1234",
    tujuan: "R. Mawar",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT"],
  },
  {
    tanggal: "01-01-2025",
    permintaan: "PRM1234",
    tujuan: "R. Mawar",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT"],
  },
  {
    tanggal: "01-01-2025",
    permintaan: "PRM1234",
    tujuan: "R. Mawar",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT"],
  },
  {
    tanggal: "01-01-2025",
    permintaan: "PRM1234",
    tujuan: "R. Mawar",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT"],
  },
  {
    tanggal: "01-01-2025",
    permintaan: "PRM1234",
    tujuan: "R. Mawar",
    petugas: "Nama Petugas",
    status: "PENGAJUAN",
    tags: ["MEDIS", "UMUM", "OBAT"],
  },
]);

const PermintaanBarangProperties = ref({
  page: 1,
  page_size: 10,
  total: 100,
});

const showTambah = ref(false);
</script>

<template>
  <div>
    <Card
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
      v-if="!showTambah"
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
                  :outlined="buttonSelect !== 'permintaan-barang'"
                  borderColor="border-adameds-300"
                  :textColor="
                    buttonSelect === 'permintaan-barang'
                      ? 'text-white'
                      : 'text-adameds-300'
                  "
                  :backgroundColor="
                    buttonSelect === 'permintaan-barang'
                      ? 'bg-adameds-300'
                      : 'bg-white'
                  "
                  @click="buttonSelect = 'permintaan-barang'"
                />
                <CustomButton
                  :full="true"
                  label="DIBATALKAN"
                  :outlined="buttonSelect !== 'dibatalkan'"
                  borderColor="border-adameds-300"
                  :textColor="
                    buttonSelect === 'dibatalkan'
                      ? 'text-white'
                      : 'text-adameds-300'
                  "
                  :backgroundColor="
                    buttonSelect === 'dibatalkan'
                      ? 'bg-adameds-300'
                      : 'bg-white'
                  "
                  @click="buttonSelect = 'dibatalkan'"
                />
                <CustomButton
                  :full="true"
                  label="SUDAH DIVERIFIKASI"
                  :outlined="buttonSelect !== 'sudah-diverifikasi'"
                  borderColor="border-adameds-300"
                  :textColor="
                    buttonSelect === 'sudah-diverifikasi'
                      ? 'text-white'
                      : 'text-adameds-300'
                  "
                  :backgroundColor="
                    buttonSelect === 'sudah-diverifikasi'
                      ? 'bg-adameds-300'
                      : 'bg-white'
                  "
                  @click="buttonSelect = 'sudah-diverifikasi'"
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
          tableStyle="min-width: 50rem"
          stripedRows
          class="text-xs"
          scrollable
          scrollHeight="flex"
          :value="tableData"
        >
          <Column
            field="tanggal"
            header="Tanggal"
            headerClass="bg-adameds-50 font-semibold text-SM"
          ></Column>

          <Column
            field="permintaan"
            header="No. Permintaan"
            headerClass="bg-adameds-50 font-semibold text-SM"
          >
            <template #body="slotProps">
              <div class="space-y-1">
                <div class="font-semibold">{{ slotProps.data.permintaan }}</div>
                <div class="flex gap-2">
                  <CustomChip
                    v-for="t in slotProps.data.tags"
                    :key="t"
                    :label="t"
                    :outlined="true"
                    :showCheckedIcon="false"
                    :customClass="'h-5 px-2'"
                    :borderColor="
                      t === 'CITO' ? 'border-danger-300' : 'border-adameds-300'
                    "
                    :textColor="t === 'CITO' ? 'text-white' : 'text-white'"
                    :bgColor="t === 'CITO' ? 'bg-danger-300' : 'bg-adameds-300'"
                  />
                </div>
              </div>
            </template>
          </Column>

          <Column
            field="tujuan"
            header="Tujuan Perimintaan"
            headerClass="bg-adameds-50 font-bold text-SM"
            class="font-bold"
          >
          </Column>

          <Column
            field="petugas"
            header="Petugas"
            headerClass="bg-adameds-50 font-semibold text-SM"
          >
          </Column>

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
                borderColor="border-grey-300"
                textColor="text-white"
                bgColor="bg-grey-300"
              />
            </template>
          </Column>
        </DataTable>
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
    <TambahPermintaanBarang @back="showTambah = false" v-else />
  </div>
</template>

<style lang="scss" scoped></style>
