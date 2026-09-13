<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useCart } from '@/composables/useCart'
import { useI18n } from '@/composables/useI18n'

const { t, isKhmer } = useI18n()
const {
  cartItems,
  totalCount,
  totalPrice,
  updateQuantity,
  removeFromCart,
  clearCart
} = useCart()

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
  background: linear-gradient(135deg, #16a34a, #15803d);
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  padding: 13px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(22, 163, 74, 0.3);
  transition: all 0.2s ease;
}

.cart-checkout-btn:hover {
  background: linear-gradient(135deg, #15803d, #166534);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(22, 163, 74, 0.4);
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
  background: linear-gradient(135deg, #16a34a, #15803d);
  color: #ffffff;
  font-size: 14.5px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
  transition: all 0.2s ease;
}

.cart-empty-state_btn:hover {
  background: linear-gradient(135deg, #15803d, #166534);
  transform: translateY(-2px);
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
</style>

