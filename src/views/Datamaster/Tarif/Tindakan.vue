<script lang="ts" setup>
import { ref,onMounted } from 'vue';
import CustomChip from '@/components/Base/CustomChip.vue';
const products = ref<any[]>([]);
const expandedRows = ref();
onMounted(() => {
  products.value = [
    {
      no: "1",
      nama_tarif: "Pemeriksaan Dokter Umum",
      jm_varian: "4",
      kode_tindakan: "TDKU",
      snomed_ct: "Nama Tindakan Snomed-CT",
      icd_9_cm_cm: "Nama Tindakan ICD 9 CM",
      status: "AKTIF",
      action: "edit",
      orders: [
        {
          no: "1",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
        {
          no: "2",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
        {
          no: "3",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
      ],
    },
    {
      no: "1",
      nama_tarif: "Pemeriksaan Dokter Umum",
      jm_varian: "4",
      kode_tindakan: "TDKU",
      snomed_ct: "Nama Tindakan Snomed-CT",
      icd_9_cm_cm: "Nama Tindakan ICD 9 CM",
      status: "AKTIF",
      action: "edit",
      orders: [
        {
          no: "1",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
        {
          no: "2",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
        {
          no: "3",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
      ],
    },
    {
      no: "1",
      nama_tarif: "Pemeriksaan Dokter Umum",
      jm_varian: "4",
      kode_tindakan: "TDKU",
      snomed_ct: "Nama Tindakan Snomed-CT",
      icd_9_cm_cm: "Nama Tindakan ICD 9 CM",
      status: "AKTIF",
      action: "edit",
      orders: [
        {
          no: "1",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
        {
          no: "2",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
        {
          no: "3",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
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
        <Column expander style="width: 5rem" />
        <Column header="No" headerClass="bg-adameds-50">
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
        ></Column>
        <Column
          field="jml_varian_tarif"
          header="Jml. Varian"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="kode_tindakan"
          header="Kode Tindakan"
          headerClass="bg-adameds-50"
        ></Column>

        <Column
          field="snomed_ct"
          header="Snomed-CT"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="icd_9_cm_cm"
          header="ICD 9 CM-CM"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="status"
          header="Status"
          headerClass="bg-adameds-50 flex items-center justify-center"
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
                :icon-color="
                  slotProps.data.status === 'AKTIF' ? 'white' : '#80868d'
                "
                :customClass="`text-xs font-semibold h-6 flex ${
                  slotProps.data.status === 'AKTIF'
                    ? 'bg-adameds-300'
                    : 'border'
                }`"
              />
            </div>
          </template>
        </Column>

        <Column header="Action" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg">
                <img src="@/assets/icons/edit.svg" alt="" width="15px" />
              </CustomButton>
            </div>
          </template>
        </Column>
        <template #expansion="slotProps">
          <DataTable :value="slotProps.data.orders">
            <Column header="No" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
            <Column field="nama_varian_tarif" header="Nama Varian Tarif"></Column>
            <Column field="unit_pelayanan" header="Unit Pelayanan"></Column>
            <Column field="metode_pembayaran" header="Metode Pembayaran">
                <template #body="slotProps">
                    <CustomChip
                :label="slotProps.data.metode_pembayaran"
                :showCheckedIcon="false"
                custom-class="text-xs font-semibold h-6 flex bg-adameds-300 text-white items-center justify-center"
                
              />
                </template>
            </Column>
            <Column field="harga" header="Harga/Tarif"></Column>
          </DataTable>
        </template>
      </DataTable>
</template>