<script setup lang="ts">
import { ref } from "vue";
import CustomTextfield from "../Base/CustomTextfield.vue";
import KomponenTarif from "./KomponenTarifV1.vue";
import CustomAutoComplete from "../Base/CustomAutoComplete.vue";
import CustomSwitch from "../Base/CustomSwitch.vue";
import CustomButton from "../Base/CustomButton.vue";
import CustomSelect from "../Base/CustomSelect.vue";
const data = ref([{ jenisPembayaran: "", harga: "",  action: "" }, { jenisPembayaran: "", harga: "",  action: "" }]);
const addRow = () => {
  data.value.push({
    jenisPembayaran: "",
    harga: "",
    action: "" 
  });
};
</script>

<template>
  <div>
    <DataTable
      :value="data"
      tableStyle="min-width: 50rem"
      class="overflow-hidden text-xs rounded-lg bg-adameds-50 "

    >
      <Column headerClass="bg-adameds-300 text-white" class="w-1/2">
        <template #header>
          <div>Jenis Pembayaran Bed</div>
        </template>
        <template #body>
          <CustomSelect label="" place-holder="Jenis Pembayaran Lain" />
        </template>
      </Column>
      <Column headerClass="bg-adameds-300 text-white">
        <template #header>
        <div class="w-full font-semibold text-end">Harga Bed</div>
      </template>
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
      <Column headerClass="bg-adameds-300 text-white">
        <template #header>
        <div class="w-full font-semibold text-center">Action</div>
      </template>
        <template #body="slotProps">
          <div class="flex items-center justify-center">
            <CustomButton label="" background-color="bg-danger-300 rounded-lg">
            <img src="@/assets/icons/delete.svg" alt="" width="15px" />
          </CustomButton>
          </div>
        </template>
      </Column>
    </DataTable>
    <div
        class="flex items-center justify-center p-5 m-5 border border-dashed rounded-lg border-adameds-300"
      >
        <CustomButton
          icon="PhPlus"
          label="Jenis Pembayaran"
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          backgroundColor="bg-white"
          @click="addRow"
        />
      </div>
  </div>
</template>
