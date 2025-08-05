<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import HeaderFilter from "../../Layout/KonfigurasiLayarHeader.vue";
import { onMounted, ref, computed } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import AntrianFooter from "../../Layout/AntrianFooter.vue";
import TambahDataKonfigurasiLayar from "./TambahDataKonfigurasiLayar.vue";
import NoData from "@/components/section/NoData.vue";
import { useConfigLayarAntrianStore } from "@/stores/antrian/configLayarAntrian";
import { utilsStore } from "@/stores/utils";

const pageType = ref("");
const route = useRoute();

const configLayarAntrianStore = useConfigLayarAntrianStore();
const useUtilsStore = utilsStore();

const jadwalAntrianPayload = ref<any[]>();
const jadwalLayarAntrianProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

const fetchJadwalAntrian = async () => {
  useUtilsStore.setLoading(true);
  try {
    const response = await configLayarAntrianStore.getApi(
      jadwalLayarAntrianProperties.value.page,
      jadwalLayarAntrianProperties.value.page_size
    );
    console.log("Respon layar antrian get:", response.payload);
    if (response && response.payload) {
      jadwalAntrianPayload.value = response.payload;
      jadwalLayarAntrianProperties.value.total = response.payload.length;
    }
  } catch (error) {
    console.log(error);
  } finally {
    useUtilsStore.setLoading(false);
  }
};

const deleteLayarAntrian = async (layarAntrianUuid: string) => {
  useUtilsStore.setLoading(true);
  try {
    const response = await configLayarAntrianStore.deleteLayarAntrian(
      layarAntrianUuid
    );
    fetchJadwalAntrian();
  } catch (error) {
    console.log("Failed to delete layar antrian", error);
  } finally {
    useUtilsStore.setLoading(false);
  }
};

const headerFilterRef = ref<typeof HeaderFilter>();
const resetFilter = () => {
  headerFilterRef.value?.resetFilter();
};

const handleRowsUpdate = (rows: number) => {
  jadwalLayarAntrianProperties.value.page_size = rows;
  fetchJadwalAntrian();
};

const handlePageUpdate = (page: number) => {
  jadwalLayarAntrianProperties.value.page = page;
  fetchJadwalAntrian();
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
  fetchJadwalAntrian();
});

const itemsLayar = ref([
  {
    code: "1",
    tipe_layar: "3 x 3 Panggilan",
  },
  {
    code: "2",
    tipe_layar: "3 x 2 Panggilan",
  },
  {
    code: "3",
    tipe_layar: "3 list & 3 Panggilan",
  },
  {
    code: "4",
    tipe_layar: "2 list & 2 Panggilan",
  },
  {
    code: "5",
    tipe_layar: "1 list & 1 Panggilan",
  },
]);

// Fungsi konverter tipe layar
const getTipeLayarDescription = (tipeLayarCode: number): string => {
  const tipeLayar = itemsLayar.value.find(
    (item) => parseInt(item.code) === tipeLayarCode
  );
  return tipeLayar ? tipeLayar.tipe_layar : `Tipe ${tipeLayarCode}`;
};

const dialogData = ref({
  isVisible: false,
  method: "add",
  title: "Tambah",
});

function handleAdd() {
  dialogData.value = {
    isVisible: true,
    method: "add",
    title: "Tambah",
  };
}

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

const totalItems = computed(() => itemsLayar.value.length);

const selectedPatient = ref([]);
</script>

