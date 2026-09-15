<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { products } from '@/data/products'
import ProductCard from './ProductCard.vue'
import { useI18n } from '@/composables/useI18n'
import { useCart } from '@/composables/useCart'

const { t, isKhmer } = useI18n()
const { addToCart } = useCart()

// Number of products to show initially
const initialCount = 5
const visibleCount = ref(initialCount)
const isLoading = ref(false)
const sentinelRef = ref(null)
let observer = null

// Slice products currently visible
const visibleProducts = computed(() => {
  return products.slice(0, visibleCount.value)
})

// Check if there are more products to load
const hasMore = computed(() => {
  return visibleCount.value < products.length
})

// Automatically load more products
function loadMore() {
  if (!hasMore.value || isLoading.value) return
  isLoading.value = true

  setTimeout(() => {
    visibleCount.value = Math.min(products.length, visibleCount.value + 5)
    isLoading.value = false

    nextTick(() => {
      if (sentinelRef.value && observer && hasMore.value) {
        observer.unobserve(sentinelRef.value)
        observer.observe(sentinelRef.value)
      }
    })
  }, 350)
}

function handleAddToCart(product) {
  addToCart(product, 1)
}

onMounted(() => {
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore.value && !isLoading.value) {
          loadMore()
        }
      },
      { rootMargin: '180px' }
    )
    if (sentinelRef.value) {
      observer.observe(sentinelRef.value)
    }
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <section class="featured" aria-labelledby="featured-heading">
    <div class="container">
      <h2 id="featured-heading" class="featured_title">{{ t('featured.title', 'Feature Product') }}</h2>
      <div class="section-underline" />
      <p class="featured_subtitle">{{ t('featured.subtitle', 'Popular products from trusted suppliers') }}</p>

      <div class="featured_grid">
        <ProductCard
          v-for="product in visibleProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>

      <!-- Auto-loading Sentinel trigger & Spinner -->
      <div v-if="hasMore" ref="sentinelRef" class="featured_sentinel">
        <div v-if="isLoading" class="featured_loading">
          <span class="loading-spinner" aria-hidden="true" />
          <span class="loading-text">{{ isKhmer ? 'កំពុងផ្ទុកបន្ថែម...' : 'Loading more products...' }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured {
  padding: var(--space-10) 0;
}

.featured_title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-heading);
}

.featured_subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
}

.featured_grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

/* Auto-loading Sentinel & Indicator */
.featured_sentinel {
  width: 100%;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--space-6);
}

.featured_loading {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #64748b;
  font-size: 13.5px;
  font-weight: 500;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid #e2e8f0;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1200px) {
  .featured_grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1024px) {
  .featured_grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .featured_grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .featured_grid {
    grid-template-columns: 1fr;
  }
}
</style>
