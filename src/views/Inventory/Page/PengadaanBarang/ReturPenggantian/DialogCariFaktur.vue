<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";
import { onMounted } from "vue";

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
});

const faktur = ref<any[]>([]);
const selectedFaktur = ref<any[]>([]);

onMounted(() => {
  faktur.value = [
    {
      noPenerimaan: "TRM123456",
      tglPenerimaan: "01-01-2024",
      noFaktur: "FKT1234",
      tglFaktur: "01-01-2024",
      supplier: "PT.Sanbe",
      datas: [
        {
          namaItems: "Paracetamol",
          jumlahBeli: 2,
          hargaSatuan: 1000,
          satuanBeli: "Box/100",
          jumlahPermintaan: 100000,
        },
      ],
    },
    {
      noPenerimaan: "TRM123456",
      tglPenerimaan: "01-01-2024",
      noFaktur: "FKT1234",
      tglFaktur: "01-01-2024",
      supplier: "PT.Kimia Klinik",
    },
  ];
});

const alasan = ref("");

const emit = defineEmits(["update:isDialogVisible", "close", "reject"]);

const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};

const closeDialog = () => {
  emit("update:isDialogVisible", false);
};

const onSubmit = () => {
  // console.log(alasan.value);
  emit("reject", alasan.value);
  alasan.value = "";
  closeDialog();
};
</script>

<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>Faktur Penerimaan </template>
    <template #body>
      <div class="pt-5">
        <div class="flex items-center">
          <div class="flex flex-col justify-center">
            <div class="font-semibold underline text-SM">Lokasi Gudang</div>
            <div class="font-normal text-normal">Gudang Farmasi</div>
          </div>
          <hr class="mt-1 mx-12 min-h-16 border-[1px] border-adameds-300" />
          <div class="flex items-end gap-5">
            <CustomTextfield
              label="Cari No. Faktur"
              placeholder="Cari Berdasarkan No. Faktur"
              class="w-[350px]"
            />
            <CustomDatePicker label="Tgl. Faktur" />
            <div class="flex gap-2.5">
              <CustomButton class="my-auto bg-danger-300" label="Cari" />
              <CustomButton label="Reset" class="my-auto bg-adameds-300" />
            </div>
          </div>
        </div>
        <DataTable
          v-model:selection="selectedFaktur"
          :value="faktur"
          tableStyle="min-width: 50rem"
          scrollable
          scrollHeight="240px"
          :pt="{ headerRow: 'text-SM' }"
        >
          <Column headerClass="bg-adameds-50" class="w-[40px]">
            <template #header>
              <div class="w-full font-semibold text-center text-SM">No.</div>
            </template>
            <template #body="slotProps">
              <div class="w-full text-center text-SM">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>
          <Column field="Nomor" headerClass="bg-adameds-50" class="w-[200px]">
            <template #header>
              <div class="font-semibold">Nomor</div>
            </template>
            <template #body="slotProps">
                <div class="font-semibold underline text-SM">No Penerimaan</div>
                <div class="text-SM">{{ slotProps.data.noPenerimaan }}</div>
                <div class="font-semibold underline text-SM">No Faktur</div>
                <div class="text-SM">{{ slotProps.data.noFaktur }}</div>
            </template>
          </Column>
          <Column field="Tanggal" headerClass="bg-adameds-50"  class="w-[200px]">
            <template #header>
              <div class="font-semibold">Tanggal</div>
            </template>
            <template #body="slotProps">
                <div class="font-semibold underline text-SM">Tgl Penerimaan</div>
                <div class="text-SM">{{ slotProps.data.tglPenerimaan}}</div>
                <div class="font-semibold underline text-SM">Tgl Faktur</div>
                <div class="text-SM">{{ slotProps.data.tglFaktur }}</div>
            </template>
          </Column>
          <Column field="Supplier" headerClass="bg-adameds-50"  class="w-[200px]">
            <template #header>
              <div class="font-semibold">Supplier</div>
            </template>
            <template #body="slotProps">
               
                <div class="text-SM">{{ slotProps.data.supplier}}</div>
              
            </template>
          </Column>
        </DataTable>
        <!-- <div>   </div> UNTUK TABEL -->
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <Paginator
          :rows="10"
          :totalRecords="120"
          :rowsPerPageOptions="[10, 20, 30]"
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{currentPage}"
        >
          <template #start="slotProps">Total Data: 0</template>
        </Paginator>
      </div>
    </template>
  </CustomDialog>
</template>
