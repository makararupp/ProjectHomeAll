<script setup>
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useI18n } from '@/composables/useI18n'

const { t, isKhmer } = useI18n()
</script>

<template>
  <div class="category-page">
    <AppHeader />
    <CategoryNav />

    <main class="category-main container">
      <!-- Breadcrumb Navigation: Home > Product Categories > Logistics -->
      <nav class="category-breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/" class="category-breadcrumb_link">
          {{ t('nav.home', 'Home') }}
        </RouterLink>
        <span class="category-breadcrumb_separator" aria-hidden="true">&gt;</span>
        <RouterLink to="/products" class="category-breadcrumb_link">
          {{ t('categories.allCategories', 'Product Categories') }}
        </RouterLink>
        <span class="category-breadcrumb_separator" aria-hidden="true">&gt;</span>
        <span class="category-breadcrumb_current" aria-current="page">
          {{ t('categories.logistics', 'Logistics') }}
        </span>
      </nav>

      <!-- Clean Empty State Card matching user uploaded image -->
      <div class="empty-state-card" role="region" aria-label="No products found">
        <div class="empty-state-box" aria-hidden="true">
          <svg
            viewBox="0 0 100 100"
            width="76"
            height="76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="box-icon"
          >
            <!-- Top Face -->
            <polygon
              points="50,16 84,34 50,52 16,34"
              fill="#ffffff"
              stroke="#94a3b8"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <!-- Flap Center Seam -->
            <line
              x1="67"
              y1="25"
              x2="33"
              y2="43"
              stroke="#94a3b8"
              stroke-width="2.2"
              stroke-linecap="round"
            />
            <!-- Left Face -->
            <polygon
              points="16,34 50,52 50,88 16,70"
              fill="#ffffff"
              stroke="#94a3b8"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <!-- Red / Coral Label on Left Face -->
            <polygon
              points="24,52 42,61.5 42,70.5 24,61"
              fill="#ffffff"
              stroke="#ef4444"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <!-- Right Face -->
            <polygon
              points="50,52 84,34 84,70 50,88"
              fill="#ffffff"
              stroke="#94a3b8"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <p class="empty-state-title" :class="{ 'is-khmer': isKhmer }">
          {{ t('products.noProductsFound', 'No products found') }}
        </p>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.category-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.category-main {
  flex: 1;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 56px;
  background-color: #ffffff;
}

/* Breadcrumb Navigation */
.category-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 13.5px;
  color: #4b5563;
}

.category-breadcrumb_link {
  color: #4b5563;
  text-decoration: none;
  transition: color var(--transition-fast, 0.2s ease);
}

.category-breadcrumb_link:hover {
  color: #111827;
  text-decoration: underline;
}

.category-breadcrumb_separator {
  color: #9ca3af;
  font-size: 12px;
  user-select: none;
}

.category-breadcrumb_current {
  color: #111827;
  font-weight: 600;
}

/* Empty State Card */
.empty-state-card {
  width: 100%;
  min-height: 520px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
}

.empty-state-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.box-icon {
  display: block;
  width: 76px;
  height: 76px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.02));
}

.empty-state-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: -0.01em;
  text-align: center;
}

.empty-state-title.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 14px;
}

@media (max-width: 768px) {
  .empty-state-card {
    min-height: 380px;
    padding: 32px 16px;
  }
}
</style>
