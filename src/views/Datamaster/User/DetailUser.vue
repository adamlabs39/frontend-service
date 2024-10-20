<script setup lang="ts">
import { ref, onMounted } from "vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const dataBreadHome = ref({ label: "User", home: true });
const dataBreadCrumb = ref([{ label: "Detail User" }]);
const emit = defineEmits(["back"]);

const payload = ref({
  name: "John Doe",
  phone: "+6281234567890",
  email: "john.doe@example.com",
  username: "johndoe",
  password: "hashedpassword",
  inventory_medis: true,
  inventory_nonMedis: false,
  status: true,
  photo: "base64encodedstring",
  awalan_gelar: "Dr.",
  akhiran_gelar: "Sp.A",
  permission: [
    {
      module: "Antrian",
      sub_modules: [
        {
          name: "Konfigurasi",
          allows: ["READ", "CREATE", "UPDATE", "DELETE"],
        },
        {
          name: "Data Antrian",
          allows: ["READ"],
        },
        {
          name: "Layar",
          allows: ["READ"],
        },
        {
          name: "Apm",
          allows: [
            "CREATE PASIEN JKN",
            "CREATE PASIEN NON-JKN",
            "CHECKIN",
            "PRINT",
          ],
        },
      ],
    },
    {
      module: "Admisi",
      sub_modules: [
        {
          name: "Antrian",
          allows: ["PANGGIL", "LEWATI", "PROSES", "SELESAI", "CHECKIN"],
        },
        {
          name: "RJ",
          allows: [
            "READ",
            "CREATE PASIEN RJ",
            "CREATE GENERAL CONSENT",
            "UPDATE ADMISI RJ",
            "UPDATE GENERAl CONSENT",
            "CETAK KUNJUNGAN",
            "CETAK LABEL",
            "BATAL RJ",
          ],
        },
        {
          name: "RI",
          allows: [
            "READ",
            "CREATE BAYI BARU LAHIR",
            "CREATE GENERAL CONSENT",
            "UPDATE ADMISI RI",
            "UPDATE GENERAL CONSENT",
            "BATAL REQUEST RI",
            "CETAK GENERAL CONSENT",
            "CETAK KUNJUNGAN",
            "CETAK LABEL",
          ],
        },
        {
          name: "IGD",
          allows: [
            "READ",
            "CREATE PASIEN IGD",
            "CREATE GENERAL CONSENT",
            "UPDATE ADMISI IGD",
            "UPDATE GENERAL CONSENT",
            "BATAL IGD",
            "CETAK GENERAL CONSENT",
            "CETAK KUNJUNGAN",
            "CETAK LABEL",
          ],
        },
        {
          name: "SEP",
          allows: [
            "READ",
            "CREATE SEP",
            "CREATE SEP MANUAL",
            "DELETE SEP",
            "SIMPAN SEP MANUAL",
          ],
        },
        {
          name: "Data Pasien",
          allows: [
            "READ",
            "CREATE PASIEN",
            "UPDATE BERKAS RM",
            "UPDATE DATA PASIEN",
            "DELETE PASIEN",
            "DELETE BERKAS RM",
            "IMPORT DATA PASIEN",
            "CETAK KARTU PASIEN",
            "UPLOAD BERKAS RM",
            "PREVIEW BERKAS RM",
            "GENERAL CONSENT",
          ],
        },
        {
          name: "Monitoring Kamar",
          allows: ["READ", "SETTING BED", "CREATE BED", "DELETE BED"],
        },
        {
          name: "Laporan Admisi",
          features: [
            {
              name: "Kunjungan",
              allows: ["READ", "CETAK LAPORAN"],
            },
            {
              name: "penjamin",
              allows: ["READ", "CETAK LAPORAN"],
            },
            {
              name: "Batal Kunjungan",
              allows: ["READ", "CETAK LAPORAN"],
            },
            {
              name: "Status kamar",
              allows: ["READ", "CETAK LAPORAN"],
            },
            {
              name: "Keperawatan Inap Pasien",
              allows: ["READ", "CETAK LAPORAN"],
            },
            {
              name: "Bayi Baru Lahir",
              allows: ["READ", "CETAK LAPORAN"],
            },
            {
              name: "Rekap Jumlah Pasien BPJS",
              allows: ["READ", "CETAK LAPORAN"],
            },
          ],
        },
      ],
    },
  ],
});
onMounted(() => {
  payload;
});
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
  >
    <template #header>
      <div class="flex items-center justify-between gap-5 p-5">
        <CustomButton label="" icon="PhArrowClockwise" @click="" />
        <CustomBreadCrumb
          :home="dataBreadHome"
          :model="dataBreadCrumb"
          class="grow"
        />
        <CustomButton
          label="Kembali"
          icon="PhCaretLeft"
          @click="emit('back')"
          background-color="bg-white"
          border-color="border-adameds-300"
          text-color="text-adameds-300"
        />
      </div>
    </template>
    <template #content>
      <div>
        <CustomAccordion no-border initial-state="0">
          <template #header> Data User </template>
          <template #content>
            <div class="grid grid-cols-2 gap-5 mt-5">
              <div class="flex flex-col">
                <div class="font-semibold underline text-SM">Nama</div>
                <div class="font-normal text-normal">Nama Lengkap</div>
              </div>
              <div class="flex flex-col">
                <div class="font-semibold underline text-SM">NIK</div>
                <div class="font-normal text-normal">345678</div>
              </div>
              <div class="flex flex-col">
                <div class="font-semibold underline text-SM">Tanggal Lahir</div>
                <div class="font-normal text-normal">01-01-2000</div>
              </div>
              <div class="flex flex-col">
                <div class="font-semibold underline text-SM">Jenis Kelamin</div>
                <div class="font-normal text-normal">Laki-Laki</div>
              </div>
              <div class="flex flex-col">
                <div class="font-semibold underline text-SM">No. Handphone</div>
                <div class="font-normal text-normal">0899876567</div>
              </div>
              <div class="flex flex-col">
                <div class="font-semibold underline text-SM">Email</div>
                <div class="font-normal text-normal">email@gmail.com</div>
              </div>
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-transparent"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-transparent"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
        <CustomAccordion no-border initial-state="0">
          <template #header> Akun </template>
          <template #content>
            <div class="grid grid-cols-2 gap-5 mt-5">
              <div class="flex flex-col">
                <div class="font-semibold underline text-SM">Username</div>
                <div class="font-normal text-normal">username</div>
              </div>
              <div class="flex flex-col">
                <div class="font-semibold underline text-SM">Password</div>
                <div class="font-normal text-normal">********</div>
              </div>
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-transparent"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-transparent"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
        <CustomAccordion no-border initial-state="0">
          <template #header> Modul & Permission </template>
          <template #content>
            <div class="flex flex-col gap-5 mt-5">
              <div
                v-for="(menuItem, menuIndex) in payload.permission"
                :key="menuIndex"
              >
                <CustomAccordion
                  header-class="bg-adameds-50"
                  :open-with-header="false"
                >
                  <template #header> {{ menuItem.module }} </template>
                  <template #content>
                    <div
                      v-for="(
                        subMenuItem, subMenuIndex
                      ) in menuItem.sub_modules"
                      :key="subMenuItem.name"
                    >
                      <CustomAccordion
                        class="pt-5"
                        header-class="bg-adameds-50"
                        :open-with-header="false"
                      >
                        <template #header> {{ subMenuItem.name }} </template>
                        <template #content>
                          <div
                            v-if="
                              subMenuItem.features &&
                              subMenuItem.features.length
                            "
                          >
                            <div
                              v-for="(
                                feature, featureIndex
                              ) in subMenuItem.features"
                              :key="feature.name"
                            >
                              <CustomAccordion
                                class="pt-5"
                                header-class="bg-adameds-50"
                                :open-with-header="false"
                              >
                                <template #header>
                                  {{ feature.name }}
                                </template>
                                <template #content>
                                  <div
                                    v-for="(
                                      action, actionIndex
                                    ) in feature.allows"
                                    :key="actionIndex"
                                  >
                                    <div
                                      class="bg-adameds-50 border-2 border-grey-100 rounded-lg py-2.5 px-5 font-normal text-normal"
                                    >
                                      {{ action }}
                                    </div>
                                  </div>
                                </template>
                              </CustomAccordion>
                            </div>
                          </div>
                          <div v-else>
                            <!-- Render allows directly for submodules without features -->
                            <div class="flex flex-wrap gap-2.5 pt-5">
                              <div
                                v-for="(
                                  action, actionIndex
                                ) in subMenuItem.allows"
                                :key="actionIndex"
                              >
                                <div
                                  class="bg-adameds-50 border-2 border-grey-100 rounded-lg py-2.5 px-5 font-normal text-normal"
                                >
                                  {{ action }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </CustomAccordion>
                    </div>
                  </template>
                </CustomAccordion>
              </div>
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-transparent"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-transparent"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
      </div>
    </template>
  </Card>
</template>
