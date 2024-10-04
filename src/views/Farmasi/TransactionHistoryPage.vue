<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from '@/components/Base/CustomPaginator.vue';
import CustomDialog from "@/components/Base/CustomDialog.vue";
import type { MenuItem } from "primevue/menuitem";
import NoData from "@/components/section/NoData.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const riwayatDialog = ref(false);
const riwayatDialog2 = ref(false);
const riwayatDialog3 = ref(false);
const dataBreadCrumb = ref<MenuItem[]>([]);

const filterLokasi = ref([
  "FARMASI RAWAT JALAN",
  "FARMASI RAWAT INAP",
  "FARMASI IGD",
]);

const filterJenisItem = ref([
  "OBAT",
  "MATERIAL",
]);

// Filter Riwayat
const selectedHistory = ref<string>("RiwayatResep");

const onSelectHistory = (label: string) => {
  selectedHistory.value = label;
  // console.log(selectedPayType, 'selectedPayType');
  
};

// Filter Lokasi
const selectedFilterFarmasi = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  if (selectedFilterFarmasi.value.includes(label)) {
    // console.log(selectedFilterFarmasi, 'selectedFilterFarmasi');
    
    selectedFilterFarmasi.value = selectedFilterFarmasi.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterFarmasi.value.push(label);
  }
};

// Filter Jenis Item
const selectedJenisItem = ref<string[]>([]);
const onSelectJenisItem = (label: string) => {
  if (selectedJenisItem.value.includes(label)) {
    // console.log(selectedJenisItem, 'selectedJenisItem');
    
    selectedJenisItem.value = selectedJenisItem.value.filter(
      (item) => item != label
    );
  } else {
    selectedJenisItem.value.push(label);
  }
};

// Filter Pembayaran
const selectedPayment = ref<string[]>([]);
const onSelectPayment = (label: string) => {
  if (selectedPayment.value.includes(label)) {
    selectedPayment.value = selectedPayment.value.filter(
      (item) => item != label
    );
  } else {
    selectedPayment.value.push(label);
  }
};

const itemsPasien = ref([
  {
    resep: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    tglJadwal: "01-10-2024",
    jamJadwal: "08.00",
    lokasi: "FARMASI RAWAT INAP",
    doctor: "Obat",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    jenisObat: "Racikan",
    layanan: "IGD",
    harga: '10000',
    noRM: "00-00-00",
    status: "Lunas",
  },
  {
    resep: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    tglJadwal: "01-10-2024",
    jamJadwal: "08.00",
    lokasi: "FARMASI IGD",
    doctor: "Obat",
    no_SEP: "9999999999999999",
    insurance_account_name: "BPJS",
    jenisObat: "Racikan",
    layanan: "Rawat Inap",
    harga: '10000',
    noRM: "00-00-00",
    status: "Piutang",
  },
  {
    resep: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    tglJadwal: "01-10-2024",
    jamJadwal: "08.00",
    lokasi: "FARMASI RAWAT INAP",
    doctor: "Alkes",
    no_SEP: "",
    layanan: "Rawat Jalan",
    harga: '10000',
    insurance_account_name: "TUNAI",
    jenisObat: "Racikan",
    phone: "082112341234",
    noRM: "11-22-33",
    status: "Piutang",
  },
  {
    resep: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    tglJadwal: "01-10-2024",
    jamJadwal: "08.00",
    lokasi: "FARMASI RAWAT JALAN",
    doctor: "Obat",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    jenisObat: "Racikan",
    phone: "082112341234",
    layanan: "IGD",
    harga: '10000',
    noRM: "33-44-55",
    nstatus: "Lunas",
  },
  {
    resep: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    tglJadwal: "01-10-2024",
    jamJadwal: "08.00",
    lokasi: "FARMASI RAWAT JALAN",
    doctor: "Alkes",
    no_SEP: "",
    insurance_account_name: "BPJS",
    jenisObat: "Racikan",
    phone: "082112341234",
    layanan: "IGD",
    harga: '10000',
    noRM: "00-22-33",
    status: "Lunas",
  },
]);

const itemRetur = ref([
  {
    step: "1",
    status: "Order Resep",
    tanggal: "10-01-2025",
    jam: '10:00',
    dokter: 'dr. Andreas Ajg SP.Koc',
    petugas: 'Fikri'
  },
  {
    step: "2",
    status: "Verifikasi Resep",
    tanggal: "10-01-2025",
    jam: '10:00',
    dokter: 'dr. Andreas Ajg SP.Koc',
    petugas: 'Fikri'
  },
  {
    step: "3",
    status: "Disiapkan Oleh",
    tanggal: "10-01-2025",
    jam: '10:00',
    dokter: 'dr. Andreas Ajg SP.Koc',
    petugas: 'Fikri'
  },
  {
    step: "4",
    status: "Diberikan Oleh",
    tanggal: "10-01-2025",
    jam: '10:00',
    dokter: 'dr. Andreas Ajg SP.Koc',
    petugas: 'Fikri'
  },
  {
    step: "5",
    status: "Diterima Oleh",
    tanggal: "10-01-2025",
    jam: '10:00',
    dokter: 'dr. Andreas Ajg SP.Koc',
    petugas: 'Fikri'
  },
]);

const itemStokObat = ref([
  {
    stokObat: "Umum",
    status: "3x1 (Sehari) Sebelum Makan",
    satuan: "1500",
    jasaResep: '1000',
    potongan: '0',
    total: '25000'
  },
]);

