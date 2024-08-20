<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const router = useRouter();
const addDataPage = () => {
  router.push({ name: "datamaster-user-tambah-data" });
};
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

const resetFilter = () => {
  searchUser.value = "";
  selectedUser.value = null;
};
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <Header title="User" :filter="false" :search="false" class="mb-5">
        <template #header>
          <CustomButton label="Data" icon="PhPlus" @click="addDataPage" />
        </template>
        <template #content>
          <div class="flex items-end justify-between gap-5">
            <CustomTextfield
              v-model="searchUser"
              class="w-1/2"
              label="Cari User"
              placeholder="Cari Nama User"
              prependIcon="PhMagnifyingGlass"
            />
            <CustomSelect
              class="w-1/2"
              label="Role"
              v-model="selectedUser"
              :options="itemSelectUser"
              optionValue="code"
              optionLabel="name"
            />
            <div class="flex gap-2.5">
              <CustomButton label="Cari" icon="PhMagnifyingGlass" @click="" />
              <CustomButton
                label="Reset"
                @click="resetFilter"
                background-color="bg-white"
                border-color="border-adameds-300"
                text-color="text-adameds-300"
              />
            </div>
          </div>
        </template>
      </Header>
    </template>
    <template #content>
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
            <div class="w-full text-center">
              No.
            </div>
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
          <div class="w-full text-center">
            Status
          </div>
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
        <Column headerClass="bg-adameds-50" >
          <template #header="slotProps">
            <div
              class="flex items-center justify-center w-full font-semibold text-SM"
            >
              Action
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center ">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg" class="h-6 w-[26px] p-0" >
                <img src="@/assets/icons/edit.svg" alt=""  />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                 class="h-6 w-[26px] p-0"
              >
                <img src="@/assets/icons/delete.svg" alt=""  />
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
</template>
