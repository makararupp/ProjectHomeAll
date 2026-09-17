<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroBanner from '@/components/home/HeroBanner.vue'
import PromoBanners from '@/components/home/PromoBanners.vue'
import FlashSaleSection from '@/components/home/FlashSaleSection.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import FeaturedProducts from '@/components/home/FeaturedProducts.vue'
import AboutSection from '@/components/home/AboutSection.vue'

const route = useRoute()

function scrollToServices() {
  const el = document.getElementById('services')
  if (el) {
    const headerHeight = 120
    const rect = el.getBoundingClientRect()
    const topPos = rect.top + window.pageYOffset - headerHeight
    window.scrollTo({
      top: topPos,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  if (window.location.hash === '#services' || route.hash === '#services') {
    setTimeout(scrollToServices, 100)
    setTimeout(scrollToServices, 300)
  }
})

watch(
  () => route.hash,
  (hash) => {
    if (hash === '#services') {
      setTimeout(scrollToServices, 50)
      setTimeout(scrollToServices, 250)
    }
  }
)
</script>

<template>
  <div class="home">
    <AppHeader />
    <CategoryNav />

    <main>
      <HeroBanner />
      <PromoBanners />
      <FlashSaleSection />
      <ServicesSection />
      <FeaturedProducts />
      <AboutSection />
    </main>

    <AppFooter />
  </div>
</template>
