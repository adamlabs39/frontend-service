import { createRouter, createWebHistory } from "vue-router";
// NOTE Layout View
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SidebarLayout from "@/layouts/HeaderLayout.vue";
// NOTE Component View
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import RawatJalanView from "@/views/RawatJalan/RawatJalanView.vue";
import SettingView from "@/views/SettingPage/SettingView.vue";
import DatamasterView from "@/views/Datamaster/DatamasterView.vue";
import AdmisiView from "@/views/Admisi/AdmisiView.vue";

// SECTION Page View
// NOTE Admisi
import AdmisiPage from "@/views/Admisi/AdmisiPage.vue";
import SEPAdmisiPage from "@/views/Admisi/SEPAdmisiPage.vue";
import PatientDataPage from "@/views/Admisi/PatientDataPage.vue";
import RoomMonitoringPage from "@/views/Admisi/RoomMonitoringPage.vue";
import AdmisiReportPage from "@/views/Admisi/AdmisiReportPage.vue";

// NOTE Rawat Jalan
import PoliPage from "@/views/RawatJalan/PoliPage.vue";
import BPJSPageMonitoringKunjunganPage from "@/views/RawatJalan/BPJSPageMonitoringKunjunganPage.vue";
import ProfilFaskesPage from "@/views/SettingPage/Template/ProfilFaskes/ProfilFaskesPage.vue";
import KonfigurasiIntegrasiPage from "@/views/SettingPage/Template/KonfigurasiIntegrasi/KonfigurasiIntegrasiPage.vue";

// NOTE Setting
import PermissionMenuPage from "@/views/SettingPage/Template/PermissionMenu/PermissionMenuPage.vue";
import PrintOutPage from "../views/SettingPage/Template/PrintOut/PrintOutPage.vue"
import ProfilAkunPage from "../views/SettingPage/Template/ProfilAkun/ProfilAkunPage.vue"
import ProfilAkunView from "@/views/SettingPage/ProfilAkunView.vue";

// NOTE Page View Datamaster
import UserPage from "@/views/Datamaster/User/UserPage.vue";
import RolePage from "@/views/Datamaster/Role/RolePage.vue";
import RuanganPage from "@/views/Datamaster/Ruangan/RuanganPage.vue";
import KategoriRuanganPage from "@/views/Datamaster/KategoriRuangan.vue/KategoriRuanganPage.vue";
import TarifPage from "@/views/Datamaster/Tarif/TarifPage.vue";
import ICD9CMPage from "@/views/Datamaster/ICD9CM/ICD9CMPage.vue";
import SnomedCTPage from "@/views/Datamaster/SnomedCT/SnomedCTPage.vue";
import LoincPage from "@/views/Datamaster/Loinc/LoincPage.vue";
import DokterPage from "@/views/Datamaster/Dokter/DokterPage.vue";
import NakesPage from "@/views/Datamaster/Nakes/NakesPage.vue";
import DiagnosisICD10Page from "@/views/Datamaster/DiagnosisICD10/DiagnosisICD10Page.vue";
import PenjaminPage from "@/views/Datamaster/Penjamin/PenjaminPage.vue";
import OrganisasiPage from "@/views/Datamaster/Organisasi/OrganisasiPage.vue";
import FaskesPage from "@/views/Datamaster/Faskes/FaskesPage.vue";
import LokasiPage from "@/views/Datamaster/Lokasi/LokasiPage.vue";
import GeneralConsentPage from "@/views/Datamaster/GeneralConsent/GeneralConsentPage.vue";
import TindakanPage from "@/views/Datamaster/Tindakan/TindakanPage.vue";

