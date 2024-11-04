<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import { useUserStore } from "@/stores/user";
import { utilsStore } from "@/stores/utils";
import { useRoleStore } from "@/stores/datamaster/role";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import TambahDataUserPage from "./TambahDataUserPage.vue";
import FooterPaginator from "../Layout/FooterPaginator.vue";
import NoData from "@/components/section/NoData.vue";
import DetailUser from "./DetailUser.vue";

//Breadcumb section
const headerFilterRef = ref<typeof HeaderFilter>();
const resetFilter = () => {
  headerFilterRef.value?.resetFilter();
};

const pageType = ref("");
const route = useRoute();
const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (
  label: string,
  mode: string = "add",
  data: any = null
) => {
  let tempData = { label: label, mode: mode, data: data }; 
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = tempData;
  } else {
    dataBreadCrumb.value.push(tempData);
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

// Filter
const searchQuery = ref<string>("");
const selectedRole = ref("");

const handleSearchQuery = (searchValue: string) => {
  searchQuery.value = searchValue;
};
const handleSelectedRole = (selectedValue: any) => {
  selectedRole.value = selectedValue;
};
const handleReset = () => {
  resetForm();
  fetchUserData();
};

const resetFormRef = ref();

const resetForm = () => {
  searchQuery.value = "";
  selectedRole.value = "";
  resetFormRef.value.resetForm();
};

const userStore = useUserStore();
const roleStore = useRoleStore();
const UseUtilsStore = utilsStore();
const userPayload = ref<any[]>([]);
const userProperties = ref({
  page: 0,
  page_size: 10,
  total: 0,
});
const rolePayload = ref<any[]>([]);

// Fetch User Data from API
const fetchUserData = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await userStore.getApi({
      page: userProperties.value.page,
      limit: userProperties.value.page_size,
      name: searchQuery .value,
      role: selectedRole.value || undefined,
    });
    console.log("API Response:", response);

    if (response && response.payload) {
      console.log("Response contains payload:", response.payload);
      userProperties.value.total = response.properties.totalItem;
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

// Handle Page Change
const handlePage = (event: any) => {
  userProperties.value.page = event.page;
  userProperties.value.page_size = event.rows;
  fetchUserData();
};

const fetchRole = async () => {
  try {
    const response = await roleStore.getAktifApi();
    if (response && response.payload) {
      rolePayload.value = response.payload;
    } else {
      rolePayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch role", error);
    rolePayload.value = [];
  }
};

onMounted(() => {
  fetchUserData();
  fetchRole();
});

const hasData = computed(
  () => userPayload.value && userPayload.value.length > 0
);

console.log(userPayload.value);

const metaKey = ref(true);
const selectedData = ref();

const onRowSelect = (event: any) => {
  if (event.data) {
    selectedData.value = event.data;
    changeSection("Detail");
  }
};
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
        @update:valueSearch="handleSearchQuery"
        @update:selectedFilter="handleSelectedRole"
        @search="fetchUserData()"
        @reset="handleReset()"
        @tambah-data="changeSection('Daftar', 'add')"
        @reload-data="fetchUserData()"
        :filterSelect="rolePayload"
        ref="resetFormRef"
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
        @rowSelect="onRowSelect"
        v-model:selection="selectedData"
        :metaKeySelection="metaKey"
        selectionMode="single"
        :dt="{
          rowSelectedColor: '#000000',
          rowSelectedBackground: 'transparent',
          bodyCellSelectedBorderColor: 'transparent',
          bodyCellBorderColor: 'rgba(0, 0, 0, 0)',
          rowStripedBackground: '#F8F8F8',
        }"
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
          field="username"
          header="Nama User"
          headerClass="bg-adameds-50 font-semibold text-SM"
          class="w-4/12"
        ></Column>
        <Column
          field="role.name"
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
                @click="changeSection('Daftar', 'edit', slotProps.data)"
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
      <FooterPaginator
        :rows="userProperties.page_size"
        :totalRecords="userProperties.total"
        @page="handlePage"
      />
    </template>
  </Card>
  <TambahDataUserPage
    v-else-if="dataBreadCrumb[0].label == 'Daftar'"
    @back="dataBreadCrumb.pop()"
    :method="dataBreadCrumb[0].mode"
    :payload="dataBreadCrumb[0].data"
  />
  <DetailUser
    v-else-if="dataBreadCrumb[0].label == 'Detail'"
    @back="dataBreadCrumb.pop()"
    :payload="selectedData"
  />
</template>
