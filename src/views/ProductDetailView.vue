<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { allProducts, itemGroups, itemGroupCategories } from '@/data/products'
import { useI18n } from '@/composables/useI18n'
import { useCart } from '@/composables/useCart'

const { t, isKhmer } = useI18n()
const { addToCart } = useCart()

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

const route = useRoute()
const searchQuery = ref(route.query.search ? String(route.query.search) : '')
const selectedGroups = ref(route.query.group ? [String(route.query.group)] : [])
const viewMode = ref('grid') // 'grid' | 'list'

// Flyout submenu state: supports hover preview and pinned selection on click
const hoveredGroup = ref(null)
const pinnedFlyoutGroup = ref(route.query.group ? String(route.query.group) : null)
const selectedSubcategoryName = ref('')

const activeFlyoutName = computed(() => {
  return hoveredGroup.value || pinnedFlyoutGroup.value
})

const currentFlyoutGroup = computed(() => {
  if (!activeFlyoutName.value) return null
  return itemGroupCategories.find((c) => c.name === activeFlyoutName.value)
})

const activeFlyoutIndex = computed(() => {
  if (!currentFlyoutGroup.value) return -1
  return itemGroupCategories.findIndex((c) => c.name === currentFlyoutGroup.value.name)
})

const flyoutStyle = computed(() => {
  if (activeFlyoutIndex.value < 0) return { top: '0px' }
  const rowHeight = 46.5
  const rawTop = activeFlyoutIndex.value * rowHeight
  const maxTop = Math.max(0, (itemGroupCategories.length - 6) * rowHeight)
  const top = Math.min(rawTop, maxTop)
  return {
    top: `${top}px`
  }
})

function selectGroup(groupName) {
  if (selectedGroups.value.includes(groupName)) {
    // If clicking already selected category, deselect and close
    selectedGroups.value = []
    pinnedFlyoutGroup.value = null
    selectedSubcategoryName.value = ''
    if (searchQuery.value) searchQuery.value = ''
  } else {
    // Select category and pin flyout panel open
    selectedGroups.value = [groupName]
    pinnedFlyoutGroup.value = groupName
    selectedSubcategoryName.value = ''
    if (searchQuery.value) searchQuery.value = ''
  }
  currentPage.value = 1
}

function selectSubcategory(subName, parentGroupName) {
  selectedGroups.value = [parentGroupName]
  pinnedFlyoutGroup.value = parentGroupName
  selectedSubcategoryName.value = subName
  searchQuery.value = subName
  currentPage.value = 1
}

const currentDisplayTitle = computed(() => {
  if (selectedSubcategoryName.value) {
    return selectedSubcategoryName.value
  }
  if (selectedGroups.value.length > 0) {
    const groupName = selectedGroups.value[0]
    if (isKhmer.value) {
      const cat = itemGroupCategories.find((c) => c.name === groupName)
      return cat?.nameKm || getGroupLabel(groupName)
    }
    return getGroupLabel(groupName)
  }
  return t('products.allProducts', 'All Products')
})

watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.group) {
      selectedGroups.value = [String(newQuery.group)]
      pinnedFlyoutGroup.value = String(newQuery.group)
    }
    if (newQuery.search !== undefined) {
      searchQuery.value = String(newQuery.search)
    }
  }
)

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(8) // 8 items per page (2 rows of 4 boxes)

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
  pinnedFlyoutGroup.value = null
  selectedSubcategoryName.value = ''
  searchQuery.value = ''
  hoveredGroup.value = null
  currentPage.value = 1
}

// Quick View / Product Detail Modal state
const selectedProduct = ref(null)
const modalQuantity = ref(1)
const isModalOpen = ref(false)

