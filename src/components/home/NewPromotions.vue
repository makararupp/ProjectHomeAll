<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'

// Promotion images for the 6 cards from assets/images/New&Promotion
import pt1 from '@/assets/images/New&Promotion/pt1.jpg'
import pt2 from '@/assets/images/New&Promotion/pt2.jpg'
import pt3 from '@/assets/images/New&Promotion/pt3.jpg'
import pt4 from '@/assets/images/New&Promotion/pt4.jpg'
import pt5 from '@/assets/images/New&Promotion/pt5.jpg'
import pt6 from '@/assets/images/New&Promotion/pt6.jpg'

// Dynamically import all images in PopupPromotion folder
const promoImagesMap = import.meta.glob('../../assets/images/PopupPromotion/*.{png,jpg,jpeg,webp,svg,gif,PNG,JPG,JPEG}', { eager: true, import: 'default' })

const { currentLocale } = useI18n()
const isKhmer = computed(() => currentLocale.value === 'km')

// 6 promotion cards matching user specification (pt1 to pt6)
const quickCategories = [
  { id: 'pt1', title: 'Wall-Hung Basin', titleKm: 'ឡាបូលាងដៃភ្ជាប់ជញ្ជាំង', image: pt1, href: '/categories/washbasin' },
  { id: 'pt2', title: 'Roof Tile Red', titleKm: 'ក្បឿងជើបម៉ុង ពណ៌ក្រហម', image: pt2, href: '/categories/roof-tiles' },
  { id: 'pt3', title: 'Karat Toilet 4.5L', titleKm: 'បង្គន់ការ៉ាត់ចុច KARAT', image: pt3, href: '/categories/toilets' },
  { id: 'pt4', title: '4-Hole Brick', titleKm: 'ឥដ្ឋប្រហោងផ្កា៤', image: pt4, href: '/categories/bricks' },
  { id: 'pt5', title: 'Ridge Tile', titleKm: 'ត្រាំជើបម៉ុង', image: pt5, href: '/categories/ridge-tiles' },
  { id: 'pt6', title: 'Kitchen Sink', titleKm: 'ឡាបូលាងចាន', image: pt6, href: '/categories/kitchen-sinks' }
]

const slides = computed(() => {
  const sortedEntries = Object.entries(promoImagesMap).sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  )
  return sortedEntries.map(([, img], idx) => ({
    id: idx + 1,
    image: img,
    alt: `Promotion ${idx + 1}`
  }))
})

const currentIndex = ref(0)
let timer = null

// Slick Mouse & Touch Dragging State
const isDragging = ref(false)
const dragStartX = ref(0)
const dragCurrentX = ref(0)
const dragDeltaX = ref(0)
const wasDragged = ref(false)

const trackStyle = computed(() => {
  if (isDragging.value) {
    return {
      transform: `translateX(calc(-${currentIndex.value * 100}% + ${dragDeltaX.value}px))`,
      transition: 'none'
    }
  }
  return {
    transform: `translateX(-${currentIndex.value * 100}%)`,
    transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
  }
})

function onDragStart(e) {
  stopAutoPlay()
  isDragging.value = true
  wasDragged.value = false
  const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX
  dragStartX.value = clientX
  dragCurrentX.value = clientX
  dragDeltaX.value = 0
}

function onDragMove(e) {
  if (!isDragging.value) return
  const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX
  dragCurrentX.value = clientX
  dragDeltaX.value = clientX - dragStartX.value
  if (Math.abs(dragDeltaX.value) > 6) {
    wasDragged.value = true
  }
}

function onDragEnd() {
  if (!isDragging.value) return
  isDragging.value = false
  const threshold = 40
  if (dragDeltaX.value < -threshold) {
    nextSlide()
  } else if (dragDeltaX.value > threshold) {
    prevSlide()
  }
  dragDeltaX.value = 0
  startAutoPlay()
}

function onMouseLeaveWrap() {
  if (isDragging.value) {
    onDragEnd()
  }
  startAutoPlay()
}