// !SECTION
// NOTE Test Component
import TestComponentNaya from "@/views/TestComponentNaya.vue";
import TestComponentAdamNew from "@/views/TestComponentAdamNew.vue";
import TestComponentAlex from "@/views/TestComponentAlex.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: DefaultLayout },
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: { layout: SidebarLayout },
      component: DashboardView,
    },

    {
      path: "/rawat-jalan",
      name: "rawat-jalan",
      meta: { layout: SidebarLayout, page: PoliPage },
      component: RawatJalanView,
    },
    {
      path: "/bpjs/monitoring-kunjungan",
      name: "bpjs-monitoring-kunjungan",
      meta: { layout: SidebarLayout, page: BPJSPageMonitoringKunjunganPage },
      component: RawatJalanView,
    },
    {
      path: "/setting/profil-faskes",
      name: "setting-profil-faskes",
      meta: { layout: SidebarLayout, page: ProfilFaskesPage },
      component: SettingView,
    },

    {
      path: "/setting/konfigurasi-integrasi",
      name: "setting-konfigurasi-integrasi",
      meta: { layout: SidebarLayout, page: KonfigurasiIntegrasiPage },
      component: SettingView,
    },
    {
      path: "/setting/permission-menu",
      name: "setting-permission-menu",
      meta: { layout: SidebarLayout, page: PermissionMenuPage },
      component: SettingView,
    },

    {
      path: "/setting/print-out",
      name: "setting-print-out",
      meta: { layout: SidebarLayout, page: PrintOutPage },
      component: SettingView,
    },
    {
      path: "/setting/profil-akun",
      name: "setting-profil-akun",
      meta: { layout: SidebarLayout, page: ProfilAkunPage },
      component: ProfilAkunView,
    },

    // NOTE Datamaster
    {
      path: "/datamaster",
      name: "datamaster",
      redirect: "/datamaster/user",
    },
    {
      path: "/datamaster/user",
      name: "datamaster-user",
      meta: { layout: SidebarLayout, page: UserPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/role",
      name: "datamaster-role",
      meta: { layout: SidebarLayout, page: RolePage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/ruangan",
      name: "datamaster-ruangan",
      meta: { layout: SidebarLayout, page: RuanganPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/kategori-ruangan",
      name: "datamaster-kategori-ruangan",
      meta: { layout: SidebarLayout, page: KategoriRuanganPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/tarif",
      name: "datamaster-tarif",
      meta: { layout: SidebarLayout, page: TarifPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/tindakan",
      name: "datamaster-tindakan",
      meta: { layout: SidebarLayout, page: TindakanPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/icd9-cm",
      name: "datamaster-icd9-cm",
      meta: { layout: SidebarLayout, page: ICD9CMPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/snomed-ct",
      name: "datamaster-snomed-ct",
      meta: { layout: SidebarLayout, page: SnomedCTPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/loinc",
      name: "datamaster-loinc",
      meta: { layout: SidebarLayout, page: LoincPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/diagnosis-icd10",
      name: "datamaster-diagnosis-icd10",
      meta: { layout: SidebarLayout, page: DiagnosisICD10Page },
      component: DatamasterView,
    },
    {
      path: "/datamaster/dokter",
      name: "datamaster-dokter",
      meta: { layout: SidebarLayout, page: DokterPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/nakes",
      name: "datamaster-nakes",
      meta: { layout: SidebarLayout, page: NakesPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/penjamin",
      name: "datamaster-penjamin",
      meta: { layout: SidebarLayout, page: PenjaminPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/faskes",
      name: "datamaster-faskes",
      meta: { layout: SidebarLayout, page: FaskesPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/lokasi",
      name: "datamaster-lokasi",
      meta: { layout: SidebarLayout, page: LokasiPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/organisasi",
      name: "datamaster-organisasi",
      meta: { layout: SidebarLayout, page: OrganisasiPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/general-consent",
      name: "datamaster-general-consent",
      meta: { layout: SidebarLayout, page: GeneralConsentPage },
      component: DatamasterView,
    },

    // NOTE Admisi
    {
      path: "/admisi",
      name: "admisi",
      redirect: "/admisi/rawat-jalan",
    },
    {
      path: "/admisi/rawat-jalan",
      name: "admisi-rawat-jalan",
      meta: { layout: SidebarLayout, page: AdmisiPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/rawat-inap",
      name: "admisi-rawat-inap",
      meta: { layout: SidebarLayout, page: AdmisiPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/igd",
      name: "admisi-igd",
      meta: { layout: SidebarLayout, page: AdmisiPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/sep/rawat-jalan",
      name: "admisi-sep-rawat-jalan",
      meta: { layout: SidebarLayout, page: SEPAdmisiPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/sep/rawat-inap",
      name: "admisi-sep-rawat-inap",
      meta: { layout: SidebarLayout, page: SEPAdmisiPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/sep/igd",
      name: "admisi-sep-igd",
      meta: { layout: SidebarLayout, page: SEPAdmisiPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/data-pasien",
      name: "admisi-data-pasien",
      meta: { layout: SidebarLayout, page: PatientDataPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/monitoring-kamar",
      name: "admisi-monitoring-kamar",
      meta: { layout: SidebarLayout, page: RoomMonitoringPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan",
      name: "admisi-laporan",
      redirect: "/admisi/laporan/kunjungan",
    },
    {
      path: "/admisi/laporan/kunjungan",
      name: "admisi-laporan-kunjungan",
      meta: { layout: SidebarLayout, page: AdmisiReportPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/penjamin",
      name: "admisi-laporan-penjamin",
      meta: { layout: SidebarLayout, page: AdmisiReportPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/batal-kunjungan",
      name: "admisi-laporan-batal-kunjungan",
      meta: { layout: SidebarLayout, page: AdmisiReportPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/status-kamar",
      name: "admisi-laporan-status-kamar",
      meta: { layout: SidebarLayout, page: AdmisiReportPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/keperawatan-inap-pasien",
      name: "admisi-laporan-keperawatan-inap-pasien",
      meta: { layout: SidebarLayout, page: AdmisiReportPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/bayi-baru-lahir",
      name: "admisi-laporan-bayi-baru-lahir",
      meta: { layout: SidebarLayout, page: AdmisiReportPage },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/rekap-pasien-bpjs",
      name: "admisi-laporan-rekap-pasien-bpjs",
      meta: { layout: SidebarLayout, page: AdmisiReportPage },
      component: AdmisiView,
    },

    // NOTE Test Component
    {
      path: "/component-naya",
      name: "component-naya",
      meta: { layout: DefaultLayout },
      component: TestComponentNaya,
    },
    {
      path: "/component-adam-new",
      name: "component-adam",
      meta: { layout: DefaultLayout },
      component: TestComponentAdamNew,
    },
    {
      path: "/component-alex",
      name: "component-alex",
      meta: { layout: DefaultLayout },
      component: TestComponentAlex,
    },
  ],
});

export default router;
