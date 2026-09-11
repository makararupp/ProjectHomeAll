<script setup>
import { services } from '@/data/services'
import ServiceCard from './ServiceCard.vue'
</script>

<template>
  <section class="services" aria-labelledby="services-heading">
    <div class="container">
      <h2 id="services-heading" class="services__title">Explore Our Services</h2>
      <div class="section-underline" />
      <p class="services__subtitle">Discover specialized solutions for every business need</p>

      <div class="services__grid">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding: var(--space-16) 0;
}

.services__title {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--color-text-heading);
}

.services__subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-8);
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

@media (max-width: 1024px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .services__grid {
    grid-template-columns: 1fr;
  }
}
</style>
