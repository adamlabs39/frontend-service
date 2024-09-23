<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  title: {
    type: String,
  },
  method: {
    type: String,
  },
  editData: {
    type: Object,
    default: () => ({}),
  },
});

const status = ref();
const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

function updateVisibility(value: any) {
  emit("update:isDialogVisible", value);
}

function closeDialog() {
  emit("close");
}
const tipeVoucher = ref();
const testRadio = ref("");
</script>
<template>
  <CustomDialog
    width="600px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Voucher</template>
    <template #body>
      <div class="grid grid-cols-12 mt-5 gap-5">
        <CustomTextfield
          label="Kode Voucher"
          placeholder="Kode Voucher"
          class="col-span-4"
        />
        <CustomTextfield
          label="Nama Voucher"
          placeholder="Nama Voucher"
          class="col-span-8"
        />
        <div class="flex gap-2.5 col-span-6">
          <CustomDatePicker label="Tanggal" class="w-[150px]" />
          <PhMinus class="mt-auto mb-3 text-black" />
          <CustomDatePicker :showLabel="false" class="mt-auto w-[150px]" />
        </div>
        <CustomInputNumber label="Jumlah Voucher" class="col-span-6" />
        <div class="grid grid-cols-2 gap-5 items-end w-full col-span-6">
          <div class="col-span-2 font-semibold text-MD -mb-4">Tipe Voucher</div>
          <CustomRadio
            v-for="data in ['Persen (%)', 'Rupiah (RP)']"
            v-model="testRadio"
            :sideLabel="data"
            :value="data"
          />
        </div>
        <div class="flex flex-col col-span-6">
          <div class="block font-semibold">Tarif Voucher</div>
          <div class="flex gap-5 items-end">
            <CustomInputNumber label="" class="basis-1/3">
              <template #appendText>
                <div class="flex items-center justify-center mr-2.5">%</div>
              </template>
            </CustomInputNumber>
            <CustomInputNumber class="" label="">
              <template #prependText>
                <div
                  class="font-semibold text-MD leading-7 text-adameds-300 flex items-center justify-center border-r px-3 bg-adameds-300 text-white rounded-l-md overflow-hidden"
                >
                  Rp.
                </div>
              </template>
            </CustomInputNumber>
          </div>
        </div>
        <hr class="border-grey-200 col-span-12" />

        <CustomSwitch
          v-model="status"
          :show-label="true"
          label="Status"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
          class="col-span-12"
        />
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <hr class="-mx-5 border-grey-200" />
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton
            label="Batal"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
            @click="closeDialog"
          >
          </CustomButton>
          <CustomButton label="Simpan"> </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
