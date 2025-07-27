<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import KonfigurasiJadwalHeader from "../Layout/KonfigurasiJadwalHeader.vue";
import { onMounted, ref, computed } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import AntrianFooter from "../Layout/AntrianFooter.vue";
import EditDataKonfigurasiJadwal from "./EditDataKonfigurasiJadwal.vue";
import NoData from "@/components/section/NoData.vue";

const pageType = ref("");
const route = useRoute();

const headerFilterRef = ref<typeof KonfigurasiJadwalHeader>();
const resetFilter = () => {
  headerFilterRef.value?.resetFilter();
};

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

const updatePageType = (path: string) => {
  resetFilter();
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[2] ?? "";
};
onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
});

const expandedRows = ref();

const onRowToggle = (event: { data: any; originalEvent: Event }) => {
  const rowData = event.data;
  // Check if the row is already expanded, then collapse it; otherwise, expand it
  if (expandedRows.value?.includes(rowData)) {
    expandedRows.value = expandedRows.value.filter(
      (row: number) => row !== rowData
    );
  } else {
    expandedRows.value.push(rowData);
  }
};

const itemsLayar = ref([
  {
    noJadwal: "1",
    nama_dokter: "dr. Umum",
    jumlah_jadwal: "3 Jadwal",
    spesialis: "-",
    poli: "Poli Umum",
    orders: [
      {
        no: "1",
        hari: "Senin",
        jam_praktek: "08.00 - 12.00",
        durasi_pasien: "20 Menit",
        kuota_non_jkn: "5 Slot",
        kuota_jkn: " 5 Slot",
        total_kuota: "10 Slot",
        status: "AKTIF",
      },
      {
        no: "2",
        hari: "Selasa",
        jam_praktek: "08.00 - 12.00",
        durasi_pasien: "20 Menit",
        kuota_non_jkn: "5 Slot",
        kuota_jkn: " 5 Slot",
        total_kuota: "10 Slot",
        status: "AKTIF",
      },
      {
        no: "3",
        hari: "Rabu",
        jam_praktek: "08.00 - 12.00",
        durasi_pasien: "20 Menit",
        kuota_non_jkn: "5 Slot",
        kuota_jkn: " 5 Slot",
        total_kuota: "10 Slot",
        status: "AKTIF",
      },
    ],
  },
  {
    noJadwal: "2",
    nama_dokter: "dr. Spesialis Sp. A",
    jumlah_jadwal: "2 Jadwal",
    spesialis: "Anak (Sp. A)",
    poli: "Poli Anak",
    orders: [
      {
        no: "1",
        hari: "Kamis",
        jam_praktek: "08.00 - 12.00",
        durasi_pasien: "20 Menit",
        kuota_non_jkn: "5 Slot",
        kuota_jkn: " 5 Slot",
        total_kuota: "10 Slot",
        status: "AKTIF",
      },
      {
        no: "2",
        hari: "Jumat",
        jam_praktek: "08.00 - 12.00",
        durasi_pasien: "20 Menit",
        kuota_non_jkn: "5 Slot",
        kuota_jkn: " 5 Slot",
        total_kuota: "10 Slot",
        status: "AKTIF",
      },
    ],
  },
  {
    noJadwal: "3",
    nama_dokter: "dr. Spesialis Sp. M",
    jumlah_jadwal: "2 Jadwal",
    spesialis: "Mata (Sp. M)",
    poli: "Poli Mata",
    status: "AKTIF",
  },
  {
    noJadwal: "4",
    nama_dokter: "dr. Spesialis Sp. Og",
    jumlah_jadwal: "2 Jadwal",
    spesialis: "Obgyn (Sp.Og)",
    poli: "Poli Kandungan",
    status: "AKTIF",
  },
  {
    noJadwal: "5",
    nama_dokter: "dr. Spesialis Sp. D",
    jumlah_jadwal: "2 Jadwal",
    spesialis: "Penyakit Dalam (Sp.D)",
    poli: "Poli Dalam",
    status: "AKTIF",
  },
]);

const totalItems = computed(() => itemsLayar.value.length);

const selectedPatient = ref([]);

const dialogData = ref({
  isVisible: false,
  method: "add",
  title: "Tambah",
});

function handleEdit() {
  dialogData.value = {
    isVisible: true,
    method: "edit",
    title: "Edit",
  };
}

function handleClose() {
  dialogData.value.isVisible = false;
}
</script>