function openProductModal(product) {
  selectedProduct.value = product
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

// Toast notification state
const toastMessage = ref('')
const isToastVisible = ref(false)
let toastTimer = null

function showToast(message) {
  if (toastTimer) clearTimeout(toastTimer)
  toastMessage.value = message
  isToastVisible.value = true
  toastTimer = setTimeout(() => {
    isToastVisible.value = false
  }, 3200)
}

function handleAddToCart(product, qty = 1) {
  addToCart(product, qty)
  showToast(`${t('products.addedToCart', 'Added to cart successfully!')} (${product.title} x${qty})`)
  if (isModalOpen.value) {
    closeProductModal()
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeProductModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  // Check if route has an id param or query
  const targetId = route.params.id || route.query.id
  if (targetId) {
    const found = allProducts.find((p) => String(p.id) === String(targetId))
    if (found) {
      openProductModal(found)
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (toastTimer) clearTimeout(toastTimer)
})
</script>

<template>
  <div class="products-page">
    <AppHeader />
    <CategoryNav />

    <main class="products-main container">
      <!-- Breadcrumbs restored to old redirect style -->
      <nav class="breadcrumb" aria-label="Breadcrumbs">
        <ol class="breadcrumb_list">
          <li class="breadcrumb_item">
            <RouterLink to="/" class="breadcrumb_link">{{ t('products.breadcrumbHome', 'Home') }}</RouterLink>
            <span class="breadcrumb_separator" aria-hidden="true">›</span>
          </li>
          <li class="breadcrumb_item">
            <RouterLink to="/" class="breadcrumb_link">{{ t('products.breadcrumbVillage', 'Homeall Village') }}</RouterLink>
            <span class="breadcrumb_separator" aria-hidden="true">›</span>
          </li>
          <li class="breadcrumb_item">
            <span class="breadcrumb_current" aria-current="page">
              {{ currentDisplayTitle }}
            </span>
          </li>
        </ol>
      </nav>

      <!-- Page Heading & Subtitle -->
      <header class="products-header">
        <h1 class="page-heading" :class="{ 'is-khmer': isKhmer }">
          {{ currentDisplayTitle }}
        </h1>
        <p class="products-header_subtitle" :class="{ 'is-khmer': isKhmer }">
          {{ isKhmer ? 'ស្វែងរក និងជ្រើសរើសសម្ភារៈសំណង់ គ្រឿងដែក និងផលិតផលគុណភាពខ្ពស់គ្រប់ប្រភេទ' : 'Explore our comprehensive catalog of verified construction, steel, and industrial materials.' }}
        </p>
      </header>

      <!-- Layout: Filters Sidebar + Content Area -->
      <div class="catalog-layout">
        <!-- Left Sidebar: Categories Navigation Menu with Flyout Submenu -->
        <aside class="catalog-sidebar" aria-label="Product Categories Navigation">
          <div class="category-menu-container" @mouseleave="hoveredGroup = null">
            <!-- Header matching screenshot: "Categories" -->
            <div class="category-menu-header">
              <h2 class="category-menu-title">{{ isKhmer ? 'ប្រភេទ' : 'Categories' }}</h2>
              <button
                v-if="selectedGroups.length > 0 || searchQuery"
                type="button"
                class="category-menu-clear"
                @click="clearAllFilters"
              >
                {{ t('products.clearAll', 'Clear All') }}
              </button>
            </div>

            <!-- Category List Card -->
            <div class="category-menu-card">
              <ul class="category-menu-list">
                <li
                  v-for="group in itemGroupCategories"
                  :key="group.name"
                  class="category-menu-row"
                  :class="{
                    'is-active': selectedGroups.includes(group.name),
                    'is-hovered': hoveredGroup === group.name
                  }"
                  @mouseenter="hoveredGroup = group.name"
                  @click="selectGroup(group.name)"
                >
                  <span class="category-menu-row_text">
                    {{ isKhmer ? group.nameKm : getGroupLabel(group.name) }}
                  </span>
                  <svg
                    class="category-menu-row_chevron"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </li>
              </ul>

              <!-- Flyout Submenu Panel to the right matching screenshot -->
              <transition name="flyout-fade">
                <div
                  v-if="currentFlyoutGroup"
                  class="category-flyout-panel"
                  :style="flyoutStyle"
                  @mouseenter="hoveredGroup = currentFlyoutGroup.name"
                  @mouseleave="hoveredGroup = null"
                >
                  <ul class="category-flyout-list">
                    <li
                      v-for="sub in currentFlyoutGroup.subcategories"
                      :key="sub"
                      class="category-flyout-item"
                      :class="{ 'is-active-sub': selectedSubcategoryName === sub }"
                      @click.stop="selectSubcategory(sub, currentFlyoutGroup.name)"
                    >
                      <span class="category-flyout-item_text">{{ sub }}</span>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
        </aside>

        <!-- Right Content: x, View Mode & Products -->
        <section class="catalog-content">
          <!-- Top Search & View Control Bar -->
          <div class="toolbar">
            <div class="toolbar_search">
              <!-- Search Icon -->
              <svg
                class="toolbar_search-icon"
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
                class="toolbar_search-input"
                :placeholder="t('products.searchPlaceholder', 'Search products')"
                :aria-label="t('products.searchPlaceholder', 'Search products')"
              />
            </div>

            <!-- View Mode Switcher -->
            <div class="toolbar_views" role="group" aria-label="View toggle">
              <button
                type="button"
                class="toolbar_view-btn"
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
                class="toolbar_view-btn"
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
              tabindex="0"
              role="button"
              :aria-label="product.title"
              @click="openProductModal(product)"
              @keydown.enter="openProductModal(product)"
            >
              <!-- Card Image Box -->
              <div class="product-card_image-wrap">
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.title"
                  class="product-card_img"
                  loading="lazy"
                />
                <span v-else class="product-card_placeholder">Product image</span>

                <!-- Quick View Overlay Badge on hover -->
                <div class="product-card_quickview-overlay">
                  <span class="product-card_quickview-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {{ t('products.quickView', 'Quick View') }}
                  </span>
                </div>
              </div>

              <!-- Card Details -->
              <div class="product-card_body">
                <h3 class="product-card_title">{{ product.title }}</h3>
                <p class="product-card_category">{{ getGroupLabel(product.category) }}</p>

                <div class="product-card_footer">
                  <div class="product-card_price-wrap">
                    <p class="product-card_price">{{ product.price }}</p>
                    <p
                      class="product-card_stock"
                      :class="product.inStock ? 'stock--in' : 'stock--out'"
                    >
                      <span class="stock-dot" />
                      {{ product.inStock ? t('products.stockIn', 'Stock In') : t('products.outOfStock', 'Out of stock') }}
                    </p>
                  </div>

                  <!-- Direct Add To Cart Action Button with Icon -->
                  <button
                    type="button"
                    class="product-card_cart-btn"
                    :title="t('products.addToCart', 'Add to Cart')"
                    :aria-label="t('products.addToCart', 'Add to Cart')"
                    @click.stop="handleAddToCart(product, 1)"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          </div>

          <!-- Empty State -->
          <div v-else class="catalog-empty">
            <p class="catalog-empty_text">{{ t('products.noProducts', 'No products found matching your filter.') }}</p>
            <button
              type="button"
              class="catalog-empty_btn"
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
                class="pagination_nav-btn"
                :disabled="currentPage === 1"
                aria-label="Previous page"
                @click="goToPage(currentPage - 1)"
              >
                ‹ {{ t('products.previous', 'Previous') }}
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
                {{ t('products.next', 'Next') }} ›
              </button>
            </nav>
          </div>
        </section>
      </div>
    </main>

    <AppFooter />

    <!-- Quick View / Product Detail Modal Dialog -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="isModalOpen && selectedProduct"
          class="product-modal-backdrop"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedProduct.title"
          @click.self="closeProductModal"
        >
          <div class="product-modal-card">
            <button
              type="button"
              class="product-modal-close"
              :aria-label="t('products.close', 'Close')"
              @click="closeProductModal"
            >
              ✕
            </button>

            <div class="product-modal-top-bar">
              <span class="product-modal-header-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {{ t('products.modalTitle', 'Product Details') }}
              </span>
            </div>

            <div class="product-modal-grid">
              <!-- Left: Image Box -->
              <div class="product-modal-image-box">
                <img
                  v-if="selectedProduct.image"
                  :src="selectedProduct.image"
                  :alt="selectedProduct.title"
                  class="product-modal-img"
                />
                <span v-else class="product-card_placeholder">Product image</span>
              </div>

              <!-- Right: Info & Actions -->
              <div class="product-modal-content">
                <div class="product-modal-badge-row">
                  <span class="product-modal-category">{{ getGroupLabel(selectedProduct.category) }}</span>
                  <span
                    class="product-modal-stock"
                    :class="selectedProduct.inStock ? 'stock--in' : 'stock--out'"
                  >
                    <span class="stock-dot" />
                    {{ selectedProduct.inStock ? t('products.stockIn', 'Stock In') : t('products.outOfStock', 'Out of stock') }}
                  </span>
                </div>

                <h2 class="product-modal-title">
                  <svg class="product-modal-title-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>{{ selectedProduct.title }}</span>
                </h2>

                <div class="product-modal-price-box">
                  <span class="product-modal-price">{{ selectedProduct.price }}</span>
                  <span v-if="selectedProduct.unit" class="product-modal-unit">/ {{ selectedProduct.unit }}</span>
                </div>

                <p class="product-modal-desc">
                  {{ selectedProduct.description || (selectedProduct.title + ' — Premium high-durability materials sourced and distributed by HomeAll.') }}
                </p>

                <!-- Features / Guarantees with Icons -->
                <ul class="product-modal-features">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" class="feature-icon">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                    <span>{{ t('products.genuineGuaranteed', '100% Genuine & Quality Guaranteed') }}</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" class="feature-icon">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    <span>{{ t('products.deliveryInfo', 'Fast Delivery across Phnom Penh & provinces') }}</span>
                  </li>
                </ul>

                <!-- Quantity and Add to Cart -->
                <div class="product-modal-actions">
                  <div class="quantity-picker" aria-label="Quantity selector">
                    <button
                      type="button"
                      class="qty-btn"
                      :disabled="modalQuantity <= 1"
                      aria-label="Decrease quantity"
                      @click="decreaseModalQuantity"
                    >
                      −
                    </button>
                    <span class="qty-val">{{ modalQuantity }}</span>
                    <button
                      type="button"
                      class="qty-btn"
                      aria-label="Increase quantity"
                      @click="increaseModalQuantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    class="product-modal-add-btn"
                    @click="handleAddToCart(selectedProduct, modalQuantity)"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <span>{{ t('products.addToCart', 'Add to Cart') }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Cart Toast Notification -->
      <Transition name="toast-fade">
        <div v-if="isToastVisible" class="cart-toast" role="status" aria-live="polite">
          <div class="cart-toast_icon">✓</div>
          <span class="cart-toast_msg">{{ toastMessage }}</span>
        </div>
      </Transition>
    </Teleport>
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

.breadcrumb_list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--font-size-sm);
}

.breadcrumb_item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb_link {
  color: #6b7280;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumb_link:hover {
  color: var(--color-brand-dark);
}

.breadcrumb_separator {
  color: #9ca3af;
  font-size: 13px;
  user-select: none;
}

.breadcrumb_current {
  color: #4b5563;
  font-weight: 500;
}

/* Products Page Header */
.products-header {
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f1f5f9;
}

.products-header_heading-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.page-heading {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.page-heading.is-khmer {
  font-family: 'Kantumruy Pro', 'Battambang', sans-serif;
  font-size: 26px;
  line-height: 1.4;
}

.products-header_count-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 600;
  color: #4b5563;
}

.products-header_subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 4px 0 0 0;
  line-height: 1.5;
}

