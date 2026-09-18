<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { navLinks } from '@/data/navLinks'
import logoImg from '@/assets/images/logo.jpg'
import { useI18n } from '@/composables/useI18n'
import { useCart } from '@/composables/useCart'
import { useWishlist } from '@/composables/useWishlist'
import { useCompare } from '@/composables/useCompare'
import AppearanceSwitch from '@/components/common/AppearanceSwitch.vue'
import TopAnnouncementBar from '@/components/layout/TopAnnouncementBar.vue'

const { t, setLocale, currentLocale } = useI18n()
const { totalCount, isCartBumping, toastMessage, isToastVisible, hideCartToast } = useCart()
const { wishlistCount } = useWishlist()
const { compareCount } = useCompare()

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

const isKhmer = computed(() => currentLocale.value === 'km')

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

// Mobile navigation drawer state
const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  document.addEventListener('click', handleClickOutsideLang)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutsideLang)
  document.body.style.overflow = ''
})
</script>

<template>
  <TopAnnouncementBar />
  <header class="app-header">
    <div class="app-header_inner">
      
      <!-- Mobile Menu Hamburger Button (< 1024px) -->
      <button
        type="button"
        class="app-header_mobile-toggle"
        :class="{ 'is-open': isMobileMenuOpen }"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
        @click="toggleMobileMenu"
      >
        <span class="hamburger-bar" />
        <span class="hamburger-bar" />
        <span class="hamburger-bar" />
      </button>

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
        <button
          type="submit"
          class="app-header_search-btn"
          :aria-label="t('header.searchBtn', 'Search')"
          :title="t('header.searchBtn', 'Search')"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>

      <!-- Header Right Section (Right Center: Language, Compare, Wishlist, Appearance, Cart, Auth) -->
      <div class="app-header_right">
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

        <!-- Compare Action (In front of Wishlist) -->
        <RouterLink to="/compare" class="header-action-item" title="Compare">
          <div class="header-action-item_icon-wrap">
            <svg class="header-action-item_icon header-action-item_icon--compare" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            <span
              class="header-action-item_badge"
              :class="{ 'has-items': compareCount > 0 }"
            >
              {{ compareCount > 99 ? '99+' : compareCount }}
            </span>
          </div>
          <span class="header-action-item_title">{{ t('header.compare', 'Compare') }}</span>
        </RouterLink>

        <!-- Wishlist Action (matching reference image) -->
        <RouterLink to="/wishlist" class="header-action-item" title="Wishlist">
          <div class="header-action-item_icon-wrap">
            <svg class="header-action-item_icon header-action-item_icon--wishlist" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span
              class="header-action-item_badge"
              :class="{ 'has-items': wishlistCount > 0 }"
            >
              {{ wishlistCount > 99 ? '99+' : wishlistCount }}
            </span>
          </div>
          <span class="header-action-item_title">{{ t('header.wishlist', 'Wishlist') }}</span>
        </RouterLink>

        <!-- Appearance Action (In front of Cart Icon) -->
        <div class="header-action-item header-action-item--appearance" :title="t('header.appearance', 'Appearance')">
          <div class="header-action-item_switch-wrap">
            <AppearanceSwitch :floating="false" />
          </div>
          <span class="header-action-item_title">{{ t('header.appearance', 'Appearance') }}</span>
        </div>

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
          <RouterLink to="/register" class="app-header_auth-link">{{ t('header.register', 'Register') }}</RouterLink>
        </div>
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

    <!-- Mobile Navigation Drawer -->
    <Teleport to="body">
      <Transition name="mobile-nav-fade">
        <div
          v-if="isMobileMenuOpen"
          class="mobile-nav_backdrop"
          @click="closeMobileMenu"
        />
      </Transition>
      <Transition name="mobile-nav-slide">
        <aside
          v-if="isMobileMenuOpen"
          class="mobile-nav_drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div class="mobile-nav_header">
            <RouterLink to="/" class="mobile-nav_logo" @click="closeMobileMenu">
              <img :src="logoImg" alt="HomeAll" />
            </RouterLink>
            <button
              type="button"
              class="mobile-nav_close"
              aria-label="Close menu"
              @click="closeMobileMenu"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="mobile-nav_body">
            <!-- Search Inside Mobile Menu -->
            <form class="mobile-nav_search" role="search" @submit.prevent="handleSearch">
              <input
                v-model="searchQuery"
                type="search"
                :placeholder="t('header.searchPlaceholder', 'Search products')"
              />
              <button type="submit" aria-label="Search">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>
            </form>

            <!-- Navigation Links -->
            <nav class="mobile-nav_links" aria-label="Mobile Links">
              <RouterLink
                v-for="link in navLinks"
                :key="link.key || link.label"
                :to="link.href"
                class="mobile-nav_link"
                @click="closeMobileMenu"
              >
                <span>{{ link.key ? t(`nav.${link.key}`, link.label) : link.label }}</span>
                <span class="mobile-nav_arrow" aria-hidden="true">›</span>
              </RouterLink>
            </nav>

            <!-- Mobile Appearance Switch -->
            <div class="mobile-nav_controls">
              <span class="mobile-nav_controls-label">{{ isKhmer ? 'រូបរាង (Appearance)' : 'Appearance' }}</span>
              <AppearanceSwitch :floating="false" />
            </div>

            <!-- Mobile Auth Buttons -->
            <div class="mobile-nav_auth">
              <RouterLink to="/sign-in" class="mobile-nav_auth-btn signin" @click="closeMobileMenu">
                {{ t('header.signIn', 'Sign in') }}
              </RouterLink>
              <RouterLink to="/register" class="mobile-nav_auth-btn register" @click="closeMobileMenu">
                {{ t('header.register', 'Register') }}
              </RouterLink>
            </div>
          </div>
        </aside>
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
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
  box-sizing: border-box;
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
  align-items: center;
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
  margin: 0 auto;
  flex: 1;
  display: flex;
  align-items: center;
  max-width: 440px;
  min-width: 180px;
}

