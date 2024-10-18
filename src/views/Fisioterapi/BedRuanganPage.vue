<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const emits = defineEmits(["update:rows", "update:current-page"]);
const rulesDialog = ref(false);
const rowsPerPage = ref(10);
const currentPage = ref(0);

const handleRowsUpdate = (newRows: number) => {
  rowsPerPage.value = newRows;
  currentPage.value = 0;
};

const handlePageUpdate = (newPage: number) => {
  currentPage.value = newPage;
};

const schema = toTypedSchema(
  yup.object({
    bed: yup.string().required("Jumlah bed harus diisi"),
    ruangan: yup.string().required("Nama Ruangan harus diisi"),
    permission: yup.array().of(yup.string().required("Permission harus dipilih")), // Validate that each permission is a string and required
    status: yup.bool(),
  })
);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
});

const [ruangan] = defineField("ruangan");
const [bed] = defineField("bed");
const [status] = defineField("status");

const dataBedruangan = ref([
  { namaRuangan: "Ruangan 1", jumlahBed: "10", status: "AKTIF" },
  { namaRuangan: "Ruangan 2", jumlahBed: "15", status: "AKTIF" },
  { namaRuangan: "Ruangan 3", jumlahBed: "17", status: "AKTIF" },
  { namaRuangan: "Ruangan 4", jumlahBed: "18", status: "AKTIF" },
  { namaRuangan: "Ruangan 5", jumlahBed: "12", status: "NON-AKTIF" },
  { namaRuangan: "Ruangan 6", jumlahBed: "15", status: "NON-AKTIF" },
]);
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-hidden" class="h-full overflow-hidden">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
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
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300" />
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Bed Ruangan</p>
                </div>
              </div>
              <CustomButton @click="rulesDialog = true" icon="PhPlus" label="Bed" class="mr-[10px]" />
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 mt-[10px]">
              <CustomTextfield label="Cari Ruangan" prependIcon="PhMagnifyingGlass" placeholder="Cari Nama Ruangan" class="" />
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton icon="PhCaretUp" backgroundColor="bg-adameds-75" textColor="text-adameds-300" />
          </template>
          <template #expandIcon>
            <CustomButton icon="PhCaretDown" backgroundColor="bg-adameds-75" textColor="text-adameds-300" />
          </template>
        </CustomAccordion>
      </template>
      <template #content>
        <DataTable :value="dataBedruangan" tableStyle="min-width: 50rem" stripedRows class="text-xs" scrollable scrollHeight="flex">
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
          <Column field="namaRuangan" header="Nama Ruangan" headerClass="bg-adameds-50" class="w-[55%]">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.namaRuangan }}</div>
            </template>
          </Column>
          <Column field="jumlahBed" header="Jumlah Bed" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.jumlahBed }} Bed</div>
            </template>
          </Column>
          <Column field="status" headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="w-full text-center">Status</div>
            </template>
            <template #body="slotProps">
              <div class="flex justify-center items-center min-w-[120px]">
                <CustomChip
                  :label="slotProps.data.status"
                  :textColor="slotProps.data.status === 'AKTIF' ? 'text-white' : 'text-[#80868d]'"
                  :bgColor="slotProps.data.status === 'AKTIF' ? 'bg-adameds-300' : 'bg-white'"
                  :borderColor="slotProps.data.status === 'AKTIF' ? 'border-none' : 'border-[#80868d]'"
                  :icon-color="slotProps.data.status === 'AKTIF' ? 'white' : '#80868d'"
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
                <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg" class="h-6 w-[26px] p-0">
                  <img src="@/assets/icons/edit.svg" alt="" />
                </CustomButton>
                <CustomButton label="" background-color="bg-danger-300 rounded-lg" class="h-6 w-[26px] p-0">
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
            <CustomButton label="Import"> <img src="@/assets/icons/File Import.svg" alt="" />Import </CustomButton>
            <CustomButton label="Eksport"> <img src="@/assets/icons/File Import.svg" alt="" />Eksport </CustomButton>
          </div>
          <CustomPaginator :rows="rowsPerPage" :totalRecords="dataBedruangan.length" :rowsPerPageOptions="[10, 20, 30]" @update:rows="handleRowsUpdate" @update:current-page="handlePageUpdate" />
        </div>
      </template>
    </Card>

    <!-- rulesDialog -->
    <CustomDialog v-model:visible="rulesDialog" width="500px">
      <template #header>
        <div class="grid grid-cols-1">
          <p>Tambah Data Bed</p>
        </div>
      </template>
      <template #body>
        <div class="grid grid-cols-[70%,30%]">
          <div class="mt-[20px]">
            <CustomSelect v-model="ruangan" :invalid="!!errors.ruangan" :invalidMessage="errors.ruangan" label="Ruangan" place-holder="Pilih Ruangan Bed" class="mr-2" optionLabel="" optionValue="" />
          </div>
          <div class="mt-[20px]">
            <CustomTextfield v-model="bed" :invalid="!!errors.bed" :invalidMessage="errors.bed" label="Jml. Bed" placeholder="0" class="ml-2" />
          </div>
        </div>

        <hr class="mt-[20px] border border-slate-200" />
        <div class="grid grid-cols-1 mt-[15px]">
          <div>
            <CustomSwitch v-model="status" :show-label="true" label="Status" sideLabel="NON-AKTIF" sideLabelTrue="AKTIF" />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="w-full">
          <!-- <hr class="-mx-5 border-grey-200" /> -->
          <div class="mt-5 flex justify-end gap-2.5">
            <CustomButton label="Reset" textColor="text-grey-300" backgroundColor="bg-transparent" borderColor="border-2 border-grey-200" />
            <CustomButton label="Simpan" />
          </div>
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
