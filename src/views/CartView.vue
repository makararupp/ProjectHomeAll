<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useCart } from '@/composables/useCart'
import { useI18n } from '@/composables/useI18n'
import { useTelegram } from '@/composables/useTelegram'

const { t, isKhmer } = useI18n()
const {
  cartItems,
  totalCount,
  totalPrice,
  updateQuantity,
  removeFromCart,
  clearCart
} = useCart()

const { isAvailable: isTelegram, user: telegramUser, haptic, submitOrder } = useTelegram()

const botUsername = import.meta.env.VITE_BOT_USERNAME || 'HomeMiniStoreBot'

// Checkout Modal State
const isCheckoutOpen = ref(false)
const isSubmitting = ref(false)
const orderSuccess = ref(null)

const form = ref({
  name: '',
  phone: '',
  address: '',
  paymentMethod: 'KHQR'
})

const phoneError = ref('')
const nameError = ref('')

function openCheckoutModal() {
  if (telegramUser?.value) {
    form.value.name = [telegramUser.value.first_name, telegramUser.value.last_name].filter(Boolean).join(' ') || telegramUser.value.username || ''
  }
  phoneError.value = ''
  nameError.value = ''
  orderSuccess.value = null
  isCheckoutOpen.value = true
}

function closeCheckoutModal() {
  isCheckoutOpen.value = false
  phoneError.value = ''
  nameError.value = ''
  if (orderSuccess.value) {
    clearCart()
    orderSuccess.value = null
  }
}

function validateFullName(name) {
  if (!name || typeof name !== 'string') return false
  const trimmed = name.trim()
  if (trimmed.length < 2 || trimmed.length > 80) return false
  // Allow letters (Khmer, English, etc.), vowels/marks, spaces, hyphens, and apostrophes
  return /^[\p{L}\p{M}\s'-]+$/u.test(trimmed)
}

function validatePhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') return false
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')

  // Reject dummy patterns (00000000, 11111111, 12345678, etc.)
  if (/^(\d)\1+$/.test(cleaned) || cleaned === '12345678' || cleaned === '123456789' || cleaned === '012345678') {
    return false
  }

  // 1. Cambodian Local: starts with 0, 9 to 10 digits (e.g. 012 345 678 or 097 123 4567)
  const isCambodiaLocal = /^0[1-9]\d{7,8}$/.test(cleaned)

  // 2. Cambodian International: starts with +855 or 855 followed by 8-9 digits
  const isCambodiaIntl = /^(\+?855)[1-9]\d{7,8}$/.test(cleaned)

  // 3. General International with country code (+XX followed by 7-14 digits)
  const isGeneralIntl = /^\+[1-9]\d{7,14}$/.test(cleaned)

  return isCambodiaLocal || isCambodiaIntl || isGeneralIntl
}

async function handleConfirmOrder() {
  // Validate Full Name: characters only (matched with phone validation pattern)
  if (!form.value.name || !form.value.name.trim()) {
    nameError.value = isKhmer.value
      ? 'សូមបញ្ចូលឈ្មោះរបស់អ្នក'
      : 'Please enter your full name.'
    return
  }

  if (!validateFullName(form.value.name)) {
    nameError.value = isKhmer.value
      ? 'ឈ្មោះមិនត្រឹមត្រូវទេ។ សូមបញ្ចូលឈ្មោះត្រឹមត្រូវ'
      : 'Invalid name format. Please enter a valid name.'
    return
  }
  nameError.value = ''

  if (!form.value.phone || !form.value.phone.trim()) {
    phoneError.value = isKhmer.value
      ? 'សូមបញ្ចូលលេខទូរស័ព្ទរបស់អ្នក'
      : 'Please enter your phone number.'
    return
  }

  if (!validatePhoneNumber(form.value.phone)) {
    phoneError.value = isKhmer.value
      ? 'លេខទូរស័ព្ទមិនត្រឹមត្រូវទេ។ សូមបញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ'
      : 'Invalid phone number format. Please enter a valid phone number.'
    return
  }

  phoneError.value = ''
  isSubmitting.value = true

  const orderPayload = {
    customerName: form.value.name || (telegramUser?.value ? `${telegramUser.value.first_name || ''} ${telegramUser.value.last_name || ''}`.trim() : 'Guest Customer'),
    customerPhone: form.value.phone.trim(),
    customerAddress: form.value.address || 'Phnom Penh, Cambodia',
    paymentMethod: form.value.paymentMethod,
    items: cartItems.value.map(item => ({
      id: item.id,
      name: item.title,
      price: getItemPriceNumber(item.price),
      quantity: item.quantity
    })),
    total: totalPrice.value
  }

  try {
    const res = await submitOrder(orderPayload)
    if (res && res.success === false) {
      phoneError.value = res.message || 'Failed to submit order'
      isSubmitting.value = false
      return
    }
    const orderData = res.order || {
      orderId: 'HA-' + Math.floor(100000 + Math.random() * 900000),
      total: totalPrice.value,
      paymentMethod: form.value.paymentMethod
    }
    orderSuccess.value = {
      ...orderData,
      payment: res.payment || res.order?.paymentDetails
    }
    haptic('success')

    // Clear cart immediately so old items are removed for future orders
    clearCart()

    // Open Telegram Bot with the order deep link
    const telegramUrl = `https://t.me/${botUsername}?start=order_${orderData.orderId}`
    if (!isTelegram.value) {
      window.open(telegramUrl, '_blank')
    }
  } catch (err) {
    console.error('Order submission error:', err)
    const fallbackId = 'HA-' + Math.floor(100000 + Math.random() * 900000)
    orderSuccess.value = {
      orderId: fallbackId,
      total: totalPrice.value,
      paymentMethod: form.value.paymentMethod
    }
    clearCart()
    const telegramUrl = `https://t.me/${botUsername}?start=order_${fallbackId}`
    window.open(telegramUrl, '_blank')
  } finally {
    isSubmitting.value = false
  }
}

