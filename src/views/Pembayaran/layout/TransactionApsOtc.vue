<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { computed, ref, type PropType } from "vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

const props = defineProps({
    pageType: {
        type: String,
        required: true,
    },
    dataBreadCrumb: {
        type: Array as PropType<MenuItem[]>,
        default: () => [],
    },
});

const listTagihanRIDialog = ref(false);

const emit = defineEmits(["back", "goToDetail", "goToEdit"]);

const itemsPasien = ref([
    {
        layanan: "farmasi-OTC",
        doctor: "dr. Spesialis Sp. A",
        tanggal_jadwal: "10-10-2010",
        insurance_account_name: "TUNAI",
        no_time: "10:00",
        status: "Lunas",
        jumlah: '1',
        tarif: '10000',
        diskon: '1500',
        total: '8500',
        tindakan: 'Spesialis Poli Pagi',
        penunjangLab: 'Kimia Klinik',
        penunjangFisio: 'Fisio 1',
        obat: 'Paramex',
        golonganObat: 'Obat Keras',
        jasa: '1000',
        item: 'Kasa',
        kamar: 'Mawar',
        jenisRuangan: 'Rawatan Umum',
        kelasRuangan: 'Kelas I',
        waktu: '2 hari'
    },
    {
        layanan: "farmasi-OTC",
        doctor: "dr. Spesialis Sp. A",
        tanggal_jadwal: "10-10-2010",
        insurance_account_name: "TUNAI",
        no_time: "10:00",
        status: "Lunas",
        jumlah: '1',
        tarif: '10000',
        diskon: '1500',
        total: '8500',
        tindakan: 'Spesialis Poli Pagi',
        penunjangLab: 'Kimia Klinik',
        penunjangFisio: 'Fisio 1',
        obat: 'Paramex',
        golonganObat: 'Obat Keras',
        jasa: '1000',
        item: 'Kasa',
        kamar: 'Mawar',
        jenisRuangan: 'Rawatan Umum',
        kelasRuangan: 'Kelas I',
        waktu: '2 hari'
    },
]);


</script>

