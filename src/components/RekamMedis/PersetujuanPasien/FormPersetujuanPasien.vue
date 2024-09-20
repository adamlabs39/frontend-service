<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const currentMethod = ref(props.method);

const dokterPelaksanas = ref([
  { id: 1, value: "AdamLABS" },
  { id: 2, value: "AdamMEDS" },
  { id: 3, value: "AdamMEDSPRO" },
]);

const pemberiInformasis = ref([
  { id: 1, value: "Teman" },
  { id: 2, value: "Sosial Media" },
  { id: 3, value: "Keluarga" },
]);

const genders = ref([
  { id: 1, value: "Laki-Laki" },
  { id: 2, value: "Perempuan" },
]);

const hubunganKeluargas = ref([
  { id: 1, value: "Suami" },
  { id: 2, value: "Kakak" },
  { id: 3, value: "Adik " },
  { id: 4, value: "Istri" },
]);
const schema = yup.object({
  dokterPelaksana: yup.number(),
  pemberiInformasi: yup.string(),
  penerima: yup.string(),
  namaKeluarga: yup.string(),
  gender: yup.string(),
  hubunganKeluarga: yup.string(),
  noHp: yup.string(),
  alamat: yup.string(),
  diagnosis: yup.string(),
  dasarDiagnosis: yup.string(),
  tindakanKedokteran: yup.string(),
  indikasiTindakan: yup.string(),
  risikoTindakan: yup.string(),
  komplikasi: yup.string(),
  prognosis: yup.string(),
  alternatifRisiko: yup.string(),
  lainLain: yup.string(),
  persetujuan: yup.string(),
  tglPersetujuan: yup.date(),
  saksi1: yup.string(),
  saksi2: yup.string(),
});

const { handleSubmit, resetForm, defineField } = useForm({
  validationSchema: schema,
});

const [dokterPelaksana] = defineField("dokterPelaksana");
const [pemberiInformasi] = defineField("pemberiInformasi");
const [penerima] = defineField("penerima");
const [namaKeluarga] = defineField("namaKeluarga");
const [gender] = defineField("gender");
const [hubunganKeluarga] = defineField("hubunganKeluarga");
const [noHp] = defineField("noHp");
const [alamat] = defineField("alamat");
const [diagnosis] = defineField("diagnosis");
const [dasarDiagnosis] = defineField("dasarDiagnosis");
const [tindakanKedokteran] = defineField("tindakanKedokteran");
const [indikasiTindakan] = defineField("indikasiTindakan");
const [risikoTindakan] = defineField("risikoTindakan");
const [komplikasi] = defineField("komplikasi");
const [prognosis] = defineField("prognosis");
const [alternatifRisiko] = defineField("alternatifRisiko");
const [lainLain] = defineField("lainLain");
const [persetujuan] = defineField("persetujuan");
const [tglPersetujuan] = defineField("tglPersetujuan");
const [saksi1] = defineField("saksi1");
const [saksi2] = defineField("saksi2");

const onSubmit = handleSubmit((values) => {
  console.log("Submitted with", values);
  currentMethod.value = "detail";
});

const onEditClick = () => {
  currentMethod.value = "form";
};

