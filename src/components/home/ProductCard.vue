<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue'
import { useI18n } from '@/composables/useI18n'
import { useWishlist } from '@/composables/useWishlist'
import { useCompare } from '@/composables/useCompare'

const { t, isKhmer } = useI18n()
const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
const { isInCompare, toggleCompare } = useCompare()

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

const isCompared = computed(() => {
  return isInCompare(props.product.id)
})

function handleToggleCompare(event) {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  toggleCompare(props.product)
}

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
          :alt="isKhmer ? (product.titleKm || product.title) : (product.titleEn || product.title)"
          loading="lazy"
        />
        <ImagePlaceholder v-else :label="product.category" />
      </div>

      <!-- Title (Clamped to 2 lines) -->
      <h3
        class="product-card_title"
        :class="{ 'product-card_title--km': isKhmer }"
        :lang="isKhmer ? 'km' : 'en'"
        :title="isKhmer ? (product.titleKm || product.title) : (product.titleEn || product.title)"
      >
        {{ isKhmer ? (product.titleKm || product.title) : (product.titleEn || product.title) }}
      </h3>

      <!-- Red-Orange Bold Price (Matching screenshot) -->
      <div class="product-card_price-wrap">
        <span class="product-card_price">{{ product.price }}</span>
        <span v-if="product.unit" class="product-card_unit">{{ product.unit }}</span>
      </div>
    </RouterLink>

    <!-- Bottom Action Row: Quick Add Button (Icon -> Expands) + Circular Compare + Circular Wishlist -->
    <div class="product-card_actions">
      <!-- Quick Add Button: starts as Icon, smoothly expands to show title and icon on select/hover -->
      <button
        type="button"
        class="product-card_quick-btn"
        :class="{ 'is-added': isJustAdded, 'is-disabled': product.inStock === false }"
        :disabled="product.inStock === false"
        :title="product.inStock === false ? t('products.outOfStock', 'Out of stock') : t('featured.quickAdd', 'Quick Add')"
        :aria-label="product.inStock === false ? t('products.outOfStock', 'Out of stock') : t('featured.quickAdd', 'Quick Add')"
        @click="handleAddToCart"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" class="btn-cart-icon">
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

      <!-- Circular Compare Button -->
      <button
        type="button"
        class="product-card_action-btn product-card_compare-btn"
        :class="{ 'is-active': isCompared }"
        :title="isCompared ? t('compare.remove', 'Remove from compare') : t('header.compare', 'Compare')"
        :aria-label="isCompared ? t('compare.remove', 'Remove from compare') : t('header.compare', 'Compare')"
        @click="handleToggleCompare"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          width="16"
          height="16"
        >
          <path d="M16 3l4 4-4 4" />
          <path d="M20 7H4" />
          <path d="M8 21l-4-4 4-4" />
          <path d="M4 17h16" />
        </svg>
      </button>

      <!-- Circular Heart Wishlist Button -->
      <button
        type="button"
        class="product-card_action-btn product-card_wishlist-btn"
        :class="{ 'is-active': isWishlisted }"
        :title="isWishlisted ? t('wishlistPage.remove', 'Remove from wishlist') : t('header.wishlist', 'Wishlist')"
        :aria-label="isWishlisted ? t('wishlistPage.remove', 'Remove from wishlist') : t('header.wishlist', 'Wishlist')"
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
  border-radius: 14px;
  padding: 12px 12px 14px 12px;
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
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.product-card_image img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  padding-top: 5px;
  margin: 0 auto;
  display: block;
  transition: transform 0.25s ease;
}

.product-card:hover .product-card_image img {
  transform: scale(1.06);
}

.product-card_title {
  font-family: var(--font-family-title, inherit);
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  line-height: 1.35;
  margin: 0 0 5px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 35px;
  transition: color 0.15s ease;
}

.product-card:hover .product-card_title {
  color: #2563eb;
}

/* Khmer-specific title styling - prevents broken/clipped subscripts and vowels */
.product-card_title--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0;
  min-height: 42px;
  padding: 2px 0 4px 0;
}

.product-card_price-wrap {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 10px;
}

.product-card_price {
  font-size: 15.5px;
  font-weight: 700;
  color: #ea580c; /* Vivid red-orange price matching ฿ 204.00 in the screenshot */
}

.product-card_unit {
  font-size: 11.5px;
  font-weight: 400;
  color: #6b7280;
}

/* Actions Row: Quick Add (Icon -> Expands on select/hover) + Compare + Wishlist */
.product-card_actions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
}

/* Quick Add Button:
   Default: Icon-only button (compact circle/rounded shape)
   When Selected / Hovered: Expands to show both Title and Icon */
.product-card_quick-btn {
  height: 36px;
  min-width: 36px;
  padding: 0 10px;
  background-color: #16a34a; /* Vibrant green */
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(22, 163, 74, 0.25);
  flex-shrink: 0;
}

.btn-cart-icon {
  flex-shrink: 0;
}

.product-card_quick-btn .btn-text {
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 0;
  transition: max-width 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, margin 0.2s ease;
}

/* Expand Quick Add on hover, focus-visible, or when selected/added */
.product-card_quick-btn:hover:not(:disabled),
.product-card_quick-btn:focus-visible,
.product-card_quick-btn.is-added {
  flex: 1;
  padding: 0 14px;
  background-color: #15803d;
  box-shadow: 0 6px 16px rgba(22, 163, 74, 0.42);
  transform: translateY(-2px);
}

.product-card_quick-btn:hover:not(:disabled) .btn-text,
.product-card_quick-btn:focus-visible .btn-text,
.product-card_quick-btn.is-added .btn-text {
  max-width: 115px;
  opacity: 1;
  margin-left: 6px;
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
  background-color: #15803d;
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.35);
}

/* Shared Circular Style for Action Buttons (Compare & Wishlist) */
.product-card_action-btn {
  width: 34px;
  height: 34px;
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

/* Compare Button */
.product-card_compare-btn:hover {
  border-color: #93c5fd;
  color: #2563eb;
  background-color: #eff6ff;
  transform: scale(1.12);
  box-shadow: 0 3px 8px rgba(37, 99, 235, 0.18);
}

.product-card_compare-btn.is-active {
  border-color: #93c5fd;
  background-color: #eff6ff;
  color: #2563eb;
  transform: scale(1.05);
}

/* Wishlist Button */
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

@media (max-width: 640px) {
  .product-card {
    padding: 10px 8px 12px 8px;
    border-radius: 10px;
  }

  .product-card_image {
    padding: 6px;
    margin-bottom: 6px;
    border-radius: 8px;
  }

  .product-card_title {
    font-size: 12px;
    min-height: 32px;
    margin-bottom: 4px;
  }

  .product-card_title--km {
    font-size: 11.5px;
    line-height: 1.55;
    min-height: 38px;
  }

  .product-card_price {
    font-size: 14px;
  }

  .product-card_price-wrap {
    margin-bottom: 6px;
  }

  .product-card_quick-btn {
    height: 32px;
    min-width: 32px;
    padding: 0 8px;
  }

  .product-card_action-btn {
    width: 30px;
    height: 30px;
  }

  .product-card_action-btn svg {
    width: 14px;
    height: 14px;
  }
}
</style>
