<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const isVisible = ref(false)

function handleScroll() {
  // Show button when user has scrolled down past 300px
  isVisible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <transition name="scroll-top-fade">
    <button
      v-show="isVisible"
      type="button"
      class="scroll-to-top-btn"
      :title="t('footer.scrollToTop', 'Go to top')"
      :aria-label="t('footer.scrollToTop', 'Go to top')"
      @click="scrollToTop"
    >
      <i class="icon-angle-up fas fa-angle-up" aria-hidden="true"></i>
    </button>
  </transition>
</template>

<style scoped>
.scroll-to-top-btn {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 9999;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: var(--color-brand, #34c759);
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(52, 199, 89, 0.4), 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  outline: none;
}

.scroll-to-top-btn i {
  font-size: 20px;
  line-height: 1;
  transform: translateY(-1px);
}

.scroll-to-top-btn:hover {
  background-color: var(--color-brand-dark, #269c46);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(38, 156, 70, 0.5), 0 4px 8px rgba(0, 0, 0, 0.12);
}

.scroll-to-top-btn:active {
  transform: translateY(-1px) scale(0.96);
}

.scroll-to-top-btn:focus-visible {
  outline: 2px solid var(--color-brand, #34c759);
  outline-offset: 3px;
}

/* Transition animations */
.scroll-top-fade-enter-active,
.scroll-top-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.scroll-top-fade-enter-from,
.scroll-top-fade-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.85);
}

@media (max-width: 768px) {
  .scroll-to-top-btn {
    bottom: 24px;
    right: 20px;
    width: 42px;
    height: 42px;
  }

  .scroll-to-top-btn i {
    font-size: 18px;
  }
}
</style>

