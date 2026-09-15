<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { products } from '@/data/products'
import ProductCard from './ProductCard.vue'
import { useI18n } from '@/composables/useI18n'
import { useCart } from '@/composables/useCart'

const { t } = useI18n()
const { addToCart } = useCart()

// Number of products to show initially
const initialCount = 4
const visibleCount = ref(initialCount)

// Slice products currently visible
const visibleProducts = computed(() => {
  return products.slice(0, visibleCount.value)
})

// Check if there are more products to load
const hasMore = computed(() => {
  return visibleCount.value < products.length
})

// Load 4 more products into the grid
function loadMore() {
  visibleCount.value += 4
}

function handleAddToCart(product) {
  addToCart(product, 1)
}
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

      <div class="featured_footer">
        <!-- Load More button: reveals more products in the grid -->
        <button
          v-if="hasMore"
          type="button"
          class="featured_btn"
          @click="loadMore"
        >
          {{ t('featured.viewMore', 'View More Products') }}
        </button>

        <!-- Once all featured products are displayed, offer to browse the full catalog -->
        <RouterLink
          v-else
          to="/products"
          class="featured_btn featured_btn--store"
        >
          {{ t('featured.viewAll', 'View All Products in Store') }}
          <span class="featured_btn-icon" aria-hidden="true">→</span>
        </RouterLink>
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
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.featured_footer {
  display: flex;
  justify-content: center;
  margin-top: var(--space-6);
}

.featured_btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 8px 22px;
  background-color: var(--color-bg-surface);
  border: 1.5px solid var(--color-brand);
  border-radius: var(--radius-sm);
  color: var(--color-brand-dark);
  font-size: var(--font-size-sm);
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.featured_btn:hover {
  background-color: var(--color-brand);
  color: var(--color-text-white);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(52, 199, 89, 0.25);
}

.featured_btn-icon {
  font-size: 14px;
  font-weight: 700;
  transition: transform var(--transition-fast);
}

.featured_btn:hover .featured_btn-icon {
  transform: scale(1.2);
}

.featured_btn--store:hover .featured_btn-icon {
  transform: translateX(4px);
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
