<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { allProducts, itemGroups } from '@/data/products'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

// Helper to map item group and category name to translated string
function getGroupLabel(name) {
  if (!name) return ''
  const keyMap = {
    'Steel Product': 'steelProduct',
    'Copper Pipes': 'copperPipes',
    'Agricultural Products': 'agriculturalProducts',
    'Kitchen Products': 'kitchenProducts',
    'Kitchen Product': 'kitchenProduct',
    'Seasoning & Spice': 'seasoningSpice',
    'PVC Material': 'pvcMaterial',
    'Bathroom Appliances': 'bathroomAppliances',
    'Bathroom Appliance': 'bathroomAppliance',
    'Floor Tile': 'floorTile',
    'Plastic Resin': 'plasticResin'
  }
  const key = keyMap[name]
  return key ? t(`products.${key}`, name) : name
}

const searchQuery = ref('')
const selectedGroups = ref([])
const viewMode = ref('grid') // 'grid' | 'list'

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(6) // 6 items per page (2 rows of 3)

// Filter products based on search input and selected item groups
const filteredProducts = computed(() => {
  return allProducts.filter((product) => {
    // Check item group filter
    const matchesGroup =
      selectedGroups.value.length === 0 ||
      selectedGroups.value.includes(product.itemGroup) ||
      selectedGroups.value.includes(product.category)

    // Check search query filter
    const query = searchQuery.value.trim().toLowerCase()
    const matchesSearch =
      !query ||
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.price.toLowerCase().includes(query)

    return matchesGroup && matchesSearch
  })
})

// Calculate total pages
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value) || 1
})

// Sliced products for current page
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredProducts.value.slice(start, start + itemsPerPage.value)
})

// Reset to page 1 whenever filters or search query change
watch([searchQuery, selectedGroups], () => {
  currentPage.value = 1
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }
}

function clearAllFilters() {
  selectedGroups.value = []
  searchQuery.value = ''
  currentPage.value = 1
}
</script>

