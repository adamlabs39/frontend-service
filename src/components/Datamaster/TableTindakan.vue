<script setup lang="ts">
import { ref } from "vue";
import CustomTextfield from "../Base/CustomTextfield.vue";
import KomponenTarif from "./KomponenTarifV1.vue";
import CustomAutoComplete from "../Base/CustomAutoComplete.vue";
import CustomSwitch from "../Base/CustomSwitch.vue";
import CustomButton from "../Base/CustomButton.vue";
import CustomSelect from "../Base/CustomSelect.vue";
import TableKomponenTarif from "./TableKomponenTarif.vue";
const data = ref([{ no: "", tindakan: "", action: "" }]);
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <DataTable
      :value="data"
      tableStyle="min-width: 50rem"
      class="overflow-hidden text-xs rounded-lg bg-adameds-50"
    >
      <Column header="No." headerClass="bg-adameds-300 text-white">
        <template #body> 1 </template>
      </Column>
      <Column headerClass="bg-adameds-300 text-white" class="w-full">
        <template #header>
          <div>Komponen Tarif</div>
        </template>
        <template #body>
          <CustomSelect label="" />
        </template>
      </Column>
      <Column header="Action" headerClass="bg-adameds-300 text-white">
        <template #body="slotProps">
          <CustomButton label="" background-color="bg-danger-300 rounded-lg">
            <img src="@/assets/icons/delete.svg" alt="" width="15px" />
          </CustomButton>
        </template>
      </Column>
    </DataTable>
    <div class="flex flex-col gap-5 p-5">
      <div
        class="flex items-center justify-center p-5 border border-dashed rounded-lg border-adameds-300"
      >
        <CustomButton
          icon="PhPlus"
          label="Komponen Tarif"
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          backgroundColor="bg-white"
        />
      </div>
      <TableKomponenTarif/>
      <hr class="border-grey-200">
      <div class="flex items-center justify-end gap-4">
        <div class="pr-4 py-2.5 border-r border-grey-300 font-bold text-MD">Grand Total</div>
        <div class="min-w-[300px] text-end font-bold text-MD">
            Rp. 150,000
        </div>
      </div>
    </div>
  </div>
</template>
