<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import DataTable from "primevue/datatable";
import { onMounted, ref } from "vue";

const dataRiwayatTable = ref<any[]>([]);

onMounted(() => {
  dataRiwayatTable.value = [
    {
      namaObat: "Sanmol",
      satuanObat: "Botol",
      aturanPakai: "3x Sehari",
      totalObat: 1,
    },
    {
      namaObat: "Sanmol",
      satuanObat: "Botol",
      aturanPakai: "3x Sehari",
      totalObat: 1,
    },
  ];
});
</script>

<template>
  <div class="flex flex-col gap-2.5 pt-2">
    <!-- Atas -->
    <div class="flex items-center justify-between">
      <div class="font-semibold text-gray-400 text-MD">Riwayat Sebelumnya</div>
      <div class="flex items-end gap-2.5">
        <CustomSelect label="" prependIcon="PhHospital" placeHolder="Semua" />
        <CustomButton  icon="PhCaretLeft"/>
        <CustomButton icon="PhCaretRight" />
      </div>
    </div>
    <!-- Bawah -->
    <CustomAccordion headerClass="bg-adameds-50" initialState="0">
      <template #header>
        <div class="flex gap-2">
          <div>01 Jan 2024</div>
          <hr class="h-auto border border-adameds-300" />
          <CustomChip :showCheckedIcon="false" label="Rawat Jalan" />
        </div>
      </template>
      <template #content>
        <CustomAccordion headerClass="bg-grey-100" initialState="0" class="pt-3">
          <template #header>
            <div class="flex items-center justify-between w-full">
              <div class="font-semibold text-normal text-adameds-300">
                RSPK28L
              </div>
              <div class="flex items-center gap-2.5 mr-3">
                <div class="font-normal text-XS">01 Jan 2024</div>
                <CustomButton label="Detail" />
              </div>
            </div>
          </template>
          <template #content>
            <DataTable
              :value="dataRiwayatTable"
              class="overflow-y-scroll text-xs bg-adameds-50 max-h-[300px]"
              scrollable
              scrollHeight="flex"
            >
              <Column headerClass="bg-adameds-50 font-semibold text-SM w-[40px]">
                <template #header>
                  <div class="">No.</div>
                </template>
                <template #body="slotProps">
                  <div class="w-full text-center">
                    {{ slotProps.index + 1 }}
                  </div>
                </template>
              </Column>
              <Column headerClass="bg-adameds-50  w-[300px]">
                <template #header>
                  <div class="font-semibold">Obat</div>
                </template>
                <template #body="slotProps">
                    <div>
                        <div>{{ slotProps.data.namaObat }} - {{ slotProps.data.satuanObat }}</div>
                        <div class="font-bold text-SM">{{ slotProps.data.aturanPakai }}</div>
                    </div>
                </template>
              </Column>
              <Column headerClass="bg-adameds-50">
                <template #header>
                  <div class="font-semibold">Total Obat</div>
                </template>
                <template #body="slotProps">
                    <div>
                        <div>{{ slotProps.data.totalObat }} {{ slotProps.data.satuanObat }}</div>

                    </div>
                </template>
              </Column>
            </DataTable>
            <div class="flex justify-between py-2.5">
                <div>
                    <div class="font-semibold underline text-SM">
                        Petugas Input
                    </div>
                    <div class="font-normal text-SM">
                        Nama Petugas
                    </div>
                </div>
                <div>
                    <div class="font-semibold underline text-SM">
                        Jam Input
                    </div>
                    <div class="font-normal text-SM text-end">
                        08:00
                    </div>
                </div>
            </div>
          </template>
        </CustomAccordion>
      </template>
    </CustomAccordion>
  </div>
</template>
