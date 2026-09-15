import { ref, computed } from 'vue'

// Module-level singleton state so all components share the exact same cart state
const cartItems = ref([])
const isCartBumping = ref(false)
const toastMessage = ref('')
const isToastVisible = ref(false)
let toastTimer = null
let bumpTimer = null

// Restore cart from localStorage on initialize
try {
  const saved = localStorage.getItem('homeall_cart_items')
  if (saved) {
    cartItems.value = JSON.parse(saved)
  }
} catch (e) {
  console.warn('Could not restore cart from localStorage', e)
}

function saveCart() {
  try {
    localStorage.setItem('homeall_cart_items', JSON.stringify(cartItems.value))
  } catch (e) {
    console.warn('Could not save cart to localStorage', e)
  }
}

function triggerBump() {
  if (bumpTimer) clearTimeout(bumpTimer)
  isCartBumping.value = true
  bumpTimer = setTimeout(() => {
    isCartBumping.value = false
  }, 450)
}

function showCartToast(message) {
  if (toastTimer) clearTimeout(toastTimer)
  toastMessage.value = message
  isToastVisible.value = true
  toastTimer = setTimeout(() => {
    isToastVisible.value = false
  }, 3200)
}

function hideCartToast() {
  if (toastTimer) clearTimeout(toastTimer)
  isToastVisible.value = false
}

export function useCart() {
  // Total quantity of all items in cart
  const totalCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
  })

  // Total price in USD calculated from price string
  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => {
      const rawPrice = String(item.price || '0').replace(/[^0-9.]/g, '')
      const num = parseFloat(rawPrice) || 0
      return sum + num * (Number(item.quantity) || 1)
    }, 0)
  })

  function addToCart(product, quantity = 1) {
    if (!product || product.inStock === false) return

    const qty = Math.max(1, parseInt(quantity, 10) || 1)
    const existingIndex = cartItems.value.findIndex(item => item.id === product.id)

    if (existingIndex > -1) {
      cartItems.value[existingIndex].quantity = (cartItems.value[existingIndex].quantity || 1) + qty
    } else {
      cartItems.value.push({
        id: product.id,
        title: product.title,
        category: product.category || product.itemGroup || '',
        price: product.price,
        unit: product.unit || '',
        image: product.image,
        quantity: qty
      })
    }

    saveCart()
    triggerBump()
    showCartToast(product.title ? `${product.title} (x${qty})` : `Added ${qty} item(s) to cart`)
  }

  function updateQuantity(productId, newQty) {
    const item = cartItems.value.find(i => i.id === productId)
    if (item) {
      if (newQty <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = Math.max(1, parseInt(newQty, 10) || 1)
        saveCart()
        triggerBump()
      }
    }
  }

  function removeFromCart(productId) {
    cartItems.value = cartItems.value.filter(item => item.id !== productId)
    saveCart()
  }

  function clearCart() {
    cartItems.value = []
    saveCart()
  }

  return {
    cartItems,
    totalCount,
    totalPrice,
    isCartBumping,
    toastMessage,
    isToastVisible,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    showCartToast,
    hideCartToast
  }
}

