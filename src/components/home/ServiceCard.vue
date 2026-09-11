<script setup>
import IconBase from '@/components/ui/IconBase.vue'

defineProps({
  service: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <a :href="service.href" class="service-card">
    <span class="service-card__icon">
      <IconBase :name="service.icon" :size="24" />
    </span>
    <h3 class="service-card__title">{{ service.title }}</h3>
    <p class="service-card__description">{{ service.description }}</p>
    <span class="service-card__link">View →</span>
  </a>
</template>

<style scoped>
.service-card {
  display: block;
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: box-shadow var(--transition-fast), transform var(--transition-fast);
}

.service-card:hover {
  box-shadow: 0 8px 20px rgba(31, 41, 55, 0.06);
  transform: translateY(-2px);
}

.service-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: var(--radius-lg);
  background-color: var(--color-brand);
  color: var(--color-text-white);
  margin-bottom: var(--space-4);
}

.service-card__title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.service-card__description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.service-card__link {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--color-brand);
}
</style>
