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
  padding: 8px 24px;
  background: transparent;
  color: #3b5bf5; /* Vibrant blue matching screenshot */
  font-size: 15.5px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
  border-radius: 8px;
}

.featured_show-more-btn--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  letter-spacing: 0;
  line-height: 1.5;
}

.featured_show-more-btn:hover:not(:disabled) {
  color: #1d4ed8;
  background-color: #eff6ff;
  transform: translateY(-1px);
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
  border: 2px solid #cbd5e1;
  border-top-color: #3b5bf5;
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
