<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import { ref } from "vue";

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Detail",
  },
  obatDetail: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:isDialogVisible"]);

function updateVisibility(value: boolean) {
  emit("update:isDialogVisible", value);
}

const listLokasiTujuanOrder = ref([
  { id: "1", label: "Farmasi Rawat Jalan" },
  { id: "2", label: "Farmasi Rawat Inap" },
]);

</script>

<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    headerBg="bg-adameds-300"
    @update:visible="updateVisibility"
  >
    <template #header>{{ title }}</template>
    <template #body>
      <div class="flex flex-col gap-5 py-3">
        <div class="flex gap-7">
          <CustomSelect
            prepend-icon="PhMagnifyingGlass"
            v-model="obatDetail.selectedLokasiTujuanOrder"
            :options ="listLokasiTujuanOrder"
            disabled
            optionValue="label"
            optionLabel="label"
            label="Lokasi Tujuan Order"
            place-holder="Pilih Lokasi Tujuan Order"
            class="grow"
          />
          <CustomSwitch label="Obat Pulang" v-model="obatDetail.obatPulang" disabled/>
          <hr class="h-auto border border-adameds-300" />

          <div class="grid items-center grid-cols-3 gap-3">
            <div>
              <div class="font-semibold underline text-XS">Penulis Resep</div>
              <div class="font-normal text-SM">{{ obatDetail.penulisResep }}</div>
            </div>
            <div>
              <div class="font-semibold underline text-XS">Tgl Order</div>
              <div class="font-normal text-SM">{{ obatDetail.tglOrder }}</div>
            </div>
            <div>
              <div class="font-semibold underline text-XS">Lokasi Tujuan Order</div>
              <div class="font-normal text-SM">{{ obatDetail.selectedLokasiTujuanOrder }}</div>
            </div>
          </div>
        </div>
        <DataTable
          :value="obatDetail.orderObats"
          class="overflow-y-scroll text-xs bg-adameds-50 max-h-[300px]"
          scrollable
          scrollHeight="flex"
          table-style="min-width:50 rem"
        >
          <Column
            headerClass="bg-adameds-50 font-semibold text-SM"
            class="max-w-[60px] text-center"
          >
            <template #header>
              <div class="w-full text-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Nama Obat</div>
            </template>
            <template #body="slotProps">
              <div v-if="slotProps.data.racikan">
                {{ slotProps.data.namaRacikan }}
                <span v-if="slotProps.data.sirup">- Sirup</span>
              </div>
              <div v-else>
                {{ slotProps.data.namaObat }}
              </div>
              <div class="flex gap-1.5 justify-left">
                <CustomChip
                  v-if="slotProps.data.racikan"
                  :showCheckedIcon="false"
                  label="RACIKAN"
                  bgColor="bg-none"
                  textColor="text-grass-300"
                  customClass="h-5 pr-[6px] border-grass-200 border-1"
                />
                <CustomChip
                  v-if="slotProps.data.obatKronis"
                  :showCheckedIcon="false"
                  label="OBAT KRONIS"
                  bgColor="bg-none"
                  textColor="text-sunFlower-300"
                  customClass="h-5 border-sunFlower-300"
                />
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Total Obat</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.jumlahKonsumsi }}
              {{ slotProps.data.satuanDosis }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Dosis</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.jumlahKonsumsi }}
              {{ slotProps.data.satuanDosis }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Aturan Pakai</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.aturanPakai }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Cara Pakai</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.caraPakai }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Rute Pemberian</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.rutePemberian }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto">
            <template #header>
              <div class="w-full font-semibold text-center">Status</div>
            </template>
            <template #body="slotProps">
              <div class="flex justify-center gap-1.5">
                <CustomButton
                  label=""
                  background-color="bg-[#3D84E5] rounded-lg"
                  class="h-6 w-[26px] p-0"
                 
                >
                  <img src="@/assets/icons/edit.svg" alt="Edit" />
                </CustomButton>
                <CustomButton
                  label=""
                  background-color="bg-danger-300 rounded-lg"
                  class="h-6 w-[26px] p-0"
                  
                >
                  <img src="@/assets/icons/delete.svg" alt="Delete" />
                </CustomButton>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
  </CustomDialog>
</template>
