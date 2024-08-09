<script setup lang="ts">
import { ref } from "vue";
import CustomTextfield from "../Base/CustomTextfield.vue";
import KomponenTarif from "./KomponenTarifV1.vue";
import CustomAutoComplete from "../Base/CustomAutoComplete.vue";
import CustomSwitch from "../Base/CustomSwitch.vue";
import CustomButton from "../Base/CustomButton.vue";
import CustomSelect from "../Base/CustomSelect.vue";
const data = ref([{ jenisPembayaran: "", harga: "",  action: "" }]);
</script>

<template>
  <div>
    <DataTable
      :value="data"
      tableStyle="min-width: 50rem"
      class="bg-adameds-50 text-xs"
    >
      <Column headerClass="bg-adameds-300 text-white" class="w-1/2">
        <template #header>
          <div>Jenis Pembayaran Bed</div>
        </template>
        <template #body>
          <CustomSelect label="" />
        </template>
      </Column>
      <Column header="Harga Bed" headerClass="bg-adameds-300 text-white">
        <template #body>
          <CustomTextfield pr label="" placeholder="0">
            <template #prependText>
              <div
                class="font-semibold text-MD leading-7 text-adameds-300 w-[53.34px] flex items-center justify-center border-r"
              >
                Rp.
              </div>
            </template>
          </CustomTextfield>
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
    
  </div>
</template>
