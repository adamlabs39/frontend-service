<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
});

const orderLab = ref<any[]>([]);
const emit = defineEmits(["edit", "submit"]);

onMounted(() => {
  orderLab.value = [
    {
      noOrder: "LAB1234",
      namaTarif: "Nama Tarif",
      tglOrder: "01-01-2024",
      orderStatus: "ORDER",
      petugasOrder: "Budi",
      tarif: [
        {
          tarifName: "SGOT",
          grandTotal: "10,000",
          result: "32",
          metode: "IFCC",
          nilaiRujukan: 35,
        },
        {
          tarifName: "SGPT",
          grandTotal: "10,000",
          result: "32",
          metode: "IFCC",
          nilaiRujukan: 35,
        },
      ],
    },
  ];
});

const isEditing = ref(props.method === "form");
const detail = ref(false);


const selectedTarif=ref([]);
const tglPemeriksaan=ref<Date>(new Date());

const onSubmit= () => {

  console.log(selectedTarif.value);
};

const itemPemeriksaan = ref([
  {
    kategori: "HEMATOLOGI",
    item: ["Hematokrit", "Hematologi Lengkap", "Jumlah Leukosit"],
  },
  {
    kategori: "KIMIA KLINIK",
    item: ["Tes Faal Hati", "Tes Gula Darah", "Tes Faal Ginjal"],
  },
]);

