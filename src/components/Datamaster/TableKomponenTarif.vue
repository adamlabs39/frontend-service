<script setup lang="ts">
import { ref } from "vue";
import CustomTextfield from "../Base/CustomTextfield.vue";
import KomponenTarif from "./KomponenTarifV1.vue";
import CustomAutoComplete from "../Base/CustomAutoComplete.vue";
import CustomSwitch from "../Base/CustomSwitch.vue";
import CustomButton from "../Base/CustomButton.vue";
import CustomSelect from "../Base/CustomSelect.vue";
const data = ref([{ komponenTarif: "", persen: "", rupiah: "", action: "" }]);
const addRow = () => {
  data.value.push({
    komponenTarif: "",
    persen: "",
    rupiah:"",
     action: ""
  });
};
</script>

<template>
  <div>
    <DataTable
      :value="data"
      tableStyle="min-width: 50rem"
      class="text-xs bg-adameds-50"
    >
      <Column headerClass="bg-adameds-300 text-white" class="w-1/2">
        <template #header>
          <div>Komponen Tarif</div>
        </template>
        <template #body>
          <CustomSelect label="" place-holder="Pilih Komponen Tarif" />
        </template>
      </Column>
      <Column header="Persen (%)" headerClass="bg-adameds-300 text-white">
        <template #body>
          <CustomTextfield class="text-[20px]" label="" placeholder="0">
            <template #appendText>
              <div
                class="font-semibold text-MD leading-7 text-[#494E56] mr-2.5 flex items-center justify-center"
              >
                %
              </div>
            </template>
          </CustomTextfield>
        </template>
      </Column>
      <Column header="Rupiah (Rp)" headerClass="bg-adameds-300 text-white">
        <template #body>
          <CustomTextfield pr label="" placeholder="0">
            <template #prependText>
              <div
                class="font-semibold text-MD leading-7 text-adameds-300 w-[53.34px] flex items-center justify-center border-r "
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
    <div class="flex w-full gap-5 p-5">
      <div class="w-1/2 pr-2.5">
        <div
          class="flex items-center justify-center p-5 border border-dashed rounded-lg border-adameds-300"
        >
          <CustomButton
            icon="PhPlus"
            label="Komponen Tarif"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="addRow"
          />
        </div>
      </div>
      <div class="flex flex-col grow gap-1.5">
        <div class="font-semibold text-MD">Tipe Input Harga</div>
        <div class="flex gap-2.5">
          <div class="p-2 flex gap-2.5">
            <CustomSwitch :show-label="false"/>
            <div class="flex items-center text-[#6B7280]">Persen (%)</div>
          </div>
          <div class="p-2 flex gap-2.5">
            <CustomSwitch :show-label="false" />
            <div class="flex items-center text-[#6B7280]">Rupiah (Rp)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
