<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { categories } from '@/data/categories'
import { megaMenuCategories } from '@/data/megaMenuData'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

function scrollToServices() {
  const el = document.getElementById('services') || document.querySelector('.services_grid')
  if (el) {
    const headerHeight = 120
    const rect = el.getBoundingClientRect()
    const topPos = rect.top + window.pageYOffset - headerHeight
    window.scrollTo({
      top: topPos,
      behavior: 'smooth'
    })
    return true
  }
  return false
}

function getActiveKeyFromPath(path) {
  if (path.includes('industrial-parts')) return 'industrialParts'
  if (path.includes('construction')) return 'construction'
  if (path.includes('food-beverage') || path.includes('/food')) return 'foodBeverage'
  return ''
}

const activeCategoryKey = ref(getActiveKeyFromPath(route.path))

watch(
  () => route.path,
  (path) => {
    const key = getActiveKeyFromPath(path)
    if (key) {
      activeCategoryKey.value = key
    } else if (['industrialParts', 'construction', 'foodBeverage'].includes(activeCategoryKey.value)) {
      activeCategoryKey.value = ''
    }
  }
)

function selectCategoryLink(category) {
  activeCategoryKey.value = activeCategoryKey.value === category.key ? '' : category.key
  if (category.key === 'services') {
    if (route.path === '/') {
      scrollToServices()
      window.history.pushState(null, '', '#services')
    } else {
      router.push({ path: '/', hash: '#services' }).then(() => {
        setTimeout(scrollToServices, 60)
        setTimeout(scrollToServices, 250)
        setTimeout(scrollToServices, 600)
      })
    }
  }
}

// Helper to convert kebab-case id to camelCase key for translations
function getCategoryKey(id) {
  if (!id) return ''
  return id.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
}

const isOpen = ref(false)
const selectedCategoryIndex = ref(0)
const navRef = ref(null)

let closeTimer = null

function openMenu() {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  isOpen.value = true
}

function scheduleCloseMenu() {
  if (closeTimer) {
    clearTimeout(closeTimer)
  }
  closeTimer = setTimeout(() => {
    isOpen.value = false
  }, 220)
}

function toggleMenu() {
  if (isOpen.value) {
    isOpen.value = false
  } else {
    openMenu()
  }
}

function selectCategory(index) {
  selectedCategoryIndex.value = index
}

