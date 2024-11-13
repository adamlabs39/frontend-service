<script lang="ts" setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import NoData from "@/components/section/NoData.vue";
import SuratControlRawatJalan from "./SuratControlRawatJalan.vue";
import SuratPermohonanRawatInap from "./SuratPermohonanRawatInap.vue";
import SuratKeteranganSakit from "./SuratKeteranganSakit.vue";
import SuratKeteranganSehat from "./SuratKeteranganSehat.vue";
import SuratRujukan from "./SuratRujukan.vue";
import SuratKeteranganMeninggal from "./SuratKeteranganMeninggal.vue";
import SuratResepKacamata from "./SuratResepKacamata.vue";

// Schema validasi menggunakan yup
const schema = toTypedSchema(
  yup.object({
    datas: yup.array().of(
      yup.object({
        namaSurat: yup.string().required("Nama surat harus diisi"),
        dataSurat: yup.object().default({}),
      })
    ),
  })
);

// Inisialisasi form dengan vee-validate
const { errors, handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
});

// Field array untuk "datas"
const { remove, push, fields, update } = useFieldArray("datas");

// Fungsi submit
const onSubmit = handleSubmit((values: any) => {
  console.log("Semua data:", values);
});

// Data array untuk ListSurat dan item Surat
const buatSurat = ref(false);
const tipePeriksa = ref();
const selectedSurat = ref<any[]>([]);
const cariSurat = ref("");
const itemsSurat = ref([
  { name: "Surat Kontrol Rawat Jalan" },
  { name: "Surat Permohonan Rawat Inap (SPRI)" },
  { name: "Surat Keterangan Sakit" },
  { name: "Surat Keterangan Sehat" },
  { name: "Surat Rujukan" },
  { name: "Surat Keterangan Meninggal" },
  { name: "Surat Resep Kacamata" },
]);

// Set data awal form saat mount
onBeforeMount(() => {
  setValues({
    datas: [
      { namaSurat: "Surat Kontrol Rawat Jalan", dataSurat: {} },
      { namaSurat: "Surat Kontrol Rawat Jalan", dataSurat: {} },
    ],
  });
});

// Fungsi untuk menambahkan item surat ke selectedSurat
const addToSelectedItems = (item: string) => {
  const selectedItemSurat = itemsSurat.value.find(
    (surat) => surat.name === item
  );
  if (selectedItemSurat) {
    selectedSurat.value.push({
      namaSurat: selectedItemSurat.name,
      dataSurat: {},
    });
    cariSurat.value = "";
  }
};

// Fungsi untuk menghapus item surat dari selectedSurat
const removeFromSelectedItems = (index: number) => {
  selectedSurat.value.splice(index, 1);
};

// Watcher untuk mereset `selectedSurat` dan `cariSurat` saat modal ditutup
watch(buatSurat, (newValue) => {
  if (!newValue) {
    cariSurat.value = "";
    selectedSurat.value = [];
  }
});

// Fungsi reset form, termasuk selectedSurat dan cariSurat
const resetData = () => {
  resetForm({
    values: {
      datas: [], // Reset `datas` dengan array kosong atau data default
    },
  });
  selectedSurat.value = []; // Reset `selectedSurat`
  cariSurat.value = ""; // Reset `cariSurat`
};



const handleRef = ref<any[]>([]);

// Fungsi untuk submit semua form anak-anak
const submitChildForm = () => {
  handleRef.value.forEach((comp: any, index: number) => {
    if (comp && comp.submitForm) {
      comp.submitForm();
    }
  });

  // Simpan dataSurat dari setiap form anak
  handleRef.value.forEach((comp: any, index: number) => {
    if (comp && comp.localDataSurat) {
      selectedSurat.value[index].dataSurat = comp.localDataSurat.value;
    }
  });

  console.log("selected:", selectedSurat.value);
};

const updateSuratData = (index: number, dataSurat: any) => {
  selectedSurat.value[index].dataSurat = dataSurat;
  console.log("data:", dataSurat);
  console.log("selected:", selectedSurat.value);
  // console.log(nonProxyData);
  selectedSurat.value.forEach((item) => {
    push(item);
  });
  selectedSurat.value = [];
  buatSurat.value = false;
  const dataFormSurat = JSON.parse(JSON.stringify(fields));
  console.log("fields",fields);
  
};
const accordion = ref<HTMLCanvasElement | null>(null);
const open = () => {
  if (accordion.value) {
    (accordion.value as any).open();
  }
};
const close = () => {
  if (accordion.value) {
    (accordion.value as any).close();
  }
};

