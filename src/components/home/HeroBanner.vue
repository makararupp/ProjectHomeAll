<script setup>
import { onBeforeUnmount, onMounted, ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue'
import slide1 from '@/assets/images/slide1.jpg'
import slide2 from '@/assets/images/slide2.jpg'
import slide3 from '@/assets/images/slide3.jpg'
import { useI18n } from '@/composables/useI18n'

const { t, isKhmer } = useI18n()

// 3 JPG images for carousel banner
const slides = [
  {
    id: 1,
    image: slide1,
    alt: 'Business solutions slide 1'
  },
  {
    id: 2,
    image: slide2,
    alt: 'Business solutions slide 2'
  },
  {
    id: 3,
    image: slide3,
    alt: 'Business solutions slide 3'
  }
]

const slideCount = slides.length
const activeSlide = ref(0)
let intervalId = null

// Rotating words ("Everything your [business needs / construction / quality materials / trusted suppliers / industrial solutions]")
const rotatingWordsEn = [
  'business needs.',
  'construction.',
  'quality materials.',
  'trusted suppliers.',
  'industrial solutions.'
]
const rotatingWordsKm = [
  'អាជីវកម្មរបស់អ្នកត្រូវការ',
  'ការសាងសង់សំណង់',
  'សម្ភារៈមានគុណភាព',
  'ដៃគូគួរឱ្យទុកចិត្ត',
  'ដំណោះស្រាយឧស្សាហកម្ម'
]
const currentWordIndex = ref(0)
let wordIntervalId = null

const currentWord = computed(() => {
  const words = isKhmer.value ? rotatingWordsKm : rotatingWordsEn
  return words[currentWordIndex.value % words.length]
})

watch(isKhmer, () => {
  currentWordIndex.value = 0
})

function nextRotatingWord() {
  const words = isKhmer.value ? rotatingWordsKm : rotatingWordsEn
  currentWordIndex.value = (currentWordIndex.value + 1) % words.length
}

function nextSlide() {
  activeSlide.value = (activeSlide.value + 1) % slideCount
}

function prevSlide() {
  activeSlide.value = (activeSlide.value - 1 + slideCount) % slideCount
}

function goToSlide(index) {
  activeSlide.value = index
  restartAutoPlay()
}

function startAutoPlay() {
  stopAutoPlay()
  intervalId = setInterval(nextSlide, 5000)
}

function stopAutoPlay() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function restartAutoPlay() {
  startAutoPlay()
}

// Slick Mouse & Touch Dragging State (Exact same as New&Promotion)
const heroCarouselRef = ref(null)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragDeltaX = ref(0)
const wasDragged = ref(false)

const trackStyle = computed(() => {
  if (isDragging.value) {
    return {
      transform: `translateX(calc(-${activeSlide.value * 100}% + ${dragDeltaX.value}px))`,
      transition: 'none'
    }
  }
  return {
    transform: `translateX(-${activeSlide.value * 100}%)`,
    transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
  }
})

function onMouseDown(e) {
  // Only respond to primary (left) mouse button
  if (e.button !== 0) return

  stopAutoPlay()
  isDragging.value = true
  wasDragged.value = false
  dragStartX.value = e.clientX
  dragDeltaX.value = 0

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e) {
  if (!isDragging.value) return
  const delta = e.clientX - dragStartX.value
  dragDeltaX.value = delta
  if (Math.abs(delta) > 7) {
    wasDragged.value = true
  }
}

function onMouseUp(e) {
  if (!isDragging.value) return

  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)

  const delta = dragDeltaX.value
  const dragged = wasDragged.value
  isDragging.value = false
  dragDeltaX.value = 0

  const threshold = 35
  if (dragged && delta < -threshold) {
    // Dragged left with mouse -> Next slide
    nextSlide()
  } else if (dragged && delta > threshold) {
    // Dragged right with mouse -> Back / previous slide
    prevSlide()
  } else if (!dragged && heroCarouselRef.value) {
    // Left-clicked without dragging:
    // Click on left half goes back, click on right half goes next
    const rect = heroCarouselRef.value.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    if (clickX < rect.width / 2) {
      prevSlide()
    } else {
      nextSlide()
    }
  }

  startAutoPlay()
}

