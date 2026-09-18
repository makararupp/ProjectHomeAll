<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useI18n } from '@/composables/useI18n'

// Hero image
import washbasinHeroImg from '@/assets/images/New&Promotion/pt1.jpg'

// Labo category images (labo1 to labo7)
import labo1 from '@/assets/images/New&Promotion/labo1.jpg'
import labo2 from '@/assets/images/New&Promotion/labo2.jpg'
import labo3 from '@/assets/images/New&Promotion/labo3.jpg'
import labo4 from '@/assets/images/New&Promotion/labo4.jpg'
import labo5 from '@/assets/images/New&Promotion/labo5.jpg'
import labo6 from '@/assets/images/New&Promotion/labo6.jpg'
import labo7 from '@/assets/images/New&Promotion/labo7.jpg'

const { t, isKhmer } = useI18n()

// Active sub-navigation tab
const activeTab = ref('overview')

// Navigation tabs matching category detail layout
const navTabs = [
  { id: 'overview', label: 'Overview', icon: 'overview' },
  { id: 'products', label: 'Products', icon: 'products' },
  { id: 'brands', label: 'Brands', icon: 'brands' },
  { id: 'diy', label: 'DIY & Ideas', icon: 'diy' },
  { id: 'calculators', label: 'Calculators', icon: 'calculators' },
  { id: 'guide', label: 'Buying guide', icon: 'guide' },
  { id: 'items-table', label: 'Items Table', icon: 'table' },
  { id: 'bestseller', label: 'Bestseller', icon: 'bestseller' }
]

// 7 Washbasin products (labo1 to labo7)
const washbasinItems = [
  {
    id: 'labo-1',
    name: 'Countertop Square Basin GOGL',
    nameKm: 'ឡាបូលើតុជ្រុង GOGL',
    image: labo1,
    search: 'Basin'
  },
  {
    id: 'labo-2',
    name: 'Square Marble Basin',
    nameKm: 'ឡាបូលាងដៃជ្រុងលើម៉ាប',
    image: labo2,
    search: 'Basin'
  },
  {
    id: 'labo-3',
    name: 'Wall-hung Basin TIGER',
    nameKm: 'ឡាបូលាងដៃភ្ជាប់ជញ្ជាំង TIGER',
    image: labo3,
    search: 'Basin'
  },
  {
    id: 'labo-4',
    name: 'Wall-hung Basin Topcera',
    nameKm: 'ឡាបូភ្ជាប់ជញ្ជាំង Topcera',
    image: labo4,
    search: 'Basin'
  },
  {
    id: 'labo-5',
    name: 'Wall-hung Basin TIGER TG-B62',
    nameKm: 'ឡាបូលាងដៃភ្ជាប់ជញ្ជាំង TIGER',
    image: labo5,
    search: 'Basin'
  },
  {
    id: 'labo-6',
    name: 'Wall-hung Basin JB-202-B',
    nameKm: 'ឡាបូលាងដៃភ្ជាប់ជញ្ជាំង JB-202-B',
    image: labo6,
    search: 'Basin'
  },
  {
    id: 'labo-7',
    name: 'Wall-hung Basin JB-201-B-1',
    nameKm: 'ឡាបូលាងដៃភ្ជាប់ជញ្ជាំង JB-201-B-1',
    image: labo7,
    search: 'Basin'
  }
]
</script>

