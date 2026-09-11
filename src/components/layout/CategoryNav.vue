<script setup>
import { ref } from 'vue'
import { categories } from '@/data/categories'

const isOpen = ref(false)
</script>

<template>
  <nav class="category-nav" aria-label="Categories">
    <div class="category-nav__inner">
      <button
        type="button"
        class="category-nav__trigger"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="category-nav__trigger-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        All Categories
      </button>

      <ul class="category-nav__list">
        <li v-for="category in categories" :key="category.label">
          <a :href="category.href">{{ category.label }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.category-nav {
  background-color: var(--color-brand);
  height: var(--category-nav-height);
}

.category-nav__inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-10);
  width: 100%;
  padding: 0 var(--space-8);
}

.category-nav__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-white);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.category-nav__trigger-icon {
  display: inline-flex;
  flex-direction: column;
  gap: 3px;
}

.category-nav__trigger-icon span {
  width: 14px;
  height: 2px;
  border-radius: var(--radius-pill);
  background-color: var(--color-text-white);
}

.category-nav__list {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.category-nav__list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.category-nav__list a {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.92);
  white-space: nowrap;
}

.category-nav__list a:hover {
  color: var(--color-text-white);
  text-decoration: underline;
}
</style>
