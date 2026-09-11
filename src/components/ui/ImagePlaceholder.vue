<script setup>
/**
 * ImagePlaceholder
 * The Figma file references licensed product/marketing photography that
 * can't be redistributed here. This component stands in for that artwork
 * with the HomeAll mark, keeping every image slot full and correctly
 * sized so swapping in real photos later is a one-line change.
 */
defineProps({
  label: {
    type: String,
    default: 'HomeAll'
  }
})
</script>

<template>
  <div class="image-placeholder" role="img" :aria-label="`${label} placeholder image`">
    <svg viewBox="0 0 64 64" class="image-placeholder__mark" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="var(--color-brand)" />
      <path d="M32 14 16 27v23h12v-14h8v14h12V27L32 14z" fill="#ffffff" />
    </svg>
    <span class="image-placeholder__label">{{ label }}</span>
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
