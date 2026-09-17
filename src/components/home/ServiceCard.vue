<script setup>
import { RouterLink } from 'vue-router'
import IconBase from '@/components/ui/IconBase.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

defineProps({
  service: {
    type: Object,
    required: true
  }
})

function getServiceKey(id) {
  if (!id) return ''
  return id.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}
</script>

<template>
  <RouterLink :to="service.href" class="service-card">
    <span class="service-card_icon">
      <IconBase :name="service.icon" :size="22" />
    </span>
    <span class="service-card_title">{{ t(`servicesSection.${getServiceKey(service.id)}`, service.title) }}</span>
  </RouterLink>
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

.service-card_icon {
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

.service-card:hover .service-card_icon {
  background-color: var(--color-brand);
  color: #ffffff;
  transform: scale(1.05);
}

.service-card_title {
  font-size: 13.5px;
  font-weight: 400; /* Regular lightweight font matching the screenshot */
  color: #6b7280; /* Soft gray text color matching the screenshot */
  text-align: center;
  line-height: 1.35;
  transition: color var(--transition-fast);
}

.service-card:hover .service-card_title {
  color: var(--color-text-primary);
}
</style>

<!-- Non-scoped so body.dark / :root[data-theme="dark"] ancestor selectors work -->
<style>
/* =====================================================
   Service Card – Dark Mode Overrides
   ===================================================== */

:root[data-theme="dark"] .service-card,
body.dark .service-card {
  background-color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

:root[data-theme="dark"] .service-card:hover,
body.dark .service-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
}

:root[data-theme="dark"] .service-card_title,
body.dark .service-card_title {
  color: #1f2937 !important;
}

:root[data-theme="dark"] .service-card:hover .service-card_title,
body.dark .service-card:hover .service-card_title {
  color: #111827 !important;
}

:root[data-theme="dark"] .service-card_icon,
body.dark .service-card_icon {
  background-color: #f3f4f6 !important;
  color: var(--color-brand-dark, #16a34a) !important;
}

:root[data-theme="dark"] .service-card:hover .service-card_icon,
body.dark .service-card:hover .service-card_icon {
  background-color: var(--color-brand, #34c759) !important;
  color: #ffffff !important;
}
</style>

