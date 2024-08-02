<script setup lang="ts">
import type { SidebarBody } from "@/utils/Interface";
import { linkType } from "@/utils/Enum";
import Accordion from "../utils/Accordion.vue";
import { PhMagnifyingGlass, PhStack } from "@phosphor-icons/vue";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";

const props = defineProps({
  sidebarTitle: {
    type: String,
    required: true,
  },
  sidebarTitleUrl: {
    type: String,
    required: true,
    default: "",
  },
  sidebarBodyList: {
    type: Array<SidebarBody>,
    required: true,
  },
  showFilterPoli: {
    type: Boolean,
    default: false,
  },
  showStockBtn: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const route = useRoute();
const goToPage = (url: string) => {
  router.push(url);
};

const filter = defineModel("filter");
const showSidebar = ref(true);

const getSVG = (svg: string) => {
  const imgUrl = new URL(
    `../../assets/icons/sidebar-icon/${svg}.svg`,
    import.meta.url
  ).href;
  return imgUrl;
};
</script>

<template>
  <div class="flex w-[240px]" :class="{ 'w-[80px]': !showSidebar }">
    <div
      class="flex flex-col justify-between p-[10px] text-white rounded-xl grow bg-adameds-A300 overflow-auto"
    >
      <div class="p-[10px]">
        <!-- Title -->
        <div v-if="showSidebar" class="flex justify-between mb-7">
          <div
            class="font-semibold cursor-pointer text-heading"
            @click="goToPage(sidebarTitleUrl)"
          >
            {{ sidebarTitle }}
          </div>
          <img
            @click="showSidebar = !showSidebar"
            src="../../assets/icons/Expand.svg"
            alt=""
            class="cursor-pointer"
          />
        </div>
        <img
          v-else
          @click="showSidebar = !showSidebar"
          src="../../assets/icons/Expand.svg"
          alt=""
          class="mx-auto cursor-pointer"
        />
        <!-- Filter Poli -->
        <div v-if="showFilterPoli && showSidebar" class="text-SM">
          <hr class="my-[20px]" />
          <Accordion title="Poli" icon="stethoscope" class="cursor-pointer">
            <div class="flex m-[10px]">
              <PhMagnifyingGlass class="my-auto mr-2" size="20" />
              <input
                type="text"
                class="w-full text-white bg-transparent"
                placeholder="Cari Poli ..."
              />
            </div>
            <div
              class="cursor-pointer mx-[10px] my-[5px] pl-[10px] px-[10px] py-[5px]"
              :class="{ 'bg-adameds-A100 rounded-lg': filter == 'Semua Poli' }"
              @click="filter = 'Semua Poli'"
            >
              Semua Poli
            </div>
            <div
              class="cursor-pointer mx-[10px] my-[5px] pl-[10px] px-[10px] py-[5px]"
              :class="{ 'bg-adameds-A100 rounded-lg': filter == 'Poli Umum' }"
              @click="filter = 'Poli Umum'"
            >
              Poli Umum
            </div>
            <div
              class="cursor-pointer mx-[10px] my-[5px] pl-[10px] px-[10px] py-[5px]"
              :class="{ 'bg-adameds-A100 rounded-lg': filter == 'Poli Anak' }"
              @click="filter = 'Poli Anak'"
            >
              Poli Anak
            </div>
            <div
              class="cursor-pointer mx-[10px] my-[5px] pl-[10px] px-[10px] py-[5px]"
              :class="{ 'bg-adameds-A100 rounded-lg': filter == 'Poli Mata' }"
              @click="filter = 'Poli Mata'"
            >
              Poli Mata
            </div>
          </Accordion>
        </div>
        <!-- body -->
        <div v-for="section in props.sidebarBodyList" class="text-SM">
          <hr class="my-[20px]" />
          <div v-for="row1 in section.child">
            <div v-if="showSidebar">
              <div
                v-if="row1.type == linkType.LINK"
                @click="goToPage(row1.url ?? '')"
                class="font-bold cursor-pointer my-[15px] flex px-[10px] py-[5px]"
                :class="{
                  'bg-adameds-A100 rounded-lg': route.path == row1.url,
                }"
              >
                <img
                  v-if="row1.icon"
                  class="h-4 mr-[10px]"
                  :src="getSVG(row1.icon)"
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
                      'bg-adameds-A100 rounded-lg': route.path == row2.url,
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
              <img
                v-if="row1.icon"
                @click="
                  row1.type == linkType.DROPDOWN
                    ? goToPage(row1.child ? row1.child[0].url ?? '' : '')
                    : goToPage(row1.url ?? '')
                "
                class="h-4 mx-auto my-5 cursor-pointer"
                :src="getSVG(row1.icon)"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="showStockBtn && showSidebar"
        class="flex justify-center flex-none w-full h-10 align-middle bg-white rounded-md cursor-pointer text-adameds-A300"
      >
        <PhStack size="20" weight="bold" class="mr-[10px] my-auto" />
        <div class="my-auto font-semibold">Stok</div>
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
