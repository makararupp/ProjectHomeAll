<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { getProductDetails, topSellingProducts } from '@/data/productDetails'
import { useCart } from '@/composables/useCart'
import { useWishlist } from '@/composables/useWishlist'
import { useCompare } from '@/composables/useCompare'
import { useI18n } from '@/composables/useI18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { addToCart } = useCart()
const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
const { isInCompare, toggleCompare } = useCompare()

// Product state loaded by route param `id`
const product = ref(getProductDetails(route.params.id))
const initialIndex = product.value?.gallery?.findIndex(img => img === product.value?.mainImage)
const activeImageIndex = ref(initialIndex >= 0 ? initialIndex : 0)
const quantity = ref(1)
const activeTab = ref('description')

// Toast state
const toastMessage = ref('')
const isToastVisible = ref(false)
let toastTimer = null

function showToast(msg) {
  if (toastTimer) clearTimeout(toastTimer)
  toastMessage.value = msg
  isToastVisible.value = true
  toastTimer = setTimeout(() => {
    isToastVisible.value = false
  }, 3000)
}

// Watch for route param change to load new product when clicking top-selling or related items
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      product.value = getProductDetails(newId)
      const initIdx = product.value?.gallery?.findIndex(img => img === product.value?.mainImage)
      activeImageIndex.value = initIdx >= 0 ? initIdx : 0
      quantity.value = 1
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
)

const currentImage = computed(() => {
  if (product.value?.gallery && product.value.gallery.length > activeImageIndex.value) {
    return product.value.gallery[activeImageIndex.value]
  }
  return product.value?.mainImage
})

const totalPrice = computed(() => {
  const p = Number(product.value?.price) || 0
  return (p * quantity.value).toFixed(0)
})

const isWishlisted = computed(() => {
  return product.value ? isInWishlist(product.value.id) : false
})

const isCompared = computed(() => {
  return product.value ? isInCompare(product.value.id) : false
})

// Image Magnifier / Zoom Lens State (matching reference screenshot)
const mainViewportRef = ref(null)
const isZoomActive = ref(false)
const isZoomLocked = ref(false)

const lensStyle = ref({
  left: '0px',
  top: '0px',
  width: '180px',
  height: '180px'
})

const zoomBgStyle = ref({
  backgroundImage: '',
  backgroundPosition: '0% 0%',
  backgroundSize: '260%'
})

function handleMouseEnter(e) {
  isZoomActive.value = true
  updateZoomPosition(e)
}

function handleMouseLeave() {
  if (!isZoomLocked.value) {
    isZoomActive.value = false
  }
}

function toggleZoom(e) {
  isZoomLocked.value = !isZoomLocked.value
  isZoomActive.value = isZoomLocked.value
  if (isZoomActive.value) {
    updateZoomPosition(e)
  }
}

function handleMouseMove(e) {
  isZoomActive.value = true
  updateZoomPosition(e)
}

function updateZoomPosition(e) {
  if (!mainViewportRef.value) return
  const rect = mainViewportRef.value.getBoundingClientRect()

  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top

  const lensWidth = 180
  const lensHeight = 180

  let lensX = mouseX - lensWidth / 2
  let lensY = mouseY - lensHeight / 2

  const maxLensX = Math.max(0, rect.width - lensWidth)
  const maxLensY = Math.max(0, rect.height - lensHeight)

  lensX = Math.max(0, Math.min(lensX, maxLensX))
  lensY = Math.max(0, Math.min(lensY, maxLensY))

  lensStyle.value = {
    left: `${lensX}px`,
    top: `${lensY}px`,
    width: `${lensWidth}px`,
    height: `${lensHeight}px`
  }

  const percentX = maxLensX > 0 ? (lensX / maxLensX) * 100 : 0
  const percentY = maxLensY > 0 ? (lensY / maxLensY) * 100 : 0

  zoomBgStyle.value = {
    backgroundImage: `url(${currentImage.value})`,
    backgroundPosition: `${percentX}% ${percentY}%`,
    backgroundSize: '260%',
    backgroundColor: '#ffffff'
  }
}

watch(currentImage, (newImg) => {
  if (newImg) {
    zoomBgStyle.value = {
      ...zoomBgStyle.value,
      backgroundImage: `url(${newImg})`
    }
  }
})

const thumbnailListRef = ref(null)

