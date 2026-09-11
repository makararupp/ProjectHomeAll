<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroBanner from '@/components/home/HeroBanner.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import FeaturedProducts from '@/components/home/FeaturedProducts.vue'
import AboutSection from '@/components/home/AboutSection.vue'
</script>

<template>
  <div class="home">
    <AppHeader />
    <CategoryNav />

    <main>
      <HeroBanner />
      <ServicesSection />
      <FeaturedProducts />
      <AboutSection />
    </main>

    <AppFooter />
  </div>
</template>
