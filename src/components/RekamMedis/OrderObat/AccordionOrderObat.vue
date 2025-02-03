<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";

import DataTable from "primevue/datatable";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { computed, onBeforeMount, ref, watch } from "vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Card from "primevue/card";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import DialogTambahObat from "./DialogTambahObat.vue";
import { onMounted } from "vue";
import DialogEdit from "./DialogEdit.vue";
import DialogObatRacikan from "./DialogObatRacikan.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import DialogDetailObat from "./DialogDetailObat.vue";
import DialogOrderObat from "@/components/RekamMedis/OrderObat/DialogOrderObat.vue";
import NoData from "@/components/section/NoData.vue";
import DialogCardObat from "@/components/RekamMedis/OrderObat/DialogCardObat.vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";
import { useDoctorPrescriptionStore } from "@/stores/farmasi/DoctorPrescription";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();
const doctorPrescriptionStore = useDoctorPrescriptionStore();

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
  rmType: {
    type: String,
    default: "rawat-jalan",
  },
  patientData: {
    type: Object,
  },
  rmUuid: {
    type: String,
    default: "",
  },
  sessionUuid: {
    type: String,
    default: "",
  },
});

const dialogTambahOrder = ref({
  isVisible: false,
  title: "",
});

const listOrder = ref<any[]>([]);

function handleTambahOrder() {
  dialogTambahOrder.value.isVisible = true;
  dialogTambahOrder.value.title = "Form Tambah Obat";
}

// terima payload dari file DialogOrderObat
const handleSubmitOrder = (payload: any) => {
  const penulisResepList = [
    "dr Adameds, Sp.A",
    "dr Budi, Sp.B",
    "dr Clara, Sp.KK",
    "dr Dani, Sp.PD",
    "dr Erika, Sp.M",
  ];
  const statusList = ["Resep Masuk", "Obat Disiapkan", "Obat Diserahkan"];

  // Pilih penulis resep secara acak
  const randomPenulisResep =
    penulisResepList[Math.floor(Math.random() * penulisResepList.length)];
  const tglOrder = new Date(Date.now()).toLocaleDateString("id-ID");
  const orderCode = `RSP${Math.floor(1000 + Math.random() * 9000)}`;
  const randomStatus =
    statusList[Math.floor(Math.random() * statusList.length)];

  listOrder.value.push({
    ...payload,
    penulisResep: randomPenulisResep,
    tglOrder,
    orderCode,
    statusOrder: randomStatus,
  });
  console.log(listOrder.value);
};

const resetOrderObat = () => {
  listOrder.value = [];
};

// Variabel inisialisasi dialog
const dialogCardObat = ref({
  isVisible: false,
  title: "",
  obatDetail: null as any | null,
});

// aksi
const selectResult = (result: any) => {
  dialogCardObat.value = {
    isVisible: true,
    title: "Detail Obat",
    obatDetail: result,
  };
};

// Ketika METHOD adalah detail
const detailObats = ref<any[]>([]);
onMounted(() => {});

// inisialisasi dialog ketika methodnya detail
const dialogDetailData = ref({
  isVisible: false,
  title: "",
  detailObatData: null as any | null,
});

const setFormData = async () => {
  if (rekamMedisStore.openedRekamMedis.data.obatUuides.length) {
    const responseOrderObat =
      await doctorPrescriptionStore.getSomeOrderPrescription({
        uuides: rekamMedisStore.openedRekamMedis.data.obatUuides,
      });
    if (responseOrderObat && responseOrderObat.payload) {
      listOrder.value = responseOrderObat.payload;
    }
  } else resetOrderObat();
};

onBeforeMount(() => {
  setFormData();
});

// NOTE Untuk merefresh form yang sedang dibuka jika ada perubahan data
const storedRMData = computed(() => rekamMedisStore.openedRekamMedis);
watch(storedRMData, (newRM) => {
  setFormData();
});

// fungsi supaya Dialog Detail bisa terbuka
function handleDetail() {
  const obatDetail = detailObats.value;
  dialogDetailData.value = {
    isVisible: true,
    title: "Detail Obat",
    detailObatData: obatDetail,
  };
}

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

defineExpose({
  open,
  close,
});
</script>

