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
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue')
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
      path: '/register',
      alias: ['/Register'],
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/categories/industrial-parts',
      alias: ['/categories'],
      name: 'category-detail',
      component: () => import('@/views/CategoryDetailView.vue')
    },
    {
      path: '/categories/construction',
      name: 'category-construction',
      component: () => import('@/views/ConstructionView.vue')
    },
    {
      path: '/categories/food-beverage',
      alias: ['/food', '/food-beverage'],
      name: 'category-food',
      component: () => import('@/views/FoodView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth'
          })
        }, 100)
      })
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
