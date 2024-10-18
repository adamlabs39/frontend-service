<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import { useUserStore } from "@/stores/user";
import { utilsStore } from "@/stores/utils";
import * as XLSX from "xlsx-js-style";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import TambahDataUserPage from "./TambahDataUser/TambahDataUserPage.vue";
import FooterPaginator from "../Layout/FooterPaginator.vue";
import NoData from "@/components/section/NoData.vue";

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

const userStore = useUserStore();
const UseUtilsStore = utilsStore();
const userPayload = ref<any[]>([]);

// Fetch User Data from API
const fetchUserData = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await userStore.getApi();
    console.log("API Response:", response);

    if (response && response.payload) {
      console.log("Response contains payload:", response.payload);
      userPayload.value = response.payload;
    } else {
      userPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    userPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const hasData = computed(
  () => userPayload.value && userPayload.value.length > 0
);

console.log(userPayload.value);

onMounted(() => {
  fetchUserData();
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
        @tambah-data="changeSection('Daftar')"
        @reload-data="fetchUserData()"
      />
    </template>
    <template #content>
      <NoData v-if="!hasData" />
      <DataTable
        v-else
        :value="userPayload"
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
            <div class="w-full font-semibold text-center text-SM">Action</div>
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
      <FooterPaginator :rows="4" :totalRecords="5" />
    </template>
  </Card>
  <TambahDataUserPage
    v-else-if="dataBreadCrumb[0].label == 'Daftar'"
    @back="dataBreadCrumb.pop()"
  />
</template>
