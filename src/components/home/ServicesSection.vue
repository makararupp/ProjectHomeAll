<script setup>
import { services } from '@/data/services'
import ServiceCard from './ServiceCard.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <section class="services" id="services-section" aria-labelledby="services-heading">
    <div class="container">
      <h2 id="services-heading" class="services_title">{{ t('servicesSection.title', 'Explore Our Services') }}</h2>
      <div class="section-underline" />
      <p class="services_subtitle">{{ t('servicesSection.subtitle', 'Discover specialized solutions for every business need') }}</p>

      <div id="services" class="services_grid">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding: var(--space-10) 0;
}

#services,
.services_grid {
  scroll-margin-top: 125px;
}

.services_title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-heading);
}

.services_subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
}

.services_grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-4);
}

@media (max-width: 1024px) {
  .services_grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .services_grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-3);
  }
}

@media (max-width: 380px) {
  .services_grid {
    grid-template-columns: 1fr;
  }
}
</style>

<!-- Non-scoped so body.dark / :root[data-theme="dark"] ancestor selectors work -->
<style>
/* =====================================================
   Explore Our Services – Dark Mode Overrides
   ===================================================== */

/* "Explore Our Services" title → white in dark mode */
:root[data-theme="dark"] .services_title,
body.dark .services_title {
  color: #ffffff !important;
}

/* Subtitle → light text */
:root[data-theme="dark"] .services_subtitle,
body.dark .services_subtitle {
  color: #94a3b8;
}

/* Underline bar → white */
:root[data-theme="dark"] .section-underline,
body.dark .section-underline {
  background-color: #ffffff !important;
}
</style>

