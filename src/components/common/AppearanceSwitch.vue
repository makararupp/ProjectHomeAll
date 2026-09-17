<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  floating: {
    type: Boolean,
    default: false
  }
})

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div
    class="appearance-switch-container"
    :class="{ 'is-floating': floating, 'is-dark': isDark }"
  >
    <button
      type="button"
      class="appearance-switch"
      :class="{ 'is-dark': isDark }"
      role="switch"
      :aria-checked="isDark"
      title="Appearance"
      aria-label="Appearance"
      @click="toggleTheme"
    >
      <span class="appearance-switch_track">
        <span class="appearance-switch_thumb">
          <!-- Sun / Appearance gear icon (matching reference image) -->
          <svg
            v-if="!isDark"
            class="appearance-icon sun-icon"
            viewBox="0 0 24 24"
            width="13"
            height="13"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm1-8a1 1 0 1 0-2 0v1.07a8.04 8.04 0 0 0-2.31.95L7.93 3.26a1 1 0 0 0-1.42 1.42l.76.76c-.4.7-.72 1.47-.95 2.31H5.25a1 1 0 1 0 0 2h1.07c.23.84.55 1.61.95 2.31l-.76.76a1 1 0 0 0 1.42 1.42l.76-.76c.7.4 1.47.72 2.31.95v1.07a1 1 0 1 0 2 0v-1.07c.84-.23 1.61-.55 2.31-.95l.76.76a1 1 0 0 0 1.42-1.42l-.76-.76c.4-.7.72-1.47.95-2.31h1.07a1 1 0 1 0 0-2h-1.07a8.04 8.04 0 0 0-.95-2.31l.76-.76a1 1 0 0 0-1.42-1.42l-.76.76a8.04 8.04 0 0 0-2.31-.95V2z"
            />
          </svg>

          <!-- Moon icon when in dark mode -->
          <svg
            v-else
            class="appearance-icon moon-icon"
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>
      </span>
    </button>
  </div>
</template>

<style scoped>
/* Container: standard inline display by default */
.appearance-switch-container {
  display: inline-flex;
  align-items: center;
}

/* Floating on right center of the screen */
.appearance-switch-container.is-floating {
  position: fixed;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9998;
  padding: 6px 8px;
  background-color: var(--color-bg-surface, #ffffff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 999px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
}

.appearance-switch-container.is-floating:hover {
  transform: translateY(-50%) scale(1.08);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18), 0 3px 8px rgba(0, 0, 0, 0.1);
}

.appearance-switch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  border-radius: 999px;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
}

.appearance-switch:focus-visible {
  outline: 2px solid var(--color-brand, #34c759);
  outline-offset: 2px;
}

/* Pill track matching the uploaded image */
.appearance-switch_track {
  position: relative;
  display: flex;
  align-items: center;
  width: 46px;
  height: 24px;
  background-color: #d8e2e6;
  border-radius: 999px;
  padding: 2px;
  box-sizing: border-box;
  transition: background-color 0.25s ease;
}

.appearance-switch.is-dark .appearance-switch_track {
  background-color: #2b3544;
}

/* Circular thumb knob matching the uploaded image */
.appearance-switch_thumb {
  position: absolute;
  left: 2px;
  top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #000000;
  color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s ease, color 0.25s ease;
}

.appearance-switch.is-dark .appearance-switch_thumb {
  transform: translateX(22px);
  background-color: #ffffff;
  color: #111827;
}

/* Icon inside thumb */
.appearance-icon {
  display: block;
  flex-shrink: 0;
  transition: transform 0.25s ease;
}

.appearance-switch:hover .appearance-switch_thumb {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
}

.appearance-switch:hover .sun-icon {
  transform: rotate(30deg);
}

.appearance-switch:hover .moon-icon {
  transform: rotate(-15deg);
}

@media (max-width: 768px) {
  .appearance-switch-container.is-floating {
    right: 8px;
    padding: 4px 6px;
  }
}
</style>
