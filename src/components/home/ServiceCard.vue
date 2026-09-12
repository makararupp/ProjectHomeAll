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
      <IconBase :name="service.icon" :size="22" />
    </span>
    <span class="service-card__title">{{ service.title }}</span>
  </a>
</template>

<style scoped>
.service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: var(--color-bg-surface);
  border: 1px solid #eef0f2;
  border-radius: 12px;
  padding: 16px 10px;
  min-height: 115px;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.service-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.service-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background-color: #f3f4f6;
  color: var(--color-brand-dark);
  transition: all var(--transition-fast);
}

.service-card:hover .service-card__icon {
  background-color: var(--color-brand);
  color: #ffffff;
  transform: scale(1.05);
}

.service-card__title {
  font-size: 13.5px;
  font-weight: 400; /* Regular lightweight font matching the screenshot */
  color: #6b7280; /* Soft gray text color matching the screenshot */
  text-align: center;
  line-height: 1.35;
  transition: color var(--transition-fast);
}

.service-card:hover .service-card__title {
  color: var(--color-text-primary);
}
</style>