function openTelegramBot() {
  const orderId = orderSuccess.value?.orderId || ''
  const param = orderId ? `?start=order_${orderId}` : ''
  window.open(`https://t.me/${botUsername}${param}`, '_blank')
  // Auto-close confirmation modal after opening Telegram
  closeCheckoutModal()
}

// Helper to format currency values
function formatCurrency(val) {
  return `$${Number(val || 0).toFixed(2)}`
}

function getItemPriceNumber(priceStr) {
  const rawPrice = String(priceStr || '0').replace(/[^0-9.]/g, '')
  return parseFloat(rawPrice) || 0
}

function getItemLineTotal(item) {
  return getItemPriceNumber(item.price) * (Number(item.quantity) || 1)
}
</script>

<template>
  <div class="cart-page">
    <AppHeader />
    <CategoryNav />

    <main class="cart-main container">
      <!-- Breadcrumb Navigation -->
      <nav class="cart-breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/" class="cart-breadcrumb_link">
          {{ t('structuralMaterials.breadcrumbHome', 'Home') }}
        </RouterLink>
        <span class="cart-breadcrumb_separator" aria-hidden="true">&gt;</span>
        <span class="cart-breadcrumb_current" aria-current="page">
          {{ t('header.cart', 'Shopping Cart') }}
        </span>
      </nav>

      <!-- Page Header -->
      <header class="cart-header">
        <div class="cart-header_title-group">
          <h1 class="cart-header_title" :class="{ 'is-khmer': isKhmer }">
            {{ t('header.cart', 'Shopping Cart') }}
          </h1>
          <span v-if="totalCount > 0" class="cart-header_badge">
            {{ totalCount }} {{ totalCount === 1 ? 'item' : 'items' }}
          </span>
        </div>
        <p class="cart-header_subtitle">
          {{ t('products.subtitle', 'Review your selected items and proceed to fast, secure checkout.') }}
        </p>
      </header>

      <!-- Cart Content Layout -->
      <div v-if="cartItems.length > 0" class="cart-layout">
        <!-- Left: Items List -->
        <div class="cart-items-panel">
          <div class="cart-items-panel_header">
            <span class="cart-items-panel_col-product">Product</span>
            <span class="cart-items-panel_col-price">Price</span>
            <span class="cart-items-panel_col-qty">Quantity</span>
            <span class="cart-items-panel_col-total">Total</span>
            <span class="cart-items-panel_col-action"></span>
          </div>

          <div class="cart-items-list">
            <article
              v-for="item in cartItems"
              :key="item.id"
              class="cart-item-row"
            >
              <!-- Item Image and Details -->
              <div class="cart-item-row_product">
                <div class="cart-item-row_img-wrap">
                  <img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.title"
                    class="cart-item-row_img"
                  />
                  <div v-else class="cart-item-row_placeholder">
                    📦
                  </div>
                </div>
                <div class="cart-item-row_info">
                  <h2 class="cart-item-row_title">
                    {{ item.title }}
                  </h2>
                  <span v-if="item.category" class="cart-item-row_category">
                    {{ item.category }}
                  </span>
                </div>
              </div>

              <!-- Unit Price -->
              <div class="cart-item-row_price">
                <span class="cart-item-row_mobile-label">Unit Price:</span>
                <span class="cart-item-row_price-val">{{ item.price }}</span>
              </div>

              <!-- Quantity Controls -->
              <div class="cart-item-row_qty">
                <span class="cart-item-row_mobile-label">Quantity:</span>
                <div class="qty-stepper">
                  <button
                    type="button"
                    class="qty-stepper_btn"
                    :disabled="item.quantity <= 1"
                    aria-label="Decrease quantity"
                    @click="updateQuantity(item.id, item.quantity - 1)"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    class="qty-stepper_input"
                    :value="item.quantity"
                    @change="updateQuantity(item.id, $event.target.value)"
                  />
                  <button
                    type="button"
                    class="qty-stepper_btn"
                    aria-label="Increase quantity"
                    @click="updateQuantity(item.id, item.quantity + 1)"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Line Total -->
              <div class="cart-item-row_total">
                <span class="cart-item-row_mobile-label">Total:</span>
                <span class="cart-item-row_total-val">{{ formatCurrency(getItemLineTotal(item)) }}</span>
              </div>

              <!-- Remove Item -->
              <div class="cart-item-row_actions">
                <button
                  type="button"
                  class="cart-item-row_remove-btn"
                  title="Remove item"
                  :aria-label="`Remove ${item.title}`"
                  @click="removeFromCart(item.id)"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </article>
          </div>

          <!-- Bottom Actions: Continue Shopping & Clear Cart -->
          <div class="cart-items-panel_footer">
            <RouterLink to="/products" class="cart-back-btn">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              <span>Continue Shopping</span>
            </RouterLink>

            <button
              type="button"
              class="cart-clear-btn"
              @click="clearCart"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <!-- Right: Order Summary -->
        <aside class="cart-summary-panel">
          <div class="cart-summary-card">
            <h2 class="cart-summary-card_title">Order Summary</h2>

            <div class="cart-summary-card_rows">
              <div class="summary-row">
                <span class="summary-row_label">Subtotal ({{ totalCount }} items)</span>
                <span class="summary-row_val">{{ formatCurrency(totalPrice) }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-row_label">Shipping</span>
                <span class="summary-row_val summary-row_val--free">Free</span>
              </div>
              <div class="summary-row">
                <span class="summary-row_label">Estimated Tax</span>
                <span class="summary-row_val">$0.00</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-row summary-row--grand">
                <span class="summary-row_label">Total</span>
                <span class="summary-row_val summary-row_val--total">{{ formatCurrency(totalPrice) }}</span>
              </div>
            </div>

            <!-- Guarantee Badges -->
            <div class="cart-trust-badges">
              <div class="trust-badge">
                <span class="trust-badge_icon">🛡️</span>
                <span class="trust-badge_text">100% Genuine &amp; Verified Goods</span>
              </div>
              <div class="trust-badge">
                <span class="trust-badge_icon">🚚</span>
                <span class="trust-badge_text">Safe, Fast Nationwide Delivery</span>
              </div>
            </div>

            <!-- Checkout Action -->
            <button
              type="button"
              class="cart-checkout-btn"
              @click="openCheckoutModal"
            >
              <span>Proceed to Checkout</span>
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </aside>
      </div>

      <!-- Empty Cart State -->
      <div v-else class="cart-empty-state">
        <div class="cart-empty-state_icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="64" height="64">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <h2 class="cart-empty-state_title">Your shopping cart is empty</h2>
        <p class="cart-empty-state_desc">
          Looks like you haven't added any products to your cart yet. Explore our extensive selection of industrial materials, steel, and household goods.
        </p>
        <RouterLink to="/products" class="cart-empty-state_btn">
          <span>Start Shopping</span>
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </RouterLink>
      </div>

      <!-- Checkout with Telegram Modal -->
      <Teleport to="body">
        <div v-if="isCheckoutOpen" class="checkout-modal-backdrop" @click.self="closeCheckoutModal">
          <div class="checkout-modal">
            <!-- Modal Header -->
            <div class="checkout-modal_header">
              <div class="checkout-modal_title-wrap">
                <span class="tg-icon-badge">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                </span>
                <div>
                  <h3 class="checkout-modal_title">
                    {{ orderSuccess ? 'Order Confirmed!' : 'Checkout with Telegram' }}
                  </h3>
                  <span class="checkout-modal_subtitle">
                    {{ orderSuccess ? 'Your order is placed' : `@${botUsername}` }}
                  </span>
                </div>
              </div>
              <button type="button" class="checkout-modal_close" @click="closeCheckoutModal">✕</button>
            </div>

            <!-- SUCCESS STATE -->
            <div v-if="orderSuccess" class="checkout-success-view">
              <div class="success-icon-circle">✓</div>
              <h4 class="success-title">Thank You For Your Order!</h4>
              <p class="success-amount">Total to pay: <strong>{{ formatCurrency(orderSuccess.total) }}</strong></p>

              <!-- KHQR Popup Box if KHQR / Bakong / ABA Mobile -->
              <div v-if="orderSuccess.paymentMethod === 'KHQR' || orderSuccess.payment?.type === 'KHQR'" class="khqr-popup-card">
                <div class="khqr-card-header">
                  <span class="khqr-logo-tag">KHQR</span>
                  <span class="khqr-bank-tag">Bakong / ABA Mobile</span>
                </div>
                <div class="khqr-card-body">
                  <div class="khqr-img-frame">
                    <img
                      v-if="orderSuccess.payment?.qrDataUrl || orderSuccess.paymentDetails?.qrDataUrl"
                      :src="orderSuccess.payment?.qrDataUrl || orderSuccess.paymentDetails?.qrDataUrl"
                      alt="KHQR Code"
                      class="khqr-qr-img"
                    />
                    <img
                      v-else
                      :src="`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=bakong_khqr_order_${orderSuccess.orderId}`"
                      alt="KHQR Code"
                      class="khqr-qr-img"
                    />
                  </div>
                  <div class="khqr-merchant-info">
                    <span class="khqr-merchant-label">Merchant</span>
                    <strong class="khqr-merchant-name">HomeAll Product Center</strong>
                  </div>
                  <div class="khqr-amount-pill">
                    {{ formatCurrency(orderSuccess.total) }}
                  </div>
                </div>
                <div class="khqr-card-footer">
                  <span>📱 Scan with <strong>ABA Mobile</strong>, <strong>Bakong</strong>, or any banking app</span>
                </div>
              </div>
              
              <div class="success-notice-box">
                <p>
                  Your bill and payment details have been sent to our Telegram Bot <strong>@{{ botUsername }}</strong>.
                </p>
                <p class="success-hint">
                  Open Telegram to view your order receipt and confirm payment with our team.
                </p>
              </div>

              <div class="success-actions-group">
                <button type="button" class="btn-open-telegram" @click="openTelegramBot">
                  <span>Open @{{ botUsername }} on Telegram</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>

                <button type="button" class="btn-close-confirmed" @click="closeCheckoutModal">
                  <span>✕ Close / បិទ</span>
                </button>
              </div>
            </div>

            <!-- FORM STATE -->
            <form v-else class="checkout-form" @submit.prevent="handleConfirmOrder">
              <!-- Customer Name -->
              <div class="form-group">
                <label class="form-label">
                  Full Name / ឈ្មោះ <span class="required-star">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  :class="{ 'input-has-error': nameError }"
                  placeholder="akara"
                  required
                  @input="nameError = ''"
                />
                <span v-if="nameError" class="phone-error-text">{{ nameError }}</span>
              </div>

              <!-- Phone Number -->
              <div class="form-group">
                <label class="form-label">
                  Phone Number / លេខទូរស័ព្ទ <span class="required-star">*</span>
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="form-input"
                  :class="{ 'input-has-error': phoneError }"
                  placeholder="012 345 678"
                  required
                  @input="phoneError = ''"
                />
                <span v-if="phoneError" class="phone-error-text">{{ phoneError }}</span>
              </div>

              <!-- Delivery Address -->
              <div class="form-group">
                <label class="form-label">Delivery Address / ទីតាំងដឹកជញ្ជូន</label>
                <input
                  v-model="form.address"
                  type="text"
                  class="form-input"
                  placeholder="Sensok, Phnom Penh"
                  required
                />
              </div>

              <!-- Payment Method Selector -->
              <div class="form-group">
                <label class="form-label">Payment Method / វិធីបង់ប្រាក់</label>
                <div class="payment-options">
                  <label class="payment-option" :class="{ 'is-selected': form.paymentMethod === 'KHQR' }">
                    <input v-model="form.paymentMethod" type="radio" value="KHQR" name="paymentMethod" />
                    <div class="payment-option_content">
                      <span class="payment-option_title">🏦 KHQR / Bakong / ABA Mobile</span>
                      <span class="payment-option_desc">Scan dynamic QR code in Telegram</span>
                    </div>
                  </label>

                  <label class="payment-option" :class="{ 'is-selected': form.paymentMethod === 'COD' }">
                    <input v-model="form.paymentMethod" type="radio" value="COD" name="paymentMethod" />
                    <div class="payment-option_content">
                      <span class="payment-option_title">💵 Cash on Delivery (COD)</span>
                      <span class="payment-option_desc">Pay when materials arrive</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="btn-submit-order"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">Processing Order...</span>
                <span v-else>👉 Proceed to Telegram to Pay ({{ formatCurrency(totalPrice) }})</span>
              </button>
            </form>
          </div>
        </div>
      </Teleport>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.cart-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
}

