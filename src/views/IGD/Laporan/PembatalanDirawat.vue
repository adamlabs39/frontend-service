<script lang="ts" setup>
import { ref } from "vue";
import { epochToDate } from "@/utils/Helpers";

const props = defineProps({
  payload: {
    type: Array,
    default: () => [],
  },
});

const expandedRows = ref<any[]>([]);
</script>

<template>
  <DataTable
    :value="props.payload"
    responsiveLayout="scroll"
    dataKey="id"
    :expandedRows="expandedRows"
    scrollable
    scrollHeight="flex"
    class="h-full p-datatable-sm"
  >
    <Column expander style="width: 2em" header-class="text-black bg-adameds-50">
    </Column>
    <Column
      field="no"
      header="No"
      header-class="text-black bg-adameds-50"
      class="w-10 p-5 text-center text-black text-SM"
      ><template #body="{ index }">{{ index + 1 }}</template>
    </Column>
    <Column
      field="tglRegistrasi"
      header="Tgl. Registrasi"
      header-class="text-black bg-adameds-50 "
      class="text-black text-SM"
      style="min-width: 120px"
    >
      <template #body="{ data }">
        {{ epochToDate(data.tglRegistrasi, "dateTime") }}
      </template>
    </Column>
    <Column
      field="noreg"
      header="No. Registrasi"
      header-class="text-black bg-adameds-50"
      class="text-black text-SM"
      style="min-width: 120px"
    />
    <Column
      field="patient.noRm"
      header="No. RM"
      header-class="text-black bg-adameds-50"
      class="text-black text-SM"
      style="min-width: 120px"
    />
    <Column
      field="patient.name"
      header="Nama Pasien"
      header-class="text-black bg-adameds-50"
      class="text-SM"
      style="min-width: 100px"
    >
    </Column>
    <Column
      field="practitioner.nama"
      header="Dokter DPJP"
      header-class="text-black bg-adameds-50"
      class="text-SM"
      style="min-width: 100px"
    >
    </Column>
    <Column
      field="cancelDate"
      header="Tgl. Batal"
      header-class="text-black bg-adameds-50"
      class="text-SM"
      style="min-width: 100px"
    >
      <template #body="{ data }">
        {{ epochToDate(data.cancelDate, "dateTime") }}
      </template>
    </Column>

    <template #expansion="slotProps">
      <div class="p-3 -mx-2 -my-1.5 bg-adameds-75">
        <DataTable
          :value="slotProps.data.subMenu"
          class="overflow-hidden rounded-lg bg-adameds-50"
        >
          <Column
            field="cancelBy"
            header="Petugas"
            header-class="text-black bg-adameds-50"
            class="p-5 text-black text-SM"
            style="width: 300px"
          ></Column>
          <Column
            field="cancelReason"
            header="Alasan Batal"
            header-class="text-black bg-adameds-50"
            class="text-black text-SM"
          ></Column>
        </DataTable>
      </div>
    </template>
  </DataTable>
</template>
