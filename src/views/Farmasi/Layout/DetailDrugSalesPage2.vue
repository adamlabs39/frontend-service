<script setup lang="ts">
import { ref, onMounted, computed, watch, type PropType } from "vue";
import { useDrugSalesStore } from "@/stores/farmasi/DrugSales";
import { utilsStore } from "@/stores/utils";
import { epochToDate, formatPrice } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import type { MenuItem } from "primevue/menuitem";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  selectedData: {
    type: Object,
    default: () => ({}),
  },
});

// State Management
const DrugSalesStore = useDrugSalesStore();
const UseUtilsStore = utilsStore();
const DrugSalesDetailPayload = ref<any>({});
const alasanBatal = ref("");

// Fetch Drug Sales Detail
const fetchDrugSalesDetail = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await DrugSalesStore.getApiDetail(props.selectedData.uuid);

    if (response && response.payload) {
      DrugSalesDetailPayload.value = response.payload;
    } else {
      DrugSalesDetailPayload.value = {};
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const confirmDelete = async () => {
  UseUtilsStore.setLoading(true);
  try {
    await DrugSalesStore.deleteApi(
      DrugSalesDetailPayload.value.uuid,
      {
        alasan_batal: alasanBatal.value
      }
    );    
  } catch (error) {
    console.error("Failed to delete data", error);
  } finally {
    UseUtilsStore.setLoading(false);
    batalDialog.value = false;
    emit("back");
  }
};

const batalDialog = ref(false);

const emit = defineEmits(["back"]);

onMounted(() => {
  fetchDrugSalesDetail();
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      pt:body:class="h-full pt-0 pb-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden overflow-y-auto"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
          <template #header>
            <div class="flex justify-between w-full">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Penjualan Obat',
                    home: true,
                  }"
                  :model="dataBreadCrumb"
                  class="ml-1"
                />
              </div>
              <div class="flex">
                <CustomButton
                  @click="emit('back')"
                  icon="PhCaretLeft"
                  label="Kembali"
                  class="mr-[10px]"
                  outlined
                  borderColor="border-adameds-300"
                  textColor="text-adameds-300"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-4 gap-4 mt-[20px]">
              <div>
                <p class="text-xs font-bold underline underline-offset-2">
                  Tgl. Transaksi
                </p>
                <p>{{ epochToDate(DrugSalesDetailPayload.tanggalPembelian,"dateTime") }}
                </p>
              </div>
              <div>
                <p class="text-xs font-bold underline underline-offset-2">
                  Lokasi Stok
                </p>
                <p>{{ DrugSalesDetailPayload.lokasiStok?.name }}</p>
              </div>
              <div>
                <p class="text-xs font-bold underline underline-offset-2">
                  Nama Pembeli
                </p>
                <p>{{ DrugSalesDetailPayload.namaPembeli }}</p>
              </div>
              <div>
                <p class="text-xs font-bold underline underline-offset-2">
                  No. Handphone
                </p>
                <p>{{ DrugSalesDetailPayload.noHp }}</p>
              </div>
            </div>
            <div class="grid grid-cols-1 mt-[10px]">
              <div>
                <p class="text-xs font-bold underline underline-offset-2">
                  Catatan
                </p>
                <p>{{ DrugSalesDetailPayload.catatan }}</p>
              </div>
            </div>
            <hr class="mt-5 border-1 border-grey-200" />
            <div class="mt-[20px] h-[260px]">
              <DataTable
                :value="DrugSalesDetailPayload.items"
                scrollable
                scrollHeight="flex"
                :pt="{ headerRow: 'text-SM' }"
              >
                <!-- No -->
                <Column headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold">No.</div>
                  </template>
                  <template #body="slotProps">
                    <div class="text-sm">{{ slotProps.index + 1 }}</div>
                  </template>
                </Column>

                <!-- Nama Item -->
                <Column header="Nama Item" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <div class="text-sm">
                      {{ slotProps.data.itemMedis.name }}
                    </div>
                  </template>
                </Column>

                <!-- Jenis Stok -->
                <Column headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold text-center">
                      Jenis Stok
                    </div>
                  </template>
                  <template #body="slotProps">
                    <div class="text-center">
                      <div class="text-sm">
                        {{ slotProps.data.jenisStok.name }}
                      </div>
                    </div>
                  </template>
                </Column>

                <!-- Pembelian -->
                <Column headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold text-center">
                      Pembelian
                    </div>
                  </template>
                  <template #body="slotProps">
                    <div class="text-center">
                      <div class="text-sm">
                        {{ slotProps.data.qty }}
                      </div>
                    </div>
                  </template>
                </Column>

                <!-- Satuan -->
                <Column headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold text-center">Satuan</div>
                  </template>
                  <template #body="slotProps">
                    <div class="text-center">
                      <div class="text-sm">
                        {{ slotProps.data?.satuan?.name }}
                      </div>
                    </div>
                  </template>
                </Column>

                <!-- Harga Satuan -->
                <Column headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold text-center">
                      Harga Satuan
                    </div>
                  </template>
                  <template #body="slotProps">
                    <div class="text-center">
                      <div class="text-sm">
                        {{ formatPrice(slotProps.data.hargaSatuan) }}
                      </div>
                    </div>
                  </template>
                </Column>

                <!-- Jumlah -->
                <Column headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold text-center">Jumlah</div>
                  </template>
                  <template #body="slotProps">
                    <div class="text-center">
                      <div class="text-sm">
                        {{ formatPrice(slotProps.data.qty * slotProps.data.hargaSatuan) }}
                      </div>
                    </div>
                  </template>
                </Column>

                <!-- Diskon -->
                <Column headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold text-center">Diskon</div>
                  </template>
                  <template #body="slotProps">
                    <div class="text-center">
                      <div class="text-sm">
                        {{ formatPrice(slotProps.data.diskon) }}
                      </div>
                    </div>
                  </template>
                </Column>

                <!-- Total -->
                <Column field="total" headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold text-center">Total</div>
                  </template>
                  <template #body="slotProps">
                    <div class="text-center">
                      <div class="text-sm">
                        {{ formatPrice(slotProps.data.qty * slotProps.data.hargaSatuan - slotProps.data.diskon) }}
                      </div>
                    </div>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-between w-full mt-[25px]">
              <div class="flex">
                <div>
                  <p class="font-bold underline underline-offset-2">
                    Total Item
                  </p>
                  <p>{{ DrugSalesDetailPayload.totalItem }} item</p>
                </div>
                <div class="ml-[70px]">
                  <p class="font-bold underline underline-offset-2">
                    Grand Total
                  </p>
                  <p>{{ formatPrice(DrugSalesDetailPayload.totalHarga) }}</p>
                </div>
              </div>
              <div class="mt-[5px]">
                <CustomButton
                  @click="batalDialog = true"
                  label="Batal Penjualan"
                  class="w-full"
                  backgroundColor="bg-danger-300"
                  borderColor="border-danger-300"
                  textColor="text-white"
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
    </Card>

    <!-- Dialog Cancel -->
    <CustomDialog
      v-model:visible="batalDialog"
      width="700px"
      headerBg="bg-danger-300"
    >
      <template #header>Batal Penjualan</template>
      <template #body>
        <div class="grid grid-cols-1">
          <div>
            <p class="mt-[20px] font-bold">
              Alasan Batal Penjualan <span class="text-danger-300">*</span>
            </p>
          </div>
          <div class="mt-[15px]">
            <CustomTextfield
              v-model="alasanBatal"
              :showLabel="false"
              placeholder="Alasan Batal Penjualan"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton
            @click="batalDialog = false"
            label="Tidak"
            outlined
            class="mr-[10px]"
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            @click="confirmDelete"
            label="Iya, Batalkan"
            backgroundColor="bg-danger-300"
            borderColor="border-danger-300"
            textColor="text-white"
          />
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
