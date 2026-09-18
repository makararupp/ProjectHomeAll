<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useI18n } from '@/composables/useI18n'

// Hero image (pt6 Kitchen Sink / ឡាបូលាងចាន)
import sinkHeroImg from '@/assets/images/New&Promotion/pt6.jpg'

// Kitchen sink category images (cl1 to cl6)
import cl1 from '@/assets/images/New&Promotion/cl1.jpg'
import cl2 from '@/assets/images/New&Promotion/cl2.jpg'
import cl3 from '@/assets/images/New&Promotion/cl3.jpg'
import cl4 from '@/assets/images/New&Promotion/cl4.jpg'
import cl5 from '@/assets/images/New&Promotion/cl5.jpg'
import cl6 from '@/assets/images/New&Promotion/cl6.jpg'

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

// 6 Kitchen Sink & Tap products (cl1 to cl6)
const sinkItems = [
  {
    id: 'cl-1',
    name: 'Stainless Steel Kitchen Sink Single Bowl',
    nameKm: 'ឡាបូលាងចានអ៊ីណុក ស្នូកទោល',
    image: cl1,
    search: 'Sink'
  },
  {
    id: 'cl-2',
    name: 'Premium Inset Kitchen Sink',
    nameKm: 'ឡាបូលាងចានបង្កប់ គុណភាពខ្ពស់',
    image: cl2,
    search: 'Sink'
  },
  {
    id: 'cl-3',
    name: 'Luxury Gold Kitchen Mixer Tap',
    nameKm: 'រ៉ូប៊ីណេលាងចានពណ៌មាស ប្រណិត',
    image: cl3,
    search: 'Faucet'
  },
  {
    id: 'cl-4',
    name: 'TOPCERA Countertop Washbasin',
    nameKm: 'ឡាបូលាងដៃ TOPCERA លើកុងទ័រ',
    image: cl4,
    search: 'Basin'
  },
  {
    id: 'cl-5',
    name: 'Dual Handle Gold Kitchen Faucet',
    nameKm: 'រ៉ូប៊ីណេលាងចានដៃភ្លោះ ពណ៌មាស',
    image: cl5,
    search: 'Faucet'
  },
  {
    id: 'cl-6',
    name: 'Contemporary Brass Kitchen Mixer',
    nameKm: 'រ៉ូប៊ីណេលាងចានសហសម័យ ពណ៌មាស',
    image: cl6,
    search: 'Faucet'
  }
]
</script>

