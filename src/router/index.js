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
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('@/views/NewView.vue')
    },
    {
      path: '/sign-in',
      alias: ['/signin', '/Sign in'],
      name: 'sign-in',
      component: () => import('@/views/SigninView.vue')
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
