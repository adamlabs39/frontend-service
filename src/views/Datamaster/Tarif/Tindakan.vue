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
      nama_tarif: "Pemeriksaan Dokter Umum",
      jm_varian: "4",
      kode_tindakan: "TDKU",
      snomed_ct: "Nama Tindakan Snomed-CT",
      icd_9_cm_cm: "Nama Tindakan ICD 9 CM",
      status: "AKTIF",
      action: "edit",
      orders: [
        {
          id: "1",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
        {
          id: "2",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
        {
          id: "3",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
      ],
    },
    {
      id: "2",
      nama_tarif: "Pemeriksaan Dokter Umum",
      jm_varian: "4",
      kode_tindakan: "TDKU",
      snomed_ct: "Nama Tindakan Snomed-CT",
      icd_9_cm_cm: "Nama Tindakan ICD 9 CM",
      status: "AKTIF",
      action: "edit",
      orders: [
        {
          id: "1",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
        {
          id: "2",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
        {
          id: "3",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
      ],
    },
    {
      id: "3",
      nama_tarif: "Pemeriksaan Dokter Umum",
      jm_varian: "4",
      kode_tindakan: "TDKU",
      snomed_ct: "Nama Tindakan Snomed-CT",
      icd_9_cm_cm: "Nama Tindakan ICD 9 CM",
      status: "AKTIF",
      action: "edit",
      orders: [
        {
          id: "1",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
        {
          id: "2",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
        {
          id: "3",
          nama_varian_tarif: "Pemeriksaan Dokter Umum - RJ",
          unit_pelayanan: "Rawat Jalan",
          metode_pembayaran: "Tunai",
          harga: "Rp.30,000",
        },
      ],
    },
  ];
});
const detail = ref(false);

const onRowToggle = (event: any) => {
  expandedRows.value = event.data;
};
</script>

<template>
  <DataTable
    v-model:expandedRows="expandedRows"
    :value="products"
    tableStyle="min-width: 50rem"
    :pt="{ headerRow: 'bg-blue-500 text-white' }"
    class="text-xs"
    dataKey="id"
    @row-toggle="onRowToggle"
  >
    <Column
      expander
      style="width: 5rem"
      header-class="text-black bg-adameds-50"
    >
    </Column>
    <Column header="No" header-class="text-black bg-adameds-50">
      <template #body="slotProps">
        <div class="flex items-center justify-center">
          {{ slotProps.index + 1 }}
        </div>
      </template>
    </Column>
    <Column
      field="nama_tarif"
      header="Nama Tarif"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="jm_varian"
      header="Jml. Varian"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="kode_tindakan"
      header="Kode Tindakan"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="snomed_ct"
      header="Snomed-CT"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="icd_9_cm_cm"
      header="ICD 9 CM-CM"
      header-class="text-black bg-adameds-50"
    ></Column>
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
            <template #header>Detail Tarif Tindakan</template>
            <template #body>
              <DetailTarifTindakan/>
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
            header="No"
            header-class="text-white bg-adameds-300"
            class="text-center"
          >
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>
          <Column
            field="nama_varian_tarif"
            header="Nama Varian Tarif"
            header-class="text-white bg-adameds-300"
          ></Column>
          <Column
            field="unit_pelayanan"
            header="Unit Pelayanan"
            header-class="text-white bg-adameds-300"
          ></Column>
          <Column
            field="metode_pembayaran"
            header="Metode Pembayaran"
            header-class="text-white bg-adameds-300"
          >
            <template #body="slotProps">
              <CustomChip
                :label="slotProps.data.metode_pembayaran"
                :showCheckedIcon="false"
                custom-class="text-xs font-semibold h-6 bg-adameds-300 text-white"
              />
            </template>
          </Column>
          <Column
            field="harga"
            header="Harga/Tarif"
            header-class="text-white bg-adameds-300"
          ></Column>
        </DataTable>
      </div>
    </template>
  </DataTable>
</template>
