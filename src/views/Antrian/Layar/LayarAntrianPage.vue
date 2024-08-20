<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import HeaderFilter from "../Layout/LayarHeader.vue";
import { onMounted, ref, computed } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";

const pageType = ref("");
const route = useRoute();

const headerFilterRef = ref<typeof HeaderFilter>();
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

const itemsLayar = ref([
  {
    noLayar: "1",
    name: "Layar 1",
    antrian: "Antrian 1",
    panggilan: "2 List & 2 Panggilan",
    isi_konten: ["Admisi", "Poli"],
    ucapan: [
      "Selamat Datang Di Klinik Adameds",
      "#ImprovingHealthCare",
      "#SATUSEHAT",
    ],
    status: "AKTIF",
  },
  {
    noLayar: "2",
    name: "Layar 2",
    antrian: "Antrian 2",
    panggilan: "3 x 3 Panggilan",
    isi_konten: "Poli",
    ucapan: "Selamat Datang Di Klinik Adameds",
    status: "AKTIF",
  },
]);

const totalItems = computed(() => itemsLayar.value.length);

const selectedPatient = ref([]);
</script>

<template>
  <Card
    v-if="dataBreadCrumb.length == 0"
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
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
        v-if="itemsLayar.length"
        v-model:selection="selectedPatient"
        :value="itemsLayar"
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
              <div class="text-sm">{{ slotProps.data.noLayar }}</div>
            </div>
          </template>
        </Column>
        <Column field="Layar" header="Layar" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.name }}</div>
            <div class="flex flex-wrap">
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.antrian"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.panggilan"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
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
              <div v-if="Array.isArray(slotProps.data.isi_konten)">
                <CustomChip
                  v-for="(konten, index) in slotProps.data.isi_konten"
                  :key="index"
                  :showCheckedIcon="false"
                  :label="konten"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
              </div>
              <div v-else>
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.isi_konten"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
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
                  Array.isArray(slotProps.data.ucapan) &&
                  slotProps.data.ucapan.length
                "
              >
                <CustomChip
                  v-for="(konten, index) in slotProps.data.ucapan"
                  :key="index"
                  :showCheckedIcon="false"
                  :label="konten"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
              </div>
              <div v-else-if="slotProps.data.ucapan">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.ucapan"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
              </div>
            </div>
          </template>
        </Column>
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
        <Column
          field="action"
          header="action"
          headerClass="bg-adameds-50 justify-center"
        >
          <template #body="slotProps">
            <div class="flex items-center gap-2.5">
              <CustomButton
                size="small"
                icon="PhScreencast"
                customClass="bg-adameds-300 rounded-full p-0 flex"
              >
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>

      <div
        v-else
        class="flex flex-col h-full border-2 border-dashed rounded-lg border-grey-100"
      >
        <div class="m-auto">
          <img
            src="../../assets/icons/no-data-icon.svg"
            alt="no data"
            class="mx-auto"
          />
          <div class="text-grey-200">No data available</div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <Paginator
          :rows="10"
          :totalRecords="120"
          :rowsPerPageOptions="[10, 20, 30]"
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{currentPage}"
        >
          <template #start="slotProps">Total Data: {{ totalItems }}</template>
        </Paginator>
      </div>
    </template>
  </Card>
</template>

<style></style>