<template>
  <CustomAccordion
    headerClass="bg-adameds-50"
    v-if="props.method === 'form'"
    ref="accordion"
  >
    <template #header>Order Obat</template>
    <template #content>
      <div class="grid grid-cols-3 gap-3 py-6" v-if="listOrder.length > 0">
        <div
          class="p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm shadow-black/10 cursor-pointer"
          v-for="(result, index) in listOrder"
          :key="index"
          @click="selectResult(result)"
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
              <div class="font-semibold underline text-XS">Penulis Resep</div>
              <div class="font-normal text-SM">{{ result.penulisResep }}</div>
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
                {{ result.orderObats.length }} Obat
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex items-end justify-between">
            <div class="flex space-x-2">
              <CustomChip
                :showCheckedIcon="false"
                label="RACIKAN"
                bgColor="bg-none"
                textColor="text-grass-200"
                customClass="h-5 border-[#a0d468]"
              />
              <CustomChip
                :showCheckedIcon="false"
                label="OBAT PULANG"
                bgColor="bg-none"
                textColor="text-info-300"
                customClass="h-5 border-info-300 min-w-[85px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                label="OBAT KRONIS"
                bgColor="bg-none"
                textColor="text-sunFlower-300"
                customClass="h-5 border-sunFlower-300"
              />
            </div>

            <div class="flex flex-col items-end justify-start gap-0.5">
              <div class="font-semibold underline text-XS">Status</div>
              <CustomChip
                :showCheckedIcon="false"
                :label="result.statusOrder"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 border-none"
              />
            </div>
          </div>
        </div>
        <!-- Card End -->
      </div>
      <div v-else class="py-5">
        <NoData />
      </div>
      <!-- TESS -->

      <div
        class="flex items-center justify-center p-5 border border-dashed rounded-lg border-adameds-300 gap-2.5"
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
      <DialogOrderObat
        v-model:is-dialog-visible="dialogTambahOrder.isVisible"
        :title="dialogTambahOrder.title"
        :rmType="rmType"
        :rmUuid="props.rmUuid"
        :patientData="patientData"
        :sessionUuid="props.sessionUuid"
        @submit-order="handleSubmitOrder"
      />
      <DialogCardObat
        v-model:is-dialog-visible="dialogCardObat.isVisible"
        :title="dialogCardObat.title"
        :obat-detail="dialogCardObat.obatDetail"
      />
    </template>
  </CustomAccordion>

  <!-- Ketika Method adalah Detail -->
  <CustomAccordion v-else headerClass="bg-adameds-50">
    <template #header>Obat</template>
    <template #content>
      <CustomAccordion headerClass="bg-adameds-50" class="p-5">
        <template #header>
          <div class="flex justify-between w-full">
            <div>RSPK82L</div>
            <div>Tgl. Order : 01-01-2024</div>
          </div>
        </template>
        <template #content>
          <div class="px-5 py-2.5">
            <DataTable
              :value="detailObats"
              class="text-xs bg-adameds-50 min-h-[160px]"
              scrollable
              scrollHeight="flex"
            >
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
                  <div class="w-full font-semibold text-left">Nama Obat</div>
                </template>
                <template #body="slotProps">
                  <div v-if="slotProps.data.racikan">
                    {{ slotProps.data.namaRacikan }}
                    <span v-if="slotProps.data.sirup">- Sirup</span>
                  </div>
                  <div v-else>
                    {{ slotProps.data.namaObat }}
                  </div>
                  <div class="flex gap-1.5 justify-left">
                    <CustomChip
                      v-if="slotProps.data.racikan"
                      :showCheckedIcon="false"
                      label="RACIKAN"
                      bgColor="bg-none"
                      textColor="text-grass-300"
                      customClass="h-5 pr-[6px] border-grass-300 "
                    />
                    <CustomChip
                      v-if="slotProps.data.obatPulang"
                      :showCheckedIcon="false"
                      label="OBAT PULANG"
                      bgColor="bg-none"
                      textColor="text-info-300"
                      customClass="h-5 pr-[6px] border-info-300 min-w-[85px]"
                    />
                    <CustomChip
                      v-if="slotProps.data.obatKronis"
                      :showCheckedIcon="false"
                      label="OBAT KRONIS"
                      bgColor="bg-none"
                      textColor="text-sunFlower-300"
                      customClass="h-5 border-sunFlower-300"
                    />
                  </div>
                </template>
              </Column>

              <Column headerClass="bg-adameds-50" class="w-auto text-left">
                <template #header>
                  <div class="w-full font-semibold text-left">Aturan Pakai</div>
                </template>
                <template #body="slotProps">
                  {{ slotProps.data.aturanPakai }}
                </template>
              </Column>
            </DataTable>

            <div class="pt-5">
              <CustomInfoRow label="Petugas" value="Nama Petugas " />
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-between gap-3">
            <CustomButton
              label="Detail"
              textColor="text-white"
              backgroundColor="bg-adameds-300"
              @click="handleDetail"
              icon="DetailIcon"
            />
            <CustomButton label="Batal Order" backgroundColor="bg-danger-300" />
          </div>
        </template>
      </CustomAccordion>
      <DialogDetailObat
        v-model:is-dialog-visible="dialogDetailData.isVisible"
        :title="dialogDetailData.title"
        :obatDetail="dialogDetailData.detailObatData"
      />
    </template>
  </CustomAccordion>
</template>