function scrollActiveThumbnail() {
  if (!thumbnailListRef.value) return
  const activeEl = thumbnailListRef.value.children[activeImageIndex.value]
  if (activeEl && typeof activeEl.scrollIntoView === 'function') {
    activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
}

function selectThumbnail(idx) {
  activeImageIndex.value = idx
  zoomBgStyle.value = {
    ...zoomBgStyle.value,
    backgroundImage: `url(${product.value?.gallery?.[idx] || currentImage.value})`
  }
  scrollActiveThumbnail()
}

function prevThumbnail() {
  if (!product.value?.gallery?.length) return
  if (activeImageIndex.value > 0) {
    activeImageIndex.value--
  } else {
    activeImageIndex.value = product.value.gallery.length - 1
  }
  scrollActiveThumbnail()
}

function nextThumbnail() {
  if (!product.value?.gallery?.length) return
  if (activeImageIndex.value < product.value.gallery.length - 1) {
    activeImageIndex.value++
  } else {
    activeImageIndex.value = 0
  }
  scrollActiveThumbnail()
}

function decreaseQty() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function increaseQty() {
  quantity.value++
}

function handlePreOrder() {
  if (!product.value) return
  addToCart(
    {
      id: product.value.id,
      title: product.value.title,
      price: `$${product.value.price}`,
      image: product.value.mainImage,
      inStock: product.value.inStock
    },
    quantity.value
  )
  showToast(`Added ${quantity.value}x "${product.value.title}" to cart!`)
}

function handleToggleWishlist() {
  if (!product.value) return
  if (isWishlisted.value) {
    removeFromWishlist(product.value.id)
    showToast(`Removed from wishlist.`)
  } else {
    addToWishlist({
      id: product.value.id,
      title: product.value.title,
      price: `$${product.value.price}`,
      image: product.value.mainImage
    })
    showToast(`Added to wishlist!`)
  }
}

function handleToggleCompare() {
  if (!product.value) return
  toggleCompare({
    id: product.value.id,
    title: product.value.title,
    price: `$${product.value.price}`,
    image: product.value.mainImage,
    category: product.value.brand || 'Computer'
  })
}

function navigateToProduct(prodId) {
  router.push(`/products/${prodId}`)
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<template>
  <div class="product-item-page">
    <AppHeader />
    <CategoryNav />

    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-bar">
      <div class="container breadcrumb-inner">
        <RouterLink to="/" class="breadcrumb-link">{{ t('header.home', 'Home') }}</RouterLink>
        <span class="breadcrumb-separator">/</span>
        <RouterLink to="/products" class="breadcrumb-link">{{ t('header.products', 'Products') }}</RouterLink>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ product.title }}</span>
      </div>
    </div>

    <main class="container product-main-container">
      <!-- Top Section: 2 Columns (Image Gallery on Left, Specs & Purchase on Right) -->
      <section class="product-hero-grid">
        <!-- Left: Interactive Gallery -->
        <!-- Left: Interactive Gallery with Image Magnifier Lens -->
        <div class="product-gallery-card">
          <div class="gallery-viewport-wrapper">
            <div
              ref="mainViewportRef"
              class="main-image-viewport"
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
              @click="toggleZoom"
            >
              <img
                :src="currentImage"
                :alt="product.title"
                class="main-product-image"
              />

              <!-- Zoom Lens Overlay Box (180x180 square matching screenshot) -->
              <div
                v-show="isZoomActive"
                class="zoom-lens"
                :style="lensStyle"
              />
            </div>

            <!-- Zoom Preview Flyout (Adjacent magnified view matching screenshot) -->
            <div
              v-show="isZoomActive"
              class="zoom-preview-flyout"
            >
              <div
                class="zoom-preview-bg"
                :style="zoomBgStyle"
              />
            </div>
          </div>

          <!-- Thumbnail Strip with Navigation Arrows -->
          <div class="thumbnail-carousel-wrap">
            <button
              type="button"
              class="carousel-nav-btn prev-btn"
              aria-label="Previous thumbnail"
              @click="prevThumbnail"
            >
              ‹
            </button>

            <div ref="thumbnailListRef" class="thumbnail-list">
              <button
                v-for="(imgSrc, idx) in product.gallery"
                :key="idx"
                type="button"
                class="thumbnail-item"
                :class="{ 'is-active': activeImageIndex === idx }"
                @click="selectThumbnail(idx)"
              >
                <img :src="imgSrc" :alt="`Thumbnail ${idx + 1}`" />
              </button>
            </div>

            <button
              type="button"
              class="carousel-nav-btn next-btn"
              aria-label="Next thumbnail"
              @click="nextThumbnail"
            >
              ›
            </button>
          </div>
        </div>

        <!-- Right: Specs, Pricing, Installments and Purchase Actions -->
        <div class="product-info-panel">
          <!-- Summary Quick Specs -->
          <ul class="quick-specs-list">
            <li v-for="(spec, i) in product.quickSpecs" :key="i">
              {{ spec }}
            </li>
          </ul>

          <!-- Pricing & Quantity Row -->
          <div class="pricing-matrix">
            <div class="matrix-row price-row">
              <span class="matrix-label">Price:</span>
              <div class="price-value-wrap">
                <span class="currency-symbol">$</span>
                <span class="price-number">{{ product.price }}</span>
                <span v-if="product.unit" class="price-unit">{{ product.unit }}</span>
              </div>
            </div>

            <div class="matrix-row quantity-row">
              <span class="matrix-label">Quantity:</span>
              <div class="qty-counter">
                <button
                  type="button"
                  class="qty-btn"
                  :disabled="quantity <= 1"
                  @click="decreaseQty"
                >
                  −
                </button>
                <span class="qty-number">{{ quantity }}</span>
                <button
                  type="button"
                  class="qty-btn"
                  @click="increaseQty"
                >
                  +
                </button>
              </div>
            </div>

            <div class="matrix-row total-row">
              <span class="matrix-label">Total Price:</span>
              <span class="total-price-number">${{ totalPrice }}</span>
            </div>
          </div>

          <!-- Installment Options (Matching screenshot) -->
          <div v-if="product.installmentTitle" class="installment-block">
            <h4 class="installment-heading">{{ product.installmentTitle }}</h4>
            <div class="installment-content">
              <img
                v-if="product.installmentLogo"
                :src="product.installmentLogo"
                :alt="product.installmentPartner || 'AEON'"
                class="installment-partner-logo"
              />
              <span class="installment-rate">{{ product.installmentText }}</span>
            </div>
          </div>

          <!-- Primary Action: PRE ORDER button -->
          <div class="primary-action-wrap">
            <button
              type="button"
              class="pre-order-btn"
              @click="handlePreOrder"
            >
              {{ product.isPreOrder ? 'PRE ORDER' : 'ADD TO CART' }}
            </button>
          </div>

          <!-- Secondary Actions: Wishlist and Compare Buttons -->
          <div class="secondary-actions-wrap">
            <button
              type="button"
              class="sub-action-btn wishlist-btn"
              :class="{ 'is-active': isWishlisted }"
              @click="handleToggleWishlist"
            >
              <svg
                viewBox="0 0 24 24"
                :fill="isWishlisted ? '#10b981' : '#10b981'"
                stroke="#10b981"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="16"
                height="16"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{{ isWishlisted ? 'Wishlisted' : 'Add to wishlist' }}</span>
            </button>

            <button
              type="button"
              class="sub-action-btn compare-btn"
              :class="{ 'is-active': isCompared }"
              @click="handleToggleCompare"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#38bdf8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="16"
                height="16"
              >
                <path d="M16 3l4 4-4 4" />
                <path d="M20 7H4" />
                <path d="M8 21l-4-4 4-4" />
                <path d="M4 17h16" />
              </svg>
              <span>{{ isCompared ? 'Compared' : 'Add to compare' }}</span>
            </button>
          </div>

          <!-- Social Sharing Row -->
          <div class="social-share-row">
            <span class="share-label">Share:</span>
            <div class="share-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                class="share-icon-btn facebook"
                title="Share on Facebook"
              >
                f
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="share-icon-btn linkedin"
                title="Share on LinkedIn"
              >
                in
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                class="share-icon-btn twitter"
                title="Share on Twitter"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom Layout Section: Top Selling Sidebar on Left, Description Tabs on Right -->
      <section class="product-bottom-grid">
        <!-- Left: Top Selling Products Sidebar -->
        <aside class="top-selling-sidebar">
          <h3 class="top-selling-heading">Top Selling Products</h3>

          <div class="top-selling-list">
            <article
              v-for="item in topSellingProducts"
              :key="item.id"
              class="top-selling-card"
              @click="navigateToProduct(item.id)"
            >
              <div class="top-selling-thumb">
                <img :src="item.image" :alt="item.title" loading="lazy" />
              </div>

              <div class="top-selling-details">
                <h4 class="top-selling-title" :title="item.title">
                  {{ item.title }}
                </h4>

                <div class="star-rating">
                  <span
                    v-for="star in 5"
                    :key="star"
                    class="star-icon"
                    :class="{ 'is-filled': star <= Math.floor(item.rating) }"
                  >
                    ★
                  </span>
                </div>

                <p v-if="item.code" class="top-selling-code">{{ item.code }}</p>
                <p class="top-selling-price">${{ item.price }}</p>
              </div>
            </article>
          </div>
        </aside>

        <!-- Right: Description & Reviews Tabs -->
        <div class="product-tabs-container">
          <!-- Tab Headers -->
          <div class="tab-headers">
            <button
              type="button"
              class="tab-btn"
              :class="{ 'is-active': activeTab === 'description' }"
              @click="activeTab = 'description'"
            >
              Description
            </button>
            <button
              type="button"
              class="tab-btn"
              :class="{ 'is-active': activeTab === 'reviews' }"
              @click="activeTab = 'reviews'"
            >
              Reviews ({{ product.reviews ? product.reviews.length : 0 }})
            </button>
          </div>

          <!-- Tab Content: Description -->
          <div v-show="activeTab === 'description'" class="tab-content description-content">
            <!-- Full Technical Lines matching reference screenshot -->
            <div v-if="product.descriptionLines && product.descriptionLines.length" class="description-lines-view">
              <div
                v-for="(line, lIdx) in product.descriptionLines"
                :key="lIdx"
                class="desc-line"
                :class="{ 'desc-subline': line.startsWith('       ') || line.startsWith('    ') }"
              >
                {{ line }}
              </div>
            </div>

            <!-- Fallback table view -->
            <div v-else-if="product.specsList && product.specsList.length" class="specs-table-view">
              <div
                v-for="(specItem, sIdx) in product.specsList"
                :key="sIdx"
                class="spec-table-row"
              >
                <span class="spec-table-label">{{ specItem.label }}</span>
                <span class="spec-table-value">{{ specItem.value }}</span>
              </div>
            </div>

            <!-- Fallback text description if no specs list -->
            <div v-else class="text-description">
              <p>{{ product.description || 'Comprehensive certified specifications and warranty details for this high-quality product.' }}</p>
            </div>
          </div>

          <!-- Tab Content: Reviews -->
          <div v-show="activeTab === 'reviews'" class="tab-content reviews-content">
            <div v-if="product.reviews && product.reviews.length" class="review-items-list">
              <div
                v-for="(rev, rIdx) in product.reviews"
                :key="rIdx"
                class="review-item"
              >
                <div class="review-header">
                  <span class="review-author">{{ rev.author }}</span>
                  <span class="review-date">{{ rev.date }}</span>
                </div>
                <div class="star-rating">
                  <span
                    v-for="star in 5"
                    :key="star"
                    class="star-icon"
                    :class="{ 'is-filled': star <= rev.rating }"
                  >
                    ★
                  </span>
                </div>
                <p class="review-comment">{{ rev.comment }}</p>
              </div>
            </div>
            <div v-else class="no-reviews-box">
              <p>There are no reviews for this product yet. Be the first to leave a review!</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Toast Notification -->
    <Transition name="toast-fade">
      <div v-if="isToastVisible" class="toast-popup" role="status">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <AppFooter />
  </div>
