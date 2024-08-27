<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Footer from "../Layout/Footer.vue";
import TambahDataLoincDialog from "./TambahDataLoincDialog.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import { useLoincStore } from "@/stores/datamaster/loinc";
import NoData from "@/components/section/NoData.vue";

const loincStore=useLoincStore();
const loincResponse = ref<any[]>([]);
const loading=ref(true)

const fetchFaskesData = async () => {
  try {
    const response = await loincStore.getApi();
    loincResponse.value = response.payload || [];

    // Check if the response and payload exist
    if (response && response.payload) {
      loincResponse.value = response.payload;
    } else {
      console.error("Unexpected response structure", response);
      loincResponse.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    loincResponse.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchFaskesData();
});

const hasData = computed(
  () => loincResponse.value && loincResponse.value.length > 0
);

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
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilter page-type="loinc" @tambah-data="handleAdd" />

    </template>

    <template #content>
      <div v-if="loading" class="flex items-center justify-center h-full">
        Loading...
      </div>
      <NoData v-else-if="!hasData" />
      <DataTable
      v-else
        :value="loincResponse"
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
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="name"
          header="Nama Loinc"
          class="w-1/2"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="status"
          headerClass="bg-adameds-50"
        >
        <template #header>
          <div class="w-full text-center font-semibold text-SM">
            Status
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
      <TambahDataLoincDialog
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