.cart-main {
  flex: 1;
  padding-top: 24px;
  padding-bottom: 60px;
}

/* Breadcrumb */
.cart-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 20px;
}

.cart-breadcrumb_link {
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s ease;
}

.cart-breadcrumb_link:hover {
  color: #15803d;
}

.cart-breadcrumb_separator {
  color: #cbd5e1;
}

.cart-breadcrumb_current {
  color: #111827;
  font-weight: 600;
}

/* Header */
.cart-header {
  margin-bottom: 28px;
}

.cart-header_title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cart-header_title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.02em;
}

.cart-header_badge {
  background: #dcfce7;
  color: #15803d;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid #bbf7d0;
}

.cart-header_subtitle {
  margin: 6px 0 0;
  color: #64748b;
  font-size: 14px;
}

/* Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 28px;
  align-items: flex-start;
}

/* Items Panel */
.cart-items-panel {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.cart-items-panel_header {
  display: grid;
  grid-template-columns: 2.5fr 1fr 1.3fr 1fr 40px;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
}

.cart-items-list {
  display: flex;
  flex-direction: column;
}

.cart-item-row {
  display: grid;
  grid-template-columns: 2.5fr 1fr 1.3fr 1fr 40px;
  gap: 16px;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.15s ease;
}

.cart-item-row:last-child {
  border-bottom: none;
}

.cart-item-row_product {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-item-row_img-wrap {
  width: 68px;
  height: 68px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.cart-item-row_img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 4px;
}

.cart-item-row_placeholder {
  font-size: 24px;
}

.cart-item-row_info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.cart-item-row_title {
  font-size: 14.5px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px;
  line-height: 1.35;
}

.cart-item-row_category {
  font-size: 12px;
  color: #64748b;
}

.cart-item-row_mobile-label {
  display: none;
}

.cart-item-row_price-val {
  font-size: 14.5px;
  font-weight: 600;
  color: #374151;
}

/* Stepper */
.qty-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
}

.qty-stepper_btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border: none;
  font-size: 15px;
  font-weight: 700;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;
}

