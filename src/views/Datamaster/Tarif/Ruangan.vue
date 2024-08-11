<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import DetailTarifRuangan from "./DetailTarifRuangan.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

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
      metode_pembayaran:["TUNAI","BPJS"],
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
      metode_pembayaran:["TUNAI","BPJS"],
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
      metode_pembayaran:["TUNAI","BPJS"],
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
  <DataTable
    v-model:expandedRows="expandedRows"
    :value="products"
    tableStyle="min-width: 50rem"
    :pt="{ headerRow: 'bg-blue-500 text-white' }"
    class="text-xs"
    dataKey="id"
  >
    <Column
      expander
      style="width: 5rem"
      header-class="text-black bg-adameds-50"
    />
    <Column header="No" header-class="text-black bg-adameds-50">
      <template #body="slotProps">
        <div class="flex items-center justify-center">
          {{ slotProps.index + 1 }}
        </div>
      </template>
    </Column>
    <Column
      field="nama_ruangan"
      header="Nama Ruangan"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="kategori_ruangan"
      header="Kategori Ruangan"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="kelas"
      header="Kelas"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="pelayanan"
      header="pelayanan"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="metode_pembayaran"
      header="Metode Pembayaran"
      header-class="text-black bg-adameds-50"
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
      field="status"
      header="Status"
      header-class="text-black bg-adameds-50"
    >
      <template #body="slotProps">
        <div class="flex justify-center items-center min-w-[120px]">
          <CustomChip
                :label="slotProps.data.status"
                :textColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'text-white'
                    : 'text-[#80868d]'
                "
                :bgColor="slotProps.data.status === 'AKTIF' ? 'bg-adameds-300':'bg-white'"
                :borderColor="slotProps.data.status === 'AKTIF' ? 'border-none':'border-[#80868d]'"
                :icon-color="
                  slotProps.data.status === 'AKTIF' ? 'white' : '#80868d'
                "
                customClass="text-xs font-semibold h-6 flex"
              />
        </div>
      </template>
    </Column>
    <Column header="Action" header-class="text-black bg-adameds-50">
      <template #body="slotProps">
        <div class="flex items-center justify-center">
          <CustomButton
            label=""
            background-color="bg-[#3D84E5] rounded-lg"
            @click="detail = true"
          >
            <img src="@/assets/icons/edit.svg" alt="" width="15px" />
          </CustomButton>
          <CustomDialog
            fullScreen
            v-model:visible="detail"
            headerBg="bg-adameds-300"
          >
            <template #header>Detail Tarif Ruangan</template>
            <template #body>
              <DetailTarifRuangan />
            </template>
            <template #footer>
              <CustomButton label="Batal"> </CustomButton>
              <CustomButton label="Simpan"> </CustomButton>
            </template>
          </CustomDialog>
        </div>
      </template>
    </Column>
    <template #expansion="slotProps">
      <div class="p-3 -mx-3 -my-1.5 bg-adameds-50">
        <DataTable
          :value="slotProps.data.orders"
          class="overflow-hidden rounded-lg bg-adameds-50"
        >
          <Column
            field="jenis_pembayaran_bed"
            header="Jenis Pembayaran Bed"
            header-class="text-white bg-adameds-300"
          ></Column>
          <Column
            field="harga_tarif"
            header="Harga Tarif"
            header-class="text-white bg-adameds-300"
          ></Column>
        </DataTable>
      </div>
    </template>
  </DataTable>
</template>
