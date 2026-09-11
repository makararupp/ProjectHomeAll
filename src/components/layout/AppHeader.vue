<script setup>
import { ref } from 'vue'
import { navLinks } from '@/data/navLinks'
import BaseButton from '@/components/ui/BaseButton.vue'

const searchQuery = ref('')

function handleSearch() {
  // Placeholder handler — wire up to a real search route/API.
  console.log('Searching for:', searchQuery.value)
}
</script>

<template >
  <header class="app-header">
    <div class="app-header__inner container">
      <a href="/" class="app-header__logo">HomeAll</a>

      <nav class="app-header__nav" aria-label="Primary">
        <ul>
          <li v-for="link in navLinks" :key="link.label">
            <a :href="link.href" class="app-header__nav-link">
              {{ link.label }}
              <span v-if="link.hasDropdown" class="app-header__caret" aria-hidden="true">⌄</span>
            </a>
          </li>
        </ul>
      </nav>

      <form class="app-header__search" role="search" @submit.prevent="handleSearch">
        <label for="site-search" class="sr-only">Search products, categories or services</label>
        <input
          id="site-search"
          v-model="searchQuery"
          type="search"
          placeholder="Search products, categories or services"
        />
        <BaseButton variant="primary" size="md">
          <button type="submit" class="app-header__search-submit">Search</button>
        </BaseButton>
      </form>

      <div class="app-header__auth">
        <a href="/sign-in" class="app-header__auth-link">Sign in</a>
        <a href="/register" class="app-header__auth-link app-header__auth-link--strong">Register</a>
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
}

.app-header__nav-link:hover {
  color: var(--color-brand);
}

.app-header__caret {
  color: var(--color-text-nav);
  font-size: var(--font-size-md);
}

.app-header__search {
  flex: 1;
  display: flex;
  max-width: 565px;
}

.app-header__search input {
  flex: 1;
  height: 46px;
  padding: 0 var(--space-4);
  border: 1px solid var(--color-border-input);
  border-right: none;
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
}

.app-header__search input::placeholder {
  color: var(--color-text-faint);
}

.app-header__search .base-button {
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 0;
  width: 95px;
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

@media (max-width: 1024px) {
  .app-header__nav {
    display: none;
  }
}
</style>
