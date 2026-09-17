<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { flashSaleProducts } from '@/data/flashSale'
import { useI18n } from '@/composables/useI18n'
import { useCart } from '@/composables/useCart'
import { useWishlist } from '@/composables/useWishlist'
import { useCompare } from '@/composables/useCompare'

const { t, isKhmer } = useI18n()
const { addToCart } = useCart()
const { isInWishlist, toggleWishlist } = useWishlist()
const { isInCompare, toggleCompare } = useCompare()

const justAddedId = ref(null)

// Countdown timer: 2 days 14 hours 38 mins 45 secs
const totalSeconds = ref(2 * 86400 + 14 * 3600 + 38 * 60 + 45)
let timerInterval = null

const days = computed(() => {
  return String(Math.floor(totalSeconds.value / 86400)).padStart(2, '0')
})

const hours = computed(() => {
  return String(Math.floor((totalSeconds.value % 86400) / 3600)).padStart(2, '0')
})

const minutes = computed(() => {
  return String(Math.floor((totalSeconds.value % 3600) / 60)).padStart(2, '0')
})

const seconds = computed(() => {
  return String(totalSeconds.value % 60).padStart(2, '0')
})

onMounted(() => {
  timerInterval = setInterval(() => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--
    } else {
      totalSeconds.value = 3 * 86400 // Loop back after expiring
    }
  }, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

function handleAddDeal(product, event) {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  addToCart(product, 1)
  justAddedId.value = product.id
  setTimeout(() => {
    if (justAddedId.value === product.id) {
      justAddedId.value = null
    }
  }, 1200)
}

function handleToggleCompare(product, event) {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  toggleCompare(product)
}

function handleToggleWishlist(product, event) {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  toggleWishlist(product)
}
</script>

<template>
  <section class="flash-sale" aria-labelledby="flash-sale-heading">
    <div class="container">
      <!-- Flash Sale Header with Title, Live Countdown, and View All -->
      <div class="flash-sale_header">
        <div class="flash-sale_header-left">
          <div class="flash-sale_badge">
            <svg class="flash-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <h2
              id="flash-sale-heading"
              class="flash-sale_title"
              :class="{ 'flash-sale_title--km': isKhmer }"
              :lang="isKhmer ? 'km' : 'en'"
            >
              {{ t('flashSale.title', 'Flash Sale') }}
            </h2>
          </div>

          <!-- Live Countdown Timer (Days Hrs Mins Secs) -->
          <div class="flash-sale_timer" aria-label="Countdown timer">
            <span class="flash-sale_timer-label" :class="{ 'timer-label--km': isKhmer }">
              {{ t('flashSale.endsIn', 'Ends in') }}:
            </span>
            <div class="timer-units">
              <div class="timer-col">
                <span class="digit-box">{{ days }}</span>
                <span class="unit-label" :class="{ 'unit-label--km': isKhmer }">{{ isKhmer ? t('flashSale.days', 'ថ្ងៃ') : t('flashSale.days', 'Days') }}</span>
              </div>
              <span class="digit-sep">:</span>
              <div class="timer-col">
                <span class="digit-box">{{ hours }}</span>
                <span class="unit-label" :class="{ 'unit-label--km': isKhmer }">{{ isKhmer ? t('flashSale.hrs', 'ម៉ោង') : t('flashSale.hrs', 'Hrs') }}</span>
              </div>
              <span class="digit-sep">:</span>
              <div class="timer-col">
                <span class="digit-box">{{ minutes }}</span>
                <span class="unit-label" :class="{ 'unit-label--km': isKhmer }">{{ isKhmer ? t('flashSale.mins', 'នាទី') : t('flashSale.mins', 'Mins') }}</span>
              </div>
              <span class="digit-sep">:</span>
              <div class="timer-col">
                <span class="digit-box digit-box--active">{{ seconds }}</span>
                <span class="unit-label" :class="{ 'unit-label--km': isKhmer }">{{ isKhmer ? t('flashSale.secs', 'វិនាទី') : t('flashSale.secs', 'Secs') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- View All Label (Static / Non-clickable) -->
        <div class="flash-sale_view-all">
          <span :class="{ 'view-all--km': isKhmer }">{{ t('flashSale.viewAll', 'View All') }}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      <!-- Flash Sale Products Grid -->
      <div class="flash-sale_grid">
        <article
          v-for="item in flashSaleProducts"
          :key="item.id"
          class="flash-card"
        >
          <!-- Top Badges: Flame HOT -->
          <div class="flash-card_top-badges">
            <span class="badge-hot" :class="{ 'badge-hot--km': isKhmer }">
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                <path d="M12 23c4.97 0 9-4.03 9-9 0-4.97-4-8-7-13-1 2-2 4-2 6-2-1-3-3-3-3s-6 5.5-6 10c0 4.97 4.03 9 9 9z" />
              </svg>
              <span>{{ t('flashSale.hot', 'HOT') }}</span>
            </span>
          </div>

          <div class="flash-card_content">
            <!-- Thumbnail with 5px top padding -->
            <div class="flash-card_image-wrap">
              <img
                :src="item.image"
                :alt="isKhmer ? (item.titleKm || item.title) : (item.titleEn || item.title)"
                class="flash-card_img"
                loading="lazy"
                width="140"
                height="140"
              />
            </div>

            <!-- Product Title with Khmer Anti-Clipping -->
            <h3
              class="flash-card_title"
              :class="{ 'flash-card_title--km': isKhmer }"
              :lang="isKhmer ? 'km' : 'en'"
              :title="isKhmer ? (item.titleKm || item.title) : (item.titleEn || item.title)"
            >
              {{ isKhmer ? (item.titleKm || item.title) : (item.titleEn || item.title) }}
            </h3>

            <!-- Price Row (Sale Price + Original Price Strikethrough) -->
            <div class="flash-card_pricing">
              <span class="price-sale">{{ item.salePrice }}</span>
              <span class="price-original">{{ item.originalPrice }}</span>
            </div>

          </div>

          <!-- Actions Row: Quick Add (Cart Icon -> Expands on select/hover to show title) + Compare + Wishlist -->
          <div class="flash-card_actions">
            <button
              type="button"
              class="flash-card_quick-btn"
              :class="{ 'is-added': justAddedId === item.id }"
              :title="t('flashSale.quickAdd', 'Quick Add')"
              :aria-label="t('flashSale.quickAdd', 'Quick Add')"
              @click="handleAddDeal(item, $event)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" class="btn-cart-icon">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span class="btn-text" :class="{ 'btn-text--km': isKhmer }">
                {{ justAddedId === item.id ? (isKhmer ? 'បានបញ្ចូល!' : 'Added!') : t('flashSale.quickAdd', 'Quick Add') }}
              </span>
            </button>

            <!-- Circular Compare Button -->
            <button
              type="button"
              class="flash-card_action-btn flash-card_compare-btn"
              :class="{ 'is-active': isInCompare(item.id) }"
              :title="isInCompare(item.id) ? t('compare.remove', 'Remove from compare') : t('header.compare', 'Compare')"
              :aria-label="isInCompare(item.id) ? t('compare.remove', 'Remove from compare') : t('header.compare', 'Compare')"
              @click="handleToggleCompare(item, $event)"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="15"
                height="15"
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
              class="flash-card_action-btn flash-card_wishlist-btn"
              :class="{ 'is-active': isInWishlist(item.id) }"
              :title="isInWishlist(item.id) ? t('wishlistPage.remove', 'Remove from wishlist') : t('header.wishlist', 'Wishlist')"
              :aria-label="isInWishlist(item.id) ? t('wishlistPage.remove', 'Remove from wishlist') : t('header.wishlist', 'Wishlist')"
              @click="handleToggleWishlist(item, $event)"
            >
              <svg
                viewBox="0 0 24 24"
                :fill="isInWishlist(item.id) ? '#ef4444' : 'none'"
                :stroke="isInWishlist(item.id) ? '#ef4444' : '#64748b'"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="15"
                height="15"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flash-sale {
  padding: 24px 0 28px 0;
  background-color: #ffffff;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 12px;
}

/* Header */
.flash-sale_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 18px;
}

.flash-sale_header-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.flash-sale_badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.flash-icon {
  width: 22px;
  height: 22px;
  color: var(--color-brand, #34c759);
  flex-shrink: 0;
}

.flash-sale_title {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-text-heading, #1f2937);
  letter-spacing: -0.3px;
  margin: 0;
}

.flash-sale_title--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0;
}

/* Timer */
.flash-sale_timer {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  padding: 5px 14px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.flash-sale_timer-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-heading, #1f2937);
  white-space: nowrap;
}

.timer-label--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', sans-serif;
  letter-spacing: 0;
}

.timer-units {
  display: flex;
  align-items: center;
  gap: 5px;
}

.timer-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.digit-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 26px;
  padding: 0 5px;
  background-color: #1e293b;
  color: #ffffff;
  font-family: 'Roboto Mono', ui-monospace, monospace;
  font-size: 13.5px;
  font-weight: 700;
  border-radius: 5px;
  line-height: 1;
}

