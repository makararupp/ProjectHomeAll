<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { navLinks } from '@/data/navLinks'
import BaseButton from '@/components/ui/BaseButton.vue'
import logoImg from '@/assets/images/logo.jpg'
import { useI18n } from '@/composables/useI18n'
import { useCart } from '@/composables/useCart'

const { t, setLocale, currentLocale } = useI18n()
const { totalCount, isCartBumping, toastMessage, isToastVisible, hideCartToast } = useCart()

defineProps({
  showSearch: {
    type: Boolean,
    default: true
  },
  showAuth: {
    type: Boolean,
    default: true
  }
})

const searchQuery = ref('')

function handleSearch() {
  // Placeholder handler — wire up to a real search route/API.
  console.log('Searching for:', searchQuery.value)
}

// Language Selector state
const isLangOpen = ref(false)
const langRef = ref(null)

const languages = [
  { id: 'km', code: 'KH', displayCode: 'KH', name: 'ភាសាខ្មែរ' },
  { id: 'en', code: 'EN', displayCode: 'EN', name: 'English' }
]

const currentLang = computed(() => {
  return languages.find(l => l.id === currentLocale.value) || languages[0]
})

function selectLanguage(lang) {
  setLocale(lang.id)
  isLangOpen.value = false
}

function toggleLangDropdown() {
  isLangOpen.value = !isLangOpen.value
}

function handleClickOutsideLang(event) {
  if (langRef.value && !langRef.value.contains(event.target)) {
    isLangOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutsideLang)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutsideLang)
})
</script>

<template>
  <header class="app-header">
    <div class="app-header_inner">
      
      <!-- Brand Logo in front of Home from project (src/assets/images/logo.jpg) -->
      <RouterLink to="/" class="app-header_logo" title="HomeAll">
        <img :src="logoImg" alt="HomeAll" class="app-header_logo-img" />
      </RouterLink>

      <nav class="app-header_nav" aria-label="Primary">
        <ul>
          <li v-for="link in navLinks" :key="link.key || link.label">
            <RouterLink :to="link.href" class="app-header_nav-link">
              <span>{{ link.key ? t(`nav.${link.key}`, link.label) : link.label }}</span>
              <span v-if="link.hasDropdown" class="app-header_caret" aria-hidden="true">⌄</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
      
      <form
        v-if="showSearch"
        class="app-header_search"
        role="search"
        @submit.prevent="handleSearch"
      >
        <label for="site-search" class="sr-only">{{ t('header.searchPlaceholder', 'Search products') }}</label>
        <input
          id="site-search"
          v-model="searchQuery"
          type="search"
          :placeholder="t('header.searchPlaceholder', 'Search products')"
        />
        <BaseButton variant="primary" size="md">
          <button type="submit" class="app-header_search-submit">{{ t('header.searchBtn', 'Search') }}</button>
        </BaseButton>
      </form>

      <!-- Language Selector (matching reference image) -->
      <div ref="langRef" class="lang-selector">
        <button
          type="button"
          class="lang-selector_btn"
          :class="{ 'is-open': isLangOpen }"
          :aria-expanded="isLangOpen"
          aria-haspopup="true"
          @click="toggleLangDropdown"
        >
          <span class="lang-selector_globe" aria-hidden="true">🌐</span>
          <span class="lang-selector_code">{{ currentLang.displayCode }}</span>
          <svg
            class="lang-selector_caret"
            :class="{ 'is-flipped': isLangOpen }"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="14"
            height="14"
            aria-hidden="true"
          >
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <transition name="lang-fade">
          <div v-if="isLangOpen" class="lang-selector_dropdown" role="menu">
            <button
              v-for="lang in languages"
              :key="lang.id"
              type="button"
              class="lang-selector_option"
              :class="{ 'is-selected': currentLang.id === lang.id }"
              role="menuitem"
              @click="selectLanguage(lang)"
            >
              <span class="lang-selector_item-code">{{ lang.code }}</span>
              <span class="lang-selector_item-name" :lang="lang.id">{{ lang.name }}</span>
            </button>
          </div>
        </transition>
      </div>

      <!-- Wishlist Action (matching reference image) -->
      <RouterLink to="/wishlist" class="header-action-item" title="Wishlist">
        <div class="header-action-item_icon-wrap">
          <svg class="header-action-item_icon header-action-item_icon--wishlist" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span class="header-action-item_badge">0</span>
        </div>
        <span class="header-action-item_title">{{ t('header.wishlist', 'Wishlist') }}</span>
      </RouterLink>

      <!-- Cart (Card) Action -->
      <RouterLink to="/cart" class="header-action-item" :class="{ 'is-bumped': isCartBumping }" title="Cart">
        <div class="header-action-item_icon-wrap" :class="{ 'is-bumped': isCartBumping }">
          <svg class="header-action-item_icon header-action-item_icon--cart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span
            class="header-action-item_badge"
            :class="{ 'has-items': totalCount > 0, 'is-bumped': isCartBumping }"
          >
            {{ totalCount > 99 ? '99+' : totalCount }}
          </span>
        </div>
        <span class="header-action-item_title">{{ t('header.cart', 'Cart') }}</span>
      </RouterLink>

      <div v-if="showAuth" class="app-header_auth">
        <RouterLink to="/sign-in" class="app-header_auth-link">{{ t('header.signIn', 'Sign in') }}</RouterLink>
        <RouterLink to="/register" class="app-header_auth-link app-header_auth-link--strong">{{ t('header.register', 'Register') }}</RouterLink>
      </div>
    </div>

    <!-- Global Cart Added Toast -->
    <Teleport to="body">
      <Transition name="cart-toast-fade">
        <div v-if="isToastVisible" class="global-cart-toast" role="status" aria-live="polite">
          <div class="global-cart-toast_icon">
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="global-cart-toast_content">
            <p class="global-cart-toast_title">{{ t('products.addedToCart', 'Added to cart successfully!') }}</p>
            <p class="global-cart-toast_detail">{{ toastMessage }}</p>
          </div>
          <RouterLink to="/cart" class="global-cart-toast_btn" @click="hideCartToast">
            {{ t('header.cart', 'Cart') }}
          </RouterLink>
          <button type="button" class="global-cart-toast_close" aria-label="Close" @click="hideCartToast">
            &times;
          </button>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-bg-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
}