<template>
  <div class="steel-page">
    <AppHeader />
    <CategoryNav />

    <main class="steel-main container">
      <!-- Breadcrumb: Home > All categories > Washbasin -->
      <nav class="category-breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/" class="category-breadcrumb_link">
          {{ t('nav.home', 'Home') }}
        </RouterLink>
        <span class="category-breadcrumb_separator" aria-hidden="true">&gt;</span>
        <RouterLink to="/all-categories" class="category-breadcrumb_link">
          {{ t('categories.allCategories', 'All categories') }}
        </RouterLink>
        <span class="category-breadcrumb_separator" aria-hidden="true">&gt;</span>
        <span class="category-breadcrumb_current" aria-current="page">
          {{ isKhmer ? 'ឡាបូលាងដៃ' : 'Washbasin' }}
        </span>
      </nav>

      <!-- Feature Sub-navigation Tab Bar -->
      <div class="feature-tabs-bar" role="tablist" aria-label="Washbasin page features">
        <button
          v-for="tab in navTabs"
          :key="tab.id"
          type="button"
          class="feature-tab"
          :class="{ 'is-active': activeTab === tab.id }"
          role="tab"
          :aria-selected="activeTab === tab.id"
          @click="activeTab = tab.id"
        >
          <!-- Active top indicator line -->
          <span v-if="activeTab === tab.id" class="feature-tab_indicator"></span>

          <!-- Tab Icon -->
          <div class="feature-tab_icon" aria-hidden="true">
            <!-- 1. Overview -->
            <svg v-if="tab.icon === 'overview'" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
            </svg>

            <!-- 2. Products -->
            <svg v-else-if="tab.icon === 'products'" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>

            <!-- 4. Brands -->
            <svg v-else-if="tab.icon === 'brands'" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="7" cy="7" r="1.5" fill="currentColor" />
            </svg>

            <!-- 5. DIY & Ideas -->
            <svg v-else-if="tab.icon === 'diy'" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.4 1.2 4.5 3 5.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 0 0-7-7z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <!-- 6. Calculators -->
            <svg v-else-if="tab.icon === 'calculators'" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="4" y="2" width="16" height="20" rx="2" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="8" y1="6" x2="16" y2="6" stroke-linecap="round" />
              <circle cx="8" cy="11" r="1.2" fill="currentColor" />
              <circle cx="12" cy="11" r="1.2" fill="currentColor" />
              <circle cx="16" cy="11" r="1.2" fill="currentColor" />
              <circle cx="8" cy="15" r="1.2" fill="currentColor" />
              <circle cx="12" cy="15" r="1.2" fill="currentColor" />
              <circle cx="16" cy="15" r="1.2" fill="currentColor" />
            </svg>

            <!-- 7. Buying guide -->
            <svg v-else-if="tab.icon === 'guide'" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m4 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <!-- 8. Items Table -->
            <svg v-else-if="tab.icon === 'table'" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="3" y1="6" x2="21" y2="6" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16 10a4 4 0 0 1-8 0" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <!-- 9. Bestseller -->
            <svg v-else-if="tab.icon === 'bestseller'" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="8" r="6" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <!-- Tab Label -->
          <span class="feature-tab_label">{{ tab.label }}</span>
        </button>
      </div>

      <!-- Washbasin Header & Description Section -->
      <section class="steel-hero-section">
        <div class="steel-hero-thumb">
          <img
            :src="washbasinHeroImg"
            alt="Washbasin & Sinks — All Types"
            class="steel-hero-img"
            width="80"
            height="80"
          />
        </div>

        <div class="steel-hero-content">
          <h1 class="steel-hero_title" :class="{ 'is-khmer': isKhmer }">
            {{ isKhmer ? 'តម្លៃឡាបូ និងឡាបូលាងដៃ — គ្រប់ប្រភេទ' : 'Washbasin & Sinks — All Types' }}
          </h1>
          <p class="steel-hero_desc" :class="{ 'is-khmer': isKhmer }">
            {{
              isKhmer
                ? 'ផលិតផលឡាបូលាងដៃ និងសម្ភារៈបន្ទប់ទឹកគ្រប់ប្រភេទស្របតាមស្តង់ដារគុណភាព — ឡាបូលើតុ ឡាបូភ្ជាប់ជញ្ជាំង ឡាបូលាងដៃជ្រុង ឡាបូកុលសម្ភារៈកុលាលភាជន៍សេរ៉ាមិច និងម៉ាប — គុណភាពខ្ពស់ ធន់ រលោង ងាយស្រួលសម្អាត។ សាកសមសម្រាប់គេហដ្ឋាន ខុនដូ ការិយាល័យ និងគម្រោងសំណង់នានា ជាមួយនឹងសេវាដឹកជញ្ជូនរហ័សដល់ទីកន្លែង។'
                : 'A complete range of premium washbasins and sanitary ware — countertop basins, wall-hung basins, marble and ceramic basins, square and round designs. Highly durable, smooth glaze, easy to clean, and built for modern homes, condos, offices, and commercial projects with factory-direct pricing and nationwide delivery.'
            }}
          </p>
        </div>
      </section>

      <!-- Washbasin Subcategories Card (Matching Foundation steel card from user screenshot) -->
      <section class="foundation-steel-card" aria-labelledby="washbasin-heading">
        <h2 id="washbasin-heading" class="foundation-steel_title" :class="{ 'is-khmer': isKhmer }">
          {{ isKhmer ? 'ប្រភេទឡាបូលាងដៃ លើតុ និងភ្ជាប់ជញ្ជាំង' : 'Washbasin types, wall-hung & countertop' }}
        </h2>

        <div class="foundation-steel_grid">
          <RouterLink
            v-for="item in washbasinItems"
            :key="item.id"
            :to="{ path: '/products', query: { group: 'Sanitary Ware', search: item.search } }"
            class="steel-item-card"
            :title="isKhmer ? item.nameKm : item.name"
          >
            <!-- White rounded thumbnail box -->
            <div class="steel-item_box">
              <img
                :src="item.image"
                :alt="isKhmer ? item.nameKm : item.name"
                class="steel-item_img"
                loading="lazy"
                width="76"
                height="76"
              />
            </div>

            <!-- Title label below -->
            <span class="steel-item_name" :class="{ 'is-khmer': isKhmer }">
              {{ isKhmer ? item.nameKm : item.name }}
            </span>
          </RouterLink>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.steel-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.steel-main {
  flex: 1;
  width: 100%;
  padding-top: 18px;
  padding-bottom: 56px;
  background-color: #ffffff;
}

