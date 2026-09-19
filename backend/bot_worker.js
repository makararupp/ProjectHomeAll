import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import QRCode from 'qrcode'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '.env') })

const token = process.env.TELEGRAM_BOT_TOKEN
const miniAppUrl = process.env.MINI_APP_URL || 'http://localhost:5173'
const adminChatId = process.env.ADMIN_CHAT_ID

if (!token) {
  console.warn('\n⚠️ [HomeAll Bot Worker] TELEGRAM_BOT_TOKEN is not set in backend/.env')
  console.warn('👉 Please open backend/.env and paste your bot token from @BotFather.\n')
}

// Initialize Telegram Bot with Long Polling
export const bot = token
  ? new TelegramBot(token, {
      polling: {
        interval: 300,
        autoStart: true,
        params: { timeout: 10 }
      }
    })
  : null

// Store Information
export const shopInfo = {
  name: 'HomeAll Product Center',
  nameKm: 'មជ្ឈមណ្ឌលផលិតផល HomeAll',
  bio: 'Building Materials & Home Improvement Center',
  description:
    'Your trusted supplier for top-quality construction materials, sanitary ware, toilets, sinks, bricks, roof tiles, water pipes, PVC fittings, and hardware tools in Cambodia at factory-direct prices.',
  descriptionKm:
    'ប្រភពផ្គត់ផ្គង់សម្ភារៈសំណង់ គ្រឿងបរិក្ខារបន្ទប់ទឹក បង្គន់ ឡាបូ ឥដ្ឋ ក្បឿង បំពង់ទឹក និងឧបករណ៍ជាងគុណភាពខ្ពស់ តម្លៃពីរោងចក្រផ្ទាល់។',
  phone: '012 345 678 / 098 765 432',
  telegram: '@HomeAllSupport',
  location: process.env.STORE_LOCATION || 'Tolaka St, Krong Siem Reap 171201',
  bannerUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80'
}

// Process error safety handlers to prevent server crashes
process.on('uncaughtException', (err) => {
  console.error('⚠️ [Bot Worker Exception]:', err.message || err)
})
process.on('unhandledRejection', (reason) => {
  console.error('⚠️ [Bot Worker Rejection]:', reason?.message || reason)
})

// Helper: Telegram strictly requires a valid HTTPS public URL for web_app buttons.
// If localhost / HTTP is used, fall back to callback_data so Telegram never rejects it.
export function getStoreButton(text = '🛍️ Open HomeAll Store / បើកហាងទំនិញ') {
  if (miniAppUrl && miniAppUrl.startsWith('https://')) {
    return { text, web_app: { url: miniAppUrl } }
  } else {
    return { text, callback_data: 'open_localhost_info' }
  }
}

// In-memory orders map for fast lookup
export const ordersMap = new Map()

/**
 * Generate a PNG Buffer containing the dynamic KHQR code for an order
 * Compatible with ABA Mobile, Bakong, and all NBC KHQR member banks.
 */
export async function generateKhqrBuffer(order) {
  const amount = Number(order.total || 0).toFixed(2)
  const qrString =
    order.paymentDetails?.qrString ||
    `00020101021229300016bakong@nbc.gov.kh0108homeall@dev520459995303840540${amount}5802KH5907HomeAll6010Phnom Penh62130109${order.orderId || 'ORDER'}6304ABCD`

  return await QRCode.toBuffer(qrString, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 600,
    margin: 3,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  })
}

// Dynamic admin chat ID (falls back to last active user if .env ADMIN_CHAT_ID is invalid)
let dynamicAdminChatId = adminChatId && /^-?\d+$/.test(adminChatId) ? adminChatId : null

