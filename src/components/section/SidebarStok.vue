<script setup lang="ts">
import type { SidebarBody } from "@/utils/Interface";
import { linkType } from "@/utils/Enum";
import Accordion from "../utils/Accordion.vue";
import { useRouter, useRoute, routerKey } from "vue-router";
import { onBeforeMount, ref, watch } from "vue";
import SideMenuTitle from "../icons/SideMenuTitle.vue";
import Expand from "../icons/ExpandIcon.vue";

const role = JSON.parse(localStorage.getItem("role") || "[]");

const sidebarBodyList = ref<SidebarBody[]>([
  {
    name: "1",
    type: linkType.SECTION,
    child: [
      {
        name: "Permintaan Barang",
        type: linkType.LINK,
        url: "/permintaan-barang",
        icon: "PhChartLine",
      },
    ],
  },
  {
    name: "2",
    type: linkType.SECTION,
    child: [
      {
        name: "Datamaster",
        icon: "DatabaseFill",
        type: linkType.DROPDOWN,
        child:
          role === "SUPER_ADMIN"
            ? [
                {
                  name: "Datamaster User",
                  type: linkType.LINK,
                  url: "/datamaster/user",
                },
                {
                  name: "Datamaster Distributor",
                  type: linkType.LINK,
                  url: "/datamaster/distributor",
                },
                {
                  name: "Datamaster Kantor Cabang",
                  type: linkType.LINK,
                  url: "/datamaster/kantor-cabang",
                },
                {
                  name: "Datamaster Pelanggan",
                  type: linkType.LINK,
                  url: "/datamaster/pelanggan",
                },
                {
                  name: "Datamaster Alat",
                  type: linkType.LINK,
                  url: "/datamaster/alat",
                },
                {
                  name: "Datamaster Kategori",
                  type: linkType.LINK,
                  url: "/datamaster/kategori",
                },
              ]
            : [
                {
                  name: "Datamaster User",
                  type: linkType.LINK,
                  url: "/datamaster/user",
                },
                {
                  name: "Datamaster Kantor Cabang",
                  type: linkType.LINK,
                  url: "/datamaster/kantor-cabang",
                },
              ],
      },
    ],
  },
  // NOTE Coming Soon
  {
    name: "3",
    type: linkType.SECTION,
    child: [
      {
        name: "Maintenance Alat",
        type: linkType.LINK,
        url: "/maintenance-alat",
        icon: "ToolIcon",
      },
      {
        name: "Forecast",
        type: linkType.LINK,
        url: "/forecast",
        icon: "ToolIcon",
      },
    ],
  }
]);

const router = useRouter();
const route = useRoute();

const showSidebar = ref(true);
const emit = defineEmits([]);

const goToPage = (url: string) => {
  router.push(url);
};

onBeforeMount(() => {
  const role = JSON.parse(localStorage.getItem("role") ?? "");
  if (role == "SUPER_ADMIN") {
    sidebarBodyList.value[1].child?.push({
      name: "Integrasi",
      icon: "PhPlugsConnected",
      type: linkType.LINK,
      url: "/integrasi",
    });
  }
});
</script>

<template>
  <div class="flex w-[240px]" :class="{ 'w-[80px]': !showSidebar }">
    <div
      class="flex flex-col justify-between p-[10px] text-white rounded-xl grow bg-adampartner-300 overflow-hidden"
    >
      <div class="p-[10px] overflow-auto flex flex-col">
        <!-- Title -->
        <div
          v-if="showSidebar"
          class="flex justify-between items-center mb-[25px]"
        >
          <div class="flex items-center gap-2">
            <SideMenuTitle :size="24" />
            <div class="font-semibold cursor-pointer text-heading">Menu</div>
          </div>
          <Expand
            @click="showSidebar = !showSidebar"
            class="cursor-pointer"
            :size="20"
          />
        </div>
        <Expand
          v-else
          @click="showSidebar = !showSidebar"
          class="mx-auto cursor-pointer"
          :size="20"
        />

        <!-- body -->
        <div class="overflow-auto">
          <div v-for="(section, index) in sidebarBodyList" class="text-SM">
            <hr :class="[index == 0 ? 'mb-[20px]' : 'my-[20px]']" />
            <div v-for="row1 in section.child">
              <div v-if="showSidebar">
                <div
                  v-if="row1.type == linkType.LINK"
                  @click="goToPage(row1.url ?? '')"
                  class="font-bold cursor-pointer my-[15px] flex px-[10px] py-[5px]"
                  :class="{
                    'bg-adampartner-100 rounded-lg': route.path == row1.url,
                  }"
                >
                  <component
                    v-if="row1.icon"
                    :is="row1.icon"
                    :size="16"
                    class="text-white mr-[10px]"
                  />
                  <div>
                    {{ row1.name }}
                  </div>
                </div>
                <Accordion
                  v-else-if="row1.type == linkType.DROPDOWN"
                  :title="row1.name"
                  :icon="row1.icon ? row1.icon : ''"
                  class="cursor-pointer"
                >
                  <div v-for="row2 in row1.child" class="ml-[10px]">
                    <div
                      v-if="row2.type == linkType.LINK"
                      @click="goToPage(row2.url ?? '')"
                      class="cursor-pointer mx-[10px] my-[10px] px-[10px] py-[5px]"
                      :class="{
                        'bg-adampartner-100 rounded-lg':
                          route.path === row2.url,
                      }"
                    >
                      {{ row2.name }}
                    </div>
                    <Accordion
                      v-else-if="row2.type == linkType.DROPDOWN"
                      :title="row2.name"
                      class="cursor-pointer"
                    >
                      <div v-for="row3 in row2.child">
                        <div v-if="row3.type == linkType.LINK">
                          {{ row3.name }}
                        </div>
                        <Accordion
                          v-else-if="row3.type == linkType.DROPDOWN"
                          :title="row3.name"
                        >
                          <div></div>
                        </Accordion>
                      </div>
                    </Accordion>
                  </div>
                </Accordion>
              </div>
              <div v-else>
                <component
                  v-if="row1.icon"
                  :is="row1.icon"
                  :size="16"
                  class="mx-auto my-5 text-white"
                  @click="
                    row1.type == linkType.DROPDOWN
                      ? goToPage(row1.child ? row1.child[0].url ?? '' : '')
                      : goToPage(row1.url ?? '')
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::placeholder {
  color: white;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder {
  /* Edge 12 -18 */
  color: white;
}
</style>
