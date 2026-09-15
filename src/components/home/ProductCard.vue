<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue'
import { useI18n } from '@/composables/useI18n'
import { useWishlist } from '@/composables/useWishlist'

const { t } = useI18n()
const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart'])
const isJustAdded = ref(false)

const isWishlisted = computed(() => {
  return isInWishlist(props.product.id)
})

function handleToggleWishlist(event) {
  event.preventDefault()
  event.stopPropagation()
  if (isWishlisted.value) {
    removeFromWishlist(props.product.id)
  } else {
    addToWishlist(props.product)
  }
}

function handleAddToCart(event) {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  if (props.product && props.product.inStock === false) return
  emit('add-to-cart', props.product)
  isJustAdded.value = true
  setTimeout(() => {
    isJustAdded.value = false
  }, 1200)
}
</script>

<template>
  <article class="product-card" :class="{ 'is-out-of-stock': product.inStock === false }">
    <RouterLink :to="`/products/${product.id}`" class="product-card_link">
      <!-- Compact Product Thumbnail Box -->
      <div class="product-card_image">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.title || product.category"
          loading="lazy"
        />
        <ImagePlaceholder v-else :label="product.category" />
      </div>

      <!-- Title (Clamped to 2 lines) -->
      <h3 class="product-card_title" :title="product.title">
        {{ product.title }}
      </h3>

      <!-- Red-Orange Bold Price (Matching screenshot) -->
      <div class="product-card_price-wrap">
        <span class="product-card_price">{{ product.price }}</span>
        <span v-if="product.unit" class="product-card_unit">{{ product.unit }}</span>
      </div>
    </RouterLink>

    <!-- Bottom Action Row: Blue Quick Button + Circular Heart Wishlist -->
    <div class="product-card_actions">
      <!-- Blue Quick Add Button -->
      <button
        type="button"
        class="product-card_quick-btn"
        :class="{ 'is-added': isJustAdded, 'is-disabled': product.inStock === false }"
        :disabled="product.inStock === false"
        :title="product.inStock === false ? t('products.outOfStock', 'Out of stock') : t('featured.quickAdd', 'Quick Add')"
        @click="handleAddToCart"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" class="btn-cart-icon">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span class="btn-text">
          {{
            product.inStock === false
              ? t('products.outOfStock', 'Out of stock')
              : (isJustAdded ? t('products.addedToCart', 'Added!') : t('featured.quickAdd', 'Quick Add'))
          }}
        </span>
      </button>

      <!-- Circular Heart Wishlist Button -->
      <button
        type="button"
        class="product-card_wishlist-btn"
        :class="{ 'is-active': isWishlisted }"
        :title="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
        :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
        @click="handleToggleWishlist"
      >
        <svg
          viewBox="0 0 24 24"
          :fill="isWishlisted ? '#ef4444' : 'none'"
          :stroke="isWishlisted ? '#ef4444' : '#64748b'"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          width="16"
          height="16"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  background-color: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px;
  padding: 10px 10px 12px 10px;
  display: flex;
  flex-direction: column;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.product-card:hover {
  border-color: #3b82f6; /* Vivid blue border matching screenshot */
  box-shadow: 0 14px 28px -4px rgba(59, 130, 246, 0.22), 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-5px); /* Smooth popup lift on hover */
}

.product-card_link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  flex: 1;
}

.product-card_image {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f8fafc;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-card_image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.25s ease;
}

.product-card:hover .product-card_image img {
  transform: scale(1.04);
}

.product-card_title {
  font-family: var(--font-family-title, inherit);
  font-size: 13.5px;
  font-weight: 600;
  color: #111827;
  line-height: 1.35;
  margin: 0 0 6px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 36px;
  transition: color 0.15s ease;
}

.product-card:hover .product-card_title {
  color: #2563eb;
}

.product-card_price-wrap {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 12px;
}

.product-card_price {
  font-size: 16px;
  font-weight: 700;
  color: #ea580c; /* Vivid red-orange price matching ฿ 204.00 in the screenshot */
}

.product-card_unit {
  font-size: 12px;
  font-weight: 400;
  color: #6b7280;
}

/* Actions Row: Blue Button + Circular Heart Button */
.product-card_actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
}

.product-card_quick-btn {
  flex: 1;
  height: 38px;
  padding: 0 12px;
  background-color: #3b5bf5; /* Vibrant blue matching screenshot */
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(59, 91, 245, 0.25);
}

.product-card_quick-btn:hover:not(:disabled) {
  background-color: #2446ea;
  box-shadow: 0 6px 16px rgba(59, 91, 245, 0.42);
  transform: translateY(-2px);
}

.product-card_quick-btn:active:not(:disabled) {
  transform: translateY(0);
}

.product-card_quick-btn:disabled,
.product-card_quick-btn.is-disabled {
  background-color: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.product-card_quick-btn.is-added {
  background-color: #16a34a;
}

.btn-cart-icon {
  flex-shrink: 0;
}

.btn-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Circular Heart Wishlist Button */
.product-card_wishlist-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  color: #64748b;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card_wishlist-btn:hover {
  border-color: #fca5a5;
  color: #ef4444;
  background-color: #fff1f2;
  transform: scale(1.12);
  box-shadow: 0 3px 8px rgba(239, 68, 68, 0.18);
}

.product-card_wishlist-btn.is-active {
  border-color: #fecaca;
  background-color: #fff1f2;
  color: #ef4444;
  transform: scale(1.05);
}

/* Out of Stock Card */
.product-card.is-out-of-stock .product-card_image img {
  filter: grayscale(20%);
  opacity: 0.8;
}
</style>
