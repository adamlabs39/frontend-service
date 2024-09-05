<script setup lang="ts">
import { ref } from 'vue';
import CustomTextfield from '../Base/CustomTextfield.vue';
import KomponenTarif from './KomponenTarifV1.vue';
import CustomAutoComplete from '../Base/CustomAutoComplete.vue';
import CustomButton from '../Base/CustomButton.vue';
import CustomSelect from '../Base/CustomSelect.vue';
const data = ref([
  { no: "", content: '' },
]);
</script>

<template>

  <DataTable :value="data" tableStyle="min-width: 50rem" class="overflow-hidden rounded-lg bg-adameds-50 text-xs">
    <Column field="no" header="No" headerClass="bg-adameds-300 text-white" class="w-5 text-center">
      <template #body="slotProps">
        1
      </template>
    </Column>
    <Column header="Varian Tarif" headerClass="bg-adameds-300 text-white">
      <template #body="slotProps">
        <div class="flex flex-col gap-2.5">
          <div class="flex flex-row items-end gap-5">
            <CustomTextfield label="Nama Varian Tarif" class="basis-4/12" />
            <CustomSelect placeHolder="" label="Unit Pelayanan" :isLoading="false" class="basis-3/12" />
            <CustomAutoComplete label="Metode Pembayaran" class="basis-4/12" />
            <CustomButton backgroundColor="bg-danger-300" label="Hapus" class="basis-1/12" />
          </div>
          <div>
            <!-- <KomponenTarif/> -->
            <slot name="tarif"></slot>
          </div>
        </div>
      </template>
    </Column>
  </DataTable>
</template>