<template>
  <div class="products-page">
    <AppHeader />
    <CategoryNav />

    <main class="products-main container">
      <!-- Breadcrumbs -->
      <nav class="breadcrumb" aria-label="Breadcrumbs">
        <ol class="breadcrumb__list">
          <li class="breadcrumb__item">
            <RouterLink to="/" class="breadcrumb__link">{{ t('products.breadcrumbHome', 'Home') }}</RouterLink>
            <span class="breadcrumb__separator" aria-hidden="true">›</span>
          </li>
          <li class="breadcrumb__item">
            <RouterLink to="/" class="breadcrumb__link">{{ t('products.breadcrumbVillage', 'Homeall Village') }}</RouterLink>
            <span class="breadcrumb__separator" aria-hidden="true">›</span>
          </li>
          <li class="breadcrumb__item">
            <span class="breadcrumb__current" aria-current="page">{{ t('products.allProducts', 'All Products') }}</span>
          </li>
        </ol>
      </nav>

      <!-- Page Heading -->
      <h1 class="page-heading">{{ t('products.allProducts', 'All Products') }}</h1>

      <!-- Layout: Filters Sidebar + Content Area -->
      <div class="catalog-layout">
        <!-- Left Sidebar: Filters -->
        <aside class="catalog-sidebar" aria-label="Product Filters">
          <div class="filter-header">
            <h2 class="filter-header__title">{{ t('products.filters', 'Filters') }}</h2>
            <button
              type="button"
              class="filter-header__clear"
              @click="clearAllFilters"
            >
              {{ t('products.clearAll', 'Clear All') }}
            </button>
          </div>

          <div class="filter-divider" />

          <!-- Item Group Section -->
          <div class="filter-group">
            <h3 class="filter-group__title">{{ t('products.itemGroup', 'ITEM GROUP') }}</h3>
            <ul class="filter-group__list">
              <li v-for="group in itemGroups" :key="group" class="filter-item">
                <label class="filter-item__label">
                  <input
                    v-model="selectedGroups"
                    type="checkbox"
                    :value="group"
                    class="filter-item__checkbox"
                  />
                  <span class="filter-item__custom-box" aria-hidden="true">
                    <svg
                      v-if="selectedGroups.includes(group)"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="check-icon"
                    >
                      <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                    </svg>
                  </span>
                  <span class="filter-item__text">{{ getGroupLabel(group) }}</span>
                </label>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Right Content: x, View Mode & Products -->
        <section class="catalog-content">
          <!-- Top Search & View Control Bar -->
          <div class="toolbar">
            <div class="toolbar__search">
              <!-- Search Icon -->
              <svg
                class="toolbar__search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                v-model="searchQuery"
                type="text"
                class="toolbar__search-input"
                :placeholder="t('products.searchPlaceholder', 'Search products')"
                :aria-label="t('products.searchPlaceholder', 'Search products')"
              />
            </div>

            <!-- View Mode Switcher -->
            <div class="toolbar__views" role="group" aria-label="View toggle">
              <button
                type="button"
                class="toolbar__view-btn"
                :class="{ 'is-active': viewMode === 'grid' }"
                title="Grid view"
                aria-label="Grid view"
                @click="viewMode = 'grid'"
              >
                <!-- 3x3 Grid Icon -->
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <rect x="2" y="2" width="4" height="4" rx="1" />
                  <rect x="8" y="2" width="4" height="4" rx="1" />
                  <rect x="14" y="2" width="4" height="4" rx="1" />
                  <rect x="2" y="8" width="4" height="4" rx="1" />
                  <rect x="8" y="8" width="4" height="4" rx="1" />
                  <rect x="14" y="8" width="4" height="4" rx="1" />
                  <rect x="2" y="14" width="4" height="4" rx="1" />
                  <rect x="8" y="14" width="4" height="4" rx="1" />
                  <rect x="14" y="14" width="4" height="4" rx="1" />
                </svg>
              </button>

              <button
                type="button"
                class="toolbar__view-btn"
                :class="{ 'is-active': viewMode === 'list' }"
                title="List view"
                aria-label="List view"
                @click="viewMode = 'list'"
              >
                <!-- List Icon -->
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <rect x="2" y="3" width="3" height="3" rx="0.5" />
                  <rect x="7" y="3.5" width="11" height="2" rx="0.5" />
                  <rect x="2" y="8.5" width="3" height="3" rx="0.5" />
                  <rect x="7" y="9" width="11" height="2" rx="0.5" />
                  <rect x="2" y="14" width="3" height="3" rx="0.5" />
                  <rect x="7" y="14.5" width="11" height="2" rx="0.5" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Products Listing -->
          <div
            v-if="paginatedProducts.length > 0"
            :class="viewMode === 'grid' ? 'products-grid' : 'products-list'"
          >
            <article
              v-for="product in paginatedProducts"
              :key="product.id"
              class="product-card"
              :class="{ 'product-card--list': viewMode === 'list' }"
            >
              <!-- Card Image Box -->
              <div class="product-card__image-wrap">
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.title"
                  class="product-card__img"
                />
                <span v-else class="product-card__placeholder">Product image</span>
              </div>

              <!-- Card Details -->
              <div class="product-card__body">
                <h3 class="product-card__title">{{ product.title }}</h3>
                <p class="product-card__category">{{ getGroupLabel(product.category) }}</p>
                <p class="product-card__price">{{ product.price }}</p>
                <p
                  class="product-card__stock"
                  :class="product.inStock ? 'stock--in' : 'stock--out'"
                >
                  {{ product.inStock ? t('products.stockIn', 'Stock In') : t('products.outOfStock', 'Out of stock') }}
                </p>
              </div>
            </article>
          </div>

          <!-- Empty State -->
          <div v-else class="catalog-empty">
            <p class="catalog-empty__text">{{ t('products.noProducts', 'No products found matching your filter.') }}</p>
            <button
              type="button"
              class="catalog-empty__btn"
              @click="clearAllFilters"
            >
              {{ t('products.clearFilters', 'Clear filters') }}
            </button>
          </div>

          <!-- Pagination Controls (Positioned directly below the product cards) -->
          <div
            v-if="filteredProducts.length > itemsPerPage"
            class="pagination-container"
          >
            <p class="pagination-info">
              {{ t('products.showing', 'Showing') }} {{ (currentPage - 1) * itemsPerPage + 1 }}–{{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }} {{ t('products.of', 'of') }} {{ filteredProducts.length }} {{ t('products.productsText', 'products') }}
            </p>

            <nav class="pagination" aria-label="Products pagination">
              <button
                type="button"
                class="pagination__nav-btn"
                :disabled="currentPage === 1"
                aria-label="Previous page"
                @click="goToPage(currentPage - 1)"
              >
                ‹ {{ t('products.previous', 'Previous') }}
              </button>

              <div class="pagination__pages">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  type="button"
                  class="pagination__page-btn"
                  :class="{ 'is-active': currentPage === page }"
                  :aria-current="currentPage === page ? 'page' : null"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </button>
              </div>

              <button
                type="button"
                class="pagination__nav-btn"
                :disabled="currentPage === totalPages"
                aria-label="Next page"
                @click="goToPage(currentPage + 1)"
              >
                {{ t('products.next', 'Next') }} ›
              </button>
            </nav>
          </div>
        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.products-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-surface);
  font-family: 'Kantumruy Pro', 'Battambang', var(--font-family-base);
}

.products-main {
  flex: 1;
  padding-top: var(--space-8);
  padding-bottom: var(--space-16);
}

/* Breadcrumbs */
.breadcrumb {
  margin-bottom: var(--space-4);
}

.breadcrumb__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--font-size-sm);
}

.breadcrumb__item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb__link {
  color: #6b7280;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumb__link:hover {
  color: var(--color-brand-dark);
}

.breadcrumb__separator {
  color: #9ca3af;
  font-size: 13px;
  user-select: none;
}

