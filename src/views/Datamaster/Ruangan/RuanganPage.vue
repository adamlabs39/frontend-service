<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Footer from "../Layout/FooterPaginator.vue";
import TambahDataRuanganDialog from "./TambahDataRuanganDialog.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
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
  <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto" class="">
    <template #header>
      <HeaderFilter page-type="ruangan" @tambah-data="handleAdd" />

    </template>

    <template #content>
      <DataTable :value="products" tableStyle="min-width: 50rem" stripedRows class="text-xs" scrollable
        scrollHeight="flex">
        <Column headerClass="bg-adameds-50 font-semibold text-SM">
          <template #header>
            <div class="flex items-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column field="kode_ruangan" header="Kode Ruangan" headerClass="bg-adameds-50"></Column>
        <Column field="nama_ruangan" header="Nama Ruangan" headerClass="bg-adameds-50" class="w-3/12"></Column>
        <Column field="no_kamar" headerClass="bg-adameds-50" class="text-center">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">No.Kamar</div>
          </template>
        </Column>

        <Column field="kategori_ruangan" header="Kategori Ruangan" headerClass="bg-adameds-50"></Column>
        <Column field="kelas_ruangan" header="Kelas Ruangan" headerClass="bg-adameds-50"></Column>

        <Column field="status" headerClass="bg-adameds-50">
          <template #header="slotProps">
            <div class="w-full font-semibold text-center text-SM">Status</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              <CustomChip :label="slotProps.data.status" :textColor="slotProps.data.status === 'AKTIF'
                  ? 'text-white'
                  : 'text-[#80868d]'
                " :bgColor="slotProps.data.status === 'AKTIF'
                    ? 'bg-adameds-300'
                    : 'bg-white'
                  " :borderColor="slotProps.data.status === 'AKTIF'
                    ? 'border-none'
                    : 'border-[#80868d]'
                  " :icon-color="slotProps.data.status === 'AKTIF' ? 'white' : '#80868d'
                  " customClass="text-xs font-semibold h-5 flex" />
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50">
          <template #header="slotProps">
            <div class="flex items-center justify-center w-full font-semibold text-SM">
              Action
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg" @click="handleEdit"
                class="h-6 w-[26px] p-0">
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton label="" background-color="bg-danger-300 rounded-lg" class="h-6 w-[26px] p-0">
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <TambahDataRuanganDialog v-model:isDialogVisible="dialogData.isVisible" :title="dialogData.title"
        :method="dialogData.method" @close="handleClose" />
    </template>

    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
