import { createRouter, createWebHistory } from "vue-router";
// NOTE Layout View
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SidebarLayout from "@/layouts/HeaderLayout.vue";
// NOTE Component View
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import RawatJalanView from "@/views/RawatJalan/RawatJalanView.vue";
import AdmisiView from "@/views/Admisi/AdmisiView.vue";
// SECTION Page View
// NOTE Admisi
import AdmisiPage from "@/views/Admisi/AdmisiPage.vue";

// NOTE Rawat Jalan
import PoliPage from "@/views/RawatJalan/PoliPage.vue";
import BPJSPageMonitoringKunjunganPage from "@/views/RawatJalan/BPJSPageMonitoringKunjunganPage.vue";
// !SECTION
// NOTE Test Component
import TestComponentNaya from "@/views/TestComponentNaya.vue";
import TestComponentAdam from "@/views/TestComponentAdam.vue";

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

    // NOTE Admisi
    {
      path: "/admisi",
      name: "admisi",
      redirect: '/admisi/rawat-jalan'
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
