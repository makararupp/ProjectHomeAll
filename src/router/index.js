import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
    // Add more routes here as additional pages (Product, Category, About Us...)
    // are implemented, e.g.:
    // { path: '/products', name: 'products', component: () => import('@/views/ProductsView.vue') }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
