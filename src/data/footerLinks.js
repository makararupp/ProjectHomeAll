import { getTelegramLink, openTelegram } from '@/utils/telegram'

export { getTelegramLink, openTelegram }

/**
 * Footer link columns.
 */
export const footerColumns = [
  {
    title: 'Marketplace',
    titleKm: 'ផ្សារទំនិញ',
    links: [
      { label: 'Products', labelKm: 'ផលិតផល', href: '/products' },
      { label: 'Categories', labelKm: 'ប្រភេទផលិតផល', href: '/categories' },
      { label: 'New Arrivals', labelKm: 'ទំនិញមកដល់ថ្មី', href: '/new' }
    ]
  },
  {
    title: 'Services',
    titleKm: 'សេវាកម្ម',
    links: [
      { label: 'Logistics', labelKm: 'សេវាដឹកជញ្ជូន', href: '/services/logistic' },
      { label: 'Real Estate', labelKm: 'អចលនទ្រព្យ', href: '/services/real-estate' },
      { label: 'Business Consulting', labelKm: 'ប្រឹក្សាអាជីវកម្ម', href: '/services/business-consulting' }
    ]
  },
  {
    title: 'Company',
    titleKm: 'ក្រុមហ៊ុន',
    links: [
      { label: 'About Us', labelKm: 'អំពីយើង', href: '/about' },
      { label: 'Privacy & Terms', labelKm: 'ភាពឯកជន និងលក្ខខណ្ឌ', href: '/privacy' }
    ]
  },
  {
    title: 'Customer Support',
    titleKm: 'សេវាបម្រើអតិថិជន',
    links: [
      { label: '097 829 0427', labelKm: '097 829 0427', href: 'tel:0978290427' },
      { label: '088 651 2001', labelKm: '088 651 2001', href: 'tel:0886512001' },
      { label: 'makarasam68@example.com', labelKm: 'makarasam68@example.com', href: 'mailto:makarasam68@example.com' }
    ]
  }
]

export const socialLinks = [
  { label: 'Facebook', href: 'https://web.facebook.com/homeallvillage/?_rdc=1&_rdr#' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Telegram', href: getTelegramLink('0978290427') }
]