<template>
  <div class="steel-page">
    <AppHeader />
    <CategoryNav />

    <main class="steel-main container">
      <!-- Breadcrumb: Home > All categories > Kitchen Sinks -->
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
          {{ isKhmer ? 'ឡាបូលាងចាន' : 'Kitchen Sinks' }}
        </span>
      </nav>

      <!-- Feature Sub-navigation Tab Bar -->
      <div class="feature-tabs-bar" role="tablist" aria-label="Kitchen sinks page features">
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

      <!-- Kitchen Sinks Header & Description Section -->
      <section class="steel-hero-section">
        <div class="steel-hero-thumb">
          <img
            :src="sinkHeroImg"
            alt="Kitchen Sinks & Faucets — All Types"
            class="steel-hero-img"
            width="80"
            height="80"
          />
        </div>

        <div class="steel-hero-content">
          <h1 class="steel-hero_title" :class="{ 'is-khmer': isKhmer }">
            {{ isKhmer ? 'តម្លៃឡាបូលាងចាន និងរ៉ូប៊ីណេ — គ្រប់ប្រភេទ' : 'Kitchen Sinks & Faucets — All Types' }}
          </h1>
          <p class="steel-hero_desc" :class="{ 'is-khmer': isKhmer }">
            {{
              isKhmer
                ? 'ឡាបូលាងចានអ៊ីណុកគុណភាពខ្ពស់ ធន់ មិនច្រេះ មិនជាប់ខ្លាញ់ និងរ៉ូប៊ីណេលាងចានស្ពាន់ពណ៌មាសប្រណិត — រចនាម៉ូដទាន់សម័យ ធន់នឹងការឆ្កូត ស្រូបសំឡេងទឹកហូរ និងងាយស្រួលសម្អាត។ ស័ក្តិសមឥតខ្ចោះសម្រាប់ផ្ទះបាយគេហដ្ឋាន ខុនដូ វីឡា និងភោជនីយដ្ឋាន ជាមួយនឹងតម្លៃពិសេសពីរោងចក្រ និងការធានាគុណភាពត្រឹមត្រូវ។'
                : 'High-grade stainless steel kitchen sinks and luxury gold brass mixer taps designed for durability, rust resistance, sound absorption, and effortless maintenance. Engineered to enhance the beauty and functionality of modern residential, condo, villa, and commercial kitchens with direct factory prices and quality assurance.'
            }}
          </p>
        </div>
      </section>

      <!-- Kitchen Sinks Subcategories Card -->
      <section class="foundation-steel-card" aria-labelledby="sinks-heading">
        <h2 id="sinks-heading" class="foundation-steel_title" :class="{ 'is-khmer': isKhmer }">
          {{ isKhmer ? 'ប្រភេទឡាបូលាងចាន និងរ៉ូប៊ីណេផ្ទះបាយ' : 'Kitchen sinks, taps & basin collection' }}
        </h2>

        <div class="foundation-steel_grid">
          <RouterLink
            v-for="item in sinkItems"
            :key="item.id"
            :to="{ path: '/products', query: { search: item.search } }"
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
  padding-top: 24px;
  padding-bottom: 60px;
}

/* Breadcrumb */
.category-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  color: #6b7280;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.category-breadcrumb_link {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.15s ease;
}

.category-breadcrumb_link:hover {
  color: #111827;
}

.category-breadcrumb_separator {
  color: #9ca3af;
  font-size: 12px;
}

.category-breadcrumb_current {
  color: #111827;
  font-weight: 600;
}

/* Sub-navigation Tabs Bar */
.feature-tabs-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  padding: 8px 0;
  margin-bottom: 28px;
  overflow-x: auto;
  scrollbar-width: none;
}

.feature-tabs-bar::-webkit-scrollbar {
  display: none;
}

.feature-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px 14px;
  color: #4b5563;
  position: relative;
  transition: color 0.15s ease;
  flex-shrink: 0;
}

.feature-tab:hover {
  color: #111827;
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
  color: #ffffff !important;
}

:root[data-theme="dark"] .foundation-steel_title,
body.dark .foundation-steel_title {
  color: #ffffff !important;
}

:root[data-theme="dark"] .category-breadcrumb_link,
:root[data-theme="dark"] .category-breadcrumb_separator,
:root[data-theme="dark"] .category-breadcrumb_current {
  color: #ffffff !important;
}

:root[data-theme="dark"] .feature-tabs-bar,
body.dark .feature-tabs-bar {
  border-top-color: rgba(255, 255, 255, 0.2) !important;
  border-bottom-color: rgba(255, 255, 255, 0.2) !important;
}

:root[data-theme="dark"] .feature-tab,
body.dark .feature-tab,
:root[data-theme="dark"] .feature-tab_icon,
body.dark .feature-tab_icon,
:root[data-theme="dark"] .feature-tab_label,
body.dark .feature-tab_label {
  color: #ffffff !important;
  fill: currentColor !important;
}

:root[data-theme="dark"] .feature-tab svg,
body.dark .feature-tab svg {
  color: #ffffff !important;
}

:root[data-theme="dark"] .feature-tab.is-active,
body.dark .feature-tab.is-active {
  color: #ffffff !important;
  font-weight: 700 !important;
}

:root[data-theme="dark"] .feature-tab_indicator,
body.dark .feature-tab_indicator {
  background-color: #ffffff !important;
}

:root[data-theme="dark"] .feature-tab:hover,
body.dark .feature-tab:hover {
  color: #ffffff !important;
  opacity: 0.85;
}
</style>