</template>

<style scoped>
.product-item-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8fafc;
}

/* Breadcrumb Navigation */
.breadcrumb-bar {
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 12px 0;
  font-size: 13px;
}

.breadcrumb-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  flex-wrap: wrap;
}

.breadcrumb-link {
  color: #64748b;
  text-decoration: none;
  transition: color 0.15s ease;
}

.breadcrumb-link:hover {
  color: #2563eb;
}

.breadcrumb-separator {
  color: #94a3b8;
}

.breadcrumb-current {
  color: #1e293b;
  font-weight: 600;
}

/* Main Container Layout */
.product-main-container {
  padding-top: 28px;
  padding-bottom: 60px;
  flex: 1;
}

/* Top Hero Grid: Gallery on Left, Details on Right */
.product-hero-grid {
  display: grid;
  grid-template-columns: minmax(440px, 560px) 1fr;
  gap: 40px;
  align-items: flex-start;
  margin-bottom: 48px;
}

/* Gallery Card & Viewport Wrapper */
.product-gallery-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
}

.gallery-viewport-wrapper {
  position: relative;
  width: 100%;
}

.main-image-viewport {
  width: 100%;
  aspect-ratio: 16 / 11;
  min-height: 400px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  position: relative;
  cursor: crosshair;
}

.main-product-image {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
}