const pemeriksaanPaket = ref([
  {
    kategori: "MCU PT.WAHANA",
    item: "Darah Lengkap, Urine Lengkap, Golongan Darah, SGOT, SGPT",
  },
]);

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
  <CustomAccordion headerClass="bg-adameds-50" ref="accordion">
    <template #header>
      <div v-if="isEditing">Order Lab</div>
      <div v-if="!isEditing">Laboratorium</div>
    </template>
    <template #content>
      <div v-if="isEditing" class="flex flex-col gap-5 pt-5">
        <CustomDatePicker v-model="tglPemeriksaan" label="Tgl. Pemeriksaan Lab" class="w-1/4" />
        <div class="mt-5 font-semibold text-MD">Tarif Pemeriksaan</div>
        <hr class="border-grey-200" />
        <div v-for="(pemeriksaan, index) in itemPemeriksaan" :key="index">
          <CustomAccordion headerClass="bg-adameds-50" initial-state="0">
            <template #header>{{ pemeriksaan.kategori }}</template>
            <template #content>
              <div class="flex flex-wrap gap-2.5 pt-5">
                <div v-for="(item, idx) in pemeriksaan.item" :key="idx">
                  <CustomCheckbox
                    v-model="selectedTarif"
                    :binary="false"
                    :value="item"
                    :title="item"
                    sub-title=""
                    title-class="text-normal font-normal"
                  />
                </div>
              </div>
            </template>
          </CustomAccordion>
        </div>

        <div class="font-semibold text-MD">Tarif Pemeriksaan - Paket</div>
        <hr class="border-grey-200" />

        <div class="flex flex-wrap gap-2.5">
          <div
            v-for="(paket, index) in pemeriksaanPaket"
            :key="index"
          >
            <CustomCheckbox
              v-model="selectedTarif"
              :binary="false"
              :value="paket.item"
              :title="paket.kategori"
              title-class="text-normal font-semibold"
              :sub-title="paket.item"
              sub-title-class="text-SM font-normal text-grey-400"
            />
          </div>
        </div>
      </div>
      <div v-if="!isEditing" class="flex flex-col gap-5 pt-5">
        <div v-for="pemeriksaan of orderLab">
          <CustomAccordion initial-state="0" header-class="bg-[#E8F8F6]">
            <template #header>
              <div class="flex items-center justify-between w-full">
                <div class="font-normal text-MD flex items-center">
                  {{ pemeriksaan.noOrder
                  }}<span
                    ><CustomChip
                      :label="pemeriksaan.orderStatus"
                      class="ml-2.5"
                      :show-checked-icon="false"
                      bg-color="bg-[#D4D8DC]"
                      border-color="border-grey-75"
                      text-color="text-[#687077]"
                  /></span>
                </div>
                <div class="mr-2.5 font-normal text-MD">
                  Tgl. Order: {{ pemeriksaan.tglOrder }}
                </div>
              </div>
            </template>
            <template #content>
              <div class="pt-5">
                <CustomAccordion
                  header-class="bg-adameds-50"
                  initial-state="0"
                  :open-with-header="false"
                  no-border
                >
                  <template #header>
                    <div class="flex justify-between w-full">
                      <div class="flex items-center">
                        <CustomButton label="1" class="w-8 h-8 mr-2.5" />
                        <div>Nama Tarif Lab</div>
                      </div>
                      <div>Rp. 100,000</div>
                    </div>
                  </template>
                  <template #content>
                    <DataTable
                      :value="pemeriksaan.tarif"
                      stripedRows
                      scrollable
                      scrollHeight="flex"
                      class="text-xs"
                    >
                      <Column header="Nama Pemeriksaan">
                        <template #body="slotProps">
                          <div class="flex flex-col gap-2">
                            <div class="font-bold">
                              {{ slotProps.data.tarifName }}
                            </div>
                            <div>Rp. 10,000</div>
                          </div>
                        </template>
                      </Column>
                      <Column field="result" class="text-center">
                        <template #header>
                          <div class="font-semibold w-full text-center">
                            Hasil Pemeriksaan
                          </div>
                        </template>
                      </Column>
                      <Column>
                        <template #header>
                          <div class="font-semibold w-full text-center">
                            Flags
                          </div></template
                        >
                        <template #body>
                          <div class="flex justify-center">
                            <CustomButton
                              background-color="bg-[#E5E7EB]"
                              text-color="text-[#6B7280]"
                              class="h-8"
                            >
                              <PhMinus :size="12" />
                            </CustomButton>
                          </div> </template
                      ></Column>
                    </DataTable>
                  </template>
                  <template #collapseIcon> </template>
                  <template #expandIcon> </template>
                </CustomAccordion>
                <hr class="border-grey-200 pt-2.5 pb-5" />
                <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
              </div>
            </template>
            <template #footer>
              <div class="flex items-center justify-between w-full">
                <CustomButton
                  label="Detail"
                  @click="detail = true"
                  icon="DetailIcon"
                />
                <!-- <CustomButton
                  label="Batal Order"
                  background-color="bg-danger-300"
                /> -->
                <CustomDialog
                  headerBg="bg-adameds-300"
                  width="800px"
                  v-model:visible="detail"
                >
                  <template #header>
                    <div>Detail Laboratorium</div>
                  </template>
                  <template #body>
                    <div class="pt-5">
                      <CustomAccordion no-border initial-state="0">
                        <template #header>
                          <div class="flex justify-between w-full mr-2.5">
                            <div class="flex gap-2.5">
                              <div>List Order Lab</div>
                            </div>
                            <div class="flex items-center">
                              <div>No. Order: LAB1234</div>
                              <PhLineVertical
                                :size="18"
                                class="mx-2 text-adameds-300"
                              />
                              <div>Tgl. Order: 01-01-2024</div>
                            </div>
                          </div>
                        </template>
                        <template #content>
                          <div class="pt-5 flex flex-col">
                            <CustomAccordion
                              header-class="bg-adameds-50"
                              initial-state="0"
                              :open-with-header="false"
                              no-border
                            >
                              <template #header>
                                <div class="flex items-center">
                                  <CustomButton
                                    label="1"
                                    class="w-8 h-8 mr-2.5"
                                  />
                                  <div>Nama Tarif Lab</div>
                                </div>
                              </template>
                              <template #content>
                                <DataTable
                                  :value="pemeriksaan.tarif"
                                  stripedRows
                                  scrollable
                                  scrollHeight="flex"
                                  class="text-xs"
                                >
                                  <Column
                                    field="tarifName"
                                    header="Nama Pemeriksaan"
                                    class="font-bold"
                                  ></Column>
                                  <Column field="result" class="text-center">
                                    <template #header>
                                      <div
                                        class="font-semibold w-full text-center"
                                      >
                                        Hasil Pemeriksaan
                                      </div>
                                    </template>
                                  </Column>
                                  <Column field="metode" class="text-center">
                                    <template #header>
                                      <div
                                        class="font-semibold w-full text-center"
                                      >
                                        Metode
                                      </div>
                                    </template>
                                  </Column>
                                  <Column
                                    field="nilaiRujukan"
                                    class="text-center"
                                  >
                                    <template #header>
                                      <div
                                        class="font-semibold w-full text-center"
                                      >
                                        Nilai Rujukan
                                      </div>
                                    </template>
                                    <template #body="slotProps">
                                      < {{ slotProps.data.nilaiRujukan }}
                                      <span class="italic font-semibold"
                                        >(uL)</span
                                      >
                                    </template>
                                  </Column>
                                  <Column>
                                    <template #header>
                                      <div
                                        class="font-semibold w-full text-center"
                                      >
                                        Flags
                                      </div></template
                                    >
                                    <template #body>
                                      <div class="flex justify-center">
                                        <CustomButton
                                          background-color="bg-[#E5E7EB]"
                                          text-color="text-[#6B7280]"
                                          class="h-8"
                                        >
                                          <PhMinus :size="12" />
                                        </CustomButton>
                                      </div> </template
                                  ></Column>
                                  <Column>
                                    <template #header>
                                      <div
                                        class="font-semibold w-full text-center"
                                      >
                                        Status Pemeriksaan
                                      </div></template
                                    >
                                    <template #body>
                                      <div class="flex justify-center">
                                        <CustomChip
                                          label="SELESAI"
                                          :show-checked-icon="false"
                                          bg-color="bg-mint-75"
                                          border-color="border-[#D9DCE1]"
                                          text-color="text-mint-300"
                                        />
                                      </div> </template
                                  ></Column>
                                </DataTable>
                              </template>
                              <template #collapseIcon> </template>
                              <template #expandIcon> </template>
                            </CustomAccordion>
                            <CustomAccordion initial-state="0" no-border>
                              <template #header> Catatan </template>
                              <template #content>
                                <div class="pt-5">-</div>
                              </template>
                              <template #collapseIcon>
                                <CustomButton
                                  icon="PhCaretUp"
                                  backgroundColor="bg-transparent"
                                  textColor="text-adameds-300"
                                />
                              </template>
                              <template #expandIcon>
                                <CustomButton
                                  icon="PhCaretDown"
                                  backgroundColor="bg-transparent"
                                  textColor="text-adameds-300"
                                />
                              </template>
                            </CustomAccordion>
                            <CustomAccordion initial-state="0" no-border>
                              <template #header> Catatan Expertise </template>
                              <template #content>
                                <div class="pt-5">-</div>
                              </template>
                              <template #collapseIcon>
                                <CustomButton
                                  icon="PhCaretUp"
                                  backgroundColor="bg-transparent"
                                  textColor="text-adameds-300"
                                />
                              </template>
                              <template #expandIcon>
                                <CustomButton
                                  icon="PhCaretDown"
                                  backgroundColor="bg-transparent"
                                  textColor="text-adameds-300"
                                />
                              </template>
                            </CustomAccordion>
                          </div>
                        </template>
                        <template #collapseIcon>
                          <CustomButton
                            icon="PhCaretUp"
                            backgroundColor="bg-transparent"
                            textColor="text-adameds-300"
                          />
                        </template>
                        <template #expandIcon>
                          <CustomButton
                            icon="PhCaretDown"
                            backgroundColor="bg-transparent"
                            textColor="text-adameds-300"
                          />
                        </template>
                      </CustomAccordion>
                    </div>
                  </template>
                </CustomDialog>
              </div>
            </template>
          </CustomAccordion>
        </div>
      </div>
    </template>
    <template v-if="isEditing" #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
        @click="resetForm"

          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"

        />
        <CustomButton label="Simpan" @click="onSubmit" />
      </div>
    </template>
  </CustomAccordion>
</template>