.breadcrumb__current {
  color: #4b5563;
  font-weight: 500;
}

/* Page Heading */
.page-heading {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 var(--space-6) 0;
  letter-spacing: -0.01em;
}

/* Catalog Layout */
.catalog-layout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

/* Left Sidebar */
.catalog-sidebar {
  width: 220px;
  flex-shrink: 0;
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.filter-header__title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.filter-header__clear {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: color var(--transition-fast);
}

.filter-header__clear:hover {
  color: #111827;
  text-decoration: underline;
}

.filter-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin-bottom: 20px;
}

.filter-group__title {
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0 0 16px 0;
}

.filter-group__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.filter-item__label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.filter-item__checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.filter-item__custom-box {
  width: 18px;
  height: 18px;
  border: 1.5px solid #d1d5db;
  border-radius: 4px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.filter-item__checkbox:checked + .filter-item__custom-box {
  border-color: #111827;
  background-color: #111827;
  color: #ffffff;
}

.check-icon {
  width: 12px;
  height: 12px;
}

.filter-item__text {
  font-size: 14px;
  color: #374151;
  line-height: 1.25;
}

.filter-item__label:hover .filter-item__text {
  color: #111827;
}

/* Right Content Area */
.catalog-content {
  flex: 1;
  min-width: 0;
}

/* Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #ffffff;
  padding: 4px 10px 4px 14px;
  min-height: 38px;
  margin-bottom: 24px;
  transition: border-color var(--transition-fast);
}

.toolbar:focus-within {
  border-color: var(--color-brand);
}

.toolbar__search {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar__search-icon {
  width: 14px;
  height: 14px;
  color: #9ca3af;
  flex-shrink: 0;
}

.toolbar__search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: #1f2937;
  background: transparent;
  font-family: inherit;
  padding: 4px 0;
}

.toolbar__search-input::placeholder {
  color: #9ca3af;
  font-size: 13px;
}

.toolbar__views {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar__view-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  color: #9ca3af;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.toolbar__view-btn svg {
  width: 13px;
  height: 13px;
}

.toolbar__view-btn:hover {
  color: var(--color-brand-dark);
  border-color: var(--color-brand);
}

.toolbar__view-btn.is-active {
  color: #ffffff;
  border-color: var(--color-brand);
  background-color: var(--color-brand);
}

/* Products Grid (3 columns matching mockup) */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Products List View */
.products-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Product Card */
.product-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.product-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.product-card__image-wrap {
  width: 100%;
  aspect-ratio: 1.18;
  background-color: #f4f5f7;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  overflow: hidden;
}

.product-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card__placeholder {
  font-size: 14px;
  color: #9ca3af;
  font-weight: 400;
  user-select: none;
}

.product-card__body {
  display: flex;
  flex-direction: column;
}

.product-card__title {
  font-family: var(--font-family-title);
  font-size: 17px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 10px 0;
  line-height: 1.35;
}

.product-card__category {
  font-size: 13.5px;
  color: #6b7280;
  margin: 0 0 14px 0;
}

.product-card__price {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px 0;
}

.product-card__stock {
  font-size: 13px;
  font-weight: 500;
  margin: 0;
}

.stock--in {
  color: #2563eb;
}

.stock--out {
  color: #f87171;
}

/* List View Variant */
.product-card--list {
  flex-direction: row;
  align-items: center;
  gap: 24px;
}

.product-card--list .product-card__image-wrap {
  width: 160px;
  height: 130px;
  aspect-ratio: auto;
  margin-bottom: 0;
  flex-shrink: 0;
}

.product-card--list .product-card__body {
  flex: 1;
}

/* Pagination Section (Placed directly below the product grid) */
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Count on left, pagination buttons on right below last card */
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid #f3f4f6;
  gap: 16px;
  flex-wrap: wrap;
}

.pagination-info {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
}

.pagination__nav-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.pagination__nav-btn:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #d1d5db;
  color: #111827;
}

.pagination__nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination__pages {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pagination__page-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.pagination__page-btn:hover:not(.is-active) {
  background-color: #f9fafb;
  border-color: #d1d5db;
  color: #111827;
}

.pagination__page-btn.is-active {
  background-color: #111827;
  border-color: #111827;
  color: #ffffff;
  font-weight: 600;
}

/* Empty State */
.catalog-empty {
  text-align: center;
  padding: 64px 20px;
  background-color: #ffffff;
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
}

.catalog-empty__text {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 16px;
}

.catalog-empty__btn {
  background-color: #111827;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.catalog-empty__btn:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 800px) {
  .catalog-layout {
    flex-direction: column;
    gap: 24px;
  }

  .catalog-sidebar {
    width: 100%;
  }

  .filter-group__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .filter-group__list {
    grid-template-columns: 1fr;
  }

  .product-card--list {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-card--list .product-card__image-wrap {
    width: 100%;
    height: auto;
    aspect-ratio: 1.18;
  }

  .pagination {
    flex-wrap: wrap;
  }
}
</style>
