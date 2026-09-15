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
      path: '/compare',
      alias: ['/Compare'],
      name: 'compare',
      component: () => import('@/views/CompareView.vue')
    },
    {
      path: '/wishlist',
      alias: ['/Wishlist'],
      name: 'wishlist',
      component: () => import('@/views/WishlistView.vue')
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
      alias: ['/food', '/food-beverage', '/services/food-beverage'],
      name: 'category-food',
      component: () => import('@/views/FoodView.vue')
    },
    {
      path: '/categories/logistics',
      alias: ['/logistics', '/categories/logistic', '/services/logistic'],
      name: 'category-logistics',
      component: () => import('@/views/LogisticsView.vue')
    },
    {
      path: '/categories/real-estate',
      alias: ['/real-estate', '/realestate', '/categories/realestate', '/services/real-estate'],
      name: 'category-real-estate',
      component: () => import('@/views/RealEstateView.vue')
    },
    {
      path: '/categories/steel-products',
      alias: ['/steel-products', '/categories/steel', '/products/steel-products'],
      name: 'steel-products',
      component: () => import('@/views/SteelProductsView.vue')
    },
    {
      path: '/all-categories',
      alias: ['/categories/all', '/custom-pc', '/categories/computer'],
      name: 'all-categories',
      component: () => import('@/views/AllCategoriesView.vue')
    },
    {
      path: '/services/retails-wholesale',
      alias: ['/retails-wholesale', '/services/retail-wholesale'],
      name: 'retails-wholesale',
      component: () => import('@/views/RetailsWholesaleView.vue')
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
