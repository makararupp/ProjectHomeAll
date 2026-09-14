import { ref, computed } from 'vue'

// Module-level singleton state so all components share the exact same wishlist state
const wishlistItems = ref([])
const toastMessage = ref('')
const isToastVisible = ref(false)
let toastTimer = null

// Restore wishlist from localStorage on initialize
try {
  const saved = localStorage.getItem('homeall_wishlist_items')
  if (saved) {
    wishlistItems.value = JSON.parse(saved)
  }
} catch (e) {
  console.warn('Could not restore wishlist from localStorage', e)
}

function saveWishlist() {
  try {
    localStorage.setItem('homeall_wishlist_items', JSON.stringify(wishlistItems.value))
  } catch (e) {
    console.warn('Could not save wishlist to localStorage', e)
  }
}

function showWishlistToast(message) {
  if (toastTimer) clearTimeout(toastTimer)
  toastMessage.value = message
  isToastVisible.value = true
  toastTimer = setTimeout(() => {
    isToastVisible.value = false
  }, 3000)
}

export function useWishlist() {
  const wishlistCount = computed(() => wishlistItems.value.length)

  function isInWishlist(productId) {
    return wishlistItems.value.some((item) => item.id === productId)
  }

  function addToWishlist(product) {
    if (!product || !product.id) return
    const exists = wishlistItems.value.find((item) => item.id === product.id)
    if (!exists) {
      wishlistItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category || 'General',
        addedAt: new Date().toISOString()
      })
      saveWishlist()
      showWishlistToast(`"${product.name}" added to wishlist`)
    }
  }

  function removeFromWishlist(productId) {
    const idx = wishlistItems.value.findIndex((item) => item.id === productId)
    if (idx !== -1) {
      const removed = wishlistItems.value.splice(idx, 1)[0]
      saveWishlist()
      showWishlistToast(`"${removed.name}" removed from wishlist`)
    }
  }

  function toggleWishlist(product) {
    if (!product || !product.id) return
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  function clearWishlist() {
    wishlistItems.value = []
    saveWishlist()
  }

  return {
    wishlistItems,
    wishlistCount,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    toastMessage,
    isToastVisible
  }
}