.app-header_inner {
  height: var(--header-height);
  display: flex;
  align-items: center;
  gap: var(--space-8);
  width: 100%;
  padding: 0 var(--space-8);
}

.app-header_logo {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
  padding: 4px 0;
}

.app-header_logo-img {
  height: 44px;
  width: auto;
  max-width: 120px;
  object-fit: contain;
  mix-blend-mode: multiply;
  display: block;
  transition: transform var(--transition-fast);
}

.app-header_logo:hover .app-header_logo-img {
  transform: scale(1.04);
}

.app-header_nav ul {
  display: flex;
  gap: var(--space-6);
}

.app-header_nav-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
  transition: color var(--transition-fast);
}

.app-header_nav-link:hover {
  color: #34c759;
}

.app-header_nav-home-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  border-radius: 4px;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
  transition: transform var(--transition-fast);
}

.app-header_nav-link:hover .app-header_nav-home-img {
  transform: scale(1.08);
}

.app-header_caret {
  color: var(--color-text-nav);
  font-size: var(--font-size-md);
  transition: color var(--transition-fast);
}

.app-header_search {
  margin-left: auto;
  flex: 1;
  display: flex;
  max-width: 460px;
}

.app-header_search input {
  flex: 1;
  height: 38px;
  padding: 0 var(--space-3);
  border: 1px solid var(--color-border-input);
  border-right: none;
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
  font-size: 13.5px;
  color: var(--color-text-primary);
}

.app-header_search input::placeholder {
  color: var(--color-text-faint);
  font-size: 13px;
}

.app-header_search .base-button {
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 0;
  width: 80px;
  height: 38px;
}

.app-header_search-submit {
  width: 100%;
  height: 100%;
  color: inherit;
  font: inherit;
  font-weight: 600;
}

.app-header_auth {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  flex-shrink: 0;
}

.app-header_auth-link {
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--color-text-primary);
}

.app-header_auth-link--strong {
  font-weight: 600;
}

.app-header_auth-link:hover {
  color: var(--color-brand);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Language Selector */
.lang-selector {
  position: relative;
  flex-shrink: 0;
}

.lang-selector_btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 12px;
  background-color: #ffffff;
  border: 1px solid var(--color-border-input, #d9dde3);
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  transition: all var(--transition-fast);
  user-select: none;
}

.lang-selector_btn:hover,
.lang-selector_btn.is-open {
  border-color: #9ca3af;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.lang-selector_globe {
  font-size: 15px;
  line-height: 1;
}

.lang-selector_code {
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: 0.02em;
}

.lang-selector_caret {
  color: #6b7280;
  transition: transform 0.2s ease;
}

.lang-selector_caret.is-flipped {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.lang-selector_dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 165px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 6px 0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05);
  z-index: 100;
  overflow: hidden;
}