<template>
  <Card
    v-if="dataBreadCrumb.length == 0"
    pt:body:class="overflow-auto pt-0 h-full"
    pt:content:class="overflow-auto h-full"
    class=""
  >
    <template #header>
      <HeaderFilter
        ref="headerFilterRef"
        :pageType="pageType"
        @daftar="changeSection('Daftar')"
      />
    </template>
    <template #content>
      <DataTable
        v-if="jadwalLayarAntrianProperties.total > 0"
        v-model:selection="selectedPatient"
        :value="jadwalAntrianPayload"
        tableStyle="min-width: 50rem"
        stripedRows
        scrollable
        scrollHeight="flex"
        :pt="{ headerRow: 'text-SM' }"
      >
        <Column field="No." headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <div class="text-sm">{{ slotProps.index + 1 }}</div>
            </div>
          </template>
        </Column>
        <Column
          field="Nama Layar"
          header="Nama Layar"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.namaLayar }}</div>
          </template>
        </Column>
        <Column
          field="Tipe Layar"
          header="Tipe Layar"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="text-SM">
              {{ getTipeLayarDescription(slotProps.data.tipeLayar) }}
            </div>
          </template>
        </Column>
        <Column
          field="Isi Konten"
          header="Isi Konten"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="flex flex-wrap">
              <div
                v-if="
                  Array.isArray(slotProps.data.lokasi) &&
                  slotProps.data.lokasi.length > 0
                "
                class="flex justify-center items-center"
              >
                <CustomChip
                  v-for="(konten, index) in slotProps.data.lokasi"
                  :key="index"
                  :showCheckedIcon="false"
                  :label="konten.name"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 border-none mr-[5px]"
                />
              </div>
              <div v-else class="flex justify-center items-center">
                <PhMinus :size="18" weight="bold" />
              </div>
            </div>
          </template>
        </Column>
        <Column
          field="flash-text"
          header="Flash Text"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="flex flex-wrap">
              <div
                v-if="
                  Array.isArray(slotProps.data.flashText) &&
                  slotProps.data.flashText.length > 0
                "
              >
                <CustomChip
                  v-for="(konten, index) in slotProps.data.flashText"
                  :key="index"
                  :showCheckedIcon="false"
                  :label="konten"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 border-none mr-[5px]"
                />
              </div>
              <div v-else class="flex justify-center items-center">
                <PhMinus :size="18" weight="bold" />
              </div>
            </div>
          </template>
        </Column>
        <Column
          field="status"
          header="Status"
          headerClass="bg-adameds-50 items-center justify-center"
        >
          <template #body="slotProps">
            <div class="flex justify-center items-center min-w-[120px]">
              <CustomChip
                :label="slotProps.data.status ? 'AKTIF' : 'NON-AKTIF'"
                :textColor="
                  slotProps.data.status ? 'text-white' : 'text-[#80868d]'
                "
                :bgColor="slotProps.data.status ? 'bg-adameds-300' : 'bg-white'"
                :borderColor="
                  slotProps.data.status ? 'border-none' : 'border-[#80868d]'
                "
                :icon-color="slotProps.data.status ? 'white' : '#80868d'"
                customClass="text-xs font-semibold h-6 flex"
              />
            </div>
          </template>
        </Column>
        <Column
          field="Action"
          header="Action"
          headerClass="bg-adameds-50 flex items-center justify-center"
        >
          <template #body="slotProps">
            <div class="flex gap-2.5 justify-center items-center">
              <CustomButton
                label=""
                background-color="bg-[#3D84E5] rounded-lg"
                @click="handleAdd"
              >
                <img src="@/assets/icons/edit.svg" alt="" width="15px" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                @click="deleteLayarAntrian(slotProps.data.uuid)"
              >
                <img src="@/assets/icons/delete.svg" alt="" width="15px" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>

      <NoData v-else />
      <TambahDataKonfigurasiLayar
        :full-screen="true"
        v-model:isDialogVisible="dialogData.isVisible"
        :title="dialogData.title"
        :method="dialogData.method"
        @close="handleClose"
      />
    </template>
    <template #footer>
      <AntrianFooter
        :rows="jadwalLayarAntrianProperties.page_size"
        :totalRecords="jadwalLayarAntrianProperties.total"
        :rowsPerPageOptions="[10, 20, 30]"
        @update:rows="handleRowsUpdate"
        @update:current-page="handlePageUpdate"
      />
    </template>
  </Card>
</template>

<style></style>
