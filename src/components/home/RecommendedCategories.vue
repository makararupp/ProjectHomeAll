<script setup>
import { useI18n } from '@/composables/useI18n'

const { isKhmer } = useI18n()

const categories = [
  { id: 1, image: new URL('@/assets/images/categories/steel-products.png', import.meta.url).href, label: 'Steel Products', labelKm: 'ផលិតផលដែក', href: '/categories/steel-products' },
  { id: 2, image: new URL('@/assets/images/categories/pvc-hose.png', import.meta.url).href, label: 'PVC Hose', labelKm: 'បំពង់ PVC', href: '/products?search=PVC+Hose' },
  { id: 3, image: new URL('@/assets/images/categories/water-pipes.png', import.meta.url).href, label: 'Water Pipes', labelKm: 'បំពង់ទឹក', href: '/products?search=Water+Pipes' },
  { id: 4, image: new URL('@/assets/images/categories/electrical-system.png', import.meta.url).href, label: 'Electrical System', labelKm: 'ប្រព័ន្ធអគ្គិសនី', href: '/products?search=Electrical' },
  { id: 5, image: new URL('@/assets/images/categories/tank.png', import.meta.url).href, label: 'Water Tank', labelKm: 'ធុងទឹក', href: '/products?search=Tank' },
  { id: 6, image: new URL('@/assets/images/categories/pump-water-pipe.png', import.meta.url).href, label: 'Water Pump', labelKm: 'ម៉ាស៊ីនបូមទឹក', href: '/products?search=Water+Pump' },
  { id: 7, image: new URL('@/assets/images/categories/cement.png', import.meta.url).href, label: 'Cement', labelKm: 'ស៊ីម៉ង់', href: '/products?search=Cement' },
  { id: 8, image: new URL('@/assets/images/categories/bricks.png', import.meta.url).href, label: 'Bricks', labelKm: 'ឥដ្ឋ', href: '/categories/bricks' },
  { id: 9, image: new URL('@/assets/images/categories/roof.png', import.meta.url).href, label: 'Roof Tiles', labelKm: 'ក្បឿង', href: '/categories/roof-tiles' },
  { id: 10, image: new URL('@/assets/images/categories/floors-walls.png', import.meta.url).href, label: 'Floors & Walls', labelKm: 'ក្បឿងតុបតែង', href: '/products?search=Floor' },
  { id: 11, image: new URL('@/assets/images/categories/paints-equipments.png', import.meta.url).href, label: 'Paints', labelKm: 'ថ្នាំលាប', href: '/products?search=Paint' },
  { id: 12, image: new URL('@/assets/images/categories/hardware-tools.png', import.meta.url).href, label: 'Hardware Tools', labelKm: 'ឧបករណ៍', href: '/products?search=Hardware' }
]
</script>

<template>
  <section class="rec-section">
    <div class="rec-container">
      <!-- Header -->
      <div class="rec-header">
        <h2 class="rec-title">
          {{ isKhmer ? 'ប្រភេទផលិតផលណែនាំ' : 'Recommended Categories' }}
        </h2>
        <router-link to="/categories" class="rec-view-all">
          {{ isKhmer ? 'មើលទាំងអស់' : 'View all' }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </router-link>
      </div>

      <!-- Scrollable row -->
      <div class="rec-scroll">
        <router-link
          v-for="cat in categories"
          :key="cat.id"
          :to="cat.href"
          class="rec-item"
        >
          <div class="rec-icon-box">
            <img :src="cat.image" :alt="cat.label" class="rec-img" />
          </div>
          <span class="rec-label">{{ isKhmer ? cat.labelKm : cat.label }}</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style>
/* ── Light mode ────────────────────────────────────────── */
.rec-section {
  background: #ffffff;
  padding: 20px 0 24px;
  border-bottom: 1px solid #f0f0f0;
}

.rec-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

.rec-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.rec-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #000000;
  margin: 0;
}

.rec-view-all {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #000000;
  text-decoration: none;
  transition: opacity 0.2s;
}

.rec-view-all:hover {
  opacity: 0.75;
}

.rec-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 6px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.rec-scroll::-webkit-scrollbar {
  display: none;
}

.rec-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  flex: 0 0 auto;
  width: 90px;
  cursor: pointer;
  transition: transform 0.18s ease;
}

.rec-item:hover {
  transform: translateY(-3px);
}

.rec-icon-box {
  width: 80px;
  height: 80px;
  background: #f7f8fa;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: box-shadow 0.18s ease, background 0.18s ease;
  border: 1px solid #ebebeb;
}

.rec-item:hover .rec-icon-box {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.10);
  background: #ffffff;
}

.rec-img {
  width: 58px;
  height: 58px;
  object-fit: contain;
}

.rec-label {
  font-size: 0.7rem;
  color: #374151;
  text-align: center;
  line-height: 1.3;
  font-weight: 500;
  max-width: 86px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Dark mode ─────────────────────────────────────────── */
body.dark .rec-section,
:root[data-theme="dark"] .rec-section {
  background: #1a2236 !important;
  border-bottom-color: rgba(255, 255, 255, 0.08) !important;
}

body.dark .rec-title,
:root[data-theme="dark"] .rec-title {
  color: #ffffff !important;
}

body.dark .rec-icon-box,
:root[data-theme="dark"] .rec-icon-box {
  background: #252d3d !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

body.dark .rec-item:hover .rec-icon-box,
:root[data-theme="dark"] .rec-item:hover .rec-icon-box {
  background: #2d3748 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35) !important;
}

body.dark .rec-label,
:root[data-theme="dark"] .rec-label {
  color: #e2e8f0 !important;
}

body.dark .rec-view-all,
:root[data-theme="dark"] .rec-view-all {
  color: #ffffff !important;
}
</style>

