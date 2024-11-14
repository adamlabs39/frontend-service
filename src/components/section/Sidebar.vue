<script setup lang="ts">
import type { SidebarBody } from "@/utils/Interface";
import { linkType } from "@/utils/Enum";
import Accordion from "../utils/Accordion.vue";
import { PhMagnifyingGlass, PhStack } from "@phosphor-icons/vue";
import { useRouter, useRoute, routerKey } from "vue-router";
import { ref, watch } from "vue";

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
  showFilterRuangan: {
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
const filterRuang = defineModel("filterRuang");

const showSidebar = ref(true);
const emit = defineEmits(["filterChanged"]);

const goToPage = (url: string) => {
  router.push(url);
};

const goToFilteredPage = (poliUuid: string, poliName: string) => {
  router.push({
    path: "/rawat-jalan/poli",
    query: { filter: poliUuid },
  });
  emit("filterChanged",  { uuid: poliUuid, name: poliName });
};
  
const goToRuanganPage = () => {
  router.push({
    path: "/rawat-inap/ruangan",
  });
};

// Update the filter and navigate to /rawat-jalan

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
      class="flex flex-col justify-between p-[10px] text-white rounded-xl grow bg-adameds-300 overflow-hidden"
    >
      <div class="p-[10px] overflow-auto flex flex-col">
        <!-- Title -->
        <div v-if="showSidebar" class="flex justify-between mb-[25px]">
          <div
            class="font-semibold cursor-pointer text-heading "
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
        <div v-if="showFilterRuangan && showSidebar" class="text-SM">
          <hr class="my-[20px]" />
          <Accordion
            title="Ruang Rawatan"
            icon="MonitoringBedIcon"
            class="cursor-pointer"
          >
            <div class="flex m-[10px]">
              <PhMagnifyingGlass class="my-auto mr-2" size="20" />
              <input
                type="text"
                class="w-full text-white bg-transparent"
                placeholder="Cari Ruangan ..."
              />
            </div>
            <div
              class="cursor-pointer my-[5px] px-[10px] py-[5px] flex pl-5"
              :class="{
                'bg-adameds-100 rounded-lg pl-[10px]':
                  route.path == '/rawat-inap/ruangan' &&
                  filterRuang == 'Semua Ruangan',
              }"
              @click="goToRuanganPage(), (filterRuang = 'Semua Ruangan')"
            >
              <MonitoringBedIcon
                v-if="
                  route.path == '/rawat-inap/ruangan' &&
                  filterRuang == 'Semua Ruangan'
                "
                :size="16"
                class="text-white mr-[10px]"
              />
              Semua Ruangan
            </div>
            <div
              class="cursor-pointer my-[5px] px-[10px] py-[5px] flex pl-5"
              :class="{
                'bg-adameds-100 rounded-lg pl-[10px]':
                  route.path == '/rawat-inap/ruangan' &&
                  filterRuang == 'Ruang Mawar',
              }"
              @click="goToRuanganPage(), (filterRuang = 'Ruang Mawar')"
            >
              <MonitoringBedIcon
                v-if="
                  route.path == '/rawat-inap/ruangan' &&
                  filterRuang == 'Ruang Mawar'
                "
                :size="16"
                class="text-white mr-[10px]"
              />
              Ruang Mawar
            </div>
            <div
              class="cursor-pointer my-[5px] px-[10px] py-[5px] flex pl-5"
              :class="{
                'bg-adameds-100 rounded-lg pl-[10px]':
                  route.path == '/rawat-inap/ruangan' &&
                  filterRuang == 'Ruang Melati',
              }"
              @click="goToRuanganPage(), (filterRuang = 'Ruang Melati')"
            >
              <MonitoringBedIcon
                v-if="
                  route.path == '/rawat-inap/ruangan' &&
                  filterRuang == 'Ruang Melati'
                "
                :size="16"
                class="text-white mr-[10px]"
              />
              Ruang Melati
            </div>
          </Accordion>
        </div>

        <!-- body -->
         <div class="overflow-auto">
           <div v-for="(section, index) in props.sidebarBodyList" class="text-SM ">
             <hr :class="[index == 0 ? 'mb-[20px]': 'my-[20px]']" />
             <div v-for="row1 in section.child">
               <div v-if="showSidebar">
                 <div
                   v-if="row1.type == linkType.LINK"
                   @click="goToPage(row1.url ?? '')"
                   class="font-bold cursor-pointer my-[15px] flex px-[10px] py-[5px]"
                   :class="{
                     'bg-adameds-100 rounded-lg': route.path == row1.url,
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
                   <div
                     class="flex m-[10px]"
                     v-if="showFilterPoli && row1.name === 'Poli'"
                   >
                     <PhMagnifyingGlass class="my-auto mr-2" size="20" />
                     <input
                       type="text"
                       class="w-full text-white bg-transparent"
                       placeholder="Cari Poli ..."
                     />
                   </div>
   
                   <div v-for="row2 in row1.child" class="ml-[10px]">
                     <div
                       v-if="row2.type == linkType.LINK"
                       @click="
                         row1.name === 'Poli'
                           ? goToFilteredPage( row2.datas, row2.name)
                           : goToPage(row2.url ?? '')
                       "
                       class="cursor-pointer mx-[10px] my-[10px] px-[10px] py-[5px]"
                       :class="{
                         'bg-adameds-100 rounded-lg':
                           (row1.name === 'Poli' &&
                             (route.query.filter === row2.name ||
                               (!route.query.filter &&
                                 row2.name === row2.datas && route.path == '/rawat-jalan/poli'))) ||
                           (row1.name !== 'Poli' && route.path === row2.url),
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
      <div
        v-if="showStockBtn && showSidebar"
        class="flex justify-center flex-none w-full h-10 align-middle bg-white rounded-md cursor-pointer text-adameds-300"
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
