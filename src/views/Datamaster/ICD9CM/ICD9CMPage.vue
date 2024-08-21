<script lang="ts" setup>
import { ref, onMounted, computed, onBeforeMount } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import TambahDataICD9CMDialog from "./TambahDataICD9CMDialog.vue";
import { useIcd9Store } from "@/stores/icd9";
import NoData from "@/components/section/NoData.vue";

const icd9Store = useIcd9Store();
const icd9Response = ref<any[]>([]);
const loading = ref(true);


async function fetchIcd9Data() {
  try {
    const response = await icd9Store.getApi();
    
    // Check if the response and payload exist
    if (response && response.payload) {
      icd9Response.value = response.payload;
    } else {
      console.error("Unexpected response structure", response);
      icd9Response.value = [];
    }
  
  } catch (error) {
    console.error("Failed to fetch data", error);
    icd9Response.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchIcd9Data();
});

const hasData = computed(() => icd9Response.value && icd9Response.value.length > 0);

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
    title: "Tambah Data"
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
  fetchIcd9Data();
}


</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <Header title="ICD 9 CM" :filter="false" class="mb-5">
        <template #header>
          <CustomButton label="Data" icon="PhPlus" @click="handleAdd"/>
        </template>
      </Header>
    </template>
    <template #content>
      <div v-if="loading" class="flex items-center justify-center h-full">
        Loading...
      </div>
      <NoData v-else-if="!hasData" />
      <DataTable
      v-else
        :value="icd9Response"
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
          field="code"
          header="Kode"
          class="w-2/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="name"
          header="Nama ICD 9 CM"
          class="w-3/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="status"
          headerClass="bg-adameds-50 flex items-center justify-center"
        >
        <template #header>
            <div
              class="w-full font-semibold text-center text-SM"
            >
              Statusss
            </div>
          </template>
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
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg" class="h-6 w-[26px] p-0">
                <img src="@/assets/icons/edit.svg" alt=""                 @click="handleEdit(slotProps.data.id)"
                />
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
      <TambahDataICD9CMDialog
      v-model:isDialogVisible="dialogData.isVisible"
        :title="dialogData.title"
        :method="dialogData.method"
        @close="handleClose"/>
    </template>
    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