<template>
  <Card
    v-if="dataBreadCrumb.length == 0"
    pt:body:class="overflow-auto pt-0 h-full"
    pt:content:class="overflow-auto h-full"
    class=""
  >
    <template #header>
      <konfigurasi-jadwal-header ref="headerFilterRef" :pageType="pageType" />
    </template>
    <template #content>
      <DataTable
        v-model:expandedRows="expandedRows"
        v-if="itemsLayar.length"
        v-model:selection="selectedPatient"
        :value="itemsLayar"
        tableStyle="min-width: 50rem"
        stripedRows
        scrollable
        scrollHeight="flex"
        :pt="{ headerRow: 'text-SM' }"
        dataKey="noJadwal"
        v-on:row-toggle="onRowToggle"
      >
        <Column
          expander
          style="width: 5rem"
          header-class="text-black bg-adameds-50"
        />
        <Column header="No." header-class="text-black bg-adameds-50">
          <template #body="slotProps">
            <div class="">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="nama_dokter"
          header="Nama Dokter"
          header-class="text-black bg-adameds-50"
          class="text-sm"
        ></Column>
        <Column
          field="jumlah_jadwal"
          header="Jumlah Jadwal"
          header-class="text-black bg-adameds-50"
          class="text-sm"
        ></Column>
        <Column
          field="poli"
          header="Poli"
          header-class="text-black bg-adameds-50"
          class="text-sm"
        ></Column>
        <Column
          field="Action"
          header="Action"
          headerClass="bg-adameds-50 flex items-center justify-center"
          class="text-sm"
        >
          <template #body="slotProps">
            <div class="flex gap-2.5 justify-center items-center">
              <CustomButton
                label=""
                background-color="bg-[#3D84E5] rounded-lg"
                @click="handleEdit"
              >
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
        <template #expansion="slotProps">
          <div class="p-3 -mx-3 -my-1.5 bg-adameds-100">
            <DataTable
              :value="slotProps.data.orders"
              class="overflow-hidden text-sm rounded-lg bg-adameds-50"
            >
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                class="flex justify-center items-center text-sm"
              ></Column>
              <Column
                field="hari"
                header="Hari"
                header-class="text-black bg-adameds-50"
                class="text-sm"
              ></Column>
              <Column
                field="jam_praktek"
                header-class="text-black bg-adameds-50"
                class="text-sm"
              >
                <template #header>
                  <div class="flex justify-center items-center w-full h-full">
                    <div class="font-bold">Jam Praktek</div>
                  </div>
                </template>
                <template #body="slotProps">
                  <div class="flex justify-center items-center">
                    {{ slotProps.data.jam_praktek }}
                  </div>
                </template>
              </Column>
              <Column
                field="durasi_pasien"
                header-class="text-black bg-adameds-50"
                class="text-sm"
              >
                <template #header>
                  <div class="flex justify-center items-center w-full h-full">
                    <div class="font-bold">Durasi Per-Pasien</div>
                  </div>
                </template>
                <template #body="slotProps">
                  <div class="flex justify-center items-center">
                    {{ slotProps.data.durasi_pasien }}
                  </div>
                </template>
              </Column>
              <Column
                field="kuota_jkn"
                header-class="text-center text-black bg-adameds-50"
                class="text-sm"
              >
                <template #header>
                  <div class="flex justify-center items-center w-full h-full">
                    <div class="font-bold">Kuota JKN</div>
                  </div>
                </template>
                <template #body="slotProps">
                  <div class="flex justify-center items-center">
                    {{ slotProps.data.kuota_jkn }}
                  </div>
                </template>
              </Column>
              <Column
                field="kuota_non_jkn"
                header-class="text-center text-black bg-adameds-50"
                class="text-sm"
              >
                <template #header>
                  <div class="flex justify-center items-center w-full h-full">
                    <div class="font-bold">Kuota Non-JKN</div>
                  </div>
                </template>
                <template #body="slotProps">
                  <div class="flex justify-center items-center">
                    {{ slotProps.data.kuota_non_jkn }}
                  </div>
                </template>
              </Column>
              <Column
                field="total_kuota"
                headerClass="text-center text-black bg-adameds-50 "
                class="text-sm"
              >
                <template #header>
                  <div class="flex justify-center items-center w-full h-full">
                    <div class="font-bold">Total Kuota</div>
                  </div>
                </template>
                <template #body="slotProps">
                  <div class="flex justify-center items-center">
                    {{ slotProps.data.total_kuota }}
                  </div>
                </template>
              </Column>
              <Column
                field="status"
                header="Status"
                headerClass="bg-adameds-50 flex items-center justify-center"
                class="flex justify-center items-center text-sm"
              >
                <template #body="slotProps">
                  <div class="min-w-MD">
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
            </DataTable>
          </div>
        </template>
      </DataTable>
      <NoData v-else />
      <EditDataKonfigurasiJadwal
        v-model:isDialogVisible="dialogData.isVisible"
        :title="dialogData.title"
        :method="dialogData.method"
        @close="handleClose"
      />
    </template>
    <template #footer>
      <AntrianFooter />
    </template>
  </Card>
</template>

<style></style>
