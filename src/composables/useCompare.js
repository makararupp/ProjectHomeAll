import { ref, computed } from 'vue'

// Module-level singleton state so all components share the exact same compare state
const compareItems = ref([])
const toastMessage = ref('')
const isToastVisible = ref(false)
let toastTimer = null

// Restore compare items from localStorage on initialize
try {
  const saved = localStorage.getItem('homeall_compare_items')
  if (saved) {
    compareItems.value = JSON.parse(saved)
  }
} catch (e) {
  console.warn('Could not restore compare items from localStorage', e)
}

function saveCompare() {
  try {
    localStorage.setItem('homeall_compare_items', JSON.stringify(compareItems.value))
  } catch (e) {
    console.warn('Could not save compare items to localStorage', e)
  }
}

function showCompareToast(message) {
  if (toastTimer) clearTimeout(toastTimer)
  toastMessage.value = message
  isToastVisible.value = true
  toastTimer = setTimeout(() => {
    isToastVisible.value = false
  }, 3000)
}

export function useCompare() {
  const compareCount = computed(() => compareItems.value.length)

  function isInCompare(productId) {
    return compareItems.value.some((item) => item.id === productId)
  }

  function addToCompare(product) {
    if (!product || !product.id) return
    const exists = compareItems.value.find((item) => item.id === product.id)
    if (!exists) {
      compareItems.value.push({
        id: product.id,
        name: product.name || product.title,
        title: product.title || product.name,
        price: product.price,
        image: product.image,
        category: product.category || 'General',
        brand: product.brand || '',
        addedAt: new Date().toISOString()
      })
      saveCompare()
      showCompareToast(`"${product.title || product.name}" added to comparison`)
    }
  }

  function removeFromCompare(productId) {
    const idx = compareItems.value.findIndex((item) => item.id === productId)
    if (idx !== -1) {
      const removed = compareItems.value.splice(idx, 1)[0]
      saveCompare()
      showCompareToast(`"${removed.title || removed.name}" removed from comparison`)
    }
  }

  function toggleCompare(product) {
    if (!product || !product.id) return
    if (isInCompare(product.id)) {
      removeFromCompare(product.id)
    } else {
      addToCompare(product)
    }
  }

  function clearCompare() {
    compareItems.value = []
    saveCompare()
  }

  return {
    compareItems,
    compareCount,
    isInCompare,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    toastMessage,
    isToastVisible
  }
}

