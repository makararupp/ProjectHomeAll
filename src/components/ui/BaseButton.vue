<script setup>
/**
 * BaseButton
 * Renders either a <button> or a <a> (when `href` is provided), so it can be
 * used both for in-app actions and for plain links, while sharing one look.
 */
defineProps({
  href: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'outline', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="base-button"
    :class="[`base-button--${variant}`, `base-button--${size}`]"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-weight: 600;
  white-space: nowrap;
  transition: background-color var(--transition-fast), border-color var(--transition-fast),
    color var(--transition-fast), opacity var(--transition-fast);
}

.base-button--sm {
  height: 30px;
  padding: 0 var(--space-3);
  font-size: var(--font-size-xs);
}

.base-button--md {
  height: 46px;
  padding: 0 var(--space-5);
  font-size: var(--font-size-md);
}

.base-button--lg {
  height: 50px;
  padding: 0 var(--space-6);
  font-size: var(--font-size-md);
}

.base-button--primary {
  background-color: var(--color-brand);
  color: var(--color-text-white);
  border: 1px solid var(--color-brand);
}

.base-button--primary:hover {
  background-color: var(--color-brand-dark);
  border-color: var(--color-brand-dark);
}

.base-button--outline {
  background-color: var(--color-bg-surface);
  color: var(--color-brand);
  border: 1px solid var(--color-text-primary);
}

.base-button--outline:hover {
  background-color: var(--color-bg-section);
}

.base-button--ghost {
  background-color: transparent;
  color: var(--color-brand);
  border: none;
  padding: 0;
  height: auto;
  font-size: var(--font-size-xs);
}

.base-button--ghost:hover {
  color: var(--color-brand-dark);
}

.base-button:disabled,
.base-button.is-disabled {
  background-color: #e5e7eb !important;
  border-color: #e5e7eb !important;
  color: #9ca3af !important;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none !important;
}
</style>