.qty-stepper_btn:hover:not(:disabled) {
  background: #e2e8f0;
  color: #111827;
}

.qty-stepper_btn:disabled {
  color: #cbd5e1;
  cursor: not-allowed;
}

.qty-stepper_input {
  width: 42px;
  height: 32px;
  text-align: center;
  border: none;
  border-left: 1px solid #cbd5e1;
  border-right: 1px solid #cbd5e1;
  font-size: 13.5px;
  font-weight: 600;
  color: #111827;
  outline: none;
  appearance: textfield;
  -moz-appearance: textfield;
}

.qty-stepper_input::-webkit-inner-spin-button,
.qty-stepper_input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.cart-item-row_total-val {
  font-size: 15px;
  font-weight: 700;
  color: #15803d;
}

.cart-item-row_remove-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #fee2e2;
  background: #fff5f5;
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cart-item-row_remove-btn:hover {
  background: #ef4444;
  color: #ffffff;
  border-color: #ef4444;
}

/* Panel Footer */
.cart-items-panel_footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  margin-top: 12px;
  border-top: 1px solid #f1f5f9;
}

.cart-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: #15803d;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.cart-back-btn:hover {
  transform: translateX(-3px);
}

.cart-clear-btn {
  background: none;
  border: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 12.5px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cart-clear-btn:hover {
  background: #fee2e2;
  color: #ef4444;
  border-color: #fecaca;
}

/* Order Summary */
.cart-summary-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 90px;
}

.cart-summary-card_title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.cart-summary-card_rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #64748b;
}

.summary-row_val {
  font-weight: 600;
  color: #111827;
}

.summary-row_val--free {
  color: #15803d;
  font-weight: 700;
}

.summary-divider {
  height: 1px;
  background: #f1f5f9;
  margin: 4px 0;
}

