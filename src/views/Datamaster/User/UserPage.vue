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

// Data User (contoh data, bisa disesuaikan)
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
  // Tambahkan data lainnya di sini...
]);

// State untuk pagination
const rowsPerPage = ref(10);
const currentPage = ref(0);

// Menghitung data yang akan ditampilkan berdasarkan pagination
const paginatedData = computed(() => {
  const start = currentPage.value * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return dataUser.value.slice(start, end);
});

// Event handler untuk perubahan pagination
const handleRowsUpdate = (newRows: number) => {
  rowsPerPage.value = newRows;
  currentPage.value = 0; // Reset ke halaman pertama jika rows per page berubah
};

const handlePageUpdate = (newPage: number) => {
  currentPage.value = newPage;
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
                @click=""
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
        :pt="{ headerRow: 'bg-blue-500 text-white' }"
        stripedRows
        class="text-xs"
        scrollable
        scrollHeight="flex"
      >
        <Column header="No." headerClass="bg-adameds-50 font-semibold text-SM">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="name"
          header="Nama User"
          class="w-1/2"
          headerClass="bg-adameds-50 font-semibold text-SM"
        ></Column>
        <Column
          field="role"
          header="Role"
          class="w-1/2"
          headerClass="bg-adameds-50 font-semibold text-SM"
        ></Column>
        <Column
          field="status"
          header="Status"
          headerClass="bg-adameds-50 flex items-center justify-center font-semibold text-SM"
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
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header="slotProps">
            <div
              class="flex items-center justify-center w-full font-semibold text-SM"
            >
              Action
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg">
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
