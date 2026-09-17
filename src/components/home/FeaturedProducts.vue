<script setup>
import { ref, computed } from 'vue'
import { products } from '@/data/products'
import ProductCard from './ProductCard.vue'
import { useI18n } from '@/composables/useI18n'
import { useCart } from '@/composables/useCart'

const { t, isKhmer } = useI18n()
const { addToCart } = useCart()

// Number of products to show initially (10 = 2 full rows of 5 cards)
const initialCount = 10
const visibleCount = ref(initialCount)
const isLoading = ref(false)

// Slice products currently visible
const visibleProducts = computed(() => {
  return products.slice(0, visibleCount.value)
})

// Check if there are more products to load
const hasMore = computed(() => {
  return visibleCount.value < products.length
})

// Load 5 more products (1 full row) when "Show More" is clicked
function handleShowMore() {
  if (!hasMore.value || isLoading.value) return
  isLoading.value = true

  setTimeout(() => {
    visibleCount.value = Math.min(products.length, visibleCount.value + 5)
    isLoading.value = false
  }, 250)
}

function handleAddToCart(product) {
  addToCart(product, 1)
}
</script>

<template>
  <section class="featured" aria-labelledby="featured-heading">
    <div class="container">
      <h2
        id="featured-heading"
        class="featured_title"
        :class="{ 'featured_title--km': isKhmer }"
        :lang="isKhmer ? 'km' : 'en'"
      >
        {{ t('featured.title', 'Feature Product') }}
      </h2>
      <div class="section-underline" />
      <p
        class="featured_subtitle"
        :class="{ 'featured_subtitle--km': isKhmer }"
        :lang="isKhmer ? 'km' : 'en'"
      >
        {{ t('featured.subtitle', 'Popular products from trusted suppliers') }}
      </p>

      <div class="featured_grid">
        <ProductCard
          v-for="product in visibleProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>

      <!-- Show More Action Button (Matching screenshot) -->
      <div v-if="hasMore" class="featured_actions">
        <button
          type="button"
          class="featured_show-more-btn"
          :class="{ 'featured_show-more-btn--km': isKhmer }"
          :lang="isKhmer ? 'km' : 'en'"
          :disabled="isLoading"
          @click="handleShowMore"
        >
          <span v-if="isLoading" class="loading-spinner" aria-hidden="true" />
          <span>{{ isLoading ? (isKhmer ? 'កំពុងផ្ទុក...' : 'Loading...') : t('featured.showMore', 'Show More') }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured {
  padding: 24px 0 40px 0;
}

.featured_title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-heading);
  line-height: 1.3;
}

.featured_title--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  line-height: 1.5;
  letter-spacing: 0;
  padding-bottom: 2px;
}

.featured_subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
  line-height: 1.4;
}

.featured_subtitle--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  line-height: 1.6;
  letter-spacing: 0;
}

.featured_grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

/* Show More Button (Matching user screenshot) */
.featured_actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 36px;
}

.featured_show-more-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 28px;
  background-color: #ffffff;
  color: #000000;
  font-size: 15.5px;
  font-weight: 700;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.featured_show-more-btn span {
  color: inherit;
  transition: color 0.2s ease;
}

.featured_show-more-btn--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  letter-spacing: 0;
  line-height: 1.5;
}

.featured_show-more-btn:hover:not(:disabled) {
  color: #ffffff;
  background-color: #000000;
  border-color: #000000;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}

.featured_show-more-btn:hover:not(:disabled) span {
  color: #ffffff;
}

.featured_show-more-btn:active:not(:disabled) {
  transform: translateY(0);
}

.featured_show-more-btn:disabled {
  opacity: 0.7;
  cursor: wait;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1280px) {
  .featured_grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}

@media (max-width: 1024px) {
  .featured_grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
}

@media (max-width: 768px) {
  .featured_grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 360px) {
  .featured_grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>

<!-- Non-scoped so body.dark / :root[data-theme="dark"] ancestor selectors work -->
<style>
/* =====================================================
   Featured Products – Dark Mode Overrides
   ===================================================== */

/* Section Title → white */
:root[data-theme="dark"] .featured_title,
body.dark .featured_title {
  color: #ffffff !important;
}

/* Subtitle → light */
:root[data-theme="dark"] .featured_subtitle,
body.dark .featured_subtitle {
  color: #94a3b8 !important;
}

/* Underline bar → white */
:root[data-theme="dark"] .section-underline,
body.dark .section-underline {
  background-color: #ffffff !important;
}

/* Show more button in dark mode:
   Normal: White button, Black title
   Hover: Dark background, White title */
:root[data-theme="dark"] .featured_show-more-btn,
body.dark .featured_show-more-btn {
  background-color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #000000 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
}

:root[data-theme="dark"] .featured_show-more-btn span,
body.dark .featured_show-more-btn span {
  color: #000000 !important;
}

:root[data-theme="dark"] .featured_show-more-btn:hover:not(:disabled),
body.dark .featured_show-more-btn:hover:not(:disabled) {
  background-color: #0f172a !important;
  border-color: #ffffff !important;
  color: #ffffff !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5) !important;
  transform: translateY(-1px);
}

:root[data-theme="dark"] .featured_show-more-btn:hover:not(:disabled) span,
body.dark .featured_show-more-btn:hover:not(:disabled) span {
  color: #ffffff !important;
}

:root[data-theme="dark"] .featured_show-more-btn:hover .loading-spinner,
body.dark .featured_show-more-btn:hover .loading-spinner {
  border-color: rgba(255, 255, 255, 0.3) !important;
  border-top-color: #ffffff !important;
}
</style>