.digit-box--active {
  background-color: var(--color-brand-dark, #269c46);
  animation: pulse-green 1.2s infinite alternate;
}

@keyframes pulse-green {
  from { opacity: 0.92; }
  to { opacity: 1; filter: brightness(1.2); }
}

.unit-label {
  font-size: 9px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  line-height: 1;
}

.unit-label--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', sans-serif;
  font-size: 9.5px;
  letter-spacing: 0;
  text-transform: none;
}

.digit-sep {
  font-weight: 700;
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 11px; /* Center with digit-box above unit-label */
}

/* View All Label (Static / Non-clickable - Normal Style) */
.flash-sale_view-all {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13.5px;
  font-weight: 500;
  color: #4b5563;
  padding: 4px 6px;
  border-radius: 6px;
  cursor: default;
  pointer-events: none;
  user-select: none;
}

.flash-sale_view-all svg {
  width: 15px;
  height: 15px;
  color: #6b7280;
}

.view-all--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', sans-serif;
  letter-spacing: 0;
  font-size: 13px;
}

/* Grid */
.flash-sale_grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
}

/* Deal Card */
.flash-card {
  position: relative;
  background-color: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px 10px 12px 10px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.flash-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

/* Badges */
.flash-card_top-badges {
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
  z-index: 2;
}

.badge-hot {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
  font-size: 10.5px;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 6px;
  line-height: 1.2;
}

.badge-hot--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0;
  padding: 1px 5px;
}

