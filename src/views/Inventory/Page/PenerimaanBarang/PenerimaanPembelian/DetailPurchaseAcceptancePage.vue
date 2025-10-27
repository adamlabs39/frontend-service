<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import Card from "primevue/card";
import { onMounted, ref, watchEffect, computed } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { usePurchaseAcceptanceStore } from "@/stores/inventory/purchaseAcceptance";
import { utilsStore } from "@/stores/utils";
import * as yup from "yup";
import { formatPrice, epochToDate, dateToEpoch } from "@/utils/Helpers";

const props = defineProps({
    selectedDataUuid: { type: String, required: true },
    selectedData: {
        type: Object,
        default: () => ({}),
    },
});
const emit = defineEmits(["kembali", "diterima"]);

//state management
const PurchaseAcceptanceStore = usePurchaseAcceptanceStore();
const UseUtilsStore = utilsStore();
const DetailPayload = ref<any>({});
const today = new Date();

// Validasi schema dengan Yup
const schema = toTypedSchema(
    yup.object({
        tanggalPenerimaan: yup.date().required("Tgl. Penerimaan harus diisi"),
        noFaktur: yup.string().required("No. Faktur harus diisi"),
        tanggalFaktur: yup.date().required("Tgl. Faktur harus diisi"),
        noSuratJalan: yup.string().required("No. Surat Jalan harus diisi"),
        catatan: yup.string().nullable(),
        namaSupplierPengirim: yup.string().nullable(),
        items: yup.array().of(
            yup.object({
                qtyTerima: yup.number().min(0).required("Jumlah terima harus diisi"),
                expDate: yup.date().nullable().required("Exp. Date harus diisi"),
            })
        ),
    })
);

// Vee-validate form setup
const { handleSubmit, defineField, setValues, errors } = useForm({
    validationSchema: schema,
});

// Form fields
const [tanggalPenerimaan] = defineField("tanggalPenerimaan");
const [noFaktur] = defineField("noFaktur");
const [tanggalFaktur] = defineField("tanggalFaktur");
const [noSuratJalan] = defineField("noSuratJalan");
const [catatan] = defineField("catatan");
const [namaSupplierPengirim] = defineField("namaSupplierPengirim");
const { fields: itemFields } = useFieldArray<any>("items");

// State untuk kalkulasi
const diskon = ref(0);
const materai = ref(0);
const ppn = ref(0);
const grandTotal = ref(0);
const selectedItems = ref([]);



// Fetch detail data dari API
const fetchDetail = async () => {
    UseUtilsStore.setLoading(true);
    try {
        const response = await PurchaseAcceptanceStore.getApiDetail(props.selectedDataUuid);
        DetailPayload.value = response?.payload || {};
        // Mengisi form dengan data dari fetch
        setValues({
            tanggalPenerimaan: new Date(),
            noFaktur: DetailPayload.value.noFaktur || '',
            tanggalFaktur: DetailPayload.value.tanggalFaktur ? new Date(DetailPayload.value.tanggalFaktur * 1000) : undefined,
            noSuratJalan: DetailPayload.value.noSuratJalan || '',
            catatan: DetailPayload.value.catatanPenerimaan || '',
            items: (DetailPayload.value.items || []).map((item: any) => ({
                ...item,
                qtyTerima: item.qtyOrder,
                expDate: null,
            })),
        });
        // Mengisi state kalkulasi
        diskon.value = DetailPayload.value.diskon || 0;
        materai.value = DetailPayload.value.materai || 0;
        ppn.value = DetailPayload.value.ppnPercent || 0; // Asumsi ada ppnPercent
    } finally {
        UseUtilsStore.setLoading(false);
    }
};

// Kalkukasi ppn
const ppnAmount = computed(() => {
    const subTotal = (itemFields.value || []).reduce((total, item) => {
        const qty = item.value.qtyTerima || 0;
        const harga = item.value.hargaSatuan || 0;
        return total + (qty * harga);
    }, 0);
    const totalSetelahDiskon = subTotal - diskon.value;
    const nilaiPpn = totalSetelahDiskon * (11 / 100);
    return Math.max(0, nilaiPpn);
});