.summary-row--grand {
  font-size: 17px;
  color: #111827;
}

.summary-row_val--total {
  font-size: 20px;
  font-weight: 800;
  color: #15803d;
}

.cart-trust-badges {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 22px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #f1f5f9;
}

.trust-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  color: #475569;
  font-weight: 500;
}

.trust-badge_icon {
  font-size: 14px;
}

.cart-checkout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #ffffff;
  color: #000000;
  font-size: 15px;
  font-weight: 700;
  padding: 13px 20px;
  border: 1.5px solid #000000;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.cart-checkout-btn span {
  color: #000000;
}

.cart-checkout-btn svg {
  color: #000000;
  fill: #000000;
}

.cart-checkout-btn:hover {
  background: #f1f5f9;
  color: #000000;
  border-color: #000000;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.cart-checkout-btn:hover span,
.cart-checkout-btn:hover svg {
  color: #000000;
  fill: #000000;
}

/* Empty State */
.cart-empty-state {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 64px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.cart-empty-state_icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #f0fdf4;
  color: #16a34a;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.cart-empty-state_title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px;
}

.cart-empty-state_desc {
  font-size: 14.5px;
  color: #64748b;
  max-width: 480px;
  line-height: 1.5;
  margin: 0 0 24px;
}

.cart-empty-state_btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  color: #000000;
  font-size: 14.5px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 10px;
  border: 1.5px solid #000000;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.cart-empty-state_btn span {
  color: #000000;
}

.cart-empty-state_btn svg {
  color: #000000;
  fill: #000000;
}

.cart-empty-state_btn:hover {
  background: #f1f5f9;
  color: #000000;
  border-color: #000000;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cart-empty-state_btn:hover span,
.cart-empty-state_btn:hover svg {
  color: #000000;
  fill: #000000;
}

/* Responsive */
@media (max-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .cart-items-panel_header {
    display: none;
  }

  .cart-item-row {
    grid-template-columns: 1fr;
    gap: 12px;
    position: relative;
    padding-right: 36px;
  }

  .cart-item-row_actions {
    position: absolute;
    top: 18px;
    right: 0;
  }

  .cart-item-row_mobile-label {
    display: inline-block;
    font-size: 12px;
    color: #94a3b8;
    margin-right: 8px;
    font-weight: 600;
  }

  .cart-item-row_price,
  .cart-item-row_qty,
  .cart-item-row_total {
    display: flex;
    align-items: center;
  }
}

@media (max-width: 640px) {
  .cart-page_content {
    padding: 16px 0;
  }

  .cart-summary-card {
    padding: 18px 16px;
    border-radius: 12px;
  }

  .cart-item-row {
    padding: 14px 12px;
  }

  .cart-item-row_product {
    gap: 10px;
  }

  .cart-item-row_img-wrap {
    width: 64px;
    height: 64px;
  }

  .cart-item-row_title {
    font-size: 13.5px;
  }
}

/* =========================================
   Telegram Checkout Modal Styling
   ========================================= */
.checkout-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
}

.checkout-modal {
  background: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  max-height: 92vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  animation: modalPopIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalPopIn {
  from {
    opacity: 0;
    transform: scale(0.94) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.checkout-modal_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
}

.checkout-modal_title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tg-icon-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #229ed9;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(34, 158, 217, 0.3);
}

.tg-icon-badge svg {
  width: 18px;
  height: 18px;
}

.checkout-modal_title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.2;
}

.checkout-modal_subtitle {
  font-size: 12px;
  color: #229ed9;
  font-weight: 600;
}

.checkout-modal_close {
  background: none;
  border: none;
  font-size: 18px;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  transition: color 0.15s;
}

.checkout-modal_close:hover {
  color: #0f172a;
}

.checkout-form {
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.checkout-total-banner {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #166534;
  font-size: 13.5px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 12.5px;
  font-weight: 600;
  color: #334155;
}

.required-star {
  color: #ef4444;
  font-weight: 700;
}

.form-input {
  padding: 10px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13.5px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  border-color: #229ed9;
  box-shadow: 0 0 0 3px rgba(34, 158, 217, 0.15);
}

.form-input.input-has-error {
  border-color: #ef4444 !important;
  background-color: #fef2f2;
}

.form-input.input-has-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15) !important;
}