.lang-selector_option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.lang-selector_option:hover {
  background-color: #f9fafb;
}

.lang-selector_option.is-selected {
  background-color: #f0f7ff;
  color: #2563eb;
}

.lang-selector_item-code {
  font-size: 13px;
  font-weight: 700;
  width: 24px;
  color: inherit;
}

.lang-selector_option:not(.is-selected) .lang-selector_item-code {
  color: #4b5563;
}

.lang-selector_item-name {
  font-size: 13.5px;
  font-weight: 500;
  color: inherit;
}

.lang-selector_option:not(.is-selected) .lang-selector_item-name {
  color: #374151;
}

/* Transition */
.lang-fade-enter-active,
.lang-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.lang-fade-enter-from,
.lang-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Header Action Items (Wishlist & Cart) */
.header-action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  padding: 0 4px;
  user-select: none;
  flex-shrink: 0;
  transition: transform var(--transition-fast);
}

.header-action-item:hover {
  transform: translateY(-1px);
}

.header-action-item_icon-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 24px;
}

.header-action-item_icon {
  width: 22px;
  height: 22px;
  transition: color var(--transition-fast);
}

.header-action-item_icon--wishlist {
  color: #3b82f6;
}

.header-action-item_icon--cart {
  color: #374151;
}

.header-action-item:hover .header-action-item_icon--cart {
  color: var(--color-brand);
}

.header-action-item:hover .header-action-item_icon--wishlist {
  color: #ef4444;
}

.header-action-item_badge {
  position: absolute;
  top: -7px;
  right: -9px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background-color: #9ca3af;
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  line-height: 1;
  border: 1.5px solid #ffffff;
  transition: all 0.22s ease;
}

.header-action-item_badge.has-items {
  background: linear-gradient(135deg, #16a34a, #15803d);
  box-shadow: 0 2px 6px rgba(22, 163, 74, 0.45);
}

/* Bump / Pop animation on Add to Cart */
@keyframes cartBadgeBump {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.42);
    background: #22c55e;
    box-shadow: 0 0 14px rgba(34, 197, 94, 0.7);
  }
  70% {
    transform: scale(0.92);
  }
  100% {
    transform: scale(1);
  }
}

.header-action-item_badge.is-bumped {
  animation: cartBadgeBump 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes cartIconWiggle {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-12deg) scale(1.15);
  }
  75% {
    transform: rotate(12deg) scale(1.15);
  }
}

.header-action-item_icon-wrap.is-bumped .header-action-item_icon--cart {
  animation: cartIconWiggle 0.45s ease;
  color: #16a34a;
}

.header-action-item_title {
  font-size: 11.5px;
  font-weight: 500;
  color: #4b5563;
  margin-top: 2px;
  line-height: 1;
  transition: color var(--transition-fast);
}

.header-action-item:hover .header-action-item_title {
  color: #111827;
}

/* Global Cart Toast Notification */
.global-cart-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border: 1px solid #bbf7d0;
  border-left: 4px solid #16a34a;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.12), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  max-width: 420px;
}

.global-cart-toast_icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #dcfce7;
  color: #16a34a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.global-cart-toast_content {
  flex: 1;
  min-width: 0;
}

.global-cart-toast_title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  line-height: 1.3;
}

.global-cart-toast_detail {
  margin: 2px 0 0;
  font-size: 12px;
  color: #4b5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
}

.global-cart-toast_btn {
  font-size: 12px;
  font-weight: 600;
  color: #15803d;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  padding: 5px 10px;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.global-cart-toast_btn:hover {
  background: #16a34a;
  color: #ffffff;
  border-color: #16a34a;
}

.global-cart-toast_close {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 18px;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
}

.global-cart-toast_close:hover {
  color: #374151;
}

/* Toast Transitions */
.cart-toast-fade-enter-active,
.cart-toast-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cart-toast-fade-enter-from,
.cart-toast-fade-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}

@media (max-width: 1024px) {
  .app-header_nav {
    display: none;
  }
}
</style>
