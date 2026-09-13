import pro1 from '@/assets/images/pro1.jpg'
import pro2 from '@/assets/images/pro2.jpg'
import pro3 from '@/assets/images/pro3.jpg'
import pro4 from '@/assets/images/pro4.jpg'

/**
 * Promotional product banner cards displayed above "Explore Our Services".
 * Uses project assets pro1 to pro4 styled to match the promotional banner design.
 */
export const promoBanners = [
  {
    id: 'promo-pro1',
    brand: 'HomeAll Pro',
    brandColor: '#0284c7',
    title: 'HARDWARE & WAREHOUSE SUPPLIES',
    titleKm: 'សម្ភារៈឃ្លាំង និងឧបករណ៍សំណង់',
    subtitle: 'STORAGE & SHELVING SYSTEMS',
    price: '$12.50',
    originalPrice: '$15.00',
    image: pro1,
    alt: 'Hardware warehouse supplies pro1 - $12.50',
    href: '/products?category=Hardware',
    slogan: 'Start your day with smarter solutions',
    theme: 'light'
  },
  {
    id: 'promo-pro2',
    brand: 'PVC Master',
    brandColor: '#0284c7',
    title: 'PVC T-JOINT PIPE CONNECTORS',
    titleKm: 'បំពង់ជ័រ PVC តំណរ គុណភាពខ្ពស់',
    subtitle: 'HIGH-PRESSURE INDUSTRIAL GRADE',
    price: '$28.00',
    originalPrice: null,
    image: pro2,
    alt: 'PVC T-joint pipe connectors pro2 - $28.00',
    href: '/products?category=PVC',
    slogan: 'Official warranty & trusted quality',
    theme: 'light'
  },
  {
    id: 'promo-pro3',
    brand: 'Sanitary Pro',
    brandColor: '#0284c7',
    title: 'BATHROOM SHOWER HOSE SET',
    titleKm: 'បន្ទប់ទឹក និងក្បាលផ្កាឈូកពិសេស',
    subtitle: 'FLEXIBLE STAINLESS ACCESSORIES',
    price: '$25.00',
    originalPrice: '$29.00',
    image: pro3,
    alt: 'Bathroom shower hose set pro3 - $25.00',
    href: '/products?category=Bathroom',
    slogan: 'Best price guaranteed in Cambodia',
    theme: 'light'
  },
  {
    id: 'promo-pro4',
    brand: 'ColorMax',
    brandColor: '#3b82f6',
    title: 'PREMIUM ACRYLIC SPRAY PAINT',
    titleKm: 'ថ្នាំបាញ់ពណ៌គុណភាពខ្ពស់ Multi-Surface',
    subtitle: 'MULTI-SURFACE • FAST DRYING',
    price: '$6.80',
    originalPrice: null,
    badgeText: 'No.1 QUALITY',
    image: pro4,
    alt: 'Premium acrylic spray paint pro4 - $6.80',
    href: '/products?category=Paint',
    slogan: 'No. 1 Quality & Service guaranteed',
    theme: 'blue'
  }
]
