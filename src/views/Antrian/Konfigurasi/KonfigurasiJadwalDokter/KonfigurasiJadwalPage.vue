<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import KonfigurasiJadwalHeader from "../../Layout/KonfigurasiJadwalHeader.vue";
import { onMounted, ref, computed } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import AntrianFooter from "../../Layout/AntrianFooter.vue";
import EditDataKonfigurasiJadwal from "./SectionEditKonfigurasiJadwal.vue";
import NoData from "@/components/section/NoData.vue";
import { useJadwalDokterStore } from "@/stores/antrian/jadwalDokter";
import { utilsStore } from "@/stores/utils";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const headerFilterRef = ref<typeof KonfigurasiJadwalHeader>();
const resetFilter = () => {
  headerFilterRef.value?.resetFilter();
};

const jadwalDokterStore = useJadwalDokterStore();
const UseUtilsStore = utilsStore();

const jadwalDokterPayload = ref<any[]>([]);
const jadwalDokterProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

const fetchJadwalDokter = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await jadwalDokterStore.getApi(
      jadwalDokterProperties.value.page,
      jadwalDokterProperties.value.page_size,
      filterCriteria.value.aktif
    );
    console.log(response);
    if (response && response.payload) {
      jadwalDokterPayload.value = response.payload;
      jadwalDokterProperties.value.total = response.properties.total;
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    jadwalDokterPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const deleteDoctor = async (doctorUuid: string, poliUuid: string) => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await jadwalDokterStore.deleteDoctor(doctorUuid, poliUuid);
    await fetchJadwalDokter();
  } catch (error) {
    console.error("Failed to delete doctor", error);
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const expandedRows = ref();

const dialogData = ref({
  isVisible: false,
  method: "add",
  title: "Tambah",
  editData: {},
});

const existingDoctorUuids = computed(() =>
  jadwalDokterPayload.value.map((item) => item.doctor.uuid)
);

const dokterOptions = computed(() => {
  const map = new Map();
  jadwalDokterPayload.value.forEach((item) => {
    map.set(item.doctor.uuid, {
      uuid: item.doctor.uuid,
      name: item.doctor.name,
    });
  });
  return Array.from(map.values());
});

const poliOptions = computed(() => {
  const map = new Map();
  jadwalDokterPayload.value.forEach((item) => {
    map.set(item.poli.uuid, { uuid: item.poli.uuid, name: item.poli.name });
  });
  return Array.from(map.values());
});

const handleEdit = (data: any) => {
  dialogData.value = {
    isVisible: true,
    method: "edit",
    title: "Edit",
    editData: data,
  };
};

const handleClose = () => {
  dialogData.value.isVisible = false;
};

// untuk handle perubahan rows per page
const handleRowsUpdate = (newRows: number) => {
  jadwalDokterProperties.value.page_size = newRows;
  jadwalDokterProperties.value.page = 1; // Reset ke halaman pertama
  fetchJadwalDokter(); // Refresh data
};

const handleRefresh = () => {
  dialogData.value.isVisible = false; // tutup dialog
  fetchJadwalDokter(); // muat ulang data tabel utama
};

// untuk handle perubahan halaman
const handlePageUpdate = (newPage: number) => {
  jadwalDokterProperties.value.page = newPage;
  fetchJadwalDokter(); // Refresh data
};

const handlePage = (event: any) => {
  jadwalDokterProperties.value.page = event.page + 1;
  jadwalDokterProperties.value.page_size = event.rows;
  fetchJadwalDokter();
};

const filterCriteria = ref({ dokterUuid: "", poliUuid: "" });

const displayedJadwalDokter = computed(() => {
  return jadwalDokterPayload.value.filter((item) => {
    const doctorOk =
      !filterCriteria.value.dokterUuid ||
      item.doctor.uuid === filterCriteria.value.dokterUuid;
    const poliOk =
      !filterCriteria.value.poliUuid ||
      item.poli.uuid === filterCriteria.value.poliUuid;
    return doctorOk && poliOk;
  });
});

onMounted(() => {
  fetchJadwalDokter();
});
</script>

<template>
  <Card
    pt:body:class="overflow-auto pt-0 h-full"
    pt:content:class="overflow-auto h-full"
    class=""
  >
    <template #header>
      <konfigurasi-jadwal-header
        @refresh="fetchJadwalDokter"
        ref="headerFilterRef"
        :excludedDoctorUuids="existingDoctorUuids"
        @search="
          filterCriteria = $event;
          fetchJadwalDokter();
        "
        :dokterOptions="dokterOptions"
        :poliOptions="poliOptions"
        :jadwalDokterData="jadwalDokterPayload"
      />
    </template>
    <template #content>
      <DataTable
        v-model:expandedRows="expandedRows"
        v-if="displayedJadwalDokter.length"
        :value="displayedJadwalDokter"
        tableStyle="min-width: 50rem"
        stripedRows
        scrollable
        scrollHeight="flex"
        :pt="{ headerRow: 'text-SM' }"
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
          header="Nama Dokter"
          header-class="text-black bg-adameds-50"
          class="text-sm"
        >
          <template #body="slotProps">
            <div class="text-sm">{{ slotProps.data.doctor.name }}</div>
          </template>
        </Column>
        <Column
          header="Jumlah Jadwal"
          header-class="text-black bg-adameds-50"
          class="text-sm"
        >
          <template #body="slotProps">
            <div class="text-sm">
              {{ slotProps.data.jadwalDokter.length }} Jadwal
            </div>
          </template>
        </Column>
        <Column
          header="Poli"
          header-class="text-black bg-adameds-50"
          class="text-sm"
        >
          <template #body="slotProps">
            <div class="text-sm">
              {{ slotProps.data.poli.name }}
            </div>
          </template>
        </Column>
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
                @click="handleEdit(slotProps.data)"
              >
                <img src="@/assets/icons/edit.svg" alt="" width="15px" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                @click="
                  deleteDoctor(
                    slotProps.data.doctor.uuid,
                    slotProps.data.poli.uuid
                  )
                "
              >
                <img src="@/assets/icons/delete.svg" alt="" width="15px" />
              </CustomButton>
            </div>
          </template>
        </Column>
        <template #expansion="slotProps">
          <div class="p-3 -mx-3 -my-1.5 bg-adameds-100">
            <DataTable
              :value="slotProps.data.jadwalDokter"
              class="overflow-hidden text-sm rounded-lg bg-adameds-50"
            >
              <Column
                header="No."
                header-class="text-black bg-adameds-50"
                class="flex justify-center items-center text-sm"
              >
                <template #body="slotProps">
                  {{ slotProps.index + 1 }}
                </template>
              </Column>
              <Column
                header="Hari"
                header-class="text-black bg-adameds-50"
                class="text-sm"
              >
                <template #body="slotProps">
                  {{ slotProps.data.day }}
                </template>
              </Column>
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
                    {{ slotProps.data.startTime }} -
                    {{ slotProps.data.endTime }}
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
                    {{ slotProps.data.durasiPelayanan }} Menit
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
                    {{ slotProps.data.kuotaJkn }} Slot
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
                    {{ slotProps.data.kuotaNonJkn }} Slot
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
                    {{ slotProps.data.kuota }} Slot
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
                        slotProps.data.status === 'aktif'
                          ? 'text-white'
                          : 'text-[#80868d]'
                      "
                      :bgColor="
                        slotProps.data.status === 'aktif'
                          ? 'bg-adameds-300'
                          : 'bg-white'
                      "
                      :borderColor="
                        slotProps.data.status === 'aktif'
                          ? 'border-none'
                          : 'border-[#80868d]'
                      "
                      :icon-color="
                        slotProps.data.status === 'aktif' ? 'white' : '#80868d'
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
        :editData="dialogData.editData"
        @close="handleClose"
        @refresh="handleRefresh"
      />
    </template>
    <template #footer>
      <div class="flex justify-between px-5 py-2.5">
        <CustomPaginator
          class="ml-auto"
          :rows="jadwalDokterProperties.page_size"
          :totalRecords="jadwalDokterProperties.total"
          :rowsPerPageOptions="[10, 20, 30]"
          @page="handlePage"
        />
      </div>
    </template>
  </Card>
</template>

<style></style>
