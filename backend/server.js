import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import QRCode from 'qrcode'
import { sendOrderNotification, shopInfo } from './bot_worker.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'HomeAll Telegram Mini App Backend',
    timestamp: new Date().toISOString()
  })
})

/**
 * Endpoint matching your study copy specification:
 * GET /api/bot-service/config
 * Returns shop configuration, banner, logo, and Mini App URL for worker services
 */
app.get('/api/bot-service/config', (req, res) => {
  res.json({
    success: true,
    shop: {
      name: shopInfo.name,
      nameKm: shopInfo.nameKm,
      bio: shopInfo.bio,
      description: shopInfo.description,
      descriptionKm: shopInfo.descriptionKm,
      phone: shopInfo.phone,
      telegram: shopInfo.telegram,
      location: shopInfo.location,
      bannerUrl: shopInfo.bannerUrl,
      miniAppUrl: process.env.MINI_APP_URL || 'http://localhost:5173'
    }
  })
})

/**
 * Helper to validate Full Name: characters/letters only
 * Accepts: Unicode letters (Khmer, Latin, etc.), spaces, hyphens, and apostrophes
 * Rejects: numbers, special symbols, empty strings, < 2 characters
 */
export function isValidFullName(name) {
  if (!name || typeof name !== 'string') return false
  const trimmed = name.trim()
  if (trimmed.length < 2 || trimmed.length > 80) return false
  return /^[\p{L}\p{M}\s'-]+$/u.test(trimmed)
}

/**
 * Helper to validate Cambodian and international phone numbers
 * Accepts: 012 345 678, 097 123 4567, +855 12 345 678, 85512345678, etc.
 * Rejects: text, dummy digits (00000000, 12345678), too short, too long, invalid prefix
 */
export function isValidPhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') return false
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')

  // Reject dummy patterns
  if (/^(\d)\1+$/.test(cleaned) || cleaned === '12345678' || cleaned === '123456789' || cleaned === '012345678') {
    return false
  }

  // 1. Cambodian Local: starts with 0, valid prefix digit 1-9, total 9-10 digits (e.g. 012345678 or 0971234567)
  const isCambodiaLocal = /^0[1-9]\d{7,8}$/.test(cleaned)

  // 2. Cambodian International: starts with +855 or 855, followed by 8-9 digits
  const isCambodiaIntl = /^(\+?855)[1-9]\d{7,8}$/.test(cleaned)

  // 3. General International with country code (+XX followed by 7-14 digits)
  const isGeneralIntl = /^\+[1-9]\d{7,14}$/.test(cleaned)

  return isCambodiaLocal || isCambodiaIntl || isGeneralIntl
}

/**
 * Create Order Endpoint:
 * POST /api/orders
 * Receives cart checkout items, calculates total, generates KHQR or COD invoice,
 * and notifies customer and admin via the Telegram Bot Worker.
 */
app.post('/api/orders', async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerAddress,
      items,
      total,
      paymentMethod,
      telegramChatId,
      telegramUser
    } = req.body

    // Strict Full Name Validation: Characters only (no digits or symbols)
    if (!isValidFullName(customerName)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid name. Please provide a valid name. Order was NOT sent to Telegram bot.'
      })
    }

    // Strict Phone Validation: Do not send to Telegram bot if phone number is incorrect
    if (!isValidPhoneNumber(customerPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number. Please provide a valid phone number. Order was NOT sent to Telegram bot.'
      })
    }

    const orderId = 'HA-' + Math.floor(100000 + Math.random() * 900000)

    // Generate KHQR payload if customer selected KHQR / Bakong / ABA Mobile
    let paymentDetails = {}
    if (paymentMethod === 'KHQR' || paymentMethod === 'Bakong') {
      const formattedAmount = Number(total || 0).toFixed(2)
      const qrString = `00020101021229300016bakong@nbc.gov.kh0108homeall@dev520459995303840540${formattedAmount}5802KH5907HomeAll6010Phnom Penh62130109${orderId}6304ABCD`
      let qrDataUrl = ''
      try {
        qrDataUrl = await QRCode.toDataURL(qrString, {
          width: 360,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        })
      } catch (qrErr) {
        console.error('Failed to generate qrDataUrl:', qrErr)
      }

      paymentDetails = {
        type: 'KHQR',
        currency: 'USD',
        amount: total,
        qrString,
        qrDataUrl,
        merchantName: 'HomeAll Product Center',
        accountNumber: '001 234 567'
      }
    } else {
      paymentDetails = {
        type: 'COD',
        instructions: 'Pay with cash upon delivery of construction materials.'
      }
    }

    const orderRecord = {
      orderId,
      customerName: customerName || (telegramUser ? `${telegramUser.first_name || ''} ${telegramUser.last_name || ''}`.trim() : 'Guest Customer'),
      customerPhone: customerPhone || 'N/A',
      customerAddress: customerAddress || 'Phnom Penh, Cambodia',
      items: items || [],
      total: Number(total || 0),
      paymentMethod: paymentMethod || 'KHQR',
      paymentDetails,
      telegramChatId: telegramChatId || telegramUser?.id,
      createdAt: new Date().toISOString()
    }

    // Send Telegram instant notification to customer & admin
    await sendOrderNotification(orderRecord)

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: orderRecord,
      payment: paymentDetails
    })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    })
  }
})

/**
 * Payment Verification Endpoint:
 * POST /api/payment/verify
 */
app.post('/api/payment/verify', (req, res) => {
  const { orderId } = req.body
  // Simulates instant verification for KHQR / Bakong / ABA
  res.json({
    success: true,
    orderId,
    status: 'PAID',
    verifiedAt: new Date().toISOString()
  })
})

app.listen(PORT, () => {
  console.log(`\n==================================================`)
  console.log(`🚀 [HomeAll Backend API] Running on http://localhost:${PORT}`)
  console.log(`📦 Mini App WebApp URL: ${process.env.MINI_APP_URL || 'http://localhost:5173'}`)
  console.log(`==================================================\n`)
})

