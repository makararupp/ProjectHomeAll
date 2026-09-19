import { ref, computed } from 'vue'

const tg = typeof window !== 'undefined' && window.Telegram?.WebApp ? window.Telegram.WebApp : null

export function useTelegram() {
  const isAvailable = computed(() => !!tg && !!tg.initData)

  // Telegram User info passed by Telegram client
  const user = computed(() => tg?.initDataUnsafe?.user || null)

  // Expand the Mini App to full screen when launched
  function init() {
    if (tg) {
      try {
        tg.ready()
        tg.expand()
      } catch (err) {
        console.warn('Telegram WebApp init error:', err)
      }
    }
  }

  // Close the Mini App
  function close() {
    if (tg) tg.close()
  }

  // Trigger tactile vibration on user's device
  function haptic(type = 'success') {
    if (tg?.HapticFeedback) {
      if (type === 'success' || type === 'error' || type === 'warning') {
        tg.HapticFeedback.notificationOccurred(type)
      } else {
        tg.HapticFeedback.impactOccurred('medium')
      }
    }
  }

  // Submit Order to backend API
  async function submitOrder(orderData) {
    // Use relative '/api/orders' so Vite proxy forwards it seamlessly from any LAN device (192.168.x.x or localhost)
    const backendEnv = import.meta.env.VITE_BACKEND_URL
    const endpoint = (backendEnv && !backendEnv.includes('localhost'))
      ? `${backendEnv}/api/orders`
      : '/api/orders'

    const payload = {
      ...orderData,
      telegramChatId: user.value?.id,
      telegramUser: user.value
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.success) {
        haptic('success')
      }
      return data
    } catch (err) {
      console.error('Failed to submit order to backend:', err)
      return { success: false, error: err.message }
    }
  }

  return {
    tg,
    isAvailable,
    user,
    init,
    close,
    haptic,
    submitOrder
  }
}