function onTouchStart(e) {
  stopAutoPlay()
  isDragging.value = true
  wasDragged.value = false
  dragStartX.value = e.touches[0].clientX
  dragDeltaX.value = 0
}

function onTouchMove(e) {
  if (!isDragging.value) return
  const delta = e.touches[0].clientX - dragStartX.value
  dragDeltaX.value = delta
  if (Math.abs(delta) > 7) {
    wasDragged.value = true
  }
}

function onTouchEnd(e) {
  if (!isDragging.value) return
  const delta = dragDeltaX.value
  const dragged = wasDragged.value
  isDragging.value = false
  dragDeltaX.value = 0

  const threshold = 35
  if (dragged && delta < -threshold) {
    nextSlide()
  } else if (dragged && delta > threshold) {
    prevSlide()
  } else if (!dragged && heroCarouselRef.value && e.changedTouches && e.changedTouches.length > 0) {
    const rect = heroCarouselRef.value.getBoundingClientRect()
    const touchX = e.changedTouches[0].clientX - rect.left
    if (touchX < rect.width / 2) {
      prevSlide()
    } else {
      nextSlide()
    }
  }
  startAutoPlay()
}

function onMouseLeaveWrap() {
  if (!isDragging.value) {
    startAutoPlay()
  }
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

onMounted(() => {
  startAutoPlay()
  wordIntervalId = window.setInterval(nextRotatingWord, 2500)
})

onBeforeUnmount(() => {
  stopAutoPlay()
  if (wordIntervalId) window.clearInterval(wordIntervalId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
  <section class="hero" aria-label="Featured business solutions">
    <div class="container hero_inner">
      <div class="hero_card">
        <!-- Ambient decorative background glow -->
        <div class="hero_card-glow" aria-hidden="true"></div>

        <!-- Small Eyebrow Pill with Live Pulse Dot -->
        <div class="hero_badge">
          <span class="hero_badge-dot-wrap">
            <span class="hero_badge-ping"></span>
            <span class="hero_badge-dot"></span>
          </span>
          <span class="hero_badge-text">{{ t('hero.eyebrow', 'BUSINESS SOLUTIONS') }}</span>
        </div>

        <!-- Hero Heading with Rotating animated words (fixed height, zero layout shift) -->
        <h1 class="hero_heading" :class="{ 'hero_heading--km': isKhmer }">
          <span class="hero_heading-prefix">
            {{ isKhmer ? 'អ្វីៗគ្រប់យ៉ាងដែល' : 'Everything your' }}
          </span>
          <span class="hero_rotator-wrapper">
            <Transition name="word-slide">
              <span :key="`${isKhmer ? 'km' : 'en'}-${currentWordIndex}`" class="hero_heading-accent hero_rotating-word">
                {{ currentWord }}
              </span>
            </Transition>
          </span>
        </h1>

        <!-- Compact Subtitle with fixed min-height -->
        <p class="hero_subtitle" :class="{ 'hero_subtitle--km': isKhmer }">
          {{ isKhmer
            ? 'ប្រភពផ្គត់ផ្គង់សម្ភារៈសំណង់ ដែកថែប និងដំណោះស្រាយអាជីវកម្មលំដាប់ខ្ពស់។'
            : 'One-stop marketplace for construction materials, steel structures, and equipment.'
          }}
        </p>

        <!-- Compact Action Button -->
        <div class="hero_actions">
          <RouterLink to="/products" class="hero_cta-primary">
            <span>{{ t('hero.exploreProducts', 'Explore Products') }}</span>
            <svg class="hero_cta-arrow" viewBox="0 0 20 20" fill="currentColor" width="15" height="15" aria-hidden="true">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </RouterLink>
        </div>
      </div>

      <!-- Carousel Slider (Left click drag next/back, click left-half back, click right-half next) -->
      <div
        ref="heroCarouselRef"
        class="hero_carousel"
        :class="{ 'is-dragging': isDragging }"
        @mouseenter="stopAutoPlay"
        @mouseleave="onMouseLeaveWrap"
        @mousedown="onMouseDown"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend="onTouchEnd"
        @wheel.prevent="onWheel"
      >
        <div class="hero_carousel-track" :style="trackStyle">
          <div
            v-for="slide in slides"
            :key="slide.id"
            class="hero_slide"
            :aria-label="slide.alt"
          >
            <div class="hero_slide-img-box">
              <ImagePlaceholder
                label="HomeAll"
                :image="slide.image"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          class="hero_arrow hero_arrow--prev"
          aria-label="Previous slide"
          @mousedown.stop
          @touchstart.stop
          @click.stop="prevSlide(); restartAutoPlay()"
        >
          ‹
        </button>

        <button
          type="button"
          class="hero_arrow hero_arrow--next"
          aria-label="Next slide"
          @mousedown.stop
          @touchstart.stop
          @click.stop="nextSlide(); restartAutoPlay()"
        >
          ›
        </button>

        <div class="hero_dots" role="tablist" aria-label="Slide selector" @mousedown.stop @touchstart.stop>
          <button
            v-for="(slide, idx) in slides"
            :key="slide.id"
            type="button"
            class="hero_dot"
            :class="{ 'hero_dot--active': idx === activeSlide }"
            :aria-selected="idx === activeSlide"
            role="tab"
            :aria-label="`Go to slide ${idx + 1}`"
            @click.stop="goToSlide(idx)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(180deg, #edf2f7 0%, #f1f5f9 100%);
  padding: 24px 0;
  position: relative;
}

.hero_inner {
  display: grid;
  grid-template-columns: minmax(300px, 460px) 1fr;
  gap: 24px;
  align-items: stretch;
}

/* Hero Card - Stable & Balanced */
.hero_card {
  background: #ffffff;
  border-radius: 16px;
  padding: 26px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05),
              0 1px 3px rgba(0, 0, 0, 0.03);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  min-height: 290px;
  box-sizing: border-box;
}

.hero_card:hover {
  box-shadow: 0 14px 30px -5px rgba(0, 0, 0, 0.08);
}

/* Ambient Corner Glow */
.hero_card-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(52, 199, 89, 0.15) 0%, rgba(52, 199, 89, 0) 70%);
  pointer-events: none;
}

