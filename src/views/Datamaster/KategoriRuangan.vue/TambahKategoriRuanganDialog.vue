<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
const status = ref();
</script>
<template>
    <div class="mt-5 flex flex-col gap-5">
              <div class="flex gap-2.5">
                <CustomTextfield
                  label="Kode Kategori Ruangan"
                  placeholder="Kode Kategori Ruangan"
                  class="basis-1/2"
                />
                <CustomTextfield
                  label="Nama Kategori Ruangan"
                  placeholder="Nama Kategori Ruangan"
                  class="basis-1/2"
                />
              </div>
              <hr class="border-grey-200" />
              <div class="flex gap-2.5">
                <CustomSwitch v-model="status" />
                <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
              </div>
            </div>
</template>