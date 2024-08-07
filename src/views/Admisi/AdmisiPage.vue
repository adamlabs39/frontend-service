<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

const poliList = ref(["POLI UMUM", "POLI ANAK", "POLI GIGI POLI MATA", "APS"]);
const selectedPoli = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  if (selectedPoli.value.includes(label)) {
    selectedPoli.value = selectedPoli.value.filter((item) => item != label);
  } else {
    selectedPoli.value.push(label);
  }
};

const registerMethod = ref(["ADMISI", "APM", "MOBILE APP"]);
const selectedRegisterMethod = ref<string[]>([]);
const onRegisterMethodSelect = (label: string) => {
  if (selectedRegisterMethod.value.includes(label)) {
    selectedRegisterMethod.value = selectedRegisterMethod.value.filter(
      (item) => item != label
    );
  } else {
    selectedRegisterMethod.value.push(label);
  }
};

const selectedPaymentMethod = ref<string[]>([]);
const onPaymentMethodSelect = (label: string) => {
  if (selectedPaymentMethod.value.includes(label)) {
    selectedPaymentMethod.value = selectedPaymentMethod.value.filter(
      (item) => item != label
    );
  } else {
    selectedPaymentMethod.value.push(label);
  }
};

const products = ref([
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    gender: "L",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "1",
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "9999999999999999",
    insurance_account_name: "BPJS",
    polyclinic: "POLI KANDUNGAN",
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "2",
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. Og",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_daftar: "10-10-2024 09:00",
    tanggal_jadwal: "10-10-2024 10:00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
  },
]);
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder>
        <template #header>
          <div class="flex justify-between w-full align-middle">
            <div class="flex">
              <CustomButton icon="PhArrowClockwise" class="mr-5" />
              <span class="leading-10 text-adameds-300 text-heading">
                Rawat Jalan
              </span>
            </div>
            <CustomButton icon="PhPlus" label="Daftar" class="mr-[10px]" />
          </div>
        </template>
        <template #content>
          <div class="flex mt-[10px]">
            <CustomTextfield
              label="Cari Pasien"
              placeholder="Cari Nama / address / No. RM"
              class="mr-5 grow"
            />
            <CustomSelect label="DPJP" class="mr-5 grow" :options="[]" />
            <CustomDatePicker
              v-model="startDateFilter"
              label="Tanggal"
              class="w-[150px]"
            />
            <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
            <CustomDatePicker
              v-model="endDateFilter"
              :showLabel="false"
              class="mt-auto w-[150px]"
            />
            <CustomButton
              icon="PhMagnifyingGlass"
              label="Cari"
              class="ml-5 mr-[10px] mt-auto"
            />
            <CustomButton
              label="Reset"
              outlined
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
              class="mt-auto"
            />
          </div>
          <div class="flex mb-[10px] mt-5">
            <div class="w-[15%]">Filter Poli</div>
            <div class="flex">
              |
              <CustomChip
                v-for="(poli, index) in poliList"
                :key="poli + index"
                :label="poli"
                class="ml-[10px]"
                :isSelected="selectedPoli.includes(poli)"
                @selected="onPoliSelect"
              />
            </div>
          </div>
          <div class="flex my-[10px]">
            <div class="w-[15%]">Filter Cara Daftar</div>
            <div class="flex">
              |
              <CustomChip
                v-for="(method, index) in registerMethod"
                :key="method + index"
                :label="method"
                borderColor="border-adameds-300"
                iconColor="text-adameds-300"
                textColor="text-adameds-300"
                :iconSize="16"
                class="ml-[10px]"
                selectedColor="bg-adameds-300 border-adameds-300"
                :isSelected="selectedRegisterMethod.includes(method)"
                @selected="onRegisterMethodSelect"
              />
            </div>
          </div>
          <div class="flex my-[10px]">
            <div class="w-[15%]">Filter Pembayaran</div>
            <div class="flex">
              |
              <CustomChip
                label="TUNAI"
                borderColor="border-adameds-300"
                bgColor="bg-adameds-50"
                iconColor="text-adameds-300"
                textColor="text-adameds-300"
                customClass="h-5"
                class="ml-[10px]"
                :isSelected="selectedPaymentMethod.includes('TUNAI')"
                @selected="onPaymentMethodSelect"
                selectedColor="bg-adameds-300 border-adameds-300"
              />
              <CustomChip
                label="ASURANSI"
                borderColor="border-warning-300"
                bgColor="bg-warning-50"
                iconColor="text-warning-300"
                textColor="text-warning-300"
                customClass="h-5"
                class="ml-[10px]"
                :isSelected="selectedPaymentMethod.includes('ASURANSI')"
                @selected="onPaymentMethodSelect"
                selectedColor="bg-warning-300 border-warning-300"
              />
            </div>
          </div>
          <hr class="border-grey-200" />
        </template>
        <template #collapseIcon>
          <CustomButton icon="PhCaretUp" backgroundColor="bg-adameds-75" />
        </template>
        <template #expandIcon>
          <CustomButton icon="PhCaretDown" backgroundColor="bg-adameds-75" />
        </template>
      </CustomAccordion>
    </template>
    <template #content>
      <!-- <div
        class="flex flex-col h-full border-2 border-dashed rounded-lg border-grey-100"
      >
        <div class="m-auto">
          <img src="../../assets/icons/no-data-icon.svg" alt="no data" class="mx-auto" />
          <div class="text-grey-200">No data available</div>
        </div>
      </div> -->
      <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
        scrollable
        scrollHeight="flex"
        pt:virtualScroller:class="masuk"
        c
      >
        <Column field="nomor" header="Nomor">
          <template #body="slotProps">
            <div class="text-center">
              <div>RM.{{ slotProps.data.noRM }}</div>
              <div
                v-if="slotProps.data.no_antrian"
                class="w-[21px] mx-auto bg-adameds-75 text-adameds-300 rounded-[5px]"
              >
                {{ slotProps.data.no_antrian }}
              </div>
            </div>
          </template>
        </Column>
        <Column field="pasien" header="Pasien">
          <template #body="slotProps">
            <div>
              {{ slotProps.data.name }}
              <span class="text-grey-300">
                ({{ slotProps.data.age_year }}Th
                {{ slotProps.data.age_month }}Bln
                {{ slotProps.data.age_day }}Hr)
              </span>
            </div>
            <div>{{ slotProps.data.address }}</div>
            <div class="flex flex-wrap">
              <PhPlusCircle
                :size="22"
                class="text-adameds-300 mt-auto mr-[5px]"
                weight="fill"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="
                  slotProps.data.gender == 'P' ? 'Perempuan' : 'Laki-laki'
                "
                :bgColor="
                  slotProps.data.gender == 'P' ? 'bg-female-75' : 'bg-male-75'
                "
                :textColor="
                  slotProps.data.gender == 'P'
                    ? 'text-female-300'
                    : 'text-male-300'
                "
                customClass="h-5 pr-1 border-none mr-[5px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.phone"
                bgColor="bg-adameds-75"
                textColor="text-adameds-300"
                customClass="h-5 pr-1 border-none"
              />
            </div>
          </template>
        </Column>
        <Column field="keperawatan" header="Keperawatan">
          <template #body="slotProps">
            <div>{{ slotProps.data.doctor }}</div>
            <div class="flex flex-wrap">
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.polyclinic"
                customClass="h-5 pr-1 mr-[5px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.insurance_account_name"
                :bgColor="
                  slotProps.data.insurance_account_name == 'TUNAI'
                    ? 'bg-adameds-50'
                    : 'bg-warning-50'
                "
                :textColor="
                  slotProps.data.insurance_account_name == 'TUNAI'
                    ? 'text-adameds-300'
                    : 'text-warning-300'
                "
                :borderColor="
                  slotProps.data.insurance_account_name == 'TUNAI'
                    ? 'border-adameds-300'
                    : 'border-warning-300'
                "
                customClass="h-5 pr-[6px] mr-[5px]"
              />
              <CustomChip
                v-if="slotProps.data.no_SEP"
                :showCheckedIcon="false"
                :label="`SEP.${slotProps.data.no_SEP}`"
                bgColor="bg-warning-50"
                textColor="text-warning-300"
                borderColor="border-warning-300"
                customClass="h-5 pr-[6px]"
              />
            </div>
          </template>
        </Column>
        <Column
          field="data-kunjungan"
          header="Data Kunjungan"
          style="width: 25%"
        >
          <template #body="slotProps">
            <div
              class="grid content-center grid-cols-[80px_min-content_150px] auto-cols-min"
            >
              Daftar
              <PhArrowRight
                :size="18"
                class="my-auto mr-5 text-info-300"
                weight="bold"
              />
              {{ slotProps.data.tanggal_daftar }}
            </div>
            <div class="grid content-center grid-cols-[80px_min-content_150px]">
              Jadwal
              <PhArrowRight
                :size="18"
                class="my-auto mr-5 text-success-300"
                weight="bold"
              />
              {{ slotProps.data.tanggal_jadwal }}
            </div>
          </template>
        </Column>
      </DataTable>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <div class="flex">
          <CustomButton class="my-auto" label="Cetak" icon="PhPrinter" />
        </div>
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
  </Card>
</template>