if (bot) {
  console.log('🚀 [HomeAll Bot Worker] Starting 24/7 Long Polling...')

  // Listen for all messages to capture Chat ID
  bot.on('message', (msg) => {
    if (!dynamicAdminChatId && msg.chat?.id) {
      dynamicAdminChatId = msg.chat.id
      console.log(`📌 [HomeAll Bot] Auto-registered Chat ID ${msg.chat.id} (@${msg.from?.username || 'user'}) for order alerts!`)
    }
  })

  // Listen for /id command
  bot.onText(/\/id/, async (msg) => {
    dynamicAdminChatId = msg.chat.id
    await bot.sendMessage(
      msg.chat.id,
      `🆔 **Your Telegram Chat ID:** \`${msg.chat.id}\`\n\n` +
      `✅ This chat has been set as the **Store Admin** to receive instant order alerts!\n` +
      `You can also paste this ID into \`backend/.env\` as:\n` +
      `\`ADMIN_CHAT_ID=${msg.chat.id}\``,
      { parse_mode: 'Markdown' }
    )
  })

  // Listen for /location, /address commands
  bot.onText(/\/(location|address)/, async (msg) => {
    const chatId = msg.chat.id
    await bot.sendMessage(
      chatId,
      `📍 *HomeAll Store Location*\n\n` +
        `🏢 *Address:* ${shopInfo.location}\n` +
        `📞 *Hotline:* \`${shopInfo.phone}\`\n` +
        `💬 *Telegram:* ${shopInfo.telegram}\n\n` +
        `🚚 Fast delivery available across Krong Siem Reap & all provinces in Cambodia!`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🗺️ Open in Google Maps', url: 'https://maps.google.com/?q=Tolaka+St,+Krong+Siem+Reap+171201' }
            ],
            [getStoreButton('🛍️ Open HomeAll Store / បើកហាងទំនិញ')]
          ]
        }
      }
    )
  })

  // Listen for /start, /menu, /shop, /help
  bot.onText(/\/(start|menu|shop|help)(.*)/, async (msg, match) => {
    const chatId = msg.chat.id
    const userFirstName = msg.from?.first_name || 'Customer'
    const param = (match && match[2] ? match[2].trim() : '')

    // Remember this chat for admin alerts if not set
    if (!dynamicAdminChatId) {
      dynamicAdminChatId = chatId
    }

    // CHECK IF THIS IS AN ORDER CHECKOUT DEEP LINK: /start order_HA-123456
    if (param && param.startsWith('order_')) {
      const orderId = param.replace('order_', '').trim()
      const foundOrder = ordersMap.get(orderId) || ordersMap.get(`HA-${orderId}`) || {
        orderId: orderId.startsWith('HA-') ? orderId : `HA-${orderId}`,
        customerName: userFirstName || 'Customer',
        customerPhone: 'N/A',
        customerAddress: 'Phnom Penh',
        paymentMethod: 'KHQR',
        total: 0
      }

      const itemsList = (foundOrder.items || [])
        .map((i, idx) => `  ${idx + 1}. *${i.name}* x ${i.quantity} = $${(i.price * i.quantity).toFixed(2)}`)
        .join('\n')

      const paymentInstructions = (foundOrder.paymentMethod === 'KHQR' || foundOrder.paymentMethod === 'Bakong')
        ? '🏦 **Payment Instructions:**\nPayment via **KHQR / Bakong / ABA Mobile**.\nPlease transfer to account: `001 234 567` (HomeAll Store). Once transferred, reply with your receipt screenshot!'
        : '💵 **Payment Instructions:**\nCash on Delivery (COD). Please have the exact cash ready when delivery arrives.'

      const billMessage = `
🧾 **HOMEALL ORDER BILL — #${foundOrder.orderId}**
─────────────────────────
👤 **Customer:** ${foundOrder.customerName}
📱 **Phone:** \`${foundOrder.customerPhone}\`
📍 **Address:** ${foundOrder.customerAddress}
💳 **Payment Method:** *${foundOrder.paymentMethod}*
💵 **TOTAL AMOUNT:** **$${Number(foundOrder.total).toFixed(2)}**

📦 **Items Ordered:**
${itemsList || '  (No items)'}

─────────────────────────
${paymentInstructions}
─────────────────────────
`.trim()

      await bot.sendMessage(chatId, billMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [getStoreButton('🛍️ Open HomeAll Store')],
            [{ text: '📞 Contact Support', callback_data: 'contact_support' }]
          ]
        }
      })
      return
    }

    const welcomeCaption = `
👋 **Hello ${userFirstName}!**
សូមស្វាគមន៍មកកាន់ **${shopInfo.name}** (${shopInfo.nameKm}) 🏗️🏠

${shopInfo.description}

─────────────────────────
📞 **Hotline:** \`${shopInfo.phone}\`
💬 **Telegram:** ${shopInfo.telegram}
📍 **Location:** ${shopInfo.location}
─────────────────────────

👇 **Tap below to open our store and start shopping:**
`

    const keyboard = {
      inline_keyboard: [
        [getStoreButton('🛍️ Open HomeAll Store / បើកហាងទំនិញ')],
        [
          { text: '📞 Contact Support', callback_data: 'contact_support' },
          { text: '📍 Store Location', callback_data: 'store_location' }
        ],
        [
          { text: '📦 How to Order & Pay (KHQR / COD)', callback_data: 'how_to_order' }
        ]
      ]
    }

    try {
      // 1. Try sending the shop banner image with buttons
      await bot.sendPhoto(chatId, shopInfo.bannerUrl, {
        caption: welcomeCaption,
        parse_mode: 'Markdown',
        reply_markup: keyboard
      })
    } catch (err) {
      // Fallback: If banner photo fails, send formatted text message
      await bot.sendMessage(chatId, welcomeCaption, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
      })
    }
  })

  // Handle Inline Button Clicks (Callback Queries)
  bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id
    const data = query.data

    if (data === 'open_localhost_info') {
      await bot.sendMessage(
        chatId,
        `🌐 *HomeAll Store (Development Mode)*\n\n` +
          `Your store website is running locally at:\n` +
          `👉 \`${miniAppUrl || 'http://localhost:5173'}\`\n\n` +
          `💡 *How to open:* Copy and paste \`http://localhost:5173\` in your Chrome/browser to shop!\n` +
          `*(Telegram Mini App in-chat display activates when deployed with an HTTPS URL like ngrok or Render).*`,
        { parse_mode: 'Markdown' }
      )
    } else if (data === 'contact_support') {
      await bot.sendMessage(
        chatId,
        `📞 *HomeAll Customer Support*\n\n` +
          `• Phone 1: \`012 345 678\`\n` +
          `• Phone 2: \`098 765 432\`\n` +
          `• Telegram: ${shopInfo.telegram}\n` +
          `• Working Hours: Monday - Sunday (7:30 AM - 6:00 PM)`,
        { parse_mode: 'Markdown' }
      )
    } else if (data === 'store_location') {
      await bot.sendMessage(
        chatId,
        `📍 *HomeAll Store Location*\n\n` +
          `🏢 *Address:* ${shopInfo.location}\n` +
          `📞 *Hotline:* \`${shopInfo.phone}\`\n` +
          `💬 *Telegram:* ${shopInfo.telegram}\n\n` +
          `🚚 Fast delivery available across Krong Siem Reap & all provinces in Cambodia!`,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '🗺️ Open in Google Maps', url: 'https://maps.google.com/?q=Tolaka+St,+Krong+Siem+Reap+171201' }
              ],
              [getStoreButton('🛍️ Open HomeAll Store / បើកហាងទំនិញ')]
            ]
          }
        }
      )
    } else if (data === 'how_to_order') {
      await bot.sendMessage(
        chatId,
        `🛒 *How to Order on HomeAll:*\n\n` +
          `1️⃣ Tap *Open HomeAll Store* below.\n` +
          `2️⃣ Choose products (tiles, bricks, toilets, sinks, tools, etc.) and add them to Cart.\n` +
          `3️⃣ Proceed to Checkout and select payment:\n` +
          `   • **KHQR / Bakong (ABA / ACLEDA / Any Bank)**: Scan dynamic QR code.\n` +
          `   • **Cash on Delivery (COD)**: Pay when materials arrive at your site.\n` +
          `4️⃣ You will immediately receive a digital receipt right here in this chat!`,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [getStoreButton('🛍️ Open Store Now')]
            ]
          }
        }
      )
    } else if (data && data.startsWith('popup_qr_')) {
      const orderId = data.replace('popup_qr_', '')
      const foundOrder = ordersMap.get(orderId) || ordersMap.get(`HA-${orderId}`)
      await bot.answerCallbackQuery(query.id, {
        text: `🇰🇭 Scan this KHQR with ABA Mobile or Bakong app to pay $${Number(foundOrder?.total || 0).toFixed(2)}!\n\nMerchant: HomeAll Product Center\nAccount: 001 234 567`,
        show_alert: true
      })
      return
    }

    // Acknowledge callback query
    bot.answerCallbackQuery(query.id).catch(() => {})
  })

  // Log any polling errors gracefully without crashing
  bot.on('polling_error', (error) => {
    if (error.code === 'EFATAL' || error.message.includes('401')) {
      console.error('❌ [HomeAll Bot Worker] Telegram 401 Unauthorized: Invalid BOT_TOKEN in backend/.env')
    } else {
      console.warn('⚠️ [HomeAll Bot Worker Polling]', error.message || error)
    }
  })

  console.log('✅ [HomeAll Bot Worker] Ready & listening for /start commands.')
}

