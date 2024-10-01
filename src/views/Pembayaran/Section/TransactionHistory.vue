<script setup lang="ts">
import { ref } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

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
    gender: "L",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "00-00-00",
    new_patient: true,
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
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "00-00-00",
    new_patient: false,
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. Og",
    tanggal_jadwal: "08.00 - 11.00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: true,
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
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: false,
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
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: "00-00-00",
    new_patient: false,
  },
]);

</script>

<template>
  <CustomAccordion :openWithHeader="false">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <span class="leading-10 text-adameds-300 text-heading">
            Riwayat Transaksi
          </span>
        </div>
      </div>
    </template>
    <template #content>
      <!-- IGD -->
      <div>
        <div class="pt-5">
          <div class="flex">
            <p class="font-bold">IGD</p>
              <CustomChip
                class="ml-2"
                :showCheckedIcon="false"
                label="TUNAI"
                bgColor="bg-adameds-50"
                textColor="text-adameds-300"
                borderColor="border-adameds-300"
              />
              <!-- <CustomChip
                class="ml-2"
                :showCheckedIcon="false"
                label="ASURANSI"
                bgColor="bg-warning-50"
                textColor="text-warning-300"
                borderColor="border-warning-300"
              /> -->
          </div>
          <div class="flex">
            <UserDoctorIcon class="mt-2"/>
            <p class="mt-2 text-sm text-grey-400">dr. Osama bin Laden SP.KK</p>
          </div>
          <div class="flex">
            <p class="text-sm">Tanggal</p>
            <PhArrowRight
              :size="18"
              class="my-auto ml-2 text-success-300"
              weight="bold"
            />
            <p class="ml-2 text-sm">10 Januari 2090</p>
            <p class="ml-2 text-sm">10.10</p>
          </div>
        </div>
        <div class="pt-5">
          <DataTable
            v-if="itemsPasien.length"
            :value="itemsPasien"
            tableStyle="min-width: 50rem"
            scrollable
            scrollHeight="flex"
            :pt="{ headerRow: 'text-SM' }"
          >
            <!-- Tanggal -->
            <Column field="nomor" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Tanggal</div>
              </template>
              <template #body="slotProps">
                <div class="text-center">
                  <div v-if="slotProps.data.no_antrian"
                    class="text-SM">
                    {{ slotProps.data.no_antrian }}
                  </div>
                  <div class="text-SM">{{ slotProps.data.noRegis }}</div>
                  <div class="text-SM">{{ slotProps.data.noInvoice }}</div>
                </div>
              </template>
            </Column>
            <!-- Tindakan, Pemeriksaan, dan Administrasi -->
            <Column field="pasien" header="Tindakan, Pemeriksaan, dan Administrasi" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">
                  <span class="font-semibold">{{ slotProps.data.name }}</span>
                  <span class="text-grey-300">
                    ({{ slotProps.data.age_year }}Th
                    {{ slotProps.data.age_month }}Bln
                    {{ slotProps.data.age_day }}Hr)
                  </span>
                </div>
                <div class="text-XS">{{ slotProps.data.address }}</div>
                <div class="flex flex-wrap">
                  <PhUserCirclePlus
                    v-if="slotProps.data.new_patient"
                    :size="22"
                    class="text-adameds-300 mt-auto mr-[5px]"
                    weight="fill"
                  />
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="
                      slotProps.data.gender == 'P' ? 'Perempuan' : 'Laki-laki'
                    "
                    :bgColor="
                      slotProps.data.gender == 'P' ? 'bg-female-75' : 'bg-male-75'
                    "
                    :textColor="
                      slotProps.data.gender == 'P'
                        ? 'text-female-300'
                        : 'text-male-300'
                    "
                    customClass="h-5 pr-[6px] border-none mr-[5px]"
                  />
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.phone"
                    bgColor="bg-adameds-50"
                    textColor="text-adameds-300"
                    customClass="h-5 pr-[6px] border-none mr-[5px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Jumlah -->
            <Column field="jumlah" header="Jumlah" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Tarif -->
            <Column field="tarif" header="Tarif" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Diskon -->
            <Column field="diskon" header="Diskon" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Total -->
            <Column field="total" header="Total" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="pt-5 mt-4">
          <DataTable
            v-if="itemsPasien.length"
            :value="itemsPasien"
            tableStyle="min-width: 50rem"
            scrollable
            scrollHeight="flex"
            :pt="{ headerRow: 'text-SM' }"
          >
            <!-- Tanggal -->
            <Column field="nomor" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Tanggal</div>
              </template>
              <template #body="slotProps">
                <div class="text-center">
                  <div v-if="slotProps.data.no_antrian"
                    class="text-SM">
                    {{ slotProps.data.no_antrian }}
                  </div>
                  <div class="text-SM">{{ slotProps.data.noRegis }}</div>
                  <div class="text-SM">{{ slotProps.data.noInvoice }}</div>
                </div>
              </template>
            </Column>
            <!-- Obat -->
            <Column field="pasien" header="Obat" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">
                  <span class="font-semibold">{{ slotProps.data.name }}</span>
                  <span class="text-grey-300">
                    ({{ slotProps.data.age_year }}Th
                    {{ slotProps.data.age_month }}Bln
                    {{ slotProps.data.age_day }}Hr)
                  </span>
                </div>
                <div class="text-XS">{{ slotProps.data.address }}</div>
                <div class="flex flex-wrap">
                  <PhUserCirclePlus
                    v-if="slotProps.data.new_patient"
                    :size="22"
                    class="text-adameds-300 mt-auto mr-[5px]"
                    weight="fill"
                  />
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="
                      slotProps.data.gender == 'P' ? 'Perempuan' : 'Laki-laki'
                    "
                    :bgColor="
                      slotProps.data.gender == 'P' ? 'bg-female-75' : 'bg-male-75'
                    "
                    :textColor="
                      slotProps.data.gender == 'P'
                        ? 'text-female-300'
                        : 'text-male-300'
                    "
                    customClass="h-5 pr-[6px] border-none mr-[5px]"
                  />
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.phone"
                    bgColor="bg-adameds-50"
                    textColor="text-adameds-300"
                    customClass="h-5 pr-[6px] border-none mr-[5px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Golongan Obat -->
            <Column field="jumlah" header="Golongan Obat" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Jumlah -->
            <Column field="tarif" header="Jumlah" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Tarif -->
            <Column field="diskon" header="Tarif" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Jasa -->
            <Column field="total" header="Jasa" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Diskon -->
            <Column field="diskon" header="Diskon" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Total -->
            <Column field="total" header="Total" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="mt-4 ">
          <card class="bg-adameds-50">
            <template #content>
              <div class="flex justify-between">
                <p class="text-base font-bold">
                  Total
                </p>
                <p class="text-base font-bold">
                  RP. 57.000, 00
                </p>
              </div>
            </template>
          </card>
        </div>
      </div>
      <hr class="mt-10 mb-3 border-2 border-grey-200">
      <!-- Rawat Inap -->
      <div>
        <div class="pt-5">
          <div class="flex">
            <p class="font-bold">Rawat Inap</p>
              <CustomChip
                class="ml-2"
                :showCheckedIcon="false"
                label="TUNAI"
                bgColor="bg-adameds-50"
                textColor="text-adameds-300"
                borderColor="border-adameds-300"
              />
              <!-- <CustomChip
                class="ml-2"
                :showCheckedIcon="false"
                label="ASURANSI"
                bgColor="bg-warning-50"
                textColor="text-warning-300"
                borderColor="border-warning-300"
              /> -->
          </div>
          <div class="flex">
            <UserDoctorIcon class="mt-2"/>
            <p class="mt-2 text-sm text-grey-400">dr. Osama bin Laden SP.KK</p>
          </div>
          <div class="flex">
            <p class="text-sm">Tanggal</p>
            <PhArrowRight
              :size="18"
              class="my-auto ml-2 text-success-300"
              weight="bold"
            />
            <p class="ml-2 text-sm">10 Januari 2090</p>
            <p class="ml-2 text-sm">10.10</p>
          </div>
        </div>
        <div class="pt-5">
          <DataTable
            v-if="itemsPasien.length"
            :value="itemsPasien"
            tableStyle="min-width: 50rem"
            scrollable
            scrollHeight="flex"
            :pt="{ headerRow: 'text-SM' }"
          >
            <!-- Tanggal -->
            <Column field="nomor" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Tanggal</div>
              </template>
              <template #body="slotProps">
                <div class="text-center">
                  <div v-if="slotProps.data.no_antrian"
                    class="text-SM">
                    {{ slotProps.data.no_antrian }}
                  </div>
                  <div class="text-SM">{{ slotProps.data.noRegis }}</div>
                  <div class="text-SM">{{ slotProps.data.noInvoice }}</div>
                </div>
              </template>
            </Column>
            <!-- Tindakan, Pemeriksaan, dan Administrasi -->
            <Column field="pasien" header="Tindakan, Pemeriksaan, dan Administrasi" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">
                  <span class="font-semibold">{{ slotProps.data.name }}</span>
                  <span class="text-grey-300">
                    ({{ slotProps.data.age_year }}Th
                    {{ slotProps.data.age_month }}Bln
                    {{ slotProps.data.age_day }}Hr)
                  </span>
                </div>
                <div class="text-XS">{{ slotProps.data.address }}</div>
                <div class="flex flex-wrap">
                  <PhUserCirclePlus
                    v-if="slotProps.data.new_patient"
                    :size="22"
                    class="text-adameds-300 mt-auto mr-[5px]"
                    weight="fill"
                  />
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="
                      slotProps.data.gender == 'P' ? 'Perempuan' : 'Laki-laki'
                    "
                    :bgColor="
                      slotProps.data.gender == 'P' ? 'bg-female-75' : 'bg-male-75'
                    "
                    :textColor="
                      slotProps.data.gender == 'P'
                        ? 'text-female-300'
                        : 'text-male-300'
                    "
                    customClass="h-5 pr-[6px] border-none mr-[5px]"
                  />
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.phone"
                    bgColor="bg-adameds-50"
                    textColor="text-adameds-300"
                    customClass="h-5 pr-[6px] border-none mr-[5px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Jumlah -->
            <Column field="jumlah" header="Jumlah" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Tarif -->
            <Column field="tarif" header="Tarif" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Diskon -->
            <Column field="diskon" header="Diskon" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Total -->
            <Column field="total" header="Total" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="pt-5 mt-4">
          <DataTable
            v-if="itemsPasien.length"
            :value="itemsPasien"
            tableStyle="min-width: 50rem"
            scrollable
            scrollHeight="flex"
            :pt="{ headerRow: 'text-SM' }"
          >
            <!-- Tanggal -->
            <Column field="nomor" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Tanggal</div>
              </template>
              <template #body="slotProps">
                <div class="text-center">
                  <div v-if="slotProps.data.no_antrian"
                    class="text-SM">
                    {{ slotProps.data.no_antrian }}
                  </div>
                  <div class="text-SM">{{ slotProps.data.noRegis }}</div>
                  <div class="text-SM">{{ slotProps.data.noInvoice }}</div>
                </div>
              </template>
            </Column>
            <!-- Obat -->
            <Column field="pasien" header="Obat" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">
                  <span class="font-semibold">{{ slotProps.data.name }}</span>
                  <span class="text-grey-300">
                    ({{ slotProps.data.age_year }}Th
                    {{ slotProps.data.age_month }}Bln
                    {{ slotProps.data.age_day }}Hr)
                  </span>
                </div>
                <div class="text-XS">{{ slotProps.data.address }}</div>
                <div class="flex flex-wrap">
                  <PhUserCirclePlus
                    v-if="slotProps.data.new_patient"
                    :size="22"
                    class="text-adameds-300 mt-auto mr-[5px]"
                    weight="fill"
                  />
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="
                      slotProps.data.gender == 'P' ? 'Perempuan' : 'Laki-laki'
                    "
                    :bgColor="
                      slotProps.data.gender == 'P' ? 'bg-female-75' : 'bg-male-75'
                    "
                    :textColor="
                      slotProps.data.gender == 'P'
                        ? 'text-female-300'
                        : 'text-male-300'
                    "
                    customClass="h-5 pr-[6px] border-none mr-[5px]"
                  />
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.phone"
                    bgColor="bg-adameds-50"
                    textColor="text-adameds-300"
                    customClass="h-5 pr-[6px] border-none mr-[5px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Golongan Obat -->
            <Column field="jumlah" header="Golongan Obat" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Jumlah -->
            <Column field="tarif" header="Jumlah" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Tarif -->
            <Column field="diskon" header="Tarif" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Jasa -->
            <Column field="total" header="Jasa" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Diskon -->
            <Column field="diskon" header="Diskon" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
            <!-- Total -->
            <Column field="total" header="Total" headerClass="bg-adameds-50">
              <template #body="slotProps">
                <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
                <div class="flex flex-wrap">
                  <CustomChip
                    :showCheckedIcon="false"
                    :label="slotProps.data.polyclinic"
                    customClass="h-5 pr-[5px] mr-[5px]"
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
                    customClass="h-5 pr-[6px] mr-[5px]"
                  />
                  <CustomChip
                    v-if="slotProps.data.no_SEP"
                    :showCheckedIcon="false"
                    :label="`SEP.${slotProps.data.no_SEP}`"
                    bgColor="bg-warning-50"
                    textColor="text-warning-300"
                    borderColor="border-warning-300"
                    customClass="h-5 pr-[6px]"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="mt-4 ">
          <card class="bg-adameds-50">
            <template #content>
              <div class="flex justify-between">
                <p class="text-base font-bold">
                  Total
                </p>
                <p class="text-base font-bold">
                  RP. 57.000, 00
                </p>
              </div>
            </template>
          </card>
        </div>
      </div>
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