/* Card Content (Non-clickable / static) */
.flash-card_content {
  display: flex;
  flex-direction: column;
  color: inherit;
  flex: 1;
  cursor: default;
  user-select: none;
}

/* Normal Clean Image Container */
.flash-card_image-wrap {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  border: 1px solid #f1f5f9;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: default;
  pointer-events: none;
}

.flash-card_img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  padding-top: 5px;
  margin: 0 auto;
  display: block;
  cursor: default;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}

/* Title with Khmer Anti-Clipping - Non-clickable */
.flash-card_title {
  font-size: 12.5px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.35;
  margin: 0 0 6px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 34px;
  cursor: default;
}

.flash-card_title--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0;
  min-height: 40px;
  padding: 2px 0 3px 0;
}

/* Pricing */
.flash-card_pricing {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 12px;
}

.price-sale {
  font-size: 16px;
  font-weight: 800;
  color: #000000; /* Black color in light mode */
}

.price-original {
  font-size: 12px;
  font-weight: 500;
  color: #9ca3af;
  text-decoration: line-through;
}

/* Actions Row: Quick Add (Cart Icon -> Expands on select/hover) + Compare + Wishlist */
.flash-card_actions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
}

/* Quick Add Button:
   Default: Cart icon only (compact rounded shape)
   When Selected / Hovered: Smoothly expands to show title and cart icon */
.flash-card_quick-btn {
  height: 34px;
  min-width: 34px;
  padding: 0 9px;
  background-color: #ffffff;
  color: #269c46;
  border: 1.5px solid #269c46;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 3px rgba(38, 156, 70, 0.12);
  flex-shrink: 0;
}

.btn-cart-icon {
  flex-shrink: 0;
}

.flash-card_quick-btn .btn-text {
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 0;
  transition: max-width 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, margin 0.2s ease;
}

/* Expand Quick Add on hover, focus-visible, or when added */
.flash-card_quick-btn:hover:not(:disabled),
.flash-card_quick-btn:focus-visible {
  flex: 1;
  padding: 0 12px;
  background-color: #269c46;
  border-color: #269c46;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(38, 156, 70, 0.35);
  transform: translateY(-1px);
}

.flash-card_quick-btn:hover:not(:disabled) .btn-text,
.flash-card_quick-btn:focus-visible .btn-text,
.flash-card_quick-btn.is-added .btn-text {
  max-width: 110px;
  opacity: 1;
  margin-left: 6px;
}

.flash-card_quick-btn:active:not(:disabled) {
  transform: translateY(0);
}

.flash-card_quick-btn.is-added {
  flex: 1;
  padding: 0 12px;
  background-color: #1e7e34;
  border-color: #1e7e34;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(30, 126, 52, 0.35);
}

.btn-text--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', sans-serif;
  letter-spacing: 0;
}

