<script setup lang="ts">
import { ref, defineEmits, defineProps, computed, watch } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomComboBox from "@/components/Base/CustomComboBox.vue";


const props = defineProps<{
  visible: boolean;
  dataNilaiRujukan: {
    item_pemeriksaan_uuid: string;
    jenis_kelamin: string;
    umur_bawah_tahun: number;
    umur_bawah_bulan: number;
    umur_bawah_hari: number;
    umur_atas_tahun: number;
    umur_atas_hari: number;
    umur_atas_bulan: number;
    batas_bawah_nilai_normal: number;
    batas_atas_nilai_normal: number;
    kritis_bawah: number;
    kritis_atas: number;
    operator_kritis_bawah: string;
    operator_kritis_atas: string;
    operator_nilai_normal: string;
    status: boolean;
    text: string[];
  }[];
}>();

const emit = defineEmits(["update:visible"]);
const tambahNilaiRujukan = ref(false);
const status = ref(true);
const nilaiNormal=ref();
const jenisKelamin = ref("");
const optionJenisKelamin = ref([
  { label: "Laki-laki", value: "1" },
  { label: "Perempuan", value: "2" },
]);


</script>

<template>
  <div>
    <CustomDialog
      v-model:visible="props.visible"
      width="1000px"
      @update:visible="emit('update:visible', false)"
    >
      <template #header>
        <div class="flex text-heading">Nilai Rujukan</div>
      </template>
      <template #body>
        <DataTable
          :value="props.dataNilaiRujukan"
          tableStyle="min-width: 50rem"
          stripedRows
          class="mt-5 text-xs"
          scrollable
          scrollHeight="flex"
        >
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="w-full text-center">Id</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>
          <Column
            field="dataNilaiRujukan"
            header="Data Nilai Rujukan"
            headerClass="bg-adameds-50"
            class="w-[45%]"
          >
            <template #body="slotProps">
              <div class="flex ">
                <div>
                  <div class="font-bold underline text-SM">Jenis Kelamin</div>
                  <div class="text-SM">{{ slotProps.data.jenis_kelamin }}</div>
                  <div class="mt-1 font-bold underline text-SM">Umur Bawah</div>
                  <div class="text-SM">
                    {{ slotProps.data.umur_bawah_tahun }} thn,
                    {{ slotProps.data.umur_bawah_bulan }} bln,
                    {{ slotProps.data.umur_bawah_hari }} hr
                  </div>
                </div>
                <div class="ml-28">
                  <div class="font-bold underline text-SM">Jenis Input</div>
                  <div class="text-SM">Angka</div>
                  <div class="mt-1 font-bold underline text-SM">Umur Atas</div>
                  <div class="text-SM">
                    {{ slotProps.data.umur_atas_tahun }} thn,
                    {{ slotProps.data.umur_atas_bulan }} bln,
                    {{ slotProps.data.umur_atas_hari }} hr
                  </div>
                </div>
              </div>
            </template>
          </Column>
          <Column
            field="rujukan"
            header="Rujukan"
            headerClass="bg-adameds-50"
            class="w-[40%]"
          >
            <template #body="slotProps">
              <div class="font-bold underline text-SM">Text</div>
              <div class="text-SM">
                {{ slotProps.data.text }}
              </div>
              
            </template>
          </Column>
       
          <Column
            field="tampilan"
            header="Tampilan"
            headerClass="bg-adameds-50"
            class=""
          >
            <template #body="slotProps"> </template>
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
                  :label="
                    slotProps.data.status === true ? 'AKTIF' : 'NON-AKTIF'
                  "
                  :textColor="
                    slotProps.data.status === true
                      ? 'text-white'
                      : 'text-[#80868d]'
                  "
                  :bgColor="
                    slotProps.data.status === true
                      ? 'bg-adameds-300'
                      : 'bg-white'
                  "
                  :borderColor="
                    slotProps.data.status === true
                      ? 'border-none'
                      : 'border-[#80868d]'
                  "
                  :icon-color="
                    slotProps.data.status === true ? 'white' : '#80868d'
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
        <div class="flex flex-col gap-5 mt-5">
          <div
            class="flex items-center justify-center p-5 border border-dashed rounded-lg border-adameds-300"
          >
            <CustomButton
              icon="PhPlus"
              label="Nilai Rujukan"
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
              backgroundColor="bg-white"
              @click="tambahNilaiRujukan = true"
            />
          </div>
        </div>
      </template>
    </CustomDialog>
  </div>

  <!-- Add nilai rujukan -->
  <CustomDialog v-model:visible="tambahNilaiRujukan" width="700px">
    <template #header>
      <div class="flex text-heading">Nilai Rujukan - Text</div>
    </template>
    <template #body>
      <CustomSelect
        v-model="jenisKelamin"
        label="Jenis Kelamin"
        placeHolder="Pilih Jenis Kelamin"
        class="mt-5 mb-5"
        optionLabel="label"
        optionValue="value"
        :showFilter="false"
        :options="optionJenisKelamin"
      />
      <div class="flex gap-10 mt-5">
        <div>
          <div class="font-bold underline text-normal">Umur Bawah</div>
          <div class="flex gap-3 mt-2">
            <CustomInputNumber label="Tahun" type="number" />
            <CustomInputNumber label="Bulan" type="number" />
            <CustomInputNumber label="Hari" type="number" />
          </div>
        </div>
        <div>
          <div class="font-bold underline text-normal">Umur Atas</div>
          <div class="flex gap-3 mt-2">
            <CustomInputNumber label="Tahun" type="number" />
            <CustomInputNumber label="Bulan" type="number" />
            <CustomInputNumber label="Hari" type="number" />
          </div>
        </div>
      </div>
   <CustomComboBox
        v-model="nilaiNormal"
        label="Nilai Normal"
        placeholder="Masukkan Nilai Normal"
        class="mt-5"
        />
  
      <CustomTextfield
        label="Tampilan"
        placeholder="Tampilan"
        class="mt-5"
        :disabled="true"
      />
      <hr class="mt-8 border border-slate-200" />

      <CustomSwitch
        v-model="status"
        class="mt-5"
        :show-label="true"
        label="Status"
        sideLabel="NON-AKTIF"
        sideLabelTrue="AKTIF"
      />
    </template>
    <template #footer>
      <div class="flex justify-end gap-2.5 mt-5">
        <CustomButton
          label="Reset"
          textColor="text-grey-300"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-grey-200"
        />
        <CustomButton label="Simpan" />
      </div>
    </template>
  </CustomDialog>
</template>
