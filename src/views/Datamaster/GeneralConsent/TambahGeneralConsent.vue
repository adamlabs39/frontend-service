<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import CustomQuil from "@/components/Base/CustomQuil.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  Undo,
  Heading,
  Alignment,
  FontBackgroundColor,
  FontColor,
  FontSize,
  List,
  Link,
  Table,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import CustomCkEditor from "@/components/Base/CustomCkEditor.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";

const status = ref();
const lokasiPelayanan = ref();
const itemsLokasiPelayanan = ref(["Rawat Jalan", "Rawat Inap", "IGD"]);
const editorData = ref("");
const editor = ClassicEditor;
const editorConfig = {
  plugins: [
    Bold,
    Essentials,
    Italic,
    Paragraph,
    Undo,
    Heading,
    Alignment,
    FontBackgroundColor,
    FontColor,
    FontSize,
    Link,
    List,
    Table,
  ],
  toolbar: {
    items: [
      "heading",
      "alignment",
      "|",
      "fontBackgroundColor",
      "fontColor",
      "fontsize",
      "bold",
      "italic",
      "link",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "undo",
      "redo",
      "|",
      "insertTable",
    ],
    shouldNotGroupWhenFull: true,
  },
};
</script>
<template>
  <div class="mt-5 grid grid-cols-12 gap-5">
    <CustomTextfield label="Kode" placeholder="Kode" class="col-span-2" />
    <CustomTextfield
      label="Kategori General Consent"
      placeholder="Kategori General Consent"
      class="col-span-4"
    />
    <CustomMultiSelect
      label="Lokasi Pelayanan"
      v-model="lokasiPelayanan"
      placeholder="Pilih Lokasi Pelayanan"
      class="col-span-6"
    />
    <CustomTextfield
      label="Nama General Consent"
      placeholder="Nama General Consent"
      class="col-span-12"
    />
    <CustomAccordion initialState="0" class="col-span-12">
      <template #header> <div class="-ml-4">Text Formating</div></template>
      <template #content>
        <div
          class="flex justify-between bg-adameds-50 mt-2.5 p-4 rounded-[10px] -m-4 gap-40"
        >
          <div class="w-1/2">
            <div class="mb-2">
              Field dinamis diharap menggunakan penanda

              <span v-pre class="font-bold">{{}}</span>, contoh :
              <hr class="border-grey-200 my-2.5" />
            </div>
            <div v-pre>Nama : {{ Nama }}</div>
            <div v-pre>Alamat : {{ Alamat }}</div>
            <div v-pre>No. Telepon : {{ Telepon }}</div>
          </div>
          <div class="w-1/2">
            <div class="">list data dinamis</div>
            <hr class="border-grey-200 my-2.5" />
            <div class="flex gap">
              <ul class="basis-1/3">
                <li>1. nama</li>
                <li>2. alamat</li>
                <li>3. umur</li>
                <li>4. tindakan</li>
              </ul>
              <ul>
                <li>5. nama_wali</li>
                <li>6. jenis_kelamin_wali</li>
                <li>7. alamat_wali</li>
                <li>8. hubungan_dengan_pasien</li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </CustomAccordion>
    <div class="font-semibold text-MD col-span-12 -mb-2">Isi General Consent</div>
    <CustomCkEditor class="col-span-12" />
    <hr class="border-grey-200 col-span-12" />
      <CustomSwitch v-model="status" label="Status" class="col-span-12" />
  </div>
</template>
