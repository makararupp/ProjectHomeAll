<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { customPcProducts } from '@/data/customPcProducts'
import { useCart } from '@/composables/useCart'
import { useI18n } from '@/composables/useI18n'

const route = useRoute()
const { t, isKhmer } = useI18n()
const { addToCart } = useCart()

// Sidebar categories & subcategories
const subCategories = [
  'Desktop',
  'Desktop - All-In-One',
  'Laptop',
  'Laptop - 2-in-1 & Tablet',
  'Laptop - Premium Model',
  'Custom PC Builder'
]

const activeSubCategory = ref('Custom PC Builder')

// Filters
const selectedBrand = ref('')
const sortBy = ref('newest')
const minPrice = ref(405)
const maxPrice = ref(1942)

// Toast feedback
const toastText = ref('')
const isToastOpen = ref(false)
let toastTimer = null

function showToast(msg) {
  if (toastTimer) clearTimeout(toastTimer)
  toastText.value = msg
  isToastOpen.value = true
  toastTimer = setTimeout(() => {
    isToastOpen.value = false
  }, 2500)
}

function handleAddProduct(product) {
  addToCart({
    id: product.id,
    name: product.title,
    price: `$${product.price}.00`,
    image: product.image,
    category: activeSubCategory.value
  })
  showToast(`"${product.title}" added to cart!`)
}

function selectSubCategory(sub) {
  activeSubCategory.value = sub
}

function resetPrice() {
  minPrice.value = 405
  maxPrice.value = 1942
}

// Watch route queries if arriving from mega menu
onMounted(() => {
  if (route.query.sub) {
    activeSubCategory.value = route.query.sub
  }
})

watch(
  () => route.query.sub,
  (newSub) => {
    if (newSub) {
      activeSubCategory.value = newSub
    }
  }
)

