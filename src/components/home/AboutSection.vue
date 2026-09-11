<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section class="about" aria-labelledby="about-heading">
    <div class="container">
      <div class="about__card">
        <div class="about__copy">
          <h2 id="about-heading" class="about__title">About Us</h2>
          <div class="section-underline about__underline" />
          <p class="about__lead">
            We connect businesses with products, services and trusted partners across industries.
          </p>
          <p class="about__sub">
            Built for sourcing, selling, renting and growing your business.
          </p>
        </div>

        <BaseButton variant="primary" size="lg" href="/about">Read About Us</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding-bottom: var(--space-16);
}

.about__card {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border-strong, var(--color-border));
  border-color: var(--color-border-softer);
  border-radius: var(--radius-lg);
  padding: var(--space-10);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
}

.about__title {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--color-text-heading);
}

.about__underline {
  width: 72px;
  margin-top: var(--space-2);
  margin-bottom: var(--space-5);
}

.about__lead {
  font-size: var(--font-size-xl);
  color: #5f6368;
  margin-bottom: var(--space-2);
  max-width: 640px;
}

.about__sub {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .about__card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
