<script lang="ts" setup>
import NoData from "@/components/section/NoData.vue";
import { epochToDate } from "@/utils/Helpers";
import { ref } from "vue";

const props = defineProps({
  kunjunganData: {
    type: Array as () => Array<any>,
    required: true,
  },
});

// const kunjunganRawatJalan = ref([
//   {
//     id: 1,
//     tglRegistrasi: "10-10-2024 09:00",
//     noRegistrasi: "2407010049",
//     noRM: "00-00-00",
//     namaPasien: "Nama Lengkap Pasien",
//     poli: "Poli Dalam",
//     dokter: "dr. Nama Dokter Sp. D",
//     subMenu: [
//       { id: 1, jenisKelamin: "L", tglLahir: "01-01-2000", umur: "24 Tahun 2 Bulan 4 Hari",alamat: "Jl. Ijo Abang no. 17", jenisID: "KTP", noIdentitas: "99999999999999999999" , statusKeluarPasien: "Atas Persetujuan Dokter" ,kondisiKeluar: "Stabil" },
//     ],
//   },
//   {
//     id: 2,
//     tglRegistrasi: "10-10-2024 09:00",
//     noRegistrasi: "2407010049",
//     noRM: "00-00-00",
//     namaPasien: "Nama Lengkap Pasien",
//     poli: "-",
//     dokter: "dr. Nama Dokter Sp. Og",
//     subMenu: [], // Add submenu items here if any
//   },
// ]);

const expandedRows = ref<any[]>([]);
</script>

<template>
  <!-- {{ kunjunganData }} -->
  <DataTable
  v-if="kunjunganData.length"
    v-model:expandedRows="expandedRows"
    :value="kunjunganData"
    tableStyle="min-width: 50rem"
    scrollable
    scrollHeight="flex"
    :pt="{ headerRow: 'text-SM' }"
  >
    <Column
      expander
      style="width: 40px"
      header-class="text-black bg-adameds-50"
    />
    <Column
      field="no"
      header="No."
      header-class="text-black bg-adameds-50"
      style="width: 40px"
    >
      <template #body="{ index }">{{ index + 1 }}</template>
    </Column>
    <Column
      field="tglRegistrasi"
      header="Tgl. Registrasi"
      header-class="text-black bg-adameds-50"
    >
      <template #body="{ data }">
        {{ epochToDate(data.tglRegistrasi, "dateTime") }}
      </template>
    </Column>
    <Column
      field="noreg"
      header="No. Registrasi"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="jenisKunjungan"
      header="Jenis Kunjungan"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="patient.noRm"
      header="No. RM"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="patient.name"
      header="Nama Pasien"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="polyclinic"
      header="Poli"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="practitioner.nama"
      header="Dokter"
      header-class="text-black bg-adameds-50"
    ></Column>
    <template #expansion="slotProps">
      <div class="p-3 -mx-3 -my-1.5 bg-adameds-75">
        <DataTable
          :value="[slotProps.data]"
          class="overflow-hidden rounded-lg bg-adameds-50"
          :pt="{ headerRow: 'text-SM' }"
        >
          <Column
            field="gender"
            header="Jenis Kelamin"
            header-class="text-black bg-adameds-50"
          >
            <template #body="{ data }">
              {{ data.patient.gender == "Male" ? "L" : "P" }}
            </template>
          </Column>
          <Column
            field="patient.birthDetail.birthDate"
            header="Tgl. Lahir"
            header-class="text-black bg-adameds-50"
          ></Column>
          <Column
            field="patient.birthDetail.birthDate"
            header="Umur"
            header-class="text-black bg-adameds-50"
          >
            <template #body="{ data }">
              {{
                `${data.patient.birthDetail.ageYear} Tahun ${data.patient.birthDetail.ageMonth} Bulan ${data.patient.birthDetail.ageDay} Hari`
              }}
            </template>
          </Column>
          <Column
            field="patient.address.fullAddress"
            header="Alamat"
            header-class="text-black bg-adameds-50"
          />
          <Column
            field="patient.identity"
            header="Jenis ID"
            header-class="text-black bg-adameds-50"
          ></Column>
          <Column
            field="patient.noIdentity"
            header="No. Identitas"
            header-class="text-black bg-adameds-50"
          ></Column>
        </DataTable>
      </div>
    </template>
  </DataTable>

  <NoData v-else/>
</template>
