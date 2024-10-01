<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import type { PropType } from "vue";

const props = defineProps({
  fields: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  products: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

const emit = defineEmits(["showDetail"]);
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>01 Jan 2024</template>
    <template #content>
      <div class="py-5 flex flex-col gap-[10px]">
        <DataTable
          :value="fields"
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
            field="value.namaTindakan"
            header="List Tindakan"
            headerClass="bg-adameds-50"
          >
            <template #body="slotProps">
              <div>
                <div>{{ slotProps.data.value.namaTindakan }}</div>
                <div class="font-bold">
                  Rp. {{ slotProps.data.value.hargaTindakan }}
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
                <span> {{ slotProps.data.value.qtyTindakan }}</span>
              </div>
            </template>
          </Column>
        </DataTable>
        <CustomInfoRow label="Berat Badan" type="vertical">
          <template #value>
            <div>{{ `beratBadan` }} Kg</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="Tinggi Badan" type="vertical">
          <template #value>
            <div>{{ `tinggiBadan` }} Cm</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="IMT" type="vertical">
          <template #value>
            <div>{{ `IMT` }} Kg/m²</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="Catatan" :value="`catatan`" type="vertical" />
        <hr class="border-grey-200" />
        <div class="flex">
          <div class="flex justify-between grow">
            <CustomInfoRow
              label="Petugas Input"
              value="Nama Petugas"
              type="vertical"
            />
            <CustomInfoRow
              label="Jam Input"
              :value="`petugas`"
              type="vertical"
              alignment="right"
            />
          </div>
          <div class="flex">
            <div class="border border-adameds-300 mx-[15px] my-[10px]"></div>
            <CustomButton
              @click="emit('showDetail')"
              class="!rounded-md my-[10px] ml-auto"
              label="Detail"
              size="small"
            />
          </div>
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
