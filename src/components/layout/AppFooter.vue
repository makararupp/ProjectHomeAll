<script setup>
import { footerColumns, socialLinks } from '@/data/footerLinks'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="container app-footer__top">
      <div class="app-footer__brand">
        <p class="app-footer__tagline">
          Your business marketplace for products, services and opportunities.
        </p>
        <p class="app-footer__address">Tolaka St, Krong Siem Reap 171201</p>
      </div>

      <div class="app-footer__columns">
        <div v-for="column in footerColumns" :key="column.title" class="app-footer__column">
          <h3>{{ column.title }}</h3>
          <ul>
            <li v-for="link in column.links" :key="link.label">
              <a :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="app-footer__divider container" />

    <div class="container app-footer__bottom">
      <p>&copy; {{ year }} HomeAll. All rights reserved.</p>
      <ul class="app-footer__social">
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

.app-footer__top {
  display: grid;
  grid-template-columns: minmax(240px, 340px) 1fr;
  gap: var(--space-10);
  padding-bottom: var(--space-10);
}

.app-footer__tagline {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: 1.6;
  max-width: 340px;
}

.app-footer__address {
  margin-top: var(--space-6);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.app-footer__columns {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

.app-footer__column h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-heading);
  margin-bottom: var(--space-4);
}

.app-footer__column ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.app-footer__column a {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.app-footer__column a:hover {
  color: var(--color-brand);
}

.app-footer__divider {
  border-top: 1px solid var(--color-border-softer);
}

.app-footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6) var(--space-6);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.app-footer__social {
  display: flex;
  gap: var(--space-6);
}

.app-footer__social a:hover {
  color: var(--color-brand);
}

@media (max-width: 900px) {
  .app-footer__top {
    grid-template-columns: 1fr;
  }

  .app-footer__columns {
    grid-template-columns: repeat(2, 1fr);
  }

  .app-footer__bottom {
    flex-direction: column;
    gap: var(--space-3);
    align-items: flex-start;
  }
}
</style>
