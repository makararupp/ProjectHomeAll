<script setup>
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <div class="retails-wholesale-page">
    <AppHeader />
    <CategoryNav />

    <main class="retails-wholesale-main container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/" class="breadcrumb-link">
          {{ t('nav.home', 'Home') }}
        </RouterLink>
        <span class="breadcrumb-separator">&gt;</span>
        <RouterLink to="/products" class="breadcrumb-link">
          {{ t('categories.allCategories', 'All Categories') }}
        </RouterLink>
        <span class="breadcrumb-separator">&gt;</span>
        <span class="breadcrumb-current">
          {{ t('servicesSection.retailsWholesale', 'Retails & Wholesale') }}
        </span>
      </nav>
    </main> 

    <AppFooter />
  </div>
</template>

<style scoped>
.retails-wholesale-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
}

.retails-wholesale-main {
  flex: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 20px 60px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  color: #64748b;
  margin-bottom: 24px;
}

.breadcrumb-link {
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--color-brand, #16a34a);
}

.breadcrumb-separator {
  color: #94a3b8;
  font-size: 11px;
}

.breadcrumb-current {
  color: #0f172a;
  font-weight: 600;
}
</style>

<!-- Non-scoped so body.dark / :root[data-theme="dark"] ancestor selectors work -->
<style>
:root[data-theme="dark"] .breadcrumb-link,
body.dark .breadcrumb-link {
  color: #94a3b8 !important;
}

:root[data-theme="dark"] .breadcrumb-current,
body.dark .breadcrumb-current {
  color: #ffffff !important;
}
</style>


