<script lang="ts" setup>
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import TableTindakan from "@/components/Datamaster/TableTindakan.vue";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
</script>
<template>
  <div class="flex flex-col h-full gap-2.5">
    <div class="flex items-center justify-between w-full gap-2.5 my-2.5">
      <CustomSelect class="grow" label="Jenis Tarif" place-holder="Jenis Tarif" />
      <CustomTextfield class="grow" label="Nama Tarif Tindakan" placeholder="Nama Tarif Tindakan" />
      <div class="flex flex-col gap-1.5">
        <div class="font-semibold text-MD">Metode Pilihan Tarif</div>
        <div class="flex gap-2.5">
          <div class="p-2 flex gap-2.5">
            <CustomSwitch :show-label="false" />
            <div class="flex items-center text-[#6B7280]">Single</div>
          </div>
          <div class="p-2 flex gap-2.5">
            <CustomSwitch :show-label="false" />
            <div class="flex items-center text-[#6B7280]">Multiple</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between w-full gap-2.5">
      <CustomMultiSelect class="w-full" label="Pelayanan" placeholder="Pelayanan" />
      <CustomMultiSelect class="w-full" label="Metode Pembayaran" placeholder="Metode Pembayaran" />
    </div>
    <div class="overflow-auto grow">
      <TableTindakan />
    </div>
  </div>
</template>