// Close on click outside
function handleClickOutside(event) {
  if (navRef.value && !navRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

// Close on Escape key
function handleKeyDown(event) {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  if (closeTimer) clearTimeout(closeTimer)
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <nav ref="navRef" class="category-nav" aria-label="Categories">
    <div class="category-nav_inner">
      <!-- "All Categories" Mega Menu Trigger -->
      <button
        type="button"
        class="category-nav_trigger"
        :class="{ 'is-active': isOpen }"
        :aria-expanded="isOpen"
        aria-haspopup="true"
        @mouseenter="openMenu"
        @mouseleave="scheduleCloseMenu"
        @click="toggleMenu"
      >
        <span class="category-nav_trigger-icon" :class="{ 'is-open': isOpen }" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span class="category-nav_trigger-text">{{ t('categories.allCategories', 'All Categories') }}</span>
        <svg
          class="category-nav_caret"
          :class="{ 'is-flipped': isOpen }"
          viewBox="0 0 20 20"
          fill="currentColor"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Category Links in the header bar -->
      <ul class="category-nav_list">
        <li v-for="category in categories" :key="category.key || category.label">
          <RouterLink
            v-if="category.href"
            :to="category.href"
            class="category-nav_link"
            :class="{ 'is-active': activeCategoryKey === category.key }"
            @click="activeCategoryKey = category.key"
          >
            {{ category.key ? t(`categories.${category.key}`, category.label) : category.label }}
          </RouterLink>
          <button
            v-else
            type="button"
            class="category-nav_link category-nav_link--btn"
            :class="{ 'is-active': activeCategoryKey === category.key }"
            @click="selectCategoryLink(category)"
          >
            {{ category.key ? t(`categories.${category.key}`, category.label) : category.label }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Mega Menu Dropdown -->
    <transition name="mega-dropdown">
      <div
        v-if="isOpen"
        class="mega-menu"
        role="region"
        aria-label="All Categories Menu"
        @mouseenter="openMenu"
        @mouseleave="scheduleCloseMenu"
      >
        <div class="mega-menu_container">
          <!-- Left Sidebar: Category List -->
          <aside class="mega-menu_sidebar" aria-label="Category Navigation">
            <ul class="mega-menu_sidebar-list">
              <li
                v-for="(cat, index) in megaMenuCategories"
                :key="cat.id"
                class="mega-menu_sidebar-item"
                :class="{ 'is-active': selectedCategoryIndex === index }"
                @mouseenter="selectCategory(index)"
                @click="selectCategory(index)"
              >
                <!-- Sidebar Category Icon -->
                <span class="mega-menu_sidebar-icon" aria-hidden="true">
                  <!-- Star -->
                  <svg v-if="cat.icon === 'star'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <!-- Headphones -->
                  <svg v-else-if="cat.icon === 'headphones'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                  <!-- Sports / Shuttlecock -->
                  <svg v-else-if="cat.icon === 'badminton'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3a9 9 0 0 0 0 18M3 12a9 9 0 0 0 18 0" />
                  </svg>
                  <!-- Machinery -->
                  <svg v-else-if="cat.icon === 'printer'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <!-- Excavator / Construction -->
                  <svg v-else-if="cat.icon === 'excavator'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 17h20M5 17v-5h6v5M11 12l4-5h5v5" />
                    <circle cx="6" cy="17" r="2" />
                    <circle cx="18" cy="17" r="2" />
                  </svg>
                  <!-- Lightbulb -->
                  <svg v-else-if="cat.icon === 'bulb'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
                  </svg>
                  <!-- Apparel -->
                  <svg v-else-if="cat.icon === 'dress'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 3l3 4-3 14h12l-3-14 3-4-4 1-2 2-2-2z" />
                  </svg>
                  <!-- Home -->
                  <svg v-else-if="cat.icon === 'home'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <!-- Sportswear -->
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                  </svg>
                </span>

                <span class="mega-menu_sidebar-name">{{ t(`categories.${getCategoryKey(cat.id)}`, cat.name) }}</span>
              </li>
            </ul>
          </aside>

          <!-- Right Content Area: Subcategory Circular Grid -->
          <section class="mega-menu_content">
            <!-- Active Category Title -->
            <div class="mega-menu_header">
              <h3 class="mega-menu_title">{{ t(`categories.${getCategoryKey(megaMenuCategories[selectedCategoryIndex].id)}`, megaMenuCategories[selectedCategoryIndex].name) }}</h3>
            </div>

            <!-- Circular Product Items Grid -->
            <div class="mega-menu_grid">
              <a
                v-for="item in megaMenuCategories[selectedCategoryIndex].items"
                :key="item.name"
                href="#product"
                class="mega-menu_item"
                @click.prevent="isOpen = false"
              >
                <div class="mega-menu_circle-wrap">
                  <div class="mega-menu_circle">
                    <!-- Product Image from project -->
                    <img
                      v-if="item.image"
                      :src="item.image"
                      :alt="item.name"
                      class="mega-menu_circle-img"
                      loading="lazy"
                    />

                    <!-- Fallback Product Icon / Graphic -->
                    <span v-else class="mega-menu_circle-icon" aria-hidden="true">
                      <!-- Car -->
                      <svg v-if="item.icon === 'car'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M5 17h14M4 14l2-6h12l2 6M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                      </svg>
                      <!-- Meter / Tester -->
                      <svg v-else-if="item.icon === 'meter' || item.icon === 'gauge'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                        <path d="M12 12l3-5" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                      <!-- Camera -->
                      <svg v-else-if="item.icon === 'camera'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      <!-- Multimeter / Machine -->
                      <svg v-else-if="item.icon === 'multimeter' || item.icon === 'analyzer'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <rect x="4" y="2" width="16" height="20" rx="3" />
                        <rect x="7" y="5" width="10" height="5" rx="1" />
                        <circle cx="12" cy="15" r="3" />
                        <line x1="12" y1="13" x2="13" y2="15" />
                      </svg>
                      <!-- Sensor / Probe -->
                      <svg v-else-if="item.icon === 'sensor'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <rect x="8" y="2" width="8" height="12" rx="2" />
                        <line x1="10" y1="14" x2="10" y2="22" />
                        <line x1="14" y1="14" x2="14" y2="22" />
                      </svg>
                      <!-- Equipment / Box -->
                      <svg v-else-if="item.icon === 'equipment' || item.icon === 'machine'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      <!-- Watch -->
                      <svg v-else-if="item.icon === 'watch'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <circle cx="12" cy="12" r="7" />
                        <polyline points="12 9 12 12 13.5 13.5" />
                        <path d="M16.51 17.35l-.85 4.65h-7.32l-.85-4.65M7.49 6.65l.85-4.65h7.32l.85 4.65" />
                      </svg>
                      <!-- Default Tech Gadget -->
                      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </span>

                    <!-- Blue diagonal arrow badge (like in screenshot) -->
                    <span v-if="item.hasBadge" class="mega-menu_badge" aria-label="Trending">
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M3 9L9 3M9 3H4M9 3V8" />
                      </svg>
                    </span>
                  </div>
                </div>

                <span class="mega-menu_item-name">{{ item.name }}</span>
              </a>
            </div>

            <!-- Secondary Featured Section (matching screenshot bottom section) -->
            <div
              v-if="megaMenuCategories[selectedCategoryIndex].secondarySection"
              class="mega-menu_secondary"
            >
              <h4 class="mega-menu_secondary-title">
                {{ t('categories.consumerElectronics', megaMenuCategories[selectedCategoryIndex].secondarySection.title) }}
              </h4>
              <a
                :href="megaMenuCategories[selectedCategoryIndex].secondarySection.linkHref"
                class="mega-menu_secondary-link"
              >
                {{ t('categories.browseFeatured', megaMenuCategories[selectedCategoryIndex].secondarySection.linkText) }}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.category-nav {
  position: sticky;
  top: var(--header-height);
  background-color: var(--color-brand);
  height: var(--category-nav-height);
  z-index: 90;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
}

.category-nav_inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-8);
  width: 100%;
  padding: 0 var(--space-8);
}

/* "All Categories" Trigger Button */
.category-nav_trigger {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text-white);
  font-size: 15px;
  font-size: 16px;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
}

.category-nav_trigger:hover,
.category-nav_trigger.is-active {
  background: rgba(0, 0, 0, 0.18);
}

.category-nav_trigger-icon {
  display: inline-flex;
  flex-direction: column;
  gap: 3.5px;
  transition: transform var(--transition-fast);
}

.category-nav_trigger-icon span {
  width: 15px;
  height: 2px;
  border-radius: var(--radius-pill);
  background-color: var(--color-text-white);
  transition: all 0.2s ease;
}

.category-nav_trigger-icon.is-open span:nth-child(1) {
  transform: translateY(5.5px) rotate(45deg);
}

.category-nav_trigger-icon.is-open span:nth-child(2) {
  opacity: 0;
}

.category-nav_trigger-icon.is-open span:nth-child(3) {
  transform: translateY(-5.5px) rotate(-45deg);
}

.category-nav_caret {
  transition: transform 0.2s ease;
}

.category-nav_caret.is-flipped {
  transform: rotate(180deg);
}

/* Category Horizontal Links */
.category-nav_list {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  overflow-x: auto;
  scrollbar-width: none;
}

.category-nav_list::-webkit-scrollbar {
  display: none;
}

.category-nav_link {
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 6px;
  font-family: inherit;
  font-size: 15px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.94);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.92);
  white-space: nowrap;
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  line-height: 1.4;
  transition: all var(--transition-fast);
  user-select: none;
}

