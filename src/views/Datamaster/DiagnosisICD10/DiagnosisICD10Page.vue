<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import TambahDataDiagnosisICD10DIalog from "./TambahDataDiagnosisICD10DIalog.vue";
const products = ref<any[]>([]);
const router = useRouter();

onMounted(() => {
  products.value = [
    {
      id: "1",
      kode: "123",
      nama: "Diagnosis 1",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      kode: "123",
      nama: "Diagnosis 2",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      kode: "123",
      nama: "Diagnosis 3",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      kode: "123",
      nama: "Diagnosis 4",
      status: "AKTIF",
      action: "edit",
    },
  ];
});

const dialogData = ref<any>({
  isVisible: false,
  method: "add",
  title: "Tambah Data",
  id: null,
});

function handleAdd() {
  dialogData.value = {
    isVisible: true,
    method: "add",
    title: "Tambah Data",
  };
}

function handleEdit(id:any) {
  dialogData.value = {
    isVisible: true,
    method: "edit",
    title: "Edit Data",
    id: id,
  };
}

function handleClose() {
  dialogData.value.isVisible = false;
}
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <Header title="Diagnosis (ICD 10)" :filter="false" class="mb-5">
        <template #header>
          <CustomButton label="Data" icon="PhPlus" @click="handleAdd" />
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
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="kode"
          header="Kode Diagnosis"
          class="w-2/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="nama"
          header="Nama Diagnosis"
          class="w-3/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="status"
          headerClass="bg-adameds-50"
        >
        <template #header>
          <div class="w-full font-semibold text-center text-SM">
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
                @click="handleEdit(slotProps.data.id)"
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
      <TambahDataDiagnosisICD10DIalog
        v-model:isDialogVisible="dialogData.isVisible"
        :title="dialogData.title"
        :method="dialogData.method"
        :editData="dialogData.editData"
        @close="handleClose"
      />
    </template>
    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