<template>
    <div class="flex flex-col h-full overflow-hidden">
        <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-hidden"
            class="h-full overflow-hidden">
            <template #header>
                <div class="flex justify-between p-4">
                    <CustomBreadCrumb :home="{
                        label: 'Transaksi',
                        home: true,
                    }" :model="dataBreadCrumb" class="ml-1" />
                    <div class="flex">
                        <CustomButton @click="emit('back')" icon="PhCaretLeft" label="Kembali" class="mr-[10px]"
                            outlined borderColor="border-adameds-300" textColor="text-adameds-300" />
                    </div>
                </div>
            </template>
            <template #content>
                <div class="grid grid-flow-col grid-rows-2 gap-2">
                    <div class="h-[21%] border-2 border-adameds-300 rounded-lg flex flex-row">
                        <div class="basis-1/2">
                            <p class="font-bold text-MD mt-[15px] ml-[15px]">Nama lengkap pasien</p>
                            <p class="ml-[15px] text-sm">REG1231235</p>
                            <CustomButton class="h-5 text-xs ml-[15px]">00-00-00</CustomButton>
                            <CustomChip :showCheckedIcon="false" label="Laki-laki" bgColor="bg-male-75"
                                textColor="text-male-300" customClass="h-5 pr-[6px] border-none ml-[10px]" />
                            <!-- <CustomChip
                :showCheckedIcon="false"
                label="Perempuan"
                bgColor="bg-female-75"
                textColor="text-female-300"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              /> -->
                        </div>
                        <div class="bg-mediumGrey-300 w-[1px] h-[74px] mr-[20px] mt-[15px]"></div>
                        <div class="mt-[30px] mr-[40px]">
                            <p class="text-xs font-bold underline underline-offset-2">Umur</p>
                            <p class="">24Thn 2Bln 1Hari</p>
                        </div>
                    </div>

                    <!-- List Tagihan Pelayanan -->
                    <div class="mt-[-400px]">
                        <DataTable :value="itemsPasien" scrollable scrollHeight="390px"
                            class="overflow-hidden rounded-[10px]" :pt="{ headerRow: 'text-SM' }"
                            @rowClick="listTagihanRIDialog = true">
                            <Column field="no" headerClass="bg-adameds-300 text-white" bodyClass="text-SM"
                                style="width: 60px">
                                <template #header>
                                    <div class="w-full font-bold">List Tagihan Pelayanan</div>
                                </template>
                                <template #body="slotProps">
                                    <div class="flex">
                                        <p class="font-bold text-normal">{{ slotProps.data.layanan }}</p>
                                        <CustomChip class="ml-2" :showCheckedIcon="false" label="TUNAI"
                                            bgColor="bg-adameds-50" textColor="text-adameds-300"
                                            borderColor="border-adameds-300" />
                                    </div>
                                    <div class="flex">
                                        <p class="text-sm">Tanggal</p>
                                        <PhArrowRight :size="18" class="my-auto ml-2 text-success-300" weight="bold" />
                                        <p class="ml-2 text-sm">{{ slotProps.data.tanggal_jadwal }}</p>
                                        <p class="ml-2 text-sm">{{ slotProps.data.no_time }}</p>
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </div>

                    <!-- Kolom Pembayaran -->
                    <div class="p-5 ml-4 rounded-lg bg-adameds-50">
                        <!-- Total Pembayaran -->
                        <div class="flex justify-between">
                            <p class="text-base font-bold font-poppins">
                                Total Pembayaran
                            </p>
                            <div class="flex">
                                <CustomButton label="Cetak Invoice" class="mt-[-10px] mr-[10px]" />
                                <CustomButton label="Cetak Rincian Biaya" class="mt-[-10px]" />
                            </div>
                        </div>
                        <hr class="mt-2 mb-2 border border-slate-300" />
                        <!-- Biaya Administrasi -->
                        <div class="flex justify-between mt-6">
                            <div class="text-sm text-black font-poppins">
                                Biaya Administrasi
                            </div>
                            <div class="text-sm font-poppins">
                                Rp, 0
                            </div>
                        </div>
                        <!-- Biaya Tindakan -->
                        <div class="flex justify-between mt-4">
                            <div class="text-sm font-poppins">
                                Biaya Tindakan
                            </div>
                            <div class="text-sm font-poppins">
                                Rp, 0
                            </div>
                        </div>
                        <!-- Biaya Obat -->
                        <div class="flex justify-between mt-4">
                            <div class="text-sm font-poppins">
                                Biaya Obat
                            </div>
                            <div class="text-sm font-poppins">
                                Rp, 0
                            </div>
                        </div>
                        <!-- Biaya Kamar -->
                        <div class="flex justify-between mt-4">
                            <div class="text-sm font-poppins">
                                Biaya Kamar
                            </div>
                            <div class="text-sm font-poppins">
                                Rp, 0
                            </div>
                        </div>
                        <!-- PPN -->
                        <div class="flex justify-between mt-4">
                            <div class="text-sm font-poppins">
                                PPN
                            </div>
                            <div class="text-sm font-poppins">
                                Rp, 0
                            </div>
                        </div>
                        <hr class="mt-4 border-dashed border-[1px] border-slate-300" />
                        <!-- Diskon -->
                        <div class="flex justify-between mt-6">
                            <div class="text-sm font-poppins">
                                Diskon
                            </div>
                            <div class="text-sm font-poppins">
                                Rp, 0
                            </div>
                        </div>
                        <hr class="mt-6 mb-2 border-black border-1" />
                        <!-- Grand Total -->
                        <div class="flex justify-between mt-6">
                            <div class="text-sm font-bold font-poppins">
                                Grand Total
                            </div>
                            <div class="text-sm font-bold font-poppins">
                                Rp, 0
                            </div>
                        </div>
                        <div class="mt-[70px]">
                            <div class="flex">
                                <CustomButton label="Bayar" class="w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Card>

        <!-- List Tagihan Rawat Inap -->
        <CustomDialog v-model:visible="listTagihanRIDialog" width="1000px">
            <template #header>Detail Tagihan Pelayanan</template>
            <template #body>
                <div>
                    <div class="pt-5">
                        <div class="flex">
                            <p class="font-bold">Rawat Inap</p>
                            <CustomChip class="ml-2" :showCheckedIcon="false" label="TUNAI" bgColor="bg-adameds-50"
                                textColor="text-adameds-300" borderColor="border-adameds-300" />
                        </div>
                        <div class="flex">
                            <p class="text-sm">Tanggal</p>
                            <PhArrowRight :size="18" class="my-auto ml-2 text-success-300" weight="bold" />
                            <p class="ml-2 text-sm">10 Januari 2090</p>
                            <p class="ml-2 text-sm">10.10</p>
                        </div>
                    </div>


                    <!-- Table APSOTC -->
                    <div class="pt-5">
                        <DataTable v-if="itemsPasien.length" :value="itemsPasien" class="overflow-hidden rounded-[10px]"
                            scrollable scrollHeight="flex" :pt="{ headerRow: 'text-SM' }">
                            <!-- Tanggal -->
                            <Column field="tanggal" header="Tanggal" headerClass="bg-adameds-50">
                                <template #body="slotProps">
                                    <div>
                                        <p class="text-SM">
                                            {{ slotProps.data.tanggal_jadwal }}
                                        </p>
                                    </div>
                                </template>
                            </Column>

                            <!-- Item -->
                            <Column field="Item" header="Item" headerClass="bg-adameds-50">
                                <template #body="slotProps">
                                    <div class="flex flex-wrap">
                                        <p class="text-sm">{{ slotProps.data.item }}</p>
                                    </div>
                                </template>
                            </Column>

                            <!-- Jumlah -->
                            <Column field="jumlah" header="Jumlah" headerClass="bg-adameds-50">
                                <template #body="slotProps">
                                    <div class="text-SM ">{{ slotProps.data.jumlah }}</div>
                                </template>
                            </Column>

                            <!-- Tarif -->
                            <Column field="tarif" header="Tarif" headerClass="bg-adameds-50">
                                <template #body="slotProps">
                                    <div class="text-SM">{{ slotProps.data.tarif }}</div>
                                </template>
                            </Column>

                            <!--Diskon-->
                            <Column field="diskon" header="Diskon" headerClass="bg-adameds-50">
                                <template #body="slotProps">
                                    <div class="text-SM ">{{ slotProps.data.diskon }}</div>
                                </template>
                            </Column>

                            <!-- Total -->
                            <Column field="total" header="Total" headerClass="bg-adameds-50">
                                <template #body="slotProps">
                                    <div class="text-SM">{{ slotProps.data.total }}</div>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                    <div class="mt-4 ">
                        <card class="bg-adameds-50">
                            <template #content>
                                <div class="flex justify-between">
                                    <p class="text-base font-bold">
                                        Total Keseluruhan
                                    </p>
                                    <p class="text-base font-bold">
                                        RP. 8.500, 00
                                    </p>
                                </div>
                            </template>
                        </card>
                    </div>
                </div>
            </template>
        </CustomDialog>
    </div>
</template>
