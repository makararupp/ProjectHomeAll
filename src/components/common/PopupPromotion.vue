<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import defaultPromoImg from '@/assets/images/PopupPromotion/promotion.jpg'

// Also support any dynamically added images in the folder
const imagesGlob = import.meta.glob('../../assets/images/PopupPromotion/*.{png,jpg,jpeg,webp,svg,gif,PNG,JPG,JPEG}', { eager: true, import: 'default' })

// Current image to display
const promoImage = computed(() => {
  const images = Object.values(imagesGlob)
  return images[0] || defaultPromoImg
})

const { t, currentLocale } = useI18n()
const isKhmer = computed(() => currentLocale.value === 'km')

// Visible immediately when opening/running the project
const isVisible = ref(true)
const dontShowToday = ref(false)
let autoCloseTimer = null

function openPopup() {
  isVisible.value = true
  startAutoClose()
}

function closePopup() {
  isVisible.value = false
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
}

function startAutoClose() {
  if (autoCloseTimer) clearTimeout(autoCloseTimer)
  // Automatically close popup after 3 seconds
  autoCloseTimer = setTimeout(() => {
    closePopup()
  }, 3000)
}

function handleKeyDown(e) {
  if (e.key === 'Escape' && isVisible.value) {
    closePopup()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)

  // Start the 3-second auto-close countdown
  startAutoClose()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
  }
})
</script>

<template>
  <Transition name="popup-fade">
    <div
      v-if="isVisible"
      class="popup-promotion_backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Promotion Announcement"
      @click.self="closePopup"
    >
      <div class="popup-promotion_dialog">
        <!-- Full Image Container -->
        <div class="popup-promotion_image-wrapper">
          <!-- 3-Second Auto-Close Progress Bar -->
          <div class="popup-promotion_progress-bar"></div>

          <!-- Floating Close Button -->
          <button
            type="button"
            class="popup-promotion_close"
            aria-label="Close promotion popup"
            @click="closePopup"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <!-- Promotion Image Banner -->
          <RouterLink
            to="/products"
            class="popup-promotion_banner-link"
            @click="closePopup"
          >
            <img
              v-if="promoImage"
              :src="promoImage"
              alt="Special Promotion"
              class="popup-promotion_img"
            />
          </RouterLink>
        </div>

        <!-- Sleek Checkbox Pill Under Image -->
        <div class="popup-promotion_footer">
          <label class="popup-promotion_checkbox-label">
            <input
              v-model="dontShowToday"
              type="checkbox"
              class="popup-promotion_checkbox"
            />
            <span class="popup-promotion_checkbox-text" :class="{ 'popup-promotion_checkbox-text--km': isKhmer }">
              {{ isKhmer ? 'កុំបង្ហាញម្តងទៀតថ្ងៃនេះ' : "Don't show again today" }}
            </span>
          </label>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.popup-promotion_backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999999;
  background-color: rgba(15, 23, 42, 0.78);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  box-sizing: border-box;
}

.popup-promotion_dialog {
  position: relative;
  width: 100%;
  max-width: 680px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: popupScale 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes popupScale {
  0% {
    opacity: 0;
    transform: scale(0.92) translateY(12px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Full Image Wrapper */
.popup-promotion_image-wrapper {
  position: relative;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.15);
  background-color: #0f172a;
  line-height: 0;
}

/* 3-Second Auto-Close Progress Bar */
.popup-promotion_progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 3.5px;
  width: 100%;
  background: linear-gradient(90deg, #34c759, #30d158);
  z-index: 25;
  animation: autoCloseProgress 3s linear forwards;
  box-shadow: 0 0 8px rgba(52, 199, 89, 0.8);
}

@keyframes autoCloseProgress {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}

/* Floating Circular Close Button */
.popup-promotion_close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(15, 23, 42, 0.75);
  color: #ffffff;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
}

.popup-promotion_close:hover {
  background-color: #000000;
  transform: scale(1.1);
  border-color: #ffffff;
}

/* Promotion Image Banner */
.popup-promotion_banner-link {
  display: block;
  width: 100%;
  text-decoration: none;
  overflow: hidden;
  line-height: 0;
}

.popup-promotion_img {
  width: 100%;
  height: auto;
  max-height: min(82vh, 640px);
  object-fit: contain;
  display: block;
  transition: transform 0.3s ease;
}

.popup-promotion_banner-link:hover .popup-promotion_img {
  transform: scale(1.015);
}

/* Translucent Footer Pill */
.popup-promotion_footer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  padding: 6px 18px;
  background-color: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.popup-promotion_checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.popup-promotion_checkbox {
  width: 15px;
  height: 15px;
  accent-color: var(--color-brand, #34c759);
  cursor: pointer;
}

.popup-promotion_checkbox-text {
  font-size: 13px;
  color: #ffffff;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}

.popup-promotion_checkbox-text--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 12px;
}

/* Modal Transition */
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.3s ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}

/* Mobile Responsive */
@media (max-width: 600px) {
  .popup-promotion_dialog {
    max-width: 95vw;
  }

  .popup-promotion_image-wrapper {
    border-radius: 14px;
  }

  .popup-promotion_close {
    width: 32px;
    height: 32px;
    top: 8px;
    right: 8px;
  }

  .popup-promotion_footer {
    padding: 5px 14px;
    margin-top: 10px;
  }

  .popup-promotion_checkbox-text {
    font-size: 12px;
  }
}
</style>

