<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
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

// Rotating words like spring.io ("Everything your [business needs / construction / quality materials / trusted suppliers / industrial solutions]")
const rotatingWordsEn = [
  'business needs.',
  'construction.',
  'quality materials.',
  'trusted suppliers.',
  'industrial solutions.'
]
const rotatingWordsKm = [
  'អាជីវកម្មត្រូវការ។',
  'សម្ភារៈសំណង់។',
  'ដៃគូទុកចិត្ត។',
  'ដំណោះស្រាយឧស្សាហកម្ម។'
]
const currentWordIndex = ref(0)
let wordIntervalId = null

function nextRotatingWord() {
  const words = isKhmer.value ? rotatingWordsKm : rotatingWordsEn
  currentWordIndex.value = (currentWordIndex.value + 1) % words.length
}

function goToSlide(index) {
  activeSlide.value = index
}

function nextSlide() {
  activeSlide.value = (activeSlide.value + 1) % slideCount
}

function prevSlide() {
  activeSlide.value = (activeSlide.value - 1 + slideCount) % slideCount
}

function handleSlideClick(slide) {
  console.log('Slide clicked:', slide)
}

onMounted(() => {
  intervalId = window.setInterval(nextSlide, 5000)
  wordIntervalId = window.setInterval(nextRotatingWord, 2000)
})

onBeforeUnmount(() => {
  if (intervalId) window.clearInterval(intervalId)
  if (wordIntervalId) window.clearInterval(wordIntervalId)
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

        <!-- Hero Heading with Rotating spring.io style animated words -->
        <h1 class="hero_heading" :class="{ 'hero_heading--km': isKhmer }">
          <template v-if="!isKhmer">
            <span class="hero_heading-prefix">Everything your</span>
            <span class="hero_rotator-wrapper">
              <Transition name="word-slide" mode="out-in">
                <span :key="currentWordIndex" class="hero_heading-accent hero_rotating-word">
                  {{ rotatingWordsEn[currentWordIndex] }}
                </span>
              </Transition>
            </span>
          </template>
          <template v-else>
            <span class="hero_heading-prefix">អ្វីៗគ្រប់យ៉ាងដែល</span>
            <span class="hero_rotator-wrapper">
              <Transition name="word-slide" mode="out-in">
                <span :key="currentWordIndex" class="hero_heading-accent hero_rotating-word">
                  {{ rotatingWordsKm[currentWordIndex] }}
                </span>
              </Transition>
            </span>
          </template>
        </h1>

        <!-- Compact Subtitle -->
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

      <div class="hero_carousel">
        <button
          type="button"
          class="hero_arrow hero_arrow--prev"
          aria-label="Previous slide"
          @click="prevSlide"
        >
          ‹
        </button>

        <div
          class="hero_image"
          :aria-label="slides[activeSlide].alt"
        >
          <ImagePlaceholder
            label="HomeAll"
            :image="slides[activeSlide].image"
          />
        </div>

        <button
          type="button"
          class="hero_arrow hero_arrow--next"
          aria-label="Next slide"
          @click="nextSlide"
        >
          ›
        </button>

        <div class="hero_dots" role="tablist" aria-label="Slide selector">
          <button
            v-for="index in slideCount"
            :key="index"
            type="button"
            class="hero_dot"
            :class="{ 'hero_dot--active': activeSlide === index - 1 }"
            :aria-selected="activeSlide === index - 1"
            role="tab"
            :aria-label="`Go to slide ${index}`"
            @click="goToSlide(index - 1)"
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

/* Hero Card - Compact & Cool */
.hero_card {
  background: #ffffff;
  border-radius: 16px;
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05),
              0 1px 3px rgba(0, 0, 0, 0.03);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
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

/* Heading - Compact & Sharp with spring.io style text rotator */
.hero_heading {
  font-size: 26px;
  font-weight: 800;
  color: var(--color-text-primary, #0f172a);
  line-height: 1.25;
  margin: 0 0 10px 0;
  letter-spacing: -0.02em;
  overflow: visible;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.hero_heading--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 23px;
  line-height: 1.6;
  overflow: visible;
  padding: 4px 0;
}

.hero_heading-prefix {
  display: block;
  font-weight: 800;
  margin-bottom: 2px;
}

/* Rotator container like spring.io */
.hero_rotator-wrapper {
  display: inline-flex;
  align-items: center;
  position: relative;
  min-height: 38px;
  vertical-align: middle;
  overflow: hidden;
}

.hero_heading-accent {
  background: linear-gradient(135deg, #15803d 0%, #16a34a 50%, #059669 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  word-wrap: break-word;
  overflow-wrap: break-word;
  will-change: transform, opacity;
}

.hero_heading--km .hero_heading-accent {
  display: inline-block;
  padding: 4px 0;
  margin: 0;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  line-height: inherit;
}

/* spring.io style slide / roll transition */
.word-slide-enter-active {
  transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.35s ease;
}

.word-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.25s ease;
  position: absolute;
  left: 0;
}

.word-slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.word-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

/* Subtitle - Small & Crisp */
.hero_subtitle {
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 18px 0;
  max-width: 380px;
}

.hero_subtitle--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.65;
  color: #475569;
  max-width: 420px;
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

/* Carousel Side - Balanced Height */
.hero_carousel {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  min-height: 260px;
  background-color: #f1f5f9;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.hero_image {
  width: 100%;
  height: 100%;
  min-height: 260px;
  display: block;
}

.hero_arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: #374151;
  font-size: 20px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.18s ease;
}

.hero_arrow:hover {
  background: #ffffff;
  color: #15803d;
  transform: translateY(-50%) scale(1.06);
}

.hero_arrow--prev {
  left: 10px;
}

.hero_arrow--next {
  right: 10px;
}

.hero_dots {
  position: absolute;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 3;
  background: rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(5px);
  padding: 4px 10px;
  border-radius: 999px;
}

.hero_dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.25s ease;
}

.hero_dot--active {
  width: 18px;
  border-radius: 999px;
  background-color: #ffffff;
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

