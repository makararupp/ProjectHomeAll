<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { customPcProducts } from '@/data/customPcProducts'
import { megaMenuCategories } from '@/data/megaMenuData'
import { useCart } from '@/composables/useCart'
import { useWishlist } from '@/composables/useWishlist'
import { useI18n } from '@/composables/useI18n'

const route = useRoute()
const { t, isKhmer } = useI18n()
const { addToCart } = useCart()
const { toggleWishlist, isInWishlist } = useWishlist()

// Active categories state
const activeCategory = ref(megaMenuCategories[0]?.name || 'Categories for you')
const activeSubCategory = ref(megaMenuCategories[0]?.items[0]?.name || 'Floor Tiles')
const expandedCategory = ref(megaMenuCategories[0]?.name || 'Categories for you')

// Dynamic title models so titles follow the main title (activeSubCategory)
const modelVariations = [
  'Standard Edition',
  'Premium Quality',
  'Heavy Duty Pro',
  'Ultra Grade Plus',
  'Commercial Edition',
  'Classic High-Durability',
  'Selected Series',
  'Pro Performance',
  'Industrial Grade',
  'Elite Platinum',
  'Advanced Series',
  'Master Selection'
]

function getDisplayTitle(product, idx = 0) {
  const base = activeSubCategory.value || 'Floor Tiles'
  const variation = modelVariations[idx % modelVariations.length]
  return `${base} — ${variation}`
}

function getDisplaySubtitle(product, idx = 0) {
  const cat = activeSubCategory.value || 'Floor Tiles'
  return `Authentic ${cat} — Professional high-grade selection for residential & industrial projects.`
}

function getDisplaySpecs(product, idx = 0) {
  const cat = activeSubCategory.value || 'Floor Tiles'
  return [
    `Category: Certified ${cat} Standard`,
    'Durability: High-strength wear & weather proof',
    'Finish: Premium protective coating',
    'Standard: ISO 9001 factory verified',
    'Warranty: 100% Genuine product warranty',
    'Packaging: Export standard safety packing'
  ]
}

