<script lang="ts" setup>
import { ref } from "vue";
import { formatPrice } from "@/utils/Helpers";
import { useDrugReturStore } from "@/stores/farmasi/DrugRetur";
import { utilsStore } from "@/stores/utils";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";

const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  selectMedicine: {
    type: String,
  },
  payloadObat: {
    type: Object,
    default: () => ({}),
  },
});

function formatDate(date: any) {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

function formatDate2(date: any) {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const emit = defineEmits(["update:isDialogVisible", "close"]);

const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};

const updateQtyObat = () => {
  totalRetur.value = 0
  DrugReturObatDetailPayload.value.forEach(item => {
    totalRetur.value += item.detail[0].qtyRetur * item.detail[0].price
  });
};

// State Management
const alasan = ref("");
const totalRetur = ref(0);
const DrugReturStore = useDrugReturStore();
const UseUtilsStore = utilsStore();
const DrugReturObatDetailPayload = ref<any[]>([]);

// Fetch Drug Retur Detail
const fetchDrugReturDetail = async (uuid: string) => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await DrugReturStore.getApiDetailObat(uuid);

    if (response && response.payload) {
      DrugReturObatDetailPayload.value = response.payload;
    } else {
      DrugReturObatDetailPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    DrugReturObatDetailPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const onSubmit = async () => {
  const items: any[] = [];

  for (const item of DrugReturObatDetailPayload.value) {
    for (const detailItem of item.detail) {
      const newJenisStok = detailItem.jenisStok;
      const newUsedQty = detailItem.usedQty;
      const newQtyRetur = detailItem.qtyRetur;
      const newHargaSatuan = detailItem.total;
      const newExpDate = formatDate2(detailItem.expDate);
      const newPres = detailItem.uuid;
      
      items.push({
        prescription_item_uuid: newPres,
        jenis_stok: newJenisStok,
        used_qty: newUsedQty,
        qty_retur: newQtyRetur,
        harga_satuan: newHargaSatuan,
        expired_date: newExpDate,
      });
    }
  }

  try {
    const response = await DrugReturStore.createApi({
      jenis_retur: props.selectMedicine,
      prescription_uuid: props.payloadObat.uuid,
      items: items,
      alasan_retur: alasan.value,
    });
    console.log("API Response:", response);
  } catch (error) {
    console.error("Error in API call:", error);
  }
  emit("update:isDialogVisible", false);
};

defineExpose({
  fetchDrugReturDetail,
});
</script>

<template>
  <CustomDialog :visible="isDialogVisible" @update:visible="updateVisibility" width="1000px">
    <template #header>Retur Obat - {{ props.payloadObat.noResep }}</template>
    <template #body>
      <div>
        <div class="pt-5">
          <!-- Nama lengkap pasien -->
          <div class="flex flex-row">
            <div class="basis-1/4">
              <p class="font-bold text-MD">Nama lengkap pasien</p>
              <p>REG1231235</p>
              <CustomButton class="w-24 h-5 text-sm">00-00-00</CustomButton>
              <CustomChip
                :showCheckedIcon="false"
                label="Laki-laki"
                bgColor="bg-male-75"
                textColor="text-male-300"
                customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
              />
              <!-- <CustomChip
                :showCheckedIcon="false"
                label="Perempuan"
                bgColor="bg-female-75"
                textColor="text-female-300"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              /> -->
            </div>
            <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
            <div class="mt-[20px] mr-[40px]">
              <p class="text-xs font-bold underline underline-offset-2">
                Tgl. Lahir
              </p>
              <p class="">10 Januari 2090</p>
            </div>
            <div class="mt-[20px] mr-[40px]">
              <p class="text-xs font-bold underline underline-offset-2">Umur</p>
              <p class="">24Thn 2Bln 1Hari</p>
            </div>
            <div class="mt-[20px] mr-[40px]">
              <p class="text-xs font-bold underline underline-offset-2">
                Alergi
              </p>
              <p class="">Tidak Ada</p>
            </div>
          </div>
          <!-- Asesmen Medis -->
          <div class="grid grid-cols-1">
            <CustomAccordion no-border initial-state="0">
              <template #header>Asesmen Medis</template>
              <template #content>
                <div class="flex flex-row mt-[20px]">
                  <div class="basis-1/4">
                    <p class="text-xs font-bold underline underline-offset-2">
                      Nama lengkap pasien
                    </p>
                    <p>Sakit Mata</p>
                    <p
                      class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                    >
                      Dokter Pengirim <span> </span>
                    </p>
                    <p>dr. Anji Sp. M</p>
                  </div>
                  <div
                    class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"
                  ></div>
                  <div class="mr-[40px]">
                    <p class="text-xs font-bold underline underline-offset-2">
                      Diagnosa Primer
                    </p>
                    <p class="">H10.9 Conjuctivitis</p>
                    <p
                      class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                    >
                      Diagnosa Primer
                    </p>
                    <p class="">-</p>
                  </div>
                  <div class="mr-[40px]">
                    <p class="text-xs font-bold underline underline-offset-2">
                      Diagnosa Sekunder
                    </p>
                    <p class="">-</p>
                  </div>
                  <div class="mr-[40px]">
                    <p class="text-xs font-bold underline underline-offset-2">
                      Diagnosa Sekunder
                    </p>
                    <p class="">-</p>
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
          </div>
        </div>

        <div class="grid grid-cols-1">
          <div v-for="(items, index) in DrugReturObatDetailPayload" :key="index" class="mt-[20px]">
            <card class="bg-adameds-50">
              <template #content>
                <div class="flex justify-between">
                  <div class="flex">
                    <CustomButton class="text-sm h-7">0{{ index + 1 }}</CustomButton>
                    <p class="ml-2 text-base font-bold">{{ items.name }}</p>
                    <PhArrowRight
                      :size="20"
                      class="my-auto ml-2 text-success-300"
                      weight="bold"
                    />
                    <p class="ml-2 text-base font-bold">
                      {{ items.availableQty }}
                    </p>
                  </div>
                </div>
              </template>
            </card>
            <div class="pt-5 mt-[-20px]">
              <DataTable
                :value="items.detail"
                class="overflow-hidden rounded-[10px]"
                scrollable
                scrollHeight="flex"
                :pt="{ headerRow: 'text-SM' }"
              >
                <!-- Jenis Stok -->
                <Column header="Jenis Stok">
                  <template #body="slotProps">
                    <div class="text-SM">{{ slotProps.data.jenisStok }}</div>
                  </template>
                </Column>
                <!-- Terpakai -->
                <Column header="Terpakai">
                  <template #body="slotProps">
                    <div class="text-SM">{{ slotProps.data.usedQty }}</div>
                  </template>
                </Column>
                <!-- Exp Date -->
                <Column header="Exp. Date">
                  <template #body="slotProps">
                    <div class="text-SM">
                      {{ formatDate(slotProps.data.expDate) }}
                    </div>
                  </template>
                </Column>
                <!-- Terima Retur -->
                <Column header="Terima Retur">
                  <template #body="slotProps">
                    <CustomInputNumber
                      v-model="slotProps.data.qtyRetur"
                      @update:model-value="updateQtyObat"
                      label=""
                      class="w-[100px]"
                    >
                    </CustomInputNumber>
                  </template>
                </Column>
                <!-- Harga -->
                <Column header="Harga">
                  <template #body="slotProps">
                    <div class="text-SM">
                      {{ formatPrice(slotProps.data.price) }}
                    </div>
                  </template>
                </Column>
                <!-- Total -->
                <Column header="Total">
                  <template #body="slotProps">
                    <div class="text-SM">
                      {{ formatPrice((slotProps.data.qtyRetur * slotProps.data.price) || 0) }}
                    </div>
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <!-- Total Retur -->
        <div class="mt-4">
          <card class="bg-adameds-50">
            <template #content>
              <div class="flex justify-between">
                <p class="text-base font-bold">Total Retur</p>
                <p class="text-base font-bold">{{ formatPrice(totalRetur) }}</p>
              </div>
            </template>
          </card>
        </div>
        <!-- Alasan Retur -->
        <div class="grid grid-cols-1">
          <div>
            <p class="mt-[20px] font-bold">Alasan Retur</p>
          </div>
          <div class="mt-[5px]">
            <CustomTextfield
              v-model="alasan"
              :showLabel="false"
              placeholder="Alasan Retur"
            />
          </div>
        </div>
        <hr class="mt-5 border-[1px] border-grey-200" />
        <div class="flex justify-end">
          <div class="mt-3">
            <p class="text-xs font-bold text-right underline underline-offset-2">
              Diretur Oleh
            </p>
            <p>Nama Petugas</p>
          </div>
          <div class="mt-3">
            <div class="bg-mediumGrey-300 w-[1px] h-[33px] ml-[20px] mt-1"></div>
          </div>
          <div class="mt-3">
            <CustomButton
              label="Batal"
              outlined
              borderColor="border-grey-300"
              textColor="text-grey-300"
              class="ml-[20px]"
            />
            <CustomButton label="Retur" class="ml-[10px]" @click="onSubmit" />
          </div>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
