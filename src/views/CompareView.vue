<script setup>
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useCompare } from '@/composables/useCompare'
import { useCart } from '@/composables/useCart'
import { useI18n } from '@/composables/useI18n'

const { t, isKhmer } = useI18n()
const { compareItems, removeFromCompare, clearCompare } = useCompare()
const { addToCart } = useCart()

function handleAddToCart(item) {
  addToCart(item, 1)
}
</script>

<template>
  <div class="compare-page">
    <AppHeader />
    <CategoryNav />

    <main class="compare-main container">
      <!-- Page Top Header Bar (matches screenshot) -->
      <div class="compare-topbar">
        <h1 class="compare-page-title" :class="{ 'is-khmer': isKhmer }">
          {{ t('comparePage.title', 'Compare') }}
        </h1>

        <nav class="compare-breadcrumb" aria-label="Breadcrumb">
          <RouterLink to="/" class="compare-breadcrumb_link">
            {{ t('comparePage.breadcrumbHome', 'Home') }}
          </RouterLink>
          <span class="compare-breadcrumb_sep">/</span>
          <span class="compare-breadcrumb_current">
            {{ t('comparePage.breadcrumbCompare', '"Compare"') }}
          </span>
        </nav>
      </div>

      <!-- Main Comparison Card Box (matches screenshot) -->
      <div class="compare-card">
        <!-- Card Header with "Comparison" and "Reset Compare List" -->
        <div class="compare-card_header">
          <h2 class="compare-card_title">
            {{ t('comparePage.comparison', 'Comparison') }}
          </h2>
          <button
            type="button"
            class="compare-reset-btn"
            @click="clearCompare"
          >
            {{ t('comparePage.resetList', 'Reset Compare List') }}
          </button>
        </div>

        <!-- Empty State (matches screenshot: "Your comparison list is empty") -->
        <div v-if="compareItems.length === 0" class="compare-empty">
          <p class="compare-empty_text">
            {{ t('comparePage.emptyMessage', 'Your comparison list is empty') }}
          </p>
          <RouterLink to="/all-categories" class="compare-empty_btn">
            {{ t('comparePage.startShopping', 'Browse Products') }}
          </RouterLink>
        </div>

        <!-- Compared Products Grid / Table when items are present -->
        <div v-else class="compare-table-wrap">
          <div class="compare-grid">
            <article
              v-for="item in compareItems"
              :key="item.id"
              class="compare-product-col"
            >
              <div class="compare-col_header">
                <button
                  type="button"
                  class="compare-remove-btn"
                  title="Remove from compare"
                  @click="removeFromCompare(item.id)"
                >
                  ✕
                </button>
              </div>

              <div class="compare-col_image-wrap">
                <img :src="item.image" :alt="item.name || item.title" class="compare-col_img" />
              </div>

              <h3 class="compare-col_title">
                {{ item.title || item.name }}
              </h3>

              <div class="compare-col_price">
                {{ item.price }}
              </div>

              <div v-if="item.brand" class="compare-col_brand">
                <span class="compare-brand-tag">{{ item.brand }}</span>
              </div>

              <div class="compare-col_stock">
                <span class="stock-dot">●</span> In Stock
              </div>

              <button
                type="button"
                class="compare-add-cart-btn"
                @click="handleAddToCart(item)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span>Add to Cart</span>
              </button>
            </article>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.compare-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.compare-main {
  flex: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px 80px;
}

/* Top Bar: Title on left, Breadcrumb on right (matches reference screenshot) */
.compare-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.compare-page-title {
  font-size: 26px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  font-family: var(--font-family-title);
  letter-spacing: -0.01em;
}

.compare-page-title.is-khmer {
  font-family: 'Kantumruy Pro', 'Battambang', sans-serif;
}

.compare-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  color: #6b7280;
}

.compare-breadcrumb_link {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.15s ease;
}

.compare-breadcrumb_link:hover {
  color: #111827;
}

.compare-breadcrumb_sep {
  color: #9ca3af;
  user-select: none;
}

.compare-breadcrumb_current {
  color: #111827;
  font-weight: 700;
}

/* Comparison Card Box (matches screenshot) */
.compare-card {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.compare-card_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #f1f5f9;
}

.compare-card_title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.compare-reset-btn {
  background-color: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fee2e2;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.compare-reset-btn:hover {
  background-color: #fee2e2;
  color: #991b1b;
}

/* Empty State (matches screenshot: "Your comparison list is empty") */
.compare-empty {
  padding: 70px 24px 90px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.compare-empty_text {
  font-size: 16px;
  color: #374151;
  font-weight: 500;
  margin: 0;
}

.compare-empty_btn {
  display: inline-flex;
  align-items: center;
  background-color: #111827;
  color: #ffffff;
  padding: 8px 18px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.compare-empty_btn:hover {
  background-color: #1f2937;
}

/* Non-empty Grid */
.compare-table-wrap {
  padding: 24px;
  overflow-x: auto;
}

.compare-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.compare-product-col {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #ffffff;
}

.compare-col_header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.compare-remove-btn {
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s ease;
}

.compare-remove-btn:hover {
  color: #ef4444;
}

.compare-col_image-wrap {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.compare-col_img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.compare-col_title {
  font-family: var(--font-family-title);
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px;
  line-height: 1.4;
  min-height: 40px;
}

.compare-col_price {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.compare-col_brand {
  margin-bottom: 8px;
}

.compare-brand-tag {
  font-size: 11px;
  font-weight: 600;
  background: #f3f4f6;
  color: #4b5563;
  padding: 2px 6px;
  border-radius: 4px;
}

.compare-col_stock {
  font-size: 12px;
  color: #16a34a;
  font-weight: 600;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stock-dot {
  font-size: 9px;
}

.compare-add-cart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  background: #111827;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
  margin-top: auto;
}

.compare-add-cart-btn:hover {
  background: #1f2937;
}

@media (max-width: 640px) {
  .compare-topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>

