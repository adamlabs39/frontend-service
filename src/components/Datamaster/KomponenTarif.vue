<script lang="ts" setup>
import CustomAccordion from "../Base/CustomAccordion.vue";
import CustomTextfield from "../Base/CustomTextfield.vue";
import CustomSwitch from "../Base/CustomSwitch.vue";
import CustomButton from "../Base/CustomButton.vue";
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-300 text-white">
    <template #header>
      <div class="flex justify-between w-full mr-5">
        <div class="basis-7/12">Komponen Tarif</div>
        <div class="basis-2/12 flex justify-center">Persen(%)</div>
        <div class="basis-3/12 flex items-end justify-end pr-2.5">Total</div>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2.5">
        <!-- list komponent tarif -->
        <div class="-mr-[18px] flex pt-5">
          <div class="flex justify-between w-full">
            <div class="basis-7/12 pr-2.5">
              <div class="flex items-end gap-2.5">
                <div class="grow pr-2.5">
                  <CustomTextfield
                    label=""
                    placeholder="Nama Komponen Tarif"
                    type="search"
                  />
                </div>
                <div class="flex gap-2.5">
                  <div class="border w-[100px] p-2 rounded-lg flex gap-2.5">
                    <CustomSwitch />
                    <div class="flex items-center text-[#6B7280]">(%)</div>
                  </div>
                  <div class="border w-[100px] p-2 rounded-lg flex gap-2.5">
                    <CustomSwitch />
                    <div class="flex items-center text-[#6B7280]">(Rp)</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="basis-2/12 px-2.5">
              <CustomTextfield class="text-[20px]" label="" placeholder="0">
                <template #appendText>
                  <div
                    class="font-semibold text-MD leading-7 text-[#494E56] mr-2.5 flex items-center justify-center"
                  >
                    %
                  </div>
                </template>
              </CustomTextfield>
            </div>
            <div class="basis-3/12 px-2.5">
              <CustomTextfield pr label="" placeholder="0">
                <template #prependText>
                  <div
                    class="font-semibold text-MD leading-7 text-adameds-300 w-[53.34px] flex items-center justify-center border-r"
                  >
                    Rp.
                  </div>
                </template>
              </CustomTextfield>
            </div>
          </div>
          <div class="w-[60px]">
            <div class="flex h-full items-end justify-center">
              <CustomButton icon="PhTrash" backgroundColor="bg-[#FF5252]" />
            </div>
          </div>
        </div>
        <hr class="-mx-[18px]">
        <!-- tambah komponen tarif -->
        <div class="border border-dashed border-adameds-300 rounded-lg flex items-center justify-center p-5">
          <CustomButton icon="PhPlus" label="Komponen Tarif" borderColor="border-adameds-300" textColor="text-adameds-300" backgroundColor="bg-white" />
        </div>
        <hr class="-mx-[18px]">
        <!-- grand total -->
         <div class="flex items-center justify-end gap-5">
          <div class="py-2.5 pr-5 border-r border-adameds-300">Grand Total</div>
          <div class="min-w-[280px] bg-adameds-50 p-2.5 flex justify-end rounded-lg text-MD font-bold text-adameds-300">
            Rp. 30,000
          </div>
         </div>
      </div>
    </template>
  </CustomAccordion>
</template>