// kalkulasi grandtotal
watchEffect(() => {
    const subTotal = (itemFields.value || []).reduce((total, item) => {
        const qty = item.value.qtyTerima || 0;
        const harga = item.value.hargaSatuan || 0;
        return total + (qty * harga);
    }, 0);

    const totalSetelahDiskon = subTotal - diskon.value;
    // Gunakan ppnAmount hanya jika switch PPN aktif (bernilai 11)
    const ppnYangDitambahkan = ppn.value === 11 ? ppnAmount.value : 0;
    const finalTotal = totalSetelahDiskon + materai.value + ppnYangDitambahkan;

    grandTotal.value = Math.max(0, finalTotal);
});

const handleTerima = handleSubmit(async (values) => {
    // Validasi: Pastikan setidaknya satu item dipilih
    if (!selectedItems.value || selectedItems.value.length === 0) {
        alert("Harap pilih setidaknya satu item untuk diterima.");
        return; // Hentikan eksekusi jika tidak ada item yang dipilih
    }


    UseUtilsStore.setLoading(true);
    try {
        const payload = {
            tanggalTerima: dateToEpoch(values.tanggalPenerimaan as Date), // Diubah dari tanggal_penerimaan
            noFaktur: values.noFaktur,
            tanggalFaktur: dateToEpoch(values.tanggalFaktur as Date),
            noSuratJalan: values.noSuratJalan,
            catatanPenerimaan: values.catatan,
            // catatan_penerimaan: values.catatan, 
            items: selectedItems.value.map((item: any) => ({
                uuid: item.value.uuid,
                qtyTerima: item.value.qtyTerima,
                expDate: dateToEpoch(item.value.expDate as Date) * 1000,
            })),
        };
        console.log("Payload untuk API Terima Pembelian:", payload);

        await PurchaseAcceptanceStore.putApi(props.selectedDataUuid, payload);
        emit("diterima");
    } catch (error) {
        console.error("Gagal menyimpan data penerimaan:", error);
    } finally {
        UseUtilsStore.setLoading(false);
    }
});

// Menangani nama penerima 
const petugasPenerima = computed(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
        try {
            const userObject = JSON.parse(userString);
            return userObject.name || 'Nama Petugas';
        } catch (e) {
            console.error("Gagal parse data user dari localStorage:", e);
            return 'Nama Petugas';
        }
    }
    return 'Nama Petugas';
});

// Handle reset button
const handleReset = () => {
    fetchDetail(); 
};

onMounted(fetchDetail);

</script>

