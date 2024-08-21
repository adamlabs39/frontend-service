<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import TambahDataTindakanDialog from "./TambahDataTindakanDialog.vue";
const products = ref<any[]>([]);

const router = useRouter();
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
      kode_tindakan: "PDU",
      nama_tindakan: "Pemeriksaan Dokter Umum",
      snomed_icd: {
        nama_snomed: "snomed-CT",
        nama_tindakan: "Nama Tindakan Snomed-CT",
      },
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      kode_tindakan: "PDU",
      nama_tindakan: "Pemeriksaan Dokter Umum",
      snomed_icd: {
        nama_snomed: "snomed-CT",
        nama_tindakan: "Nama Tindakan Snomed-CT",
      },
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      kode_tindakan: "PDU",
      nama_tindakan: "Pemeriksaan Dokter Umum",
      snomed_icd: {
        nama_snomed: "snomed-CT",
        nama_tindakan: "Nama Tindakan Snomed-CT",
      },
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      kode_tindakan: "PDU",
      nama_tindakan: "Pemeriksaan Dokter Umum",
      snomed_icd: {
        nama_snomed: "snomed-CT",
        nama_tindakan: "Nama Tindakan Snomed-CT",
      },
      status: "AKTIF",
      action: "edit",
    },
  ];
});
const dialogData = ref({
  isVisible: false,
  method: "add",
  title: "Tambah Data",
});

function handleAdd() {
  dialogData.value = {
    isVisible: true,
    method: "add",
    title: "Tambah Data",
  };
}

function handleEdit() {
  dialogData.value = {
    isVisible: true,
    method: "edit",
    title: "Edit Data",
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
      <Header title="Tindakan" :search="false" :filter="false" class="mb-5">
        <template #header>
          <CustomButton label="Data" icon="PhPlus" @click="handleAdd" />
        </template>
        <template #content>
          <div class="flex items-end justify-between gap-5">
            <CustomTextfield
              v-model="searchRoom"
              class="w-1/2"
              label="Cari Tindakan"
              placeholder="Cari Tindakan"
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
          field="kode_tindakan"
          header="Kode Tindakan"
          class="w-2/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="nama_tindakan"
          header="Nama Tindakan"
          class="w-3/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="snomed_icd"
          header="Snome & ICD"
          class="w-3/12"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="underline">
              {{ slotProps.data.snomed_icd.nama_snomed }}
            </div>
            <div class="font-bold">
              {{ slotProps.data.snomed_icd.nama_tindakan }}
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
                customClass="text-xs font-semibold h-5 flex"
              />
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50">
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
                class="h-6 w-[26px] p-0"
              >
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                class="h-6 w-[26px] p-0"
              >
                <img src="@/assets/icons/delete.svg" alt=""/>
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <TambahDataTindakanDialog
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