const listPersetujuanPasien = ref([
  { id: 1, value: "Surat Persetujuan", action: "Lihat" },
  { id: 2, value: "Surat Persetujuan", action: "Lihat" },
]);

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
  <CustomAccordion headerClass="bg-adameds-50" v-if="currentMethod === 'form'" ref="accordion">
    <template #header>Persetujuan Pasien</template>
    <template #content>
      <div class="flex flex-col gap-5 p-5">
        <div class="grid grid-cols-2 gap-[30px]">
          <div>
            <CustomSelect
              label="Dokter Pelaksana Tindakan"
              v-model:model-value="dokterPelaksana"
              placeHolder="Pilih Dokter Pelaksana Tindakan"
              :options="dokterPelaksanas"
              optionValue="id"
              optionLabel="value"
              :isLoading="false"
              customSelectClass="border-[#C7CBD2]"
            >
            </CustomSelect>
          </div>
          <div>
            <CustomSelect
              label="Pemberi Informasi"
              v-model:model-value="pemberiInformasi"
              placeHolder="Pilih Pemberi Informasi"
              :options="pemberiInformasis"
              optionValue="id"
              optionLabel="value"
              :isLoading="false"
              customSelectClass="border-[#C7CBD2]"
            />
          </div>
        </div>
        <!-- <hr class="my-6 border-gray-200 border-1" /> -->
        <div class="flex gap-[30px] items-center">
          <div class="min-w-[300px]">
            <label class="font-semibold text-normal">Penerima Informasi</label>
            <div class="flex gap-5">
              <CustomRadio
                v-model="penerima"
                value="pasien"
                sideLabel="Pasien"
              />
              <CustomRadio
                v-model="penerima"
                value="keluarga"
                sideLabel="Keluarga / Wali"
                label=""
              />
            </div>
          </div>
          <div class="grow">
            <CustomTextfield
              label="Nama keluarga / Wali"
              placeHolder="Nama Keluarga / Wali"
              v-model:model-value="namaKeluarga"
            />
          </div>
          <div class="w-[200px]">
            <CustomSelect
              label="Jenis Kelamin"
              placeHolder="Pilih Jenis Kelamin"
              v-model:model-value="gender"
              :options="genders"
              optionValue="id"
              optionLabel="value"
              :isLoading="false"
            />
          </div>
          <div class="grow">
            <CustomSelect
              label="Hubungan dengan Keluarga"
              v-model:model-value="hubunganKeluarga"
              placeHolder="Pilih Hubungan dengan Keluarga"
              :options="hubunganKeluargas"
              optionValue="id"
              optionLabel="value"
              :isLoading="false"
            />
          </div>
        </div>
        <div class="flex gap-[30px]">
          <div class="w-[300px]">
            <CustomTextfield
              label="No. Handphone"
              class="w-full"
              placeholder="08xx-xxxx-xxxx"
              v-model="noHp"
              type="number"
            />
          </div>
          <div class="grow">
            <CustomTextfield
              label="Alamat"
              placeholder="Alamat"
              v-model:model-value="alamat"
              :isLoading="false"
              :disabled="false"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-[30px]">
          <div>
            <CustomTextArea
              label="Diagnosis (WD & DD)"
              placeholder="Diagnosis (WD & DD)"
              v-model:model-value="diagnosis"
            />
          </div>
          <div>
            <CustomTextArea
              label="Dasar Diagnosis"
              placeholder="Dasar Diagnosis"
              v-model:model-value="dasarDiagnosis"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-[30px]">
          <div>
            <CustomTextArea
              label="Tindakan Kedokteran"
              placeholder="Tindakan Kedokteran"
              v-model:model-value="tindakanKedokteran"
            />
          </div>
          <div>
            <CustomTextArea
              label="Indikasi Tindakan"
              placeholder="Indikasi Tindakan"
              v-model:model-value="indikasiTindakan"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-[30px]">
          <div>
            <CustomTextArea
              label="Risiko Tindakan"
              placeholder="Risiko Tindakan"
              v-model:model-value="risikoTindakan"
            />
          </div>
          <div>
            <CustomTextArea
              label="Komplikasi"
              placeholder="Komplikasi"
              v-model:model-value="komplikasi"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-[30px]">
          <div>
            <CustomTextArea
              label="Prognosis"
              placeholder="Prognosis"
              v-model:model-value="prognosis"
            />
          </div>
          <div>
            <CustomTextArea
              label="Alternatif & Risiko"
              placeholder="Alternatif & Risiko"
              v-model:model-value="alternatifRisiko"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-[30px]">
          <div>
            <CustomTextArea
              label="Lain-lain"
              placeholder="Lain-lain"
              v-model:model-value="lainLain"
            />
          </div>
        </div>
        <div class="flex gap-[30px] items-center">
          <div class="min-w-[300px]">
            <label class="font-semibold text-normal"
              >Persetujuan Tindakan Kedokteran</label
            >
            <div class="flex gap-5">
              <CustomRadio
                v-model="persetujuan"
                value="Setuju"
                sideLabel="Setuju"
                label=""
              />
              <CustomRadio
                v-model="persetujuan"
                value="Tidak Setuju"
                sideLabel="Tidak Setuju"
                label=""
              />
            </div>
          </div>
          <div class="grow">
            <CustomDatePicker
              label="Tanggal Persetujuan"
              v-model="tglPersetujuan"
              place-holder="Masukkan Tangggal"
            />
          </div>
          <div class="w-[200px]">
            <CustomTextfield
              label="Nama Saksi 1"
              placeholder="Nama Saksi 1"
              v-model:model-value="saksi1"
            />
          </div>
          <div class="grow">
            <CustomTextfield
              label="Nama Saksi 2"
              placeholder="Nama Saksi 2"
              v-model:model-value="saksi2"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="currentMethod == 'form'"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
          @click="resetForm"
        />
        <CustomButton
          v-if="currentMethod == 'form'"
          label="Simpan"
          @click="onSubmit"
        />
      </div>
    </template>
  </CustomAccordion>

  <CustomAccordion v-else headerClass="bg-adameds-50">
    <template #header>Inform Consent</template>
    <template #content>
      <div class="pt-5">
        <DataTable :value="listPersetujuanPasien" class="text-xs">
          <Column
            headerClass="bg-adameds-50 font-semibold text-SM"
            class="w-2 text-center"
          >
            <template #header>
              <div class="text-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>

          <Column headerClass="bg-adameds-50" class="max-w-[300px] text-left">
            <template #header>
              <div class="w-full font-semibold text-left">Nama Surat</div>
            </template>
            <template #body="slotProps">
              <div>
                {{ slotProps.data.value }}
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-auto text-center">
            <template #header>
              <div class="w-full font-semibold">Action</div>
            </template>
            <template #body="slotProps">
              <CustomButton :label= "slotProps.data.action" backgroundColor="bg-adameds-300" class="rounded-lg max-h-[30px]" icon="PhEye" icon-pos="left"/>
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-3">
        <CustomButton label="Edit" backgroundColor="bg-adameds-300" @click="onEditClick" />
      </div>
    </template>
  </CustomAccordion>
</template>