<template>
    <div class="flex flex-col h-full overflow-hidden">
        <Card pt:body:class="h-full pt-0" class="h-full overflow-hidden overflow-y-auto">
            <template #header>
                <CustomAccordion :openWithHeader="false" noBorder initialState="0">
                    <template #header>
                        <div class="flex items-center justify-between w-full align-middle">
                            <div class="flex items-center">
                                <CustomButton icon="PhArrowClockwise" class="mr-5" @click="fetchDetail" />
                                <CustomBreadCrumb :home="{ label: 'Penerimaan Barang' }"
                                    :model="[{ label: 'Penerimaan Pembelian' }]" />
                                <PhCaretRight :size="25" weight="bold" class="mx-2 text-adameds-300" />
                                <CustomChip :label="DetailPayload?.noPembelian" bgColor="bg-adameds-300"
                                    :showCheckedIcon="false" textColor="text-white" />
                                <CustomChip label="BELUM DITERIMA" bgColor="bg-grey-300" textColor="text-white"
                                    :showCheckedIcon="false" class="ml-2" />
                            </div>
                            <div class="flex">
                                <CustomButton @click="emit('kembali')" icon="PhCaretLeft" label="Kembali"
                                    class="mr-[10px]" outlined borderColor="border-adameds-300"
                                    textColor="text-adameds-300" />
                            </div>
                        </div>
                    </template>
                    <template #content>
                        <div class="p-4 space-y-4">
                            <div class="flex gap-5 text-sm">
                                <div class="flex flex-col flex-1 gap-4">
                                    <div>
                                        <p class="font-bold underline">No. Pembelian</p>
                                        <p>{{ DetailPayload.noPembelian || '-' }}</p>
                                    </div>
                                    <div>
                                        <p class="font-bold underline">Supplier</p>
                                        <p>{{ DetailPayload.supplier || '-' }}</p>
                                    </div>
                                </div>
                                <div class="flex flex-col flex-1 gap-4">
                                    <div>
                                        <p class="font-bold underline">Tgl. Pembelian</p>
                                        <p>{{ DetailPayload.tanggalPembelian ?
                                            epochToDate(DetailPayload.tanggalPembelian, "date") : '-' }}</p>
                                    </div>
                                    <div>
                                        <p class="font-bold underline">Petugas Pembelian</p>
                                        <p>{{ DetailPayload.petugasPembuatPo || '-' }}</p>
                                    </div>
                                </div>
                                <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
                                <div class="flex flex-col flex-1 gap-4">
                                    <div>
                                        <p class="font-bold underline">Tgl. Verifikasi Pembelian</p>
                                        <p>{{ DetailPayload.tanggalVerifikasi ?
                                            epochToDate(DetailPayload.tanggalVerifikasi, "date") : '01-01-2025' }}</p>
                                    </div>
                                    <div>
                                        <p class="font-bold underline">Petugas Verifikasi Pembelian</p>
                                        <p>{{ DetailPayload.petugasVerifikasi || 'Nama Petugas' }}</p>
                                    </div>
                                </div>
                                <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
                                <div class="grid grid-cols-2 flex-1 gap-4">
                                    <div>
                                        <p class="font-bold underline">Kategori</p>
                                        <p class="capitalize">{{ DetailPayload.kategoriItem || '-' }}</p>
                                    </div>
                                    <div>
                                        <p class="font-bold underline">Jenis Stok</p>
                                        <p>{{ DetailPayload.jenisStok || '-' }}</p>
                                    </div>
                                    <div>
                                        <p class="font-bold underline">Jenis Item</p>
                                        <p class="capitalize">{{ DetailPayload.jenisItem || '-' }}</p>
                                    </div>
                                    <div>
                                        <p class="font-bold underline">Cara Bayar</p>
                                        <p class="capitalize">{{ DetailPayload.paymentMethod || '-' }}</p>
                                    </div>
                                </div>
                            </div>
                            <hr class="border-grey-200" />
                            <div class="flex gap-5">
                                <CustomDatePicker label="Tgl. Penerimaan" v-model="tanggalPenerimaan"
                                    :invalid="!!errors.tanggalPenerimaan" :invalid-message="errors.tanggalPenerimaan"
                                    :maxDate="today" />
                                <CustomTextfield label="No. Faktur" v-model="noFaktur" :invalid="!!errors.noFaktur"
                                    :invalid-message="errors.noFaktur" />
                                <CustomDatePicker label="Tgl. Faktur" v-model="tanggalFaktur"
                                    :invalid="!!errors.tanggalFaktur" :invalid-message="errors.tanggalFaktur"
                                    :maxDate="today" />
                                <CustomTextfield label="No. Surat Jalan" v-model="noSuratJalan"
                                    :invalid="!!errors.noSuratJalan" :invalid-message="errors.noSuratJalan" />
                                <CustomTextfield label="Catatan" class="grow" v-model="catatan" />
                            </div>
                        </div>
                    </template>
                    <template #collapseIcon>
                        <CustomButton icon="PhCaretUp" backgroundColor="bg-adameds-75" textColor="text-adameds-300" />
                    </template>
                    <template #expandIcon>
                        <CustomButton icon="PhCaretDown" backgroundColor="bg-adameds-75" textColor="text-adameds-300" />
                    </template>
                </CustomAccordion>
            </template>

            <template #content>
                <hr class="border-grey-200 mb-4" />
                <DataTable :value="itemFields" v-model:selection="selectedItems" dataKey="key" class="text-xs"
                    scrollable scrollHeight="flex">
                    <Column header="No." headerClass="bg-adameds-50 font-semibold" bodyClass="pt-4">
                        <template #body="slotProps">{{ slotProps.index + 1 }}</template>
                    </Column>

                    <Column header="Nama Item" headerClass="bg-adameds-50 font-semibold" 
                        bodyClass="pt-4">
                        <template #body="slotProps">
                            <div>
                                <div>{{ slotProps.data.value.nama }}</div>
                                <CustomChip :showCheckedIcon="false" :label="DetailPayload.supplier"
                                    bgColor="bg-adameds-300" textColor="text-white" customClass="h-5" />
                            </div>
                        </template>
                    </Column>

                    <Column header="Order" headerClass="bg-adameds-50 font-semibold text-center"
                        bodyClass="text-center pt-4">
                        <template #body="slotProps">{{ slotProps.data.value.qtyOrder }}</template>
                    </Column>

                    <Column header="Terima" headerClass="bg-adameds-50 font-semibold text-end" class="w-[160px]">
                        <template #body="slotProps">
                            <CustomInputNumber :show-label="false" v-model="slotProps.data.value.qtyTerima"
                                :show-buttons="true" />
                        </template>
                    </Column>

                    <Column header="Satuan/Isi" headerClass="bg-adameds-50 font-semibold text-center"
                        bodyClass=" pt-4">
                        <template #body="slotProps">{{ slotProps.data.value.satuanBeli }}</template>
                    </Column>

                    <Column header="Exp. Date" headerClass="bg-adameds-50 font-semibold text-center" class="w-[180px]">
                        <template #body="slotProps">
                            <CustomDatePicker label="" v-model="slotProps.data.value.expDate"
                                :invalid="!!errors[`items[${slotProps.index}].expDate`]"
                                :invalid-message="errors[`items[${slotProps.index}].expDate`]" />
                        </template>
                    </Column>

                    <Column header="Harga Satuan" headerClass="bg-adameds-50 font-semibold text-center"
                        bodyClass=" pt-4">
                        <template #body="slotProps">{{ formatPrice(slotProps.data.value.hargaSatuan) }}</template>
                    </Column>

                    <Column header="Total" headerClass="bg-adameds-50 font-semibold text-center" bodyClass=" pt-4">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.value.qtyTerima * slotProps.data.value.hargaSatuan) }}
                        </template>
                    </Column>

                    <Column header="Action" selectionMode="multiple" headerClass="bg-adameds-50"></Column>
                </DataTable>
            </template>

            <template #footer>
                <div class="p-4">
                    <hr class="mb-4 border-grey-200" />
                    <div class="flex justify-between">
                        <div class="flex gap-6">
                            <CustomInputNumber v-model="diskon" label="Diskon" mode="currency" currency="IDR"
                                locale="id-ID" />
                            <CustomInputNumber v-model="materai" label="Materai" mode="currency" currency="IDR"
                                locale="id-ID" />

                            <div>
                                <label class="block font-semibold mb-[11px] text-normal">PPN 11%</label>
                                <div class="flex items-center">
                                    <CustomSwitch v-model="ppn" :show-label="false" :binary="true" :trueValue="11"
                                        :falseValue="0" sideLabel="" sideLabelTrue="" />
                                    <p class="ml-3 text-sm text-gray-500">{{ formatPrice(ppnAmount) }}</p>
                                </div>
                            </div>

                        </div>
                        <div class="flex items-center gap-5">
                            <hr class="h-3/4 border-x-[1px] border-adameds-300" />
                            <div>
                                <div class="font-semibold underline">Grand Total</div>
                                <div class="font-bold text-lg">{{ formatPrice(grandTotal) }}</div>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-4 border-grey-200" />
                    <div class="flex items-center justify-between pt-5">
                        <div class="flex items-center gap-6">
                            <div>
                                <p class="font-semibold underline">Total Item</p>
                                <p>{{ DetailPayload.totalItem || 0 }}</p>
                            </div>
                            <div>
                                <p class="font-semibold underline">Petugas Pengirim</p>
                                <p>{{ DetailPayload.petugasPengirim || 'Nama Petugas' }}</p>
                            </div>
                            <CustomTextfield label="Nama Supplier Pengirim" class="w-[300px]"
                                placeholder="Catatan Pengiriman" v-model="namaSupplierPengirim" />
                        </div>
                        <div class="flex items-center gap-3">
                            <div>
                                <p class="font-semibold text-end underline">Penerimaan Dilakukan Oleh</p>
                                <p class="font-normal">{{ petugasPenerima }}- {{ epochToDate(Date.now() / 1000,
                                    'dateTime') }}
                                </p>
                            </div>
                            <CustomButton label="Reset" @click="handleReset" outlined borderColor="border-grey-300"
                                textColor="text-grey-400" />
                            <CustomButton label="Terima Pembelian" class="bg-adameds-300" @click="handleTerima" />
                        </div>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>
