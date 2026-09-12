<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <section class="about" aria-labelledby="about-heading">
    <div class="container">
      <div class="about__card">
        <div class="about__copy">
          <h2 id="about-heading" class="about__title">{{ t('about.title', 'About Us') }}</h2>
          <div class="section-underline about__underline" />
          <p class="about__lead">
            {{ t('about.lead', 'We connect businesses with products, services and trusted partners across industries.') }}
          </p>
          <p class="about__sub">
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

.about__card {
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

.about__title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-heading);
}

.about__underline {
  width: 56px;
  margin-top: var(--space-2);
  margin-bottom: var(--space-4);
}

.about__lead {
  font-size: 15px;
  color: #5f6368;
  margin-bottom: var(--space-2);
  max-width: 640px;
}

.about__sub {
  font-size: 13.5px;
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .about__card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
