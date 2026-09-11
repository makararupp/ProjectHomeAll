<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { products } from '@/data/products'
import ProductCard from './ProductCard.vue'

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
  // Placeholder handler — connect to a real cart store (e.g. Pinia) later.
  console.log('Added to cart:', product.id)
}
</script>

<template>
  <section class="featured" aria-labelledby="featured-heading">
    <div class="container">
      <h2 id="featured-heading" class="featured__title">Feature Product</h2>
      <div class="section-underline" />
      <p class="featured__subtitle">Popular products from trusted suppliers</p>

      <div class="featured__grid">
        <ProductCard
          v-for="product in visibleProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>

      <div class="featured__footer">
        <!-- Load More button: reveals more products in the grid -->
        <button
          v-if="hasMore"
          type="button"
          class="featured__btn"
          @click="loadMore"
        >
          View More Products
        </button>

        <!-- Once all featured products are displayed, offer to browse the full catalog -->
        <RouterLink
          v-else
          to="/products"
          class="featured__btn featured__btn--store"
        >
          View All Products in Store
          <span class="featured__btn-icon" aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured {
  padding-bottom: var(--space-16);
}

.featured__title {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--color-text-heading);
}

.featured__subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-8);
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

.featured__footer {
  display: flex;
  justify-content: center;
  margin-top: var(--space-10);
}

.featured__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 12px 28px;
  background-color: var(--color-bg-surface);
  border: 1.5px solid var(--color-brand);
  border-radius: var(--radius-md);
  color: var(--color-brand-dark);
  font-size: var(--font-size-md);
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.featured__btn:hover {
  background-color: var(--color-brand);
  color: var(--color-text-white);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(52, 199, 89, 0.25);
}

.featured__btn-icon {
  font-size: 16px;
  font-weight: 700;
  transition: transform var(--transition-fast);
}

.featured__btn:hover .featured__btn-icon {
  transform: scale(1.2);
}

.featured__btn--store:hover .featured__btn-icon {
  transform: translateX(4px);
}

@media (max-width: 1024px) {
  .featured__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .featured__grid {
    grid-template-columns: 1fr;
  }
}
</style>
