import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/ProductDetailView.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/CategoryDetailView.vue')
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