function onSlideClick(e) {
  // If user was dragging/swiping, do not advance
  if (wasDragged.value) return
  // Left click advances to next slide
  nextSlide()
  restartAutoPlay()
}

let wheelDebounce = null
function onWheel(e) {
  if (wheelDebounce) return
  wheelDebounce = setTimeout(() => {
    wheelDebounce = null
  }, 250)

  if (e.deltaY > 0 || e.deltaX > 0) {
    nextSlide()
  } else if (e.deltaY < 0 || e.deltaX < 0) {
    prevSlide()
  }
  restartAutoPlay()
}

function nextSlide() {
  const total = slides.value.length
  if (total === 0) return
  currentIndex.value = (currentIndex.value + 1) % total
}

function prevSlide() {
  const total = slides.value.length
  if (total === 0) return
  currentIndex.value = (currentIndex.value - 1 + total) % total
}

function goToSlide(idx) {
  currentIndex.value = idx
  restartAutoPlay()
}

function startAutoPlay() {
  stopAutoPlay()
  timer = setInterval(nextSlide, 4500)
}

function stopAutoPlay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function restartAutoPlay() {
  startAutoPlay()
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <section class="new-promotions" aria-label="New and Promotions">
    <div class="container">
      <!-- Section Title Header -->
      <div class="new-promotions_header">
        <h2 class="new-promotions_section-title" :class="{ 'new-promotions_section-title--km': isKhmer }">
          {{ isKhmer ? 'ព័ត៌មាន និងប្រូម៉ូសិន' : 'New & Promotions' }}
        </h2>
        <div class="section-underline" />
      </div>

      <!-- 3-Column Layout: Categories Card + Image Slider + Order Now Card -->
      <div class="new-promotions_grid">
        <!-- 1. Left: Card in Front of Image Slider (6 Big Category Image Boxes) -->
        <div class="new-promotions_categories-card">
          <div class="new-promotions_categories-grid">
            <RouterLink
              v-for="cat in quickCategories"
              :key="cat.id"
              :to="cat.href || '/products'"
              class="new-promotions_cat-item"
              :title="isKhmer ? cat.titleKm : cat.title"
              :aria-label="isKhmer ? cat.titleKm : cat.title"
            >
              <img
                :src="cat.image"
                :alt="cat.title"
                class="new-promotions_cat-img"
                loading="lazy"
              />
            </RouterLink>
          </div>
        </div>

        <!-- 2. Middle: Promotions Carousel Slider (Display-only, arrows/drag/dots) -->
        <div
          class="new-promotions_slider-wrap"
          :class="{ 'is-dragging': isDragging }"
          @mouseenter="stopAutoPlay"
          @mouseleave="onMouseLeaveWrap"
          @mousedown="onDragStart"
          @mousemove="onDragMove"
          @mouseup="onDragEnd"
          @wheel.prevent="onWheel"
          @touchstart.passive="onDragStart"
          @touchmove="onDragMove"
          @touchend="onDragEnd"
          @click="onSlideClick"
        >
          <div class="new-promotions_track" :style="trackStyle">
            <div
              v-for="slide in slides"
              :key="slide.id"
              class="new-promotions_slide"
            >
              <!-- Clean White Background Slide with Centered Image -->
              <div class="new-promotions_slide-img-box">
                <img
                  :src="slide.image"
                  :alt="slide.alt"
                  class="new-promotions_slide-img"
                  loading="lazy"
                  draggable="false"
                />
              </div>
            </div>
          </div>

          <!-- Slider Arrows (Visible on hover) -->
          <button
            type="button"
            class="new-promotions_arrow new-promotions_arrow--prev"
            aria-label="Previous slide"
            @click.stop="prevSlide(); restartAutoPlay()"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            class="new-promotions_arrow new-promotions_arrow--next"
            aria-label="Next slide"
            @click.stop="nextSlide(); restartAutoPlay()"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <!-- Slider Indicator Dots -->
          <div class="new-promotions_dots">
            <button
              v-for="(slide, idx) in slides"
              :key="slide.id"
              type="button"
              class="new-promotions_dot"
              :class="{ 'new-promotions_dot--active': idx === currentIndex }"
              :aria-label="`Go to slide ${idx + 1}`"
              @click.stop="goToSlide(idx)"
            />
          </div>
        </div>

        <!-- 3. Right: Free Shipping Siem Reap Card -->
        <div class="new-promotions_card">
          <div class="new-promotions_card-content">
            <span class="new-promotions_badge">
              {{ isKhmer ? 'កម្ម៉ង់ឥឡូវនេះ!' : 'Order Now!' }}
            </span>

            <h3 class="new-promotions_title" :class="{ 'new-promotions_title--km': isKhmer }">
              <span class="new-promotions_title-sub">
                {{ isKhmer ? 'ដឹកជញ្ជូនឥតគិតថ្លៃ' : 'Free Shipping' }}
              </span>
              <span class="new-promotions_title-city">
                {{ isKhmer ? 'សៀមរាប' : 'Siem Reap' }}
              </span>
            </h3>

            <div class="new-promotions_tag">EEC</div>

            <p class="new-promotions_desc" :class="{ 'new-promotions_desc--km': isKhmer }">
              <template v-if="isKhmer">
                ជាមួយប័ណ្ណ<br />ដឹកជញ្ជូនឥតគិតថ្លៃ
              </template>
              <template v-else>
                with Free Shipping<br />Coupon
              </template>
            </p>

            <!-- Running Delivery Truck Icon with Road & Wind Lines -->
            <div class="new-promotions_icon-wrap">
              <div class="new-promotions_truck-stage">
                <div class="new-promotions_speed-lines" aria-hidden="true">
                  <span class="speed-line speed-line--1"></span>
                  <span class="speed-line speed-line--2"></span>
                  <span class="speed-line speed-line--3"></span>
                </div>
                <svg viewBox="0 0 74 52" class="new-promotions_truck-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <!-- Truck Cab -->
                  <path d="M48 16 H59 L66 26 V38 H48" />
                  <line x1="59" y1="26" x2="48" y2="26" />
                  <!-- Truck Cargo Box -->
                  <rect x="6" y="8" width="42" height="30" rx="3.5" />
                  <!-- Connecting Axle Lines -->
                  <line x1="21.5" y1="40" x2="26.5" y2="40" />
                  <line x1="35.5" y1="40" x2="48" y2="40" />
                  <!-- Parcel Inside Cargo Box -->
                  <rect x="13" y="16" width="13" height="15" rx="1.5" />
                  <line x1="13" y1="22" x2="26" y2="22" />
                  <line x1="19.5" y1="16" x2="19.5" y2="31" />
                  <!-- Animated Running Wheels with Spokes -->
                  <g class="truck-wheel truck-wheel--1">
                    <circle cx="17" cy="40" r="4.5" />
                    <line x1="17" y1="36" x2="17" y2="44" stroke-width="1.2" />
                    <line x1="13" y1="40" x2="21" y2="40" stroke-width="1.2" />
                  </g>
                  <g class="truck-wheel truck-wheel--2">
                    <circle cx="31" cy="40" r="4.5" />
                    <line x1="31" y1="36" x2="31" y2="44" stroke-width="1.2" />
                    <line x1="27" y1="40" x2="35" y2="40" stroke-width="1.2" />
                  </g>
                  <g class="truck-wheel truck-wheel--3">
                    <circle cx="58" cy="40" r="4.5" />
                    <line x1="58" y1="36" x2="58" y2="44" stroke-width="1.2" />
                    <line x1="54" y1="40" x2="62" y2="40" stroke-width="1.2" />
                  </g>
                </svg>
              </div>
              <!-- Running Road Track -->
              <div class="new-promotions_road-track" aria-hidden="true">
                <div class="new-promotions_road-dashes"></div>
              </div>
            </div>

            <span class="new-promotions_footer-note" :class="{ 'new-promotions_footer-note--km': isKhmer }">
              {{ isKhmer ? '*សម្រាប់តែទំនិញដែលបានកំណត់' : '*only on participating products' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.new-promotions {
  padding: 16px 0 24px 0;
  width: 100%;
  background-color: #ffffff;
}

/* ----------------------------------------------------
   Section Header & Bold Title
---------------------------------------------------- */
.new-promotions_header {
  margin-bottom: 16px;
}

.new-promotions_section-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-heading, #1f2937);
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0;
}

.new-promotions_section-title--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0;
}

.new-promotions_header .section-underline {
  margin-top: 6px;
}

/* ----------------------------------------------------
   3-Column Main Grid Layout
---------------------------------------------------- */
.new-promotions_grid {
  display: flex;
  gap: 16px;
  align-items: stretch;
  width: 100%;
}

/* ----------------------------------------------------
   1. Left: Categories Card in Front of Slider
---------------------------------------------------- */
.new-promotions_categories-card {
  width: 250px;
  flex-shrink: 0;
  height: 330px;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  justify-content: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.new-promotions_categories-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.new-promotions_categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
  height: 100%;
}

.new-promotions_cat-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1.5px solid rgba(226, 232, 240, 0.95);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  padding: 0;
  box-sizing: border-box;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
}