/* Shared Circular Style for Action Buttons (Compare & Wishlist) */
.flash-card_action-btn {
  width: 32px;
  height: 32px;
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
.flash-card_compare-btn:hover {
  border-color: #93c5fd;
  color: #2563eb;
  background-color: #eff6ff;
  transform: scale(1.12);
  box-shadow: 0 3px 8px rgba(37, 99, 235, 0.18);
}

.flash-card_compare-btn.is-active {
  border-color: #93c5fd;
  background-color: #eff6ff;
  color: #2563eb;
  transform: scale(1.05);
}

/* Wishlist Button */
.flash-card_wishlist-btn:hover {
  border-color: #fca5a5;
  color: #ef4444;
  background-color: #fff1f2;
  transform: scale(1.12);
  box-shadow: 0 3px 8px rgba(239, 68, 68, 0.18);
}

.flash-card_wishlist-btn.is-active {
  border-color: #fecaca;
  background-color: #fff1f2;
  color: #ef4444;
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 1280px) {
  .flash-sale_grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1024px) {
  .flash-sale_grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .flash-sale_title {
    font-size: 20px;
  }
}

@media (max-width: 640px) {
  .flash-sale {
    padding: 18px 0 22px 0;
  }

  .flash-sale_header {
    margin-bottom: 14px;
  }

  .flash-sale_grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .flash-card {
    padding: 8px 8px 10px 8px;
  }

  .flash-card_title {
    font-size: 11.5px;
    min-height: 30px;
  }

  .flash-card_title--km {
    font-size: 11px;
    min-height: 36px;
  }

  .price-sale {
    font-size: 14px;
  }

  .flash-sale_timer {
    gap: 6px;
    padding: 4px 10px;
  }

  .digit-box {
    min-width: 26px;
    height: 24px;
    font-size: 12px;
  }

  .unit-label {
    font-size: 8px;
  }

  .digit-sep {
    font-size: 12px;
    margin-bottom: 9px;
  }

  .flash-card_actions {
    gap: 4px;
  }

  .flash-card_quick-btn {
    height: 30px;
    min-width: 30px;
    padding: 0 7px;
    font-size: 11px;
  }

  .flash-card_action-btn {
    width: 28px;
    height: 28px;
  }

  .flash-card_action-btn svg {
    width: 13px;
    height: 13px;
  }
}
</style>

<!-- Non-scoped so body.dark / :root[data-theme="dark"] ancestor selectors work -->
<style>
/* =====================================================
   FlashSale (GoExpress) – Dark Mode Overrides
   ===================================================== */

/* GoExpress title → black in dark mode */
:root[data-theme="dark"] .flash-sale_title,
body.dark .flash-sale_title {
  color: #000000 !important;
}

/* Flash sale header badge background so black title stands out */
:root[data-theme="dark"] .flash-sale_badge,
body.dark .flash-sale_badge {
  background-color: #ffffff;
  padding: 4px 10px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* "Ends in:" label → black in dark mode */
:root[data-theme="dark"] .flash-sale_timer-label,
body.dark .flash-sale_timer-label {
  color: #000000 !important;
}

/* Timer pill background: keeps clean white so black text is clear */
:root[data-theme="dark"] .flash-sale_timer,
body.dark .flash-sale_timer {
  background-color: #ffffff;
  border-color: #e2e8f0;
}

/* Flash sale section container */
:root[data-theme="dark"] .flash-sale,
body.dark .flash-sale {
  background-color: #0f172a !important;
  border-top-color: #334155;
  border-bottom-color: #334155;
}

/* View All link */
:root[data-theme="dark"] .flash-sale_view-all,
body.dark .flash-sale_view-all {
  color: #94a3b8;
}

:root[data-theme="dark"] .flash-sale_view-all svg,
body.dark .flash-sale_view-all svg {
  color: #94a3b8;
}

/* Product Cards in dark mode */
:root[data-theme="dark"] .flash-card,
body.dark .flash-card {
  background-color: #1e293b;
  border-color: #334155;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

:root[data-theme="dark"] .flash-card:hover,
body.dark .flash-card:hover {
  border-color: #475569;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
}

/* Image container */
:root[data-theme="dark"] .flash-card_image-wrap,
body.dark .flash-card_image-wrap {
  background-color: #0f172a;
  border-color: #1e293b;
}

/* Product titles → crisp white in dark mode */
:root[data-theme="dark"] .flash-card_title,
body.dark .flash-card_title {
  color: #ffffff !important;
}

/* Sale price in dark mode → white */
:root[data-theme="dark"] .price-sale,
body.dark .price-sale {
  color: #ffffff !important;
}

/* Strikethrough original price */
:root[data-theme="dark"] .price-original,
body.dark .price-original {
  color: #64748b;
}

/* Quick Add button */
:root[data-theme="dark"] .flash-card_quick-btn,
body.dark .flash-card_quick-btn {
  background-color: #1e293b;
  border-color: #22c55e;
  color: #22c55e;
}

:root[data-theme="dark"] .flash-card_quick-btn:hover:not(:disabled),
:root[data-theme="dark"] .flash-card_quick-btn:focus-visible,
:root[data-theme="dark"] .flash-card_quick-btn.is-added,
body.dark .flash-card_quick-btn:hover:not(:disabled),
body.dark .flash-card_quick-btn:focus-visible,
body.dark .flash-card_quick-btn.is-added {
  background-color: #16a34a;
  border-color: #16a34a;
  color: #ffffff;
}

/* Compare & Wishlist buttons */
:root[data-theme="dark"] .flash-card_action-btn,
body.dark .flash-card_action-btn {
  background-color: #0f172a;
  border-color: #334155;
  color: #94a3b8;
}
</style>