/* Breadcrumb Navigation */
.category-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 13.5px;
  color: #4b5563;
}

.category-breadcrumb_link {
  color: #4b5563;
  text-decoration: none;
  transition: color var(--transition-fast, 0.2s ease);
}

.category-breadcrumb_link:hover {
  color: #111827;
  text-decoration: underline;
}

.category-breadcrumb_separator {
  color: #9ca3af;
  font-size: 12px;
  user-select: none;
}

.category-breadcrumb_current {
  color: #111827;
  font-weight: 600;
}

/* =========================================
   Feature Sub-navigation Tab Bar
   ========================================= */
.feature-tabs-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 14px;
  margin-bottom: 28px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.feature-tabs-bar::-webkit-scrollbar {
  display: none;
}

.feature-tab {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  padding: 4px 6px;
  cursor: pointer;
  color: #64748b;
  transition: color 0.2s ease;
  user-select: none;
  flex-shrink: 0;
}

.feature-tab:hover {
  color: #1e293b;
}

.feature-tab.is-active {
  color: #2563eb;
  font-weight: 600;
}

.feature-tab_indicator {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2.5px;
  background-color: #2563eb;
  border-radius: 9999px;
}

.feature-tab_icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}

.feature-tab_label {
  font-size: 12px;
  white-space: nowrap;
}

/* =========================================
   Hero / Header Section
   ========================================= */
.steel-hero-section {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
}

.steel-hero-thumb {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.steel-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.steel-hero-content {
  flex: 1;
}

.steel-hero_title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.steel-hero_title.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 20px;
}

.steel-hero_desc {
  font-size: 13.5px;
  line-height: 1.65;
  color: #374151;
  margin: 0;
  max-width: 980px;
}

.steel-hero_desc.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 13px;
  line-height: 1.7;
}

/* =========================================
   Subcategory Card Section
   ========================================= */
.foundation-steel-card {
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  padding: 24px 28px 28px 28px;
}

.foundation-steel_title {
  font-size: 17px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px 0;
}

.foundation-steel_title.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 16px;
}

.foundation-steel_grid {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: wrap;
}

/* Individual Item Card */
.steel-item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  width: 96px;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.steel-item-card:hover {
  transform: translateY(-4px);
}

.steel-item_box {
  width: 80px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 2px;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.steel-item-card:hover .steel-item_box {
  transform: scale(1.05);
  box-shadow: 0 8px 16px -2px rgba(15, 23, 42, 0.08);
}

.steel-item_img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.steel-item_name {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  line-height: 1.3;
  word-break: break-word;
}

.steel-item_name.is-khmer {
  font-family: var(--font-family-khmer, inherit);
  font-size: 11.5px;
}

/* Responsive */
@media (max-width: 900px) {
  .feature-tabs-bar {
    justify-content: flex-start;
    gap: 20px;
  }

  .foundation-steel_grid {
    gap: 16px;
  }

  .steel-hero-section {
    flex-direction: column;
  }
}
</style>

<!-- Non-scoped dark mode support -->
<style>
:root[data-theme="dark"] .steel-page,
body.dark .steel-page {
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%) !important;
}

:root[data-theme="dark"] .steel-item_name,
body.dark .steel-item_name {
  color: #ffffff !important;
}

:root[data-theme="dark"] .steel-item_box,
body.dark .steel-item_box {
  background-color: #1e293b !important;
  border: 1px solid #334155 !important;
}

:root[data-theme="dark"] .foundation-steel-card,
body.dark .foundation-steel-card {
  background-color: #1e293b !important;
  border-color: #334155 !important;
}

:root[data-theme="dark"] .steel-hero_title,
body.dark .steel-hero_title {
  color: #ffffff !important;
}

:root[data-theme="dark"] .steel-hero_desc,
body.dark .steel-hero_desc {
  color: #cbd5e1 !important;
}

:root[data-theme="dark"] .foundation-steel_title,
body.dark .foundation-steel_title {
  color: #ffffff !important;
}

:root[data-theme="dark"] .category-breadcrumb_link,
:root[data-theme="dark"] .category-breadcrumb_separator,
:root[data-theme="dark"] .category-breadcrumb_current {
  color: #cbd5e1 !important;
}
</style>

