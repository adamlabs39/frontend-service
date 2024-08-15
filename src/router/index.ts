import { createRouter, createWebHistory } from "vue-router";
// NOTE Layout View
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SidebarLayout from "@/layouts/HeaderLayout.vue";
// NOTE Component View
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import RawatJalanView from "@/views/RawatJalan/RawatJalanView.vue";
import SettingView from "@/views/SettingPage/SettingView.vue";
// NOTE Page View
import PoliPage from "@/views/RawatJalan/PoliPage.vue";
import BPJSPageMonitoringKunjunganPage from "@/views/RawatJalan/BPJSPageMonitoringKunjunganPage.vue";
import ProfilFaskesPage from "@/views/SettingPage/Template/ProfilFaskes/ProfilFaskesPage.vue";
import KonfigurasiIntegrasiPage from "@/views/SettingPage/Template/KonfigurasiIntegrasi/KonfigurasiIntegrasiPage.vue";


import PermissionMenuPage from "@/views/SettingPage/Template/PermissionMenu/PermissionMenuPage.vue";
import PasswordOtorisasiPage from "../views/SettingPage/Template/PasswordOtorisasi/PasswordOtorisasiPage.vue"
import PrintOutPage from "../views/SettingPage/Template/PrintOut/PrintOutPage.vue"
import ProfilAkunPage from "../views/SettingPage/Template/ProfilAkun/ProfilAkunPage.vue"



// NOTE Test Component
import TestComponentNaya from "@/views/TestComponentNaya.vue";
import TestComponentAdam from "@/views/TestComponentAdam.vue";
import ProfilAkunView from "@/views/SettingPage/ProfilAkunView.vue";


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
      component: SettingView
    },

    {
      path: "/setting/konfigurasi-integrasi",
      name: "setting-konfigurasi-integrasi",
      meta: { layout: SidebarLayout, page: KonfigurasiIntegrasiPage },
      component: SettingView
    },
    {
      path: "/setting/permission-menu",
      name: "setting-permission-menu",
      meta: { layout: SidebarLayout, page: PermissionMenuPage },
      component: SettingView
    },
    {
      path: "/setting/password-otorisasi",
      name: "setting-password-otorisasi",
      meta: { layout: SidebarLayout, page: PasswordOtorisasiPage },
      component: SettingView
    },
    {
      path: "/setting/print-out",
      name: "setting-print-out",
      meta: { layout: SidebarLayout, page: PrintOutPage },
      component: SettingView
    },
    {
      path: "/setting/profil-akun",
      name: "setting-profil-akun",
      meta: { layout: SidebarLayout, page: ProfilAkunPage },
      component: ProfilAkunView
    },



    // NOTE Test Component
    {
      path: "/component-naya",
      name: "component-naya",
      meta: { layout: DefaultLayout },
      component: TestComponentNaya,
    },
    {
      path: "/component-adam",
      name: "component-adam",
      meta: { layout: DefaultLayout },
      component: TestComponentAdam,
    },
  ],
});

export default router;