/**
 * Validates Cambodian local numbers, intl numbers, or general intl numbers
 */
export function isValidPhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') return false
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')

  if (/^(\d)\1+$/.test(cleaned) || cleaned === '12345678' || cleaned === '123456789' || cleaned === '012345678') {
    return false
  }

  const isCambodiaLocal = /^0[1-9]\d{7,8}$/.test(cleaned)
  const isCambodiaIntl = /^(\+?855)[1-9]\d{7,8}$/.test(cleaned)
  const isGeneralIntl = /^\+[1-9]\d{7,14}$/.test(cleaned)

  return isCambodiaLocal || isCambodiaIntl || isGeneralIntl
}

/**
 * Send an Order Notification via Telegram Bot to both Customer and Admin
 * @param {Object} order - The order payload from HomeAll frontend checkout
 */
export async function sendOrderNotification(order) {
  // Validate phone number: Do not send to Telegram if phone is incorrect
  if (!isValidPhoneNumber(order.customerPhone)) {
    console.warn(`⚠️ [Order rejected] Incorrect phone number ("${order.customerPhone}"). Order NOT sent to Telegram bot.`)
    return { success: false, message: 'Incorrect phone number. Order not sent to Telegram.' }
  }

  if (order.orderId) {
    ordersMap.set(order.orderId, order)
  }

  if (!bot) {
    console.warn('⚠️ Bot not initialized. Skipping Telegram notification.')
    return { success: false, message: 'Bot not initialized' }
  }

  const itemsText = (order.items || [])
    .map((item, idx) => `  ${idx + 1}. *${item.name}* x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`)
    .join('\n')

  const orderMessage = `
🛍️ **NEW ORDER RECEIVED — #${order.orderId || Date.now().toString().slice(-6)}**
─────────────────────────
👤 **Customer:** ${order.customerName || 'N/A'}
📱 **Phone:** \`${order.customerPhone || 'N/A'}\`
📍 **Address:** ${order.customerAddress || 'Phnom Penh'}
💳 **Payment:** ${order.paymentMethod || 'KHQR / Cash on Delivery'}
💵 **Total Amount:** **$${Number(order.total || 0).toFixed(2)}**

📦 **Ordered Items:**
${itemsText || '  (No items)'}

📅 **Date:** ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Phnom_Penh' })}
─────────────────────────
`

  // Generate KHQR image buffer if KHQR / Bakong
  // 1. Send to Customer if telegramChatId exists
  if (order.telegramChatId) {
    try {
      await bot.sendMessage(order.telegramChatId, orderMessage, { parse_mode: 'Markdown' })
    } catch (err) {
      console.error('Failed to send receipt to customer:', err.message)
    }
  }

  // 2. Send to Admin (dynamicAdminChatId or valid adminChatId)
  const targetAdmin = dynamicAdminChatId || (adminChatId && /^-?\d+$/.test(adminChatId) ? adminChatId : null)
  if (targetAdmin) {
    try {
      await bot.sendMessage(targetAdmin, `🔔 **[STORE ADMIN ALERT]**\n${orderMessage}`, { parse_mode: 'Markdown' })
      console.log(`✅ [HomeAll Bot] Sent order alert to Admin Chat ID: ${targetAdmin}`)
    } catch (err) {
      console.error('Failed to send order alert to admin:', err.message)
    }
  } else {
    console.log(`ℹ️ [HomeAll Bot] Order stored (#${order.orderId}). Send /start or /id to the bot in Telegram to receive admin notifications.`)
  }

  return { success: true }
}

