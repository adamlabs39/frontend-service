<template>
  <div>
    <form action="" class="w-[400px]">
      <!-- TextArea dengan variasi -->
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
    </form>

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
       :maxSelectedLabels=3
      />
    </div>

    <p>Namamu: {{ nameValue }}</p>
    <p>Emailmu: {{ emailValue }}</p>
    <p>Alamatmu: {{ alamatValue }}</p>
    <p>Autoresize: {{ autoResizeValue }}</p>
  </div>
  <!-- <AutoComplete 
        showLabel
        v-model="value" 
        :suggestions="items" 
        optionLabel="name"
        @complete="search"
      /> -->

  <!-- TextArea -->
</template>

<script setup lang="ts">
import TextArea from "@/components/Base/TextArea.vue";

import { ref } from "vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";

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

const testLog = () => {
  console.log(nameValue.value);
};
</script>
