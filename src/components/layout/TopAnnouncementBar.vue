<script setup>
import { computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { currentLocale } = useI18n()
const isKhmer = computed(() => currentLocale.value === 'km')
</script>

<template>
  <div class="top-announcement-bar" role="region" aria-label="Announcement">
    <div class="top-announcement-bar_inner">
      <p class="top-announcement-bar_text" :class="{ 'top-announcement-bar_text--km': isKhmer }">
        <template v-if="isKhmer">
          ការផ្ដល់ជូនពិសេសខួប ១០ ឆ្នាំ <span class="heart-icon" aria-hidden="true">💖</span> ការបញ្ចុះតម្លៃសម្រាប់អតិថិជនថ្មី ទិញកាន់តែច្រើន ចំណេញកាន់តែច្រើន និងការផ្ដល់ជូនពិសេសលើការតុបតែងផ្ទះ ឥដ្ឋ Q-CON ដែក ដំបូល និងបេតុង។ ចំណេញរហូតដល់ 55,000 បាត! រហូតដល់ថ្ងៃទី 30 ខែកញ្ញា។
        </template>
        <template v-else>
          10th Anniversary Promotion <span class="heart-icon" aria-hidden="true">💖</span> Discounts for new customers, the more you buy, the more you save, and special offers on home decor, Q-CON bricks, steel , roofing, and concrete. Save up to 55,000 baht! Until September 30th.
        </template>
      </p>
    </div>
  </div>
</template>

<style scoped>
.top-announcement-bar {
  width: 100%;
  background-color: #eff6ff;
  border-bottom: 1px solid rgba(59, 130, 246, 0.12);
  padding: 6px 16px;
  box-sizing: border-box;
}

.top-announcement-bar_inner {
  width: 100%;
  max-width: var(--container-max-width, 1380px);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.top-announcement-bar_text {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.45;
  color: #2563eb;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-align: center;
  word-break: normal;
}

.top-announcement-bar_text--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 12px;
  line-height: 1.6;
}

.heart-icon {
  display: inline-block;
  margin: 0 4px;
  font-size: 13px;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .top-announcement-bar {
    padding: 6px 12px;
  }

  .top-announcement-bar_text {
    font-size: 11.5px;
    line-height: 1.4;
  }
}
</style>

<!-- Non-scoped dark mode support -->
<style>
:root[data-theme="dark"] .top-announcement-bar,
body.dark .top-announcement-bar {
  background-color: #1e293b !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}

:root[data-theme="dark"] .top-announcement-bar_text,
body.dark .top-announcement-bar_text {
  color: #93c5fd !important;
}
</style>

