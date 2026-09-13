<script setup>
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { constructionWorksCatalog, constructionMaterialsCatalog } from '@/data/constructionProducts'
import { useI18n } from '@/composables/useI18n'

const { t, isKhmer } = useI18n()
</script>

<template>
  <div class="category-page">
    <AppHeader />
    <CategoryNav />

    <main class="category-main container">
      <!-- Breadcrumb Navigation: Home > Product Categories > Construction -->
      <nav class="category-breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/" class="category-breadcrumb_link">
          {{ t('constructionPage.breadcrumbHome', 'Home') }}
        </RouterLink>
        <span class="category-breadcrumb_separator" aria-hidden="true">&gt;</span>
        <RouterLink to="/products" class="category-breadcrumb_link">
          {{ t('constructionPage.breadcrumbCategories', 'Product Categories') }}
        </RouterLink>
        <span class="category-breadcrumb_separator" aria-hidden="true">&gt;</span>
        <span class="category-breadcrumb_current" aria-current="page">
          {{ t('constructionPage.breadcrumbCurrent', 'Construction') }}
        </span>
      </nav>

      <!-- Page Heading & Subtitle -->
      <header class="category-header">
        <h1 class="category-header_title" :class="{ 'is-khmer': isKhmer }">
          {{ t('constructionPage.pageTitle', 'Construction') }}
        </h1>
        <p class="category-header_subtitle" :class="{ 'is-khmer': isKhmer }">
          {{ t('constructionPage.pageSubtitle', 'High-standard construction materials, renovation solutions, and specialized architectural project installations.') }}
        </p>
      </header>

      <!-- Section 1: Construction & Architectural Works (c2 to c6) -->
      <section class="catalog-section" aria-labelledby="construction-works-heading">
        <div class="section-bar">
          <h2 id="construction-works-heading" class="section-bar_title" :class="{ 'is-khmer': isKhmer }">
            {{ t('constructionPage.worksTitle', 'Construction & Architectural Works') }}
          </h2>

          <div class="section-bar_actions">
            <RouterLink
              to="/products?group=Construction"
              class="section-bar_btn"
              :class="{ 'is-khmer': isKhmer }"
            >
              {{ t('constructionPage.viewAllWorks', 'View Construction Works') }}
            </RouterLink>

            <span class="section-bar_page">1 / 1</span>

            <div class="section-bar_arrows">
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

        <!-- Construction Works Grid featuring c2 to c6 -->
        <div class="catalog-grid">
          <RouterLink
            v-for="item in constructionWorksCatalog"
            :key="item.id"
            :to="{ path: '/products', query: { group: 'Construction', search: item.name } }"
            class="catalog-item"
            :title="t(`constructionPage.${item.key}`, item.name)"
          >
            <div class="catalog-item_box">
              <img
                :src="item.image"
                :alt="t(`constructionPage.${item.key}`, item.name)"
                class="catalog-item_img"
                loading="lazy"
              />
            </div>

            <span class="catalog-item_name" :class="{ 'is-khmer': isKhmer }">
              {{ t(`constructionPage.${item.key}`, item.name) }}
            </span>
          </RouterLink>
        </div>
      </section>

      <!-- Section 2: Construction Materials (c1 + Structural items) -->
      <section class="catalog-section" aria-labelledby="construction-materials-heading">
        <div class="section-bar">
          <h2 id="construction-materials-heading" class="section-bar_title" :class="{ 'is-khmer': isKhmer }">
            {{ t('constructionPage.materialsTitle', 'Key Construction Materials') }}
          </h2>

          <div class="section-bar_actions">
            <RouterLink
              to="/products?group=Construction"
              class="section-bar_btn"
              :class="{ 'is-khmer': isKhmer }"
            >
              {{ t('constructionPage.viewAllMaterials', 'View Construction Materials') }}
            </RouterLink>

            <span class="section-bar_page">1 / 1</span>

            <div class="section-bar_arrows">
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

        <!-- Construction Materials Grid -->
        <div class="catalog-grid">
          <RouterLink
            v-for="item in constructionMaterialsCatalog"
            :key="item.id"
            :to="{ path: '/products', query: { search: item.name } }"
            class="catalog-item"
            :title="t(`constructionPage.${item.key}`, item.name)"
          >
            <div class="catalog-item_box">
              <img
                :src="item.image"
                :alt="t(`constructionPage.${item.key}`, item.name)"
                class="catalog-item_img catalog-item_img--contain"
                loading="lazy"
              />
            </div>

            <span class="catalog-item_name" :class="{ 'is-khmer': isKhmer }">
              {{ t(`constructionPage.${item.key}`, item.name) }}
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

.category-breadcrumb_link {
  color: #4b5563;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.category-breadcrumb_link:hover {
  color: #111827;
  text-decoration: underline;
}

.category-breadcrumb_separator {
  color: #9ca3af;
  font-size: 12px;
  user-select: none;
}

.category-breadcrumb_current {
  color: #111827;
  font-weight: 600;
}

/* Page Header */
.category-header {
  margin-bottom: 22px;
}

.category-header_title {
  font-size: 26px;
  font-weight: 700;
  color: #111827;
  line-height: 1.25;
  margin-bottom: 8px;
}

.category-header_title.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 24px;
  line-height: 1.4;
}

.category-header_subtitle {
  font-size: 14px;
  color: #4b5563;
  max-width: 960px;
  line-height: 1.5;
}

.category-header_subtitle.is-khmer {
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

.section-bar_title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.section-bar_title.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 15.5px;
}

.section-bar_actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-bar_btn {
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

.section-bar_btn:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
  color: #111827;
}

.section-bar_btn.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 12.5px;
}

.section-bar_page {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  padding: 0 4px;
}

.section-bar_arrows {
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

.catalog-item_box {
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

.catalog-item:hover .catalog-item_box {
  transform: translateY(-2px);
  border-color: #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.catalog-item_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  transition: transform 0.2s ease;
}

.catalog-item_img--contain {
  object-fit: contain;
}

.catalog-item:hover .catalog-item_img {
  transform: scale(1.04);
}

/* Product Name Label */
.catalog-item_name {
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
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color var(--transition-fast);
}

.catalog-item_name.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 11.5px;
  line-height: 1.4;
}

.catalog-item:hover .catalog-item_name {
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

  .section-bar_actions {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .catalog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 8px;
  }

  .category-header_title {
    font-size: 22px;
  }
}
</style>

