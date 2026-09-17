/**
 * Telegram utility helpers
 */

/**
 * Returns a direct Telegram chat URL for a phone number or username.
 * For Cambodian numbers (e.g., '0978290427' or '097 829 0427'),
 * it converts to international format '+855978290427'.
 *
 * @param {string} phoneOrUser - Phone number or Telegram username
 * @returns {string} URL to open Telegram chat
 */
export function getTelegramLink(phoneOrUser = '0978290427') {
  if (!phoneOrUser) return 'https://t.me/'
  if (phoneOrUser.startsWith('http://') || phoneOrUser.startsWith('https://')) {
    return phoneOrUser
  }

  const cleaned = phoneOrUser.replace(/[^\d+]/g, '')
  if (cleaned.length > 0) {
    const intlPhone = cleaned.startsWith('+')
      ? cleaned
      : cleaned.startsWith('855')
        ? `+${cleaned}`
        : `+855${cleaned.replace(/^0/, '')}`
    return `https://t.me/${intlPhone}`
  }

  return `https://t.me/${phoneOrUser.replace(/^@/, '')}`
}

/**
 * Opens Telegram in a new browser window/tab or app.
 *
 * @param {string} phoneOrUser - Phone number or Telegram username
 * @returns {string} The opened URL
 */
export function openTelegram(phoneOrUser = '0978290427') {
  const url = getTelegramLink(phoneOrUser)
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  return url
}

