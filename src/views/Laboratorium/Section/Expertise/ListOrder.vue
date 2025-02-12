<script setup lang="ts">
import { ref } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

const historyVisitDialog = ref(false);
const submitForm = () => {
  console.log("Submited Patient Identity Form");
};

defineExpose({
  submitForm,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" initial-state="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <p class="leading-10 text-bold text-heading">List Order Lab</p>
        </div>
        <div class="mr-4">
          <CustomButton
            @click="historyVisitDialog = true"
            icon="PhClockCounterClockwise"
            label="Riwayat"
          ></CustomButton>
        </div>
      </div>
    </template>
    <template #content>
      <div class="mt-1">
        <div class="grid grid-cols-4 gap-4">
          <div class="basis-1/4">
            <p class="text-xs font-bold underline underline-offset-2">
              Dokter Penanggung Jawab
            </p>
            <p>dr. Nama Dokter</p>
          </div>

          <div>
            <p class="mr-2 text-xs font-bold underline underline-offset-2">
              Spesimen
            </p>
            <div class="flex gap-1 mt-1">
              <CustomButton class="w-auto h-5 text-xs">Urine</CustomButton>
              <CustomButton class="w-auto h-5 text-xs">Darah</CustomButton>
            </div>
          </div>
             <div class="basis-1/4">
            <p class="text-xs font-bold underline underline-offset-2">
              Status Puasa
            </p>
            <p>Tidak</p>
          </div>
            <div class="basis-1/4">
            <p class="text-xs font-bold underline underline-offset-2">
              CITO
            </p>
            <p>Tidak</p>
          </div>
        </div>
        <card class="mt-4 bg-adameds-50">
          <template #content>
            <div class="flex justify-between">
              <div class="flex">
                <p class="text-base font-bold text-adameds-300">LAB1234</p>
                <div class="bg-black w-[2px] h-[15px] ml-2 mt-1"></div>
                <p class="ml-2 text-base ">
                  Kimia Klinik
                </p>
              </div>
            </div>
          </template>
        </card>
        <div class="pt-5 mt-[-20px]">
          <DataTable
            class="overflow-hidden rounded-[10px]"
            scrollable
            scrollHeight="flex"
            :pt="{ headerRow: 'text-SM', thead: 'z-0' }"
          >
            <Column field="pemeriksaanName" header="Nama Pemeriksaan">
              <template #body="slotProps">
                <div class="flex justify-between">
                  <div>
                    <p class="text-SM">
                      {{ slotProps.data.pemeriksaanName }}
                    </p>
                  </div>
                </div>
              </template>
            </Column>
            
            <Column field="hasilPemeriksaan" header="Hasil Pemeriksaan" >
              <template #body="slotProps">
                <div class="flex justify-between">
                  <div>
                    <p class="text-SM">
                      {{ slotProps.data.pemeriksaanName }}
                    </p>
                  </div>
                </div>
              </template>
            </Column>
            
            <Column field="flags" header="Flags" class="w-[10%]">
              <template #body="slotProps">
                <div class="flex justify-between">
                  <div>
                    <p class="text-SM">
                      {{ slotProps.data.pemeriksaanName }}
                    </p>
                  </div>
                </div>
              </template>
            </Column>
            <Column field="metode" header="Metode" class="w-[10%]">
              <template #body="slotProps">
                <div class="flex justify-between">
                  <div>
                    <p class="text-SM">
                      {{ slotProps.data.pemeriksaanName }}
                    </p>
                  </div>
                </div>
              </template>
            </Column>
            <Column field="satuan" header="Satuan" class="w-[10%]">
              <template #body="slotProps">
                <div class="flex justify-between">
                  <div>
                    <p class="text-SM">
                      {{ slotProps.data.pemeriksaanName }}
                    </p>
                  </div>
                </div>
              </template>
            </Column>

            <Column field="nilaiRujukan" header="Nilai Rujukan" class="w-[10%]">
              <template #body="slotProps">
                <div>
                  <p class="text-sm">
                    {{ slotProps.data.diagnosa }}
                  </p>
                </div>
              </template>
            </Column>
            <Column field="statusPemeriksaan">
              <template #header>
                <div class="font-bold text-center">Status Pemeriksaan</div>
              </template>
              <template #body="slotProps">
                <div class="text-center text-SM">
                  {{ slotProps.data.harga }}
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
    
      </div>
    </template>
    <template #collapseIcon>
      <CustomButton
        icon="PhCaretUp"
        backgroundColor="bg-transparent"
        textColor="text-adameds-300"
      />
    </template>
    <template #expandIcon>
      <CustomButton
        icon="PhCaretDown"
        backgroundColor="bg-transparent"
        textColor="text-adameds-300"
      />
    </template>
  </CustomAccordion>
  <!-- Dialog history -->
  <CustomDialog
    class=""
    v-model:visible="historyVisitDialog"
    position="bottomright"
    headerHeight="h-5"
    width="350px"
    closeIcon="PhTextIndent"
  >
    <template #header>
      <div class="flex">
        <PhClockCounterClockwise
          color="white"
          :size="20"
          weight="bold"
          class="my-auto"
        />
        <span class="ml-[10px] text-normal"> Riwayat Pemeriksaan </span>
      </div>
    </template>
    <template #body>
      <div class="h-[60vh]">
        <!-- <div>
            <div>
              Rawat Jalan - Poli Mata
              <CustomChip
                :showCheckedIcon="false"
                label="BPJS"
                bgColor="bg-warning-50"
                textColor="text-warning-300"
                borderColor="border-warning-300"
                customClass="h-5 pr-[6px] mr-[5px]"
              />
            </div>
          </div> -->
      </div>
    </template>
    <template #customCloseIcon>
      <MenuOpenIcon class="text-white" />
    </template>
  </CustomDialog>
</template>
