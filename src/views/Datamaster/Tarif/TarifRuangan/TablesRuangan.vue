<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";


const props = defineProps({
  payload: {
    type: Array,
    default: () => ([]),
  },
});

const products = ref();
const expandedRows = ref();
const detail = ref(false);

onMounted(() => {
  products.value = [
    {
      id: "1",
      nama_ruangan: "Ruangan Mawar",
      kategori_ruangan: "Rawatan Umum",
      kelas: "Kelas III",
      pelayanan: "Rawat Jalan",
      metode_pembayaran: ["TUNAI", "BPJS"],
      status: "AKTIF",
      action: "edit",
      orders: [
        {
          id: "1",
          jenis_pembayaran_bed: "Tunai",
          harga_tarif: "Rp. 100,000",
        },
        {
          id: "2",
          jenis_pembayaran_bed: "Tunai",
          harga_tarif: "Rp. 100,000",
        },
        {
          id: "3",
          jenis_pembayaran_bed: "Tunai",
          harga_tarif: "Rp. 100,000",
        },
      ],
    },
    {
      id: "2",
      nama_ruangan: "Ruangan Mawar",
      kategori_ruangan: "Rawatan Umum",
      kelas: "Kelas III",
      pelayanan: "Rawat Jalan",
      metode_pembayaran: ["TUNAI", "BPJS"],
      status: "AKTIF",
      action: "edit",
      orders: [
        {
          id: "1",
          jenis_pembayaran_bed: "Tunai",
          harga_tarif: "Rp. 100,000",
        },
        {
          id: "2",
          jenis_pembayaran_bed: "Tunai",
          harga_tarif: "Rp. 100,000",
        },
        {
          id: "3",
          jenis_pembayaran_bed: "Tunai",
          harga_tarif: "Rp. 100,000",
        },
      ],
    },
    {
      id: "3",
      nama_ruangan: "Ruangan Mawar",
      kategori_ruangan: "Rawatan Umum",
      kelas: "Kelas III",
      pelayanan: "Rawat Jalan",
      metode_pembayaran: ["TUNAI", "BPJS"],
      status: "AKTIF",
      action: "edit",
      orders: [
        {
          id: "1",
          jenis_pembayaran_bed: "Tunai",
          harga_tarif: "Rp. 100,000",
        },
        {
          id: "2",
          jenis_pembayaran_bed: "Tunai",
          harga_tarif: "Rp. 100,000",
        },
        {
          id: "3",
          jenis_pembayaran_bed: "Tunai",
          harga_tarif: "Rp. 100,000",
        },
      ],
    },
  ];
});
</script>

<template>
  <DataTable v-model:expandedRows="expandedRows" :value="payload" tableStyle="min-width: 50rem" class="-m-4 text-xs"
    stripedRows dataKey="id" scrollable scrollHeight="flex">
    <Column expander style="width: 5rem" header-class="text-black bg-adameds-50" />
    <Column header="No." header-class="text-black bg-adameds-50">
      <template #body="slotProps">
        <div class="flex items-center justify-center">
          {{ slotProps.index + 1 }}
        </div>
      </template>
    </Column>
    <Column field="name" header="Nama Ruangan" header-class="text-black bg-adameds-50"></Column>
    <Column header="Kategori Ruangan" header-class="text-black bg-adameds-50">
      <template #body="slotProps">
        <div v-for="items in slotProps.data.ruangan" :key="items">
          {{ items.kategoriRuanganName }}
        </div>
      </template>
    </Column>
    <Column header="Kelas" header-class="text-black bg-adameds-50">
      <template #body="slotProps">
        <div v-for="items in slotProps.data.ruangan" :key="items">
          {{ items.kelasRuangan }}
        </div>
      </template>
    </Column>
    <Column header="pelayanan" header-class="text-black bg-adameds-50"> <template #body="slotProps">
        <div v-for="items in slotProps.data.pelayanan" :key="items">
          {{ items.unitPelayananName }}
        </div>
      </template></Column>
    <Column field="metode_pembayaran" header="Metode Pembayaran" header-class="text-black bg-adameds-50">
      <template #body="slotProps">
        <div class="flex flex-wrap gap-2">
          <div v-for="items in slotProps.data.penjamin" :key="items">
            <CustomChip :label="items.penjaminName" :showCheckedIcon="false" border-color="border-none"
              bg-color="bg-adameds-300"
              customClass="text-xs font-semibold cursor-auto h-5 bg-adameds-300 text-white pr-2 pl-3" />
          </div>
        </div>
      </template>
    </Column>
    <Column field="status" header-class="text-black bg-adameds-50">
      <template #header>
        <div class="w-full font-semibold text-center">Status</div>
      </template>
      <template #body="slotProps">
        <div class="flex items-center justify-center">
          <CustomChip :label="slotProps.data.status ? 'AKTIF' : 'NON-AKTIF'"
            :textColor="slotProps.data.status ? 'text-white' : 'text-[#80868d]'"
            :bgColor="slotProps.data.status ? 'bg-adameds-300' : 'bg-white'" :borderColor="slotProps.data.status ? 'border-none' : 'border-[#80868d]'
              " :icon-color="slotProps.data.status ? 'white' : '#80868d'" customClass="text-xs font-semibold h-5 flex" />
        </div>
      </template>
    </Column>
    <Column header-class="text-black bg-adameds-50">
      <template #header="slotProps">
        <div class="flex items-center justify-center w-full font-semibold text-SM">
          Action
        </div>
      </template>
      <template #body="slotProps">
        <div class="flex items-center gap-2.5 justify-center">
          <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg" class="h-6 w-[26px] p-0">
            <img src="@/assets/icons/edit.svg" alt="" />
          </CustomButton>
          <CustomButton label="" background-color="bg-danger-300 rounded-lg" @click="() => { }" class="h-6 w-[26px] p-0">
            <img src="@/assets/icons/delete.svg" alt="" />
          </CustomButton>
        </div>
      </template>
    </Column>
    <template #expansion="slotProps">
      <div class="p-3 -mx-3 -my-1.5 bg-adameds-50">
        <DataTable :value="slotProps.data.penjamin" class="overflow-hidden rounded-lg bg-adameds-50">
          <Column field="penjaminName" header="Jenis Pembayaran Bed" header-class="text-white bg-adameds-300">
          </Column>
          <Column field="harga" header="Harga Tarif" header-class="text-white bg-adameds-300"></Column>
        </DataTable>
      </div>
    </template>
  </DataTable>
</template>
