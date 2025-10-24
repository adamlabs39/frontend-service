<script lang="ts" setup>
import { ref, onBeforeMount, computed, watch, onBeforeUpdate } from "vue";
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
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";
const rekamMedisStore = useRekamMedisStore();

// Schema validasi menggunakan yup
const schema = toTypedSchema(
  yup.object({
    datas: yup.array().of(
      yup.object({
        file_uuid: yup.string(),
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

const onSubmit = handleSubmit(async (values) => {
  const allSuratData = values.datas;

  if (!allSuratData || allSuratData.length === 0) {
    alert("Tidak ada surat untuk disimpan.");
    return;
  }
  const rekamMedisUuid = rekamMedisStore.openedRekamMedis?.rekam_medisUuid;
  if (!rekamMedisUuid) {
    alert("Error: rekam_medis_uuid tidak ditemukan.");
    return;
  }
  const apiPayloads = allSuratData.map((surat: any) => {
    const suratInfo = itemsSurat.value.find(item => item.name === surat.namaSurat);
    
    return {
      rekam_medis_uuid: rekamMedisUuid,
      file: surat.dataSurat, 
      file_type: suratInfo?.type, 
      file_format: "json",
      admission_type: "rj",
      nomor_surat: surat.dataSurat.noSurat,
    };
  });

  try {
    const promises = apiPayloads.map(payload => rekamMedisStore.createFiles(payload));
    await Promise.all(promises);

    alert("Semua surat berhasil disimpan!");
    resetData();

  } catch (error) {
    console.error("Gagal menyimpan satu atau lebih surat:", error);
    alert("Terjadi kesalahan saat menyimpan surat. Silakan coba lagi.");
  }
});

// Data array untuk ListSurat dan item Surat
const buatSurat = ref(false);
const tipePeriksa = ref();
const selectedSurat = ref<any[]>([]);
const cariSurat = ref("");
const itemsSurat = ref([
  { name: "Surat Kontrol Rawat Jalan", type: "surat_kontrol_rawat_jalan" },
  { name: "Surat Permohonan Rawat Inap (SPRI)", type: "surat_permohonan_rawat_inap" },
  { name: "Surat Keterangan Sakit", type: "surat_keterangan_sakit" },
  { name: "Surat Keterangan Sehat", type: "surat_keterangan_sehat" },
  { name: "Surat Rujukan", type: "surat_rujuk_keluar_faskes" },
  { name: "Surat Keterangan Meninggal", type: "surat_keterangan_meninggal" },
  { name: "Surat Resep Kacamata", type: "resep_kacamata" },
]);

onBeforeMount(() => {
  loadSuratFromServer();
});

const loadSuratFromServer = async () => {
  try {
    const rekamMedisUuid = rekamMedisStore.openedRekamMedis?.meta?.rekamMedisUuid;
    if (!rekamMedisUuid) {
      console.error("Gagal memuat surat: rekamMedisUuid tidak ditemukan.");
      return;
    }

    const response = await rekamMedisStore.getSurat({ rekamMedisUuid });
    const suratFromServer = response.payload; 

    if (!Array.isArray(suratFromServer)) {
        console.error("Data yang diterima dari server bukan array:", suratFromServer);
        setValues({ datas: [] });
        return;
    }

    const formattedData = suratFromServer.map((surat: any) => {
      const suratInfo = itemsSurat.value.find(item => item.type === surat.fileType);
      
      return {
        file_uuid: surat.uuid, 
        namaSurat: suratInfo ? suratInfo.name : 'Surat Tidak Dikenali',
        dataSurat: typeof surat.file === 'string' ? JSON.parse(surat.file) : surat.file,
      };
    });

    setValues({
      datas: formattedData,
    });

  } catch (error) {
    console.error("Gagal memuat data surat dari server:", error);
    setValues({ datas: [] });
  }
};

const addToSelectedItems = async (itemName: string) => {
  if (!itemName) return;
  const selectedItemSurat = itemsSurat.value.find((s) => s.name === itemName);

  if (selectedItemSurat && selectedItemSurat.type) {
    try {
      const response = await rekamMedisStore.GenerateNS({ type: selectedItemSurat.type });


      const nomorSurat = response?.payload?.data;

      if (!nomorSurat) {
        console.error("API Error: 'nomorSurat' tidak ditemukan di response.data.", response);
        return;
      }
      
      selectedSurat.value.push({
        namaSurat: selectedItemSurat.name,
        nomorSurat: nomorSurat,
        dataSurat: { noSurat: nomorSurat },
      });

      cariSurat.value = "";

    } catch (error) {
      console.error("Gagal men-generate nomor surat (error di blok catch):", error);
    }
  }
};

const removeFromSelectedItems = (index: number) => {
  selectedSurat.value.splice(index, 1);
};

const handleDeleteSurat = async (index: number) => {
  const suratToDelete = fields.value[index].value as { file_uuid: string };
  const fileUuid = suratToDelete.file_uuid;

  if (!fileUuid) {
    console.warn("file_uuid tidak ditemukan. Menghapus dari UI saja.");
    remove(index);
    return;
  }

  try {
    await rekamMedisStore.deleteFiles({ file_uuid: fileUuid });
    remove(index);
  } catch (error) {
    console.error(`Gagal menghapus file dengan UUID ${fileUuid}:`, error);
  }
};


watch(buatSurat, (newValue) => {
  if (!newValue) {
    cariSurat.value = "";
    selectedSurat.value = [];
    handleRef.value = [];
  }
});

const resetData = () => {
  resetForm({
    values: {
      datas: [],
    },
  });
  selectedSurat.value = [];
  cariSurat.value = "";
};



const handleRef = ref<any[]>([]);


const submitChildForm = async () => {
  try {
    const submissionPromises = handleRef.value.map(comp => {
      if (comp && comp.submitForm) {
        return comp.submitForm();
      }
      return Promise.resolve(null);
    });

    const allFormsData = (await Promise.all(submissionPromises)).filter(data => data !== null);

    const uniqueFormsData = Array.from(new Map(allFormsData.map(item => [item.noSurat, item])).values());

    const rekamMedisUuid = rekamMedisStore.openedRekamMedis?.meta?.rekamMedisUuid;
    if (!rekamMedisUuid) {
      alert("Error: rekamMedisUuid tidak ditemukan.");
      return;
    }

    const apiPayloads = uniqueFormsData.map((formData: any) => {
      const originalSurat = selectedSurat.value.find(s => s.nomorSurat === formData.noSurat);
      const suratInfo = itemsSurat.value.find(item => item.name === originalSurat?.namaSurat);

      return {
        rekamMedisUuid: rekamMedisUuid,
        file: JSON.stringify(formData),
        fileType: suratInfo?.type,
        fileFormat: "json",
        admissionType: "rj",
        nomorSurat: formData.noSurat,
      };
    });

    if (apiPayloads.length === 0 && handleRef.value.length > 0) {
       throw new Error("Gagal membentuk payload, data surat tidak cocok.");
    }

    if (apiPayloads.length === 0) {
      alert("Tidak ada surat baru untuk disimpan.");
      return;
    }
    console.log("Payload FINAL (Setelah De-duplikasi) yang dikirim:", apiPayloads);
    const promises = apiPayloads.map(payload => rekamMedisStore.createFiles(payload));
    await Promise.all(promises);

    alert("Surat baru berhasil disimpan!");

    uniqueFormsData.forEach((formData: any) => {
      const originalSurat = selectedSurat.value.find(s => s.nomorSurat === formData.noSurat);
      if (originalSurat) {
        push({
          namaSurat: originalSurat.namaSurat,
          dataSurat: formData,
        });
      }
    });
    
    buatSurat.value = false;

  } catch (error) {
    console.error("Gagal menyimpan surat:", error);
    alert("Proses simpan gagal. Harap pastikan semua field yang wajib diisi sudah benar.");
  }
};

const updateSuratData = (index: number, dataFromChild: any) => {
  if (selectedSurat.value[index]) {
    selectedSurat.value[index].dataSurat = dataFromChild;
  }
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

const setItemRef = (el: any) => {
  if (el) {
    handleRef.value.push(el);
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
                @click="handleDeleteSurat(slotProps.index)"
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
                  <SuratControlRawatJalan
                    v-if="surat.namaSurat === 'Surat Kontrol Rawat Jalan'"
                    :nomor-surat="surat.nomorSurat" @onDelete="() => removeFromSelectedItems(index)"
                    @update:dataSurat="(data) => updateSuratData(index, data)"
                    :ref="setItemRef" :attr="index"
                  />
                  <SuratPermohonanRawatInap
                    v-if="surat.namaSurat === 'Surat Permohonan Rawat Inap (SPRI)'"
                    :nomor-surat="surat.nomorSurat" @onDelete="() => removeFromSelectedItems(index)"
                    @update:dataSurat="(data) => updateSuratData(index, data)"
                    :ref="setItemRef" :attr="index"
                  />
                  <SuratKeteranganSakit
                    v-if="surat.namaSurat === 'Surat Keterangan Sakit'"
                    :nomor-surat="surat.nomorSurat" @onDelete="() => removeFromSelectedItems(index)"
                    @update:dataSurat="(data) => updateSuratData(index, data)"
                    :ref="setItemRef" :attr="index"
                  />
                  <SuratKeteranganSehat
                    v-if="surat.namaSurat === 'Surat Keterangan Sehat'"
                    :nomor-surat="surat.nomorSurat" @onDelete="() => removeFromSelectedItems(index)"
                    @update:dataSurat="(data) => updateSuratData(index, data)"
                    :ref="setItemRef" :attr="index"
                  />
                  <SuratRujukan
                    v-if="surat.namaSurat === 'Surat Rujukan'"
                    :nomor-surat="surat.nomorSurat" @onDelete="() => removeFromSelectedItems(index)"
                    @update:dataSurat="(data) => updateSuratData(index, data)"
                    :ref="setItemRef" :attr="index"
                  />
                  <SuratKeteranganMeninggal
                    v-if="surat.namaSurat === 'Surat Keterangan Meninggal'"
                    :nomor-surat="surat.nomorSurat" @onDelete="() => removeFromSelectedItems(index)"
                    @update:dataSurat="(data) => updateSuratData(index, data)"
                    :ref="setItemRef" :attr="index"
                  />
                  <SuratResepKacamata
                    v-if="surat.namaSurat === 'Surat Resep Kacamata'"
                    :nomor-surat="surat.nomorSurat" @onDelete="() => removeFromSelectedItems(index)"
                    @update:dataSurat="(data) => updateSuratData(index, data)"
                    :ref="setItemRef" :attr="index"
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