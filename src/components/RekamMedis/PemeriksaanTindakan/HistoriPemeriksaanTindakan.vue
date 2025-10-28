<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import { epochToDate } from "@/utils/Helpers";
import type { PropType } from "vue";

const props = defineProps({
  history: {
    type: Object as PropType<any>,
    default: null,
  },
});

const emit = defineEmits(["showDetail"]);
</script>

<template>
  <div v-if="history && history.data && history.data.length > 0">
    <CustomAccordion headerClass="bg-adameds-50" :initialState="'0'">
      <template #header>
        {{ epochToDate(history.data[0].createdAt, 'date') || "Data Riwayat" }}
      </template>
      <template #content>
        <div class="py-5 flex flex-col gap-[10px]">
          <DataTable
            :value="history.data"
            stripedRows
            class="mt-5 text-xs"
            scrollable
            scrollHeight="flex"
          >
            <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">No.</div>
              </template>
              <template #body="slotProps">
                <div class="flex items-center justify-center">
                  {{ slotProps.index + 1 }}
                </div>
              </template>
            </Column>
            <Column
              field="namaTindakan"
              header="List Tindakan"
              headerClass="bg-adameds-50"
            >
              <template #body="slotProps">
                <div>
                  <div>{{ slotProps.data.namaTindakan }}</div>
                  <div class="font-bold">
                    Rp. {{ slotProps.data.hargaTindakan }}
                  </div>
                </div>
              </template>
            </Column>
            <Column headerClass="bg-adameds-50" class="w-[150px]">
              <template #header>
                <div class="w-full font-semibold text-center">Jumlah</div>
              </template>
              <template #body="slotProps">
                <div class="w-full text-center">
                  <span> {{ slotProps.data.qtyTindakan }}</span>
                </div>
              </template>
            </Column>
          </DataTable>
          
          <CustomInfoRow label="Catatan" :value="history.data[0]?.catatan || '-'" type="vertical" />
          <hr class="border-grey-200" />
          <div class="flex justify-between">
            <CustomInfoRow
              label="Petugas Input"
              :value="history.data[0]?.petugas?.map((p: { nama: any; }) => p.nama).join(', ') || '-'"
              type="vertical"
            />
            <CustomInfoRow
              label="Jam Input"
              :value="String(epochToDate(history.data[0]?.updatedAt, 'time'))"
              type="vertical"
              alignment="right"
            />
          </div>
        </div>
      </template>
    </CustomAccordion>
  </div>
  <div v-else class="text-center text-grey-400 p-4">
    Tidak ada riwayat.
  </div>
</template>