// Filter & Sort Logic
const filteredProducts = computed(() => {
  let list = [...customPcProducts]

  // Brand filter
  if (selectedBrand.value) {
    list = list.filter((p) => p.brand === selectedBrand.value)
  }

  // Price range filter
  list = list.filter((p) => p.price >= minPrice.value && p.price <= maxPrice.value)

  // Sort
  if (sortBy.value === 'price-asc') {
    list.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-desc') {
    list.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'rating') {
    list.sort((a, b) => b.rating - a.rating)
  }

  return list
})

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(8) // Default 8 items (2 rows of 4 cards)

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value) || 1
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredProducts.value.slice(start, start + itemsPerPage.value)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    const el = document.querySelector('.catalog-top-bar')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// Reset page to 1 when any filter changes
watch([selectedBrand, sortBy, minPrice, maxPrice, activeSubCategory, itemsPerPage], () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="category-catalog-page">
    <AppHeader />
    <CategoryNav />

    <main class="catalog-main container">
      <!-- Breadcrumbs: Home / All Categories / Computer / Custom PC Builder -->
      <nav class="catalog-breadcrumbs" aria-label="Breadcrumb">
        <RouterLink to="/" class="catalog-breadcrumb_link">Home</RouterLink>
        <span class="catalog-breadcrumb_sep">/</span>
        <RouterLink to="/all-categories" class="catalog-breadcrumb_link">All Categories</RouterLink>
        <span class="catalog-breadcrumb_sep">/</span>
        <span class="catalog-breadcrumb_link">Computer</span>
        <span class="catalog-breadcrumb_sep">/</span>
        <span class="catalog-breadcrumb_current" aria-current="page">{{ activeSubCategory }}</span>
      </nav>

      <!-- Main Layout: Sidebar + Content -->
      <div class="catalog-layout">
        <!-- Left Sidebar Filter -->
        <aside class="catalog-sidebar">
          <div class="sidebar-section">
            <h2 class="sidebar-title">Categories</h2>
            
            <div class="sidebar-nav">
              <button
                type="button"
                class="sidebar-nav_btn"
                @click="activeSubCategory = 'Custom PC Builder'"
              >
                All Categories
              </button>

              <button
                type="button"
                class="sidebar-nav_btn"
                @click="activeSubCategory = 'Custom PC Builder'"
              >
                Computer
              </button>

              <ul class="sidebar-sub-list">
                <li
                  v-for="sub in subCategories"
                  :key="sub"
                  class="sidebar-sub-item"
                >
                  <button
                    type="button"
                    class="sidebar-sub-link"
                    :class="{ 'is-active': activeSubCategory === sub }"
                    @click="selectSubCategory(sub)"
                  >
                    {{ sub }}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Price Range Section -->
          <div class="sidebar-section sidebar-section--price">
            <h3 class="sidebar-subtitle">Price range</h3>

            <!-- Dual Range Sliders -->
            <div class="price-slider-wrap">
              <div class="price-slider-track">
                <input
                  type="range"
                  min="300"
                  max="2000"
                  step="10"
                  v-model.number="minPrice"
                  class="price-range-input price-range-input--min"
                  aria-label="Minimum Price"
                />
                <input
                  type="range"
                  min="300"
                  max="2000"
                  step="10"
                  v-model.number="maxPrice"
                  class="price-range-input price-range-input--max"
                  aria-label="Maximum Price"
                />
              </div>

              <div class="price-values-row">
                <span class="price-box">{{ Number(minPrice).toFixed(2) }}</span>
                <span class="price-box">{{ Number(maxPrice).toFixed(2) }}</span>
              </div>

              <button
                type="button"
                class="price-reset-btn"
                @click="resetPrice"
              >
                Price
              </button>
            </div>
          </div>
        </aside>

        <!-- Right Main Catalog Content -->
        <section class="catalog-content">
          <!-- Heading & Top Filter Controls Bar -->
          <div class="catalog-top-bar">
            <h1 class="catalog-heading" :class="{ 'is-khmer': isKhmer }">
              {{ activeSubCategory }}
            </h1>

            <div class="catalog-filters">
              <!-- Brands Dropdown -->
              <div class="filter-group">
                <label for="brand-select" class="filter-label">Brands</label>
                <div class="select-wrapper">
                  <select id="brand-select" v-model="selectedBrand" class="filter-select">
                    <option value="">All Brands</option>
                    <option value="Intel">Intel</option>
                    <option value="AMD">AMD</option>
                  </select>
                  <svg class="select-caret" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>

              <!-- Sort By Dropdown -->
              <div class="filter-group">
                <label for="sort-select" class="filter-label">Sort by</label>
                <div class="select-wrapper">
                  <select id="sort-select" v-model="sortBy" class="filter-select">
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <svg class="select-caret" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Grid (4 columns matching reference screenshot) -->
          <div v-if="filteredProducts.length > 0" class="catalog-grid">
            <article
              v-for="product in paginatedProducts"
              :key="product.id"
              class="catalog-card"
            >
              <!-- Product Image Area -->
              <div class="catalog-card_image-wrap">
                <img
                  :src="product.image"
                  :alt="product.title"
                  class="catalog-card_img"
                  loading="lazy"
                />
              </div>

              <!-- Price Row with Cart Button -->
              <div class="catalog-card_price-row">
                <span class="catalog-card_price">${{ product.price }}</span>
                <button
                  type="button"
                  class="catalog-card_cart-btn"
                  title="Add to cart"
                  @click="handleAddProduct(product)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </button>
              </div>

              <!-- Product Title -->
              <h2 class="catalog-card_title">
                {{ product.title }}
              </h2>

              <!-- Rating & Stock Status -->
              <div class="catalog-card_meta">
                <div class="catalog-card_rating" aria-label="Rating">
                  <span
                    v-for="star in 5"
                    :key="star"
                    class="star-icon"
                    :class="{ 'is-filled': star <= product.rating }"
                  >
                    ★
                  </span>
                </div>
                <span v-if="product.inStock" class="catalog-card_stock">In Stock</span>
              </div>

              <!-- Subtitle / Spec Summary Headline -->
              <p class="catalog-card_subtitle">
                {{ product.subtitle }}
              </p>

              <!-- Dashed Divider -->
              <div class="catalog-card_divider" />

              <!-- Technical Specifications Bullets -->
              <ul class="catalog-card_specs">
                <li
                  v-for="(spec, idx) in product.specs"
                  :key="idx"
                  class="catalog-card_spec-item"
                >
                  <span class="spec-dot">•</span>
                  <span class="spec-text">{{ spec }}</span>
                </li>
              </ul>
            </article>
          </div>

          <!-- Pagination Controls -->
          <div
            v-if="filteredProducts.length > 0"
            class="pagination-container"
          >
            <div class="pagination-info-wrap">
              <p class="pagination-info">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }}–{{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }} of {{ filteredProducts.length }} products
              </p>

              <!-- Items Per Page Selector -->
              <div class="items-per-page">
                <label for="per-page-select" class="per-page-label">Show:</label>
                <select id="per-page-select" v-model.number="itemsPerPage" class="per-page-select">
                  <option :value="4">4 / page</option>
                  <option :value="8">8 / page</option>
                  <option :value="12">12 / page</option>
                </select>
              </div>
            </div>

            <nav v-if="totalPages > 1" class="pagination" aria-label="Catalog pagination">
              <button
                type="button"
                class="pagination_nav-btn"
                :disabled="currentPage === 1"
                aria-label="Previous page"
                @click="goToPage(currentPage - 1)"
              >
                ‹ Previous
              </button>

              <div class="pagination_pages">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  type="button"
                  class="pagination_page-btn"
                  :class="{ 'is-active': currentPage === page }"
                  :aria-current="currentPage === page ? 'page' : null"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </button>
              </div>

              <button
                type="button"
                class="pagination_nav-btn"
                :disabled="currentPage === totalPages"
                aria-label="Next page"
                @click="goToPage(currentPage + 1)"
              >
                Next ›
              </button>
            </nav>
          </div>

          <!-- Empty filter state -->
          <div v-else class="catalog-empty">
            <p>No products match your selected filters.</p>
            <button type="button" class="catalog-reset-btn" @click="resetPrice(); selectedBrand = ''">
              Reset Filters
            </button>
          </div>
        </section>
      </div>
    </main>

    <!-- Toast Notification -->
    <transition name="toast-fade">
      <div v-if="isToastOpen" class="catalog-toast">
        <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>{{ toastText }}</span>
      </div>
    </transition>

    <AppFooter />
  </div>
