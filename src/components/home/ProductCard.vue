<script setup>
import { RouterLink } from 'vue-router'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

function getCategoryLabel(category) {
  if (!category) return ''
  const keyMap = {
    'Steel Product': 'steelProduct',
    'Copper Pipes': 'copperPipes',
    'Agricultural Products': 'agriculturalProducts',
    'Kitchen Products': 'kitchenProducts',
    'Kitchen Product': 'kitchenProduct',
    'Seasoning & Spice': 'seasoningSpice',
    'PVC Material': 'pvcMaterial',
    'PVC Water Pipes': 'pvcMaterial',
    'Bathroom Appliances': 'bathroomAppliances',
    'Bathroom Appliance': 'bathroomAppliance',
    'Floor Tile': 'floorTile',
    'Plastic Resin': 'plasticResin'
  }
  const key = keyMap[category]
  return key ? t(`products.${key}`, category) : category
}

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
    <p class="product-card__category">{{ getCategoryLabel(product.category) }}</p>
    <p class="product-card__price">
      {{ product.price }} <span class="product-card__unit">{{ product.unit }}</span>
    </p>

    <div class="product-card__actions">
      <BaseButton
        variant="primary"
        size="sm"
        class="product-card__add-btn"
        @click="handleAddToCart"
      >
        <svg class="product-card__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span>{{ t('featured.addToCart', 'Add to Card') }}</span>
      </BaseButton>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border-softer);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
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
  margin-bottom: var(--space-3);
}

.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card__title {
  font-family: var(--font-family-title);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
  line-height: 1.35;
}

.product-card__category {
  font-size: 12.5px;
  color: var(--color-text-muted);
  margin-bottom: 4px;
}

.product-card__price {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-brand);
  margin-bottom: var(--space-3);
}

.product-card__unit {
  font-size: 12.5px;
  font-weight: 400;
  color: var(--color-text-secondary);
}

.product-card__actions {
  display: flex;
  justify-content: center;
  margin-top: auto;
}

.product-card__add-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 var(--space-3);
  height: 30px;
  font-size: 12px;
  cursor: pointer;
}

.product-card__btn-icon {
  flex-shrink: 0;
}
</style>
