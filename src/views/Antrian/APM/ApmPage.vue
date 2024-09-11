<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import HeaderFilter from "../Layout/ApmHeader.vue";
import { onMounted, ref, computed } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import AntrianFooter from "../Layout/AntrianFooter.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleAktif = () => {
  router.push('/antrian/apm/aktif');
};

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

const itemsAPM = ref([
  {
    noAPM: "1",
    name: "APM 1",
    jumlahMenu: 4,
    ucapan: ["Pasien JKN", "Pasien Non-JKN", "Checkin", "Print"],
    status: "AKTIF",
  },
]);

const dialogData = ref({
  isVisible: false,
  method: "add",
  title: "Tambah",
});

// function handleAdd() {
//   dialogData.value = {
//     isVisible: true,
//     method: "add",
//     title: "Tambah",
//   };
// }

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

const totalItems = computed(() => itemsAPM.value.length);

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
        v-if="itemsAPM.length"
        v-model:selection="selectedPatient"
        :value="itemsAPM"
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
              <div class="text-sm">{{ slotProps.data.noAPM }}</div>
            </div>
          </template>
        </Column>
        <Column field="nama-apm" header="Nama APM" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.name }}</div>
          </template>
        </Column>
        <Column
          field="jumlah-menu"
          header="Jumlah Menu"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.jumlahMenu }} Menu</div>
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
                @click="handleAktif"
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
      <AntrianFooter />
    </template>
  </Card>
</template>

<style></style>