.products-header_subtitle.is-khmer {
  font-size: 13.5px;
  line-height: 1.6;
}

/* Catalog Layout */
.catalog-layout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

/* Left Sidebar: Category Menu & Flyout */
.catalog-sidebar {
  width: 240px;
  flex-shrink: 0;
  position: relative;
}

.category-menu-container {
  position: relative;
  width: 100%;
}

.category-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.category-menu-title {
  font-size: 17px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.category-menu-clear {
  background: none;
  border: none;
  color: var(--color-brand-dark, #269c46);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color var(--transition-fast);
}

.category-menu-clear:hover {
  color: var(--color-brand, #34c759);
  text-decoration: underline;
}

.category-menu-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: visible;
}

.category-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-menu-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  font-size: 14.5px;
  font-weight: 500;
  color: #1f2937;
  transition: background-color 0.18s ease, color 0.18s ease;
  user-select: none;
}

.category-menu-row:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.category-menu-row:last-child {
  border-bottom: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.category-menu-row_text {
  flex: 1;
}

.category-menu-row_chevron {
  width: 15px;
  height: 15px;
  color: #9ca3af;
  flex-shrink: 0;
  margin-left: 8px;
  transition: color 0.18s ease, transform 0.18s ease;
}

/* Normal neutral Active & Hover states */
.category-menu-row.is-active,
.category-menu-row.is-hovered,
.category-menu-row:hover {
  background-color: #edeff2 !important;
  color: #111827 !important;
  font-weight: 600;
}

.category-menu-row.is-active .category-menu-row_chevron,
.category-menu-row.is-hovered .category-menu-row_chevron,
.category-menu-row:hover .category-menu-row_chevron {
  color: #111827 !important;
  transform: translateX(2px);
}

/* Right Flyout Submenu Panel */
.category-flyout-panel {
  position: absolute;
  left: calc(100% + 2px);
  min-width: 250px;
  max-width: 320px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
  padding: 8px 0;
  z-index: 70;
  transition: top 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover bridge so moving mouse to flyout doesn't trigger mouseleave */
.category-flyout-panel::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -10px;
  width: 10px;
}

.category-flyout-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-flyout-item {
  padding: 10px 22px;
  font-size: 14.5px;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
}

.category-flyout-item:hover {
  background-color: #f3f4f6;
  color: #111827;
  font-weight: 600;
  padding-left: 26px;
}

.category-flyout-item.is-active-sub {
  background-color: #edeff2;
  color: #111827;
  font-weight: 700;
}

.flyout-fade-enter-active,
.flyout-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.flyout-fade-enter-from,
.flyout-fade-leave-to {
  opacity: 0;
  transform: translateX(-6px);
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

.toolbar_search {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar_search-icon {
  width: 14px;
  height: 14px;
  color: #9ca3af;
  flex-shrink: 0;
}

.toolbar_search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: #1f2937;
  background: transparent;
  font-family: inherit;
  padding: 4px 0;
}

.toolbar_search-input::placeholder {
  color: #9ca3af;
  font-size: 13px;
}

.toolbar_views {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar_view-btn {
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

.toolbar_view-btn svg {
  width: 13px;
  height: 13px;
}

.toolbar_view-btn:hover {
  color: var(--color-brand-dark);
  border-color: var(--color-brand);
}

.toolbar_view-btn.is-active {
  color: #ffffff;
  border-color: var(--color-brand);
  background-color: var(--color-brand);
}

/* Products Grid (4 columns / 4 boxes per row) */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
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
  border-radius: 14px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  outline: none;
  transition: transform 0.22s cubic-bezier(0.2, 0, 0.2, 1),
              box-shadow 0.22s cubic-bezier(0.2, 0, 0.2, 1),
              border-color 0.22s ease;
}

.product-card:hover,
.product-card:focus-visible {
  transform: translateY(-5px);
  border-color: #34c759;
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(52, 199, 89, 0.08);
}

.product-card_image-wrap {
  width: 100%;
  aspect-ratio: 1.15;
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  overflow: hidden;
  position: relative;
}

.product-card_img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
  transition: transform 0.35s cubic-bezier(0.2, 0, 0.2, 1);
}

.product-card:hover .product-card_img {
  transform: scale(1.06);
}

.product-card_placeholder {
  font-size: 14px;
  color: #9ca3af;
  font-weight: 400;
  user-select: none;
}

/* Quick View Overlay on Image */
.product-card_quickview-overlay {
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.22s ease;
  z-index: 2;
}

.product-card:hover .product-card_quickview-overlay {
  opacity: 1;
  transform: translateY(0);
}

.product-card_quickview-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6px);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #15803d;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border: 1px solid #bbf7d0;
}

.product-card_body {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-card_title {
  font-family: var(--font-family-title);
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
  line-height: 1.35;
  transition: color 0.2s ease;
}

.product-card:hover .product-card_title {
  color: #15803d;
}

.product-card_category {
  font-size: 12.5px;
  color: #6b7280;
  margin: 0 0 10px 0;
}

.product-card_footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 10px;
  gap: 8px;
}

.product-card_price-wrap {
  display: flex;
  flex-direction: column;
}

.product-card_price {
  font-size: 19px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}

.product-card_stock {
  font-size: 12.5px;
  font-weight: 500;
  margin: 0;
  display: inline-flex;
  align-items: center;
}

.stock-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: currentColor;
}

