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
  <div class="mt-5 flex flex-col gap-5">
    <div class="flex w-full gap-2.5 items-end">
      <CustomTextfield label="Kode" placeholder="Kode" />
      <CustomTextfield
        label="Kategori General Consent"
        placeholder="Kategori General Consent"
        class="w-1/3"
      />
      <CustomAutoComplete
        label="Lokasi Pelayanan"
        v-model="lokasiPelayanan"
        :options="itemsLokasiPelayanan"
        class="grow"
      />
    </div>
    <CustomTextfield
      label="Nama General Consent"
      placeholder="Nama General Consent"
    />
    <CustomAccordion>
      <template #header>Text Formating</template>
      <template #content>
        <div class="flex justify-between">
          <div class="w-1/2">
            <div class="mb-2">
              Field dinamis diharap menggunakan penanda
              <span class="font-bold">{{}}</span>, contoh :
            </div>
            <div>Nama : Nama</div>
            <div>Alamat : Alamat</div>
            <div>No. Telepon : Telepon</div>
          </div>
          <div class="w-1/2">
            <div class="">list data dinamis</div>
            <ul class="list-decimal list-inside">
              <li>nama</li>
              <li>alamat</li>
              <li>umur</li>
              <li>tindakan</li>
              <li>nama_wali</li>
              <li>jenis_kelamin_wali</li>
              <li>alamat_wali</li>
              <li>hubungan_dengan_pasien</li>
            </ul>
          </div>
        </div>
      </template>
    </CustomAccordion>
    <div>
      <div class="font-semibold text-MD">Isi General Consent</div>
      <CustomCkEditor/>
    </div>
    <hr />
    <div class="flex items-end gap-2.5">
      <CustomSwitch v-model="status" label="Status" />
      <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
    </div>
  </div>
</template>
