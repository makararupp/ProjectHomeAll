import { ref, computed } from 'vue'

// Global shared reactive locale state
const currentLocale = ref(localStorage.getItem('app_language') || 'en')

export const translations = {
  en: {
    nav: {
      home: 'Home',
      product: 'Product',
      about: 'About Us',
      new: 'New'
    },
    header: {
      searchPlaceholder: 'Search products',
      searchBtn: 'Search',
      signIn: 'Sign in',
      register: 'Register'
    },
    categories: {
      allCategories: 'All Categories',
      industrialParts: 'Industrial & Parts',
      construction: 'Construction',
      foodBeverage: 'Food & Beverage',
      logistics: 'Logistics',
      realEstate: 'Real Estate',
      services: 'Services',
      categoriesForYou: 'Categories for you',
      consumerElectronics: 'Consumer Electronics',
      browseFeatured: 'Browse featured selections',
      sportsEntertainment: 'Sports & Entertainment',
      commercialEquipment: 'Commercial Equipment & Machinery',
      constructionMachinery: 'Construction & Building Machinery',
      lightsLighting: 'Lights & Lighting',
      apparelAccessories: 'Apparel & Accessories',
      homeGarden: 'Home & Garden',
      sportswearApparel: 'Sportswear & Outdoor Apparel'
    }
  },
  km: {
    nav: {
      home: 'ទំព័រដើម',
      product: 'ផលិតផល',
      about: 'អំពីយើង',
      new: 'ថ្មីៗ'
    },
    header: {
      searchPlaceholder: 'ស្វែងរកផលិតផល...',
      searchBtn: 'ស្វែងរក',
      signIn: 'ចូលគណនី',
      register: 'ចុះឈ្មោះ'
    },
    categories: {
      allCategories: 'ប្រភេទទាំងអស់',
      industrialParts: 'ឧស្សាហកម្ម និងគ្រឿងបន្លាស់',
      construction: 'សំណង់',
      foodBeverage: 'ម្ហូបអាហារ និងភេសជ្ជៈ',
      logistics: 'សេវាដឹកជញ្ជូន',
      realEstate: 'អចលនទ្រព្យ',
      services: 'សេវាកម្ម',
      categoriesForYou: 'ប្រភេទសម្រាប់អ្នក',
      consumerElectronics: 'គ្រឿងអេឡិចត្រូនិក',
      browseFeatured: 'មើលការជ្រើសរើសពិសេស',
      sportsEntertainment: 'កីឡា និងការកម្សាន្ត',
      commercialEquipment: 'ឧបករណ៍ពាណិជ្ជកម្ម និងគ្រឿងចក្រ',
      constructionMachinery: 'គ្រឿងចក្រសំណង់ និងអាគារ',
      lightsLighting: 'អំពូលភ្លើង និងការបំភ្លឺ',
      apparelAccessories: 'សម្លៀកបំពាក់ និងគ្រឿងតុបតែង',
      homeGarden: 'ផ្ទះ និងសួនច្បារ',
      sportswearApparel: 'សម្លៀកបំពាក់កីឡា'
    }
  }
}

export function useI18n() {
  function setLocale(locale) {
    currentLocale.value = locale
    localStorage.setItem('app_language', locale)
  }

  const t = (path, defaultText = '') => {
    if (!path) return defaultText
    const keys = path.split('.')
    let current = translations[currentLocale.value] || translations.en
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key]
      } else {
        // Fallback to English
        let fallback = translations.en
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey]
          } else {
            return defaultText || path
          }
        }
        return fallback
      }
    }
    return current ?? (defaultText || path)
  }

  const isKhmer = computed(() => currentLocale.value === 'km')

  return {
    currentLocale,
    setLocale,
    t,
    isKhmer
  }
}
