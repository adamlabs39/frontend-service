<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUnitDeliveryVerificationStore } from "@/stores/inventory/unitDeliveryVerification";
import { utilsStore } from "@/stores/utils";
import { epochToDate, formatPrice } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  selectedData: {
    type: Object,
    default: () => ({}),
  },
});

// State Management
const UnitDeliveryVerificationStore = useUnitDeliveryVerificationStore();
const UseUtilsStore = utilsStore();
const DetailPayload = ref<any>({});

const emit = defineEmits(["back"]);

// Fetch Detail
const fetchDetail = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await UnitDeliveryVerificationStore.getApiDetail(
      props.selectedData.uuid
    );
    if (response && response.payload) {
      DetailPayload.value = response.payload;
    } else {
      DetailPayload.value = {};
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const emit = defineEmits(["kembali"]);

onMounted(() => {
  fetchDetail();
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
            <div class="flex items-center justify-between w-full align-middle">
              <div class="flex items-center">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Riwayat Tarif',
                    home: true,
                  }"
                  :model="[
                    {
                      label: detailData?.namaItem,
                    },
                  ]"
                >
                </CustomBreadCrumb>
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
            <div class="flex flex-col gap-2.5 pt-2.5">
              <div class="flex gap-5">
                <div class="grid grid-rows-2">
                  <div class="grid grid-cols-2">
                    <div>
                      <div class="font-semibold underline text-SM">
                        Kode Item
                      </div>
                      <div class="font-normal text-normal">{{}}</div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div>
                      <div class="font-semibold underline text-SM">Pabrik</div>
                      <div class="font-normal text-normal">{{}}</div>
                    </div>
                  </div>
                </div>
                <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
                <div class="grid grid-cols-2 grow">
                  <div>
                    <div class="font-semibold underline text-SM">Kategori</div>
                    <div class="font-normal text-normal">{{}}</div>
                  </div>
                  <div>
                    <div class="font-semibold underline text-SM">
                      Jenis Stok
                    </div>
                    <div class="font-normal text-normal">{{}}</div>
                  </div>
                  <div>
                    <div class="font-semibold underline text-SM">
                      Jenis Item
                    </div>
                    <div class="font-normal text-normal">{{}}</div>
                  </div>
                  <div>
                    <div class="font-semibold underline text-SM">
                      Satuan Penggunaan
                    </div>
                    <div class="font-normal text-normal">{{}}</div>
                  </div>
                </div>
                <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
                <div class="grid grid-rows-2 min-w-[400px]">
                  <div class="grid grid-cols-2">
                    <div>
                      <div class="font-semibold underline text-SM">
                        Harga Dasar
                      </div>
                      <div class="font-normal text-normal">{{}}</div>
                    </div>
                    <div>
                      <div class="font-semibold underline text-SM">HNA</div>
                      <div class="font-normal text-normal">{{}}</div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div>
                      <div class="font-semibold underline text-SM">HPP</div>
                      <div class="font-normal text-normal">{{}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="border-grey-200" />
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
        <CustomAccordion
          :openWithHeader="false"
          noBorder
          initialState="0"
          header-class="-mt-4"
        >
          <template #header>
            <div class="-mx-4">Konversi Satuan</div>
          </template>
          <template #content>
            <DataTable
              :value="[]"
              tableStyle="min-width: 50rem"
              scrollable
              class="-mx-[18px]"
              scrollHeight="240px"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column field="jenisSatuan" headerClass="bg-adameds-50">
                <template #header>
                  <div class="font-semibold">Jenis Satuan</div>
                </template>
                <template #body="slotProps">
                  <div class="text-SM">
                    {{ slotProps.data.jenisSatuan }}
                  </div>
                </template>
              </Column>
              <Column field="satuan" headerClass="bg-adameds-50">
                <template #header>
                  <div class="font-semibold">Satuan</div>
                </template>
                <template #body="slotProps">
                  <div class="text-SM">
                    {{ slotProps.data.satuan }}
                  </div>
                </template>
              </Column>
              <Column field="konversiIsi" headerClass="bg-adameds-50">
                <template #header>
                  <div class="font-semibold">Konversi Isi</div>
                </template>
                <template #body="slotProps">
                  <div class="text-SM">
                    {{ slotProps.data.konversiIsi }} Pcs
                  </div>
                </template>
              </Column>
            </DataTable>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-white"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-white"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
        <CustomAccordion
          :openWithHeader="false"
          noBorder
          initialState="0"
          header-class="-mt-4"
        >
          <template #header>
            <div class="-mx-4">Riwayat Penerimaan Pembelian</div>
          </template>
          <template #content>
            <DataTable
              :value="[]"
              tableStyle="min-width: 50rem"
              scrollable
              class="-mx-[18px]"
              scrollHeight="240px"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column field="tanggal" headerClass="bg-adameds-50">
                <template #header>
                  <div class="font-semibold">Tanggal</div>
                </template>
                <template #body="slotProps">
                  <div class="text-SM">
                    {{ slotProps.data.tanggal }}
                  </div>
                </template>
              </Column>
              <Column field="expDate" headerClass="bg-adameds-50">
                <template #header>
                  <div class="font-semibold">Exp Date</div>
                </template>
                <template #body="slotProps">
                  <div class="text-SM">
                    {{ slotProps.data.expDate }}
                  </div>
                </template>
              </Column>
              <Column field="hargaDasar" headerClass="bg-adameds-50">
                <template #header>
                  <div class="font-semibold">Harga Dasar</div>
                </template>
                <template #body="slotProps">
                  <div class="text-SM">Rp. {{ slotProps.data.hargaDasar }}</div>
                </template>
              </Column>
              <Column field="HNA" headerClass="bg-adameds-50">
                <template #header>
                  <div class="font-semibold">HNA</div>
                </template>
                <template #body="slotProps">
                  <div class="text-SM">Rp. {{ slotProps.data.HNA }}</div>
                </template>
              </Column>
              <Column field="HPP" headerClass="bg-adameds-50">
                <template #header>
                  <div class="font-semibold">HPP</div>
                </template>
                <template #body="slotProps">
                  <div class="text-SM">Rp. {{ slotProps.data.HPP }}</div>
                </template>
              </Column>
            </DataTable>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-white"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-white"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
      </template>
    </Card>
  </div>
</template>
