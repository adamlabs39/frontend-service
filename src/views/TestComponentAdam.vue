<template>
  <div class="h-screen p-3 overflow-scroll">
    <!-- TextArea dengan variasi -->
    <div class="w-[400px]">
      <TextArea
        placeholder="Text"
        label="Nama Default"
        v-model="nameValue"
        variant="filled"
      />
      <TextArea
        placeholder="Hover Email"
        label="Email Hover"
        v-model="emailValue"
      />
      <TextArea
        placeholder="Alamatmu"
        label="Alamat saat Invalid"
        invalid
        v-model="alamatValue"
      />
      <TextArea
        placeholder="Masukkan Password"
        label="Password (DISABLED)"
        disabled
      />
      <TextArea
        placeholder="Tes AutoResize"
        label="AutoResize MENYALA (belum)"
        autoResize
        v-model="autoResizeValue"
      />
      <div class="p-3">
        <p>Namamu: {{ nameValue }}</p>
        <p>Emailmu: {{ emailValue }}</p>
        <p>Alamatmu: {{ alamatValue }}</p>
        <p>Autoresize: {{ autoResizeValue }}</p>
      </div>
    </div>

    <!-- MultiSelect -->
    <div class="w-[500px] p-3">
      <CustomMultiSelect
        label="Choose Hospital"
        placeholder="Select Hospital"
        v-model="selectedHospital"
        :options="hospital"
        optionLabel="name"
        optionValue="code"
        filter
        :maxSelectedLabels="3"
        @change="testLog"
      />
      <p>Hospital :{{ selectedHospital }}</p>
    </div>

    <!-- Input Number -->
    <div class="w-[170px]">
      <CustomInputNumber
        v-model="numberValue"
        label="Input Number"
        :step="1"
        :max="10"
        :min="-20"
        buttonLayout="horizontal"
      />
    </div>

    <!-- Chip -->
    <div class="flex gap-4 p-3 ">
      <CustomChip 
        label="SEMUA"
        :isSelected="selectedChipValues.includes('SEMUA')"
        @selected="onChipSelected"
      />
      <CustomChip
        label="POLI UMUM"
        :isSelected="selectedChipValues.includes('POLI UMUM')"
        @selected="onChipSelected"
      />
      <CustomChip
        label="POLI ANAK"
        :isSelected="selectedChipValues.includes('POLI ANAK')"
        @selected="onChipSelected"
      />
      <CustomChip
        label="POLI GIGI"
        :isSelected="selectedChipValues.includes('POLI GIGI')"
        @selected="onChipSelected"
      />
      <CustomChip
        label="POLI MATA"
        :isSelected="selectedChipValues.includes('POLI MATA')"
        @selected="onChipSelected"
      />
      <CustomChip
        label="APS"
        :isSelected="selectedChipValues.includes('APS')"
        @selected="onChipSelected"
      />
      <CustomChip
        label="TUNAI"
        border-color="border-[#14B8A6]"
        text-color="text-[#14B8A6]"
        selected-border-color="border-0 bg-[#14B8A6]"
        icon-color="#14B8A6"
        :isSelected="selectedChipValues.includes('TUNAI')"
        @selected="onChipSelected"
      />
      <CustomChip
        label="ASURANSI"
        borderColor="border-[#E89F29]"
        textColor="text-[#E89F29]"
        icon-color="#E89F29"
        selected-border-color="border-0 bg-[#E89F29]"
        :isSelected="selectedChipValues.includes('ASURANSI')"
        @selected="onChipSelected"
      />
    </div>

    <p>Terpilih : {{ selectedChipValues.join(", ") }}</p>

    <!-- Card Panggilan Aktif -->
    <div class="w-1/2">
      <CardPanggilanAdmisi
      namaPasien="Nama Pasien"
      nomorIdentitas="32700123871230123"
      kodeBooking="BOOK.027391237"
      >
      </CardPanggilanAdmisi>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TextArea from "@/components/Base/TextArea.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CardPanggilanAdmisi from "@/components/Base/CardPanggilanAdmisi.vue";

const nameValue = ref("");
const emailValue = ref("");
const alamatValue = ref("");
const autoResizeValue = ref("");

const selectedHospital = ref();
const hospital = ref([
  { name: "Adisucipto ", code: "AD" },
  { name: "Ahmad Basuki", code: "AB" },
  { name: "Ciptomangunkusumo", code: "CM" },
  { name: "Soekarno", code: "SO" },
]);

const numberValue = ref(0);

// untuk chip
const selectedChipValues = ref<string[]>([]);

const testLog = (data: any) => {
  console.log("Data", data);
  console.log("Hospital data: ", selectedHospital.value);
};

const onChipSelected = (label: string) => {
  if (selectedChipValues.value.includes(label)) {
    selectedChipValues.value = selectedChipValues.value.filter(
      (item) => item !== label
    );
  } else {
    selectedChipValues.value.push(label);
  }
  console.log(selectedChipValues.value);
};
</script>