/* Zoom Lens (Translucent rectangular box matching screenshot) */
.zoom-lens {
  position: absolute;
  background-color: rgba(246, 250, 251, 0.62);
  border: 1px solid rgba(203, 213, 225, 0.9);
  pointer-events: none;
  z-index: 20;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
}

/* Zoom Preview Flyout (Adjacent magnified window matching screenshot) */
.zoom-preview-flyout {
  position: absolute;
  top: 0;
  left: calc(100% + 18px);
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  z-index: 80;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
  pointer-events: none;
}

.zoom-preview-bg {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-color: #ffffff;
}

@media (max-width: 960px) {
  .zoom-preview-flyout {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 70vw;
    max-height: 420px;
  }
}

/* Carousel Thumbnail Strip */
.thumbnail-carousel-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.carousel-nav-btn {
  width: 24px;
  height: 48px;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease;
  user-select: none;
  padding: 0;
}

.carousel-nav-btn:hover {
  color: #334155;
}

.thumbnail-list {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 2px;
  flex: 1;
}

.thumbnail-list::-webkit-scrollbar {
  display: none;
}

.thumbnail-item {
  width: 58px;
  height: 50px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.18s ease, transform 0.15s ease;
}

.thumbnail-item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.thumbnail-item:hover {
  border-color: #cbd5e1;
}

