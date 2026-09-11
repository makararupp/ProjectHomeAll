<script setup>
/**
 * IconBase
 * A tiny, dependency-free icon set covering the glyphs the homepage needs.
 * Add new entries to `paths` as new icons are required, rather than pulling
 * in a full icon library for a handful of glyphs.
 */
defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 22
  }
})

const paths = {
  food: 'M6 2v8a2 2 0 0 0 2 2v10M6 2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2M6 2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M18 2c-2.2 0-4 2.7-4 6s1.8 6 4 6v8',
  truck: 'M1 4h13v11H1zM14 8h4l3 3v4h-7zM5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  building: 'M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17M4 21h16M9 8h1M9 12h1M14 8h1M14 12h1M14 21v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4',
  box: 'M12 2 2 7l10 5 10-5zM2 7v10l10 5V12zM22 7v10l-10 5V12',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 13a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V19a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 17.36a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.64 13 1.7 1.7 0 0 0 3.09 12H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.64 7a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 2.64 1.7 1.7 0 0 0 10 1.09V1a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.36 7c.16.38.52.66 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1z',
  hammer:
    'M14.5 3.5 21 10l-3 3-6.5-6.5zM3 21l7-7M9 9l1.5-1.5L15 12 13.5 13.5z',
  laptop: 'M4 5h16v10H4zM2 19h20M9 15v-1.5h6V15',
  chart: 'M3 3v18h18M8 17V10M13 17V6M18 17v-4'
}

const strokeWidth = 1.8
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke-width="strokeWidth"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name] || paths.box" />
  </svg>
</template>