.category-nav_link:hover {
  background-color: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

.category-nav_link.is-active {
  background-color: rgba(0, 0, 0, 0.22);
  color: #ffffff;
  font-weight: 700;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.18);
}

/* =========================================
   Mega Menu Dropdown (Alibaba Style)
   ========================================= */
.mega-menu {
  position: absolute;
  top: var(--category-nav-height);
  left: 0;
  width: 100%;
  background: transparent;
  padding: 0 var(--space-8);
  pointer-events: auto;
}

.mega-menu_container {
  display: flex;
  max-width: 1344px;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.16), 0 8px 16px -4px rgba(0, 0, 0, 0.06);
  min-height: 480px;
  max-height: 580px;
  overflow: hidden;
}

/* Left Sidebar */
.mega-menu_sidebar {
  width: 270px;
  flex-shrink: 0;
  background-color: #f9fafb;
  border-right: 1px solid #edf0f2;
  overflow-y: auto;
}

.mega-menu_sidebar::-webkit-scrollbar {
  width: 4px;
}

.mega-menu_sidebar::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 4px;
}

.mega-menu_sidebar-list {
  display: flex;
  flex-direction: column;
  padding: 8px 0;
}

.mega-menu_sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  cursor: pointer;
  color: #4b5563;
  font-size: 13.5px;
  font-weight: 500;
  border-left: 3.5px solid transparent;
  transition: all 0.15s ease;
  user-select: none;
}

