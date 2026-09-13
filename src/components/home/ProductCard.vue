<script setup>
import { ref } from 'vue'
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
const isJustAdded = ref(false)

function handleAddToCart() {
  emit('add-to-cart', props.product)
  isJustAdded.value = true
  setTimeout(() => {
    isJustAdded.value = false
  }, 1200)
}
</script>

<template>
  <article class="product-card">
    <RouterLink :to="`/products/${product.id}`" class="product-card_link">
      <div class="product-card_image">
        <img v-if="product.image" :src="product.image" :alt="product.category" />
        <ImagePlaceholder v-else :label="product.category" />
      </div>

      <h3 class="product-card_title" :lang="product.title === product.category ? 'en' : 'km'">
        {{ product.title }}
      </h3>
    </RouterLink>
    <p class="product-card_category">{{ getCategoryLabel(product.category) }}</p>
    <p class="product-card_price">
      {{ product.price }} <span class="product-card_unit">{{ product.unit }}</span>
    </p>

    <div class="product-card_actions">
      <BaseButton
        variant="primary"
        size="sm"
        class="product-card_add-btn"
        :class="{ 'is-added': isJustAdded }"
        @click="handleAddToCart"
      >
        <svg v-if="!isJustAdded" class="product-card_btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <svg v-else class="product-card_btn-icon" viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <span>{{ isJustAdded ? t('products.addedToCart', 'Added!') : t('featured.addToCart', 'Add to Card') }}</span>
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

.product-card_link {
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.product-card_link:hover .product-card_title {
  color: var(--color-brand);
}

.product-card_image {
  width: 100%;
  aspect-ratio: 286 / 185;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--space-3);
}

.product-card_image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card_title {
  font-family: var(--font-family-title);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
  line-height: 1.35;
}

.product-card_category {
  font-size: 12.5px;
  color: var(--color-text-muted);
  margin-bottom: 4px;
}

.product-card_price {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-brand);
  margin-bottom: var(--space-3);
}

.product-card_unit {
  font-size: 12.5px;
  font-weight: 400;
  color: var(--color-text-secondary);
}

.product-card_actions {
  display: flex;
  justify-content: center;
  margin-top: auto;
}

.product-card_add-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 var(--space-3);
  height: 30px;
  font-size: 12px;
  cursor: pointer;
}

.product-card_btn-icon {
  flex-shrink: 0;
}
</style>
