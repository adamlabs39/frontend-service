import { createRouter, createWebHistory } from "vue-router";
// NOTE Layout View
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SidebarLayout from "@/layouts/HeaderLayout.vue";
// NOTE Component View
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import RawatJalanView from "@/views/RawatJalan/RawatJalanView.vue";
// NOTE Page View
import PoliPage from "@/views/RawatJalan/PoliPage.vue";
import BPJSPageMonitoringKunjunganPage from "@/views/RawatJalan/BPJSPageMonitoringKunjunganPage.vue";
// NOTE Test Component
import TestComponentNaya from "@/views/TestComponentNaya.vue";
import TestComponentAdam from "@/views/TestComponentAdam.vue";
import DatamasterView from "@/views/Datamaster/DatamasterView.vue";
import UserPage from "@/views/Datamaster/UserPage.vue";
import RolePage from "@/views/Datamaster/RolePage.vue";

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
      path: "/datamaster",
      name: "datamaster",
      redirect: "/datamaster/user",
    },
    {
      path: "/datamaster/user",
      name: "user",
      meta: { layout: SidebarLayout, page: UserPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/role",
      name: "role",
      meta: { layout: SidebarLayout, page: RolePage },
      component: DatamasterView,
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
