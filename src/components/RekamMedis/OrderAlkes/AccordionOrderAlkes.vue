<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import DialogTambahAlkesMultiple from "./DialogTambahAlkesMultiple.vue";
import DialogOrderAlkes from "@/components/RekamMedis/OrderAlkes/DialogOrderAlkes.vue";
import NoData from "@/components/section/NoData.vue";
const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
  formDetail: {
    type: Array as () => Array<string>,
    default: () => ["ORDER", "PROSES", "SELESAI"],
  },
});

const results = ref<any[]>([]);

const statusList = [
  { label: "ORDER", bgColor: "bg-[#D4D8DC]", textColor: "text-[#687077]" },
  {
    label: "PROSES",
    bgColor: "bg-blueJeans-75",
    textColor: "text-blueJeans-400",
  },
  { label: "SELESAI", bgColor: "bg-mint-75", textColor: "text-mint-400" },
];

const accordion = ref<HTMLCanvasElement | null>(null);
const open = () => {
  if (accordion.value) {
    (accordion.value as any).open();
  }
};
const close = () => {
  if (accordion.value) {
    (accordion.value as any).close();
  }
};

const dialogTambahOrder = ref({
  isVisible: false,
  title: "",
});

function handleTambahOrder() {
  dialogTambahOrder.value.isVisible = true;
  dialogTambahOrder.value.title = "Order Alkes";
}

// terima payload dari file DialogOrderAlkes
const handleSubmitOrder = (payload: any) => {
  const pengorderAlkesList = [
    "dr Adameds, Sp.A",
    "dr Budi, Sp.B",
    "dr Clara, Sp.KK",
    "dr Dani, Sp.PD",
    "dr Erika, Sp.M",
  ];

  const statusList = [
    "Order Masuk",
    "Sedang Disiapkan",
    "Alkes/Obat Diserahkan",
  ];

  // Pilih penulis resep secara acak
  const randomPengorderAlkes =
    pengorderAlkesList[Math.floor(Math.random() * pengorderAlkesList.length)];
  const tglOrder = new Date(Date.now()).toLocaleDateString("id-ID");
  const orderCode = `ALK${Math.floor(1000 + Math.random() * 9000)}`;
  const randomStatus =
    statusList[Math.floor(Math.random() * statusList.length)];

  results.value.push({
    ...payload,
    pengorderAlkes: randomPengorderAlkes,
    tglOrder,
    orderCode,
    randomStatus,
  });
  console.log(results.value);
};
const resetOrderAlkes = () => {
  results.value = [];
};
</script>

