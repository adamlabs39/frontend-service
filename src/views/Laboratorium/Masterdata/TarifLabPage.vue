<script setup lang="ts">
import { ref } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import FormTarifLab from "../Layout/FormTarifLab.vue";

const addSpesimenDialog = ref(false);
const rowsPerPage = ref(10);
const currentPage = ref(0);
const status = ref(false);

const handleRowsUpdate = (newRows: number) => {
  rowsPerPage.value = newRows;
  currentPage.value = 0;
};

const handlePageUpdate = (newPage: number) => {
  currentPage.value = newPage;
};

const dataBedruangan = ref([
  { namaRuangan: "Ruangan 1", jumlahBed: "10", status: "AKTIF" },
  { namaRuangan: "Ruangan 2", jumlahBed: "15", status: "AKTIF" },
  { namaRuangan: "Ruangan 3", jumlahBed: "17", status: "AKTIF" },
  { namaRuangan: "Ruangan 4", jumlahBed: "18", status: "AKTIF" },
  { namaRuangan: "Ruangan 5", jumlahBed: "12", status: "NON-AKTIF" },
  { namaRuangan: "Ruangan 6", jumlahBed: "15", status: "NON-AKTIF" },
]);

const isTambahTindakanDialogVisible = ref(false);
const dialogConfig = ref<any>({
  method: "add",
  title: "Tambah Data",
  data: null,
});

const emit = defineEmits(["deleteItem","updated"]);
const FormTindakanDialog = (
  method: string,
  title: string,
  data: any = null
) => {
  dialogConfig.value = { method, title, data };
  isTambahTindakanDialogVisible.value = true;
};
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initial-state="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Datamaster',
                    home: true,
                  }"
                />
                <PhCaretRight
                  :size="25"
                  weight="bold"
                  class="ml-[10px] mt-[8px] text-adameds-300"
                />
                <div class="">
                  <p
                    class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]"
                  >
                    Tarif Lab
                  </p>
                </div>
              </div>
              <CustomButton
                @click="FormTindakanDialog"
                icon="PhPlus"
                label="Tarif"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 mt-[10px]">
              <CustomTextfield
                label="Cari Tarif Lab"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Tarif Lab"
                class=""
              />
            </div>
            <div
              class="flex my-[10px] mt-5 font-semibold text-SM text-grey-300"
            >
              <div class="w-[15%]">Filter Pembayaran</div>
              <div class="flex">
                |
                <CustomChip
                  label="Rawat Jalan"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-50"
                  iconColor="text-adameds-300"
                  textColor="text-adameds-300"
                  customClass="h-5"
                  class="ml-[10px]"
                  selectedColor="bg-adameds-300 border-adameds-300"
                />
                <CustomChip
                  label="Rawat Inap"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-50"
                  iconColor="text-adameds-300"
                  textColor="text-adameds-300"
                  customClass="h-5"
                  class="ml-[10px]"
                  selectedColor="bg-adameds-300 border-adameds-300"
                />
                <CustomChip
                  label="IGD"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-50"
                  iconColor="text-adameds-300"
                  textColor="text-adameds-300"
                  customClass="h-5"
                  class="ml-[10px]"
                  selectedColor="bg-adameds-300 border-adameds-300"
                />
              </div>
            </div>
            <div
              class="flex my-[10px] mt-5 font-semibold text-SM text-grey-300"
            >
              <div class="w-[15%]">Filter Pembayaran</div>
              <div class="flex">
                |
                <CustomChip
                  label="TUNAI"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-50"
                  iconColor="text-adameds-300"
                  textColor="text-adameds-300"
                  customClass="h-5"
                  class="ml-[10px]"
                  selectedColor="bg-adameds-300 border-adameds-300"
                />
                <CustomChip
                  label="ASURANSI"
                  :showCheckedIcon="false"
                  borderColor="border-warning-300"
                  bgColor="bg-warning-50"
                  iconColor="text-warning-300"
                  textColor="text-warning-300"
                  customClass="h-5"
                  class="ml-[10px]"
                  selectedColor="bg-warning-300 border-warning-300"
                />
              </div>
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
      </template>
      <template #content>
        <DataTable
          :value="dataBedruangan"
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
            field="namaTarif"
            header="Nama Tarif"
            headerClass="bg-adameds-50"
            class="w-[25%]"
          >
            <template #body="slotProps">
              <div class="font-semibold text-SM">
                {{ slotProps.data.namaRuangan }}
              </div>
              <div class="mt-2">
                <CustomChip
                  label="TUNAI"
                  :showCheckedIcon="false"
                  selectedColor="bg-adameds-300 border-adameds-300"
                  border-color="border-none"
                  bg-color="bg-adameds-300"
                  customClass=" cursor-auto h-5 bg-adameds-300 text-white pr-2 pl-3"
                />
                <CustomChip
                  label="ASURANSI"
                  :showCheckedIcon="false"
                  selectedColor="bg-warning-300 border-warning-300"
                  border-color="border-none"
                  bg-color="bg-warning-300"
                  customClass=" cursor-auto h-5 bg-adameds-300 text-white pr-2 pl-3 ml-[10px]"
                />
              </div>
            </template>
          </Column>
          <Column
            field="pemeriksaan"
            header="Pemeriksaan"
            headerClass="bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="flex flex-wrap gap-2 text-nowrap">
                <div v-for="items in slotProps.data.pelayanan" :key="items">
                  <CustomChip
                    :label="items.unitPelayananName"
                    :showCheckedIcon="false"
                    border-color="border-none"
                    bg-color="bg-adameds-300"
                    customClass="text-xs font-semibold cursor-auto h-5 bg-adameds-300 text-white pr-2 pl-3"
                  />
                </div>
              </div>
            </template>
          </Column>
          <Column
            field="pelayanan"
            header="Pelayanan"
            headerClass="bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="flex flex-wrap gap-2 text-nowrap">
                <div v-for="items in slotProps.data.pelayanan" :key="items">
                  <CustomChip
                    :label="items.unitPelayananName"
                    :showCheckedIcon="false"
                    border-color="border-none"
                    bg-color="bg-adameds-300"
                    customClass="text-xs font-semibold cursor-auto h-5 bg-adameds-300 text-white pr-2 pl-3"
                  />
                </div>
              </div>
            </template>
          </Column>
          <Column
            field="tarif"
            header="Tarif"
            headerClass="bg-adameds-50"
            class=""
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.namaRuangan }}</div>
            </template>
          </Column>

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
        <div class="flex justify-between px-5 py-2.5">
          <div class="flex items-center gap-2.5">
            <CustomButton label="Import">
              <img src="@/assets/icons/File Import.svg" alt="" />Import
            </CustomButton>
            <CustomButton label="Eksport">
              <img src="@/assets/icons/File Import.svg" alt="" />Eksport
            </CustomButton>
            <CustomButton label="Eksport" @click="">
              <img src="@/assets/icons/download.svg" alt="" />Download
            </CustomButton>
          </div>
          <CustomPaginator
            :rows="rowsPerPage"
            :totalRecords="dataBedruangan.length"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>

   <FormTarifLab
    v-model:isDialogVisible="isTambahTindakanDialogVisible"
    :title="dialogConfig.title"
    :method="dialogConfig.method"
    :payload="dialogConfig.data"
    @data-updated="$emit('updated')"

  />
  </div>
</template>