.mega-menu_sidebar-item:hover {
  background-color: #f3f4f6;
  color: #111827;
}

/* Active Category indicator (matches user screenshot black bar) */
.mega-menu_sidebar-item.is-active {
  background-color: #ffffff;
  color: #111827;
  font-weight: 600;
  border-left-color: #111827;
}

.mega-menu_sidebar-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #6b7280;
}

.mega-menu_sidebar-item.is-active .mega-menu_sidebar-icon {
  color: #111827;
}

.mega-menu_sidebar-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Right Content Area */
.mega-menu_content {
  flex: 1;
  padding: 24px 32px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.mega-menu_header {
  margin-bottom: 20px;
}

.mega-menu_title {
  font-size: 17px;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.01em;
}

/* 7-Column Circular Items Grid (matches screenshot) */
.mega-menu_grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 20px 10px;
  margin-bottom: 28px;
}

.mega-menu_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.mega-menu_item:hover {
  transform: translateY(-2px);
}

.mega-menu_circle-wrap {
  position: relative;
  margin-bottom: 8px;
}

.mega-menu_circle {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffffff 0%, #f3f5f8 100%);
  border: 1px solid #e8ecf0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.mega-menu_circle-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.mega-menu_item:hover .mega-menu_circle-img {
  transform: scale(1.08);
}

.mega-menu_item:hover .mega-menu_circle {
  border-color: var(--color-brand);
  box-shadow: 0 6px 16px rgba(52, 199, 89, 0.15);
  border-color: #cbd5e1;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
  background: #ffffff;
}

.mega-menu_circle-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  transition: color 0.2s ease;
}

.mega-menu_item:hover .mega-menu_circle-icon {
  color: var(--color-brand);
  color: #111827;
}

/* Diagonal Blue Arrow Badge (from screenshot) */
.mega-menu_badge {
  position: absolute;
  top: 1px;
  right: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #2563eb;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);
}

.mega-menu_badge svg {
  width: 10px;
  height: 10px;
}

.mega-menu_item-name {
  font-size: 11.5px;
  font-weight: 500;
  color: #374151;
  line-height: 1.25;
  max-width: 86px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.15s ease;
}

.mega-menu_item:hover .mega-menu_item-name {
  color: var(--color-brand-dark);
  color: #111827;
  font-weight: 600;
}

/* Secondary Section at Bottom */
.mega-menu_secondary {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mega-menu_secondary-title {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
}

.mega-menu_secondary-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  font-weight: 500;
  color: #2563eb;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color var(--transition-fast);
}

.mega-menu_secondary-link:hover {
  color: #1d4ed8;
}

/* Animation Transitions */
.mega-dropdown-enter-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.mega-dropdown-leave-active {
  transition: all 0.18s cubic-bezier(0.4, 0, 1, 1);
}

.mega-dropdown-enter-from,
.mega-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .mega-menu_grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 900px) {
  .mega-menu_container {
    flex-direction: column;
    max-height: 80vh;
  }

  .mega-menu_sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #edf0f2;
    max-height: 140px;
  }

  .mega-menu_sidebar-list {
    flex-direction: row;
    overflow-x: auto;
  }

  .mega-menu_sidebar-item {
    border-left: none;
    border-bottom: 3px solid transparent;
    padding: 10px 14px;
  }

  .mega-menu_sidebar-item.is-active {
    border-left-color: transparent;
    border-bottom-color: #111827;
  }

  .mega-menu_grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
