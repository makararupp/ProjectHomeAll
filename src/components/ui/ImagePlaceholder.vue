<script setup>
import { computed } from 'vue'
import slide1 from '@/assets/images/slide1.jpg'

const props = defineProps({
  label: {
    type: String,
    default: 'HomeAll'
  },
  image: {
    type: String,
    default: ''
  }
})

// Use props.image if provided, or default to slide1.jpg for 'HomeAll'
const imageSrc = computed(() => {
  if (props.image) return props.image
  if (props.label === 'HomeAll') return slide1
  return null
})
</script>

<template>
  <div class="image-placeholder" role="img" :aria-label="`${label} image`">
    <!-- Show JPG image if available -->
    <img
      v-if="imageSrc"
      :src="imageSrc"
      :alt="label"
      class="image-placeholder__img"
    />

    <!-- Fallback mark and text when no image is set -->
    <template v-else>
      <svg viewBox="0 0 64 64" class="image-placeholder__mark" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="var(--color-brand)" />
        <path d="M32 14 16 27v23h12v-14h8v14h12V27L32 14z" fill="#ffffff" />
      </svg>
      <span class="image-placeholder__label">{{ label }}</span>
    </template>
  </div>
</template>

<style scoped>
.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  background: linear-gradient(180deg, #eef7f0 0%, #f4f6f5 100%);
  overflow: hidden;
}

.image-placeholder__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-placeholder__mark {
  width: 56px;
  height: 56px;
}

.image-placeholder__label {
  font-weight: 700;
  font-size: var(--font-size-lg);
  color: var(--color-text-heading);
  letter-spacing: 0.02em;
}
</style>
