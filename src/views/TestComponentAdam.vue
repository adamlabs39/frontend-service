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
  </div>

  <!-- TextArea -->
</template>

<script setup lang="ts">
import TextArea from "@/components/Base/TextArea.vue";

import { ref } from "vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";

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

// Untuk InputNumber
const numberValue = ref(0);

const testLog = (data: any) => {
  console.log("Data", data);
  console.log("Hospital data: ", selectedHospital.value);
};
</script>
