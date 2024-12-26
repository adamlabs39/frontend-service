<script setup lang="ts">
import { ref } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const itemsPasien = ref([
  {
    tanggal: "10 Jan 2024",
    tindakan: "SIMRS Admission",
    jumlah: 1,
    tarif: 2500,
    diskon: 0,
    total: 2500,
  },
  {
    tanggal: "10 Jan 2024",
    tindakan: "Pemeriksaan Dokter Spesialis",
    jumlah: 1,
    tarif: 50000,
    diskon: 0,
    total: 50000,
  },
  {
    tanggal: "10 Jan 2024",
    tindakan: "Asuhan Keperawatan",
    jumlah: 1,
    tarif: 25000,
    diskon: 0,
    total: 25000,
  },
  {
    tanggal: "10 Jan 2024",
    tindakan: "Tindakan Mata",
    jumlah: 2,
    tarif: 100000,
    diskon: 0,
    total: 200000,
  },
  {
    tanggal: "10 Jan 2024",
    tindakan: "Tindakan Mata 2",
    jumlah: 2,
    tarif: 150000,
    diskon: 50000,
    total: 200000,
  },
]);

const itemsObat = ref([
  {
    tanggal: "10 Jan 2024",
    obat: "Amoxicillyn",
    golonganObat: "Obat Keras",
    jumlah: 20,
    tarif: 1000,
    jasa: 1000,
    diskon: 0,
    total: 21000,
  },
  {
    tanggal: "10 Jan 2024",
    obat: "Paracetamol",
    golonganObat: "Obat Keras",
    jumlah: 10,
    tarif: 500,
    jasa: 1000,
    diskon: 0,
    total: 6000,
  },
]);

// Data for Rawat inap

const itemsRuangan = ref([
  {
    tanggal: "10 Jan 2024",
    kamar: "Mawar I",
    jenisRuangan: "Rawatan Umum",
    kelasRuangan: "Kelas I",
    waktu: 48,
    tarif: 450000,
    diskon: 0,
    total: 900000,
  }
])

