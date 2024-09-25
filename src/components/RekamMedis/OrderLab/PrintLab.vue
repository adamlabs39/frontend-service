<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import { onMounted, ref } from "vue";

const detail = ref(false);
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
    {
      noOrder: "LAB4321",
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
  <div v-for="pemeriksaan of orderLab">
    <CustomAccordion initial-state="0" header-class="bg-[#E8F8F6]" class="mt-5">
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center font-normal text-MD">
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
          <CustomAccordion no-border initial-state="0">
            <template #header>
              <div class="flex justify-between w-full mr-2.5">
                <div class="flex gap-2.5">
                  <div>List Order Lab</div>
                  <CustomChip
                    label="Urine"
                    :show-checked-icon="false"
                    bg-color="bg-adameds-300"
                    borderColor="border-none"
                    text-color="text-white"
                  />
                  <CustomChip
                    label="Darah"
                    :show-checked-icon="false"
                    bg-color="bg-adameds-300"
                    borderColor="border-none"
                    text-color="text-white"
                  />
                </div>
              </div>
            </template>
            <template #content>
              <div class="flex flex-col pt-5">
                <CustomAccordion
                  header-class="bg-adameds-50"
                  initial-state="0"
                  :open-with-header="false"
                  no-border
                >
                  <template #header>
                    <div class="flex items-center">
                      <CustomButton label="1" class="w-8 h-8 mr-2.5" />
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
                          <div class="w-full font-semibold text-center">
                            Hasil Pemeriksaan
                          </div>
                        </template>
                      </Column>
                      <Column field="metode" class="text-center">
                        <template #header>
                          <div class="w-full font-semibold text-center">
                            Metode
                          </div>
                        </template>
                      </Column>
                      <Column field="nilaiRujukan" class="text-center">
                        <template #header>
                          <div class="w-full font-semibold text-center">
                            Nilai Rujukan
                          </div>
                        </template>
                        <template #body="slotProps">
                          < {{ slotProps.data.nilaiRujukan }}
                          <span class="italic font-semibold">(uL)</span>
                        </template>
                      </Column>
                      <Column>
                        <template #header>
                          <div class="w-full font-semibold text-center">
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
                          <div class="w-full font-semibold text-center">
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
      <template #footer>
        <div class="flex justify-end w-full">
          <CustomButton icon="PhPrinter" label="Cetak Hasil" />
        </div>
      </template>
    </CustomAccordion>
  </div>
</template>