</template>

<style scoped>
.category-catalog-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.catalog-main {
  flex: 1;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 60px;
}

/* Breadcrumbs */
.catalog-breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 24px;
}

.catalog-breadcrumb_link {
  color: #6b7280;
  transition: color 0.2s ease;
}

.catalog-breadcrumb_link:hover {
  color: #111827;
}

.catalog-breadcrumb_sep {
  color: #9ca3af;
  user-select: none;
}

.catalog-breadcrumb_current {
  color: #4b5563;
  font-weight: 500;
}

/* Layout Grid: Sidebar + Content */
.catalog-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 32px;
  align-items: start;
}

/* Left Sidebar */
.catalog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.sidebar-title {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 14px;
}

.sidebar-subtitle {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 14px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sidebar-nav_btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  padding: 3px 0;
  cursor: pointer;
  text-align: left;
  background: transparent;
  transition: color 0.15s ease;
}

.sidebar-nav_btn:hover {
  color: #111827;
}

.sidebar-sub-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
  margin-left: 12px;
}

.sidebar-sub-link {
  font-size: 13px;
  color: #4b5563;
  padding: 3px 0;
  cursor: pointer;
  text-align: left;
  background: transparent;
  border: none;
  transition: color 0.15s ease;
}

.sidebar-sub-link:hover {
  color: #111827;
}

.sidebar-sub-link.is-active {
  color: #111827;
  font-weight: 700;
  background: transparent;
}

/* Price Range Slider */
.sidebar-section--price {
  border-top: 1px solid #f1f5f9;
  padding-top: 20px;
}

.price-slider-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price-slider-track {
  position: relative;
  height: 24px;
  display: flex;
  align-items: center;
}

.price-range-input {
  position: absolute;
  width: 100%;
  pointer-events: none;
  appearance: none;
  height: 6px;
  background: transparent;
  border-radius: 4px;
}

.price-range-input::-webkit-slider-runnable-track {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
}

.price-range-input::-webkit-slider-thumb {
  pointer-events: auto;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #cbd5e1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  margin-top: -5px;
  transition: border-color 0.15s ease;
}

.price-range-input::-webkit-slider-thumb:hover {
  border-color: var(--color-brand, #34c759);
}

.price-values-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #1f2937;
  font-weight: 600;
}

.price-box {
  background: #ffffff;
  padding: 2px 4px;
}

