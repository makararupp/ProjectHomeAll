<script setup>
import { products } from '@/data/products'
import ProductCard from './ProductCard.vue'

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
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
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