/* Eyebrow Badge - Small & Sleek */
.hero_badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 999px;
  padding: 4px 10px;
  margin-bottom: 12px;
  width: fit-content;
  box-shadow: 0 1px 3px rgba(34, 197, 94, 0.06);
}

.hero_badge-dot-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6px;
  height: 6px;
}

.hero_badge-ping {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #22c55e;
  opacity: 0.75;
  animation: badgePing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.hero_badge-dot {
  position: relative;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #16a34a;
}

@keyframes badgePing {
  75%, 100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

.hero_badge-text {
  font-size: 10.5px;
  font-weight: 700;
  color: #15803d;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

/* Heading - Fixed Height to prevent any layout shifting */
.hero_heading {
  font-size: 26px;
  font-weight: 800;
  color: var(--color-text-primary, #0f172a);
  line-height: 1.25;
  margin: 0 0 10px 0;
  letter-spacing: -0.02em;
  min-height: 74px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.hero_heading--km {
  font-family: var(--font-family-khmer, 'Kantumruy Pro', 'Battambang', 'Siemreap', sans-serif);
  font-size: 22px;
  line-height: 1.45;
  min-height: 74px;
  padding: 0;
}

.hero_heading-prefix {
  display: block;
  font-weight: 800;
  margin-bottom: 2px;
  line-height: 1.25;
}

.hero_heading--km .hero_heading-prefix {
  line-height: 1.35;
  margin-bottom: 0;
}

/* Rotator container - locked height so transitions never collapse or bounce */
.hero_rotator-wrapper {
  display: block;
  position: relative;
  height: 38px;
  line-height: 38px;
  overflow: hidden;
  white-space: nowrap;
}

.hero_heading-accent {
  background: linear-gradient(135deg, #15803d 0%, #16a34a 50%, #059669 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
  line-height: 38px;
  will-change: transform, opacity;
}

.hero_heading--km .hero_heading-accent {
  display: block;
  padding: 0;
  margin: 0;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  line-height: 38px;
}

.hero_rotating-word {
  display: block;
  height: 38px;
  line-height: 38px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Slide transition - smooth and strictly contained inside 38px box */
.word-slide-enter-active {
  transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
}

.word-slide-leave-active {
  transition: transform 0.25s ease, opacity 0.2s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.word-slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.word-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

/* Subtitle - Fixed min-height so EN and KM take identical height */
.hero_subtitle {
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 16px 0;
  max-width: 380px;
  min-height: 42px;
  display: flex;
  align-items: center;
}

.hero_subtitle--km {
  font-family: var(--font-family-khmer, 'Kantumruy Pro', 'Battambang', 'Siemreap', sans-serif);
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.55;
  color: #475569;
  max-width: 420px;
  min-height: 42px;
}

/* Actions - Compact CTA Button */
.hero_actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hero_cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  padding: 9px 18px;
  border-radius: 9px;
  text-decoration: none;
  box-shadow: 0 6px 16px -2px rgba(22, 163, 74, 0.32);
  transition: all 0.22s cubic-bezier(0.2, 0, 0.2, 1);
}

.hero_cta-primary:hover {
  background: linear-gradient(135deg, #15803d 0%, #166534 100%);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px -2px rgba(22, 163, 74, 0.42);
}

.hero_cta-arrow {
  transition: transform 0.2s ease;
}

.hero_cta-primary:hover .hero_cta-arrow {
  transform: translateX(3px);
}

/* Carousel Side - Same style as New&Promotion */
.hero_carousel {
  position: relative;
  flex: 1;
  min-width: 0;
  border-radius: 16px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.07);
  min-height: 290px;
  height: 100%;
  display: flex;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y;
  transition: box-shadow 0.28s ease, transform 0.28s ease;
}

.hero_carousel:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.hero_carousel:active,
.hero_carousel.is-dragging {
  cursor: grabbing;
}

.hero_carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.hero_slide {
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
.hero_slide-img-box {
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
  background-color: #ffffff;
}

.hero_carousel img {
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}

/* Slider Arrows (visible on hover, matching New&Promotion) */
.hero_arrow {
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
  font-size: 20px;
  line-height: 1;
}

.hero_carousel:hover .hero_arrow {
  opacity: 1;
}

.hero_arrow:hover {
  background-color: #ffffff;
  color: var(--color-brand, #34c759);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  border-color: var(--color-brand, #34c759);
}

.hero_arrow--prev {
  left: 14px;
}

.hero_arrow--next {
  right: 14px;
}

/* Indicator Dots Pill (matching New&Promotion) */
.hero_dots {
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

.hero_dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.55);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.25s ease;
}

.hero_dot:hover {
  background-color: #ffffff;
}

.hero_dot--active {
  width: 20px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.9);
}

@media (max-width: 900px) {
  .hero_inner {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .hero_card {
    padding: 22px 20px;
  }

  .hero_heading {
    font-size: 22px;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-top: var(--space-4);
    padding-bottom: var(--space-4);
  }

  .hero_carousel,
  .hero_image {
    min-height: 200px;
  }

  .hero_card {
    padding: 18px 16px;
    border-radius: 12px;
  }

  .hero_heading {
    font-size: 20px;
  }

  .hero_text {
    font-size: 13.5px;
  }

  .hero_cta-primary {
    width: 100%;
    justify-content: center;
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .hero_carousel,
  .hero_image {
    min-height: 170px;
  }

  .hero_arrow {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
}
</style>

<!-- Non-scoped so body.dark / :root[data-theme="dark"] ancestor selectors work -->
<style>
/* =====================================================
   Hero Banner – Dark Mode Overrides
   ===================================================== */

/* Hero section background */
:root[data-theme="dark"] .hero,
body.dark .hero {
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
}

/* Hero card: keep white background so the black heading
   "Everything your business needs" stays readable */
:root[data-theme="dark"] .hero_card,
body.dark .hero_card {
  background: #ffffff;
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* Heading → black (readable on the white card) */
:root[data-theme="dark"] .hero_heading,
body.dark .hero_heading {
  color: #0f172a;
}

/* Subtitle → dark grey (readable on white card) */
:root[data-theme="dark"] .hero_subtitle,
body.dark .hero_subtitle {
  color: #475569;
}
</style>

