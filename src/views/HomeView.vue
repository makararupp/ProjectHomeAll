<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroBanner from '@/components/home/HeroBanner.vue'
import PromoBanners from '@/components/home/PromoBanners.vue'
import FlashSaleSection from '@/components/home/FlashSaleSection.vue'
import FeaturedProducts from '@/components/home/FeaturedProducts.vue'
import AboutSection from '@/components/home/AboutSection.vue'
</script>

<template>
  <div class="home">
    <AppHeader />
    <CategoryNav />

    <main>
      <HeroBanner />
      <PromoBanners />
      <FlashSaleSection />
      <FeaturedProducts />
      <AboutSection />
    </main>

    <AppFooter />
  </div>
</template>
