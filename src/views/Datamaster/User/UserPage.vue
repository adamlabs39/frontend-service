<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import TambahDataUserPage from "./TambahDataUser/TambahDataUserPage.vue";

const searchUser = ref<any>();
const selectedUser = ref<any>();
const itemSelectUser = ref([
  { name: "Dokter", code: "DK" },
  { name: "Admin", code: "AD" },
  { name: "Perawat", code: "PR" },
]);

const dataUser = ref([
  { name: "John Doe", role: "Admin", status: "AKTIF" },
  { name: "Jane Smith", role: "User", status: "NON-AKTIF" },
  { name: "Mary Johnson", role: "User", status: "AKTIF" },
  { name: "Mary Johnson", role: "User", status: "AKTIF" },
  { name: "Mary Johnson", role: "User", status: "AKTIF" },
  { name: "Mary Johnson", role: "User", status: "AKTIF" },
  { name: "Mary Johnson", role: "User", status: "AKTIF" },
  { name: "Mary Johnson", role: "User", status: "AKTIF" },
  { name: "Mary Johnson", role: "User", status: "AKTIF" },
  { name: "Mary ", role: "User", status: "AKTIF" },
  { name: "Mary ", role: "User", status: "AKTIF" },
  { name: "Mary Johnson", role: "User", status: "AKTIF" },
  { name: "Mary Johnson", role: "User", status: "AKTIF" },
  { name: "Mary Johnson", role: "User", status: "AKTIF" },
  { name: "Mary Johnson", role: "User", status: "AKTIF" },
]);

const rowsPerPage = ref(10);
const currentPage = ref(0);

const paginatedData = computed(() => {
  const start = currentPage.value * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return dataUser.value.slice(start, end);
});

const handleRowsUpdate = (newRows: number) => {
  rowsPerPage.value = newRows;
  currentPage.value = 0;
};

const handlePageUpdate = (newPage: number) => {
  currentPage.value = newPage;
};

const headerFilterRef = ref<typeof HeaderFilter>();
const resetFilter = () => {
  headerFilterRef.value?.resetFilter();
};

const pageType = ref("");
const route = useRoute();

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
        page-type="user"
        :value-search="searchUser"
        @tambah-data="changeSection('Daftar')"
      />
    </template>
    <template #content>
      {{ searchUser }}
      <DataTable
        :value="paginatedData"
        tableStyle="min-width: 50rem"
        stripedRows
        class="text-xs"
        scrollable
        scrollHeight="flex"
      >
        <Column headerClass="bg-adameds-50 font-semibold text-SM">
          <template #header>
            <div class="w-full text-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="name"
          header="Nama User"
          headerClass="bg-adameds-50 font-semibold text-SM"
          class="w-4/12"
        ></Column>
        <Column
          field="role"
          header="Role"
          headerClass="bg-adameds-50 font-semibold text-SM"
          class="w-4/12"
        ></Column>
        <Column
          field="status"
          headerClass="bg-adameds-50 font-semibold text-SM"
        >
          <template #header>
            <div class="w-full text-center">Status</div>
          </template>
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
                customClass="text-xs font-semibold h-5 flex"
              />
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50">
          <template #header="slotProps">
            <div
              class="w-full text-center font-semibold text-SM"
            >
              Action
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton
                label=""
                background-color="bg-[#3D84E5] rounded-lg"
                class="h-6 w-[26px] p-0"
              >
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                class="h-6 w-[26px] p-0"
              >
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
    </template>
    <template #footer>
      <div class="flex justify-between px-5 py-2.5">
        <div class="flex items-center gap-2.5">
          <CustomButton label="Import">
            <img src="@/assets/icons/File Import.svg" alt="" />Import
          </CustomButton>
          <CustomButton label="Eksport">
            <img src="@/assets/icons/File Import.svg" alt="" />Eksport
          </CustomButton>
        </div>
        <CustomPaginator
          :rows="rowsPerPage"
          :totalRecords="dataUser.length"
          :rowsPerPageOptions="[10, 20, 30]"
          @update:rows="handleRowsUpdate"
          @update:current-page="handlePageUpdate"
        />
      </div>
    </template>
  </Card>
  <TambahDataUserPage
    v-else-if="dataBreadCrumb[0].label == 'Daftar'"
    @back="dataBreadCrumb.pop()"
  />
</template>