.new-promotions_cat-item:hover {
  transform: translateY(-4px);
  border-color: var(--color-brand, #34c759);
  box-shadow: 0 10px 24px rgba(52, 199, 89, 0.25);
}

.new-promotions_cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.new-promotions_cat-item:hover .new-promotions_cat-img {
  transform: scale(1.06);
}

/* ----------------------------------------------------
   2. Middle: Promotions Carousel Slider
---------------------------------------------------- */
.new-promotions_slider-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
  border-radius: 16px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.07);
  height: 330px;
  display: flex;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition: box-shadow 0.28s ease, transform 0.28s ease;
}

.new-promotions_slider-wrap:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.new-promotions_slider-wrap.is-dragging {
  cursor: grabbing;
}

.new-promotions_track {
  display: flex;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.new-promotions_slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Full bleed cropped image presentation matching hero slider */
.new-promotions_slide-img-box {
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
  background-color: #ffffff;
}

.new-promotions_slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.new-promotions_slide:hover .new-promotions_slide-img {
  transform: scale(1.015);
}

/* Slider Arrows */
.new-promotions_arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.92);
  color: #1f2937;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  opacity: 0;
  transition: all 0.25s ease;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.new-promotions_slider-wrap:hover .new-promotions_arrow {
  opacity: 1;
}