.stock--in {
  color: #16a34a;
}

.stock--out {
  color: #ef4444;
}

/* Product Card Cart Button */
.product-card_cart-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #16a34a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.product-card_cart-btn:hover {
  background-color: #16a34a;
  border-color: #16a34a;
  color: #ffffff;
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.25);
}

/* List View Variant */
.product-card--list {
  flex-direction: row;
  align-items: center;
  gap: 24px;
}

.product-card--list .product-card_image-wrap {
  width: 160px;
  height: 130px;
  aspect-ratio: auto;
  margin-bottom: 0;
  flex-shrink: 0;
}

.product-card--list .product-card_body {
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

.pagination_nav-btn {
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
  gap: 6px;
}

.pagination_page-btn {
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

/* Empty State */
.catalog-empty {
  text-align: center;
  padding: 64px 20px;
  background-color: #ffffff;
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
}

.catalog-empty_text {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 16px;
}

.catalog-empty_btn {
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

.catalog-empty_btn:hover {
  opacity: 0.9;
}

/* Quick View / Product Detail Modal Styles */
.product-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.product-modal-card {
  position: relative;
  background-color: #ffffff;
  border-radius: 20px;
  max-width: 780px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 32px;
  animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.product-modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  color: #6b7280;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.product-modal-close:hover {
  background-color: #fee2e2;
  border-color: #fca5a5;
  color: #dc2626;
  transform: rotate(90deg);
}

.product-modal-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.product-modal-header-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #15803d;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 4px 10px;
  border-radius: 6px;
}

.product-modal-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 32px;
  align-items: center;
}

.product-modal-image-box {
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
}

.product-modal-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-modal-content {
  display: flex;
  flex-direction: column;
}

.product-modal-badge-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.product-modal-category {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #15803d;
  background-color: #f0fdf4;
  border: 1px solid #dcfce7;
  padding: 4px 10px;
  border-radius: 20px;
}

.product-modal-stock {
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.product-modal-title {
  font-family: var(--font-family-title);
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px 0;
  line-height: 1.35;
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-modal-title-icon {
  color: #eab308;
  flex-shrink: 0;
}

.product-modal-price-box {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 16px;
}

.product-modal-price {
  font-size: 26px;
  font-weight: 800;
  color: #16a34a;
}

.product-modal-unit {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.product-modal-desc {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.product-modal-features {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-modal-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
}

.feature-icon {
  color: #16a34a;
  flex-shrink: 0;
}

.product-modal-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quantity-picker {
  display: inline-flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
}

.qty-btn {
  width: 38px;
  height: 42px;
  background-color: #f9fafb;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease;
}

.qty-btn:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qty-val {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  color: #111827;
}

.product-modal-add-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #16a34a;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  height: 44px;
  padding: 0 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(22, 163, 74, 0.3);
  transition: all 0.2s ease;
}

.product-modal-add-btn:hover {
  background-color: #15803d;
  box-shadow: 0 6px 18px rgba(22, 163, 74, 0.4);
  transform: translateY(-1px);
}

/* Floating Toast Notification */
.cart-toast {
  position: fixed;
  bottom: 28px;
  right: 28px;
  background-color: #111827;
  color: #ffffff;
  padding: 14px 22px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  font-size: 14px;
  font-weight: 500;
}

.cart-toast_icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #16a34a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}

@media (max-width: 680px) {
  .product-modal-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .product-modal-card {
    padding: 22px;
  }
}

/* Responsive */
@media (max-width: 1280px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 960px) {
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

  .filter-group_list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .filter-group_list {
    grid-template-columns: 1fr;
  }

  .product-card--list {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-card--list .product-card_image-wrap {
    width: 100%;
    height: auto;
    aspect-ratio: 1.18;
  }

  .pagination {
    flex-wrap: wrap;
  }
}
</style>
