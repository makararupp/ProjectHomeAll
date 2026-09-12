<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue'
import slide1 from '@/assets/images/slide1.jpg'
import slide2 from '@/assets/images/slide2.jpg'
import slide3 from '@/assets/images/slide3.jpg'

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
        <p class="hero__eyebrow">BUSINESS SOLUTIONS</p>
        <h1 class="hero__heading">Everything your business needs</h1>
        <div class="hero__actions">
          <BaseButton variant="primary" href="/products">Explore Products</BaseButton>
          <BaseButton variant="outline" href="/about">Learn More</BaseButton>
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
  background-color: var(--color-bg-section);
  padding: var(--space-10) 0;
}

.hero__inner {
  display: grid;
  grid-template-columns: minmax(320px, 560px) 1fr;
  gap: var(--space-8);
  align-items: stretch;
}

.hero__card {
  background-color: var(--color-bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-10);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero__eyebrow {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-brand);
  letter-spacing: 0.08em;
  margin-bottom: var(--space-4);
}

.hero__heading {
  font-size: var(--font-size-5xl);
  font-weight: 700;
  color: var(--color-text-heading);
  line-height: 1.25;
  margin-bottom: var(--space-8);
}

.hero__actions {
  display: flex;
  gap: var(--space-4);
}

.hero__carousel {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-height: 320px;
  background-color: #e9ece9;
}

.hero__image {
  width: 100%;
  height: 100%;
  min-height: 320px;
  display: block;
}

.hero__image:hover :deep(img) {
  transform: scale(1.03);
}

.hero__image :deep(img) {
  transition: transform 0.3s ease;
}

.hero__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--font-size-5xl);
  color: var(--color-text-muted);
  line-height: 1;
  padding: var(--space-2) var(--space-3);
  z-index: 2;
}

.hero__arrow--prev {
  left: var(--space-2);
}

.hero__arrow--next {
  right: var(--space-2);
}

.hero__arrow:hover {
  color: var(--color-text-primary);
}

.hero__dots {
  position: absolute;
  left: 50%;
  bottom: var(--space-4);
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-2);
  z-index: 2;
}

.hero__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-dot-inactive);
}

.hero__dot--active {
  background-color: var(--color-brand);
}

@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
  }
}
</style>
