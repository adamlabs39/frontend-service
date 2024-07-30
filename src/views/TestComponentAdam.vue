<template>
  <div>
    <form  action="" class="w-[400px]">
  
      <TextArea placeholder="Text" label ="Nama Default" v-model="nameValue" variant="filled" />
      <TextArea placeholder="Hover Email" label="Email Hover" v-model="emailValue"/>
      <TextArea placeholder="Alamatmu" label="Alamat saat Invalid" invalid v-model="alamatValue"/>
      <TextArea placeholder="Masukkan Password" label="Password (DISABLED)" disabled/>
      <TextArea placeholder="Tes AutoResize" label="AutoResize MENYALA (belum)" autoResize v-model="autoResizeValue"/>
    </form>

    <p>Namamu: {{ nameValue }}</p>
    <p>Emailmu: {{ emailValue }}</p>
    <p>Alamatmu: {{ alamatValue }}</p>
    <p>Autoresize: {{ autoResizeValue}}</p>

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
import AutoComplete from "@/components/Base/AutoComplete.vue";
import TextArea from "../components/Base/TextArea.vue";

import { ref } from "vue";

const nameValue = ref("");
const emailValue = ref("");
const alamatValue = ref("");
const autoResizeValue = ref("");



const testLog = () => {
  console.log(nameValue.value);
};
</script>
