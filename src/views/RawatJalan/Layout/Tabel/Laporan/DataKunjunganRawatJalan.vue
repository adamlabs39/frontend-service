<script lang="ts" setup>
import { ref } from "vue";

const kunjunganRawatJalan = ref([
  {
    id: 1,
    tglRegistrasi: "10-10-2024 09:00",
    noRegistrasi: "2407010049",
    noRM: "00-00-00",
    namaPasien: "Nama Lengkap Pasien",
    poli: "Poli Dalam",
    dokter: "dr. Nama Dokter Sp. D",
    subMenu: [
      { id: 1, jenisKelamin: "L", tglLahir: "01-01-2000", umur: "24 Tahun 2 Bulan 4 Hari",alamat: "Jl. Ijo Abang no. 17", jenisID: "KTP", noIdentitas: "99999999999999999999" , statusKeluarPasien: "Atas Persetujuan Dokter" ,kondisiKeluar: "Stabil" },
    ],
  },
  {
    id: 2,
    tglRegistrasi: "10-10-2024 09:00",
    noRegistrasi: "2407010049",
    noRM: "00-00-00",
    namaPasien: "Nama Lengkap Pasien",
    poli: "-",
    dokter: "dr. Nama Dokter Sp. Og",
    subMenu: [], // Add submenu items here if any
  },
]);

const expandedRows = ref<any[]>([]);
</script>

<template>
  <DataTable
    :value="kunjunganRawatJalan"
    responsiveLayout="scroll"
    dataKey="id"
    :expandedRows="expandedRows"
    scrollable
    scrollHeight="flex"
    class="p-datatable-sm"
  >
    <Column expander style="width: 2em" header-class="text-black bg-adameds-50">
    </Column>
    <Column
      field="id"
      header="No"
      header-class="text-black bg-adameds-50"
      class="w-10 p-5 text-center text-black text-SM"
    />
    <Column
      field="tglRegistrasi"
      header="Tgl. Registrasi"
      header-class="text-black bg-adameds-50 "
      class="text-black text-SM"
      style="min-width: 120px"
    />
    <Column
      field="noRegistrasi"
      header="No. Registrasi"
      header-class="text-black bg-adameds-50"
      class="text-black text-SM"
      style="min-width: 120px"
    />
    <Column
      field="noRM"
      header="No. RM"
      header-class="text-black bg-adameds-50"
      class="text-black text-SM"
      style="min-width: 120px"
    />
    <Column
      field="namaPasien"
      header="Nama Pasien"
      header-class="text-black bg-adameds-50"
      class="text-SM"
      style="min-width: 100px"
    >
    </Column>
    <Column
      field="poli"
      header="Poli"
      header-class="text-black bg-adameds-50"
      class="text-SM"
      style="min-width: 100px"
    >
    </Column>
    <Column
      field="dokter"
      header="Dokter"
      header-class="text-black bg-adameds-50"
      class="text-SM"
      style="min-width: 100px"
    >
    </Column>

    <template #expansion="slotProps">
      <div class="p-3 -mx-2 -my-1.5 bg-adameds-75">
        <DataTable
          :value="slotProps.data.subMenu"
          class="overflow-hidden rounded-lg bg-adameds-50"
        >
          <Column
            field="jenisKelamin"
            header="Jenis Kelamin"
            header-class="text-black bg-adameds-50"
            class="p-5 text-black text-SM"
            style="width: 100px"
             
          ></Column>
          <Column
            field="tglLahir"
            header="Tgl. Lahir"
            header-class="text-black bg-adameds-50"
            class="text-black text-SM"
          ></Column>
          <Column
            field="umur"
            header="Umur"
            header-class="text-black bg-adameds-50"
            class="text-black text-SM"
          ></Column>
          <Column
            field="alamat"
            header="Alamat"
            header-class="text-black bg-adameds-50"
            class="text-black text-SM"
          ></Column>
          <Column
            field="jenisID"
            header="Jenis ID"
            header-class="text-black bg-adameds-50"
            class="text-black text-SM"
          ></Column>
          <Column
            field="noIdentitas"
            header="No.Identitas"
            header-class="text-black bg-adameds-50"
            class="text-black text-SM"
          ></Column>
          <Column
            field="statusKeluarPasien"
            header="Status Keluar Pasien"
            header-class="text-black bg-adameds-50"
            class="text-black text-SM"
          ></Column>
          <Column
            field="kondisiKeluar"
            header="Kondisi Keluar"
            header-class="text-black bg-adameds-50"
            class="text-black text-SM"
          ></Column>
        </DataTable>
      </div>
    </template>
  </DataTable>
</template>