/* Active Thumbnail with Brand Green Border */
.thumbnail-item.is-active {
  border: 2px solid var(--color-brand, #34c759);
  padding: 2px;
}

/* Right Information Panel */
.product-info-panel {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

/* Quick Specs List */
.quick-specs-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13.5px;
  color: #1e293b;
  line-height: 1.45;
}

.quick-specs-list li {
  font-weight: 500;
}

/* Pricing Matrix */
.pricing-matrix {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 18px;
}

.matrix-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.matrix-label {
  font-size: 14px;
  color: #64748b;
  width: 90px;
  flex-shrink: 0;
}

/* Price Display */
.price-value-wrap {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.currency-symbol {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
}

.price-number {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
}

.price-unit {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
  margin-left: 2px;
}

/* Quantity Counter */
.qty-counter {
  display: inline-flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: #ffffff;
  overflow: hidden;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 16px;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.qty-btn:hover:not(:disabled) {
  background-color: #f1f5f9;
  color: #0f172a;
}

.qty-btn:disabled {
  color: #cbd5e1;
  cursor: not-allowed;
}

.qty-number {
  min-width: 34px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.total-price-number {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
}

/* Installment Block (Khmer Notice & AEON logo) */
.installment-block {
  margin-bottom: 20px;
  padding: 10px 0;
  border-top: 1px dashed #e2e8f0;
  border-bottom: 1px dashed #e2e8f0;
}

.installment-heading {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a; /* Clean dark slate */
  margin: 0 0 6px 0;
}

.installment-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.installment-partner-logo {
  height: 22px;
  width: auto;
  object-fit: contain;
}

.installment-rate {
  font-size: 13px;
  font-weight: 600;
  color: #dc2626; /* Highlighted red price text */
}

/* Primary PRE ORDER Action Button (HomeAll Brand Green matching header/nav) */
.primary-action-wrap {
  margin-bottom: 14px;
}

.pre-order-btn {
  width: 100%;
  max-width: 240px;
  height: 42px;
  background-color: var(--color-brand, #34c759);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(52, 199, 89, 0.32);
}

.pre-order-btn:hover {
  background-color: var(--color-brand-dark, #269c46);
  box-shadow: 0 4px 14px rgba(52, 199, 89, 0.42);
  transform: translateY(-1px);
}

.pre-order-btn:active {
  transform: translateY(0);
}

/* Secondary Actions: Wishlist & Compare */
.secondary-actions-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.sub-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
}

.sub-action-btn.wishlist-btn {
  color: #10b981;
  border-color: #a7f3d0;
}

.sub-action-btn.wishlist-btn:hover {
  background-color: #ecfdf5;
  border-color: #6ee7b7;
}

.sub-action-btn.compare-btn {
  color: #0284c7;
  border-color: #bae6fd;
}

.sub-action-btn.compare-btn:hover {
  background-color: #f0f9ff;
  border-color: #7dd3fc;
}

/* Social Share Row */
.social-share-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 10px;
  font-size: 12.5px;
  color: #64748b;
}

.share-label {
  font-weight: 500;
}

.share-icons {
  display: flex;
  align-items: center;
  gap: 6px;
}

.share-icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.15s ease;
}

.share-icon-btn:hover {
  opacity: 0.88;
}

.share-icon-btn.facebook {
  background-color: #3b5998;
}

.share-icon-btn.linkedin {
  background-color: #0077b5;
}

.share-icon-btn.twitter {
  background-color: #00acee;
}

/* Bottom Grid Layout: Top Selling Sidebar + Detailed Tabs */
.product-bottom-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
  align-items: flex-start;
}

/* Top Selling Sidebar (White Background Card matching description & review) */
.top-selling-sidebar {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.top-selling-heading {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 18px 0;
  padding: 0 0 12px 0;
  border-bottom: 1px solid #f1f5f9;
}

.top-selling-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.top-selling-card {
  display: flex;
  gap: 14px;
  align-items: center;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #f1f5f9;
  transition: all 0.18s ease;
}

.top-selling-card:hover {
  background-color: #f8fafc;
  border-color: #e2e8f0;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
}

.top-selling-thumb {
  width: 72px;
  height: 60px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 4px;
}

.top-selling-thumb img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.top-selling-details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.top-selling-title {
  font-size: 13px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 4px 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.top-selling-card:hover .top-selling-title {
  color: var(--color-brand-dark, #269c46);
}

.star-rating {
  display: flex;
  gap: 2px;
  font-size: 12px;
  color: #fbbf24;
  margin-bottom: 4px;
}

.star-icon {
  color: #d1d5db;
}

.star-icon.is-filled {
  color: #fbbf24;
}

.top-selling-code {
  font-size: 12px;
  font-family: var(--font-family-code);
  font-size: 11.5px;
  color: #64748b;
  margin: 0 0 4px 0;
  font-weight: 600;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.top-selling-price {
  font-size: 15px;
  font-weight: 800;
  color: #000000;
  margin: 0;
}

/* Tabs Section (Same White Background Style as Top Selling) */
.product-tabs-container {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px 28px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.tab-headers {
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
}

.tab-btn {
  background: none;
  border: none;
  padding: 6px 2px 12px 2px;
  font-size: 16px;
  font-weight: 600;
  color: #4b5563;
  cursor: pointer;
  position: relative;
  transition: color 0.15s ease;
}

.tab-btn:hover {
  color: #111827;
}

.tab-btn.is-active {
  color: #111827;
  font-weight: 700;
}

.tab-btn.is-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-brand, #34c759);
}

/* Tab Content */
.tab-content {
  font-size: 13px;
  color: #111827;
  line-height: 1.55;
}

/* Description Lines View matching reference screenshot */
.description-lines-view {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  line-height: 1.55;
  color: #111827;
}

.desc-line {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.desc-subline {
  padding-left: 28px;
}

/* Description Specs Table matching screenshot */
.specs-table-view {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.spec-table-row {
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 16px;
  padding: 4px 0;
  font-size: 13px;
  line-height: 1.45;
}

.spec-table-label {
  font-weight: 600;
  color: #1e293b;
}

.spec-table-value {
  color: #334155;
}

/* Reviews List */
.review-items-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-item {
  padding: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.review-author {
  font-weight: 600;
  color: #0f172a;
}

.review-date {
  font-size: 12px;
  color: #94a3b8;
}

.review-comment {
  margin: 6px 0 0 0;
  color: #334155;
  font-size: 13.5px;
}

.no-reviews-box {
  padding: 24px;
  text-align: center;
  color: #94a3b8;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px dashed #cbd5e1;
}

/* Toast Notification */
.toast-popup {
  position: fixed;
  bottom: 28px;
  right: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #0f172a;
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.25s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .product-hero-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .product-bottom-grid {
    grid-template-columns: 1fr;
  }

  .spec-table-row {
    grid-template-columns: 1fr;
    gap: 2px;
  }
}
</style>

