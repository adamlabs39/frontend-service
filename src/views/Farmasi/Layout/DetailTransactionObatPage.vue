<script lang="ts" setup>
import { ref } from "vue";
import { formatPrice, epochToDate } from "@/utils/Helpers";
import { useTransactionHistoryStore } from "@/stores/farmasi/TransactionHistory";
import { utilsStore } from "@/stores/utils";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  filterItem: {
    type: String,
    required: true,
  },
  filterStatus: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};

// State Management
const TransactionHistoryStore = useTransactionHistoryStore();
const UseUtilsStore = utilsStore();
const TransactionHistoryObatDetailPayload = ref<any>({});

// Fetch Drug Retur Detail
const fetchTransactionHistoryDetail = async (uuid: string) => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await TransactionHistoryStore.getApiDetail({
      item_type: props.filterItem,
      status_type: props.filterStatus,
      uuid: uuid,
    });

    if (response && response.payload) {
      TransactionHistoryObatDetailPayload.value = response.payload;
    } else {
      TransactionHistoryObatDetailPayload.value = {};
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    TransactionHistoryObatDetailPayload.value = {};
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

defineExpose({
  fetchTransactionHistoryDetail,
});
</script>

<template>
  <CustomDialog
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    width="1100px"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <div class="flex">
          <p>
            Riwayat Resep - {{ TransactionHistoryObatDetailPayload.noResep }}
          </p>
          <CustomChip
            :label="TransactionHistoryObatDetailPayload.paymentMethod"
            :showCheckedIcon="false"
            borderColor="border-adameds-300"
            bgColor="bg-adameds-50"
            textColor="text-adameds-300"
            customClass="h-6"
            class="ml-[5px]"
          />
        </div>
        <div></div>
        <div class="flex ml-[470px]">
          <div class="bg-white w-[1px] h-[30px]"></div>
          <p class="text-sm ml-[15px] mt-[3px]">
            Tgl. Order :
            {{
              epochToDate(TransactionHistoryObatDetailPayload.orderDate, "date")
            }}
          </p>
        </div>
      </div>
    </template>
    <template #body>
      <div class="pt-5">
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
            <p class="text-xs font-bold underline underline-offset-2">Alergi</p>
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
                    Dokter Pengirim
                    <span> </span>
                  </p>
                  <p>dr. Anji Sp. M</p>
                </div>
                <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
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
        <!-- Status Verifikasi Resep -->
        <div
          class="grid grid-cols-1"
          v-if="
            TransactionHistoryObatDetailPayload.itemType == 'obat' &&
            TransactionHistoryObatDetailPayload.statusType == 'resep'
          "
        >
          <CustomAccordion no-border initial-state="0">
            <template #header>Status Verifikasi</template>
            <template #content>
              <div class="mt-[20px]">
                <DataTable
                  :value="TransactionHistoryObatDetailPayload.history"
                  class="text-xs"
                  scrollable
                  scrollHeight="flex"
                >
                  <!-- Resep -->
                  <Column header="Step" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <p class="">{{ slotProps.index + 1 }}</p>
                    </template>
                  </Column>

                  <!-- Proses -->
                  <Column header="Proses" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="text-SM">
                        <p class="font-bold underline underline-offset-2">
                          {{ slotProps.data.status }}
                        </p>
                      </div>
                      <div class="">
                        <p>{{ slotProps.data.petugas }}</p>
                      </div>
                    </template>
                  </Column>

                  <!-- Tanggal -->
                  <Column header="Tanggal" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div>
                        <p class="text-sm">
                          {{ epochToDate(slotProps.data.date, "date") }}
                        </p>
                      </div>
                    </template>
                  </Column>

                  <!-- Jam -->
                  <Column header="Jam" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="">
                        <p class="text-sm">
                          {{ epochToDate(slotProps.data.date, "time") }}
                        </p>
                      </div>
                    </template>
                  </Column>
                </DataTable>
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
        <!-- Status Verifikasi Retur -->
        <div
          class="grid grid-cols-1"
          v-if="
            TransactionHistoryObatDetailPayload.itemType == 'obat' &&
            TransactionHistoryObatDetailPayload.statusType == 'retur'
          "
        >
          <CustomAccordion no-border initial-state="0">
            <template #header>Status Retur</template>
            <template #content>
              <div class="mt-[20px]">
                <DataTable
                  :value="TransactionHistoryObatDetailPayload.history"
                  class="text-xs"
                  scrollable
                  scrollHeight="flex"
                >
                  <!-- Resep -->
                  <Column header="Step" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <p class="">{{ slotProps.index + 1 }}</p>
                    </template>
                  </Column>

                  <!-- Proses -->
                  <Column header="Proses" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="text-SM">
                        <p class="font-bold underline underline-offset-2">
                          {{ slotProps.data.status }}
                        </p>
                      </div>
                      <div class="">
                        <p>{{ slotProps.data.petugas }}</p>
                      </div>
                    </template>
                  </Column>

                  <!-- Tanggal -->
                  <Column header="Tanggal" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div>
                        <p class="text-sm">
                          {{ epochToDate(slotProps.data.date, "date") }}
                        </p>
                      </div>
                    </template>
                  </Column>

                  <!-- Jam -->
                  <Column header="Jam" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="">
                        <p class="text-sm">
                          {{ epochToDate(slotProps.data.date, "time") }}
                        </p>
                      </div>
                    </template>
                  </Column>
                </DataTable>
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
        <!-- Status Verifikasi Batal -->
        <div
          class="grid grid-cols-1"
          v-if="
            TransactionHistoryObatDetailPayload.itemType == 'obat' &&
            TransactionHistoryObatDetailPayload.statusType == 'batal'
          "
        >
          <CustomAccordion no-border initial-state="0">
            <template #header>Status Verifikasi & Batal</template>
            <template #content>
              <div class="mt-[20px]">
                <DataTable
                  :value="TransactionHistoryObatDetailPayload.history"
                  class="text-xs"
                  scrollable
                  scrollHeight="flex"
                >
                  <!-- Resep -->
                  <Column header="Step" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <p class="">{{ slotProps.index + 1 }}</p>
                    </template>
                  </Column>

                  <!-- Proses -->
                  <Column header="Proses" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="text-SM">
                        <p class="font-bold underline underline-offset-2">
                          {{ slotProps.data.status }}
                        </p>
                      </div>
                      <div class="">
                        <p>{{ slotProps.data.petugas }}</p>
                      </div>
                    </template>
                  </Column>

                  <!-- Tanggal -->
                  <Column header="Tanggal" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div>
                        <p class="text-sm">
                          {{ epochToDate(slotProps.data.date, "date") }}
                        </p>
                      </div>
                    </template>
                  </Column>

                  <!-- Jam -->
                  <Column header="Jam" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="">
                        <p class="text-sm">
                          {{ epochToDate(slotProps.data.date, "time") }}
                        </p>
                      </div>
                    </template>
                  </Column>
                </DataTable>
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
        <!-- Alasan Retur -->
        <div
          class="grid grid-cols-1"
          v-if="
            TransactionHistoryObatDetailPayload.itemType == 'obat' &&
            TransactionHistoryObatDetailPayload.statusType == 'retur'
          "
        >
          <CustomAccordion no-border initial-state="0">
            <template #header>Alasan Retur</template>
            <template #content>
              <div class="mt-[20px]">
                <p>{{ TransactionHistoryObatDetailPayload.alasanRetur }}</p>
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
        <!-- Alasan Batal -->
        <div
          class="grid grid-cols-1"
          v-if="
            TransactionHistoryObatDetailPayload.itemType == 'obat' &&
            TransactionHistoryObatDetailPayload.statusType == 'batal'
          "
        >
          <CustomAccordion no-border initial-state="0">
            <template #header>Alasan Batal</template>
            <template #content>
              <div class="mt-[20px]">
                <p>{{ TransactionHistoryObatDetailPayload.alasanBatal }}</p>
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
        <!-- Asesmen Medis Resep -->
        <div
          class="grid grid-cols-1"
          v-if="
            TransactionHistoryObatDetailPayload.itemType == 'obat' &&
            TransactionHistoryObatDetailPayload.statusType == 'resep'
          "
        >
          <CustomAccordion no-border initial-state="0">
            <template #header>Asesmen Medis</template>
            <template #content>
              <div
                v-for="(
                  items, index
                ) in TransactionHistoryObatDetailPayload.items"
                :key="index"
                class="mt-[20px]"
              >
                <card class="bg-adameds-50">
                  <template #content>
                    <div class="flex justify-between">
                      <div class="flex">
                        <CustomButton class="text-sm h-7"
                          >0{{ index + 1 }}</CustomButton
                        >
                        <p class="ml-2 text-base font-bold">{{ items.name }}</p>
                        <PhArrowRight
                          :size="20"
                          class="my-auto ml-2 text-success-300"
                          weight="bold"
                        />
                        <p class="ml-2 text-base font-bold">{{ items.qty }}</p>
                      </div>
                      <div>
                        <CustomChip
                          v-if="items.isChronic == true"
                          :showCheckedIcon="false"
                          label="OBAT KRONIS"
                          borderColor="border-danger-300"
                          bgColor="bg-none"
                          textColor="text-danger-300"
                          customClass="h-5 border-danger-300"
                        />
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
                    <!-- Stok Obat -->
                    <Column header="Stok Obat">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ slotProps.data.jenisStok }}
                        </div>
                      </template>
                    </Column>
                    <!-- Aturan & Cara Pakai -->
                    <Column header="Aturan & Cara Pakai">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ slotProps.data.aturanPakai }}
                        </div>
                      </template>
                    </Column>
                    <!-- Satuan -->
                    <Column header="Satuan">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ formatPrice(slotProps.data.hargaSatuan) }}
                        </div>
                      </template>
                    </Column>
                    <!-- Jasa Resep -->
                    <Column header="Jasa Resep">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ slotProps.data.jasaResep }}
                        </div>
                      </template>
                    </Column>
                    <!-- Total -->
                    <Column header="Total">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ formatPrice(slotProps.data.totalHarga) }}
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
        </div>
        <!-- Daftar Resep / Obat Retur -->
        <div
          class="grid grid-cols-1"
          v-if="
            TransactionHistoryObatDetailPayload.itemType == 'obat' &&
            TransactionHistoryObatDetailPayload.statusType == 'retur'
          "
        >
          <CustomAccordion no-border initial-state="0">
            <template #header>Daftar Resep / Obat</template>
            <template #content>
              <div
                v-for="(
                  items, index
                ) in TransactionHistoryObatDetailPayload.retur"
                :key="index"
                class="mt-[20px]"
              >
                <card class="bg-adameds-50">
                  <template #content>
                    <div class="flex justify-between">
                      <div class="flex">
                        <CustomButton class="text-sm h-7"
                          >0{{ index + 1 }}</CustomButton
                        >
                        <p class="ml-2 text-base font-bold">{{ items.name }}</p>
                        <PhArrowRight
                          :size="20"
                          class="my-auto ml-2 text-success-300"
                          weight="bold"
                        />
                        <p class="ml-2 text-base font-bold">{{ items.qty }}</p>
                      </div>
                      <div>
                        <CustomChip
                          v-if="items.isChronic == true"
                          :showCheckedIcon="false"
                          label="OBAT KRONIS"
                          borderColor="border-danger-300"
                          bgColor="bg-none"
                          textColor="text-danger-300"
                          customClass="h-5 border-danger-300"
                        />
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
                    <!-- Stok Obat -->
                    <Column header="Stok Obat">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ slotProps.data.jenisStok }}
                        </div>
                      </template>
                    </Column>
                    <!-- Aturan & Cara Pakai -->
                    <Column header="Aturan & Cara Pakai">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ slotProps.data.aturanPakai }}
                        </div>
                      </template>
                    </Column>
                    <!-- Satuan -->
                    <Column header="Satuan">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ formatPrice(slotProps.data.hargaSatuan) }}
                        </div>
                      </template>
                    </Column>
                    <!-- Jasa Resep -->
                    <Column header="Jasa Resep">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ slotProps.data.jasaResep }}
                        </div>
                      </template>
                    </Column>
                    <!-- Total -->
                    <Column header="Total">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ formatPrice(slotProps.data.totalHarga) }}
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
        </div>
        <!-- Daftar Resep / Obat Batal -->
        <div
          class="grid grid-cols-1"
          v-if="
            TransactionHistoryObatDetailPayload.itemType == 'obat' &&
            TransactionHistoryObatDetailPayload.statusType == 'batal'
          "
        >
          <CustomAccordion no-border initial-state="0">
            <template #header>Daftar Resep / Obat</template>
            <template #content>
              <div
                v-for="(
                  items, index
                ) in TransactionHistoryObatDetailPayload.items"
                :key="index"
                class="mt-[20px]"
              >
                <card class="bg-adameds-50">
                  <template #content>
                    <div class="flex justify-between">
                      <div class="flex">
                        <CustomButton class="text-sm h-7"
                          >0{{ index + 1 }}</CustomButton
                        >
                        <p class="ml-2 text-base font-bold">{{ items.name }}</p>
                        <PhArrowRight
                          :size="20"
                          class="my-auto ml-2 text-success-300"
                          weight="bold"
                        />
                        <p class="ml-2 text-base font-bold">{{ items.qty }}</p>
                      </div>
                      <div>
                        <CustomChip
                          v-if="items.isChronic == true"
                          :showCheckedIcon="false"
                          label="OBAT KRONIS"
                          borderColor="border-danger-300"
                          bgColor="bg-none"
                          textColor="text-danger-300"
                          customClass="h-5 border-danger-300"
                        />
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
                    <!-- Stok Obat -->
                    <Column header="Stok Obat">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ slotProps.data.jenisStok }}
                        </div>
                      </template>
                    </Column>
                    <!-- Aturan & Cara Pakai -->
                    <Column header="Aturan & Cara Pakai">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ slotProps.data.aturanPakai }}
                        </div>
                      </template>
                    </Column>
                    <!-- Satuan -->
                    <Column header="Satuan">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ formatPrice(slotProps.data.hargaSatuan) }}
                        </div>
                      </template>
                    </Column>
                    <!-- Jasa Resep -->
                    <Column header="Jasa Resep">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ slotProps.data.jasaResep }}
                        </div>
                      </template>
                    </Column>
                    <!-- Total -->
                    <Column header="Total">
                      <template #body="slotProps">
                        <div class="text-SM">
                          {{ formatPrice(slotProps.data.totalHarga) }}
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
        </div>
      </div>

      <!-- Total Tagihan Resep -->
      <div
        class="mt-4"
        v-if="
          TransactionHistoryObatDetailPayload.itemType == 'obat' &&
          TransactionHistoryObatDetailPayload.statusType == 'resep'
        "
      >
        <card class="bg-adameds-50">
          <template #content>
            <div class="flex justify-between">
              <p class="text-base font-bold">Total Tagihan Resep</p>
              <p class="text-base font-bold">
                {{
                  formatPrice(TransactionHistoryObatDetailPayload.grandTotal)
                }}
              </p>
            </div>
          </template>
        </card>
      </div>
      <!-- Total Tagihan Retur -->
      <div
        class="mt-4"
        v-if="
          TransactionHistoryObatDetailPayload.itemType == 'obat' &&
          TransactionHistoryObatDetailPayload.statusType == 'retur'
        "
      >
        <card class="bg-adameds-50">
          <template #content>
            <div class="flex justify-between">
              <p class="text-base font-bold">Total Retur</p>
              <p class="text-base font-bold">
                {{
                  formatPrice(TransactionHistoryObatDetailPayload.grandTotal)
                }}
              </p>
            </div>
          </template>
        </card>
      </div>
      <!-- Total Tagihan Batal -->
      <div
        class="mt-4"
        v-if="
          TransactionHistoryObatDetailPayload.itemType == 'obat' &&
          TransactionHistoryObatDetailPayload.statusType == 'batal'
        "
      >
        <card class="bg-adameds-50">
          <template #content>
            <div class="flex justify-between">
              <p class="text-base font-bold">Total Tagihan Resep</p>
              <p class="text-base font-bold">
                {{
                  formatPrice(TransactionHistoryObatDetailPayload.grandTotal)
                }}
              </p>
            </div>
          </template>
        </card>
      </div>
    </template>
  </CustomDialog>
</template>