function getProductForCart(product, index = 0) {
  const title = getDisplayTitle(product, index)
  return {
    id: `${product.id}-${(activeSubCategory.value || 'item').toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    title: title,
    name: title,
    price: `$${product.price}.00`,
    category: activeSubCategory.value || 'General',
    image: product.image,
    brand: product.brand || '',
    unit: 'Unit',
    inStock: product.inStock,
    rating: product.rating,
    specs: getDisplaySpecs(product, index),
    subtitle: getDisplaySubtitle(product, index)
  }
}

function isProductWishlisted(product, index = 0) {
  const item = getProductForCart(product, index)
  return isInWishlist(item.id) || isInWishlist(product.id)
}

function handleToggleWishlist(product, index = 0) {
  const item = getProductForCart(product, index)
  toggleWishlist(item)
  if (isProductWishlisted(product, index)) {
    showToast(`"${item.title}" added to wishlist!`)
  } else {
    showToast(`"${item.title}" removed from wishlist`)
  }
}

function handleAddProduct(product, index = 0, quantity = 1) {
  const item = getProductForCart(product, index)
  addToCart(item, quantity)
  showToast(`"${item.title}" added to cart!`)
}

// Category selection
function selectCategoryAndSub(catName, subName) {
  activeCategory.value = catName
  activeSubCategory.value = subName
  expandedCategory.value = catName
}

function toggleCategoryGroup(catName) {
  if (expandedCategory.value === catName) {
    expandedCategory.value = ''
  } else {
    expandedCategory.value = catName
  }
}

function resetToAllCategories() {
  activeCategory.value = megaMenuCategories[0]?.name || 'Categories for you'
  activeSubCategory.value = megaMenuCategories[0]?.items[0]?.name || 'Floor Tiles'
  expandedCategory.value = activeCategory.value
}

// Quick View Modal State
const selectedProduct = ref(null)
const selectedProductIndex = ref(0)
const modalQuantity = ref(1)
const isModalOpen = ref(false)

function openProductModal(product, index = 0) {
  selectedProduct.value = product
  selectedProductIndex.value = index
  modalQuantity.value = 1
  isModalOpen.value = true
}

function closeProductModal() {
  isModalOpen.value = false
  selectedProduct.value = null
}

function increaseModalQuantity() {
  modalQuantity.value++
}

function decreaseModalQuantity() {
  if (modalQuantity.value > 1) {
    modalQuantity.value--
  }
}

function handleModalAddToCart() {
  if (!selectedProduct.value) return
  handleAddProduct(selectedProduct.value, selectedProductIndex.value, modalQuantity.value)
  closeProductModal()
}

function handleModalToggleWishlist() {
  if (!selectedProduct.value) return
  handleToggleWishlist(selectedProduct.value, selectedProductIndex.value)
}

function handleKeydown(e) {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeProductModal()
  }
}

// Sync categories from Route query
function syncFromRoute() {
  if (route.query.category) {
    activeCategory.value = route.query.category
    expandedCategory.value = route.query.category
  }
  if (route.query.sub) {
    activeSubCategory.value = route.query.sub
    if (!route.query.category) {
      const found = megaMenuCategories.find((c) => c.items.some((i) => i.name === route.query.sub))
      if (found) {
        activeCategory.value = found.name
        expandedCategory.value = found.name
      }
    }
  }
}

onMounted(() => {
  syncFromRoute()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(
  () => route.query,
  () => {
    syncFromRoute()
  },
  { deep: true }
)

// Filters
const selectedBrand = ref('')
const sortBy = ref('newest')
const minPrice = ref(405)
const maxPrice = ref(1942)

// Dynamic available brands from catalog
const availableBrands = computed(() => {
  const brands = new Set(customPcProducts.map((p) => p.brand).filter(Boolean))
  return Array.from(brands).sort()
})

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

function resetPrice() {
  minPrice.value = 405
  maxPrice.value = 1942
}

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
      <!-- Breadcrumbs: Home / All Categories / Category / SubCategory -->
      <nav class="catalog-breadcrumbs" aria-label="Breadcrumb">
        <RouterLink to="/" class="catalog-breadcrumb_link">Home</RouterLink>
        <span class="catalog-breadcrumb_sep">/</span>
        <button
          type="button"
          class="catalog-breadcrumb_link catalog-breadcrumb_btn"
          @click="resetToAllCategories"
        >
          All Categories
        </button>
        <template v-if="activeCategory">
          <span class="catalog-breadcrumb_sep">/</span>
          <button
            type="button"
            class="catalog-breadcrumb_link catalog-breadcrumb_btn"
            @click="expandedCategory = activeCategory"
          >
            {{ activeCategory }}
          </button>
        </template>
        <template v-if="activeSubCategory">
          <span class="catalog-breadcrumb_sep">/</span>
          <span class="catalog-breadcrumb_current" aria-current="page">{{ activeSubCategory }}</span>
        </template>
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
                class="sidebar-nav_btn sidebar-all-btn"
                :class="{ 'is-active-main': !activeCategory || activeCategory === megaMenuCategories[0]?.name }"
                @click="resetToAllCategories"
              >
                All Categories
              </button>

              <!-- Dynamic Categories Accordion from megaMenuCategories -->
              <div
                v-for="cat in megaMenuCategories"
                :key="cat.id"
                class="sidebar-cat-group"
              >
                <button
                  type="button"
                  class="sidebar-cat-header"
                  :class="{ 'is-expanded': expandedCategory === cat.name, 'is-active-cat': activeCategory === cat.name }"
                  @click="toggleCategoryGroup(cat.name)"
                >
                  <span class="sidebar-cat-name">{{ cat.name }}</span>
                  <span class="sidebar-cat-icon">{{ expandedCategory === cat.name ? '−' : '+' }}</span>
                </button>

                <!-- Subcategories -->
                <ul
                  v-if="expandedCategory === cat.name"
                  class="sidebar-sub-list"
                >
                  <li
                    v-for="sub in cat.items"
                    :key="sub.name"
                    class="sidebar-sub-item"
                  >
                    <button
                      type="button"
                      class="sidebar-sub-link"
                      :class="{ 'is-active': activeSubCategory === sub.name }"
                      @click="selectCategoryAndSub(cat.name, sub.name)"
                    >
                      {{ sub.name }}
                    </button>
                  </li>
                </ul>
              </div>
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

          <!-- Brands Filter Section in Sidebar -->
          <div class="sidebar-section sidebar-section--brands">
            <div class="sidebar-brands-header">
              <h3 class="sidebar-subtitle">Brands</h3>
              <button
                v-if="selectedBrand"
                type="button"
                class="sidebar-brands-reset"
                @click="selectedBrand = ''"
              >
                Reset
              </button>
            </div>

            <div class="sidebar-brands-list">
              <button
                type="button"
                class="sidebar-brand-item"
                :class="{ 'is-active': selectedBrand === '' }"
                @click="selectedBrand = ''"
              >
                <span class="sidebar-brand-name">All Brands</span>
              </button>

              <button
                v-for="b in availableBrands"
                :key="b"
                type="button"
                class="sidebar-brand-item"
                :class="{ 'is-active': selectedBrand === b }"
                @click="selectedBrand = selectedBrand === b ? '' : b"
              >
                <span class="sidebar-brand-name">{{ b }}</span>
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
                    <option v-for="b in availableBrands" :key="b" :value="b">
                      {{ b }}
                    </option>
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

          <!-- Active Filter Chips (Brand) -->
          <div v-if="selectedBrand" class="active-filter-chips">
            <span class="active-filter-label">Active Filter:</span>
            <span class="filter-chip">
              Brand: <strong>{{ selectedBrand }}</strong>
              <button
                type="button"
                class="filter-chip-remove"
                title="Remove brand filter"
                @click="selectedBrand = ''"
              >
                ✕
              </button>
            </span>
            <button
              type="button"
              class="clear-all-chips"
              @click="selectedBrand = ''"
            >
              Reset brand
            </button>
          </div>

          <!-- Product Grid (4 columns matching reference screenshot) -->
          <div v-if="filteredProducts.length > 0" class="catalog-grid">
            <article
              v-for="(product, idx) in paginatedProducts"
              :key="product.id"
              class="catalog-card"
            >
              <!-- Product Image Area with WishList, AddCart, and View Quick -->
              <div class="catalog-card_image-wrap">
                <img
                  :src="product.image"
                  :alt="getDisplayTitle(product, (currentPage - 1) * itemsPerPage + idx)"
                  class="catalog-card_img"
                  loading="lazy"
                  @click="openProductModal(product, (currentPage - 1) * itemsPerPage + idx)"
                />

                <!-- Top-Right Wishlist Heart Button on Image -->
                <button
                  type="button"
                  class="card-img_wishlist-btn"
                  :class="{ 'is-in-wishlist': isProductWishlisted(product, (currentPage - 1) * itemsPerPage + idx) }"
                  :title="isProductWishlisted(product, (currentPage - 1) * itemsPerPage + idx) ? 'Remove from Wishlist' : 'Add to Wishlist'"
                  :aria-label="isProductWishlisted(product, (currentPage - 1) * itemsPerPage + idx) ? 'Remove from Wishlist' : 'Add to Wishlist'"
                  @click.stop="handleToggleWishlist(product, (currentPage - 1) * itemsPerPage + idx)"
                >
                  <svg viewBox="0 0 24 24" :fill="isProductWishlisted(product, (currentPage - 1) * itemsPerPage + idx) ? '#ef4444' : 'none'" :stroke="isProductWishlisted(product, (currentPage - 1) * itemsPerPage + idx) ? '#ef4444' : '#6b7280'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>

                <!-- Image Overlay with Action Buttons on Hover -->
                <div class="card-img_overlay">
                  <!-- View Quick Button -->
                  <button
                    type="button"
                    class="card-img_action-btn card-img_action-btn--quick"
                    title="View Quick"
                    @click.stop="openProductModal(product, (currentPage - 1) * itemsPerPage + idx)"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>View Quick</span>
                  </button>

                  <!-- Add to Cart Button -->
                  <button
                    type="button"
                    class="card-img_action-btn card-img_action-btn--cart"
                    title="Add to Cart"
                    @click.stop="handleAddProduct(product, (currentPage - 1) * itemsPerPage + idx)"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <span>Add Cart</span>
                  </button>

                  <!-- Wishlist Button -->
                  <button
                    type="button"
                    class="card-img_action-btn card-img_action-btn--wish"
                    :class="{ 'is-in-wishlist': isProductWishlisted(product, (currentPage - 1) * itemsPerPage + idx) }"
                    title="Wishlist"
                    @click.stop="handleToggleWishlist(product, (currentPage - 1) * itemsPerPage + idx)"
                  >
                    <svg viewBox="0 0 24 24" :fill="isProductWishlisted(product, (currentPage - 1) * itemsPerPage + idx) ? '#ef4444' : 'none'" :stroke="isProductWishlisted(product, (currentPage - 1) * itemsPerPage + idx) ? '#ef4444' : 'currentColor'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span>WishList</span>
                  </button>
                </div>
              </div>

              <!-- Price Row with Brand Badge and Cart Button -->
              <div class="catalog-card_price-row">
                <div class="catalog-card_price-group">
                  <span class="catalog-card_price">${{ product.price }}</span>
                  <span v-if="product.brand" class="catalog-card_brand-tag">{{ product.brand }}</span>
                </div>
                <button
                  type="button"
                  class="catalog-card_cart-btn"
                  title="Add to cart"
                  @click="handleAddProduct(product, (currentPage - 1) * itemsPerPage + idx)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </button>
              </div>

              <!-- Product Title (Follows Main Title / Active SubCategory) -->
              <h2
                class="catalog-card_title"
                @click="openProductModal(product, (currentPage - 1) * itemsPerPage + idx)"
              >
                {{ getDisplayTitle(product, (currentPage - 1) * itemsPerPage + idx) }}
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
                {{ getDisplaySubtitle(product, (currentPage - 1) * itemsPerPage + idx) }}
              </p>

              <!-- Dashed Divider -->
              <div class="catalog-card_divider" />

              <!-- Technical Specifications Bullets -->
              <ul class="catalog-card_specs">
                <li
                  v-for="(spec, sIdx) in getDisplaySpecs(product, (currentPage - 1) * itemsPerPage + idx)"
                  :key="sIdx"
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

    <!-- Quick View / Product Detail Modal Dialog -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="isModalOpen && selectedProduct"
          class="catalog-modal_backdrop"
          role="dialog"
          aria-modal="true"
          :aria-label="getDisplayTitle(selectedProduct, selectedProductIndex)"
          @click.self="closeProductModal"
        >
          <div class="catalog-modal_card">
            <button
              type="button"
              class="catalog-modal_close"
              aria-label="Close"
              @click="closeProductModal"
            >
              ✕
            </button>

            <div class="catalog-modal_grid">
              <!-- Left: Image Box -->
              <div class="catalog-modal_image-box">
                <img
                  :src="selectedProduct.image"
                  :alt="getDisplayTitle(selectedProduct, selectedProductIndex)"
                  class="catalog-modal_img"
                />
              </div>

              <!-- Right: Content & Actions -->
              <div class="catalog-modal_content">
                <div class="catalog-modal_badge-row">
                  <span class="catalog-modal_category">{{ activeSubCategory }}</span>
                  <span v-if="selectedProduct.brand" class="catalog-modal_brand-tag">Brand: {{ selectedProduct.brand }}</span>
                  <span class="catalog-modal_stock">In Stock</span>
                </div>

                <h2 class="catalog-modal_title">
                  {{ getDisplayTitle(selectedProduct, selectedProductIndex) }}
                </h2>

                <div class="catalog-modal_price-row">
                  <span class="catalog-modal_price">${{ selectedProduct.price }}.00</span>
                  <div class="catalog-modal_rating">
                    <span v-for="star in 5" :key="star" class="star-icon" :class="{ 'is-filled': star <= selectedProduct.rating }">★</span>
                  </div>
                </div>

                <p class="catalog-modal_desc">
                  {{ getDisplaySubtitle(selectedProduct, selectedProductIndex) }}
                </p>

                <!-- Technical Specs -->
                <ul class="catalog-modal_specs">
                  <li
                    v-for="(spec, sIdx) in getDisplaySpecs(selectedProduct, selectedProductIndex)"
                    :key="sIdx"
                    class="catalog-modal_spec-item"
                  >
                    <span class="spec-dot">•</span>
                    <span>{{ spec }}</span>
                  </li>
                </ul>

                <!-- Quantity & Actions -->
                <div class="catalog-modal_actions">
                  <div class="modal-quantity-control">
                    <button
                      type="button"
                      class="modal-qty-btn"
                      :disabled="modalQuantity <= 1"
                      @click="decreaseModalQuantity"
                    >
                      −
                    </button>
                    <span class="modal-qty-val">{{ modalQuantity }}</span>
                    <button
                      type="button"
                      class="modal-qty-btn"
                      @click="increaseModalQuantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    class="modal-cart-btn"
                    @click="handleModalAddToCart"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <span>Add to Cart</span>
                  </button>

                  <button
                    type="button"
                    class="modal-wish-btn"
                    :class="{ 'is-in-wishlist': isProductWishlisted(selectedProduct, selectedProductIndex) }"
                    @click="handleModalToggleWishlist"
                  >
                    <svg viewBox="0 0 24 24" :fill="isProductWishlisted(selectedProduct, selectedProductIndex) ? '#ef4444' : 'none'" :stroke="isProductWishlisted(selectedProduct, selectedProductIndex) ? '#ef4444' : 'currentColor'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span>{{ isProductWishlisted(selectedProduct, selectedProductIndex) ? 'Wishlisted' : 'Wishlist' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

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
  text-decoration: none;
}

.catalog-breadcrumb_link:hover {
  color: #111827;
}

.catalog-breadcrumb_btn {
  background: transparent;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
}

.catalog-breadcrumb_sep {
  color: #9ca3af;
  user-select: none;
}

.catalog-breadcrumb_current {
  color: #111827;
  font-weight: 600;
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
  gap: 4px;
}

.sidebar-nav_btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  padding: 4px 0;
  cursor: pointer;
  text-align: left;
  background: transparent;
  border: none;
  transition: color 0.15s ease;
}

.sidebar-nav_btn:hover {
  color: #111827;
}

.sidebar-all-btn {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  padding: 4px 0 6px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 4px;
}

.sidebar-cat-group {
  margin-bottom: 2px;
}

.sidebar-cat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  padding: 5px 6px;
  border-radius: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
}

.sidebar-cat-header:hover {
  color: #111827;
  background: #f3f4f6;
}

.sidebar-cat-header.is-active-cat {
  color: #111827;
  font-weight: 700;
}

.sidebar-cat-name {
  flex: 1;
}

.sidebar-cat-icon {
  font-size: 14px;
  font-weight: 700;
  color: #9ca3af;
  margin-left: 6px;
}

.sidebar-sub-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
  margin-bottom: 6px;
  margin-left: 6px;
  padding-left: 8px;
  border-left: 2px solid #e5e7eb;
}

.sidebar-sub-link {
  font-size: 13px;
  color: #4b5563;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  background: transparent;
  border: none;
  transition: all 0.15s ease;
}

.sidebar-sub-link:hover {
  color: #111827;
  background: #f3f4f6;
}

.sidebar-sub-link.is-active {
  color: #111827;
  font-weight: 600;
  background: #e5e7eb;
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

/* Sidebar Brands Section */
.sidebar-section--brands {
  border-top: 1px solid #f1f5f9;
  padding-top: 20px;
}

.sidebar-brands-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.sidebar-brands-header .sidebar-subtitle {
  margin: 0;
}

.sidebar-brands-reset {
  font-size: 11px;
  color: #2563eb;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

.sidebar-brands-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.sidebar-brand-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 6px;
  border-radius: 4px;
  font-size: 13px;
  color: #4b5563;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
}

.sidebar-brand-item:hover {
  background: #f3f4f6;
  color: #111827;
}

.sidebar-brand-item.is-active {
  background: #e5e7eb;
  color: #111827;
  font-weight: 600;
}

/* Active Filter Chips */
.active-filter-chips {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.active-filter-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #111827;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  padding: 3px 10px;
  border-radius: 16px;
}

.filter-chip strong {
  color: #111827;
}

.filter-chip-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 11px;
  padding: 0 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease;
}

.filter-chip-remove:hover {
  color: #ef4444;
}

.clear-all-chips {
  background: none;
  border: none;
  font-size: 12px;
  color: #2563eb;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
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

/* Product Image Box with Overlay and Action Buttons */
.catalog-card_image-wrap {
  position: relative;
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  overflow: hidden;
  background: #ffffff;
  border-radius: 4px;
  cursor: pointer;
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

/* Floating Wishlist Heart Button on Image */
.card-img_wishlist-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  z-index: 3;
}

.card-img_wishlist-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.card-img_wishlist-btn.is-in-wishlist {
  border-color: #fecaca;
  background: #fff5f5;
}

/* Hover Overlay Action Bar on Image (View Quick, Add Cart, WishList) */
.card-img_overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 4px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.3) 70%, transparent 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  opacity: 0;
  transform: translateY(6px);
  transition: all 0.25s ease;
  z-index: 2;
}

.catalog-card:hover .card-img_overlay {
  opacity: 1;
  transform: translateY(0);
}

.card-img_action-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 5px 6px;
  font-size: 10px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background: #ffffff;
  color: #1f2937;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.15s ease;
  white-space: nowrap;
}

.card-img_action-btn:hover {
  background: #111827;
  color: #ffffff;
}

.card-img_action-btn--wish.is-in-wishlist {
  color: #ef4444;
}

.card-img_action-btn--wish.is-in-wishlist:hover {
  background: #ef4444;
  color: #ffffff;
}

/* Price Row */
.catalog-card_price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.catalog-card_price-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.catalog-card_price {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
}

.catalog-card_brand-tag {
  font-size: 11px;
  font-weight: 600;
  color: #4b5563;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  padding: 1px 6px;
  border-radius: 4px;
  letter-spacing: 0.01em;
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
  cursor: pointer;
  transition: color 0.15s ease;
}

.catalog-card_title:hover {
  color: #2563eb;
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

/* Quick View Modal Styles */
.catalog-modal_backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.catalog-modal_card {
  background: #ffffff;
  border-radius: 12px;
  max-width: 760px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  padding: 24px;
}

.catalog-modal_close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #f3f4f6;
  color: #4b5563;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  z-index: 5;
}

.catalog-modal_close:hover {
  background: #e5e7eb;
  color: #111827;
}

.catalog-modal_grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;
}

.catalog-modal_image-box {
  aspect-ratio: 1;
  background: #f9fafb;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  padding: 12px;
}

.catalog-modal_img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.catalog-modal_content {
  display: flex;
  flex-direction: column;
}

.catalog-modal_badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.catalog-modal_category {
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 4px;
}

.catalog-modal_brand-tag {
  font-size: 12px;
  font-weight: 600;
  color: #1d4ed8;
  background: #eff6ff;
  border: 1px solid #dbeafe;
  padding: 2px 8px;
  border-radius: 4px;
}

.catalog-modal_stock {
  font-size: 12px;
  font-weight: 600;
  color: #16a34a;
  background: #dcfce7;
  padding: 2px 8px;
  border-radius: 4px;
}

.catalog-modal_title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  line-height: 1.35;
  margin: 0 0 10px;
}

.catalog-modal_price-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.catalog-modal_price {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
}

.catalog-modal_rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.catalog-modal_desc {
  font-size: 13px;
  color: #4b5563;
  line-height: 1.5;
  margin: 0 0 14px;
}

.catalog-modal_specs {
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #f9fafb;
  padding: 12px 14px;
  border-radius: 6px;
  border: 1px solid #f3f4f6;
}

.catalog-modal_spec-item {
  font-size: 12px;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 6px;
}

.catalog-modal_actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid #f3f4f6;
}

.modal-quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
}

.modal-qty-btn {
  width: 32px;
  height: 36px;
  background: #f9fafb;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease;
}

.modal-qty-btn:hover:not(:disabled) {
  background: #e5e7eb;
}

.modal-qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.modal-qty-val {
  width: 36px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.modal-cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #111827;
  color: #ffffff;
  padding: 9px 18px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
}

.modal-cart-btn:hover {
  background: #1f2937;
}

.modal-wish-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.modal-wish-btn:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}

.modal-wish-btn.is-in-wishlist {
  border-color: #ef4444;
  color: #ef4444;
}

/* Modal Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .catalog-modal_grid {
    grid-template-columns: 1fr;
  }
}
</style>

