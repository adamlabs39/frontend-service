<script setup lang="ts">
import { onMounted, ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
const pemberianObat = ref<any[]>([]);

onMounted(() => {
  pemberianObat.value = [
    {
      nama_obat: "Paracetamol",
      sisa_stok: "2 Tab",
      qty_order: "10 Tablet",
      satuan_penggunaan: "",
      cara_pakai: "Setelah Makan",
      periode_unit: "",
      periode: "Sehari",
      frekuensi: "3",
      dokter_pemberi_resep: "dr. Spesialis Sp. D",
      pemberian: [
        {
          waktu_pemberian: "Pagi",
          jam_pemberia: "08:00",
          qty_pemberian: "",
          petugas_pemberian: "Bambang",
          catatan_pemberin: "Lorem Ipsum",
        },
        {
          waktu_pemberian: "Pagi",
          jam_pemberia: "08:00",
          qty_pemberian: "",
          petugas_pemberian: "Bambang",
          catatan_pemberin: "Lorem Ipsum",
        },
      ],
    },
  ];
});
const testDialog = ref(false);
</script>

<template>
  <CustomAccordion header-class="bg-adameds-50" initial-state="0">
    <template #header> RSP.0001 </template>
    <template #content>
      <div class="grid grid-cols-2 gap-5 pt-5">
        <Card
          pt:root:class="border rounded-lg border-adameds-300"
          pt:body:class="h-full p-5"
          @click="testDialog = true"
          class="cursor-pointer"
        >
          <template #content>
            <div class="flex justify-between">
              <div class="flex gap-2.5">
                <CustomButton label="1" class="h-6 p-3 rounded" />
                <div class="flex flex-col gap-2.5">
                  <div class="font-bold text-MD">Paracetamol</div>
                  <div class="flex items-center gap-2.5 text-SM">
                    2 x Sehari
                    <span>
                      <img src="@/assets/icons/Vector-arows.svg" />
                    </span>
                    0,5 Gram
                  </div>
                  <div class="flex items-center gap-2.5 text-SM">
                    Jml. Order
                    <span>
                      <img src="@/assets/icons/Vector-arows.svg" />
                    </span>
                    10 Tablet
                  </div>
                  <CustomChip
                    label="Setelah Makan"
                    :showCheckedIcon="false"
                    border-color="border-adameds-300"
                    bg-color="bg-adameds-50"
                    text-color="text-adameds-300"
                    customClass="text-xs font-semibold cursor-auto h-5 max-w-fit"
                  />
                </div>
              </div>
              <div class="flex flex-col items-end justify-between">
                <div class="font-semibold underline text-SM">
                  Dokter Pemberi Resep
                </div>
                <div class="text-SM text-grey-400">dr. Spesialis Sp.D</div>
                <div class="text-SM flex gap-2.5">
                  <div
                    class="flex max-w-fit h-[20px] items-center border border-adameds-300 rounded-[4px] overflow-hidden"
                  >
                    <div class="px-2 font-semibold text-white bg-adameds-300">
                      PA
                    </div>
                    <div class="px-2 text-adameds-300">2</div>
                  </div>
                  <div
                    class="flex max-w-fit h-[20px] items-center border border-adameds-300 rounded-[4px] overflow-hidden"
                  >
                    <div class="px-2 font-semibold text-white bg-adameds-300">
                      SI
                    </div>
                    <div class="px-2 text-adameds-300">2</div>
                  </div>
                  <div
                    class="flex max-w-fit h-[20px] items-center border border-adameds-300 rounded-[4px] overflow-hidden"
                  >
                    <div class="px-2 font-semibold text-white bg-adameds-300">
                      SO
                    </div>
                    <div class="px-2 text-adameds-300">2</div>
                  </div>
                  <div
                    class="flex max-w-fit h-[20px] items-center border border-adameds-300 rounded-[4px] overflow-hidden"
                  >
                    <div class="px-2 font-semibold text-white bg-adameds-300">
                      MA
                    </div>
                    <div class="px-2 text-adameds-300">2</div>
                  </div>
                  <div
                    class="flex max-w-fit h-[20px] items-center border border-adameds-300 rounded-[4px] overflow-hidden"
                  >
                    <div class="px-2 font-semibold text-white bg-adameds-300">
                      KH
                    </div>
                    <div class="px-2 text-adameds-300">2</div>
                  </div>
                </div>

                <div class="text-SM">
                  Sisa Obat <span class="font-bold">(2 Tab)</span>
                </div>
              </div>
            </div>
          </template>
        </Card>
        <CustomDialog
          width="800px"
          v-model:visible="testDialog"
          headerBg="bg-adameds-300"
        >
          <template #header>
            <div class="flex justify-between w-[700px] items-center">
              <div class="flex items-center gap-2.5">
                <div class="font-semibold text-MD">Paracetamol</div>
                <PhLineVertical :size="20" color="#ffffff" />
                <CustomButton
                  label="RSP123"
                  background-color="bg-grey-50"
                  text-color="text-adameds-300"
                  class="rounded-lg h-7"
                />
              </div>
              <div class="text-MD">Tgl. Pemberian : 01-01-2024</div>
            </div>
          </template>
          <template #body>
            <div class="flex flex-col gap-5 pt-5">
              <Card
                pt:root:class="border rounded-lg shadow border-adameds-300 shadow-inherit"
                pt:body:class="h-full p-2.5"
              >
                <template #content>
                  <div class="flex justify-between">
                    <div class="flex flex-col gap-2.5">
                      <div class="flex items-center gap-2.5 text-SM">
                        2 x Sehari
                        <span>
                          <img src="@/assets/icons/Vector-arows.svg" />
                        </span>
                        0,5 Gram
                      </div>
                      <CustomChip
                        label="Setelah Makan"
                        :showCheckedIcon="false"
                        border-color="border-adameds-300"
                        bg-color="bg-adameds-50"
                        text-color="text-adameds-300"
                        customClass="text-xs font-semibold cursor-auto h-5 max-w-fit"
                      />
                    </div>
                    <div class="flex flex-col items-end justify-between">
                      <div class="flex items-center gap-2.5 text-SM">
                        Jml. Order
                        <span>
                          <img src="@/assets/icons/Vector-arows.svg" />
                        </span>
                        10 Tablet
                      </div>
                      <div class="text-SM">
                        Sisa Obat <span class="font-bold">(2 Tab)</span>
                      </div>
                    </div>
                  </div>
                </template>
              </Card>
              <div class="flex items-end gap-5">
                <CustomDatePicker label="Jam Pemberian"/>
                <CustomTextArea label="Catatan" class="grow" height="h-10"/>
                <CustomButton label="Simpan Edit" background-color="bg-adameds-300" text-color="text-white" class="ml-2.5"/>
              </div>
              <hr class="border-grey-200" />
              <CustomAccordion header-class="bg-adameds-50">
                <template #header>
                  <div class="flex justify-between w-full pr-2.5 items-center">
                    <div class="font-normal text-normal">
                      Pagi <span class="text-grey-500">(07:00 - 12:00)</span>
                    </div>
                    <div
                      class="flex items-center gap-2.5 font-normal text-normal"
                    >
                      Jumlah Pemberian
                      <span
                        ><CustomButton
                          label="2"
                          background-color="bg-transparent"
                          border-color="border-2 border-adameds-300"
                          class=""
                          text-color="text-adameds-300 h-[21px] px-[10.5px] rounded "
                        />
                      </span>
                      <span>
                        <PhLineVertical :size="16" class="text-adameds-300" />
                      </span>
                    </div>
                  </div>
                </template>
                <template #content>
                  <div class="flex items-center pt-5 gap-2.5">
                    <Card
                      pt:root:class="rounded-lg shadow bg-adameds-100 shadow-inherit"
                      pt:body:class="h-full p-2.5"
                      class="grow"
                    >
                      <template #content>
                        <div class="flex w-full gap-5">
                          <div class="flex flex-col gap-2.5">
                            <div
                              class="font-semibold text-white truncate text-SM"
                            >
                              Jam Pemberian
                            </div>
                            <div
                              class="font-semibold text-heading text-adameds-300 px-[14.5px] rounded-lg py-2.5 bg-white text-center"
                            >
                              08:00
                            </div>
                          </div>
                          <div class="flex flex-col gap-2.5 grow">
                            <div class="font-semibold text-white text-SM">
                              Catatan
                            </div>
                            <div
                              class="rounded-lg p-2.5 bg-white grow text-XS flex flex-col gap-1"
                            >
                              <div>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur fermentum, mauris ac
                                suscipit cursus consectetur adipiscing elit.
                              </div>
                              <hr class="border-grey-200" />
                              <div class="flex items-center gap-2.5">
                                Petugas
                                <span>
                                  <img src="@/assets/icons/Vector-arows.svg" />
                                </span>
                                Nama Petugas
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </Card>
                    <CustomButton
                      label=""
                      background-color="bg-[#3D84E5] rounded-lg"
                      class="w-12 h-10 p-0"
                    >
                      <img src="@/assets/icons/edit.svg" class="w-5" alt="" />
                    </CustomButton>
                  </div>
                </template>
              </CustomAccordion>
            </div>
          </template>
        </CustomDialog>
      </div>
    </template>
  </CustomAccordion>
</template>
