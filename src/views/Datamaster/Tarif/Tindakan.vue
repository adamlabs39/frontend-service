<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import DetailTarifTindakan from "./DetailTarifTindakan.vue";

const products = ref();
const expandedRows = ref();

onMounted(() => {
  products.value = [
    {
      id: "1",
      nama_tarif: "Paket Pemeriksaan Poli Umum",
      pilihan_tarif: "Single",
      pelayanan: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      metode_pembayaran:["TUNAI","BPJS"],
      tarif_harga:"Rp. 150,000",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      nama_tarif: "Paket Pemeriksaan Poli Umum",
      pilihan_tarif: "Single",
      pelayanan: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      metode_pembayaran:["TUNAI","BPJS"],
      tarif_harga:"Rp. 150,000",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      nama_tarif: "Paket Pemeriksaan Poli Umum",
      pilihan_tarif: "Single",
      pelayanan: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      metode_pembayaran:["TUNAI","BPJS"],
      tarif_harga:"Rp. 150,000",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      nama_tarif: "Paket Pemeriksaan Poli Umum",
      pilihan_tarif: "Single",
      pelayanan: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      metode_pembayaran:["TUNAI","BPJS"],
      tarif_harga:"Rp. 150,000",
      status: "AKTIF",
      action: "edit",
    },
  ];
});
const detail = ref(false);


</script>

<template>
  <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
        :pt="{ headerRow: 'bg-blue-500 text-white' }"
        class="text-xs"
      >
        <Column header="No." headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="nama_tarif"
          header="Nama Tarif"
          headerClass="bg-adameds-50"
           class="w-2/12"
        ></Column>
        <Column
          field="pilihan_tarif"
          header="Pilihan Tarif"
          headerClass="bg-adameds-50"
          class="w-1/12"
        ></Column>
        <Column
          field="pelayanan"
          header="Pelayanan"
          headerClass="bg-adameds-50"
          class="4/12"

        >
          <template #body="slotProps">
            <div class="flex flex-wrap gap-2">
              <div v-for="items in slotProps.data.pelayanan" :key="items">
                <CustomChip
                  :label="items"
                  :showCheckedIcon="false"
                  border-color="border-none"
                  bg-color="bg-adameds-300"
                  customClass="text-xs font-semibold cursor-pointer h-6 bg-adameds-300 text-white"
                />
              </div>
            </div>
          </template>
        </Column>
        <Column
          field="metode_pembayaran"
          header="Metode Pembayaran"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="flex flex-wrap gap-2">
              <div v-for="items in slotProps.data.metode_pembayaran" :key="items">
                <CustomChip
                  :label="items"
                  :showCheckedIcon="false"
                  border-color="border-none"
                  bg-color="bg-adameds-300"
                  customClass="text-xs font-semibold cursor-pointer h-6 bg-adameds-300 text-white"
                />
              </div>
            </div>
          </template>
        </Column>
        <Column
          field="tarif_harga"
          header="Tarif Harga"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="status"
          headerClass="bg-adameds-50 text-center"
        >
        <template #header>
          <div class="text-center w-full font-semibold">
            Status
          </div>
        </template>
          <template #body="slotProps">
            <div class="flex justify-center items-center">
              <CustomChip
                :label="slotProps.data.status"
                :textColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'text-white'
                    : 'text-[#80868d]'
                "
                :bgColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'bg-adameds-300'
                    : 'bg-white'
                "
                :borderColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'border-none'
                    : 'border-[#80868d]'
                "
                :icon-color="
                  slotProps.data.status === 'AKTIF' ? 'white' : '#80868d'
                "
                customClass="text-xs font-semibold h-6 flex"
              />
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header="slotProps">
            <div
              class="flex items-center justify-center w-full font-semibold text-SM"
            >
              Action
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg">
                <img src="@/assets/icons/edit.svg" alt="" width="15px" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
              >
                <img src="@/assets/icons/delete.svg" alt="" width="15px" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
</template>