.price-reset-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  margin-top: 6px;
  cursor: pointer;
}

/* Right Content Area */
.catalog-content {
  display: flex;
  flex-direction: column;
}

/* Top Bar: Title & Filters */
.catalog-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.catalog-heading {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.01em;
}

.catalog-filters {
  display: flex;
  align-items: center;
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.filter-select {
  appearance: none;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 6px 32px 6px 12px;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  min-width: 140px;
  transition: border-color 0.15s ease;
}

.filter-select:focus {
  border-color: #9ca3af;
}

.select-caret {
  position: absolute;
  right: 10px;
  width: 16px;
  height: 16px;
  color: #6b7280;
  pointer-events: none;
}

/* Catalog Product Grid (4 columns) */
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

/* Product Card */
.catalog-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.catalog-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

/* Product Image Box */
.catalog-card_image-wrap {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  overflow: hidden;
  background: #ffffff;
}

.catalog-card_img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.25s ease;
}

.catalog-card:hover .catalog-card_img {
  transform: scale(1.04);
}

/* Price Row */
.catalog-card_price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.catalog-card_price {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
}

.catalog-card_cart-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #111827;
  cursor: pointer;
  transition: all 0.15s ease;
}

.catalog-card_cart-btn svg {
  width: 18px;
  height: 18px;
}

.catalog-card_cart-btn:hover {
  background: #f3f4f6;
  color: #2563eb;
}

/* Title */
.catalog-card_title {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px;
  line-height: 1.35;
}

/* Meta: Stars + Stock */
.catalog-card_meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.catalog-card_rating {
  display: flex;
  align-items: center;
  gap: 1px;
}

.star-icon {
  font-size: 13px;
  color: #cbd5e1;
  user-select: none;
}

.star-icon.is-filled {
  color: #94a3b8;
}

.catalog-card_stock {
  font-size: 12px;
  font-style: italic;
  font-weight: 600;
  color: #1e3a8a;
  margin-left: auto;
}

/* Subtitle */
.catalog-card_subtitle {
  font-size: 11px;
  color: #374151;
  line-height: 1.4;
  margin: 0 0 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Dashed Divider */
.catalog-card_divider {
  border-top: 1px dashed #cbd5e1;
  margin-bottom: 10px;
}

/* Technical Specs List */
.catalog-card_specs {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11px;
  color: #1f2937;
  line-height: 1.35;
}

.catalog-card_spec-item {
  display: flex;
  align-items: flex-start;
  gap: 4px;
}

.spec-dot {
  color: #374151;
  font-size: 10px;
  line-height: 1.4;
}

.spec-text {
  word-break: break-word;
}

/* Empty State */
.catalog-empty {
  padding: 60px 20px;
  text-align: center;
  background: #f9fafb;
  border-radius: 8px;
  color: #6b7280;
}

.catalog-reset-btn {
  margin-top: 12px;
  padding: 8px 16px;
  background: #2563eb;
  color: #ffffff;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
}

/* Toast */
.catalog-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  background: #111827;
  color: #ffffff;
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
}

.catalog-toast svg {
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

/* Pagination Section */
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  gap: 16px;
  flex-wrap: wrap;
}

.pagination-info-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.pagination-info {
  font-size: 13.5px;
  color: #6b7280;
  margin: 0;
}

.items-per-page {
  display: flex;
  align-items: center;
  gap: 6px;
}

.per-page-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.per-page-select {
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  color: #374151;
  background: #ffffff;
  cursor: pointer;
  outline: none;
}

.per-page-select:focus {
  border-color: #9ca3af;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;
}

.pagination_nav-btn {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pagination_nav-btn:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #d1d5db;
  color: #111827;
}

.pagination_nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination_pages {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pagination_page-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pagination_page-btn:hover:not(.is-active) {
  background-color: #f9fafb;
  border-color: #d1d5db;
  color: #111827;
}

.pagination_page-btn.is-active {
  background-color: #111827;
  border-color: #111827;
  color: #ffffff;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 1200px) {
  .catalog-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 860px) {
  .catalog-layout {
    grid-template-columns: 1fr;
  }
  .catalog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 540px) {
  .catalog-grid {
    grid-template-columns: 1fr;
  }
  .catalog-filters {
    width: 100%;
    justify-content: space-between;
  }
}
</style>