.new-promotions_arrow:hover {
  background-color: #ffffff;
  color: var(--color-brand, #34c759);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  border-color: var(--color-brand, #34c759);
}

.new-promotions_arrow--prev {
  left: 14px;
}

.new-promotions_arrow--next {
  right: 14px;
}

/* Indicator Dots Pill */
.new-promotions_dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10;
  padding: 4px 10px;
  background-color: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.new-promotions_dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.55);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.25s ease;
}

.new-promotions_dot:hover {
  background-color: #ffffff;
}

.new-promotions_dot--active {
  width: 20px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.9);
}

/* ----------------------------------------------------
   3. Right: Free Shipping Siem Reap Card
---------------------------------------------------- */
.new-promotions_card {
  width: 250px;
  flex-shrink: 0;
  height: 330px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(155deg, #34c759 0%, #269c46 50%, #1b7a34 100%);
  color: #ffffff;
  padding: 16px 14px 12px 14px;
  box-sizing: border-box;
  box-shadow: 0 4px 18px rgba(38, 156, 70, 0.3);
  position: relative;
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}

.new-promotions_card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(38, 156, 70, 0.45);
}

.new-promotions_card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}

.new-promotions_badge {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.02em;
  margin-bottom: 2px;
}

.new-promotions_title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.new-promotions_title-sub {
  font-size: 17px;
  font-weight: 600;
  color: #ffffff;
}

.new-promotions_title-city {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #ffffff;
  margin-top: 1px;
}

.new-promotions_title--km .new-promotions_title-sub {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 15px;
}

.new-promotions_title--km .new-promotions_title-city {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 18px;
}

.new-promotions_tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 4px;
}

