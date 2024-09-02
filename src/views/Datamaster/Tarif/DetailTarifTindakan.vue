<script lang="ts" setup>
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import TableTindakan from "@/components/Datamaster/TableTindakan.vue";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
</script>
<template>
  <div class="grid grid-cols-12 gap-5 mt-5">
    <CustomSelect class="col-span-5" label="Jenis Tarif" place-holder="Jenis Tarif" />
    <CustomTextfield
      class="col-span-5"
      label="Nama Tarif Tindakan"
      placeholder="Nama Tarif Tindakan"
    />
    <div class="flex flex-col gap-1.5 col-span-2">
      <div class="font-semibold text-MD">Metode Pilihan Tarif</div>
      <div class="flex gap-2.5">
        <div class="p-2 flex gap-2.5">
          <CustomSwitch :show-label="false" side-label="Single" />
        </div>
        <div class="p-2 flex gap-2.5">
          <CustomSwitch :show-label="false" side-label="Multiple" />
        </div>
      </div>
    </div>
    <CustomMultiSelect
      class="col-span-6"
      label="Pelayanan"
      placeholder="Pelayanan"
    />
    <CustomMultiSelect
      class="col-span-6"
      label="Metode Pembayaran"
      placeholder="Metode Pembayaran"
    />
    <TableTindakan class="col-span-12"
    />
  </div>
</template>
