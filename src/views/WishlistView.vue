<script setup>
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useWishlist } from '@/composables/useWishlist'
import { useCart } from '@/composables/useCart'
import { useI18n } from '@/composables/useI18n'

const { t, isKhmer } = useI18n()
const { wishlistItems, removeFromWishlist, clearWishlist, isToastVisible, toastMessage } = useWishlist()
const { addToCart } = useCart()

function handleAddToCart(item) {
  addToCart(item)
}
</script>

<template>
  <div class="wishlist-page">
    <AppHeader />
    <CategoryNav />

    <main class="wishlist-main container">
      <!-- Breadcrumb Bar (Golden-amber banner matching reference image) -->
      <nav class="wishlist-banner" aria-label="Breadcrumb">
        <RouterLink to="/" class="wishlist-banner_link">
          {{ t('wishlistPage.breadcrumbMain', 'Main') }}
        </RouterLink>
        <span class="wishlist-banner_sep">/</span>
        <span class="wishlist-banner_current">
          {{ t('wishlistPage.breadcrumbWishlist', 'Wishlist') }}
        </span>
      </nav>

      <!-- Page Title -->
      <h1 class="wishlist-title" :class="{ 'is-khmer': isKhmer }">
        {{ t('wishlistPage.title', 'Wishlist') }}
      </h1>

      <!-- Main White Container -->
      <div class="wishlist-card">
        <!-- Empty State (matching reference image) -->
        <div v-if="wishlistItems.length === 0" class="wishlist-empty">
          <div class="wishlist-empty_art" aria-hidden="true">
            <svg
              class="wishlist-empty_svg"
              viewBox="0 0 280 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Pastel Blue Circular Backdrop -->
              <circle cx="140" cy="115" r="70" fill="#dce7fb" />

              <!-- Character Illustration -->
              <g class="character">
                <!-- Left Hand & Arm (gesturing down-left) -->
                <!-- Hand & spread fingers -->
                <path
                  d="M86 160 C76 168 62 178 50 186 C46 189 44 185 47 181 C54 172 66 162 76 154 C72 157 66 162 60 168 C57 171 55 168 58 165 C64 158 74 149 82 143 C80 145 74 149 70 154 C67 157 65 155 68 152 C75 145 84 138 92 133 L98 141 Z"
                  fill="#fcd1b4"
                />
                <!-- Left Sleeve -->
                <path
                  d="M92 133 C90 138 93 145 98 141 L115 125 C118 122 115 116 110 118 Z"
                  fill="#7ca5f2"
                />
                <path
                  d="M110 118 L86 150 C83 154 88 158 92 155 L120 130 Z"
                  fill="#6f99e8"
                  opacity="0.35"
                />

                <!-- Torso / Jacket Base -->
                <!-- Inner Dark Navy Shirt -->
                <path d="M132 110 L148 110 L148 185 L132 185 Z" fill="#243144" />

                <!-- Main Jacket Body -->
                <path
                  d="M112 120 C108 135 106 155 104 185 C115 185 165 185 174 185 C172 155 170 135 166 120 C160 116 155 112 148 110 L132 110 C125 112 118 116 112 120 Z"
                  fill="#7ca5f2"
                />

                <!-- Jacket Collar & Flaps -->
                <path d="M126 110 L134 135 L138 110 Z" fill="#6992de" />
                <path d="M154 110 L146 135 L142 110 Z" fill="#6992de" />
                <!-- Front Opening Shadow/Line -->
                <line x1="140" y1="135" x2="140" y2="185" stroke="#6086d0" stroke-width="2" />

                <!-- Right Arm (Raised holding telescope) -->
                <!-- Upper arm & elbow -->
                <path
                  d="M166 120 C175 123 186 132 185 146 C184 152 176 154 172 147 C168 140 162 132 158 126 Z"
                  fill="#6f99e8"
                />
                <!-- Forearm extending to eye/telescope -->
                <path
                  d="M185 146 C187 132 182 112 165 98 C161 95 156 99 159 104 C170 116 174 128 172 147 Z"
                  fill="#7ca5f2"
                />
                <!-- Right Hand gripping telescope -->
                <path
                  d="M156 96 C154 92 162 90 164 94 L165 102 C165 106 158 106 157 101 Z"
                  fill="#fcd1b4"
                />

                <!-- Neck -->
                <rect x="134" y="96" width="12" height="18" rx="2" fill="#fcd1b4" />

                <!-- Head, Beard, Profile & Cap -->
                <!-- Dark Beard & Hair -->
                <path
                  d="M130 84 C128 92 130 102 135 107 C142 114 148 114 154 108 C155 102 153 96 148 93 C144 93 140 88 139 84 Z"
                  fill="#23272e"
                />
                <!-- Mustache -->
                <path d="M148 93 C154 94 158 97 156 100 C151 100 147 98 145 94 Z" fill="#23272e" />

                <!-- Face / Skin (Profile facing right) -->
                <path
                  d="M134 76 C134 68 144 68 148 74 C151 78 152 86 148 92 C142 92 136 88 134 76 Z"
                  fill="#fcd1b4"
                />
                <!-- Nose profile -->
                <path d="M149 84 L157 88 L149 91 Z" fill="#fcd1b4" />
                <!-- Eye squinting into eyepiece -->
                <path d="M144 83 Q148 82 150 84" stroke="#23272e" stroke-width="1.8" stroke-linecap="round" />

                <!-- Blue Baseball Cap -->
                <!-- Dome -->
                <path d="M129 76 C129 62 146 59 154 73 Z" fill="#4d89e8" />
                <!-- Cap Visor / Bill extending right over eyepiece -->
                <path d="M148 70 L168 73 C170 74 169 77 165 78 L146 76 Z" fill="#3b74d4" />
                <!-- Cap Button -->
                <circle cx="141" cy="62" r="2.5" fill="#3b74d4" />

                <!-- Telescope / Spyglass (extending right across circle boundary) -->
                <!-- Eyepiece section -->
                <rect x="151" y="80" width="8" height="9" rx="1.5" fill="#1b3d58" />
                <!-- Main Cylinder (dark teal-navy) -->
                <rect x="159" y="81" width="26" height="7" fill="#224c6d" />
                <!-- Accent Ring (brass/cyan highlight) -->
                <rect x="185" y="80" width="3" height="9" rx="0.5" fill="#3a82aa" />
                <!-- Second Extended Cylinder -->
                <rect x="188" y="80.5" width="22" height="8" fill="#1b3d58" />
                <!-- Front Objective Ring -->
                <rect x="210" y="79" width="4" height="11" rx="1" fill="#3a82aa" />
                <!-- Glass Lens Tint -->
                <path d="M214 80 L214 89" stroke="#90cdf4" stroke-width="2" stroke-linecap="round" />
              </g>
            </svg>
          </div>

          <p class="wishlist-empty_title" :class="{ 'is-khmer': isKhmer }">
            {{ t('wishlistPage.emptyTitle', "There isn't anything added yet") }}
          </p>
        </div>

        <!-- Populated Wishlist State (if items exist) -->
        <div v-else class="wishlist-items-section">
          <div class="wishlist-items-header">
            <span class="wishlist-count">
              {{ wishlistItems.length }} {{ wishlistItems.length === 1 ? 'item' : 'items' }}
            </span>
            <button
              type="button"
              class="wishlist-clear-btn"
              @click="clearWishlist"
            >
              {{ t('wishlistPage.clearAll', 'Clear Wishlist') }}
            </button>
          </div>

          <div class="wishlist-grid">
            <div
              v-for="item in wishlistItems"
              :key="item.id"
              class="wishlist-item-card"
            >
              <div class="wishlist-item-image-wrap">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.title || item.name"
                  class="wishlist-item-image"
                />
                <div v-else class="wishlist-item-image-placeholder">
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </div>

              <div class="wishlist-item-info">
                <h3 class="wishlist-item-name">{{ item.title || item.name }}</h3>
                <p class="wishlist-item-price">{{ item.price }}</p>
              </div>

              <div class="wishlist-item-actions">
                <button
                  type="button"
                  class="wishlist-btn wishlist-btn--cart"
                  @click="handleAddToCart(item)"
                >
                  {{ t('wishlistPage.addToCart', 'Add to Cart') }}
                </button>
                <button
                  type="button"
                  class="wishlist-btn wishlist-btn--remove"
                  @click="removeFromWishlist(item.id)"
                  title="Remove from wishlist"
                >
                  {{ t('wishlistPage.remove', 'Remove') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Toast Notification -->
    <transition name="toast-fade">
      <div v-if="isToastVisible" class="wishlist-toast">
        <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <AppFooter />
  </div>
</template>

<style scoped>
.wishlist-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-page, #f7f8fa);
}

.wishlist-main {
  flex: 1;
  width: 100%;
  padding-bottom: 60px;
}

/* Breadcrumb Bar */
.wishlist-banner {
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: #374151;
  margin-top: 24px;
  margin-bottom: 24px;
}

.wishlist-banner_link {
  color: #4b5563;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.wishlist-banner_link:hover {
  color: #111827;
}

.wishlist-banner_sep {
  color: #9ca3af;
  font-weight: 500;
  user-select: none;
}

.wishlist-banner_current {
  color: #111827;
  font-weight: 600;
}

/* Page Heading */
.wishlist-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px;
  letter-spacing: -0.01em;
  font-family: var(--font-family-title, sans-serif);
}