defineExpose({
  open,
  close,
});
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" ref="accordion">
    <template #header>List Surat Keterangan</template>
    <template #content>
      <DataTable
        :value="fields"
        stripedRows
        class="pt-5 text-xs"
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
          field="value.namaSurat"
          header="Nama Surat"
          headerClass="bg-adameds-50"
          class="w-full"
        >
        </Column>
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div
              class="flex items-center justify-center w-full font-semibold text-SM"
            >
              Status
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton
                background-color="bg-adameds-300 rounded-lg"
                class="h-6"
              >
                <div class="flex items-center gap-1">
                  <PhPrinter :size="18" color="#ffffff" weight="fill" />
                  <div class="text-SM">Cetak</div>
                </div>
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                class="h-6 w-[26px] p-0"
                @click="() => remove(slotProps.index)"
              >
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <div
        class="flex items-center justify-center p-5 m-5 border border-dashed rounded-lg border-adameds-300 gap-2.5"
      >
        <CustomButton
          icon="PhPlus"
          label="Buat Surat"
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          backgroundColor="bg-white"
          @click="buatSurat = true"
        />
      </div>
      <CustomDialog
        width="1000px"
        class=""
        v-model:visible="buatSurat"
        headerBg="bg-adameds-300"
      >
        <template #header>Buat Surat</template>
        <template #body>
          <div class="flex flex-col gap-5 mt-5 overflow-hidden h-full">
            <div class="flex items-end w-full gap-5">
              <CustomSelect
                label="Cari Surat"
                v-model="cariSurat"
                :options="itemsSurat"
                option-label="name"
                option-value="name"
                place-holder="Cari & Pilih Surat"
                class="grow"
              />
              <CustomButton
                label="Buat"
                icon="PhPlus"
                @click="addToSelectedItems(cariSurat)"
              />
            </div>

            <div class="flex flex-col gap-5 overflow-y-auto h-[40vh]">
              <NoData
                v-if="selectedSurat.length === 0"
                title="Silahkan Pilih Surat Terlebih Dahulu"
              />

              <div v-for="(surat, index) in selectedSurat" :key="index">
                <!-- Surat Control Rawat Jalan -->
                <SuratControlRawatJalan
                  v-if="surat.namaSurat === 'Surat Kontrol Rawat Jalan'"
                  @onDelete="() => removeFromSelectedItems(index)"
                  @update:dataSurat="(data) => updateSuratData(index, data)"
                  ref="handleRef"
                  :attr="index"
                />
                <!-- Surat Permohonan Rawat Inap (SPRI) -->
                <SuratPermohonanRawatInap
                  v-if="
                    surat.namaSurat === 'Surat Permohonan Rawat Inap (SPRI)'
                  "
                  @onDelete="() => removeFromSelectedItems(index)"
                  @update:dataSurat="(data) => updateSuratData(index, data)"
                  ref="handleRef"
                  :attr="index"
                />
                <!-- Surat Keterangan Sakit -->
                <SuratKeteranganSakit
                  v-if="surat.namaSurat === 'Surat Keterangan Sakit'"
                  @onDelete="() => removeFromSelectedItems(index)"
                  @update:dataSurat="(data) => updateSuratData(index, data)"
                  ref="handleRef"
                  :attr="index"
                />
                <!-- Surat Keterangan Sehat -->
                <SuratKeteranganSehat
                  v-if="surat.namaSurat === 'Surat Keterangan Sehat'"
                  @onDelete="() => removeFromSelectedItems(index)"
                  @update:dataSurat="(data) => updateSuratData(index, data)"
                  ref="handleRef"
                  :attr="index"
                />
                <!-- Surat Rujukan -->
                <SuratRujukan
                  v-if="surat.namaSurat === 'Surat Rujukan'"
                  @onDelete="() => removeFromSelectedItems(index)"
                  @update:dataSurat="(data) => updateSuratData(index, data)"
                  ref="handleRef"
                  :attr="index"
                />
                <!-- Surat Keterangan Meninggal -->
                <SuratKeteranganMeninggal
                  v-if="surat.namaSurat === 'Surat Keterangan Meninggal'"
                  @onDelete="() => removeFromSelectedItems(index)"
                  @update:dataSurat="(data) => updateSuratData(index, data)"
                  ref="handleRef"
                  :attr="index"
                />
                <!-- Surat Resep Kacamata -->
                <SuratResepKacamata
                  v-if="surat.namaSurat === 'Surat Resep Kacamata'"
                  @onDelete="() => removeFromSelectedItems(index)"
                  @update:dataSurat="(data) => updateSuratData(index, data)"
                  ref="handleRef"
                  :attr="index"
                />
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="w-full">
            <div class="mt-5 flex justify-end gap-2.5">
              <CustomButton
                label="Batal"
                borderColor="border-2 border-[#9DA4B1]"
                background-color="bg-white"
                text-color="text-grey-300"
                @click="buatSurat = false"
              />
              <CustomButton label="Simpan" @click="submitChildForm" />
            </div>
          </div>
        </template>
      </CustomDialog>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          @click="resetData"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton label="Simpan" @click="onSubmit" />
      </div>
    </template>
  </CustomAccordion>
</template>
