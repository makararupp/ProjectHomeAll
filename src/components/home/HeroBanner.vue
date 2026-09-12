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
})

onBeforeUnmount(() => {
  if (intervalId) window.clearInterval(intervalId)
})
</script>

<template>
  <section class="hero" aria-label="Featured business solutions">
    <div class="container hero__inner">
      <div class="hero__card">
        <!-- Ambient decorative background glow -->
        <div class="hero__card-glow" aria-hidden="true"></div>

        <!-- Small Eyebrow Pill with Live Pulse Dot -->
        <div class="hero__badge">
          <span class="hero__badge-dot-wrap">
            <span class="hero__badge-ping"></span>
            <span class="hero__badge-dot"></span>
          </span>
          <span class="hero__badge-text">{{ t('hero.eyebrow', 'BUSINESS SOLUTIONS') }}</span>
        </div>

        <!-- Hero Heading with Brand Gradient Accent (Small & Punchy) -->
        <h1 class="hero__heading" :class="{ 'hero__heading--km': isKhmer }">
          <template v-if="!isKhmer">
            Everything your <span class="hero__heading-accent">business needs</span>
          </template>
          <template v-else>
            <span class="hero__heading-accent">{{ t('hero.heading', 'អ្វីៗគ្រប់យ៉ាងដែលអាជីវកម្មរបស់អ្នកត្រូវការ') }}</span>
          </template>
        </h1>

        <!-- Compact Subtitle -->
        <p class="hero__subtitle" :class="{ 'hero__subtitle--km': isKhmer }">
          {{ isKhmer
            ? 'ប្រភពផ្គត់ផ្គង់សម្ភារៈសំណង់ ដែកថែប និងដំណោះស្រាយអាជីវកម្មលំដាប់ខ្ពស់។'
            : 'One-stop marketplace for construction materials, steel structures, and equipment.'
          }}
        </p>

        <!-- Compact Action Button -->
        <div class="hero__actions">
          <RouterLink to="/products" class="hero__cta-primary">
            <span>{{ t('hero.exploreProducts', 'Explore Products') }}</span>
            <svg class="hero__cta-arrow" viewBox="0 0 20 20" fill="currentColor" width="15" height="15" aria-hidden="true">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </RouterLink>
        </div>
      </div>

      <div class="hero__carousel">
        <button
          type="button"
          class="hero__arrow hero__arrow--prev"
          aria-label="Previous slide"
          @click="prevSlide"
        >
          ‹
        </button>

        <div
          class="hero__image"
          :aria-label="slides[activeSlide].alt"
        >
          <ImagePlaceholder
            label="HomeAll"
            :image="slides[activeSlide].image"
          />
        </div>

        <button
          type="button"
          class="hero__arrow hero__arrow--next"
          aria-label="Next slide"
          @click="nextSlide"
        >
          ›
        </button>

        <div class="hero__dots" role="tablist" aria-label="Slide selector">
          <button
            v-for="index in slideCount"
            :key="index"
            type="button"
            class="hero__dot"
            :class="{ 'hero__dot--active': activeSlide === index - 1 }"
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

.hero__inner {
  display: grid;
  grid-template-columns: minmax(300px, 460px) 1fr;
  gap: 24px;
  align-items: stretch;
}

/* Hero Card - Compact & Cool */
.hero__card {
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

.hero__card:hover {
  box-shadow: 0 14px 30px -5px rgba(0, 0, 0, 0.08);
}

/* Ambient Corner Glow */
.hero__card-glow {
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
.hero__badge {
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

.hero__badge-dot-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6px;
  height: 6px;
}

.hero__badge-ping {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #22c55e;
  opacity: 0.75;
  animation: badgePing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.hero__badge-dot {
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

.hero__badge-text {
  font-size: 10.5px;
  font-weight: 700;
  color: #15803d;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

/* Heading - Incremented & Sharp */
/* Heading - Compact & Sharp */
.hero__heading {
  font-size: 32px;
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.22;
  margin: 0 0 12px 0;
  margin: 0 0 10px 0;
  letter-spacing: -0.02em;
}

.hero__heading--km {
  font-size: 29px;
  font-size: 23px;
  line-height: 1.35;
}

.hero__heading-accent {
  background: linear-gradient(135deg, #15803d 0%, #16a34a 50%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline;
}

/* Subtitle - Small & Crisp */
.hero__subtitle {
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 18px 0;
  max-width: 380px;
}

.hero__subtitle--km {
  font-size: 12.5px;
  line-height: 1.55;
}

/* Actions - Compact CTA Button */
.hero__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hero__cta-primary {
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

.hero__cta-primary:hover {
  background: linear-gradient(135deg, #15803d 0%, #166534 100%);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px -2px rgba(22, 163, 74, 0.42);
}

.hero__cta-arrow {
  transition: transform 0.2s ease;
}

.hero__cta-primary:hover .hero__cta-arrow {
  transform: translateX(3px);
}

/* Carousel Side - Balanced Height */
.hero__carousel {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  min-height: 260px;
  background-color: #f1f5f9;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.hero__image {
  width: 100%;
  height: 100%;
  min-height: 260px;
  display: block;
}

.hero__arrow {
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

.hero__arrow:hover {
  background: #ffffff;
  color: #15803d;
  transform: translateY(-50%) scale(1.06);
}

.hero__arrow--prev {
  left: 10px;
}

.hero__arrow--next {
  right: 10px;
}

.hero__dots {
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

.hero__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.25s ease;
}

.hero__dot--active {
  width: 18px;
  border-radius: 999px;
  background-color: #ffffff;
}

@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .hero__card {
    padding: 22px 20px;
  }

  .hero__heading {
    font-size: 22px;
  }
}
</style>
