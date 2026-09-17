<script setup>
import { RouterLink } from 'vue-router'
import { footerColumns, socialLinks } from '@/data/footerLinks'
import { useI18n } from '@/composables/useI18n'

const { t, isKhmer } = useI18n()
const year = new Date().getFullYear()

function isExternal(href) {
  return typeof href === 'string' && (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http'))
}
</script>

<template>
  <footer class="app-footer" :class="{ 'is-khmer': isKhmer }">
    <div class="container app-footer_top">
      <div class="app-footer_brand">
        <p class="app-footer_tagline" :class="{ 'is-khmer': isKhmer }">
          {{ t('footer.tagline', 'Your business marketplace for products, services and opportunities.') }}
        </p>
        <p class="app-footer_address" :class="{ 'is-khmer': isKhmer }">
          {{ t('footer.address', 'Tolaka St, Krong Siem Reap 171201') }}
        </p>
      </div>

      <div class="app-footer_columns">
        <div v-for="column in footerColumns" :key="column.title" class="app-footer_column">
          <h3 :class="{ 'is-khmer': isKhmer }">
            {{ isKhmer && column.titleKm ? column.titleKm : column.title }}
          </h3>
          <ul>
            <li v-for="link in column.links" :key="link.label">
              <a
                v-if="isExternal(link.href)"
                :href="link.href"
                :target="link.href.startsWith('http') ? '_blank' : undefined"
                :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                :class="{ 'is-khmer': isKhmer }"
              >
                {{ isKhmer && link.labelKm ? link.labelKm : link.label }}
              </a>
              <RouterLink
                v-else
                :to="link.href"
                :class="{ 'is-khmer': isKhmer }"
              >
                {{ isKhmer && link.labelKm ? link.labelKm : link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="app-footer_divider container" />

    <div class="container app-footer_bottom">
      <p :class="{ 'is-khmer': isKhmer }">
        &copy; {{ year }} HomeAll. {{ t('footer.rights', 'All rights reserved.') }}
      </p>
      <ul class="app-footer_social">
        <li v-for="social in socialLinks" :key="social.label">
          <a :href="social.href" target="_blank" rel="noopener">{{ social.label }}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: var(--color-bg-surface);
  padding-top: var(--space-12);
}

.app-footer_top {
  display: grid;
  grid-template-columns: minmax(240px, 340px) 1fr;
  gap: var(--space-10);
  padding-bottom: var(--space-10);
}

.app-footer_tagline {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: 1.6;
  max-width: 340px;
}

.app-footer_address {
  margin-top: var(--space-6);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.app-footer_columns {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

.app-footer_column h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-heading);
  margin-bottom: var(--space-4);
}

.app-footer_column ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.app-footer_column a {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.app-footer_column a:hover {
  color: var(--color-brand);
}

.app-footer_divider {
  border-top: 1px solid var(--color-border-softer);
}

.app-footer_bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6) var(--space-6);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.app-footer_social {
  display: flex;
  gap: var(--space-6);
}

.app-footer_social a:hover {
  color: var(--color-brand);
}

@media (max-width: 900px) {
  .app-footer_top {
    grid-template-columns: 1fr;
  }

  .app-footer_columns {
    grid-template-columns: repeat(2, 1fr);
  }

  .app-footer_bottom {
    flex-direction: column;
    gap: var(--space-3);
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .app-footer_columns {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .app-footer {
    padding-top: var(--space-6);
  }
}

/* Khmer typography adjustments */
.app-footer.is-khmer {
  font-family: var(--font-family-khmer, 'Siemreap', 'Battambang', sans-serif);
}

.app-footer_tagline.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  line-height: 1.8;
  font-size: 14.5px;
}

.app-footer_address.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  line-height: 1.7;
}

.app-footer_column h3.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 16px;
  line-height: 1.5;
  font-weight: 700;
}

.app-footer_column a.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 13.5px;
  line-height: 1.7;
}

.app-footer_bottom p.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  line-height: 1.6;
}
</style>