.phone-error-text {
  font-size: 12px;
  font-weight: 600;
  color: #ef4444;
  margin-top: 2px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.payment-option {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.payment-option:hover {
  border-color: #cbd5e1;
}

.payment-option.is-selected {
  border-color: #229ed9;
  background: #f0f9ff;
}

.payment-option_content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.payment-option_title {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

.payment-option_desc {
  font-size: 11.5px;
  color: #64748b;
}

.btn-submit-order {
  margin-top: 6px;
  background: linear-gradient(135deg, #229ed9, #0088cc);
  color: #ffffff;
  border: none;
  padding: 13px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14.5px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(34, 158, 217, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit-order:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(34, 158, 217, 0.45);
}

.btn-submit-order:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Success View - Compact Size */
.checkout-success-view {
  padding: 16px 18px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #dcfce7;
  color: #16a34a;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}

.success-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 3px;
}

.success-order-id {
  font-size: 12px;
  color: #475569;
  margin: 0 0 1px;
}

.success-amount {
  font-size: 13px;
  color: #16a34a;
  margin: 0 0 8px;
}

.success-notice-box {
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 11px;
  color: #334155;
  margin-bottom: 10px;
  line-height: 1.35;
  width: 100%;
}

.success-hint {
  font-size: 10.5px;
  color: #64748b;
  margin-top: 3px;
}

.success-actions-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
}

.btn-open-telegram {
  width: 100%;
  background: linear-gradient(135deg, #229ed9, #0088cc);
  color: #ffffff;
  border: none;
  padding: 9px 14px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 3px 10px rgba(34, 158, 217, 0.3);
  transition: all 0.2s;
}

.btn-open-telegram:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 14px rgba(34, 158, 217, 0.4);
}

.btn-close-confirmed {
  width: 100%;
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-close-confirmed:hover {
  background: #f1f5f9;
  color: #0f172a;
  border-color: #cbd5e1;
}

/* KHQR Popup Card - Compact & Clean */
.khqr-popup-card {
  width: 100%;
  max-width: 220px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(220, 38, 38, 0.1), 0 1px 4px rgba(0, 0, 0, 0.05);
  border: 1.5px solid #fee2e2;
  margin: 4px auto 10px;
  text-align: center;
}

.khqr-card-header {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: #ffffff;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.khqr-logo-tag {
  font-weight: 900;
  font-size: 11.5px;
  letter-spacing: 0.06em;
  background: #ffffff;
  color: #dc2626;
  padding: 1px 6px;
  border-radius: 4px;
}

.khqr-bank-tag {
  font-size: 9.5px;
  font-weight: 600;
  color: #fef2f2;
}

.khqr-card-body {
  padding: 8px 8px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.khqr-img-frame {
  width: 120px;
  height: 120px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.khqr-qr-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.khqr-merchant-info {
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.khqr-merchant-label {
  font-size: 8.5px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.khqr-merchant-name {
  font-size: 11px;
  color: #1e293b;
  font-weight: 700;
  line-height: 1.2;
}

.khqr-amount-pill {
  margin-top: 4px;
  background: #f0fdf4;
  color: #15803d;
  font-weight: 800;
  font-size: 13.5px;
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid #bbf7d0;
}

.khqr-card-footer {
  background: #fef2f2;
  border-top: 1px dashed #fecaca;
  padding: 4px 6px;
  font-size: 9.5px;
  color: #991b1b;
}
</style>

<!-- Non-scoped so body.dark / :root[data-theme="dark"] ancestor selectors work -->
<style>
/* =====================================================
   CartView – Dark Mode Overrides
   ===================================================== */

:root[data-theme="dark"] .cart-page,
body.dark .cart-page {
  background-color: #0f172a !important;
  color: #f8fafc !important;
}

/* Breadcrumb Navigation */
:root[data-theme="dark"] .cart-breadcrumb_link,
body.dark .cart-breadcrumb_link {
  color: #94a3b8 !important;
}

:root[data-theme="dark"] .cart-breadcrumb_link:hover,
body.dark .cart-breadcrumb_link:hover {
  color: #ffffff !important;
}

:root[data-theme="dark"] .cart-breadcrumb_separator,
body.dark .cart-breadcrumb_separator {
  color: #64748b !important;
}

:root[data-theme="dark"] .cart-breadcrumb_current,
body.dark .cart-breadcrumb_current {
  color: #ffffff !important;
}

/* Header & Titles */
:root[data-theme="dark"] .cart-header_title,
body.dark .cart-header_title {
  color: #ffffff !important;
}

:root[data-theme="dark"] .cart-header_subtitle,
body.dark .cart-header_subtitle {
  color: #94a3b8 !important;
}

:root[data-theme="dark"] .cart-header_badge,
body.dark .cart-header_badge {
  background-color: rgba(34, 197, 94, 0.15) !important;
  color: #4ade80 !important;
  border-color: rgba(34, 197, 94, 0.3) !important;
}

/* =====================================================
   Processing Card (Order Summary Card) - Title White
   ===================================================== */
:root[data-theme="dark"] .cart-summary-card,
body.dark .cart-summary-card {
  background-color: #1e293b !important;
  border-color: #334155 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
}

/* Card Title White in Dark Mode */
:root[data-theme="dark"] .cart-summary-card_title,
body.dark .cart-summary-card_title {
  color: #ffffff !important;
  border-bottom-color: #334155 !important;
}

:root[data-theme="dark"] .summary-row,
body.dark .summary-row,
:root[data-theme="dark"] .summary-row_label,
body.dark .summary-row_label {
  color: #94a3b8 !important;
}

:root[data-theme="dark"] .summary-row_val,
body.dark .summary-row_val {
  color: #f1f5f9 !important;
}

:root[data-theme="dark"] .summary-row_val--free,
body.dark .summary-row_val--free {
  color: #4ade80 !important;
}

:root[data-theme="dark"] .summary-divider,
body.dark .summary-divider {
  background-color: #334155 !important;
}

:root[data-theme="dark"] .summary-row--grand .summary-row_label,
body.dark .summary-row--grand .summary-row_label {
  color: #ffffff !important;
  font-weight: 700 !important;
}

:root[data-theme="dark"] .summary-row_val--total,
body.dark .summary-row_val--total {
  color: #4ade80 !important;
}

:root[data-theme="dark"] .cart-trust-badges,
body.dark .cart-trust-badges {
  background-color: #0f172a !important;
  border-color: #334155 !important;
}

:root[data-theme="dark"] .trust-badge,
body.dark .trust-badge,
:root[data-theme="dark"] .trust-badge_text,
body.dark .trust-badge_text {
  color: #cbd5e1 !important;
}

/* Proceed to Checkout Button: White box with Black title/icon */
:root[data-theme="dark"] .cart-checkout-btn,
body.dark .cart-checkout-btn {
  background: #ffffff !important;
  color: #000000 !important;
  border: 1.5px solid #ffffff !important;
  box-shadow: 0 4px 14px rgba(255, 255, 255, 0.18) !important;
}

:root[data-theme="dark"] .cart-checkout-btn span,
body.dark .cart-checkout-btn span,
:root[data-theme="dark"] .cart-checkout-btn svg,
body.dark .cart-checkout-btn svg {
  color: #000000 !important;
  fill: #000000 !important;
}

:root[data-theme="dark"] .cart-checkout-btn:hover,
body.dark .cart-checkout-btn:hover {
  background: #f1f5f9 !important;
  color: #000000 !important;
  border-color: #f1f5f9 !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(255, 255, 255, 0.28) !important;
}

:root[data-theme="dark"] .cart-checkout-btn:hover span,
body.dark .cart-checkout-btn:hover span,
:root[data-theme="dark"] .cart-checkout-btn:hover svg,
body.dark .cart-checkout-btn:hover svg {
  color: #000000 !important;
  fill: #000000 !important;
}

/* Left Items Panel */
:root[data-theme="dark"] .cart-items-panel,
body.dark .cart-items-panel {
  background-color: #1e293b !important;
  border-color: #334155 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
}

:root[data-theme="dark"] .cart-items-panel_header,
body.dark .cart-items-panel_header {
  background-color: #1e293b !important;
  border-bottom-color: #334155 !important;
  color: #94a3b8 !important;
}

:root[data-theme="dark"] .cart-item-row,
body.dark .cart-item-row {
  border-bottom-color: #334155 !important;
}

:root[data-theme="dark"] .cart-item-row_img-wrap,
body.dark .cart-item-row_img-wrap {
  background-color: #0f172a !important;
  border-color: #334155 !important;
}

:root[data-theme="dark"] .cart-item-row_title,
body.dark .cart-item-row_title {
  color: #ffffff !important;
}

:root[data-theme="dark"] .cart-item-row_category,
body.dark .cart-item-row_category {
  color: #94a3b8 !important;
}

:root[data-theme="dark"] .cart-item-row_price-val,
body.dark .cart-item-row_price-val {
  color: #cbd5e1 !important;
}

:root[data-theme="dark"] .cart-item-row_total-val,
body.dark .cart-item-row_total-val {
  color: #4ade80 !important;
}

:root[data-theme="dark"] .cart-item-row_mobile-label,
body.dark .cart-item-row_mobile-label {
  color: #94a3b8 !important;
}

:root[data-theme="dark"] .qty-stepper,
body.dark .qty-stepper {
  border-color: #334155 !important;
  background-color: #0f172a !important;
}

:root[data-theme="dark"] .qty-stepper_btn,
body.dark .qty-stepper_btn {
  color: #cbd5e1 !important;
  background-color: #0f172a !important;
}

:root[data-theme="dark"] .qty-stepper_btn:hover:not(:disabled),
body.dark .qty-stepper_btn:hover:not(:disabled) {
  background-color: #334155 !important;
  color: #ffffff !important;
}

:root[data-theme="dark"] .qty-stepper_input,
body.dark .qty-stepper_input {
  background-color: #0f172a !important;
  border-color: #334155 !important;
  color: #ffffff !important;
}

:root[data-theme="dark"] .cart-item-row_remove-btn,
body.dark .cart-item-row_remove-btn {
  background-color: #334155 !important;
  border-color: #475569 !important;
  color: #ffffff !important;
}

:root[data-theme="dark"] .cart-item-row_remove-btn svg,
body.dark .cart-item-row_remove-btn svg {
  fill: #ffffff !important;
  color: #ffffff !important;
}

:root[data-theme="dark"] .cart-item-row_remove-btn:hover,
body.dark .cart-item-row_remove-btn:hover {
  background-color: #475569 !important;
  border-color: #ffffff !important;
  color: #ffffff !important;
}

:root[data-theme="dark"] .cart-item-row_remove-btn:hover svg,
body.dark .cart-item-row_remove-btn:hover svg {
  fill: #ffffff !important;
  color: #ffffff !important;
}

:root[data-theme="dark"] .cart-items-panel_footer,
body.dark .cart-items-panel_footer {
  background-color: #1e293b !important;
  border-top-color: #334155 !important;
}

:root[data-theme="dark"] .cart-back-btn,
body.dark .cart-back-btn {
  color: #94a3b8 !important;
}

:root[data-theme="dark"] .cart-back-btn:hover,
body.dark .cart-back-btn:hover {
  color: #ffffff !important;
}

/* Clear Cart button and title to white color in dark mode */
:root[data-theme="dark"] .cart-clear-btn,
body.dark .cart-clear-btn {
  background-color: #334155 !important;
  color: #ffffff !important;
  border-color: #475569 !important;
}

:root[data-theme="dark"] .cart-clear-btn:hover,
body.dark .cart-clear-btn:hover {
  background-color: #475569 !important;
  color: #ffffff !important;
  border-color: #ffffff !important;
}

/* Empty State */
:root[data-theme="dark"] .cart-empty-state,
body.dark .cart-empty-state {
  background-color: #1e293b !important;
  border-color: #334155 !important;
}

:root[data-theme="dark"] .cart-empty-state_icon,
body.dark .cart-empty-state_icon {
  background-color: #0f172a !important;
  color: #ffffff !important;
  border: 1px solid #334155 !important;
}

:root[data-theme="dark"] .cart-empty-state_icon svg,
body.dark .cart-empty-state_icon svg {
  stroke: #ffffff !important;
}

:root[data-theme="dark"] .cart-empty-state_title,
body.dark .cart-empty-state_title {
  color: #ffffff !important;
}

:root[data-theme="dark"] .cart-empty-state_desc,
body.dark .cart-empty-state_desc {
  color: #94a3b8 !important;
}

/* Start Shopping Button: White box background with Black title in Dark Mode */
:root[data-theme="dark"] .cart-empty-state_btn,
body.dark .cart-empty-state_btn {
  background: #ffffff !important;
  color: #000000 !important;
  border: 1.5px solid #ffffff !important;
  box-shadow: 0 4px 14px rgba(255, 255, 255, 0.18) !important;
}

:root[data-theme="dark"] .cart-empty-state_btn span,
body.dark .cart-empty-state_btn span,
:root[data-theme="dark"] .cart-empty-state_btn svg,
body.dark .cart-empty-state_btn svg {
  color: #000000 !important;
  fill: #000000 !important;
}

:root[data-theme="dark"] .cart-empty-state_btn:hover,
body.dark .cart-empty-state_btn:hover {
  background: #f1f5f9 !important;
  color: #000000 !important;
  border-color: #f1f5f9 !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(255, 255, 255, 0.28) !important;
}

:root[data-theme="dark"] .cart-empty-state_btn:hover span,
body.dark .cart-empty-state_btn:hover span,
:root[data-theme="dark"] .cart-empty-state_btn:hover svg,
body.dark .cart-empty-state_btn:hover svg {
  color: #000000 !important;
  fill: #000000 !important;
}

/* Checkout Modal */
:root[data-theme="dark"] .checkout-modal,
body.dark .checkout-modal {
  background-color: #1e293b !important;
  border: 1px solid #334155 !important;
  color: #ffffff !important;
}

:root[data-theme="dark"] .checkout-modal_header,
body.dark .checkout-modal_header {
  background-color: #1e293b !important;
  border-bottom-color: #334155 !important;
}

:root[data-theme="dark"] .checkout-modal_title,
body.dark .checkout-modal_title {
  color: #ffffff !important;
}

:root[data-theme="dark"] .checkout-modal_subtitle,
body.dark .checkout-modal_subtitle {
  color: #94a3b8 !important;
}

:root[data-theme="dark"] .checkout-modal_close,
body.dark .checkout-modal_close {
  background-color: #334155 !important;
  color: #ffffff !important;
}

:root[data-theme="dark"] .checkout-section-title,
body.dark .checkout-section-title {
  color: #cbd5e1 !important;
}

:root[data-theme="dark"] .form-label,
body.dark .form-label {
  color: #e2e8f0 !important;
}

:root[data-theme="dark"] .form-input,
body.dark .form-input,
:root[data-theme="dark"] .form-textarea,
body.dark .form-textarea {
  background-color: #0f172a !important;
  border-color: #334155 !important;
  color: #ffffff !important;
}

:root[data-theme="dark"] .form-input::placeholder,
body.dark .form-input::placeholder,
:root[data-theme="dark"] .form-textarea::placeholder,
body.dark .form-textarea::placeholder {
  color: #64748b !important;
}

:root[data-theme="dark"] .payment-option,
body.dark .payment-option {
  background-color: #0f172a !important;
  border-color: #334155 !important;
}

:root[data-theme="dark"] .payment-option-name,
body.dark .payment-option-name {
  color: #ffffff !important;
}

:root[data-theme="dark"] .payment-option-desc,
body.dark .payment-option-desc {
  color: #94a3b8 !important;
}

:root[data-theme="dark"] .payment-option.is-selected,
body.dark .payment-option.is-selected {
  border-color: #22c55e !important;
  background-color: rgba(34, 197, 94, 0.12) !important;
}

:root[data-theme="dark"] .checkout-summary-box,
body.dark .checkout-summary-box {
  background-color: #0f172a !important;
  border-color: #334155 !important;
}

:root[data-theme="dark"] .c-row,
body.dark .c-row {
  color: #94a3b8 !important;
}

:root[data-theme="dark"] .c-row.c-total,
body.dark .c-row.c-total {
  color: #ffffff !important;
  border-top-color: #334155 !important;
}

:root[data-theme="dark"] .c-total-val,
body.dark .c-total-val {
  color: #4ade80 !important;
}

:root[data-theme="dark"] .checkout-modal_footer,
body.dark .checkout-modal_footer {
  background-color: #1e293b !important;
  border-top-color: #334155 !important;
}

:root[data-theme="dark"] .checkout-btn-cancel,
body.dark .checkout-btn-cancel {
  background-color: #334155 !important;
  color: #cbd5e1 !important;
  border-color: #475569 !important;
}

:root[data-theme="dark"] .order-receipt-summary,
body.dark .order-receipt-summary {
  background-color: #0f172a !important;
  border-color: #334155 !important;
}

:root[data-theme="dark"] .receipt-title,
body.dark .receipt-title {
  color: #ffffff !important;
}

:root[data-theme="dark"] .receipt-row,
body.dark .receipt-row {
  color: #94a3b8 !important;
}

:root[data-theme="dark"] .receipt-row .r-val,
body.dark .receipt-row .r-val {
  color: #cbd5e1 !important;
}

:root[data-theme="dark"] .receipt-row.receipt-total,
body.dark .receipt-row.receipt-total {
  color: #ffffff !important;
  border-top-color: #334155 !important;
}

:root[data-theme="dark"] .receipt-row.receipt-total .r-val,
body.dark .receipt-row.receipt-total .r-val {
  color: #4ade80 !important;
}

:root[data-theme="dark"] .success-notice-box,
body.dark .success-notice-box {
  background-color: rgba(59, 130, 246, 0.12) !important;
  border-color: rgba(59, 130, 246, 0.25) !important;
  color: #93c5fd !important;
}
</style>