.wishlist-title.is-khmer {
  font-family: var(--font-family-title, 'Khmer OS', sans-serif);
  font-family: var(--font-family-title, 'Siemreap', 'Battambang', sans-serif);
  line-height: 1.5;
}

/* Main White Card Container */
.wishlist-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  min-height: 480px;
  padding: 50px 24px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

/* Empty State */
.wishlist-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 16px;
}

.wishlist-empty_art {
  width: 280px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.wishlist-empty_svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

.wishlist-empty_title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  letter-spacing: -0.01em;
}

.wishlist-empty_title.is-khmer {
  font-family: var(--font-family-title, 'Khmer OS', sans-serif);
  font-family: var(--font-family-title, 'Siemreap', 'Battambang', sans-serif);
  font-size: 19px;
  line-height: 1.5;
}

/* Populated Wishlist Styles */
.wishlist-items-section {
  width: 100%;
}

.wishlist-items-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.wishlist-count {
  font-size: 15px;
  font-weight: 600;
  color: #4b5563;
}

.wishlist-clear-btn {
  font-size: 14px;
  color: #ef4444;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  background: #fef2f2;
  transition: all 0.2s ease;
}

.wishlist-clear-btn:hover {
  background: #fee2e2;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.wishlist-item-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.wishlist-item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.wishlist-item-image-wrap {
  width: 100%;
  height: 180px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.wishlist-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wishlist-item-image-placeholder {
  color: #9ca3af;
}

.wishlist-item-info {
  flex: 1;
  margin-bottom: 14px;
}

.wishlist-item-name {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 6px;
  line-height: 1.4;
}

.wishlist-item-price {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-brand-dark, #269c46);
  margin: 0;
}

.wishlist-item-actions {
  display: flex;
  gap: 8px;
}

.wishlist-btn {
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
}

.wishlist-btn--cart {
  background: var(--color-brand, #34c759);
  color: #ffffff;
}

.wishlist-btn--cart:hover {
  background: var(--color-brand-dark, #269c46);
}

.wishlist-btn--remove {
  background: #f3f4f6;
  color: #4b5563;
  flex: 0 0 auto;
}

.wishlist-btn--remove:hover {
  background: #e5e7eb;
  color: #1f2937;
}

/* Toast */
.wishlist-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  background: #1f2937;
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
}

.wishlist-toast svg {
  color: #34c759;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 640px) {
  .wishlist-banner {
    padding: 8px 14px;
    font-size: 13px;
  }
  .wishlist-card {
    padding: 40px 16px;
    padding: 24px 12px;
    min-height: 380px;
  }
  .wishlist-empty_art {
    width: 220px;
    width: 200px;
  }
  .wishlist-empty_title {
    font-size: 16px;
  }
  .wishlist-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .wishlist-item-card {
    padding: 10px 8px;
  }
  .wishlist-item-image-wrap {
    height: 120px;
    margin-bottom: 8px;
  }
  .wishlist-item-name {
    font-size: 13px;
  }
  .wishlist-item-actions {
    flex-direction: column;
    gap: 6px;
  }
  .wishlist-btn--cart {
    font-size: 12px;
    padding: 8px 10px;
    justify-content: center;
  }
}

@media (max-width: 360px) {
  .wishlist-grid {
    grid-template-columns: 1fr;
  }
}
</style>

