<script setup>
import { RouterLink } from 'vue-router'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart'])

function handleAddToCart() {
  emit('add-to-cart', props.product)
}
</script>

<template>
  <article class="product-card">
    <RouterLink :to="`/products/${product.id}`" class="product-card__link">
      <div class="product-card__image">
        <img v-if="product.image" :src="product.image" :alt="product.category" />
        <ImagePlaceholder v-else :label="product.category" />
      </div>

      <h3 class="product-card__title" :lang="product.title === product.category ? 'en' : 'km'">
        {{ product.title }}
      </h3>
    </RouterLink>
    <p class="product-card__category">{{ product.category }}</p>
    <p class="product-card__price">
      {{ product.price }} <span class="product-card__unit">{{ product.unit }}</span>
    </p>

    <BaseButton variant="primary" size="sm">
      <button type="button" class="product-card__cta" @click="handleAddToCart">
        Add to Card
      </button>
    </BaseButton>
  </article>
</template>

<style scoped>
.product-card {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border-softer);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
}

.product-card__link {
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.product-card__link:hover .product-card__title {
  color: var(--color-brand);
}

.product-card__image {
  width: 100%;
  aspect-ratio: 286 / 185;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--space-5);
}

.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card__title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.product-card__category {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-2);
}

.product-card__price {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-brand);
  margin-bottom: var(--space-4);
}

.product-card__unit {
  font-size: var(--font-size-sm);
  font-weight: 400;
  color: var(--color-text-secondary);
}

.product-card__cta {
  width: 100%;
  height: 100%;
  color: inherit;
  font: inherit;
  font-weight: 600;
}
</style>