.new-promotions_desc {
  font-size: 12.5px;
  line-height: 1.3;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 6px 0;
}

.new-promotions_desc--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 12px;
  line-height: 1.4;
}

.new-promotions_icon-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  position: relative;
}

.new-promotions_truck-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Trailing Speed Wind Lines */
.new-promotions_speed-lines {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  margin-right: 3px;
}

.speed-line {
  height: 2px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
  animation: windSpeed 0.6s ease-in-out infinite alternate;
}

.speed-line--1 {
  width: 12px;
  animation-delay: 0.1s;
}

.speed-line--2 {
  width: 18px;
  animation-delay: 0.25s;
}

.speed-line--3 {
  width: 9px;
  animation-delay: 0.4s;
}

@keyframes windSpeed {
  0% {
    opacity: 0.25;
    transform: translateX(3px) scaleX(0.7);
  }
  100% {
    opacity: 0.95;
    transform: translateX(-3px) scaleX(1.15);
  }
}

/* Running Truck Bounce & Suspension */
.new-promotions_truck-svg {
  width: 48px;
  height: 32px;
  color: #ffffff;
  display: block;
  animation: truckRun 1.1s ease-in-out infinite;
  transform-origin: center bottom;
}

@keyframes truckRun {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  25% {
    transform: translateY(-2px) translateX(2px) rotate(-0.8deg);
  }
  50% {
    transform: translateY(0.5px) translateX(4px) rotate(0.6deg);
  }
  75% {
    transform: translateY(-1.5px) translateX(1px) rotate(-0.5deg);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
}

/* Spinning Wheels */
.truck-wheel {
  animation: wheelSpin 0.45s linear infinite;
}

.truck-wheel--1 {
  transform-origin: 17px 40px;
}

.truck-wheel--2 {
  transform-origin: 31px 40px;
}

.truck-wheel--3 {
  transform-origin: 58px 40px;
}

@keyframes wheelSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Running Road Track */
.new-promotions_road-track {
  width: 76px;
  height: 2px;
  overflow: hidden;
  margin-top: 2px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
}

.new-promotions_road-dashes {
  width: 200%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    #ffffff 0,
    #ffffff 6px,
    transparent 6px,
    transparent 12px
  );
  animation: roadScroll 0.45s linear infinite;
}

@keyframes roadScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-12px);
  }
}

/* Hover Acceleration (Turbo Run) */
.new-promotions_card:hover .new-promotions_truck-svg {
  animation-duration: 0.65s;
}

.new-promotions_card:hover .truck-wheel {
  animation-duration: 0.22s;
}

.new-promotions_card:hover .new-promotions_road-dashes {
  animation-duration: 0.22s;
}

.new-promotions_card:hover .speed-line {
  animation-duration: 0.35s;
}

.new-promotions_footer-note {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.2;
}

.new-promotions_footer-note--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 9.5px;
}

/* ----------------------------------------------------
   Responsive Breakpoints
---------------------------------------------------- */
@media (max-width: 1199px) {
  .new-promotions_categories-card {
    width: 230px;
    height: 310px;
    padding: 10px;
  }

  .new-promotions_slider-wrap,
  .new-promotions_card {
    height: 310px;
  }

  .new-promotions_card {
    width: 230px;
    padding: 14px 12px;
  }

  .new-promotions_title-sub {
    font-size: 15px;
  }

  .new-promotions_title-city {
    font-size: 18px;
  }
}

/* Tablet Layout (641px - 991px): Slider full width on top, Categories & Shipping side-by-side below */
@media (max-width: 991px) {
  .new-promotions_grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .new-promotions_slider-wrap {
    grid-column: 1 / -1;
    order: 1;
    width: 100%;
    height: 290px;
  }

  .new-promotions_categories-card {
    grid-column: 1 / 2;
    order: 2;
    width: 100%;
    height: 230px;
    padding: 12px;
  }

  .new-promotions_categories-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 8px;
  }

  .new-promotions_card {
    grid-column: 2 / 3;
    order: 3;
    width: 100%;
    height: 230px;
    padding: 16px 14px 12px 14px;
  }

  .new-promotions_arrow {
    opacity: 0.9;
    width: 34px;
    height: 34px;
  }
}

