<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import DetailTarifTindakan from "./FormTarifTindakan.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";

const props = defineProps({
  payload: {
    type: Object,
    default: () => ({}),
  },
});
const products = ref();
const hapusDataDialog = ref(false);

onMounted(() => {
  products.value = [
    {
      id: "1",
      kode: "123",
      nama_tarif: "Paket Pemeriksaan Poli Umum",
      pilihan_tarif: "Single",
      pelayanan: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      metode_pembayaran: ["TUNAI", "BPJS"],
      tarif_harga: "Rp. 150,000",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      kode: "123",
      nama_tarif: "Paket Pemeriksaan Poli Umum",
      pilihan_tarif: "Single",
      pelayanan: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      metode_pembayaran: ["TUNAI", "BPJS"],
      tarif_harga: "Rp. 150,000",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      kode: "123",
      nama_tarif: "Paket Pemeriksaan Poli Umum",
      pilihan_tarif: "Single",
      pelayanan: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      metode_pembayaran: ["TUNAI", "BPJS"],
      tarif_harga: "Rp. 150,000",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      kode: "123",
      nama_tarif: "Paket Pemeriksaan Poli Umum",
      pilihan_tarif: "Single",
      pelayanan: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      metode_pembayaran: ["TUNAI", "BPJS"],
      tarif_harga: "Rp. 150,000",
      status: "AKTIF",
      action: "edit",
    },
  ];
});
const detail = ref(false);
</script>

<template>
  <!-- {{ payload }} -->
  <DataTable
    :value="payload"
    tableStyle="min-width: 50rem"
    stripedRows
    class="-m-4 text-xs"
    scrollable
    scrollHeight="flex"
  >
    <Column header="No." headerClass="bg-adameds-50">
      <template #body="slotProps">
        <div class="flex items-center justify-center">
          {{ slotProps.index + 1 }}
        </div>
      </template>
    </Column>
    <Column
      field="code"
      header="Kode Tarif"
      headerClass="bg-adameds-50"
    ></Column>
    <Column
      field="name"
      header="Nama Tarif"
      headerClass="bg-adameds-50"
    ></Column>
    <Column
      field="mode"
      header="Pilihan Tarif"
      headerClass="bg-adameds-50"
    ></Column>
    <Column field="pelayanan" header="Pelayanan" headerClass="bg-adameds-50">
      <template #body="slotProps">
        <div class="flex flex-wrap gap-2">
          <div v-for="items in slotProps.data.pelayanan" :key="items">
            <CustomChip
              :label="items.unitPelayananName"
              :showCheckedIcon="false"
              border-color="border-none"
              bg-color="bg-adameds-300"
              customClass="text-xs font-semibold cursor-auto h-5 bg-adameds-300 text-white pr-2 pl-3"
            />
          </div>
        </div>
      </template>
    </Column>
    <Column
      field="penjamin"
      header="Metode Pembayaran"
      headerClass="bg-adameds-50"
    >
      <template #body="slotProps">
        <div class="flex flex-wrap gap-2">
          <div v-for="items in slotProps.data.penjamin" :key="items">
            <CustomChip
              :label="items.penjaminName"
              :showCheckedIcon="false"
              border-color="border-none"
              bg-color="bg-adameds-300"
              customClass="text-xs font-semibold cursor-auto h-5 bg-adameds-300 text-white pr-2 pl-3"
            />
          </div>
        </div>
      </template>
    </Column>
    <Column
      header="Tarif Harga"
      headerClass="bg-adameds-50"
      class="w-[100px]"
    >
    <template #body="slotProps">
      <div>
        Rp. {{ slotProps.data.grandTotal }}
      </div>
    </template>
  </Column>
    <Column field="status" headerClass="bg-adameds-50 text-center">
      <template #header>
        <div class="w-full font-semibold text-center">Status</div>
      </template>
      <template #body="slotProps">
        <div class="flex items-center justify-center">
          <CustomChip
            :label="slotProps.data.status ? 'AKTIF' : 'NON-AKTIF'"
            :textColor="slotProps.data.status ? 'text-white' : 'text-[#80868d]'"
            :bgColor="slotProps.data.status ? 'bg-adameds-300' : 'bg-white'"
            :borderColor="
              slotProps.data.status ? 'border-none' : 'border-[#80868d]'
            "
            :icon-color="slotProps.data.status ? 'white' : '#80868d'"
            customClass="text-xs font-semibold h-5 flex"
          />
        </div>
      </template>
    </Column>
    <Column headerClass="bg-adameds-50">
      <template #header="slotProps">
        <div
          class="flex items-center justify-center w-full font-semibold text-SM"
        >
          Action
        </div>
      </template>
      <template #body="slotProps">
        <div class="flex items-center gap-2.5 justify-center">
          <CustomButton
            label=""
            background-color="bg-[#3D84E5] rounded-lg"
            class="h-6 w-[26px] p-0"
          >
            <img src="@/assets/icons/edit.svg" alt="" />
          </CustomButton>
          <CustomButton
            label=""
            background-color="bg-danger-300 rounded-lg"
            @click="hapusDataDialog = true"
            class="h-6 w-[26px] p-0"
          >
            <img src="@/assets/icons/delete.svg" alt="" />
          </CustomButton>
        </div>
      </template>
    </Column>
  </DataTable>
  <CustomDialog
    width="600px"
    v-model:visible="hapusDataDialog"
    headerBg="bg-danger-300"
  >
    <template #header>Hapus Tarif</template>
    <template #body>
      <div class="flex flex-col gap-5 mt-5">
        <CustomTextfield
          label="Alasan Hapus Tarif"
          placeholder="Alasan Hapus Tarif"
        />
        <div class="italic text-normal text-danger-300">
          *Setelah hapus, data akan <span class="font-bold">terupdate</span> dan
          akan <span class="font-bold">mempengaruhi seluruh pelayanan</span>
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
            @click="hapusDataDialog = false"
          >
          </CustomButton>

          <CustomButton label="Iya, Hapus" background-color="bg-danger-300">
          </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
