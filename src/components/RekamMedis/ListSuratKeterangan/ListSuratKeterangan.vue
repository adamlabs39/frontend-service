<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import { ref, onMounted } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import NoData from "@/components/section/NoData.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomRadioButton from "@/components/Base/CustomRadioButton.vue";


const products = ref<any[]>([]);
onMounted(() => {
  products.value = [
    {
      nama: "Surat Kontrol Rawat Jalan",
    },
    {
      nama: "Surat Kontrol Rawat Jalan",
    },
  ];
});
const buatSurat = ref(false);
const tipePeriksa = ref();


</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>List Surat Keterangan</template>
    <template #content>
      <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
        stripedRows
        class="text-xs mt-5"
        scrollable
        scrollHeight="flex"
      >
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="nama"
          header="Nama Surat"
          headerClass="bg-adameds-50"
          class="w-full"
        ></Column>
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div
              class="flex items-center justify-center w-full font-semibold text-SM"
            >
              Status
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton
                background-color="bg-adameds-300 rounded-lg"
                class="h-6"
              >
                <div class="flex items-center gap-1">
                  <PhPrinter :size="18" color="#ffffff" weight="fill" />
                  <div class="text-SM">Cetak</div>
                </div>
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                class="h-6 w-[26px] p-0"
              >
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <div
        class="flex items-center justify-center p-5 m-5 border border-dashed rounded-lg border-adameds-300 gap-2.5"
      >
        <CustomButton
          icon="PhPlus"
          label="Buat Surat"
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          backgroundColor="bg-white"
          @click="buatSurat = true"
        />
      </div>
      <CustomDialog
        width="800px"
        class=""
        v-model:visible="buatSurat"
        headerBg="bg-adameds-300"
      >
        <template #header>Buat Surat</template>
        <template #body>
          <div class="flex flex-col gap-5 mt-5">
            <div class="flex items-end gap-5 w-full">
              <CustomSelect
                label="Cari Surat"
                place-holder="Cari & Pilih Surat"
                class="grow"
              />
              <CustomButton label="Buat" icon="PhPlus" />
            </div>
            <!-- <NoData title="Silahkan Pilih Surat Terlebih Dahulu" /> -->
            <!-- Surat Control Rawat Jalan -->
            <CustomAccordion headerClass="bg-adameds-50">
              <template #header>Surat Kontrol Rawat Jalan</template>
              <template #content>
                <div class="grid grid-cols-12 gap-5 mt-5">
                  <CustomTextfield label="No. Surat" class="col-span-6" />
                  <CustomDatePicker
                    label="Tanggal Kontrol"
                    class="col-span-6"
                  />
                  <CustomSelect
                    label="Poli"
                    place-holder="Pilih Poli"
                    class="col-span-7"
                  />
                  <CustomSelect
                    label="Dokter"
                    place-holder="Pilih Dokter"
                    class="col-span-5"
                  />
                  <CustomTextArea
                    label="Keterangan / Catatan"
                    placeholder="Keterangan / Catatan ..."
                    class="col-span-12"
                  />
                </div>
              </template>
            </CustomAccordion>
            <!-- Surat Permohonan Rawat Inap (SPRI) -->
            <CustomAccordion headerClass="bg-adameds-50">
              <template #header>Surat Permohonan Rawat Inap (SPRI)</template>
              <template #content>
                <div class="grid grid-cols-12 gap-5 mt-5">
                  <CustomTextfield label="No. Surat" class="col-span-6" />
                  <CustomDatePicker
                    label="Tanggal rencana Rawat Inap"
                    class="col-span-6"
                  />
                  <CustomSelect
                    label="Dokter"
                    place-holder="Pilih Poli"
                    class="col-span-7"
                  />
                  <CustomSelect
                    label="Tujuan Ruangan Rawat Inap"
                    place-holder="Pilih Dokter"
                    class="col-span-5"
                  />
                  <CustomTextArea
                    label="Keterangan / Catatan"
                    placeholder="Keterangan / Catatan ..."
                    class="col-span-12"
                  />
                </div>
              </template>
            </CustomAccordion>
            <!-- Surat Keterangan Sakit -->
            <CustomAccordion headerClass="bg-adameds-50">
              <template #header>Surat Keterangan Sakit</template>
              <template #content>
                <div class="grid grid-cols-12 gap-5 mt-5">
                  <CustomTextfield label="No. Surat" class="col-span-6" />
                  <CustomInputNumber
                    label="Istirahat Selama"
                    class="col-span-6"
                  >
                    <template #appendText>
                      <div class="flex items-center mr-2.5">Hari</div>
                    </template>
                  </CustomInputNumber>
                  <CustomDatePicker
                    label="Mulai dari Tanggal"
                    class="col-span-7"
                  />
                  <CustomTextfield
                    label="Larangan"
                    placeholder="Larangan"
                    class="col-span-5"
                  />
                  <CustomTextArea
                    label="Keterangan Sakit"
                    placeholder="Keterangan Sakit ..."
                    class="col-span-12"
                  />
                </div>
              </template>
            </CustomAccordion>
            <!-- Surat Keterangan Sehat -->
            <CustomAccordion headerClass="bg-adameds-50">
              <template #header>Surat Keterangan Sehat</template>
              <template #content>
                <div class="grid grid-cols-12 gap-5 mt-5">
                  <CustomInputNumber label="No. Surat" class="col-span-5" />
                  <CustomDatePicker
                    label="Tanggal Pemeriksaan"
                    class="col-span-7"
                  />
                  <CustomInputNumber label="Berat Badan" class="col-span-3">
                    <template #appendText>
                      <div class="flex items-center mr-2.5">Kg</div>
                    </template>
                  </CustomInputNumber>
                  <CustomInputNumber label="Tinggi Badan" class="col-span-3">
                    <template #appendText>
                      <div class="flex items-center mr-2.5">Cm</div>
                    </template>
                  </CustomInputNumber>
                  <CustomTextfield
                    label="Visus OD/OS"
                    placeholder="Visus OD/OS"
                    class="col-span-6"
                  />
                  <CustomTextfield
                    label="Golongan Darah"
                    placeholder="Golongan Darah"
                    class="col-span-3"
                  />
                  <CustomSwitch
                    label="Buta Warna"
                    class="col-span-3 col-span-3"
                  />
                  <div class="grid grid-cols-2 gap-x-2.5 col-span-6">
                    <div class="col-span-2 font-semibold text-MD pb-1">Setelah Diperiksa Dinyatakan</div>
                    <CustomRadioButton
                      v-model="tipePeriksa"
                      value="persen"
                      title="Sehat"
                      height="h-10"
                    />
                    <CustomRadioButton
                      v-model="tipePeriksa"
                      value="rupiah"
                      title="Tidak Sehat"
                      height="h-10"
                    />
                  </div>
                </div>
              </template>
            </CustomAccordion>
            <!-- Surat Rujukan Keluar Kelinik -->
            <CustomAccordion headerClass="bg-adameds-50">
              <template #header>Surat Rujukan Keluar Klinik</template>
              <template #content>
                <div class="grid grid-cols-12 gap-5 mt-5">
                  <CustomTextfield label="No. Surat" class="col-span-4" />
                  <CustomSelect
                    label="Tujuan Pelayanan"
                    place-holder="Pilih Tujuan Pelayanan"
                    class="col-span-4"
                  />
                  <CustomDatePicker
                    label="Tanggal Rencana Kunjungan"
                    class="col-span-4"
                  />
                  <CustomSelect
                    label="Poli/Spesialis"
                    place-holder="Poli/Spesialis"
                    class="col-span-4"
                  />
                  <CustomTextfield
                    label="Dirujuk Ke"
                    place-holder="Dirujuk Ke"
                    class="col-span-4"
                  />
                  <CustomTextfield
                    label="Alasan Klinikal"
                    place-holder="Alasan Klinikal"
                    class="col-span-4"
                  />
                  <CustomSelect
                    label="Alasan Non Klinikan"
                    place-holder="Pilih Alasan Non-Klinikal"
                    class="col-span-6"
                  />
                  <CustomTextfield
                    label="Alasan Non Klinikal Lainnya"
                    place-holder="Alasan Non Klinikal Linnya"
                    class="col-span-6"
                  />
                </div>
              </template>
            </CustomAccordion>
            <!-- Surat Keterangan Meninggal -->
            <CustomAccordion headerClass="bg-adameds-50">
              <template #header>Surat Keterangan Meninggal</template>
              <template #content>
                <div class="grid grid-cols-12 gap-5 mt-5">
                  <CustomTextfield label="No. Surat" class="col-span-4" />
                  <CustomDatePicker
                    label="Tanggal & Waktu Meninggal"
                    class="col-span-4"
                  />
                  <CustomSelect
                    label="Lokasi Meninggal"
                    place-holder="Pilih Lokasi Meninggal"
                    class="col-span-4"
                  />
                  <CustomSelect
                    label="Alasan Non Klinikan"
                    place-holder="Pilih Alasan Non-Klinikal"
                    class="col-span-6"
                  />
                  <CustomSelect
                    label="Alasan Non Klinikan"
                    place-holder="Pilih Alasan Non-Klinikal"
                    class="col-span-6"
                  />
                  <CustomTextArea
                    label="Keterangan/Catatan"
                    placeholder="Keterangan/Catatan..."
                    class="col-span-12"
                  />
                </div>
              </template>
            </CustomAccordion>
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
              >
              </CustomButton>
              <CustomButton label="Simpan"> </CustomButton>
            </div>
          </div>
        </template>
      </CustomDialog>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton label="Simpan" />
      </div>
    </template>
  </CustomAccordion>
</template>
