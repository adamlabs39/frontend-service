<script setup lang="ts">
import Sidebar from "@/components/section/Sidebar.vue";
import { linkType } from "@/utils/Enum";
import type { SidebarBody } from "@/utils/Interface";
import { ref } from "vue";

const sidebarBodyList = ref<SidebarBody[]>([
  {
    name: "1",
    type: linkType.SECTION,
    child: [
      {
        name: "User",
        icon: "Datamaster",
        type: linkType.LINK, url: '/datamaster/user'
      },
      {
        name: "Role",
        icon: "Datamaster",
        type: linkType.LINK, url: '/datamaster/role'
      },
    ],
  },
  {
    name: "2",
    type: linkType.SECTION,
    child: [
      {
        name: "Ruangan",
        icon: "Datamaster",
        type: linkType.LINK,
      },
      {
        name: "Kategori Ruangan",
        icon: "Datamaster",
        type: linkType.LINK,
      },
    ],
  },
  {
    name: "3",
    type: linkType.SECTION,
    child: [
      {
        name: "Tarif",
        icon: "Datamaster",
        type: linkType.LINK,
      },
      {
        name: "Tindakan",
        icon: "Datamaster",
        type: linkType.LINK,
      },
    ],
  },
  {
    name: "4",
    type: linkType.SECTION,
    child: [
      {
        name: "ICD 9 CM",
        icon: "Datamaster",
        type: linkType.LINK,
      },
      {
        name: "Snomed CT",
        icon: "Datamaster",
        type: linkType.LINK,
      },
      {
        name: "Loinch",
        icon: "Datamaster",
        type: linkType.LINK,
      },
    ],
  },
  {
    name: "5",
    type: linkType.SECTION,
    child: [
      {
        name: "Data Dokter",
        icon: "Datamaster",
        type: linkType.LINK,
      },
      {
        name: "Diagnosis",
        icon: "Datamaster",
        type: linkType.LINK,
      },
      {
        name: "Faskes",
        icon: "Datamaster",
        type: linkType.LINK,
      },
      {
        name: "Lokasi",
        icon: "Datamaster",
        type: linkType.LINK,
      },
      {
        name: "Organisasi",
        icon: "Datamaster",
        type: linkType.LINK,
      },
      {
        name: "Penjamin",
        icon: "Datamaster",
        type: linkType.LINK,
      },
      {
        name: "Surat",
        icon: "Datamaster",
        type: linkType.LINK,
      },
    ],
  },
]);
const filter = ref('')
</script>

<template>
  <div class="flex h-full gap-3">
    <Sidebar
      sidebarTitle="Datamaster"
      sidebarTitleUrl="/datamaster"
      class="flex-none"
      :sidebar-body-list="sidebarBodyList"
    />
    <component
      class="max-h-full overflow-auto grow"
      :is="$route.meta.page || 'div'"
      :filter="filter"
    ></component>
  </div>
</template>
