<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
const status = ref();
</script>
<template>
  <div class="flex flex-col gap-5 mt-5">
    <div class="flex gap-2.5">
      <CustomTextfield
        label="Kode Ruangan"
        placeholder="Kode Ruangan"
        class="basis-2/6"
      />
      <CustomSelect
        label="Kategori Ruangan"
        place-holder="Kategori Ruangan"
        :is-loading="false"
        class="basis-4/6"
      />
    </div>
    <div class="flex gap-2.5">
      <CustomTextfield
        label="Nama Ruangan"
        placeholder="Nama Ruangan"
        class="basis-4/6"
      />
      <CustomTextfield
        label="Nomor Kamar"
        placeholder="0"
        class="basis-2/6"
        type="number"
      />
    </div>
    <div class="flex gap-2.5">
      <CustomSelect
        label="Kategori Ruangan"
        place-holder="Kategori Ruangan"
        :is-loading="false"
        class="basis-4/6"
      />
      <CustomTextfield
        label="Jumlah Bed"
        placeholder="0"
        class="basis-2/6"
        type="number"
      >
    <template #appendText>
      <div class="font-semibold text-adameds-300 text-SM m-2.5">
        Bed
      </div>
    </template>
    </CustomTextfield>
    </div>
    <hr class="border-grey-200" />
    <div class="flex gap-2.5 items-end">
      <CustomSwitch v-model="status" label="Status" />
      <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
    </div>
  </div>
</template>
