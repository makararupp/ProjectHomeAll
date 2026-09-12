<script setup>
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { fastFoodCatalog, bbqGrilledCatalog } from '@/data/foodProducts'
import { useI18n } from '@/composables/useI18n'

const { t, isKhmer } = useI18n()
</script>

<template>
  <div class="category-page">
    <AppHeader />
    <CategoryNav />

    <main class="category-main container">
      <!-- Breadcrumb Navigation: Home > Product Categories > Food & Beverage -->
      <nav class="category-breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/" class="category-breadcrumb__link">
          {{ t('foodPage.breadcrumbHome', 'Home') }}
        </RouterLink>
        <span class="category-breadcrumb__separator" aria-hidden="true">&gt;</span>
        <RouterLink to="/products" class="category-breadcrumb__link">
          {{ t('foodPage.breadcrumbCategories', 'Product Categories') }}
        </RouterLink>
        <span class="category-breadcrumb__separator" aria-hidden="true">&gt;</span>
        <span class="category-breadcrumb__current" aria-current="page">
          {{ t('foodPage.breadcrumbCurrent', 'Food & Beverage') }}
        </span>
      </nav>

      <!-- Page Heading & Subtitle -->
      <header class="category-header">
        <h1 class="category-header__title" :class="{ 'is-khmer': isKhmer }">
          {{ t('foodPage.pageTitle', 'Food & Beverage') }}
        </h1>
        <p class="category-header__subtitle" :class="{ 'is-khmer': isKhmer }">
          {{ t('foodPage.pageSubtitle', 'Delicious culinary delights, fast food meals, BBQ grills, and premium food catering selections.') }}
        </p>
      </header>

      <!-- Section 1: Fast Food & Popular Meals (f1, f2, f5, f6, f7) -->
      <section class="catalog-section" aria-labelledby="fast-food-heading">
        <div class="section-bar">
          <h2 id="fast-food-heading" class="section-bar__title" :class="{ 'is-khmer': isKhmer }">
            {{ t('foodPage.fastFoodTitle', 'Fast Food & Popular Meals') }}
          </h2>

          <div class="section-bar__actions">
            <RouterLink
              to="/products?group=Food"
              class="section-bar__btn"
              :class="{ 'is-khmer': isKhmer }"
            >
              {{ t('foodPage.viewAllFastFood', 'View All Fast Food') }}
            </RouterLink>

            <span class="section-bar__page">1 / 1</span>

            <div class="section-bar__arrows">
              <button
                type="button"
                class="arrow-btn"
                aria-label="Previous page"
                disabled
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                class="arrow-btn"
                aria-label="Next page"
                disabled
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Fast Food Catalog Grid featuring f1, f2, f5, f6, f7 -->
        <div class="catalog-grid">
          <RouterLink
            v-for="item in fastFoodCatalog"
            :key="item.id"
            :to="{ path: '/products', query: { search: item.name } }"
            class="catalog-item"
            :title="t(`foodPage.${item.key}`, item.name)"
          >
            <div class="catalog-item__box">
              <img
                :src="item.image"
                :alt="t(`foodPage.${item.key}`, item.name)"
                class="catalog-item__img"
                loading="lazy"
              />
            </div>

            <span class="catalog-item__name" :class="{ 'is-khmer': isKhmer }">
              {{ t(`foodPage.${item.key}`, item.name) }}
            </span>
          </RouterLink>
        </div>
      </section>

      <!-- Section 2: BBQ & Grilled Specialties (f3, f4, etc.) -->
      <section class="catalog-section" aria-labelledby="bbq-grill-heading">
        <div class="section-bar">
          <h2 id="bbq-grill-heading" class="section-bar__title" :class="{ 'is-khmer': isKhmer }">
            {{ t('foodPage.bbqTitle', 'BBQ & Grilled Specialties') }}
          </h2>

          <div class="section-bar__actions">
            <RouterLink
              to="/products?group=Food"
              class="section-bar__btn"
              :class="{ 'is-khmer': isKhmer }"
            >
              {{ t('foodPage.viewAllBbq', 'View All BBQ & Grills') }}
            </RouterLink>

            <span class="section-bar__page">1 / 1</span>

            <div class="section-bar__arrows">
              <button
                type="button"
                class="arrow-btn"
                aria-label="Previous page"
                disabled
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                class="arrow-btn"
                aria-label="Next page"
                disabled
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- BBQ & Grilled Grid -->
        <div class="catalog-grid">
          <RouterLink
            v-for="item in bbqGrilledCatalog"
            :key="item.id"
            :to="{ path: '/products', query: { search: item.name } }"
            class="catalog-item"
            :title="t(`foodPage.${item.key}`, item.name)"
          >
            <div class="catalog-item__box">
              <img
                :src="item.image"
                :alt="t(`foodPage.${item.key}`, item.name)"
                class="catalog-item__img"
                loading="lazy"
              />
            </div>

            <span class="catalog-item__name" :class="{ 'is-khmer': isKhmer }">
              {{ t(`foodPage.${item.key}`, item.name) }}
            </span>
          </RouterLink>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.category-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.category-main {
  flex: 1;
  width: 100%;
  padding-top: 24px;
  padding-bottom: 56px;
  background-color: #ffffff;
}

