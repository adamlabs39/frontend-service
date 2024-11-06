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
const returDialog = ref(false);

const filterFarmasi = ref([
  "Farmasi Rawat Jalan",
  "Farmasi Rawat Inap",
  "Farmasi IGD",
]);

// Filter Menunggu Pembayaran
const selectedPayType = ref<string>("Obat");

const onSelectPayType = (label: string) => {
  selectedPayType.value = label;
  // console.log(selectedPayType, 'selectedPayType');
  
};

// Filter Pelayanan
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

// Filter Pembayaran
const selectedPaymentMethod = ref<string[]>([]);
const onPaymentMethodSelect = (label: string) => {
  if (selectedPaymentMethod.value.includes(label)) {
    selectedPaymentMethod.value = selectedPaymentMethod.value.filter(
      (item) => item != label
    );
  } else {
    selectedPaymentMethod.value.push(label);
  }
};

const itemsPasien = ref([
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_jadwal: "08.00 - 11.00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    layanan: "IGD",
    harga: '10000',
    no_antrian: "00-00-00",
    status: "Lunas"
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_jadwal: "-",
    no_SEP: "9999999999999999",
    insurance_account_name: "BPJS",
    polyclinic: "POLI KANDUNGAN",
    layanan: "Rawat Inap",
    harga: '10000',
    no_antrian: "00-00-00",
    status: "Lunas"
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. Og",
    tanggal_jadwal: "08.00 - 11.00",
    no_SEP: "123123123123",
    layanan: "Rawat Jalan",
    harga: '10000',
    insurance_account_name: "BPJS",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    no_antrian: '00-00-00',
    status: "Lunas"
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_jadwal: "08.00 - 11.00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    layanan: "IGD",
    harga: '10000',
    no_antrian: '00-00-00',
    status: "Lunas"
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_jadwal: " - ",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    layanan: "IGD",
    harga: '10000',
    no_antrian: "00-00-00",
    status: "Lunas"
  },
]);

const itemRetur = ref([
  {
    jenisStok: "Umum",
    terpakai: "REG1203012312",
    expDate: "10-01-2025",
    harga: '10000',
    total: '20000',
  },
]);

const emits = defineEmits(['update:rows', 'update:current-page']);
const handleRowsUpdate = (rows: number) => {
};
const handlePageUpdate = (page: number) => {
};

