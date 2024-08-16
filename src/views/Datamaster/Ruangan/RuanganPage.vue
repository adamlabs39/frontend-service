<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import TambahDataRuanganDialog from "./TambahDataRuanganDialog.vue";
const products = ref<any[]>([]);
const searchRoom = ref<any>();
const selectedKategori = ref<any>();
const selectedKelas = ref<any>();
const itemKategori = ref([
  { name: "Dokter", code: "DK" },
  { name: "Admin", code: "AD" },
  { name: "Perawat", code: "PR" },
]);
const itemKelas = ref([
  { name: "Dokter", code: "DK" },
  { name: "Admin", code: "AD" },
  { name: "Perawat", code: "PR" },
]);
onMounted(() => {
  products.value = [
    {
      id: "1",
      kode_ruangan: "MWR",
      nama_ruangan: "Mawar",
      no_kamar: "1 A",
      kategori_ruangan: "Rawat Umum",
      kelas_ruangan: "Kelas III",
      jml_bed: "4",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      kode_ruangan: "MWR",
      nama_ruangan: "Mawar",
      no_kamar: "1 A",
      kategori_ruangan: "Rawat Umum",
      kelas_ruangan: "Kelas III",
      jml_bed: "4",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      kode_ruangan: "MWR",
      nama_ruangan: "Mawar",
      no_kamar: "1 A",
      kategori_ruangan: "Rawat Umum",
      kelas_ruangan: "Kelas III",
      jml_bed: "4",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      kode_ruangan: "MWR",
      nama_ruangan: "Mawar",
      no_kamar: "1 A",
      kategori_ruangan: "Rawat Umum",
      kelas_ruangan: "Kelas III",
      jml_bed: "4",
      status: "AKTIF",
      action: "edit",
    },
  ];
});

const dialogData = ref({
  isVisible: false,
  method: "add",
  title: "Tambah Data"
});

function handleAdd() {
  dialogData.value = {
    isVisible: true,
    method: "add",
    title: "Tambah Data"
  };
}

function handleEdit() {
  dialogData.value = {
    isVisible: true,
    method: "edit",
    title: "Edit Data"
  };
}

function handleClose() {
  dialogData.value.isVisible = false;
}

const resetFilter = () => {
  searchRoom.value = "";
  selectedKategori.value = null;
  selectedKelas.value = null;
};
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <Header title="Ruangan" :search="false" :filter="false" class="mb-5">
        <template #header>
          <CustomButton label="Data" icon="PhPlus" @click="handleAdd" />
        </template>
        <template #content>
          <div class="flex items-end justify-between gap-5">
            <CustomTextfield
              v-model="searchRoom"
              class="w-1/2"
              label="Cari Ruangan"
              placeholder="Cari Ruangan"
              prependIcon="PhMagnifyingGlass"
            />
            <CustomSelect
              v-model="selectedKategori"
              :options="itemKategori"
              optionValue="code"
              optionLabel="name"
              class="w-1/4"
              :is-loading="false"
              label="Kategori"
              place-holder="Kategori"
            />
            <CustomSelect
              v-model="selectedKelas"
              :options="itemKelas"
              optionValue="code"
              optionLabel="name"
              class="w-1/4"
              :is-loading="false"
              label="Kelas"
              place-holder="Kelas"
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
        :value="products"
        tableStyle="min-width: 50rem"
        :pt="{ headerRow: 'bg-blue-500 text-white' }"
        stripedRows
        class="text-xs"
        scrollable
        scrollHeight="flex"
      >
        <Column header="No." headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="kode_ruangan"
          header="Kode Ruangan"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="nama_ruangan"
          header="Nama Ruangan"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="no_kamar"
          headerClass="bg-adameds-50"
          class="text-center"
        >
          <template #header>
            <div class="w-full font-semibold text-center text-SM">No.Kamar</div>
          </template></Column
        >

        <Column
          field="kategori_ruangan"
          header="Kategori Ruangan"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="kelas_ruangan"
          header="Kelas Ruangan"
          headerClass="bg-adameds-50"
        ></Column>
        
        <Column field="status" headerClass="bg-adameds-50">
          <template #header="slotProps">
            <div class="w-full font-semibold text-center text-SM">Action</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
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
      </DataTable>
      <TambahDataRuanganDialog
        v-model:isDialogVisible="dialogData.isVisible"
        :title="dialogData.title"
        :method="dialogData.method"
        @close="handleClose"
      />
    </template>

    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