/* Breadcrumb Navigation */
.category-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 13.5px;
  color: #4b5563;
}

.category-breadcrumb__link {
  color: #4b5563;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.category-breadcrumb__link:hover {
  color: #111827;
  text-decoration: underline;
}

.category-breadcrumb__separator {
  color: #9ca3af;
  font-size: 12px;
  user-select: none;
}

.category-breadcrumb__current {
  color: #111827;
  font-weight: 600;
}

/* Page Header */
.category-header {
  margin-bottom: 22px;
}

.category-header__title {
  font-size: 26px;
  font-weight: 700;
  color: #111827;
  line-height: 1.25;
  margin-bottom: 8px;
}

.category-header__title.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 24px;
  line-height: 1.4;
}

.category-header__subtitle {
  font-size: 14px;
  color: #4b5563;
  max-width: 960px;
  line-height: 1.5;
}

.category-header__subtitle.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 14px;
  line-height: 1.6;
}

/* Section Header Bar */
.catalog-section {
  width: 100%;
}

.catalog-section + .catalog-section {
  margin-top: 48px;
}

.section-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f4f5f7;
  border-radius: 8px;
  padding: 10px 18px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.section-bar__title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.section-bar__title.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 15.5px;
}

.section-bar__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-bar__btn {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.section-bar__btn:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
  color: #111827;
}

.section-bar__btn.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 12.5px;
}

.section-bar__page {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  padding: 0 4px;
}

.section-bar__arrows {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.arrow-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  background-color: #ffffff;
  transition: all var(--transition-fast);
}

.arrow-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.arrow-btn:not(:disabled):hover {
  background-color: #f9fafb;
  color: #111827;
}

/* 10-Column Catalog Grid */
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 22px 10px;
}

/* Product Card */
.catalog-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
}

.catalog-item__box {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #ffffff;
  border: 1px solid #f0f1f3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  transition: all 0.2s ease;
  overflow: hidden;
}

.catalog-item:hover .catalog-item__box {
  transform: translateY(-2px);
  border-color: #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.catalog-item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  transition: transform 0.2s ease;
}

.catalog-item:hover .catalog-item__img {
  transform: scale(1.04);
}

/* Product Name Label */
.catalog-item__name {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #212529;
  text-align: center;
  line-height: 1.35;
  width: 100%;
  min-height: 32px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color var(--transition-fast);
}

.catalog-item__name.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 11.5px;
  line-height: 1.4;
}

.catalog-item:hover .catalog-item__name {
  color: #111827;
}

/* Responsive Grid */
@media (max-width: 1280px) {
  .catalog-grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

@media (max-width: 1024px) {
  .catalog-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 18px 12px;
  }
}

@media (max-width: 768px) {
  .catalog-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 14px 10px;
  }

  .section-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .section-bar__actions {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .catalog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 8px;
  }

  .category-header__title {
    font-size: 22px;
  }
}
</style>