const itemsTindakan = ref([
  {
   tanggal: "10 Jan 2024",
    tindakan: "Pemeriksaan Dokter Spesialsi",
    jumlah: 1,
    tarif: 50000,
    diskon: 0,
    total: 50000, 
  },
  {
    tanggal: "10 Jan 2024",
    tindakan: "Asuhan Keperawatan",
    jumlah: 1,
    tarif: 25000,
    diskon: 0,
    total: 25000,
  }
])
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
            <UserDoctorIcon class="mt-2" />
            <p class="mt-2 text-sm text-grey-400">dr. Adameds bin Adameds</p>
          </div>
          <div class="flex">
            <p class="text-sm">Tanggal</p>
            <PhArrowRight
              :size="18"
              class="my-auto ml-2 text-success-300"
              weight="bold"
            />
            <p class="ml-2 text-sm">01-01-2024</p>
            <p class="ml-2 text-sm">09:00</p>
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
            <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Tanggal</div>
              </template>
              <template #body="slotProps">
                <div class="text-center">
                  <div class="text-SM">{{ slotProps.data.tanggal }}</div>
                </div>
              </template>
            </Column>
            <!-- Tindakan, Pemeriksaan, dan Administrasi -->
            <Column
              field="pasien"
              header="Tindakan, Pemeriksaan, dan Administrasi"
              headerClass="bg-adameds-50"
            >
              <template #body="slotProps">
                <div class="text-SM">
                  <span class="font-normal">{{ slotProps.data.tindakan }}</span>
                </div>
              </template>
            </Column>
            <!-- Jumlah -->
            <Column field="jumlah" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Jumlah</div>
              </template>
              <template #body="slotProps">
                <div class="text-center text-SM">
                  <span class="font-normal">{{ slotProps.data.jumlah }}</span>
                </div>
              </template>
            </Column>
            <!-- Tarif -->
            <Column field="tarif" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-end">Tarif</div>
              </template>
              <template #body="slotProps">
                <div class="text-SM text-end">
                  {{ slotProps.data.tarif }}
                </div>
              </template>
            </Column>
            <!-- Diskon -->
            <Column field="diskon" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-end">Diskon</div>
              </template>
              <template #body="slotProps">
                <div class="text-SM text-end">
                  {{ slotProps.data.diskon }}
                </div>
              </template>
            </Column>
            <!-- Total -->
            <Column field="total" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-end">Total</div>
              </template>
              <template #body="slotProps">
                <div class="text-SM text-end">
                  {{ slotProps.data.total }}
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="pt-5 mt-4">
          <DataTable
            v-if="itemsObat.length"
            :value="itemsObat"
            tableStyle="min-width: 50rem"
            scrollable
            scrollHeight="flex"
            :pt="{ headerRow: 'text-SM' }"
          >
            <!-- Tanggal -->
            <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Tanggal</div>
              </template>
              <template #body="slotProps">
                <div class="text-center">
                  <div class="text-SM">{{ slotProps.data.tanggal }}</div>
                </div>
              </template>
            </Column>
            <!-- Obat -->
            <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold">Obat</div>
              </template>
              <template #body="slotProps">
                <div class="text-SM">
                  <span class="font-normal">{{ slotProps.data.obat }}</span>
                </div>
              </template>
            </Column>
            <!-- Golongan Obat -->
            <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">
                  Golongan Obat
                </div>
              </template>
              <template #body="slotProps">
                <div class="text-center text-SM">
                  <span class="font-normal">{{
                    slotProps.data.golonganObat
                  }}</span>
                </div>
              </template>
            </Column>
            <!-- Jumlah -->
            <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Jumlah</div>
              </template>
              <template #body="slotProps">
                <div class="text-center text-SM">
                  <span class="font-normal">{{ slotProps.data.jumlah }}</span>
                </div>
              </template>
            </Column>
            <!-- Tarif -->
            <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Tarif</div>
              </template>
              <template #body="slotProps">
                <div class="text-center text-SM">
                  <span class="font-normal">{{ slotProps.data.tarif }}</span>
                </div>
              </template>
            </Column>
            <!-- Jasa -->
            <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Jasa</div>
              </template>
              <template #body="slotProps">
                <div class="text-center text-SM">
                  <span class="font-normal">{{ slotProps.data.jasa }}</span>
                </div>
              </template>
            </Column>
            <!-- Diskon -->
             <Column field="diskon" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-end">Diskon</div>
              </template>
              <template #body="slotProps">
                <div class="text-SM text-end">
                  {{ slotProps.data.diskon }}
                </div>
              </template>
            </Column>
            <!-- Total -->
             <Column field="total" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-end">Total</div>
              </template>
              <template #body="slotProps">
                <div class="text-SM text-end">
                  {{ slotProps.data.total }}
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="mt-4">
          <card class="bg-adameds-50">
            <template #content>
              <div class="flex justify-between">
                <p class="text-base font-bold">Total</p>
                <p class="text-base font-bold">RP. 527.000, 00</p>
              </div>
            </template>
          </card>
        </div>
      </div>
      <hr class="mt-10 mb-3 border-2 border-grey-200" />
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
            <UserDoctorIcon class="mt-2" />
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
            v-if="itemsRuangan.length"
            :value="itemsRuangan"
            tableStyle="min-width: 50rem"
            scrollable
            scrollHeight="flex"
            :pt="{ headerRow: 'text-SM' }"
          >
            <!-- Tanggal -->
           <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Tanggal</div>
              </template>
              <template #body="slotProps">
                <div class="text-center">
                  <div class="text-SM">{{ slotProps.data.tanggal }}</div>
                </div>
              </template>
            </Column>
            <!-- Kamar -->
           <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-start">Kamar</div>
              </template>
              <template #body="slotProps">
                <div class="text-start">
                  <div class="text-SM">{{ slotProps.data.kamar }}</div>
                </div>
              </template>
            </Column>
            <!-- Jenis Ruangan -->
            <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Jenis Ruangan</div>
              </template>
              <template #body="slotProps">
                <div class="text-center">
                  <div class="text-SM">{{ slotProps.data.jenisRuangan }}</div>
                </div>
              </template>
            </Column>
            <!-- Kelas Ruangan -->
            <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold">Kelas Ruangan</div>
              </template>
              <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.kelasRuangan }}</div>
              </template>
            </Column>
            <!-- Waktu -->
           <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold">Waktu</div>
              </template>
              <template #body="slotProps">
                  <div class="text-SM">{{ slotProps.data.waktu }} Jam</div>
              </template>
            </Column>
            <!-- Tarif -->
           <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-end">Tarif</div>
              </template>
              <template #body="slotProps">
                  <div class="text-SM text-end">{{ slotProps.data.tarif }}</div>
              </template>
            </Column>
            <!-- Diskon -->
           <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-end">Diskon</div>
              </template>
              <template #body="slotProps">
                  <div class="text-SM text-end">{{ slotProps.data.diskon }}</div>
              </template>
            </Column>
            <!-- Total -->
           <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-end">Total</div>
              </template>
              <template #body="slotProps">
                  <div class="text-SM text-end">{{ slotProps.data.total }}</div>
              </template>
            </Column>
          </DataTable>
        </div>
        <!-- Tabel ke 4 -->
        <div class="pt-5 mt-4">
          <DataTable
            v-if="itemsTindakan.length"
            :value="itemsTindakan"
            tableStyle="min-width: 50rem"
            scrollable
            scrollHeight="flex"
            :pt="{ headerRow: 'text-SM' }"
          >
            <!-- Tanggal -->
            <Column headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Tanggal</div>
              </template>
              <template #body="slotProps">
                <div class="text-center">
                  <div class="text-SM">{{ slotProps.data.tanggal }}</div>
                </div>
              </template>
            </Column>
            <!-- Tindakan, Pemeriksaan, dan Administrasi -->
            <Column
              field="pasien"
              header="Tindakan, Pemeriksaan, dan Administrasi"
              headerClass="bg-adameds-50"
            >
              <template #body="slotProps">
                <div class="text-SM">
                  <span class="font-normal">{{ slotProps.data.tindakan }}</span>
                </div>
              </template>
            </Column>
            <!-- Jumlah -->
            <Column field="jumlah" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-center">Jumlah</div>
              </template>
              <template #body="slotProps">
                <div class="text-center text-SM">
                  <span class="font-normal">{{ slotProps.data.jumlah }}</span>
                </div>
              </template>
            </Column>
            <!-- Tarif -->
            <Column field="tarif" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-end">Tarif</div>
              </template>
              <template #body="slotProps">
                <div class="text-SM text-end">
                  {{ slotProps.data.tarif }}
                </div>
              </template>
            </Column>
            <!-- Diskon -->
            <Column field="diskon" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-end">Diskon</div>
              </template>
              <template #body="slotProps">
                <div class="text-SM text-end">
                  {{ slotProps.data.diskon }}
                </div>
              </template>
            </Column>
            <!-- Total -->
            <Column field="total" headerClass="bg-adameds-50">
              <template #header>
                <div class="w-full font-semibold text-end">Total</div>
              </template>
              <template #body="slotProps">
                <div class="text-SM text-end">
                  {{ slotProps.data.total }}
                </div>
              </template>
            </Column>
          </DataTable>
        
        </div>
        <div class="mt-4">
          <card class="bg-adameds-50">
            <template #content>
              <div class="flex justify-between">
                <p class="text-base font-bold">Total</p>
                <p class="text-base font-bold">RP. 527.000, 00</p>
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
