<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <section class="about" aria-labelledby="about-heading">
    <div class="container">
      <div class="about_card">
        <div class="about_copy">
          <h2 id="about-heading" class="about_title">{{ t('about.title', 'About Us') }}</h2>
          <div class="section-underline about_underline" />
          <p class="about_lead">
            {{ t('about.lead', 'We connect businesses with products, services and trusted partners across industries.') }}
          </p>
          <p class="about_sub">
            {{ t('about.sub', 'Built for sourcing, selling, renting and growing your business.') }}
          </p>
        </div>

        <BaseButton variant="primary" size="md" href="/about">{{ t('about.readMore', 'Read About Us') }}</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding-bottom: var(--space-10);
}

.about_card {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border-strong, var(--color-border));
  border-color: var(--color-border-softer);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
}

.about_title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-heading);
}

.about_underline {
  width: 56px;
  margin-top: var(--space-2);
  margin-bottom: var(--space-4);
}

.about_lead {
  font-size: 15px;
  color: #5f6368;
  margin-bottom: var(--space-2);
  max-width: 640px;
}

.about_sub {
  font-size: 13.5px;
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .about_card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

<!-- Non-scoped so body.dark / :root[data-theme="dark"] ancestor selectors work -->
<style>
/* =====================================================
   About Section – Dark Mode Overrides
   ===================================================== */

/* "About Us" title → white */
:root[data-theme="dark"] .about_title,
body.dark .about_title {
  color: #ffffff !important;
}

/* "We connect businesses with products..." → white */
:root[data-theme="dark"] .about_lead,
body.dark .about_lead {
  color: #ffffff !important;
}

/* "Built for sourcing, selling, renting and growing your business." → light/white */
:root[data-theme="dark"] .about_sub,
body.dark .about_sub {
  color: #cbd5e1 !important;
}

/* Card background & border */
:root[data-theme="dark"] .about_card,
body.dark .about_card {
  background-color: #1e293b;
  border-color: #334155;
}
</style>

