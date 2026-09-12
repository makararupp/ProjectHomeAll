<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { navLinks } from '@/data/navLinks'
import BaseButton from '@/components/ui/BaseButton.vue'

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
  { id: 'en', code: 'US', displayCode: 'EN', name: 'English' },
  { id: 'zh', code: 'CN', displayCode: 'CN', name: '中文' }
]

const currentLang = ref(languages[1]) // Default to English (US / EN)

function selectLanguage(lang) {
  currentLang.value = lang
  isLangOpen.value = false
  localStorage.setItem('app_language', lang.id)
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
  const saved = localStorage.getItem('app_language')
  if (saved) {
    const found = languages.find(l => l.id === saved)
    if (found) currentLang.value = found
  }
  document.addEventListener('click', handleClickOutsideLang)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutsideLang)
})
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      
      <nav class="app-header__nav" aria-label="Primary">
        <ul>
          <li v-for="link in navLinks" :key="link.label">
            <RouterLink :to="link.href" class="app-header__nav-link">
              {{ link.label }}
              <span v-if="link.hasDropdown" class="app-header__caret" aria-hidden="true">⌄</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <form
        v-if="showSearch"
        class="app-header__search"
        role="search"
        @submit.prevent="handleSearch"
      >
        <label for="site-search" class="sr-only">Search products, categories or services</label>
        <input
          id="site-search"
          v-model="searchQuery"
          type="search"
          placeholder="Search products"
        />
        <BaseButton variant="primary" size="md">
          <button type="submit" class="app-header__search-submit">Search</button>
        </BaseButton>
      </form>

      <!-- Language Selector (matching reference image) -->
      <div ref="langRef" class="lang-selector">
        <button
          type="button"
          class="lang-selector__btn"
          :class="{ 'is-open': isLangOpen }"
          :aria-expanded="isLangOpen"
          aria-haspopup="true"
          @click="toggleLangDropdown"
        >
          <span class="lang-selector__globe" aria-hidden="true">🌐</span>
          <span class="lang-selector__code">{{ currentLang.displayCode }}</span>
          <svg
            class="lang-selector__caret"
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
          <div v-if="isLangOpen" class="lang-selector__dropdown" role="menu">
            <button
              v-for="lang in languages"
              :key="lang.id"
              type="button"
              class="lang-selector__option"
              :class="{ 'is-selected': currentLang.id === lang.id }"
              role="menuitem"
              @click="selectLanguage(lang)"
            >
              <span class="lang-selector__item-code">{{ lang.code }}</span>
              <span class="lang-selector__item-name" :lang="lang.id">{{ lang.name }}</span>
            </button>
          </div>
        </transition>
      </div>

      <div v-if="showAuth" class="app-header__auth">
        <RouterLink to="/sign-in" class="app-header__auth-link">Sign in</RouterLink>
        <RouterLink to="/register" class="app-header__auth-link app-header__auth-link--strong">Register</RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: var(--color-bg-surface);
  border-bottom: 1px solid var(--color-border);
}

.app-header__inner {
  height: var(--header-height);
  display: flex;
  align-items: center;
  gap: var(--space-8);
  width: 100%;
  padding: 0 var(--space-8);
}

.app-header__logo {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  flex-shrink: 0;
}

.app-header__nav ul {
  display: flex;
  gap: var(--space-6);
}

.app-header__nav-link {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text-primary);
  transition: color var(--transition-fast);
}

.app-header__nav-link:hover {
  color: #34c759;
}

.app-header__caret {
  color: var(--color-text-nav);
  font-size: var(--font-size-md);
  transition: color var(--transition-fast);
}

.app-header__search {
  margin-left: auto;
  flex: 1;
  display: flex;
  max-width: 460px;
}

.app-header__search input {
  flex: 1;
  height: 38px;
  padding: 0 var(--space-3);
  border: 1px solid var(--color-border-input);
  border-right: none;
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
  font-size: 13.5px;
  color: var(--color-text-primary);
}

.app-header__search input::placeholder {
  color: var(--color-text-faint);
  font-size: 13px;
}

.app-header__search .base-button {
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 0;
  width: 80px;
  height: 38px;
}

.app-header__search-submit {
  width: 100%;
  height: 100%;
  color: inherit;
  font: inherit;
  font-weight: 600;
}

.app-header__auth {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  flex-shrink: 0;
}

.app-header__auth-link {
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--color-text-primary);
}

.app-header__auth-link--strong {
  font-weight: 600;
}

.app-header__auth-link:hover {
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

.lang-selector__btn {
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

.lang-selector__btn:hover,
.lang-selector__btn.is-open {
  border-color: #9ca3af;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.lang-selector__globe {
  font-size: 15px;
  line-height: 1;
}

.lang-selector__code {
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: 0.02em;
}

.lang-selector__caret {
  color: #6b7280;
  transition: transform 0.2s ease;
}

.lang-selector__caret.is-flipped {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.lang-selector__dropdown {
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

.lang-selector__option {
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

.lang-selector__option:hover {
  background-color: #f9fafb;
}

.lang-selector__option.is-selected {
  background-color: #f0f7ff;
  color: #2563eb;
}

.lang-selector__item-code {
  font-size: 13px;
  font-weight: 700;
  width: 24px;
  color: inherit;
}

.lang-selector__option:not(.is-selected) .lang-selector__item-code {
  color: #4b5563;
}

.lang-selector__item-name {
  font-size: 13.5px;
  font-weight: 500;
  color: inherit;
}

.lang-selector__option:not(.is-selected) .lang-selector__item-name {
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

@media (max-width: 1024px) {
  .app-header__nav {
    display: none;
  }
}
</style>