/* Mobile Layout (<= 640px): 1 Column Vertical Stack */
@media (max-width: 640px) {
  .new-promotions {
    padding: 10px 0 16px 0;
  }

  .new-promotions_header {
    margin-bottom: 12px;
  }

  .new-promotions_section-title {
    font-size: 19px;
  }

  .new-promotions_section-title--km {
    font-size: 17px;
  }

  .new-promotions_grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .new-promotions_slider-wrap {
    order: 1;
    width: 100%;
    height: 220px;
    border-radius: 14px;
  }

  .new-promotions_arrow {
    opacity: 1;
    width: 30px;
    height: 30px;
  }

  .new-promotions_arrow--prev {
    left: 8px;
  }

  .new-promotions_arrow--next {
    right: 8px;
  }

  .new-promotions_arrow svg {
    width: 14px;
    height: 14px;
  }

  .new-promotions_dots {
    bottom: 8px;
    padding: 3px 8px;
    gap: 4px;
  }

  .new-promotions_dot {
    width: 5px;
    height: 5px;
  }

  .new-promotions_dot--active {
    width: 16px;
  }

  .new-promotions_categories-card {
    order: 2;
    width: 100%;
    height: auto;
    padding: 12px;
    border-radius: 14px;
  }

  .new-promotions_categories-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 8px;
  }

  .new-promotions_cat-item {
    height: 76px;
    padding: 0;
    border-radius: 10px;
  }

  .new-promotions_card {
    order: 3;
    width: 100%;
    height: auto;
    min-height: 165px;
    padding: 16px 14px 12px 14px;
    border-radius: 14px;
  }

  .new-promotions_truck-svg {
    width: 40px;
    height: 26px;
  }

  .new-promotions_desc {
    font-size: 12px;
    margin-bottom: 6px;
  }
}

/* Extra Small Phones (<= 400px) */
@media (max-width: 400px) {
  .new-promotions_slider-wrap {
    height: 190px;
  }

  .new-promotions_categories-grid {
    gap: 6px;
  }

  .new-promotions_cat-item {
    height: 64px;
    padding: 0;
  }

  .new-promotions_cat-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>

<!-- Dark Mode Support -->
<style>
:root[data-theme="dark"] .new-promotions,
body.dark .new-promotions {
  background: transparent !important;
}

:root[data-theme="dark"] .new-promotions_section-title,
body.dark .new-promotions_section-title {
  color: #ffffff !important;
}

:root[data-theme="dark"] .new-promotions_categories-card,
body.dark .new-promotions_categories-card {
  background-color: #1e293b !important;
  border-color: #334155 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35) !important;
}

:root[data-theme="dark"] .new-promotions_cat-item,
body.dark .new-promotions_cat-item {
  background-color: #0f172a !important;
  border-color: #334155 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25) !important;
}

:root[data-theme="dark"] .new-promotions_cat-item:hover,
body.dark .new-promotions_cat-item:hover {
  border-color: var(--color-brand, #34c759) !important;
  box-shadow: 0 8px 20px rgba(52, 199, 89, 0.25) !important;
}

:root[data-theme="dark"] .new-promotions_slider-wrap,
body.dark .new-promotions_slider-wrap,
:root[data-theme="dark"] .new-promotions_slide,
body.dark .new-promotions_slide,
:root[data-theme="dark"] .new-promotions_slide-img-box,
body.dark .new-promotions_slide-img-box {
  border-color: #334155 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35) !important;
  background-color: #1e293b !important;
}

:root[data-theme="dark"] .new-promotions_arrow,
body.dark .new-promotions_arrow {
  background-color: rgba(30, 41, 59, 0.92) !important;
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}

:root[data-theme="dark"] .new-promotions_card,
body.dark .new-promotions_card {
  background: linear-gradient(155deg, #2ea349 0%, #228b3e 50%, #166534 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;
}
</style>