<template>
  <CustomAccordion
    headerClass="bg-adameds-50"
    v-if="props.method === 'form'"
    ref="accordion"
  >
    <template #header>Order Alkes</template>
    <template #content>
      <div class="grid grid-cols-3 gap-3 py-6" v-if="results.length > 0">
        <div
          class="p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm shadow-black/10 cursor-pointer"
          v-for="(result, index) in results"
          :key="index"
        >
          <!-- Header -->
          <div
            class="py-1 font-semibold text-center text-white bg-teal-400 rounded-lg text-SM"
          >
            {{ result.orderCode }}
          </div>

          <!-- Content -->
          <div class="grid grid-cols-2 pt-2.5">
            <!-- Left side -->
            <div>
              <div class="font-semibold underline text-XS">Pengorder Alkes</div>
              <div class="font-normal text-SM">{{ result.pengorderAlkes }}</div>
              <div class="font-semibold underline text-XS">
                Lokasi Tujuan Order
              </div>
              <div class="font-normal text-SM">
                {{ result.selectedLokasiTujuanOrder }}
              </div>
            </div>

            <!-- Right side -->
            <div class="text-end">
              <div class="font-semibold underline text-XS">Tgl. Order</div>
              <div class="font-normal text-SM">{{ result.tglOrder }}</div>
              <div class="font-semibold underline text-XS">Jumlah Order</div>
              <div class="font-normal text-SM">
                {{ result.datas.length }} Obat
              </div>
            </div>
          </div>

          <!-- Buttons -->

          <div class="flex flex-col items-end justify-start gap-0.5">
            <div class="font-semibold underline text-XS">Status</div>
            <CustomChip
              :showCheckedIcon="false"
              :label="result.randomStatus"
              bgColor="bg-adameds-300"
              textColor="text-white"
              customClass="h-5 border-none"
            />
          </div>
        </div>
        <!-- Card End -->
      </div>
      <div v-else class="py-5">
        <NoData />
      </div>
      <div
        class="flex items-center justify-center p-5 m-5 border border-dashed rounded-lg border-adameds-300 gap-2.5"
      >
        <CustomButton
          icon="PhPlus"
          label="Tambah Order"
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          backgroundColor="bg-white"
          @click="handleTambahOrder"
        />
      </div>
      <DialogOrderAlkes
        v-model:is-dialog-visible="dialogTambahOrder.isVisible"
        :title="dialogTambahOrder.title"
        @submit-order="handleSubmitOrder"
      />
    </template>

    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="props.method == 'form'"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
          @click="resetOrderAlkes"
        />
        <CustomButton v-if="props.method == 'form'" label="Simpan Order" />
        <CustomButton v-else label="Edit" />
      </div>
    </template>
  </CustomAccordion>

  <CustomAccordion v-else headerClass="bg-adameds-50">
    <template #header>Alkes</template>
    <template #content>
      <div class="flex flex-col gap-2.5 pt-5">
        <CustomAccordion
          v-for="(status, index) in statusList"
          :key="index"
          headerClass="bg-adameds-50"
        >
          <template #header>
            <div class="flex justify-between w-full">
              <div class="flex justify-start gap-2.5 items-center">
                <div>ORD1234</div>
                <CustomChip
                  :label="status.label"
                  :show-checked-icon="false"
                  :bgColor="status.bgColor"
                  :textColor="status.textColor"
                  customClass="h-6 pr-[6px] border-none w-auto"
                />
              </div>
              <div>Tgl. Order : 01-01-2024</div>
            </div>
          </template>
          <template #content>
            <div class="pt-5">
              <DataTable class="text-xs">
                <Column
                  headerClass="bg-adameds-50 font-semibold text-SM"
                  class="w-2 text-center"
                >
                  <template #header>
                    <div class="text-center">No.</div>
                  </template>
                  <template #body="slotProps">
                    <div class="flex items-center justify-center">
                      {{ slotProps.index + 1 }}
                    </div>
                  </template>
                </Column>

                <Column
                  headerClass="bg-adameds-50"
                  class="max-w-[300px] text-left"
                >
                  <template #header>
                    <div class="w-full font-semibold text-left">
                      List Tindakan
                    </div>
                  </template>
                  <template #body="slotProps">
                    <div>
                      {{ slotProps.data.label }}
                    </div>
                  </template>
                </Column>

                <Column headerClass="bg-adameds-50" class="w-auto text-center">
                  <template #header>
                    <div class="w-full font-semibold">Jumlah</div>
                  </template>
                  <template #body="slotProps">
                    {{ slotProps.data.jumlah }}
                  </template>
                </Column>
                <Column headerClass="bg-adameds-50" class="w-auto text-center">
                  <template #header>
                    <div class="w-full font-semibold">Satuan</div>
                  </template>
                  <template #body="slotProps">
                    {{ slotProps.data.satuan }}
                  </template>
                </Column>

                <Column headerClass="bg-adameds-50" class="w-auto text-end">
                  <template #header>
                    <div class="w-full font-semibold">Harga</div>
                  </template>
                  <template #body="slotProps">
                    {{ slotProps.data.harga }}
                  </template>
                </Column>
              </DataTable>
              <div class="pt-5">
                <CustomInfoRow label="Petugas" value="Nama Petugas " />
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-end gap-3">
              <CustomButton
                v-if="status.label === 'ORDER'"
                label="Batal Order"
                backgroundColor="bg-danger-300"
              />
            </div>
          </template>
        </CustomAccordion>
      </div>
    </template>
  </CustomAccordion>
</template>