const handleRowsUpdate = (rows: number) => {
};
const handlePageUpdate = (page: number) => {
};
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      v-if="dataBreadCrumb.length == 0"
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Riwayat Transaksi',
                    home: true,
                  }"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama / address / No. RM"
                class="mr-5 grow"
              />
              <CustomDatePicker
                v-model="startDateFilter"
                label="Tanggal"
                class="w-[150px]"
              />
              <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
              <CustomDatePicker
                v-model="endDateFilter"
                :showLabel="false"
                class="mt-auto w-[150px]"
              />
              <CustomButton
                icon="PhMagnifyingGlass"
                label="Cari"
                class="ml-5 mr-[10px] mt-auto"
              />
              <CustomButton
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto"
              />
            </div>
            <!-- Filter Riwayat -->
            <div class="grid grid-cols-3 mt-[15px]">
              <CustomButton
                @click="onSelectHistory('RiwayatResep')"
                label="RIWAYAT RESEP"
                :outlined="selectedHistory != 'RiwayatResep'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedHistory != 'RiwayatResep' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedHistory != 'RiwayatResep' ? 'bg-transparent' : 'bg-adameds-300'
                "
                class="font-semibold"
              />
              <CustomButton
                @click="onSelectHistory('RiwayatRetur')"
                label="RIWAYAT RETUR"
                :outlined="selectedHistory != 'RiwayatRetur'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedHistory != 'RiwayatRetur' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedHistory != 'RiwayatRetur' ? 'bg-transparent' : 'bg-adameds-300'
                "
                class="ml-[20px] font-semibold "
              />
              <CustomButton
                @click="onSelectHistory('RiwayatPembatalan')"
                label="RIWAYAT PEMBATALAN"
                :outlined="selectedHistory != 'RiwayatPembatalan'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedHistory != 'RiwayatPembatalan' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedHistory != 'RiwayatPembatalan' ? 'bg-transparent' : 'bg-adameds-300'
                "
                class="ml-[20px] font-semibold"
              />
            </div>
            
            <!-- Filter Lokasi -->
            <div class="flex mb-[10px] mt-5">
              <div class="w-[15%] font-semibold text-SM text-grey-300">Filter Lokasi</div>
                <div class="flex">
                  <span class="text-grey-300">|</span>
                  <CustomChip
                    v-for="(Pelayanan, index) in filterLokasi" :key="Pelayanan + index"
                    :label="Pelayanan"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-50"
                    iconColor="text-adameds-300"
                    textColor="text-adameds-300"
                    customClass="h-7"
                    class="ml-[10px]"
                    :isSelected="selectedFilterFarmasi.includes(Pelayanan)"
                    @selected="onPoliSelect"
                    selectedColor="bg-adameds-300 border-adameds-300"
                  />
                </div>
            </div>

            <!-- Filter Jenis Item -->
            <div class="flex mb-[10px] mt-5">
              <div class="w-[15%] font-semibold text-SM text-grey-300">Filter Jenis Item</div>
                <div class="flex">
                  <span class="text-grey-300">|</span>
                  <CustomChip
                    v-for="(jenisItem, index) in filterJenisItem" :key="jenisItem + index"
                    :label="jenisItem"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-50"
                    iconColor="text-adameds-300"
                    textColor="text-adameds-300"
                    customClass="h-7"
                    class="ml-[10px]"
                    :isSelected="selectedFilterFarmasi.includes(jenisItem)"
                    @selected="onSelectJenisItem"
                    selectedColor="bg-adameds-300 border-adameds-300"
                  />
                </div>
            </div>

            <!-- Filter Pembayaran -->
            <div class="flex my-[10px] mt-5">
                <div class="w-[15%] font-semibold text-SM text-grey-300">Filter Pembayaran</div>
                  <div class="flex">
                    <span class="text-grey-300">|</span>
                    <CustomChip
                      label="TUNAI"
                      borderColor="border-adameds-300"
                      bgColor="bg-adameds-50"
                      iconColor="text-adameds-300"
                      textColor="text-adameds-300"
                      customClass="h-7"
                      class="ml-[10px]"
                      :isSelected="selectedPayment.includes('TUNAI')"
                      @selected="onSelectPayment"
                      selectedColor="bg-adameds-300 border-adameds-300"
                    />
                    <CustomChip
                      label="ASURANSI"
                      borderColor="border-warning-300"
                      bgColor="bg-warning-50"
                      iconColor="text-warning-300"
                      textColor="text-warning-300"
                      customClass="h-7"
                      class="ml-[10px]"
                      :isSelected="selectedPayment.includes('ASURANSI')"
                      @selected="onSelectPayment"
                      selectedColor="bg-warning-300 border-warning-300"
                    />
                  </div>
            </div>
            <hr class="mt-5 border-[1px] border-grey-200">
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
      </template>
      <template #content>
        <DataTable
          v-if="itemsPasien.length"
          :value="itemsPasien"
          class="mt-2"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          @rowClick="riwayatDialog2 = true"
        >
          <!-- Resep -->
          <Column field="resep" header="Resep" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="">
                <div class="text-SM">
                  {{ slotProps.data.resep }}
                </div>
                <div class="text-SM">{{ slotProps.data.tglJadwal }} <span>{{ slotProps.data.jamJadwal }}</span></div>
              </div>
            </template>
          </Column>

          <!-- Pasien -->
          <Column field="name" header="Pasien" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <p class="font-semibold">{{ slotProps.data.name }}</p>
              </div>
              <div class="flex flex-wrap">
                <CustomChip
                  :label="slotProps.data.noRM"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                  customClass="h-6"
                />
              </div>
            </template>
          </Column>

          <!-- Keperawatan -->
          <Column field="harga" header="Keperawatan" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div>
                <p class="text-SM">{{ slotProps.data.layanan }}</p>
              </div>
              <div class="flex">
                <div>
                  <CustomChip
                    :label="slotProps.data.lokasi"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300" 
                    textColor="text-white"
                    customClass="h-6"
                  />
                </div>
                <div class="ml-[5px]">
                  <CustomChip
                    :label="slotProps.data.doctor"
                    :showCheckedIcon="false"
                    borderColor="border-lavender-300"
                    bgColor="bg-lavender-300" 
                    textColor="text-white"
                    customClass="h-6"
                  />
                </div>
                <div class="ml-[5px]">
                  <CustomChip
                    v-if="slotProps.data.insurance_account_name == 'TUNAI'"
                    label="TUNAI"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300" 
                    textColor="text-white"
                    customClass="h-6"
                  />
                  <CustomChip v-else
                    label="BPJS"
                    :showCheckedIcon="false"
                    borderColor="border-warning-300"
                    bgColor="bg-warning-300" 
                    textColor="text-white"
                    customClass="h-6"
                  />
                </div>
                <div class="ml-[5px]">
                  <CustomChip
                    :label="slotProps.data.jenisObat"
                    :showCheckedIcon="false"
                    borderColor="border-danger-300"
                    bgColor="bg-danger-300" 
                    textColor="text-white"
                    customClass="h-6"
                  />
                </div>
              </div>
            </template>
          </Column>
          
          <!-- Status -->
          <Column field="status" header="Status" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="">
              <CustomChip
                :showCheckedIcon="false"
                :label="
                  slotProps.data.status == 'Lunas' ? 'Lunas' : 'Piutang'
                "
                :bgColor="
                  slotProps.data.status == 'Lunas' ? 'bg-success-300' : 'bg-danger-75'
                "
                :textColor="
                  slotProps.data.status == 'Lunas'
                    ? 'text-white'
                    : 'text-danger-300'
                "
                customClass="h-6 pr-[6px] border-none"
              />
            </div>
          </template>
        </Column>
        </DataTable>
        <NoData v-else />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomPaginator
            :rows="10"
            :totalRecords="100"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>
    
    <!-- Riwayat Dialog -->
    <CustomDialog v-model:visible="riwayatDialog" width="1000px">
      <template #header>
        <div class="flex justify-between">
          <div class="flex">
            <p>Riwayat Resep - RSP123
            <CustomChip
              label="TUNAI"
              :showCheckedIcon="false"
              borderColor="border-adameds-300"
              bgColor="bg-adameds-50"
              textColor="text-adameds-300"
              customClass="h-6"
              class="ml-[5px]"
            />
            </p>
          </div>
          <div></div>
          <div class="flex ml-[470px]">
            <div class="bg-white w-[1px] h-[30px]"></div>
              <p class="text-sm ml-[10px] mt-[3px]">Tgl. Order : 3-10-2024</p>
          </div>
        </div>
      </template>
      <template #body>
        <div>
          <div class="pt-5">
            <div class="flex flex-row">
              <div class="basis-1/4">
                <p class="font-bold text-MD">Nama lengkap pasien</p>
                <p>REG1231235</p>
                <CustomButton class="w-24 h-5 text-sm">00-00-00</CustomButton>
                <CustomChip
                  :showCheckedIcon="false"
                  label="Laki-laki"
                  bgColor="bg-male-75"
                  textColor="text-male-300"
                  customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
                />
                <!-- <CustomChip
                  :showCheckedIcon="false"
                  label="Perempuan"
                  bgColor="bg-female-75"
                  textColor="text-female-300"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                /> -->
              </div>
              <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
              <div class="mt-[20px] mr-[40px]">
                <p class="text-xs font-bold underline underline-offset-2">Tgl. Lahir</p>
                <p class="">10 Januari 2090</p>
              </div>
              <div class="mt-[20px] mr-[40px]">
                <p class="text-xs font-bold underline underline-offset-2">Umur</p>
                <p class="">24Thn 2Bln 1Hari</p>
              </div>
              <div class="mt-[20px] mr-[40px]">
                <p class="text-xs font-bold underline underline-offset-2">Alergi</p>
                <p class="">Tidak Ada</p>
              </div>
            </div>
            <!-- Asesmen Medis -->
            <div class="grid grid-cols-1">
              <CustomAccordion no-border initial-state="0">
                <template #header>Asesmen Medis</template>
                <template #content>
                  <div class="flex flex-row mt-[20px]">
                    <div class="basis-1/4">
                      <p class="text-xs font-bold underline underline-offset-2">Nama lengkap pasien</p>
                      <p>Sakit Mata</p>
                      <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Dokter Pengirim
                        <span>  </span>
                      </p>
                      <p>dr. Anji Sp. M</p>
                    </div>
                    <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
                    <div class="mr-[40px]">
                      <p class="text-xs font-bold underline underline-offset-2">Diagnosa Primer</p>
                      <p class="">H10.9 Conjuctivitis</p>
                      <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Diagnosa Primer</p>
                      <p class="">-</p>
                    </div>
                    <div class="mr-[40px]">
                      <p class="text-xs font-bold underline underline-offset-2">Diagnosa Sekunder</p>
                      <p class="">-</p>
                    </div>
                    <div class="mr-[40px]">
                      <p class="text-xs font-bold underline underline-offset-2">Diagnosa Sekunder</p>
                      <p class="">-</p>
                    </div>
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
            <!-- Status Verifikasi -->
            <div class="grid grid-cols-1">
              <CustomAccordion no-border initial-state="0">
                <template #header>Status Verifikasi</template>
                <template #content>
                  <div class="mt-[20px]">
                    <DataTable
                        v-if="itemRetur.length"
                        :value="itemRetur"
                        class="mt-2"
                        scrollable
                        scrollHeight="flex"
                        :pt="{ headerRow: 'text-SM' }"
                        @rowClick="riwayatDialog = true"
                      >
                        <!-- Resep -->
                        <Column field="step" header="Step" headerClass="bg-adameds-50">
                          <template #body="slotProps">
                            <div class="">
                                <p class="">{{ slotProps.data.step }}</p>
                            </div>
                          </template>
                        </Column>

                        <!-- Status -->
                        <Column field="status" header="Status" headerClass="bg-adameds-50">
                          <template #body="slotProps">
                            <div class="text-SM">
                              <p class="font-bold underline underline-offset-2">{{ slotProps.data.status }}</p>
                            </div>
                            <div class="">
                              <p>{{ slotProps.data.dokter  }}</p>
                            </div>
                          </template>
                        </Column>

                        <!-- Tanggal -->
                        <Column field="tanggal" header="Tanggal" headerClass="bg-adameds-50">
                          <template #body="slotProps">
                            <div>
                              <p class="text-sm">{{ slotProps.data.tanggal }}</p>
                            </div>
                          </template>
                        </Column>

                        <!-- Jam -->
                        <Column field="jam" header="Jam" headerClass="bg-adameds-50">
                        <template #body="slotProps">
                          <div class="">
                            <p class="text-sm">{{ slotProps.data.jam }}</p>
                          </div>
                        </template>
                      </Column>
                    </DataTable>
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
            <!-- Asesmen Medis -->
            <div class="grid grid-cols-1">
              <CustomAccordion no-border initial-state="0">
                <template #header>Asesmen Medis</template>
                <template #content>
                  <div class="mt-[20px]">
                    <card class="bg-adameds-50">
                      <template #content>
                        <div class="flex justify-between">
                          <div class="flex">
                            <CustomButton class="text-sm h-7">01</CustomButton>
                            <p class="ml-2 text-base font-bold">
                              Paracetamol
                            </p>
                            <PhArrowRight
                              :size="20"
                              class="my-auto ml-2 text-success-300"
                              weight="bold"
                            />
                            <p class="ml-2 text-base font-bold">10 Tablet</p>
                          </div>
                          <div>
                            <CustomChip
                              :showCheckedIcon="false"
                              label="OBAT KRONIS"
                              borderColor="border-danger-300"
                              bgColor="bg-none"
                              textColor="text-danger-300"
                              customClass="h-5 border-danger-300"
                            />
                          </div>
                        </div>
                      </template>
                    </card>
                    <div class="pt-5 mt-[-20px]">
                      <DataTable
                        v-if="itemStokObat.length"
                        :value="itemStokObat"
                        class="overflow-hidden rounded-[10px]"
                        scrollable
                        scrollHeight="flex"
                        :pt="{ headerRow: 'text-SM' }"
                      >
                        <!-- Stok Obat -->
                        <Column field="stokObat" header="Stok Obat">
                          <template #body="slotProps">
                            <div class="flex justify-between">
                              <div>
                                <p class="text-SM">
                                  {{ slotProps.data.stokObat }}
                                </p>
                              </div>
                            </div>
                          </template>
                        </Column>
                        <!-- Aturan & Cara Pakai -->
                        <Column field="status" header="Aturan & Cara Pakai">
                          <template #body="slotProps">
                            <div>
                              <p class="text-sm">{{ slotProps.data.status }}</p>
                            </div>
                          </template>
                        </Column>
                        <!-- Satuan -->
                        <Column field="satuan" header="Satuan">
                          <template #body="slotProps">
                            <div class="text-sm">{{ slotProps.data.satuan }}</div>
                          </template>
                        </Column>
                        <!-- Jasa Resep -->
                        <Column field="jasaResep" header="Jasa Resep">
                          <template #body="slotProps">
                            <div class="text-SM">{{ slotProps.data.jasaResep }}</div>
                          </template>
                        </Column>
                        <!-- Potongan -->
                        <Column field="potongan" header="Potongan">
                          <template #body="slotProps">
                            <div class="text-SM">{{ slotProps.data.potongan }}</div>
                          </template>
                        </Column>
                        <!-- Total -->
                        <Column field="total" header="Total">
                          <template #body="slotProps">
                            <div class="text-SM">{{ slotProps.data.total }}</div>
                          </template>
                        </Column>
                      </DataTable>
                    </div>
                  </div>
                  <div class="mt-[20px]">
                    <card class="bg-adameds-50">
                      <template #content>
                        <div class="flex justify-between">
                          <div class="flex">
                            <CustomButton class="text-sm h-7">02</CustomButton>
                            <p class="ml-2 text-base font-bold">
                              Amoxcillin
                            </p>
                            <PhArrowRight
                              :size="20"
                              class="my-auto ml-2 text-success-300"
                              weight="bold"
                            />
                            <p class="ml-2 text-base font-bold">15 Tablet</p>
                          </div>
                        </div>
                      </template>
                    </card>
                    <div class="pt-5 mt-[-20px]">
                      <DataTable
                        v-if="itemStokObat.length"
                        :value="itemStokObat"
                        class="overflow-hidden rounded-[10px]"
                        scrollable
                        scrollHeight="flex"
                        :pt="{ headerRow: 'text-SM' }"
                      >
                        <!-- Stok Obat -->
                        <Column field="stokObat" header="Stok Obat">
                          <template #body="slotProps">
                            <div class="flex justify-between">
                              <div>
                                <p class="text-SM">
                                  {{ slotProps.data.stokObat }}
                                </p>
                              </div>
                            </div>
                          </template>
                        </Column>
                        <!-- Aturan & Cara Pakai -->
                        <Column field="status" header="Aturan & Cara Pakai">
                          <template #body="slotProps">
                            <div>
                              <p class="text-sm">{{ slotProps.data.status }}</p>
                            </div>
                          </template>
                        </Column>
                        <!-- Satuan -->
                        <Column field="satuan" header="Satuan">
                          <template #body="slotProps">
                            <div class="text-sm">{{ slotProps.data.satuan }}</div>
                          </template>
                        </Column>
                        <!-- Jasa Resep -->
                        <Column field="jasaResep" header="Jasa Resep">
                          <template #body="slotProps">
                            <div class="text-SM">{{ slotProps.data.jasaResep }}</div>
                          </template>
                        </Column>
                        <!-- Potongan -->
                        <Column field="potongan" header="Potongan">
                          <template #body="slotProps">
                            <div class="text-SM">{{ slotProps.data.potongan }}</div>
                          </template>
                        </Column>
                        <!-- Total -->
                        <Column field="total" header="Total">
                          <template #body="slotProps">
                            <div class="text-SM">{{ slotProps.data.total }}</div>
                          </template>
                        </Column>
                      </DataTable>
                    </div>
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
          </div>
          
          <!-- Total Tagihan Resep -->
          <div class="mt-4">
            <card class="bg-adameds-50">
              <template #content>
                <div class="flex justify-between">
                  <p class="text-base font-bold">
                    Total Tagihan Resep
                  </p>
                  <p class="text-base font-bold">
                    RP. 0, 00
                  </p>
                </div>
              </template>
            </card>
          </div>
          
          <!-- Catatan -->
          <div class="grid grid-cols-1">
            <CustomAccordion no-border initial-state="0">
              <template #header>Catatan</template>
                <template #content>
                  <div class="mt-[20px]">
                    <p>-</p>
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
          <hr class="border-[1px] border-grey-200">
          <div class="flex">
            <div class="mt-3">           
              <CustomButton background-color="bg-adameds-300 rounded-lg">
                <div class="flex items-center gap-2">
                  <PhPrinter :size="18" color="#ffffff" weight="fill" />
                  <div class="text-SM">Cetak</div>
                </div>
              </CustomButton>
            </div>
          </div>
        </div>
      </template>
    </CustomDialog>

     <!-- Riwayat Dialog2 -->
     <CustomDialog v-model:visible="riwayatDialog2" width="1000px">
      <template #header>
        <div class="flex justify-between">
          <div class="flex">
            <p>Riwayat Resep - RSP123
            <CustomChip
              label="TUNAI"
              :showCheckedIcon="false"
              borderColor="border-adameds-300"
              bgColor="bg-adameds-50"
              textColor="text-adameds-300"
              customClass="h-6"
              class="ml-[5px]"
            />
            </p>
          </div>
          <div></div>
          <div class="flex ml-[470px]">
            <div class="bg-white w-[1px] h-[30px]"></div>
              <p class="text-sm ml-[10px] mt-[3px]">Tgl. Order : 3-10-2024</p>
            </div>
          <div>
          </div>
        </div>
      </template>
      <template #body>
        <div>
          <div class="pt-5">
            <div class="flex flex-row">
              <div class="basis-1/4">
                <p class="font-bold text-MD">Nama lengkap pasien</p>
                <p>REG1231235</p>
                <CustomButton class="w-24 h-5 text-sm">00-00-00</CustomButton>
                <CustomChip
                  :showCheckedIcon="false"
                  label="Laki-laki"
                  bgColor="bg-male-75"
                  textColor="text-male-300"
                  customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
                />
                <!-- <CustomChip
                  :showCheckedIcon="false"
                  label="Perempuan"
                  bgColor="bg-female-75"
                  textColor="text-female-300"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                /> -->
              </div>
              <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
              <div class="mt-[20px] mr-[40px]">
                <p class="text-xs font-bold underline underline-offset-2">Tgl. Lahir</p>
                <p class="">10 Januari 2090</p>
              </div>
              <div class="mt-[20px] mr-[40px]">
                <p class="text-xs font-bold underline underline-offset-2">Umur</p>
                <p class="">24Thn 2Bln 1Hari</p>
              </div>
              <div class="mt-[20px] mr-[40px]">
                <p class="text-xs font-bold underline underline-offset-2">Alergi</p>
                <p class="">Tidak Ada</p>
              </div>
            </div>
            <!-- Asesmen Medis -->
            <div class="grid grid-cols-1">
              <CustomAccordion no-border initial-state="0">
                <template #header>Asesmen Medis</template>
                <template #content>
                  <div class="flex flex-row mt-[20px]">
                    <div class="basis-1/4">
                      <p class="text-xs font-bold underline underline-offset-2">Nama lengkap pasien</p>
                      <p>Sakit Mata</p>
                      <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Dokter Pengirim
                        <span>  </span>
                      </p>
                      <p>dr. Anji Sp. M</p>
                    </div>
                    <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
                    <div class="mr-[40px]">
                      <p class="text-xs font-bold underline underline-offset-2">Diagnosa Primer</p>
                      <p class="">H10.9 Conjuctivitis</p>
                      <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Diagnosa Primer</p>
                      <p class="">-</p>
                    </div>
                    <div class="mr-[40px]">
                      <p class="text-xs font-bold underline underline-offset-2">Diagnosa Sekunder</p>
                      <p class="">-</p>
                    </div>
                    <div class="mr-[40px]">
                      <p class="text-xs font-bold underline underline-offset-2">Diagnosa Sekunder</p>
                      <p class="">-</p>
                    </div>
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
            <!-- Status Retur -->
            <div class="grid grid-cols-1">
              <CustomAccordion no-border initial-state="0">
                <template #header>Status Retur</template>
                <template #content>
                  <div class="mt-[20px]">
                    <DataTable
                        v-if="itemRetur.length"
                        :value="itemRetur"
                        class="mt-2"
                        scrollable
                        scrollHeight="flex"
                        :pt="{ headerRow: 'text-SM' }"
                        @rowClick="riwayatDialog = true"
                      >
                        <!-- Resep -->
                        <Column field="step" header="Step" headerClass="bg-adameds-50">
                          <template #body="slotProps">
                            <div class="">
                                <p class="">{{ slotProps.data.step }}</p>
                            </div>
                          </template>
                        </Column>

                        <!-- Status -->
                        <Column field="status" header="Status" headerClass="bg-adameds-50">
                          <template #body="slotProps">
                            <div class="text-SM">
                              <p class="font-bold underline underline-offset-2">{{ slotProps.data.status }}</p>
                            </div>
                            <div class="">
                              <p>{{ slotProps.data.dokter  }}</p>
                            </div>
                          </template>
                        </Column>

                        <!-- Tanggal -->
                        <Column field="tanggal" header="Tanggal" headerClass="bg-adameds-50">
                          <template #body="slotProps">
                            <div>
                              <p class="text-sm">{{ slotProps.data.tanggal }}</p>
                            </div>
                          </template>
                        </Column>

                        <!-- Jam -->
                        <Column field="jam" header="Jam" headerClass="bg-adameds-50">
                        <template #body="slotProps">
                          <div class="">
                            <p class="text-sm">{{ slotProps.data.jam }}</p>
                          </div>
                        </template>
                      </Column>
                    </DataTable>
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
            <!-- Daftar Resep/Obat -->
            <div class="grid grid-cols-1">
              <CustomAccordion no-border initial-state="0">
                <template #header>Daftar Resep / Obat</template>
                <template #content>
                  <div class="mt-[20px]">
                    <card class="bg-adameds-50">
                      <template #content>
                        <div class="flex justify-between">
                          <div class="flex">
                            <CustomButton class="text-sm h-7">02</CustomButton>
                            <p class="ml-2 text-base font-bold">
                              Amoxcillin
                            </p>
                            <PhArrowRight
                              :size="20"
                              class="my-auto ml-2 text-success-300"
                              weight="bold"
                            />
                            <p class="ml-2 text-base font-bold">15 Tablet</p>
                          </div>
                        </div>
                      </template>
                    </card>
                    <div class="pt-5 mt-[-20px]">
                      <DataTable
                        v-if="itemStokObat.length"
                        :value="itemStokObat"
                        class="overflow-hidden rounded-[10px]"
                        scrollable
                        scrollHeight="flex"
                        :pt="{ headerRow: 'text-SM' }"
                      >
                        <!-- Stok Obat -->
                        <Column field="stokObat" header="Stok Obat">
                          <template #body="slotProps">
                            <div class="flex justify-between">
                              <div>
                                <p class="text-SM">
                                  {{ slotProps.data.stokObat }}
                                </p>
                              </div>
                            </div>
                          </template>
                        </Column>
                        <!-- Aturan & Cara Pakai -->
                        <Column field="status" header="Aturan & Cara Pakai">
                          <template #body="slotProps">
                            <div>
                              <p class="text-sm">{{ slotProps.data.status }}</p>
                            </div>
                          </template>
                        </Column>
                        <!-- Satuan -->
                        <Column field="satuan" header="Satuan">
                          <template #body="slotProps">
                            <div class="text-sm">{{ slotProps.data.satuan }}</div>
                          </template>
                        </Column>
                        <!-- Jasa Resep -->
                        <Column field="jasaResep" header="Jasa Resep">
                          <template #body="slotProps">
                            <div class="text-SM">{{ slotProps.data.jasaResep }}</div>
                          </template>
                        </Column>
                        <!-- Potongan -->
                        <Column field="potongan" header="Potongan">
                          <template #body="slotProps">
                            <div class="text-SM">{{ slotProps.data.potongan }}</div>
                          </template>
                        </Column>
                        <!-- Total -->
                        <Column field="total" header="Total">
                          <template #body="slotProps">
                            <div class="text-SM">{{ slotProps.data.total }}</div>
                          </template>
                        </Column>
                      </DataTable>
                    </div>
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
          </div>
        
          <!-- Total Retur -->
          <div class="mt-4">
            <card class="bg-adameds-50">
              <template #content>
                <div class="flex justify-between">
                  <p class="text-base font-bold">
                    Total Retur
                  </p>
                  <p class="text-base font-bold">
                    RP. 0, 00
                  </p>
                </div>
              </template>
            </card>
          </div>
          
          <!-- Alasan Retur -->
          <div class="grid grid-cols-1">
            <CustomAccordion no-border initial-state="0">
              <template #header>Alasan Retur</template>
                <template #content>
                  <div class="mt-[20px]">
                    <p>Obat diganti Oral</p>
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
          <hr class="border-[1px] border-grey-200">
          <div class="flex">
            <div class="mt-3">           
              <CustomButton background-color="bg-adameds-300 rounded-lg">
                <div class="flex items-center gap-2">
                  <PhPrinter :size="18" color="#ffffff" weight="fill" />
                  <div class="text-SM">Cetak</div>
                </div>
              </CustomButton>
            </div>
          </div>
        </div>
      </template>
    </CustomDialog>

    <!-- Riwayat Dialog3 -->
    <CustomDialog v-model:visible="riwayatDialog3" width="1000px">
      <template #header>
        <div class="flex justify-between">
          <div class="flex">
            <p>Riwayat Resep - RSP123
              <span>
                <CustomChip
                  label="TUNAI"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-50"
                  textColor="text-adameds-300"
                  customClass="h-6"
                  class="ml-[5px]"
                />
              </span>
            </p>
          </div>
          <div></div>
          <div class="flex ml-[470px]">
            <div class="bg-white w-[1px] h-[30px]"></div>
            <p class="text-sm ml-[10px] mt-[3px]">Tgl. Order : 3-10-2024</p>
          </div>
          <div>
            
          </div>
        </div>
      </template>
      <template #body>
        <div>
        <div class="pt-5">
          <div class="flex flex-row">
            <div class="basis-1/4">
              <p class="font-bold text-MD">Nama lengkap pasien</p>
              <p>REG1231235</p>
              <CustomButton class="w-24 h-5 text-sm">00-00-00</CustomButton>
              <CustomChip
                :showCheckedIcon="false"
                label="Laki-laki"
                bgColor="bg-male-75"
                textColor="text-male-300"
                customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
              />
              <!-- <CustomChip
                :showCheckedIcon="false"
                label="Perempuan"
                bgColor="bg-female-75"
                textColor="text-female-300"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              /> -->
            </div>
            <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
            <div class="mt-[20px] mr-[40px]">
              <p class="text-xs font-bold underline underline-offset-2">Tgl. Lahir</p>
              <p class="">10 Januari 2090</p>
            </div>
            <div class="mt-[20px] mr-[40px]">
              <p class="text-xs font-bold underline underline-offset-2">Umur</p>
              <p class="">24Thn 2Bln 1Hari</p>
            </div>
            <div class="mt-[20px] mr-[40px]">
              <p class="text-xs font-bold underline underline-offset-2">Alergi</p>
              <p class="">Tidak Ada</p>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <CustomAccordion no-border initial-state="0">
              <template #header>Asesmen Medis</template>
              <template #content>
                <div class="flex flex-row mt-[20px]">
                  <div class="basis-1/4">
                    <p class="text-xs font-bold underline underline-offset-2">Nama lengkap pasien</p>
                    <p>Sakit Mata</p>
                    <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Dokter Pengirim
                      <span>  </span>
                    </p>
                    <p>dr. Anji Sp. M</p>
                  </div>
                  <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
                  <div class="mr-[40px]">
                    <p class="text-xs font-bold underline underline-offset-2">Diagnosa Primer</p>
                    <p class="">H10.9 Conjuctivitis</p>
                    <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Diagnosa Primer</p>
                    <p class="">-</p>
                  </div>
                  <div class="mr-[40px]">
                    <p class="text-xs font-bold underline underline-offset-2">Diagnosa Sekunder</p>
                    <p class="">-</p>
                  </div>
                  <div class="mr-[40px]">
                    <p class="text-xs font-bold underline underline-offset-2">Diagnosa Sekunder</p>
                    <p class="">-</p>
                  </div>
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
          <div class="grid grid-cols-1">
            <CustomAccordion no-border initial-state="0">
              <template #header>Status Verifikasi</template>
              <template #content>
                <div class="mt-[20px]">
                  <DataTable
                      v-if="itemRetur.length"
                      :value="itemRetur"
                      class="mt-2"
                      scrollable
                      scrollHeight="flex"
                      :pt="{ headerRow: 'text-SM' }"
                      @rowClick="riwayatDialog = true"
                    >
                      <!-- Resep -->
                      <Column field="step" header="Step" headerClass="bg-adameds-50">
                        <template #body="slotProps">
                          <div class="">
                              <p class="">{{ slotProps.data.step }}</p>
                          </div>
                        </template>
                      </Column>

                      <!-- Status -->
                      <Column field="status" header="Status" headerClass="bg-adameds-50">
                        <template #body="slotProps">
                          <div class="text-SM">
                            <p class="font-bold underline underline-offset-2">{{ slotProps.data.status }}</p>
                          </div>
                          <div class="">
                            <p>{{ slotProps.data.dokter  }}</p>
                          </div>
                        </template>
                      </Column>

                      <!-- Tanggal -->
                      <Column field="tanggal" header="Tanggal" headerClass="bg-adameds-50">
                        <template #body="slotProps">
                          <div>
                            <p class="text-sm">{{ slotProps.data.tanggal }}</p>
                          </div>
                        </template>
                      </Column>

                      <!-- Jam -->
                      <Column field="jam" header="Jam" headerClass="bg-adameds-50">
                      <template #body="slotProps">
                        <div class="">
                          <p class="text-sm">{{ slotProps.data.jam }}</p>
                        </div>
                      </template>
                    </Column>
                  </DataTable>
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
          <div class="grid grid-cols-1">
            <CustomAccordion no-border initial-state="0">
              <template #header>Asesmen Medis</template>
              <template #content>
                <div class="mt-[20px]">
                  <card class="bg-adameds-50">
                    <template #content>
                      <div class="flex justify-between">
                        <div class="flex">
                          <CustomButton class="text-sm h-7">01</CustomButton>
                          <p class="ml-2 text-base font-bold">
                            Paracetamol
                          </p>
                          <PhArrowRight
                            :size="20"
                            class="my-auto ml-2 text-success-300"
                            weight="bold"
                          />
                          <p class="ml-2 text-base font-bold">10 Tablet</p>
                        </div>
                        <div>
                          <CustomChip
                            :showCheckedIcon="false"
                            label="OBAT KRONIS"
                            borderColor="border-danger-300"
                            bgColor="bg-none"
                            textColor="text-danger-300"
                            customClass="h-5 border-danger-300"
                          />
                        </div>
                      </div>
                    </template>
                  </card>
                  <div class="pt-5 mt-[-20px]">
                    <DataTable
                      v-if="itemStokObat.length"
                      :value="itemStokObat"
                      class="overflow-hidden rounded-[10px]"
                      scrollable
                      scrollHeight="flex"
                      :pt="{ headerRow: 'text-SM' }"
                    >
                      <!-- Stok Obat -->
                      <Column field="stokObat" header="Stok Obat">
                        <template #body="slotProps">
                          <div class="flex justify-between">
                            <div>
                              <p class="text-SM">
                                {{ slotProps.data.stokObat }}
                              </p>
                            </div>
                          </div>
                        </template>
                      </Column>
                      <!-- Aturan & Cara Pakai -->
                      <Column field="status" header="Aturan & Cara Pakai">
                        <template #body="slotProps">
                          <div>
                            <p class="text-sm">{{ slotProps.data.status }}</p>
                          </div>
                        </template>
                      </Column>
                      <!-- Satuan -->
                      <Column field="satuan" header="Satuan">
                        <template #body="slotProps">
                          <div class="text-sm">{{ slotProps.data.satuan }}</div>
                        </template>
                      </Column>
                      <!-- Jasa Resep -->
                      <Column field="jasaResep" header="Jasa Resep">
                        <template #body="slotProps">
                          <div class="text-SM">{{ slotProps.data.jasaResep }}</div>
                        </template>
                      </Column>
                      <!-- Potongan -->
                      <Column field="potongan" header="Potongan">
                        <template #body="slotProps">
                          <div class="text-SM">{{ slotProps.data.potongan }}</div>
                        </template>
                      </Column>
                      <!-- Total -->
                      <Column field="total" header="Total">
                        <template #body="slotProps">
                          <div class="text-SM">{{ slotProps.data.total }}</div>
                        </template>
                      </Column>
                    </DataTable>
                  </div>
                </div>
                <div class="mt-[20px]">
                  <card class="bg-adameds-50">
                    <template #content>
                      <div class="flex justify-between">
                        <div class="flex">
                          <CustomButton class="text-sm h-7">02</CustomButton>
                          <p class="ml-2 text-base font-bold">
                            Amoxcillin
                          </p>
                          <PhArrowRight
                            :size="20"
                            class="my-auto ml-2 text-success-300"
                            weight="bold"
                          />
                          <p class="ml-2 text-base font-bold">15 Tablet</p>
                        </div>
                      </div>
                    </template>
                  </card>
                  <div class="pt-5 mt-[-20px]">
                    <DataTable
                      v-if="itemStokObat.length"
                      :value="itemStokObat"
                      class="overflow-hidden rounded-[10px]"
                      scrollable
                      scrollHeight="flex"
                      :pt="{ headerRow: 'text-SM' }"
                    >
                      <!-- Stok Obat -->
                      <Column field="stokObat" header="Stok Obat">
                        <template #body="slotProps">
                          <div class="flex justify-between">
                            <div>
                              <p class="text-SM">
                                {{ slotProps.data.stokObat }}
                              </p>
                            </div>
                          </div>
                        </template>
                      </Column>
                      <!-- Aturan & Cara Pakai -->
                      <Column field="status" header="Aturan & Cara Pakai">
                        <template #body="slotProps">
                          <div>
                            <p class="text-sm">{{ slotProps.data.status }}</p>
                          </div>
                        </template>
                      </Column>
                      <!-- Satuan -->
                      <Column field="satuan" header="Satuan">
                        <template #body="slotProps">
                          <div class="text-sm">{{ slotProps.data.satuan }}</div>
                        </template>
                      </Column>
                      <!-- Jasa Resep -->
                      <Column field="jasaResep" header="Jasa Resep">
                        <template #body="slotProps">
                          <div class="text-SM">{{ slotProps.data.jasaResep }}</div>
                        </template>
                      </Column>
                      <!-- Potongan -->
                      <Column field="potongan" header="Potongan">
                        <template #body="slotProps">
                          <div class="text-SM">{{ slotProps.data.potongan }}</div>
                        </template>
                      </Column>
                      <!-- Total -->
                      <Column field="total" header="Total">
                        <template #body="slotProps">
                          <div class="text-SM">{{ slotProps.data.total }}</div>
                        </template>
                      </Column>
                    </DataTable>
                  </div>
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
        </div>
        
        <!-- Total Tagihan Resep -->
        <div class="mt-4">
          <card class="bg-adameds-50">
            <template #content>
              <div class="flex justify-between">
                <p class="text-base font-bold">
                  Total Tagihan Resep
                </p>
                <p class="text-base font-bold">
                  RP. 0, 00
                </p>
              </div>
            </template>
          </card>
        </div>
        
        <!-- Catatan -->
        <div class="grid grid-cols-1">
          <CustomAccordion no-border initial-state="0">
            <template #header>Catatan</template>
              <template #content>
                <div class="mt-[20px]">
                  <p>-</p>
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
        <hr class="border-[1px] border-grey-200">
        <div class="flex">
          <div class="mt-3">           
            <CustomButton background-color="bg-adameds-300 rounded-lg">
              <div class="flex items-center gap-2">
                <PhPrinter :size="18" color="#ffffff" weight="fill" />
                <div class="text-SM">Cetak</div>
              </div>
            </CustomButton>
          </div>
        </div>
      </div>
      </template>
    </CustomDialog>
  </div>
</template>
  