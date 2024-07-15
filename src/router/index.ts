import { createRouter, createWebHistory } from 'vue-router'
// NOTE Compoennt View
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
// NOTE Layout View
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import SidebarLayout from '@/layouts/SidebarLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: DefaultLayout },
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { layout: SidebarLayout },
      component: DashboardView
    },
  ]
})

export default router
