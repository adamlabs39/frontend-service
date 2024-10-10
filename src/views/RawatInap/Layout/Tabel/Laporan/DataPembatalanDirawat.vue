<script lang="ts" setup>
import { ref } from "vue";

const pembatalanRuangan = ref([
  {
    id: 1,
    tglRegistrasi: "10-10-2024 09:00",
    noRegistrasi: "2407010049",
    noRM: "00-00-00",
    namaPasien: "Nama Lengkap Pasien",
    ruangan: "Mawar 1A",
    dokter: "dr. Nama Dokter Sp. D",
    tglBatal: "10-10-2024 10:00",
    subMenu: [
      {
        id: 1,
        kelas: "Kelas 1",
        noBed: "2",
        petugas: "Nama Petugas",
        alasanBatal: "Alasan Batal",
      },
    ],
  },
]);

const expandedRows = ref<any[]>([]);
</script>

<template>
  <DataTable
    :value="pembatalanRuangan"
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
      field="ruangan"
      header="Ruangan"
      header-class="text-black bg-adameds-50"
      class="text-SM"
      style="min-width: 100px"
    >
    </Column>
    <Column
      field="dokter"
      header="Dokter DPJP"
      header-class="text-black bg-adameds-50"
      class="text-SM"
      style="min-width: 100px"
    >
    </Column>
    <Column
      field="tglBatal"
      header="Tgl. Batal"
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
            field="kelas"
            header="Kelas"
            header-class="text-black bg-adameds-50"
            class="p-5 text-black text-SM"
            style="width: 300px"
          ></Column>
          <Column
            field="noBed"
            header="No. Bed"
            header-class="text-black bg-adameds-50"
            class="p-5 text-black text-SM"
            style="width: 300px"
          ></Column>
          <Column
            field="petugas"
            header="Petugas"
            header-class="text-black bg-adameds-50"
            class="p-5 text-black text-SM"
            style="width: 300px"
          ></Column>
          <Column
            field="alasanBatal"
            header="Alasan Batal"
            header-class="text-black bg-adameds-50"
            class="text-black text-SM"
          ></Column>
          
        </DataTable>
      </div>
    </template>
  </DataTable>
</template>