.app-header_search input {
  flex: 1;
  height: 38px;
  padding: 0 var(--space-3, 12px);
  border: 1px solid var(--color-border-input, #cbd5e1);
  border-right: none;
  border-radius: var(--radius-sm, 6px) 0 0 var(--radius-sm, 6px);
  font-size: 13.5px;
  color: #000000;
  background-color: #ffffff;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.app-header_search input:focus {
  border-color: var(--color-brand, #34c759);
}

.app-header_search input::placeholder {
  color: #64748b;
  font-size: 13px;
}

.app-header_search-btn {
  width: 46px;
  height: 38px;
  background-color: var(--color-brand, #34c759);
  color: #ffffff;
  border: 1px solid var(--color-brand, #34c759);
  border-radius: 0 var(--radius-sm, 6px) var(--radius-sm, 6px) 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: background-color var(--transition-fast, 150ms ease),
              border-color var(--transition-fast, 150ms ease),
              transform var(--transition-fast, 150ms ease);
}

.app-header_search-btn:hover {
  background-color: var(--color-brand-dark, #2da84a);
  border-color: var(--color-brand-dark, #2da84a);
}

.app-header_search-btn:active {
  transform: scale(0.96);
}

/* Header Right Section (Right Center: Language, Compare, Wishlist, Appearance, Cart, Auth) */
.app-header_right {
  display: flex;
  align-items: center;
  gap: var(--space-4, 16px);
  margin-left: auto;
  flex-shrink: 0;
  height: 100%;
}

.app-header_auth {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-shrink: 0;
}

.app-header_auth-link {
  font-family: var(--font-family-title, 'Khmer OS', 'Khmer OS System', 'Khmer OS MSOL Light', 'Khmer', 'Kantumruy Pro', 'Battambang', sans-serif);
  font-family: var(--font-family-title, 'Siemreap', 'Battambang', sans-serif);
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
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.lang-selector_btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  height: 42px;
  box-sizing: border-box;
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

.header-action-item_icon--compare {
  color: #374151;
}

.header-action-item_icon--wishlist {
  color: #3b82f6;
}

.header-action-item_icon--cart {
  color: #374151;
}

.header-action-item:hover .header-action-item_icon--compare {
  color: #0284c7;
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

.app-header_auth {
  display: flex;
  align-items: center;
  gap: var(--space-4, 16px);
  margin-left: var(--space-2, 8px);
  height: 42px;
  flex-shrink: 0;
}

.app-header_auth-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 4px;
  font-size: var(--font-size-sm, 14px);
  font-weight: 500;
  line-height: 1;
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.app-header_auth-link:hover {
  color: var(--color-brand);
}

.header-action-item_switch-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
}

.header-action-item--appearance {
  cursor: pointer;
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

/* Mobile Hamburger Button */
.app-header_mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 38px;
  height: 38px;
  border-radius: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  flex-shrink: 0;
  transition: background-color 0.2s ease;
}

.app-header_mobile-toggle:hover {
  background-color: #f1f5f9;
}

.hamburger-bar {
  width: 20px;
  height: 2px;
  background-color: #1f2937;
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.app-header_mobile-toggle.is-open .hamburger-bar:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.app-header_mobile-toggle.is-open .hamburger-bar:nth-child(2) {
  opacity: 0;
}

.app-header_mobile-toggle.is-open .hamburger-bar:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

/* Mobile Drawer Backdrop */
.mobile-nav_backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(4px);
  z-index: 99998;
}

/* Mobile Drawer Container */
.mobile-nav_drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  max-width: 86vw;
  background-color: #ffffff;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  box-shadow: 6px 0 25px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
}

.mobile-nav_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.mobile-nav_logo img {
  height: 38px;
  width: auto;
  max-width: 110px;
  object-fit: contain;
}

.mobile-nav_close {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.15s ease;
}

.mobile-nav_close:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.mobile-nav_body {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.mobile-nav_search {
  display: flex;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background: #f8fafc;
}

.mobile-nav_search input {
  flex: 1;
  padding: 10px 14px;
  border: none;
  background: transparent;
  font-size: 13.5px;
  color: #0f172a;
}

.mobile-nav_search button {
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

.mobile-nav_links {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mobile-nav_link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 8px;
  color: #1e293b;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.mobile-nav_link:hover,
.mobile-nav_link.router-link-active {
  background-color: #f0fdf4;
  color: var(--color-brand-dark, #269c46);
  font-weight: 600;
}

.mobile-nav_arrow {
  font-size: 18px;
  color: #94a3b8;
}

.mobile-nav_controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background-color: #f8fafc;
  border-radius: 8px;
  margin-top: 10px;
}

.mobile-nav_controls-label {
  font-size: 13.5px;
  font-weight: 500;
  color: #475569;
}

.mobile-nav_auth {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.mobile-nav_auth-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 6px;
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
}

.mobile-nav_auth-btn.signin {
  background-color: #f8fafc;
  color: #334155;
  border: 1px solid #cbd5e1;
}

.mobile-nav_auth-btn.register {
  background-color: var(--color-brand, #34c759);
  color: #ffffff;
}

/* Drawer Transitions */
.mobile-nav-fade-enter-active,
.mobile-nav-fade-leave-active {
  transition: opacity 0.25s ease;
}
.mobile-nav-fade-enter-from,
.mobile-nav-fade-leave-to {
  opacity: 0;
}

.mobile-nav-slide-enter-active,
.mobile-nav-slide-leave-active {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-nav-slide-enter-from,
.mobile-nav-slide-leave-to {
  transform: translateX(-100%);
}

/* Responsive Rules for Header Bar */
@media (max-width: 1024px) {
  .app-header_mobile-toggle {
    display: flex;
  }

  .app-header_nav {
    display: none;
  }

  .app-header_inner {
    gap: var(--space-4);
    padding: 0 var(--space-4);
  }

  .app-header_right {
    gap: var(--space-3, 12px);
  }
}

@media (max-width: 768px) {
  .header-action-item_title {
    display: none;
  }

  .app-header_auth {
    display: none;
  }

  .app-header_search {
    max-width: 200px;
  }

  .app-header_inner {
    gap: 10px;
  }

  .app-header_right {
    gap: 8px;
  }
}

@media (max-width: 580px) {
  .app-header_inner {
    height: auto;
    padding: 8px 12px;
    flex-wrap: wrap;
    row-gap: 8px;
  }

  .app-header_logo-img {
    height: 36px;
    max-width: 95px;
  }

  .app-header_search {
    order: 10;
    max-width: 100%;
    width: 100%;
    margin-top: 2px;
  }

  .lang-selector_code {
    display: none;
  }

  .header-action-item {
    padding: 4px 2px;
  }

  .app-header_right {
    margin-left: auto;
    gap: 6px;
  }
}

</style>

<!-- Dark mode overrides must live in a non-scoped block so that the
     ancestor selectors (:root[data-theme="dark"], body.dark) are not
     affected by Vue's scoped attribute hash. -->
<style>
/* =========================================================
   AppHeader – Dark Mode Overrides (non-scoped)
   ========================================================= */

/* Logo in dark mode: circular white background so the logo
   is clearly visible and has a clean defined shape */
:root[data-theme="dark"] .app-header_logo-img,
body.dark .app-header_logo-img {
  mix-blend-mode: normal;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.15);
}

/* Header bar background → dark in dark mode */
:root[data-theme="dark"] .app-header,
body.dark .app-header {
  background-color: #1a2236 !important;
  border-bottom-color: rgba(255, 255, 255, 0.08) !important;
}

/* Hamburger toggle button → dark bg, white bars */
:root[data-theme="dark"] .app-header_mobile-toggle,
body.dark .app-header_mobile-toggle {
  background-color: #252d3d !important;
}

:root[data-theme="dark"] .app-header_mobile-toggle:hover,
body.dark .app-header_mobile-toggle:hover {
  background-color: #2d3748 !important;
}

:root[data-theme="dark"] .hamburger-bar,
body.dark .hamburger-bar {
  background-color: #ffffff !important;
}

/* Nav links (Home, Product, About Us, New) → white */
:root[data-theme="dark"] .app-header_nav-link,
body.dark .app-header_nav-link {
  color: #ffffff;
}

:root[data-theme="dark"] .app-header_nav-link:hover,
body.dark .app-header_nav-link:hover {
  color: #34c759;
}

/* Caret arrow next to nav links → white */
:root[data-theme="dark"] .app-header_caret,
body.dark .app-header_caret {
  color: #ffffff;
}

/* Auth links (Sign In, Register) → white */
:root[data-theme="dark"] .app-header_auth-link,
body.dark .app-header_auth-link {
  color: #ffffff;
}

:root[data-theme="dark"] .app-header_auth-link:hover,
body.dark .app-header_auth-link:hover {
  color: #34c759;
}

/* Icon titles → white */
:root[data-theme="dark"] .header-action-item_title,
body.dark .header-action-item_title {
  color: #ffffff;
}

:root[data-theme="dark"] .header-action-item:hover .header-action-item_title,
body.dark .header-action-item:hover .header-action-item_title {
  color: #ffffff;
}

/* Compare icon → light */
:root[data-theme="dark"] .header-action-item_icon--compare,
body.dark .header-action-item_icon--compare {
  color: #e2e8f0;
}

/* Cart icon → light */
:root[data-theme="dark"] .header-action-item_icon--cart,
body.dark .header-action-item_icon--cart {
  color: #e2e8f0;
}

/* Hover states */
:root[data-theme="dark"] .header-action-item:hover .header-action-item_icon--compare,
body.dark .header-action-item:hover .header-action-item_icon--compare {
  color: #7dd3fc;
}

:root[data-theme="dark"] .header-action-item:hover .header-action-item_icon--cart,
body.dark .header-action-item:hover .header-action-item_icon--cart {
  color: var(--color-brand);
}

/* Search input in Dark Mode: text color solid black on clean white background */
:root[data-theme="dark"] .app-header_search input,
body.dark .app-header_search input {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  background-color: #ffffff !important;
  border-color: #cbd5e1 !important;
}

:root[data-theme="dark"] .app-header_search input::placeholder,
body.dark .app-header_search input::placeholder {
  color: #64748b !important;
  -webkit-text-fill-color: #64748b !important;
}

/* Mobile search in Dark Mode: text color solid black on clean white background */
:root[data-theme="dark"] .mobile-nav_search,
body.dark .mobile-nav_search {
  background-color: #ffffff !important;
  border-color: #cbd5e1 !important;
}

:root[data-theme="dark"] .mobile-nav_search input,
body.dark .mobile-nav_search input {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  background-color: #ffffff !important;
}

:root[data-theme="dark"] .mobile-nav_search input::placeholder,
body.dark .mobile-nav_search input::placeholder {
  color: #64748b !important;
  -webkit-text-fill-color: #64748b !important;
}

:root[data-theme="dark"] .app-header_search-btn,
body.dark .app-header_search-btn {
  background-color: var(--color-brand, #34c759) !important;
  border-color: var(--color-brand, #34c759) !important;
  color: #ffffff !important;
}

/* =========================================================
   Mobile Navigation Drawer – Dark Mode
   ========================================================= */

/* Drawer background */
:root[data-theme="dark"] .mobile-nav_drawer,
body.dark .mobile-nav_drawer {
  background-color: #1a2236 !important;
  box-shadow: 6px 0 30px rgba(0, 0, 0, 0.5) !important;
}

/* Drawer header (logo + close) */
:root[data-theme="dark"] .mobile-nav_header,
body.dark .mobile-nav_header {
  border-bottom-color: rgba(255, 255, 255, 0.1) !important;
}

/* Close button */
:root[data-theme="dark"] .mobile-nav_close,
body.dark .mobile-nav_close {
  background-color: #252d3d !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #e2e8f0 !important;
}

:root[data-theme="dark"] .mobile-nav_close:hover,
body.dark .mobile-nav_close:hover {
  background-color: #2d3748 !important;
  color: #ffffff !important;
}

/* Nav links */
:root[data-theme="dark"] .mobile-nav_link,
body.dark .mobile-nav_link {
  color: #e2e8f0 !important;
}

:root[data-theme="dark"] .mobile-nav_link:hover,
body.dark .mobile-nav_link:hover,
:root[data-theme="dark"] .mobile-nav_link.router-link-active,
body.dark .mobile-nav_link.router-link-active {
  background-color: rgba(52, 199, 89, 0.12) !important;
  color: #4ade80 !important;
}

/* Arrow in nav links */
:root[data-theme="dark"] .mobile-nav_arrow,
body.dark .mobile-nav_arrow {
  color: #64748b !important;
}

/* Appearance / Controls row */
:root[data-theme="dark"] .mobile-nav_controls,
body.dark .mobile-nav_controls {
  background-color: #252d3d !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
}

:root[data-theme="dark"] .mobile-nav_controls-label,
body.dark .mobile-nav_controls-label {
  color: #e2e8f0 !important;
}

/* Auth section divider */
:root[data-theme="dark"] .mobile-nav_auth,
body.dark .mobile-nav_auth {
  border-top-color: rgba(255, 255, 255, 0.1) !important;
}

/* Sign In button */
:root[data-theme="dark"] .mobile-nav_auth-btn.signin,
body.dark .mobile-nav_auth-btn.signin {
  background-color: #252d3d !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
  color: #e2e8f0 !important;
}

/* Register button stays green, ensure it looks right */
:root[data-theme="dark"] .mobile-nav_auth-btn.register,
body.dark .mobile-nav_auth-btn.register {
  background-color: var(--color-brand, #34c759) !important;
  color: #ffffff !important;
}

/* Search icon button inside mobile search */
:root[data-theme="dark"] .mobile-nav_search button,
body.dark .mobile-nav_search button {
  color: #94a3b8 !important;
}
</style>