const dataBreadCrumb = ref<MenuItem[]>([]);
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
                    label: 'Retur Obat & Material',
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
            
            <!-- Filter Obat -->
            <div class="grid grid-cols-2 mt-[15px]">
              <CustomButton
                @click="onSelectPayType('Obat')"
                label="OBAT"
                :outlined="selectedPayType != 'Obat'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedPayType != 'Obat' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedPayType != 'Obat' ? 'bg-transparent' : 'bg-adameds-300'
                "
                class="font-semibold"
              />
              <CustomButton
                @click="onSelectPayType('Material')"
                label="MATERIAL"
                :outlined="selectedPayType != 'Material'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedPayType != 'Material' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedPayType != 'Material' ? 'bg-transparent' : 'bg-adameds-300'
                "
                class="ml-[20px] font-semibold "
              />
            </div>

            <!-- Filter Farmasi -->
            <div class="flex mb-[10px] mt-5">
              <div class="w-[15%] font-semibold text-SM text-grey-300 ">Filter Farmasi</div>
                <div class="flex">
                  <span class="font-semibold text-grey-300">|</span>
                  <CustomChip
                    v-for="(Pelayanan, index) in filterFarmasi" :key="Pelayanan + index"
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
            
            <!-- Filter Pembayaran -->
            <div class="flex my-[10px] mt-5 font-semibold text-SM text-grey-300">
                <div class="w-[15%]">Filter Pembayaran</div>
                  <div class="flex">
                    |
                    <CustomChip
                      label="TUNAI"
                      borderColor="border-adameds-300"
                      bgColor="bg-adameds-50"
                      iconColor="text-adameds-300"
                      textColor="text-adameds-300"
                      customClass="h-5"
                      class="ml-[10px]"
                      :isSelected="selectedPaymentMethod.includes('TUNAI')"
                      @selected="onPaymentMethodSelect"
                      selectedColor="bg-adameds-300 border-adameds-300"
                    />
                    <CustomChip
                      label="ASURANSI"
                      borderColor="border-warning-300"
                      bgColor="bg-warning-50"
                      iconColor="text-warning-300"
                      textColor="text-warning-300"
                      customClass="h-5"
                      class="ml-[10px]"
                      :isSelected="selectedPaymentMethod.includes('ASURANSI')"
                      @selected="onPaymentMethodSelect"
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
      
      <!-- Datatable -->
      <template #content>
        <DataTable
          v-if="itemsPasien.length"
          :value="itemsPasien"
          tableStyle="min-width: 50rem"
          class="mt-2"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          @rowClick="returDialog = true"
        >
          <!-- Resep -->
          <Column field="resep" header="Resep" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="">
                <div v-if="slotProps.data.no_antrian"
                  class="text-SM">
                  {{ slotProps.data.no_antrian }}
                </div>
                <div class="text-SM">{{ slotProps.data.noRegis }}</div>
                <div class="text-SM">{{ slotProps.data.noInvoice }}</div>
              </div>
            </template>
          </Column>

          <!-- Pasien -->
          <Column field="pasien" header="Pasien" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <p class="font-semibold">{{ slotProps.data.name }}</p>
              </div>
              <div class="flex flex-wrap">
                <CustomChip
                  :label="slotProps.data.no_antrian"
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
          <Column field="keperawatan" header="Keperawatan" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.doctor }}</div>
              <div class="flex flex-wrap">
                <CustomChip
                  :label="slotProps.data.layanan"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                  customClass="h-6"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.insurance_account_name"
                  :bgColor="
                    slotProps.data.insurance_account_name == 'TUNAI'
                      ? 'bg-adameds-50'
                      : 'bg-warning-50'
                  "
                  :textColor="
                    slotProps.data.insurance_account_name == 'TUNAI'
                      ? 'text-adameds-300'
                      : 'text-warning-300'
                  "
                  :borderColor="
                    slotProps.data.insurance_account_name == 'TUNAI'
                      ? 'border-adameds-300'
                      : 'border-warning-300'
                  "
                  customClass="h-6 pr-[6px] ml-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.no_SEP"
                  :showCheckedIcon="false"
                  :label="`SEP.${slotProps.data.no_SEP}`"
                  bgColor="bg-warning-50"
                  textColor="text-warning-300"
                  borderColor="border-warning-300"
                  customClass="h-6 pr-[6px] ml-[5px]"
                />
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
    
    <CustomDialog v-model:visible="returDialog" width="1000px">
      <template #header>Retur Obat - {{  }}</template>
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
        </div>

        <div class="mt-2">
          <card class="bg-adameds-50">
            <template #content>
              <div class="flex">
                <p class="text-base font-bold">
                  Paracetamol
                </p>
                <PhArrowRight
                  :size="20"
                  class="my-auto ml-2 text-success-300"
                  weight="bold"
                />
                <p class="ml-2 text-base font-bold">
                  5 Tablet (Yang bisa diretur)
                </p>
              </div>
            </template>
          </card>
        </div>

        <!-- Table Kamar -->
        <div class="pt-5 mt-[-20px]">
          <DataTable
            v-if="itemRetur.length"
            :value="itemRetur"
            class="overflow-hidden rounded-[10px]"
            scrollable
            scrollHeight="flex"
            :pt="{ headerRow: 'text-SM' }"
          >
            <!-- Tanggal -->
            <Column field="jenisStok" header="Jenis Stok">
              <template #body="slotProps">
                <div>
                  <p class="text-SM">
                    {{ slotProps.data.jenisStok }}
                  </p>
                </div>
              </template>
            </Column>
            <!-- Terpakai -->
            <Column field="terpakai" header="Terpakai">
              <template #body="slotProps">
                <div>
                  <p class="text-sm">{{ slotProps.data.terpakai }}</p>
                </div>
              </template>
            </Column>
            <!-- EXP Date -->
            <Column field="expDate" header="Exp. Date">
              <template #body="slotProps">
                <div class="text-sm">{{ slotProps.data.expDate }}</div>
              </template>
            </Column>
            <!-- Kelas Ruangan -->
            <Column field="terimaRetur" header="Terima Retur">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.kelasRuangan }}</div>
              </template>
            </Column>
            <!-- Waktu -->
            <Column field="harga" header="Harga">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.harga }}</div>
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
          <div>
            <p class="mt-[20px] font-bold">Alasan Retur</p>
          </div>
          <div class="mt-[5px]">
            <CustomTextfield
                :showLabel="false"
                placeholder="Alasan Retur"
              />
          </div>
        </div>
        <hr class="mt-5 border-[1px] border-grey-200">
        <div class="flex justify-end">
          <div class="mt-3">
            <p class="text-xs font-bold text-right underline underline-offset-2">Diretur Oleh</p>
            <p>Nama Petugas</p>
          </div>
          <div class="mt-3">
            <div class="bg-mediumGrey-300 w-[1px] h-[33px] ml-[20px] mt-1"></div>
          </div>
          <div class="mt-3">
            <CustomButton
              label="Batal"
              outlined
              borderColor="border-grey-300"
              textColor="text-grey-300"
              class="ml-[20px]"
            />            
            <CustomButton
              label="Retur"
              class="ml-[10px]"
            />
          </div>
        </div>
      </div>
      </template>
    </CustomDialog>
  </div>
</template>
