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
        type: linkType.LINK,
        url: "/datamaster/user",
      },
      {
        name: "Role",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/role",
      },
    ],
  },
  {
    name: "2",
    type: linkType.SECTION,
    child: [
      {
        name: "Pegawai",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/nakes",
      },
      {
        name: "Praktisioner",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/dokter",
      },
    ],
  },

  {
    name: "3",
    type: linkType.SECTION,
    child: [
      {
        name: "Ruangan",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/ruangan",
      },
      {
        name: "Kategori Ruangan",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/kategori-ruangan",
      },
    ],
  },
  {
    name: "4",
    type: linkType.SECTION,
    child: [
      {
        name: "Diagnosis (ICD 10)",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/diagnosis-icd10",
      },
      {
        name: "ICD 9 CM",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/icd9-cm",
      },
      {
        name: "Snomed CT",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/snomed-ct",
      },
      {
        name: "LOINC",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/loinc",
      },
    ],
  },
  {
    name: "5",
    type: linkType.SECTION,
    child: [
      {
        name: "Tarif",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/tarif",
      },
      {
        name: "Tindakan",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/tindakan",
      },
    ],
  },

  {
    name: "6",
    type: linkType.SECTION,
    child: [
      {
        name: "Faskes",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/faskes",
      },
      {
        name: "Organisasi",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/organisasi",
      },
      {
        name: "Lokasi",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/lokasi",
      },
      {
        name: "Penjamin",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/penjamin",
      },
      {
        name: "Voucher",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/voucher",
      },
      {
        name: "General Consent",
        icon: "Datamaster",
        type: linkType.LINK,
        url: "/datamaster/general-consent",
      },
    ],
  },
  {
    name: "7",
    type: linkType.SECTION,
    child: [
      {
        name: "Super Admin",
        icon: "Datamaster",
        type: linkType.DROPDOWN,
        child: [
          {
            name: "Odontogram Gigi",
            icon: "Datamaster",
            type: linkType.LINK,
            url: "/datamaster/super-admin/odontogram-gigi",
          },
        ],
      },
    ],
  },
]);
const filter = ref("");
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
