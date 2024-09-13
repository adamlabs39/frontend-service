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
import CustomRadio from "@/components/Base/CustomRadio.vue";

// Data array untuk ListSurat dan item Surat
const ListSurat = ref<any[]>([]);
const buatSurat = ref(false);
const tipePeriksa = ref();
const suratData = ref<any[]>([]);
const selectedSurat = ref("");
const itemsSurat = ref([
  { name: "Surat Kontrol Rawat Jalan" },
  { name: "Surat Permohonan Rawat Inap (SPRI)" },
  { name: "Surat Keterangan Sakit" },
  { name: "Surat Keterangan Sehat" },
  { name: "Surat Rujukan" },
  { name: "Surat Keterangan Meninggal" },
]);

// Pada mount, inisialisasi data default ke ListSurat
onMounted(() => {
  ListSurat.value = [
    { nama: "Surat Kontrol Rawat Jalan", data: {} },
    { nama: "Surat Kontrol Rawat Jalan", data: {} },
  ];
});

// Fungsi untuk menambahkan surat ke suratData
const addSurat = () => {
  if (cariSurat.value) {
    suratData.value.push({
      name: cariSurat.value,
      data: {},
    });
    selectedSurat.value = cariSurat.value;
    cariSurat.value = "";
  }
};

// Variabel untuk input cari surat
const cariSurat = ref("");

// Fungsi submit form yang memindahkan data dari suratData ke ListSurat
const submitForm = () => {
  if (suratData.value.length > 0) {
    // Tambahkan data dari suratData ke ListSurat
    ListSurat.value.push(...suratData.value);

    // Pastikan Vue mendeteksi perubahan pada ListSurat
    ListSurat.value = JSON.parse(JSON.stringify(ListSurat.value));

    // Bersihkan form suratData setelah submit
    suratData.value = [];

    // Tutup dialog
    buatSurat.value = false;
  }
};
</script>


<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>List Surat Keterangan</template>
    <template #content>
      <DataTable
        :value="ListSurat"
        tableStyle="min-width: 50rem"
        stripedRows
        class="pt-5 text-xs"
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
            <div class="flex items-end w-full gap-5">
              <CustomSelect
                label="Cari Surat"
                v-model="cariSurat"
                :options="itemsSurat"
                option-label="name"
                option-value="name"
                place-holder="Cari & Pilih Surat"
                class="grow"
              />
              <CustomButton label="Buat" icon="PhPlus" @click="addSurat" />
            </div>
           
            <NoData
              v-if="suratData.length === 0"
              title="Silahkan Pilih Surat Terlebih Dahulu"
            />

            <div v-for="(surat, index) in suratData" :key="index">
              <!-- Surat Control Rawat Jalan -->
              <CustomAccordion
                v-if="surat.name === 'Surat Kontrol Rawat Jalan'"
                headerClass="bg-adameds-50"
              >
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
              <CustomAccordion
                v-if="surat.name === 'Surat Permohonan Rawat Inap (SPRI)'"
                headerClass="bg-adameds-50"
              >
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
              <CustomAccordion
                v-if="surat.name === 'Surat Keterangan Sakit'"
                headerClass="bg-adameds-50"
              >
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
              <CustomAccordion
                v-if="surat.name === 'Surat Keterangan Sehat'"
                headerClass="bg-adameds-50"
              >
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
                    <CustomSwitch label="Buta Warna" class="col-span-3" />
                    <div class="grid grid-cols-2 gap-x-2.5 col-span-6">
                      <div class="col-span-2 font-semibold text-normal">
                        Setelah Diperiksa Dinyatakan
                      </div>
                      <CustomRadio
                        v-for="data in ['Sehat', 'Tidak Sehat']"
                        v-model="tipePeriksa"
                        :sideLabel="data"
                        :value="data"
                      />
                    </div>
                    <CustomTextArea
                      label="Untuk Keperluan"
                      placeholder="Untuk Keperluan ..."
                      class="col-span-12"
                    />
                  </div>
                </template>
              </CustomAccordion>
              <!-- Surat Rujukan -->
              <CustomAccordion
                v-if="surat.name === 'Surat Rujukan'"
                headerClass="bg-adameds-50"
              >
                <template #header>Surat Rujukan</template>
                <template #content>
                  <div class="grid grid-cols-12 mt-5 gap-x-[30px] gap-y-5">
                    <div class="flex gap-[30px] col-span-12">
                      <div
                        class="grid grid-cols-2 gap-x-5 pr-[30px] border-r border-adameds-300"
                      >
                        <div class="col-span-2 font-semibold text-normal">
                          Surat Rujukan
                        </div>
                        <CustomRadio
                          v-for="data in ['Eksternal', 'Internal']"
                          :sideLabel="data"
                          :value="data"
                        />
                      </div>
                      <CustomInputNumber
                        label="No. Surat"
                        placeholder="No. 123456"
                        class="basis-2/12"
                      />
                      <CustomSelect
                        label="Tujuan Pelayanan"
                        place-holder="Pilih Tujuan Pelayanan"
                        class="grow"
                      />
                    </div>
                    <CustomDatePicker label="Tgl.Rencana" class="col-span-2" />
                    <CustomSelect
                      label="Poli/Spesialis"
                      place-holder="Pilih Poli/Spesialis"
                      class="col-span-5"
                    />
                    <CustomTextfield
                      label="Dirujuk Ke"
                      placeholder="Dirujuk Ke"
                      class="col-span-5"
                    />
                    <CustomTextfield
                      label="Alasan Klinikal"
                      placeholder="Alasan Klinikal"
                      class="col-span-4"
                    />
                    <CustomSelect
                      label="Alasan Non Klinikal"
                      place-holder="Pilih Alasan Non Klinikal"
                      class="col-span-4"
                    />
                    <CustomTextfield
                      label="Alasan Non Klinikal Lainnya"
                      placeholder="Alasan Non Klinikal Lainnya"
                      class="col-span-4"
                    />
                    <CustomTextArea
                      label="Catatan Rujukan"
                      placeholder="Catatan Rujukan ..."
                      class="col-span-12"
                    />
                  </div>
                </template>
              </CustomAccordion>
              <!-- Surat Keterangan Meninggal -->
              <CustomAccordion
                v-if="surat.name === 'Surat Keterangan Meninggal'"
                headerClass="bg-adameds-50"
              >
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
                      label="Dokter Yang Menyatakan Meninggal"
                      place-holder="Pilih Dokter Yang Menyatakan Meninggal"
                      class="col-span-6"
                    />
                    <CustomSelect
                      label="Penyebab Kematian"
                      place-holder="Pilih Penyebab Kematian"
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
                @click="buatSurat = false"
              >
              </CustomButton>
              <CustomButton label="Simpan" @click="submitForm"> </CustomButton>
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
