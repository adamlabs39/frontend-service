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
      field="tglDaftar"
      header="Tgl. Registrasi"
      header-class="text-black bg-adameds-50"
    >
      <template #body="{ data }">
        {{ epochToDate(data.tanggalDaftar, "dateTime") }}
      </template>
    </Column>
    <Column
      field="noReg"
      header="No. Registrasi"
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
      field="polyclinic.name"
      header="Poli"
      header-class="text-black bg-adameds-50"
    ></Column>
    <Column
      field="practitioner.name"
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
          <Column
            field="statusKeluarPasien" 
            header="Status Keluar Pasien"
            header-class="text-black bg-adameds-50"
            class="text-black text-SM"
          >
            <template #body="{ data }">
              <span v-if="data.statusKeluarPasien === '359746009'">Stabil</span>
              <span v-else-if="data.statusKeluarPasien === '162668006'">Tidak Stabil</span>
              <span v-else-if="data.statusKeluarPasien === '268910001'">Perbaikan</span>
              <span v-else>{{ data.statusKeluarPasien }}</span>
            </template>
          </Column>
          <Column
            field="kondisiKeluar" 
            header="Kondisi Keluar"
            header-class="text-black bg-adameds-50"
            class="text-black text-SM"
          >
            <template #body="{ data }">
              <span v-if="data.kondisiKeluar === 'home'">Pulang atas persetujuan dokter</span>
              <span v-else-if="data.kondisiKeluar === 'aadvice'">Pulang atas permintaan sendiri</span>
              <span v-else-if="data.kondisiKeluar === 'other-hcf'">Dirujuk</span>
              <span v-else-if="data.kondisiKeluar === 'exp-lt48h'">Meninggal &lt; 48 jam</span>
              <span v-else-if="data.kondisiKeluar === 'exp-gt48h'">Meninggal &gt; 48 jam</span>
              <span v-else-if="data.kondisiKeluar === 'oth'">Lain-lain</span>
              <span v-else>{{ data.kondisiKeluar }}</span>
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
  </DataTable>

  <NoData v-else/>
</template>
